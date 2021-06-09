const sidebar = document.querySelector('.sidebar');
const headerBtn = document.querySelector('.header__btn');
const icon = document.querySelector('.sidebar-year__icon');
const list = document.querySelector('.sidebar__list--dropdown');

const yearLink = document.querySelectorAll('.sidebar-year__link')
        /* .forEach(item => item.addEventListener('click', () => {
            list.classList.toggle('sidebar__list--dropdown');
            icon.classList.toggle('sidebar-year__icon--rotate')
        })) */


const toggleSidebar = () => {
    if(headerBtn.classList.contains('header__btn--clicked')) {
        sidebar.classList.remove('sidebar--active')
        headerBtn.classList.remove('header__btn--clicked')
    }else {
        sidebar.classList.add('sidebar--active')
        headerBtn.classList.add('header__btn--clicked')
    }
}

headerBtn.addEventListener('click', toggleSidebar)

for(let item of yearLink) {
   
    
    item.onclick = () => {
        list.classList.toggle('sidebar__list--dropdown');
        icon.classList.toggle('sidebar-year__icon--rotate')
    }
}
