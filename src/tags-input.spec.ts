import { TagsInput } from './index';

describe('Module Actions', () => {
  beforeAll(() => {
    document.body.innerHTML = '<div id="tags_input"></div>';
  });

  it('loads module', () => {
    expect.assertions(1);

    expect(TagsInput).toBeTruthy();
  });

});
