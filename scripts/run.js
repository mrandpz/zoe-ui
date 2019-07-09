const { exec } = require('child_process');

var gulpProcess = exec('npx gulp', {});

gulpProcess.stdout.on('data', function(data) {
  console.log(data);
});

gulpProcess.stderr.on('data', function(data) {
  console.log(data);
});

var doczProcess = exec('rimraf .docz && docz dev', {});

doczProcess.stdout.on('data', function(data) {
  console.log(data);
});

doczProcess.stderr.on('data', function(data) {
  console.log(data);
});
