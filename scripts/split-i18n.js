// Utility script for splitting i18n JSON files into modular structure
// Used only during development

// run with command: node scripts/split-i18n.js

/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");

const INPUT_FILE = path.join(__dirname, "../src/i18n/messages/de.json");
const OUTPUT_DIR = path.join(__dirname, "../src/i18n/messages/de");
// const INPUT_FILE = path.join(__dirname, "../src/i18n/messages/es.json");
// const OUTPUT_DIR = path.join(__dirname, "../src/i18n/messages/es");
// const INPUT_FILE = path.join(__dirname, "../src/i18n/messages/en.json");
// const OUTPUT_DIR = path.join(__dirname, "../src/i18n/messages/en");
// const INPUT_FILE = path.join(__dirname, "../src/i18n/messages/sr.json");
// const OUTPUT_DIR = path.join(__dirname, "../src/i18n/messages/sr");

function splitJson() {
  const raw = fs.readFileSync(INPUT_FILE, "utf-8");
  const json = JSON.parse(raw);

  // kreiraj folder ako ne postoji
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  Object.entries(json).forEach(([key, value]) => {
    const filePath = path.join(OUTPUT_DIR, `${key}.json`);

    fs.writeFileSync(filePath, JSON.stringify(value, null, 2), "utf-8");

    console.log(`✅ created: ${key}.json`);
  });

  console.log("\n🎉 DONE!");
}

splitJson();
