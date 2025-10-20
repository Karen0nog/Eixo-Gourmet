const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const browserSync = require('browser-sync');
const app = express();
const PORT = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV !== "production";

// --- Conexão com o MongoDB Atlas ---
const DB_URI = process.env.DB_URI;

if (!DB_URI) {
  console.error("Erro: A variável de ambiente DB_URI não está definida.");
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Rotas
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});


app.get('/api/kits', async (req, res) => {
    try {
        const kits = await Kit.find().sort({ pessoas: 1 });
        res.status(200).json(kits);
    } catch (error) {
        res.status(500).json({mensagem: 'Erro ao buscar kits', error:error.message});
    }
});

app.post('/api/kits', async (req, res) => {
    const kitData = req.body;
    try{
        const novoKit = new Kit(kitData);
        await novoKit.save();
        res.status(201).json(novoKit);
    } catch(error){
        res.status(400).json({mensagem: 'Erro ao criar kit. Dados inválidos', error:error.message});
    }
});

app.use((req, res, next) => {
  res.status(404).send({ mensagem: "Rota Não Encontrada." });
});
// Conectar ao MongoDB
const Kit = require("./models/Kit");

const INITIAL_KITS = [
    {
        nome:'Kit P', pessoas: 8, preco: 150.00, imagem: 'KitP.png', 
        itens: ['Bolo P (1kg)', '20 doces', '50 salgados', '5 brownies recheados', '1 refrigerante ou suco'] 
    },
    {
        nome: 'Kit M', pessoas: 10, preco: 280.00, imagem: 'KitM.png',
        itens: ['Bolo M (2 kg)', '40 doces', '100 salgados', '10 brownies recheados', '2 refrigerantes ou sucos']
    },
    {
        nome: 'Kit G', pessoas: 20, preco: 520.00, imagem: 'KitG.png',
        itens: ['Bolo G (3,5 kg)', '80 doces', '200 salgados', '20 brownies recheados', '4 refrigerantes ou sucos']
    },
    {
        nome: 'Kit Kids', pessoas: 5, preco: 220.00, imagem: 'Kit_kids.png',
        itens: ['Bolo temático infantil (1,5 kg)', '32 doces coloridos', '80 mini salgados', '8 brownies recheados', '2 sucos naturais']
    },
    {
        nome: 'Kit Teen', pessoas: 15, preco: 400.00, imagem: 'Kit_teens.png',
        itens: ['Bolo decorado (2,5 kg)', '60 doces variados', '150 salgados', '15 brownies recheados', '3 refrigerantes ou sucos']
    },
    {
        nome: 'Kit Pet Party', pessoas: 25, preco: 350.00, imagem: 'pet-festa.png',
        itens: ['Bolo pet (500g)', 'Petiscos variados', 'Bolo humano (1 kg)', '20 doces', '50 salgados', '5 brownies recheados', '2 sucos ou águas aromatizadas']
    }
]


async function createInitialKits() {

const results = INITIAL_KITS.map(async (kitData) => {
    const filter = { nome: kitData.nome };
    const update = {...kitData };
    const options = {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
    };
    const kit = await Kit.findOneAndUpdate(filter, update, options);
    return kit;
});

await Promise.all(results);
}

mongoose
  .connect(DB_URI)
  .then(async () => {
    console.log("✅ Conectado ao MongoDB com sucesso!");
    try {
      await createInitialKits();
    } catch (err) {
      console.error("Erro ao criar kits iniciais:", err);
    }

    const server = app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);

      if (isDevelopment) {
        browserSync.init({
          proxy: `http://localhost:${PORT}`,
          files: ["../frontend/**/*.{html,css,js}"],
          open: 'local'
        });
      }
    });
  })
  .catch(err => {
    console.error("❌ Erro de Conexão com MongoDB:", err.message);
    process.exit(1);
  });

