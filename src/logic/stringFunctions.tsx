import { cellValueInterface } from "./baseWordle";

export function isLetter(character: string) {
    return /^[a-zA-Z]$/.test(character);
}

export function concatStringArr(arr: cellValueInterface[]) {
    let concatedStr = '';
    for (let i = 0; i < arr.length; i++) {
      concatedStr = concatedStr + `${arr[i].letter}`
    }

    return concatedStr;
  }