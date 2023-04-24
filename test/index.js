const path = require('path');

const createFontSlice = require('../');

createFontSlice({
  fontPath: path.resolve(__dirname, '../assets/HYWenHei-55W.ttf'),
  outputDir: path.resolve(__dirname, '../output'),
});
