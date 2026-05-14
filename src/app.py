from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
import os
import json

app = Flask(__name__)
CORS(app)

client = genai.Client(api_key=os.environ["GOOGLE_API_KEY"])

@app.route("/classificar", methods=["POST"])
def classificar():
    dados = request.get_json()
    descricao = dados.get("descricao", "")

    if not descricao:
        return jsonify({"erro": "Descrição não fornecida"}), 400

    prompt = f"""Você é um especialista em QA (Quality Assurance).
Analise a descrição do bug abaixo e retorne uma classificação em JSON com exatamente este formato:

{{
    "severidade": "Crítico | Alto | Médio | Baixo",
    "categoria": "UI | Backend | Performance | Segurança | Banco de Dados | Outro",
    "prioridade": "Imediata | Alta | Normal | Baixa",
    "sugestao": "breve sugestão de ação para o time de desenvolvimento"
}}

Descrição do bug:
{descricao}

Responda APENAS com o JSON, sem explicações adicionais."""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    resposta = response.text.strip()
    resposta = resposta.replace("```json", "").replace("```", "").strip()
    resultado = json.loads(resposta)
    return jsonify(resultado)

if __name__ == "__main__":
    app.run(debug=True, port=5000)