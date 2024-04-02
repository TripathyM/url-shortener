import * as fc from 'fast-check';
import { EncoderUtils } from './encoder.utilty';

describe('Encoder Utility', () => {
  describe('encode', () => {
    // Use property based testing (with fast-check) to generate random numbers and check if the encoded string is of the expected length.
    it('should return the original number after encoding and decoding', async () => {
      fc.assert(
        fc.property(fc.nat(), (n) => {
          const encoded = EncoderUtils.encode(n);
          const decoded = EncoderUtils.decode(encoded);

          expect(decoded).toEqual(n);
        }),
      );
    });
  });
});
