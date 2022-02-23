const mongoose = require('mongoose')

const posestiSchema = new mongoose.Schema({
    ime:{
        type: String,
        required: true
    },
    cena:{
        type: Number,
        required: true
    },
    trenutniLastnik:{
        id:{
            type: String,
            default:"none"
        },
        ime:{
            type: String,
            default:"none"
        }
    },
    barva:{
        type: String, // #ff0400, #00661d, #6500b3, #ebc700, #00cbeb, #eb0089, #4cff00, #0004ff,| #661b00
        required: true 
    },
    hise:{
        type: Number,
        required: true,
        default: 0
    },
    doprinesenaVrednost:{
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('Posesti', posestiSchema)