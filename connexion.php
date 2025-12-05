<?php

session_start();
include('connect.inc.php');?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>


<img src="<img src="../img/Personnage/corps.png" alt="">



<?php
echo '<form action="connexion.php" method="post">';

echo '<div>';
echo '<label for="login">Login :</label><br>';
echo '<input type="text" id="login" name="login">';
echo '</div>';

echo '<div>';
echo '<label for="pswd">Mot de passe :</label><br>';
echo '<input type="password" id="pswd" name="pswd">';
echo '</div> <br>';

echo '<input type="submit" name="connexion" value="Connexion">';

echo '</form>';



if (isset($_POST['connexion'])) {

    $login = trim($_POST['login']);
    $password = $_POST['pswd'];

    $stmt = $db->prepare('SELECT id_utilisateur, login, password
                          FROM utilisateur 
                          WHERE login = :login');

    $stmt->bindParam(':login', $login, PDO::PARAM_STR);
    $stmt->execute();
    $utilisateur = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($utilisateur && password_verify($password, $utilisateur['password'])) {

        $_SESSION['id_utilisateur'] = $utilisateur['id_utilisateur'];
        header('Location: index.php');
        exit;

    } else {
        echo '<p>Login ou mot de passe incorrect.</p>';
    }
}
?>
