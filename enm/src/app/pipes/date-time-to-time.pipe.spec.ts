import { DateTime } from 'luxon';
import { DateTimeToTimePipe } from './date-time-to-time.pipe';

describe('DateTimeToTimePipe', () => {
  let pipe: DateTimeToTimePipe;

  beforeEach(() => {
    pipe = new DateTimeToTimePipe();
  });
  
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  
  describe('on valid inputs', () => {
    it('assuming CDT, should transform "2023-07-17T01:00:00Z" to "8:00pm"', () => {
  
      const input = DateTime.fromObject({ 
        year:   2023, 
        month:  7, 
        day:    16, 
        hour:   20, 
        minute: 0 
      }).toUTC().toISO();
  
      const output = '8:00pm';
  
  
      if (input !== null) expect(pipe.transform(input)).toEqual(output); else;
    });

    it('assuming CDT, should transform "2024-01-01T23:00:00Z" to "5:00pm"', () => {
  
      const input = DateTime.fromObject({ 
        year:   2024, 
        month:  1, 
        day:    1, 
        hour:   17, 
        minute: 0 
      }).toUTC().toISO();
  
      const output = '5:00pm'
  
  
      if (input !== null) expect(pipe.transform(input)).toEqual(output); else;
    });
  });
});
