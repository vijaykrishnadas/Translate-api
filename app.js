const express = require('express');
const mysql = require('mysql');
const translate = require('@vitalets/google-translate-api');

const app =  express();


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


const PORT = process.env.PORT || 5000;

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "server"
});

connection.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Database Connected");
    }
});

app.get('/data',(req,res)=>{
    const query ="SELECT * FROM data"

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
    console.log(req.body.user);
    var userInput = req.body.user;
    let lang = req.body.lang;

    languages.forEach(language => {
        if(language == lang)
        {

            console.log(typeof(languages));

            var l =languages2[lang];

            translate(userInput, {to: l}).then(res => {
                converted = res.text
            })
            .then(()=>{
                var query = `INSERT INTO data (UserInput, Translated) VALUES ("${userInput}", "${converted}")`;
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