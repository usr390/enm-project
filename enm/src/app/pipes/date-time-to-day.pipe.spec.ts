import { DateTime } from 'luxon';
import { DateTimeToDayPipe } from './date-time-to-day.pipe';

describe('DateTimeToDayPipe', () => {
  let pipe: DateTimeToDayPipe;

  beforeEach(() => {
    pipe = new DateTimeToDayPipe();
  });
  
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  
  describe('on valid inputs', () => {
    it('should transform "2023-07-15T01:00:00.000Z" to "15"', () => {
  
      const input = DateTime.fromObject({ 
        year:   2023, 
        month:  7, 
        day:    15, 
        hour:   20, 
        minute: 30 
      }).toUTC().toISO();
  
      const output = '15';
  
  
      if (input !== null) expect(pipe.transform(input)).toEqual(output); else;
    });
  
    it('should transform "2023-01-1T01:00:00.000Z" to "1"', () => {
  
      const input = DateTime.fromObject({ 
        year:   2023, 
        month:  1, 
        day:    1, 
        hour:   20, 
        minute: 30 
      }).toUTC().toISO();
  
      const output = '1';
  
  
      if (input !== null) expect(pipe.transform(input)).toEqual(output); else;
    });
  });
});
