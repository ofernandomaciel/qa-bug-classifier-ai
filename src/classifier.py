from google import genai
import os
import json

# Inicializa o cliente
client = genai.Client(api_key=os.environ["GOOGLE_API_KEY"])

def classificar_bug(descricao: str) -> dict:
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
    return resultado


def main():
    print("=" * 50)
    print("🤖 CLASSIFICADOR DE BUGS COM IA")
    print("=" * 50)

    bugs_teste = [
        "O botão de login não responde ao clique no navegador Safari versão 17.",
        "O sistema trava completamente quando mais de 100 usuários acessam simultaneamente.",
        "Dados de cartão de crédito estão sendo exibidos em logs do servidor.",
        "A cor do texto no rodapé está levemente diferente do especificado no design."
    ]

    for i, bug in enumerate(bugs_teste, 1):
        print(f"\n📋 Bug #{i}:")
        print(f"Descrição: {bug}")
        print("Classificando...")
        resultado = classificar_bug(bug)
        print(f"✅ Severidade : {resultado['severidade']}")
        print(f"📁 Categoria  : {resultado['categoria']}")
        print(f"⚡ Prioridade : {resultado['prioridade']}")
        print(f"💡 Sugestão   : {resultado['sugestao']}")
        print("-" * 50)


if __name__ == "__main__":
    main()