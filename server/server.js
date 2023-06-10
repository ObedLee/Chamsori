import express from "express"
import mysql from "mysql"
import bodyParser from "body-parser"
import cors from 'cors'

const app = express()
const port = 3010

const dbc = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '11111',
	database: 'songDB'
})

app.use(cors())
app.use(bodyParser.json())
// application/x-www-form-urlencoded 처리
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	const query = `select sname, aname, scode, sscore, mname, sdesc 
	from mp3 right outer join song on mp3.msid = song.sid 
	left outer join artist on song.said = artist.aid`
	dbc.query(query, (err, rows) => {
		if (err) {
			res.send('{"status": "error"}')
			return console.log(err)
		}
		res.send(rows)
	})
})

app.listen(port, () => {
	console.log('서버 실행됨')
})