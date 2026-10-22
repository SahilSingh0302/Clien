require("./bootstrap");
const { hfChat } = require("./hf-client");
const fs = require("fs");
const path = require("path");

const niche = require("fs").readFileSync("./.niche", "utf8").trim();

async function gen() {
  const prompt = `Write ONLY the HTML <title> and <meta> tags (one per line) for a one‑page website about ${niche}. Do not include any other text.

Example output:
<title>Photographer Portfolio – Fast, Beautiful, Free</title>
<meta name="description" content="A sleek one‑page portfolio for photographers, built with AI.">
<meta name="keywords" content="photographer, portfolio, ai, website">
`;

  const messages = [
    { role: "user", content: prompt },
  ];

  const raw = await hfChat(messages, { max_tokens: 100, temperature: 0.2 });

  const tags = raw.trim() + "\n";
  fs.writeFileSync(path.join(__dirname, "../src/meta-tags.txt"), tags);
  console.log("🔖 SEO tags written to src/meta-tags.txt");
}

gen()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("❌ SEO generation failed:", e.message);
    process.exit(1);
  });