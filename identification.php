<?php

echo`<form action="identification.php" method="get">
<input type="submit" value="Connexion" name="connexion">
<input type="submit" value="Inscription" name="inscription">
</form>`;


if (isset($_GET['connexion']) && $_GET['connexion'] === 'Connexion'){

header('Location: connexion.php');
}


elseif (isset($_GET['inscription']) && $_GET['inscription'] === 'Inscription') {

    header('Location: inscription.php');
}






?>