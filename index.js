const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride=require("method-override");
const ejs= require("ejs");
const path=require("path");
const Student = require('./models/student.js');

app.use(methodOverride("_method"));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

main().then(()=>{
    console.log("Connection successful");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/student_Data");
}

// show all students route
app.get('/students', async(req,res)=>{
   let Data = await Student.find({});
   res.render("student.ejs",{Data});
});

// create new student route

app.get('/students/new',(req,res)=>{
    res.render("newStudent.ejs");
});

app.post('/students', async(req,res)=>{
    let {name , email, cgpa} = req.body;

    //find last student highest roll no
    let laststudent = await Student.findOne().sort({roll_no:-1});

    //generate next roll no 
    let nextRoll = laststudent ? laststudent.roll_no +1 :1;

    let newStudent = new Student({
        roll_no:nextRoll,
        name:name,
        email:email,
        cgpa:cgpa
    });
    newStudent.save().then(()=>{
        console.log("new student added");
    }).catch((err)=>{
        console.log(err);
    });
    res.redirect('/students');
});


//show particular student

app.get('/students/:id/showData',async(req,res)=>{
    let {id} =req.params;
    
    if(id){
        let student = await Student.findById(id);
        res.render("showDetails.ejs",{student});
    }
})

app.get('/',(req,res)=>{
    res.render("StudentCatlog.ejs")
})

//edit student data

app.get('/students/:id/edit', async(req,res)=>{
    let {id} =req.params;
    let student = await Student.findById(id);
    res.render("edit.ejs",{student});
})

app.put('/students/:id', async(req,res)=>{
    let {id} = req.params;
    let {name,email,cgpa} = req.body;
    let updatedStudent = await Student.findByIdAndUpdate(id,{name,email,cgpa},{new:true,runValidators:true});
   
    res.redirect('/students');
    
});

//delete student 

app.delete('/students/:id', async(req,res)=>{
    let {id} = req.params;
    let DeletedChat = await Student.findByIdAndDelete(id);
    console.log(DeletedChat);
    res.redirect('/students');
})

const port =8080;

app.listen(port,()=>{
    console.log(`App is listening at port ${port}`);
});