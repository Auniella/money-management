//Pour index.html
const greet = document.getElementById("greet");

const ids = document.getElementById("ids");
const connect = document.getElementById("connect");
const spBalance = document.getElementById("spBalance");

const inputFN = document.getElementById("firstName");
const inputLN = document.getElementById("lastName");

const calculs = document.getElementById("calculs");

const inputIncome = document.getElementById("income");
const inputExpense = document.getElementById("expense");

const btnSubmit = document.getElementById("submit");
const btnClearAll = document.getElementById("deleteAll");
const btnAddIncome = document.getElementById("btnAddIncome");
const btnAddExpense = document.getElementById("btnAddExpense");

let personAccount = {
  incDates: [],
  expDates: [],
  incomes: [],
  expenses: [],
  totalIncome: 0,
  totalExpense: 0,
  accountBalance: 0,
};

//Ajout des IDs
function addIds() {
  let inputFirstNameValue = inputFN.value;
  let inputLastNameValue = inputLN.value;

  personAccount.firstName = inputFirstNameValue;
  personAccount.lastName = inputLastNameValue;

  console.log(inputFirstNameValue);
  console.log(inputLastNameValue);

  greet.textContent = `Welcome, ${personAccount.firstName} ${personAccount.lastName} !`;
  ids.style.display = "none";
  connect.style.display = "block";

  inputFN.value = "";
  inputLN.value = "";
  addToStorage();
}

//Calcul du revenu
function addIncome() {
  let inputIncomeValue = parseFloat(inputIncome.value);
  console.log(inputIncomeValue);
  console.log(typeof inputIncomeValue);
  if (!isNaN(inputIncomeValue)) {
    console.log("isNaN(inputIncomeValue):", isNaN(inputIncomeValue));
    personAccount.incomes.push(inputIncomeValue);
    personAccount.totalIncome += inputIncomeValue;
    console.log("Revenu ajouté :", personAccount.incomes);
    console.log("Revenu total :", personAccount.totalIncome);
    inputIncome.value = "";
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let formatMonth = month.toString().padStart(2, "0");
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let incTime = `${day}/${formatMonth}/${year} ${hour}:${minute}`;
    console.log(incTime);
    personAccount.incDates.push(incTime);
    addToStorage();
    console.table(personAccount);
  } else {
    let err = document.createElement("p");
    err.textContent = "Please enter a correct income.";
    err.style.color = "#E3170A";
    calculs.appendChild(err);
    setTimeout(() => {
      calculs.removeChild(err);
    }, 2000);
    console.log("Entrez un revenu correct.");
    inputIncome.value = "";
  }
}

//Calcul des dépenses
function addExpense() {
  let inputExpenseValue = parseFloat(inputExpense.value);
  if (!isNaN(inputExpenseValue)) {
    personAccount.expenses.push(inputExpenseValue);
    personAccount.totalExpense += inputExpenseValue;
    console.log("Dépense ajoutée :", personAccount.expenses);
    console.log("Dépenses totales :", personAccount.totalExpense);
    inputExpense.value = "";
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let formatMonth = month.toString().padStart(2, "0");
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let expTime = `${day}/${formatMonth}/${year} ${hour}:${minute}`;
    console.log(expTime);
    personAccount.expDates.push(expTime);
    addToStorage();
    console.table(personAccount);
  } else {
    let err = document.createElement("p");
    err.textContent = "Please enter a correct expense.";
    err.style.color = "#E3170A";
    calculs.appendChild(err);
    setTimeout(() => {
      calculs.removeChild(err);
    }, 2000);
    console.log("Entrez une dépense correcte.");
    inputExpense.value = "";
  }
}

//Calcul du solde
function calcBalance() {
  personAccount.accountBalance =
    personAccount.totalIncome - personAccount.totalExpense;

  let fixedBalance = personAccount.accountBalance.toFixed(2);

  spBalance.textContent = Number(fixedBalance).toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: "currency",
    currency: "XOF",
  });

  if (personAccount.accountBalance < 0) {
    spBalance.style.color = "#E3170A";
  } else {
    spBalance.style.color = "#000";
  }
  addToStorage();
}

//Ajout des informations au localStorage
function addToStorage() {
  const personAccountJSON = JSON.stringify(personAccount, undefined, 4);
  localStorage.setItem("accountInfo", personAccountJSON);
  //console.log(localStorage);
}

//Vérification pour une éventuelle prochaine connexion
function verifIds() {
  let storedValue = localStorage.getItem("accountInfo");
  if (storedValue !== null && storedValue !== undefined) {
    let parsedInfo = JSON.parse(storedValue);
    if ("firstName" in parsedInfo && "lastName" in parsedInfo) {
      greet.textContent = `Welcome, ${parsedInfo.firstName} ${parsedInfo.lastName} !`;
      ids.style.display = "none";
      connect.style.display = "block";
      personAccount.incDates = parsedInfo.incDates || [];
      personAccount.expDates = parsedInfo.expDates || [];
      personAccount.firstName = parsedInfo.firstName;
      personAccount.lastName = parsedInfo.lastName;
      personAccount.incomes = parsedInfo.incomes || [];
      personAccount.expenses = parsedInfo.expenses || [];
      personAccount.totalIncome = parsedInfo.totalIncome || 0;
      personAccount.totalExpense = parsedInfo.totalExpense || 0;
      personAccount.accountBalance = parsedInfo.accountBalance || 0;
      // Mettre à jour l'affichage des totaux et du solde
      calcBalance();
    }
    if ("accountBalance" in parsedInfo) {
      spBalance.textContent = Number(parsedInfo.accountBalance).toLocaleString(
        "fr-FR",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          style: "currency",
          currency: "XOF",
        }
      );

      if (parsedInfo.accountBalance < 0) {
        spBalance.style.color = "#E3170A";
      } else {
        spBalance.style.color = "#000";
      }
    }
  }
}

function clearAll() {
  let warning = confirm(
    "Are you sure you want to clear all the data ? You will lose all of it."
  );
  if (warning) {
    localStorage.clear();
    window.location.reload();
  }
}

window.addEventListener("load", verifIds);
btnSubmit.addEventListener("click", addIds);
btnClearAll.addEventListener("click", clearAll);
btnAddIncome.addEventListener("click", () => {
  addIncome();
  calcBalance();
});
btnAddExpense.addEventListener("click", () => {
  addExpense();
  calcBalance();
});
