<?php
session_start();
include("connexion.php");

if (!isset($_SESSION['id_utilisateur'])) {
    header("Location: identification.php");
    exit;
}

$id = $_SESSION['id_utilisateur'];

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    if (isset($_POST['adresse'])) {
        $stmt = $db->prepare("UPDATE utilisateur SET adresse = NULL WHERE id_utilisateur = :id");
        $stmt->bindParam(":id", $id);
        $stmt->execute();
    }

    if (isset($_POST['sang'])) {
        $stmt = $db->prepare("UPDATE utilisateur SET fk_idsang = NULL WHERE id_utilisateur = :id");
        $stmt->bindParam(":id", $id);
        $stmt->execute();
    }

    if (isset($_POST['puceau'])) {

        $_SESSION['hide_puceau'] = 1;

        $stmt = $db->prepare("UPDATE utilisateur SET puceau = 0 WHERE id_utilisateur = :id");
        $stmt->bindParam(":id", $id);
        $stmt->execute();
    }

    header("Location: mission3.php");
    exit;
}

$stmt = $db->prepare("
    SELECT adresse, puceau, groupe
    FROM utilisateur
    LEFT JOIN sang ON utilisateur.fk_idsang = sang.id_sang
    WHERE utilisateur.id_utilisateur = :id
");
$stmt->bindParam(':id', $id, PDO::PARAM_INT);
$stmt->execute();
$utilisateur = $stmt->fetch(PDO::FETCH_ASSOC);

$puceau = ($utilisateur['puceau'] == 0) ? "" : "Oui";


if (isset($_SESSION['hide_puceau']) && $_SESSION['hide_puceau'] == 1) {
    $puceau = "";
}

echo "<table border='1' cellpadding='8' style='border-collapse:collapse; width:600px;'>";

echo "<tr>";
echo "<td><strong>Adresse</strong></td>";
echo "<td>".$utilisateur['adresse']."</td>";
echo "<td>";
echo "<form method='post'>";
echo "<button type='submit' name='adresse'>Supprimer</button>";
echo "</form>";
echo "</td>";
echo "</tr>";

echo "<tr>";
echo "<td><strong>Groupe sanguin</strong></td>";
echo "<td>".$utilisateur['groupe']."</td>";
echo "<td>";
echo "<form method='post'>";
echo "<button type='submit' name='sang'>Supprimer</button>";
echo "</form>";
echo "</td>";
echo "</tr>";

echo "<tr>";
echo "<td><strong>Puceau</strong></td>";
echo "<td>".$puceau."</td>";
echo "<td>";
echo "<form method='post'>";
echo "<button type='submit' name='puceau'>Supprimer</button>";
echo "</form>";
echo "</td>";
echo "</tr>";

echo "</table>";
?>
