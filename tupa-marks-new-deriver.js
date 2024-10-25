/* 切韻拼音
 *
 * https://zhuanlan.zhihu.com/p/478751152
 *
 * @author unt
 */

if (!音韻地位) return [];

const is = (...x) => 音韻地位.屬於(...x);
const when = (...x) => 音韻地位.判斷(...x);

function get聲母() {
  return {
    幫: 'p',  滂: 'ph',  並: 'b',  明: 'm',
    端: 't',  透: 'th',  定: 'd',  泥: 'n',  來: 'l',
    知: 'tr', 徹: 'trh', 澄: 'dr', 孃: 'nr',
    見: 'k',  溪: 'kh',  羣: 'g',  疑: 'ng', 云: '',
    影: 'q',  曉: 'h',   匣: 'gh',
    精: 'ts',  清: 'tsh',  從: 'dz',  心: 's',  邪: 'z',
    莊: 'tsr', 初: 'tsrh', 崇: 'dzr', 生: 'sr', 俟: 'zr',
    章: 'tj',  昌: 'tjh',  常: 'dj',  書: 'sj', 船: 'zj', 日: 'nj', 以: 'j',
  }[音韻地位.母];
}

function get韻母() {
  // 爲了方便推導，對韻類稍作調整
  const 韻 = when([
    ['蒸韻 B類', '冰'],
    ['東韻 三等', '終'],
    ['清韻', '庚'],
    ['陽韻', '唐'],
    ['臻韻', '真'],
    ['凡韻', '嚴'],
    ['', 音韻地位.韻],
  ]);
  const 韻到韻尾 = [
    ['脂之尤侯 　佳　模　 支魚虞 麻歌', ''],
    ['冰蒸終東 青耕登冬江 　　鍾 庚唐', 'ng', 'k'],
    ['　微微　 齊皆咍灰　 祭廢廢 夬泰', 'j'],
    ['真殷文　 先山痕魂　 仙元元 刪寒', 'n', 't'],
    ['幽　　　 蕭　　　　 宵　　 肴豪', 'w'],
    ['侵　　　 添咸　覃　 鹽嚴嚴 銜談', 'm', 'p'],
  ];
  const 元音列表 = [
    'i',       'y',  'u', 'ou',
    'e', 'ee', 'eo', 'o', 'oeu',
    'e',       'yo', 'uo',
         'ae', 'a',
  ];

  let 匹配行 = 韻到韻尾.find(行 => 行[0].includes(韻));
  let 元音 = 元音列表[匹配行[0].replace(/ /g, '')[is`開口` ? 'indexOf' : 'lastIndexOf'](韻)];
  let 韻尾 = 匹配行[1 + is`入聲`];

  // 元音 a 添加三等介音（一般是 C 類）
  if (is`三等` && 元音 === 'a') {
    // A類見於「𩦠」小韻
    元音 = (is`A類` ? 'i' : is`開口` ? 'y' : 'u') + 元音;
  }
  // 前元音添加三等 A、B 介音
  if (
    (is`三等` && ['i', 'e', 'ae'].includes(元音)) ||
    (元音 === 'ae' && is`端組 四等`)
  ) {
    if (is`B類 或 莊組`) {
      元音 = (is`合口` ? 'u' : 'y') + 元音;
    } else if (元音 !== 'i') {
      // 拼莊組以外的銳音一律視爲 A 類（同《切韻》清韻、《廣韻》諄韻的獨立條件）
      元音 = 'i' + 元音;
    }
  }
  // 添加合口介音
  if (is`合口` && !['u', 'o'].includes(元音[0])) {
    元音 = 'w' + 元音;
  }
  return 元音 + 韻尾;
}

function get聲調() {
  return { 上: 'q', 去: 'h' }[音韻地位.聲] || '';
}

let tupa = get聲母() + get韻母() + get聲調()


