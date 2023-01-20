const mobilemenu = document.querySelector('.mobile-menu')
const navCollapsed = document.querySelector('.nav-collapsed')
mobilemenu.addEventListener('click', function () {
    navCollapsed.classList.toggle('active')
})
const navItem = document.querySelectorAll('.nav-item')
navItem.forEach((e, index) => {
    e.addEventListener('click', function(){
        navCollapsed.classList.remove('active')
    })
})

const nama = document.getElementById('nama')
const email = document.getElementById('email')
const pesan = document.getElementById('pesan')

const reset = document.querySelector('.btn-reset')
reset.addEventListener('click', function(){
    nama.value = ''
    email.value = ''
    pesan.value = ''
})