const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const puppeteer = require('puppeteer');
const {
	PythonShell
} = require('python-shell');

let connection;

const createConn = function () {
	connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'dpdltm137',
		database: 'mundoDodgeBall'
	});

	connection.connect(function (error) {
		console.log('connect')
		if (error) {
			console.log(error)
			setTimeout(createConn, 2000);
		}
	});

	connection.on('error', function (error) {
		if (error.code === 'PROTOCOL_CONNECTION_LOST') {
			return createConn();
		}

		throw error;
	});
};

createConn();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
	extended: false
}));


let options = {
	mode: 'text',

	pythonPath: '',

	pythonOptions: ['-u'],

	scriptPath: ''
}

PythonShell.run('posNeg.py', options, function (err, results) {
	if (err) throw err;
	console.log('ok')
})