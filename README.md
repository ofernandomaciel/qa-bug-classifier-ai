# 🤖 QA Bug Classifier AI

![Python](https://img.shields.io/badge/Python-3.13-blue?logo=python)
![Gemini](https://img.shields.io/badge/Gemini-2.5--flash-orange?logo=google)
![Status](https://img.shields.io/badge/Status-Concluído-brightgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)

Classificador automático de bugs usando Inteligência Artificial (Google Gemini).
Recebe a descrição de um bug em texto e retorna severidade, categoria, prioridade
e sugestão de ação — combinando QA e IA de forma prática.

---

## 🎯 Objetivo

Demonstrar a aplicação de IA generativa em processos de QA, automatizando
a triagem e classificação de bugs que normalmente exige análise manual.

---

## 🔍 Exemplo de Output

📋 Bug #1:
Descrição: Dados de cartão de crédito estão sendo exibidos em logs do servidor.
✅ Severidade : Crítico
📁 Categoria  : Segurança
⚡ Prioridade : Imediata
💡 Sugestão   : Interromper imediatamente o log de dados sensíveis e implementar
mascaramento conforme requisitos de PCI DSS.

---

## 🛠️ Tecnologias

**Backend:**
- Python 3.13
- Flask
- Flask-CORS
- Google Gemini 2.5 Flash API
- google-genai

**Frontend:**
- React
- Vite

---

## 🚀 Como rodar localmente

### Backend
```bash
# Entre na pasta do projeto
cd qa-bug-classifier-ai

# Instale as dependências Python
pip install -r requirements.txt

# Configure sua chave da API do Gemini
export GOOGLE_API_KEY="sua-chave-aqui"

# Rode o backend
python src/app.py
```

### Frontend
```bash
# Entre na pasta do frontend
cd frontend

# Instale as dependências
npm install

# Rode o frontend
npm run dev
```

Acesse **http://localhost:5173** no navegador.

---

## 📁 Estrutura do Projeto

qa-bug-classifier-ai/
│
├── src/
│   └── classifier.py    # Script principal
├── requirements.txt
└── README.md

---

## 🧠 O que aprendi

- Integração com APIs de IA generativa (Google Gemini)
- Engenharia de prompt para retorno estruturado em JSON
- Automação de processos de QA com IA
- Boas práticas de segurança com variáveis de ambiente

---

## 📌 Status

✅ Concluído

---

## 📄 Licença

Este projeto está sob a licença MIT.