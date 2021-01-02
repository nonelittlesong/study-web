// NodeJS
const fs = require('fs');

exports.statPromise = function (f) {
  return new Promise((resolve, reject) => {
    fs.stat(f, (err, stats) => {
      if (err) return reject(err);
      return resolve(stats);
    });
  });
};

exports.readdirPromise = function (d) {
  return new Promise((resolve, reject) => {
    fs.readdir(d, (err, files) => {
      if (err) return reject(err);
      return resolve(files);
    });
  });
};
