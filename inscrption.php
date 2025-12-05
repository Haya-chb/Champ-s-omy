<?php
session_start();
include('connect.php');


echo '<form action="inscription.php" method="post">';

echo '<div>';
echo '<label for="login">Login :</label><br>';
echo '<input type="text" id="login" name="login" required>';
echo '</div>';

echo '<div>';
echo '<label for="pswd">Mot de passe :</label><br>';
echo '<input type="password" id="pswd" name="pswd" required>';
echo '</div>';


echo "<label for='sang'>Quel est ton groupe sanguin ? :</label>
<select name='sang' id='sang'>";

$stmt = $db->query('SELECT * FROM sang');
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($result as $row) {
    echo '<option value="'.$row['id_sang'].'">'.$row['groupe'].'</option>';
}

echo "</select><br><br>";


echo '<div>';
echo '<label for="adresse">Adresse :</label><br>';
echo '<input type="text" id="adresse" name="adresse">';
echo '</div><br>';

echo '<fieldset>';
echo '<legend>Es-tu puceau ?</legend>';

echo '<label><input type="radio" name="puceau" value="0" required> Non</label>';
echo '<label><input type="radio" name="puceau" value="1" required> Oui</label>';

echo '</fieldset>';


echo '<input type="submit" name="valider_inscription" value="Inscription">';

echo '</form>';



if (isset($_POST['valider_inscription'])) {

    $login   = $_POST['login'];
    $mdp     = $_POST['pswd'];
    $hash    = password_hash($mdp, PASSWORD_DEFAULT);

    $puceau  = (int) $_POST['puceau'];
    $adresse = $_POST['adresse'] ?? null;
    $sang    = (int) $_POST['sang'];


   
    $check = $db->prepare('SELECT login FROM utilisateur WHERE login = :login LIMIT 1');
    $check->bindParam(':login', $login);
    $check->execute();

    if ($check->fetch()) {
        echo '<p style="color:red;">Ce login est déjà pris.</p>';
    } else {

       
        $stmt = $db->prepare(
            'INSERT INTO utilisateur (login, password, puceau, adresse, fk_idsang)
             VALUES (:login, :password, :puceau, :adresse, :sang)'
        );

        $stmt->bindParam(':login', $login);
        $stmt->bindParam(':password', $hash);
        $stmt->bindParam(':puceau', $puceau, PDO::PARAM_INT);
        $stmt->bindParam(':adresse', $adresse);
        $stmt->bindParam(':sang', $sang, PDO::PARAM_INT);

        $stmt->execute();

       
        $id = $db->lastInsertId();
        $_SESSION['id_utilisateur'] = $id;

        header('Location: index.php');
        exit;
    }
}
?>
