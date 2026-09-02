(function () {
  'use strict';

  if (window.NC2000_LOCALE !== 'ja') return;
  if (typeof BattlePanel === 'undefined' || !window.preact || !preact.h) return;

  var TARGET_FORMAT_ID = 'gen2nintendocup2000noohkostadium2strict';
  var original = BattlePanel.prototype.renderPlayerTeamPreviewControls;
  if (!original || original.__nc2000ReplayPrivatePatched) return;

  // Client-only UI state. The server-side marker remains the source of truth.
  // This map exists only to prevent repeat clicks/re-renders in the same client.
  var privateRequested = Object.create(null);

  function toId(text) {
    return String(text || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
  }

  function roomKey(room) {
    if (!room) return '';
    return String(room.roomid || room.id || (room.battle && room.battle.roomid) || '');
  }

  function appendChild(vnode, child) {
    if (!vnode || typeof vnode !== 'object') return vnode;
    var props = vnode.props || (vnode.props = {});
    var children = props.children;
    if (children == null) {
      props.children = [child];
    } else if (Array.isArray(children)) {
      props.children = children.concat([child]);
    } else {
      props.children = [children, child];
    }
    return vnode;
  }

  function markButtonPrivate(button) {
    if (!button) return;
    button.disabled = true;
    button.setAttribute('aria-disabled', 'true');
    button.removeAttribute('data-cmd');
    button.textContent = 'この対戦の日本語リプレイは非公開です';
    button.title = 'この対戦の公開リプレイは作成されません。';
  }

  function privacyControl(key) {
    var requested = !!privateRequested[key];
    var buttonProps = {
      class: 'button',
      title: requested ?
        'この対戦の公開リプレイは作成されません。' :
        'どちらか1人でも選択すると、この対戦の公開リプレイは作成されません。',
      disabled: requested,
      'aria-disabled': requested ? 'true' : 'false',
    };
    if (!requested) {
      buttonProps['data-cmd'] = '/nc2000replayprivate';
      buttonProps.onClick = function (event) {
        // Do not replace the normal data-cmd dispatch. Mark local state now so any
        // immediate Preact re-render stays disabled, then mutate the current DOM
        // button after this click finishes so the existing command handler gets
        // the first click unchanged.
        privateRequested[key] = true;
        var button = event && event.currentTarget;
        setTimeout(function () {
          markButtonPrivate(button);
        }, 0);
      };
    }

    return preact.h('div', {class: 'whatdo nc2000-replay-private-control'},
      preact.h('button', buttonProps,
        requested ? 'この対戦の日本語リプレイは非公開です' : '日本語リプレイを非公開にする'),
      preact.h('small', {style: 'margin-left:0.6em'},
        requested ? '※公開リプレイは作成されません' : '※一度非公開にすると戻せません')
    );
  }

  BattlePanel.prototype.renderPlayerTeamPreviewControls = function (request, choices, overlayVersion) {
    var out = original.apply(this, arguments);
    var room = this.props && this.props.room;
    var format = room && room.battle && (room.battle.tier || room.battle.format || room.format);
    if (toId(format) !== TARGET_FORMAT_ID) return out;
    return appendChild(out, privacyControl(roomKey(room)));
  };

  BattlePanel.prototype.renderPlayerTeamPreviewControls.__nc2000ReplayPrivatePatched = true;
})();
