/* 丌通语汉字音读 - 个人朗读音 - 绝呼音
 *
 * Han character pronunciation in Ttomniese
 * 
 * 'řim dħuk
 * 
 * ʔɹim d̬uk
 * 
 * 老版本存放在 -old.js，但打算直接用切韵拼音的字面音和切韵通俗拟音替代，用作汉字音读之切音。
 * 切音，顾名思义源自切韵音，是中古汉语的代表。
 * 另开此实验性的个人朗读音，原則是犧牲擬音之嚴密，而主推幫助記憶音韻地位以及方便朗讀。
 * 暂称为绝呼音。因为绝系语文，或许因为其后起文化以及庞大规模，就喜欢引用以及简化。
 * （或许把切韵音野鸡着读就成了本方案了吧。。。）
 * 基本思路是
 * - 声母和韵尾尽量保留切音（但其实我不太会发浊音）；
 * - 介音保留 e n 但不保留我个人不太会发的 y u（写出以二等和B类为代表的 Q 但它可能省略或读为 e 或仿古）；
 * - 韵腹尽量取几个现代变体里最常见的（很可能导致合并）；
 * - 声调基本只有平上去入，暂定采用近似菏泽话
 * - 韻母基本不考慮根據聲母而產生變體，既爲了偷懶也爲了方便記憶音韻地位
 * 不断调整中！
 * 
 * 音系小整理
 * - 韻腹：廣用有八 /a/, /e/, /i/, /o/, /u/, /ə/ ë, /ɨ/ ï, /y/ ü; 罕用有三 /ɛ/ ä, /ɑ/ aħ, å /ɔ/
 *   - 可見，其元音爲
 *    - 普世常見之 /a/ /e/ /i/ /o/ /u/，外加
 *    - 菏、京官話常見之 /ə/ /y/，與可視爲見於菏、京官話的 /ɨ/（舌尖元音，如「思」「之」），外加
 *      - /ɨ/，國際音標也會以 ï 表示（央化之 i 也），故羅馬化爲 ï
 *        - 且 /ɨ/ 所出現的之攝、臻攝、流攝皆是與 /i/ 同環境出現，說明古人以攝歸類的時代亦覺二者相似
 *        - 不用「y」表示，把「y」空出來用於 IPA 風格用字表示 /y/。
 *    - 只見於唯一一韻或一個搭配的如下幾音（實亦常見與菏、京官話的部分音節或作爲音位變體），發音不準亦無大影響：
 *      - /ɛ/ ä 僅用於 /ɛŋ/ 即 äň 。即梗攝之庚韻、清韻。以區分於 /eŋ/，其餘情況無需區分
 *        - （所以非對立的 /ɛ/ 和 /e/ 我還蠻可能發成 /e/。。。唉要不把 /ɛ/ 改成更誇張的 /æ/ 好了）
 *      - /ɑ/ aħ 僅用於歌韻（即果攝） /ɑ/。即與麻韻（即假攝） /a/ 區分。又因爲麻韻二等前有 ř，歌韻無二等，因此三等開口是唯一區分 /a/ /ɑ/ 的情況（/ia/ /iɑ/），不區分的影響較小。
 *        - 其實 aň 的韻腹亦實現爲 /ɑ/，但不含對立，故仍寫作 a。
 *      - /ɔ/ å 僅用於江韻。即 /ʐɔŋ/。由於通攝只有一三等，江攝只有二等，故此韻腹合併入通攝的 /o/ 或 /u/ 區分亦無影響。
 * - 聲母
 *    - 濁音：羅馬化時，使用漢語拼音式的拼寫，即不同字母區分送氣清音和不送氣清音，而 ħ 作爲濁音標記。端 d 透 t 定 dħ
 *      - 是因爲考慮到我本人以及廣大的官話者、粵語者等非吳非閩母語者通常發不準濁音，故給濁音加標記以暗示其在本用戶的懶音中爲可選特性。
 *      - 同時也跟本人別的造語文字保持一致
 * 
 * @author TwaqNgu (Duáħ Ňïu)
 */

const is = (...x) => 音韻地位.屬於(...x);
const when = (...x) => 音韻地位.判斷(...x);

const is羅馬化 = 選項.羅馬化 ?? false;
const is聲調符號 = 選項.聲調符號 ?? false;
const isIPA風格 = 選項.IPA風格 ?? false;
const is首字母大寫 = 選項.首字母大寫 ?? false;

if (!音韻地位) return [['羅馬化', is羅馬化], ['聲調符號', is聲調符號], ['IPA風格', isIPA風格], ['首字母大寫', is首字母大寫]];

// 音韻地位 = Qieyun.適配分析體系('ytenx')(音韻地位);

