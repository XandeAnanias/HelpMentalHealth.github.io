<?php

    if(isset($_POST["submit"])){
     include_once('config.php');

     $nome = $_POST['nome'];
     $email = $_POST['email'];
     $senha = $_POST['senha'];

    $result = mysqli_query($conexao,"INSERT INTO Usuario(nome, email, senha) 
    VALUES ('$nome', '$email', '$senha')");

    header("Location: loginUsuario.php");
    }
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Cadastro - HMH</title>
    <link rel="icon" type="image/x-icon" href="imagens/Logo.png">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        body {
            font-family: 'Poppins', sans-serif;
        }
    </style>
</head>
<body class="bg-gray-50 min-h-screen flex flex-col">

    <!-- Container principal -->
    <div class="flex flex-1">
        <!-- Lado esquerdo com imagem -->
        <div class="hidden md:block md:w-2/3 bg-blue-600 bg-opacity-10">
            <div class="h-full flex items-center justify-center p-12">
                <div class="max-w-full">
                    <div class="flex justify-center">
                    <img src="imagens/conversa.png" class="w-50 h-50">
                    </div>
                    <h1 class="text-4xl font-bold text-[#264466] mb-4 text-center">Saúde mental como você precisa</h1>
                    <p class="text-lg text-gray-600 text-center">Conecte-se com os psicólogos de uma forma inusitada e acompanhe a comunidade.</p>
                </div>
            </div>
        </div>

        <!-- Lado direito com formulário -->
        <div class="w-full md:w-1/2 flex items-center justify-center p-8">
            <div class="w-full max-w-md">
                <!-- Logo -->
                <div class="mb-8 flex justify-start items-center">
                    <img src="imagens/Logo.png" alt="Logo" class="h-16 mr-5">
                    <h2 class="text-2xl font-bold text-[#264466] text-center">Help Mental Health</h2>
                </div>

               
                
                <p class="font-sans text-gray-600 text-start mb-8">Preencha os campos com seus dados para efetuar seu cadastro.</p>

                <!-- Formulário -->
                <form class="space-y-6" action="cadastroUsuario.php" method="post">
                    <div>
                        <label for="nome" class="block text-sm font-medium text-gray-700 mb-1">Nome de Exibição</label>
                        <input type="text" id="email" placeholder="Digite seu nome" required name="nome"
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264466] focus:border-transparent">
                    </div>


                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                        <input type="text" id="email" placeholder="Digite o seu e-mail" required name="email"
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264466] focus:border-transparent">
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                        <input type="password" id="password" placeholder="Digite a sua senha" required name="senha"
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264466] focus:border-transparent">
                    </div>

                     <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Confirme sua Senha</label>
                        <input type="password" id="password" placeholder="Repita a senha que digitou acima" required
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264466] focus:border-transparent">
                    </div>

                    <!-- <div class="flex items-center justify-between">
                        <div class="flex items-center">
                             <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-[#264466] focus:ring-[#264466] border-gray-300 rounded">
                            <label for="remember-me" class="ml-2 block text-sm text-gray-700">Lembrar-me</label>
                        </div>
                        <div class="text-sm">
                            <a href="#" class="font-medium text-[#264466] hover:text-[#1a2f45] underline">Esqueceu sua senha?</a>
                        </div>
                    </div> -->

                    <div>
                        <button type="submit" name="submit" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#264466] hover:bg-[#1a2f45] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#264466] transition duration-200">
                            Cadastrar
                        </button>
                    </div>
                </form>

                <div class="mt-6 text-center">
                    <p class="text-sm text-gray-600">
                        Já possui uma conta? <a href="loginUsuario.php" class="font-medium text-[#264466] hover:text-[#1a2f45] underline">Entre agora</a><br><br>
                        <a href="#" class="font-medium text-[#264466] hover:text-[#1a2f45] underline"> Voltar para a Página Inicial </a>
                    </p>
                </div>

                <!-- Rodapé -->
                <div class="mt-16 pt-6 border-t border-gray-200">
                    <p class="text-xs text-gray-500 text-center">
                        Precisa de ajuda?<br>
                        Apoio pelo email: helpmentalhealth@gmail.com
                    </p>
                </div>
            </div>
        </div>
    </div>

</body>
</html>