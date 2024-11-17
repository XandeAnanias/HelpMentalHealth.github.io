let eyeicon = document.getElementById("eyeicon");
let password = document.getElementById("formGroupSenha")
let password2 = document.getElementById("formGroupSenha2")
let eyeicon2 = document.getElementById("eyeicon2")

eyeicon.onclick = function () {
    if (password.type == "password") {
        password.type = "text";
        eyeicon.src = "imagens/olho-aberto.png";
    }
    else {
        password.type = "password";
        eyeicon.src = "imagens/olho-fechado.png";
    }
}

eyeicon2.onclick = function () {
    if (password2.type == "password") {
        password2.type = "text";
        eyeicon2.src = "imagens/olho-aberto.png";
    }
    else {
        password2.type = "password";
        eyeicon2.src = "imagens/olho-fechado.png";
    }
}


const customSelect = document.querySelector(".custom-select");
const selectBtn = document.querySelector(".select-button");

const selectedValue = document.querySelector(".selected-value");
const optionsList = document.querySelectorAll(".select-dropdown li");

// add click event to select button
selectBtn.addEventListener("click", () => {
  // add/remove active class on the container element
  customSelect.classList.toggle("active");
  // update the aria-expanded attribute based on the current state
  selectBtn.setAttribute(
    "aria-expanded",
    selectBtn.getAttribute("aria-expanded") === "true" ? "false" : "true"
  );
});

optionsList.forEach((option) => {
  function handler(e) {
    // Click Events
    if (e.type === "click" && e.clientX !== 0 && e.clientY !== 0) {
      selectedValue.textContent = this.children[1].textContent;
      customSelect.classList.remove("active");
    }
    // Key Events
    if (e.key === "Enter") {
      selectedValue.textContent = this.textContent;
      customSelect.classList.remove("active");
    }
  }

  option.addEventListener("keyup", handler);
  option.addEventListener("click", handler);
});