const express = require("express")
const router = express.Router()
const Vodi = require('../models/vodi.js')
const Posesti = require('../models/posesti.js')
//Get all
router.get('/', async (req, res) => {
    console.log("GET all vodi")
    try{
        const vodi = await Vodi.find()
        res.json(vodi)
    } catch(err){
        res.status(500).json({message: err})
    }
})

//Get one
router.get('/:id', async (req, res) => {
    console.log("GET vod: ", req.body.id)
    try{
        const vod = await Vodi.findById(req.params.id)
        res.json(posest)
    } catch(err){
        res.status(500).json({message: err})
    }
})

//Update one
router.patch('/:id', async (req, res) => {
    const vod = await Vodi.findById(req.params.id)
    if(req.body.ime != null){
        vod.ime = req.body.ime
    }
    if(req.body.geslo != null){
        vod.geslo = req.body.geslo
    }
    if(req.body.denarnoStanje != null){
        vod.denarnoStanje = req.body.denarnoStanje
    }
    if(req.body.preteklih5transakcij != null){
        vod.preteklih5transakcij = req.body.preteklih5transakcij
    }
    if(req.body.aktivnePosesti != null){
        vod.aktivnePosesti = req.body.aktivnePosesti
    }
    if(req.body.lastnePosesti != null){
        vod.lastnePosesti = req.body.lastnePosesti
    }
})

//Auth one
router.post('/:ime', async (req, res) => {
    console.log("AUTH vod: ", req.params.ime)
    try{
        const vod = await Vodi.findOne({"ime": req.params.ime})
        if(vod.geslo == req.body.geslo){
            res.status(200).json(vod)
        }else{
            res.status(401).json({message: "Invalid ime or geslo"})
        }
    } catch(err){
        res.status(500).json({message: err})
    }
})

//Update stanje
router.patch('/stanje/:id', async (req, res) => {
    console.log("UPDATE vodovo stanje: ")
    if(req.body.stanje == null){
        res.status(400).json({message: "No stanje parameter."
    })}
    try{
        
        const vod = await Vodi.findById(req.params.id)
        vod.denarnoStanje = vod.denarnoStanje + req.body.stanje 
        console.log("   -->", vod.ime, req.body.stanje)
        vod.save()
        res.status(200).json(vod)
    }catch(err){
        res.status(500).json({message: err})
    } 
})

//Add lastnaPosest
router.put('/lastna/:id', async (req, res) => {
    console.log("ADD lastna posest: ")
    if(req.body.posestId == null){
        res.status(400).json({message: "No posestId parameter."}
    )}
    
    try{
        const vod = await Vodi.findById(req.params.id)
        const posest = await Posesti.findById(req.body.posestId)

        if(vod.lastnePosesti.indexOf(posest) == -1){
            console.log("   ---> Adding:" + posest.ime + "to" + vod.ime)
            vod.lastnePosesti.push(posest)
            vod.save()
        }
        res.status(200).json(vod)
    }catch(err){
        res.status(500).json({message: err})
    } 
})

//Remove lastnaPosest
router.patch('/lastna/:id', async (req, res) => {
    console.log("REMOVE lastna posest: ")
    if(req.body.posestId == null){
        res.status(400).json({message: "No posestId parameter."}
    )}
    
    try{
        
        const vod = await Vodi.findById(req.params.id)
        const posest = await Posesti.findById(req.body.posestId)

        var result = vod.lastnePosesti.filter(obj => {
            return obj._id.toString() === req.body.posestId
        })

        if(result.length == 1){
            console.log("   --> Removing:" + result[0].ime + "from" + vod.ime)
            const index = vod.lastnePosesti.indexOf(result[0])
            vod.lastnePosesti.splice(index, 1)
            vod.save()
            res.status(200).json(vod)
        }else{
            res.status(400).json({message: "Nekaj je šlo narobe"})
        }
    }catch(err){
        res.status(500).json({message: err})
    } 
})

//Update aktivne
router.patch('/aktivne/:id', async (req, res) => {
    console.log("UPDATE aktivne: ")
    if(req.body.noveAktivne == null){
        res.status(400).json({message: "No noveAktivne parameter."
    })}

    try{
        const vod = await Vodi.findById(req.params.id)
        console.log("   -->", vod.ime)

        if(!(req.body.noveAktivne instanceof Array) || !(req.body.noveAktivne.length == 4)){
            res.status(400).json({message: "Invalid input"})
        } else{

            vod.aktivnePosesti.splice(0, vod.aktivnePosesti.length)
            for (const posestId of req.body.noveAktivne){
                const posest = await Posesti.findById(posestId);
                console.log("       -->", posest.ime)
                vod.aktivnePosesti.push(posest)
            }
            vod.save()
            res.status(200).json({vod: vod})
        }    
    }catch(err){
        res.status(500).json({message: err})
    } 
})

//GET aktivne
router.get('/aktivne/:id', async (req, res) => {
    console.log("GET aktivne:")
    try{
        const vod = await Vodi.findById(req.params.id)
        console.log("   -->", vod.ime)
        res.status(200).json(vod.aktivnePosesti)
    } catch(err){
        res.status(500).json({message: err})
    }
})

//PUT transakcija
router.put('/trans/:id', async (req, res) => {
    console.log("ADD transaction:")
    if(req.body.transakcija == null){
        res.status(400).json({message: "No transakcija parameter."}
    )}
    
    try{
        const vod = await Vodi.findById(req.params.id)
        console.log("   --> Adding: ", req.body.transakcija, "to ", vod.ime)
        if(vod.preteklih5transakcij.length < 5){
            vod.preteklih5transakcij.unshift(req.body.transakcija)
        }else{
            vod.preteklih5transakcij.unshift(req.body.transakcija)
            vod.preteklih5transakcij.pop()
        }
        vod.save()
        res.status(200).json(vod)
    }catch(err){
        console.log(err)
        res.status(500).json({message: err})
    } 
})




module.exports = router