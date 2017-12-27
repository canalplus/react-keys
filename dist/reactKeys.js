(function(e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t(require('React'), require('ReactDOM')))
    : 'function' == typeof define && define.amd
      ? define(['React', 'ReactDOM'], t)
      : 'object' == typeof exports
        ? (exports.ReactKeys = t(require('React'), require('ReactDOM')))
        : (e.ReactKeys = t(e.React, e.ReactDOM));
})('undefined' == typeof self ? this : self, function(e, t) {
  var n = Math.abs,
    r = String.fromCharCode;
  return (function(e) {
    function t(r) {
      if (n[r]) return n[r].exports;
      var i = (n[r] = { i: r, l: !1, exports: {} });
      return e[r].call(i.exports, i, i.exports, t), (i.l = !0), i.exports;
    }
    var n = {};
    return (
      (t.m = e),
      (t.c = n),
      (t.d = function(e, n, r) {
        t.o(e, n) ||
          Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: r,
          });
      }),
      (t.n = function(e) {
        var n =
          e && e.__esModule
            ? function() {
                return e['default'];
              }
            : function() {
                return e;
              };
        return t.d(n, 'a', n), n;
      }),
      (t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (t.p = ''),
      t((t.s = 21))
    );
  })([
    function(e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      const n = (t.NAME = '@@keys'),
        r = (t.C_UP = 'up'),
        i = (t.C_DOWN = 'down'),
        d = (t.C_LEFT = 'left'),
        o = (t.C_RIGHT = 'right'),
        l = (t.STRATEGY_MIRROR = 'mirror'),
        a = (t.STRATEGY_START = 'start'),
        s = (t.STRATEGY_MEMORY = 'memory'),
        p = (t.BINDER_TYPE = 'binder'),
        u = (t.CAROUSEL_TYPE = 'carousel'),
        c = (t.LONG_PRESS_TIMEOUT = 500),
        f = (t.DEBOUNCE_TIMEOUT = 10),
        g = (t.VERTICAL = 'vertical'),
        y = (t.NAVIGATION_CENTER = 'center'),
        m = (t.NAVIGATION_BOUND = 'bound');
    },
    function(e, t, n) {
      'use strict';
      function r(e) {
        (0, m.ensureKnownBinder)(e.id) &&
          (0, u.dispatch)({ type: E, binder: e });
      }
      function i(e, t, n) {
        if ((0, m.ensureKnownBinder)(e)) {
          const r = (0, c.findIdByStrategy)((0, u.getStore)(), e, t);
          (0, u.dispatch)({ type: k, binderId: e });
          const i = (0, h.findBinder)((0, u.getBinders)(), e);
          i && i.type === y.CAROUSEL_TYPE ? d(e, r, n) : o(e, r, n);
        }
      }
      function d(e, t) {
        if (!(0, m.ensureKnownBinder)(e)) return;
        const n = (0, h.findBinder)((0, u.getBinders)(), e),
          { elements: i, selectedId: d } = n;
        if (0 === i.length) return;
        const o = t || i[0].id,
          l = {
            id: e,
            selectedId: o,
            hasMoved: !0,
            prevEl: i.find(t => t.id === d),
            nextEl: i.find(t => t.id === o),
            prevDir: null,
          };
        r(l);
      }
      function o(e, t) {
        if (!(0, m.ensureKnownBinder)(e)) return;
        const n = (0, h.findBinder)((0, u.getBinders)(), e),
          { elements: i, selectedId: d } = n;
        if (0 === i.length) return;
        const o = t || i[0].id,
          l = (0, f.boundsMargin)(o, n, { visibilityOffset: 0 }),
          a = {
            id: e,
            selectedId: o,
            hasMoved: !0,
            prevEl: i.find(t => t.id === d),
            nextEl: i.find(t => t.id === o),
            prevDir: null,
            elements: l.elements,
            marginLeft: l.marginLeft,
            marginTop: l.marginTop,
          };
        r(a);
      }
      function l(e, t, n) {
        e && e.call(n, t || {});
      }
      function a(e, t) {
        e && ('string' == typeof e ? i(e) : e(t));
      }
      function s(e) {
        if ((0, m.ensureKnownBinder)(e)) {
          const { memory: t, prevDir: n } = (0, h.findBinder)(
            (0, u.getBinders)(),
            e
          );
          !t && n && r({ id: e, prevDir: null });
        }
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.UPDATE_PRESS_STATUS = t.ACTIVE_BINDER = t.REMOVE_BINDER = t.UPDATE_BINDER = t.MOUNT_BINDER = t.ADD_BINDER = void 0);
      var p =
        Object.assign ||
        function(e) {
          for (var t, n = 1; n < arguments.length; n++)
            for (var r in ((t = arguments[n]), t))
              Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          return e;
        };
      (t.addBinder = function(e, t) {
        return (0, m.isUnknownBinder)(e.id)
          ? void (0, u.dispatch)({
              type: b,
              binder:
                t === y.CAROUSEL_TYPE
                  ? (0, h.buildCarsouelFromProps)(e, t)
                  : (0, h.buildBinderFromProps)(e, t),
            })
          : void (0, u.dispatch)({
              type: _,
              binderId: e.id,
              priority: e.priority,
            });
      }),
        (t._updateBinder = r),
        (t._removeBinder = function(e, t = !1) {
          (0, u.dispatch)({ type: B, binderId: e, force: t });
        }),
        (t._activeBinder = i),
        (t._resetCarousel = d),
        (t._resetBinder = o),
        (t.updatePressStatus = function(e, t = null) {
          (0, u.getPress)().press !== e &&
            (0, u.dispatch)({ type: S, press: e, keyCode: t });
        }),
        (t.execCb = l),
        (t.enterTo = a),
        (t.determineNewState = function(e, t, n, i, d, o) {
          if ((0, m.ensureKnownBinder)(e)) {
            const { nextEl: c, prevEl: y, prevDir: m, elements: b } = (0,
            h.findBinder)((0, u.getBinders)(), e);
            if (c) {
              const _ = (0, g.calculateNewState)(n, c, y, m, b);
              if (_.hasMoved) {
                const n = (0, f.boundsMargin)(
                  _.nextEl.id,
                  (0, h.findBinder)((0, u.getBinders)(), e),
                  t
                );
                r(
                  p({}, _, {
                    id: e,
                    selectedId: _.nextEl.id,
                    elements: n.elements,
                    marginLeft: n.marginLeft,
                    marginTop: n.marginTop,
                  })
                ),
                  l(i, c, o);
              } else s(e), a(d);
            }
          }
        }),
        (t.resetFlipFlop = s);
      var u = n(3),
        c = n(29),
        f = n(14),
        g = n(5),
        y = n(0),
        m = n(17),
        h = n(2);
      const b = (t.ADD_BINDER = `${y.NAME}/ADD_BINDER`),
        _ = (t.MOUNT_BINDER = `${y.NAME}/MOUNT_BINDER`),
        E = (t.UPDATE_BINDER = `${y.NAME}/UPDATE_BINDER`),
        B = (t.REMOVE_BINDER = `${y.NAME}/REMOVE_BINDER`),
        k = (t.ACTIVE_BINDER = `${y.NAME}/ACTIVE_BINDER`),
        S = (t.UPDATE_PRESS_STATUS = `${y.NAME}/UPDATE_PRESS_STATUS`);
    },
    function(e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var n =
        Object.assign ||
        function(e) {
          for (var t, n = 1; n < arguments.length; n++)
            for (var r in ((t = arguments[n]), t))
              Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          return e;
        };
      const r = (t.findMountedId = e => {
          const t = i(e);
          return t ? t.id : void 0;
        }),
        i = (t.findMounted = e => e.find(e => e.mounted)),
        d = (t.findBinder = (e, t) => e.find(e => e.id === t)),
        o = (t.updateBinder = (e, t) => {
          const r = e.findIndex(e => e.id === t.id);
          return Object.assign([], e, { [r]: n({}, e[r], t) });
        }),
        l = (t.computeAddingBinder = (e, t) => {
          const n = a(e, t);
          return t.active ? s(n, t) : n;
        }),
        a = (t.addBinder = (e, t) => [...e, n({}, t, { sleep: !1 })]),
        s = (t.computeMountBinder = (e, t) =>
          p(e, t) ? u(e, t.id) : c(e, t.id)),
        p = (t.isBinderShouldMount = (e, t) => {
          const n = i(e);
          return !n || t.priority >= n.priority;
        }),
        u = (t.mountBinder = (e, t) =>
          e.map(e => {
            const r = n({}, e, { mounted: e.id === t });
            return (
              e.id === t && ((r.mountedTime = Date.now()), (r.sleep = !1)), r
            );
          })),
        c = (t.unsleepBinder = (e, t) =>
          e.map(
            e => (e.memory ? n({}, e, { sleep: e.id !== t && e.sleep }) : e)
          )),
        f = (t.computeRemoveBinder = (e, t, n) => {
          const r = g(e, t, n);
          return y(r) ? r : m(r);
        }),
        g = (t.removeBinder = (e, t, r = !1) => {
          const i = e.find(e => e.id === t);
          return i && (r || !i.memory)
            ? e.filter(e => e.id !== t)
            : e.map(e =>
                n({}, e, {
                  mounted: e.id !== t && e.mounted,
                  sleep: !(e.id !== t) || e.sleep,
                })
              );
        }),
        y = (t.hasMountedBinder = e => e.some(e => e.mounted)),
        m = (t.mountfreshestBinder = e => {
          const t = e.filter(e => !e.sleep);
          if (0 === t.length) return e;
          const n = t.filter(e => e.mountedTime),
            r =
              0 === n.length
                ? t.reduce((e, t) => (e.priority > t.priority ? e : t), t[0])
                : n.reduce(
                    (e, t) => (e.mountedTime > t.mountedTime ? e : t),
                    n[0]
                  );
          return (r.mounted = !0), u(e, r.id);
        }),
        h = (t.buildCurrent = (e, t) => {
          const n = i(e);
          return {
            binderId: n ? n.id : t.binderId,
            selectedId: n ? n.selectedId : t.selectedId,
          };
        }),
        b = (t.buildBinderFromProps = (e, t) => ({
          id: e.id,
          active: e.active,
          type: t,
          selector: e.selector,
          gap: e.gap,
          boundedGap: e.boundedGap,
          topGap: e.topGap,
          rightGap: e.rightGap,
          leftGap: e.leftGap,
          downGap: e.downGap,
          strategy: e.strategy,
          memory: e.memory,
          position: e.position,
          priority: e.priority,
          prevDir: e.prevDir,
          elements: [],
          hasMoved: !1,
          marginLeft: 0,
          marginTop: 0,
        })),
        _ = (t.buildCarsouelFromProps = (e, t) => ({
          id: e.id,
          type: t,
          active: e.active,
          circular: e.circular,
          size: e.size,
          index: e.index,
          memory: e.memory,
          priority: e.priority,
          elements: [],
        }));
    },
    function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.getPress = t.getBinders = t.dispatch = t.getStore = t.updateStore = t.globalStore = void 0);
      var r = n(0);
      let i = (t.globalStore = {
        dispatch: () => ({}),
        getState: () => ({ [r.NAME]: {} }),
      });
      const d = (t.updateStore = e => (t.globalStore = i = e)),
        o = (t.getStore = () => i.getState()[r.NAME]),
        l = (t.dispatch = e => i.dispatch(e)),
        a = (t.getBinders = () => i.getState()[r.NAME].binders),
        s = (t.getPress = () => i.getState()[r.NAME].PRESS);
    },
    function(e, t, n) {
      'use strict';
      function r(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function i(e, t, n = !1) {
        const r = (0, h.getStore)().current.binderId;
        _.forEach(i => {
          (i.context.uniqElement && i.context.props.id !== r) ||
            i.callback.call(i.context, e, t, n);
        });
      }
      function d(e) {
        B ||
          (e === I.enter
            ? setTimeout(() => i(e, !1, !0), 0)
            : setTimeout(() => i(e, !1), 0),
          (t.clicked = B = !0));
      }
      function o(e) {
        e === I.enter && setTimeout(() => i(e, !1), 0);
      }
      function l(n) {
        t.keysCopy = _ = [...b];
        const e = n.keyCode ? n.keyCode : n;
        c.default.isBlocked(e) ||
          (d(e),
          !E &&
            -1 !== T.indexOf(e) &&
            (t.pressTimeout = k = setTimeout(() => {
              S(e, 'long'), (0, p.updatePressStatus)(!0, e), (t.fired = E = !0);
            }, m.LONG_PRESS_TIMEOUT)),
          (0, h.getPress)().press && i(e, !0));
      }
      function a(n) {
        const e = n.keyCode ? n.keyCode : n;
        c.default.isBlocked(e) ||
          ((0, y.catcherWatcher)(e),
          S(e, 'short'),
          o(e),
          clearTimeout(k),
          (0, p.updatePressStatus)(!1),
          (t.fired = E = !1),
          (t.clicked = B = !1));
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.getConfig = t.availableForLongPress = t.userConfig = t.rkDebounce = t.eventCb = t.pressTimeout = t.clicked = t.fired = t.keysCopy = t.keysListeners = void 0);
      var s =
        Object.assign ||
        function(e) {
          for (var t, n = 1; n < arguments.length; n++)
            for (var r in ((t = arguments[n]), t))
              Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          return e;
        };
      (t.callListeners = i),
        (t.callTriggerClick = d),
        (t.releaseClickTouch = o),
        (t.cb = l),
        (t.cbRelease = a),
        (t._init = function(e) {
          e && e.store && (0, h.updateStore)(e.store),
            (t.rkDebounce = v =
              e && e.debounce ? e.debounce : m.DEBOUNCE_TIMEOUT),
            (t.eventCb = S = e && e.eventCb ? e.eventCb : () => ({})),
            (t.userConfig = I = e && e.config ? s({}, I, e.config) : I),
            (t.availableForLongPress = T =
              e && e.longPressTouch ? e.longPressTouch : T),
            e && (!e || e.bindkeys)
              ? e.bindkeys(l, a)
              : (document.addEventListener('keydown', l),
                document.addEventListener('keyup', a));
        }),
        (t.addListener = function(e, t) {
          const n = Math.random()
            .toString(36)
            .substring(2, 10);
          return b.unshift({ id: n, callback: e, context: t }), n;
        }),
        (t.removeListener = function(e) {
          return (t.keysListeners = b = b.filter(t => t.id !== e)), null;
        });
      var p = n(1),
        u = n(9),
        c = r(u),
        f = n(18),
        g = r(f),
        y = n(19),
        m = n(0),
        h = n(3);
      let b = (t.keysListeners = []),
        _ = (t.keysCopy = []),
        E = (t.fired = !1),
        B = (t.clicked = !1),
        k = (t.pressTimeout = null),
        S = (t.eventCb = null),
        v = (t.rkDebounce = m.DEBOUNCE_TIMEOUT),
        I = (t.userConfig = g.default),
        T = (t.availableForLongPress = f.AVAILABLE_FOR_LONG_PRESS);
      t.getConfig = () => I;
    },
    function(e, t, n) {
      'use strict';
      function r(e, t, n, r) {
        let i = !1,
          o = n,
          l = t,
          a = null;
        switch (e) {
          case d.C_UP:
            a = r === d.C_DOWN ? d.C_UP : null;
            break;
          case d.C_RIGHT:
            a = r === d.C_LEFT ? d.C_RIGHT : null;
            break;
          case d.C_DOWN:
            a = r === d.C_UP ? d.C_DOWN : null;
            break;
          case d.C_LEFT:
            a = r === d.C_RIGHT ? d.C_LEFT : null;
            break;
          default:
        }
        if (a) {
          i = !0;
          (o = t), (l = n);
        } else a = r;
        return { hasMoved: i, nextEl: l, prevEl: o, prevDir: a };
      }
      var i = Math.max;
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.calculateElSpace = function(e) {
          if (e) {
            const {
              left: t,
              top: n,
              width: r,
              height: i,
            } = e.getBoundingClientRect();
            return {
              id: e.id,
              width: r,
              height: i,
              left: t,
              top: n,
              down: n + i,
              right: t + r,
            };
          }
        }),
        (t.downLimit = function(e) {
          return i.apply(null, e.map(e => e.coords.down));
        }),
        (t.rightLimit = function(e) {
          return i.apply(null, e.map(e => e.coords.right));
        }),
        (t.getCurrentChildren = function(e, t) {
          return [].slice.call(e.querySelectorAll(t));
        }),
        (t.getDomElement = function(e) {
          return document.getElementById(e);
        }),
        (t.hasElementsDiff = function(e, t) {
          if (0 === e.length) return !1;
          if (0 === t.length || t.length !== e.length) return !0;
          let n = !1,
            r = 0;
          for (const i = Math.min(e.length, t.length); r < i && !n; ) {
            const i = e[r].id || e[r].props.id,
              d = t[r].id || t[r].props.id;
            (n = i !== d), r++;
          }
          return n;
        }),
        (t.hasWrapperDiff = function(e, t, n) {
          if (!e || !t) return !1;
          return 'horizontal' === n
            ? e.width !== t.width || e.height !== t.height || e.left !== t.left
            : 'vertical' === n
              ? e.width !== t.width || e.height !== t.height || e.top !== t.top
              : e.width !== t.width ||
                e.height !== t.height ||
                e.top !== t.top ||
                e.left !== t.left;
        }),
        (t.flipflop = r),
        (t.calculateNewState = function(t, e, n, i, d) {
          let o = !1,
            l = e,
            a = n,
            s = i,
            p = r(t, e, n, i);
          if (!p.hasMoved) {
            const n = e;
            n[t] && (l = d.find(r => r.id === n[t])),
              l.id !== n.id && ((o = !0), (a = n), (s = t)),
              (p = { hasMoved: o, nextEl: l, prevEl: a, prevDir: s });
          }
          return p;
        });
      var d = n(0);
    },
    function(t) {
      t.exports = e;
    },
    function(e) {
      function t() {
        throw new Error('setTimeout has not been defined');
      }
      function n() {
        throw new Error('clearTimeout has not been defined');
      }
      function r(e) {
        if (s === setTimeout) return setTimeout(e, 0);
        if ((s === t || !s) && setTimeout)
          return (s = setTimeout), setTimeout(e, 0);
        try {
          return s(e, 0);
        } catch (t) {
          try {
            return s.call(null, e, 0);
          } catch (t) {
            return s.call(this, e, 0);
          }
        }
      }
      function i(e) {
        if (p === clearTimeout) return clearTimeout(e);
        if ((p === n || !p) && clearTimeout)
          return (p = clearTimeout), clearTimeout(e);
        try {
          return p(e);
        } catch (t) {
          try {
            return p.call(null, e);
          } catch (t) {
            return p.call(this, e);
          }
        }
      }
      function d() {
        g &&
          c &&
          ((g = !1), c.length ? (f = c.concat(f)) : (y = -1), f.length && o());
      }
      function o() {
        if (!g) {
          var e = r(d);
          g = !0;
          for (var t = f.length; t; ) {
            for (c = f, f = []; ++y < t; ) c && c[y].run();
            (y = -1), (t = f.length);
          }
          (c = null), (g = !1), i(e);
        }
      }
      function l(e, t) {
        (this.fun = e), (this.array = t);
      }
      function a() {}
      var s,
        p,
        u = (e.exports = {});
      (function() {
        try {
          s = 'function' == typeof setTimeout ? setTimeout : t;
        } catch (n) {
          s = t;
        }
        try {
          p = 'function' == typeof clearTimeout ? clearTimeout : n;
        } catch (t) {
          p = n;
        }
      })();
      var c,
        f = [],
        g = !1,
        y = -1;
      (u.nextTick = function(e) {
        var t = Array(arguments.length - 1);
        if (1 < arguments.length)
          for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        f.push(new l(e, t)), 1 !== f.length || g || r(o);
      }),
        (l.prototype.run = function() {
          this.fun.apply(null, this.array);
        }),
        (u.title = 'browser'),
        (u.browser = !0),
        (u.env = {}),
        (u.argv = []),
        (u.version = ''),
        (u.versions = {}),
        (u.on = a),
        (u.addListener = a),
        (u.once = a),
        (u.off = a),
        (u.removeListener = a),
        (u.removeAllListeners = a),
        (u.emit = a),
        (u.prependListener = a),
        (u.prependOnceListener = a),
        (u.listeners = function() {
          return [];
        }),
        (u.binding = function() {
          throw new Error('process.binding is not supported');
        }),
        (u.cwd = function() {
          return '/';
        }),
        (u.chdir = function() {
          throw new Error('process.chdir is not supported');
        }),
        (u.umask = function() {
          return 0;
        });
    },
    function(e, t, n) {
      (function(t) {
        if ('production' !== t.env.NODE_ENV) {
          var r =
              ('function' == typeof Symbol &&
                Symbol.for &&
                Symbol.for('react.element')) ||
              60103,
            i = function(e) {
              return 'object' == typeof e && null !== e && e.$$typeof === r;
            };
          e.exports = n(24)(i, !0);
        } else e.exports = n(27)();
      }.call(t, n(7)));
    },
    function(e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      t.default = new class {
        constructor() {
          (this.blockedStuff = []),
            (this.generalBlock = !1),
            (this.block = this.block.bind(this)),
            (this.unblock = this.unblock.bind(this)),
            (this.blockExcept = this.blockExcept.bind(this)),
            (this.unblockExcept = this.unblockExcept.bind(this)),
            (this.isBlocked = this.isBlocked.bind(this));
        }
        block() {
          this.blockedStuff = [];
          const e = Array.prototype.slice.call(arguments);
          0 < e.length
            ? ((this.generalBlock = !1),
              e.forEach(e => {
                e instanceof Array
                  ? ((this.blockedStuff = this.blockedStuff.concat(e)),
                    (this.blockedStuff = [...new Set(this.blockedStuff)]))
                  : -1 === this.blockedStuff.indexOf(e) &&
                    this.blockedStuff.push(e);
              }))
            : (this.generalBlock = !0);
        }
        blockExcept() {
          (this.generalBlock = !0), (this.blockedStuff = []);
          const e = Array.prototype.slice.call(arguments);
          e.forEach(e => {
            e instanceof Array
              ? ((this.blockedStuff = this.blockedStuff.concat(e)),
                (this.blockedStuff = [...new Set(this.blockedStuff)]))
              : -1 === this.blockedStuff.indexOf(e) &&
                this.blockedStuff.push(e);
          });
        }
        unblockExcept() {
          this.generalBlock = !1;
          const e = Array.prototype.slice.call(arguments);
          if (0 < e.length) this.block(...e);
          else
            throw new Error(
              'unblockExcept need at least on arg, maybe you want to just unblock()'
            );
        }
        unblock() {
          this.generalBlock = !1;
          const e = Array.prototype.slice.call(arguments);
          0 < e.length
            ? e.forEach(e => {
                e instanceof Array
                  ? e.forEach(e => {
                      -1 !== this.blockedStuff.indexOf(e) &&
                        this.blockedStuff.splice(
                          this.blockedStuff.indexOf(e),
                          1
                        );
                    })
                  : -1 !== this.blockedStuff.indexOf(e) &&
                    this.blockedStuff.splice(this.blockedStuff.indexOf(e), 1);
              })
            : (this.blockedStuff = []);
        }
        isBlocked(e) {
          return (
            (!this.generalBlock && -1 !== this.blockedStuff.indexOf(e)) ||
            (this.generalBlock && -1 === this.blockedStuff.indexOf(e))
          );
        }
        getStuff() {
          return this.blockedStuff;
        }
        isGeneralBlocked() {
          return this.generalBlock;
        }
      }();
    },
    function(e) {
      'use strict';
      function t(e) {
        return function() {
          return e;
        };
      }
      var n = function() {};
      (n.thatReturns = t),
        (n.thatReturnsFalse = t(!1)),
        (n.thatReturnsTrue = t(!0)),
        (n.thatReturnsNull = t(null)),
        (n.thatReturnsThis = function() {
          return this;
        }),
        (n.thatReturnsArgument = function(e) {
          return e;
        }),
        (e.exports = n);
    },
    function(e, t, n) {
      'use strict';
      (function(t) {
        var n = function() {};
        'production' !== t.env.NODE_ENV &&
          (n = function(e) {
            if (e === void 0)
              throw new Error('invariant requires an error message argument');
          }),
          (e.exports = function(t, r, i, o, l, a, d, e) {
            if ((n(r), !t)) {
              var s;
              if (void 0 === r)
                s = new Error(
                  'Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.'
                );
              else {
                var p = [i, o, l, a, d, e],
                  u = 0;
                (s = new Error(
                  r.replace(/%s/g, function() {
                    return p[u++];
                  })
                )),
                  (s.name = 'Invariant Violation');
              }
              throw ((s.framesToPop = 1), s);
            }
          });
      }.call(t, n(7)));
    },
    function(e) {
      'use strict';
      e.exports = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
    },
    function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.block = function(e = r.rkDebounce) {
          (i = !0), setTimeout(() => (i = !1), e);
        }),
        (t.isBlocked = function() {
          return i;
        });
      var r = n(4);
      let i = !1;
    },
    function(e, t, n) {
      'use strict';
      function r(e, t) {
        let n = 'equal',
          r = 'equal';
        return (
          e.left > t.left ? (r = 'left') : e.left < t.left && (r = 'right'),
          e.top > t.top ? (n = 'top') : e.top < t.top && (n = 'down'),
          { vertical: n, horizontal: r }
        );
      }
      function i(e, t, n) {
        return t.top >= e.top + n;
      }
      function d(e, t, n) {
        return e.down >= t.down + n;
      }
      function o(e, t, n) {
        return t.left >= e.left + n;
      }
      function l(e, t, n) {
        return e.right >= t.right + n;
      }
      function a(e, t) {
        return i(e, t, 0) && d(e, t, 0);
      }
      function s(e, t) {
        return o(e, t, 0) && l(e, t, 0);
      }
      function p(e, t, n, r, i) {
        const { top: d } = t.coords,
          o = r || i,
          l = 0 > d - (e.top + o),
          a = d - (l ? o : n),
          s = a - e.top;
        return 0 > s && !l ? 0 : -s;
      }
      function u(e, t, n, r, i, d) {
        const { down: o } = t.coords,
          l = i || d,
          a = o + l > r,
          s = o + (a ? l : n);
        return s > r && !a ? -(r - e.down) : -(s - e.down);
      }
      function c(e, t, n, r, i, d) {
        const { right: o } = t.coords,
          l = i || d,
          a = o + l > r,
          s = o + (a ? l : n);
        return s > r && !a ? -(r - e.right) : -(s - e.right);
      }
      function f(e, t, n, r, i) {
        const { left: d } = t.coords,
          o = r || i,
          l = 0 > d - (e.left + o),
          a = d - (l ? o : n),
          s = a - e.left;
        return 0 > s && !l ? 0 : -s;
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var g =
        Object.assign ||
        function(e) {
          for (var t, n = 1; n < arguments.length; n++)
            for (var r in ((t = arguments[n]), t))
              Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          return e;
        };
      (t.correctBoundsMargin = function(e, t) {
        const {
            wrapper: n,
            elements: r,
            marginLeft: i,
            marginTop: d,
            gap: o,
            boundedGap: l,
            topGap: u,
            leftGap: c,
          } = t,
          g = r.find(t => t.id === e),
          m = (0, y.calculateElSpace)(document.getElementById(e));
        return {
          marginLeft: s(n, m) ? i : f(n, g, o, l, c),
          marginTop: a(n, m) ? d : p(n, g, o, l, u),
        };
      }),
        (t.boundsMargin = function(e, t, n) {
          const {
            wrapper: a,
            elements: s,
            marginLeft: h,
            marginTop: b,
            downLimit: _,
            rightLimit: E,
            gap: B,
            boundedGap: k,
            topGap: S,
            rightGap: v,
            leftGap: I,
            downGap: T,
            selectedId: C,
          } = t;
          let P = h,
            O = b,
            R = s;
          if (!n || C === e)
            return { marginLeft: P, marginTop: O, elements: R };
          const x = document.getElementById(C),
            N = document.getElementById(e);
          if (!x || !N || !a)
            return { marginLeft: P, marginTop: O, elements: R };
          const w = s.find(t => t.id === e),
            M = (0, y.calculateElSpace)(x),
            L = (0, y.calculateElSpace)(N),
            A = r(M, L);
          return (
            'left' !== A.horizontal || o(a, L, B)
              ? ('right' === A.horizontal || 'equal' === A.horizontal) &&
                !l(a, L, B) &&
                (P = c(a, w, B, E, k, v))
              : (P = f(a, w, B, k, I)),
            'top' !== A.vertical || i(a, L, B)
              ? ('down' === A.vertical || 'equal' === A.horizontal) &&
                !d(a, L, B) &&
                (O = u(a, w, B, _, k, T, b))
              : (O = p(a, w, B, k, S)),
            (h !== P || b !== O) &&
              (R = s.map(e =>
                g({}, e, {
                  isVisible: (0, m.isVisible)(
                    a,
                    e.coords,
                    P,
                    O,
                    n.visibilityOffset
                  ),
                })
              )),
            { marginLeft: P, marginTop: O, elements: R }
          );
        }),
        (t.determineGeo = r),
        (t.isInsideTop = i),
        (t.isInsideDown = d),
        (t.isInsideLeft = o),
        (t.isInsideRight = l),
        (t.isVerticalInside = a),
        (t.isHorizontalInside = s),
        (t.calculMarginOnTop = p),
        (t.calculMarginOnDown = u),
        (t.calculMarginOnRight = c),
        (t.calculMarginOnLeft = f);
      var y = n(5),
        m = n(16);
    },
    function(e, t, n) {
      'use strict';
      (function(t) {
        var r = n(10),
          i = r;
        if ('production' !== t.env.NODE_ENV) {
          var d = function(e) {
            for (
              var t = arguments.length, n = Array(1 < t ? t - 1 : 0), r = 1;
              r < t;
              r++
            )
              n[r - 1] = arguments[r];
            var i = 0,
              d =
                'Warning: ' +
                e.replace(/%s/g, function() {
                  return n[i++];
                });
            'undefined' != typeof console && void 0;
            try {
              throw new Error(d);
            } catch (e) {}
          };
          i = function(e, t) {
            if (t === void 0)
              throw new Error(
                '`warning(condition, format, ...args)` requires a warning message argument'
              );
            if (0 !== t.indexOf('Failed Composite propType: ') && !e) {
              for (
                var n = arguments.length, r = Array(2 < n ? n - 2 : 0), i = 2;
                i < n;
                i++
              )
                r[i - 2] = arguments[i];
              d.apply(void 0, [t].concat(r));
            }
          };
        }
        e.exports = i;
      }.call(t, n(7)));
    },
    function(e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      const n = (t.insideHorizontal = (e, t, n, r) =>
          e.left - r - n <= t.left && e.right + r - n >= t.right),
        r = (t.insideRight = (e, t, n, r) =>
          e.left - r - n >= t.left && e.left - r - n <= t.right),
        i = (t.insideLeft = (e, t, n, r) =>
          e.right + r - n >= t.left && e.right + r - n <= t.right),
        d = (t.isHorizontalVisible = (e, t, d = 0, o = 0) =>
          n(e, t, d, o) || r(e, t, d, o) || i(e, t, d, o)),
        o = (t.insideVertical = (e, t, n, r) =>
          e.top - r - n <= t.top && e.down + r - n >= t.down),
        l = (t.insideTop = (e, t, n, r) =>
          e.top - r - n >= t.top && e.top - r - n <= t.down),
        a = (t.insideDown = (e, t, n, r) =>
          e.down + r - n >= t.top && e.down + r - n <= t.down),
        s = (t.isVerticalVisible = (e, t, n = 0, r = 0) =>
          o(e, t, n, r) || l(e, t, n, r) || a(e, t, n, r)),
        p = (t.isVisible = (e, t, n, r, i) => d(e, t, n, i) && s(e, t, r, i));
    },
    function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.ensureState = function() {
          if (!(0, r.getStore)())
            throw new Error(`${i}keys state not present un global state`);
        }),
        (t.ensureKnownBinder = function(e) {
          return !!(0, r.getBinders)().some(t => e === t.id);
        }),
        (t.isUnknownBinder = function(e) {
          return !(0, r.getBinders)().some(t => e === t.id);
        });
      var r = n(3);
      const i = '[react-keys] - ';
    },
    function(e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = { left: 37, up: 38, right: 39, down: 40, enter: 13 });
      t.AVAILABLE_FOR_LONG_PRESS = [37, 38, 39, 40];
    },
    function(e, t, n) {
      'use strict';
      function i(e, t) {
        const n = Math.random()
          .toString(36)
          .substring(2, 10);
        return a.push({ id: n, sequence: e, cb: t, history: [] }), n;
      }
      function d(e) {
        a = a.filter(t => t.id !== e);
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.catcherWatcher = function(e) {
          const t = r(e);
          a.forEach(e => {
            (e.history += t),
              e.history.length > e.sequence.length &&
                (e.history = e.history.slice(1)),
              e.history.toUpperCase() === e.sequence.toUpperCase() &&
                ((e.history = []), e.cb());
          });
        }),
        (t.addCatcher = i),
        (t.removeCatcher = d);
      var o = n(6),
        l = (function(e) {
          return e && e.__esModule ? e : { default: e };
        })(o);
      let a = [];
      t.default = (e, t) => n =>
        class extends o.Component {
          componentDidMount() {
            const n = this.props;
            this.id = i(e, () => t.call(this, n));
          }
          componentWillUnmount() {
            d(this.id);
          }
          render() {
            return l.default.createElement(n, this.props);
          }
        };
    },
    function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.isActive = function({ id: e, active: t }) {
          return !!t && (0, i.findMountedId)((0, r.getBinders)()) === e;
        });
      var r = n(3),
        i = n(2);
    },
    function(e, t, n) {
      'use strict';
      function r(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t._blocks = t.unblockExcept = t.blockExcept = t.unblock = t.block = t.resetCarousel = t.removeBinder = t.resetBinder = t.updateBinder = t.activeBinder = t.catcher = t.isVisibleInBinder = t.isLongPress = t.getKeyCode = t.getCurrentBinderId = t.getCurrentBinder = t.getCurrentSelectedId = t.getBinderSelectedId = t.getBinderMarginTop = t.getBinderMarginLeft = t.getBinders = t.isBinderActive = t.isCurrentBinder = t.keysSelector = t.keysReducer = t.Catcher = t.Carousel = t.Binder = t.Keys = t.keysInit = t.config = void 0);
      var i = n(22),
        d = r(i),
        o = n(35),
        l = r(o),
        a = n(36),
        s = r(a),
        p = n(39),
        u = r(p),
        c = n(19),
        f = r(c),
        g = n(4),
        y = n(40),
        m = n(1),
        h = n(41),
        b = n(9),
        _ = r(b);
      const E = (t.config = g.getConfig),
        B = (t.keysInit = g._init),
        k = (t.Keys = l.default),
        S = (t.Binder = d.default),
        v = (t.Carousel = s.default),
        I = (t.Catcher = u.default),
        T = (t.keysReducer = y.reducer),
        C = (t.keysSelector = h._selector),
        P = (t.isCurrentBinder = h._isCurrentBinder),
        O = (t.isBinderActive = h._isBinderActive),
        R = (t.getBinders = h._getBinders),
        x = (t.getBinderMarginLeft = h._getBinderMarginLeft),
        N = (t.getBinderMarginTop = h._getBinderMarginTop),
        w = (t.getBinderSelectedId = h._getBinderSelectedId),
        M = (t.getCurrentSelectedId = h._getCurrentSelectedId),
        L = (t.getCurrentBinder = h._getCurrentBinder),
        A = (t.getCurrentBinderId = h._getCurrentBinderId),
        D = (t.getKeyCode = h._getKeyCode),
        U = (t.isLongPress = h._isLongPress),
        G = (t.isVisibleInBinder = h._isVisibleInBinder),
        V = (t.catcher = f.default),
        j = (t.activeBinder = m._activeBinder),
        q = (t.updateBinder = m._updateBinder),
        Y = (t.resetBinder = m._resetBinder),
        F = (t.removeBinder = e => (0, m._removeBinder)(e, !0)),
        K = (t.resetCarousel = m._resetCarousel),
        z = (t.block = _.default.block),
        W = (t.unblock = _.default.unblock),
        H = (t.blockExcept = _.default.blockExcept),
        $ = (t.unblockExcept = _.default.unblockExcept),
        X = (t._blocks = _.default);
    },
    function(e, t, n) {
      'use strict';
      function r(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var i = n(6),
        d = r(i),
        o = n(23),
        l = n(28),
        a = n(0),
        s = n(4),
        p = n(1),
        u = n(30),
        c = r(u),
        f = n(31);
      class g extends i.Component {
        constructor(e) {
          super(e),
            (this.uniqElement = !0),
            (this.innerProps = (0, c.default)(e)),
            (this.state = { mounted: !1 });
        }
        componentWillMount() {
          (this.listenerId = (0, s.addListener)(l.keysHandler, this)),
            (0, p.addBinder)(this.innerProps, a.BINDER_TYPE);
        }
        componentWillReceiveProps(e) {
          this.innerProps = (0, c.default)(e);
        }
        componentDidMount() {
          this.setState({ mounted: !0 }),
            setTimeout(() => this.state.mounted && f.mountState.apply(this), 0);
        }
        componentDidUpdate() {
          f.refreshState.apply(this);
        }
        componentWillUnmount() {
          this.setState({ mounted: !1 }),
            (this.listenerId = (0, s.removeListener)(this.listenerId)),
            (0, p._removeBinder)(this.innerProps.id);
        }
        render() {
          const { id: e, children: t } = this.innerProps;
          return d.default.createElement('div', { id: e }, t);
        }
      }
      (g.propTypes = o.propTypes),
        (g.defaultProps = o.defaultProps),
        (t.default = g);
    },
    function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.defaultProps = t.propTypes = void 0);
      var r = n(8),
        i = (function(e) {
          return e && e.__esModule ? e : { default: e };
        })(r);
      const d = (t.propTypes = {
          id: i.default.string.isRequired,
          children: i.default.oneOfType([i.default.object, i.default.array]),
          selector: i.default.string,
          position: i.default.string,
          wrapper: i.default.string,
          filter: i.default.string,
          gap: i.default.number,
          boundedGap: i.default.number,
          topGap: i.default.number,
          rightGap: i.default.number,
          leftGap: i.default.number,
          downGap: i.default.number,
          visibilityOffset: i.default.number,
          strategy: i.default.string,
          refreshStrategy: i.default.string,
          memory: i.default.bool,
          active: i.default.bool,
          onRight: i.default.func,
          onLeft: i.default.func,
          onUp: i.default.func,
          onDown: i.default.func,
          onEnter: i.default.func,
          debounce: i.default.number,
          triggerClick: i.default.bool,
          longPress: i.default.bool,
          onLeftExit: i.default.oneOfType([i.default.string, i.default.func]),
          onRightExit: i.default.oneOfType([i.default.string, i.default.func]),
          onUpExit: i.default.oneOfType([i.default.string, i.default.func]),
          onDownExit: i.default.oneOfType([i.default.string, i.default.func]),
          priority: i.default.number,
          direction: i.default.string,
        }),
        o = (t.defaultProps = {
          selector: 'li',
          active: !0,
          strategy: 'none',
          refreshStrategy: 'first',
          memory: !1,
          filter: null,
          gap: 20,
          boundedGap: 0,
          topGap: 0,
          rightGap: 0,
          leftGap: 0,
          downGap: 0,
          visibilityOffset: 0,
          longPress: !0,
          triggerClick: !0,
          priority: 0,
        });
    },
    function(e, t, n) {
      'use strict';
      (function(t) {
        var r = n(10),
          i = n(11),
          d = n(15),
          o = n(25),
          l = n(12),
          a = n(26);
        e.exports = function(e, n) {
          function s(e) {
            var t = e && ((E && e[E]) || e[B]);
            if ('function' == typeof t) return t;
          }
          function p(e, t) {
            return e === t ? 0 !== e || 1 / e == 1 / t : e !== e && t !== t;
          }
          function u(e) {
            (this.message = e), (this.stack = '');
          }
          function c(e) {
            function r(r, s, p, c, f, g, y) {
              if (((c = c || k), (g = g || p), y !== l))
                if (n)
                  i(
                    !1,
                    'Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types'
                  );
                else if (
                  'production' !== t.env.NODE_ENV &&
                  'undefined' != typeof console
                ) {
                  var m = c + ':' + p;
                  !o[m] &&
                    3 > a &&
                    (d(
                      !1,
                      'You are manually calling a React.PropTypes validation function for the `%s` prop on `%s`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.',
                      g,
                      c
                    ),
                    (o[m] = !0),
                    a++);
                }
              return null == s[p]
                ? r
                  ? null === s[p]
                    ? new u(
                        'The ' +
                          f +
                          ' `' +
                          g +
                          '` is marked as required ' +
                          ('in `' + c + '`, but its value is `null`.')
                      )
                    : new u(
                        'The ' +
                          f +
                          ' `' +
                          g +
                          '` is marked as required in ' +
                          ('`' + c + '`, but its value is `undefined`.')
                      )
                  : null
                : e(s, p, c, f, g);
            }
            if ('production' !== t.env.NODE_ENV)
              var o = {},
                a = 0;
            var s = r.bind(null, !1);
            return (s.isRequired = r.bind(null, !0)), s;
          }
          function f(e) {
            return c(function(t, n, r, i, d) {
              var o = t[n],
                l = m(o);
              if (l !== e) {
                var a = h(o);
                return new u(
                  'Invalid ' +
                    i +
                    ' `' +
                    d +
                    '` of type ' +
                    ('`' + a + '` supplied to `' + r + '`, expected ') +
                    ('`' + e + '`.')
                );
              }
              return null;
            });
          }
          function g(t) {
            switch (typeof t) {
              case 'number':
              case 'string':
              case 'undefined':
                return !0;
              case 'boolean':
                return !t;
              case 'object':
                if (Array.isArray(t)) return t.every(g);
                if (null === t || e(t)) return !0;
                var n = s(t);
                if (n) {
                  var r,
                    i = n.call(t);
                  if (n !== t.entries) {
                    for (; !(r = i.next()).done; ) if (!g(r.value)) return !1;
                  } else
                    for (; !(r = i.next()).done; ) {
                      var d = r.value;
                      if (d && !g(d[1])) return !1;
                    }
                } else return !1;
                return !0;
              default:
                return !1;
            }
          }
          function y(e, t) {
            return (
              'symbol' === e ||
              'Symbol' === t['@@toStringTag'] ||
              ('function' == typeof Symbol && t instanceof Symbol)
            );
          }
          function m(e) {
            var t = typeof e;
            return Array.isArray(e)
              ? 'array'
              : e instanceof RegExp ? 'object' : y(t, e) ? 'symbol' : t;
          }
          function h(e) {
            if ('undefined' == typeof e || null === e) return '' + e;
            var t = m(e);
            if ('object' === t) {
              if (e instanceof Date) return 'date';
              if (e instanceof RegExp) return 'regexp';
            }
            return t;
          }
          function b(e) {
            var t = h(e);
            return 'array' === t || 'object' === t
              ? 'an ' + t
              : 'boolean' === t || 'date' === t || 'regexp' === t
                ? 'a ' + t
                : t;
          }
          function _(e) {
            return e.constructor && e.constructor.name ? e.constructor.name : k;
          }
          var E = 'function' == typeof Symbol && Symbol.iterator,
            B = '@@iterator',
            k = '<<anonymous>>',
            S = {
              array: f('array'),
              bool: f('boolean'),
              func: f('function'),
              number: f('number'),
              object: f('object'),
              string: f('string'),
              symbol: f('symbol'),
              any: (function() {
                return c(r.thatReturnsNull);
              })(),
              arrayOf: function(e) {
                return c(function(t, n, r, d, o) {
                  if ('function' != typeof e)
                    return new u(
                      'Property `' +
                        o +
                        '` of component `' +
                        r +
                        '` has invalid PropType notation inside arrayOf.'
                    );
                  var a = t[n];
                  if (!Array.isArray(a)) {
                    var s = m(a);
                    return new u(
                      'Invalid ' +
                        d +
                        ' `' +
                        o +
                        '` of type ' +
                        ('`' +
                          s +
                          '` supplied to `' +
                          r +
                          '`, expected an array.')
                    );
                  }
                  for (var p, c = 0; c < a.length; c++)
                    if (
                      ((p = e(a, c, r, d, o + '[' + c + ']', l)),
                      p instanceof Error)
                    )
                      return p;
                  return null;
                });
              },
              element: (function() {
                return c(function(t, n, r, i, d) {
                  var o = t[n];
                  if (!e(o)) {
                    var l = m(o);
                    return new u(
                      'Invalid ' +
                        i +
                        ' `' +
                        d +
                        '` of type ' +
                        ('`' +
                          l +
                          '` supplied to `' +
                          r +
                          '`, expected a single ReactElement.')
                    );
                  }
                  return null;
                });
              })(),
              instanceOf: function(e) {
                return c(function(t, n, r, i, d) {
                  if (!(t[n] instanceof e)) {
                    var o = e.name || k,
                      l = _(t[n]);
                    return new u(
                      'Invalid ' +
                        i +
                        ' `' +
                        d +
                        '` of type ' +
                        ('`' + l + '` supplied to `' + r + '`, expected ') +
                        ('instance of `' + o + '`.')
                    );
                  }
                  return null;
                });
              },
              node: (function() {
                return c(function(e, t, n, r, i) {
                  return g(e[t])
                    ? null
                    : new u(
                        'Invalid ' +
                          r +
                          ' `' +
                          i +
                          '` supplied to ' +
                          ('`' + n + '`, expected a ReactNode.')
                      );
                });
              })(),
              objectOf: function(e) {
                return c(function(t, n, r, i, d) {
                  if ('function' != typeof e)
                    return new u(
                      'Property `' +
                        d +
                        '` of component `' +
                        r +
                        '` has invalid PropType notation inside objectOf.'
                    );
                  var o = t[n],
                    a = m(o);
                  if ('object' !== a)
                    return new u(
                      'Invalid ' +
                        i +
                        ' `' +
                        d +
                        '` of type ' +
                        ('`' +
                          a +
                          '` supplied to `' +
                          r +
                          '`, expected an object.')
                    );
                  for (var s in o)
                    if (o.hasOwnProperty(s)) {
                      var p = e(o, s, r, i, d + '.' + s, l);
                      if (p instanceof Error) return p;
                    }
                  return null;
                });
              },
              oneOf: function(e) {
                return Array.isArray(e)
                  ? c(function(t, n, r, d, o) {
                      for (var l = t[n], a = 0; a < e.length; a++)
                        if (p(l, e[a])) return null;
                      var i = JSON.stringify(e);
                      return new u(
                        'Invalid ' +
                          d +
                          ' `' +
                          o +
                          '` of value `' +
                          l +
                          '` ' +
                          ('supplied to `' +
                            r +
                            '`, expected one of ' +
                            i +
                            '.')
                      );
                    })
                  : ('production' === t.env.NODE_ENV
                      ? void 0
                      : d(
                          !1,
                          'Invalid argument supplied to oneOf, expected an instance of array.'
                        ),
                    r.thatReturnsNull);
              },
              oneOfType: function(e) {
                if (!Array.isArray(e))
                  return (
                    'production' === t.env.NODE_ENV
                      ? void 0
                      : d(
                          !1,
                          'Invalid argument supplied to oneOfType, expected an instance of array.'
                        ),
                    r.thatReturnsNull
                  );
                for (var n, o = 0; o < e.length; o++)
                  if (((n = e[o]), 'function' != typeof n))
                    return (
                      d(
                        !1,
                        'Invalid argument supplied to oneOfType. Expected an array of check functions, but received %s at index %s.',
                        b(n),
                        o
                      ),
                      r.thatReturnsNull
                    );
                return c(function(t, n, r, d, o) {
                  for (var a, s = 0; s < e.length; s++)
                    if (((a = e[s]), null == a(t, n, r, d, o, l))) return null;
                  return new u(
                    'Invalid ' +
                      d +
                      ' `' +
                      o +
                      '` supplied to ' +
                      ('`' + r + '`.')
                  );
                });
              },
              shape: function(e) {
                return c(function(t, n, r, i, d) {
                  var o = t[n],
                    a = m(o);
                  if ('object' !== a)
                    return new u(
                      'Invalid ' +
                        i +
                        ' `' +
                        d +
                        '` of type `' +
                        a +
                        '` ' +
                        ('supplied to `' + r + '`, expected `object`.')
                    );
                  for (var s in e) {
                    var p = e[s];
                    if (p) {
                      var c = p(o, s, r, i, d + '.' + s, l);
                      if (c) return c;
                    }
                  }
                  return null;
                });
              },
              exact: function(e) {
                return c(function(t, n, r, i, d) {
                  var a = t[n],
                    s = m(a);
                  if ('object' !== s)
                    return new u(
                      'Invalid ' +
                        i +
                        ' `' +
                        d +
                        '` of type `' +
                        s +
                        '` ' +
                        ('supplied to `' + r + '`, expected `object`.')
                    );
                  var p = o({}, t[n], e);
                  for (var c in p) {
                    var f = e[c];
                    if (!f)
                      return new u(
                        'Invalid ' +
                          i +
                          ' `' +
                          d +
                          '` key `' +
                          c +
                          '` supplied to `' +
                          r +
                          '`.\nBad object: ' +
                          JSON.stringify(t[n], null, '  ') +
                          '\nValid keys: ' +
                          JSON.stringify(Object.keys(e), null, '  ')
                      );
                    var g = f(a, c, r, i, d + '.' + c, l);
                    if (g) return g;
                  }
                  return null;
                });
              },
            };
          return (
            (u.prototype = Error.prototype),
            (S.checkPropTypes = a),
            (S.PropTypes = S),
            S
          );
        };
      }.call(t, n(7)));
    },
    function(e) {
      'use strict';
      /*
object-assign
(c) Sindre Sorhus
@license MIT
*/ function t(e) {
        if (null === e || e === void 0)
          throw new TypeError(
            'Object.assign cannot be called with null or undefined'
          );
        return Object(e);
      }
      var n = Object.getOwnPropertySymbols,
        i = Object.prototype.hasOwnProperty,
        d = Object.prototype.propertyIsEnumerable;
      e.exports = (function() {
        try {
          if (!Object.assign) return !1;
          var e = new String('abc');
          if (((e[5] = 'de'), '5' === Object.getOwnPropertyNames(e)[0]))
            return !1;
          for (var t = {}, n = 0; 10 > n; n++) t['_' + r(n)] = n;
          var i = Object.getOwnPropertyNames(t).map(function(e) {
            return t[e];
          });
          if ('0123456789' !== i.join('')) return !1;
          var d = {};
          return (
            [
              'a',
              'b',
              'c',
              'd',
              'e',
              'f',
              'g',
              'h',
              'i',
              'j',
              'k',
              'l',
              'm',
              'n',
              'o',
              'p',
              'q',
              'r',
              's',
              't',
            ].forEach(function(e) {
              d[e] = e;
            }),
            'abcdefghijklmnopqrst' ===
              Object.keys(Object.assign({}, d)).join('')
          );
        } catch (e) {
          return !1;
        }
      })()
        ? Object.assign
        : function(e) {
            for (var r, o, l = t(e), a = 1; a < arguments.length; a++) {
              for (var s in ((r = Object(arguments[a])), r))
                i.call(r, s) && (l[s] = r[s]);
              if (n) {
                o = n(r);
                for (var p = 0; p < o.length; p++)
                  d.call(r, o[p]) && (l[o[p]] = r[o[p]]);
              }
            }
            return l;
          };
    },
    function(e, t, n) {
      'use strict';
      (function(t) {
        if ('production' !== t.env.NODE_ENV)
          var r = n(11),
            i = n(15),
            d = n(12),
            o = {};
        e.exports = function(e, n, l, a, s) {
          if ('production' !== t.env.NODE_ENV)
            for (var p in e)
              if (e.hasOwnProperty(p)) {
                var u;
                try {
                  r(
                    'function' == typeof e[p],
                    '%s: %s type `%s` is invalid; it must be a function, usually from the `prop-types` package, but received `%s`.',
                    a || 'React class',
                    l,
                    p,
                    typeof e[p]
                  ),
                    (u = e[p](n, p, a, l, null, d));
                } catch (e) {
                  u = e;
                }
                if (
                  (i(
                    !u || u instanceof Error,
                    '%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).',
                    a || 'React class',
                    l,
                    p,
                    typeof u
                  ),
                  u instanceof Error && !(u.message in o))
                ) {
                  o[u.message] = !0;
                  var c = s ? s() : '';
                  i(
                    !1,
                    'Failed %s type: %s%s',
                    l,
                    u.message,
                    null == c ? '' : c
                  );
                }
              }
        };
      }.call(t, n(7)));
    },
    function(e, t, n) {
      'use strict';
      var r = n(10),
        i = n(11),
        d = n(12);
      e.exports = function() {
        function e(e, t, n, r, o, l) {
          l === d ||
            i(
              !1,
              'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types'
            );
        }
        function t() {
          return e;
        }
        e.isRequired = e;
        var n = {
          array: e,
          bool: e,
          func: e,
          number: e,
          object: e,
          string: e,
          symbol: e,
          any: e,
          arrayOf: t,
          element: e,
          instanceOf: t,
          node: e,
          objectOf: t,
          oneOf: t,
          oneOfType: t,
          shape: t,
          exact: t,
        };
        return (n.checkPropTypes = r), (n.PropTypes = n), n;
      };
    },
    function(e, t, n) {
      'use strict';
      function r(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.performAction = void 0),
        (t.keysHandler = function(e, t, n) {
          const {
            id: r,
            onLeft: a,
            onLeftExit: u,
            onUp: y,
            onUpExit: m,
            onRight: h,
            onRightExit: b,
            onDown: _,
            onDownExit: E,
            onEnter: B,
            triggerClick: k,
          } = this.innerProps;
          if (this.listenerId) {
            const S = (0, i.findBinder)((0, d.getBinders)(), r);
            if (S) {
              if (
                n &&
                k &&
                (0, p.isActive)(this.innerProps) &&
                !(0, l.isBlocked)() &&
                !s.default.isBlocked(this.innerProps.id)
              )
                return void document.getElementById(S.nextEl.id).click();
              if (
                !n &&
                (0, p.isActive)(this.innerProps) &&
                !(0, l.isBlocked)() &&
                !s.default.isBlocked(this.innerProps.id) &&
                (!t || (t && this.innerProps.longPress))
              )
                switch (e) {
                  case c.default.left:
                    g(this.innerProps, o.C_LEFT, a, u);
                    break;
                  case c.default.up:
                    g(this.innerProps, o.C_UP, y, m);
                    break;
                  case c.default.right:
                    g(this.innerProps, o.C_RIGHT, h, b);
                    break;
                  case c.default.down:
                    g(this.innerProps, o.C_DOWN, _, E);
                    break;
                  case c.default.enter:
                    B && ((0, l.block)(), (0, f.execCb)(B, S.nextEl, this));
                    break;
                  default:
                }
            }
          }
        });
      var i = n(2),
        d = n(3),
        o = n(0),
        l = n(13),
        a = n(9),
        s = r(a),
        p = n(20),
        u = n(18),
        c = r(u),
        f = n(1);
      const g = (t.performAction = (e, t, n, r) => {
        (0, l.block)(e.debounce),
          (0, f.determineNewState)(e.id, e, t, n, r, void 0);
      });
    },
    function(e, t, r) {
      'use strict';
      function i(e, t, r, i) {
        const d = (0, l.getDomElement)(i.current.selectedId),
          o = d ? d.getBoundingClientRect()[r] : 0,
          a = (0, l.getCurrentChildren)((0, l.getDomElement)(e), t)
            .map(e => ({ id: e.id, diff: n(e.getBoundingClientRect()[r] - o) }))
            .sort((e, t) => e.diff - t.diff);
        return a[0].id;
      }
      function d(e, t, n) {
        const r = (0, l.getDomElement)(n),
          i = r.getBoundingClientRect()[t],
          d = (0, l.getCurrentChildren)(r, e)
            .map(e => ({ id: e.id, [t]: e.getBoundingClientRect()[t] - i }))
            .filter(e => 0 <= e[t])
            .sort((e, n) => e[t] - n[t]);
        return d[0].id;
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.findIdByStrategy = function(e, t, n = null) {
          if (n) return n;
          const r = (0, a.findBinder)(e.binders, t);
          if (r.type === o.CAROUSEL_TYPE) return r.selectedId;
          const {
              position: l,
              strategy: s,
              selectedId: p,
              selector: u,
              elements: c,
              memory: f,
            } = r,
            g = l === o.VERTICAL ? 'top' : 'left';
          return s === o.STRATEGY_MIRROR
            ? i(t, u, g, e)
            : s === o.STRATEGY_START ? d(u, g, t) : f ? p : c[0] && c[0].id;
        }),
        (t.findMirrorExitId = i),
        (t.findStartExitId = d);
      var o = r(0),
        l = r(5),
        a = r(2);
    },
    function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r =
          Object.assign ||
          function(e) {
            for (var t, n = 1; n < arguments.length; n++)
              for (var r in ((t = arguments[n]), t))
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e;
          },
        i = n(0);
      t.default = e => {
        let t = r({}, e);
        return (
          t.enterStrategy &&
            (t.enterStrategy === i.STRATEGY_MEMORY
              ? (t.memory = !0)
              : (t.strategy = t.enterStrategy),
            delete t.enterStrategy),
          t
        );
      };
    },
    function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.updateState = void 0);
      var r =
        Object.assign ||
        function(e) {
          for (var t, n = 1; n < arguments.length; n++)
            for (var r in ((t = arguments[n]), t))
              Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          return e;
        };
      (t.refreshState = function() {
        const e = d.default.findDOMNode(this),
          {
            id: t,
            filter: n,
            wrapper: r,
            selector: i,
            direction: p,
          } = this.innerProps,
          u = (0, o.findBinder)((0, l.getBinders)(), t);
        if (u) {
          const t = (0, a.calculateElSpace)(
              r ? document.querySelector(r) : document.body
            ),
            d = (0, s.createList)(e, i, n),
            o =
              (0, a.hasElementsDiff)(d, u.elements) ||
              ((0, a.hasWrapperDiff)(t, u.wrapper, p) && 0 < d.length);
          o && c(u, t, d, this.innerProps);
        }
      }),
        (t.mountState = function() {
          const e = d.default.findDOMNode(this),
            { id: t, filter: n, wrapper: r, selector: i } = this.innerProps,
            p = (0, o.findBinder)((0, l.getBinders)(), t);
          if (p) {
            const t = (0, a.calculateElSpace)(
                r ? document.querySelector(r) : document.body
              ),
              d = (0, s.createList)(e, i, n);
            c(p, t, d, this.innerProps);
          }
        });
      var i = n(32),
        d = (function(e) {
          return e && e.__esModule ? e : { default: e };
        })(i),
        o = n(2),
        l = n(3),
        a = n(5),
        s = n(33),
        p = n(1),
        u = n(34);
      const c = (t.updateState = (e, t, n, i) => {
        const { id: d, visibilityOffset: o, refreshStrategy: l } = i,
          c = (0, u.next)(n, e, l),
          f = {
            marginLeft: c.marginLeft,
            marginTop: c.marginTop,
            offset: o,
            wrapper: t,
          },
          g = (0, s.build)(n, f),
          y = g.find(e => e.id === c.selectedId),
          m = {
            id: d,
            wrapper: t,
            downLimit: (0, a.downLimit)(g),
            rightLimit: (0, a.rightLimit)(g),
            elements: g,
            prevDir: null,
          };
        (0, p._updateBinder)(r({}, m, c, { nextEl: y }));
      });
    },
    function(e) {
      e.exports = t;
    },
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.calculDowScore = t.calculUpScore = t.calculLeftScore = t.calculRightScore = t.elementSort = t.findElement = t.upArray = t.downArray = t.leftArray = t.rightArray = void 0);
      var i =
        Object.assign ||
        function(e) {
          for (var t, n = 1; n < arguments.length; n++)
            for (var r in ((t = arguments[n]), t))
              Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          return e;
        };
      (t.build = function(e, t) {
        const { wrapper: n, marginLeft: r, offset: c, marginTop: f } = t,
          g = e.map(d.calculateElSpace);
        return g.map(e => {
          const t = i({}, e, {
            right: e.right - r,
            left: e.left - r,
            top: e.top - f,
            down: e.down - f,
          });
          return {
            id: e.id,
            coords: t,
            left: u(a(e, g)),
            right: u(l(e, g)),
            up: u(p(e, g)),
            down: u(s(e, g)),
            isVisible: (0, o.isVisible)(n, t, r, f, c),
          };
        });
      }),
        (t.createList = function(e, t, n) {
          return [].slice
            .call(e.querySelectorAll(t))
            .filter(
              e => '' !== e.id && -1 === [].slice.call(e.classList).indexOf(n)
            );
        });
      var d = r(5),
        o = r(16);
      const l = (t.rightArray = (e, t) =>
          t.filter(t => e.right <= t.left).sort(c(e, f))),
        a = (t.leftArray = (e, t) =>
          t.filter(t => e.left >= t.right).sort(c(e, g))),
        s = (t.downArray = (e, t) =>
          t.filter(t => e.down <= t.top).sort(c(e, m))),
        p = (t.upArray = (e, t) =>
          t.filter(t => e.top >= t.down).sort(c(e, y))),
        u = (t.findElement = e => (e[0] ? e[0].id : void 0)),
        c = (t.elementSort = (e, t) => (n, r) => t(n, e) - t(r, e)),
        f = (t.calculRightScore = (e, t) =>
          n(e.top - t.top) + n(e.left - t.right)),
        g = (t.calculLeftScore = (e, t) =>
          n(e.top - t.top) + n(e.right - t.left)),
        y = (t.calculUpScore = (e, t) =>
          n(e.down - t.top) + n(e.left - t.left)),
        m = (t.calculDowScore = (e, t) =>
          n(e.top - t.down) + n(e.left - t.left));
    },
    function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.next = void 0);
      var r =
          Object.assign ||
          function(e) {
            for (var t, n = 1; n < arguments.length; n++)
              for (var r in ((t = arguments[n]), t))
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e;
          },
        i = n(14);
      const d = (t.next = (e, t, n) => {
          const { selectedId: d } = t;
          let a = {};
          if (l(e, d)) {
            a = e.find(t => t.id === d);
            const n = (0, i.correctBoundsMargin)(a.id, t);
            return r({ selectedId: a.id }, n);
          }
          if ('previous' === n && d) {
            const n = o(t.selectedId, t.elements, e),
              d = (0, i.correctBoundsMargin)(n.id, t);
            return r({ selectedId: n.id }, d);
          }
          return 0 < e.length
            ? ((a = e[0]), { selectedId: a.id, marginLeft: 0, marginTop: 0 })
            : { selectedId: void 0, marginLeft: 0, marginTop: 0 };
        }),
        o = (e, t, n, r = 0) => {
          const i = t.map(t => t.id).indexOf(e),
            d = 0 === i ? 0 : i - 1;
          return !l(n, t[d].id) && r < n.length
            ? o(t[d].id, t, n, r + 1)
            : n[d];
        },
        l = (e, t) => t !== void 0 && e.map(t => t.id).some(e => e === t);
    },
    function(e, t, n) {
      'use strict';
      function r(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var i = n(6),
        d = n(8),
        o = r(d),
        l = n(13),
        a = n(4),
        s = n(9),
        p = r(s),
        u = n(1);
      class c extends i.Component {
        static get propTypes() {
          return {
            children: o.default.oneOfType([o.default.object, o.default.array]),
            id: o.default.string.isRequired,
            debounce: o.default.number,
            active: o.default.bool,
          };
        }
        static get defaultProps() {
          return { active: !0 };
        }
        constructor(e) {
          super(e),
            (this.listenerId = (0, a.addListener)(this.keysHandler, this));
        }
        isActive() {
          return (
            this.props.active &&
            !(0, l.isBlocked)() &&
            !p.default.isBlocked(this.props.id)
          );
        }
        keysHandler(e, t, n) {
          if (!n && this.isActive())
            for (const t in a.userConfig) {
              const n = a.userConfig[t],
                r = t
                  .toLowerCase()
                  .replace(/\b[a-z](?=[a-z]{1})/g, e => e.toUpperCase());
              if (
                (Number.isInteger(n) && n === e) ||
                (Array.isArray(n) && -1 !== n.indexOf(e))
              ) {
                this.performAction(this.props[`on${r}`], e);
                break;
              }
            }
        }
        performAction(e, t) {
          const { debounce: n } = this.props;
          e && ((0, l.block)(n), (0, u.execCb)(e, t, this));
        }
        componentWillUnmount() {
          (0, a.removeListener)(this.listenerId);
        }
        render() {
          return this.props.children || null;
        }
      }
      t.default = c;
    },
    function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r =
          Object.assign ||
          function(e) {
            for (var t, n = 1; n < arguments.length; n++)
              for (var r in ((t = arguments[n]), t))
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e;
          },
        i = n(6),
        d = (function(e) {
          return e && e.__esModule ? e : { default: e };
        })(i),
        o = n(37),
        l = n(14),
        a = n(5),
        s = n(4),
        p = n(13),
        u = n(20),
        c = n(1),
        f = n(0),
        g = n(38);
      class y extends i.Component {
        constructor(e) {
          super(e),
            (this.uniqElement = !0),
            (this.timeout = null),
            (this.movingCountDown = () =>
              (this.timeout = setTimeout(
                () =>
                  (0, c._updateBinder)({
                    id: e.id,
                    moving: !1,
                    selectedId: this.selectedId,
                  }),
                e.speed
              ))),
            (this.state = { cursor: e.index, elements: [] });
        }
        componentWillMount() {
          (this.listenerId = (0, s.addListener)(this.keysHandler, this)),
            (0, c.addBinder)(this.props, f.CAROUSEL_TYPE),
            this.updateState(this.state.cursor, this.props.children);
        }
        componentWillUpdate({ index: e, children: t, updateIndex: n }) {
          if (
            (0, a.hasElementsDiff)(t, this.props.children) ||
            this.props.index !== e
          ) {
            const r = n ? e : this.state.cursor;
            this.updateState(r, t);
          }
        }
        componentWillUnmount() {
          (0, s.removeListener)(this.listenerId),
            (0, c._removeBinder)(this.props.id);
        }
        computeChildren(e) {
          let t = e;
          if (
            ('[object Array]' !== Object.prototype.toString.call(e) &&
              (t = [e]),
            0 === t.length)
          )
            return t;
          for (let n = 1; t.length <= this.props.size + 4; ) {
            const e = t.map(e => {
              const t = r({}, e.props, { id: e.props.id + '_' + n });
              return r({}, e, { props: t, key: e.props.id + '_' + n });
            });
            (t = t.concat(e)), n++;
          }
          return t;
        }
        keysHandler(e, t, n) {
          const {
              children: r,
              circular: i,
              onDownExit: d,
              onUpExit: l,
              onEnter: a,
              triggerClick: c,
              debounce: f,
            } = this.props,
            { cursor: g } = this.state;
          if (
            (n &&
              c &&
              (0, u.isActive)(this.props) &&
              !(0, p.isBlocked)() &&
              document.getElementById(r[g].props.id).click(),
            (0, u.isActive)(this.props) && !(0, p.isBlocked)())
          )
            switch (e) {
              case s.userConfig.left:
                if (!i && 0 === g) return;
                this.performAction((0, o.getPrev)(r.length, g));
                break;
              case s.userConfig.right:
                if (!i && g === r.length - 1) return;
                this.performAction((0, o.getNext)(r.length, g));
                break;
              case s.userConfig.down:
                this.performCallback(d);
                break;
              case s.userConfig.up:
                this.performCallback(l);
                break;
              case s.userConfig.enter:
                (0, p.block)(f), this.performCallback(a);
            }
        }
        isLeftMove(e, t, n) {
          return t < e || (0 === e && t === n.length - 1);
        }
        performAction(e) {
          const { debounce: t, onChange: n, children: r } = this.props;
          (0, p.block)(t),
            clearTimeout(this.timeout),
            this.updateState(e, r),
            this.movingCountDown(),
            (0, c.execCb)(n, this.selectedId, this);
        }
        updateState(e, t) {
          const n = this.computeChildren(t),
            { id: r, size: i, circular: d } = this.props;
          if (n[e]) {
            (this.selectedId = n[e].props.id),
              (0, c._updateBinder)({
                id: r,
                selectedId: this.selectedId,
                cursor: e,
                moving: !0,
              });
            const t = (0, o.build)(n, i + 4, e, d);
            this.setState({
              cursor: e,
              elements: t,
              gaps: this.determineGap(
                t,
                this.isLeftMove(this.state.cursor, e, t)
              ),
            });
          }
        }
        performCallback(e) {
          e && ((0, p.block)(), (0, c.enterTo)(e, this.selectedId));
        }
        determineGap(e, t) {
          const {
              navigation: n,
              id: r,
              elWidth: i,
              size: d,
              gap: o,
            } = this.props,
            { gaps: s } = this.state,
            p =
              s ||
              e.map(
                (e, t) => (t - (n === f.NAVIGATION_BOUND ? d - 1 : 2)) * i + o
              );
          if (n === f.NAVIGATION_BOUND) {
            const e = (0, a.calculateElSpace)(
              document.getElementById(this.selectedId)
            );
            if (!e) return p;
            const n = (0, a.calculateElSpace)(document.getElementById(r));
            return !t && (0, l.isInsideRight)(n, e, o)
              ? p.map(e => e + i)
              : t && (0, l.isInsideLeft)(n, e, o) ? p.map(e => e - i) : p;
          }
          return p;
        }
        render() {
          const {
              size: e,
              elWidth: t,
              childrenClassName: n,
              className: r,
              id: i,
            } = this.props,
            { elements: o, gaps: l } = this.state;
          return d.default.createElement(
            'div',
            {
              id: i,
              className: r,
              style: { overflow: 'hidden', position: 'absolute' },
            },
            o.map((r, i) => {
              if (r) {
                const o = l[i];
                return d.default.createElement(
                  'div',
                  {
                    id: r.props.id,
                    key: r.props.id,
                    className: n,
                    style: {
                      transform: `translateX(${o}px)`,
                      position: 'absolute',
                      width: `${t}px`,
                      display: 'block',
                      opacity: o === -(2 * t) || o === (e + 1) * t ? 0 : 1,
                    },
                  },
                  r
                );
              }
            })
          );
        }
      }
      (y.propTypes = g.propTypes),
        (y.defaultProps = g.defaultProps),
        (t.default = y);
    },
    function(e, t) {
      'use strict';
      function n(e, t, n = !0) {
        return n || (0 !== t && null !== t) ? (0 < t ? t - 1 : e - 1) : null;
      }
      function r(e, t, n = !0) {
        return n || (null !== t && t !== e - 1)
          ? t < e - 1 ? t + 1 : 0
          : null;
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.getPrev = n),
        (t.getNext = r),
        (t.build = function(e, t, i, d = !0) {
          const o = [e[i]],
            l = Math.floor(t / 2);
          let a = i,
            s = i;
          for (let p = 0; p < l; p++)
            (s = r(e.length, s, d)),
              (a = n(e.length, a, d)),
              (o[o.length] = null === s ? null : e[s]),
              o.unshift(null === a ? null : e[a]);
          return o;
        });
    },
    function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.defaultProps = t.propTypes = void 0);
      var r = n(8),
        i = (function(e) {
          return e && e.__esModule ? e : { default: e };
        })(r),
        d = n(0);
      const o = (t.propTypes = {
          children: i.default.oneOfType([i.default.object, i.default.array]),
          id: i.default.string.isRequired,
          active: i.default.bool,
          index: i.default.number,
          size: i.default.number,
          speed: i.default.number,
          priority: i.default.number,
          debounce: i.default.number,
          elWidth: i.default.number,
          navigation: i.default.string,
          memory: i.default.bool,
          circular: i.default.bool,
          triggerClick: i.default.bool,
          gap: i.default.number,
          className: i.default.string,
          childrenClassName: i.default.string,
          onChange: i.default.func,
          onDownExit: i.default.oneOfType([i.default.string, i.default.func]),
          onUpExit: i.default.oneOfType([i.default.string, i.default.func]),
          onEnter: i.default.func,
          updateIndex: i.default.bool,
        }),
        l = (t.defaultProps = {
          index: 0,
          size: 3,
          elWidth: 100,
          circular: !0,
          triggerClick: !0,
          memory: !1,
          active: !0,
          speed: 100,
          priority: 0,
          gap: 0,
          navigation: d.NAVIGATION_CENTER,
          debounce: 82,
          className: 'carousel',
          childrenClassName: 'carousel-child',
          updateIndex: !1,
        });
    },
    function(e, t, n) {
      'use strict';
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var d = n(6),
        o = i(d),
        l = n(8),
        a = i(l),
        s = n(4);
      class p extends d.Component {
        constructor(e) {
          super(e),
            (this.history = ''),
            (this.listenerId = (0, s.addListener)(this.keysHandler, this));
        }
        componentWillUnmount() {
          (0, s.removeListener)(this.listenerId);
        }
        render() {
          return this.props.children || null;
        }
        keysHandler(e) {
          (this.history += r(e)),
            this.history.length > this.props.sequence.length &&
              (this.history = this.history.slice(1)),
            this.history.toUpperCase() === this.props.sequence.toUpperCase() &&
              ((this.history = ''), this.props.cb());
        }
      }
      (p.propTypes = {
        sequence: a.default.string.isRequired,
        cb: a.default.func.isRequired,
        children: a.default.oneOfType([a.default.object, a.default.array]),
      }),
        (t.default = p);
    },
    function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.initialKeysSate = void 0);
      var r =
        Object.assign ||
        function(e) {
          for (var t, n = 1; n < arguments.length; n++)
            for (var r in ((t = arguments[n]), t))
              Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          return e;
        };
      t.reducer = function(e = o, t) {
        switch (t.type) {
          case i.ADD_BINDER: {
            let n = (0, d.computeAddingBinder)(e.binders, t.binder),
              i = (0, d.buildCurrent)(n, e.current);
            return r({}, e, { binders: n, current: i });
          }
          case i.MOUNT_BINDER: {
            let n = (0, d.findBinder)(e.binders, t.binderId);
            n.priority = t.priority;
            let i = (0, d.computeMountBinder)(e.binders, n),
              o = (0, d.buildCurrent)(i, e.current);
            return r({}, e, { binders: i, current: o });
          }
          case i.UPDATE_BINDER: {
            let n = (0, d.updateBinder)(e.binders, t.binder),
              i = (0, d.buildCurrent)(n, e.current);
            return r({}, e, { binders: n, current: i });
          }
          case i.REMOVE_BINDER: {
            let n = (0, d.computeRemoveBinder)(e.binders, t.binderId, t.force),
              i = (0, d.buildCurrent)(n, e.current);
            return r({}, e, { binders: n, current: i });
          }
          case i.ACTIVE_BINDER: {
            let n = (0, d.mountBinder)(e.binders, t.binderId),
              i = (0, d.buildCurrent)(n, e.current);
            return r({}, e, { binders: n, current: i });
          }
          case i.UPDATE_PRESS_STATUS:
            return r({}, e, { PRESS: { press: t.press, keyCode: t.keyCode } });
          case 'RESET_STATE':
            return o;
          default:
            return e;
        }
      };
      var i = n(1),
        d = n(2);
      const o = (t.initialKeysSate = {
        current: { binderId: null, selectedId: null },
        binders: [],
        PRESS: { press: !1 },
      });
    },
    function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t._isVisibleInBinder = t._isBinderActive = t._getBinderMarginTop = t._getBinderMarginLeft = t._getBinderSelectedId = t._isLongPress = t._getKeyCode = t._getCurrentBinderId = t._getCurrentBinder = t._getBinders = t._getCurrentSelectedId = t._isCurrentBinder = t._selector = void 0);
      var r = n(0),
        i = n(3),
        d = n(17),
        o = n(2);
      const l = (t._selector = e => () => {
          (0, d.ensureState)();
          const t = (0, o.findBinder)((0, i.getBinders)(), e);
          return t || { marginLeft: 0, marginTop: 0 };
        }),
        a = (t._isCurrentBinder = e => () => {
          (0, d.ensureState)();
          const t =
            (0, i.getStore)().current && (0, i.getStore)().current.binderId;
          return t === e;
        }),
        s = (t._getCurrentSelectedId = () => () => (
          (0, d.ensureState)(), (0, i.getStore)().current.selectedId
        )),
        p = (t._getBinders = () => () => (
          (0, d.ensureState)(), (0, i.getBinders)()
        )),
        u = (t._getCurrentBinder = () => () => {
          (0, d.ensureState)();
          const { binders: e, current: t } = i.globalStore.getState()[r.NAME];
          return (0, o.findBinder)(e, t.binderId);
        }),
        c = (t._getCurrentBinderId = () => () =>
          (0, i.getStore)().current.binderId),
        f = (t._getKeyCode = () => () => (
          (0, d.ensureState)(), (0, i.getStore)().PRESS.keyCode
        )),
        g = (t._isLongPress = () => () => (
          (0, d.ensureState)(), (0, i.getStore)().PRESS.press
        )),
        y = (t._getBinderSelectedId = e => () => {
          (0, d.ensureState)();
          const t = (0, o.findBinder)((0, i.getBinders)(), e);
          return t ? t.selectedId : '';
        }),
        m = (t._getBinderMarginLeft = e => () => {
          (0, d.ensureState)();
          const t = (0, o.findBinder)((0, i.getBinders)(), e);
          return t ? t.marginLeft : 0;
        }),
        h = (t._getBinderMarginTop = e => () => {
          (0, d.ensureState)();
          const t = (0, o.findBinder)((0, i.getBinders)(), e);
          return t ? t.marginTop : 0;
        }),
        b = (t._isBinderActive = e => () => {
          (0, d.ensureState)();
          const t = (0, o.findBinder)((0, i.getBinders)(), e);
          return t && t.mounted;
        }),
        _ = (t._isVisibleInBinder = (e, t) => () => {
          (0, d.ensureState)();
          const n = (0, o.findBinder)((0, i.getBinders)(), e);
          if (!n) return !1;
          const r = n.elements.find(e => e.id === t);
          return !!r && r.isVisible;
        });
    },
  ]);
});
