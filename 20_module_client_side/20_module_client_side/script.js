const getBetweenTwo = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
const gameArea = document.getElementsByClassName("gameArea")[0];

const realHeight = (window.outerHeight - gameArea.offsetHeight) / 2
const inDangerArea = () => {
    const laneHeight = document.getElementsByClassName("item")[0].offsetHeight;
    const dangerHeight = document.getElementsByClassName("dangerArea")[0].offsetHeight;
    const keyHeight = document.getElementsByClassName("key")[0].offsetHeight;
    return realHeight + laneHeight - dangerHeight - keyHeight - 100;
}

const inBorderArea = () => {
    const laneHeight = document.getElementsByClassName("item")[0].offsetHeight;
    const keyHeight = document.getElementsByClassName("key")[0].offsetHeight;
    return realHeight + laneHeight - keyHeight - 100;
}

const state = {
    isStart: false,
    paused: false,
    score: 0,
    speed: 4,
    fail: 0,
    time: {
        m: 0,
        s: 0,
    }
}

let gameInterval = null;

const keyState = {
    "d": false,
    "f": false,
    "j": false,
    "k": false,
}

const playBtn = document.getElementById("playBtn");
const usernameInput = document.getElementById("username-input");
const usernameInput2 = document.getElementById('username-input-2');
const playerText = document.getElementById("player-text");
const gameScreen = document.getElementById("screenModal");
const countdownScreen = document.getElementById("countdownModal");
const gameOverScreen = document.getElementById("gameOverModal");
const pauseScreen = document.getElementById("pauseModal");
const countText = document.getElementById("count");
const timeText = document.getElementById("time-text");
const scoreText = document.getElementById("score-text");
const failText = document.getElementById("fail-text");
const allLane = document.getElementsByClassName("item");
const highscoreText = document.getElementById("highscore-text");
const restartBtn = document.getElementById('restartBtn');

const moveVirus = (el = document.createElement("img"), key = "d", isRed) => {
    if (state.paused) return;

    let virusState = (window.outerHeight - gameArea.offsetHeight) / 2 - 100;
    el.style.top = virusState + "px";

    let theInterval = setInterval(() => {
        if (!state.isStart) {
            clearInterval(theInterval)
            el.remove();
            return;
        }

        virusState += isRed ? 5 : state.speed;
        el.style.top = virusState + "px"

        // If Pressed
        if (virusState > inDangerArea() && keyState[key] == true) {
            clearInterval(theInterval);
            state.score += 1;
            el.classList.add("disappear");
            setTimeout(() => {
                el.remove();
            }, 500)
        }

        if (virusState > inBorderArea()) {
            clearInterval(theInterval)
            state.fail += 1;
            el.classList.add("blow");
            setTimeout(() => {
                el.remove();
            }, 500)
        }
    }, 30);
}

const createVirus = () => {
    let newVirus = document.createElement("img");
    newVirus.classList.add("virus")
    let img = ["images/coronavirus-gaedba68d4_1280.png", "images/virus.png"];
    let val = getBetweenTwo(0, 1);
    newVirus.src = img[val];



    return { el: newVirus, red: img[val] == "images/virus.png" };
}

const getHighScore = () => {
    return localStorage.getItem("virus-highscore") ?? 0;
}

const spawnRandom = () => {
    if (state.paused == false) {
        console.log("Virus Spawned")
        const laneKe = getBetweenTwo(0, allLane.length - 1);
        const theVirus = createVirus();
        const theLane = allLane[laneKe];
        theLane.appendChild(theVirus.el)

        const theKey = theLane.firstElementChild.innerHTML.trim().toLowerCase();
        moveVirus(theVirus.el, theKey, theVirus.red);
    }
}

const renderTime = (second, minute) => {
    second = "" + second;
    minute = "" + minute;
    let realSec = second.length == 1 ? `0${second}` : second;
    let realMinute = minute.length == 1 ? `0${minute}` : minute

    return `${realMinute}:${realSec}`
}


const renderGameOver = () => {
    countText.innerText = "3";


    document.getElementById('time-text-2').innerText = renderTime(state.time.s, state.time.m);
    document.getElementById('highscore-text-2').innerText = getHighScore()
    document.getElementById('score-text-2').innerText = state.score;
    document.getElementById('fail-text-2').innerText = state.fail;
    document.getElementById('player-text-2').innerText = document.getElementById('player-text').innerText;

    gameOverScreen.classList.remove("d-none");
    gameOverScreen.classList.add("d-flex");
}


const isLose = () => {
    if (state.fail > 4) {
        clearInterval(gameInterval);


        if (state.score > parseInt(getHighScore())) {
            localStorage.setItem("virus-highscore", state.score);
        }

        renderGameOver();

        state.paused = false;
        state.speed = 4;
        state.isStart = false;
        state.score = 0;
        state.fail = 0;
        state.time = {
            m: 0,
            s: 0,
        }
    }
}

