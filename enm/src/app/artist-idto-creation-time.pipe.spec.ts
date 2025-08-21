import { ArtistIDtoCreationTimePipe } from './artist-idto-creation-time.pipe';

describe('ArtistIDtoCreationTimePipe', () => {
  it('create an instance', () => {
    const pipe = new ArtistIDtoCreationTimePipe();
    expect(pipe).toBeTruthy();
  });
});
