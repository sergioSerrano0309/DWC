const NUM_PAREJA = 2;
var carta1;
var carta2;
var contador = 0;
var carta1id;
var carta2id;
var contadorPuntos = 0;
var puntos = 0;
var puntosMax = (this.casillas / 2) * 10;
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
        let titulo = document.createElement('h1');
        let puntuacion = document.createElement('h2');

        let reiniciar = document.createElement('button')
        reiniciar.innerHTML = "REINICIAR";
        reiniciar.id = 2;

        titulo.innerHTML = "Juego de Memoria";

        puntuacion.id = 1;
        puntuacion.innerHTML = puntos+"/"+(this.casillas / 2) * 10
        
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

        document.body.appendChild(titulo)
        document.body.appendChild(puntuacion)
        document.body.appendChild(tabla)
        document.body.appendChild(reiniciar)
        

    }
    
}



//clase referente al juego

class Memorin extends Tablero{

    

    constructor(filas, columnas, casillas) 
    {
        super(filas, columnas, casillas);
        this.cartaElegida = new Array();
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
        let btnReinicio;
        
        this.despejar = this.despejar.bind(this);
        
        this.reiniciarJuego = this.reiniciarJuego.bind(this)      
        btnReinicio = document.getElementById(2)
        

        btnReinicio.addEventListener("click", this.reiniciarJuego)


        for (let i = 0; i < this.filas; i++) {

            for (let j = 0; j < this.columnas; j++) 
            {
                celda = document.getElementById(`f${i}_c${j}`);
                celda.addEventListener('contextmenu', this.despejar);
            }            
        }

        console.log(this.tablero)
    }

    reiniciarJuego()
    {
        if(confirm("¿Seguro que quieres reiniciar el juego?")==true)
        {
        location.reload();
        }
    }  

    ganar()
    {
        let contadorDeCasillas = 0;
        let celda;
        let despejado;

        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++){
                
                celda = document.getElementById(`f${i}_c${j}`);
                despejado = celda.getAttribute("data-despejado");
                if(despejado == true)
                {
                    contadorDeCasillas = contadorDeCasillas + 1;
                }
            }
        }
        
        if(contadorDeCasillas >= (this.filas * this.columnas))
        {
            alert("Has ganado");
        }
    }

     despejar(elEvento) {
        document.oncontextmenu = function(){return false}
        let evento = elEvento || window.event;
        let celda = evento.currentTarget;
        
   

        this.despejarCelda(celda);

        
    } 


    despejarCelda(celda) {
        
        document.oncontextmenu = function(){return false}

        let fila = parseInt(celda.dataset.fila);
        let columna = parseInt(celda.dataset.columna);
        let celda1;
        let celda2;
        let valorCelda = this.tablero[fila][columna];

        celda.innerHTML = valorCelda
        celda.style.background = "linear-gradient(90deg, #0066CC 0%, #28b3d6 100%)";
        celda.dataset.despejado = true;

        if(contador == 0)
        {
            carta1 = celda.innerText;
            carta1id = celda.getAttribute("id")
            contador = contador + 1;
            
        }
        else if(contador == 1)
        {
            carta2 = celda.innerText;
            carta2id = celda.getAttribute("id")
           
            if(carta1 != carta2)
            {
                setTimeout(function(){
                    celda1 = document.getElementById(carta1id);
                    celda2 = document.getElementById(carta2id);
                    celda1.style.background = "";
                    celda2.style.background = "";
                    celda1.innerHTML = "";
                    celda2.innerHTML = "";
                    contador = 0;
                    contadorPuntos++
                }, 300);
            }
            else if(carta1 == carta2)
            {
                if(contadorPuntos == 0)
                {
                    
                    contador = 0;
                    contadorPuntos = 0;
                    puntos += 10;
                    document.getElementById(1).innerHTML = puntos+"/"+(this.casillas / 2) * 10;
                    
                }
                else if(contadorPuntos == 1)
                {
                    
                    contador = 0;
                    contadorPuntos = 0;
                    puntos += 5;
                    document.getElementById(1).innerHTML = puntos+"/"+(this.casillas / 2) * 10;
                    
                }
                else if(contadorPuntos == 2)
                {
                    
                    contador = 0;
                    contadorPuntos = 0;
                    puntos += 2.5;
                    document.getElementById(1).innerHTML = puntos+"/"+(this.casillas / 2) * 10;
                    
                }
                else if(contadorPuntos >= 3)
                {
                    
                    contador = 0;
                    contadorPuntos = 0;
                    puntos += 0;
                    document.getElementById(1).innerHTML = puntos+"/"+(this.casillas / 2) * 10;
                    
                }
            }
            console.log(puntos);
            
        }

        this.ganar();
    }

}

window.onload = function() 
{
    let filas = prompt("¿Cuantas filas quieres tener en tu tablero?");
    let columnas = prompt("¿Cuantas columnas quieres tener en tu tablero?");
    let tablero1 = new Memorin(filas, columnas);        
    tablero1.pintarTablero();
}