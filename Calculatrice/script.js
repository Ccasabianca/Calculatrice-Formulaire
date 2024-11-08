const calculator = document.getElementById("calculator");
const showButton = document.getElementById("show-calculator");
const hideButton = document.getElementById("hide-calculator");
const form = document.getElementById("calc-form");
const resultDiv = document.getElementById("result");
const value1Input = document.getElementById("value1");
const value2Input = document.getElementById("value2");
const operatorSelect = document.getElementById("operator");


// Fonctions pour modifier le style des erreurs
function showError(message) {
    resultDiv.textContent = message;
    resultDiv.classList.add('error');
}

function clearError() {
    resultDiv.textContent = '';
    resultDiv.classList.remove('error');
}

// Afficher ou cacher la calculatrice
showButton.addEventListener("click", () => {
    calculator.classList.remove("hidden");
});

hideButton.addEventListener("click", () => {
    calculator.classList.add("hidden");
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    // On change les virgules en points pour faire les calculs
    let value1 = value1Input.value.replace(',', '.');
    let value2 = value2Input.value.replace(',', '.');
    const operator = operatorSelect.value;

    clearError();
    
    // On vérifie que les inputs ne sont pas vides
    if (!value1 || !value2) {
        showError("Erreur : Veuillez remplir tous les champs.");
        return;
    }
    // On vérifie que les inputs sont des nombres
    if (isNaN(value1) || isNaN(value2)) {
        showError("Erreur : Veuillez entrer des valeurs numériques.");
        return;
    }

    // On change les inputs en chiffres
    value1 = parseFloat(value1);
    value2 = parseFloat(value2);

    // On vérifie les différents cas de figure
    let result;
    if (operator === '+') {
        result = value1 + value2;
    } else if (operator === '-') {
        result = value1 - value2;
    } else if (operator === '*') {
        result = value1 * value2;
    } else if (operator === '/') {
        if (value2 === 0) {
            showError("Erreur : Division par zéro impossible.");
            return;
        }
        result = value1 / value2;
    } else if (operator === '%') {
        if (value2 === 0) {
            showError("Erreur : Division par zéro impossible.");
            return;
        }
        result = value1 % value2;
    } else if (operator === '**') {
        result = value1 ** value2;
    } else {
        showError("Erreur : Opérateur invalide.");
        return;
    }

    // On affiche le résultat en remettant la virgule à la place du point
    const Value1BonFormat= value1.toString().replace('.', ',');
    const Value2BonFormat = value2.toString().replace('.', ',');
    const ResultatFinal = result.toString().replace('.', ',');
    resultDiv.textContent = `${Value1BonFormat} ${operator} ${Value2BonFormat} = ${ResultatFinal}`;
});