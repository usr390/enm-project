import { WordifiedMonthPipe } from './wordified-month.pipe';

describe('WordifiedMonthPipe', () => {

  let pipe: WordifiedMonthPipe;

  beforeEach(() => {
    pipe = new WordifiedMonthPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('on valid inputs', () => {
    it('should transform 1 to January', () => {
      const input = 1;
      const output = 'January';
      expect(pipe.transform(input)).toEqual(output);
    });
    it('should transform 2 to February', () => {
      const input = 2;
      const output = 'February';
      expect(pipe.transform(input)).toEqual(output);
    });
    it('should transform 3 to March', () => {
      const input = 3;
      const output = 'March';
      expect(pipe.transform(input)).toEqual(output);
    });
    it('should transform 4 to April', () => {
      const input = 4;
      const output = 'April';
      expect(pipe.transform(input)).toEqual(output);
    });
    it('should transform 5 to May', () => {
      const input = 5;
      const output = 'May';
      expect(pipe.transform(input)).toEqual(output);
    });
    it('should transform 6 to June', () => {
      const input = 6;
      const output = 'June';
      expect(pipe.transform(input)).toEqual(output);
    });
    it('should transform 7 to July', () => {
      const input = 7;
      const output = 'July';
      expect(pipe.transform(input)).toEqual(output);
    });
    it('should transform 8 to August', () => {
      const input = 8;
      const output = 'August';
      expect(pipe.transform(input)).toEqual(output);
    });
    it('should transform 9 to September', () => {
      const input = 9;
      const output = 'September';
      expect(pipe.transform(input)).toEqual(output);
    });
    it('should transform 10 to October', () => {
      const input = 10;
      const output = 'October';
      expect(pipe.transform(input)).toEqual(output);
    });
    it('should transform 11 to November', () => {
      const input = 11;
      const output = 'November';
      expect(pipe.transform(input)).toEqual(output);
    });
    it('should transform 12 to December', () => {
      const input = 12;
      const output = 'December';
      expect(pipe.transform(input)).toEqual(output);
    });
  });

  describe('on invalid inputs', () => {
    it('should transform -1 into an empty string', () => {
      const input = -1;
      const output = '';
      expect(pipe.transform(input)).toEqual(output);
    });
    it('should transform 13 into an empty string', () => {
      const input = 13;
      const output = '';
      expect(pipe.transform(input)).toEqual(output);
    });
  });
});