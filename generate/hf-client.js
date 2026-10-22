// generate/hf-client.js
// -----------------------------------------------------
// Tiny wrapper around Hugging Face Inference API.
// Uses the model "meta-llama/MetaLlama-3-8B-Instruct"
// (free, high‑quality chat model). Feel free to swap
// it for any other instruct model you prefer.
// -----------------------------------------------------

const fetch = globalThis.fetch;   // built‑in fetch in Node 18+

// -----------------------------------------------------------------
// Change this if you want a different instruct model:
// -----------------------------------------------------------------
const HF_MODEL = "meta-llama/MetaLlama-3-8B-Instruct";
const HF_BASE_URL = `https://api-inference.huggingface.co/models/${HF_MODEL}`;

async function hfChat(messages) {
  const response = await fetch(HF_BASE_URL, {
    method: "POST",
    headers: {
      // 👉 put your token here – read from env so it stays out of source code
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages,
      temperature: 0.2,       // deterministic‑ish output
      max_tokens: 800,        // keep it low → cheap
    }),
  });

  if (!response.ok) {
    const txt = await response.text();
    throw new Error(`HuggingFace error ${response.status}: ${txt}`);
  }

  const data = await response.json();
  // HF returns an array with the **full conversation**; we extract the last assistant message.
  const lastAssistant = data[data.length - 1];
  return typeof lastAssistant === "string"
    ? lastAssistant
    : (lastAssistant?.content ?? JSON.stringify(lastAssistant));
}

module.exports = { hfChat };