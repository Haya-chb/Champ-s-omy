const quizData = [
    {
        question: "Qui sont les GAFAM ?",
        reponse: [
            { text: "Google, Apple, Facebook, Amazon et Microsoft", correct: true },
            { text: "GitHub, Adobe, Figma, Autodesk, Minecraft ", correct: false },
            { text: "GIMP, Acer, Firefox, Arte, Messenger ", correct: false },
        ], 
        explanation: "Les GAFAM sont les cinq grandes entreprises technologiques américaines : Google, Apple, Facebook (Meta), Amazon et Microsoft, qui dominent le marché du numérique dans le monde."
    },
    {
        question: "Quelle pratique réduit votre impact écologique numérique ?",
        reponse: [
            { text: "Garder toutes ses vidéos en 4K", correct: false },
            { text: "Laisser 100 onglets ouverts", correct: false },
            { text: "Vider régulièrement ses mails", correct: true },
            { text: "Recharger son téléphone toute la nuit", correct: false }
        ], 
        explanation: "Vider régulièrement ses mails permet de réduire l'espace de stockage nécessaire et donc l'énergie consommée par les serveurs qui consomme énormément."
    },
    {
        question: "Qu’est-ce qui caractérise vraiment un logiciel open-source ?",
        reponse: [
            { text: "Un logiciel obligatoirement compatible avec Linux", correct: false },
            { text: "Le fait qu’il soit gratuit pour la plupart des utilisateurs", correct: false },
            { text: "L’obligation d’être développé par des bénévoles", correct: false },
            { text: "Son code source accessible et réutilisable sous une licence spécifique", correct: true }
        ],
        explanation: "Un logiciel open-source est caractérisé par la disponibilité de son code source, qui peut être consulté, modifié et redistribué sous une licence spécifique, on peut prendre comme exemple GitHub."
    },
    {
        question: "Que pourrait-il se passer si on était sur un réseau Wi-Fi public ?",
        reponse: [
            { text: "Le réseau peut limiter la vitesse de téléchargement", correct: false },
            { text: "Le réseau peut empêcher l’accès à certains sites", correct: false },
            { text: "Votre compte bancaire pourrait se faire attaquer", correct: true },
            { text: "Le réseau peut provoquer une surconsommation de batterie", correct: false }
        ],
        explanation: "Les réseaux Wi-Fi publics sont souvent moins sécurisés que les réseaux privés, ce qui peut exposer vos données à des attaques potentielles."
    },
    {
        question: "Quelle vérification est essentielle avant l’installation d’une application ?",
        reponse: [
            { text: "Vérifier les avis récents des utilisateurs", correct: true },
            { text: "Vérifier si l’application est dans le top du store", correct: false },
            { text: "Regarder la taille de l’application", correct: false },
            { text: "Vérifier le nombre de téléchargements", correct: false }
        ], 
        explanation: "Les avis récents des utilisateurs peuvent fournir des informations sur la fiabilité et la sécurité de l’application, notamment en identifiant des problèmes récents ou des comportements suspects."
    },
    {
        question: "Quel est un comportement responsable sur les réseaux sociaux ?",
        reponse: [
            { text: "Partager une rumeur", correct: false },
            { text: "Respecter les autres et vérifier ce qu’on poste", correct: true },
            { text: "Envoyer un message anonyme méchant", correct: false },
            { text: "Ignorer les commentaires constructifs", correct: false }
        ],
        explanation: "Il est important de maintenir un environnement respectueux et de vérifier les informations avant de les partager."
    },
    {
        question: "En France, quel est le pourcentage de sites web conformes aux normes d’accessibilité en vigueur ?",
        reponse: [
            { text: "Moins de 1%", correct: true },
            { text: "Moins de 25%", correct: false },
            { text: "Moins de 50%", correct: false },
            { text: "Moins de 35%", correct: false }
        ],
        explanation: "En janvier 2025, sur les 4 250 sites examinés (publics et privés), moins de 1 % se déclarent totalement conformes à la norme légale."
    }
];

const questionEl = document.getElementById('question');
const reponseEl = document.getElementById('answers') || document.getElementById('reponse');
const nextBtn = document.getElementById('next-btn');
const seeExplanationEl = document.getElementById('see-explanation');
const explanationEl = document.getElementById('explanation');

// 🔥 MODAL — récupère la modal dans ton HTML
const modal = document.getElementById("result-modal");
const modalText = document.getElementById("modal-text");
const modalBtn = document.getElementById("modal-btn");

