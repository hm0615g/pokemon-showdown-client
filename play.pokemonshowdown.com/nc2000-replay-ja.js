(function () {
  'use strict';

  window.NC2000_LOCALE = 'ja';
  window.exports = window;

  function linkStyle(localUrl, fallbackUrl) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = localUrl;
    if (fallbackUrl) {
      link.onerror = function () {
        link.onerror = null;
        link.href = fallbackUrl;
      };
    }
    document.head.appendChild(link);
  }

  function loadScript(url, fallbackUrl) {
    return new Promise(function (resolve, reject) {
      function append(src, isFallback) {
        var script = document.createElement('script');
        script.src = src;
        script.onload = function () { resolve(); };
        script.onerror = function () {
          if (!isFallback && fallbackUrl) {
            append(fallbackUrl, true);
          } else {
            reject(new Error('Failed to load script: ' + src));
          }
        };
        document.head.appendChild(script);
      }
      append(url, false);
    });
  }

  function fail(err) {
    var target = document.querySelector('.replay-controls') || document.body;
    var div = document.createElement('div');
    div.className = 'message-error';
    div.textContent = '日本語リプレイの読み込みに失敗しました: ' + (err && err.message || err);
    target.appendChild(div);
    if (window.console && console.error) console.error(err);
  }

  linkStyle('/style/font-awesome.css', 'https://play.pokemonshowdown.com/style/font-awesome.css');
  linkStyle('/style/battle.css', 'https://play.pokemonshowdown.com/style/battle.css');
  linkStyle('/style/replay.css', 'https://play.pokemonshowdown.com/style/replay.css');
  linkStyle('/style/utilichart.css', 'https://play.pokemonshowdown.com/style/utilichart.css');

  var remote = 'https://play.pokemonshowdown.com/';
  var scripts = [
    ['/js/lib/ps-polyfill.js', remote + 'js/lib/ps-polyfill.js'],
    ['/config/config.js', remote + 'config/config.js'],
    ['/js/lib/jquery-2.2.4.min.js', remote + 'js/lib/jquery-2.2.4.min.js'],
    ['/js/lib/html-css-sanitizer-minified.js', remote + 'js/lib/html-sanitizer-minified.js'],
    ['/js/battle-dex-data.js', remote + 'js/battle-dex-data.js'],
    ['/js/battle-dex.js', remote + 'js/battle-dex.js'],
    ['/js/battle-teams.js', remote + 'js/battle-teams.js'],
    ['/js/battle-text-parser.js', remote + 'js/battle-text-parser.js'],
    ['/src/battle-log-misc.js', remote + 'js/battle-log-misc.js'],
    ['/js/server/chat-formatter.js', remote + 'js/server/chat-formatter.js'],
    ['/js/battle-log.js', remote + 'js/battle-log.js'],
    ['/js/battle-sound.js', remote + 'js/battle-sound.js'],
    ['/data/graphics.js', remote + 'data/graphics.js'],
    ['/data/text.js', remote + 'data/text.js'],
    ['/data/text-afd.js', remote + 'data/text-afd.js'],
    ['/data/pokedex-mini.js', remote + 'data/pokedex-mini.js'],
    ['/data/pokedex-mini-bw.js', remote + 'data/pokedex-mini-bw.js'],
    ['/data/pokedex.js', remote + 'data/pokedex.js'],
    ['/data/moves.js', remote + 'data/moves.js'],
    ['/data/items.js', remote + 'data/items.js'],
    ['/data/abilities.js', remote + 'data/abilities.js'],
    ['/data/teambuilder-tables.js', remote + 'data/teambuilder-tables.js'],
    ['/js/battle-tooltips.js', remote + 'js/battle-tooltips.js'],
    ['/js/battle-animations.js', remote + 'js/battle-animations.js'],
    ['/js/battle-animations-moves.js', remote + 'js/battle-animations-moves.js'],
    ['/js/battle.js', remote + 'js/battle.js'],
    ['/local-ja-dict.js', null],
    ['/local-ja-phase1.js?v=1', null],
    ['/local-ja-phase2.js?v=2', null],
    ['/local-ja-phase3.js?v=3', null],
  ];

  function loadAll(index) {
    if (index >= scripts.length) return Promise.resolve();
    return loadScript(scripts[index][0], scripts[index][1]).then(function () {
      return loadAll(index + 1);
    });
  }

  function initReplay() {
    if (typeof window.$ !== 'function') throw new Error('jQuery is unavailable.');
    if (typeof window.Battle !== 'function') throw new Error('Battle engine is unavailable.');
    if (typeof window.BattleLog === 'undefined') throw new Error('BattleLog is unavailable.');
    if (typeof window.BattleSound === 'undefined') throw new Error('BattleSound is unavailable.');

    var Replays = {
      $el: null,
      battle: null,
      muted: false,
      init: function () {
        var self = this;
        this.$el = $('.wrapper');
        if (!this.$el.length) {
          $('body').append('<div class="wrapper replay-wrapper" style="max-width:1180px;margin:0 auto"><div class="battle"></div><div class="battle-log"></div><div class="replay-controls"></div><div class="replay-controls-2"></div></div>');
          this.$el = $('.wrapper');
        }

        var id = $('input[name=replayid]').val() || '';
        var log = ($('script.battle-log-data').text() || '').replace(/\\\//g, '/');

        this.$el.on('click', '.chooser button', function (e) {
          self.clickChangeSetting(e);
        });
        this.$el.on('click', 'button', function (e) {
          var action = $(e.currentTarget).data('action');
          if (action && typeof self[action] === 'function') self[action]();
        });

        this.battle = new Battle({
          id: id,
          $frame: this.$('.battle'),
          $logFrame: this.$('.battle-log'),
          log: log.split('\n'),
          isReplay: true,
          paused: true,
          autoresize: true,
        });

        this.$('.replay-controls-2').html(
          '<div class="chooser leftchooser speedchooser"><em>速度:</em> <div>' +
          '<button value="hyperfast">最速</button><button value="fast">速い</button>' +
          '<button value="normal" class="sel">標準</button><button value="slow">遅い</button>' +
          '<button value="reallyslow">とても遅い</button></div></div> ' +
          '<div class="chooser colorchooser"><em>配色:</em> <div>' +
          '<button class="sel" value="light">明るい</button><button value="dark">暗い</button></div></div> ' +
          '<div class="chooser soundchooser" style="display:none"><em>音楽:</em> <div>' +
          '<button class="sel" value="on">オン</button><button value="off">オフ</button></div></div>'
        );

        var rc2 = this.$('.replay-controls-2')[0];
        if (rc2) rc2.innerHTML = rc2.innerHTML;
        if (window.HTMLAudioElement) $('.soundchooser, .startsoundchooser').show();
        this.update();
        this.battle.subscribe(function (state) { self.update(state); });
      },
      $: function (sel) {
        return this.$el.find(sel);
      },
      clickChangeSetting: function (e) {
        e.preventDefault();
        var chooser = $(e.currentTarget).closest('.chooser');
        this.changeSetting(chooser, e.currentTarget.value, $(e.currentTarget));
      },
      changeSetting: function (type, value, valueElem) {
        var chooser;
        if (typeof type === 'string') {
          chooser = this.$('.' + type + 'chooser');
        } else {
          chooser = type;
          type = '';
          if (chooser.hasClass('colorchooser')) type = 'color';
          else if (chooser.hasClass('soundchooser')) type = 'sound';
          else if (chooser.hasClass('speedchooser')) type = 'speed';
        }
        if (!valueElem) valueElem = chooser.find('button[value=' + value + ']');
        chooser.find('button').removeClass('sel');
        valueElem.addClass('sel');

        if (type === 'color') {
          if (value === 'dark') $(document.body).addClass('dark');
          else $(document.body).removeClass('dark');
        } else if (type === 'sound') {
          this.muted = value === 'off';
          this.battle.setMute(this.muted);
          this.$('.startsoundchooser').remove();
        } else if (type === 'speed') {
          var fadeTable = {hyperfast: 40, fast: 50, normal: 300, slow: 500, reallyslow: 1000};
          var delayTable = {hyperfast: 1, fast: 1, normal: 1, slow: 1000, reallyslow: 3000};
          this.battle.messageShownTime = delayTable[value];
          this.battle.messageFadeTime = fadeTable[value];
          this.battle.scene.updateAcceleration();
        }
      },
      update: function (state) {
        if (state === 'error') {
          this.battle.scene.message('<hr /><div class="chat">このリプレイの再生中にエラーが発生しました。</div>');
          return;
        }
        if (BattleSound.muted && !this.muted) this.changeSetting('sound', 'off');
        if (this.battle.paused) {
          var resetDisabled = !this.battle.started ? ' disabled' : '';
          this.$('.replay-controls').html(
            '<button data-action="play"><i class="fa fa-play"></i> 再生</button>' +
            '<button data-action="reset"' + resetDisabled + '><i class="fa fa-undo"></i> 最初から</button> ' +
            '<button data-action="rewind"><i class="fa fa-step-backward"></i> 前のターン</button>' +
            '<button data-action="ff"><i class="fa fa-step-forward"></i> 次のターン</button> ' +
            '<button data-action="ffto"><i class="fa fa-fast-forward"></i> ターン指定...</button> ' +
            '<button data-action="switchViewpoint"><i class="fa fa-random"></i> 視点を入れ替える</button>'
          );
        } else {
          this.$('.replay-controls').html(
            '<button data-action="pause"><i class="fa fa-pause"></i> 一時停止</button>' +
            '<button data-action="reset"><i class="fa fa-undo"></i> 最初から</button> ' +
            '<button data-action="rewind"><i class="fa fa-step-backward"></i> 前のターン</button>' +
            '<button data-action="ff"><i class="fa fa-step-forward"></i> 次のターン</button> ' +
            '<button data-action="ffto"><i class="fa fa-fast-forward"></i> ターン指定...</button> ' +
            '<button data-action="switchViewpoint"><i class="fa fa-random"></i> 視点を入れ替える</button>'
          );
        }
      },
      pause: function () { this.battle.pause(); },
      play: function () { this.battle.play(); },
      reset: function () { this.battle.reset(); },
      ff: function () { this.battle.seekBy(1); },
      rewind: function () { this.battle.seekBy(-1); },
      ffto: function () {
        var turn = prompt('ターン番号を入力してください。');
        if (!turn || !String(turn).trim()) return;
        if (turn === 'e' || turn === 'end' || turn === 'f' || turn === 'finish') turn = Infinity;
        turn = Number(turn);
        if (isNaN(turn) || turn < 0) {
          alert('ターン番号が正しくありません。');
          return;
        }
        this.battle.seekTurn(turn);
      },
      switchViewpoint: function () { this.battle.switchViewpoint(); },
    };

    window.NC2000Replays = Replays;
    Replays.init();
  }

  if (window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) document.body.className = 'dark';
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (event) {
      document.body.className = event.matches ? 'dark' : '';
    });
  }

  loadAll(0).then(initReplay).catch(fail);
})();
