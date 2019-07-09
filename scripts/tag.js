const fs = require('fs');
const { execSync } = require('child_process');

// 发到正式环境,并且打上tag
const packageJson = fs.readFileSync('./package.json', 'utf-8');

modulex.exports = function tag() {
  console.log('tagging');
  const { version } = JSON.parse(packageJson);
  execSync(`git tag ${version}`);
  execSync(`git push origin ${version}:${version}`);
  execSync('git push origin master:master');
  console.log('tagged');
};
