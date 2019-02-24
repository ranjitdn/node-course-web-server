const express= require('express')

const hbs= require('hbs')

const fs= require('fs');

const port= process.env.PORT || 3000;

var app=express();

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('currentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.set('view engine','hbs');

app.use((req,res,next)=>{
    var log=`${new Date().toString()}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log, (error)=>{
        if(error){
            console.log('Unable to write to file');
        }
    });
    next();
});


// app.use((req,res,next)=>{
//     res.render('maintainance')

// });

app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageHeader:'Home Page',
        welcomeMessage:'Welcome to new brand site'
    })
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageHeader:'About Page'
    });
})

app.get('/project',(req,res)=>{
    res.render('project.hbs',{
        pageHeader:'Project Page'
    });
})

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:"Bad Request"
    });
})

app.listen(port,()=>{
    console.log(`Node server listning @ ${port}`);
});