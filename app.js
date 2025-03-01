const express = require('express');
const app = express();
const formidable = require('formidable');
const fs = require('fs');
const session = require('express-session');


app.use(session({
    secret: 'abcdefg', // pentru criptarea session ID-ului
    resave: true, // să nu șteargă sesiunile idle
    saveUninitialized: false 
    }));

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


function verifica(user, parola){
    var ob;
    if (fs.existsSync("users.json")){
        var date = fs.readFileSync("users.json");
        ob = JSON.parse(date);
    } 
    else ob = [];
    console.log(ob);

    for(var i = 0; i < ob.users.length; i++){
        console.log(ob.users[i].username);
        console.log(ob.users[i].password);

        if (user == ob.users[i].username && parola == ob.users[i].password){
            console.log("Parola corecta pt user-ul dat!\n");
            return ob.users[i].username;
        }
    }
    return null;
}

app.post('/login', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
         user =  verifica(fields.username, fields.parola);
         // verificarea datelor de login
         
         if(user){
           req.session.username = user; 
           // setez userul ca proprietate a sesiunii
           res.redirect('/account');}
         else{
           req.session.username = null;
           res.render('pagini/log', { user: req.session.username, error: 'Incorrect username or password!' });
        }

    });
 });

 app.post('/ticket', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        userTicket = fields.name;

        console.log("DA");
        console.log(fields);

        if(userTicket){
            req.session.ticketUser = userTicket;
            // res.redirect('/ticketSent'); 
            res.render('pagini/ticketSent', {user: req.session.username, nume: userTicket});
        }
        else {
            req.session.ticketUser = userTicket;
        }
    });
 });



 app.get('/logat', function(req, res) {
    res.render('pagini/logout',{'nume':req.session.username});
 });

 app.get('/logout', function(req, res) {
    req.session.username = null;
    req.session.destroy();
    //res.render('pagini/log', {'nume':null, error: null });
    res.redirect('/account');
 });  

 app.get('/warrior', function(req, res) {
    res.render('pagini/warrior', { user: req.session.username });
 }); 

 app.get('/human', function(req, res) {
    res.render('pagini/human', { user: req.session.username });
 }); 

 app.get('/index', function(req, res) {
    res.render('pagini/index', { user: req.session.username });
 }); 

 app.get('/news', function(req, res) {
    res.render('pagini/news', { user: req.session.username });
 }); 

 app.get('/ticket', function(req, res) {
    res.render('pagini/ticket', { user: req.session.username });
 }); 
 
 app.get('/map', function(req, res) {
    res.render('pagini/map', { user: req.session.username });
 }); 

 app.get('/account', function(req, res){
    if (req.session.username){
        res.render('pagini/account', { user: req.session.username });
    }
    else{
        res.render('pagini/log', { user: req.session.username, error: null });
    }
 });

 app.get('/', function(req,res){
    res.render('pagini/index', { user: req.session.username });
 });

 app.use(function (req, res) {
    res.status(404).render('pagini/404');
});


 app.listen(8000);