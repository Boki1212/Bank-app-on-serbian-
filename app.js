let accounts = [];

// Kreiranje novog računa
document.getElementById('createAccount').addEventListener('click', function() {
    const accountName = document.getElementById('accountName').value.trim();
    if (accountName) {
        const newAccount = {
            name: accountName,
            balance: 0,
            loans: [],
            collateral: null,
            cards: []
        };
        accounts.push(newAccount);
        document.getElementById('accountMessage').textContent = `Račun "${accountName}" je uspešno kreiran.`;
        updateAccountsList();
        document.getElementById('accountName').value = '';
    } else {
        document.getElementById('accountMessage').textContent = 'Molimo unesite validno ime računa.';
    }
});

// Uplata depozita
document.getElementById('depositMoney').addEventListener('click', function() {
    const depositAmount = parseFloat(document.getElementById('depositAmount').value);
    if (accounts.length > 0 && depositAmount > 0) {
        accounts[0].balance += depositAmount;
        document.getElementById('balanceMessage').textContent = `Uspešno ste uplatili $${depositAmount}. Novi saldo: $${accounts[0].balance}`;
        updateAccountsList();
        document.getElementById('depositAmount').value = '';
    } else {
        document.getElementById('balanceMessage').textContent = 'Molimo otvorite račun i unesite validan iznos depozita.';
    }
});

// Zatraži kredit
document.getElementById('applyLoan').addEventListener('click', function() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const collateral = document.getElementById('collateral').value.trim();
    if (accounts.length > 0 && loanAmount > 0 && collateral) {
        accounts[0].loans.push({ amount: loanAmount, collateral: collateral });
        accounts[0].balance += loanAmount;
        document.getElementById('loanMessage').textContent = `Kredit od $${loanAmount} odobren. Hipoteka: ${collateral}`;
        updateAccountsList();
        document.getElementById('loanAmount').value = '';
        document.getElementById('collateral').value = '';
    } else {
        document.getElementById('loanMessage').textContent = 'Molimo unesite validne detalje kredita i hipoteku.';
    }
});

// Kalkulator mesečnih rata
document.getElementById('calculateLoan').addEventListener('click', function() {
    const loanAmount = parseFloat(document.getElementById('loanCalculatorAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTerm = parseFloat(document.getElementById('loanTerm').value);

    if (loanAmount > 0 && interestRate > 0 && loanTerm > 0) {
        const monthlyInterestRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm * 12;
        const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
        document.getElementById('loanCalculatorMessage').textContent = `Mesečna rata je $${monthlyPayment.toFixed(2)}`;
    } else {
        document.getElementById('loanCalculatorMessage').textContent = 'Molimo unesite validne podatke za izračunavanje rate.';
    }
});

// Izdavanje kartica
document.getElementById('issueCard').addEventListener('click', function() {
    const cardType = document.getElementById('cardType').value.trim();
    if (accounts.length > 0 && cardType) {
        accounts[0].cards.push(cardType);
        document.getElementById('cardMessage').textContent = `Kartica "${cardType}" je uspešno izdata.`;
        updateAccountsList();
        document.getElementById('cardType').value = '';
    } else {
        document.getElementById('cardMessage').textContent = 'Molimo unesite validan tip kartice.';
    }
});

// Ažuriranje liste računa
function updateAccountsList() {
    const accountsList = document.getElementById('accountsList');
    accountsList.innerHTML = '';
    accounts.forEach(account => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${account.name}</span>
            <span>Saldo: $${account.balance.toFixed(2)}</span>
            <span>Krediti: ${account.loans.length > 0 ? account.loans.map(loan => `$${loan.amount} (Hipoteka: ${loan.collateral})`).join(', ') : 'Nema'}</span>
            <span>Kartice: ${account.cards.length > 0 ? account.cards.join(', ') : 'Nema'}</span>
            <button onclick="closeAccount('${account.name}')">Zatvori Račun</button>
        `;
        accountsList.appendChild(li);
    });
}

// Zatvaranje računa
function closeAccount(accountName) {
    const index = accounts.findIndex(account => account.name === accountName);
    if (index !== -1) {
        accounts.splice(index, 1);
        updateAccountsList();
        document.getElementById('accountMessage').textContent = `Račun "${accountName}" je zatvoren.`;
    }
}
