require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Conectado ao MongoDB com sucesso!'))
    .catch(err => {
        console.error('❌ Erro de Conexão com MongoDB:', err.message);
        process.exit(1); 
    });

// Rotas
app.get('/',(req, res) => {
    res.status(200).send('API está funcionando!')
});

app.use((req, res, next) => {
    res.status(404).send({ mensagem: 'Rota Não Encontrada.' });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});