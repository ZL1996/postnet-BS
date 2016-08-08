/**
 * Created by lambo on 8/1/16.
 */
    
'use strict';    
    
class ChangeCodeToBarcode{
    
    changCodeToBarcode(origin) {
        let codeLegal = isCodeLegal(origin);
        if (!codeLegal) {
            return false;
        }
        let completeCode = completeCheckCode(origin);
        let barcodeInfo = loadCodeInfo();
        let matchedBarcode = matchInfo(completeCode, barcodeInfo);
        let finalBarcode = addFrame(matchedBarcode);
        return finalBarcode;
    }
}

function isCodeLegal(origin) {
    return /^\d{5}(-?\d{4})?$/.test(origin);
}

function completeCheckCode(origin) {
    if (origin.length === 5) {
        let temp = [];
        for (let i = 0; i < origin.length; i++) {
            temp.push(origin.charAt(i));
        }
        let sum = 0;
        for (let i = 0; i < temp.length; i++) {
            sum += parseInt(temp[i]);
        }
        let mod = sum % 10;
        let result = 0;
        if (mod % 10 !== 0) {
            let quotient = parseInt(sum / 10);
            result = (quotient + 1) * 10 - sum;
        }
        temp.push(result.toString());
        return temp;
    }
    if (origin.length === 9) {
        let temp = [];
        for (let i = 0; i < origin.length; i++) {
            temp.push(origin.charAt(i));
        }
        let sum = 0;
        for (let i = 0; i < temp.length; i++) {
            sum += parseInt(temp[i]);
        }
        let mod = sum % 10;
        let result = 0;
        if (mod % 10 !== 0) {
            let quotient = parseInt(sum / 10);
            result = (quotient + 1) * 10 - sum;
        }
        temp.push(result.toString());
        return temp;
    }
    if (origin.length === 10) {
        let temp = [];
        for (let i = 0; i < origin.length; i++) {
            if (origin.charAt(i) === '-') {
                continue;
            }
            temp.push(origin.charAt(i));
        }
        let sum = 0;
        for (let i = 0; i < temp.length; i++) {
            sum += parseInt(temp[i]);
        }
        let mod = sum % 10;
        let result = 0;
        if (mod % 10 !== 0) {
            let quotient = parseInt(sum / 10);
            result = (quotient + 1) * 10 - sum;
        }
        temp.push(result.toString());
        return temp;
    }
}

function loadCodeInfo() {
    return ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
}

function matchInfo(completedCode, codeInfo) {
    let matchedBarcode = [];
    for (let i = 0; i < completedCode.length; i++) {
        completedCode[i] = parseInt(completedCode[i]);
        matchedBarcode.push(codeInfo[completedCode[i]]);
    }
    return matchedBarcode;
}

function addFrame(matchedBarcode) {
    matchedBarcode.push('|');
    matchedBarcode.unshift('|');
    let result = matchedBarcode.join(' ');
    return result;
}

module.exports = ChangeCodeToBarcode;