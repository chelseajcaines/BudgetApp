const budgetInputBar = document.getElementById("budget-input-bar");
const productInputBar = document.getElementById("product-input-bar");
const expensesInputBar = document.getElementById("expenses-input-bar");
const budgetButton = document.getElementById("budget-button");
const expensesButton = document.getElementById("expenses-button");
const budgetErrorMessage = document.getElementById("budget-error-message");
const productErrorMessage = document.getElementById("product-error-message");
const productCostErrorMessage = document.getElementById(
  "product-cost-error-message"
);
const budgetAmount = document.getElementById("budget-amount");
const expensesAmount = document.getElementById("expenses-amount");
const balanceAmount = document.getElementById("balance-amount");
const expensesListSection = document.getElementById("expense-list-section");
let tempAmount = 0;

//Set Budget Part
budgetButton.addEventListener("click", () => {
  tempAmount = budgetInputBar.value;
  //empty or negative input
  if (tempAmount === "" || tempAmount < 0) {
    budgetErrorMessage.classList.remove("hide");
  } else {
    budgetErrorMessage.classList.add("hide");
    //Set Budget
    budgetAmount.innerHTML = tempAmount;
    //Set Balance
    balanceAmount.innerText = tempAmount - expensesAmount.innerText;
    //Clear Input Box
    budgetInputBar.value = "";
  }
});

//Function To Disable Edit and Delete Button
const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

//Function To Modify List Elements
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement;
  let currentBalance = balanceAmount.innerText;
  let currentExpense = expensesAmount.innerText;
  let parentAmount = parentDiv.querySelector(".amount").innerText;
  if (edit) {
    let parentText = parentDiv.querySelector(".product").innerText;
    productInputBar.value = parentText;
    expensesInputBar.value = parentAmount;
    disableButtons(true);
  }
  balanceAmount.innerText = parseInt(currentBalance) + parseInt(parentAmount);
  expensesAmount.innerText = parseInt(currentExpense) - parseInt(parentAmount);
  parentDiv.remove();
};

//Function To Create List
const listCreator = (expenseName, expenseValue) => {
  let sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space");
  expensesListSection.appendChild(sublistContent);
  sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => {
    modifyElement(editButton, true);
  });
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });
  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  document.getElementById("list-items").appendChild(sublistContent);
};

//Function To Add Expenses
expensesButton.addEventListener("click", () => {
  //empty checks
  if (!expensesInputBar.value || !productInputBar.value) {
    productErrorMessage.classList.remove("hide");
    return false;
  }
  //Enable buttons
  disableButtons(false);
  //Expense
  let expenditure = parseInt(expensesInputBar.value);
  //Total expense (existing + new)
  let sum = parseInt(expensesAmount.innerText) + expenditure;
  expensesAmount.innerText = sum;
  //Total balance(budget - total expense)
  const totalBalance = tempAmount - sum;
  balanceAmount.innerText = totalBalance;
  //Create list
  listCreator(productInputBar.value, expensesInputBar.value);
  //Empty inputs
  productInputBar.value = "";
  expensesInputBar.value = "";
});
