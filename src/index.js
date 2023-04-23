const fs = require('fs');
const path = require('path');
const { Font } = require('fonteditor-core');
const Fontmin = require('fontmin');
const bufferToVinyl = require('buffer-to-vinyl');
const unicodeRanges = require('../assets/google-font-unicode-range.json');
const utils = require('./utils');

async function createFontSlice({ fontPath, outputDir, fontFamily }) {
  const fontBuffer = fs.readFileSync(fontPath);
  const font = Font.create(fontBuffer);
  // 获取输入字体包含的所有 unicode
  const charMap = font.data.cmap;

  // 和谷歌的 unicodeRange 做 filter，只保留输入字体中包含的 unicode
  const filteredRanges = unicodeRanges
    .map(({ unicodes }) => {
      return unicodes.filter((unicode) => unicode in charMap);
    })
    .filter((item) => item.length > 0);

  const { name } = path.parse(fontPath);

  const cssList = await Promise.all(
    filteredRanges.map((range, index) => {
      console.log('subset', subset);
      return createFontSubset({
        fontBuffer,
        outputDir,
        name: `${name}.${index}`,
        subset: utils.unicodeToSubset(range),
        fontFamily: fontFamily || name,
        unicodeRange: utils.createUnicodeRange(range),
      });
    }),
  );
  fs.writeFileSync(
    path.resolve(outputDir, 'font.css'),
    `${cssList.join('')}
`,
  );
}

/**
 * 从一个字体中提取子集
 */
async function createFontSubset({ fontBuffer, outputDir, name, fontFamily, subset, unicodeRange }) {
  const fontmin = new Fontmin();
  fontmin.getFiles = () => {
    return bufferToVinyl.stream(fontBuffer, name);
  };
  fontmin.use(
    Fontmin.glyph({
      text: subset,
      hinting: false,
    }),
  );
  fontmin.use(
    Fontmin.glyph({
      text: subset,
      hinting: false,
    }),
  );
  fontmin.use(
    Fontmin.glyph({
      text: subset,
      hinting: false,
    }),
  );
  fontmin.use(Fontmin.ttf2woff2());
  fontmin.dest(outputDir);

  await new Promise((resolve, reject) => {
    fontmin.run(function (err, files) {
      if (err) {
        reject(err);
      }
      console.log(`写入字体${name}成功`);
      resolve();
    });
  });

  return `@font-face {
    font-family: ${fontFamily};
    src: url("./${name}.woff2") format('woff2'),
      url("./${name}.ttf") format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
    unicode-range: ${unicodeRange};
  }
`;
}

createFontSlice({
  fontPath: path.resolve(__dirname, '../assets/HYWenHei-55W.ttf'),
  outputDir: path.resolve(__dirname, '../output'),
});
