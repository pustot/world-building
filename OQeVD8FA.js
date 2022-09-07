/* 丌通语汉字音读
 *
 * Han character pronunciation in Ttomniese
 *
 * @author Pusto
 */

if (!音韻地位) return [];

const is = (...x) => 音韻地位.屬於(...x);
const when = (...x) => 音韻地位.判斷(...x);

// 音韻地位 = Qieyun.適配分析體系('ytenx')(音韻地位);

function 聲母規則() {
  switch (音韻地位.母) {
    case '幫': return 'b';
    case '滂': return 'h';
    case '並': return 'b8';
    case '明': return 'V';
    case '端': return 'D';
    case '透': return 'm';
    case '定': return 'D8';
    case '泥': return 'H';
    case '知': return 'Dl';
    case '徹': return 'ml';
    case '澄': return 'D8l';
    case '孃': return 'Hl';
    case '精': return '9';
    case '清': return 'c';
    case '從': return '98';
    case '心': return 'C';
    case '邪': return 'd';
    case '莊': return 'G';
    case '初': return 'J';
    case '崇': return 'G8';
    case '生': return 'W';
    case '俟': return 'Q';
    case '章': return 'T';
    case '昌': return 'B';
    case '常': return 'T8';
    case '書': return '6';
    case '船': return '68';
    case '見': return 'Y';
    case '溪': return 'A';
    case '羣': return 'Y8';
    case '疑': return 'Z';
    case '影': return 'O';
    case '曉': return 'X';
    case '匣': return 'X8';
    case '云': return '';
    case '以': return 'E';
    case '來': return 'S';
    case '日': return 'HM';
    default: throw new Error('無聲母規則');
  }
}

function 韻母規則() {
  // 通攝
  if (is('東韻 一等')) return 'FZ';
  if (is('東韻 三等')) return 'eFZ';
  if (is('冬韻')) return '7Z';
  if (is('鍾韻')) return 'e7Z';
  // 江攝
  if (is('江韻')) return 'Q7Z';
  // 止攝
  if (is('支韻 合口')) return is('重紐B類') ? 'Qva' : 'va';  // 未标AB的话？
  if (is('支韻')) return is('重紐B類') ? 'Qea' : 'ea';  // 未标AB的话？
  if (is('脂韻 合口')) return is('重紐B類') ? 'Qv' : 'v';  // 未标AB的话？
  if (is('脂韻')) return is('重紐B類') ? 'Qe' : 'e';  // 未标AB的话？
  if (is('之韻')) return 'd';
  if (is('微韻 開口')) return 'de';
  if (is('微韻')) return 'Fe';
  // 遇攝
  if (is('魚韻')) return 'ei';
  if (is('虞韻')) return 'vo';
  if (is('模韻')) return 'o';
  // 蟹攝
  if (is('齊韻 合口')) return 'Fae';
  if (is('齊韻')) return 'ae';
  if (is('祭韻 合口')) return is('重紐B類') ? 'QvaQ' : 'vaQ';
  if (is('祭韻')) return is('重紐B類') ? 'QeaQ' : 'eaQ';
  if (is('泰韻 合口')) return 'FRQ';
  if (is('泰韻')) return 'RQ';
  if (is('佳韻 合口')) return 'QFa';
  if (is('佳韻')) return 'Qa';
  if (is('皆韻 合口')) return 'QFae';
  if (is('皆韻')) return 'Qae';
  if (is('夬韻 合口')) return 'QFRQ';
  if (is('夬韻')) return 'QRQ';
  if (is('咍韻')) return 'ie';
  if (is('灰韻')) return 'oe';
  if (is('廢韻 開口')) return 'eiQ';
  if (is('廢韻')) return 'voQ';
  // 臻攝
  if (is('眞韻 合口')) return is('重紐B類') ? 'QvH' : 'vH';
  if (is('眞韻')) return is('重紐B類') ? 'QeH' : 'eH';
  if (is('臻韻')) return 'QeH';
  if (is('欣韻')) return 'dH';
  if (is('文韻')) return 'FH';
  if (is('元韻 開口')) return 'eiH';
  if (is('元韻')) return 'voH';
  if (is('痕韻')) return 'iH';
  if (is('魂韻')) return 'oH';
  // 山攝
  if (is('寒韻 開口')) return 'RH';
  if (is('寒韻')) return 'FRH';
  if (is('刪韻 合口')) return 'QFRH';
  if (is('刪韻')) return 'QRH';
  if (is('山韻 合口')) return 'QFaH';
  if (is('山韻')) return 'QaH';
  if (is('仙韻 合口')) return is('重紐B類') ? 'QvaH' : 'vaH';
  if (is('仙韻')) return is('重紐B類') ? 'QeaH' : 'eaH';
  if (is('先韻 合口')) return 'FaH';
  if (is('先韻')) return 'aH';
  // 效攝
  if (is('蕭韻')) return 'aF';
  if (is('宵韻')) return is('重紐B類') ? 'QeaF' : 'eaF';
  if (is('肴韻')) return 'QRF';
  if (is('豪韻')) return 'RF';
  // 果攝
  if (is('歌韻 一等 開口')) return '7';
  if (is('歌韻 一等')) return 'F7';
  if (is('歌韻 三等 開口')) return 'e7';
  if (is('歌韻 三等')) return 'v7';
  // 假攝
  if (is('麻韻 二等 合口')) return 'QFR';
  if (is('麻韻 二等')) return 'QR';
  if (is('麻韻 三等')) return 'eR';
  // 宕攝
  if (is('陽韻 開口')) return 'eRZ';
  if (is('陽韻')) return 'vRZ';
  if (is('唐韻 合口')) return 'FRZ';
  if (is('唐韻')) return 'RZ';
  // 梗攝
  if (is('庚韻 二等 合口')) return 'QFLZ';
  if (is('庚韻 二等')) return 'QLZ';
  if (is('庚韻 三等 合口')) return 'QvLZ';
  if (is('庚韻 三等')) return 'QeLZ';
  if (is('耕韻 合口')) return 'QFaZ';
  if (is('耕韻')) return 'QaZ';
  if (is('清韻 合口')) return 'vLZ'; // is('重紐A類') ? 'vLZ' : 'QvLZ';
  if (is('清韻')) return 'eLZ'; // is('重紐A類') ? 'eLZ' : 'QeLZ';
  if (is('青韻 合口')) return 'FaZ';
  if (is('青韻')) return 'aZ';
  // 曾攝
  if (is('蒸韻 合口')) return 'QvZ';
  if (is('蒸韻')) return is('重紐B類') ? 'QeZ' : 'eZ';  // TODO: 按声母分
  if (is('登韻 合口')) return 'oZ';
  if (is('登韻')) return 'iZ';
  // 流攝
  if (is('尤韻')) return 'dF';
  if (is('侯韻')) return 'F';
  if (is('幽韻')) return  is('重紐B類') ? 'QeF' : 'eF';
  // 深攝
  if (is('侵韻')) return is('重紐B類') ? 'QeV' : 'eV';
  // 咸攝
  if (is('覃韻')) return 'iV';
  if (is('談韻')) return 'RV';
  if (is('鹽韻')) return is('重紐B類') ? 'QeaV' : 'eaV';
  if (is('添韻')) return 'aV';
  if (is('咸韻')) return 'QaV';
  if (is('銜韻')) return 'QRV';
  if (is('嚴韻')) return 'eiV';
  if (is('凡韻')) return 'voV';
  throw new Error('無韻母規則');
}

