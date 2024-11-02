const entryForm = document.getElementById("entry-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const entriesList = document.getElementById("entry-list");
const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-Expense");
const balance = document.getElementById("balance-Amount");

let entries = JSON.parse(localStorage.getItem("entries")) || [];

entryForm.style.marginTop="10px";
function updateTotals() {
  let income = 0, expense = 0;
  entries.forEach(entry => {
    if (entry.type === "Income") {
      income += entry.amount;
    } else {
      expense += entry.amount;
    }
  });
  totalIncome.textContent = `₹${income}`;
  totalExpense.textContent = `₹${expense}`;
  balance.textContent = `₹${income - expense}`;
}

function renderEntries() {
  entriesList.innerHTML = "";
  entries.forEach((entry, index) => {
    var typ=entry.type
    var colo;
    if(typ=="Income"){
        colo="green";
      }else{
        colo="red"
      }
    const entryDiv = document.createElement("div");
    entryDiv.className = `entry ${entry.type}`;
    entryDiv.innerHTML = `
      <span>${entry.description}</span>
      <span>${entry.type}</span>
      <span style="color: ${colo};">₹${entry.amount}</span>
      <div class="entry-actions">
        <button onclick="editEntry(${index})">✏️</button>
        <button onclick="deleteEntry(${index})">🗑️</button>
      </div>
    `;
    entriesList.appendChild(entryDiv);
  });
  updateTotals();
}

function addEntry(description, amount, type) {
  entries.push({ description, amount: parseFloat(amount), type });
  localStorage.setItem("entries", JSON.stringify(entries));
  renderEntries();
}

function deleteEntry(index) {
  entries.splice(index, 1);
  localStorage.setItem("entries", JSON.stringify(entries));
  renderEntries();
}

function editEntry(index) {
  const entry = entries[index];
  descriptionInput.value = entry.description;
  amountInput.value = entry.amount;
  typeInput.value = entry.type;

editEntry(index);

}

entryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const description = descriptionInput.value;
  const amount = amountInput.value;
  const type = typeInput.value;

  if (description && amount && type) {
    addEntry(description, amount, type);
    entryForm.reset();
  }
});

renderEntries();
