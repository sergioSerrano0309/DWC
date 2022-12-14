document.write('<h1>Juego de Memoria</h1>')
class Tablero{
    constructor(filas, columnas)
    {
    this.filas = filas;
    this.columnas = columnas;
    this.casillas = filas*columnas;

    this.crearTablero();
    }

    //crea la array bidimensional del tablero
    crearTablero()
    {
        this.tablero = [];


        //si el número de casillas es 2 no se creará la tabla porque no tendría sentido iniciar el juego por tener una dificultad demasiado sencilla.
        //si el numero de casillas es negativo lanzará el siguiente error.
        //si el número de casillas es impar lanzará el siguiente error.
            if (this.casillas == 2 || (this.casillas%2) != 0 || this.filas <= 0 || this.columnas <= 0)
            {
                alert('Error en la inserción de valores.');

                let filasNuevas = prompt("¿Cuantas filas quieres tener en tu tablero");
                let columnasNuevas = prompt("¿Cuantas columnas quieres tener en tu tablero");

                let tablero2 = new Memorin(filasNuevas, columnasNuevas);        
                tablero2.pintarTablero();

            }

        //si el numero de casillas es un numero par y no es igual a dos se creará la tabla   
                
            else if((this.casillas%2) == 0 && this.casillas != 2 && this.filas > 0 && this.columnas > 0){
                
                for (let fila = 0; fila < this.filas; fila++) {
                    this.tablero[fila] = [];

                    for (let columna = 0; columna < this.columnas; columna++) {
                        this.tablero[fila][columna] = '';
                    }
                }

            }
            
    }

    pintarTablero()
    {
        let tabla = document.createElement('table');
        let fila;
        let columna;
        
        for (let i = 0; i < this.filas; i++) {
        fila = document.createElement('tr');
        tabla.appendChild(fila);

        for (let j = 0; j < this.columnas; j++) {
            columna = document.createElement('td');
            columna.id = `f${i}_c${j}`;
            fila.appendChild(columna);
            columna.dataset.fila = i;
            columna.dataset.columna = j;
            
            }            
        }

        document.body.appendChild(tabla)
    }
    
}



//clase referente al juego

class Memorin extends Tablero{
    constructor(filas, columnas, casillas) 
    {
        super(filas, columnas, casillas);

        this.ponerParejas();
    }
      
//funcion que colocará las parejas en el tablero

    ponerParejas()
    {   
        let lista = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
        let posicion = 0;
        let contador = 0;
        let posFila;
        let posColumna;

        while (contador < this.casillas) {
                
            posFila = Math.floor(Math.random() * this.filas);
            posColumna = Math.floor(Math.random() * this.columnas);

            if (this.tablero[posFila][posColumna] == '' && posicion != 20)
            {
                this.tablero[posFila][posColumna] = lista[posicion];
                posicion++;
                contador++;
                    
            }
            else if (this.tablero[posFila][posColumna] == '' && posicion == 20)
            {
                posicion = 0;
                this.tablero[posFila][posColumna] = lista[posicion];
                posicion++;
                contador++;
            }
                
        }
               
    }
    
    //funcion que dibuja el tablero por pantalla
    pintarTablero()
    {
        super.pintarTablero();

        let celda;
        this.despejar = this.despejar.bind(this);
        
        for (let i = 0; i < this.filas; i++) {

            for (let j = 0; j < this.columnas; j++) 
            {
                celda = document.getElementById(`f${i}_c${j}`);
                celda.addEventListener('contextmenu', this.despejar);
            }            
        }

        console.log(this.tablero)
    }

    despejar(elEvento) {
        let evento = elEvento || window.event;
        let celda = evento.currentTarget;
        
        this.despejarCelda(celda);
    }

    despejarCelda(celda) {
        document.oncontextmenu = function(){return false}
        let fila = parseInt(celda.dataset.fila);
        let columna = parseInt(celda.dataset.columna);

        // Marcar la celda despejada
        celda.dataset.despejado = true;
        celda.style.backgroundColor = "blue";
        celda.removeEventListener('contextmenu', this.despejar);

        let valorCelda = this.tablero[fila][columna];

        
        let arrayFilas;
        let arrayColumnas; 
 
        celda.innerHTML = valorCelda

    }
}

let filas = prompt("¿Cuantas filas quieres tener en tu tablero?");
let columnas = prompt("¿Cuantas columnas quieres tener en tu tablero?");
let tablero1 = new Memorin(filas, columnas);        
tablero1.pintarTablero();