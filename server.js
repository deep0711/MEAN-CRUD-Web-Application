var express = require('express');
var app = express();
var mongojs=require('mongojs');
var db=mongojs('thief',['thief']); 
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.get('/thieveList',function(req,res){
    console.log("I received the data!")
    
    db.thief.find(function(err,docs){
        console.log(docs);
        res.json(docs);
    });
});

app.post('/thieveList',function(req,res){
    console.log("I posted the data!");
    db.thief.insert(req.body,function(err,doc){
        console.log(req.body);
        res.json(doc);
    });
});

app.delete('/thieveList/:id',function(req,res){
    var id =req.params.id;
    console.log(id);
    db.thief.remove({_id: mongojs.ObjectId(id)},function(err,doc){
            res.json(doc);
        });
});

app.get('/thieveList/:id',function(req,res){
    var id =req.params.id;
    console.log(id);
    db.thief.findOne({_id: mongojs.ObjectId(id)},function(err,doc){
        res.json(doc);
    });
});

app.put('/thieveList/:id',function(req,res){
    var id =req.params.id;
    db.thief.findAndModify({query:{_id: mongojs.ObjectId(id)},
        update: {$set: {name:req.body.name,gender:req.body.gender,age:req.body.age,year:req.body.year}},
        new:true},function(err,doc){
            res.json(doc);
        }); 
    
    
});    

app.listen(3000);
console.log('Server running');

