import { Chart, registerables } from 'chart.js';
import { Transactions } from './data/mock-transactions';

import IconDelete from '../img/btn-delete.svg';
import IconEdit from '../img/edit.svg';

Chart.register(...registerables);
// import { closeModal } from 'modal.js'

const table = document.querySelector('.table__body');
const submitTransaction = document.querySelector('.modal__submit-form');
let doughnutChart;

const updateTable = (Transactions) => {
   
    const tr = document.createElement('tr');
    tr.classList.add('table__body-tr', `table__body--${Transactions.type}`)
    table.appendChild(tr);

    tr.innerHTML = `
        <td>${Transactions.transaction.name}</td>
        <td>€ ${Transactions.transaction.amount.toFixed(2)}</td>
        <td>${Transactions.transaction.date}</td>
        <td class="table__body-icons">
            <img src="${IconDelete}" alt="btn-delete">
            <img src="${IconEdit}" alt="btn-edit">
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

const closeModalSubmit = (e) => {
    const modal = document.querySelector(".modal")
    const modalHeader = document.querySelector(".modal__header");

    modal.classList.remove('modal--active');
        modalHeader.textContent = '';
    
        modalHeader.classList.remove('modal__header--income');
        modalHeader.classList.remove('modal__header--expense');
        modalHeader.classList.remove('modal__header--savings');

        submitTransaction.classList.add('modal__submit-form');
        submitTransaction.classList.remove('modal__submit-form--income');
        submitTransaction.classList.remove('modal__submit-form--expense');
        submitTransaction.classList.remove('modal__submit-form--savings');

}

const addTransaction = (e) => {
    e.preventDefault() ;
    const classNameClicked = e.target.classList[0];
    let typeTransaction = '';

    const nameTransaction = document.getElementById('description');
    const amount = document.getElementById('amount');
    const date = document.getElementById('date');


    if ( classNameClicked === 'modal__submit-form--income') {
        typeTransaction = 'income'
    } else if (classNameClicked === 'modal__submit-form--expense') {
        typeTransaction = 'expense'
    } else {
        typeTransaction = 'savings'
    }

    Transactions.push({
        type: typeTransaction,
        transaction: {
            name: nameTransaction.value,
            amount: Number(amount.value),
            date: date.value
        }
    });

    nameTransaction.value = '';
    amount.value = '';
    date.value = '';

    closeModalSubmit();
    init();

}

submitTransaction.addEventListener('submit', addTransaction);


