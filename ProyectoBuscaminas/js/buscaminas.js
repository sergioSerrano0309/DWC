let maxFilas = prompt('Cuantas filas quieres?');
let maxColumnas = prompt('Cuantas columnas quieres?');
let numMinas = prompt('Cuantas minas quieres introducir?')
document.write('<table>');

for (let i = 0; i < maxFilas; i++){
document.write('<tr>');

for (let j = 0; j < maxColumnas; j++){
document.write('<td></td>');
}

document.write('</tr>');
}
document.write('</table>');

let arrayTablero = [];

for (let mina = 0; mina < numMimas; mina++){
    posFila = Math.floor(Math.random()*maxFilas)
    arrayTablero[posFila][posColumna] = "MINA";
    console.log(arrayTablero);
}


/* 
    <table>
        <colgroup span="5">
        <tr>
            <td>mina</td>
            <td>2</td>
            <td>2</td>
            <td>mina</td>
            <td>1</td>
        </tr>
        
        <tr>
            <td>1</td>
            <td>2</td>
            <td>mina</td>
            <td>3</td>
            <td>2</td>
        </tr>
        
        <tr>
            <td>1</td>
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>mina</td>
        </tr>
        
        <tr>
            <td>1</td>
            <td>mina</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
        </tr>
        
        <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
        </tr>
    </colgroup>
    </table>
*/