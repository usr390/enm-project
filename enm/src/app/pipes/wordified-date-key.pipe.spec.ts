import { WordifiedDateKeyPipe } from './wordified-date-key.pipe';

describe('WordifiedDateKeyPipe', () => {

  let pipe: WordifiedDateKeyPipe;

  beforeEach(() => {
    pipe = new WordifiedDateKeyPipe();
  });

  describe('on valid inputs', () => {
    it('should transform 19981201 to December 1', () => {
      const input = '19981201';
      const output = 'Tuesday, December 1';
      expect(pipe.transform(input)).toEqual(output);
    });
    it('should transform 20180128 to January 28', () => {
      const input = '20180128';
      const output = 'Sunday, January 28';
      expect(pipe.transform(input)).toEqual(output);
    });
    it('should transform 20270520 to May 20', () => {
      const input = '20270520';
      const output = 'Thursday, May 20';
      expect(pipe.transform(input)).toEqual(output);
    });
    it('should transform 20200930 to September 30', () => {
      const input = '20200930';
      const output = 'Wednesday, September 30';
      expect(pipe.transform(input)).toEqual(output);
    });
  });

  describe('on invalid inputs', () => {
    it('should transform 20245 into an empty string', () => {
      const input = '20245';
      const output = '';
      expect(pipe.transform(input)).toEqual(output);
    });
    it('should transform 202425677 into an empty string', () => {
      const input = '202425677';
      const output = '';
      expect(pipe.transform(input)).toEqual(output);
    });
  });

});

