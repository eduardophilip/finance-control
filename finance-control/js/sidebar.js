const sidebar = document.querySelector('.sidebar');
const headerBtn = document.querySelector('.header__btn');
const icon = document.querySelector('.sidebar-year__icon');
const list = document.querySelector('.sidebar__list--submenu');

const yearLink = document.querySelectorAll('.sidebar-year__link')

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
        icon.classList.toggle('sidebar-year__icon--rotate');
        list.classList.toggle('sidebar__list--submenu');
    }
}
