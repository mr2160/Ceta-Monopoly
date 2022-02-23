
const mongoose = require('mongoose')
const posesti = require("./posesti")

const vodiSchema = new mongoose.Schema({
    ime:{
        type: String,
        required: true
    },
    geslo:{ //very bad practice, am a proffesioneeel, dont do at home
        type: String,
        required: true
    },
    denarnoStanje:{
        type: Number,
        default: 200000,
        required: true
    },
    preteklih5transakcij:{
        type: [String],
        required: true,
        default: []
    },
    aktivnePosesti:{
        type: [posesti.posestiSchema],
        required: true,
        default: []
    },
    lastnePosesti:{
        type: [posesti.posestiSchema],
        default: []
    }
})

module.exports = mongoose.model('Vodi', vodiSchema)