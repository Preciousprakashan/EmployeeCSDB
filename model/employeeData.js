const mongoose = require('mongoose');

//creating schema
const employeeSchema = new mongoose.Schema({
    EmployeeName: String,
    EmployeeDesignation: String,
    EmployeeLocation: String,
    Salary: Number
  }, { versionKey: false });
  


//mapping collection
const  employeeData=mongoose.model('employee',employeeSchema);

//exporting schema
module.exports=employeeData;