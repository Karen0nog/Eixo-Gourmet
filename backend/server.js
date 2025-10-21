const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV !== "production";

const DB_URI = process.env.DB_URI;;
const Kit = require("./models/kit");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "frontend")));

// Rotas
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.get("/api/kits", async (req, res) => {
  try {
    const kits = await Kit.find().sort({ pessoas: 1 });
    res.status(200).json(kits);
  } catch (error) {
    const payload = { mensagem: "Erro ao buscar kits." };
    if (isDevelopment) payload.error = error.message;
    res.status(500).json(payload);
  }
});

app.post("/api/kits", async (req, res) => {
  const kitData = req.body;
  if (!kitData || !kitData.nome || !kitData.pessoas) {
    return res.status(400).json({ mensagem: "Dados de kit inválidos." });
  }
  try {
    const novoKit = new Kit(kitData);
    await novoKit.save();
    res.status(201).json(novoKit);
  } catch (error) {
    const payload = { mensagem: "Erro ao criar kit." };
    if (isDevelopment) payload.error = error.message;
    res.status(500).json(payload);
  }
});

app.use((req, res) => {
  res.status(404).json({ mensagem: "Rota Não Encontrada." });
});

const INITIAL_KITS = [
  { nome: "Kit P", pessoas: 8, preco: 150.0, imagem: "KitP.png", itens: ["Bolo P (1kg)", "20 doces", "50 salgados", "5 brownies recheados", "1 refrigerante ou suco"] },
  { nome: "Kit M", pessoas: 10, preco: 280.0, imagem: "KitM.png", itens: ["Bolo M (2 kg)", "40 doces", "100 salgados", "10 brownies recheados", "2 refrigerantes ou sucos"] },
  { nome: "Kit G", pessoas: 20, preco: 520.0, imagem: "KitG.png", itens: ["Bolo G (3,5 kg)", "80 doces", "200 salgados", "20 brownies recheados", "4 refrigerantes ou sucos"] },
  { nome: "Kit Kids", pessoas: 5, preco: 220.0, imagem: "Kit_kids.png", itens: ["Bolo temático infantil (1,5 kg)", "32 doces coloridos", "80 mini salgados", "8 brownies recheados", "2 sucos naturais"] },
  { nome: "Kit Teen", pessoas: 15, preco: 400.0, imagem: "Kit_teens.png", itens: ["Bolo decorado (2,5 kg)", "60 doces variados", "150 salgados", "15 brownies recheados", "3 refrigerantes ou sucos"] },
  { nome: "Kit Pet Party", pessoas: 25, preco: 350.0, imagem: "pet-festa.png", itens: ["Bolo pet (500g)", "Petiscos variados", "Bolo humano (1 kg)", "20 doces", "50 salgados", "5 brownies recheados", "2 sucos ou águas aromatizadas"] }
];

async function createInitialKits() {
  const promises = INITIAL_KITS.map(async (kitData) => {
    const filter = { nome: kitData.nome };
    const update = { ...kitData };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    return Kit.findOneAndUpdate(filter, update, options);
  });

  await Promise.all(promises);
}

async function startServer() {
  try {
    await mongoose.connect(DB_URI);
    console.log("✅ Conectado ao MongoDB com sucesso!");
    await createInitialKits();
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Erro ao iniciar:", err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
} else {
  module.exports = app;
}
