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
        if((this.casillas%2) == 0 && this.casillas != 2 && this.casillas > 0){
            
            for (let fila = 0; fila < this.filas; fila++) {
                this.tablero[fila] = [];

                for (let columna = 0; columna < this.columnas; columna++) {
                    this.tablero[fila][columna] = '';
                }
            }

        }
    //si el número de casillas es 2 no se creará la tabla porque no tendría sentido iniciar el juego por tener una dificultad demasiado sencilla 
        else if(this.casillas == 2){
            alert('pon otro número que así sería demasiado fácil')
        }
    //  si el numero de casillas es negativo lanzará el siguiente error
    else if(this.casillas < 0){
        alert('El numero de casillas ha de ser mayor que dos (como mínimo)')
    } 
    // si el número de casillas es impar lanzará el siguiente error
        else {
            alert('El número de casillas ha de ser un número par')
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
    constructor(filas, columnas, parejas) 
    {
        super(filas, columnas);
        this.parejas = parejas;

        this.ponerParejas();
    }
    /*
//funcion que creará las parejas
    HacerParejas()
    {
        
    }
    */
//funcion que colocará las parejas en el tablero
    ponerParejas()
    {
        let contador = (this.casillas)/2;
        while (contador > 0) 
        {
            let posFila = Math.floor(Math.random() * this.filas);
            let posColumna = Math.floor(Math.random() * this.columnas); 
            
            if (this.tablero[posFila][posColumna] == '')
            {
                this.talero[posFila][posColumna] = "hola";
                contador--;
            }
        }

        while (contador > 0) 
        {
            posFila = Math.floor(Math.random() * this.filas);
            posColumna = Math.floor(Math.random() * this.columnas); 
            
            if (this.tablero[posFila][posColumna] == '')
            {
                this.talero[posFila][posColumna] = "adios";
                contador--;
            }
        }
    }
}

let tablero1 = new Memorin(prompt("¿Cuantas filas quieres tener en tu tablero"),prompt("¿Cuantas columnas quieres tener en tu tablero"));
console.log(tablero1.tablero);
tablero1.pintarTablero();