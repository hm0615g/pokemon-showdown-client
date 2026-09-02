(function () {
  'use strict';

  if (window.NC2000_LOCALE !== 'ja') return;

  var phase2 = window.NC2000_JA_PHASE2;
  var JA = window.NC2000_JA;
  if (!phase2 || !JA) throw new Error('NC2000 Phase 1/2 Japanese localization is required before Phase 3.');

  var textMap = {
    'Home': 'ホーム',
    'Lobby': 'ロビー',
    'News': 'お知らせ',
    'Test client': 'テストクライアント',
    'Welcome to the test client! You can test client changes here!': 'テストクライアントへようこそ。クライアントの変更をここで試せます。',
    'This is the client rewrite beta test.': 'これはクライアント書き直し版のベータテストです。',
    'Use Rewrite always': '常に書き直し版を使う',
    'Use Rewrite with URL': 'URL指定時のみ書き直し版を使う',
    'Back to the old client': '旧クライアントに戻る',
    'Provide feedback in': 'フィードバックは',
    'the Dev chatroom': '開発チャットルームへ',
    'Format:': 'フォーマット:',
    'Team:': 'チーム:',
    'Random Battle': 'ランダムバトル',
    'Random team': 'ランダムチーム',
    'Battle!': '対戦！',
    'Find a random opponent': 'ランダムに対戦相手を探す',
    'Teambuilder': 'チームビルダー',
    'Ladder': 'レート',
    'Tournaments': 'トーナメント',
    'Watch a battle': '対戦を観戦',
    'Find a user': 'ユーザーを探す',
    'Friends': 'フレンド',
    'Info & Resources': '情報・リソース',
    'Chat rooms': 'チャットルーム',
    'Lobby chat': 'ロビーチャット',
    'Pokédex': 'ポケモン図鑑',
    'Replays': 'リプレイ',
    'Forum': 'フォーラム',
    'Rules': 'ルール',
    'Credits': 'クレジット',
    'Privacy': 'プライバシー',
    'Hide': '隠す',
    'users online': '人がオンライン',
    'active battles': '対戦が進行中',
    '(All rooms)': '（すべての部屋）',
    'Official': '公式',
    'Battle formats': '対戦形式',
    'Languages': '言語',
    'Entertainment': '娯楽',
    'Gaming': 'ゲーム',
    'Life & hobbies': '生活・趣味',
    'On-site games': 'サイト内ゲーム',
    'Official chat rooms': '公式チャットルーム',
    'Connecting...': '接続中…',
    'Offline': 'オフライン',
    'Challenge': '対戦を申し込む',
    'Challenging...': '対戦を申し込み中…',
    'Accept': '承諾',
    'Accepting...': '承諾中…',
    'Reject': '拒否',
    'Cancel': 'キャンセル',
    'Reconnect': '再接続',
    'Commands': 'コマンド',
    'Battle options': '対戦設定',
    '(closes this battle)': '（この対戦を閉じます）',
    'Switch viewpoint': '視点を切り替える',
    'Go to turn': 'ターンへ移動',
    'Download replay': 'リプレイをダウンロード',
    'Upload and share replay': 'リプレイを保存・共有',
    'Replay': 'リプレイ',
    'First turn': '最初のターン',
    'Prev turn': '前のターン',
    'Main menu': 'メインメニュー',
    'Rematch': '再戦',
    'Battle': 'たたかう',
    'Switch': 'ポケモン',
    'Waiting for opponent...': '相手の選択を待っています…',
    'All Teams': 'すべてのチーム',
    'Teams not in any folders': 'フォルダに入っていないチーム',
    'Folders': 'フォルダ',
    'New team': '新しいチーム',
    'New box': '新しいボックス',
    'Search teams': 'チームを検索',
    'you have no teams lol': 'チームがありません',
    'you have no teams in this folder': 'このフォルダにはチームがありません',
    'Paste copy here': 'ここにコピーを貼り付け',
    'Move here': 'ここへ移動',
    '+ Clipboard': '+ クリップボード',
    'Deselect': '選択解除',
    'Copy/move': 'コピー／移動',
    'Copy/Move': 'コピー／移動',
    'Copy': 'コピー',
    'Add to clipboard': 'クリップボードに追加',
    'Delete': '削除',
    'Undo delete': '削除を元に戻す',
    'Uploaded': 'アップロード済み',
    'Public': '公開',
    'Disconnected': '未接続',
    'Import': 'インポート',
    'Import/Export': 'インポート／エクスポート',
    'Team': 'チーム',
    'Upload changes': '変更をアップロード',
    'Share URL:': '共有URL:',
    'Uploaded by:': 'アップロードしたユーザー:',
    'Views:': '閲覧数:',
    'Edit': '編集',
    'Local': 'ローカル',
    'Account': 'アカウント',
    'Account (public)': 'アカウント（公開）',
    'Loading...': '読み込み中…',
    'Fetching Paste...': 'Pasteを取得中…',
    'Pokemon': 'ポケモン',
    'Details': '詳細',
    'Level': 'レベル',
    'Shiny': '色違い',
    'Yes': 'はい',
    'Gender': '性別',
    'H. Power': 'めざパ',
    'H.P.': 'めざパ',
    'Moves': '技',
    'Stats': '能力値',
    'Ability': '特性',
    'Item': '道具',
    'Nickname': 'ニックネーム',
    'Sample sets': 'サンプルセット',
    'Box sets': 'ボックス内セット',
    'Import/Export Set': 'セットをインポート／エクスポート',
    'IV spreads': '個体値配分',
    'EVs, IVs, and Nature': '努力値・個体値・性格',
    'Base': '種族値',
    'Nature': '性格',
    'Happiness:': 'なつき度:',
    'Hidden Power Type:': 'めざめるパワーのタイプ:',
    'Form:': 'フォルム:',
    'Options': '設定',
    'Layout:': 'レイアウト:',
    'Compact': 'コンパクト',
    'Comfortable': 'ゆったり',
    'Zoom out forms': 'フォルム表示を縮小',
    'Close': '閉じる',
    'Name': '名前',
    'Types': 'タイプ',
    'Abilities': '特性',
    'Type': 'タイプ',
    'Cat': '分類',
    'Pow': '威力',
    'Acc': '命中',
    'Sort:': '並べ替え:',
    'Atk': '攻撃',
    'Def': '防御',
    'SpA': '特攻',
    'SpD': '特防',
    'Spe': '素早さ',
    'BST': '合計',
    '(no item)': '（道具なし）',
    '(no ability)': '（特性なし）',
    '(choose ability)': '（特性を選択）',
    'Select a team': 'チームを選択',
    'Choose name': '名前を決める',
    'You are in:': '参加中:',
    'Searching...': '対戦相手を検索中…',
    'Back': '戻る',
    'Copied!': 'コピーしました！',
    "(can't save partial exports)": '（一部だけのエクスポートは保存できません）',
    'Save changes': '変更を保存',
    'Readable': '読みやすい形式',
    'Rename': '名前を変更',
    'Remove': '削除',
    'All teams': 'すべてのチーム',
    '(add format folder)': '（フォーマット用フォルダを追加）',
    '(add folder)': '（フォルダを追加）',
    '(uncategorized)': '（未分類）',
    'Graphics': '表示',
    'Theme:': 'テーマ:',
    'Light': 'ライト',
    'Dark': 'ダーク',
    'Match system theme': 'システム設定に合わせる',
    'Automatic (Vertical tabs)': '自動（縦タブ）',
    'Automatic (Single panel)': '自動（1パネル）',
    'Two panels (if wide enough)': '2パネル（幅が十分な場合）',
    'Single panel': '1パネル',
    'Vertical tabs': '縦タブ',
    'Background:': '背景:',
    'Change Background': '背景を変更',
    'Disable animations': 'アニメーションを無効化',
    'Use 2D sprites instead of 3D models': '3Dモデルの代わりに2Dスプライトを使う',
    'Use modern sprites for past generations': '過去世代でも現代のスプライトを使う',
    'Chat': 'チャット',
    'Block DMs': 'ダイレクトメッセージを拒否',
    'Block challenges': '対戦申請を拒否',
    'Show DMs in chatrooms': 'ダイレクトメッセージをチャットルーム内に表示',
    'Do not highlight when your name is said in chat': 'チャットで自分の名前が呼ばれても強調表示しない',
    'Confirm before leaving a room': '部屋を離れる前に確認する',
    'Confirm before refreshing': '再読み込み前に確認する',
    'Language:': '言語:',
    'Tournaments:': 'トーナメント:',
    'Always notify': '常に通知',
    'Notify when joined': '参加中のみ通知',
    'Timestamps:': '時刻表示:',
    'Timestamps in DMs:': 'DMの時刻表示:',
    'Off': 'オフ',
    'Chat preferences:': 'チャット設定:',
    'Text formatting...': '文字装飾…',
    'Change name': '名前を変更',
    'Log out': 'ログアウト',
    'Avatar...': 'アバター…',
    'Password...': 'パスワード…',
    'Register': '登録',
    'In this battle': 'この対戦',
    'Forfeit': '降参',
    'Offer tie': '引き分けを提案',
    '(turn 100+)': '（100ターン以降）',
    'Hardcore mode (hide info not shown in-game)': 'ハードコアモード（ゲーム内で表示されない情報を隠す）',
    'Ignore spectators': '観戦者を無視',
    'Ignore opponent': '対戦相手を無視',
    'Ignore nicknames': 'ニックネームを無視',
    'All battles': 'すべての対戦',
    'Automatic': '自動',
    'Invite only (hide from Battles list)': '招待制（対戦一覧に表示しない）',
    'Ignore Pokémon nicknames': 'ポケモンのニックネームを無視',
    'Automatically start timer': '自動でタイマーを開始',
    'Hardcore mode': 'ハードコアモード',
    'Start at turn 0 when spectating battles': '観戦時は0ターン目から開始',
    'Open new battles in the right-side panel': '新しい対戦を右側パネルで開く',
    'Done': '完了',
    'Sound': 'サウンド',
    'Join chat': 'チャットに参加',
    'All tabs': 'すべてのタブ',
    'Maximize': '最大化',
    'Expand/Collapse': '展開／折りたたみ',
    'Find an online user': 'オンラインのユーザーを探す',
    'Watch an active battle': '進行中の対戦を観戦',
    'Join or search for rooms': '部屋に参加／検索',
    'Active Pokemon': '対戦中のポケモン',
    'Your Team': '自分のチーム',
    "Opponent's Team": '相手のチーム',
    'Battle Controls': '対戦操作',
    'Chat log': 'チャットログ',
    'Choose a name before sending messages': 'メッセージを送る前に名前を決めてください',
    'Statused': '状態異常あり',
    'Non-statused': '状態異常なし',

    // Phase 3 r2: Teambuilder coverage (especially Gen 2 / NC2000).
    'Form': 'フォーム',
    'Zoom out search results': '検索結果を縮小表示',
    'Team name:': 'チーム名:',
    'Teams': 'チーム一覧',
    '(all)': '（すべて）',
    "(You probably want to change the team's levels by changing the format, not here)": '（レベルは通常、ここではなくフォーマット設定で変更します）',
    'Validate': '使用可能か確認',
    'List': '一覧',
    'Team was deleted': 'チームは削除されました',
    "Team doesn't exist": 'チームが見つかりません',
    'Disconnected (wrong account?)': '未接続（別のアカウント？）',
    '(public)': '（公開）',
    'Uploading...': 'アップロード中…',
    'Revert to uploaded version': 'アップロード済みの版に戻す',
    'Compare': '比較',
    'Upload for': 'アップロード:',
    'shareable URL': '共有用URL',
    'shareable/searchable URL': '共有・検索可能URL',
    'Backup': 'バックアップ',
    'search results': '検索結果',
    'folder': 'フォルダ',
    'team': 'チーム',
    'team in folder': 'フォルダ内チーム',
    'New': '新規',
    'Create': '作成',
    'Convert to prefix': '接頭辞に変換',
    'Folder name?': 'フォルダ名を入力してください',
    'Readable': '読みやすい形式',
    'Revert': '元に戻す',
    'No Pokemon set found.': 'ポケモンのセットが見つかりません。',
    'EVs': '努力値',
    'IVs': '個体値',
    'DVs': '個体値(DV)',
    'EVs, IVs, and Nature': '努力値・個体値・性格',
    'Attack': '攻撃',
    'Defense': '防御',
    'Sp. Atk.': '特攻',
    'Sp. Def.': '特防',
    'Speed': '素早さ',
    'Special': '特殊',
    'Spc': '特殊',
    'Remaining:': '残り:',
    'Nickname:': 'ニックネーム:',
    'Level:': 'レベル:',
    'Shiny:': '色違い:',
    'Gender:': '性別:',
    'Happiness:': 'なつき度:',
    'Male': 'オス',
    'Female': 'メス',
    'Unknown': '不明',
    'Random': 'ランダム',
    'No': 'いいえ',
    'Power': '威力',
    'Accuracy': '命中率',
    'Filters:': '絞り込み:',
    '(backspace = delete filter)': '（Backspaceで絞り込みを解除）',
    'Show previous search results': '前の検索結果を表示',
    'Show next search results': '次の検索結果を表示',
    'Unrecognized pokemon': '認識できないポケモン',
    'Unrecognized move': '認識できない技',
    'Unrecognized item': '認識できない道具',
    'Unrecognized ability': '認識できない特性',
    'No Ability': '特性なし',
    'Auto': '自動',
    'min Atk': '攻撃を最小',
    'min Atk, min Spe': '攻撃・素早さを最小',
    'max all': 'すべて最大',
    'min Spe': '素早さを最小',
    'Teambuilding resources for': 'チーム構築資料:',
    'Defensive coverage': 'タイプ耐性',
    'See all': 'すべて表示',
    'resist': '半減',
    'weak': '弱点',
    'immune': '無効',
    'Automatic (コンパクト)': '自動（コンパクト）',
  };

  var statusShort = {
    BRN: 'やけど', PSN: 'どく', TOX: 'もうどく', SLP: 'ねむり', PAR: 'まひ', FRZ: 'こおり',
  };
  var statShort = { Atk: '攻撃', Def: '防御', SpA: '特攻', SpD: '特防', Spe: '素早さ' };
  var volatileShort = {
    Confused: 'こんらん', Curse: 'のろい', Nightmare: 'あくむ', Infatuation: 'メロメロ',
    Disable: 'かなしばり', 'Leech Seed': 'やどりぎ', Encore: 'アンコール', 'Must recharge': '反動',
    'Critical Hit Boost': '急所率アップ', Protect: 'まもる', 'Destiny Bond': 'みちづれ',
    'Perish now': 'ほろび: 0', 'Perish next turn': 'ほろび: 1', 'Perish in 2': 'ほろび: 2', 'Perish in 3': 'ほろび: 3',
  };

  var typeJa = {
    Normal: 'ノーマル', Fire: 'ほのお', Water: 'みず', Electric: 'でんき', Grass: 'くさ', Ice: 'こおり',
    Fighting: 'かくとう', Poison: 'どく', Ground: 'じめん', Flying: 'ひこう', Psychic: 'エスパー',
    Bug: 'むし', Rock: 'いわ', Ghost: 'ゴースト', Dragon: 'ドラゴン', Dark: 'あく', Steel: 'はがね',
    Fairy: 'フェアリー', Stellar: 'ステラ',
    // Some upstream/client-side Japanese data may already use this non-official label. Normalize it.
    'ダーク': 'あく',
  };

  var nc2000FormatId = 'gen2nintendocup2000noohkostadium2strict';
  var nc2000FormatJa = '第2世代 ニンテンドウカップ2000（スタジアム金銀準拠・一撃必殺技禁止）';

  var attrMap = {
    Close: '閉じる', Maximize: '最大化', 'Expand/Collapse': '展開／折りたたみ', Sound: 'サウンド', Options: '設定',
    'Join chat': 'チャットに参加', 'All tabs': 'すべてのタブ', 'Find an online user': 'オンラインのユーザーを探す',
    'Watch an active battle': '進行中の対戦を観戦', 'Join or search for rooms': '部屋に参加／検索',
    'Active Pokemon': '対戦中のポケモン', 'Your Team': '自分のチーム', "Opponent's Team": '相手のチーム',
    'Battle Controls': '対戦操作', 'Chat log': 'チャットログ', 'Battle options': '対戦設定',
    'Copy/move': 'コピー／移動', Delete: '削除', Uploaded: 'アップロード済み', Public: '公開', Disconnected: '未接続',
    'Add Pokemon': 'ポケモンを追加', 'Import/Export': 'インポート／エクスポート', Stats: '能力値', Details: '詳細',
    Statused: '状態異常あり', 'Non-statused': '状態異常なし',
    Shiny: '色違い',
    'Search species or filter by type, learnable moves, ability, tier, or egg group': 'ポケモン名を検索、またはタイプ・覚える技などで絞り込み',
    'Search abilities': '特性を検索',
    'Search items': '道具を検索',
    'Search moves or filter by type or category': '技名を検索、またはタイプ・分類で絞り込み',
    'You can still invite spectators by giving them the URL or using the /invite command': 'URLを共有するか /invite コマンドを使えば観戦者を招待できます',
  };

  var safeRootSelector = [
    '#header', '.mainmenu', '.mainmenu-footer', '.mainmenufooter', '#room-rooms',
    '[id^="room-teambuilder"]', '[id^="room-team-"]', '#room-teamdropdown', '#room-formatdropdown', '.teameditor', '.team-focus-editor', '.set-form', '.set-import-form', '.searchresults', '.set-searchresults', '.dexlist',
    '.battle-controls', '.battle .turn', '.battle .statbar .status', '.battle .leftbar', '.battle .rightbar', '.ps-popup', '.userlist-count', '.chat-log .challenge', '.chat-log-add > button'
  ].join(',');

  function trimParts(text) {
    var m = /^(\s*)([\s\S]*?)(\s*)$/.exec(String(text));
    return { before: m ? m[1] : '', core: m ? m[2] : String(text), after: m ? m[3] : '' };
  }

  function localizeCore(core) {
    if (!core) return core;
    if (textMap[core] !== undefined) return textMap[core];

    var format = phase2.translateFormat ? phase2.translateFormat(core) : core;
    if (format !== core) return format;

    var m = /^Automatic \((Compact|Comfortable)\)$/.exec(core);
    if (m) return '自動（' + (m[1] === 'Compact' ? 'コンパクト' : 'ゆったり') + '）';
    m = /^Gen (\d+)$/.exec(core);
    if (m) return '第' + m[1] + '世代';
    m = /^\(slot (\d+) empty\)$/.exec(core);
    if (m) return '（技' + m[1] + 'は空欄）';
    m = /^Turn (\d+)$/.exec(core);
    if (m) return 'ターン ' + m[1];
    m = /^(\d+) users$/.exec(core);
    if (m) return m[1] + '人';
    m = /^you have no teams matching (.+)$/.exec(core);
    if (m) return '「' + m[1] + '」に一致するチームはありません';
    m = /^No (.+) sets found in boxes$/.exec(core);
    if (m) return 'ボックス内に' + JA.displayName('pokemon', m[1]) + 'のセットはありません';
    m = /^New (team|box)$/.exec(core);
    if (m) return m[1] === 'team' ? '新しいチーム' : '新しいボックス';
    m = /^(.+?) users online$/.exec(core);
    if (m) return m[1] + '人がオンライン';
    m = /^(.+?) active battles$/.exec(core);
    if (m) return m[1] + '件の対戦が進行中';
    m = /^Rename ``(.+)`` to\?$/.exec(core);
    if (m) return '「' + m[1] + '」の新しい名前を入力してください';
    m = /^Delete ``(.+)``\? \(doesn't delete teams\)$/.exec(core);
    if (m) return '「' + m[1] + '」フォルダを削除しますか？（チームは削除されません）';
    m = /^New (.+) team$/.exec(core);
    if (m) return '新しい' + m[1] + '用チーム';
    return core;
  }

  function localizeText(text) {
    if (typeof text !== 'string' || !text) return text;
    var parts = trimParts(text);
    var localized = localizeCore(parts.core);
    return parts.before + localized + parts.after;
  }

  function localizeAttributeValue(value) {
    if (typeof value !== 'string' || !value) return value;
    if (attrMap[value] !== undefined) return attrMap[value];
    if (textMap[value] !== undefined) return textMap[value];
    var format = phase2.translateFormat ? phase2.translateFormat(value) : value;
    if (format !== value) return format;
    var m = /^(.*) \(([^()]*)\|(?:slp|par|brn|frz|psn|tox)\)$/.exec(value);
    if (m) {
      var status = value.match(/\|(slp|par|brn|frz|psn|tox)\)$/)[1];
      var st = { slp: 'ねむり', par: 'まひ', brn: 'やけど', frz: 'こおり', psn: 'どく', tox: 'もうどく' }[status];
      return m[1] + ' (' + m[2] + '|' + st + ')';
    }
    m = /^(.*) \((slp|par|brn|frz|psn|tox)\)$/.exec(value);
    if (m) {
      var st2 = { slp: 'ねむり', par: 'まひ', brn: 'やけど', frz: 'こおり', psn: 'どく', tox: 'もうどく' }[m[2]];
      return m[1] + ' (' + st2 + ')';
    }
    m = /^(.*) \(use arrow keys\) (.*)$/.exec(value);
    if (m) {
      var tail = m[2].replace(/^Lobby(?=\s*→?$)/, 'ロビー').replace(/^Home(?=\s*→?$)/, 'ホーム');
      return m[1] + '（矢印キーで移動） ' + tail;
    }
    return value;
  }

  function isSafeElement(el) {
    if (!el || el.nodeType !== 1) return false;
    if (el.matches && el.matches('.userlist > button')) return true;
    return !!(el.closest && el.closest(safeRootSelector));
  }

  function shouldSkipTextNode(node) {
    var parent = node && node.parentElement;
    if (!parent) return true;
    if (!isSafeElement(parent)) return true;
    if (parent.closest('script,style,textarea,pre,code,kbd,.username,.usernametext,.trainer')) return true;
    if (parent.closest('a.team > strong,button.team > strong,div.team > strong')) return true;
    if (parent.closest('.challenge > p')) return true;
    if (parent.closest('.battle-log')) return true;
    if (parent.closest('.chat-log') && !parent.closest('.chat-log .challenge') && !parent.closest('.chat-log-add > button')) return true;
    return false;
  }

  function localizeTextNode(node) {
    if (!node || node.nodeType !== 3 || shouldSkipTextNode(node)) return;
    var oldValue = node.nodeValue || '';
    var newValue = localizeText(oldValue);
    if (newValue !== oldValue) node.nodeValue = newValue;
  }

  function localizeAttrs(el) {
    if (!el || el.nodeType !== 1) return;
    ['title', 'aria-label', 'placeholder'].forEach(function (attr) {
      if (!el.hasAttribute(attr)) return;
      var oldValue = el.getAttribute(attr) || '';
      var newValue = localizeAttributeValue(oldValue);
      if (newValue !== oldValue) el.setAttribute(attr, newValue);
    });
  }

  function localizeStatbar(root) {
    if (!root || root.nodeType !== 1) return;
    var spans = [];
    if (root.matches && root.matches('.battle .statbar .status span')) spans.push(root);
    if (root.querySelectorAll) spans = spans.concat(Array.prototype.slice.call(root.querySelectorAll('.battle .statbar .status span')));
    spans.forEach(function (span) {
      var text = (span.textContent || '').replace(/\u00a0/g, ' ').trim();
      var m = /^([0-9.]+×)\s*(Atk|Def|SpA|SpD|Spe)$/.exec(text);
      var localized = m ? m[1] + ' ' + statShort[m[2]] : (statusShort[text] || volatileShort[text] || '');
      if (localized && localized !== text) span.textContent = localized;
    });
  }

  function localizeTurn(root) {
    if (!root || root.nodeType !== 1) return;
    var nodes = [];
    if (root.matches && root.matches('.battle .turn')) nodes.push(root);
    if (root.querySelectorAll) nodes = nodes.concat(Array.prototype.slice.call(root.querySelectorAll('.battle .turn')));
    nodes.forEach(function (el) {
      var m = /^Turn (\d+)$/.exec((el.textContent || '').trim());
      if (m) el.textContent = 'ターン ' + m[1];
    });
  }

  function localizeSystemLines(root) {
    if (!root || root.nodeType !== 1 || !root.querySelectorAll) return;
    var systemLines = [];
    if (root.matches && root.matches('.battle-log small.gray, .notice small.gray')) systemLines.push(root);
    systemLines = systemLines.concat(Array.prototype.slice.call(root.querySelectorAll('.battle-log small.gray, .notice small.gray')));
    systemLines.forEach(function (el) {
      var text = (el.textContent || '').trim();
      var m = /^(.*) joined$/.exec(text);
      if (m) {
        el.textContent = m[1].replace(/, and /g, '、').replace(/ and /g, '、').replace(/, /g, '、') + ' が入室しました';
        return;
      }
      m = /^(.*) left$/.exec(text);
      if (m) el.textContent = m[1] + ' が退室しました';
    });

    var info = [];
    if (root.matches && root.matches('.chat-log .infobox')) info.push(root);
    info = info.concat(Array.prototype.slice.call(root.querySelectorAll('.chat-log .infobox')));
    info.forEach(function (el) {
      if ((el.textContent || '').trim() === 'You joined Lobby') el.textContent = 'ロビーに参加しました';
    });

    var battleNotices = [];
    if (root.matches && root.matches('.notice a.ilink')) battleNotices.push(root);
    battleNotices = battleNotices.concat(Array.prototype.slice.call(root.querySelectorAll('.notice a.ilink')));
    battleNotices.forEach(function (el) {
      var text = el.textContent || '';
      if (text.indexOf(' battle started between ') < 0) return;
      Array.prototype.forEach.call(el.childNodes, function (node) {
        if (node.nodeType !== 3) return;
        var v = node.nodeValue || '';
        if (v.indexOf(' battle started between ') >= 0) {
          var idx = v.indexOf(' battle started between ');
          var fmt = v.slice(0, idx);
          var jaFmt = phase2.translateFormat ? phase2.translateFormat(fmt) : fmt;
          node.nodeValue = jaFmt + ' の対戦が始まりました: ';
        } else if (/^\s*and\s*$/.test(v)) {
          node.nodeValue = ' と ';
        } else if (/^\.\s*$/.test(v)) {
          node.nodeValue = '。';
        }
      });
    });
  }

  function localizeTypeName(name) {
    return typeJa[String(name || '').trim()] || name;
  }

  function replaceOwnText(el, value) {
    if (!el || !el.childNodes) return;
    for (var i = 0; i < el.childNodes.length; i++) {
      var node = el.childNodes[i];
      if (node.nodeType === 3 && String(node.nodeValue || '').trim()) {
        var lead = /^\s*/.exec(node.nodeValue || '')[0];
        var tail = /\s*$/.exec(node.nodeValue || '')[0];
        node.nodeValue = lead + value + tail;
        return;
      }
    }
  }

  function localizeTypeLabels(root) {
    if (!root || root.nodeType !== 1) return;
    var nodes = [];
    if (root.matches && root.matches('.typeicon')) nodes.push(root);
    if (root.querySelectorAll) nodes = nodes.concat(Array.prototype.slice.call(root.querySelectorAll('.typeicon')));
    nodes.forEach(function (el) {
      var cls = String(el.className || '');
      var m = /(?:^|\s)typeicon-([A-Za-z]+)(?:\s|$)/.exec(cls);
      var canonical = m ? m[1] : (el.textContent || '').trim();
      var ja = localizeTypeName(canonical);
      if (ja && ja !== (el.textContent || '').trim()) el.textContent = ja;
    });

    var coverage = [];
    if (root.matches && root.matches('.team-resources')) coverage.push(root);
    if (root.querySelectorAll) coverage = coverage.concat(Array.prototype.slice.call(root.querySelectorAll('.team-resources')));
    coverage.forEach(function (box) {
      Array.prototype.forEach.call(box.querySelectorAll('th'), function (th) {
        var old = (th.textContent || '').trim();
        var ja = localizeTypeName(old);
        if (ja !== old) th.textContent = ja;
      });
      Array.prototype.forEach.call(box.querySelectorAll('small.gray'), function (small) {
        var old = (small.textContent || '').trim();
        if (old === 'resist') small.textContent = '半減';
        else if (old === 'weak') small.textContent = '弱点';
        else if (old === 'immune') small.textContent = '無効';
      });
      Array.prototype.forEach.call(box.querySelectorAll('strong'), function (strong) {
        if ((strong.textContent || '').trim() === 'Defensive coverage') strong.textContent = 'タイプ耐性';
      });
      Array.prototype.forEach.call(box.querySelectorAll('.details-preview small'), function (small) {
        if ((small.textContent || '').trim() === 'See all') small.textContent = 'すべて表示';
      });
    });
  }

  function localizeTeambuilderSpecials(root) {
    if (!root || root.nodeType !== 1) return;
    var scope = root.matches && root.matches('[id^="room-teambuilder"],[id^="room-team-"],.teameditor,.team-focus-editor,.set-form,.team-resources') ? root : null;
    if (!scope && root.querySelector) scope = root.querySelector('[id^="room-teambuilder"],[id^="room-team-"],.teameditor,.team-focus-editor,.set-form,.team-resources');
    if (!scope && !(root.closest && root.closest('[id^="room-teambuilder"],[id^="room-team-"],.teameditor,.team-focus-editor,.set-form,.team-resources'))) return;

    var container = scope || root;
    localizeTypeLabels(container);

    if (container.querySelectorAll) {
      Array.prototype.forEach.call(container.querySelectorAll('input[name="nickname"][placeholder]'), function (input) {
        var old = input.getAttribute('placeholder') || '';
        var ja = JA.displayName('pokemon', old);
        if (ja && ja !== old) input.setAttribute('placeholder', ja);
      });
      Array.prototype.forEach.call(container.querySelectorAll('.teameditor-options-menu option'), function (option) {
        var text = (option.textContent || '').trim();
        if (text === 'Automatic (Compact)' || text === 'Automatic (コンパクト)') option.textContent = '自動（コンパクト）';
        else if (text === 'Automatic (Comfortable)' || text === 'Automatic (ゆったり)') option.textContent = '自動（ゆったり）';
      });
      Array.prototype.forEach.call(container.querySelectorAll('.folder h3'), function (h3) {
        var m = /^Gen (\d+)$/.exec((h3.textContent || '').trim());
        if (m) h3.textContent = '第' + m[1] + '世代';
      });
      Array.prototype.forEach.call(container.querySelectorAll('button.selectFolder[data-value="' + nc2000FormatId + '"]'), function (button) {
        replaceOwnText(button, nc2000FormatJa.replace(/^第2世代\s*/, ''));
      });
      Array.prototype.forEach.call(container.querySelectorAll('a.team > strong > span, button.team > strong > span, div.team > strong > span'), function (span) {
        var text = (span.textContent || '').trim().toLowerCase();
        if (text === '[' + nc2000FormatId + ']') span.textContent = '[ニンテンドウカップ2000] ';
      });
      Array.prototype.forEach.call(container.querySelectorAll('.teamselect .team strong'), function (strong) {
        if ((strong.textContent || '').trim() === 'Random team') strong.textContent = 'ランダムチーム';
      });
    }
  }

  function localizeObservedUiSpecials(root) {
    if (!root || root.nodeType !== 1) return;
    var randomTeams = [];
    if (root.matches && root.matches('.teamselect .team strong')) randomTeams.push(root);
    if (root.querySelectorAll) randomTeams = randomTeams.concat(Array.prototype.slice.call(root.querySelectorAll('.teamselect .team strong')));
    randomTeams.forEach(function (strong) {
      if ((strong.textContent || '').trim() === 'Random team') strong.textContent = 'ランダムチーム';
    });
  }

  function localizeAttributeOnlyUI(root) {
    if (!root || root.nodeType !== 1) return;
    var selectors = '[aria-label="Active Pokemon"],[aria-label="Chat log"],.mini-window-header button[aria-label]';
    var nodes = [];
    if (root.matches && root.matches(selectors)) nodes.push(root);
    if (root.querySelectorAll) nodes = nodes.concat(Array.prototype.slice.call(root.querySelectorAll(selectors)));
    nodes.forEach(localizeAttrs);
  }

  function localizeUserCountButtons(root) {
    if (!root || root.nodeType !== 1) return;
    var buttons = [];
    if (root.matches && root.matches('.userlist > button, .roomlist .blocklink small')) buttons.push(root);
    if (root.querySelectorAll) buttons = buttons.concat(Array.prototype.slice.call(root.querySelectorAll('.userlist > button, .roomlist .blocklink small')));
    buttons.forEach(function (el) {
      var text = (el.textContent || '').trim();
      var m = /^\(?([0-9]+) users\)?$/.exec(text);
      if (!m) return;
      el.textContent = text.charAt(0) === '(' ? '（' + m[1] + '人）' : m[1] + '人';
    });
  }

  function localizeSafeRoot(root) {
    if (!root || root.nodeType !== 1) return;
    localizeAttrs(root);
    if (root.querySelectorAll) {
      Array.prototype.forEach.call(root.querySelectorAll('[title],[aria-label],[placeholder]'), localizeAttrs);
    }
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var node;
    while ((node = walker.nextNode())) localizeTextNode(node);
    localizeTurn(root);
    localizeStatbar(root);
    localizeTypeLabels(root);
    localizeTeambuilderSpecials(root);
    localizeAttributeOnlyUI(root);
    localizeUserCountButtons(root);
    localizeObservedUiSpecials(root);
  }

  function localizeElementAndContainedRoots(el) {
    if (!el || el.nodeType !== 1) return;
    if (isSafeElement(el)) localizeSafeRoot(el);
    if (el.matches && el.matches('.userlist > button')) localizeSafeRoot(el);
    if (el.querySelectorAll) {
      Array.prototype.forEach.call(el.querySelectorAll(safeRootSelector + ', .userlist > button'), localizeSafeRoot);
    }
    localizeSystemLines(el);
    localizeTeambuilderSpecials(el);
    localizeTypeLabels(el);
    localizeAttributeOnlyUI(el);
    localizeUserCountButtons(el);
    localizeObservedUiSpecials(el);
  }

  function localizeDocument() {
    Array.prototype.forEach.call(document.querySelectorAll(safeRootSelector + ', .userlist > button'), localizeSafeRoot);
    localizeSystemLines(document.body);
    localizeTeambuilderSpecials(document.body);
    localizeTypeLabels(document.body);
    localizeAttributeOnlyUI(document.body);
    localizeUserCountButtons(document.body);
    localizeObservedUiSpecials(document.body);
  }

  // Team Preview / switch buttons are rendered through BattlePanel.renderPokemonButton.
  // Phase 2 localized renderControls as a whole, but some Preact redraw paths can bypass
  // the already-localized VNode text. Patch the button itself so the display is stable.
  // Do not alter the Pokemon object, tooltip, data-cmd, or any server-facing value.
  function simpleID(text) {
    return String(text || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
  }
  function replaceVNodeExactText(node, from, to) {
    if (!node || from === to) return node;
    if (typeof node === 'string') return node === from ? to : node;
    if (Array.isArray(node)) {
      for (var i = 0; i < node.length; i++) node[i] = replaceVNodeExactText(node[i], from, to);
      return node;
    }
    if (typeof node === 'object' && node.props && node.props.children !== undefined) {
      node.props.children = replaceVNodeExactText(node.props.children, from, to);
    }
    return node;
  }
  if (typeof BattlePanel !== 'undefined' && BattlePanel.prototype.renderPokemonButton) {
    var originalRenderPokemonButtonP3 = BattlePanel.prototype.renderPokemonButton;
    if (!originalRenderPokemonButtonP3.__nc2000JaPhase3) {
      var wrappedRenderPokemonButtonP3 = function (props) {
        var vnode = originalRenderPokemonButtonP3.apply(this, arguments);
        var pokemon = props && props.pokemon;
        if (!pokemon) return vnode;
        var shown = pokemon.name || '';
        var species = pokemon.speciesForme || shown;
        // Respect nicknames: translate only when Showdown is displaying the species name itself.
        if (!shown || !species || simpleID(shown) !== simpleID(species)) return vnode;
        var localized = JA.displayName('pokemon', species);
        if (localized && localized !== shown) replaceVNodeExactText(vnode, shown, localized);
        return vnode;
      };
      wrappedRenderPokemonButtonP3.__nc2000JaPhase3 = true;
      BattlePanel.prototype.renderPokemonButton = wrappedRenderPokemonButtonP3;
    }
  }

  // Battle tooltips are another Team Preview path. Localize only entities that the
  // tooltip itself identifies; do not perform global word replacement inside tooltip prose.
  function replaceEscapedEntity(html, type, english) {
    if (!html || !english || typeof BattleLog === 'undefined' || !BattleLog.escapeHTML) return html;
    var localized = JA.displayName(type, english);
    if (!localized || localized === english) return html;
    var from = BattleLog.escapeHTML(english);
    var to = BattleLog.escapeHTML(localized);
    return html.split(from).join(to);
  }
  if (typeof BattleTooltips !== 'undefined' && BattleTooltips.prototype.showPokemonTooltip) {
    var originalShowPokemonTooltipP3 = BattleTooltips.prototype.showPokemonTooltip;
    if (!originalShowPokemonTooltipP3.__nc2000JaPhase3) {
      var wrappedShowPokemonTooltipP3 = function (clientPokemon, serverPokemon) {
        var html = originalShowPokemonTooltipP3.apply(this, arguments);
        var pokemon = clientPokemon || serverPokemon;
        if (pokemon && pokemon.speciesForme) {
          html = replaceEscapedEntity(html, 'pokemon', pokemon.speciesForme);
        }
        if (serverPokemon && this.battle && this.battle.dex) {
          var dex = this.battle.dex;
          Array.prototype.forEach.call(serverPokemon.moves || [], function (moveid) {
            var move = dex.moves && dex.moves.get ? dex.moves.get(moveid) : null;
            if (move && move.name) html = replaceEscapedEntity(html, 'move', move.name);
          });
          var item = dex.items && dex.items.get && serverPokemon.item ? dex.items.get(serverPokemon.item) : null;
          if (item && item.name) html = replaceEscapedEntity(html, 'item', item.name);
        }
        return html;
      };
      wrappedShowPokemonTooltipP3.__nc2000JaPhase3 = true;
      BattleTooltips.prototype.showPokemonTooltip = wrappedShowPokemonTooltipP3;
    }
  }
  if (typeof BattleTooltips !== 'undefined' && BattleTooltips.prototype.showMoveTooltip) {
    var originalShowMoveTooltipP3 = BattleTooltips.prototype.showMoveTooltip;
    if (!originalShowMoveTooltipP3.__nc2000JaPhase3) {
      var wrappedShowMoveTooltipP3 = function (move) {
        var html = originalShowMoveTooltipP3.apply(this, arguments);
        if (move && move.name) html = replaceEscapedEntity(html, 'move', move.name);
        return html;
      };
      wrappedShowMoveTooltipP3.__nc2000JaPhase3 = true;
      BattleTooltips.prototype.showMoveTooltip = wrappedShowMoveTooltipP3;
    }
  }

  // Battle scene strings are generated outside Preact. Patch the two high-frequency
  // methods to avoid a visible English flash before the MutationObserver runs.
  if (typeof BattleScene !== 'undefined') {
    ['resetTurn', 'incrementTurn'].forEach(function (method) {
      if (!BattleScene.prototype[method]) return;
      var original = BattleScene.prototype[method];
      BattleScene.prototype[method] = function () {
        var result = original.apply(this, arguments);
        var el = this.$turn && this.$turn[0];
        if (el) localizeTurn(el);
        return result;
      };
    });
  }

  if (typeof PokemonSprite !== 'undefined' && PokemonSprite.prototype.updateStatbar) {
    var originalUpdateStatbar = PokemonSprite.prototype.updateStatbar;
    PokemonSprite.prototype.updateStatbar = function () {
      var result = originalUpdateStatbar.apply(this, arguments);
      var el = this.$statbar && this.$statbar[0];
      if (el) localizeStatbar(el);
      return result;
    };
  }

  localizeDocument();

  var observer = new MutationObserver(function (records) {
    records.forEach(function (record) {
      if (record.type === 'characterData') {
        localizeTextNode(record.target);
        return;
      }
      if (record.type === 'attributes') {
        if (isSafeElement(record.target) || (record.target.matches && record.target.matches('.userlist > button'))) {
          localizeAttrs(record.target);
        }
        return;
      }
      Array.prototype.forEach.call(record.addedNodes || [], function (node) {
        if (node.nodeType === 3) localizeTextNode(node);
        else if (node.nodeType === 1) localizeElementAndContainedRoots(node);
      });
    });
  });
  observer.observe(document.body, {
    childList: true, subtree: true, characterData: true, attributes: true,
    attributeFilter: ['title', 'aria-label', 'placeholder'],
  });

  window.NC2000_JA_PHASE3 = {
    version: '2026-08-11-r3',
    localizeText: localizeText,
    localizeAttributeValue: localizeAttributeValue,
    localizeTypeName: localizeTypeName,
    localizeDocument: localizeDocument,
  };
})();
