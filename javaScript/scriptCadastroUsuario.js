const formCadastro = document.getElementById("formCadastroUsuario");
let formValidado=true;
let senhaDiferente=document.getElementById("senhas-diferentes");
let senhaInvalida=document.getElementById("senha-invalida");
let senhaBorder= document.getElementById("senha");
let senhaConfirmadaBorder=document.getElementById("senha-confirmada");
let nomeInvalido=document.getElementById("nome-invalido");
let nomeInput=document.getElementById("nome");
let nome;
let emailInvalido=document.getElementById("email-invalido");
let emailInput=document.getElementById("email");
let email;

    //valida nome em tempo real
    nomeInput.addEventListener("input", () => {
        nome=nomeInput.value.trim();
        if(!validaNome(nome)){}
    })

    //valida email em tempo real
    emailInput.addEventListener("input", () =>{
    
    email=emailInput.value.trim();
    if(!validaEmail(email)){
        emailInvalido.textContent="O campo email deve possuir um valor válido"
        emailInvalido.style.color="red";
        emailInput.style.borderColor="red";
        formValidado=false;
    }else{
        emailInvalido.textContent="";
        emailInput.style.borderColor="";
    }

    })

    //criação do form para fazer cadastro
     formCadastro.addEventListener("submit", async (e) => {
     e.preventDefault();

     const formData = new FormData(formCadastro);
    
     if(formData.get("senha")?.trim()!=formData.get("senha-confirmada")?.trim()){
        senhaDiferente.textContent="Digite duas senhas iguais para confirmação"
        senhaDiferente.style.color="red";
        senhaConfirmadaBorder.style.borderColor="red";
        formValidado=false;
     }else{
     senhaDiferente.textContent="";
     senhaConfirmadaBorder.style.borderColor="";
     }
    
    const usuario = {
     nome: formData.get("nome")?.trim(),
     email: formData.get("email")?.trim(),
     senha: formData.get("senha")?.trim()
    };

    if(!usuario.nome){
        nomeInvalido.textContent="O campo nome não pode ser vazio"
        nomeInvalido.style.color="red";
        nomeBorder.style.borderColor="red";
        formValidado=false;
    }else{
    nomeInvalido.textContent="";
    nomeBorder.style.borderColor="";
    }
   

 /*   if(!usuario.email||!usuario.email.includes("@")){
        emailInvalido.textContent="O campo email deve possuir um valor válido"
        emailInvalido.style.color="red";
        emailBorder.style.borderColor="red";
        formValidado=false;
    }else{
    emailInvalido.textContent="";
    emailBorder.style.borderColor="";
    }*/

    if(!usuario.senha||usuario.senha.length<8){
        senhaInvalida.textContent="A senha deve possuir no mínimo 8 caracteres"
        senhaInvalida.style.color="red";
        senhaBorder.style.borderColor="red";
        formValidado=false;
    }else{
    senhaInvalida.textContent="";
    senhaBorder.style.borderColor="";
    }

    if(formValidado=false){ 
    console.log("Enviando:", JSON.stringify(usuario));

     try {
        const response = await fetch("http://localhost:8080/api-hmh/usuario/registra-usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
     });

        const data = await response.json();

        if (!response.ok) {
        alert("Erro no cadastro: " + (data.mensagem || "Erro desconhecido"));
        return;
        }

        alert(data.mensagem);
    } catch (err) {
     alert("Erro na requisição: " + err.message);
    }
}
});

function validaEmail(email){
    const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return padrao.test(email);
}

function validaNome(nome){
    const padrao=/^[A-Za-zÀ-ÿ\s]+{2,}$/;
    return padrao.test(nome);
}
    