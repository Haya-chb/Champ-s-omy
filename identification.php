<?php

include('connect.php');
echo'<form action="identification.php" method="get">';
echo'<input type="submit" value="Connexion" name="connexion">';
echo'<input type="submit" value="Inscription" name="inscription">';
echo'</form>';


if (isset($_GET['connexion']) && $_GET['connexion'] === 'Connexion'){

header('Location: connexion.php');
exit;
}


elseif (isset($_GET['inscription']) && $_GET['inscription'] === 'Inscription') {

    header('Location: inscription.php');
    exit;
}

?>