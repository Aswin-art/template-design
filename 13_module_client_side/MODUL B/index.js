const canvas = document.getElementById('game')
canvas.width = 400
canvas.height = 600
const ctx = canvas.getContext('2d')

const state = {
    OVER: 0,
    RUNNING: 1
}

function spawnVirus(game){
    let position = {
        x: Math.floor((Math.random() * (game.maxWidth - 0) + 0) / 100) * 100,
        y: random(-200, -50)
    }

    return new Virus(position)
}

function random(min, max){
    return Math.round(Math.random()- 1 * (max ) + min)
}

class Game{
    constructor(maxWidth, maxHeight) {
        this.maxWidth = maxWidth
        this.maxHeight = maxHeight

        this.keyNotes = [
            new KeyNote({x: 0, y: this.maxHeight - 100}, {x: 100 / 2, y: this.maxHeight - 30}, 100, 'D', 'rgb(0, 50, 100)'),
            new KeyNote({x: 100, y: this.maxHeight - 100}, {x: 300 / 2, y: this.maxHeight - 30}, 100, 'F', 'rgb(0,42,85)'),
            new KeyNote({x: 200, y: this.maxHeight - 100}, {x: 500 / 2, y: this.maxHeight - 30}, 100, 'J', 'rgb(0, 50, 100)'),
            new KeyNote({x: 300, y: this.maxHeight - 100}, {x: 700 / 2, y: this.maxHeight - 30}, 100, 'K', 'rgb(0,42,85)')
        ]

        this.bars = [
            new Bar({x: 0, y: this.maxHeight - 105}, 100, 8, 'rgba(255, 255, 255, .7)'),
            new Bar({x: 100, y: this.maxHeight - 105}, 100, 8, 'rgba(255, 255, 255, .7)'),
            new Bar({x: 200, y: this.maxHeight - 105}, 100, 8, 'rgba(255, 255, 255, .7)'),
            new Bar({x: 300, y: this.maxHeight - 105}, 100, 8, 'rgba(255, 255, 255, .7)'),
        ]

        this.dangers = [
            new Danger({x: 0, y: this.maxHeight - 300}, 100, 195, 'rgba(255, 0, 0, .5)'),
            new Danger({x: 100, y: this.maxHeight - 300}, 100, 195, 'rgba(255, 0, 0, .5)'),
            new Danger({x: 200, y: this.maxHeight - 300}, 100, 195, 'rgba(255, 0, 0, .5)'),
            new Danger({x: 300, y: this.maxHeight - 300}, 100, 195, 'rgba(255, 0, 0, .5)'),
        ]

        this.input = new Input(this)

        this.reset()
    }

    reset(){
        this.viruses = []
        this.spawnTimeout = null
        this.score = 0
        this.fail = 0
    }

    isCrashed(object1, object2){
        return object1.position.y + object1.height + 30 > object2.position.y && (object1.position.x === object2.position.x && object1.position.x + object1.width == object2.position.x + object2.width)
    }

    draw(ctx){
        [...this.dangers, ...this.viruses, ...this.keyNotes, ...this.bars].forEach((e) => e.draw(ctx))
    }

    update(){
        [...this.viruses, ...this.dangers, ...this.keyNotes, ...this.bars].forEach((e) => e.update(ctx))
        // const speedMultiplier = speedProgress / 100 / 2

        if(this.fail >= 5){
            isPaused = true
            document.querySelector('.gameover').style.display = 'flex'
            document.querySelector('.totalScore').innerHTML = this.score
            document.querySelector('.totalTime').innerHTML = timer
        }

        if(this.spawnTimeout == null){
            this.spawnTimeout = 1000
            setTimeout(() => {
                this.spawnTimeout = null
                this.viruses.push(spawnVirus(this))
            }, this.spawnTimeout)
        }

        this.viruses.forEach((virus, index) => {
            if(virus.position.y + virus.height > this.maxHeight - 50 ){
                this.viruses.splice(index, 1)
                this.fail += 1
                setFail()
            }
        })
    }
}

class Danger{
    constructor(position, width, height, color) {
        this.position = position
        this.width = width
        this.height = height
        this.color = color
    }

    draw(ctx){
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){

    }
}

class Bar{
    constructor(position, width, height, color) {
        this.position = position
        this.width = width
        this.height = height
        this.color = color
    }

    draw(ctx){
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){

    }
}

class KeyNote{
    constructor(position, positionText, size, text, color) {
        this.position = position
        this.positionText = positionText
        this.width = size
        this.height = size
        this.text = text
        this.color = color
    }

    draw(ctx){
        console.log()
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        ctx.font = '20px Arial'
        ctx.fillStyle = 'white'
        ctx.fillText(this.text, this.positionText.x, this.positionText.y)
    }

    update(){

    }
}

class Virus{
    constructor(position) {
        this.position = position
        this.width = 100
        this.height = 100
        this.image = document.getElementById('virus')
    }

    draw(ctx){

        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.position.y += 3
    }
}

