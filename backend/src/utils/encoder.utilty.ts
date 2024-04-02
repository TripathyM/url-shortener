export class EncoderUtils {
  private static BASE62 = 62;
  private static readonly MAX_BASE62_FOUR_CHAR_VALUE = 14776335; // We are targeting a 5 chars length slug. 62^4 is the highest decimal which can be represent using 5 base62 chars. Hence this number is 62^4-1
  private static readonly BASE62_CHARSET =
    'kbHfZuE1XjOA2Dx06qd4PaVzJBSrNQWg3FU5MmnYsv7etClRTLycIopwGi8Kh9'; // This has been jumbled to make avoid sequential slugs

  static encode(numberToEncode: number): string {
    let adjustedNumber = numberToEncode + this.MAX_BASE62_FOUR_CHAR_VALUE;
    let base62EncodedStr = '';
    while (adjustedNumber > 0) {
      base62EncodedStr =
        this.BASE62_CHARSET.charAt(adjustedNumber % this.BASE62) +
        base62EncodedStr;
      adjustedNumber = Math.floor(adjustedNumber / this.BASE62);
    }
    return base62EncodedStr;
  }

  static decode(base62EncodedStr: string): number {
    let base62Id = 0;
    for (let i = base62EncodedStr.length - 1, j = 0; i >= 0; i--, j++) {
      base62Id =
        base62Id +
        this.BASE62_CHARSET.indexOf(base62EncodedStr.charAt(i)) *
          Math.pow(this.BASE62, j);
    }
    return base62Id - this.MAX_BASE62_FOUR_CHAR_VALUE;
  }
}
