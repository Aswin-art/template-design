const canvas = document.getElementById('game')
canvas.width = 400
canvas.height = 600
const ctx = canvas.getContext('2d')

function spawnVirus(game){
    let position = {
        x: Math.floor((Math.random() * (game.maxWidth - 0) + 0) / 100) * 100,
        y: random(-200, -50)
    }

    return new Virus(position)
}

function random(min, max){
    return Math.round(Math.random() * (max - 1) + min)
}

class Game{
    constructor(maxWidth, maxHeight) {
        this.maxWidth = maxWidth
        this.maxHeight = maxHeight

        this.keyNotes = [
            new KeyNote({x: 0, y: this.maxHeight}, {x: 100 / 2, y: this.maxHeight - 30}, 100, 'D', 'red'),
            new KeyNote({x: 100, y: this.maxHeight}, {x: 300 / 2, y: this.maxHeight - 30}, 100, 'F', 'red'),
            new KeyNote({x: 200, y: this.maxHeight}, {x: 500 / 2, y: this.maxHeight - 30}, 100, 'J', 'red'),
            new KeyNote({x: 300, y: this.maxHeight}, {x: 700 / 2, y: this.maxHeight - 30}, 100, 'K', 'red')
        ]

        this.bars = [
            new Bar({x: 0, y: this.maxHeight - 100}, 100, 5, 'rgba(255, 255, 255, .7)'),
            new Bar({x: 100, y: this.maxHeight - 100}, 100, 5, 'rgba(255, 255, 255, .7)'),
            new Bar({x: 200, y: this.maxHeight - 100}, 100, 5, 'rgba(255, 255, 255, .7)'),
            new Bar({x: 300, y: this.maxHeight - 100}, 100, 5, 'rgba(255, 255, 255, .7)'),
        ]

        this.reset()
    }

    reset(){
        this.viruses = []
        this.spawnTimeout = null
    }

    isCrashed(object1, object2){

    }

    draw(ctx){
        [...this.viruses, ...this.keyNotes, ...this.bars].forEach((e) => e.draw(ctx))
    }

    update(){
        [...this.viruses, ...this.keyNotes, ...this.bars].forEach((e) => e.draw(ctx))

        if(this.spawnTimeout == null){
            this.spawnTimeout = 1000
            setTimeout(() => {
                this.spawnTimeout = null
                this.viruses.push(spawnVirus(this))
            }, this.spawnTimeout)
        }
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
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        // console.log(ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height))
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.position.y += 3
    }
}

const game = new Game(canvas.width, canvas.height)

let isPaused = true
let timer = 0
let timerInterval = null
let countdown = 0
let countdownInterval = null

function pause(){
    isPaused = true
    countdown = 0
    clearInterval(timerInterval)
    clearInterval(countdownInterval)
}

function unpause(){
    isPaused = false
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

    if(!isPaused){
        requestAnimationFrame(animate)
    }
}

function startCountdown(){
    countdownInterval = setInterval(() => {
        if(countdown == 3){
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
            countdown += 1
            ctx.clearRect(0, 0, game.maxWidth, game.maxHeight)
            ctx.fillStyle = 'white'
            ctx.font = '30px Arial'
            ctx.fillText(countdown, game.maxWidth / 2, game.maxHeight / 2)
        }
    }, 1000)
}

startCountdown()

