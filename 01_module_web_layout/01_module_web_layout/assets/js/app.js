const navToggle = document.getElementById('nav-toggle');

navToggle.addEventListener('click', () => {
    const navContent = document.querySelector('.nav-content')
    if(navContent.classList.contains('nav-active')) {
        navContent.classList.remove('nav-active');
    } else {
        navContent.classList.add('nav-active');
    }
})

// const totalCase = document.getElementById('total-case');
// const totaldead = document.getElementById('total-dead');
// const totalrecovr = document.getElementById('total-recover');


// const ContentTotalCase = document.getElementById('total-case-content');
// const ContentTotaldead = document.getElementById('total-dead-content');
// const ContentTotalrecovr = document.getElementById('total-recover-content');

// totalCase.addEventListener('click', (e) => {
//     e.preventDefault();

//     if(!ContentTotaldead.classList.contains('hidden') || !ContentTotalrecovr.classList.contains('hidden')) {
//         ContentTotaldead.classList.add('hidden');
//         ContentTotalrecovr.classList.add('hidden');
//     }
//     ContentTotalCase.classList.add('show');
// })

// totaldead.addEventListener('click', (e) => {
//     e.preventDefault();
//     if(!ContentTotalCase.classList.contains('hidden') || !ContentTotalrecovr.classList.contains('hidden')) {
//         ContentTotalCase.classList.add('hidden');
//         ContentTotalrecovr.classList.add('hidden');
//     }
//     ContentTotaldead.classList.add('show');
// })

// totalrecovr.addEventListener('click', (e) => {
//     e.preventDefault();
//     if(!ContentTotalCase.classList.contains('hidden') || !ContentTotaldead.classList.contains('hidden')) {
//         ContentTotalCase.classList.add('hidden');
//         ContentTotaldead.classList.add('hidden');
//     }
//     ContentTotaldead.classList.add('show');
// })