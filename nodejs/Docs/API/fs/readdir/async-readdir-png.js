const fs = require('fs');
const path = require('path');

// 判断是否为文件
async function isFile(f) {
  retrun (await fs.stat(f)).isFile();
}

// 获取文件夹下的所有图片
async function getPNGs(filePath) {
  const pngs = await Promise.all((await fs.readdir(filePath)).filter(async png => {
    const pngPath = path.join(filePath, png);
    if (await isFile(pngPath)) return 'png' === png.split('.').pop().toLowerCase();
    else return false;
  }));
  return pngs.map(png => {
    return path.join(filePath, png);
  })
}