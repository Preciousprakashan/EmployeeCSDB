const express = require('express');
const router = express.Router();


function userroute(nav){
    router.get('/view', (req, res) => {
        res.render("index",{
            title:'home',
            emp,
            nav
        });
    });

    return router;
}






module.exports = userroute;