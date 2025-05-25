const formLogin = document.getElementById("formLoginUsuario");
let loginInvalido= document.getElementById("login-invalido");
let campoEmail=document.getElementById("email");
let campoSenha=document.getElementById("senha");
let revelaSenha=document.getElementById("revela-senha");

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


    //criação do form para fazer login
    formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(formLogin);

    const loginData = {
        email: formData.get("email"),
        senha: formData.get("senha")
    };

    //fetch para conectar com a api 
    try {
        const response = await fetch("http://localhost:8080/api-hmh/usuario/login-usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData),
            credentials: "include"
        });

        if (!response.ok){
            loginInvalido.textContent="Email ou senha incorretos";
            loginInvalido.style.color="red";
            campoEmail.style.borderColor="red";     
            campoSenha.style.borderColor="red";         
        }else{
         loginInvalido.textContent="";
         campoEmail.style.borderColor="";
         campoSenha.style.borderColor="";
         window.location.href = "../usuario/sistemaUsuario.html";
        }

    } catch(erro){
        console.error("Erro ao tentar logar: ", erro);
        alert("Erro no login: tente novamente mais tarde");
    }
});