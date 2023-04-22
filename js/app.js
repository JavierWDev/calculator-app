//Import de la funcionalidad de la calculadora
import calculadora from "./calculator.mjs";

//Constantes a utilizar
const $contenedorRadio = document.querySelectorAll('input[type="radio"]');

document.addEventListener("DOMContentLoaded", iniciarApp);

function iniciarApp(){
    //Obtener del localStorage
    const theme = localStorage.getItem("theme");
    if(theme === null){
        document.body.classList.add("theme--1");
    }else{
        document.body.classList.add(theme);
    }

    themeSelection();

    $contenedorRadio.forEach($radio => {
        $radio.addEventListener("click", themeSelection);
    });

    calculadora;
}

function themeSelection(){
    const value = document.querySelector('input[type="radio"]:checked');
    const body = document.querySelector("body");
    let themeDefault = "";

    switch(value.id){
        case "theme--1":
            //Quitar clase al body
            try {
                body.classList.remove("theme--2");
                body.classList.remove("theme--3");
                themeDefault = "theme--1";
            } catch (error) { }
            break;
        case "theme--2":
            //Quitar clase al body
            try {
                body.classList.remove("theme--3");
                body.classList.add("theme--2");
                themeDefault = "theme--2";
            } catch (error) { }
            break;
        case "theme--3":
                //Quitar clase al body
                try {
                    body.classList.remove("theme--2");
                    body.classList.add("theme--3");
                    themeDefault = "theme--3";
                } catch (error) { }
                break;
        default:
            break;
    }

    localStorage.setItem("theme", themeDefault);
}