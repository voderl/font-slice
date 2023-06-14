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
   * 是否需要在生成完成后打开预览页面，默认为 true，如果为 false 不会生成 index.html 及启动服务器
   */
  preview?: boolean;
  /**
   * 生成字体文件的名称，默认为 `${fontFileName}.${index + 1}`
   */
  generateFontSubsetName?: (fontFileName: string, index: number) => string;
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

declare function createFontSlice(options: TOptions): Promise<any>;

export default createFontSlice;

export = createFontSlice;
