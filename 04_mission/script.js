const optimizeBtn = document.querySelector(".optimize-btn");
const optimizationBox = document.querySelector(".optimization-box");
const loadingBar = document.querySelector(".loading-bar");
const optimizedContainer = document.querySelector(".one-little-box-optimized");
const bag = document.querySelector(".list-bag");

// Conteneur absolu pour la boîte d'optimisation
const dropContainer = document.createElement("div");
dropContainer.style.position = "relative";
dropContainer.style.width = "100%";
dropContainer.style.height = "100%";
optimizationBox.appendChild(dropContainer);

let droppedImage = null;

// Message si boîte vide
const message = document.createElement("p");
message.textContent = "Aucune image déposée, glissez une image ici.";
message.style.color = "white";
message.style.textAlign = "center";
message.style.position = "absolute";
message.style.top = "50%";
message.style.left = "50%";
message.style.transform = "translate(-50%, -50%)";
message.style.pointerEvents = "none";
dropContainer.appendChild(message);

// Drag & drop images non optimisées vers la boîte
document.querySelectorAll(".list-img-no-optimized div").forEach(img => {
    img.setAttribute("draggable", "true");
    img.dataset.id = img.className; // ID unique pour chaque image
    img.addEventListener("dragstart", e => {
        e.dataTransfer.setData("imgId", img.dataset.id);
        e.dataTransfer.setData("source", "non-optimized");
    });
});

// Drop dans boîte d'optimisation
optimizationBox.addEventListener("dragover", e => e.preventDefault());
optimizationBox.addEventListener("drop", e => {
    e.preventDefault();
    if (droppedImage) {
        alert("Une image est déjà dans la boîte !");
        return;
    }

    const imgId = e.dataTransfer.getData("imgId");
    const source = e.dataTransfer.getData("source");
    if (source !== "non-optimized") return;

    droppedImage = document.querySelector(`.list-img-no-optimized div[data-id='${imgId}']`);
    if (!droppedImage) return;

    message.style.display = "none";
    dropContainer.appendChild(droppedImage);
    droppedImage.style.position = "absolute";
    droppedImage.style.top = "0";
    droppedImage.style.left = "0";
});

// Bouton optimiser
optimizeBtn.addEventListener("click", () => {
    if (!droppedImage) {
        alert("Il n'y a aucune image à optimiser !");
        return;
    }

    loadingBar.style.transition = "none";
    loadingBar.style.width = "0%";
    void loadingBar.offsetWidth;

    loadingBar.style.transition = "width 2s linear";
    loadingBar.style.width = "100%";

    setTimeout(() => {
        const small = document.createElement("div");
        small.classList.add("optimized");
        small.dataset.id = droppedImage.dataset.id; // garde le même ID
        small.style.width = "150px";
        small.style.height = "80px";
        small.style.border = "2px solid black";
        small.style.backgroundColor = "lightgreen";
        small.setAttribute("draggable", "true");

        // Drag & drop pour le sac
        small.addEventListener("dragstart", e => {
            e.dataTransfer.setData("imgId", small.dataset.id);
            e.dataTransfer.setData("source", "optimized");
        });

        optimizedContainer.appendChild(small);

        // Supprimer l'image originale de la boîte
        droppedImage.remove();
        droppedImage = null;
        message.style.display = "block";

        loadingBar.style.transition = "none";
        loadingBar.style.width = "0%";
    }, 2000);
});

// Drop dans le sac (uniquement images optimisées)
// Stocker le nombre total d'images non optimisées au départ
const totalImages = document.querySelectorAll(".list-img-no-optimized div").length;

// Drop dans le sac (uniquement images optimisées)
bag.addEventListener("dragover", e => e.preventDefault());
bag.addEventListener("drop", e => {
    e.preventDefault();

    const imgId = e.dataTransfer.getData("imgId");
    const source = e.dataTransfer.getData("source");

    if (source !== "optimized") {
        // Message si image non optimisée
        const errorMsg = document.createElement("p");
        errorMsg.textContent = "L'image est trop grande ! Optimisez-la avant de la déposer dans le sac !";
        errorMsg.style.color = "red";
        errorMsg.style.textAlign = "center";
        errorMsg.style.marginTop = "10px";
        bag.appendChild(errorMsg);

        setTimeout(() => errorMsg.remove(), 5000);
        return;
    }

    const img = document.querySelector(`.one-little-box-optimized div[data-id='${imgId}']`);
    if (!img) return;

    bag.appendChild(img);
    img.style.position = "static";

    // Vérifier si toutes les images optimisées sont dans le sac
    const imagesInBag = bag.querySelectorAll("div.optimized").length;
    if (imagesInBag === totalImages) {
        document.querySelector(".pop-up").style.display = "flex";

        // alert("Félicitations ! Toutes les images ont été optimisées et mises dans le sac !");
    }
});