function tupaToMarkings(tupa) {
  // Step 1: Replace specific substrings
  tupa = tupa
    // basic
    .replace(/ae/g, 'aˤ')
    .replace(/ee/g, 'eˤ')
    .replace(/oeu/g, 'oˤ')
    .replace(/ng/g, 'ŋ')
    .replace(/ou/g, 'ᵒu')
    // Consonant: q -> ʔ (when q is at the beginning)
    .replace(/^q/, 'ʔ')
    // Consonant: h -> ʰ for aspiration (thus not include h or gh)
    .replace(/(?<=p|t|k|tr|ts|tsr|tj)h/g, 'ʰ')
    // Consonant: sr, zr -> circumflex like Esperanto (or use ʂ ʐ ?)
    ////    Note: currently not doing r -> dor-below like tr->ṭ in Sanskrit IAST
    ////          mainly because tr is already equally long as ts, tj and tŝ
    // .replace(/sr/g, 'ŝ')
    // .replace(/zr/g, 'ẑ')
    // Consonant: 知澈澄娘 r -> (whether use ʵ , ɻ , or ʈ ɖ ɳ ?)
    // .replace(/r/g, 'ʵ')
    .replace(/tr/g, 'ʈ')
    .replace(/dr/g, 'ɖ')
    .replace(/nr/g, 'ɳ')
    .replace(/sr/g, 'ʂ')
    .replace(/zr/g, 'ʐ')
    // Consonant: 章昌常书船 j -> (whether use j , ʲ , or ɕ ʑ ȵ ?)
    .replace(/sj/g, 'ɕ')
    .replace(/zj/g, 'ʑ')
    .replace(/nj/g, 'ȵ')
    .replace(/tj/g, 'tɕ')
    .replace(/dj/g, 'dʑ')
    // Consonant: gh -> (ğ or ɣ or ʁ or?)
    .replace(/gh/g, 'ʁ')
    // Medial: wi -> ü
    ////    Note: maybe not doing wi -> y because y is not otherwise used
    .replace(/wi/g, 'ü')
    // Medial: y -> ɨ (not sure, whether ɨ or ɿ or ʅ or ɨ̧ or keep using y ?)
    //      In fact ɨ with acute/grave is in some text envs not clear at all...
    //      But ɨ is the most IPA-ish one, and ï ɯ̈ etc. also have problems with accents
    //      But in some cases it can also mean ɻ, not only a vowel, thus hesitating
    .replace(/y/g, 'ɨ')
    // Medial: w -> ʷ (when is not followed by h, q or ending)
    .replace(/w(?![hq]|\b)/g, 'ʷ')
    // Vowel: eo -> ə
    .replace(/eo/g, 'ə')
    ;

  // Step 2: Handle tone marks
  const toneMarks = {
    q: { 'a': 'á', 'e': 'é', 'o': 'ó', 'ə': 'ǝ́', 'u': 'ú', 'i': 'í', 'y': 'ý', 'ɨ': 'ɨ́', 'ɿ': 'ɿ́', 'ü': 'ǘ' },
    h: { 'a': 'à', 'e': 'è', 'o': 'ò', 'ə': 'ǝ̀', 'u': 'ù', 'i': 'ì', 'y': 'ỳ', 'ɨ': 'ɨ̀', 'ɿ': 'ɿ̀', 'ü': 'ǜ' }
  };

  // Unicode combining diacritical marks
  const combiningMarks = {
    q: '\u0301', // Combining acute accent
    h: '\u0300'  // Combining grave accent
  };

  // Helper function to add tone mark
  function addToneMark(str, toneMap, combiningMark) {
    const priority = ['a', 'e', 'o', 'ə', 'u', 'i', 'y', 'ɨ', 'ɿ', 'ü'];
    for (let char of priority) {
      const index = str.lastIndexOf(char);
      if (index !== -1) {
        return str.slice(0, index) + toneMap[char] + str.slice(index + 1);
      }
    }
    // Fallback: add combining mark to the last character
    return str + combiningMark;
  }

  // Check for 'q' or 'h' at the end of the string
  if (tupa.endsWith('q') || tupa.endsWith('h')) {
    const tone = tupa.slice(-1);
    tupa = addToneMark(tupa.slice(0, -1), toneMarks[tone], combiningMarks[tone]);
  }

  return tupa;
}

return tupaToMarkings(tupa);
