const express = require("express")
const router = express.Router()
const Posesti = require('../models/posesti.js')
const Vodi = require('../models/vodi.js')

//Get all
router.get('/wipe', async (req, res) => {
    try{
        await Posesti.deleteMany({})
        await Vodi.deleteMany({})
        res.status(200).json({message: "Wiped"})
    } catch(err){
        res.status(500).json({message: err})
    }
})

router.get('/fill', async (req, res) => {
    const posesti = require("../models/posesti.json");
    const vodi = require("../models/vodi.json");

    try{
        for(var i=0; posesti.length > i; i++){
            var posest = posesti[i];
            await Posesti.create(posest)
        }
        for(var i=0;vodi.length > i; i++){
            var vod = vodi[i];
            await Vodi.create(vod);
        }
        res.status(200).json({message: "Filled"})
    } catch(err){
        res.status(500).json({message: err})
    }
})

module.exports = router
