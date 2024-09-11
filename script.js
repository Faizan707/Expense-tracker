let balance = document.getElementById("balance");
let amount = document.getElementById("Amount");
let reason = document.getElementById("Reason");
let income = document.getElementById("Income");
let source = document.getElementById("Source");
let expensebtnsave = document.getElementById("expensebtnsave");
let Incomebtnsave = document.getElementById("Incomebtnsave");
let watchexpense = document.getElementById("watchexpense");
let watchincome = document.getElementById("watchincome");
let incomeList = document.getElementById("incomeList");
let expenseList = document.getElementById("expenseList");

let currentBalance = parseFloat(localStorage.getItem("currentBalance")) || 0.00;
balance.innerHTML = currentBalance.toFixed(2);

let incomeRecords = JSON.parse(localStorage.getItem("incomeRecords")) || [];
let expenseRecords = JSON.parse(localStorage.getItem("expenseRecords")) || [];

const updateBalance = () => {
    balance.innerHTML = currentBalance.toFixed(2);
    localStorage.setItem("currentBalance", currentBalance);
};

const saveToLocalStorage = (key, records) => {
    localStorage.setItem(key, JSON.stringify(records));
};

Incomebtnsave.addEventListener('click', () => {
    let incomeAmount = parseFloat(income.value);
    let incomeSource = source.value;

    if (!isNaN(incomeAmount) && incomeSource) {
        currentBalance += incomeAmount;
        updateBalance();

        incomeRecords.push({ amount: incomeAmount, source: incomeSource });
        saveToLocalStorage("incomeRecords", incomeRecords);
    }

    income.value = '';
    source.value = '';
});

expensebtnsave.addEventListener('click', () => {
    let expenseAmount = parseFloat(amount.value);
    let expenseReason = reason.value;

    if (!isNaN(expenseAmount) && expenseReason) {
        currentBalance -= expenseAmount;
        updateBalance();

        expenseRecords.push({ amount: expenseAmount, reason: expenseReason });
        saveToLocalStorage("expenseRecords", expenseRecords);
    }

    amount.value = '';
    reason.value = '';
});

watchincome.addEventListener('click', () => {
    incomeList.innerHTML = '';
    incomeRecords.forEach((record, index) => {
        let listItem = document.createElement("li");
        listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        listItem.innerHTML = `$${record.amount} - ${record.source} 
            <button class="btn btn-danger btn-sm" onclick="deleteIncome(${index})">Delete</button>`;
        incomeList.appendChild(listItem);
    });
});

watchexpense.addEventListener('click', () => {
    expenseList.innerHTML = ''; 
    expenseRecords.forEach((record, index) => {
        let listItem = document.createElement("li");
        listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        listItem.innerHTML = `$${record.amount} - ${record.reason} 
            <button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button>`;
        expenseList.appendChild(listItem);
    });
});

function deleteIncome(index) {
    incomeRecords.splice(index, 1);
    saveToLocalStorage("incomeRecords", incomeRecords);
    watchincome.click(); 
}

function deleteExpense(index) {
    expenseRecords.splice(index, 1);
    saveToLocalStorage("expenseRecords", expenseRecords);
    watchexpense.click(); 
}