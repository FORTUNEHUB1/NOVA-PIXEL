const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
const lines = code.split('\n');
const start = lines.findIndex(l => l.includes('{/* Asus TUF Inspired Product Presentation Section */}'));
const end = lines.findIndex((l, i) => i > start && l.includes('<PortfolioSection />'));
if (start !== -1 && end !== -1) {
  // remove the lines
  lines.splice(start - 1, end - start + 1);
  fs.writeFileSync('src/App.tsx', lines.join('\n'));
  console.log('Removed workstation section. Start:', start, 'End:', end);
} else {
  console.log('Could not find section. Start:', start, 'End:', end);
}
