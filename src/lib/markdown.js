import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkCjkFriendly from 'remark-cjk-friendly';
import html from 'remark-html';

// remark-cjk-friendly lets *emphasis* and **bold** work right next to Chinese text and punctuation,
// where plain CommonMark refuses to treat the markers as emphasis.
export async function markdownToHtml(markdown) {
  const file = await remark().use(remarkGfm).use(remarkCjkFriendly).use(html).process(markdown);
  return String(file);
}

// Chinese when CJK characters outnumber Latin letters, so an English page that names 日课 stays English.
export function isChinese(text) {
  const cjk = (String(text || '').match(/[一-鿿]/g) || []).length;
  const latin = (String(text || '').match(/[A-Za-z]/g) || []).length;
  return cjk > latin;
}
