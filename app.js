
'use strict';

let express = require('express');
let app = express();
app.use(express.static('public'));

const BarcodeToCode = require('./public/core/barcodeToCode');
const CodeToBarcode = require('./public/core/codeToBarcode');

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.post('/barcodeToCode',function (req,res) {
	let input = req.body.barcode;
	console.log(input);
	let result = new BarcodeToCode().changeBarcodeToCode(input);
	// console.log(result);
	res.send(result);
});

app.post('/codeToBarcode',function (req,res){
	let input = req.body.code;
	console.log(input);
	let result = new CodeToBarcode().changCodeToBarcode(input);
	res.send(result);
});

app.listen(3000,function () {
	console.log("server 3000 is started");
});

module.exports = app;