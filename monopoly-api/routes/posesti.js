const express = require("express")
const router = express.Router()
const Posesti = require('../models/posesti.js')
const Vodi = require('../models/vodi.js')

//Get all
router.get('/', async (req, res) => {
    console.log("GET all posesti")
    try{
        const posesti = await Posesti.find()
        res.json(posesti)
    } catch(err){
        res.status(500).json({message: err})
    }
})

//Get one
router.get('/:id', async (req, res) => {
    console.log("GET one posest:")
    try{
        const posest = await Posesti.findById(req.params.id)
        console.log("   -->", posest.ime)
        res.json(posest)
    } catch(err){
        res.status(500).json({message: err})
    }
}) 

//Create one
router.post('/', async (req, res) => {
    const temp = new Posesti({
        ime: req.body.ime,
        cena: req.body.cena,
        barva: req.body.barva,
    })

    try{
        const posest = await temp.save()
        res.status(201).json(posest)
    } catch(err){
        res.status(400).json({message: err})
    }
})

//Update one
router.patch('/:id', async (req, res) => {
    
    const posest = await Posesti.findById(req.params.id)
    console.log("UPDATE one posest: ", posest.ime)

    if(req.body.ime != null){
        posest.ime = req.body.ime
    }
    if(req.body.cena != null){
        posest.cena = req.body.cena
    }
    if(req.body.trenutniLastnik != null){
        posest.trenutniLastnik = req.body.trenutniLastnik
    }
    if(req.body.barva != null){
        posest.barva = req.body.barva
    }
    if(req.body.hise != null){
        posest.hise = req.body.hise
    }
    if(req.body.doprinesenaVrenost != null){
        posest.doprinesenaVrenost = req.body.doprinesenaVrenost
    }
})

//Update trenutniLastnik
router.patch('/lastnik/:id', async (req, res) => {
    console.log("UPDATE lastnik posesti: ")
    if(req.body.novLastnikId == null){
        res.status(400).json({message: "No novLastnik parameter."
    })}
    try{
        const posest = await Posesti.findById(req.params.id)
        const lastnik = await Vodi.findById(req.body.novLastnikId)
        console.log("   --> Adding ", lastnik.ime, "to ", posest.ime)
        posest.trenutniLastnik.id = lastnik.id
        posest.trenutniLastnik.ime = lastnik.ime
        posest.save()
        res.status(200).json(posest)
    }catch(err){
        res.status(500).json({message: err})
    } 
})

//Update vrednost
router.patch('/vrednost/:id', async (req, res) => {
    console.log("UPDATE vrednost posesti: ")
    if(req.body.placilo == null){
        res.status(400).json({message: "No placilo parameter."
    })}
    try{
        const posest = await Posesti.findById(req.params.id)
        console.log("   --> posest:", posest.ime)
        posest.doprinesenaVrednost += req.body.placilo
        posest.save()
        res.status(200).json(posest)
    }catch(err){
        res.status(500).json({message: err})
    } 
})

//Update cena
router.patch('/cena/:id', async (req, res) => {
    console.log("UPDATE cena posesti: ")
    if(req.body.novaCena == null){
        res.status(400).json({message: "No novaCena parameter."
    })}
    try{
        const posest = await Posesti.findById(req.params.id)
        console.log("   --> Nova cena: ", req.body.novaCena, " za ", posest.ime)
        posest.cena = req.body.novaCena
        posest.save()
        res.status(200).json(posest)
    }catch(err){
        res.status(500).json({message: err})
    } 
})

//Add hisa
router.put('/hisa/:id', async (req, res) => {
    console.log("ADD hisa: ")
    try{
        const posest = await Posesti.findById(req.params.id)
        console.log("   -->", posest.ime)
        if(posest.hise == 3){
            posest.cena += 30000
        }else{
            posest.cena += 10000
        }
        posest.hise += 1
        posest.save()
        res.status(200).json(posest)
    }catch(err){
        res.status(500).json({message: err})
    } 
})

//Remove hisa
router.delete('/hisa/:id', async (req, res) => {
    console.log("REMOVE hisa: ")
    try{
        const posest = await Posesti.findById(req.params.id)
        console.log("   -->", posest.ime)
        if(posest.hise == 4){
            posest.cena -= 30000
        }else{
            posest.cena -= 10000
        }
        posest.hise -= 1
        posest.save()
        res.status(200).json(posest)
    }catch(err){
        res.status(500).json({message: err})
    } 
})

//Delete one
router.delete('/:id', async (req, res) => {
    try{
        const posest = await Posesti.findById(req.params.id)
        await posest.remove()
        res.json({message: 'Deleted posest'})
    } catch(err){

    }
})


module.exports = router