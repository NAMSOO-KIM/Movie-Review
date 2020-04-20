const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const {PythonShell} = require('python-shell');

let options = {
	mode: 'text',
	pythonOptions: ['-u'],
	args: ['value1', 'value2']
};

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'dpdltm137',
	database: 'test'
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
	extended: false
}));

app.get('/get', function (req, res) {
	console.log('get');
});

app.post('/post', function (req, res) {
	console.log('post');
});

app.get('/python', function (req, res) {
	PythonShell.run('test.py', options, function (err, results) {
		if (err) throw err;
		console.log(results);
	});
});

app.listen(3000, function () {
	console.log('서버가 시작되었습니다.');
});
