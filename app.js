const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');

app.set('views', __dirname);
app.set('view engine', 'ejs');
app.use(express.static(path.join(process.cwd(), 'static')));
app.use(bodyParser.urlencoded({ extended: false }));

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: '1512a'
});
connection.connect((err) => {
    if (err) {
        throw err;
    }
});

app.get('/index', (req, res) => {
    connection.query('select * from week3 limit 0,10', (err, content) => {
        res.render('index', {
            data: content
        })
    })
});

app.post('/main', (req, res) => {
    const limit = req.body.limit;
    const time = req.body.time;
    const start = (time - 1) * limit;
    connection.query('select * from week3 limit ' + start + ',' + limit + '', (err, content) => {
        res.send(content);
    })
});

app.listen(8088);