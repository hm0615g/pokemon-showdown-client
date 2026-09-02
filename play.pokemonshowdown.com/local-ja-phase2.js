(function () {
  'use strict';

  if (window.NC2000_LOCALE !== 'ja') return;

  var JA = window.NC2000_JA;
  var names = window.NC2000_JA_NAMES;
  if (!JA || !names) throw new Error('NC2000 Phase 1 Japanese localization is required before Phase 2.');

  function escReplace(text) {
    return String(text == null ? '' : text).replace(/\$/g, '$$$$');
  }

  function display(type, english) {
    return JA.displayName(type, english || '');
  }

  var typeNames = {
    Normal: 'ノーマル', Fire: 'ほのお', Water: 'みず', Electric: 'でんき', Grass: 'くさ', Ice: 'こおり',
    Fighting: 'かくとう', Poison: 'どく', Ground: 'じめん', Flying: 'ひこう', Psychic: 'エスパー', Bug: 'むし',
    Rock: 'いわ', Ghost: 'ゴースト', Dragon: 'ドラゴン', Dark: 'あく', Steel: 'はがね', Fairy: 'フェアリー',
  };

  var effectNames = {
    confusion: 'こんらん', trapped: 'にげられない状態', Substitute: 'みがわり', substitute: 'みがわり',
    Spikes: 'まきびし', Reflect: 'リフレクター', 'Light Screen': 'ひかりのかべ',
    Attract: 'メロメロ', Encore: 'アンコール', Nightmare: 'あくむ', Curse: 'のろい',
    Sandstorm: 'すなあらし', SunnyDay: 'にほんばれ', RainDance: 'あまごい',
    brn: 'やけど', frz: 'こおり', par: 'まひ', psn: 'どく', tox: 'もうどく', slp: 'ねむり',
  };

  function displayEffect(effect) {
    if (!effect) return '';
    var raw = String(effect).trim();
    if (raw.indexOf('item:') === 0) return display('item', raw.slice(5).trim());
    if (raw.indexOf('move:') === 0) return display('move', raw.slice(5).trim());
    if (raw.indexOf('ability:') === 0) return raw.slice(8).trim();
    if (effectNames[raw]) return effectNames[raw];
    var move = display('move', raw);
    if (move !== raw) return move;
    var item = display('item', raw);
    if (item !== raw) return item;
    return raw;
  }

  function displayAnyExact(text) {
    if (typeof text !== 'string' || !text) return text;
    // Do not translate type names here. Some move names are identical to type names
    // (notably Psychic), so type translation must only happen in an explicit type context.
    var out = display('pokemon', text);
    if (out !== text) return out;
    out = display('move', text);
    if (out !== text) return out;
    out = display('item', text);
    if (out !== text) return out;
    return text;
  }

  var defaultTemplates = {
    startBattle: '[TRAINER] と [TRAINER] の対戦が始まった！',
    winBattle: '**[TRAINER]** の勝利！',
    tieBattle: '[TRAINER] と [TRAINER] の対戦は引き分け！',
    pokemon: '[NICKNAME]', opposingPokemon: '相手の[NICKNAME]',
    team: 'こちらのチーム', opposingTeam: '相手のチーム', party: '味方のポケモン', opposingParty: '相手のポケモン',
    turn: '== ターン [NUMBER] ==',
    switchIn: '[TRAINER]は[FULLNAME]を繰り出した！', switchInOwn: 'ゆけっ！ [FULLNAME]！',
    switchOut: '[TRAINER]は[NICKNAME]を引っ込めた！', switchOutOwn: '[NICKNAME]、戻れ！',
    drag: '[FULLNAME]が引きずり出された！', faint: '[POKEMON]は倒れた！',
    swap: '[POKEMON]と[TARGET]は場所を入れ替えた！', swapCenter: '[POKEMON]は中央へ移動した！',
    move: '[POKEMON]の **[MOVE]**！', cant: '[POKEMON]は[MOVE]を使えない！', cantNoMove: '[POKEMON]は動けない！',
    fail: '  しかし うまく決まらなかった！', transform: '[POKEMON]は変身した！',
    typeChange: '  [POKEMON]は[TYPE]タイプになった！', typeAdd: '  [POKEMON]に[TYPE]タイプが追加された！',
    start: '  ([POKEMON]に[EFFECT]の効果がかかった！)', end: '  [POKEMON]の[EFFECT]の効果がなくなった！',
    activate: '  ([EFFECT]が発動した！)', startTeamEffect: '  ([TEAM]に[EFFECT]の効果がかかった！)',
    endTeamEffect: '  ([TEAM]の[EFFECT]の効果がなくなった！)', startFieldEffect: '  ([EFFECT]が始まった！)',
    endFieldEffect: '  ([EFFECT]が終わった！)', addItem: '  [POKEMON]は[ITEM]を手に入れた。',
    takeItem: '  [POKEMON]は[SOURCE]の[ITEM]を奪った！', eatItem: '  ([POKEMON]は[ITEM]を食べた！)',
    removeItem: '  [POKEMON]は[ITEM]を失った！', activateItem: '  ([POKEMON]は[ITEM]を使った！)',
    damage: '  ([POKEMON]はダメージを受けた！)', damagePercentage: '  ([POKEMON]は体力を[PERCENTAGE]失った！)',
    damageFromPokemon: '  [POKEMON]は[SOURCE]の[ITEM]でダメージを受けた！', damageFromItem: '  [POKEMON]は[ITEM]でダメージを受けた！',
    damageFromPartialTrapping: '  [POKEMON]は[MOVE]で締め付けられている！', heal: '  [POKEMON]はHPを回復した。',
    healFromEffect: '  [POKEMON]は[EFFECT]でHPを回復した！',
    boost: '  [POKEMON]の[STAT]が上がった！', boost2: '  [POKEMON]の[STAT]がぐーんと上がった！',
    boost3: '  [POKEMON]の[STAT]がぐぐーんと上がった！', boost0: '  [POKEMON]の[STAT]はこれ以上上がらない！',
    unboost: '  [POKEMON]の[STAT]が下がった！', unboost2: '  [POKEMON]の[STAT]ががくっと下がった！',
    unboost3: '  [POKEMON]の[STAT]ががくーんと下がった！', unboost0: '  [POKEMON]の[STAT]はこれ以上下がらない！',
    clearBoost: '  [POKEMON]の能力変化が元に戻った！', clearAllBoost: '  すべての能力変化が元に戻った！',
    superEffective: '  効果は抜群だ！', superEffectiveSpread: '  [POKEMON]に効果は抜群だ！',
    resisted: '  効果はいまひとつのようだ……', resistedSpread: '  [POKEMON]には効果はいまひとつのようだ……',
    crit: '  急所に当たった！', critSpread: '  [POKEMON]の急所に当たった！',
    immune: '  [POKEMON]には効果がないようだ……', immuneNoPokemon: '  効果がないようだ……', immuneOHKO: '  [POKEMON]には効かなかった！',
    miss: '  [POKEMON]には当たらなかった！', missNoPokemon: '  [SOURCE]の攻撃は外れた！', noTarget: '  しかし対象がいなかった……',
    hitCount: '  [NUMBER]回当たった！', hitCountSingular: '  1回当たった！',
  };

  var namespaceTemplates = {
    brn: { start: '  [POKEMON]はやけどを負った！', end: '  [POKEMON]のやけどが治った！', damage: '  [POKEMON]はやけどのダメージを受けた！' },
    frz: { start: '  [POKEMON]はこおりづけになった！', end: '  [POKEMON]の氷がとけた！', cant: '[POKEMON]は凍っていて動けない！' },
    par: { start: '  [POKEMON]はまひして技が出にくくなった！', end: '  [POKEMON]のまひが治った！', cant: '[POKEMON]は体がしびれて動けない！' },
    psn: { start: '  [POKEMON]は毒におかされた！', end: '  [POKEMON]の毒が消えた！', damage: '  [POKEMON]は毒のダメージを受けている！' },
    tox: { start: '  [POKEMON]は猛毒におかされた！', end: '  [POKEMON]の毒が消えた！', damage: '  [POKEMON]は毒のダメージを受けている！' },
    slp: { start: '  [POKEMON]は眠ってしまった！', startFromRest: '  [POKEMON]は眠りについて体力を回復した！', end: '  [POKEMON]は目を覚ました！', cant: '[POKEMON]はぐうぐう眠っている。' },
    confusion: { start: '  [POKEMON]は混乱した！', end: '  [POKEMON]は正気に戻った！', activate: '  [POKEMON]は混乱している！', damage: '  [POKEMON]はわけもわからず自分を攻撃した！' },
    attract: { start: '  [POKEMON]はメロメロになった！', activate: '  [POKEMON]は相手にメロメロだ！', cant: '[POKEMON]はメロメロで技が出せない！', end: '  [POKEMON]のメロメロ状態が解けた！' },
    encore: { start: '  [POKEMON]はアンコールを受けた！', end: '  [POKEMON]のアンコール状態が解けた。' },
    disable: { start: '  [POKEMON]の[MOVE]が封じられた！', cant: '[POKEMON]は[MOVE]を封じられていて使えない！', end: '  [POKEMON]のかなしばりが解けた！' },
    substitute: { start: '  [POKEMON]はみがわりを作り出した！', activate: '  [POKEMON]のみがわりが攻撃を受けた！', end: '  [POKEMON]のみがわりは消えてしまった！' },
    protect: { start: '  [POKEMON]はまもりの体勢に入った！', activate: '  [POKEMON]は攻撃から身を守った！' },
    endure: { start: '  [POKEMON]はこらえる体勢に入った！', activate: '  [POKEMON]は攻撃をこらえた！' },
    focusenergy: { start: '  [POKEMON]は張り切っている！' },
    destinybond: { start: '  [POKEMON]は相手をみちづれにしようとしている。', activate: '  [POKEMON]は相手をみちづれにした！' },
    razorwind: { prepare: '  [POKEMON]のまわりを空気がうずまく。' },
    solarbeam: { prepare: '  [POKEMON]はひかりを吸収している。' },
    skyattack: { prepare: '  [POKEMON]を激しい光が包む！' },
    flinch: { cant: '[POKEMON]はひるんだ！' },
    recharge: { cant: '[POKEMON]は反動で動けない！' },
    recoil: { damage: '  [POKEMON]は攻撃の反動を受けた！' },
    struggle: { activate: '  [POKEMON]は出せる技がない！' },
    trapped: { start: '  [POKEMON]はもう逃げられない！', activate: '  [POKEMON]はもう逃げられない！' },
    perishsong: { start: '  おたがいのポケモンは3ターン後にほろんでしまう！', activate: '  [POKEMON]のほろびのカウントが[NUMBER]になった！' },
    painsplit: { activate: '  おたがいの体力をわかちあった！' },
    healbell: { activate: '  味方のすべての状態異常が回復した！' },
    leechseed: { start: '  [POKEMON]にやどりぎのタネを植えつけた！', end: '  [POKEMON]のやどりぎのタネが取り除かれた！', damage: '  [POKEMON]の体力がやどりぎのタネに吸い取られた！', heal: '  [POKEMON]はやどりぎのタネでHPを回復した！' },
    spikes: { start: '  [TEAM]の足元にまきびしがまかれた！', end: '  [TEAM]のまきびしが取り除かれた！', damage: '  [POKEMON]はまきびしのダメージを受けた！' },
    reflect: { start: '  [TEAM]は物理攻撃に強くなった！', end: '  [TEAM]のリフレクターの効果が切れた！' },
    lightscreen: { start: '  [TEAM]は特殊攻撃に強くなった！', end: '  [TEAM]のひかりのかべの効果が切れた！' },
    curse: { start: '  [POKEMON]はのろわれた！', damage: '  [POKEMON]はのろいで体力を奪われている！' },
    nightmare: { start: '  [POKEMON]はあくむを見始めた！', end: '  [POKEMON]のあくむが消えた！', damage: '  [POKEMON]はあくむにうなされている！' },
    sandstorm: { start: '  すなあらしが吹き始めた！', end: '  すなあらしが収まった。', upkeep: '  (すなあらしが吹き荒れている！)', damage: '  [POKEMON]はすなあらしのダメージを受けている！' },
    sunnyday: { start: '  日差しが強くなった。', end: '  日差しが元に戻った。', upkeep: '  (日差しが強い！)' },
    raindance: { start: '  大雨になった。', end: '  雨が降り止んだ。', upkeep: '  (雨が降り続いている。)' },
  };


  function effectId(ns) {
    if (!ns) return '';
    if (typeof BattleTextParser !== 'undefined' && BattleTextParser.effectId) return BattleTextParser.effectId(ns);
    return String(ns).toLowerCase().replace(/[^a-z0-9]+/g, '');
  }

  if (typeof BattleTextParser !== 'undefined') {
    var proto = BattleTextParser.prototype;
    var originalTemplate = proto.template;
    proto.template = function (type) {
      var namespaces = Array.prototype.slice.call(arguments, 1);
      for (var i = 0; i < namespaces.length; i++) {
        var ns = namespaces[i];
        if (!ns) continue;
        if (ns === 'OWN') {
          if (defaultTemplates[type + 'Own']) return defaultTemplates[type + 'Own'] + '\n';
          continue;
        }
        if (ns === 'NODEFAULT') return '';
        var id = effectId(ns);
        if (namespaceTemplates[id] && namespaceTemplates[id][type]) return namespaceTemplates[id][type] + '\n';
      }
      if (defaultTemplates[type]) return defaultTemplates[type] + '\n';
      return originalTemplate.apply(this, arguments);
    };

    var originalPokemon = proto.pokemon;
    proto.pokemon = function (pokemon) {
      if (!pokemon) return '';
      var raw = String(pokemon);
      var side = raw.slice(0, 2);
      if (['p1', 'p2', 'p3', 'p4'].indexOf(side) < 0) return originalPokemon.call(this, pokemon);
      var name = raw.charAt(3) === ':' ? raw.slice(4).trim() : raw.charAt(2) === ':' ? raw.slice(3).trim() : '';
      if (!name) return originalPokemon.call(this, pokemon);
      var ally = BattleTextParser.allyID(side);
      var isNear = side === this.perspective || side === ally;
      var template = defaultTemplates[isNear ? 'pokemon' : 'opposingPokemon'];
      return template.replace('[NICKNAME]', escReplace(display('pokemon', name))).replace(/\$/g, '$$$$');
    };

    var originalPokemonName = proto.pokemonName;
    proto.pokemonName = function (pokemon) {
      if (!pokemon || !String(pokemon).startsWith('p')) return originalPokemonName.call(this, pokemon);
      var raw = String(pokemon);
      var name = raw.charAt(3) === ':' ? raw.slice(4).trim() : raw.charAt(2) === ':' ? raw.slice(3).trim() : '';
      if (!name) return originalPokemonName.call(this, pokemon);
      return escReplace(display('pokemon', name));
    };

    proto.pokemonFull = function (pokemon, details) {
      var raw = String(pokemon || '');
      var nickname = raw.charAt(3) === ':' ? raw.slice(4).trim() : raw.charAt(2) === ':' ? raw.slice(3).trim() : '';
      var species = String(details || '').split(',')[0].trim();
      var jaSpecies = display('pokemon', species);
      if (nickname === species) return [raw.slice(0, 2), '**' + escReplace(jaSpecies) + '**'];
      return [raw.slice(0, 2), escReplace(display('pokemon', nickname)) + ' (**' + escReplace(jaSpecies) + '**)'];
    };

    // BattleTextParser.team()/party() read BattleText.default directly rather than template(),
    // so localize them explicitly for side/field-effect messages.
    proto.team = function (side, isFar) {
      side = String(side || '').slice(0, 2);
      var ally = BattleTextParser.allyID(side);
      var near = side === this.perspective || side === ally;
      if (near) return isFar ? defaultTemplates.opposingTeam : defaultTemplates.team;
      return isFar ? defaultTemplates.team : defaultTemplates.opposingTeam;
    };
    proto.party = function (side) {
      side = String(side || '').slice(0, 2);
      var near = side === this.perspective || side === BattleTextParser.allyID(side);
      return near ? defaultTemplates.party : defaultTemplates.opposingParty;
    };

    proto.effect = function (effect) {
      return displayEffect(effect);
    };

    var originalParseArgsInner = proto.parseArgsInner;
    proto.parseArgsInner = function (args, kwArgs) {
      var cmd = args && args[0];
      if (cmd === '-message') {
        return '  ' + translateMessage(args[1] || '') + '\n';
      }
      if (cmd === '-hint') {
        return '  (' + translateHint(args[1] || '') + ')\n';
      }
      var displayArgs = args;
      var displayKw = kwArgs;
      if (cmd === 'move' && args[2]) {
        displayArgs = args.slice(); displayArgs[2] = display('move', args[2]);
      } else if (cmd === 'cant' && args[3]) {
        displayArgs = args.slice(); displayArgs[3] = display('move', args[3]);
      }
      if (kwArgs && (kwArgs.move || kwArgs.item)) {
        displayKw = Object.assign({}, kwArgs);
        if (displayKw.move) displayKw.move = display('move', displayKw.move);
        if (displayKw.item) displayKw.item = display('item', displayKw.item);
      }
      var out = originalParseArgsInner.call(this, displayArgs, displayKw);
      if (!out || ['player', 'start', 'win', 'tie'].indexOf(cmd) >= 0) return out;
      out = translateEntitiesInBattleText(out);
      if (['switchout', 'detailschange', '-transform', '-formechange', '-mega'].indexOf(cmd) >= 0) {
        out = translatePokemonEntitiesInBattleText(out);
      }
      return out;
    };

    var statMap = { hp: 'HP', atk: 'こうげき', def: 'ぼうぎょ', spa: 'とくこう', spd: 'とくぼう', spe: 'すばやさ', accuracy: '命中率', evasion: '回避率', spc: 'とくしゅ', stats: '能力' };
    var originalStat = BattleTextParser.stat;
    BattleTextParser.stat = function (stat) { return statMap[stat] || originalStat.call(this, stat); };
  }

  function translateEntitiesInBattleText(text) {
    var out = String(text || '');
    ['moves', 'items'].forEach(function (section) {
      var type = section === 'moves' ? 'move' : 'item';
      Object.keys(names[section] || {}).sort(function (a, b) { return b.length - a.length; }).forEach(function (english) {
        if (out.indexOf(english) < 0) return;
        var re = new RegExp('(^|[^A-Za-z0-9])(' + String(english).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&') + ')(?=$|[^A-Za-z0-9])', 'g');
        out = out.replace(re, function (_, prefix) { return prefix + display(type, english); });
      });
    });
    Object.keys(typeNames).forEach(function (englishType) {
      var re = new RegExp('(^|[^A-Za-z0-9])(' + englishType.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&') + ')(?=$|[^A-Za-z0-9])', 'g');
      out = out.replace(re, function (_, prefix) { return prefix + typeNames[englishType]; });
    });
    return out;
  }

  function translatePokemonEntitiesInBattleText(text) {
    var out = String(text || '');
    Object.keys(names.pokemon || {}).sort(function (a, b) { return b.length - a.length; }).forEach(function (english) {
      if (out.indexOf(english) < 0) return;
      var re = new RegExp('(^|[^A-Za-z0-9])(' + String(english).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&') + ')(?=$|[^A-Za-z0-9])', 'g');
      out = out.replace(re, function (_, prefix) { return prefix + display('pokemon', english); });
    });
    return out;
  }

  var exactHints = {
    "Gen 2 Present has a glitched damage calculation using the secondary types of the Pokemon for the Attacker's Level and Defender's Defense.":
      '第2世代のプレゼントにはダメージ計算の不具合があり、攻撃側のレベルと防御側の防御の計算にポケモンの第2タイプが使われます。',
    'In Pokemon Stadium 2, Destiny Bond fails if it is being used by your last Pokemon.':
      'ポケモンスタジアム金銀では、最後の1匹がみちづれを使うと失敗します。',
    'In Pokemon Stadium 2, Perish Song fails if it is being used by your last Pokemon.':
      'ポケモンスタジアム金銀では、最後の1匹がほろびのうたを使うと失敗します。',
  };
  function translateHint(message) { return exactHints[message] || message; }
  function translateMessage(message) {
    if (message === 'Freeze Clause activated.') return 'こおり状態の制限が適用されました。';
    var m = /^(.*) forfeited\.$/i.exec(message);
    if (m) return m[1] + ' は降参しました。';
    return message;
  }

  var ruleMap = {
    'Species Clause: Limit one of each Pokémon': '種族制限: 同じポケモンは1匹まで',
    'Item Clause: Limit 1 of each item': '道具制限: 同じ道具は1個まで',
    'Sleep Clause Mod: Limit one foe put to sleep': 'ねむり制限: 相手を同時に2匹以上ねむり状態にできない',
    'Freeze Clause Mod: Limit one foe frozen': 'こおり制限: 相手を同時に2匹以上こおり状態にできない',
    'OHKO Clause: OHKO moves are banned': '一撃必殺技禁止',
    'HP Percentage Mod: HP is shown in percentages': 'HP表示: パーセント表示',
  };
  var formatMap = {
    '[Gen 2] Nintendo Cup 2000 No OHKO Stadium2 Strict': '第2世代 ニンテンドウカップ2000（スタジアム金銀準拠・一撃必殺技禁止）',
  };

  if (typeof BattleLog !== 'undefined') {
    var originalAddBattleMessage = BattleLog.prototype.addBattleMessage;
    BattleLog.prototype.addBattleMessage = function (args, kwArgs) {
      if (args && (args[0] === 'rule' || args[0] === 'tier')) {
        args = args.slice();
        if (args[0] === 'rule') args[1] = ruleMap[args[1]] || args[1];
        else args[1] = formatMap[args[1]] || args[1];
      }
      return originalAddBattleMessage.call(this, args, kwArgs);
    };

    if (BattleLog.prototype.addDiv) {
      var originalAddDiv = BattleLog.prototype.addDiv;
      BattleLog.prototype.addDiv = function (className, html) {
        if (typeof html === 'string') {
          if (html.indexOf('<small>Format:</small>') >= 0) {
            html = html.replace('<small>Format:</small>', '<small>フォーマット:</small>');
          }
          if (String(className || '').indexOf('battle-history') >= 0 && html.indexOf('<em') >= 0) {
            html = html.replace(/(<em[^>]*>)([\s\S]*?)(<\/em>)/, function (_, open, body, close) {
              return open + translatePokemonEntitiesInBattleText(body) + close;
            });
            html = html.replace(/'s team:<\/strong>/, 'のチーム:</strong>');
          }
        }
        return originalAddDiv.call(this, className, html);
      };
    }
  }

  var controlText = {
    'Battle': 'たたかう', 'Switch': 'ポケモン', 'Team': 'チーム', 'Back': '戻る', ' Back': ' 戻る',
    'Cancel': 'キャンセル', 'Waiting for opponent...': '相手の選択を待っています…',
    'Play': '再生', 'Pause': '一時停止', 'Forfeit': '降参',
    'Skip': 'スキップ', 'Skip animation': 'アニメーションをスキップ', 'Skip turn': '次のターン', 'Skip to end': '最後まで進む', 'Replay': 'リプレイ',
    'First turn': '最初のターン', 'Prev turn': '前のターン', 'Download replay': 'リプレイをダウンロード',
    'Upload and share replay': 'リプレイを保存・共有', 'Main menu': 'メインメニュー', 'Rematch': '再戦',
    'Switch viewpoint': '視点を切り替える', 'Go to turn': 'ターンへ移動', 'Team so far': '現在の選出',
    'How will you start the battle? ': '最初に出すポケモンを選んでください。',
    ' What about the rest of your team? ': ' 残りの選出を決めてください。', 'Choose ': '選択: ',
    'What will ': '', ' do?': 'はどうする？', ' should use ': 'は ', ' at where?': ' をどこに使う？',
    'Who will replace ': '', 'Who will ': '', ' revive?': 'を復活させるポケモンを選んでください。',
    '(empty slot)': '（空き）', 'Automatic choice': '自動選択', 'You picked ': '選出: ',
    ' use ': 'は ', ' will ': 'は ', ' will switch to ': 'は交代して ', ' will revive ': 'は ',
    ' at ': ' → ', ' at ally ': ' → 味方 ', '.': '。', ', ': '、',
  };

  function localizeControlString(text) {
    if (typeof text !== 'string') return text;
    var ws = /^(\s*)(.*?)(\s*)$/.exec(text);
    if (ws && ws[2] && ws[2] !== text) {
      var localizedCore = localizeControlString(ws[2]);
      if (localizedCore !== ws[2]) return ws[1] + localizedCore + ws[3];
    }
    var exact = displayAnyExact(text);
    if (exact !== text) return exact;
    if (controlText[text] !== undefined) return controlText[text];
    var m = /^lead( \/ \d+)?$/.exec(text); if (m) return '先発' + (m[1] || '');
    m = /^slot (\d+)( \/ \d+)?$/.exec(text); if (m) return m[1] + '匹目' + (m[2] || '');
    if (/ is locked into a move\.$/.test(text)) return text.replace(/ is locked into a move\.$/, 'は技を変更できません。');
    if (/^You picked /.test(text)) return text.replace(/^You picked /, '選出: ');
    return text;
  }

  function localizeVNode(node) {
    if (typeof node === 'string') return localizeControlString(node);
    if (!node || typeof node !== 'object') return node;
    if (Array.isArray(node)) {
      for (var i = 0; i < node.length; i++) node[i] = localizeVNode(node[i]);
      return node;
    }
    if (node.props && node.props.children !== undefined) {
      node.props.children = localizeVNode(node.props.children);
    }
    return node;
  }

  if (typeof BattlePanel !== 'undefined') {
    // Move names and move types need separate context-aware translation.
    // For example, English "Psychic" is both the move name and the type name.
    if (BattlePanel.prototype.renderMoveButton) {
      var originalRenderMoveButton = BattlePanel.prototype.renderMoveButton;
      BattlePanel.prototype.renderMoveButton = function (props) {
        if (props) {
          props = Object.assign({}, props, {
            name: display('move', props.name),
            type: typeNames[props.type] || props.type,
          });
        }
        return originalRenderMoveButton.call(this, props);
      };
    }

    var originalRenderControls = BattlePanel.prototype.renderControls;
    BattlePanel.prototype.renderControls = function () {
      return localizeVNode(originalRenderControls.apply(this, arguments));
    };
  }

  if (typeof PokemonSprite !== 'undefined' && PokemonSprite.prototype.getStatbarHTML) {
    var originalGetStatbarHTML = PokemonSprite.prototype.getStatbarHTML;
    PokemonSprite.prototype.getStatbarHTML = function (pokemon) {
      var html = originalGetStatbarHTML.call(this, pokemon);
      if (!pokemon) return html;
      var ignoreNick = this.isFrontSprite && (this.scene.battle.ignoreOpponent || this.scene.battle.ignoreNicks);
      var shown = ignoreNick ? pokemon.speciesForme : pokemon.name;
      var localized = display('pokemon', shown);
      if (localized === shown) return html;
      var escapedShown = BattleLog.escapeHTML(shown);
      var escapedLocalized = BattleLog.escapeHTML(localized);
      return html.replace('<strong>' + escapedShown, '<strong>' + escapedLocalized);
    };
  }

  if (typeof BattleScene !== 'undefined' && BattleScene.prototype.getDetailsText) {
    var originalGetDetailsText = BattleScene.prototype.getDetailsText;
    BattleScene.prototype.getDetailsText = function (pokemon) {
      var out = originalGetDetailsText.call(this, pokemon);
      if (!pokemon) return out;
      [pokemon.name, pokemon.speciesForme].forEach(function (english) {
        var ja = display('pokemon', english);
        if (ja !== english) out = out.split(BattleLog.escapeHTML(english)).join(BattleLog.escapeHTML(ja));
      });
      return out.replace(' (active)', ' (対戦中)').replace(' (fainted)', ' (ひんし)');
    };
  }

  window.NC2000_JA_PHASE2 = {
    version: '2026-08-10-r2',
    displayEffect: displayEffect,
    translateHint: translateHint,
    translateMessage: translateMessage,
    translateRule: function (rule) { return ruleMap[rule] || rule; },
    translateFormat: function (format) { return formatMap[format] || format; },
    localizeControlString: localizeControlString,
  };
})();
