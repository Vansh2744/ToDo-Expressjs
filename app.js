const express = require('express');
const app = express();
const {v4:uuidv4} = require('uuid');
const path = require('path');

app.use(express.static(path.join(__dirname,'./public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
let todo = [];

//-------------------------------------------------------------------------

app.get('/show',(req,res)=>{
    res.send(todo);
})

//---------------------------------------------------------------------------

app.post('/add',(req,res)=>{
    const {name} = req.body;
    const {rank} = req.body;
    todo.push({
        id:uuidv4(),
        name:name,
        rank:rank
    })
    res.redirect('/show');
})

//------------------------------------------------

app.post('/delete',(req,res)=>{
    const {id} = req.body;
    todo = todo.filter((d)=>{
        if(d.id == id) return false;
        else return true;
    })
    res.redirect('/show');
})

app.post('/up',(req,res)=>{
    const {id} = req.query;
    let idx;
    todo.forEach((e,i)=>{
        if(e.id == id){
            idx = i;
        }
    })
    temp = todo[idx];
    todo[idx] = todo[idx-1];
    todo[idx-1] = temp;
    res.redirect('/show');
})

app.post('/down',(req,res)=>{
    const {id} = req.query;
    let idx;
    todo.forEach((e,i)=>{
        if(e.id == id){
            idx = i;
        }
    })
    temp = todo[idx];
    todo[idx] = todo[idx+1];
    todo[idx+1] = temp;
    res.redirect('/show');
})

app.listen(3000,()=>{
    console.log('listening.....');
})