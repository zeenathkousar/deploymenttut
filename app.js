const dotenv=require('dotenv').config();
const express= require('express');
const app=express();
const PORT=process.env.PORT || 3000

const path=require('path');

app.use(express.static('./static'));

app.use(express.urlencoded({ extended : true }))

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

const mongoose=require('mongoose');
// mongoose.connect('mongodb://localhost/pugdb1')
mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log('database connected')
    }).catch((e)=>{
        console.log(`databse not connected - got some err in connecting`)
        console.log(e)
    });

const  pugschema1=new mongoose.Schema({
    Name: {
        type:String,
        required:true,
    },
    age: {
        type:Number,
    }, 
    year: {
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    }

    
});

var pugcollection1=mongoose.model('pugcollection1',pugschema1);

app.get('/',(req,res)=>{
    params={'title':'home page'}
    res.status(200).render('home',params)
})

app.get('/about',(req,res)=>{
    params={'title':'about page'}
    res.status(200).render('about',params)
})

app.get('/contact',(req,res)=>{
    params={'title':'contact page'}
    res.status(200).render('contact',params)
})

app.post('/contact',async (req,res)=>{
    const myData= new pugcollection1({
        Name:req.body.name,
        age: req.body.age,
        email: req.body.email,
        year: req.body.year
    });
    // console.log(myData);
    
    const saveddataentry= await myData.save().then(()=>{
        console.log('datasaved');
        // console.log(saveddataentry)
        res.status(200).send('This item is saved to database')

    }).catch((e)=>{
        console.log('data not saved')
        console.log(e)
        res.status(404).send('This item is not saved to db')
    })

})


app.listen(PORT,()=>{
    console.log('server started')
})





