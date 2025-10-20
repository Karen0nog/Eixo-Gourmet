const mongoose = require('mongoose');

const kitSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    pessoas: {
        type: Number,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    itens: {
        type: [String],
        required: true
    },
    imagem: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Kit = mongoose.model('Kit', kitSchema);

module.exports = Kit;

