const body = document.querySelector("body"),
sidebar = body.querySelector(".sidebar"), 
toggle = body.querySelector(".toggle"),
searchBtn = body.querySelector(".search-box"), 
modeSwtich = body.querySelector(".toggleSwitch"), 
modeText = body.querySelector(".mode-text"),
toggleSwitch = body.querySelector(".toggleSwitch"),
sun = body.querySelector("#sun"),
moon = body.querySelector("#moon");

toggle.addEventListener("click", () =>{ 
    sidebar.classList.toggle("close");
});


modeSwtich.addEventListener("click", () =>{
    body.classList.toggle("dark");

    if(body.classList.contains("dark")){
        modeText.innerText = "Escuro"}
    else{
        modeText.innerText = "Claro"
        }
    });

    