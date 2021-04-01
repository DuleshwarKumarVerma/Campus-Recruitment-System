const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    student_name: { type: String },
    student_department: { type: String },
    rollno: { type: Number }, 
    cgpa: { type: Number }, 
},{ timestamps: true });
module.exports = mongoose.model('tblstudent',studentSchema);


