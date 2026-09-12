const fs = require('fs');
const path = require('path');

const webDir = path.resolve(__dirname, '..', 'apps', 'web');
const nextDir = path.join(webDir, '.next');

if (fs.existsSync(nextDir)) {
  // If Vercel root directory was set to 'apps' and looks for 'apps/web/.next':
  const nestedAppsWeb = path.resolve(__dirname, '..', 'apps', 'apps', 'web');
  try {
    if (!fs.existsSync(nestedAppsWeb)) {
      fs.mkdirSync(nestedAppsWeb, { recursive: true });
    }
    const targetNext = path.join(nestedAppsWeb, '.next');
    if (!fs.existsSync(targetNext)) {
      fs.symlinkSync(nextDir, targetNext, 'junction');
      console.log('Created fallback symlink for Vercel:', targetNext, '->', nextDir);
    }
  } catch (err) {
    console.warn('Fallback symlink notice:', err.message);
  }
} else {
  console.warn('.next directory not found at:', nextDir);
}
