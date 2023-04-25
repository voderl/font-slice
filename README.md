# font-slice

slice chinese fonts into small slices.

[Demo](https://voderl.cn/js/%E5%AF%B9%E4%B8%AD%E6%96%87%E5%AD%97%E4%BD%93%E8%BF%9B%E8%A1%8C%E5%88%87%E7%89%87/)

将中文字体按照 Google Fonts 的切割子集方案，生成多个较小体积的资源包。仅需加载小部分字体资源即可展示完整页面。

## usage
1. install font-slice
```sh
npm install --save-dev font-slice
yarn add -D font-slice
```
2. usage
```js
const path = require("path");
const createFontSlice = require('font-slice');

createFontSlice({
  // fontPath
  fontPath: path.resolve(__dirname, 'YourPath.ttf'),
  // outputDir
  outputDir: path.resolve(__dirname, './output'),
})
```
3. 引用生成的 font.css 文件即可使用
## options
```ts
declare type TOptions = {
  /**
   * 需要处理的源字体，暂只支持 ttf、otf (otf 也是先转成 ttf 再处理)
   */
  fontPath: string;
  /**
   * 保存到的目录
   */
  outputDir: string;
  /**
   * 需要转换到的格式，默认为 ["woff2"]
   */
  formats?: Array<'woff' | 'woff2' | 'ttf' | 'eot' | 'svg'>;
  /**
   * 字体的 font-family 值
   */
  fontFamily?: string;
  /**
   * 字体的 font-weight，默认为 normal
   */
  fontWeight?: string;
  /**
   * 字体的 fontStyle，默认为 normal
   */
  fontStyle?: string;
  /**
   * 字体的 font-display，默认为 swap
   */
  fontDisplay?: string;
  /**
   * 自定义字体的分割格式，默认为 google fonts 的 unicode-range
   */
  customUnicodeRange?: Array<{
    unicodes: number[];
  }>;
  /**
   * 如果开启可能会让生成的字体体积变大，默认不开启
   * keep ttf hint info (fpgm, prep, cvt). default = false
   * https://github.com/ecomfe/fontmin#glyph
   */
  hinting?: boolean;
};
```

## performance

以[得意黑](https://github.com/atelier-anchor/smiley-sans)字体为例为例

处理前 ttf 大小 2074KB，woff2 大小 928KB.

处理后每个类型的字体生成 95 个文件：  
ttf   总大小为 2.3M   (最小文件 3.4K，最大文件 55K)  
woff2 总大小为 1.3M   (最小文件 1.5K，最大文件 33K)

实际加载页面的体积由页面使用的字符决定，以该 README 为例，只需要加载 330KB 就能覆盖全部字符。

## detail

博客：[中文字体的终极解决方案——对字体进行切片](https://voderl.cn/js/%E5%AF%B9%E4%B8%AD%E6%96%87%E5%AD%97%E4%BD%93%E8%BF%9B%E8%A1%8C%E5%88%87%E7%89%87/)

本工具使用 Google fonts 的 unicode-range 划分，来将一个完整的字体包分成多个小的资源包，在大部分情况下，只需要加载部分资源包就能完全覆盖。同时，当网页中有生僻字时，需要付出的代价也只是多加载几个资源包。

以谷歌字体的一个 css 引入文件为例:
```css
@font-face {
  font-family: 'Noto Sans SC';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/notosanssc/v12/k3kXo84MPvpLmixcA63oeALhLOCT-xWNm8Hqd37g1OkDRZe7lR4sg1IzSy-MNbE9VH8V.4.woff2) format('woff2');
  unicode-range: U+1f1e9-1f1f5, U+1f1f7-1f1ff, U+1f21a, U+1f232, U+1f234-1f237, U+1f250-1f251, U+1f300, U+1f302-1f308, U+1f30a-1f311, U+1f315, U+1f319-1f320, U+1f324, U+1f327, U+1f32a, U+1f32c-1f32d, U+1f330-1f357, U+1f359-1f37e;
}
/* [5] */
@font-face {
  font-family: 'Noto Sans SC';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/notosanssc/v12/k3kXo84MPvpLmixcA63oeALhLOCT-xWNm8Hqd37g1OkDRZe7lR4sg1IzSy-MNbE9VH8V.5.woff2) format('woff2');
  unicode-range: U+fee3, U+fef3, U+ff03-ff04, U+ff07, U+ff0a, U+ff17-ff19, U+ff1c-ff1d, U+ff20-ff3a, U+ff3c, U+ff3e-ff5b, U+ff5d, U+ff61-ff65, U+ff67-ff6a, U+ff6c, U+ff6f-ff78, U+ff7a-ff7d, U+ff80-ff84, U+ff86, U+ff89-ff8e, U+ff92, U+ff97-ff9b, U+ff9d-ff9f, U+ffe0-ffe4, U+ffe6, U+ffe9, U+ffeb, U+ffed, U+fffc, U+1f004, U+1f170-1f171, U+1f192-1f195, U+1f198-1f19a, U+1f1e6-1f1e8;
}
```

该项目所做的内容如下：

1. 提取 google fonts 的 unicode-range。

2. 提取要处理的字体包含的所有字符，得到 google fonts 的 unicode-range 和字体里包含的字符的交集部分。

3. 将字符按照上面步骤得出的拆分方案，提取字体子集，生成多个文件及 css 样式文件。

### Thanks

* [Google Fonts](https://fonts.google.com/) - https://fonts.google.com/
* [fontmin](https://github.com/ecomfe/fontmin) - https://github.com/ecomfe/fontmin
* [fonteditor-core](https://github.com/kekee000/fonteditor-core) - https://github.com/kekee000/fonteditor-core
