const fs = require('fs');
const files = ['src/App.tsx', 'src/PortfolioSection.tsx', 'src/DigitalProductsSection.tsx', 'src/CoursesSection.tsx'];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    content = content.replace(/bg-\[\#050505\]/g, 'bg-zinc-50 dark:bg-[#050505]');
    content = content.replace(/bg-\[\#080808\]/g, 'bg-zinc-100 dark:bg-[#080808]');
    content = content.replace(/bg-\[\#0a0a0a\]/g, 'bg-zinc-50 dark:bg-[#0a0a0a]');
    content = content.replace(/bg-\[\#111\]/g, 'bg-white dark:bg-[#111]');
    content = content.replace(/bg-[#111111]/g, 'bg-zinc-100 dark:bg-[#111111]');
    content = content.replace(/text-white/g, 'text-zinc-900 dark:text-white');
    content = content.replace(/text-zinc-400/g, 'text-zinc-600 dark:text-zinc-400');
    content = content.replace(/text-zinc-300/g, 'text-zinc-700 dark:text-zinc-300');
    content = content.replace(/text-zinc-500/g, 'text-zinc-500 dark:text-zinc-500'); 
    content = content.replace(/bg-zinc-900/g, 'bg-white dark:bg-zinc-900');
    content = content.replace(/bg-zinc-800/g, 'bg-zinc-100 dark:bg-zinc-800');
    content = content.replace(/border-white\/10/g, 'border-zinc-200 dark:border-white/10');
    content = content.replace(/border-white\/5/g, 'border-zinc-200 dark:border-white/5');
    content = content.replace(/border-white\/20/g, 'border-zinc-300 dark:border-white/20');
    content = content.replace(/bg-black\/50/g, 'bg-zinc-100 dark:bg-black/50');
    content = content.replace(/bg-black\/40/g, 'bg-zinc-100 dark:bg-black/40');
    content = content.replace(/bg-black/g, 'bg-white dark:bg-black');
    content = content.replace(/from-zinc-900/g, 'from-white dark:from-zinc-900');
    
    fs.writeFileSync(file, content);
    console.log('Modified ' + file);
  }
}
