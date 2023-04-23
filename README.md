# font-slice
slice chinese fonts into small slices

本工具使用 Google fonts 的 unicode-range 划分，来将一个完整的字体包分成多个小的资源包，在大部分情况下，只需要加载部分资源包就能完全覆盖。同时，当网页中有生僻字时，需要付出的代价也只是多加载几个资源包。

## 原理
谷歌字体可以按照按照使用频率来分成不同字体包来减小加载体积。
以谷歌字体的一个 css 引入文件为例
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

按照一定的粒度，将字体分成多个文件，比如一个4MB的字体包分成100个40KB的字体包。通过机器学习等方法，将一些字频较高的字体分别打包进同一个字体包，并通过css中 unicode-range 来给不同文字加载不同的字体包资源。这样的话，一般网页中使用到的中文也只是一部分字体，只需要加载多个资源包就能完全覆盖。同时，就算网页中有很多生僻字，需要付出的代价也只是多加载几个资源包。

