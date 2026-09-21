(function () {
  'use strict';

  if (window.NC2000_LOCALE !== 'ja') return;

  var names = window.NC2000_JA_NAMES;
  if (!names || !names.pokemon || !names.moves || !names.items) {
    throw new Error('NC2000 Japanese dictionary is not loaded.');
  }

  var descriptions = window.NC2000_JA_DESCRIPTIONS;
  if (!descriptions || !descriptions.moves || !descriptions.items) {
    throw new Error('NC2000 Japanese description dictionary is not loaded.');
  }

  var sections = {
    pokemon: names.pokemon,
    move: names.moves,
    item: names.items,
  };
  var reverse = {
    pokemon: Object.create(null),
    move: Object.create(null),
    item: Object.create(null),
  };

  function normalizeJapanese(text) {
    text = String(text || '');
    if (text.normalize) text = text.normalize('NFKC');
    // Match hiragana and katakana input consistently. Long vowel marks and
    // punctuation are intentionally preserved because they are name-significant.
    text = text.replace(/[\u30A1-\u30F6]/g, function (ch) {
      return String.fromCharCode(ch.charCodeAt(0) - 0x60);
    });
    return text.toLowerCase().replace(/[\s\u3000]+/g, '');
  }

  function hasJapaneseText(text) {
    return /[^\x00-\x7f]/.test(String(text || ''));
  }

  function getEntity(dex, type, name) {
    if (!dex) return null;
    if (type === 'pokemon') return dex.species.get(name);
    if (type === 'move') return dex.moves.get(name);
    if (type === 'item') return dex.items.get(name);
    return null;
  }

  function entityIsAvailableInGeneration(entity, dex) {
    if (!entity || !entity.exists) return false;
    if (entity.gen && dex && dex.gen && entity.gen > dex.gen) return false;
    return true;
  }

  Object.keys(sections).forEach(function (type) {
    var table = sections[type];
    Object.keys(table).forEach(function (english) {
      var key = normalizeJapanese(table[english]);
      if (!reverse[type][key]) reverse[type][key] = [];
      reverse[type][key].push(english);
    });
  });

  function displayName(type, english) {
    if (!english || !sections[type]) return english || '';
    if (sections[type][english]) return sections[type][english];

    // Showdown stores typed Hidden Power as "Hidden Power Ice", while team
    // export can contain "Hidden Power [Ice]". The dictionary supports both.
    if (type === 'move' && english.indexOf('Hidden Power ') === 0) {
      var bracketed = english.replace(/^Hidden Power (.+)$/, 'Hidden Power [$1]');
      if (sections.move[bracketed]) return sections.move[bracketed];
    }
    return english;
  }

  function resolveName(type, input, dex) {
    if (!sections[type] || !hasJapaneseText(input)) return null;
    var candidates = reverse[type][normalizeJapanese(input)];
    if (!candidates || !candidates.length) return null;

    for (var i = 0; i < candidates.length; i++) {
      var entity = getEntity(dex, type, candidates[i]);
      if (entityIsAvailableInGeneration(entity, dex)) return entity.name;
    }
    return null;
  }

  function japaneseSearchResults(search, type, rawQuery) {
    var query = normalizeJapanese(rawQuery);
    if (!query) return [];

    var typedSearch = search.typedSearch;
    if (!typedSearch) return [];

    // This initializes the stock legality map using the exact same format/gen
    // rules as the normal Teambuilder search. We do not replace those rules.
    var stockResults = typedSearch.getResults(search.filters, search.sortCol, search.reverseSort) || [];
    var filteredIds = null;
    if (search.filters && search.filters.length) {
      filteredIds = Object.create(null);
      for (var r = 0; r < stockResults.length; r++) {
        if (stockResults[r][0] === type) filteredIds[stockResults[r][1]] = true;
      }
    }

    var table = sections[type];
    var seen = Object.create(null);
    var legal = [];
    var illegal = [];
    Object.keys(table).forEach(function (english) {
      var japanese = table[english];
      if (normalizeJapanese(japanese).indexOf(query) !== 0) return;

      var entity = getEntity(search.dex, type, english);
      if (!entityIsAvailableInGeneration(entity, search.dex)) return;
      var id = entity.id || toID(entity.name);
      if (!id || seen[id]) return;
      if (filteredIds && !filteredIds[id]) return;
      seen[id] = true;

      var row = [type, id];
      if (typedSearch.illegalReasons && Object.prototype.hasOwnProperty.call(typedSearch.illegalReasons, id)) {
        illegal.push(row);
      } else {
        legal.push(row);
      }
    });

    function compareRows(a, b) {
      var aEntity = getEntity(search.dex, type, a[1]);
      var bEntity = getEntity(search.dex, type, b[1]);
      var aName = normalizeJapanese(displayName(type, aEntity && aEntity.name || a[1]));
      var bName = normalizeJapanese(displayName(type, bEntity && bEntity.name || b[1]));
      if (aName < bName) return -1;
      if (aName > bName) return 1;
      return String(a[1]).localeCompare(String(b[1]));
    }
    legal.sort(compareRows);
    illegal.sort(compareRows);

    var header = type === 'pokemon' ? 'ポケモン' : type === 'move' ? '技' : '道具';
    var out = [];
    if (legal.length) out.push(['header', header]);
    Array.prototype.push.apply(out, legal);
    if (illegal.length) {
      out.push(['header', '使用不可']);
      Array.prototype.push.apply(out, illegal);
    }
    return out;
  }

  function escapeHTML(text) {
    return String(text == null ? '' : text)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function replaceSpanContents(html, className, text) {
    var pattern = new RegExp('(<span class="' + className + '">)[\\s\\S]*?(<\\/span>)');
    return html.replace(pattern, '$1' + escapeHTML(text) + '$2');
  }

  window.NC2000_JA = {
    normalize: normalizeJapanese,
    displayName: displayName,
    resolveName: resolveName,
  };

  if (typeof DexSearch !== 'undefined') {
    var originalFind = DexSearch.prototype.find;
    DexSearch.prototype.find = function (query) {
      var rawQuery = String(query || '').trim();
      var type = this.typedSearch && this.typedSearch.searchType;
      if (
        rawQuery && hasJapaneseText(rawQuery) &&
        (type === 'pokemon' || type === 'move' || type === 'item')
      ) {
        var queryKey = '\u0000ja:' + type + ':' + normalizeJapanese(rawQuery);
        if (this.query === queryKey && this.results) return false;
        this.query = queryKey;
        this.exactMatch = false;
        this.results = japaneseSearchResults(this, type, rawQuery);
        this.selection = this.getFirstResultIndex();
        return true;
      }
      return originalFind.call(this, query);
    };
  }

  if (typeof TeamEditorState !== 'undefined') {
    var originalNormalizeField = TeamEditorState.prototype.normalizeField;
    TeamEditorState.prototype.normalizeField = function (type, value) {
      if (type === 'pokemon' || type === 'move' || type === 'item') {
        var resolved = resolveName(type, value, this.dex);
        if (resolved) value = resolved;
      }
      return originalNormalizeField.call(this, type, value);
    };

    var originalGetField = TeamEditorState.prototype.getField;
    TeamEditorState.prototype.getField = function (focus) {
      var value = originalGetField.call(this, focus);
      if (focus && (focus.type === 'pokemon' || focus.type === 'move' || focus.type === 'item')) {
        return displayName(focus.type, value);
      }
      return value;
    };
  }

  if (typeof TeamEditorForm !== 'undefined') {
    var originalRenderInput = TeamEditorForm.prototype.renderInput;
    TeamEditorForm.prototype.renderInput = function (setIndex, type, value, typeIndex, placeholder) {
      if (type === 'pokemon' || type === 'move' || type === 'item') {
        value = displayName(type, value || '');
      }
      return originalRenderInput.call(this, setIndex, type, value, typeIndex, placeholder);
    };

    var originalCommitField = TeamEditorForm.prototype.commitField;
    TeamEditorForm.prototype.commitField = function (target, selectNext, reverse) {
      var editor = this.props && this.props.editor;
      var focus = editor && editor.parseFocus(target.getAttribute('data-focus'));
      var result = originalCommitField.call(this, target, selectNext, reverse);
      if (
        focus && !target.classList.contains('incomplete') &&
        (focus.type === 'pokemon' || focus.type === 'move' || focus.type === 'item')
      ) {
        target.value = editor.getField(focus);
      }
      return result;
    };

    var originalTryDeleteEmptyMoveSlot = TeamEditorForm.prototype.tryDeleteEmptyMoveSlot;
    TeamEditorForm.prototype.tryDeleteEmptyMoveSlot = function (input) {
      var changed = originalTryDeleteEmptyMoveSlot.call(this, input);
      if (changed) {
        var editor = this.props && this.props.editor;
        var focus = editor && editor.parseFocus(input.getAttribute('data-focus'));
        if (focus) input.value = editor.getField(focus);
      }
      return changed;
    };
  }

  if (typeof PSSearchResults !== 'undefined') {
    var originalPokemonRow = PSSearchResults.prototype.renderPokemonRowHTML;
    PSSearchResults.prototype.renderPokemonRowHTML = function (index, id, matchStart, matchEnd, errorMessage) {
      var html = originalPokemonRow.call(this, index, id, matchStart, matchEnd, errorMessage);
      var pokemon = this.props.search.dex.species.get(id);
      if (pokemon && pokemon.exists) {
        html = replaceSpanContents(html, 'col pokemonnamecol', displayName('pokemon', pokemon.name));
      }
      return html;
    };

    var originalMoveRow = PSSearchResults.prototype.renderMoveRowHTML;
    PSSearchResults.prototype.renderMoveRowHTML = function (index, id, matchStart, matchEnd, errorMessage) {
      var html = originalMoveRow.call(this, index, id, matchStart, matchEnd, errorMessage);
      var moveId = id;
      if (moveId && moveId.charAt(0) === '_') moveId = moveId.slice(1).split('_')[1];
      if (moveId) {
        var move = this.props.search.dex.moves.get(moveId);
        if (move && move.exists) {
          html = replaceSpanContents(html, 'col movenamecol', displayName('move', move.name));
          if (descriptions.moves[move.id]) {
            html = replaceSpanContents(html, 'col movedesccol', descriptions.moves[move.id]);
          }
        }
      }
      return html;
    };

    var originalItemRow = PSSearchResults.prototype.renderItemRowHTML;
    PSSearchResults.prototype.renderItemRowHTML = function (index, id, matchStart, matchEnd, errorMessage) {
      var html = originalItemRow.call(this, index, id, matchStart, matchEnd, errorMessage);
      if (id) {
        var item = this.props.search.dex.items.get(id);
        if (item && item.exists) {
          html = replaceSpanContents(html, 'col namecol', displayName('item', item.name));
          if (descriptions.items[item.id]) {
            html = replaceSpanContents(html, 'col itemdesccol', descriptions.items[item.id]);
          }
        }
      }
      return html;
    };
  }
})();