function 聲調規則() {
  if (is('平入聲')) return '';
  if (is('上聲')) return '2';
  if (is('去聲')) return '3';
  throw new Error('無聲調規則');
}

let 聲母 = 聲母規則();
// let 隔音符號 = "'";
let 韻母 = 韻母規則();
let 聲調 = 聲調規則();

if (is('入聲')) {
  if (韻母.endsWith('V')) 韻母 = `${韻母.slice(0, -1)}h`;
  else if (韻母.endsWith('H')) 韻母 = `${韻母.slice(0, -1)}m`;
  else if (韻母.endsWith('Z')) 韻母 = `${韻母.slice(0, -1)}A`;
}

// if (韻母.endsWith('d')) {
//   聲調 = '';
// }

// !!! 适合本体系，仅有少数不符合
// if (聲母.endsWith('Q') && 韻母.startsWith('Q')) {
//   韻母 = 韻母.slice(1);
// }

// if (聲母.endsWith('j') && 韻母.startsWith('i') && [...'aeou'].some((x) => 韻母.includes(x))) {
//   韻母 = 韻母.slice(1);
// }

// if (is(`幫組 一二三四等 \
// 或 端組 一四等 \
// 或 知組 二三等 \
// 或 精組 一三四等 \
// 或 莊組 二三等 \
// 或 章組 三等 \
// 或 見溪疑母 一二三四等 \
// 或 羣母 二三等 \
// 或 影曉母 一二三四等 \
// 或 匣母 一二四等 \
// 或 云以母 三等 \
// 或 來母 一二三四等 \
// 或 日母 三等`)) {
//   隔音符號 = '';
// }

// if (is('云母 一二四等')) 聲母 = 'i'; // 如 1444 倄小韻 i'uaix

// if (is('端組 三等') && !韻母.startsWith('j')) {
//   隔音符號 = ''; // 如 2237 地小韻 diih
// }

// from unt, modified
function get介音() {
  const A = ''; //
  const B = 'Q';
  const C = '';
  let 等類介音 = when([
    ['四等', A],
    ['二等', B],
    ['一等', C],

    ['銳音', [ // 銳音包含以母
      ['端精組', A], // 加入端組是爲了包含爹小韻
      ['', ''],
    ]],
    ['重紐A類', A],
    ['重紐B類', B],
    ['云母 支脂祭眞臻仙宵麻庚清蒸幽侵鹽韻', B], // TODO: qieyun-js 更新後簡化
    ['庚韻', B],
    ['幽韻 幫組', B],
    ['蒸韻 非 開口', B],
    ['麻清幽韻', A],
    ['', C],
  ]);
  // let 合口介音 = is`(合口 或 虞韻) 非 (幫組 或 云母)` ? 'w' : ''; // TODO: qieyun-js 更新後刪去虞韻
  return 等類介音; //+ 合口介音;
}

let 介音 = get介音();

if (介音 == 'Q' && 韻母.startsWith('Q')) 介音 = '';

return 聲母 + 介音 + 韻母 + 聲調;
