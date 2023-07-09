import { DateTime } from 'luxon';
import { DateTimeToWordifiedMonthPipe } from './date-time-to-wordified-month.pipe';

describe('DateTimeToWordifiedMonthPipe', () => {

  let pipe: DateTimeToWordifiedMonthPipe;

  beforeEach(() => {
    pipe = new DateTimeToWordifiedMonthPipe();
  });
  
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  
  describe('on valid inputs', () => {
    it('should transform "2023-07-15T01:00:00.000Z" to "Jul"', () => {
  
      const input = DateTime.fromObject({ 
        year:   2023, 
        month:  7, 
        day:    15, 
        hour:   20, 
        minute: 30 
      }).toUTC().toISO();
  
      const output = 'Jul';
  
  
      if (input !== null) expect(pipe.transform(input)).toEqual(output); else;
    });
  
    it('should transform "2023-01-15T01:00:00.000Z" to "Jan"', () => {
  
      const input = DateTime.fromObject({ 
        year:   2023, 
        month:  1, 
        day:    15, 
        hour:   20, 
        minute: 30 
      }).toUTC().toISO();
  
      const output = 'Jan';
  
  
      if (input !== null) expect(pipe.transform(input)).toEqual(output); else;
    });
  });
});

