<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mission 4 - Laissons les pages souffler un peu </title>
    <link rel="stylesheet" href="../styles/mission2.css">
</head>
<body>

    <div class="pop-up">
        <!-- <div class="pop-up-content">
            <h2>Bienvenue dans l'optimiseur d'images !</h2>
            <p>Glissez-déposez les images non optimisées dans le sac pour les préparer à l'optimisation.</p>
            <button class="close-btn">Commencer</button>
        </div> -->
        <div class="pop-up-win">
            <h2>Optimisation terminée !</h2>
            <div class="pop-up-content">
                <p>
                    Bravo ! Vous avez réussi à optimiser toutes les images et à les déposer dans le sac.
                    En accomplissant cette mission, vous contribuez à réduire la taille des fichiers, ce qui permet :
                </p>
                    <ul>
                        <li>Moins de consommation d’énergie lors du téléchargement et du stockage des images, réduisant ainsi l’empreinte carbone.</li>
                        <li>Des pages web plus légères et rapides, améliorant l’expérience pour tous les utilisateurs, y compris ceux avec une connexion limitée.</li>
                        <li>Une sensibilisation aux bonnes pratiques numériques, en limitant le gaspillage de ressources.</li>
                    </ul>
                <p>
                    Ce badge illustre concrètement les principes de NIRD : en optimisant les images, vous appliquez la Responsabilité Numérique en réduisant l’impact environnemental du web, et favorisez une inclusion numérique en rendant le contenu accessible à un plus grand nombre.
                    Continuez à appliquer ces bonnes pratiques pour un web plus durable et responsable !
                </p>
                <p class="button-to-collection"><a href="#" class="close-win-btn">Voir ma collection</a></p>
            </div>
        </div>
    </div>



    <main>
        <section class="left">
            <section class="img-no-optmized-wrapper">
                <h1>Images non optimisées</h1>
                <section class="list-img-no-optimized">
                    <div class="img1"></div>
                    <div class="img2"></div>
                    <div class="img3"></div>
                    <div class="img4"></div>
                    <div class="img5"></div>
                </section>
            </section>


            <section class="bag-wrapper">
                <h1>Sac</h1>
                <div class="list-bag">
                    <!-- Les images déplacées iront ici -->
                </div>
            </section>
        </section>

        <section class="right">
            <section class="optimization">
                <div class="optimization-box">
                    <h1>Optimiser</h1>
                    <div class="loading-optimization-container">
                        <div class="loading-optimization">
                            <div class="loading-bar"></div>
                        </div>
                        <p>Chargement...</p>
                    </div>
                    <button class="optimize-btn">Optimiser une image</button>
                </div>
                <div class="one-little-box-optimized-wrapper">
                    <h2>Images optimisées</h2>
                    <div class="one-little-box-optimized">
                        <!-- Les images optimisées iront ici -->
                    </div>
                </div>
            </section>
        </section>
    </main>
    <script src="../js/mission2.js"></script>
</body>
</html>