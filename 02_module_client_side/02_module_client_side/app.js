// 68 70 74 75
const buttonD = document.getElementById('d')
const buttonF = document.getElementById('f')
const buttonJ = document.getElementById('j')
const buttonK = document.getElementById('k')
const timeBoard = document.getElementById('time')
const scoreBoard = document.getElementById('score')
const failBoard = document.getElementById('fail')
const timeOver = document.getElementById('time_over')
const totalScore = document.getElementById('total_score')
const gameoverBoard = document.querySelector('.gameover')
const userInput = document.getElementById('user')
const playBtn = document.getElementById('play')
const preload = document.querySelector('.preloader')
const playerBoard = document.getElementById('player')
const counting = document.querySelector('.counting')
const countBoard = document.getElementById('count')
const nameBoard = document.getElementById('name')

const virusImage = new Image()
virusImage.src = 'images/virus.png'

var canvas = document.getElementById('game')
var ctx = canvas.getContext('2d')

canvas.width = canvas.scrollWidth
canvas.height = canvas.scrollHeight

var cW = canvas.width
var cH = canvas.height

var playerUser = localStorage.getItem("user")

function Counting() {
    counting.style.display = 'block'
    let count = 3
    setInterval(() => {
        count -= 1
        countBoard.innerText = count
        if(count < 1) {
            countBoard.innerText = 'GO!'
            clearInterval()
            setTimeout(() => {counting.style.display = 'none'}, 1000)
        }
    }, 1000)
}

if(playerUser) {
    preload.style.display = 'none'
    Counting()
    setTimeout(() => {
        gamePlay()
    }, 4000)
}

play.addEventListener('click', Start)

function Start() {
    let user = userInput.value
    if(user.length < 1) {
        return alert('isi username anda')
    }
    localStorage.setItem('user', user)
    window.location.reload()
    preload.style.display = 'none'
    Counting()
    setTimeout(() => {
        gamePlay()
    }, 4000)
}   

function gamePlay() {
    var score = 0
    var fail = 0
    var times = 0

    playerBoard.innerText = "Player: "+playerUser

    var injects = []

    window.addEventListener('keydown', function(e) {
        let code = e.keyCode
        if(code == 68) {
            buttonD.style.backgroundColor = "#0084ff"
            setTimeout(() => {buttonD.style.backgroundColor = "#42fa6a"}, 100)
            injects.push({"x": 25, "y": 300})
        }
        if(code == 70) {
            buttonF.style.backgroundColor = "#0084ff"
            setTimeout(() => {buttonF.style.backgroundColor = "#43faa5"}, 100)
            injects.push({"x": 125, "y": 300})
        }
        if(code == 74) {
            buttonJ.style.backgroundColor = "#0084ff"
            setTimeout(() => {buttonJ.style.backgroundColor = "#42fa6a"}, 100)
            injects.push({"x": 225, "y": 300})
        }
        if(code == 75) {
            buttonK.style.backgroundColor = "#0084ff"
            setTimeout(() => {buttonK.style.backgroundColor = "#43faa5"}, 100)
            injects.push({"x": 325, "y": 300})
        }
        if(code == 27) {
            var choice = confirm('Game di Pause. Lanjut ?')
            if(choice == false) {
                restart()
            }
        }
    })

    var viruses = []

    function addVirus() {
        const pattern = [25, 125, 225, 325]
        var randomNum = Math.floor(Math.random() * 4)
        viruses.push({"x": pattern[randomNum], "y": 0, "w": 50, "h": 50})
    }

    addVirus()

    let timing = 0

    function renderVirus() {
        for(let i = 0; i < viruses.length; i++) {
            let virus = viruses[i]
            ctx.drawImage(virusImage, virus.x, virus.y++,virus.w, virus.h )
        }

        timing ++ 
        
        if(timing == 100) {
            addVirus()
            timing = 0
        }
    }

    function destroy() {
        for(let i = 0; i < injects.length; i++) {
            var inj = injects[i]
            for(let a = 0; a < viruses.length; a++) {
                var vrs = viruses[a]
                if(inj.y < vrs.y-50 && inj.x == vrs.x) {
                    ctx.drawImage(virusImage, vrs.x, vrs.y, vrs.w, vrs.h-30)
                    setTimeout(() => {
                        viruses.splice(a, 1)
                    }, 100)
                    injects.splice(i, 1)
                    score += 1
                    scoreBoard.innerText = "Score: "+score
                } else {
                    injects.splice(i, 1)
                }
            }
        }
    }

    function check() {
        for(let a = 0; a < viruses.length; a++) {
            var vrs = viruses[a]
            if(vrs.y == 550) {
                fail += 1
                failBoard.innerText = "Fail: "+fail
                if(fail == 5) {
                    gameOver(score)
                }
            }
        }
    }

    function animation() {
        ctx.save()
        ctx.clearRect(0,0,cW,cH)
        renderVirus()
        destroy()
        check()
        ctx.restore()
    }

    function timer() {
        times += 1
        timeBoard.innerText = "Time: "+times
    }

    var animationInterval = setInterval(animation, 15)
    var timeInterval = setInterval(timer, 1000)


    function gameOver(score) {
        timeOver.innerText = "Duration: "+times+" second"
        totalScore.innerText = "Final Score: "+score
        nameBoard.innerText = "Player: "+playerUser
        clearInterval(animationInterval)
        clearInterval(timeInterval)
        gameoverBoard.style.display = "block"
    }
}

function restart() {
    window.location.reload()
}

function quit() {
    window.location.reload()
    localStorage.removeItem('user')
}