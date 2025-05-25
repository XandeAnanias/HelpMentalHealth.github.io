const formCadastro=document.getElementById("formCadastroUsuario");
let formValidado=true;
let senhaDiferente=document.getElementById("senhas-diferentes");
let campoSenhaConfirmada=document.getElementById("senha-confirmada");
let senhaInvalida=document.getElementById("senha-invalida");
let campoSenha=document.getElementById("senha");
let nomeInvalido=document.getElementById("nome-invalido");
let campoNome=document.getElementById("nome");
let emailInvalido=document.getElementById("email-invalido");
let campoEmail=document.getElementById("email");
let revelaSenha=document.getElementById("revela-senha");
let revelaSenhaConfirmada=document.getElementById("revela-senha-confirmada");

        //revela senha
        revelaSenha.addEventListener('click', function () {
    
        let tipoAtual=campoSenha.getAttribute("type");
        campoSenha.setAttribute("type", tipoAtual==="password"?"text":"password");

        //alterna ícone
        revelaSenha.classList.toggle("fa-eye-slash");
        revelaSenha.classList.toggle("fa-eye");

        //atualiza o title
        revelaSenha.setAttribute("title", tipoAtual === "password" ? "Ocultar senha" : "Mostrar senha");

    });

        //revela senha confirmada
        revelaSenhaConfirmada.addEventListener('click', function () {
    
        let tipoAtual=campoSenhaConfirmada.getAttribute("type");
        campoSenhaConfirmada.setAttribute("type", tipoAtual==="password"?"text":"password");

        //alterna ícone
        revelaSenhaConfirmada.classList.toggle("fa-eye-slash");
        revelaSenhaConfirmada.classList.toggle("fa-eye");

        //atualiza o title
        revelaSenhaConfirmada.setAttribute("title", tipoAtual === "password" ? "Ocultar senha" : "Mostrar senha");

    });

    //criação do form para fazer cadastro
    formCadastro.addEventListener("submit", async (e) => {
      e.preventDefault();
      formValidado=true;

      const formData = new FormData(formCadastro);

      const usuario = {
        nome: formData.get("nome"),
        email: formData.get("email"),
        senha: formData.get("senha")
      };

    //validação do nome do usuario
    if(!validaNome(usuario.nome)){
        nomeInvalido.textContent="O campo nome deve receber um valor válido"
        nomeInvalido.style.color="red";
        campoNome.style.borderColor="red";
        formValidado=false;
    }else{
    nomeInvalido.textContent="";
    campoNome.style.borderColor="";
    usuario.nome=formataNome(usuario.nome);
    }
   
    //validação do email do usuario
    if(!validaEmail(usuario.email)){
        emailInvalido.textContent="O campo email deve receber um valor válido"
        emailInvalido.style.color="red";
        campoEmail.style.borderColor="red";
        formValidado=false;
    }else{
    emailInvalido.textContent="";
    campoEmail.style.borderColor="";
    }

    //validação da senha do usuario
    if(usuario.senha.length<8){
        senhaInvalida.textContent="A senha deve possuir no mínimo 8 caracteres"
        senhaInvalida.style.color="red";
        campoSenha.style.borderColor="red";
        formValidado=false;
    }else{
    senhaInvalida.textContent="";
    campoSenha.style.borderColor="";
    }

    //comparação das senhas do usuario
    if(usuario.senha!==formData.get("senha-confirmada")?.trim()){
        senhaDiferente.textContent="Digite duas senhas iguais para confirmação"
        senhaDiferente.style.color="red";
        campoSenhaConfirmada.style.borderColor="red";
        formValidado=false;
     }else{
     senhaDiferente.textContent="";
     campoSenhaConfirmada.style.borderColor="";
     }

    console.log("Enviando:", JSON.stringify(usuario));

    //fetch para conectar com a api 
    if(formValidado===true){
      try {
        const response = await fetch("http://localhost:8080/api-hmh/usuario/registra-usuario", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(usuario)
        });

        const data = await response.json();


        if (!response.ok) {
          alert("Erro no cadastro: tente novamente mais tarde");
          return;
        }else window.location.href="loginUsuario.html"

    } catch(erro){
     console.error("Erro ao tentar cadastrar: ", erro);
     alert("Houve um problema no servidor: tente novamente mais tarde");
      }
    }

    });

//função que valida o nome do usuário
function validaEmail(email){
    const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return padrao.test(email);
}

//função que valida o email do usuário
function validaNome(nome){
    const padrao=/^[A-Za-zÀ-ÿ\s]{2,}$/;
    return padrao.test(nome);
}

//função que formata o nome do usuário
function formataNome(nomeSobrenome){
    return nomeSobrenome.toLowerCase()
                .split(" ")
                .map(nome=>nome.charAt(0).toUpperCase()+nome.slice(1))  
                .join(" ");
}
