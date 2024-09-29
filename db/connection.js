const mongoose = require("mongoose");



mongoose.connect('mongodb+srv://preciousprakashan:pre04072002@cluster0.ro5wi.mongodb.net/employeeCSDB?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('Connection established');
}).catch(()=>{
    console.log('Error in establishing connection');
});


