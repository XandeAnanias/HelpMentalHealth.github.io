<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Login - HMH</title>
    <link rel="icon" type="image/x-icon" href="../../../imagens/Logo.png">
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
                    <img src="../../../imagens/equipe-medica (1).png" class="w-50 h-50">
                    </div>
                    <h1 class="text-4xl font-bold text-[#264466] mb-4 text-center">Boas vindas à Help Mental Health</h1>
                    <p class="text-lg text-gray-600 text-center">Conecte-se com pessoas e permita que apreciem seu trabalho.</p>
                </div>
            </div>
        </div>

        <!-- Lado direito com formulário -->
        <div class="w-full md:w-1/2 flex items-center justify-center p-8">
            <div class="w-full max-w-md">
                <!-- Logo -->
                <div class="mb-8 flex justify-center items-center">
                    <img src="../../../imagens/Logo.png" alt="Logo" class="h-20 mr-5">
                    <h2 class="text-2xl font-bold text-[#264466] text-center">Help Mental Health</h2>
                </div>

               

                <!-- Formulário -->
                <form class="space-y-6" action="validaLoginPsicologo.php" method="post">
                    <div>
                        <label for="cpf" class="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                        <input type="text" id="cpf" placeholder="Digite o seu CPF" required name="cpf"
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264466] focus:border-transparent">
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                        <input type="password" id="password" placeholder="Digite a sua senha" required name="senha"
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264466] focus:border-transparent">
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <!-- <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-[#264466] focus:ring-[#264466] border-gray-300 rounded">
                            <label for="remember-me" class="ml-2 block text-sm text-gray-700">Lembrar-me</label> -->
                        </div>
                        
                        <div class="text-sm">
                            <a href="#" class="font-medium text-[#264466] hover:text-[#1a2f45] underline">Esqueceu sua senha?</a>
                        </div>
                    </div>

                    <div>
                        <button type="submit" name="submit" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium
                         text-white bg-[#264466] hover:bg-[#1a2f45] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#264466] transition duration-200">
                            Acessar conta
                        </button>
                    </div>

                     <div>
                        <button onclick="window.location.href='cadastroPsicologo.php'" class="w-full flex justify-center py-3 px-4 border-2 rounded-lg shadow-sm text-sm font-medium
                         text-[#264466] bg-white border-[#264466] hover:bg-[#1a2f45] hover:text-white hover:border-transparent 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#264466] transition duration-200">
                            Criar Cadastro
                        </button>
                    </div>
                </form>

                <div class="mt-6 text-center">
                    <p class="text-sm text-gray-600">
                        <!-- Não tem uma conta? <a href="#" class="font-medium text-[#264466] hover:text-[#1a2f45] underline">Crie agora</a><br><br> -->
                        <a href="../../../html/index.html" class="font-medium text-[#264466] hover:text-[#1a2f45] underline"> Voltar para a Página Inicial </a>
                    </p>
                </div>

                <!-- Rodapé -->
                <div class="mt-16 pt-6 border-t border-gray-200">
                    <p class="text-xs text-gray-500 text-center">
                        Problemas para entrar?<br>
                        Entre em contato conosco pelo e-mail de apoio helpmentalhealth@gmail.com
                    </p>
                </div>
            </div>
        </div>
    </div>

</body>
</html>