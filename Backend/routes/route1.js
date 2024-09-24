import express from 'express'
var router = express.Router();

router.get('/hello', (req, res) => {
    console.log("hello from route1");
})

export default router;