import { WordifiedCoverPipe } from './wordified-cover.pipe';

describe('WordifiedCover', () => {

  let pipe: WordifiedCoverPipe;

  beforeEach(() => {
    pipe = new WordifiedCoverPipe();
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
    it('should transform 0 into No Cover', () => {
      const input = 0;
      const output = 'No Cover';
      expect(pipe.transform(input)).toEqual(output);
    });
  });
});
