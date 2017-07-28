'use strict';

const fs = require('fs');
const path = require('path');

const rootFolder = path.join(__dirname);

return Promise.resolve()
  .then(() => DeletefromDir(`${rootFolder}/src/demo`, '.ts'))
  .then(() => DeletefromDir(`${rootFolder}/src/lib`, '.ts'))
  .then(() => DeletefromDir(`${rootFolder}/integration/src`, '.ts'))


function DeletefromDir(startPath, filter) {

  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var fileUrl = path.join(startPath, files[i]);
    var fileName = path.parse(files[i]).name;
    var fileExt = path.parse(files[i]).ext;

    var stat = fs.lstatSync(fileUrl);
    if (stat.isDirectory()) {
      DeletefromDir(fileUrl, filter); //recurse
    } else if (fileExt === filter) {
      console.log('-- found TS: ', fileUrl);

      deleteFile(path.join(startPath, fileName), '.js');
      deleteFile(path.join(startPath, fileName), '.js.map');
    };
  };
};

function deleteFile(url, ext) {
  fs.unlink((url + ext), () => {
    console.log(`---- remove ${ext}: ${url} success`);
  })
}
