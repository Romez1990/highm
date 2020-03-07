import { RegexError } from '../Error';
import Tag from './Tag';
import TextPreprocessorError from './TextPreprocessorError';

function parse(text: string): Tag[] {
  const tags: Tag[] = [];
  const tagRegex = /<(?<open>\w+)>(?<content>.*?)<\/(?<close>\w+)>/g;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const match = tagRegex.exec(text);
    if (match === null) break;
    if (typeof match.groups === 'undefined')
      throw new RegexError('Groups are not defined');

    if (match.groups.open !== match.groups.close)
      throw new TextPreprocessorError('Open tag does not match close tag');
    tags.push({
      text: match[0],
      name: match.groups.open,
      content: match.groups.content,
      index: match.index,
    });
  }
  return tags;
}

export default parse;
