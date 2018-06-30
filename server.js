const express = require('express')
const hbs = require('hbs')
const fs = require('fs')



const app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view enigne", "hbs")

app.use((req, res, next) => {
    // console.log(JSON.stringify(req, undefined, 2))
    // console.log(req)
    let now = new Date().toString();
    let log = `${now} : ${req.baseUrl} ${req.method} ${req.url}\n`
    fs.appendFile(__dirname+"/log/log.log", log)
    next();
})

app.use((req, res, next)=>{
    res.render("maintenance.hbs");
})

app.use(express.static(__dirname +"/public"))

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear()
})

hbs.registerHelper('getWelcomeText', (text) => {
    return text.toUpperCase();
})

app.get("/", (request, response) =>{
    response.render("home.hbs", {
        pageTitle:"Home",
        pageContent:"Home Page",
        welcomeMessage:"Welcome to My website"
    })
})

app.get("/about", (request, response) => {
    response.render("about.hbs", {
        pageTitle:"About Us",
        pageContent:"About Us Page"
    })
})

app.get("/contactus", (request, response) => {
    response.send({
        name: "Your Name",
        role: "Your Role"
    })
})

app.listen(2900);

