require("./bootstrap");
// init-services.js
// This script adds the EmailJS initialization snippet to src/script.js.
// Run it once after the code has been generated.

const fs = require("fs");
const path = require("path");

const scriptPath = path.join(__dirname, "../src/script.js");
let existing = fs.readFileSync(scriptPath, "utf8");

// EmailJS initialization – replace the placeholders with your free EmailJS account values
const emailInit = `// EmailJS initialization – replace the placeholders with your free EmailJS account
(function(){
  emailjs.init("YOUR_PUBLIC_KEY");   // sign‑up at emailjs.com, free tier 200 emails/mo
})();`;

// Only add if not already present (avoids duplicate lines on re‑runs)
if (!existing.includes("emailjs")) {
  existing += "\n\n" + emailInit;
  fs.writeFileSync(scriptPath, existing);
  console.log("🛠️ EmailJS init snippet added to script.js");
} else {
  console.log("✅ EmailJS init already present – skipping.");
}