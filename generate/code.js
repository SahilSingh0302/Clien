require("./bootstrap");
const { hfChat } = require("./hf-client");
const fs = require("fs");
const path = require("path");

const niche = require("fs").readFileSync("./.niche", "utf8").trim();

async function generate() {
  const prompt = `Create a single‑page, fully responsive website for a ${niche}.
Provide three code blocks labelled "html", "css", "js". Each block must contain *only* the source code, no explanations.
The html must include a form with id="contact-form", a hero h1, and a responsive grid of three project cards.
The css must use CSS‑variables for a light/dark toggle.
The js must initialise EmailJS (placeholders \`YOUR_SERVICE_ID\`, \`YOUR_TEMPLATE_ID\`, \`YOUR_PUBLIC_KEY\`) and add a simple form‑submit handler.

Return the output as:

\`\`\`html
…html…
\`\`\`
\`\`\`css
…css…
\`\`\`
\`\`\`js
…js…
\`\`\`

  const messages = [
    {
      role: "user",
      content: prompt,
    },
  ];

  const raw = await hfChat(messages, { max_tokens: 800, temperature: 0.2 });

  // Very small parser – split on the three back‑tick fences we asked for
  const sections = raw.split(/```(\w+)\n?/g).filter((s, i) => i % 2 === 1);
  const html = sections[0] ? sections[0].trim() : "";
  const css  = sections[1] ? sections[1].trim() : "";
  const js   = sections[2] ? sections[2].trim() : "";

  // Write to src/
  fs.writeFileSync(path.join(__dirname, "../src/index.html"), html);
  fs.writeFileSync(path.join(__dirname, "../src/style.css"), css);
  fs.writeFileSync(path.join(__dirname, "../src/script.js"), js);

  console.log("✅ Code files written to src/");
}

generate()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("❌ code generation failed:", e.message);
    process.exit(1);
  });