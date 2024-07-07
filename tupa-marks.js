/* 切韻拼音
 *
 * https://zhuanlan.zhihu.com/p/478751152
 *
 * 推導器所用的音韻地位無需選項，但在處理其他來源的音韻地位時可指定以下選項：
 *
 * 選項.模式 = '嚴格'; // 僅允許正則地位（如不指定 `模式`，也按嚴格模式處理）
 * 選項.模式 = '標準'; // 允許部分非正則地位（推導爲對應的正則地位），不允許無法自動正則化的聲韻搭配
 * 選項.模式 = '寬鬆'; // 允許非正則地位，無法自動正則化的聲韻搭配保持原樣
 * 選項.脣音咍韻歸灰韻 = false; // 脣音咍韻推導爲開口，僅在「標準」「寬鬆」模式下有效
 *
 * @author unt
 */

if (!音韻地位) return [];

const is = (...x) => 音韻地位.屬於(...x);
const when = (...x) => 音韻地位.判斷(...x);

// 正則化之前需保留該信息
const is脣音咍韻 = is`脣音 咍韻`;

const 正則化 = {
  標準: 'v2',
  寬鬆: 'v2lenient',
}[選項.模式] || 'v2Strict';
音韻地位 = Qieyun.適配分析體系[正則化](音韻地位);

// 恢復脣音咍韻信息
if (is脣音咍韻 && !選項.脣音咍韻歸灰韻) {
  音韻地位 = 音韻地位.調整({ 韻: '咍' });
}

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
    ['蒸韻 (重紐B類 或 幫組 或 合口)', '冰'],
    ['東韻 三等', '終'],
    ['清韻', '庚'],
    ['陽韻', '唐'],
    ['臻韻 或 莊組 欣韻 上聲', '眞'],
    ['凡韻', '嚴'],
    ['', 音韻地位.韻],
  ]);
  const 韻到韻尾 = [
    ['脂之尤侯 　佳　模　 支魚虞 麻歌', ''],
    ['冰蒸終東 青耕登冬江 　　鍾 庚唐', 'ng', 'k'],
    ['　微微　 齊皆咍灰　 祭廢廢 夬泰', 'j'],
    ['眞欣文　 先山痕魂　 仙元元 刪寒', 'n', 't'],
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

  // 添加三等 C 介音（僅歌陽韻需要處理）
  if (is`三等` && 元音 === 'a') {
    // 重紐A類用於𩦠小韻
    元音 = (is`脣音 重紐A類` ? 'i' : is`開口` ? 'y' : 'u') + 元音;
  }
  // 添加三等 A、B 介音
  if (is`三等` && ['i', 'e', 'ae'].includes(元音)) {
    if (is`重紐B類 或 云母 或 莊組 或 庚蒸韻 或 幽韻 幫組`) {
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

function tupaToMarkings(tupa) {
  // Step 1: Replace specific substrings
  tupa = tupa.replace(/ae/g, 'aˤ')
    .replace(/ee/g, 'eˤ')
    .replace(/oeu/g, 'oˤ')
    .replace(/ng/g, 'ŋ')
    .replace(/ou/g, 'ᵒu');

  // Step 2: Handle tone marks
  const toneMarks = {
    q: { 'a': 'á', 'e': 'é', 'o': 'ó', 'u': 'ú', 'i': 'í', 'y': 'ý' },
    h: { 'a': 'à', 'e': 'è', 'o': 'ò', 'u': 'ù', 'i': 'ì', 'y': 'ỳ' }
  };

  // Unicode combining diacritical marks
  const combiningMarks = {
    q: '\u0301', // Combining acute accent
    h: '\u0300'  // Combining grave accent
  };

  // Helper function to add tone mark
  function addToneMark(str, toneMap, combiningMark) {
    const priority = ['a', 'e', 'o', 'u', 'i', 'y'];
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

return tupaToMarkings(get聲母() + get韻母() + get聲調());
