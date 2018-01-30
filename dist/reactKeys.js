(function(e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t(require('React'), require('ReactDOM')))
    : 'function' == typeof define && define.amd
      ? define(['React', 'ReactDOM'], t)
      : 'object' == typeof exports
        ? (exports.ReactKeys = t(require('React'), require('ReactDOM')))
        : (e.ReactKeys = t(e.React, e.ReactDOM));
})('undefined' == typeof self ? this : self, function(e, t) {
  var n = Math.floor,
    r = Math.abs,
    d = String.fromCharCode;
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
        s = (t.STRATEGY_START = 'start'),
        a = (t.STRATEGY_MEMORY = 'memory'),
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
        (0, y.ensureKnownBinder)(e.id) &&
          (0, p.dispatch)({ type: _, binder: e });
      }
      function i(e, t, n) {
        if ((0, y.ensureKnownBinder)(e)) {
          const r = (0, u.findIdByStrategy)((0, p.getStore)(), e, t),
            i = (0, m.findBinder)((0, p.getBinders)(), e),
            o = (0, m.computeResetBinder)(i, e, r) || { id: e };
          (0, p.dispatch)({ type: E, binder: o });
          const l = (0, m.findBinder)((0, p.getBinders)(), e);
          l && l.type === g.CAROUSEL_TYPE && d(e, r, n);
        }
      }
      function d(e, t) {
        if (!(0, y.ensureKnownBinder)(e)) return;
        const n = (0, m.findBinder)((0, p.getBinders)(), e),
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
      function o(e, t, n) {
        e && e.call(n, t || {});
      }
      function l(e, t) {
        e && ('string' == typeof e ? i(e) : e(t));
      }
      function s(e) {
        if ((0, y.ensureKnownBinder)(e)) {
          const { memory: t, prevDir: n } = (0, m.findBinder)(
            (0, p.getBinders)(),
            e
          );
          !t && n && r({ id: e, prevDir: null });
        }
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.UPDATE_PRESS_STATUS = t.ACTIVE_BINDER = t.REMOVE_BINDER = t.UPDATE_BINDER = t.MOUNT_BINDER = t.ADD_BINDER = void 0);
      var a =
        Object.assign ||
        function(e) {
          for (var t, n = 1; n < arguments.length; n++)
            for (var r in ((t = arguments[n]), t))
              Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          return e;
        };
      (t.addBinder = function(e, t) {
        return (0, y.isUnknownBinder)(e.id)
          ? void (0, p.dispatch)({
              type: h,
              binder:
                t === g.CAROUSEL_TYPE
                  ? (0, m.buildCarsouelFromProps)(e, t)
                  : (0, m.buildBinderFromProps)(e, t),
            })
          : void (0, p.dispatch)({
              type: b,
              binderId: e.id,
              priority: e.priority,
            });
      }),
        (t._updateBinder = r),
        (t._removeBinder = function(e, t = !1) {
          (0, p.dispatch)({ type: B, binderId: e, force: t });
        }),
        (t._activeBinder = i),
        (t._resetCarousel = d),
        (t._resetBinder = function(e, t) {
          if ((0, y.ensureKnownBinder)(e)) {
            const n = (0, m.findBinder)((0, p.getBinders)(), e),
              i = (0, m.computeResetBinder)(n, e, t);
            i && r(i);
          }
        }),
        (t.updatePressStatus = function(e, t = null) {
          (0, p.getPress)().press !== e &&
            (0, p.dispatch)({ type: v, press: e, keyCode: t });
        }),
        (t.execCb = o),
        (t.enterTo = l),
        (t.determineNewState = function(e, t, n, i, d, u) {
          if ((0, y.ensureKnownBinder)(e)) {
            const { nextEl: g, prevEl: y, prevDir: h, elements: b } = (0,
            m.findBinder)((0, p.getBinders)(), e);
            if (g) {
              const _ = (0, f.calculateNewState)(n, g, y, h, b);
              if (_.hasMoved) {
                const n = (0, c.boundsMargin)(
                  _.nextEl.id,
                  (0, m.findBinder)((0, p.getBinders)(), e),
                  t
                );
                r(
                  a({}, _, {
                    id: e,
                    selectedId: _.nextEl.id,
                    elements: n.elements,
                    marginLeft: n.marginLeft,
                    marginTop: n.marginTop,
                  })
                ),
                  o(i, g, u);
              } else s(e), l(d);
            }
          }
        }),
        (t.resetFlipFlop = s);
      var p = n(3),
        u = n(29),
        c = n(9),
        f = n(4),
        g = n(0),
        y = n(17),
        m = n(2);
      const h = (t.ADD_BINDER = `${g.NAME}/ADD_BINDER`),
        b = (t.MOUNT_BINDER = `${g.NAME}/MOUNT_BINDER`),
        _ = (t.UPDATE_BINDER = `${g.NAME}/UPDATE_BINDER`),
        B = (t.REMOVE_BINDER = `${g.NAME}/REMOVE_BINDER`),
        E = (t.ACTIVE_BINDER = `${g.NAME}/ACTIVE_BINDER`),
        v = (t.UPDATE_PRESS_STATUS = `${g.NAME}/UPDATE_PRESS_STATUS`);
    },
    function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.buildCarsouelFromProps = t.buildBinderFromProps = t.buildCurrent = t.mountfreshestBinder = t.hasMountedBinder = t.removeBinder = t.computeRemoveBinder = t.computeResetBinder = t.unsleepBinder = t.mountBinder = t.isBinderShouldMount = t.computeMountBinder = t.addBinder = t.computeAddingBinder = t.updateBinder = t.findBinder = t.findMounted = t.findMountedId = void 0);
      var r =
          Object.assign ||
          function(e) {
            for (var t, n = 1; n < arguments.length; n++)
              for (var r in ((t = arguments[n]), t))
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e;
          },
        i = n(9);
      const d = (t.findMountedId = e => {
          const t = o(e);
          return t ? t.id : void 0;
        }),
        o = (t.findMounted = e => e.find(e => e.mounted)),
        l = (t.findBinder = (e, t) => e.find(e => e.id === t)),
        s = (t.updateBinder = (e, t) => {
          const n = e.findIndex(e => e.id === t.id);
          return Object.assign(e[n], t), e;
        }),
        a = (t.computeAddingBinder = (e, t) => {
          const n = p(e, t);
          return t.active ? u(n, t) : n;
        }),
        p = (t.addBinder = (e, t) => [...e, r({}, t, { sleep: !1 })]),
        u = (t.computeMountBinder = (e, t) =>
          c(e, t) ? f(e, t.id) : g(e, t.id)),
        c = (t.isBinderShouldMount = (e, t) => {
          const n = o(e);
          return !n || t.priority >= n.priority;
        }),
        f = (t.mountBinder = (e, t) =>
          e.map(e => {
            const n = r({}, e, { mounted: e.id === t });
            return (
              e.id === t && ((n.mountedTime = Date.now()), (n.sleep = !1)), n
            );
          })),
        g = (t.unsleepBinder = (e, t) =>
          e.map(
            e => (e.memory ? r({}, e, { sleep: e.id !== t && e.sleep }) : e)
          )),
        y = (t.computeResetBinder = (e, t, n) => {
          const { elements: r, selectedId: d } = e;
          if (0 === r.length) return;
          const o = n || r[0].id,
            l = (0, i.boundsMargin)(o, e, { visibilityOffset: 0 });
          return {
            id: t,
            selectedId: o,
            hasMoved: !0,
            prevEl: r.find(t => t.id === d),
            nextEl: r.find(t => t.id === o),
            prevDir: null,
            elements: l.elements,
            marginLeft: l.marginLeft,
            marginTop: l.marginTop,
          };
        }),
        m = (t.computeRemoveBinder = (e, t, n) => {
          const r = h(e, t, n);
          return b(r) ? r : _(r);
        }),
        h = (t.removeBinder = (e, t, n = !1) => {
          const i = e.find(e => e.id === t);
          return i && (n || !i.memory)
            ? e.filter(e => e.id !== t)
            : e.map(e =>
                r({}, e, {
                  mounted: e.id !== t && e.mounted,
                  sleep: !(e.id !== t) || e.sleep,
                })
              );
        }),
        b = (t.hasMountedBinder = e => e.some(e => e.mounted)),
        _ = (t.mountfreshestBinder = e => {
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
          return (r.mounted = !0), f(e, r.id);
        }),
        B = (t.buildCurrent = (e, t) => {
          const n = o(e);
          return {
            binderId: n ? n.id : t.binderId,
            selectedId: n ? n.selectedId : t.selectedId,
          };
        }),
        E = (t.buildBinderFromProps = (e, t) => ({
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
        v = (t.buildCarsouelFromProps = (e, t) => ({
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
        s = (t.getBinders = () => i.getState()[r.NAME].binders),
        a = (t.getPress = () => i.getState()[r.NAME].PRESS);
    },
    function(e, t, n) {
      'use strict';
      function r(e, t, n, r) {
        let i = !1,
          o = n,
          l = t,
          s = null;
        switch (e) {
          case d.C_UP:
            s = r === d.C_DOWN ? d.C_UP : null;
            break;
          case d.C_RIGHT:
            s = r === d.C_LEFT ? d.C_RIGHT : null;
            break;
          case d.C_DOWN:
            s = r === d.C_UP ? d.C_DOWN : null;
            break;
          case d.C_LEFT:
            s = r === d.C_RIGHT ? d.C_LEFT : null;
            break;
          default:
        }
        if (s) {
          i = !0;
          (o = t), (l = n);
        } else s = r;
        return { hasMoved: i, nextEl: l, prevEl: o, prevDir: s };
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
            s = n,
            a = i,
            p = r(t, e, n, i);
          if (!p.hasMoved) {
            const n = e;
            n[t] && (l = d.find(r => r.id === n[t])),
              l.id !== n.id && ((o = !0), (s = n), (a = t)),
              (p = { hasMoved: o, nextEl: l, prevEl: s, prevDir: a });
          }
          return p;
        });
      var d = n(0);
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
        E ||
          (e === I.enter
            ? setTimeout(() => i(e, !1, !0), 0)
            : setTimeout(() => i(e, !1), 0),
          (t.clicked = E = !0));
      }
      function o(e) {
        e === I.enter && setTimeout(() => i(e, !1), 0);
      }
      function l(n) {
        t.keysCopy = _ = [...b];
        const e = n.keyCode ? n.keyCode : n;
        c.default.isBlocked(e) ||
          (d(e),
          !B &&
            -1 !== T.indexOf(e) &&
            (t.pressTimeout = v = setTimeout(() => {
              S(e, 'long'), (0, p.updatePressStatus)(!0, e), (t.fired = B = !0);
            }, m.LONG_PRESS_TIMEOUT)),
          (0, h.getPress)().press && i(e, !0));
      }
      function s(n) {
        const e = n.keyCode ? n.keyCode : n;
        c.default.isBlocked(e) ||
          ((0, y.catcherWatcher)(e),
          S(e, 'short'),
          o(e),
          clearTimeout(v),
          (0, p.updatePressStatus)(!1),
          (t.fired = B = !1),
          (t.clicked = E = !1));
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.getConfig = t.availableForLongPress = t.userConfig = t.rkDebounce = t.eventCb = t.pressTimeout = t.clicked = t.fired = t.keysCopy = t.keysListeners = void 0);
      var a =
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
        (t.cbRelease = s),
        (t._init = function(e) {
          e && e.store && (0, h.updateStore)(e.store),
            (t.rkDebounce = k =
              e && e.debounce ? e.debounce : m.DEBOUNCE_TIMEOUT),
            (t.eventCb = S = e && e.eventCb ? e.eventCb : () => ({})),
            (t.userConfig = I = e && e.config ? a({}, I, e.config) : I),
            (t.availableForLongPress = T =
              e && e.longPressTouch ? e.longPressTouch : T),
            e && (!e || e.bindkeys)
              ? e.bindkeys(l, s)
              : (document.addEventListener('keydown', l),
                document.addEventListener('keyup', s));
        }),
        (t.addListener = function(e, t) {
          const n = Math.random()
            .toString(36)
            .substring(2, 10);
          return (
            b.unshift({ id: n, callback: e, context: t }),
            b.sort(
              (e, t) => t.context.props.priority - e.context.props.priority
            ),
            n
          );
        }),
        (t.removeListener = function(e) {
          return (t.keysListeners = b = b.filter(t => t.id !== e)), null;
        });
      var p = n(1),
        u = n(10),
        c = r(u),
        f = n(18),
        g = r(f),
        y = n(19),
        m = n(0),
        h = n(3);
      let b = (t.keysListeners = []),
        _ = (t.keysCopy = []),
        B = (t.fired = !1),
        E = (t.clicked = !1),
        v = (t.pressTimeout = null),
        S = (t.eventCb = null),
        k = (t.rkDebounce = m.DEBOUNCE_TIMEOUT),
        I = (t.userConfig = g.default),
        T = (t.availableForLongPress = f.AVAILABLE_FOR_LONG_PRESS);
      t.getConfig = () => I;
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
        if (a === setTimeout) return setTimeout(e, 0);
        if ((a === t || !a) && setTimeout)
          return (a = setTimeout), setTimeout(e, 0);
        try {
          return a(e, 0);
        } catch (t) {
          try {
            return a.call(null, e, 0);
          } catch (t) {
            return a.call(this, e, 0);
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
      function s() {}
      var a,
        p,
        u = (e.exports = {});
      (function() {
        try {
          a = 'function' == typeof setTimeout ? setTimeout : t;
        } catch (n) {
          a = t;
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
        (u.on = s),
        (u.addListener = s),
        (u.once = s),
        (u.off = s),
        (u.removeListener = s),
        (u.removeAllListeners = s),
        (u.emit = s),
        (u.prependListener = s),
        (u.prependOnceListener = s),
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
      function s(e, t) {
        return i(e, t, 0) && d(e, t, 0);
      }
      function a(e, t) {
        return o(e, t, 0) && l(e, t, 0);
      }
      function p(e, t, n, r, i) {
        const { top: d } = t.coords,
          o = r || i,
          l = 0 > d - (e.top + o),
          s = d - (l ? o : n),
          a = s - e.top;
        return 0 > a && !l ? 0 : -a;
      }
      function u(e, t, n, r, i, d) {
        const { down: o } = t.coords,
          l = i || d,
          s = o + l > r,
          a = o + (s ? l : n);
        return a > r && !s ? -(r - e.down) : -(a - e.down);
      }
      function c(e, t, n, r, i, d) {
        const { right: o } = t.coords,
          l = i || d,
          s = o + l > r,
          a = o + (s ? l : n);
        return a > r && !s ? -(r - e.right) : -(a - e.right);
      }
      function f(e, t, n, r, i) {
        const { left: d } = t.coords,
          o = r || i,
          l = 0 > d - (e.left + o),
          s = d - (l ? o : n),
          a = s - e.left;
        return 0 > a && !l ? 0 : -a;
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
          marginLeft: a(n, m) ? i : f(n, g, o, l, c),
          marginTop: s(n, m) ? d : p(n, g, o, l, u),
        };
      }),
        (t.boundsMargin = function(e, t, n) {
          const {
            wrapper: s,
            elements: a,
            marginLeft: h,
            marginTop: b,
            downLimit: _,
            rightLimit: B,
            gap: E,
            boundedGap: v,
            topGap: S,
            rightGap: k,
            leftGap: I,
            downGap: T,
            selectedId: C,
          } = t;
          let P = h,
            O = b,
            R = a;
          if (!n || C === e)
            return { marginLeft: P, marginTop: O, elements: R };
          const x = document.getElementById(C),
            M = document.getElementById(e);
          if (!x || !M || !s)
            return { marginLeft: P, marginTop: O, elements: R };
          const w = a.find(t => t.id === e),
            N = (0, y.calculateElSpace)(x),
            A = (0, y.calculateElSpace)(M),
            L = r(N, A);
          return (
            'left' !== L.horizontal || o(s, A, E)
              ? ('right' === L.horizontal || 'equal' === L.horizontal) &&
                !l(s, A, E) &&
                (P = c(s, w, E, B, v, k))
              : (P = f(s, w, E, v, I)),
            'top' !== L.vertical || i(s, A, E)
              ? ('down' === L.vertical || 'equal' === L.horizontal) &&
                !d(s, A, E) &&
                (O = u(s, w, E, _, v, T, b))
              : (O = p(s, w, E, v, S)),
            (h !== P || b !== O) &&
              (R = a.map(e =>
                g({}, e, {
                  isVisible: (0, m.isVisible)(
                    s,
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
        (t.isVerticalInside = s),
        (t.isHorizontalInside = a),
        (t.calculMarginOnTop = p),
        (t.calculMarginOnDown = u),
        (t.calculMarginOnRight = c),
        (t.calculMarginOnLeft = f);
      var y = n(4),
        m = n(16);
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
          (e.exports = function(t, r, i, o, l, s, d, e) {
            if ((n(r), !t)) {
              var a;
              if (void 0 === r)
                a = new Error(
                  'Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.'
                );
              else {
                var p = [i, o, l, s, d, e],
                  u = 0;
                (a = new Error(
                  r.replace(/%s/g, function() {
                    return p[u++];
                  })
                )),
                  (a.name = 'Invariant Violation');
              }
              throw ((a.framesToPop = 1), a);
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
      var r = n(5);
      let i = !1;
    },
    function(e, t, n) {
      'use strict';
      (function(t) {
        var r = n(11),
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
        s = (t.insideDown = (e, t, n, r) =>
          e.down + r - n >= t.top && e.down + r - n <= t.down),
        a = (t.isVerticalVisible = (e, t, n = 0, r = 0) =>
          o(e, t, n, r) || l(e, t, n, r) || s(e, t, n, r)),
        p = (t.isVisible = (e, t, n, r, i) => d(e, t, n, i) && a(e, t, r, i));
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
      function r(e, t) {
        const n = Math.random()
          .toString(36)
          .substring(2, 10);
        return s.push({ id: n, sequence: e, cb: t, history: [] }), n;
      }
      function i(e) {
        s = s.filter(t => t.id !== e);
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.catcherWatcher = function(e) {
          const t = d(e);
          s.forEach(e => {
            (e.history += t),
              e.history.length > e.sequence.length &&
                (e.history = e.history.slice(1)),
              e.history.toUpperCase() === e.sequence.toUpperCase() &&
                ((e.history = []), e.cb());
          });
        }),
        (t.addCatcher = r),
        (t.removeCatcher = i);
      var o = n(6),
        l = (function(e) {
          return e && e.__esModule ? e : { default: e };
        })(o);
      let s = [];
      t.default = (e, t) => n =>
        class extends o.Component {
          componentDidMount() {
            const n = this.props;
            this.id = r(e, () => t.call(this, n));
          }
          componentWillUnmount() {
            i(this.id);
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
        s = n(36),
        a = r(s),
        p = n(39),
        u = r(p),
        c = n(19),
        f = r(c),
        g = n(5),
        y = n(40),
        m = n(1),
        h = n(41),
        b = n(10),
        _ = r(b);
      const B = (t.config = g.getConfig),
        E = (t.keysInit = g._init),
        v = (t.Keys = l.default),
        S = (t.Binder = d.default),
        k = (t.Carousel = a.default),
        I = (t.Catcher = u.default),
        T = (t.keysReducer = y.reducer),
        C = (t.keysSelector = h._selector),
        P = (t.isCurrentBinder = h._isCurrentBinder),
        O = (t.isBinderActive = h._isBinderActive),
        R = (t.getBinders = h._getBinders),
        x = (t.getBinderMarginLeft = h._getBinderMarginLeft),
        M = (t.getBinderMarginTop = h._getBinderMarginTop),
        w = (t.getBinderSelectedId = h._getBinderSelectedId),
        N = (t.getCurrentSelectedId = h._getCurrentSelectedId),
        A = (t.getCurrentBinder = h._getCurrentBinder),
        L = (t.getCurrentBinderId = h._getCurrentBinderId),
        D = (t.getKeyCode = h._getKeyCode),
        G = (t.isLongPress = h._isLongPress),
        U = (t.isVisibleInBinder = h._isVisibleInBinder),
        V = (t.catcher = f.default),
        j = (t.activeBinder = m._activeBinder),
        q = (t.updateBinder = m._updateBinder),
        F = (t.resetBinder = m._resetBinder),
        Y = (t.removeBinder = e => (0, m._removeBinder)(e, !0)),
        K = (t.resetCarousel = m._resetCarousel),
        z = (t.block = _.default.block),
        W = (t.unblock = _.default.unblock),
        H = (t.blockExcept = _.default.blockExcept),
        J = (t.unblockExcept = _.default.unblockExcept),
        $ = (t._blocks = _.default);
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
        s = n(0),
        a = n(5),
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
          (this.listenerId = (0, a.addListener)(l.keysHandler, this)),
            (0, p.addBinder)(this.innerProps, s.BINDER_TYPE);
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
            (this.listenerId = (0, a.removeListener)(this.listenerId)),
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
        var r = n(11),
          i = n(12),
          d = n(15),
          o = n(25),
          l = n(13),
          s = n(26);
        e.exports = function(e, n) {
          function a(e) {
            var t = e && ((B && e[B]) || e[E]);
            if ('function' == typeof t) return t;
          }
          function p(e, t) {
            return e === t ? 0 !== e || 1 / e == 1 / t : e !== e && t !== t;
          }
          function u(e) {
            (this.message = e), (this.stack = '');
          }
          function c(e) {
            function r(r, a, p, c, f, g, y) {
              if (((c = c || v), (g = g || p), y !== l))
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
                    3 > s &&
                    (d(
                      !1,
                      'You are manually calling a React.PropTypes validation function for the `%s` prop on `%s`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.',
                      g,
                      c
                    ),
                    (o[m] = !0),
                    s++);
                }
              return null == a[p]
                ? r
                  ? null === a[p]
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
                : e(a, p, c, f, g);
            }
            if ('production' !== t.env.NODE_ENV)
              var o = {},
                s = 0;
            var a = r.bind(null, !1);
            return (a.isRequired = r.bind(null, !0)), a;
          }
          function f(e) {
            return c(function(t, n, r, i, d) {
              var o = t[n],
                l = m(o);
              if (l !== e) {
                var s = h(o);
                return new u(
                  'Invalid ' +
                    i +
                    ' `' +
                    d +
                    '` of type ' +
                    ('`' + s + '` supplied to `' + r + '`, expected ') +
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
                var n = a(t);
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
            return e.constructor && e.constructor.name ? e.constructor.name : v;
          }
          var B = 'function' == typeof Symbol && Symbol.iterator,
            E = '@@iterator',
            v = '<<anonymous>>',
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
                  var s = t[n];
                  if (!Array.isArray(s)) {
                    var a = m(s);
                    return new u(
                      'Invalid ' +
                        d +
                        ' `' +
                        o +
                        '` of type ' +
                        ('`' +
                          a +
                          '` supplied to `' +
                          r +
                          '`, expected an array.')
                    );
                  }
                  for (var p, c = 0; c < s.length; c++)
                    if (
                      ((p = e(s, c, r, d, o + '[' + c + ']', l)),
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
                    var o = e.name || v,
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
                    s = m(o);
                  if ('object' !== s)
                    return new u(
                      'Invalid ' +
                        i +
                        ' `' +
                        d +
                        '` of type ' +
                        ('`' +
                          s +
                          '` supplied to `' +
                          r +
                          '`, expected an object.')
                    );
                  for (var a in o)
                    if (o.hasOwnProperty(a)) {
                      var p = e(o, a, r, i, d + '.' + a, l);
                      if (p instanceof Error) return p;
                    }
                  return null;
                });
              },
              oneOf: function(e) {
                return Array.isArray(e)
                  ? c(function(t, n, r, d, o) {
                      for (var l = t[n], s = 0; s < e.length; s++)
                        if (p(l, e[s])) return null;
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
                  for (var s, a = 0; a < e.length; a++)
                    if (((s = e[a]), null == s(t, n, r, d, o, l))) return null;
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
                    s = m(o);
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
                  for (var a in e) {
                    var p = e[a];
                    if (p) {
                      var c = p(o, a, r, i, d + '.' + a, l);
                      if (c) return c;
                    }
                  }
                  return null;
                });
              },
              exact: function(e) {
                return c(function(t, n, r, i, d) {
                  var s = t[n],
                    a = m(s);
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
                    var g = f(s, c, r, i, d + '.' + c, l);
                    if (g) return g;
                  }
                  return null;
                });
              },
            };
          return (
            (u.prototype = Error.prototype),
            (S.checkPropTypes = s),
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
        r = Object.prototype.hasOwnProperty,
        o = Object.prototype.propertyIsEnumerable;
      e.exports = (function() {
        try {
          if (!Object.assign) return !1;
          var e = new String('abc');
          if (((e[5] = 'de'), '5' === Object.getOwnPropertyNames(e)[0]))
            return !1;
          for (var t = {}, n = 0; 10 > n; n++) t['_' + d(n)] = n;
          var r = Object.getOwnPropertyNames(t).map(function(e) {
            return t[e];
          });
          if ('0123456789' !== r.join('')) return !1;
          var i = {};
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
              i[e] = e;
            }),
            'abcdefghijklmnopqrst' ===
              Object.keys(Object.assign({}, i)).join('')
          );
        } catch (e) {
          return !1;
        }
      })()
        ? Object.assign
        : function(e) {
            for (var d, l, a = t(e), p = 1; p < arguments.length; p++) {
              for (var s in ((d = Object(arguments[p])), d))
                r.call(d, s) && (a[s] = d[s]);
              if (n) {
                l = n(d);
                for (var u = 0; u < l.length; u++)
                  o.call(d, l[u]) && (a[l[u]] = d[l[u]]);
              }
            }
            return a;
          };
    },
    function(e, t, n) {
      'use strict';
      (function(t) {
        if ('production' !== t.env.NODE_ENV)
          var r = n(12),
            i = n(15),
            d = n(13),
            o = {};
        e.exports = function(e, n, l, s, a) {
          if ('production' !== t.env.NODE_ENV)
            for (var p in e)
              if (e.hasOwnProperty(p)) {
                var u;
                try {
                  r(
                    'function' == typeof e[p],
                    '%s: %s type `%s` is invalid; it must be a function, usually from the `prop-types` package, but received `%s`.',
                    s || 'React class',
                    l,
                    p,
                    typeof e[p]
                  ),
                    (u = e[p](n, p, s, l, null, d));
                } catch (e) {
                  u = e;
                }
                if (
                  (i(
                    !u || u instanceof Error,
                    '%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).',
                    s || 'React class',
                    l,
                    p,
                    typeof u
                  ),
                  u instanceof Error && !(u.message in o))
                ) {
                  o[u.message] = !0;
                  var c = a ? a() : '';
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
      var r = n(11),
        i = n(12),
        d = n(13);
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
            onLeft: s,
            onLeftExit: u,
            onUp: y,
            onUpExit: m,
            onRight: h,
            onRightExit: b,
            onDown: _,
            onDownExit: B,
            onEnter: E,
            triggerClick: v,
          } = this.innerProps;
          if (this.listenerId) {
            const S = (0, i.findBinder)((0, d.getBinders)(), r);
            if (S) {
              if (
                n &&
                v &&
                (0, p.isActive)(this.innerProps) &&
                !(0, l.isBlocked)() &&
                !a.default.isBlocked(this.innerProps.id)
              )
                return void document.getElementById(S.nextEl.id).click();
              if (
                !n &&
                (0, p.isActive)(this.innerProps) &&
                !(0, l.isBlocked)() &&
                !a.default.isBlocked(this.innerProps.id) &&
                (!t || (t && this.innerProps.longPress))
              )
                switch (e) {
                  case c.default.left:
                    g(this.innerProps, o.C_LEFT, s, u);
                    break;
                  case c.default.up:
                    g(this.innerProps, o.C_UP, y, m);
                    break;
                  case c.default.right:
                    g(this.innerProps, o.C_RIGHT, h, b);
                    break;
                  case c.default.down:
                    g(this.innerProps, o.C_DOWN, _, B);
                    break;
                  case c.default.enter:
                    E && ((0, l.block)(), (0, f.execCb)(E, S.nextEl, this));
                    break;
                  default:
                }
            }
          }
        });
      var i = n(2),
        d = n(3),
        o = n(0),
        l = n(14),
        s = n(10),
        a = r(s),
        p = n(20),
        u = n(18),
        c = r(u),
        f = n(1);
      const g = (t.performAction = (e, t, n, r) => {
        (0, l.block)(e.debounce),
          (0, f.determineNewState)(e.id, e, t, n, r, void 0);
      });
    },
    function(e, t, n) {
      'use strict';
      function i(e, t, n, i) {
        const d = (0, l.getDomElement)(i.current.selectedId),
          o = d ? d.getBoundingClientRect()[n] : 0,
          s = (0, l.getCurrentChildren)((0, l.getDomElement)(e), t)
            .map(e => ({ id: e.id, diff: r(e.getBoundingClientRect()[n] - o) }))
            .sort((e, t) => e.diff - t.diff);
        return s[0].id;
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
          const r = (0, s.findBinder)(e.binders, t);
          if (r.type === o.CAROUSEL_TYPE) return r.selectedId;
          const {
              position: l,
              strategy: a,
              selectedId: p,
              selector: u,
              elements: c,
              memory: f,
            } = r,
            g = l === o.VERTICAL ? 'top' : 'left';
          return a === o.STRATEGY_MIRROR
            ? i(t, u, g, e)
            : a === o.STRATEGY_START ? d(u, g, t) : f ? p : c[0] && c[0].id;
        }),
        (t.findMirrorExitId = i),
        (t.findStartExitId = d);
      var o = n(0),
        l = n(4),
        s = n(2);
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
          const t = (0, s.calculateElSpace)(
              r ? document.querySelector(r) : document.body
            ),
            d = (0, a.createList)(e, i, n),
            o =
              (0, s.hasElementsDiff)(d, u.elements) ||
              ((0, s.hasWrapperDiff)(t, u.wrapper, p) && 0 < d.length);
          o && c(u, t, d, this.innerProps);
        }
      }),
        (t.mountState = function() {
          const e = d.default.findDOMNode(this),
            { id: t, filter: n, wrapper: r, selector: i } = this.innerProps,
            p = (0, o.findBinder)((0, l.getBinders)(), t);
          if (p) {
            const t = (0, s.calculateElSpace)(
                r ? document.querySelector(r) : document.body
              ),
              d = (0, a.createList)(e, i, n);
            c(p, t, d, this.innerProps);
          }
        });
      var i = n(32),
        d = (function(e) {
          return e && e.__esModule ? e : { default: e };
        })(i),
        o = n(2),
        l = n(3),
        s = n(4),
        a = n(33),
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
          g = (0, a.build)(n, f),
          y = g.find(e => e.id === c.selectedId),
          m = {
            id: d,
            wrapper: t,
            downLimit: (0, s.downLimit)(g),
            rightLimit: (0, s.rightLimit)(g),
            elements: g,
            prevDir: null,
          };
        (0, p._updateBinder)(r({}, m, c, { nextEl: y }));
      });
    },
    function(e) {
      e.exports = t;
    },
    function(e, t, n) {
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
            left: u(s(e, g)),
            right: u(l(e, g)),
            up: u(p(e, g)),
            down: u(a(e, g)),
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
      var d = n(4),
        o = n(16);
      const l = (t.rightArray = (e, t) =>
          t.filter(t => e.right <= t.left).sort(c(e, f))),
        s = (t.leftArray = (e, t) =>
          t.filter(t => e.left >= t.right).sort(c(e, g))),
        a = (t.downArray = (e, t) =>
          t.filter(t => e.down <= t.top).sort(c(e, m))),
        p = (t.upArray = (e, t) =>
          t.filter(t => e.top >= t.down).sort(c(e, y))),
        u = (t.findElement = e => (e[0] ? e[0].id : void 0)),
        c = (t.elementSort = (e, t) => (n, r) => t(n, e) - t(r, e)),
        f = (t.calculRightScore = (e, t) =>
          r(e.top - t.top) + r(e.left - t.right)),
        g = (t.calculLeftScore = (e, t) =>
          r(e.top - t.top) + r(e.right - t.left)),
        y = (t.calculUpScore = (e, t) =>
          r(e.down - t.top) + r(e.left - t.left)),
        m = (t.calculDowScore = (e, t) =>
          r(e.top - t.down) + r(e.left - t.left));
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
        i = n(9);
      const d = (t.next = (e, t, n) => {
          const { selectedId: d } = t;
          let s = {};
          if (l(e, d)) {
            s = e.find(t => t.id === d);
            const n = (0, i.correctBoundsMargin)(s.id, t);
            return r({ selectedId: s.id }, n);
          }
          if ('previous' === n && d) {
            const n = o(t.selectedId, t.elements, e),
              d = (0, i.correctBoundsMargin)(n.id, t);
            return r({ selectedId: n.id }, d);
          }
          return 0 < e.length
            ? ((s = e[0]), { selectedId: s.id, marginLeft: 0, marginTop: 0 })
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
        l = n(14),
        s = n(5),
        a = n(10),
        p = r(a),
        u = n(1);
      class c extends i.Component {
        constructor(e) {
          super(e),
            (this.listenerId = (0, s.addListener)(this.keysHandler, this));
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
            for (const t in s.userConfig) {
              const n = s.userConfig[t],
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
          (0, s.removeListener)(this.listenerId);
        }
        render() {
          return this.props.children || null;
        }
      }
      (c.propTypes = {
        children: o.default.oneOfType([o.default.object, o.default.array]),
        id: o.default.string.isRequired,
        debounce: o.default.number,
        active: o.default.bool,
        priority: o.default.number,
      }),
        (c.defaultProps = { active: !0, priority: 0 }),
        (t.default = c);
    },
    function(e, t, i) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var d =
          Object.assign ||
          function(e) {
            for (var t, n = 1; n < arguments.length; n++)
              for (var r in ((t = arguments[n]), t))
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e;
          },
        o = i(6),
        l = (function(e) {
          return e && e.__esModule ? e : { default: e };
        })(o),
        s = i(37),
        a = i(9),
        p = i(4),
        u = i(5),
        c = i(14),
        f = i(20),
        g = i(1),
        y = i(0),
        m = i(38);
      class h extends o.Component {
        constructor(e) {
          super(e),
            (this.uniqElement = !0),
            (this.timeout = null),
            (this.movingCountDown = () =>
              (this.timeout = setTimeout(
                () =>
                  (0, g._updateBinder)({
                    id: e.id,
                    moving: !1,
                    selectedId: this.selectedId,
                  }),
                e.speed
              ))),
            (this.state = { cursor: e.index, elements: [] });
        }
        componentWillMount() {
          (this.listenerId = (0, u.addListener)(this.keysHandler, this)),
            (0, g.addBinder)(this.props, y.CAROUSEL_TYPE),
            this.updateState(this.state.cursor, this.props.children);
        }
        componentWillUpdate({ index: e, children: t, updateIndex: n }) {
          if (
            (0, p.hasElementsDiff)(t, this.props.children) ||
            this.props.index !== e
          ) {
            const r = n ? e : this.state.cursor;
            this.updateState(r, t);
          }
        }
        componentWillUnmount() {
          (0, u.removeListener)(this.listenerId),
            (0, g._removeBinder)(this.props.id);
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
              const t = d({}, e.props, { id: e.props.id + '_' + n });
              return d({}, e, { props: t, key: e.props.id + '_' + n });
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
              onUpExit: o,
              onEnter: l,
              triggerClick: a,
              debounce: p,
            } = this.props,
            { cursor: g } = this.state;
          if (
            (n &&
              a &&
              (0, f.isActive)(this.props) &&
              !(0, c.isBlocked)() &&
              document.getElementById(r[g].props.id).click(),
            (0, f.isActive)(this.props) && !(0, c.isBlocked)())
          )
            switch (e) {
              case u.userConfig.left:
                if (!i && 0 === g) return;
                this.performAction((0, s.getPrev)(r.length, g));
                break;
              case u.userConfig.right:
                if (!i && g === r.length - 1) return;
                this.performAction((0, s.getNext)(r.length, g));
                break;
              case u.userConfig.down:
                this.performCallback(d);
                break;
              case u.userConfig.up:
                this.performCallback(o);
                break;
              case u.userConfig.enter:
                (0, c.block)(p), this.performCallback(l);
            }
        }
        isLeftMove(e, t, n) {
          return t < e || (0 === e && t === n.length - 1);
        }
        performAction(e) {
          const { debounce: t, onChange: n, children: r } = this.props;
          (0, c.block)(t),
            clearTimeout(this.timeout),
            this.updateState(e, r),
            this.movingCountDown(),
            (0, g.execCb)(n, this.selectedId, this);
        }
        updateState(e, t) {
          const n = this.computeChildren(t),
            { id: r, size: i, circular: d } = this.props;
          if (n[e]) {
            (this.selectedId = n[e].props.id),
              (0, g._updateBinder)({
                id: r,
                selectedId: this.selectedId,
                cursor: e,
                moving: !0,
              });
            const t = (0, s.build)(n, i + 4, e, d);
            this.setState({
              cursor: e,
              elements: t,
              gaps: this.determineGap(
                t,
                this.isLeftMove(this.state.cursor, e, t),
                e
              ),
            });
          }
        }
        performCallback(e) {
          e && ((0, c.block)(), (0, g.enterTo)(e, this.selectedId));
        }
        determineGap(e, t, n) {
          const {
              navigation: i,
              id: d,
              elWidth: o,
              size: l,
              gap: s,
              index: u,
            } = this.props,
            { gaps: c } = this.state,
            f =
              c ||
              e.map(
                (e, t) => (t - (i === y.NAVIGATION_BOUND ? l - 1 : 2)) * o + s
              );
          if (i === y.NAVIGATION_BOUND) {
            const i = (0, p.calculateElSpace)(
              document.getElementById(this.selectedId)
            );
            if (c === void 0) return f;
            const l = (0, p.calculateElSpace)(document.getElementById(d));
            if (!i) return this.determineJumpGap(l.width, e, n, t);
            const g = o * r(n - u);
            return !t && (0, a.isInsideRight)(l, i, s)
              ? f.map(e => e + g)
              : t && (0, a.isInsideLeft)(l, i, s)
                ? f.map(e => e - g)
                : this.determineJumpGap(l.width, e, n, t);
          }
          return f;
        }
        determineJumpGap(e, t, r, i) {
          const { elWidth: d } = this.props,
            o = n(e / d),
            l = t.findIndex(e => e && e.props.id === this.selectedId),
            s = i || r < o ? l : l - (o - 1),
            a = [];
          for (let n = 0; n < t.length; n++) a[n] = (n - s) * d;
          return a;
        }
        render() {
          const {
              size: e,
              elWidth: t,
              childrenClassName: n,
              className: r,
              id: i,
            } = this.props,
            { elements: d, gaps: o } = this.state;
          return l.default.createElement(
            'div',
            {
              id: i,
              className: r,
              style: { overflow: 'hidden', position: 'absolute' },
            },
            d.map((r, i) => {
              if (r) {
                const d = o[i];
                return l.default.createElement(
                  'div',
                  {
                    id: r.props.id,
                    key: r.props.id,
                    className: n,
                    style: {
                      transform: `translateX(${d}px)`,
                      position: 'absolute',
                      width: `${t}px`,
                      display: 'block',
                      opacity: d === -(2 * t) || d === (e + 1) * t ? 0 : 1,
                    },
                  },
                  r
                );
              }
            })
          );
        }
      }
      (h.propTypes = m.propTypes),
        (h.defaultProps = m.defaultProps),
        (t.default = h);
    },
    function(e, t) {
      'use strict';
      function r(e, t, n = !0) {
        return n || (0 !== t && null !== t) ? (0 < t ? t - 1 : e - 1) : null;
      }
      function d(e, t, n = !0) {
        return n || (null !== t && t !== e - 1)
          ? t < e - 1 ? t + 1 : 0
          : null;
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.getPrev = r),
        (t.getNext = d),
        (t.build = function(e, t, i, o = !0) {
          const l = [e[i]],
            s = n(t / 2);
          let a = i,
            p = i;
          for (let n = 0; n < s; n++)
            (p = d(e.length, p, o)),
              (a = r(e.length, a, o)),
              (l[l.length] = null === p ? null : e[p]),
              l.unshift(null === a ? null : e[a]);
          return l;
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
      function r(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var i = n(6),
        o = r(i),
        l = n(8),
        s = r(l),
        a = n(5);
      class p extends i.Component {
        constructor(e) {
          super(e),
            (this.history = ''),
            (this.listenerId = (0, a.addListener)(this.keysHandler, this));
        }
        componentWillUnmount() {
          (0, a.removeListener)(this.listenerId);
        }
        render() {
          return this.props.children || null;
        }
        keysHandler(e) {
          (this.history += d(e)),
            this.history.length > this.props.sequence.length &&
              (this.history = this.history.slice(1)),
            this.history.toUpperCase() === this.props.sequence.toUpperCase() &&
              ((this.history = ''), this.props.cb());
        }
      }
      (p.propTypes = {
        sequence: s.default.string.isRequired,
        cb: s.default.func.isRequired,
        children: s.default.oneOfType([s.default.object, s.default.array]),
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
            let n = e.binders;
            const i = n.findIndex(e => e.id === t.binder.id);
            (n[i] = r({}, n[i], t.binder)),
              (n = (0, d.mountBinder)(n, t.binder.id));
            let o = (0, d.buildCurrent)(n, e.current);
            return r({}, e, { binders: n, current: o });
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
        s = (t._isCurrentBinder = e => () => {
          (0, d.ensureState)();
          const t =
            (0, i.getStore)().current && (0, i.getStore)().current.binderId;
          return t === e;
        }),
        a = (t._getCurrentSelectedId = () => () => (
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
