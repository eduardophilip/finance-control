const incomeBtn = document.querySelector(".card__btn-income");
const expenseBtn = document.querySelector(".card__btn-expense");
const savingsBtn = document.querySelector(".card__btn-savings");
const modal = document.querySelector(".modal")
const modalHeader = document.querySelector(".modal__header");

const openModalIncome = () => {
    modalHeader.textContent = 'Add income'
    modalHeader.classList.add('modal__header--income')
    modal.classList.toggle('modal--active')
}
const openModalExpense = () => {
    modalHeader.textContent = 'Add Expense'
    modalHeader.classList.add('modal__header--expense')
    modal.classList.toggle('modal--active')
}
const openModalSavings = () => {
    modalHeader.textContent = 'Add Savings'
    modalHeader.classList.add('modal__header--savings')
    modal.classList.toggle('modal--active')
}

incomeBtn.addEventListener("click", openModalIncome)
expenseBtn.addEventListener("click", openModalExpense)
savingsBtn.addEventListener("click", openModalSavings)