const renderGame = () => {

    if (!state.paused) {
        state.time.s += 1;
        if (state.time.s + "" == "60") {
            state.time.m += 1;
            state.time.s = 0;
        }
    }

    failText.innerText = state.fail;
    scoreText.innerText = state.score;
    timeText.innerText = renderTime(state.time.s, state.time.m);
    highscoreText.innerText = getHighScore();
}

const startGame = () => {
    let allV = document.getElementsByClassName("virus");
    for (let i = 0; i < allV.length; i++) {
        allV[i].remove();
    }

    state.isStart = true;
    gameInterval = setInterval(() => {
        spawnRandom();
        renderGame();
        isLose()
    }, 1000)
}

playBtn.addEventListener("click", () => {
    try {
        if (!usernameInput.value.trim()) return

        gameScreen.classList.remove("d-flex");
        gameScreen.classList.add("d-none");
        gameOverScreen.classList.remove("d-flex");
        gameOverScreen.classList.add("d-none");
        countdownScreen.classList.remove("d-none");
        countdownScreen.classList.add("d-flex");
        playerText.innerText = usernameInput.value;

        let countdownInterval = setInterval(() => {
            countText.innerText = parseInt(countText.innerText - 1);
            if (countText.innerText == 0) {
                clearInterval(countdownInterval);
                countdownScreen.classList.remove("d-flex");
                countdownScreen.classList.add("d-none");

                startGame();
            }
        }, 1000)

    } catch (error) {

    }
});

restartBtn.addEventListener("click", () => {
    try {
        if (!usernameInput2.value.trim()) return

        gameScreen.classList.remove("d-flex");
        gameScreen.classList.add("d-none");
        gameOverScreen.classList.remove("d-flex");
        gameOverScreen.classList.add("d-none");
        countdownScreen.classList.remove("d-none");
        countdownScreen.classList.add("d-flex");
        playerText.innerText = usernameInput2.value;

        let countdownInterval = setInterval(() => {
            countText.innerText = parseInt(countText.innerText - 1);
            if (countText.innerText == 0) {
                clearInterval(countdownInterval);
                countdownScreen.classList.remove("d-flex");
                countdownScreen.classList.add("d-none");

                startGame();
            }
        }, 1000)

    } catch (error) {

    }
})

const handleKey = (key = "d") => {
    const keyEl = document.getElementById(`key-${key}`);
    keyEl.classList.add("bright");
    keyState[key] = true
    setTimeout(() => {
        keyEl.classList.remove("bright");
        keyState[key] = false;
    }, 100)
}

const handlePause = () => {
    if (state.paused == true) {
        pauseScreen.classList.remove("d-flex")
        pauseScreen.classList.add("d-none");
        countText.innerText = "3";

        countdownScreen.classList.remove("d-none");
        countdownScreen.classList.add("d-flex");


        let countdownInterval = setInterval(() => {
            countText.innerText = parseInt(countText.innerText - 1);
            if (countText.innerText == 0) {
                clearInterval(countdownInterval);
                countdownScreen.classList.remove("d-flex");
                countdownScreen.classList.add("d-none");

                state.paused = false;
                state.speed = 4;
            }
        }, 1000)

    } else {
        state.paused = true;
        pauseScreen.classList.remove("d-none")
        pauseScreen.classList.add("d-flex")
        state.speed = 0;
    }
}

document.addEventListener("keydown", (e) => {
    if (!state.isStart) return;
    try {
        e.key = e.key.trim().toLowerCase();
        let allKey = ["d", "f", "j", "k"];
        if (allKey.includes(e.key) && !state.paused) handleKey(e.key);
        if (e.key == "Escape") {
            handlePause(e.key);
        }

    } catch (error) {
    }
})

document.getElementById("resumeBtn").addEventListener("click", () => {
    handlePause();
})

document.getElementById("restartBtn2").addEventListener("click", () => {
    try {
        clearInterval(gameInterval);

        state.isStart = false;
        state.score = 0;
        state.fail = 0;
        state.time = {
            m: 0,
            s: 0,
        }

        pauseScreen.classList.remove("d-flex")
        pauseScreen.classList.add("d-none");
        countText.innerText = "3";

        gameScreen.classList.remove("d-flex");
        gameScreen.classList.add("d-none");
        gameOverScreen.classList.remove("d-flex");
        gameOverScreen.classList.add("d-none");
        countdownScreen.classList.remove("d-none");
        countdownScreen.classList.add("d-flex");
        playerText.innerText = usernameInput2.value || usernameInput.value;

        let countdownInterval = setInterval(() => {
            countText.innerText = parseInt(countText.innerText - 1);
            if (countText.innerText == 0) {
                clearInterval(countdownInterval);
                countdownScreen.classList.remove("d-flex");
                countdownScreen.classList.add("d-none");

                state.paused = false;
                state.speed = 4;

                startGame();
            }
        }, 1000)

    } catch (error) {

    }
})