function 聲母規則() {
  switch (音韻地位.母) {
    case '幫': return 'b';
    case '滂': return 'h';
    case '並': return 'b8';
    case '明': return 'V';
    case '端': return 'D';
    case '透': return 'L';
    case '定': return 'D8';
    case '泥': return 'H';
    case '知': return 'Dl';
    case '徹': return 'Ll';
    case '澄': return 'D8l';
    case '孃': return 'Hl';
    case '精': return '9';
    case '清': return '7';
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
  // 通攝 n Z tuň
  if (is('東韻 一等')) return 'nZ';
  if (is('東韻 三等')) return 'enZ';
  if (is('冬韻')) return 'oZ';
  if (is('鍾韻')) return 'eoZ';
  // 江攝 m Z gřåň
  if (is('江韻')) return 'QmZ'; // Q deleted
  // 止攝 e dçï2
  if (is('支韻 合口')) return is('重紐B類') ? 'Qva' : 'va';  // 未标AB的话？ // Q deleted
  if (is('支韻')) return is('重紐B類') ? 'Qea' : 'ea';  // 未标AB的话？ // Q deleted
  if (is('脂韻 合口')) return is('重紐B類') ? 'Qv' : 'v';  // 未标AB的话？ // Q deleted
  if (is('脂韻')) return is('重紐B類') ? 'Qe' : 'e';  // 未标AB的话？ // Q deleted
  if (is('之韻')) return 'y';
  if (is('微韻 開口')) return 'ye';
  if (is('微韻')) return 'nye';
  // 遇攝 o ňüo3
  if (is('魚韻')) return 'ei';
  if (is('虞韻')) return 'vo';
  if (is('模韻')) return 'no';
  // 蟹攝 re xħře2
  if (is('齊韻 合口')) return 'nae';
  if (is('齊韻')) return 'ae';
  if (is('祭韻 合口')) return is('重紐B類') ? 'QvaQ' : 'vaQ'; // Q deleted
  if (is('祭韻')) return is('重紐B類') ? 'QeaQ' : 'eaQ'; // Q deleted
  if (is('泰韻 合口')) return 'nrQ';
  if (is('泰韻')) return 'rQ';
  if (is('佳韻 合口')) return 'Qna'; // Q deleted
  if (is('佳韻')) return 'Qa'; // Q deleted
  if (is('皆韻 合口')) return 'Qnae'; // Q deleted
  if (is('皆韻')) return 'Qae'; // Q deleted
  if (is('夬韻 合口')) return 'QnrQ'; // Q deleted
  if (is('夬韻')) return 'QrQ'; // Q deleted
  if (is('咍韻')) return 'ie';
  if (is('灰韻')) return 'nie';
  if (is('廢韻 開口')) return 'eiQ';
  if (is('廢韻')) return 'voQ';
  // 臻攝 eH dšřin
  if (is('眞韻 合口')) return is('重紐B類') ? 'QvH' : 'vH'; // Q deleted
  if (is('眞韻')) return is('重紐B類') ? 'QeH' : 'eH'; // Q deleted
  if (is('臻韻')) return 'QeH'; // Q deleted
  if (is('欣韻')) return 'yH';
  if (is('文韻')) return 'nyH';
  if (is('元韻 開口')) return 'eiH';
  if (is('元韻')) return 'voH';
  if (is('痕韻')) return 'iH';
  if (is('魂韻')) return 'niH';
  // 山攝 rH šřen
  if (is('寒韻 開口')) return 'rH';
  if (is('寒韻')) return 'nrH';
  if (is('刪韻 合口')) return 'QnrH'; // Q deleted
  if (is('刪韻')) return 'QrH'; // Q deleted
  if (is('山韻 合口')) return 'QnaH'; // Q deleted
  if (is('山韻')) return 'QaH'; // Q deleted
  if (is('仙韻 合口')) return is('重紐B類') ? 'QvaH' : 'vaH'; // Q deleted
  if (is('仙韻')) return is('重紐B類') ? 'QeaH' : 'eaH'; // Q deleted
  if (is('先韻 合口')) return 'naH';
  if (is('先韻')) return 'aH';
  // 效攝 rn xħřau3
  if (is('蕭韻')) return 'an';
  if (is('宵韻')) return is('重紐B類') ? 'Qean' : 'ean'; // Q deleted
  if (is('肴韻')) return 'Qrn'; // Q deleted
  if (is('豪韻')) return 'rn';
  // 果攝 rp guaħ2
  if (is('歌韻 一等 開口')) return 'rp';
  if (is('歌韻 一等')) return 'nrp';
  if (is('歌韻 三等 開口')) return 'erp';
  if (is('歌韻 三等')) return 'vrp';
  // 假攝 r gřa2
  if (is('麻韻 二等 合口')) return 'Qnr'; // Q deleted
  if (is('麻韻 二等')) return 'Qr'; // Q deleted
  if (is('麻韻 三等')) return 'er';
  // 宕攝 r Z dħaň3
  if (is('陽韻 開口')) return 'erZ';
  if (is('陽韻')) return 'vrZ';
  if (is('唐韻 合口')) return 'nrZ';
  if (is('唐韻')) return 'rZ';
  // 梗攝 a Z gřäň2
  if (is('庚韻 二等 合口')) return 'QncZ'; // Q deleted
  if (is('庚韻 二等')) return 'QcZ'; // Q deleted
  if (is('庚韻 三等 合口')) return 'QvcZ'; // Q deleted
  if (is('庚韻 三等')) return 'QecZ'; // Q deleted
  if (is('耕韻 合口')) return 'QnaZ'; // Q deleted
  if (is('耕韻')) return 'QaZ'; // Q deleted
  if (is('清韻 合口')) return 'vcZ'; // is('重紐A類') ? 'vLZ' : 'QvLZ';
  if (is('清韻')) return 'ecZ'; // is('重紐A類') ? 'eLZ' : 'QeLZ';
  if (is('青韻 合口')) return 'naZ';
  if (is('青韻')) return 'aZ';
  // 曾攝 i Z dsëň
  if (is('蒸韻 合口')) return 'QvZ'; // Q deleted
  if (is('蒸韻')) return is('重紐B類') ? 'QeZ' : 'eZ';  // TODO: 按声母分 // Q deleted
  if (is('登韻 合口')) return 'niZ';
  if (is('登韻')) return 'iZ';
  // 流攝 en lïu
  if (is('尤韻')) return 'yn';
  if (is('侯韻')) return 'n';
  if (is('幽韻')) return  is('重紐B類') ? 'Qen' : 'en'; // Q deleted
  // 深攝 eV çim
  if (is('侵韻')) return is('重紐B類') ? 'QeV' : 'eV'; // Q deleted
  // 咸攝 rV xħřem
  if (is('覃韻')) return 'iV';
  if (is('談韻')) return 'rV';
  if (is('鹽韻')) return is('重紐B類') ? 'QeaV' : 'eaV'; // Q deleted
  if (is('添韻')) return 'aV';
  if (is('咸韻')) return 'QaV'; // Q deleted
  if (is('銜韻')) return 'QrV'; // Q deleted
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
  else if (韻母.endsWith('H')) 韻母 = `${韻母.slice(0, -1)}L`;
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

let result =  聲母 + 介音 + 韻母 + 聲調;

// change tone numbers (2, 3) to tone symbols (acute, grave)
function add聲調符號(romanizedStr) {
  const vowels = ['a', 'ɑ', 'ä', 'ɛ', 'å', 'ɔ', 'e', 'ë', 'ə', 'o', 'ï', 'ɨ', 'ü', 'y', 'u', 'i']; // 按优先级排序
  const sharpToneMark = "\u0301";  // 锐音符（声调2）。"\u00B4" 不結合。
  const dullToneMark = "\u0300";   // 钝音符（声调3）。"\u0060" 不結合

  // 选择正确的声调符号
  let toneMark = '';
  if (romanizedStr.slice(-1) === "2") {
      toneMark = sharpToneMark;
      romanizedStr = romanizedStr.slice(0, -1);
  } else if (romanizedStr.slice(-1) === "3") {
      toneMark = dullToneMark;
      romanizedStr = romanizedStr.slice(0, -1);
  }

  // 如果无需添加声调符号，直接返回原字符串
  if (!toneMark) {
      return romanizedStr;
  }

  // 查找并在主要元音上添加声调符号
  for (let vowel of vowels) {
      if (romanizedStr.includes(vowel)) {
          // 替换第一个出现的主要元音
          return romanizedStr.replace(vowel, vowel + toneMark);
      }
  }
  return romanizedStr; // 如果没有找到元音，则返回原始字符串
}

function 羅馬toIPA風格(roma) {
  // 多合字母
  roma = roma.replace('aħ', 'ɑ');
  roma = roma.replace('nj', 'ɲ');

  // 單體字母
  roma = roma.replace("'", 'ʔ');
  roma = roma.replace('ç', 'ɕ');
  roma = roma.replace('š', 'ʂ');
  roma = roma.replace('ň', 'ŋ');
  roma = roma.replace('ň', 'ŋ'); // 詞尾可能還有一個
  roma = roma.replace('ř', 'ɹ');
  roma = roma.replace('ä', 'ɛ');
  roma = roma.replace('ë', 'ə');
  roma = roma.replace('ï', 'ɨ');
  roma = roma.replace('ü', 'y');
  roma = roma.replace('å', 'ɔ');

  // xħ 是在這裏轉成ɣ還是在下一步轉成x̬呢？
  roma = roma.replace('xħ', 'ɣ');
  
  // 清濁送
  // 送气清音及其IPA送气标志
  const aspiratedConsonants = ['p', 'k', 'tɕ', 'ts', 'tʂ', 't'];
  const aspiratedMark = "\u02B0"; // IPA送气标志

  // 不送气清音及其IPA清化标志
  const unaspiratedConsonants = ['b', 'd', 'g', 'dɕ', 'ds', 'dʂ'];
  const unaspiratedMark = "\u0325"; // IPA清化标志

  // 濁音及其IPA濁化标志
  const voicedConsonants = ['bħ', 'dħ', 'għ', 'dɕħ', 'dsħ', 'dʂħ', 'xħ', 'ɕħ', 'ʂħ'];
  const voicedMark = "\u032C"; // IPA濁化标志

  let is清濁已標 = false;

  // 处理濁音
  voicedConsonants.forEach(consonant => {
    if (!is清濁已標 && roma.startsWith(consonant)) {
        let newConsonant = consonant.slice(0, -1)[0] + voicedMark + consonant.slice(0, -1).slice(1);
        roma = roma.replace(consonant, newConsonant);
        is清濁已標 = true;
    }
  });

  if (!is清濁已標) {

    // 处理送气清音
    aspiratedConsonants.forEach(consonant => {
        if (!is清濁已標 && roma.startsWith(consonant)) {
          roma = roma.replace(consonant, consonant + aspiratedMark);
          is清濁已標 = true;
        }
    });

    // 处理不送气清音
    unaspiratedConsonants.forEach(consonant => {
        if (!is清濁已標 && roma.startsWith(consonant)) {
            let newConsonant = consonant[0] + unaspiratedMark + consonant.slice(1);
            roma = roma.replace(consonant, newConsonant);
            is清濁已標 = true;
        }
    });

  }

  const retroMap = new Map([["d", "ɖ"], ["t", "ʈ"], ["n", "ɳ"]]);
  if (roma.includes('ł')) {
    roma = roma.replace('ł', '');
    ['d', 't', 'n'].forEach(consonant => {
      if (roma.startsWith(consonant)) {
        roma = roma.replace(consonant, retroMap.get(consonant));
      }
    });
  }

  return roma;

}

function capitalizeFirstLetter(str) {
  if (str.length === 0) return str;

  // 如果字符串以特殊字符开头（比如 '），则大写其后的第一个字母
  if (str[0] === "'") {
      return str[0] + str.charAt(1).toUpperCase() + str.slice(2);
  }

  // 否则，直接大写第一个字母
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function get羅馬化(result) {
  const map = new Map([
    ["a", "e"], ["b", "b"], ["c", "ä"], ["d", "z"], ["e", "i"],
    ["f", "?"], ["g", "?"], ["h", "p"], ["i", "ë"], ["j", "?"],
    ["k", "ŕ"], ["l", "ł"], ["m", "å"], ["n", "u"], ["o", "o"],
    ["p", "ħ"], ["q", "_"], ["r", "a"], ["s", "ö"], ["t", "ę"],
    ["u", "ÿ"], ["v", "ü"], ["w", "û"], ["x", "h"], ["y", "ï"],
    ["z", "æ"],
    ["A", "k"], ["B", "tç"], ["C", "s"], ["D", "d"], ["E", "j"],
    ["F", "v"], ["G", "dš"], ["H", "n"], ["I", "?"], ["J", "tš"],
    ["K", "r"], ["L", "t"], ["M", "j"], ["N", "f"], ["O", "'"],
    ["P", "?"], ["Q", "ř"], ["R", "?"], ["S", "l"], ["T", "dç"],
    ["U", "?"], ["V", "m"], ["W", "š"], ["X", "x"], ["Y", "g"],
    ["Z", "ň"], ["6", "ç"], ["7", "ts"], ["8", "ħ"], ["9", "ds"]
  ]);
  let roma = "";
  for (let ch of result) {
    if (map.has(ch)) roma += map.get(ch);
    else roma += ch;
  }
  if (isIPA風格) roma = 羅馬toIPA風格(roma);
  if (is首字母大寫) roma = capitalizeFirstLetter(roma);
  return is聲調符號? add聲調符號(roma) : roma;
}

return is羅馬化? get羅馬化(result) : result;