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
    if ("incomes" in parsedInfo && "incDates" in parsedInfo) {
      console.log("3", parsedInfo.incomes, parsedInfo.incDates);

      if (parsedInfo.incomes.length !== parsedInfo.incDates.length) {
        console.error("incomes: les tableaux n'ont pas la même longueur.");
      } else {
        for (let i = 0; i < parsedInfo.incomes.length; i++) {
          let incLi = document.createElement("li");
          let spInc = document.createElement("span");
          spInc.textContent = parsedInfo.incomes[i];

          let spIncDate = document.createElement("span");
          spIncDate.textContent = parsedInfo.incDates[i];
          spIncDate.classList.add("dates");

          incLi.appendChild(spInc);
          incLi.appendChild(document.createTextNode(" - "));
          incLi.appendChild(spIncDate);

          console.log("4", incLi.textContent);
          incomeslist.appendChild(incLi);
        }
      }

      /* parsedInfo.incomes.forEach(function (income) {
        let incLi = document.createElement("li");
        incLi.textContent = income;
        console.log("4", incLi.textContent);
        incomeslist.appendChild(incLi);
      }); */
    }

    if ("totalIncome" in parsedInfo) {
      totalincomes.textContent = parsedInfo.totalIncome;
    }
    if ("expenses" in parsedInfo && "expDates" in parsedInfo) {
      console.log("3", parsedInfo.expenses, parsedInfo.expDates);

      if (parsedInfo.expenses.length !== parsedInfo.expDates.length) {
        console.error("expenses: les tableaux n'ont pas la même longueur.");
      } else {
        for (let i = 0; i < parsedInfo.expenses.length; i++) {
          let expLi = document.createElement("li");
          let spExp = document.createElement("span");
          spExp.textContent = parsedInfo.expenses[i];

          let spExpDate = document.createElement("span");
          spExpDate.textContent = parsedInfo.expDates[i];
          spExpDate.classList.add("dates");
          expLi.appendChild(spExp);
          expLi.appendChild(document.createTextNode(" - "));
          expLi.appendChild(spExpDate);
          console.log("4", expLi.textContent);
          expensesList.appendChild(expLi);
        }
      }

      /* parsedInfo.expenses.forEach(function (expense) {
        let expLi = document.createElement("li");
        expLi.textContent = expense;
        console.log("4", expLi.textContent);
        expensesList.appendChild(expLi);
      }); */
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
