const express = require('express');
const mysql = require('mysql');
const translate = require('@vitalets/google-translate-api');
const e = require('express');

const app =  express();

let connection;
let db_name = "server"

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


const PORT = process.env.PORT || 5000;


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
});

con.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Connection Created");
        var query = `CREATE DATABASE ${db_name}`;
        con.query(query,(err, res)=>{
            if(err){
                throw err;
            }
            else{
                console.log("Database Created");
                 connection = mysql.createConnection({
                    host: "localhost",
                    user: "root",
                    password: "",
                    database: db_name
                });

                var query = "CREATE TABLE translate (UserInput VARCHAR(255), TranslatedText VARCHAR(255))"
                
                connection.query(query,(err, res)=>{
                    if(err){
                        throw err;
                     }
                     else{
                         console.log("Table Created");
                     }
                });
            }
        });
    }
});

app.get('/data',(req,res)=>{
    const query ="SELECT * FROM translate"

    connection.query(query,(err, result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

var converted;

var languages = ["english","tamil","telegu","hindi"];
var languages2 = {
    english: "en",
    tamil: "ta",
    telegu:"te",
   hindi:"hi"
};

app.post('/data', (req,res)=>{
    console.log("yes");
    console.log(req.body.user);
    var userInput = req.body.user;
    let lang = req.body.lang;

    languages.forEach(language => {
        if(language == lang)
        {

            var l =languages2[lang];

            translate(userInput, {to: l}).then(res => {
                converted = res.text
            })
            .then(()=>{
                var query = `INSERT INTO translate (UserInput, TranslatedText) VALUES ("${userInput}", "${converted}")`;
                connection.query(query,(err,result)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.send("Data Added Into Table");
                    }
                })
            })
            .catch(err => {
                console.error(err);
            });
      
        }
    });
});


app.listen(PORT,()=>{
    console.log(`listening on PORT ${PORT}`);
});