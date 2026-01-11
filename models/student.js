const mongoose=require("mongoose");


const studentSchema = mongoose.Schema({
    roll_no:{
        type:Number,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
        max:20,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    cgpa:{
        type:Number,
        required:true,
    },

})

const Student = mongoose.model("Student",studentSchema);

module.exports = Student;


//student Data insertion for demo inside index.js

// Student.insertMany([
//     {
//         roll_no:1,
//         name:"rajesh",
//         email:"rajesh123@gmail.com",
//         cgpa:8.5,
//     },
//     {
//         roll_no:2,
//         name:"swati",
//         email:"swati34@gmail.com",
//         cgpa:9.0,
//     },
//      {
//         roll_no:3,
//         name:"yash",
//         email:"yash45@gmail.com",
//         cgpa:7.3,
//     },
//      {
//         roll_no:4,
//         name:"kinjal",
//         email:"kinjal99@gmail.com",
//         cgpa:9.2,
//     },

// ]).then((data)=>{
//     console.log(data);
// });
