var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {
    res.json([{ name: 'Tom', score: 2 }, { name: 'Sarah', score: 1 }]);
    console.log("Sent Leaderboard")
})

module.exports = router;
