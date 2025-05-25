<?php
    session_start();
    unset($_SESSION['cpf']);
    unset($_SESSION['senha']);
    unset($_SESSION['email']);
    header("Location: ../../html/index.html");
?>