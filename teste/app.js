 

const multiplo3_5 = (max) => {
    let multiplos3 = 0
    let multiplos5 = 0
    for (let i = 0; i <= max; i++){
        if (i % 3 === 0){
            multiplos3 += i
        }
        if (i % 3 === max) {
            multiplos5 += i
        }
    }
    console.log(multiplos3 + multiplos5)
} 

multiplo3_5(10)


// mudaLetras('eduardo')


/* Utilizando uma linguagem de programação, implementa a função MudaLetras(str) que recebe como parâmetro a variável str e que tem o seguinte algoritmo:

1 - Substitui todas as letras na string str com a letra seguinte do alfabeto (por exemplo “c” transforma-se em “d”, “z” transforma-se em “a”). 

2 - Substitui todas as vogais presentes na nova string (“a”, “e”, “i”, “o”, “u”) por maiúsculas, e finalmente retorna a nova string modificada.

Exemplos de Casos de Teste:
Input:"hello*3"
Output:"Ifmmp*3"

Input:"fun times!"
Output:"gvO Ujnft!" */

const str = "eduardo" 
const alphabet = "abcdefghijklmnopqrstuvwxyz"; 
const vowels = ['a', 'e', 'i', 'o', 'u'] 

const changeLetters = (string) => {   

    let newStr = 'f'
    
    for (let i = 0; i < string.length; i++) { 

      const indexTheNextLetter = alphabet.indexOf(string[i]) +1;
      const nextLetterAlphabet = alphabet.charAt(indexTheNextLetter);
      
      newStr += string[i].replace(string[i], nextLetterAlphabet);
      
      const includesVowelInNewStr = vowels.includes(newStr[i]); 
      const vowelUpperCase = newStr[i].toUpperCase();

       if(includesVowelInNewStr){
          newStr = newStr.replace(newStr[i], vowelUpperCase)
        }
    } 
    
    console.log(newStr)
}


changeLetters(str) 



/* const changeLetters = str => str
  .replace(/(z)|([dhnt])|[a-y]/gi, (match, x, y) => {
    match = x ? 'A' : String.fromCharCode(match.charCodeAt(0) + 1)
    return y ? match.toUpperCase() : match
  })

console.log(changeLetters('fun times!')) // gvO Ujnft!
console.log(changeLetters('hello*3')) // Ifmmp*3 */


/* console.log(arrayAlfabeto)
console.log(arrayStr); */

/* var txt = 'Eduardo'
var newTxt = "";
var newTxt2= "";

for (var i = 0; i<txt.length; i++){
  if (txt.charAt(i).contains(" ")){
    newTxt = newTxt.concat(" ");//checks for spaces
  }else if (txt.charAt(i) === "z"){
    newTxt = newTxt.concat("a");//checks for "z" and sets to "a"
  }else{
    newTxt = newTxt.concat(String.fromCharCode(txt.charAt(i).charCodeAt(0)+1));
  }//converts letter to the next letter in the alphabet
}

// checks for vowels and sets to upper case
for (var i=0; i < newTxt.length; i++){ 
  switch(newTxt.charAt(i)){
    case "a":
    case "e":
    case "i":
    case "o":
    case "u":
    newTxt2 = newTxt2 + (newTxt.charAt(i).toUpperCase());    break;
    default:
    newTxt2 = newTxt2 + newTxt.charAt(i);
    break; 
 }
} */