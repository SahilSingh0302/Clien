const { hfChat } = require("./generate/hf-client");

const messages = [
  { role: "user", content: "Hi" }
];

hfChat(messages)
  .then(r => console.log("Result:", r?.substring(0, 50) ?? "no text"))
  .catch(e => {
    console.error("Error type:", e.constructor.name);
    console.error("Error message:", e.message);
    if (e.cause) {
      console.error("Cause:", e.cause.message || e.cause);
    }
  });