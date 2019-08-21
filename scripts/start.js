const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');

const doczProcess = exec('rimraf .docz && docz dev', {});

doczProcess.stdout.on('data', function(data) {
  console.log(data);
});

doczProcess.stderr.on('data', function(data) {
  console.log(data);
  console.log('open with http://127.0.0.1:3000/');
});

function updateLessFile() {
  const componentsPath = path.join(process.cwd(), 'components');
  let componentsLessContent = '';
  // Build components in one file: lib/style/components.less
  // 读取所有component的index.less 生成 @import *.less 写入 components.less
  fs.readdir(componentsPath, (err, files) => {
    files.forEach(file => {
      if (fs.existsSync(path.join(componentsPath, file, 'style', 'index.less'))) {
        componentsLessContent += `@import "../../components/${path.join(
          file,
          'style',
          'index.less',
        )}";\n`;
      }
    });
    fs.writeFileSync(
      path.join(process.cwd(), 'src', 'style', 'components.less'),
      componentsLessContent,
    );
  });
}

chokidar
  .watch(path.join(__dirname, '../components/**/*.less'), {
    persistent: true,
  })
  .on('change', () => updateLessFile())
  .on('add', () => updateLessFile())
  .on('unlink', () => updateLessFile());
