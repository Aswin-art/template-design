const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const slides = document.querySelectorAll('.slide')
const toggle = document.getElementById('toggle')
const navbar = document.querySelector('.navbar')
const navbarM = document.querySelector('.navbar_mobile')

window.addEventListener('scroll', function() {
    navbar.classList.toggle('active', scrollY > 10)
    navbarM.classList.toggle('active', scrollY > 10)
})

let current = 1

function slideShow() {
    slides.forEach(slide => {slide.style.display = 'none'})
    if(current > slides.length) {
        current = 1
    }

    if(current < 1) {
        current = slides.length
    }

    slides[current - 1].style.display = 'block'
}

prev.addEventListener('click', function() {
    current += 1
    slideShow()
})

next.addEventListener('click', function() {
    current -= 1
    slideShow()
})


slideShow()

toggle.addEventListener('click', handleNav)

function handleNav() {
    document.querySelector('.nav').classList.toggle('active')
}