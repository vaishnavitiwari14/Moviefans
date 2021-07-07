const express = require('express')
//syntax of express
const app = express()
const request = require('request')
const dotenv = require('dotenv')
dotenv.config()
/*
Middlewares - ask express.js to look for a folder named views
*/
app.set("view engine", "ejs")
app.use('/public', express.static('public'))
/*
Routing
*/
app.get("/",(req,res)=>{
    res.render("homepage")
})

app.get("/aboutme", (req,res)=>{
    res.redirect('https://vaishnavitiwari.com')
})

app.get("/result", (req,res)=>{
   console.log(req.query.movieName)
   const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.movieName}`
    request(url, function(error, response, body){
        if(!error && response.statusCode==200){
            const data = JSON.parse(body)
            console.log(data)
            //res.send(data)
            res.render("result", {movieData: data})
        }else{
            res.send("Uh oh error")
        }
    })
})

app.get("/result/:id", (req,res)=>{
    const url = `http://www.omdbapi.com/?apikey=e1a70422&i=${req.params.id}`
     request(url, function(error, response, body){
         if(!error && response.statusCode==200){
             const data = JSON.parse(body)
             //console.log(data)
             //res.send(data)
             res.render("Aboutmovie", {data: data})
         }else{
             res.send("Uh oh error")
         }
     })
 })

app.get("*", (req,res)=>{
    res.send("Go back, Illegal response!")
})

//we are creating a web server
app.listen(process.env.PORT, ()=>{
    console.log("server has started")
})

