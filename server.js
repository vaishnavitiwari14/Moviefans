const express = require('express')
//syntax of express
const app = express()
const request = require('request')
//ignore rn
app.get("/",(req,res)=>{
    //res.send("Hello")
    res.render("hello")
})
//middlewares
//app.post("/comment",isLoggedIn,()=>{})
app.set("view engine", "ejs")

app.get("/getmovies", (req, res)=>{
    const url = "http://www.omdbapi.com/?apikey=e1a70422&i=tt0118661"
    request(url, function(error, response, body){
        if(!error && response.statusCode==200){
            //Parsing JSON into JS object
            const data = JSON.parse(body)
            console.log(data)
            //res.send(data)
            res.render("homepage", {movie:data})
        }else{
            res.send("Uh oh error")
        }
    })
})
app.get("/class", (req,res)=>{
    res.send("You are in the yayayay class now")
})
app.get("/result", (req,res)=>{
    console.log(req.query.movieName)
    const url = `http://www.omdbapi.com/?apikey=e1a70422&s=${req.query.movieName}`
    request(url, function(error, response, body){
        if(!error && response.statusCode==200){
            //Parsing JSON into JS object
            const data = JSON.parse(body)
            //console.log(data)
            res.send(data)
            //res.render("homepage", {movie:data})
        }else{
            res.send("Uh oh error")
        }
    })
})
app.get("/class/:id", (req,res)=>{
    //console.log(req.params)
    res.send("You are in class of some subject")
})
//default error handling
app.get("*",(req,res)=>{
    res.send("Uh oh something went wrong")
})

//we are creating a web server
app.listen(5000, ()=>{
    console.log("server has started")
})



// const colorsssss = require('colors');
// var giveMeAJoke = require('give-me-a-joke');

// //console.log('OMG Rainbows!'.rainbow); // rainbow


//     giveMeAJoke.getRandomDadJoke (function(joke) {
//         console.log(joke);
//      });
