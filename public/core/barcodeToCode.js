/**
 * Created by lambo on 8/1/16.
 */
'use strict';

class ChangeBarcodeTocode{

    changeBarcodeToCode(origin) {
        let barcodeLegal = isBarcodeLegal(origin);
        if (!barcodeLegal) {
            return false;
        }
        let cuttedFrameOrigin = cutFrame(origin);
        let barcodeInfo = loadBarcodeInfo();
        let matchedCode = matchBarcodeInfo(cuttedFrameOrigin, barcodeInfo);
        return matchedCode;
    }
}

function isBarcodeLegal(origin) {
    let signLegal = isSignLegal(origin);
    let frameLegal = isFrameLegal(origin);
    let rightDigit = isRightDigit(origin);
    let spaceLegal = isSpaceLegal(origin);
    if (signLegal && frameLegal && rightDigit && spaceLegal) {
        return true;
    } else return false;
}

function isSignLegal(origin) {
    for (let i = 0; i < origin.length; i++) {
        if (origin.charAt(i) !== '|' && origin.charAt(i) !== ' ' && origin.charAt(i) !== ':') {
            return false;
        }
    }
    return true;
}

function isFrameLegal(origin) {
    if (origin.length < 4) return false;

    if (origin.charAt(0) === '|' && origin.charAt(1) === ' ' && origin.charAt(origin.length - 2) === ' ' && origin.charAt(origin.length - 1) === '|') {
        return true;
    } else return false;
}

function isSpaceLegal(origin) {
    let temp = origin.split(' ');
    temp.pop();
    temp.shift();
    let flag= true;
    temp.forEach(function(item){
        if (item.length !== 5){
            flag = false
        }
    });
    return flag;
}

function isRightDigit(origin) {
    return (origin.length === 39 || origin.length === 63);
}

function cutFrame(origin) {
    let cuttedFrameOrigin = origin.split(' ');
    cuttedFrameOrigin.pop();
    cuttedFrameOrigin.shift();
    return cuttedFrameOrigin;
}


function loadBarcodeInfo() {
    return [{key:0,value:'||:::'},
        {key:1,value:':::||'},
        {key:2,value:'::|:|'},
        {key:3,value:'::||:'},
        {key:4,value:':|::|'},
        {key:5,value:':|:|:'},
        {key:6,value:':||::'},
        {key:7,value:'|:::|'},
        {key:8,value:'|::|:'},
        {key:9,value:'|:|::'}]
}

function matchBarcodeInfo(cuttedFrameOrigin, barcodeInfo) {
    let matchedCodeItem = [];
    let matchedCode = '';
    for (let i = 0; i < cuttedFrameOrigin.length; i++) {
        let temp = barcodeInfo.find(function (item) {
            return item.value === cuttedFrameOrigin[i];
        });
        if (temp) {
            matchedCodeItem.push(temp.key);
        }

    }
    if (matchedCodeItem.length === 10) {
        matchedCodeItem.splice(5, 9, '-', matchedCodeItem[5], matchedCodeItem[6], matchedCodeItem[7], matchedCodeItem[8], matchedCodeItem[9]);
        //     cd = matchedCodeItem[length - 1];
    }
    if (matchedCodeItem.length === 6) {
        //   cd = matchedCodeItem.length - 1;
    }

    matchedCodeItem.pop();

    for (let i=0;i<matchedCodeItem.length;i++) {
        matchedCode += (matchedCodeItem[i]).toString();
    }
    return matchedCode;
}

module.exports = ChangeBarcodeTocode;