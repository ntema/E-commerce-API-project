const { verifyTokenForModerator } = require("./Authorization");
const router = require('express').Router()
router.get('/income',verifyTokenForModerator, async(req,res) => { 
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth()-1))
})

module.exports = router