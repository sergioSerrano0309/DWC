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

        //si el numero de casillas es un numero par y no es igual a dos se creará la tabla   
        
        let bucle = 0;
        while(bucle == 0)
        {
            if((this.casillas%2) == 0 && this.casillas != 2 && this.casillas > 0){
                
                for (let fila = 0; fila < this.filas; fila++) {
                    this.tablero[fila] = [];

                    for (let columna = 0; columna < this.columnas; columna++) {
                        this.tablero[fila][columna] = '';
                    }
                }

                bucle++;

            }
            //si el número de casillas es 2 no se creará la tabla porque no tendría sentido iniciar el juego por tener una dificultad demasiado sencilla 
            else if(this.casillas == 2)
            {
                alert('pon otro número que así sería demasiado fácil');
               
                let filas = prompt("¿Cuantas filas quieres tener en tu tablero");
                let columnas = prompt("¿Cuantas columnas quieres tener en tu tablero");
                let tablero1 = new Memorin(filas, columnas);
                tablero1.pintarTablero();

            }
            //  si el numero de casillas es negativo lanzará el siguiente error
            else if(this.casillas <= 0)
            {
                alert('El numero de casillas ha de ser mayor que 0');

                let filas = prompt("¿Cuantas filas quieres tener en tu tablero");
                let columnas = prompt("¿Cuantas columnas quieres tener en tu tablero");
                let tablero1 = new Memorin(filas, columnas);
                tablero1.pintarTablero();

            } 
            // si el número de casillas es impar lanzará el siguiente error
            else if((this.casillas%2) != 0)
            {
                alert('El número de casillas ha de ser un número par');

                let filas = prompt("¿Cuantas filas quieres tener en tu tablero");
                let columnas = prompt("¿Cuantas columnas quieres tener en tu tablero");
                let tablero1 = new Memorin(filas, columnas);
                tablero1.pintarTablero();

            }
        }
    }
        //funcion que dibuja el tablero por pantalla
    pintarTablero()
    {
            document.write('<h1>Juego de Memoria</h1>')
            document.write('<table>');

            for (let i = 0; i < this.filas; i++) {
                document.write('<tr>');

                for (let j = 0; j < this.columnas; j++) {
                    document.write(`<td>${this.tablero[i][j]}</td>`);
                }

                document.write('</tr>');
            }
            document.write('</table>');
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
    
}

let filas = prompt("¿Cuantas filas quieres tener en tu tablero");
let columnas = prompt("¿Cuantas columnas quieres tener en tu tablero");
let tablero1 = new Memorin(filas, columnas);        
tablero1.pintarTablero();
