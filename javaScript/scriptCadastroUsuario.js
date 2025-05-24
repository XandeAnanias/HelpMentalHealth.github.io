const formCadastro=document.getElementById("formCadastroPsicologo");
let formValidado=true;
let senhaDiferente=document.getElementById("senhas-diferentes");
let campoSenhaConfirmada=document.getElementById("senha-confirmada");
let senhaInvalida=document.getElementById("senha-invalida");
let campoSenha=document.getElementById("senha");
let nomeInvalido=document.getElementById("nome-invalido");
let campoNome=document.getElementById("nome");
let emailInvalido=document.getElementById("email-invalido");
let campoEmail=document.getElementById("email");
let cpfInvalido=document.getElementById("cpf-invalido");
let campoCpf=document.getElementById("cpf");
let estadoInvalido=document.getElementById("estado-invalido");
let campoEstado=document.getElementById("estado");
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

    //formata o cpf em tempo real
    campoCpf.addEventListener("input", function(){
        let valor=campoCpf.value;
        valor=valor.replace(/\D/g,'');
        valor=valor.slice(0,11);

        if(valor.length>3){
         valor=valor.replace(/^(\d{3})(\d)/, '$1.$2');
        }
        if(valor.length>6){
         valor=valor.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
        }
        if(valor.length>9){
         valor=valor.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
        }
      
        campoCpf.value=valor;
    });

    //criação do form para fazer cadastro
    formCadastro.addEventListener("submit", async (e) => {
      e.preventDefault();
      formValidado=true;

      const formData = new FormData(formCadastro);

      const psicologo = {
        nome: formData.get("nome"),
        cpf: formData.get("cpf"),
        estado: formData.get("estado"),
        email: formData.get("email"),
        senha: formData.get("senha")
      };

    //validação do nome do psicólogo
    if(!validaNome(psicologo.nome)){
        nomeInvalido.textContent="O campo nome deve receber um valor válido"
        nomeInvalido.style.color="red";
        campoNome.style.borderColor="red";
        formValidado=false;
    }else{
    nomeInvalido.textContent="";
    campoNome.style.borderColor="";
    psicologo.nome=formataNome(psicologo.nome);
    }

    //valida o cpf do psicólogo
    if(!validaCpf(psicologo.cpf)){
        cpfInvalido.textContent="O campo cpf deve receber um valor válido";
        cpfInvalido.style.color="red";
        campoCpf.style.borderColor="red";
        formValidado=false;
    }else{
        cpfInvalido.textContent="";
        campoCpf.style.borderColor="";
    }
   
    //validação do email do psicólogo
    if(!validaEmail(psicologo.email)){
        emailInvalido.textContent="O campo email deve receber um valor válido"
        emailInvalido.style.color="red";
        campoEmail.style.borderColor="red";
        formValidado=false;
    }else{
    emailInvalido.textContent="";
    campoEmail.style.borderColor="";
    }

    //valida o estado do psicólogo
    if(!psicologo.estado){
        estadoInvalido.textContent="O campo estado deve receber um valor válido";
        estadoInvalido.style.color="red";
        campoEstado.style.borderColor="red";
        formValidado=false;
    }else{
        estadoInvalido.textContent="";
        campoEstado.style.borderColor="";
    }

    //validação da senha do psicólogo
    if(psicologo.senha.length<8){
        senhaInvalida.textContent="A senha deve possuir no mínimo 8 caracteres"
        senhaInvalida.style.color="red";
        campoSenha.style.borderColor="red";
        formValidado=false;
    }else{
    senhaInvalida.textContent="";
    campoSenha.style.borderColor="";
    }

    //comparação das senhas do psicólogo
    if(psicologo.senha!==formData.get("senha-confirmada")?.trim()){
        senhaDiferente.textContent="Digite duas senhas iguais para confirmação"
        senhaDiferente.style.color="red";
        campoSenhaConfirmada.style.borderColor="red";
        formValidado=false;
     }else{
     senhaDiferente.textContent="";
     campoSenhaConfirmada.style.borderColor="";
     }

    console.log("Enviando:", JSON.stringify(psicologo));

    //fetch para conectar com a api 
    if(formValidado===true){
      try {
        const response = await fetch("http://localhost:8080/api-hmh/psicologo/registra-psicologo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(psicologo)
        });

        const data = await response.json();


        if (!response.ok) {
          alert("Erro no cadastro: tente novamente mais tarde");
          return;
        }else window.location.href="../psicologo/loginPsicologo.html"

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

//função para validar o cpf do psicólogo
function validaCpf(cpf){
    
    cpf = cpf.replace(/\D/g, ''); 

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let digito1 = 11 - (soma % 11);
    if (digito1 >= 10) digito1 = 0;
    if (digito1 !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }

    let digito2 = 11 - (soma % 11);
    if (digito2 >= 10) digito2 = 0;
    return digito2 === parseInt(cpf.charAt(10));

}

//função que formata o nome do usuário
function formataNome(nomeSobrenome){
    return nomeSobrenome.toLowerCase()
                .split(" ")
                .map(nome=>nome.charAt(0).toUpperCase()+nome.slice(1))  
                .join(" ");
}
