import './index.scss';
import '../src/index.scss';

import { TagsInput } from '../src/index';

const tags = new TagsInput('tags_input', {
  createOnElementWithsSelector: '#tags_input',
});
console.log(tags);
