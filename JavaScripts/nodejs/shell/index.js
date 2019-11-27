var cp = require('child_process');

cp.execFile('./hello', null, null, function (err, stdout, stderr) {
  if (err) {
    console.log('execute file error!');
    console.log(err);
  } else {
    console.log('stdout: ', stdout);
    console.log('stderr: ', stderr);
  }
});

