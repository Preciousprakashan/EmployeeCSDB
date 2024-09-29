const express = require('express');
const router = express.Router();
const employeeModel = require('../model/employeeData');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

function userroute(nav) {

    // GET all employees
    router.get('/', async (req, res) => {
        try {
            const data = await employeeModel.find(); // Fetch all employees
            res.render('index', { // Render index.ejs and pass the data
                title: 'Employee List',
                nav,
                employees: data // Pass employees data
            });
        } catch (error) {
            res.status(500).send('Error fetching data: ' + error.message);
        }
    });

    // POST - Add a new employee
    router.post('/addEmployee', async (req, res) => {
        try {
            const item = req.body;
            const data1 = new employeeModel(item);
            await data1.save();
            res.status(201).send('Post Successful');
        } catch (error) {
            res.status(400).send('Error adding employee: ' + error.message);
        }
    });

    // PUT - Update an employee by ID
    router.put('/edit/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const data = await employeeModel.findByIdAndUpdate(id, req.body, { new: true });
            if (!data) {
                return res.status(404).send('Employee not found');
            }
            res.status(200).send(data);
        } catch (error) {
            res.status(400).send('Error updating employee: ' + error.message);
        }
    });

    // DELETE - Remove an employee by ID
    router.delete('/delete/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const data = await employeeModel.findByIdAndDelete(id);
            if (!data) {
                return res.status(404).send('Employee not found');
            }
            res.status(200).send('Employee deleted');
        } catch (error) {
            res.status(500).send('Error deleting employee: ' + error.message);
        }
    });

    // Render the index page
    router.get('/', (req, res) => {
        res.render('index', {
            title: 'Home',
            nav
        });
    });

    return router;
}

module.exports = userroute;
