<?php
    session_start();
    if(isset($_POST['submit']) && !empty(trim($_POST['cpf'])) && !empty(trim($_POST['senha'])))
    {
        include_once('config.php');
        $cpf = $_POST['cpf'];
        $senha = $_POST['senha'];

        $sql = "SELECT * FROM Psicologo WHERE cpf = '$cpf' and senha = '$senha'";

        $result = $conexao->query($sql);

        if($result->num_rows < 1){
            unset($_SESSION['cpf']);
            unset($_SESSION['senha']);
            header("Location: loginPsicologo.php");
        }
        else{
            $_SESSION['cpf'] = $cpf;
            $_SESSION['senha'] = $senha;
            header("Location: sistemaPsicologo.php");
        }
    }
    else
    {
        header("Location: loginPsicologo.php");
    }

?>