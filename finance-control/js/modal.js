const incomeBtn = document.querySelector(".card__btn-income");
const expenseBtn = document.querySelector(".card__btn-expense");
const savingsBtn = document.querySelector(".card__btn-savings");
const modal = document.querySelector(".modal")
const modalHeader = document.querySelector(".modal__header");

const inputName = document.getElementById('description');
const inputAmount = document.getElementById('amount');
const inputDate = document.getElementById('date');

const submitForm = document.querySelector('.modal__submit-form')

const openModalIncome = () => {
    modalHeader.textContent = 'Add income';
    modalHeader.classList.add('modal__header--income');

    submitForm.classList.remove('modal__submit-form');
    submitForm.classList.add('modal__submit-form--income');

    modal.classList.add('modal--active')

}
const openModalExpense = () => {
    modalHeader.textContent = 'Add Expense'
    modalHeader.classList.add('modal__header--expense');

    submitForm.classList.remove('modal__submit-form');
    submitForm.classList.add('modal__submit-form--expense');

    modal.classList.add('modal--active')
}
const openModalSavings = () => {
    modalHeader.textContent = 'Add Savings'
    modalHeader.classList.add('modal__header--savings')

    submitForm.classList.remove('modal__submit-form');
    submitForm.classList.add('modal__submit-form--savings');

    modal.classList.add('modal--active')

    inputName.value = 'Savings'
    inputName.setAttribute("disabled", "disabled")
}

export const closeModal = (e) => {
    const classClicked = e.target.classList[0];

    const classNames = ['modal', 'modal__button-cancel']
    const classNameExists = classNames.some(className => className === classClicked);

 
    if (classNameExists) {

        modal.classList.remove('modal--active');
        modalHeader.textContent = '';
    
        modalHeader.classList.remove('modal__header--income');
        modalHeader.classList.remove('modal__header--expense');
        modalHeader.classList.remove('modal__header--savings');

        submitForm.classList.add('modal__submit-form');
        submitForm.classList.remove('modal__submit-form--income');
        submitForm.classList.remove('modal__submit-form--expense');
        submitForm.classList.remove('modal__submit-form--savings');

        inputName.value = ''
        inputAmount.value = ''
        inputDate.value = ''

        inputName.removeAttribute("disabled")
    }

    

}



incomeBtn.addEventListener("click", openModalIncome)
expenseBtn.addEventListener("click", openModalExpense)
savingsBtn.addEventListener("click", openModalSavings)

modal.addEventListener('click', closeModal)




