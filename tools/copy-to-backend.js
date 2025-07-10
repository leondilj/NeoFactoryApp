const fs = require("fs");
const path = require("path");

const srcDir = path.resolve(__dirname, "../frontend/dist");
const destDir = path.resolve(__dirname, "../backend/FinanceAPI/wwwroot");

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  fs.readdirSync(src).forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    if (fs.statSync(srcPath).isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

console.log(`🔄 Copiando arquivos de ${srcDir} para ${destDir}`);
copyRecursive(srcDir, destDir);
console.log("✅ Frontend copiado com sucesso para wwwroot.");