// 🔥 Barre de vie (puissance du vilain)
const healthBarEl = document.getElementById('health-bar');
const healthEl = document.getElementById('health');
// Ici, la barre représente la puissance du vilain.
// Elle démarre à 0 et MONTE si tu te trompes.
let health = 0; // de 0 à 100

function applyHealthStyles() {
    if (!healthEl) return;
    healthEl.style.width = `${Math.max(0, Math.min(100, health))}%`;
    // Plus la barre est haute, plus le danger est grand
    if (health > 60) {
        healthEl.classList.remove('health-mid', 'health-low');
        healthEl.classList.add('health-low'); // rouge
    } else if (health > 30) {
        healthEl.classList.remove('health-ok', 'health-low');
        healthEl.classList.add('health-mid'); // orange
    } else {
        healthEl.classList.remove('health-ok', 'health-mid');
        healthEl.classList.add('health-ok'); // vert
    }
    // accessibilité
    if (healthBarEl) {
        healthBarEl.setAttribute('aria-valuenow', String(Math.round(health)));
    }
}

applyHealthStyles();

// 🔥 nouveau : compteur
let statusCounter = document.getElementById('counter');
if (!statusCounter) {
    statusCounter = document.createElement('div');
    statusCounter.id = "counter";
    statusCounter.style.marginBottom = "10px";
    statusCounter.style.fontWeight = "bold";
    document.getElementById("quiz-container").prepend(statusCounter);
}

let currentQuestion = 0;
let score = 0;

function showQuestion() {
    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;

    // compteur Question X / Y
    statusCounter.textContent = `Question ${currentQuestion + 1} / ${quizData.length}`;

    reponseEl.innerHTML = '';
    explanationEl.hidden = true;
    seeExplanationEl.hidden = true;
    nextBtn.hidden = true;

    q.reponse.forEach(reponse => {
        const button = document.createElement('button');
        button.textContent = reponse.text;
        button.className = 'answer-btn';
        button.addEventListener('click', () => selectAnswer(button, reponse));
        reponseEl.appendChild(button);
    });
}

function selectAnswer(button, reponse) {
    const buttons = reponseEl.querySelectorAll('button');
    buttons.forEach(b => b.disabled = true);

    if (reponse.correct) {
        score++;
        button.classList.add('correct');
        // bonne réponse → le vilain perd un peu de puissance
        const heal = (100 / quizData.length) * 0.5; // récupère 50% de la pénalité
        health = Math.max(0, health - heal);
        applyHealthStyles();
    } else {
        button.classList.add('incorrect');
        buttons.forEach((b, i) => {
            if (quizData[currentQuestion].reponse[i].correct) {
                b.classList.add('correct');
            }
        });
        // ⚠️ mauvaise réponse → la puissance du vilain MONTE
        const penalty = 100 / quizData.length; // pénalité proportionnelle au nombre de questions
        health = Math.min(100, health + penalty);
        applyHealthStyles();
    }

    const q = quizData[currentQuestion];

    if (q.explanation) {
        seeExplanationEl.hidden = false;
        seeExplanationEl.onclick = () => showExplanation(q.explanation);
    } else {
        setTimeout(() => {
            nextBtn.hidden = false;
        }, 1000);
    }
}

function showExplanation(text) {
    seeExplanationEl.hidden = true;
    explanationEl.textContent = text;
    explanationEl.hidden = false;

    setTimeout(() => {
        nextBtn.hidden = false;
    }, 1000);
}

nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showScore();
    }
});
 
function showScore() {
    questionEl.textContent = `Bon t'as eu un score de ${score} / ${quizData.length}`;

    reponseEl.innerHTML = '';
    seeExplanationEl.hidden = true;
    explanationEl.hidden = true;
    nextBtn.hidden = true;

    // 🔥🔥🔥 MODAL SI LE SCORE EST MAUVAIS 🔥🔥🔥
    if (score < quizData.length - 1) {
        modalText.textContent = "Tu n’es pas très fort face à ton ennemi… mais tu peux encore le battre !";
        modal.style.display = "flex"; 
    }
}

// bouton de la modal → ici tu mets ton jeu ou page
modalBtn.addEventListener("click", () => {
    modal.style.display = "none";
    // exemple → redirection vers un mini-jeu :
    // window.location.href = "game.html";
});

showQuestion();
