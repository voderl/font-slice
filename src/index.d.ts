declare type TOptions = {
  /**
   * 需要处理的源字体，暂只支持 ttf
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
   * keep ttf hint info (fpgm, prep, cvt). default = true
   */
  hinting?: boolean;
};

declare function createFontSlice(options: TOptions): Promise<any>;

export default createFontSlice;

export = createFontSlice;
