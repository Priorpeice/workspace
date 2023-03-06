const express = require('express');
const router = express.Router();
const path = require('path');


router.use(express.static(path.join(__dirname, '../frontend/build'))); // To use Static file in this path

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build')); // send index html file
});

module.exports = router;