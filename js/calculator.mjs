//Arreglo que contendrá a todos los numeros
let numbers = ["0"];
let operations = [];
//Esta será mi bandera para identificar cuando se refiera a un nuevo numero
let change = false; 

//Contenedor de los botones
const $contenedorBotones = document.getElementById("buttons");
const $result = document.getElementById("result");

//Agrego evento al contenedor
$contenedorBotones.addEventListener("click", (e) =>{
    //Event Bubbling a botones de mi contenedor
    if(e.target.classList.contains("button")){

        const isNumber = Number.parseInt(e.target.value);   

        //Si es un número el seleccionado, ejecuto lo siguiente
        if(!isNaN(isNumber)){
            selectNumber(isNumber);
        }else{
            const value = e.target.value;

            //Detectar si presiono el btn Igual "="" 
            if(value === "="){
                equalKey();
            }
            //Detectar si presiono el btn Del "Del" 
            else if(value === "Del"){
                alert("Este no funca :D");
            }
            //Detectar si presiono el btn Reset "Reset"" 
            else if(value === "Reset"){
                reset();
            }
            //Detectar si presiono el punto "."
            else if(value === "."){
                asignDot();
            }
            //Selecciono una operacion
            else{
                asignOperation(value);
            }
        }
    }

    screenResult();
});

/* ****************************************************************

                    Logica de la Calculadora 
                    
****************************************************************  */

//Function selectNumber
//Si el usuario clickeo un numero, debo identificar a cual de los numeros agregados se hará una modificación
function selectNumber(number){
    if(!change)
    {
        //Nos referimos al elemento actual
        const positionArray = (numbers.length) - 1;
        asignNumber(positionArray, number);
    }else{
        //Hay que cambiar de numero actual
        const positionArray = numbers.length;
        numbers[positionArray] = "0";
        asignNumber(positionArray, number);
    }
}

//Function asignNumber
//Ingreso a mi arreglo de números y modifico los valores dependiendo de algunas validaciones
function asignNumber(position, number){
    const arrayValue = numbers[position];

    if((arrayValue === '0') && (number === 0)){
        //No asignare nada
    }else if((arrayValue === '0') && (number !== 0)){
        //Reemplazar el 0 por el nuevo valor
        numbers[position] = ''+number; 
    }else{
        //Aumentar el numero del arreglo actual
        numbers[position] = ''+numbers[position]+''+number;
    }

    //Cambiamos el valor de la bandera a false para mantenernos en el numero asignado
    change = false;
}

//Funcion asignDot
//Agrega un solo punto decimal a los numeros que no posean uno
function asignDot(){
    const positionArray = (numbers.length) - 1;
    const arrayValue = numbers[positionArray];

    if(!arrayValue.includes(".")){
        numbers[positionArray] = ''+numbers[positionArray]+'.';
    }

    //Cambiamos el valor de la bandera a false para mantenernos en el numero asignado
    change = false;
}

//Function asignOperation
//Agrega la operacion al arreglo de Operaciones
function asignOperation(btnSelected){
    const valueSelected = btnSelected;
    
    //Si change es falso es porque es la primera vez que se agregará un numero
    if(!change){
        switch (valueSelected) {
            case '+':
                operations.push("+");
                break;
            case '-':
                operations.push("-");
                break;
            case 'x':
                operations.push("x");
                break;
            case '/':
                operations.push("/");
                break;
            default:
                break;
        }
    }

    //Cambiamos el valor de la bandera para indicar que otro numero será agregado
    change = true;
}

/* 
Funcion rmvNumber
Debo modificarla, esta debe ser capaz de borrar numeros y operadores modificando la cadena resultante
function rmvNumber(){
    const positionArray = (numbers.length) - 1;
    const arrayValue = numbers[positionArray];

    if(arrayValue !== "0"){
        const newValue = arrayValue.substring(0, arrayValue.length-1);
        numbers[positionArray] = newValue;
    }

    
    if(arrayValue.length === 1){
        numbers[positionArray] = "0";
    }

    screenResult();
}
*/

