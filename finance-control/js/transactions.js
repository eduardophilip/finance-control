import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const submitTransaction = document.querySelector('.submit-form')


export const Transactions = [ /*How to export this const */ 
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
    const table = document.querySelector('.table__body');
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

const updateBalance = (transactions) => {
    const totalBalanceDisplay = document.querySelector('.card__value--total');
    const incomeBalanceDisplay = document.querySelector('.card__value--income');
    const expenseBalanceDisplay = document.querySelector('.card__value--expense');
    const savingsBalanceDisplay = document.querySelector('.card__value--savings');

    const transactionAmounts = transactions.map(items => items.transaction.amount);

    const totalBalance = transactionAmounts.reduce((accu, currentValue) => accu + currentValue, 0);

    const income = transactionAmounts
        .filter(items => items > 0)
        .reduce((accu, income) => accu + income, 0);

    const expense = () => {
        const expense = []
        for (let transaction of Transactions) {
            if (transaction.type === 'expense') {
                expense.push(transaction)
            }
        }
        const totalexpense = expense.map(items => items.transaction.amount)
        return totalexpense.reduce((accu, value) => accu + value, 0)
    }

    const savings = () => {
        const savings = []
        for ( let transaction of Transactions) {
            if (transaction.type === 'savings') {
                savings.push(transaction)
            }
        }
        const totalSavings = savings.map(items => items.transaction.amount)
        return totalSavings.reduce((accu, value) => accu + value, 0)
    }

    totalBalanceDisplay.textContent = `€ ${totalBalance.toFixed(2)}`
    incomeBalanceDisplay.textContent = `€ ${income.toFixed(2)}`
    expenseBalanceDisplay.textContent = `€ ${expense().toFixed(2)}`
    savingsBalanceDisplay.textContent = `€ ${savings().toFixed(2)}`

}

const updateChartTotal = () => {
    const chartTotal = document.querySelector('.chart-total');
    
    const doughnutChart = new Chart(chartTotal, {
        type: 'doughnut',
        data: {
            labels: ['INC', 'EXP', 'SAV' ],
            datasets: [{
                label: 'Income',
                data: [800, -250, -60],
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

const addTransaction = () => {
    
}

submitTransaction.addEventListener('submit', addTransaction)

const init = () => {
    Transactions.forEach(displayInDOM);
    updateBalance(Transactions)
    updateChartTotal()  
}

init()
