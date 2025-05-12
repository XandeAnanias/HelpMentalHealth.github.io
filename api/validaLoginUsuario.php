<?php
    session_start();
    if(isset($_POST['submit']) && !empty(trim($_POST['email'])) && !empty(trim($_POST['senha'])))
    {
        include_once('config.php');
        $email = $_POST['email'];
        $senha = $_POST['senha'];

        $sql = "SELECT * FROM Usuario WHERE email = '$email' and senha = '$senha'";

        $result = $conexao->query($sql);

        if($result->num_rows < 1){
            unset($_SESSION['email']);
            unset($_SESSION['senha']);
            header("Location: loginUsuario.php");
        }
        else{
            $_SESSION['email'] = $email;
            $_SESSION['senha'] = $senha;
            header("Location: sistemaUsuario.php");
        }
    }
    else
    {
        header("Location: loginUsuario.php");
    }

?>