const express = require('express');
const os = require('os');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.json({
    disciplina: "Sistemas Operacionais",
    aluno: process.env.ALUNO || "Seu Nome",
    hostname: os.hostname(),
    plataforma: os.platform(),
    arquitetura: os.arch()
  });
});

app.get('/info', (req, res) => {
  res.json({
    pid: process.pid,
    uptime: Math.floor(process.uptime()),
    cpus: os.cpus().length
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});