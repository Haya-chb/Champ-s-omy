// Jeu de sensibilisation à la dyslexie
// Ce jeu simule les difficultés de lecture rencontrées par les personnes dyslexiques

// Liste de textes à afficher (tu peux en ajouter d'autres)
const texts = [
    "Les enfants aiment jouer dans le jardin.",
    "La lecture est une activité enrichissante.",
    "Le soleil brille pendant l'été.",
    "Cette dette me rend bête.",
    "Les livres ouvrent des portes vers de nouveaux mondes.",
    "L'apprentissage est un voyage sans fin.",
    "La créativité est la clé de l'innovation.",
    "Le sport est essentiel pour une bonne santé.",
    "La nature offre des paysages magnifiques.",
    "Le partage et la solidarité renforcent les liens sociaux."
];

// Tableau pour stocker les textes originaux et modifiés (pour comparaison)
let textsData = [];

// Fonction pour simuler des erreurs typographiques comme dans la dyslexie
// Les principales erreurs incluent :
// 1. Inversion de lettres (b↔d, p↔q, etc.)
// 2. Lettres manquantes
// 3. Lettres dupliquées
// 4. Changement d'orientation des lettres
function dyslexiaTypo(text) {
    let chars = text.split("");
    let modified = [];
    
    for (let i = 0; i < chars.length; i++) {
        let char = chars[i];
        
        // Espaces et ponctuations restent inchangés
        if (char === " " || !char.match(/[a-zA-Z]/)) {
            modified.push(char);
            continue;
        }
        
        let random = Math.random();
        
        // 15% de chance d'inverser deux lettres consécutives
        if (random < 0.15 && i < chars.length - 1 && chars[i+1].match(/[a-zA-Z]/)) {
            modified.push(chars[i+1]);
            modified.push(chars[i]);
            i++; // sauter la lettre suivante car on l'a déjà traitée
        }
        // 8% de chance de supprimer une lettre (simule l'omission)
        else if (random < 0.23) {
            // On saute cette lettre
            continue;
        }
        // 5% de chance d'ajouter une lettre dupliquée
        else if (random < 0.28) {
            modified.push(char);
            modified.push(char);
        }
        // Sinon garder la lettre normale
        else {
            modified.push(char);
        }
    }
    
    return modified.join("");
}

let currentIndex = 0;
let score = 0;
let totalAnswers = 0;
let gameFinished = false;

// Fonction pour afficher un nouveau texte avec erreurs
function showTypoText() {
    const originalText = texts[currentIndex];
    const typoText = dyslexiaTypo(originalText);
    
    // Stocker les textes originaux et modifiés pour validation
    textsData[currentIndex] = {
        original: originalText,
        typo: typoText
    };
    
    document.getElementById("typo-text").textContent = typoText;
    document.getElementById("user-correction").value = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("user-correction").focus();
}

// Fonction pour vérifier la correction de l'utilisateur
function validateCorrection() {
    const userText = document.getElementById("user-correction").value.trim();
    const originalText = texts[currentIndex];
    const feedbackDiv = document.getElementById("feedback");
    const validateBtn = document.getElementById("validate-btn");
    
    totalAnswers++;
    if (gameFinished) return;
    // Eviter les doubles validations pendant l'animation
    validateBtn.disabled = true;
    // Vérifier si la réponse est correcte
    if (userText === originalText) {
        score++;
        feedbackDiv.textContent = "✓ Bravo ! Vous avez corrigé le texte correctement.";
        feedbackDiv.className = "correct";
    } else {
        feedbackDiv.textContent = `✗ Ce n'est pas tout à fait correct.\n\nRéponse attendue: "${originalText}"\nVotre réponse: "${userText}"`;
        feedbackDiv.className = "incorrect";
    }
    // Mettre à jour le score
    updateScore();
    // Vérifier si 5 phrases ont été bien corrigées (au total)
    if (score >= 5) {
        gameFinished = true;
        setTimeout(() => {
            document.getElementById("typo-text").textContent = "Félicitations ! Vous avez corrigé 5 phrases. Vous pouvez passer à la suite.";
            document.getElementById("user-correction").style.display = "none";
            document.getElementById("validate-btn").style.display = "none";
            document.getElementById("skip-btn").style.display = "none";
        }, 1000);
    } else {
        // Passer au texte suivant après une courte pause
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % texts.length;
            showTypoText();
            validateBtn.disabled = false;
        }, 3000);
    }
}

// Fonction pour passer au texte suivant sans répondre
function skipQuestion() {
    totalAnswers++;
    if (gameFinished) return;
    document.getElementById("feedback").textContent = "Question ignorée.";
    document.getElementById("feedback").className = "";
    updateScore();
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % texts.length;
        showTypoText();
    }, 1500);
}

// Fonction pour mettre à jour l'affichage du score
function updateScore() {
    const cappedScore = Math.min(score, 5);
    document.getElementById("score").textContent = `Score : ${cappedScore}/${totalAnswers}`;
}

// Permettre la validation avec la touche Entrée
document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.getElementById("user-correction");
    inputField.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            validateCorrection();
        }
    });
});

// Initialisation du jeu au chargement de la page
window.onload = function() {
    // Afficher et garder l'explication visible en permanence
    const exp = document.getElementById("explanation");
    if (exp) {
        exp.style.display = "block";
    }
    
    showTypoText();
    document.getElementById("validate-btn").onclick = validateCorrection;
    document.getElementById("skip-btn").onclick = skipQuestion;
};
