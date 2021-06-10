const incomeBtn = document.querySelector(".card__btn-income");
const expenseBtn = document.querySelector(".card__btn-expense");
const savingsBtn = document.querySelector(".card__btn-savings");
const modal = document.querySelector(".modal")
const modalHeader = document.querySelector(".modal__header");
const inputName = document.getElementById('description')
const inputAmount = document.getElementById('amount')
const inputDate = document.getElementById('date')

const openModalIncome = () => {
    modalHeader.textContent = 'Add income';
    modalHeader.classList.add('modal__header--income');

    inputName.classList.add('modal__input-name--income');
    inputAmount.classList.add('modal__input-amount--income');
    inputDate.classList.add('modal__input-date--income');

    modal.classList.toggle('modal--active')

}
const openModalExpense = () => {
    modalHeader.textContent = 'Add Expense'
    modalHeader.classList.add('modal__header--expense');

    inputName.classList.add('modal__input-name--expense');
    inputAmount.classList.add('modal__input-amount--expense');
    inputDate.classList.add('modal__input-date--expense');

    modal.classList.toggle('modal--active')
}
const openModalSavings = () => {
    modalHeader.textContent = 'Add Savings'
    modalHeader.classList.add('modal__header--savings')

    inputName.classList.add('modal__input-name--savings');
    inputAmount.classList.add('modal__input-amount--savings');
    inputDate.classList.add('modal__input-date--savings');

    modal.classList.toggle('modal--active')
}

incomeBtn.addEventListener("click", openModalIncome)
expenseBtn.addEventListener("click", openModalExpense)
savingsBtn.addEventListener("click", openModalSavings)



