require("./bootstrap");
const { hfChat } = require("./hf-client");

async function pickNiche() {
  const messages = [
    {
      role: "system",
      content:
        "You are a market‑research assistant. Give me ONE micro‑SaaS niche that solves a specific pain point for freelancers. Return ONLY the niche name, no extra text.",
    },
    { role: "user", content: "Suggest a niche." },
  ];

  const raw = await hfChat(messages);
  // HF may return the whole conversation; grab the last assistant line
  const niche =
    raw
      .split("\n")
      .filter((l) => l.startsWith("Assistant:"))
      .pop()?.replace("Assistant:", "")
      .trim() ?? raw.trim();

  console.log("🔎 Selected niche:", niche);
  require("fs").writeFileSync("./.niche", niche);
}

pickNiche()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("❌ niche generation failed:", e.message);
    process.exit(1);
  });