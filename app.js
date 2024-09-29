const express = require('express')
const app = new express();
const morgan = require('morgan');

require('./db/connection');


app.use(morgan('dev'));

const PORT = 4000;
app.use(express.static('public'));



app.set('view engine', 'ejs');
// console.log(__dirname);
app.set('views', __dirname + '/views');



const nav=[
    {
        link:'/',name:'Home'
    },{
        link:'/basic/employeeadd',name:'ADD Employee'
    }
]

const employeeRoutes = require('./basicroutes/employeeRoutes')(nav);
app.use('/', employeeRoutes);





app.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT}`)
});