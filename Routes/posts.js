const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.json({
        posts: {
            title: 'Siema siema',
            description: 'random data'
        }
    })
})

module.exports = router;