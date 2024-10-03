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
            res.render('index', {
                title: 'Employee List',
                nav,
                employees: data
            });
        } catch (error) {
            res.status(500).send('Error fetching data: ' + error.message);
        }
    });

    // GET Add Employee form
    router.get('/basic/employeeadd', (req, res) => {
        res.render('addEmployee', {
            title: 'Add Employee',
            nav
        });
    });

    // POST Add Employee
    router.post('/addEmployee', async (req, res) => {
        try {
            const item = req.body;
            const data1 = new employeeModel(item);
            await data1.save();
            res.redirect('/');
        } catch (error) {
            res.status(400).send('Error adding employee: ' + error.message);
        }
    });

    // GET Edit Employee form
    router.get('/edit/:id', async (req, res) => {
        try {
            const employee = await employeeModel.findById(req.params.id);
            if (!employee) {
                return res.status(404).send('Employee not found');
            }
            res.render('editEmployee', {
                title: 'Edit Employee',
                nav,
                employee
            });
        } catch (error) {
            res.status(500).send('Error fetching employee: ' + error.message);
        }
    });

    // PUT Update Employee
    router.put('/edit/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const updatedEmployee = await employeeModel.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedEmployee) {
                return res.status(404).send('Employee not found');
            }
            res.redirect('/');
        } catch (error) {
            res.status(400).send('Error updating employee: ' + error.message);
        }
    });

    // DELETE Employee
    router.delete('/delete/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const deletedEmployee = await employeeModel.findByIdAndDelete(id);
            if (!deletedEmployee) {
                return res.status(404).send('Employee not found');
            }
            res.redirect('/');
        } catch (error) {
            res.status(400).send('Error deleting employee: ' + error.message);
        }
    });

    return router;
}

module.exports = userroute;
