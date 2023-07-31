const budgetInputBar = document.getElementById("budget-input-bar")
const productInputBar = document.getElementById("product-input-bar")
const expensesInputBar = document.getElementById("expenses-input-bar")
const budgetButton = document.getElementById("budget-button")
const expensesButton = document.getElementById("expenses-button")
const budgetErrorMessage = document.getElementById("budget-error-message")
const productErrorMessage = document.getElementById("product-error-message")
const productCostErrorMessage = document.getElementById(
    "product-cost-error-message"
)
const budgetAmount = document.getElementById("budget-amount")
const expensesAmount = document.getElementById("expenses-amount")
const balanceAmount = document.getElementById("balance-amount")
const expensesListSection = document.getElementById("expense-list-section")
let tempAmount = 0;

//Set Budget Part
const setBudgetTotal = () => {
    tempAmount = budgetInputBar.value
    //empty or negative input
    if (tempAmount === "" || tempAmount < 0) {
        budgetErrorMessage.classList.remove("hide")
        budgetInputBar.value = ""
    } else {
        budgetErrorMessage.classList.add("hide")
        //Set Budget
        budgetAmount.innerHTML = tempAmount
        //Set Balance
        balanceAmount.innerText = tempAmount - expensesAmount.innerText
        //Clear Input Box
        budgetInputBar.value = ""
    }
}


//clicking the budget button
budgetButton.addEventListener("click", () => setBudgetTotal())

//hitting enter after typing value in budget input bar
budgetInputBar.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault()
        budgetButton.click()
    }
})

//removing error message when clicking input bar
budgetInputBar.addEventListener("click", () => {
    budgetErrorMessage.classList.add("hide")
})
productInputBar.addEventListener("click", () => {
    productErrorMessage.classList.add("hide")
})
expensesInputBar.addEventListener("click", () => {
    productCostErrorMessage.classList.add("hide")
    productErrorMessage.classList.add("hide")
})
//Function To Disable Edit and Delete Button
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit")
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool
    })
}

//Function To Modify List Elements
const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement
    let currentBalance = balanceAmount.innerText
    let currentExpense = expensesAmount.innerText
    let parentAmount = parentDiv.querySelector(".amount").innerText
    if (edit) {
        let parentText = parentDiv.querySelector(".product").innerText
        productInputBar.value = parentText
        expensesInputBar.value = parentAmount
        disableButtons(true)
    }
    balanceAmount.innerText = parseInt(currentBalance) + parseInt(parentAmount)
    expensesAmount.innerText = parseInt(currentExpense) - parseInt(parentAmount)
    parentDiv.remove()
}

//Function To Create List
const listCreator = (expenseName, expenseValue) => {
    // Create new parent container for our edit and delete buttons
    const sublistContent = document.createElement("div")
    sublistContent.classList.add("sublist-content", "flex-space")
    // Attach the new parent into the existing DOM Node
    expensesListSection.appendChild(sublistContent)

    // Generate p tags for the name and cost of the expense row
    sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`

    // Create the Edit Button and append properties
    const editButton = document.createElement("button")
    editButton.classList.add("edit")
    editButton.style.fontSize = "1.2em"
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true)
    })

    // Create the Edit Button Icon and append properties
    const editButtonIcon = document.createElement("i")
    editButtonIcon.classList.add("fa-solid", "fa-pen")

    // Attach the EditButtonIcon into the EditButton Node
    editButton.appendChild(editButtonIcon)

    // Create the Delete Button and append properties
    const deleteButton = document.createElement("button")
    deleteButton.classList.add("delete")
    deleteButton.style.fontSize = "1.2em"
    deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton)
    })

    // Create the Delete Button icon and append properties
    const deleteButtonIcon = document.createElement("i")
    deleteButtonIcon.classList.add("fa-solid", "fa-trash-can")

    // Attach the deleteButtonIcon into the deleteButton Node
    deleteButton.appendChild(deleteButtonIcon)

    sublistContent.appendChild(editButton)
    sublistContent.appendChild(deleteButton)
    document.getElementById("list-items").appendChild(sublistContent)
}


//Function To Add Expenses
const setExpenses = () => {
    //empty checks
    if (!productInputBar.value) {
        productErrorMessage.classList.remove("hide")
        productInputBar.value = ""
        return false
    }
    if (!expensesInputBar.value) {
        productCostErrorMessage.classList.remove("hide")
        expensesInputBar.value = ""
        return false
    }

    //Enable buttons
    disableButtons(false)
    //Expense
    let expenditure = parseInt(expensesInputBar.value)
    //Total expense (existing + new)
    let sum = parseInt(expensesAmount.innerText) + expenditure
    expensesAmount.innerText = sum
    //Total balance(budget - total expense)
    const totalBalance = tempAmount - sum
    balanceAmount.innerText = totalBalance
    //Create list
    listCreator(productInputBar.value, expensesInputBar.value)
    //Empty inputs
    productInputBar.value = ""
    expensesInputBar.value = ""
}

//hitting enter after typing value in product input bar
productInputBar.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault()
        expensesButton.click()
    }
})
//hitting enter after typing value in expenses input bar
expensesInputBar.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault()
        expensesButton.click()
    }
})

//clicking the expenses button
expensesButton.addEventListener("click", () =>
    {
        setExpenses()
        store()
    })

// Database persistance - local storage

// Function to store items in local storage
function store() {
    const budget = budgetInputBar.value
    const product = productInputBar.value
    const expense = expensesInputBar.value

    const allInputData = {
        budget: budget,
        product: product,
        expense: expense,
    }

    // Converting object to string
    window.localStorage.setItem("allInputData", JSON.stringify(allInputData))
}


// Clark's Mock Data Structure (for use with LocalStorage)
// at least 2 discrete LocalStprage Variables
// 'total_budget': budgetBarInput // Running Total after expenses (updated every expense)
// 'expense_list': [
    // {
    //     expense_name: ProductName
    //     expense_value: Expense Amount
    // },
    // {
    //     expense_name: ProductName
    //     expense_value: Expense Amount
    // }
// ]
