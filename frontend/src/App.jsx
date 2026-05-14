import { useState } from "react";

const severidadeCores = {
  "Crítico": { bg: "#fee2e2", text: "#991b1b", border: "#fca5a5" },
  "Alto": { bg: "#ffedd5", text: "#9a3412", border: "#fdba74" },
  "Médio": { bg: "#fef9c3", text: "#854d0e", border: "#fde047" },
  "Baixo": { bg: "#dcfce7", text: "#166534", border: "#86efac" },
};

const categoriaIcones = {
  "UI": "🎨",
  "Backend": "⚙️",
  "Performance": "⚡",
  "Segurança": "🔒",
  "Banco de Dados": "🗄️",
  "Outro": "📌",
};

export default function App() {
  const [descricao, setDescricao] = useState("");
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const classificar = async () => {
    if (!descricao.trim()) return;
    setCarregando(true);
    setErro(null);
    setResultado(null);

    try {
      const response = await fetch("http://localhost:5000/classificar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descricao }),
      });

      const data = await response.json();
      setResultado(data);
    } catch (e) {
      setErro("Erro ao conectar com o servidor. Verifique se o backend está rodando.");
    } finally {
      setCarregando(false);
    }
  };

  const cores = resultado ? severidadeCores[resultado.severidade] || severidadeCores["Baixo"] : null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      <div style={{ width: "100%", maxWidth: "680px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🤖</div>
          <h1 style={{ color: "white", fontSize: "1.8rem", margin: 0, fontWeight: 700 }}>
            QA Bug Classifier
          </h1>
          <p style={{ color: "#a5b4fc", marginTop: "0.5rem" }}>
            Classificação automática de bugs com Inteligência Artificial
          </p>
        </div>

        {/* Card principal */}
        <div style={{
          background: "white",
          borderRadius: "1rem",
          padding: "2rem",
          boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
        }}>
          <label style={{ fontWeight: 600, color: "#1e1b4b", display: "block", marginBottom: "0.5rem" }}>
            Descrição do Bug
          </label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex: O botão de login não responde ao clique no Safari versão 17..."
            rows={4}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "2px solid #e0e7ff",
              fontSize: "0.95rem",
              resize: "vertical",
              outline: "none",
              boxSizing: "border-box",
              fontFamily: "inherit"
            }}
          />

          <button
            onClick={classificar}
            disabled={carregando || !descricao.trim()}
            style={{
              width: "100%",
              marginTop: "1rem",
              padding: "0.85rem",
              background: carregando || !descricao.trim() ? "#a5b4fc" : "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: carregando || !descricao.trim() ? "not-allowed" : "pointer",
              transition: "background 0.2s"
            }}
          >
            {carregando ? "🔍 Classificando..." : "🚀 Classificar Bug"}
          </button>

          {erro && (
            <div style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "#fee2e2",
              borderRadius: "0.5rem",
              color: "#991b1b",
              fontSize: "0.9rem"
            }}>
              ⚠️ {erro}
            </div>
          )}

          {resultado && (
            <div style={{
              marginTop: "1.5rem",
              padding: "1.5rem",
              background: cores.bg,
              borderRadius: "0.75rem",
              border: `2px solid ${cores.border}`
            }}>
              <h3 style={{ margin: "0 0 1rem 0", color: cores.text, fontSize: "1.1rem" }}>
                ✅ Resultado da Classificação
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div style={{ background: "white", padding: "0.75rem", borderRadius: "0.5rem" }}>
                  <div style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.25rem" }}>SEVERIDADE</div>
                  <div style={{ fontWeight: 700, color: cores.text, fontSize: "1rem" }}>
                    🚨 {resultado.severidade}
                  </div>
                </div>
                <div style={{ background: "white", padding: "0.75rem", borderRadius: "0.5rem" }}>
                  <div style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.25rem" }}>CATEGORIA</div>
                  <div style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "1rem" }}>
                    {categoriaIcones[resultado.categoria] || "📌"} {resultado.categoria}
                  </div>
                </div>
                <div style={{ background: "white", padding: "0.75rem", borderRadius: "0.5rem" }}>
                  <div style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.25rem" }}>PRIORIDADE</div>
                  <div style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "1rem" }}>
                    ⚡ {resultado.prioridade}
                  </div>
                </div>
                <div style={{ background: "white", padding: "0.75rem", borderRadius: "0.5rem", gridColumn: "1 / -1" }}>
                  <div style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.25rem" }}>SUGESTÃO</div>
                  <div style={{ color: "#1e1b4b", fontSize: "0.9rem", lineHeight: 1.5 }}>
                    💡 {resultado.sugestao}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <p style={{ textAlign: "center", color: "#a5b4fc", marginTop: "1rem", fontSize: "0.85rem" }}>
          Powered by Google Gemini 2.5 Flash
        </p>
      </div>
    </div>
  );
}