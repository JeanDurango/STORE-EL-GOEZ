// Selecciona el botón para abrir el menú
const openMenu = document.querySelector("#open-menu");

// Selecciona el botón para cerrar el menú
const closeMenu = document.querySelector("#close-menu");

// Selecciona el elemento aside que representa el menú
const aside = document.querySelector("aside");

// Añade un evento de clic al botón de abrir menú para mostrar el menú
openMenu.addEventListener("click", () => {
    aside.classList.add("aside-visible"); // Añade la clase para hacer visible el menú
})

// Añade un evento de clic al botón de cerrar menú para ocultar el menú
closeMenu.addEventListener("click", () => {
    aside.classList.remove("aside-visible"); // Elimina la clase para ocultar el menú
})

