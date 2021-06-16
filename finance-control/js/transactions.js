import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
// import { closeModal } from 'modal.js'

const table = document.querySelector('.table__body');
const submitTransaction = document.querySelector('.modal__submit-form')


const Transactions = [ /*How to export this const */ 
    {
        type: 'income',
        transaction: {
            name: 'Salário',
            amount: 800,
            date: '12/29/2020'
        }
    },
    {
        type: 'expense',
        transaction: {
            name: 'Aluguel',
            amount: -200,
            date: '01/02/2021'
        }
    },
    {
        type: 'expense',
        transaction: {
            name: 'luz',
            amount: -50,
            date: '01/02/2021'
        }
    },
    {
        type: 'savings',
        transaction: {
            name: 'Savings',
            amount: -50,
            date: '01/02/2021'
        }
    },
    {
        type: 'savings',
        transaction: {
            name: 'Savings',
            amount: -10,
            date: '01/02/2021'
        }
    }
];

const displayInDOM = (Transactions) => {
   
    const tr = document.createElement('tr');
    tr.classList.add('table__body-tr', `table__body--${Transactions.type}`)
    table.appendChild(tr);

    tr.innerHTML = `
        <td>${Transactions.transaction.name}</td>
        <td>€ ${Transactions.transaction.amount.toFixed(2)}</td>
        <td>${Transactions.transaction.date}</td>
        <td class="table__body-icons">
            <img src="/btn-delete.613f7c55.svg" alt="btn-delete">
            <img src="/edit.ae19839e.svg" alt="btn-edit">
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

    totalBalanceDisplay.textContent = `€ ${totalBalance().toFixed(2)}`
    incomeBalanceDisplay.textContent = `€ ${sumIncome().toFixed(2)}`
    expenseBalanceDisplay.textContent = `€ ${sumExpense().toFixed(2)}`
    savingsBalanceDisplay.textContent = `€ ${sumSavings().toFixed(2)}`

}

const updateChartTotal = () => {
    const chartTotal = document.querySelector('.chart-total');
    
    const doughnutChart = new Chart(chartTotal, {
        type: 'doughnut',
        data: {
            labels: ['INC', 'EXP', 'SAV' ],
            datasets: [{
                label: 'Income',
                data: [sumIncome(), sumExpense(), sumSavings()],
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
    table.innerHTML = ''
    Transactions.forEach(displayInDOM);
    updateBalance()
    updateChartTotal()  
}

init()

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
    e.preventDefault() 
    const classNameClicked = e.target.classList[0]
    let typeTransaction = ''
    console.log(classNameClicked)

    const nameTransaction = document.getElementById('description');
    const amount = document.getElementById('amount');
    const date = document.getElementById('date');

    /* const classNames = ['modal__input-name--income', 'modal__input-name--expense', 'modal__input-name--savings']; */

    if ( classNameClicked === 'modal__submit-form--income') {
        typeTransaction = 'income'
    } else if (classNameClicked === 'modal__submit-form--expense') {
        typeTransaction = 'expense'
    } else {
        typeTransaction = 'savings'
    }

    console.log(typeTransaction)

    Transactions.push({
        type: typeTransaction,
        transaction: {
            name: nameTransaction.value,
            amount: Number(amount.value),
            date: date.value
        }
    })

    nameTransaction.value = ''
    amount.value = ''
    date.value = ''

    console.log(Transactions)

    closeModalSubmit()
    init()

}

submitTransaction.addEventListener('submit', addTransaction)