class Input{
    constructor(game) {
        document.addEventListener('keydown', e => {
            e.preventDefault()
            const gradient = ctx.createLinearGradient(0, game.maxHeight - 100, 0, game.maxHeight - 110)
            gradient.addColorStop(0, 'white')
            gradient.addColorStop(1, 'transparent')
            switch (e.key) {
                case 'd':
                    game.viruses.forEach((virus, index) => {
                        if(game.isCrashed(virus, game.dangers[0])){
                            game.viruses.splice(index, 1)
                            game.score += 1
                            setScore()
                        }
                    })
                    game.bars[0].color = gradient
                    break;
                case 'f':
                    game.viruses.forEach((virus, index) => {
                        if(game.isCrashed(virus, game.dangers[1])){
                            game.viruses.splice(index, 1)
                            game.score += 1
                            setScore()
                        }
                    })
                    game.bars[1].color = gradient
                    break;
                case 'j':
                    game.viruses.forEach((virus, index) => {
                        if(game.isCrashed(virus, game.dangers[2])){
                            game.viruses.splice(index, 1)
                            game.score += 1
                            setScore()
                        }
                    })
                    game.bars[2].color = gradient
                    break;
                case 'k':
                    game.viruses.forEach((virus, index) => {
                        if(game.isCrashed(virus, game.dangers[3])){
                            game.viruses.splice(index, 1)
                            game.score += 1
                            setScore()
                        }
                    })
                    game.bars[3].color = gradient
                    break;
                case 'Escape':
                    if(isPaused){
                        unpause()
                    }else{
                        pause()
                    }
                    break;
                // case e.ctrlKey && '=':
                //         speedProgress += 10
                //         setSpeed()
                //     break;
                // case e.ctrlKey && '-':
                //         speedProgress -= 10
                //         setSpeed()
                //     break;
                default:
                    break;
            }
        })

        document.addEventListener('keyup', e => {
            switch (e.key) {
                case 'd':
                    game.bars[0].color = 'rgba(255, 255, 255, .7)'
                    break;
                case 'f':
                    game.bars[1].color = 'rgba(255, 255, 255, .7)'
                    break;
                case 'j':
                    game.bars[2].color = 'rgba(255, 255, 255, .7)'
                    break;
                case 'k':
                    game.bars[3].color = 'rgba(255, 255, 255, .7)'
                    break;
                default:
                    break;
            }
        })
    }
}

const game = new Game(canvas.width, canvas.height)

let isPaused = false
let timer = 0
let timerInterval = null
let countdown = 4
let countdownInterval = null

// let speedProgress = document.getElementById('speedProgress').value
//
// function setSpeed(){
//     document.getElementById('speedProgress').value = speedProgress
// }

function restartGame(){
    clearInterval(timerInterval)
    clearInterval(countdownInterval)
    isPaused = true
    timer = 0
    timerInterval = 0
    countdown = 4
    countdownInterval = null
    document.querySelector('.modal').style.display = 'none'
    document.querySelector('.gameover').style.display = 'none'
    game.reset()
    setScore()
    setFail()
    startCountdown()
}

const btnRestart = document.querySelector('.restart')
// console.log(btnRestart)
btnRestart.addEventListener('click', function(){
    restartGame()
})

const restartGameover = document.querySelector('.restartGameOver')
restartGameover.addEventListener('click', function(){
    restartGame()
})


function setScore(){
    document.getElementById('score').innerHTML = game.score
}

function setFail() {
    document.getElementById('fail').innerHTML = game.fail
}

function pause(){
    isPaused = true
    countdown = 4
    clearInterval(timerInterval)
    clearInterval(countdownInterval)

    document.querySelector('.modal').style.display = 'flex'
}

function unpause(){
    isPaused = false
    document.querySelector('.modal').style.display = 'none'
    startCountdown()
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.draw(ctx)
    game.update()

    ctx.beginPath()
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 1
    ctx.moveTo(100, 0)
    ctx.lineTo(100, game.maxHeight - 100)

    ctx.moveTo(200, 0)
    ctx.lineTo(200, game.maxHeight - 100)

    ctx.moveTo(300, 0)
    ctx.lineTo(300, game.maxHeight - 100)
    ctx.stroke()
    localStorage.setItem('name', 'jonathan')

    if(!isPaused){
        requestAnimationFrame(animate)
    }
}

function startCountdown(){
    countdownInterval = setInterval(() => {
        if(countdown == 0){
            clearInterval(countdownInterval)
            isPaused = false
            timerInterval = setInterval(() => {
                if(!isPaused){
                    timer += 1
                    document.getElementById('timer').innerHTML = timer
                }
            }, 1000)

            requestAnimationFrame(animate)
        }else{
            countdown -= 1
            ctx.clearRect(0, 0, game.maxWidth, game.maxHeight)
            ctx.fillStyle = 'white'
            ctx.font = '30px Arial'
            ctx.fillText(countdown, game.maxWidth / 2, game.maxHeight / 2)
        }
    }, 1000)
}

startCountdown()

