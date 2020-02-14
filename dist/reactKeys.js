!(function(e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t(require('React'), require('ReactDOM')))
    : 'function' == typeof define && define.amd
      ? define(['React', 'ReactDOM'], t)
      : 'object' == typeof exports
        ? (exports.ReactKeys = t(require('React'), require('ReactDOM')))
        : (e.ReactKeys = t(e.React, e.ReactDOM));
})(window, function(e, t) {
  var r = Math.floor,
    n = Math.abs,
    i = String.fromCharCode,
    o = Math.max;
  return (function(e) {
    function t(n) {
      if (r[n]) return r[n].exports;
      var i = (r[n] = { i: n, l: !1, exports: {} });
      return e[n].call(i.exports, i, i.exports, t), (i.l = !0), i.exports;
    }
    var r = {};
    return (
      (t.m = e),
      (t.c = r),
      (t.d = function(e, r, n) {
        t.o(e, r) || Object.defineProperty(e, r, { enumerable: !0, get: n });
      }),
      (t.r = function(e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (t.t = function(e, r) {
        if ((1 & r && (e = t(e)), 8 & r)) return e;
        if (4 & r && 'object' == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (
          (t.r(n),
          Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
          2 & r && 'string' != typeof e)
        )
          for (var i in e)
            t.d(
              n,
              i,
              function(t) {
                return e[t];
              }.bind(null, i)
            );
        return n;
      }),
      (t.n = function(e) {
        var r =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return t.d(r, 'a', r), r;
      }),
      (t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (t.p = ''),
      t((t.s = 16))
    );
  })([
    function(e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      (t.NAME = '@@keys'),
        (t.C_UP = 'up'),
        (t.C_DOWN = 'down'),
        (t.C_LEFT = 'left'),
        (t.C_RIGHT = 'right'),
        (t.STRATEGY_MIRROR = 'mirror'),
        (t.STRATEGY_START = 'start'),
        (t.STRATEGY_MEMORY = 'memory'),
        (t.BINDER_TYPE = 'binder'),
        (t.CAROUSEL_TYPE = 'carousel'),
        (t.LONG_PRESS_TIMEOUT = 500),
        (t.DEBOUNCE_TIMEOUT = 10),
        (t.VERTICAL = 'vertical'),
        (t.NAVIGATION_CENTER = 'center'),
        (t.NAVIGATION_BOUND = 'bound');
    },
    function(e, t, r) {
      'use strict';
      function n(e) {
        (0, g.ensureKnownBinder)(e.id) &&
          (0, c.dispatch)({ type: _, binder: e });
      }
      function i(e, t, r) {
        if ((0, g.ensureKnownBinder)(e)) {
          const r = (0, a.findIdByStrategy)((0, c.getStore)(), e, t),
            n = (0, m.findBinder)((0, c.getBinders)(), e),
            i = (0, m.computeResetBinder)(n, e, r) || { id: e };
          (0, c.dispatch)({ type: B, binder: i });
          const s = (0, m.findBinder)((0, c.getBinders)(), e);
          s && s.type === h.CAROUSEL_TYPE && o(e, r);
        }
      }
      function o(e, t) {
        if (!(0, g.ensureKnownBinder)(e)) return;
        const r = (0, m.findBinder)((0, c.getBinders)(), e),
          { elements: i, selectedId: o } = r;
        if (0 === i.length) return;
        const s = t || i[0].id;
        n({
          id: e,
          selectedId: s,
          hasMoved: !0,
          prevEl: i.find(e => e.id === o),
          nextEl: i.find(e => e.id === s),
          prevDir: null,
        });
      }
      function s(e, t, r) {
        return e
          ? Array.isArray(t)
            ? e.apply(r, t)
            : void e.call(r, t || {})
          : void 0;
      }
      function d(e, t) {
        e && ('string' == typeof e ? i(e) : e(t));
      }
      function l(e) {
        if ((0, g.ensureKnownBinder)(e)) {
          const { memory: t, prevDir: r } = (0, m.findBinder)(
            (0, c.getBinders)(),
            e
          );
          !t && r && n({ id: e, prevDir: null });
        }
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.UPDATE_PRESS_STATUS = t.ACTIVE_BINDER = t.RESET_STATE = t.REMOVE_BINDER = t.UPDATE_BINDER = t.MOUNT_BINDER = t.ADD_BINDER = void 0);
      var u =
        Object.assign ||
        function(e) {
          for (var t, r = 1; r < arguments.length; r++)
            for (var n in (t = arguments[r]))
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
          return e;
        };
      (t.addBinder = function(e, t) {
        return (0, g.isUnknownBinder)(e.id)
          ? void (0, c.dispatch)({
              type: b,
              binder:
                t === h.CAROUSEL_TYPE
                  ? (0, m.buildCarsouelFromProps)(e, t)
                  : (0, m.buildBinderFromProps)(e, t),
            })
          : void (0, c.dispatch)({
              type: y,
              binderId: e.id,
              priority: e.priority,
            });
      }),
        (t._updateBinder = n),
        (t._removeBinder = function(e, t = !1) {
          (0, c.dispatch)({ type: v, binderId: e, force: t });
        }),
        (t._activeBinder = i),
        (t._resetCarousel = o),
        (t._resetBinder = function(e, t) {
          if ((0, g.ensureKnownBinder)(e)) {
            const r = (0, m.findBinder)((0, c.getBinders)(), e),
              i = (0, m.computeResetBinder)(r, e, t, !0);
            i && n(i);
          }
        }),
        (t.updatePressStatus = function(e, t = null) {
          (0, c.getPress)().press !== e &&
            (0, c.dispatch)({ type: S, press: e, keyCode: t });
        }),
        (t.execCb = s),
        (t.enterTo = d),
        (t.determineNewState = function(e, t, r, i, o, a) {
          if ((0, g.ensureKnownBinder)(e)) {
            const { nextEl: h, prevEl: g, prevDir: b, elements: y } = (0,
            m.findBinder)((0, c.getBinders)(), e);
            if (h) {
              const _ = (0, p.calculateNewState)(r, h, g, b, y);
              if (_.hasMoved) {
                const r = (0, f.boundsMargin)(
                  _.nextEl.id,
                  (0, m.findBinder)((0, c.getBinders)(), e),
                  t
                );
                n(
                  u({}, _, {
                    id: e,
                    selectedId: _.nextEl.id,
                    elements: r.elements,
                    marginLeft: r.marginLeft,
                    marginTop: r.marginTop,
                  })
                ),
                  s(i, h, a);
              } else l(e), d(o);
            }
          }
        }),
        (t.resetFlipFlop = l);
      var c = r(3),
        a = r(24),
        f = r(8),
        p = r(4),
        h = r(0),
        g = r(12),
        m = r(2);
      const b = (t.ADD_BINDER = `${h.NAME}/ADD_BINDER`),
        y = (t.MOUNT_BINDER = `${h.NAME}/MOUNT_BINDER`),
        _ = (t.UPDATE_BINDER = `${h.NAME}/UPDATE_BINDER`),
        v = (t.REMOVE_BINDER = `${h.NAME}/REMOVE_BINDER`),
        B = ((t.RESET_STATE = `${h.NAME}/RESET_STATE`),
        (t.ACTIVE_BINDER = `${h.NAME}/ACTIVE_BINDER`)),
        S = (t.UPDATE_PRESS_STATUS = `${h.NAME}/UPDATE_PRESS_STATUS`);
    },
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.buildCarsouelFromProps = t.buildBinderFromProps = t.buildCurrent = t.mountfreshestBinder = t.hasMountedBinder = t.removeBinder = t.computeRemoveBinder = t.computeResetBinder = t.unsleepBinder = t.mountBinder = t.isBinderShouldMount = t.computeMountBinder = t.addBinder = t.computeAddingBinder = t.updateBinder = t.findBinder = t.findMounted = t.findMountedId = void 0);
      var n =
          Object.assign ||
          function(e) {
            for (var t, r = 1; r < arguments.length; r++)
              for (var n in (t = arguments[r]))
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e;
          },
        i = r(8);
      t.findMountedId = e => {
        const t = o(e);
        return t ? t.id : void 0;
      };
      const o = (t.findMounted = e => e.find(e => e.mounted)),
        s = ((t.findBinder = (e, t) => e.find(e => e.id === t)),
        (t.updateBinder = (e, t) => {
          const r = e.findIndex(e => e.id === t.id);
          return Object.assign(e[r], t), e;
        }),
        (t.computeAddingBinder = (e, t) => {
          const r = s(e, t);
          return t.active ? d(r, t) : r;
        }),
        (t.addBinder = (e, t) => [...e, n({}, t, { sleep: !1 })])),
        d = (t.computeMountBinder = (e, t) =>
          l(e, t) ? u(e, t.id) : c(e, t.id)),
        l = (t.isBinderShouldMount = (e, t) => {
          const r = o(e);
          return !r || t.priority >= r.priority;
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
        a = ((t.computeResetBinder = (e, t, r, n) => {
          const { elements: o, selectedId: s } = e;
          if (0 === o.length) return;
          const d = r || o[0].id,
            l = (0, i.boundsMargin)(d, e, { visibilityOffset: 0 }, n);
          return {
            id: t,
            selectedId: d,
            hasMoved: !0,
            prevEl: o.find(e => e.id === s),
            nextEl: o.find(e => e.id === d),
            prevDir: null,
            elements: l.elements,
            marginLeft: l.marginLeft,
            marginTop: l.marginTop,
          };
        }),
        (t.computeRemoveBinder = (e, t, r) => {
          const n = a(e, t, r);
          return f(n) ? n : p(n);
        }),
        (t.removeBinder = (e, t, r = !1) => {
          const i = e.find(e => e.id === t);
          return !i || (!r && i.memory)
            ? e.map(e =>
                n({}, e, {
                  mounted: e.id !== t && e.mounted,
                  sleep: !(e.id !== t) || e.sleep,
                })
              )
            : e.filter(e => e.id !== t);
        })),
        f = (t.hasMountedBinder = e => e.some(e => e.mounted)),
        p = (t.mountfreshestBinder = e => {
          const t = e.filter(e => !e.sleep);
          if (0 === t.length) return e;
          const r = t.filter(e => e.mountedTime),
            n =
              0 === r.length
                ? t.reduce((e, t) => (e.priority > t.priority ? e : t), t[0])
                : r.reduce(
                    (e, t) => (e.mountedTime > t.mountedTime ? e : t),
                    r[0]
                  );
          return (n.mounted = !0), u(e, n.id);
        });
      (t.buildCurrent = (e, t) => {
        const r = o(e);
        return {
          binderId: r ? r.id : t.binderId,
          selectedId: r ? r.selectedId : t.selectedId,
        };
      }),
        (t.buildBinderFromProps = (e, t) => ({
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
        (t.buildCarsouelFromProps = (e, t) => ({
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
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.getPress = t.getBinders = t.dispatch = t.getStore = t.updateStore = t.globalStore = void 0);
      var n = r(0);
      let i = (t.globalStore = {
        dispatch: () => ({}),
        getState: () => ({ [n.NAME]: {} }),
      });
      (t.updateStore = e => (t.globalStore = i = e)),
        (t.getStore = () => i.getState()[n.NAME]),
        (t.dispatch = e => i.dispatch(e)),
        (t.getBinders = () => i.getState()[n.NAME].binders),
        (t.getPress = () => i.getState()[n.NAME].PRESS);
    },
    function(e, t, r) {
      'use strict';
      function n(e, t, r, n) {
        let o = !1,
          s = r,
          d = t,
          l = null;
        switch (e) {
          case i.C_UP:
            l = n === i.C_DOWN ? i.C_UP : null;
            break;
          case i.C_RIGHT:
            l = n === i.C_LEFT ? i.C_RIGHT : null;
            break;
          case i.C_DOWN:
            l = n === i.C_UP ? i.C_DOWN : null;
            break;
          case i.C_LEFT:
            l = n === i.C_RIGHT ? i.C_LEFT : null;
        }
        return (
          l ? ((o = !0), (s = t), (d = r)) : (l = n),
          { hasMoved: o, nextEl: d, prevEl: s, prevDir: l }
        );
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.calculateElSpace = function(e) {
          if (e) {
            const t = e.offsetWidth,
              r = e.offsetHeight,
              n = e.offsetTop,
              i = e.offsetLeft;
            return {
              id: e.id,
              width: t,
              height: r,
              left: i,
              top: n,
              down: n + r,
              right: i + t,
            };
          }
        }),
        (t.downLimit = function(e) {
          return o.apply(null, e.map(e => e.coords.down));
        }),
        (t.rightLimit = function(e) {
          return o.apply(null, e.map(e => e.coords.right));
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
          let r = !1,
            n = 0;
          for (const i = Math.min(e.length, t.length); n < i && !r; ) {
            (r = (e[n].id || e[n].props.id) !== (t[n].id || t[n].props.id)),
              n++;
          }
          return r;
        }),
        (t.hasWrapperDiff = function(e, t, r) {
          return (
            !(!e || !t) &&
            ('horizontal' === r
              ? e.width !== t.width ||
                e.height !== t.height ||
                e.left !== t.left
              : 'vertical' === r
                ? e.width !== t.width ||
                  e.height !== t.height ||
                  e.top !== t.top
                : e.width !== t.width ||
                  e.height !== t.height ||
                  e.top !== t.top ||
                  e.left !== t.left)
          );
        }),
        (t.flipflop = n),
        (t.calculateNewState = function(e, t, r, i, o) {
          let s = !1,
            d = t,
            l = r,
            u = i,
            c = n(e, t, r, i);
          if (!c.hasMoved) {
            const r = t;
            r[e] && (d = o.find(t => t.id === r[e])),
              d.id !== r.id && ((s = !0), (l = r), (u = e)),
              (c = { hasMoved: s, nextEl: d, prevEl: l, prevDir: u });
          }
          return c;
        });
      var i = r(0);
    },
    function(e, t, r) {
      'use strict';
      function n(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function i(e, t, r = !1) {
        const n = (0, m.getStore)().current.binderId;
        y.forEach(i => {
          (i.context.uniqElement && i.context.props.id !== n) ||
            i.callback.call(i.context, e, t, r);
        });
      }
      function o(e) {
        v ||
          (e === T.enter
            ? setTimeout(() => i(e, !1, !0), 0)
            : setTimeout(() => i(e, !1), 0),
          (t.clicked = v = !0));
      }
      function s(e) {
        e === T.enter && setTimeout(() => i(e, !1), 0);
      }
      function d(e) {
        t.keysCopy = y = [...b];
        const r = e.keyCode ? e.keyCode : e;
        a.default.isBlocked(r) ||
          (o(r),
          !_ &&
            -1 !== I.indexOf(r) &&
            (t.pressTimeout = B = setTimeout(() => {
              S(r, 'long'), (0, c.updatePressStatus)(!0, r), (t.fired = _ = !0);
            }, g.LONG_PRESS_TIMEOUT)),
          (0, m.getPress)().press && i(r, !0));
      }
      function l(e) {
        const r = e.keyCode ? e.keyCode : e;
        a.default.isBlocked(r) ||
          ((0, h.catcherWatcher)(r),
          S(r, 'short'),
          s(r),
          clearTimeout(B),
          (0, c.updatePressStatus)(!1),
          (t.fired = _ = !1),
          (t.clicked = v = !1));
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.getConfig = t.availableForLongPress = t.userConfig = t.rkDebounce = t.eventCb = t.pressTimeout = t.clicked = t.fired = t.keysCopy = t.keysListeners = void 0);
      var u =
        Object.assign ||
        function(e) {
          for (var t, r = 1; r < arguments.length; r++)
            for (var n in (t = arguments[r]))
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
          return e;
        };
      (t.callListeners = i),
        (t.callTriggerClick = o),
        (t.releaseClickTouch = s),
        (t.cb = d),
        (t.cbRelease = l),
        (t._init = function(e) {
          e && e.store && (0, m.updateStore)(e.store),
            (t.rkDebounce = E =
              e && e.debounce ? e.debounce : g.DEBOUNCE_TIMEOUT),
            (t.eventCb = S = e && e.eventCb ? e.eventCb : () => ({})),
            (t.userConfig = T = e && e.config ? u({}, T, e.config) : T),
            (t.availableForLongPress = I =
              e && e.longPressTouch ? e.longPressTouch : I),
            !e || (e && !e.bindkeys)
              ? (document.addEventListener('keydown', d),
                document.addEventListener('keyup', l))
              : e.bindkeys(d, l);
        }),
        (t.addListener = function(e, t) {
          const r = Math.random()
            .toString(36)
            .substring(2, 10);
          return (
            b.unshift({ id: r, callback: e, context: t }),
            b.sort(
              (e, t) => t.context.props.priority - e.context.props.priority
            ),
            r
          );
        }),
        (t.removeListener = function(e) {
          return (t.keysListeners = b = b.filter(t => t.id !== e)), null;
        });
      var c = r(1),
        a = n(r(9)),
        f = r(13),
        p = n(f),
        h = r(14),
        g = r(0),
        m = r(3);
      let b = (t.keysListeners = []),
        y = (t.keysCopy = []),
        _ = (t.fired = !1),
        v = (t.clicked = !1),
        B = (t.pressTimeout = null),
        S = (t.eventCb = null),
        E = (t.rkDebounce = g.DEBOUNCE_TIMEOUT),
        T = (t.userConfig = p.default),
        I = (t.availableForLongPress = f.AVAILABLE_FOR_LONG_PRESS);
      t.getConfig = () => T;
    },
    function(t) {
      t.exports = e;
    },
    function(e, t, r) {
      e.exports = r(19)();
    },
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.calculMarginOnLeft = t.calculMarginOnRight = t.calculMarginOnDown = t.calculMarginOnTop = t.isReachableHorizontal = t.isReachableVertical = t.isReachableRight = t.isReachableLeft = t.isReachableDown = t.isReachableTop = t.determineGeo = t.boundsMargin = t.correctBoundsMargin = void 0);
      var n =
          Object.assign ||
          function(e) {
            for (var t, r = 1; r < arguments.length; r++)
              for (var n in (t = arguments[r]))
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e;
          },
        i = r(4),
        o = r(11);
      (t.correctBoundsMargin = (e, t) => {
        const {
            wrapper: r,
            elements: n,
            marginLeft: o,
            marginTop: s,
            gap: d,
            boundedGap: l,
            topGap: u,
            leftGap: c,
          } = t,
          h = n.find(t => t.id === e),
          g = (0, i.calculateElSpace)(document.getElementById(e));
        return {
          marginLeft: f(r, g, o) ? o : m(h, d, l, c),
          marginTop: a(r, g, s) ? s : p(r, h, d, l, u),
        };
      }),
        (t.boundsMargin = (e, t, r) => {
          const {
            wrapper: a,
            elements: f,
            marginLeft: b,
            marginTop: y,
            downLimit: _,
            rightLimit: v,
            gap: B,
            boundedGap: S,
            topGap: E,
            rightGap: T,
            leftGap: I,
            downGap: O,
            selectedId: k,
          } = t;
          let C = b,
            P = y,
            M = f;
          const R = document.getElementById(k),
            x = document.getElementById(e);
          if (!(r && k !== e && R && x && a))
            return { marginLeft: C, marginTop: P, elements: M };
          const A = f.find(t => t.id === e),
            w = (0, i.calculateElSpace)(R),
            D = (0, i.calculateElSpace)(x),
            L = s(w, D);
          return (
            'left' !== L.horizontal || u(D, B, b)
              ? ('right' === L.horizontal || 'equal' === L.horizontal) &&
                !c(a, D, B, b) &&
                (C = g(a, A, B, v, S, T))
              : (C = m(A, B, S, I)),
            'top' !== L.vertical || d(D, B, P)
              ? 'down' === L.vertical &&
                !l(a, D, B, y) &&
                (P = h(a, A, B, _, S, O, y))
              : (P = p(a, A, B, S, E)),
            (b !== C || y !== P) &&
              (M = f.map(e =>
                n({}, e, {
                  isVisible: (0, o.isVisible)(
                    a,
                    e.coords,
                    C,
                    P,
                    r.visibilityOffset
                  ),
                })
              )),
            { marginLeft: C, marginTop: P, elements: M }
          );
        });
      const s = (t.determineGeo = (e, t) => {
          let r = 'equal',
            n = 'equal';
          return (
            e.left > t.left ? (n = 'left') : e.left < t.left && (n = 'right'),
            e.top > t.top ? (r = 'top') : e.top < t.top && (r = 'down'),
            { vertical: r, horizontal: n }
          );
        }),
        d = (t.isReachableTop = (e, t, r) => e.top + r >= 0 + t),
        l = (t.isReachableDown = (e, t, r, n) => e.height >= t.down + n + r),
        u = (t.isReachableLeft = (e, t, r = 0) => e.left + r >= t),
        c = (t.isReachableRight = (e, t, r, n = 0) =>
          e.width >= t.right + n + r),
        a = (t.isReachableVertical = (e, t, r) => d(t, 0, r) && l(e, t, 0, r)),
        f = (t.isReachableHorizontal = (e, t, r) =>
          u(t, 0, r) && c(e, t, 0, r)),
        p = (t.calculMarginOnTop = (e, t, r, n, i) => {
          const { top: o } = t.coords,
            s = n || i,
            d = 0 > o + (e.height + s),
            l = o - (d ? s : r) - e.top;
          return 0 > l && !d ? 0 : -l;
        }),
        h = (t.calculMarginOnDown = (e, t, r, n, i, o) => {
          const { down: s } = t.coords,
            d = i || o,
            l = s + d > n,
            u = s + (l ? d : r);
          return u > n && !l ? -(n - e.height) : -(u - e.height);
        }),
        g = (t.calculMarginOnRight = (e, t, r, n, i, o) => {
          const { right: s } = t.coords,
            d = i || o,
            l = s + d >= n,
            u = s + (l ? d : r);
          return u > n && !l ? -(n - e.width) : -(u - e.width);
        }),
        m = (t.calculMarginOnLeft = (e, t, r, n) => {
          const { left: i } = e.coords,
            o = void 0 === e.left,
            s = i - (o ? r || n : t);
          return 0 > s && !o ? 0 : -s;
        });
    },
    function(e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = new class {
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
            (this.generalBlock = !0),
              (this.blockedStuff = []),
              Array.prototype.slice.call(arguments).forEach(e => {
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
            if (!(0 < e.length))
              throw new Error(
                'unblockExcept need at least on arg, maybe you want to just unblock()'
              );
            this.block(...e);
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
        }());
    },
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.block = function(e = n.rkDebounce) {
          (i = !0), setTimeout(() => (i = !1), e);
        }),
        (t.isBlocked = function() {
          return i;
        });
      var n = r(5);
      let i = !1;
    },
    function(e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      const r = (t.insideRight = (e, t, r, n) => t.left + r <= e.width + n),
        n = (t.insideLeft = (e, t, r, n) => t.right + r >= 0 - n),
        i = (t.isHorizontalVisible = (e, t, i = 0, o = 0) =>
          n(e, t, i, o) && r(e, t, i, o)),
        o = (t.isVerticalVisible = (e, t, r = 0, n = 0) =>
          s(e, t, r, n) && d(e, t, r, n)),
        s = (t.insideTop = (e, t, r, n) => t.top + t.height + r >= 0 - n),
        d = (t.insideDown = (e, t, r, n) => t.top + r <= e.height + n);
      t.isVisible = (e, t, r, n, s) => i(e, t, r, s) && o(e, t, n, s);
    },
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.ensureState = function() {
          if (!(0, n.getStore)())
            throw new Error(`${i}keys state not present un global state`);
        }),
        (t.ensureKnownBinder = function(e) {
          return !!(0, n.getBinders)().some(t => e === t.id);
        }),
        (t.isUnknownBinder = function(e) {
          return !(0, n.getBinders)().some(t => e === t.id);
        });
      var n = r(3);
      const i = '[react-keys] - ';
    },
    function(e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = { left: 37, up: 38, right: 39, down: 40, enter: 13 }),
        (t.AVAILABLE_FOR_LONG_PRESS = [37, 38, 39, 40]);
    },
    function(e, t, r) {
      'use strict';
      function n(e, t) {
        const r = Math.random()
          .toString(36)
          .substring(2, 10);
        return l.push({ id: r, sequence: e, cb: t, history: [] }), r;
      }
      function o(e) {
        l = l.filter(t => t.id !== e);
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.catcherWatcher = function(e) {
          const t = i(e);
          l.forEach(e => {
            (e.history += t),
              e.history.length > e.sequence.length &&
                (e.history = e.history.slice(1)),
              e.history.toUpperCase() === e.sequence.toUpperCase() &&
                ((e.history = []), e.cb());
          });
        }),
        (t.addCatcher = n),
        (t.removeCatcher = o);
      var s = r(6),
        d = (function(e) {
          return e && e.__esModule ? e : { default: e };
        })(s);
      let l = [];
      t.default = (e, t) => r =>
        class extends s.Component {
          componentDidMount() {
            const r = this.props;
            this.id = n(e, () => t.call(this, r));
          }
          componentWillUnmount() {
            o(this.id);
          }
          render() {
            return d.default.createElement(r, this.props);
          }
        };
    },
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.isActive = function({ id: e, active: t }) {
          return !!t && (0, i.findMountedId)((0, n.getBinders)()) === e;
        });
      var n = r(3),
        i = r(2);
    },
    function(e, t, r) {
      'use strict';
      function n(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t._blocks = t.unblockExcept = t.blockExcept = t.unblock = t.block = t.resetCarousel = t.removeBinder = t.resetBinder = t.updateBinder = t.activeBinder = t.catcher = t.isVisibleInBinder = t.isLongPress = t.getKeyCode = t.getCurrentBinderId = t.getCurrentBinder = t.getCurrentSelectedId = t.getCarouselTargetIndexScrollPosition = t.getBinderSelectedId = t.getBinderMarginTop = t.getBinderMarginLeft = t.getBinders = t.isBinderActive = t.isCurrentBinder = t.keysSelector = t.keysReducer = t.Catcher = t.Carousel = t.Binder = t.Keys = t.keysInit = t.config = void 0);
      var i = n(r(17)),
        o = n(r(30)),
        s = n(r(31)),
        d = n(r(34)),
        l = n(r(14)),
        u = r(5),
        c = r(35),
        a = r(1),
        f = r(36),
        p = n(r(9));
      (t.config = u.getConfig),
        (t.keysInit = u._init),
        (t.Keys = o.default),
        (t.Binder = i.default),
        (t.Carousel = s.default),
        (t.Catcher = d.default),
        (t.keysReducer = c.reducer),
        (t.keysSelector = f._selector),
        (t.isCurrentBinder = f._isCurrentBinder),
        (t.isBinderActive = f._isBinderActive),
        (t.getBinders = f._getBinders),
        (t.getBinderMarginLeft = f._getBinderMarginLeft),
        (t.getBinderMarginTop = f._getBinderMarginTop),
        (t.getBinderSelectedId = f._getBinderSelectedId),
        (t.getCarouselTargetIndexScrollPosition =
          f._getCarouselTargetIndexScrollPosition),
        (t.getCurrentSelectedId = f._getCurrentSelectedId),
        (t.getCurrentBinder = f._getCurrentBinder),
        (t.getCurrentBinderId = f._getCurrentBinderId),
        (t.getKeyCode = f._getKeyCode),
        (t.isLongPress = f._isLongPress),
        (t.isVisibleInBinder = f._isVisibleInBinder),
        (t.catcher = l.default),
        (t.activeBinder = a._activeBinder),
        (t.updateBinder = a._updateBinder),
        (t.resetBinder = a._resetBinder),
        (t.removeBinder = e => (0, a._removeBinder)(e, !0)),
        (t.resetCarousel = a._resetCarousel),
        (t.block = p.default.block),
        (t.unblock = p.default.unblock),
        (t.blockExcept = p.default.blockExcept),
        (t.unblockExcept = p.default.unblockExcept),
        (t._blocks = p.default);
    },
    function(e, t, r) {
      'use strict';
      function n(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var i = r(6),
        o = n(i),
        s = r(18),
        d = r(23),
        l = r(0),
        u = r(5),
        c = r(1),
        a = n(r(25)),
        f = r(26);
      class p extends i.Component {
        constructor(e) {
          super(e),
            (this.uniqElement = !0),
            (this.innerProps = (0, a.default)(e)),
            (this.state = { mounted: !1 }),
            (this.mountStateTimeout = null);
        }
        componentWillMount() {
          (this.listenerId = (0, u.addListener)(d.keysHandler, this)),
            (0, c.addBinder)(this.innerProps, l.BINDER_TYPE);
        }
        componentWillReceiveProps(e) {
          this.innerProps = (0, a.default)(e);
        }
        componentDidMount() {
          this.setState({ mounted: !0 }),
            (this.mountStateTimeout = setTimeout(() => {
              this.state.mounted && f.mountState.apply(this);
            }, 0));
        }
        componentDidUpdate() {
          f.refreshState.apply(this);
        }
        componentWillUnmount() {
          clearTimeout(this.mountStateTimeout),
            this.setState({ mounted: !1 }),
            (this.listenerId = (0, u.removeListener)(this.listenerId)),
            (0, c._removeBinder)(this.innerProps.id);
        }
        render() {
          const { id: e, children: t } = this.innerProps;
          return o.default.createElement('div', { id: e }, t);
        }
      }
      (p.propTypes = s.propTypes),
        (p.defaultProps = s.defaultProps),
        (t.default = p);
    },
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.defaultProps = t.propTypes = void 0);
      var n = (function(e) {
        return e && e.__esModule ? e : { default: e };
      })(r(7));
      (t.propTypes = {
        id: n.default.string.isRequired,
        children: n.default.oneOfType([n.default.object, n.default.array]),
        selector: n.default.string,
        position: n.default.string,
        wrapper: n.default.string,
        filter: n.default.string,
        gap: n.default.number,
        boundedGap: n.default.number,
        topGap: n.default.number,
        rightGap: n.default.number,
        leftGap: n.default.number,
        downGap: n.default.number,
        visibilityOffset: n.default.number,
        strategy: n.default.string,
        refreshStrategy: n.default.string,
        memory: n.default.bool,
        active: n.default.bool,
        onRight: n.default.func,
        onLeft: n.default.func,
        onUp: n.default.func,
        onDown: n.default.func,
        onEnter: n.default.func,
        debounce: n.default.number,
        triggerClick: n.default.bool,
        longPress: n.default.bool,
        onLeftExit: n.default.oneOfType([n.default.string, n.default.func]),
        onRightExit: n.default.oneOfType([n.default.string, n.default.func]),
        onUpExit: n.default.oneOfType([n.default.string, n.default.func]),
        onDownExit: n.default.oneOfType([n.default.string, n.default.func]),
        priority: n.default.number,
        direction: n.default.string,
      }),
        (t.defaultProps = {
          selector: 'li',
          active: !0,
          strategy: 'none',
          refreshStrategy: 'first',
          memory: !1,
          filter: null,
          gap: 0,
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
    function(e, t, r) {
      'use strict';
      var n = r(20),
        i = r(21),
        o = r(22);
      e.exports = function() {
        function e(e, t, r, n, s, d) {
          d === o ||
            i(
              !1,
              'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types'
            );
        }
        function t() {
          return e;
        }
        e.isRequired = e;
        var r = {
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
        return (r.checkPropTypes = n), (r.PropTypes = r), r;
      };
    },
    function(e) {
      'use strict';
      function t(e) {
        return function() {
          return e;
        };
      }
      var r = function() {};
      (r.thatReturns = t),
        (r.thatReturnsFalse = t(!1)),
        (r.thatReturnsTrue = t(!0)),
        (r.thatReturnsNull = t(null)),
        (r.thatReturnsThis = function() {
          return this;
        }),
        (r.thatReturnsArgument = function(e) {
          return e;
        }),
        (e.exports = r);
    },
    function(e) {
      'use strict';
      e.exports = function(e, t, r, n, i, o, s, d) {
        if (!e) {
          var l;
          if (void 0 === t)
            l = new Error(
              'Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.'
            );
          else {
            var u = [r, n, i, o, s, d],
              c = 0;
            (l = new Error(
              t.replace(/%s/g, function() {
                return u[c++];
              })
            )).name =
              'Invariant Violation';
          }
          throw ((l.framesToPop = 1), l);
        }
      };
    },
    function(e) {
      'use strict';
      e.exports = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
    },
    function(e, t, r) {
      'use strict';
      function n(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.performAction = void 0),
        (t.keysHandler = function(e, t, r) {
          const {
            id: n,
            onLeft: p,
            onLeftExit: h,
            onUp: g,
            onUpExit: m,
            onRight: b,
            onRightExit: y,
            onDown: _,
            onDownExit: v,
            onEnter: B,
            triggerClick: S,
          } = this.innerProps;
          if (this.listenerId) {
            const E = (0, i.findBinder)((0, o.getBinders)(), n);
            if (E) {
              if (
                r &&
                S &&
                (0, u.isActive)(this.innerProps) &&
                !(0, d.isBlocked)() &&
                !l.default.isBlocked(this.innerProps.id)
              )
                return void document.getElementById(E.nextEl.id).click();
              if (
                !r &&
                (0, u.isActive)(this.innerProps) &&
                !(0, d.isBlocked)() &&
                !l.default.isBlocked(this.innerProps.id) &&
                (!t || (t && this.innerProps.longPress))
              )
                switch (e) {
                  case c.default.left:
                    f(this.innerProps, s.C_LEFT, p, h);
                    break;
                  case c.default.up:
                    f(this.innerProps, s.C_UP, g, m);
                    break;
                  case c.default.right:
                    f(this.innerProps, s.C_RIGHT, b, y);
                    break;
                  case c.default.down:
                    f(this.innerProps, s.C_DOWN, _, v);
                    break;
                  case c.default.enter:
                    B && ((0, d.block)(), (0, a.execCb)(B, E.nextEl, this));
                }
            }
          }
        });
      var i = r(2),
        o = r(3),
        s = r(0),
        d = r(10),
        l = n(r(9)),
        u = r(15),
        c = n(r(13)),
        a = r(1);
      const f = (t.performAction = (e, t, r, n) => {
        (0, d.block)(e.debounce),
          (0, a.determineNewState)(e.id, e, t, r, n, void 0);
      });
    },
    function(e, t, r) {
      'use strict';
      function i(e, t, r, i) {
        const o = (0, d.getDomElement)(i.current.selectedId),
          s = o ? o.getBoundingClientRect()[r] : 0;
        return (0, d.getCurrentChildren)((0, d.getDomElement)(e), t)
          .map(e => ({ id: e.id, diff: n(e.getBoundingClientRect()[r] - s) }))
          .sort((e, t) => e.diff - t.diff)[0].id;
      }
      function o(e, t, r) {
        const n = (0, d.getDomElement)(r),
          i = n.getBoundingClientRect()[t];
        return (0, d.getCurrentChildren)(n, e)
          .map(e => ({ id: e.id, [t]: e.getBoundingClientRect()[t] - i }))
          .filter(e => 0 <= e[t])
          .sort((e, r) => e[t] - r[t])[0].id;
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.findIdByStrategy = function(e, t, r = null) {
          if (r) return r;
          const n = (0, l.findBinder)(e.binders, t);
          if (n.type === s.CAROUSEL_TYPE) return n.selectedId;
          const {
              position: d,
              strategy: u,
              selectedId: c,
              selector: a,
              elements: f,
              memory: p,
            } = n,
            h = d === s.VERTICAL ? 'top' : 'left';
          return u === s.STRATEGY_MIRROR
            ? i(t, a, h, e)
            : u === s.STRATEGY_START
              ? o(a, h, t)
              : p
                ? c
                : f[0] && f[0].id;
        }),
        (t.findMirrorExitId = i),
        (t.findStartExitId = o);
      var s = r(0),
        d = r(4),
        l = r(2);
    },
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var n =
          Object.assign ||
          function(e) {
            for (var t, r = 1; r < arguments.length; r++)
              for (var n in (t = arguments[r]))
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e;
          },
        i = r(0);
      t.default = e => {
        let t = n({}, e);
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
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.updateState = void 0);
      var n =
        Object.assign ||
        function(e) {
          for (var t, r = 1; r < arguments.length; r++)
            for (var n in (t = arguments[r]))
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
          return e;
        };
      (t.refreshState = function() {
        const e = i.default.findDOMNode(this),
          {
            id: t,
            filter: r,
            wrapper: n,
            selector: u,
            direction: c,
          } = this.innerProps,
          f = (0, o.findBinder)((0, s.getBinders)(), t);
        if (f) {
          const t = (0, d.calculateElSpace)(
              n ? document.querySelector(n) : document.body
            ),
            i = (0, l.createList)(e, u, r);
          ((0, d.hasElementsDiff)(i, f.elements) ||
            ((0, d.hasWrapperDiff)(t, f.wrapper, c) && 0 < i.length)) &&
            a(f, t, i, this.innerProps);
        }
      }),
        (t.mountState = function() {
          const e = i.default.findDOMNode(this),
            { id: t, filter: r, wrapper: n, selector: u } = this.innerProps,
            c = (0, o.findBinder)((0, s.getBinders)(), t);
          if (c) {
            const t = (0, d.calculateElSpace)(
                n ? document.querySelector(n) : document.body
              ),
              i = (0, l.createList)(e, u, r);
            a(c, t, i, this.innerProps);
          }
        });
      var i = (function(e) {
          return e && e.__esModule ? e : { default: e };
        })(r(27)),
        o = r(2),
        s = r(3),
        d = r(4),
        l = r(28),
        u = r(1),
        c = r(29);
      const a = (t.updateState = (e, t, r, i) => {
        const { id: o, visibilityOffset: s, refreshStrategy: a } = i,
          f = [...e.elements],
          p = (0, l.build)(r, {
            marginLeft: 0,
            marginTop: 0,
            offset: s,
            wrapper: t,
          });
        e.elements = p;
        const h = (0, c.next)(r, f, e, a),
          g = {
            marginLeft: h.marginLeft,
            marginTop: h.marginTop,
            offset: s,
            wrapper: t,
          },
          m = (0, l.build)(r, g),
          b = m.find(e => e.id === h.selectedId),
          y = {
            id: o,
            wrapper: t,
            downLimit: (0, d.downLimit)(m),
            rightLimit: (0, d.rightLimit)(m),
            elements: m,
            prevDir: null,
          };
        (0, u._updateBinder)(n({}, y, h, { nextEl: b }));
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
          for (var t, r = 1; r < arguments.length; r++)
            for (var n in (t = arguments[r]))
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
          return e;
        };
      (t.build = function(e, t) {
        const { wrapper: r, marginLeft: n, offset: f, marginTop: p } = t,
          h = e.map(o.calculateElSpace);
        return h.map(e => {
          const t = i({}, e, {
            right: e.right,
            left: e.left,
            top: e.top,
            down: e.down,
          });
          return {
            id: e.id,
            coords: t,
            left: a(l(e, h)),
            right: a(d(e, h)),
            up: a(c(e, h)),
            down: a(u(e, h)),
            isVisible: (0, s.isVisible)(r, t, n, p, f),
          };
        });
      }),
        (t.createList = function(e, t, r) {
          return [].slice
            .call(e.querySelectorAll(t))
            .filter(
              e => '' !== e.id && -1 === [].slice.call(e.classList).indexOf(r)
            );
        });
      var o = r(4),
        s = r(11);
      const d = (t.rightArray = (e, t) =>
          t.filter(t => e.right <= t.left).sort(f(e, p))),
        l = (t.leftArray = (e, t) =>
          t.filter(t => e.left >= t.right).sort(f(e, h))),
        u = (t.downArray = (e, t) =>
          t.filter(t => e.down <= t.top).sort(f(e, m))),
        c = (t.upArray = (e, t) =>
          t.filter(t => e.top >= t.down).sort(f(e, g))),
        a = (t.findElement = e => (e[0] ? e[0].id : void 0)),
        f = (t.elementSort = (e, t) => (r, n) => t(r, e) - t(n, e)),
        p = (t.calculRightScore = (e, t) =>
          n(e.top - t.top) + n(e.left - t.right)),
        h = (t.calculLeftScore = (e, t) =>
          n(e.top - t.top) + n(e.right - t.left)),
        g = (t.calculUpScore = (e, t) =>
          n(e.down - t.top) + n(e.left - t.left)),
        m = (t.calculDowScore = (e, t) =>
          n(e.top - t.down) + n(e.left - t.left));
    },
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.next = void 0);
      var n =
          Object.assign ||
          function(e) {
            for (var t, r = 1; r < arguments.length; r++)
              for (var n in (t = arguments[r]))
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e;
          },
        i = r(8);
      t.next = (e, t, r, d) => {
        const { selectedId: l } = r;
        let u = {};
        if (s(e, l)) {
          u = e.find(e => e.id === l);
          const t = (0, i.correctBoundsMargin)(u.id, r);
          return n({ selectedId: u.id }, t);
        }
        if ('previous' === d && l) {
          const s = o(r.selectedId, t, e),
            d = (0, i.correctBoundsMargin)(s.id, r);
          return n({ selectedId: s.id }, d);
        }
        return 0 < e.length
          ? ((u = e[0]), { selectedId: u.id, marginLeft: 0, marginTop: 0 })
          : { selectedId: void 0, marginLeft: 0, marginTop: 0 };
      };
      const o = (e, t, r, n = 0) => {
          const i = t.map(e => e.id).indexOf(e),
            d = 0 === i ? 0 : i - 1;
          return !s(r, t[d].id) && n < r.length
            ? o(t[d].id, t, r, n + 1)
            : r[d];
        },
        s = (e, t) => void 0 !== t && e.map(e => e.id).some(e => e === t);
    },
    function(e, t, r) {
      'use strict';
      function n(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var i = r(6),
        o = n(r(7)),
        s = r(10),
        d = r(5),
        l = n(r(9)),
        u = r(1);
      class c extends i.Component {
        constructor(e) {
          super(e),
            (this.listenerId = (0, d.addListener)(this.keysHandler, this));
        }
        isActive() {
          return (
            this.props.active &&
            !(0, s.isBlocked)() &&
            !l.default.isBlocked(this.props.id)
          );
        }
        keysHandler(e, t, r) {
          if (!r && this.isActive())
            for (const t in d.userConfig) {
              const r = d.userConfig[t],
                n = t
                  .toLowerCase()
                  .replace(/\b[a-z](?=[a-z]{1})/g, e => e.toUpperCase());
              if (
                (Number.isInteger(r) && r === e) ||
                (Array.isArray(r) && -1 !== r.indexOf(e))
              ) {
                this.performAction(this.props[`on${n}`], e);
                break;
              }
            }
        }
        performAction(e, t) {
          const { debounce: r } = this.props;
          e && ((0, s.block)(r), (0, u.execCb)(e, t, this));
        }
        componentWillUnmount() {
          (0, d.removeListener)(this.listenerId);
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
      var s =
          Object.assign ||
          function(e) {
            for (var t, r = 1; r < arguments.length; r++)
              for (var n in (t = arguments[r]))
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e;
          },
        d = i(6),
        l = (function(e) {
          return e && e.__esModule ? e : { default: e };
        })(d),
        u = i(32),
        c = i(8),
        a = i(4),
        f = i(5),
        p = i(10),
        h = i(15),
        g = i(1),
        m = i(0),
        b = i(33);
      class y extends d.Component {
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
            (this.state = { cursor: e.index, elements: [] }),
            (this.leftMove = !1);
        }
        componentWillMount() {
          (this.listenerId = (0, f.addListener)(this.keysHandler, this)),
            (0, g.addBinder)(this.props, m.CAROUSEL_TYPE),
            this.updateState(this.state.cursor, this.props.children);
        }
        componentWillUpdate({ index: e, children: t, updateIndex: r }) {
          if (
            (0, a.hasElementsDiff)(t, this.props.children) ||
            this.props.index !== e
          ) {
            const n = r ? e : this.state.cursor;
            this.updateState(n, t);
          }
        }
        componentWillUnmount() {
          (0, f.removeListener)(this.listenerId),
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
          let r = 1;
          const { navigation: n, size: i } = this.props,
            o = n === m.NAVIGATION_BOUND ? i + 2 : i + 4;
          for (; t.length <= o; ) {
            const e = t.map(e => {
              const t = s({}, e.props, { id: e.props.id + '_' + r });
              return s({}, e, { props: t, key: e.props.id + '_' + r });
            });
            (t = t.concat(e)), r++;
          }
          return t;
        }
        keysHandler(e, t, r) {
          const {
              children: n,
              circular: i,
              onDownExit: o,
              onUpExit: s,
              onEnter: d,
              triggerClick: l,
              debounce: c,
            } = this.props,
            { cursor: a } = this.state;
          if (
            (r &&
              l &&
              (0, h.isActive)(this.props) &&
              !(0, p.isBlocked)() &&
              document.getElementById(n[a].props.id).click(),
            (0, h.isActive)(this.props) && !(0, p.isBlocked)())
          )
            switch (e) {
              case f.userConfig.left:
                if (!i && 0 === a) return;
                (this.leftMove = !0),
                  this.performAction((0, u.getPrev)(n.length, a));
                break;
              case f.userConfig.right:
                if (!i && a === n.length - 1) return;
                (this.leftMove = !1),
                  this.performAction((0, u.getNext)(n.length, a));
                break;
              case f.userConfig.down:
                this.performCallback(o);
                break;
              case f.userConfig.up:
                this.performCallback(s);
                break;
              case f.userConfig.enter:
                (0, p.block)(c), this.performCallback(d);
            }
        }
        isLeftMove(e, t, r) {
          return (
            !(!this.leftMove || e !== t) ||
            (!(!this.leftMove && e === t) &&
              ((this.leftMove = t < e || (0 === e && t === r.length - 1)),
              this.leftMove))
          );
        }
        performAction(e) {
          const { debounce: t, onChange: r, children: n } = this.props;
          (0, p.block)(t),
            clearTimeout(this.timeout),
            this.updateState(e, n),
            this.movingCountDown(),
            (0, g.execCb)(r, [this.selectedId, e], this);
        }
        updateState(e, t) {
          const r = this.computeChildren(t),
            { id: n, size: i, circular: o, navigation: s } = this.props;
          if (r[e]) {
            (this.selectedId = r[e].props.id),
              (0, g._updateBinder)({
                id: n,
                selectedId: this.selectedId,
                cursor: e,
                moving: !0,
              });
            const t = s === m.NAVIGATION_BOUND ? i + 2 : i + 4,
              d = (0, u.build)(r, t, e, o);
            this.setState({
              cursor: e,
              elements: d,
              gaps: this.determineGap(
                d,
                this.isLeftMove(this.state.cursor, e, d),
                e,
                this.selectedId
              ),
            });
          }
        }
        performCallback(e) {
          e && ((0, p.block)(), (0, g.enterTo)(e, this.selectedId));
        }
        determineGap(e, t, i, s) {
          const {
              navigation: d,
              id: l,
              elWidth: u,
              size: f,
              gap: p,
              index: h,
              targetIndexScrollPosition: g,
            } = this.props,
            { gaps: b } = this.state,
            y =
              b ||
              e.map(
                (e, t) => (t - (d === m.NAVIGATION_BOUND ? f - 2 : 2)) * u + p
              );
          if (d === m.NAVIGATION_BOUND) {
            const d =
                y[
                  e.findIndex(e => e && e.props && e.props.id === s) +
                    (t ? -1 : 1)
                ],
              f = { left: d, right: d + u };
            if (void 0 === b) {
              if (this.props.memory) {
                const t = e.findIndex(e => e && e.props.id === this.selectedId);
                if (g && t !== g) return y.map(e => e + u * n(g - t));
              }
              return y;
            }
            const m = (0, a.calculateElSpace)(document.getElementById(l)),
              _ = n(i - h),
              v = u * _;
            return _ + (d - u) / u <= o(1, r(m.width / u) - 1)
              ? !t && (0, c.isReachableRight)(m, f, p)
                ? (this.calcTargetIndexScrollPosition(m.width, e, i, t, !1),
                  y.map(e => e + v))
                : t && (0, c.isReachableLeft)(f, p)
                  ? (this.calcTargetIndexScrollPosition(m.width, e, i, t, !1),
                    y.map(e => e - v))
                  : this.determineJumpGap(m.width, e, i, t)
              : this.determineJumpGap(m.width, e, i, t);
          }
          return y;
        }
        updateTargetIndexScrollPosition(e) {
          const { id: t } = this.props;
          (0, g._updateBinder)({ id: t, targetIndexScrollPosition: e });
        }
        calcTargetIndexScrollPosition(e, t, n, i, o) {
          const { elWidth: s, targetIndexScrollPosition: d } = this.props,
            l = r(e / s),
            u = t.findIndex(e => e && e.props.id === this.selectedId);
          let c;
          return (
            (c = i ? (o ? u : (d || u) + 1) : o ? u - (l - 1) : (d || u) - 1),
            this.updateTargetIndexScrollPosition(c),
            c
          );
        }
        determineJumpGap(e, t, r, n) {
          const { elWidth: i } = this.props,
            o = this.calcTargetIndexScrollPosition(e, t, r, n, !0),
            s = [];
          for (let e = 0; e < t.length; e++) s[e] = (e - o) * i;
          return s;
        }
        render() {
          const {
              size: e,
              elWidth: t,
              childrenClassName: r,
              className: n,
              id: i,
            } = this.props,
            { elements: o, gaps: s } = this.state;
          return l.default.createElement(
            'div',
            {
              id: i,
              className: n,
              style: { overflow: 'hidden', position: 'absolute' },
            },
            o.map((n, i) => {
              if (n) {
                const o = s[i];
                return l.default.createElement(
                  'div',
                  {
                    id: n.props.id,
                    key: n.props.id,
                    className: r,
                    style: {
                      transform: `translateX(${o}px)`,
                      position: 'absolute',
                      width: `${t}px`,
                      display: 'block',
                      opacity: o === -2 * t || o === (e + 1) * t ? 0 : 1,
                    },
                  },
                  n
                );
              }
            })
          );
        }
      }
      (y.propTypes = b.propTypes),
        (y.defaultProps = b.defaultProps),
        (t.default = y);
    },
    function(e, t) {
      'use strict';
      function n(e, t, r = !0) {
        return r || (0 !== t && null !== t) ? (0 < t ? t - 1 : e - 1) : null;
      }
      function i(e, t, r = !0) {
        return r || (null !== t && t !== e - 1)
          ? t < e - 1
            ? t + 1
            : 0
          : null;
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.getPrev = n),
        (t.getNext = i),
        (t.build = function(e, t, o, s = !0) {
          const d = [e[o]],
            l = r(t / 2);
          let u = o,
            c = o;
          for (let t = 0; t < l; t++)
            (c = i(e.length, c, s)),
              (u = n(e.length, u, s)),
              (d[d.length] = null === c ? null : e[c]),
              d.unshift(null === u ? null : e[u]);
          return d;
        });
    },
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.defaultProps = t.propTypes = void 0);
      var n = (function(e) {
          return e && e.__esModule ? e : { default: e };
        })(r(7)),
        i = r(0);
      (t.propTypes = {
        children: n.default.oneOfType([n.default.object, n.default.array]),
        id: n.default.string.isRequired,
        active: n.default.bool,
        index: n.default.number,
        size: n.default.number,
        speed: n.default.number,
        priority: n.default.number,
        debounce: n.default.number,
        elWidth: n.default.number,
        navigation: n.default.string,
        memory: n.default.bool,
        circular: n.default.bool,
        triggerClick: n.default.bool,
        gap: n.default.number,
        className: n.default.string,
        childrenClassName: n.default.string,
        onChange: n.default.func,
        onDownExit: n.default.oneOfType([n.default.string, n.default.func]),
        onUpExit: n.default.oneOfType([n.default.string, n.default.func]),
        onEnter: n.default.func,
        updateIndex: n.default.bool,
        targetIndexScrollPosition: n.default.number,
      }),
        (t.defaultProps = {
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
          navigation: i.NAVIGATION_CENTER,
          debounce: 82,
          className: 'carousel',
          childrenClassName: 'carousel-child',
          updateIndex: !1,
        });
    },
    function(e, t, r) {
      'use strict';
      function n(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var o = r(6),
        s = (n(o), n(r(7))),
        d = r(5);
      class l extends o.Component {
        constructor(e) {
          super(e),
            (this.history = ''),
            (this.listenerId = (0, d.addListener)(this.keysHandler, this));
        }
        componentWillUnmount() {
          (0, d.removeListener)(this.listenerId);
        }
        render() {
          return this.props.children || null;
        }
        keysHandler(e) {
          (this.history += i(e)),
            this.history.length > this.props.sequence.length &&
              (this.history = this.history.slice(1)),
            this.history.toUpperCase() === this.props.sequence.toUpperCase() &&
              ((this.history = ''), this.props.cb());
        }
      }
      (l.propTypes = {
        sequence: s.default.string.isRequired,
        cb: s.default.func.isRequired,
        children: s.default.oneOfType([s.default.object, s.default.array]),
      }),
        (t.default = l);
    },
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.initialKeysSate = void 0);
      var n =
        Object.assign ||
        function(e) {
          for (var t, r = 1; r < arguments.length; r++)
            for (var n in (t = arguments[r]))
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
          return e;
        };
      t.reducer = function(e = s, t) {
        switch (t.type) {
          case i.ADD_BINDER: {
            let r = (0, o.computeAddingBinder)(e.binders, t.binder),
              i = (0, o.buildCurrent)(r, e.current);
            return n({}, e, { binders: r, current: i });
          }
          case i.MOUNT_BINDER: {
            let r = (0, o.findBinder)(e.binders, t.binderId);
            r.priority = t.priority;
            let i = (0, o.computeMountBinder)(e.binders, r),
              s = (0, o.buildCurrent)(i, e.current);
            return n({}, e, { binders: i, current: s });
          }
          case i.UPDATE_BINDER: {
            let r = (0, o.updateBinder)(e.binders, t.binder),
              i = (0, o.buildCurrent)(r, e.current);
            return n({}, e, { binders: r, current: i });
          }
          case i.REMOVE_BINDER: {
            let r = (0, o.computeRemoveBinder)(e.binders, t.binderId, t.force),
              i = (0, o.buildCurrent)(r, e.current);
            return n({}, e, { binders: r, current: i });
          }
          case i.ACTIVE_BINDER: {
            let r = e.binders;
            const i = r.findIndex(e => e.id === t.binder.id);
            (r[i] = n({}, r[i], t.binder)),
              (r = (0, o.mountBinder)(r, t.binder.id));
            let s = (0, o.buildCurrent)(r, e.current);
            return n({}, e, { binders: r, current: s });
          }
          case i.UPDATE_PRESS_STATUS:
            return n({}, e, { PRESS: { press: t.press, keyCode: t.keyCode } });
          case i.RESET_STATE:
            return s;
          default:
            return e;
        }
      };
      var i = r(1),
        o = r(2);
      const s = (t.initialKeysSate = {
        current: { binderId: null, selectedId: null },
        binders: [],
        PRESS: { press: !1 },
      });
    },
    function(e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t._isVisibleInBinder = t._isBinderActive = t._getCarouselTargetIndexScrollPosition = t._getBinderMarginTop = t._getBinderMarginLeft = t._getBinderSelectedId = t._isLongPress = t._getKeyCode = t._getCurrentBinderId = t._getCurrentBinder = t._getBinders = t._getCurrentSelectedId = t._isCurrentBinder = t._selector = void 0);
      r(0);
      var n = r(3),
        i = r(12),
        o = r(2);
      (t._selector = e => () => (
        (0, i.ensureState)(),
        (0, o.findBinder)((0, n.getBinders)(), e) || {
          marginLeft: 0,
          marginTop: 0,
        }
      )),
        (t._isCurrentBinder = e => () => (
          (0, i.ensureState)(),
          ((0, n.getStore)().current && (0, n.getStore)().current.binderId) ===
            e
        )),
        (t._getCurrentSelectedId = () => () => (
          (0, i.ensureState)(), (0, n.getStore)().current.selectedId
        )),
        (t._getBinders = () => () => (
          (0, i.ensureState)(), (0, n.getBinders)()
        )),
        (t._getCurrentBinder = () => () => {
          (0, i.ensureState)();
          const { binders: e, current: t } = (0, n.getStore)();
          return (0, o.findBinder)(e, t.binderId);
        }),
        (t._getCurrentBinderId = () => () =>
          (0, n.getStore)().current.binderId),
        (t._getKeyCode = () => () => (
          (0, i.ensureState)(), (0, n.getStore)().PRESS.keyCode
        )),
        (t._isLongPress = () => () => (
          (0, i.ensureState)(), (0, n.getStore)().PRESS.press
        )),
        (t._getBinderSelectedId = e => () => {
          (0, i.ensureState)();
          const t = (0, o.findBinder)((0, n.getBinders)(), e);
          return t ? t.selectedId : '';
        }),
        (t._getBinderMarginLeft = e => () => {
          (0, i.ensureState)();
          const t = (0, o.findBinder)((0, n.getBinders)(), e);
          return t ? t.marginLeft : 0;
        }),
        (t._getBinderMarginTop = e => () => {
          (0, i.ensureState)();
          const t = (0, o.findBinder)((0, n.getBinders)(), e);
          return t ? t.marginTop : 0;
        }),
        (t._getCarouselTargetIndexScrollPosition = e => () => {
          (0, i.ensureState)();
          const t = (0, o.findBinder)((0, n.getBinders)(), e);
          return t && t.targetIndexScrollPosition;
        }),
        (t._isBinderActive = e => () => {
          (0, i.ensureState)();
          const t = (0, o.findBinder)((0, n.getBinders)(), e);
          return t && t.mounted;
        }),
        (t._isVisibleInBinder = (e, t) => () => {
          (0, i.ensureState)();
          const r = (0, o.findBinder)((0, n.getBinders)(), e);
          if (!r) return !1;
          const s = r.elements.find(e => e.id === t);
          return !!s && s.isVisible;
        });
    },
  ]);
});
