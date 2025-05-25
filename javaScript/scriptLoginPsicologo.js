const formLogin=document.getElementById("formLoginPsicologo");
let loginInvalido=document.getElementById("login-invalido");
let campoCpf=document.getElementById("cpf");
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

     //criação do form para fazer login
     formLogin.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(formLogin);

            const loginData = {
                cpf: formData.get("cpf"),
                senha: formData.get("senha")
            };

            //fetch para conectar com a api 
            try {
                const response = await fetch("http://localhost:8080/api-hmh/psicologo/login-psicologo", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(loginData),
                    credentials: "include"
                });

                if (!response.ok){
                    loginInvalido.textContent="CPF ou senha incorretos";
                    loginInvalido.style.color="red";
                    campoCpf.style.borderColor="red";     
                    campoSenha.style.borderColor="red";
                }else{
                 loginInvalido.textContent="";
                 campoCpf.style.borderColor="";
                 campoSenha.style.borderColor="";
                 window.location.href = "sistemaPsicologo.html"; 
                }

            } catch (erro) {
                console.error("Erro ao tentar logar: ", erro);
                alert("Erro no login: tente novamente mais tarde");
            }
        });