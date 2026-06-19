// deploy.js - Deploy to GitHub Pages
import { execSync } from 'child_process';

const commands = [
  'npm run build',
  'cd dist',
  'git init',
  'git add .',
  'git commit -m "deploy"',
  'git branch -M gh-pages',
  'git remote add origin https://github.com/1Daniel5/chateau-belle-vue.git',
  'git push -f origin gh-pages',
  'cd ..'
];

try {
  execSync(commands.join(' && '), { stdio: 'inherit', shell: true });
  console.log('\n Deployed successfully!');
  console.log(' Visit: https://1Daniel5.github.io/chateau-belle-vue');
} catch (error) {
  console.error('\n Deploy failed:', error.message);
  process.exit(1);
}