// Affichage ou non des messages d'erreur
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = "block";
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.style.display = "none";
}


// BONUS : Sécurité contre code malveillant
function sanitizeInput(input) {
    // On enlève les caractères qui pourraient servir à envoyer du code
    return input
        .replace(/<[^>]*>/g, '')  // Enlève les tags HTML
        .replace(/&/g, '&amp;')   // Escape &
        .replace(/'/g, '&#39;')   // Escape '
        .replace(/"/g, '&quot;')  // Escape "
        .replace(/</g, '&lt;')    // Escape <
        .replace(/>/g, '&gt;');   // Escape >
}

// Cherche du code malveillant
function containsInjection(input) {
    // Injections classiques de code, on peut remplir le tableau au besoin
    const forbiddenPatterns = [
        /<script[^>]*>/i,  // <script> tag
        /javascript:/i,    // JavaScript URL
        /eval\(/i,         // eval function
        /document\./i,     // document object access
        /window\./i,       // window object access
        /on\w+/i           // event handlers like onClick, onError
    ];

    for (let pattern of forbiddenPatterns) {
        if (pattern.test(input)) {
            return true;
        }
    }
    return false; 
}


// On vérifie si tout est bon et si il y a du code malveillant

function checkForInjectionAndSanitize() {
    const fields = ['nom', 'prenom', 'pseudo', 'motdepasse', 'confirmation', 'adresse', 'codepostal', 'ville', 'telephone'];
    let isValid = true;

    fields.forEach(fieldId => {
        let fieldValue = document.getElementById(fieldId).value;

        if (containsInjection(fieldValue)) {
            // Si du code malveillant est détecté, on peut envoyer un petit message personnalisé au hacker :)
            showError(`${fieldId}Error`, "Même pas en rêve");
            isValid = false;
        } else {
            document.getElementById(fieldId).value = sanitizeInput(fieldValue);
            hideError(`${fieldId}Error`);
        }
    });

    return isValid;
}

function validateNom() {
    const nom = document.getElementById("nom").value;
    if (!nom.trim()) {
        showError("nomError", "Le nom ne doit pas être vide.");
        return false;
    }
    // On vérifie qu'il n'y a que des lettres
    for (let i = 0; i < nom.length; i++) {
        if (!((nom[i] >= 'A' && nom[i] <= 'Z') || (nom[i] >= 'a' && nom[i] <= 'z'))) {
            showError("nomError", "Le nom ne doit contenir que des lettres.");
            return false;
        }
    }
    hideError("nomError");
    return true;
}

function validatePrenom() {
    const prenom = document.getElementById("prenom").value;
    if (!prenom.trim()) {
        showError("prenomError", "Le prénom ne doit pas être vide.");
        return false;
    }
    // On vérifie qu'il n'y a que des lettres
    for (let i = 0; i < prenom.length; i++) {
        if (!((prenom[i] >= 'A' && prenom[i] <= 'Z') || (prenom[i] >= 'a' && prenom[i] <= 'z'))) {
            showError("prenomError", "Le prénom ne doit contenir que des lettres.");
            return false;
        }
    }
    hideError("prenomError");
    return true;
}

function validatePseudo() {
    const pseudo = document.getElementById("pseudo").value;
    // On vérifie que pseudo fait entre 4 et 14 caractères
    if (pseudo.length < 4 || pseudo.length > 14) {
        showError("pseudoError", "Le pseudo doit contenir entre 4 et 14 caractères.");
        return false;
    }
    hideError("pseudoError");
    return true;
}

function validateMotDePasse() {
    const motdepasse = document.getElementById("motdepasse").value;
    if (!motdepasse.trim()) {
        showError("motdepasseError", "Le mot de passe ne doit pas être vide.");
        return false;
    }
    hideError("motdepasseError");
    return true;
}

function validateConfirmation() {
    const confirmation = document.getElementById("confirmation").value;
    const motdepasse = document.getElementById("motdepasse").value;
    if (!confirmation.trim()) {
        showError("confirmationError", "La confirmation du mot de passe ne doit pas être vide.");
        return false;
    }
    if (confirmation !== motdepasse) {
        showError("confirmationError", "Les mots de passe ne correspondent pas.");
        return false;
    }
    hideError("confirmationError");
    return true;
}

function validateAdresse() {
    const adresse = document.getElementById("adresse").value;
    if (!adresse.trim()) {
        showError("adresseError", "L'adresse ne doit pas être vide.");
        return false;
    }
    hideError("adresseError");
    return true;
}

function validateCodePostal() {
    let codepostal = document.getElementById("codepostal").value;
    // On efface les espaces
    codepostal = codepostal.split(' ').join('');
    // On vérifie que la valeur est bien 5 chiffres
    if (codepostal.length !== 5 || isNaN(codepostal)) {
        showError("codepostalError", "Le code postal doit contenir exactement 5 chiffres.");
        return false;
    }
    hideError("codepostalError");
    return true;
}

function validateVille() {
    const ville = document.getElementById("ville").value;
    if (!ville.trim()) {
        showError("villeError", "La ville ne doit pas être vide.");
        return false;
    }
    // On vérifie qu'il n'y a que des lettres
    for (let i = 0; i < ville.length; i++) {
        if (!((ville[i] >= 'A' && ville[i] <= 'Z') || (ville[i] >= 'a' && ville[i] <= 'z') || ville[i] === ' ')) {
            showError("villeError", "La ville ne doit contenir que des lettres et des espaces.");
            return false;
        }
    }
    hideError("villeError");
    return true;
}


function validateTelephone() {
    let telephone = document.getElementById("telephone").value;

    // On efface les espaces et les points
    telephone = telephone.split(' ').join('');
    telephone = telephone.split('.').join('');

    // On vérifie que la valeur est bien 10 chiffres
    if (telephone.length !== 10 || isNaN(telephone)) {
        showError("telephoneError", "Le téléphone doit contenir exactement 10 chiffres.");
        return false;
    }

    hideError("telephoneError");
    return true;
}


// Vérifie que l'input est valide quand on change d'input

document.getElementById("nom").addEventListener("blur", validateNom);
document.getElementById("prenom").addEventListener("blur", validatePrenom);
document.getElementById("pseudo").addEventListener("blur", validatePseudo);
document.getElementById("motdepasse").addEventListener("blur", validateMotDePasse);
document.getElementById("confirmation").addEventListener("blur", validateConfirmation);
document.getElementById("adresse").addEventListener("blur", validateAdresse);
document.getElementById("codepostal").addEventListener("blur", validateCodePostal);
document.getElementById("ville").addEventListener("blur", validateVille);
document.getElementById("telephone").addEventListener("blur", validateTelephone);



document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // On vérifie si il y a du code malveillant
    let isValid = checkForInjectionAndSanitize();

    // On vérifie chaque input + s'il n'y a pas de code malveillant à chaque fois
    if (isValid) {
        isValid &= validateNom();
        isValid &= validatePrenom();
        isValid &= validatePseudo();
        isValid &= validateMotDePasse();
        isValid &= validateConfirmation();
        isValid &= validateAdresse();
        isValid &= validateCodePostal();
        isValid &= validateVille();
        isValid &= validateTelephone();
    }
    // Si tout est bon, on peut envoyer le formulaire
    if (isValid) {
        alert("Formulaire validé !");
        // Pour submit si besoin :
        // this.submit();
    }
});
