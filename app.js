const express = require('express');
const methodOverride = require('method-override');
const app = express();
const morgan = require('morgan');
require('./db/connection');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Enable method override

const PORT = 4000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const nav = [
    { link: '/', name: 'Home' },
    { link: '/basic/employeeAdd', name: 'ADD Employee' }
];

const employeeRoutes = require('./basicroutes/employeeRoutes')(nav);
app.use('/', employeeRoutes);

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
