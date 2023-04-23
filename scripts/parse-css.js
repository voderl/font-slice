const fs = require('fs');
const path = require('path');
const cssom = require('cssom');
const utils = require('../src/utils');

const inputPath = path.resolve(
  __dirname,
  '../assets/google-font-unicode-range.css',
);
const outputPath = path.resolve(
  __dirname,
  '../assets/google-font-unicode-range.json',
);

const data = fs.readFileSync(inputPath, 'utf-8');

const ast = cssom.parse(data);

const unicodeRangeList = [];

ast.cssRules.forEach((cssRule) => {
  const style = cssRule['style'];
  unicodeRangeList.push(style['unicode-range']);
});

const matchUnicodeRange = /U\+([0-9a-f]{1,5})-([0-9a-f]{1,5})/;
const matchUnicode = /U\+([0-9a-f]{1,5})/;

function parseUnicode(input) {
  const matchRange = input.match(matchUnicodeRange);
  if (matchRange) {
    const from = parseInt(matchRange[1], 16);
    const to = parseInt(matchRange[2], 16);
    const result = [];
    for (let i = from; i <= to; i++) {
      result.push(i);
    }
    return result;
  }
  const matchOne = input.match(matchUnicode);
  if (matchOne) {
    return [parseInt(matchOne[1], 16)];
  }
  console.log('cannot parse', input);
  return [];
}

function trimLineBreak(input) {
  return input.replace(/(\r\n|\n|\r)/gm, '');
}

const output = unicodeRangeList.map((unicodeStr) => {
  const unicodes = [];
  trimLineBreak(unicodeStr)
    .split(',')
    .forEach((token) => {
      unicodes.push(...parseUnicode(token));
    });
  return {
    subset: utils.unicodeToSubset(unicodes),
    unicodes,
  };
});

fs.writeFileSync(outputPath, JSON.stringify(output, '\t', 2));
