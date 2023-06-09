import { StandardTimePipe } from './standard-time.pipe';

describe('StandardTimePipe', () => {

  let pipe: StandardTimePipe;

  beforeEach(() => {
    pipe = new StandardTimePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('on valid inputs', () => {
    it('should transform 0800 into 8:00am', () => {
      const input = 800;
      const output = '8:00am';
      expect(pipe.transform(input)).toEqual(output);
    });
    it('should transform 1730 into 5:30pm', () => {
      const input = 1730;
      const output = '5:30pm';
      expect(pipe.transform(input)).toEqual(output);
    });
    it('should transform 1200 into 12:00pm', () => {
      const input = 1200;
      const output = '12:00pm';
      expect(pipe.transform(input)).toEqual(output);
    });
    it('should transform 0000 into 12:00am', () => {
      const input = 0;
      const output = '12:00am';
      expect(pipe.transform(input)).toEqual(output);
    });
  });

  describe('on invalid inputs', () => {
    it('should transform -1 into an empty string', () => {
      const input = -1;
      const output = '';
      expect(pipe.transform(input)).toEqual(output);
    });
    it('should transform 2400 into an empty string', () => {
      const input = 2400;
      const output = '';
      expect(pipe.transform(input)).toEqual(output);
    });
  });
});
