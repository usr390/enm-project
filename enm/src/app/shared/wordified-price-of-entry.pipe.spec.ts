import { WordifiedPriceOfEntryPipe } from './wordified-price-of-entry.pipe';

describe('WordifiedPriceOfEntry', () => {

  let pipe: WordifiedPriceOfEntryPipe;

  beforeEach(() => {
    pipe = new WordifiedPriceOfEntryPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('on valid inputs', () => {
    it('should transform 5 into $5', () => {
      const input = 5;
      const output = "$5";
      expect(pipe.transform(input)).toEqual(output);
    });
    it('should transform 45 into $45', () => {
      const input = 45;
      const output = "$45";
      expect(pipe.transform(input)).toEqual(output);
    });
    it('should transform 3 into $3', () => {
      const input = 3;
      const output = "$3";
      expect(pipe.transform(input)).toEqual(output);
    });
  });

  describe('on special cases', () => {
    it('should transform 0 into Free', () => {
      const input = 0;
      const output = 'Free';
      expect(pipe.transform(input)).toEqual(output);
    });
  });
});
