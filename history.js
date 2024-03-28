const btntop = document.getElementById("top");
const incomeslist = document.getElementById("incomesList");
const expensesList = document.getElementById("expensesList");
const totalincomes = document.getElementById("totalincomes");
const totalexpenses = document.getElementById("totalexpenses");

function getHistory() {
  //Récupérer le fichier des infos dans le stockage local
  let storedValue = localStorage.getItem("accountInfo");
  console.log("1", storedValue);

  //Vérifier l'existence du fichier
  if (storedValue !== null && storedValue !== undefined) {
    //Parsing de l'objet
    let parsedInfo = JSON.parse(storedValue);
    console.log("2", parsedInfo);

    //Vérifier l'existence le la propriété dans l'objet
    if ("incomes" in parsedInfo) {
      console.log("3", parsedInfo.incomes);

      parsedInfo.incomes.forEach(function (income) {
        let incLi = document.createElement("li");
        incLi.textContent = income;
        console.log("4", incLi.textContent);
        incomeslist.appendChild(incLi);
      });
    }

    if ("totalIncome" in parsedInfo) {
      totalincomes.textContent = parsedInfo.totalIncome;
    }
    if ("expenses" in parsedInfo) {
      console.log("3", parsedInfo.expenses);

      parsedInfo.expenses.forEach(function (expense) {
        let expLi = document.createElement("li");
        expLi.textContent = expense;
        console.log("4", expLi.textContent);
        expensesList.appendChild(expLi);
      });
    }
    if ("totalExpense" in parsedInfo) {
      totalexpenses.textContent = parsedInfo.totalExpense;
    }
  }
}

function goTop() {
  if (window.scrollY > 100) {
    btntop.style.display = "block";
  } else {
    btntop.style.display = "none";
  }
}
window.addEventListener("load", getHistory);
window.addEventListener("scroll", goTop);