//Function reset
//Restaurará los valores a por defecto limpiando la calculadora
function reset(){
    numbers = ["0"];
    operations = [];
    change = false; 

    screenResult();
}

//Function screeenResult
//Imprimirá en la pantallita los resultados de las operaciones
//Para una v.1 añadir un parametro identificador para crear un tag de la operacion si se selecciono "=" - JAAF 21/4/2023
function screenResult(){
    
    //Obtengo la longitud del arreglo de numeros
    const sizeNumbers = numbers.length;
    let sizeOperations = 0;

    //Compruebo si mi arreglo de operaciones tiene alguna
    let hasOperations = false;
    if((operations[0] !== undefined)){
        //Mi arreglo tiene una operacion
        hasOperations = true;
    }

    if(hasOperations){
        sizeOperations = operations.length;

        let content = "";

        for (let i = 0; i < sizeNumbers; i++) {
            if(operations[i] === undefined){
                content += numbers[i];
            }else{
                content += numbers[i]+operations[i];
            }
        }

        $result.textContent = content; 

        return;
    }

    let content = "";

    for (let i = 0; i < sizeNumbers; i++) {
        content += numbers[i];
    }

    //Actualizo la pantalla de resultado
    $result.textContent = content; 
}   

/* ******************************************************************

                        Logica del btnIgual

******************************************************************* */

function equalKey(){
    const operation = $result.textContent;

    //Validaciones
    //Si el ultimo string de mi cadena de operacion no es un número, esta mal realizada la operacion
    const isNumber = Number.parseInt(operation[operation.length-1]);
    if(isNaN(isNumber)){
        alert("Hace falta otro numero para realizar la operacion");
        return;
    }

    //Necesito dar prioridad a algunas operaciones
    //Utilizando este metodo descartamos todas las multiplicaciones y divisiones
    rmvMulti_Division();

    //Solo nos queda la suma y la resta
    rmvPlus_Minus();

}


function rmvMulti_Division(){

    let needsReduce = operations.includes("x") || operations.includes("/");

    while(needsReduce){
        operations.forEach( (operacion, index) => {
            if(operacion === "x" || operacion === "/"){
                //El index actual representará el numero anterior a efectuar la operacion
                //El index+1 es el valor con el que se efectuará la operacion
                const numAct = Number.parseFloat(numbers[index]);
                const numSig = Number.parseFloat(numbers[index+1]);
    
                if(operacion === "x"){
                    const res = numAct*numSig;
                    numbers[index+1] = res;
                    numbers.splice(index, 1);
                    operations.splice(index,1);
                }else{
                    const res = numAct/numSig;
                    numbers[index+1] = res;
                    numbers.splice(index, 1);
                    operations.splice(index,1);
                }
            }
        });

        needsReduce = operations.includes("x") || operations.includes("/");
    }
}

function rmvPlus_Minus(){

    let needsReduce = operations.includes("+") || operations.includes("-");

    while(needsReduce){
        operations.forEach( (operacion, index) => {
            if(operacion === "+" || operacion === "-"){
                //El index actual representará el numero anterior a efectuar la operacion
                //El index+1 es el valor con el que se efectuará la operacion
                const numAct = Number.parseFloat(numbers[index]);
                const numSig = Number.parseFloat(numbers[index+1]);
    
                if(operacion === "+"){
                    const res = numAct+numSig;
                    numbers[index+1] = res;
                    numbers.splice(index, 1);
                    operations.splice(index,1);
                }else{
                    const res = numAct-numSig;
                    numbers[index+1] = res;
                    numbers.splice(index, 1);
                    operations.splice(index,1);
                }
            }
        });

        needsReduce = operations.includes("+") || operations.includes("-");
    }

}

const calculadora = {};

export default calculadora;