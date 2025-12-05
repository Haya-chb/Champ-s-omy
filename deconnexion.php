<?php
session_start();
session_unset();   
session_destroy(); 
header('Location: identification.php');
exit;
?>