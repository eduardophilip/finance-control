const sidebar = document.querySelector('.sidebar');
const headerBtn = document.querySelector('.header__btn');
const yearLink = document.querySelectorAll('.sidebar-year__link');
const month = document.querySelectorAll('.sidebar-month__link');



const toggleSidebar = () => {
    if(headerBtn.classList.contains('header__btn--clicked')) {
        sidebar.classList.remove('sidebar--active')
        headerBtn.classList.remove('header__btn--clicked')
    }else {
        sidebar.classList.add('sidebar--active')
        headerBtn.classList.add('header__btn--clicked')
    }
}

const toogleList = () => {
    
    for(let item of yearLink) {
        const parent = item.closest('.sidebar-year');
        const icon = parent.querySelector('.sidebar-year__icon');
        const list = parent.querySelector('.sidebar__list--submenu');
        
    
        item.onclick = (e) => {

            if (e.currentTarget.classList.contains('link--active')) {
                e.currentTarget.classList.remove('link--active');
                yearLink.forEach(link => link.classList.remove('link--active'))
            } else {
                yearLink.forEach(link => link.classList.remove('link--active'))
                e.currentTarget.classList.add('link--active');
            }
            
            // item.classList.toggle('link--active')
            icon.classList.toggle('sidebar-year__icon--rotate');
            list.classList.toggle('sidebar__list--submenu');
        }
    }

}

const handleClickInMonth = (e) => {

    
    if (e.currentTarget.classList.contains('link--active')) {
        e.currentTarget.classList.remove('link--active')
        month.forEach(month => month.classList.remove('link--active'));
    } else {
        month.forEach(month => month.classList.remove('link--active'));
        e.currentTarget.classList.add('link--active')
    }
}

month.forEach(node => node.addEventListener('click', handleClickInMonth))


headerBtn.addEventListener('click', toggleSidebar)
toogleList()


