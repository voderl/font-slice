function generateHtml(fontFamily) {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <title>Demo</title>
      <meta name="description" content="" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="./font.css" />
    </head>
    <body>
      <div style="width: 600px; margin: auto;">
        <p> Created by voderl ( <a href="https://github.com/voderl/font-slice" target="_blank">https://github.com/voderl/font-slice</a> )</p>
        <p> 如果遇到问题可以在 <a href="https://github.com/voderl/font-slice/issues" target="_blank">issue</a> 中反馈 </p>
        <textarea rows="10" cols="50" style="font-size: 20px; font-family: ${fontFamily};">在这里进行字体测试吧~

会有清亮的风使草木伏地...</textarea>
      </div>
    </body>
  </html>`;
}

const formatMap = {
  ttf: 'truetype',
  otf: 'opentype',
  svg: 'svg',
  eot: 'embedded-opentype',
  woff: 'woff',
  woff2: 'woff2',
};

function generateCss({
  name,
  fontFamily,
  fontWeight,
  fontStyle,
  fontDisplay,
  formats,
  unicodeRange,
}) {
  const src = formats
    .map((format) => {
      const type = formatMap[format];
      if (!type) {
        console.warn('不支持的格式' + format);
        return '';
      }
      return `url("./${name}.${format}") format("${type}")`;
    })
    .filter(Boolean)
    .join(',\n');

  return `@font-face {
  font-family: ${fontFamily};
  src: ${src};
  font-weight: ${fontWeight};
  font-style: ${fontStyle};
  font-display: ${fontDisplay};
  unicode-range: ${unicodeRange};
}`;
}

module.exports = {
  generateHtml,
  generateCss,
};
