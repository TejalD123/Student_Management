const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path=require("path");
const StudentData = require('./models/student.js');
const methodOverride=require("method-override");

app.use(methodOverride("_method"));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));


main().then(()=>{
    console.log("Connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/student_data1');
}

//index route
app.get('/',async (req,res)=>{
   res.render("StudentCatlog.ejs");
})

// show all students route 
app.get('/students', async(req,res)=>{ 
    let Data = await StudentData.find({});
 res.render("student.ejs",{Data}); 
});

//create new student form
app.get('/students/new',async (req,res)=>{
   res.render("newStudent.ejs");
})

//individual student
app.get('/students/:id',async (req,res)=>{
    let {id} = req.params;
    let student = await StudentData.findById(id);
   res.render("showDetails.ejs",{student});
})

//new student add
app.post('/students', async (req, res) => {
    let { name, email, cgpa } = req.body;

    // 1️⃣ Find last student (highest roll_no)
    let lastStudent = await StudentData.findOne().sort({ rollno: -1 });

    // 2️⃣ Generate next roll number
    let nextRollNo = lastStudent ? lastStudent.rollno + 1 : 1;

    // 3️⃣ Create new student
    await StudentData.create({
        rollno: nextRollNo,
        name,
        email,
        cgpa: Number(cgpa)
    });

    res.redirect('/students');
});


//edit form

app.get('/students/:id/edit',async (req,res)=>{
    let {id} =req.params;
    let student = await StudentData.findById(id);
   res.render("edit.ejs",{student});
})

//edit student details
app.put('/students/:id', async (req, res) => {
        let { id } = req.params;
        let { name, email, cgpa } = req.body;

         await StudentData.findByIdAndUpdate(
            id,
            { name, email, cgpa },               // updated data
            { new: true, runValidators: true }   // options
        );

        res.redirect("/students");
       
});



app.delete('/students/:id', async (req, res) => {
    let { id } = req.params;

    let deletedStudent = await StudentData.findByIdAndDelete(id);

    console.log(deletedStudent);
    res.redirect('/students');
});

app.listen(3000,()=>{
    console.log("app is listening");
})