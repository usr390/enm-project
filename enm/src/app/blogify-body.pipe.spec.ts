import { BlogifyBodyPipe } from './blogify-body.pipe';

describe('BlogifyBodyPipe', () => {
  it('create an instance', () => {
    const pipe = new BlogifyBodyPipe();
    expect(pipe).toBeTruthy();
  });
});
