import { Chart, registerables } from 'chart.js';
import { Transactions } from './data/mock-transactions';
import IconDelete from '../img/btn-delete.svg';
import IconEdit from '../img/edit.svg';
import { openModalIncome, openModalExpense, openModalSavings, closeModal, closeModalSubmit } from './modal'

Chart.register(...registerables);

const nameTransaction = document.getElementById('description');
const amount = document.getElementById('amount');
const date = document.getElementById('date');

/* const splittedDate = date.value.split("-");
const dateFormatted = `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}` */

const table = document.querySelector('.table__body');
const submitTransaction = document.querySelector('.modal__submit-form');
let doughnutChart;

const removeTransactions = index => {
    Transactions.splice(index, 1);
    init();
};
window.removeTransactions = removeTransactions;


const updateTable = (Transactions, index) => {
   
    const tr = document.createElement('tr');
    tr.classList.add('table__body-tr', `table__body--${Transactions.type}`)
    table.appendChild(tr);

    tr.innerHTML = `
        <td>${Transactions.transaction.name}</td>
        <td>€ ${Transactions.transaction.amount.toFixed(2)}</td>
        <td>${Transactions.transaction.date}</td>
        <td class="table__body-icons">
            <img onclick="removeTransactions(${index})" src="${IconDelete}" alt="btn-delete">
            <img class="table__btn-edit table__btn-edit--${Transactions.type}" data-id="${index}" src="${IconEdit}" alt="btn-edit">
        </td>`

        
}

const sumIncome = () =>  {
    const income = []
    for (let transaction of Transactions) {
        if(transaction.type === 'income') {
            income.push(transaction)
        }
    }    

    const totalIncome = income.map(items => items.transaction.amount)
    return totalIncome.reduce((accu, value) => accu + value, 0);

}

const sumExpense = () => {
    const expense = []
    for (let transaction of Transactions) {
        if (transaction.type === 'expense') {
            expense.push(transaction)
        }
    }
    const totalexpense = expense.map(items => items.transaction.amount)
    return totalexpense.reduce((accu, value) => accu + value, 0)
}
const sumSavings = () => {
    const savings = []
    for ( let transaction of Transactions) {
        if (transaction.type === 'savings') {
            savings.push(transaction)
        }
    }
    const totalSavings = savings.map(items => items.transaction.amount)
    return totalSavings.reduce((accu, value) => accu + value, 0)
}

const totalBalance = () => {
    const transactionAmounts = Transactions.map(items => items.transaction.amount);
    return transactionAmounts.reduce((accu, currentValue) => accu + currentValue, 0);
} 

const updateBalance = () => {
    const totalBalanceDisplay = document.querySelector('.card__value--total');
    const incomeBalanceDisplay = document.querySelector('.card__value--income');
    const expenseBalanceDisplay = document.querySelector('.card__value--expense');
    const savingsBalanceDisplay = document.querySelector('.card__value--savings');

    totalBalanceDisplay.textContent = `€ ${totalBalance().toFixed(2)}`;
    incomeBalanceDisplay.textContent = `€ ${sumIncome().toFixed(2)}`;
    expenseBalanceDisplay.textContent = `€ ${sumExpense().toFixed(2)}`;
    savingsBalanceDisplay.textContent = `€ ${sumSavings().toFixed(2)}`;

}

const updateChart = () => {
    doughnutChart.data.datasets[0].data = [sumIncome(), sumExpense(), sumSavings()];
    doughnutChart.update();
}

const createChart = () => {
    const chartTotal = document.querySelector('.chart-total');
    doughnutChart = new Chart(chartTotal, {
        type: 'doughnut',
        data: {
            labels: ['INC', 'EXP', 'SAV' ],
            datasets: [{
                label: 'Income',
                data: [],
                backgroundColor: [
                    '#0bad39',
                    '#ff0000',
                    '#00c3ff'
                ],
                hoverOffset: 4
            }]
        },
        options: {
            plugins:{
                legend: {
                    display:  true,
                    position: 'bottom'
                }

            }
        }
    
    });
}

const init = () => {
    table.innerHTML = '';
    Transactions.forEach(updateTable);
    updateBalance();
    updateChart();
}

createChart();
init();


const addTransaction = (e) => {
    e.preventDefault() ;
    const classNameClicked = e.target.classList[0];
    let typeTransaction = '';
    const isToEditTransaction = submitTransaction.classList.contains('modal__submit-form--edit')

    if ( classNameClicked === 'modal__submit-form--income') {
        typeTransaction = 'income';
    } else if (classNameClicked === 'modal__submit-form--expense') {
        typeTransaction = 'expense'
        amount.value *= -1
    } else {
        typeTransaction = 'savings'
        amount.value *= -1
        nameTransaction.removeAttribute("disabled")
    }

    if (isToEditTransaction) {
        editTransactions(indexTtransaction)
    } else {
        Transactions.push({
            type: typeTransaction,
            transaction: {
                name: nameTransaction.value,
                amount: Number(amount.value),
                date: date.value
            }
        });
    }

    closeModalSubmit();
    init();
}

const setValuesInput = index => {
    nameTransaction.value = Transactions[index].transaction.name;
    amount.value = Transactions[index].transaction.amount;
    if (amount.value < 0) {
        amount.value = Transactions[index].transaction.amount * -1
    } else {
        amount.value = Transactions[index].transaction.amount
    }
    date.value = Transactions[index].transaction.date
}

const editTransactions = index => {
        Transactions[index].transaction.name = nameTransaction.value;
        Transactions[index].transaction.amount = Number(amount.value);
        Transactions[index].transaction.date = date.value;
}

const setEnvironmentToEdit  = (e) => {
    const btnEdit = e.target.closest('.table__btn-edit');
    let indexTtransaction = parseInt(btnEdit.dataset.id);
    window.indexTtransaction = indexTtransaction

    const isBtnEditIncome = btnEdit.classList.contains('table__btn-edit--income');
    
        if (isBtnEditIncome){
            openModalIncome();
            submitTransaction.classList.add('modal__submit-form--edit');
            setValuesInput(indexTtransaction)
        } else if (btnEdit.classList.contains('table__btn-edit--expense')) {
            openModalExpense()
            submitTransaction.classList.add('modal__submit-form--edit');
            setValuesInput(indexTtransaction)
        } else {
            openModalSavings()
            submitTransaction.classList.add('modal__submit-form--edit');
            setValuesInput(indexTtransaction)
        }
    
}

submitTransaction.addEventListener('submit', addTransaction);
table.addEventListener('click', setEnvironmentToEdit)


