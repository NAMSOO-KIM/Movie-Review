const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const puppeteer = require('puppeteer');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '1234',
	database: 'movie_review'
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(bodyParser.json())

/*

     app.get('/',function(req,res){
		 res.render('App.js')
		console.log('/')
		res.sendFile(path.join(__dirname, 'public', './index33.html'));   
	  });
*/   



app.get('/get', function (req, res) {
	console.log('get')
	res.send('센드ㅇㅇ')
});

app.post('/main', function (req, res) {
	// console.log(req.body.data)
	connection.query("select * from movies", (err, rows) => 
	{
		if(!err){
			var data = {
				rows: rows
			}
			// console.log(data)
			res.send(data)
		}
		else{
			console.log(err);
			res.send(err);
		}
	})	
});
 
let detail= null;
app.post('/about', function (req, res) {
	console.log(req.body.name)
	connection.query(`select * from movies where movie_name = '${req.body.name}'`, (err, rows) => 
	{
	if(!err) {
		var data = {
			rows : rows
		}
	}
	else{
		console.log(err);
		res.send(err);
	}
	console.log(data)
	 res.send(data)
}
)
});

app.get('/webCrawling', function (req, res) {
	(
		async () => {
			let movie_id = null
			let movie_name = null
			let movie_image = null
			let movie_url = null
			let movie_score = null
			let movie_genre = null
			let movie_directer = null
			let movie_actor = null
			let movie_rate = null
			let movie_percent = null

			const browser = await puppeteer.launch();
			const page = await browser.newPage();

			for (let i = 1; i <= 10; i++) {
				await page.goto("https://movie.naver.com/");

				await page.waitForSelector("div.flick-container > ul#flick0 > li.item" + i + "> div.obj_off.tab4 > a > img");
				let selecter = await page.$("div.flick-container > ul#flick0 > li.item" + i + "> div.obj_off.tab4 > a > img")
				movie_name = await page.evaluate(element => {
					return element.alt
				}, selecter);
				console.log(' ')
				console.log(movie_name)

				await page.waitForSelector("div.flick-container > ul#flick0 > li.item" + i + " > div.obj_off.tab4 > a > img")
				selecter = await page.$("div.flick-container > ul#flick0 > li.item" + i + " > div.obj_off.tab4 > a > img")
				movie_image = await page.evaluate(element => {
					return element.src
				}, selecter);
				console.log(movie_image)

				await page.waitForSelector("div.flick-container > ul#flick0 > li.item" + i + " > div.obj_off.tab4 > a")
				selecter = await page.$("div.flick-container > ul#flick0 > li.item" + i + " > div.obj_off.tab4 > a")
				movie_url = await page.evaluate(element => {
					return element.href
				}, selecter);
				console.log(movie_url)

				await page.waitForSelector("div.flick-container > ul#flick0 > li.item" + i + " > div.obj_off.tab4 > a > span:nth-child(2)")
				selecter = await page.$("div.flick-container > ul#flick0 > li.item" + i + " > div.obj_off.tab4 > a > span:nth-child(2)")
				movie_rate = await page.evaluate(element => {
					return element.textContent
				}, selecter);
				console.log(movie_rate)

				await page.goto(movie_url)

				await page.waitForSelector("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(2) > p > span:nth-child(1)")
				selecter = await page.$("#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(2) > p > span:nth-child(1)")
				movie_genre = await page.evaluate(element => {
					return element.textContent
				}, selecter);
				movie_genre = movie_genre.replace(/	/gi, "")
				console.log(movie_genre)

				
				await page.waitForSelector("div#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(4) > p")
				selecter = await page.$("div#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(4) > p")
				movie_directer = await page.evaluate(element => {
					return element.textContent
				}, selecter);
				console.log(movie_directer)
				
				
				await page.waitForSelector("div#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(6) > p")
				selecter = await page.$("div#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(6) > p")
				movie_actor = await page.evaluate(element => {
					return element.textContent
				}, selecter);
				console.log(movie_actor)
				
				
				await page.waitForSelector("a#actualPointPersentBasic > div > span > span")
				selecter = await page.$("a#actualPointPersentBasic > div > span > span")
				movie_score = await page.evaluate(element => {
					return element.style.width
				}, selecter);
				console.log(movie_score)

				// movie_percent = 못구함

				let query = 'insert into movies(movie_id, movie_name, movie_image, movie_url, movie_rate, movie_genre, movie_directer, movie_actor, movie_score, movie_percent) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
				let params = [i, movie_name, movie_image, movie_url, movie_rate, movie_genre, movie_directer, movie_actor, movie_score, null]

				connection.query(query, params, function (err) {
					if (err) {
						console.log(err)
					} else {
						console.log('query' + i + ' success!')
					}
				})

			}

			browser.close();
		}
	)()
});


app.listen(3000, function () {
	console.log('서버가 시작되었습니다.');
});
