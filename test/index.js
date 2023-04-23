const path = require('path');

const createFontSlice = require('../');

createFontSlice({
  fontPath: path.resolve(__dirname, '../assets/KaiSong.ttf'),
  outputDir: path.resolve(__dirname, '../output'),
});
