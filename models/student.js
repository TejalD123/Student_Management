const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    rollno:{
        type:Number,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    cgpa:{
        type:Number,
        max:10,
    }
    
})

const StudentData = mongoose.model("StudentData",studentSchema);

module.exports = StudentData;