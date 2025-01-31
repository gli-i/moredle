export const wordBank:string[] =  ["which","there","their","about","would","these","other","words",
    "could","write","first","water","after","where","right","think","three","years","place","sound",
    "great","again","still","every","small","found","those","never","under","might","while","house",
    "world","below","asked","going","large","until","along","shall","being","often","earth","began",
    "since","study","night","light","above","paper","parts","young","story","point","times","heard",
    "whole","white","given","means","music","miles","thing","today","later","using","money","lines",
    "order","group","among","learn","known","space","table","early","trees","short","hands","state",
    "black","shown","stood","front","voice","kinds","makes","comes","close","power","lived","vowel",
    "taken","built","heart","ready","quite","class","bring","round","daisy","fairy","apple","crane",
    "cream","skunk","stink","death","zebra","lions","cheap","swift","sawed","speak","lover","ghost",
    "queen","style"];


export async function getWord(){
    const file = require('./words.txt');

    const response = await fetch(file);
    const data = await response.text();

    const wordsArr =  data.split("\n");
    const numWords = wordsArr.length;
    let i:number = Math.floor(Math.random() * numWords);

    console.log(wordsArr[i]);
    return wordsArr[i];

}
