(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a2, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a2, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a2, prop, b[prop]);
      }
    return a2;
  };
  var __spreadProps = (a2, b) => __defProps(a2, __getOwnPropDescs(b));
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __esm = (fn2, res) => function __init() {
    return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // ../dock/dock/public/js/chunks/DockSidebarToggle-tSCXPFw6.js
  var DockSidebarToggle_tSCXPFw6_exports = {};
  __export(DockSidebarToggle_tSCXPFw6_exports, {
    default: () => k
  });
  var l, d, k;
  var init_DockSidebarToggle_tSCXPFw6 = __esm({
    "../dock/dock/public/js/chunks/DockSidebarToggle-tSCXPFw6.js"() {
      init_dock_navbar_esm();
      l = ao("menu", [["path", { d: "M4 5h16", key: "1tepv9" }], ["path", { d: "M4 12h16", key: "1lakjw" }], ["path", { d: "M4 19h16", key: "1djgab" }]]);
      d = { name: "DockSidebarToggle" };
      k = gs(__spreadProps(__spreadValues({}, d), { setup(i3) {
        return (t, e) => (ke(), _n("button", { class: "flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", "aria-label": "Toggle sidebar", title: "Toggle sidebar", onClick: e[0] || (e[0] = (u) => t.$emit("toggle")) }, [Q(te(l), { class: "w-4 h-4" })]));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/DockAppLabel-CVmAu9t9.js
  var DockAppLabel_CVmAu9t9_exports = {};
  __export(DockAppLabel_CVmAu9t9_exports, {
    default: () => x
  });
  var r, i, _, d2, p, x;
  var init_DockAppLabel_CVmAu9t9 = __esm({
    "../dock/dock/public/js/chunks/DockAppLabel-CVmAu9t9.js"() {
      init_dock_navbar_esm();
      r = "/assets/dock/js/assets/dock-icon.svg";
      i = { class: "dock-app-label flex items-center gap-2 min-w-0" };
      _ = ["src"];
      d2 = { class: "text-sm font-semibold text-[var(--dock-text)] truncate max-w-[140px]" };
      p = { name: "DockAppLabel" };
      x = gs(__spreadProps(__spreadValues({}, p), { setup(k4) {
        const { settings: t } = go();
        return (m, u) => {
          var _a;
          return ke(), _n("div", i, [Ut("img", { src: te(r), alt: "Dock", class: "h-7 w-7 rounded-lg flex-shrink-0" }, null, 8, _), Ut("span", d2, Po(((_a = te(t)) == null ? void 0 : _a.site_label) || "Desk"), 1)]);
        };
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/x-Dj5OacS7.js
  var c;
  var init_x_Dj5OacS7 = __esm({
    "../dock/dock/public/js/chunks/x-Dj5OacS7.js"() {
      init_dock_navbar_esm();
      c = ao("x", [["path", { d: "M18 6 6 18", key: "1bl5f8" }], ["path", { d: "m6 6 12 12", key: "d8bk6v" }]]);
    }
  });

  // ../dock/dock/public/js/chunks/DockSearchModal-DK0qaV0n.js
  var DockSearchModal_DK0qaV0n_exports = {};
  __export(DockSearchModal_DK0qaV0n_exports, {
    default: () => Fe
  });
  function ie(r3, i3, l3, x4, m, d4) {
    return ke(), _n("div", ce, [(ke(), _n(me, null, sc(4, (p3) => Ut("div", { key: p3, class: "flex gap-3 items-center animate-pulse" }, [i3[0] || (i3[0] = Ut("div", { class: "w-2 h-2 rounded-full bg-black/10 dark:bg-white/10 shrink-0" }, null, -1)), Ut("div", { class: "flex-1 h-3 rounded bg-black/10 dark:bg-white/10", style: os({ width: `${60 + p3 * 8}%` }) }, null, 4), i3[1] || (i3[1] = Ut("div", { class: "w-12 h-2.5 rounded bg-black/10 dark:bg-white/10 shrink-0" }, null, -1))])), 64))]);
  }
  var oe, ae, se, ne, re, le, ce, ue, de, pe, ve, ke2, fe, xe, he, me2, be, ye, ge, _e, we, $e, Ce, Se, De, Re, Ae, Ee, Me2, Ne, Te2, qe, Be, Fe;
  var init_DockSearchModal_DK0qaV0n = __esm({
    "../dock/dock/public/js/chunks/DockSearchModal-DK0qaV0n.js"() {
      init_runtime_dom_esm_bundler_Df8L0cdI();
      init_dock_navbar_esm();
      init_x_Dj5OacS7();
      init_DockSearch_B2vSPXkp();
      oe = ["aria-selected"];
      ae = { class: "flex-1 text-sm text-[var(--dock-text)] truncate" };
      se = { class: "text-xs text-[var(--dock-icon)] shrink-0" };
      ne = { name: "DockSearchResultRow" };
      re = gs(__spreadProps(__spreadValues({}, ne), { props: { result: {}, appColor: {}, focused: { type: Boolean } }, emits: ["navigate"], setup(r3) {
        return (i3, l3) => {
          var _a;
          return ke(), _n("div", { role: "option", "aria-selected": r3.focused, class: qt(["flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors", r3.focused ? "bg-black/10 dark:bg-white/10" : "hover:bg-black/5 dark:hover:bg-white/5"]), onClick: l3[0] || (l3[0] = (x4) => i3.$emit("navigate", r3.result)) }, [Ut("div", { class: "w-2 h-2 rounded-full shrink-0", style: os({ backgroundColor: (_a = r3.appColor) != null ? _a : "var(--dock-icon)" }) }, null, 4), Ut("span", ae, Po(r3.result.label), 1), Ut("span", se, Po(r3.result.section), 1)], 10, oe);
        };
      } }));
      le = { name: "DockSearchLoading" };
      ce = { class: "py-2 px-3 space-y-2" };
      ue = bl(le, [["render", ie]]);
      de = { class: "px-4 py-6 text-center text-sm text-[var(--dock-icon)]" };
      pe = { key: 0 };
      ve = { key: 1 };
      ke2 = { name: "DockSearchEmpty" };
      fe = gs(__spreadProps(__spreadValues({}, ke2), { props: { query: {}, scopedApp: {} }, emits: ["clearScope"], setup(r3, { emit: i3 }) {
        const l3 = i3;
        return (x4, m) => (ke(), _n("div", de, [r3.scopedApp ? (ke(), _n("p", pe, Po(te($n)('No results for "{0}"').replace("{0}", r3.query)) + " " + Po(te($n)("in {0}").replace("{0}", r3.scopedApp)), 1)) : (ke(), _n("p", ve, Po(te($n)('No results for "{0}"').replace("{0}", r3.query)), 1)), r3.scopedApp ? (ke(), _n("button", { key: 2, class: "mt-2 text-[var(--dock-accent)] hover:underline", onClick: m[0] || (m[0] = (d4) => l3("clearScope")) }, Po(te($n)("Search in All apps")), 1)) : Zn("", true)]));
      } }));
      xe = { class: "px-4 py-6 text-center text-sm text-[var(--dock-icon)]" };
      he = { name: "DockSearchError" };
      me2 = gs(__spreadProps(__spreadValues({}, he), { emits: ["retry"], setup(r3) {
        return (i3, l3) => (ke(), _n("div", xe, [rl(Po(te($n)("Search unavailable")) + " ", 1), Ut("button", { class: "underline ml-1 hover:text-[var(--dock-text)]", onClick: l3[0] || (l3[0] = (x4) => i3.$emit("retry")) }, Po(te($n)("Try again")), 1)]));
      } }));
      be = { key: 0, class: "py-1" };
      ye = { class: "px-4 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--dock-icon)]" };
      ge = ["onClick"];
      _e = { class: "flex-1 min-w-0" };
      we = { class: "text-sm text-[var(--dock-text)] truncate" };
      $e = { class: "text-[11px] text-[var(--dock-icon)] truncate" };
      Ce = ["aria-label", "onClick"];
      Se = { key: 1, class: "px-4 py-3 text-xs text-[var(--dock-icon)]" };
      De = { name: "DockSearchRecent" };
      Re = gs(__spreadProps(__spreadValues({}, De), { emits: ["navigate"], setup(r3, { emit: i3 }) {
        const l3 = i3, { items: x4, removeItem: m } = po(), { registeredApps: d4 } = go(), p3 = Te(() => {
          var _a;
          const v2 = {};
          for (const h2 of (_a = d4.value) != null ? _a : [])
            h2.color && (v2[h2.app] = h2.color);
          return v2;
        });
        function b(v2) {
          return `/${v2.app}/${v2.doctype}/${encodeURIComponent(v2.docname)}`;
        }
        return (v2, h2) => te(x4).length ? (ke(), _n("div", be, [Ut("div", ye, Po(te($n)("Recent")), 1), (ke(true), _n(me, null, sc(te(x4), (c2) => {
          var _a;
          return ke(), _n("div", { key: c2.name, class: "group flex items-center gap-2.5 px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer", onClick: (S3) => l3("navigate", b(c2)) }, [Ut("span", { class: "w-2 h-2 rounded-full shrink-0", style: os({ background: (_a = p3.value[c2.app]) != null ? _a : "var(--dock-accent)" }) }, null, 4), Ut("div", _e, [Ut("div", we, Po(c2.label), 1), Ut("div", $e, Po(c2.doctype), 1)]), Ut("button", { class: "opacity-0 group-hover:opacity-100 text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-opacity", "aria-label": te($n)("Remove from recent"), onClick: Le((S3) => te(m)(c2.name), ["stop"]) }, [Q(te(c), { class: "w-3.5 h-3.5" })], 8, Ce)], 8, ge);
        }), 128))])) : (ke(), _n("div", Se, Po(te($n)("No recent items")), 1));
      } }));
      Ae = { role: "dialog", "aria-modal": "true", "aria-label": "Global search", class: "w-full max-w-lg bg-[var(--dock-bg)] border border-[var(--dock-border)] rounded-xl shadow-2xl overflow-hidden" };
      Ee = { class: "flex items-center gap-2 px-4 py-3 border-b border-[var(--dock-border)]" };
      Me2 = ["placeholder"];
      Ne = { class: "flex gap-1 px-3 pt-2 pb-1 overflow-x-auto" };
      Te2 = ["onClick"];
      qe = { role: "listbox", class: "max-h-[60vh] overflow-y-auto" };
      Be = { name: "DockSearchModal" };
      Fe = gs(__spreadProps(__spreadValues({}, Be), { emits: ["close"], setup(r3, { emit: i3 }) {
        const l3 = i3, { registeredApps: x4 } = go(), m = Te(() => {
          var _a;
          const t = {};
          for (const a2 of (_a = x4.value) != null ? _a : [])
            a2.color && (t[a2.app] = a2.color);
          return t;
        }), d4 = Ye(""), p3 = Ye(null), b = Ye([]), v2 = Ye(false), h2 = Ye(false), c2 = Ye(-1), S3 = Ye(null), F4 = Te(() => {
          const t = {};
          for (const a2 of b.value)
            t[a2.app] || (t[a2.app] = []), t[a2.app].push(a2);
          return t;
        }), A4 = Te(() => b.value);
        let E4 = null;
        Mn(d4, (t) => {
          if (h2.value = false, c2.value = -1, E4 && clearTimeout(E4), t.length < 2) {
            b.value = [], v2.value = false;
            return;
          }
          v2.value = true, E4 = setTimeout(w3, 200);
        });
        async function w3() {
          if (!(d4.value.length < 2)) {
            v2.value = true, h2.value = false;
            try {
              b.value = await xt("dock.api.search.global_search", __spreadValues({ query: d4.value }, p3.value ? { app: p3.value } : {}));
            } catch (e) {
              h2.value = true;
            } finally {
              v2.value = false;
            }
          }
        }
        function q6(t) {
          if (t.key === "Escape") {
            l3("close");
            return;
          }
          t.key === "ArrowDown" ? (t.preventDefault(), c2.value = Math.min(c2.value + 1, A4.value.length - 1)) : t.key === "ArrowUp" ? (t.preventDefault(), c2.value = Math.max(c2.value - 1, 0)) : t.key === "Enter" && c2.value >= 0 && B2(A4.value[c2.value]);
        }
        function B2(t) {
          window.location.href = t.route, l3("close");
        }
        function G5(t) {
          window.location.href = t, l3("close");
        }
        function K6(t) {
          t.target.id === "dock-search-backdrop" && l3("close");
        }
        return Ft(() => oi(() => {
          var _a;
          return (_a = S3.value) == null ? void 0 : _a.focus();
        })), Ft(() => document.addEventListener("keydown", q6)), hn(() => document.removeEventListener("keydown", q6)), (t, a2) => (ke(), nt(ec, { to: "body" }, [Ut("div", { id: "dock-search-backdrop", class: "fixed inset-0 z-40 bg-black/40 flex items-start justify-center pt-[10vh] px-4", onMousedown: K6 }, [Ut("div", Ae, [Ut("div", Ee, [Q(te(d3), { class: "w-4 h-4 text-[var(--dock-icon)] shrink-0" }), Ql(Ut("input", { ref_key: "inputRef", ref: S3, "onUpdate:modelValue": a2[0] || (a2[0] = (k4) => d4.value = k4), type: "text", class: "flex-1 bg-transparent text-[var(--dock-text)] text-sm outline-none placeholder-[var(--dock-icon)]", placeholder: te($n)("Search...") }, null, 8, Me2), [[Me, d4.value]]), d4.value ? (ke(), _n("button", { key: 0, class: "text-[var(--dock-icon)] hover:text-[var(--dock-text)]", onClick: a2[1] || (a2[1] = (k4) => d4.value = "") }, [Q(te(c), { class: "w-4 h-4" })])) : Zn("", true), a2[4] || (a2[4] = Ut("kbd", { class: "text-xs text-[var(--dock-icon)] bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded" }, "Esc", -1))]), Ut("div", Ne, [Ut("button", { class: qt(["px-2.5 py-1 rounded-full text-xs font-medium transition-colors shrink-0", p3.value ? "text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10" : "bg-[var(--dock-accent)] text-white"]), onClick: a2[2] || (a2[2] = (k4) => {
          p3.value = null, w3();
        }) }, Po(te($n)("All")), 3), (ke(true), _n(me, null, sc(te(x4), (k4) => (ke(), _n("button", { key: k4.app, class: qt(["px-2.5 py-1 rounded-full text-xs font-medium transition-colors shrink-0", p3.value === k4.app ? "bg-[var(--dock-accent)] text-white" : "text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10"]), onClick: (L4) => {
          p3.value = k4.app, w3();
        } }, Po(k4.label), 11, Te2))), 128))]), Ut("div", qe, [v2.value ? (ke(), nt(ue, { key: 0 })) : h2.value ? (ke(), nt(me2, { key: 1, onRetry: w3 })) : d4.value.length >= 2 ? (ke(), _n(me, { key: 2 }, [b.value.length ? (ke(true), _n(me, { key: 1 }, sc(F4.value, (k4, L4) => (ke(), _n(me, { key: L4 }, [(ke(true), _n(me, null, sc(k4, (D3, Le4) => (ke(), nt(re, { key: D3.name, result: D3, "app-color": m.value[D3.app], focused: A4.value.indexOf(D3) === c2.value, onNavigate: B2 }, null, 8, ["result", "app-color", "focused"]))), 128)), a2[5] || (a2[5] = Ut("div", { class: "mx-4 border-b border-[var(--dock-border)]" }, null, -1))], 64))), 128)) : (ke(), nt(fe, { key: 0, query: d4.value, "scoped-app": p3.value, onClearScope: a2[3] || (a2[3] = (k4) => {
          p3.value = null, w3();
        }) }, null, 8, ["query", "scoped-app"]))], 64)) : (ke(), nt(Re, { key: 3, onNavigate: G5 }))])])], 32)]));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/DockSearch-B2vSPXkp.js
  var DockSearch_B2vSPXkp_exports = {};
  __export(DockSearch_B2vSPXkp_exports, {
    D: () => E,
    S: () => d3
  });
  var d3, w, D, E;
  var init_DockSearch_B2vSPXkp = __esm({
    "../dock/dock/public/js/chunks/DockSearch-B2vSPXkp.js"() {
      init_dock_navbar_esm();
      d3 = ao("search", [["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }], ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]]);
      w = { name: "DockSearch" };
      D = gs(__spreadProps(__spreadValues({}, w), { setup(C3) {
        const t = Ye(false), i3 = Ke(() => We(() => Promise.resolve().then(() => (init_DockSearchModal_DK0qaV0n(), DockSearchModal_DK0qaV0n_exports)), []));
        function r3(o2) {
          (o2.metaKey || o2.ctrlKey) && o2.key === "k" && (o2.preventDefault(), t.value = true);
        }
        return Ft(() => document.addEventListener("keydown", r3)), hn(() => document.removeEventListener("keydown", r3)), (o2, e) => (ke(), _n(me, null, [Ut("button", { class: "dock-search hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors text-[var(--dock-icon)] text-sm min-w-[180px]", "aria-label": "Search", onClick: e[0] || (e[0] = (s) => t.value = true) }, [Q(te(d3), { class: "w-3.5 h-3.5 shrink-0" }), Ut("span", null, Po(te($n)("Search...")), 1), e[3] || (e[3] = Ut("kbd", { class: "ml-auto text-xs bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono" }, "\u2318K", -1))]), Ut("button", { class: "dock-search md:hidden flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", "aria-label": "Search", title: "Search", onClick: e[1] || (e[1] = (s) => t.value = true) }, [Q(te(d3), { class: "w-4 h-4" })]), t.value ? (ke(), nt(te(i3), { key: 0, onClose: e[2] || (e[2] = (s) => t.value = false) })) : Zn("", true)], 64));
      } }));
      E = Object.freeze(Object.defineProperty({ __proto__: null, default: D }, Symbol.toStringTag, { value: "Module" }));
    }
  });

  // ../dock/dock/public/js/chunks/DockTimer-90Bo_qQ5.js
  var DockTimer_90Bo_qQ5_exports = {};
  __export(DockTimer_90Bo_qQ5_exports, {
    default: () => We2
  });
  var ne2, oe2, se2, le2, re2, ie2, de2, ce2, ue2, z, ve2, me3, pe2, ke3, xe2, fe2, ge2, ye2, be2, _e2, he2, $e2, we2, Ce2, Te3, Se2, Ee2, De2, Be2, Ie, Le2, Ne2, Ve, Ae2, Me3, Re2, ze, Fe2, Ue, We2;
  var init_DockTimer_90Bo_qQ5 = __esm({
    "../dock/dock/public/js/chunks/DockTimer-90Bo_qQ5.js"() {
      init_dock_navbar_esm();
      init_x_Dj5OacS7();
      init_runtime_dom_esm_bundler_Df8L0cdI();
      ne2 = ao("clock", [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }]]);
      oe2 = { class: "p-3 space-y-3" };
      se2 = { class: "text-xs font-medium text-[var(--dock-text)]" };
      le2 = { key: 0, class: "flex items-center gap-1.5 bg-black/5 dark:bg-white/10 rounded-md px-2 py-1 text-xs text-[var(--dock-text)]" };
      re2 = { class: "truncate" };
      ie2 = ["placeholder"];
      de2 = { class: "flex gap-2" };
      ce2 = ["disabled"];
      ue2 = { name: "DockTimerStartForm" };
      z = gs(__spreadProps(__spreadValues({}, ue2), { props: { pending: {}, loading: { type: Boolean } }, emits: ["start", "cancel"], setup(o2, { emit: f }) {
        var _a;
        const c2 = o2, p3 = f, t = Ye((_a = c2.pending) != null ? _a : null);
        return (u, r3) => (ke(), _n("div", oe2, [Ut("p", se2, Po(te($n)("Start Timer")), 1), t.value ? (ke(), _n("div", le2, [Ut("span", re2, Po(t.value.label) + " \xB7 " + Po(t.value.doctype), 1), Ut("button", { class: "shrink-0 text-[var(--dock-icon)] hover:text-[var(--dock-text)]", onClick: r3[0] || (r3[0] = (m) => t.value = null) }, [Q(te(c), { class: "w-3 h-3" })])])) : (ke(), _n("input", { key: 1, type: "text", class: "w-full text-sm rounded border border-[var(--dock-border)] bg-[var(--dock-bg)] text-[var(--dock-text)] px-2 py-1.5 placeholder-[var(--dock-icon)] focus:outline-none focus:ring-1 focus:ring-[var(--dock-accent)]", placeholder: te($n)("What are you working on?") }, null, 8, ie2)), Ut("div", de2, [Ut("button", { class: "flex-1 px-3 py-1.5 rounded-md bg-[var(--dock-accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50", disabled: o2.loading, onClick: r3[1] || (r3[1] = (m) => p3("start", t.value)) }, "\u25B6 " + Po(te($n)("Start")), 9, ce2), Ut("button", { class: "px-3 py-1.5 rounded-md text-sm text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10", onClick: r3[2] || (r3[2] = (m) => p3("cancel")) }, Po(te($n)("Cancel")), 1)])]));
      } }));
      ve2 = { class: "p-3 space-y-2" };
      me3 = { class: "flex items-center gap-2" };
      pe2 = { key: 0, class: "text-xs text-[var(--dock-icon)]" };
      ke3 = { key: 0, class: "text-xs text-[var(--dock-text)] truncate" };
      xe2 = { key: 0, class: "text-[var(--dock-icon)]" };
      fe2 = { class: "flex items-center gap-2 pt-1" };
      ge2 = ["disabled"];
      ye2 = ["disabled"];
      be2 = ["disabled"];
      _e2 = { name: "DockTimerActiveView" };
      he2 = gs(__spreadProps(__spreadValues({}, _e2), { props: { state: {}, display: {}, loading: { type: Boolean } }, emits: ["pause", "resume", "stop", "edit"], setup(o2, { emit: f }) {
        const c2 = f;
        return (p3, t) => (ke(), _n("div", ve2, [Ut("div", me3, [Ut("span", { class: qt(["w-2 h-2 rounded-full shrink-0", o2.state.state === "running" ? "bg-green-500 animate-pulse" : "bg-amber-500"]) }, null, 2), Ut("span", { "aria-live": "polite", class: qt(["text-sm font-mono font-semibold", o2.state.state === "running" ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"]) }, Po(o2.display), 3), o2.state.state === "paused" ? (ke(), _n("span", pe2, "(" + Po(te($n)("paused")) + ")", 1)) : Zn("", true)]), o2.state.context_label ? (ke(), _n("div", ke3, [rl(Po(o2.state.context_label) + " ", 1), o2.state.context_doctype ? (ke(), _n("span", xe2, " \xB7 " + Po(o2.state.context_doctype), 1)) : Zn("", true)])) : Zn("", true), Ut("div", fe2, [o2.state.state === "running" ? (ke(), _n("button", { key: 0, class: "flex-1 px-3 py-1.5 rounded-md bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition-colors disabled:opacity-50", disabled: o2.loading, onClick: t[0] || (t[0] = (u) => c2("pause")) }, "\u23F8 " + Po(te($n)("Pause")), 9, ge2)) : (ke(), _n("button", { key: 1, class: "flex-1 px-3 py-1.5 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50", disabled: o2.loading, onClick: t[1] || (t[1] = (u) => c2("resume")) }, "\u25B6 " + Po(te($n)("Resume")), 9, ye2)), Ut("button", { class: "px-3 py-1.5 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50", disabled: o2.loading, onClick: t[2] || (t[2] = (u) => c2("stop")) }, "\u23F9 " + Po(te($n)("Stop")), 9, be2), Ut("button", { class: "px-2 py-1.5 rounded-md text-xs text-[var(--dock-icon)] hover:text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10", onClick: t[3] || (t[3] = (u) => c2("edit")) }, "\u270E")])]));
      } }));
      $e2 = { key: 0, class: "p-3 space-y-2" };
      we2 = { class: "text-sm text-green-600 dark:text-green-400 font-medium" };
      Ce2 = ["href"];
      Te3 = { key: 1, class: "p-3 space-y-3" };
      Se2 = ["placeholder"];
      Ee2 = { class: "flex gap-2" };
      De2 = ["disabled"];
      Be2 = { name: "DockTimerStopForm" };
      Ie = gs(__spreadProps(__spreadValues({}, Be2), { props: { loading: { type: Boolean }, entryName: {} }, emits: ["stop", "cancel"], setup(o2, { emit: f }) {
        const c2 = f, p3 = Ye("");
        return (t, u) => o2.entryName !== void 0 && o2.entryName !== null ? (ke(), _n("div", $e2, [Ut("p", we2, "\u2713 " + Po(te($n)("Time entry saved")), 1), Ut("a", { href: `/app/ft-time-entry/${o2.entryName}`, class: "text-xs text-[var(--dock-accent)] hover:underline" }, Po(te($n)("View time entry")) + " \u2192", 9, Ce2)])) : (ke(), _n("div", Te3, [Ql(Ut("textarea", { "onUpdate:modelValue": u[0] || (u[0] = (r3) => p3.value = r3), class: "w-full text-sm rounded border border-[var(--dock-border)] bg-[var(--dock-bg)] text-[var(--dock-text)] px-2 py-1.5 resize-none h-16 placeholder-[var(--dock-icon)] focus:outline-none focus:ring-1 focus:ring-[var(--dock-accent)]", placeholder: te($n)("Add notes...") }, null, 8, Se2), [[Me, p3.value]]), Ut("div", Ee2, [Ut("button", { class: "flex-1 px-3 py-1.5 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50", disabled: o2.loading, onClick: u[1] || (u[1] = (r3) => c2("stop", p3.value)) }, "\u23F9 " + Po(te($n)("Stop & Save")), 9, De2), Ut("button", { class: "px-3 py-1.5 rounded-md text-sm text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10", onClick: u[2] || (u[2] = (r3) => c2("cancel")) }, Po(te($n)("Cancel")), 1)])]));
      } }));
      Le2 = { class: "p-3 text-sm text-[var(--dock-icon)] text-center" };
      Ne2 = { name: "DockTimerError" };
      Ve = gs(__spreadProps(__spreadValues({}, Ne2), { emits: ["retry"], setup(o2) {
        return (f, c2) => (ke(), _n("div", Le2, [rl(Po(te($n)("Timer unavailable")) + " ", 1), Ut("button", { class: "underline ml-1 hover:text-[var(--dock-text)]", onClick: c2[0] || (c2[0] = (p3) => f.$emit("retry")) }, Po(te($n)("Try again")), 1)]));
      } }));
      Ae2 = { key: 0, id: "dock-timer-root", class: "dock-timer relative" };
      Me3 = ["aria-label"];
      Re2 = { key: 0, class: "w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" };
      ze = { key: 2 };
      Fe2 = { key: 0, role: "dialog", "aria-label": "Timer", class: "absolute right-0 top-full mt-2 w-64 bg-[var(--dock-bg)] border border-[var(--dock-border)] rounded-lg shadow-lg z-20 overflow-hidden" };
      Ue = { name: "DockTimer" };
      We2 = gs(__spreadProps(__spreadValues({}, Ue), { setup(o2) {
        var _a, _b, _c, _d, _e5, _f;
        const { settings: f } = go(), c2 = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) != null ? _c : window.dockBoot, p3 = (c2 == null ? void 0 : c2.frappe_time_installed) === true && ((_d = f.value) == null ? void 0 : _d.enable_global_timer) === true, t = Ye((_e5 = c2 == null ? void 0 : c2.timer_state) != null ? _e5 : { state: "stopped" }), u = Ye(null), r3 = Ye(false), m = Ye("start"), k4 = Ye(false), y = Ye(false), I2 = Ye(void 0), C3 = Ye((_f = t.value.elapsed_seconds) != null ? _f : 0);
        let T4 = null;
        function U5() {
          if (E4(), t.value.state !== "running")
            return;
          const e = t.value.started_at ? new Date(t.value.started_at).getTime() : 0;
          T4 = setInterval(() => {
            C3.value = e ? Math.floor((Date.now() - e) / 1e3) : C3.value + 1;
          }, 1e3);
        }
        function E4() {
          T4 && (clearInterval(T4), T4 = null);
        }
        function b(e) {
          var _a2;
          t.value = e, C3.value = (_a2 = e.elapsed_seconds) != null ? _a2 : 0, E4(), e.state === "running" && U5(), (e.state === "stopped" || e.state === "running" || e.state === "paused") && (m.value = e.state === "stopped" ? "start" : "active");
        }
        const S3 = Te(() => {
          const e = C3.value, a2 = Math.floor(e / 3600), g3 = Math.floor(e % 3600 / 60), G5 = e % 60;
          return [a2, g3, G5].map((H6) => String(H6).padStart(2, "0")).join(":");
        });
        function L4(e) {
          b(e);
        }
        let D3 = null;
        async function K6() {
          try {
            const e = await xt("dock.api.timer.get_state");
            b(e);
          } catch (e) {
          }
        }
        function N2(e) {
          var _a2;
          u.value = (_a2 = e.detail) != null ? _a2 : null;
        }
        Ft(() => {
          var _a2;
          if (!p3)
            return;
          b(t.value);
          const e = (_a2 = window.frappe) == null ? void 0 : _a2.realtime;
          (e == null ? void 0 : e.on) && e.on("dock_timer_update", L4), D3 = setInterval(K6, 3e4), window.addEventListener("dock:setTimerContext", N2), document.addEventListener("mousedown", V2), document.addEventListener("keydown", A4);
        }), hn(() => {
          var _a2;
          if (!p3)
            return;
          E4(), D3 && clearInterval(D3);
          const e = (_a2 = window.frappe) == null ? void 0 : _a2.realtime;
          (e == null ? void 0 : e.off) && e.off("dock_timer_update", L4), window.removeEventListener("dock:setTimerContext", N2), document.removeEventListener("mousedown", V2), document.removeEventListener("keydown", A4);
        });
        function V2(e) {
          const a2 = document.getElementById("dock-timer-root");
          a2 && !a2.contains(e.target) && (r3.value = false);
        }
        function A4(e) {
          e.key === "Escape" && r3.value && (r3.value = false);
        }
        async function M2(e) {
          k4.value = true, y.value = false;
          try {
            const a2 = await xt("dock.api.timer.start", e ? { context_app: e.app, context_doctype: e.doctype, context_name: e.name, context_label: e.label } : {});
            b(a2);
          } catch (e2) {
            y.value = true;
          } finally {
            k4.value = false;
          }
        }
        async function O5() {
          k4.value = true;
          try {
            b(await xt("dock.api.timer.pause"));
          } catch (e) {
            y.value = true;
          } finally {
            k4.value = false;
          }
        }
        async function P3(e) {
          var _a2;
          k4.value = true;
          try {
            const a2 = await xt("dock.api.timer.stop", e ? { notes: e } : {});
            I2.value = (_a2 = a2.entry_name) != null ? _a2 : null, b(a2), m.value = "stop";
          } catch (e2) {
            y.value = true;
          } finally {
            k4.value = false;
          }
        }
        async function W4(e) {
          if (e) {
            k4.value = true;
            try {
              const a2 = await xt("dock.api.timer.update_context", { context_app: e.app, context_doctype: e.doctype, context_name: e.name, context_label: e.label });
              b(a2), m.value = "active";
            } catch (e2) {
              y.value = true;
            } finally {
              k4.value = false;
            }
          }
        }
        const j3 = Te(() => t.value.state === "running" ? `Timer running, ${S3.value}. Click to manage.` : t.value.state === "paused" ? `Timer paused, ${S3.value}. Click to manage.` : "Start timer");
        return (e, a2) => te(p3) ? (ke(), _n("div", Ae2, [Ut("button", { class: qt(["flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-colors text-sm font-mono hover:bg-black/5 dark:hover:bg-white/10", { "text-green-600 dark:text-green-400": t.value.state === "running", "text-amber-600 dark:text-amber-400": t.value.state === "paused", "text-[var(--dock-icon)]": t.value.state === "stopped" }]), "aria-label": j3.value, onClick: a2[0] || (a2[0] = (g3) => r3.value = !r3.value) }, [t.value.state === "running" ? (ke(), _n("span", Re2)) : (ke(), nt(te(ne2), { key: 1, class: "w-3.5 h-3.5" })), t.value.state !== "stopped" ? (ke(), _n("span", ze, Po(S3.value), 1)) : Zn("", true)], 10, Me3), r3.value ? (ke(), _n("div", Fe2, [y.value ? (ke(), nt(Ve, { key: 0, onRetry: a2[1] || (a2[1] = (g3) => y.value = false) })) : (ke(), _n(me, { key: 1 }, [m.value === "start" ? (ke(), nt(z, { key: 0, pending: u.value, loading: k4.value, onStart: M2, onCancel: a2[2] || (a2[2] = (g3) => r3.value = false) }, null, 8, ["pending", "loading"])) : m.value === "active" && (t.value.state === "running" || t.value.state === "paused") ? (ke(), nt(he2, { key: 1, state: t.value, display: S3.value, loading: k4.value, onPause: O5, onResume: a2[3] || (a2[3] = (g3) => M2(null)), onStop: a2[4] || (a2[4] = (g3) => m.value = "stop"), onEdit: a2[5] || (a2[5] = (g3) => m.value = "edit") }, null, 8, ["state", "display", "loading"])) : m.value === "edit" ? (ke(), nt(z, { key: 2, pending: u.value, loading: k4.value, onStart: W4, onCancel: a2[6] || (a2[6] = (g3) => m.value = "active") }, null, 8, ["pending", "loading"])) : m.value === "stop" ? (ke(), nt(Ie, { key: 3, loading: k4.value, "entry-name": I2.value, onStop: P3, onCancel: a2[7] || (a2[7] = (g3) => m.value = "active") }, null, 8, ["loading", "entry-name"])) : Zn("", true)], 64))])) : Zn("", true)])) : Zn("", true);
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/DockTimerStaleWarning-DDNZLr8e.js
  var DockTimerStaleWarning_DDNZLr8e_exports = {};
  __export(DockTimerStaleWarning_DDNZLr8e_exports, {
    default: () => A
  });
  var g, x2, E2, A;
  var init_DockTimerStaleWarning_DDNZLr8e = __esm({
    "../dock/dock/public/js/chunks/DockTimerStaleWarning-DDNZLr8e.js"() {
      init_dock_navbar_esm();
      g = { key: 0, class: "w-full flex items-center justify-between gap-4 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-700 text-sm text-amber-800 dark:text-amber-300" };
      x2 = { class: "flex items-center gap-3 shrink-0" };
      E2 = { name: "DockTimerStaleWarning" };
      A = gs(__spreadProps(__spreadValues({}, E2), { setup(w3) {
        var _a, _b, _c, _d;
        const a2 = (_d = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) != null ? _c : window.dockBoot) == null ? void 0 : _d.timer_state, l3 = Ye(false), e = Ye(false);
        Ft(() => {
          (a2 == null ? void 0 : a2.state) === "running" && (a2 == null ? void 0 : a2.elapsed_seconds) > 14400 && (e.value = true);
        });
        const d4 = Te(() => {
          var _a2;
          const n = (_a2 = a2 == null ? void 0 : a2.elapsed_seconds) != null ? _a2 : 0, o2 = Math.floor(n / 3600), i3 = Math.floor(n % 3600 / 60);
          return o2 > 0 ? `${o2}h ${i3}m` : `${i3}m`;
        });
        async function m() {
          try {
            await xt("dock.api.timer.stop");
          } catch (e2) {
          }
          e.value = false;
        }
        function p3() {
          l3.value = true, e.value = false;
        }
        return (n, o2) => e.value && !l3.value ? (ke(), _n("div", g, [Ut("span", null, "\u26A0 " + Po(te($n)("Your timer has been running for {0}").replace("{0}", d4.value)), 1), Ut("div", x2, [Ut("button", { class: "font-medium underline hover:no-underline", onClick: m }, Po(te($n)("Stop & Save")), 1), Ut("button", { class: "hover:underline", onClick: p3 }, Po(te($n)("Keep running")), 1)])])) : Zn("", true);
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/useRelativeTime-DgKW5Wq7.js
  function a(o2) {
    const e = new Date(o2), i3 = new Date().getTime() - e.getTime(), t = Math.floor(i3 / 6e4);
    if (t < 60)
      return `${Math.max(t, 1)}m`;
    const n = Math.floor(t / 60);
    return n < 24 ? `${n}h` : e.toLocaleDateString(void 0, { month: "short", day: "numeric" });
  }
  var init_useRelativeTime_DgKW5Wq7 = __esm({
    "../dock/dock/public/js/chunks/useRelativeTime-DgKW5Wq7.js"() {
    }
  });

  // ../dock/dock/public/js/chunks/DockNotificationError.vue_vue_type_script_setup_true_lang-Xcr2rd0Y.js
  function H(t, n, i3, l3, d4, p3) {
    return ke(), _n("div", F, [(ke(), _n(me, null, sc(3, (k4) => Ut("div", { key: k4, class: "px-3 py-2.5 flex gap-3 items-start animate-pulse" }, [...n[0] || (n[0] = [Ut("div", { class: "w-4 h-4 rounded bg-black/10 dark:bg-white/10 mt-0.5 shrink-0" }, null, -1), Ut("div", { class: "flex-1 space-y-1.5" }, [Ut("div", { class: "h-3 rounded bg-black/10 dark:bg-white/10 w-3/4" }), Ut("div", { class: "h-2.5 rounded bg-black/10 dark:bg-white/10 w-1/2" })], -1)])])), 64))]);
  }
  var L, M, V, z2, R, q, B, I, T, A2, j, F, J, S, G, Q2, K, O, U;
  var init_DockNotificationError_vue_vue_type_script_setup_true_lang_Xcr2rd0Y = __esm({
    "../dock/dock/public/js/chunks/DockNotificationError.vue_vue_type_script_setup_true_lang-Xcr2rd0Y.js"() {
      init_runtime_dom_esm_bundler_Df8L0cdI();
      init_useRelativeTime_DgKW5Wq7();
      init_dock_navbar_esm();
      init_x_Dj5OacS7();
      L = ao("external-link", [["path", { d: "M15 3h6v6", key: "1q9fwt" }], ["path", { d: "M10 14 21 3", key: "gplh6r" }], ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]]);
      M = { class: "flex-1 min-w-0" };
      V = { key: 0, class: "text-xs text-[var(--dock-icon)] truncate mt-0.5" };
      z2 = { class: "shrink-0 flex flex-col items-end gap-0.5 pt-0.5" };
      R = { class: "text-[10px] text-[var(--dock-icon)] capitalize" };
      q = { class: "text-[10px] text-[var(--dock-icon)]" };
      B = { class: "absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex gap-1" };
      I = ["href"];
      T = { name: "DockNotificationRow" };
      A2 = gs(__spreadProps(__spreadValues({}, T), { props: { notification: {}, typeInfo: {}, appColor: {} }, emits: ["markRead", "navigate"], setup(t, { emit: n }) {
        const i3 = t, l3 = n, d4 = Te(() => !i3.notification.read), p3 = Te(() => a(i3.notification.creation));
        return (k4, r3) => {
          var _a;
          return ke(), _n("div", { role: "menuitem", class: "group relative flex gap-3 items-start px-3 py-2.5 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors", onClick: r3[2] || (r3[2] = (_2) => l3("navigate", t.notification)) }, [Ut("div", { class: "w-2 h-2 rounded-full mt-1.5 shrink-0", style: os({ backgroundColor: (_a = t.appColor) != null ? _a : "var(--dock-icon)" }) }, null, 4), Ut("div", M, [Ut("p", { class: qt(["text-sm truncate", d4.value ? "font-semibold text-[var(--dock-text)]" : "font-normal text-[var(--dock-text)]"]) }, Po(t.notification.title), 3), t.notification.message ? (ke(), _n("p", V, Po(t.notification.message), 1)) : Zn("", true)]), Ut("div", z2, [Ut("span", R, Po(t.notification.from_app), 1), Ut("span", q, Po(p3.value), 1)]), Ut("div", B, [t.notification.action_url ? (ke(), _n("a", { key: 0, href: t.notification.action_url, target: "_blank", rel: "noopener", class: "w-6 h-6 flex items-center justify-center rounded bg-[var(--dock-bg)] shadow-sm text-[var(--dock-icon)] hover:text-[var(--dock-text)]", onClick: r3[0] || (r3[0] = Le(() => {
          }, ["stop"])) }, [Q(te(L), { class: "w-3 h-3" })], 8, I)) : Zn("", true), d4.value ? (ke(), _n("button", { key: 1, class: "w-6 h-6 flex items-center justify-center rounded bg-[var(--dock-bg)] shadow-sm text-[var(--dock-icon)] hover:text-[var(--dock-text)]", onClick: r3[1] || (r3[1] = Le((_2) => l3("markRead", t.notification.name), ["stop"])) }, [Q(te(c), { class: "w-3 h-3" })])) : Zn("", true)])]);
        };
      } }));
      j = { name: "DockNotificationLoading" };
      F = { class: "py-1" };
      J = bl(j, [["render", H]]);
      S = { class: "px-3 py-6 text-center text-sm text-[var(--dock-icon)]" };
      G = { name: "DockNotificationEmpty" };
      Q2 = gs(__spreadProps(__spreadValues({}, G), { setup(t) {
        return (n, i3) => (ke(), _n("div", S, Po(te($n)("You're all caught up")), 1));
      } }));
      K = { class: "px-3 py-4 text-center text-sm text-[var(--dock-icon)]" };
      O = { name: "DockNotificationError" };
      U = gs(__spreadProps(__spreadValues({}, O), { emits: ["retry"], setup(t) {
        return (n, i3) => (ke(), _n("div", K, [rl(Po(te($n)("Notification unavailable")) + " ", 1), Ut("button", { class: "underline ml-1 hover:text-[var(--dock-text)]", onClick: i3[0] || (i3[0] = (l3) => n.$emit("retry")) }, Po(te($n)("Try again")), 1)]));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/DockBell-kQiZXls_.js
  var DockBell_kQiZXls_exports = {};
  __export(DockBell_kQiZXls_exports, {
    default: () => ae2
  });
  var K2, O2, T2, G2, H2, J2, P, Q3, U2, q2, W, X, ae2;
  var init_DockBell_kQiZXls = __esm({
    "../dock/dock/public/js/chunks/DockBell-kQiZXls_.js"() {
      init_dock_navbar_esm();
      init_DockNotificationError_vue_vue_type_script_setup_true_lang_Xcr2rd0Y();
      init_runtime_dom_esm_bundler_Df8L0cdI();
      init_useRelativeTime_DgKW5Wq7();
      init_x_Dj5OacS7();
      K2 = ao("bell", [["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }], ["path", { d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326", key: "11g9vi" }]]);
      O2 = { class: "absolute right-0 top-full mt-2 w-80 bg-[var(--dock-bg)] border border-[var(--dock-border)] rounded-lg shadow-lg z-20 overflow-hidden", role: "menu", "aria-label": "Notifications" };
      T2 = { class: "flex items-center justify-between px-3 py-2 border-b border-[var(--dock-border)]" };
      G2 = { class: "text-sm font-medium text-[var(--dock-text)]" };
      H2 = { class: "max-h-96 overflow-y-auto" };
      J2 = { class: "border-t border-[var(--dock-border)] px-3 py-2 text-center" };
      P = { name: "DockNotificationDropdown" };
      Q3 = gs(__spreadProps(__spreadValues({}, P), { emits: ["markRead", "markAllRead", "close"], setup(B2, { emit: a2 }) {
        var _a, _b, _c;
        const d4 = a2, { registeredApps: t } = go(), h2 = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) != null ? _c : window.dockBoot, p3 = Te(() => {
          var _a2;
          const o2 = {};
          for (const i3 of (_a2 = t.value) != null ? _a2 : [])
            i3.color && (o2[i3.app] = i3.color);
          return o2;
        }), k4 = Te(() => {
          var _a2;
          return (_a2 = h2 == null ? void 0 : h2.notification_types) != null ? _a2 : {};
        }), s = Ye([]), u = Ye(true), f = Ye(false);
        async function e() {
          u.value = true, f.value = false;
          try {
            s.value = await xt("dock.api.notifications.get_recent", { limit: 20 });
          } catch (e2) {
            f.value = true;
          } finally {
            u.value = false;
          }
        }
        Ft(e);
        async function n(o2) {
          await xt("dock.api.notifications.mark_read", { notification_names: [o2] });
          const i3 = s.value.find((c2) => c2.name === o2);
          i3 && (i3.read = 1), d4("markRead", [o2]);
        }
        async function x4() {
          await xt("dock.api.notifications.mark_all_read"), s.value.forEach((o2) => {
            o2.read = 1;
          }), d4("markAllRead");
        }
        function C3(o2) {
          n(o2.name), o2.action_url && (window.location.href = o2.action_url), d4("close");
        }
        return (o2, i3) => (ke(), _n("div", O2, [Ut("div", T2, [Ut("span", G2, Po(te($n)("Notifications")), 1), Ut("button", { class: "text-xs text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors", onClick: x4 }, Po(te($n)("Mark all read")), 1)]), Ut("div", H2, [u.value ? (ke(), nt(J, { key: 0 })) : f.value ? (ke(), nt(U, { key: 1, onRetry: e })) : s.value.length ? (ke(true), _n(me, { key: 3 }, sc(s.value, (c2) => (ke(), nt(A2, { key: c2.name, notification: c2, "type-info": k4.value[c2.notification_type], "app-color": p3.value[c2.from_app], onMarkRead: n, onNavigate: C3 }, null, 8, ["notification", "type-info", "app-color"]))), 128)) : (ke(), nt(Q2, { key: 2 }))]), Ut("div", J2, [Ut("a", { href: "/dock/notifications", class: "text-xs text-[var(--dock-accent)] hover:underline", onClick: i3[0] || (i3[0] = (c2) => o2.$emit("close")) }, Po(te($n)("View all notifications")) + " \u2192", 1)])]));
      } }));
      U2 = { id: "dock-bell-root", class: "dock-bell relative" };
      q2 = ["aria-expanded", "aria-label"];
      W = { key: 0, class: "absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center leading-none" };
      X = { name: "DockBell" };
      ae2 = gs(__spreadProps(__spreadValues({}, X), { setup(B2) {
        var _a, _b, _c, _d;
        const a2 = Ye(false), d4 = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) != null ? _c : window.dockBoot, t = Ye((_d = d4 == null ? void 0 : d4.unread_notifications) != null ? _d : 0), h2 = Te(() => t.value > 99 ? "99+" : String(t.value));
        function p3(e) {
          t.value += 1;
        }
        Ft(() => {
          var _a2;
          const e = (_a2 = window.frappe) == null ? void 0 : _a2.realtime;
          (e == null ? void 0 : e.on) && e.on("dock_notification", p3);
        }), hn(() => {
          var _a2;
          const e = (_a2 = window.frappe) == null ? void 0 : _a2.realtime;
          (e == null ? void 0 : e.off) && e.off("dock_notification", p3);
        });
        function k4(e) {
          const n = document.getElementById("dock-bell-root");
          n && !n.contains(e.target) && (a2.value = false);
        }
        Ft(() => document.addEventListener("mousedown", k4)), hn(() => document.removeEventListener("mousedown", k4));
        function s(e) {
          e.key === "Escape" && a2.value && (a2.value = false);
        }
        Ft(() => document.addEventListener("keydown", s)), hn(() => document.removeEventListener("keydown", s));
        function u(e) {
          t.value = Math.max(0, t.value - e.length);
        }
        function f() {
          t.value = 0;
        }
        return (e, n) => (ke(), _n("div", U2, [Ut("button", { class: "relative flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", "aria-expanded": a2.value, "aria-label": t.value > 0 ? `Notifications, ${t.value} unread` : "Notifications", title: "Notifications", onClick: n[0] || (n[0] = (x4) => a2.value = !a2.value) }, [Q(te(K2), { class: "w-4 h-4" }), t.value > 0 ? (ke(), _n("span", W, Po(h2.value), 1)) : Zn("", true)], 8, q2), a2.value ? (ke(), nt(Q3, { key: 0, onMarkRead: u, onMarkAllRead: f, onClose: n[1] || (n[1] = (x4) => a2.value = false) })) : Zn("", true)]));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/DockJana-skD-EBbF.js
  var DockJana_skD_EBbF_exports = {};
  __export(DockJana_skD_EBbF_exports, {
    default: () => p2
  });
  var l2, i2, p2;
  var init_DockJana_skD_EBbF = __esm({
    "../dock/dock/public/js/chunks/DockJana-skD-EBbF.js"() {
      init_dock_navbar_esm();
      l2 = ao("message-circle", [["path", { d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719", key: "1sd12s" }]]);
      i2 = { name: "DockJana" };
      p2 = gs(__spreadProps(__spreadValues({}, i2), { setup(d4) {
        return (a2, e) => (ke(), _n("button", { class: "flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", "aria-label": "Jana", title: "Jana", onClick: e[0] || (e[0] = (m) => a2.$emit("open")) }, [Q(te(l2), { class: "w-4 h-4" })]));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/check-DdZ2PPz-.js
  var o;
  var init_check_DdZ2PPz = __esm({
    "../dock/dock/public/js/chunks/check-DdZ2PPz-.js"() {
      init_dock_navbar_esm();
      o = ao("check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
    }
  });

  // ../dock/dock/public/js/chunks/DockAppSwitcher-DOUOnjb_.js
  var DockAppSwitcher_DOUOnjb_exports = {};
  __export(DockAppSwitcher_DOUOnjb_exports, {
    default: () => me4
  });
  var G3, P2, T3, O3, U3, q3, H3, J3, Q4, W2, X2, K3, Y, Z, ee, te2, oe3, re3, ae3, se3, ne3, ce3, le3, ie3, me4;
  var init_DockAppSwitcher_DOUOnjb = __esm({
    "../dock/dock/public/js/chunks/DockAppSwitcher-DOUOnjb_.js"() {
      init_dock_navbar_esm();
      init_runtime_dom_esm_bundler_Df8L0cdI();
      init_x_Dj5OacS7();
      init_check_DdZ2PPz();
      G3 = ao("grid-3x3", [["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }], ["path", { d: "M3 9h18", key: "1pudct" }], ["path", { d: "M3 15h18", key: "5xshup" }], ["path", { d: "M9 3v18", key: "fh3hqa" }], ["path", { d: "M15 3v18", key: "14nvp0" }]]);
      P2 = ao("grip-vertical", [["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }], ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }], ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }], ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }], ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }], ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]]);
      T3 = ao("pencil", [["path", { d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z", key: "1a8usu" }], ["path", { d: "m15 5 4 4", key: "1mk7zo" }]]);
      O3 = { class: "text-xs font-medium text-[var(--dock-text)] leading-snug line-clamp-2" };
      U3 = { class: "text-[10px] text-[var(--dock-icon)] mt-0.5 truncate" };
      q3 = ["aria-label"];
      H3 = { name: "DockBookmarkTile" };
      J3 = gs(__spreadProps(__spreadValues({}, H3), { props: { bookmark: {}, editMode: { type: Boolean } }, emits: ["remove", "navigate"], setup(s, { emit: m }) {
        const n = m;
        function c2(d4) {
          return `/${d4.app}/${d4.doctype}/${encodeURIComponent(d4.docname)}`;
        }
        return (d4, r3) => (ke(), _n("div", { class: "relative group rounded-lg border border-[var(--dock-border)] bg-[var(--dock-bg)] overflow-hidden cursor-pointer hover:shadow-sm transition-shadow", style: os([{ "border-top-width": "4px" }, { borderTopColor: s.bookmark.color || "var(--dock-accent)" }]), onClick: r3[1] || (r3[1] = (e) => !s.editMode && n("navigate", c2(s.bookmark))) }, [s.editMode ? (ke(), nt(te(P2), { key: 0, class: "dock-drag-handle absolute left-1 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--dock-icon)] cursor-grab" })) : Zn("", true), Ut("div", { class: qt(["px-3 py-2", s.editMode && "pl-6"]) }, [Ut("div", O3, Po(s.bookmark.label), 1), Ut("div", U3, Po(s.bookmark.doctype), 1)], 2), Ut("button", { class: "absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--dock-icon)] hover:text-[var(--dock-text)]", "aria-label": te($n)("Remove bookmark"), onClick: r3[0] || (r3[0] = Le((e) => n("remove", s.bookmark.name), ["stop"])) }, [Q(te(c), { class: "w-3 h-3" })], 8, q3)], 4));
      } }));
      Q4 = { key: 0, class: "px-4 pt-3 pb-2" };
      W2 = { class: "flex items-center justify-between mb-2" };
      X2 = { class: "text-[10px] font-semibold uppercase tracking-wider text-[var(--dock-icon)]" };
      K3 = ["aria-label"];
      Y = { class: "grid grid-cols-3 gap-2" };
      Z = { name: "DockBookmarks" };
      ee = gs(__spreadProps(__spreadValues({}, Z), { emits: ["close"], setup(s, { emit: m }) {
        const n = m, { bookmarks: c2, removeBookmark: d4, reorderBookmarks: r3 } = ho(), e = Ye(false), k4 = Ye(null);
        function M2(l3) {
          k4.value = l3;
        }
        function j3(l3, i3) {
          if (l3.preventDefault(), k4.value === null || k4.value === i3)
            return;
          const p3 = c2.value.splice(k4.value, 1)[0];
          c2.value.splice(i3, 0, p3), k4.value = i3;
        }
        function z4() {
          k4.value = null;
        }
        function N2() {
          e.value = false, r3(c2.value.map((l3) => l3.name));
        }
        function F4(l3) {
          window.location.href = l3, n("close");
        }
        return (l3, i3) => te(c2).length ? (ke(), _n("div", Q4, [Ut("div", W2, [Ut("span", X2, Po(te($n)("Pinned")), 1), Ut("button", { class: "text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors", "aria-label": e.value ? te($n)("Done editing") : te($n)("Edit bookmarks"), onClick: i3[0] || (i3[0] = (p3) => e.value ? N2() : e.value = true) }, [e.value ? (ke(), nt(te(o), { key: 0, class: "w-3.5 h-3.5" })) : (ke(), nt(te(T3), { key: 1, class: "w-3.5 h-3.5" }))], 8, K3)]), Ut("div", Y, [(ke(true), _n(me, null, sc(te(c2), (p3, w3) => (ke(), nt(J3, { key: p3.name, bookmark: p3, "edit-mode": e.value, draggable: e.value, onDragstart: ($2) => M2(w3), onDragover: ($2) => j3($2, w3), onDrop: z4, onRemove: te(d4), onNavigate: F4 }, null, 8, ["bookmark", "edit-mode", "draggable", "onDragstart", "onDragover", "onRemove"]))), 128))]), i3[1] || (i3[1] = Ut("div", { class: "mt-2 border-b border-[var(--dock-border)]" }, null, -1))])) : Zn("", true);
      } }));
      te2 = { class: "dock-app-switcher relative" };
      oe3 = ["aria-expanded"];
      re3 = { key: 0, class: "absolute right-0 top-full mt-2 w-72 bg-[var(--dock-bg)] border border-[var(--dock-border)] rounded-lg shadow-lg p-3 z-20", role: "menu" };
      ae3 = { class: "grid grid-cols-3 gap-2 mb-3" };
      se3 = ["href"];
      ne3 = { class: "text-xs text-[var(--dock-text)] truncate w-full text-center" };
      ce3 = { class: "border-t border-[var(--dock-border)] pt-2" };
      le3 = { href: "/app", role: "menuitem", class: "flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-sm text-[var(--dock-icon)]" };
      ie3 = { name: "DockAppSwitcher" };
      me4 = gs(__spreadProps(__spreadValues({}, ie3), { setup(s) {
        const { registeredApps: m } = go(), n = Ye(false), c2 = "/assets/frappe/images/frappe-framework-logo.svg";
        return (d4, r3) => (ke(), _n("div", te2, [Ut("button", { class: "flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", "aria-expanded": n.value, "aria-haspopup": "true", "aria-label": "App switcher", title: "App switcher", onClick: r3[0] || (r3[0] = (e) => n.value = !n.value) }, [Q(te(G3), { class: "w-4 h-4" })], 8, oe3), n.value ? (ke(), _n("div", re3, [Q(ee, { onClose: r3[1] || (r3[1] = (e) => n.value = false) }), Ut("div", ae3, [(ke(true), _n(me, null, sc(te(m), (e) => (ke(), _n("a", { key: e.app, href: e.route, role: "menuitem", class: "flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-center" }, [Ut("span", { class: "w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg font-bold", style: os({ backgroundColor: e.color }) }, Po(e.label[0]), 5), Ut("span", ne3, Po(e.label), 1)], 8, se3))), 128))]), Ut("div", ce3, [Ut("a", le3, [Ut("img", { src: c2, alt: "Frappe", class: "w-4 h-4" }), rl(" " + Po(te($n)("Frappe Desk")), 1)])])])) : Zn("", true)]));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/DockAvatar-CfFMJ6HM.js
  var DockAvatar_CfFMJ6HM_exports = {};
  __export(DockAvatar_CfFMJ6HM_exports, {
    default: () => ke4
  });
  function H4() {
    var _a, _b, _c, _d, _e5, _f, _g;
    const r3 = (_g = (_d = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) == null ? void 0 : _c.settings) == null ? void 0 : _d.theme) != null ? _g : (_f = (_e5 = window.dockBoot) == null ? void 0 : _e5.settings) == null ? void 0 : _f.theme;
    if (r3 === "light" || r3 === "dark" || r3 === "system")
      return r3;
    const s = localStorage.getItem(C);
    return s === "light" || s === "dark" || s === "system" ? s : "system";
  }
  function L2(r3) {
    const s = r3 === "dark" || r3 === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", s);
  }
  function K4() {
    function r3(s) {
      k2.value = s, L2(s), localStorage.setItem(C, s), xt("dock.api.settings.save_user_preference", { values: { theme: s } }).catch(() => {
      });
    }
    return { theme: k2, setTheme: r3 };
  }
  var z3, D2, G4, C, k2, F2, Y2, q4, J4, Q5, W3, X3, Z2, ee2, te3, ae4, se4, oe4, re4, ne4, le4, ie4, ke4;
  var init_DockAvatar_CfFMJ6HM = __esm({
    "../dock/dock/public/js/chunks/DockAvatar-CfFMJ6HM.js"() {
      init_runtime_dom_esm_bundler_Df8L0cdI();
      init_dock_navbar_esm();
      z3 = ao("circle-user-round", [["path", { d: "M18 20a6 6 0 0 0-12 0", key: "1qehca" }], ["circle", { cx: "12", cy: "10", r: "4", key: "1h16sb" }], ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]]);
      D2 = ao("log-out", [["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }], ["path", { d: "M21 12H9", key: "dn1m92" }], ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]]);
      G4 = ao("settings", [["path", { d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915", key: "1i5ecw" }], ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]]);
      C = "theme";
      k2 = Ye(H4());
      L2(k2.value);
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (r3) => {
        k2.value === "system" && document.documentElement.classList.toggle("dark", r3.matches);
      });
      F2 = ["aria-expanded", "aria-label", "title"];
      Y2 = ["src", "alt"];
      q4 = { key: 2 };
      J4 = { key: 0, class: "absolute right-0 top-full mt-2 w-56 rounded-lg shadow-lg border border-[var(--dock-border)] bg-white dark:bg-[#1a1f2e] py-1 z-20", role: "menu" };
      Q5 = { class: "px-3 py-2.5 border-b border-[var(--dock-border)]" };
      W3 = { class: "text-sm font-medium text-[var(--dock-text)] truncate" };
      X3 = { class: "text-xs text-[var(--dock-icon)] truncate" };
      Z2 = { class: "py-1 border-b border-[var(--dock-border)]" };
      ee2 = ["href"];
      te3 = { class: "py-1 border-b border-[var(--dock-border)]" };
      ae4 = { class: "flex items-center gap-2 mb-2" };
      se4 = { class: "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide" };
      oe4 = ["aria-label"];
      re4 = ["aria-checked", "onClick"];
      ne4 = { class: "py-1" };
      le4 = { href: "/app/logout", role: "menuitem", class: "flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-black/5 dark:hover:bg-white/10 transition-colors" };
      ie4 = { name: "DockAvatar" };
      ke4 = gs(__spreadProps(__spreadValues({}, ie4), { setup(r3) {
        var _a, _b, _c, _d;
        const { theme: s, setTheme: T4 } = K4(), n = Ye(false), p3 = Ye(null), d4 = Te(() => {
          var _a2, _b2, _c2;
          return (_c2 = (_a2 = window.frappe) == null ? void 0 : _a2.session) != null ? _c2 : (_b2 = window.dockBoot) == null ? void 0 : _b2.session;
        }), v2 = Te(() => {
          var _a2, _b2, _c2, _d2;
          return (_d2 = (_c2 = (_a2 = d4.value) == null ? void 0 : _a2.user_fullname) != null ? _c2 : (_b2 = d4.value) == null ? void 0 : _b2.user) != null ? _d2 : "";
        }), h2 = Te(() => (v2.value || "?").split(" ").map((a2) => a2[0]).slice(0, 2).join("").toUpperCase()), E4 = ((_d = ((_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) != null ? _b : window.dockBoot) != null ? _c : {}).installed_apps) != null ? _d : []).includes("frappe_time"), M2 = [{ value: "system", label: $n("System") }, { value: "light", label: $n("Light") }, { value: "dark", label: $n("Dark") }];
        function x4(m) {
          p3.value && !p3.value.contains(m.target) && (n.value = false);
        }
        function w3(m) {
          m.key === "Escape" && (n.value = false);
        }
        return Ft(() => {
          document.addEventListener("click", x4), document.addEventListener("keydown", w3);
        }), hn(() => {
          document.removeEventListener("click", x4), document.removeEventListener("keydown", w3);
        }), (m, a2) => {
          var _a2;
          return ke(), _n("div", { ref_key: "wrapperRef", ref: p3, class: "dock-avatar relative" }, [Ut("button", { class: "w-8 h-8 rounded-full bg-black/10 dark:bg-white/20 hover:bg-black/15 dark:hover:bg-white/30 transition-colors flex items-center justify-center text-[var(--dock-text)] text-xs font-semibold overflow-hidden", "aria-expanded": n.value, "aria-haspopup": "true", "aria-label": te($n)("User menu"), title: v2.value || te($n)("User menu"), onClick: a2[0] || (a2[0] = (l3) => n.value = !n.value) }, [((_a2 = d4.value) == null ? void 0 : _a2.user_image) ? (ke(), _n("img", { key: 0, src: d4.value.user_image, alt: v2.value, class: "w-8 h-8 object-cover" }, null, 8, Y2)) : !h2.value || h2.value === "?" ? (ke(), nt(te(z3), { key: 1, class: "w-5 h-5 text-[var(--dock-icon)]" })) : (ke(), _n("span", q4, Po(h2.value), 1))], 8, F2), Q(_e3, { "enter-active-class": "transition ease-out duration-150", "enter-from-class": "opacity-0 translate-y-1.5", "enter-to-class": "opacity-100 translate-y-0", "leave-active-class": "transition ease-in duration-100", "leave-from-class": "opacity-100 translate-y-0", "leave-to-class": "opacity-0 translate-y-1.5" }, { default: ci(() => {
            var _a3, _b2;
            return [n.value ? (ke(), _n("div", J4, [Ut("div", Q5, [Ut("p", W3, Po(v2.value), 1), Ut("p", X3, Po((_a3 = d4.value) == null ? void 0 : _a3.user), 1)]), Ut("div", Z2, [Ut("a", { href: `/app/user/${(_b2 = d4.value) == null ? void 0 : _b2.user}`, role: "menuitem", class: "block px-3 py-1.5 text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", onClick: a2[1] || (a2[1] = (l3) => n.value = false) }, Po(te($n)("My Profile")), 9, ee2), Ut("a", { href: "/dock/settings", role: "menuitem", class: "block px-3 py-1.5 text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", onClick: a2[2] || (a2[2] = (l3) => n.value = false) }, Po(te($n)("Preferences")), 1)]), Ut("div", te3, [te(E4) ? (ke(), _n("a", { key: 0, href: "/app/ft-timer", role: "menuitem", class: "block px-3 py-1.5 text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", onClick: a2[3] || (a2[3] = (l3) => n.value = false) }, Po(te($n)("Time")), 1)) : Zn("", true), Ut("a", { href: "/dock/guest", role: "menuitem", class: "block px-3 py-1.5 text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", onClick: a2[4] || (a2[4] = (l3) => n.value = false) }, Po(te($n)("Guest Portal")), 1), Ut("a", { href: "/dock/people", role: "menuitem", class: "block px-3 py-1.5 text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", onClick: a2[5] || (a2[5] = (l3) => n.value = false) }, Po(te($n)("People")), 1)]), Ut("div", { class: "px-4 py-3 border-b border-[var(--dock-border)]", onClick: a2[6] || (a2[6] = Le(() => {
            }, ["stop"])) }, [Ut("div", ae4, [Q(te(G4), { class: "w-3.5 h-3.5 text-gray-500 dark:text-gray-400" }), Ut("span", se4, Po(te($n)("Theme")), 1)]), Ut("div", { class: "flex gap-1 bg-gray-100 dark:bg-gray-900 rounded-lg p-1", role: "radiogroup", "aria-label": te($n)("Theme preference") }, [(ke(), _n(me, null, sc(M2, (l3) => Ut("button", { key: l3.value, class: qt(["flex-1 px-3 py-1.5 text-xs font-medium rounded transition-colors", te(s) === l3.value ? "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm" : "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"]), role: "radio", "aria-checked": te(s) === l3.value, onClick: (ue5) => te(T4)(l3.value) }, Po(l3.label), 11, re4)), 64))], 8, oe4)]), Ut("div", ne4, [Ut("a", le4, [Q(te(D2), { class: "w-4 h-4" }), rl(" " + Po(te($n)("Log out")), 1)])])])) : Zn("", true)];
          }), _: 1 })], 512);
        };
      } }));
    }
  });

  // ../dock/dock/public/js/dock-navbar.esm.js
  function es(e) {
    const t = /* @__PURE__ */ Object.create(null);
    for (const n of e.split(","))
      t[n] = 1;
    return (n) => n in t;
  }
  function os(e) {
    if (L3(e)) {
      const t = {};
      for (let n = 0; n < e.length; n++) {
        const s = e[n], r3 = re5(s) ? Eo(s) : os(s);
        if (r3)
          for (const o2 in r3)
            t[o2] = r3[o2];
      }
      return t;
    } else if (re5(e) || q5(e))
      return e;
  }
  function Eo(e) {
    const t = {};
    return e.replace(So, "").split(ko).forEach((n) => {
      if (n) {
        const s = n.split(To);
        s.length > 1 && (t[s[0].trim()] = s[1].trim());
      }
    }), t;
  }
  function qt(e) {
    let t = "";
    if (re5(e))
      t = e;
    else if (L3(e))
      for (let n = 0; n < e.length; n++) {
        const s = qt(e[n]);
        s && (t += s + " ");
      }
    else if (q5(e))
      for (const n in e)
        e[n] && (t += n + " ");
    return t.trim();
  }
  function zl(e) {
    return !!e || e === "";
  }
  function Co(e, t) {
    if (e.length !== t.length)
      return false;
    let n = true;
    for (let s = 0; n && s < e.length; s++)
      n = vn(e[s], t[s]);
    return n;
  }
  function vn(e, t) {
    if (e === t)
      return true;
    let n = Es(e), s = Es(t);
    if (n || s)
      return n && s ? e.getTime() === t.getTime() : false;
    if (n = Ve2(e), s = Ve2(t), n || s)
      return e === t;
    if (n = L3(e), s = L3(t), n || s)
      return n && s ? Co(e, t) : false;
    if (n = q5(e), s = q5(t), n || s) {
      if (!n || !s)
        return false;
      const r3 = Object.keys(e).length, o2 = Object.keys(t).length;
      if (r3 !== o2)
        return false;
      for (const i3 in e) {
        const l3 = e.hasOwnProperty(i3), c2 = t.hasOwnProperty(i3);
        if (l3 && !c2 || !l3 && c2 || !vn(e[i3], t[i3]))
          return false;
      }
    }
    return String(e) === String(t);
  }
  function Io() {
    return _e4;
  }
  function ur(e, t = false) {
    if (e.flags |= 8, t) {
      e.next = It, It = e;
      return;
    }
    e.next = Ot, Ot = e;
  }
  function is() {
    ar++;
  }
  function ls() {
    if (--ar > 0)
      return;
    if (It) {
      let t = It;
      for (It = void 0; t; ) {
        const n = t.next;
        t.next = void 0, t.flags &= -9, t = n;
      }
    }
    let e;
    for (; Ot; ) {
      let t = Ot;
      for (Ot = void 0; t; ) {
        const n = t.next;
        if (t.next = void 0, t.flags &= -9, t.flags & 1)
          try {
            t.trigger();
          } catch (s) {
            e || (e = s);
          }
        t = n;
      }
    }
    if (e)
      throw e;
  }
  function dr(e) {
    for (let t = e.deps; t; t = t.nextDep)
      t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
  }
  function hr(e) {
    let t, n = e.depsTail, s = n;
    for (; s; ) {
      const r3 = s.prevDep;
      s.version === -1 ? (s === n && (n = r3), cs(s), Ro(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r3;
    }
    e.deps = t, e.depsTail = n;
  }
  function Bn(e) {
    for (let t = e.deps; t; t = t.nextDep)
      if (t.dep.version !== t.version || t.dep.computed && (pr(t.dep.computed) || t.dep.version !== t.version))
        return true;
    return !!e._dirty;
  }
  function pr(e) {
    if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === jt) || (e.globalVersion = jt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Bn(e))))
      return;
    e.flags |= 2;
    const t = e.dep, n = Z3, s = Ee3;
    Z3 = e, Ee3 = true;
    try {
      dr(e);
      const r3 = e.fn(e._value);
      (t.version === 0 || $e3(r3, e._value)) && (e.flags |= 128, e._value = r3, t.version++);
    } catch (r3) {
      throw t.version++, r3;
    } finally {
      Z3 = n, Ee3 = s, hr(e), e.flags &= -3;
    }
  }
  function cs(e, t = false) {
    const { dep: n, prevSub: s, nextSub: r3 } = e;
    if (s && (s.nextSub = r3, e.prevSub = void 0), r3 && (r3.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
      n.computed.flags &= -5;
      for (let o2 = n.computed.deps; o2; o2 = o2.nextDep)
        cs(o2, true);
    }
    !t && !--n.sc && n.map && n.map.delete(n.key);
  }
  function Ro(e) {
    const { prevDep: t, nextDep: n } = e;
    t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
  }
  function ze2() {
    gr.push(Ee3), Ee3 = false;
  }
  function Ze() {
    const e = gr.pop();
    Ee3 = e === void 0 ? true : e;
  }
  function Cs(e) {
    const { cleanup: t } = e;
    if (e.cleanup = void 0, t) {
      const n = Z3;
      Z3 = void 0;
      try {
        t();
      } finally {
        Z3 = n;
      }
    }
  }
  function _r(e) {
    if (e.dep.sc++, e.sub.flags & 4) {
      const t = e.dep.computed;
      if (t && !e.dep.subs) {
        t.flags |= 20;
        for (let s = t.deps; s; s = s.nextDep)
          _r(s);
      }
      const n = e.dep.subs;
      n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
    }
  }
  function ie5(e, t, n) {
    if (Ee3 && Z3) {
      let s = Vn.get(e);
      s || Vn.set(e, s = /* @__PURE__ */ new Map());
      let r3 = s.get(n);
      r3 || (s.set(n, r3 = new fs()), r3.map = s, r3.key = n), r3.track();
    }
  }
  function Je(e, t, n, s, r3, o2) {
    const i3 = Vn.get(e);
    if (!i3) {
      jt++;
      return;
    }
    const l3 = (c2) => {
      c2 && c2.trigger();
    };
    if (is(), t === "clear")
      i3.forEach(l3);
    else {
      const c2 = L3(e), u = c2 && ss(n);
      if (c2 && n === "length") {
        const a2 = Number(s);
        i3.forEach((h2, _2) => {
          (_2 === "length" || _2 === $t || !Ve2(_2) && _2 >= a2) && l3(h2);
        });
      } else
        switch ((n !== void 0 || i3.has(void 0)) && l3(i3.get(n)), u && l3(i3.get($t)), t) {
          case "add":
            c2 ? u && l3(i3.get("length")) : (l3(i3.get(at)), gt(e) && l3(i3.get(Hn)));
            break;
          case "delete":
            c2 || (l3(i3.get(at)), gt(e) && l3(i3.get(Hn)));
            break;
          case "set":
            gt(e) && l3(i3.get(at));
            break;
        }
    }
    ls();
  }
  function dt(e) {
    const t = U4(e);
    return t === e ? t : (ie5(t, "iterate", $t), Se3(e) ? t : t.map(Ae3));
  }
  function xn(e) {
    return ie5(e = U4(e), "iterate", $t), e;
  }
  function Le3(e, t) {
    return Xe(e) ? bt(ut(e) ? Ae3(t) : t) : Ae3(t);
  }
  function In(e, t, n) {
    const s = xn(e), r3 = s[t]();
    return s !== e && !Se3(e) && (r3._next = r3.next, r3.next = () => {
      const o2 = r3._next();
      return o2.done || (o2.value = n(o2.value)), o2;
    }), r3;
  }
  function Ue2(e, t, n, s, r3, o2) {
    const i3 = xn(e), l3 = i3 !== e && !Se3(e), c2 = i3[t];
    if (c2 !== Do[t]) {
      const h2 = c2.apply(e, o2);
      return l3 ? Ae3(h2) : h2;
    }
    let u = n;
    i3 !== e && (l3 ? u = function(h2, _2) {
      return n.call(this, Le3(e, h2), _2, e);
    } : n.length > 2 && (u = function(h2, _2) {
      return n.call(this, h2, _2, e);
    }));
    const a2 = c2.call(i3, u, s);
    return l3 && r3 ? r3(a2) : a2;
  }
  function Ps(e, t, n, s) {
    const r3 = xn(e), o2 = r3 !== e && !Se3(e);
    let i3 = n, l3 = false;
    r3 !== e && (o2 ? (l3 = s.length === 0, i3 = function(u, a2, h2) {
      return l3 && (l3 = false, u = Le3(e, u)), n.call(this, u, Le3(e, a2), h2, e);
    }) : n.length > 3 && (i3 = function(u, a2, h2) {
      return n.call(this, u, a2, h2, e);
    }));
    const c2 = r3[t](i3, ...s);
    return l3 ? Le3(e, c2) : c2;
  }
  function Rn(e, t, n) {
    const s = U4(e);
    ie5(s, "iterate", $t);
    const r3 = s[t](...n);
    return (r3 === -1 || r3 === false) && hs(n[0]) ? (n[0] = U4(n[0]), s[t](...n)) : r3;
  }
  function St(e, t, n = []) {
    ze2(), is();
    const s = U4(e)[t].apply(e, n);
    return ls(), Ze(), s;
  }
  function jo(e) {
    Ve2(e) || (e = String(e));
    const t = U4(this);
    return ie5(t, "has", e), t.hasOwnProperty(e);
  }
  function No(e, t, n) {
    return function(...s) {
      const r3 = this.__v_raw, o2 = U4(r3), i3 = gt(o2), l3 = e === "entries" || e === Symbol.iterator && i3, c2 = e === "keys" && i3, u = r3[e](...s), a2 = n ? Nn : t ? bt : Ae3;
      return !t && ie5(o2, "iterate", c2 ? Hn : at), fe3(Object.create(u), { next() {
        const { value: h2, done: _2 } = u.next();
        return _2 ? { value: h2, done: _2 } : { value: l3 ? [a2(h2[0]), a2(h2[1])] : a2(h2), done: _2 };
      } });
    };
  }
  function tn(e) {
    return function(...t) {
      return e === "delete" ? false : e === "clear" ? void 0 : this;
    };
  }
  function Uo(e, t) {
    const n = { get(r3) {
      const o2 = this.__v_raw, i3 = U4(o2), l3 = U4(r3);
      e || ($e3(r3, l3) && ie5(i3, "get", r3), ie5(i3, "get", l3));
      const { has: c2 } = en(i3), u = t ? Nn : e ? bt : Ae3;
      if (c2.call(i3, r3))
        return u(o2.get(r3));
      if (c2.call(i3, l3))
        return u(o2.get(l3));
      o2 !== i3 && o2.get(r3);
    }, get size() {
      const r3 = this.__v_raw;
      return !e && ie5(U4(r3), "iterate", at), r3.size;
    }, has(r3) {
      const o2 = this.__v_raw, i3 = U4(o2), l3 = U4(r3);
      return e || ($e3(r3, l3) && ie5(i3, "has", r3), ie5(i3, "has", l3)), r3 === l3 ? o2.has(r3) : o2.has(r3) || o2.has(l3);
    }, forEach(r3, o2) {
      const i3 = this, l3 = i3.__v_raw, c2 = U4(l3), u = t ? Nn : e ? bt : Ae3;
      return !e && ie5(c2, "iterate", at), l3.forEach((a2, h2) => r3.call(o2, u(a2), u(h2), i3));
    } };
    return fe3(n, e ? { add: tn("add"), set: tn("set"), delete: tn("delete"), clear: tn("clear") } : { add(r3) {
      const o2 = U4(this), i3 = en(o2), l3 = U4(r3), c2 = !t && !Se3(r3) && !Xe(r3) ? l3 : r3;
      return i3.has.call(o2, c2) || $e3(r3, c2) && i3.has.call(o2, r3) || $e3(l3, c2) && i3.has.call(o2, l3) || (o2.add(c2), Je(o2, "add", c2, c2)), this;
    }, set(r3, o2) {
      !t && !Se3(o2) && !Xe(o2) && (o2 = U4(o2));
      const i3 = U4(this), { has: l3, get: c2 } = en(i3);
      let u = l3.call(i3, r3);
      u || (r3 = U4(r3), u = l3.call(i3, r3));
      const a2 = c2.call(i3, r3);
      return i3.set(r3, o2), u ? $e3(o2, a2) && Je(i3, "set", r3, o2) : Je(i3, "add", r3, o2), this;
    }, delete(r3) {
      const o2 = U4(this), { has: i3, get: l3 } = en(o2);
      let c2 = i3.call(o2, r3);
      c2 || (r3 = U4(r3), c2 = i3.call(o2, r3)), l3 && l3.call(o2, r3);
      const u = o2.delete(r3);
      return c2 && Je(o2, "delete", r3, void 0), u;
    }, clear() {
      const r3 = U4(this), o2 = r3.size !== 0, i3 = r3.clear();
      return o2 && Je(r3, "clear", void 0, void 0), i3;
    } }), ["keys", "values", "entries", Symbol.iterator].forEach((r3) => {
      n[r3] = No(r3, e, t);
    }), n;
  }
  function as(e, t) {
    const n = Uo(e, t);
    return (s, r3, o2) => r3 === "__v_isReactive" ? !e : r3 === "__v_isReadonly" ? e : r3 === "__v_raw" ? s : Reflect.get(K5(n, r3) && r3 in s ? n : s, r3, o2);
  }
  function Go(e) {
    switch (e) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function Yo(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Go(bo(e));
  }
  function us(e) {
    return Xe(e) ? e : ds(e, false, Bo, Ko, vr);
  }
  function zo(e) {
    return ds(e, false, Ho, Wo, xr);
  }
  function Un(e) {
    return ds(e, true, Vo, qo, wr);
  }
  function ds(e, t, n, s, r3) {
    if (!q5(e) || e.__v_raw && !(t && e.__v_isReactive))
      return e;
    const o2 = Yo(e);
    if (o2 === 0)
      return e;
    const i3 = r3.get(e);
    if (i3)
      return i3;
    const l3 = new Proxy(e, o2 === 2 ? s : n);
    return r3.set(e, l3), l3;
  }
  function ut(e) {
    return Xe(e) ? ut(e.__v_raw) : !!(e && e.__v_isReactive);
  }
  function Xe(e) {
    return !!(e && e.__v_isReadonly);
  }
  function Se3(e) {
    return !!(e && e.__v_isShallow);
  }
  function hs(e) {
    return e ? !!e.__v_raw : false;
  }
  function U4(e) {
    const t = e && e.__v_raw;
    return t ? U4(t) : e;
  }
  function Zo(e) {
    return !K5(e, "__v_skip") && Object.isExtensible(e) && ir(e, "__v_skip", true), e;
  }
  function ce4(e) {
    return e ? e.__v_isRef === true : false;
  }
  function Ye(e) {
    return kr(e, false);
  }
  function kr(e, t) {
    return ce4(e) ? e : new Xo(e, t);
  }
  function te(e) {
    return ce4(e) ? e.value : e;
  }
  function Tr(e) {
    return ut(e) ? e : new Proxy(e, Qo);
  }
  function ti(e, t, n = false) {
    let s, r3;
    return j2(e) ? s = e : (s = e.get, r3 = e.set), new ei(s, r3, n);
  }
  function ni(e, t = false, n = ct) {
    if (n) {
      let s = fn.get(n);
      s || fn.set(n, s = []), s.push(e);
    }
  }
  function si(e, t, n = J5) {
    const { immediate: s, deep: r3, once: o2, scheduler: i3, augmentJob: l3, call: c2 } = n, u = (C3) => r3 ? C3 : Se3(C3) || r3 === false || r3 === 0 ? Ge(C3, 1) : Ge(C3);
    let a2, h2, _2, x4, S3 = false, b = false;
    if (ce4(e) ? (h2 = () => e.value, S3 = Se3(e)) : ut(e) ? (h2 = () => u(e), S3 = true) : L3(e) ? (b = true, S3 = e.some((C3) => ut(C3) || Se3(C3)), h2 = () => e.map((C3) => {
      if (ce4(C3))
        return C3.value;
      if (ut(C3))
        return u(C3);
      if (j2(C3))
        return c2 ? c2(C3, 2) : C3();
    })) : j2(e) ? t ? h2 = c2 ? () => c2(e, 2) : e : h2 = () => {
      if (_2) {
        ze2();
        try {
          _2();
        } finally {
          Ze();
        }
      }
      const C3 = ct;
      ct = a2;
      try {
        return c2 ? c2(e, 3, [x4]) : e(x4);
      } finally {
        ct = C3;
      }
    } : h2 = Be3, t && r3) {
      const C3 = h2, B2 = r3 === true ? 1 / 0 : r3;
      h2 = () => Ge(C3(), B2);
    }
    const P3 = Io(), I2 = () => {
      a2.stop(), P3 && P3.active && ns(P3.effects, a2);
    };
    if (o2 && t) {
      const C3 = t;
      t = (...B2) => {
        C3(...B2), I2();
      };
    }
    let A4 = b ? new Array(e.length).fill(nn) : nn;
    const F4 = (C3) => {
      if (!(!(a2.flags & 1) || !a2.dirty && !C3))
        if (t) {
          const B2 = a2.run();
          if (r3 || S3 || (b ? B2.some(($2, N2) => $e3($2, A4[N2])) : $e3(B2, A4))) {
            _2 && _2();
            const $2 = ct;
            ct = a2;
            try {
              const N2 = [B2, A4 === nn ? void 0 : b && A4[0] === nn ? [] : A4, x4];
              A4 = B2, c2 ? c2(t, 3, N2) : t(...N2);
            } finally {
              ct = $2;
            }
          }
        } else
          a2.run();
    };
    return l3 && l3(F4), a2 = new fr(h2), a2.scheduler = i3 ? () => i3(F4, false) : F4, x4 = (C3) => ni(C3, false, a2), _2 = a2.onStop = () => {
      const C3 = fn.get(a2);
      if (C3) {
        if (c2)
          c2(C3, 4);
        else
          for (const B2 of C3)
            B2();
        fn.delete(a2);
      }
    }, t ? s ? F4(true) : A4 = a2.run() : i3 ? i3(F4.bind(null, true), true) : a2.run(), I2.pause = a2.pause.bind(a2), I2.resume = a2.resume.bind(a2), I2.stop = I2, I2;
  }
  function Ge(e, t = 1 / 0, n) {
    if (t <= 0 || !q5(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
      return e;
    if (n.set(e, t), t--, ce4(e))
      Ge(e.value, t, n);
    else if (L3(e))
      for (let s = 0; s < e.length; s++)
        Ge(e[s], t, n);
    else if (nr(e) || gt(e))
      e.forEach((s) => {
        Ge(s, t, n);
      });
    else if (or(e)) {
      for (const s in e)
        Ge(e[s], t, n);
      for (const s of Object.getOwnPropertySymbols(e))
        Object.prototype.propertyIsEnumerable.call(e, s) && Ge(e[s], t, n);
    }
    return e;
  }
  function Jt(e, t, n, s) {
    try {
      return s ? e(...s) : e();
    } catch (r3) {
      Gt(r3, t, n);
    }
  }
  function Ne3(e, t, n, s) {
    if (j2(e)) {
      const r3 = Jt(e, t, n, s);
      return r3 && sr(r3) && r3.catch((o2) => {
        Gt(o2, t, n);
      }), r3;
    }
    if (L3(e)) {
      const r3 = [];
      for (let o2 = 0; o2 < e.length; o2++)
        r3.push(Ne3(e[o2], t, n, s));
      return r3;
    }
  }
  function Gt(e, t, n, s = true) {
    const r3 = t ? t.vnode : null, { errorHandler: o2, throwUnhandledErrorInProduction: i3 } = t && t.appContext.config || J5;
    if (t) {
      let l3 = t.parent;
      const c2 = t.proxy, u = `https://vuejs.org/error-reference/#runtime-${n}`;
      for (; l3; ) {
        const a2 = l3.ec;
        if (a2) {
          for (let h2 = 0; h2 < a2.length; h2++)
            if (a2[h2](e, c2, u) === false)
              return;
        }
        l3 = l3.parent;
      }
      if (o2) {
        ze2(), Jt(o2, null, 10, [e, c2, u]), Ze();
        return;
      }
    }
    ri(e, n, r3, s, i3);
  }
  function ri(e, t, n, s = true, r3 = false) {
    if (r3)
      throw e;
    console.error(e);
  }
  function oi(e) {
    const t = an || Sr;
    return e ? t.then(this ? e.bind(this) : e) : t;
  }
  function ii(e) {
    let t = Fe3 + 1, n = de3.length;
    for (; t < n; ) {
      const s = t + n >>> 1, r3 = de3[s], o2 = Bt(r3);
      o2 < e || o2 === e && r3.flags & 2 ? t = s + 1 : n = s;
    }
    return t;
  }
  function ps(e) {
    if (!(e.flags & 1)) {
      const t = Bt(e), n = de3[de3.length - 1];
      !n || !(e.flags & 2) && t >= Bt(n) ? de3.push(e) : de3.splice(ii(t), 0, e), e.flags |= 1, Er();
    }
  }
  function Er() {
    an || (an = Sr.then(Cr));
  }
  function li(e) {
    L3(e) ? _t.push(...e) : tt && e.id === -1 ? tt.splice(ht + 1, 0, e) : e.flags & 1 || (_t.push(e), e.flags |= 1), Er();
  }
  function Os(e, t, n = Fe3 + 1) {
    for (; n < de3.length; n++) {
      const s = de3[n];
      if (s && s.flags & 2) {
        if (e && s.id !== e.uid)
          continue;
        de3.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
      }
    }
  }
  function Ar(e) {
    if (_t.length) {
      const t = [...new Set(_t)].sort((n, s) => Bt(n) - Bt(s));
      if (_t.length = 0, tt) {
        tt.push(...t);
        return;
      }
      for (tt = t, ht = 0; ht < tt.length; ht++) {
        const n = tt[ht];
        n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
      }
      tt = null, ht = 0;
    }
  }
  function Cr(e) {
    try {
      for (Fe3 = 0; Fe3 < de3.length; Fe3++) {
        const t = de3[Fe3];
        t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Jt(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
      }
    } finally {
      for (; Fe3 < de3.length; Fe3++) {
        const t = de3[Fe3];
        t && (t.flags &= -2);
      }
      Fe3 = -1, de3.length = 0, Ar(), an = null, (de3.length || _t.length) && Cr();
    }
  }
  function un(e) {
    const t = se5;
    return se5 = e, Pr = e && e.type.__scopeId || null, t;
  }
  function ci(e, t = se5, n) {
    if (!t || e._n)
      return e;
    const s = (...r3) => {
      s._d && gn(-1);
      const o2 = un(t);
      let i3;
      try {
        i3 = e(...r3);
      } finally {
        un(o2), s._d && gn(1);
      }
      return i3;
    };
    return s._n = true, s._c = true, s._d = true, s;
  }
  function Ql(e, t) {
    if (se5 === null)
      return e;
    const n = Sn(se5), s = e.dirs || (e.dirs = []);
    for (let r3 = 0; r3 < t.length; r3++) {
      let [o2, i3, l3, c2 = J5] = t[r3];
      o2 && (j2(o2) && (o2 = { mounted: o2, updated: o2 }), o2.deep && Ge(i3), s.push({ dir: o2, instance: n, value: i3, oldValue: void 0, arg: l3, modifiers: c2 }));
    }
    return e;
  }
  function it(e, t, n, s) {
    const r3 = e.dirs, o2 = t && t.dirs;
    for (let i3 = 0; i3 < r3.length; i3++) {
      const l3 = r3[i3];
      o2 && (l3.oldValue = o2[i3].value);
      let c2 = l3.dir[s];
      c2 && (ze2(), Ne3(c2, n, 8, [e.el, l3, e, t]), Ze());
    }
  }
  function fi(e, t) {
    if (ne5) {
      let n = ne5.provides;
      const s = ne5.parent && ne5.parent.provides;
      s === n && (n = ne5.provides = Object.create(s)), n[e] = t;
    }
  }
  function on(e, t, n = false) {
    const s = lo();
    if (s || yt) {
      let r3 = yt ? yt._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
      if (r3 && e in r3)
        return r3[e];
      if (arguments.length > 1)
        return n && j2(t) ? t.call(s && s.proxy) : t;
    }
  }
  function Mn(e, t, n) {
    return Or(e, t, n);
  }
  function Or(e, t, n = J5) {
    const { immediate: s, deep: r3, flush: o2, once: i3 } = n, l3 = fe3({}, n), c2 = t && s || !t && o2 !== "post";
    let u;
    if (vt) {
      if (o2 === "sync") {
        const x4 = ui();
        u = x4.__watcherHandles || (x4.__watcherHandles = []);
      } else if (!c2) {
        const x4 = () => {
        };
        return x4.stop = Be3, x4.resume = Be3, x4.pause = Be3, x4;
      }
    }
    const a2 = ne5;
    l3.call = (x4, S3, b) => Ne3(x4, a2, S3, b);
    let h2 = false;
    o2 === "post" ? l3.scheduler = (x4) => {
      oe5(x4, a2 && a2.suspense);
    } : o2 !== "sync" && (h2 = true, l3.scheduler = (x4, S3) => {
      S3 ? x4() : ps(x4);
    }), l3.augmentJob = (x4) => {
      t && (x4.flags |= 4), h2 && (x4.flags |= 2, a2 && (x4.id = a2.uid, x4.i = a2));
    };
    const _2 = si(e, t, l3);
    return vt && (u ? u.push(_2) : c2 && _2()), _2;
  }
  function di(e, t, n) {
    const s = this.proxy, r3 = re5(e) ? e.includes(".") ? Ir(s, e) : () => s[e] : e.bind(s, s);
    let o2;
    j2(t) ? o2 = t : (o2 = t.handler, n = t);
    const i3 = zt(this), l3 = Or(r3, o2.bind(s), n);
    return i3(), l3;
  }
  function Ir(e, t) {
    const n = t.split(".");
    return () => {
      let s = e;
      for (let r3 = 0; r3 < n.length && s; r3++)
        s = s[n[r3]];
      return s;
    };
  }
  function sn(e, t, n, { o: { insert: s }, m: r3 }, o2 = 2) {
    o2 === 0 && s(e.targetAnchor, t, n);
    const { el: i3, anchor: l3, shapeFlag: c2, children: u, props: a2 } = e, h2 = o2 === 2;
    if (h2 && s(i3, t, n), (!h2 || Rt(a2)) && c2 & 16)
      for (let _2 = 0; _2 < u.length; _2++)
        r3(u[_2], t, n, 2);
    h2 && s(l3, t, n);
  }
  function hi(e, t, n, s, r3, o2, { o: { nextSibling: i3, parentNode: l3, querySelector: c2, insert: u, createText: a2 } }, h2) {
    function _2(P3, I2) {
      let A4 = I2;
      for (; A4; ) {
        if (A4 && A4.nodeType === 8) {
          if (A4.data === "teleport start anchor")
            t.targetStart = A4;
          else if (A4.data === "teleport anchor") {
            t.targetAnchor = A4, P3._lpa = t.targetAnchor && i3(t.targetAnchor);
            break;
          }
        }
        A4 = i3(A4);
      }
    }
    function x4(P3, I2) {
      I2.anchor = h2(i3(P3), I2, l3(P3), n, s, r3, o2);
    }
    const S3 = t.target = Kn(t.props, c2), b = Rt(t.props);
    if (S3) {
      const P3 = S3._lpa || S3.firstChild;
      t.shapeFlag & 16 && (b ? (x4(e, t), _2(S3, P3), t.targetAnchor || Wn(S3, t, a2, u, l3(e) === S3 ? e : null)) : (t.anchor = i3(e), _2(S3, P3), t.targetAnchor || Wn(S3, t, a2, u), h2(P3 && i3(P3), t, S3, n, s, r3, o2))), ln(t, b);
    } else
      b && t.shapeFlag & 16 && (x4(e, t), t.targetStart = e, t.targetAnchor = i3(e));
    return t.anchor && i3(t.anchor);
  }
  function ln(e, t) {
    const n = e.ctx;
    if (n && n.ut) {
      let s, r3;
      for (t ? (s = e.el, r3 = e.anchor) : (s = e.targetStart, r3 = e.targetAnchor); s && s !== r3; )
        s.nodeType === 1 && s.setAttribute("data-v-owner", n.uid), s = s.nextSibling;
      n.ut();
    }
  }
  function Wn(e, t, n, s, r3 = null) {
    const o2 = t.targetStart = n(""), i3 = t.targetAnchor = n("");
    return o2[Rr] = i3, e && (s(o2, e, r3), s(i3, e, r3)), i3;
  }
  function pi() {
    const e = { isMounted: false, isLeaving: false, isUnmounting: false, leavingVNodes: /* @__PURE__ */ new Map() };
    return Ft(() => {
      e.isMounted = true;
    }), Vr(() => {
      e.isUnmounting = true;
    }), e;
  }
  function Lr(e) {
    let t = e[0];
    if (e.length > 1) {
      for (const n of e)
        if (n.type !== le5) {
          t = n;
          break;
        }
    }
    return t;
  }
  function jr(e, t) {
    const { leavingVNodes: n } = e;
    let s = n.get(t.type);
    return s || (s = /* @__PURE__ */ Object.create(null), n.set(t.type, s)), s;
  }
  function qn(e, t, n, s, r3) {
    const { appear: o2, mode: i3, persisted: l3 = false, onBeforeEnter: c2, onEnter: u, onAfterEnter: a2, onEnterCancelled: h2, onBeforeLeave: _2, onLeave: x4, onAfterLeave: S3, onLeaveCancelled: b, onBeforeAppear: P3, onAppear: I2, onAfterAppear: A4, onAppearCancelled: F4 } = t, C3 = String(e.key), B2 = jr(n, e), $2 = (M2, V2) => {
      M2 && Ne3(M2, s, 9, V2);
    }, N2 = (M2, V2) => {
      const X4 = V2[1];
      $2(M2, V2), L3(M2) ? M2.every((he4) => he4.length <= 1) && X4() : M2.length <= 1 && X4();
    }, G5 = { mode: i3, persisted: l3, beforeEnter(M2) {
      let V2 = c2;
      if (!n.isMounted)
        if (o2)
          V2 = P3 || c2;
        else
          return;
      M2[De3] && M2[De3](true);
      const X4 = B2[C3];
      X4 && ft(e, X4) && X4.el[De3] && X4.el[De3](), $2(V2, [M2]);
    }, enter(M2) {
      if (B2[C3] === e)
        return;
      let V2 = u, X4 = a2, he4 = h2;
      if (!n.isMounted)
        if (o2)
          V2 = I2 || u, X4 = A4 || a2, he4 = F4 || h2;
        else
          return;
      let Ce4 = false;
      M2[Et] = (Zt2) => {
        Ce4 || (Ce4 = true, Zt2 ? $2(he4, [M2]) : $2(X4, [M2]), G5.delayedLeave && G5.delayedLeave(), M2[Et] = void 0);
      };
      const et2 = M2[Et].bind(null, false);
      V2 ? N2(V2, [M2, et2]) : et2();
    }, leave(M2, V2) {
      const X4 = String(e.key);
      if (M2[Et] && M2[Et](true), n.isUnmounting)
        return V2();
      $2(_2, [M2]);
      let he4 = false;
      M2[De3] = (et2) => {
        he4 || (he4 = true, V2(), et2 ? $2(b, [M2]) : $2(S3, [M2]), M2[De3] = void 0, B2[X4] === e && delete B2[X4]);
      };
      const Ce4 = M2[De3].bind(null, false);
      B2[X4] = e, x4 ? N2(x4, [M2, Ce4]) : Ce4();
    }, clone(M2) {
      const V2 = qn(M2, t, n, s, r3);
      return r3 && r3(V2), V2;
    } };
    return G5;
  }
  function Fn(e) {
    if (Yt(e))
      return e = st(e), e.children = null, e;
  }
  function Fs(e) {
    if (!Yt(e))
      return Mr(e.type) && e.children ? Lr(e.children) : e;
    if (e.component)
      return e.component.subTree;
    const { shapeFlag: t, children: n } = e;
    if (n) {
      if (t & 16)
        return n[0];
      if (t & 32 && j2(n.default))
        return n.default();
    }
  }
  function Vt(e, t) {
    e.shapeFlag & 6 && e.component ? (e.transition = t, Vt(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
  }
  function $r(e, t = false, n) {
    let s = [], r3 = 0;
    for (let o2 = 0; o2 < e.length; o2++) {
      let i3 = e[o2];
      const l3 = n == null ? i3.key : String(n) + String(i3.key != null ? i3.key : o2);
      i3.type === me ? (i3.patchFlag & 128 && r3++, s = s.concat($r(i3.children, t, l3))) : (t || i3.type !== le5) && s.push(l3 != null ? st(i3, { key: l3 }) : i3);
    }
    if (r3 > 1)
      for (let o2 = 0; o2 < s.length; o2++)
        s[o2].patchFlag = -2;
    return s;
  }
  function gs(e, t) {
    return j2(e) ? fe3({ name: e.name }, t, { setup: e }) : e;
  }
  function _s(e) {
    e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
  }
  function Ds(e, t) {
    let n;
    return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
  }
  function Mt(e, t, n, s, r3 = false) {
    if (L3(e)) {
      e.forEach((b, P3) => Mt(b, t && (L3(t) ? t[P3] : t), n, s, r3));
      return;
    }
    if (mt(s) && !r3) {
      s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Mt(e, t, n, s.component.subTree);
      return;
    }
    const o2 = s.shapeFlag & 4 ? Sn(s.component) : s.el, i3 = r3 ? null : o2, { i: l3, r: c2 } = e, u = t && t.r, a2 = l3.refs === J5 ? l3.refs = {} : l3.refs, h2 = l3.setupState, _2 = U4(h2), x4 = h2 === J5 ? er : (b) => Ds(a2, b) ? false : K5(_2, b), S3 = (b, P3) => !(P3 && Ds(a2, P3));
    if (u != null && u !== c2) {
      if (Ls(t), re5(u))
        a2[u] = null, x4(u) && (h2[u] = null);
      else if (ce4(u)) {
        const b = t;
        S3(u, b.k) && (u.value = null), b.k && (a2[b.k] = null);
      }
    }
    if (j2(c2))
      Jt(c2, l3, 12, [i3, a2]);
    else {
      const b = re5(c2), P3 = ce4(c2);
      if (b || P3) {
        const I2 = () => {
          if (e.f) {
            const A4 = b ? x4(c2) ? h2[c2] : a2[c2] : S3() || !e.k ? c2.value : a2[e.k];
            if (r3)
              L3(A4) && ns(A4, o2);
            else if (L3(A4))
              A4.includes(o2) || A4.push(o2);
            else if (b)
              a2[c2] = [o2], x4(c2) && (h2[c2] = a2[c2]);
            else {
              const F4 = [o2];
              S3(c2, e.k) && (c2.value = F4), e.k && (a2[e.k] = F4);
            }
          } else
            b ? (a2[c2] = i3, x4(c2) && (h2[c2] = i3)) : P3 && (S3(c2, e.k) && (c2.value = i3), e.k && (a2[e.k] = i3));
        };
        if (i3) {
          const A4 = () => {
            I2(), dn.delete(e);
          };
          A4.id = -1, dn.set(e, A4), oe5(A4, n);
        } else
          Ls(e), I2();
      }
    }
  }
  function Ls(e) {
    const t = dn.get(e);
    t && (t.flags |= 8, dn.delete(e));
  }
  function mi(e, t) {
    if (js(e) && e.data === "[") {
      let n = 1, s = e.nextSibling;
      for (; s; ) {
        if (s.nodeType === 1) {
          if (t(s) === false)
            break;
        } else if (js(s))
          if (s.data === "]") {
            if (--n === 0)
              break;
          } else
            s.data === "[" && n++;
        s = s.nextSibling;
      }
    } else
      t(e);
  }
  function Ke(e) {
    j2(e) && (e = { loader: e });
    const { loader: t, loadingComponent: n, errorComponent: s, delay: r3 = 200, hydrate: o2, timeout: i3, suspensible: l3 = true, onError: c2 } = e;
    let u = null, a2, h2 = 0;
    const _2 = () => (h2++, u = null, x4()), x4 = () => {
      let S3;
      return u || (S3 = u = t().catch((b) => {
        if (b = b instanceof Error ? b : new Error(String(b)), c2)
          return new Promise((P3, I2) => {
            c2(b, () => P3(_2()), () => I2(b), h2 + 1);
          });
        throw b;
      }).then((b) => S3 !== u && u ? u : (b && (b.__esModule || b[Symbol.toStringTag] === "Module") && (b = b.default), a2 = b, b)));
    };
    return gs({ name: "AsyncComponentWrapper", __asyncLoader: x4, __asyncHydrate(S3, b, P3) {
      let I2 = false;
      (b.bu || (b.bu = [])).push(() => I2 = true);
      const A4 = () => {
        I2 || P3();
      }, F4 = o2 ? () => {
        const C3 = o2(A4, (B2) => mi(S3, B2));
        C3 && (b.bum || (b.bum = [])).push(C3);
      } : A4;
      a2 ? F4() : x4().then(() => !b.isUnmounted && F4());
    }, get __asyncResolved() {
      return a2;
    }, setup() {
      const S3 = ne5;
      if (_s(S3), a2)
        return () => rn(a2, S3);
      const b = (F4) => {
        u = null, Gt(F4, S3, 13, !s);
      };
      if (l3 && S3.suspense || vt)
        return x4().then((F4) => () => rn(F4, S3)).catch((F4) => (b(F4), () => s ? Q(s, { error: F4 }) : null));
      const P3 = Ye(false), I2 = Ye(), A4 = Ye(!!r3);
      return r3 && setTimeout(() => {
        A4.value = false;
      }, r3), i3 != null && setTimeout(() => {
        if (!P3.value && !I2.value) {
          const F4 = new Error(`Async component timed out after ${i3}ms.`);
          b(F4), I2.value = F4;
        }
      }, i3), x4().then(() => {
        P3.value = true, S3.parent && Yt(S3.parent.vnode) && S3.parent.update();
      }).catch((F4) => {
        b(F4), I2.value = F4;
      }), () => {
        if (P3.value && a2)
          return rn(a2, S3);
        if (I2.value && s)
          return Q(s, { error: I2.value });
        if (n && !A4.value)
          return rn(n, S3);
      };
    } });
  }
  function rn(e, t) {
    const { ref: n, props: s, children: r3, ce: o2 } = t.vnode, i3 = Q(e, s, r3);
    return i3.ref = n, i3.ce = o2, delete t.vnode.ce, i3;
  }
  function yi(e, t) {
    Br(e, "a", t);
  }
  function bi(e, t) {
    Br(e, "da", t);
  }
  function Br(e, t, n = ne5) {
    const s = e.__wdc || (e.__wdc = () => {
      let r3 = n;
      for (; r3; ) {
        if (r3.isDeactivated)
          return;
        r3 = r3.parent;
      }
      return e();
    });
    if (wn(t, s, n), n) {
      let r3 = n.parent;
      for (; r3 && r3.parent; )
        Yt(r3.parent.vnode) && vi(s, t, n, r3), r3 = r3.parent;
    }
  }
  function vi(e, t, n, s) {
    const r3 = wn(t, e, s, true);
    hn(() => {
      ns(s[t], r3);
    }, n);
  }
  function wn(e, t, n = ne5, s = false) {
    if (n) {
      const r3 = n[e] || (n[e] = []), o2 = t.__weh || (t.__weh = (...i3) => {
        ze2();
        const l3 = zt(n), c2 = Ne3(t, n, e, i3);
        return l3(), Ze(), c2;
      });
      return s ? r3.unshift(o2) : r3.push(o2), o2;
    }
  }
  function Hr(e, t = ne5) {
    wn("ec", e, t);
  }
  function sc(e, t, n, s) {
    let r3;
    const o2 = n, i3 = L3(e);
    if (i3 || re5(e)) {
      const l3 = i3 && ut(e);
      let c2 = false, u = false;
      l3 && (c2 = !Se3(e), u = Xe(e), e = xn(e)), r3 = new Array(e.length);
      for (let a2 = 0, h2 = e.length; a2 < h2; a2++)
        r3[a2] = t(c2 ? u ? bt(Ae3(e[a2])) : Ae3(e[a2]) : e[a2], a2, void 0, o2);
    } else if (typeof e == "number") {
      r3 = new Array(e);
      for (let l3 = 0; l3 < e; l3++)
        r3[l3] = t(l3 + 1, l3, void 0, o2);
    } else if (q5(e))
      if (e[Symbol.iterator])
        r3 = Array.from(e, (l3, c2) => t(l3, c2, void 0, o2));
      else {
        const l3 = Object.keys(e);
        r3 = new Array(l3.length);
        for (let c2 = 0, u = l3.length; c2 < u; c2++) {
          const a2 = l3[c2];
          r3[c2] = t(e[a2], a2, c2, o2);
        }
      }
    else
      r3 = [];
    return r3;
  }
  function Bs(e) {
    return L3(e) ? e.reduce((t, n) => (t[n] = null, t), {}) : e;
  }
  function Ii(e) {
    const t = Kr(e), n = e.proxy, s = e.ctx;
    Gn = false, t.beforeCreate && Vs(t.beforeCreate, e, "bc");
    const { data: r3, computed: o2, methods: i3, watch: l3, provide: c2, inject: u, created: a2, beforeMount: h2, mounted: _2, beforeUpdate: x4, updated: S3, activated: b, deactivated: P3, beforeDestroy: I2, beforeUnmount: A4, destroyed: F4, unmounted: C3, render: B2, renderTracked: $2, renderTriggered: N2, errorCaptured: G5, serverPrefetch: M2, expose: V2, inheritAttrs: X4, components: he4, directives: Ce4, filters: et2 } = t;
    if (u && Ri(u, s, null), i3)
      for (const ee4 in i3) {
        const Y4 = i3[ee4];
        j2(Y4) && (s[ee4] = Y4.bind(n));
      }
    if (r3) {
      const ee4 = r3.call(n, n);
      q5(ee4) && (e.data = us(ee4));
    }
    if (Gn = true, o2)
      for (const ee4 in o2) {
        const Y4 = o2[ee4], rt2 = j2(Y4) ? Y4.bind(n, n) : j2(Y4.get) ? Y4.get.bind(n, n) : Be3, Xt2 = !j2(Y4) && j2(Y4.set) ? Y4.set.bind(n) : Be3, ot2 = Te({ get: rt2, set: Xt2 });
        Object.defineProperty(s, ee4, { enumerable: true, configurable: true, get: () => ot2.value, set: (Pe) => ot2.value = Pe });
      }
    if (l3)
      for (const ee4 in l3)
        Ur(l3[ee4], s, n, ee4);
    if (c2) {
      const ee4 = j2(c2) ? c2.call(n) : c2;
      Reflect.ownKeys(ee4).forEach((Y4) => {
        fi(Y4, ee4[Y4]);
      });
    }
    a2 && Vs(a2, e, "c");
    function ae6(ee4, Y4) {
      L3(Y4) ? Y4.forEach((rt2) => ee4(rt2.bind(n))) : Y4 && ee4(Y4.bind(n));
    }
    if (ae6(xi, h2), ae6(Ft, _2), ae6(wi, x4), ae6(ki, S3), ae6(yi, b), ae6(bi, P3), ae6(Hr, G5), ae6(Ei, $2), ae6(Si, N2), ae6(Vr, A4), ae6(hn, C3), ae6(Ti, M2), L3(V2))
      if (V2.length) {
        const ee4 = e.exposed || (e.exposed = {});
        V2.forEach((Y4) => {
          Object.defineProperty(ee4, Y4, { get: () => n[Y4], set: (rt2) => n[Y4] = rt2, enumerable: true });
        });
      } else
        e.exposed || (e.exposed = {});
    B2 && e.render === Be3 && (e.render = B2), X4 != null && (e.inheritAttrs = X4), he4 && (e.components = he4), Ce4 && (e.directives = Ce4), M2 && _s(e);
  }
  function Ri(e, t, n = Be3) {
    L3(e) && (e = Yn(e));
    for (const s in e) {
      const r3 = e[s];
      let o2;
      q5(r3) ? "default" in r3 ? o2 = on(r3.from || s, r3.default, true) : o2 = on(r3.from || s) : o2 = on(r3), ce4(o2) ? Object.defineProperty(t, s, { enumerable: true, configurable: true, get: () => o2.value, set: (i3) => o2.value = i3 }) : t[s] = o2;
    }
  }
  function Vs(e, t, n) {
    Ne3(L3(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
  }
  function Ur(e, t, n, s) {
    let r3 = s.includes(".") ? Ir(n, s) : () => n[s];
    if (re5(e)) {
      const o2 = t[e];
      j2(o2) && Mn(r3, o2);
    } else if (j2(e))
      Mn(r3, e.bind(n));
    else if (q5(e))
      if (L3(e))
        e.forEach((o2) => Ur(o2, t, n, s));
      else {
        const o2 = j2(e.handler) ? e.handler.bind(n) : t[e.handler];
        j2(o2) && Mn(r3, o2, e);
      }
  }
  function Kr(e) {
    const t = e.type, { mixins: n, extends: s } = t, { mixins: r3, optionsCache: o2, config: { optionMergeStrategies: i3 } } = e.appContext, l3 = o2.get(t);
    let c2;
    return l3 ? c2 = l3 : !r3.length && !n && !s ? c2 = t : (c2 = {}, r3.length && r3.forEach((u) => pn(c2, u, i3, true)), pn(c2, t, i3)), q5(t) && o2.set(t, c2), c2;
  }
  function pn(e, t, n, s = false) {
    const { mixins: r3, extends: o2 } = t;
    o2 && pn(e, o2, n, true), r3 && r3.forEach((i3) => pn(e, i3, n, true));
    for (const i3 in t)
      if (!(s && i3 === "expose")) {
        const l3 = Mi[i3] || n && n[i3];
        e[i3] = l3 ? l3(e[i3], t[i3]) : t[i3];
      }
    return e;
  }
  function Hs(e, t) {
    return t ? e ? function() {
      return fe3(j2(e) ? e.call(this, this) : e, j2(t) ? t.call(this, this) : t);
    } : t : e;
  }
  function Fi(e, t) {
    return Ct(Yn(e), Yn(t));
  }
  function Yn(e) {
    if (L3(e)) {
      const t = {};
      for (let n = 0; n < e.length; n++)
        t[e[n]] = e[n];
      return t;
    }
    return e;
  }
  function ue3(e, t) {
    return e ? [...new Set([].concat(e, t))] : t;
  }
  function Ct(e, t) {
    return e ? fe3(/* @__PURE__ */ Object.create(null), e, t) : t;
  }
  function Ns(e, t) {
    return e ? L3(e) && L3(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : fe3(/* @__PURE__ */ Object.create(null), Bs(e), Bs(t != null ? t : {})) : t;
  }
  function Di(e, t) {
    if (!e)
      return t;
    if (!t)
      return e;
    const n = fe3(/* @__PURE__ */ Object.create(null), e);
    for (const s in t)
      n[s] = ue3(e[s], t[s]);
    return n;
  }
  function Wr() {
    return { app: null, config: { isNativeTag: er, performance: false, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: /* @__PURE__ */ Object.create(null), optionsCache: /* @__PURE__ */ new WeakMap(), propsCache: /* @__PURE__ */ new WeakMap(), emitsCache: /* @__PURE__ */ new WeakMap() };
  }
  function ji(e, t) {
    return function(s, r3 = null) {
      j2(s) || (s = fe3({}, s)), r3 != null && !q5(r3) && (r3 = null);
      const o2 = Wr(), i3 = /* @__PURE__ */ new WeakSet(), l3 = [];
      let c2 = false;
      const u = o2.app = { _uid: Li++, _component: s, _props: r3, _container: null, _context: o2, _instance: null, version: gl, get config() {
        return o2.config;
      }, set config(a2) {
      }, use(a2, ...h2) {
        return i3.has(a2) || (a2 && j2(a2.install) ? (i3.add(a2), a2.install(u, ...h2)) : j2(a2) && (i3.add(a2), a2(u, ...h2))), u;
      }, mixin(a2) {
        return o2.mixins.includes(a2) || o2.mixins.push(a2), u;
      }, component(a2, h2) {
        return h2 ? (o2.components[a2] = h2, u) : o2.components[a2];
      }, directive(a2, h2) {
        return h2 ? (o2.directives[a2] = h2, u) : o2.directives[a2];
      }, mount(a2, h2, _2) {
        if (!c2) {
          const x4 = u._ceVNode || Q(s, r3);
          return x4.appContext = o2, _2 === true ? _2 = "svg" : _2 === false && (_2 = void 0), e(x4, a2, _2), c2 = true, u._container = a2, a2.__vue_app__ = u, Sn(x4.component);
        }
      }, onUnmount(a2) {
        l3.push(a2);
      }, unmount() {
        c2 && (Ne3(l3, u._instance, 16), e(null, u._container), delete u._container.__vue_app__);
      }, provide(a2, h2) {
        return o2.provides[a2] = h2, u;
      }, runWithContext(a2) {
        const h2 = yt;
        yt = u;
        try {
          return a2();
        } finally {
          yt = h2;
        }
      } };
      return u;
    };
  }
  function Bi(e, t, ...n) {
    if (e.isUnmounted)
      return;
    const s = e.vnode.props || J5;
    let r3 = n;
    const o2 = t.startsWith("update:"), i3 = o2 && $i(s, t.slice(7));
    i3 && (i3.trim && (r3 = n.map((a2) => re5(a2) ? a2.trim() : a2)), i3.number && (r3 = n.map(wo)));
    let l3, c2 = s[l3 = An(t)] || s[l3 = An(He(t))];
    !c2 && o2 && (c2 = s[l3 = An(Wt(t))]), c2 && Ne3(c2, e, 6, r3);
    const u = s[l3 + "Once"];
    if (u) {
      if (!e.emitted)
        e.emitted = {};
      else if (e.emitted[l3])
        return;
      e.emitted[l3] = true, Ne3(u, e, 6, r3);
    }
  }
  function qr(e, t, n = false) {
    const s = n ? Vi : t.emitsCache, r3 = s.get(e);
    if (r3 !== void 0)
      return r3;
    const o2 = e.emits;
    let i3 = {}, l3 = false;
    if (!j2(e)) {
      const c2 = (u) => {
        const a2 = qr(u, t, true);
        a2 && (l3 = true, fe3(i3, a2));
      };
      !n && t.mixins.length && t.mixins.forEach(c2), e.extends && c2(e.extends), e.mixins && e.mixins.forEach(c2);
    }
    return !o2 && !l3 ? (q5(e) && s.set(e, null), null) : (L3(o2) ? o2.forEach((c2) => i3[c2] = null) : fe3(i3, o2), q5(e) && s.set(e, i3), i3);
  }
  function kn(e, t) {
    return !e || !ts(t) ? false : (t = t.slice(2).replace(/Once$/, ""), K5(e, t[0].toLowerCase() + t.slice(1)) || K5(e, Wt(t)) || K5(e, t));
  }
  function Us(e) {
    const { type: t, vnode: n, proxy: s, withProxy: r3, propsOptions: [o2], slots: i3, attrs: l3, emit: c2, render: u, renderCache: a2, props: h2, data: _2, setupState: x4, ctx: S3, inheritAttrs: b } = e, P3 = un(e);
    let I2, A4;
    try {
      if (n.shapeFlag & 4) {
        const C3 = r3 || s, B2 = C3;
        I2 = je(u.call(B2, C3, a2, h2, x4, _2, S3)), A4 = l3;
      } else {
        const C3 = t;
        I2 = je(C3.length > 1 ? C3(h2, { attrs: l3, slots: i3, emit: c2 }) : C3(h2, null)), A4 = t.props ? l3 : Hi(l3);
      }
    } catch (C3) {
      Lt.length = 0, Gt(C3, e, 1), I2 = Q(le5);
    }
    let F4 = I2;
    if (A4 && b !== false) {
      const C3 = Object.keys(A4), { shapeFlag: B2 } = F4;
      C3.length && B2 & 7 && (o2 && C3.some(tr) && (A4 = Ni(A4, o2)), F4 = st(F4, A4, false, true));
    }
    return n.dirs && (F4 = st(F4, null, false, true), F4.dirs = F4.dirs ? F4.dirs.concat(n.dirs) : n.dirs), n.transition && Vt(F4, n.transition), I2 = F4, un(P3), I2;
  }
  function Ui(e, t, n) {
    const { props: s, children: r3, component: o2 } = e, { props: i3, children: l3, patchFlag: c2 } = t, u = o2.emitsOptions;
    if (t.dirs || t.transition)
      return true;
    if (n && c2 >= 0) {
      if (c2 & 1024)
        return true;
      if (c2 & 16)
        return s ? Ks(s, i3, u) : !!i3;
      if (c2 & 8) {
        const a2 = t.dynamicProps;
        for (let h2 = 0; h2 < a2.length; h2++) {
          const _2 = a2[h2];
          if (Jr(i3, s, _2) && !kn(u, _2))
            return true;
        }
      }
    } else
      return (r3 || l3) && (!l3 || !l3.$stable) ? true : s === i3 ? false : s ? i3 ? Ks(s, i3, u) : true : !!i3;
    return false;
  }
  function Ks(e, t, n) {
    const s = Object.keys(t);
    if (s.length !== Object.keys(e).length)
      return true;
    for (let r3 = 0; r3 < s.length; r3++) {
      const o2 = s[r3];
      if (Jr(t, e, o2) && !kn(n, o2))
        return true;
    }
    return false;
  }
  function Jr(e, t, n) {
    const s = e[n], r3 = t[n];
    return n === "style" && q5(s) && q5(r3) ? !vn(s, r3) : s !== r3;
  }
  function Ki({ vnode: e, parent: t }, n) {
    for (; t; ) {
      const s = t.subTree;
      if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)
        (e = t.vnode).el = n, t = t.parent;
      else
        break;
    }
  }
  function Wi(e, t, n, s = false) {
    const r3 = {}, o2 = Yr();
    e.propsDefaults = /* @__PURE__ */ Object.create(null), Zr(e, t, r3, o2);
    for (const i3 in e.propsOptions[0])
      i3 in r3 || (r3[i3] = void 0);
    n ? e.props = s ? r3 : zo(r3) : e.type.props ? e.props = r3 : e.props = o2, e.attrs = o2;
  }
  function qi(e, t, n, s) {
    const { props: r3, attrs: o2, vnode: { patchFlag: i3 } } = e, l3 = U4(r3), [c2] = e.propsOptions;
    let u = false;
    if ((s || i3 > 0) && !(i3 & 16)) {
      if (i3 & 8) {
        const a2 = e.vnode.dynamicProps;
        for (let h2 = 0; h2 < a2.length; h2++) {
          let _2 = a2[h2];
          if (kn(e.emitsOptions, _2))
            continue;
          const x4 = t[_2];
          if (c2)
            if (K5(o2, _2))
              x4 !== o2[_2] && (o2[_2] = x4, u = true);
            else {
              const S3 = He(_2);
              r3[S3] = zn(c2, l3, S3, x4, e, false);
            }
          else
            x4 !== o2[_2] && (o2[_2] = x4, u = true);
        }
      }
    } else {
      Zr(e, t, r3, o2) && (u = true);
      let a2;
      for (const h2 in l3)
        (!t || !K5(t, h2) && ((a2 = Wt(h2)) === h2 || !K5(t, a2))) && (c2 ? n && (n[h2] !== void 0 || n[a2] !== void 0) && (r3[h2] = zn(c2, l3, h2, void 0, e, true)) : delete r3[h2]);
      if (o2 !== l3)
        for (const h2 in o2)
          (!t || !K5(t, h2)) && (delete o2[h2], u = true);
    }
    u && Je(e.attrs, "set", "");
  }
  function Zr(e, t, n, s) {
    const [r3, o2] = e.propsOptions;
    let i3 = false, l3;
    if (t)
      for (let c2 in t) {
        if (Pt(c2))
          continue;
        const u = t[c2];
        let a2;
        r3 && K5(r3, a2 = He(c2)) ? !o2 || !o2.includes(a2) ? n[a2] = u : (l3 || (l3 = {}))[a2] = u : kn(e.emitsOptions, c2) || (!(c2 in s) || u !== s[c2]) && (s[c2] = u, i3 = true);
      }
    if (o2) {
      const c2 = U4(n), u = l3 || J5;
      for (let a2 = 0; a2 < o2.length; a2++) {
        const h2 = o2[a2];
        n[h2] = zn(r3, c2, h2, u[h2], e, !K5(u, h2));
      }
    }
    return i3;
  }
  function zn(e, t, n, s, r3, o2) {
    const i3 = e[n];
    if (i3 != null) {
      const l3 = K5(i3, "default");
      if (l3 && s === void 0) {
        const c2 = i3.default;
        if (i3.type !== Function && !i3.skipFactory && j2(c2)) {
          const { propsDefaults: u } = r3;
          if (n in u)
            s = u[n];
          else {
            const a2 = zt(r3);
            s = u[n] = c2.call(null, t), a2();
          }
        } else
          s = c2;
        r3.ce && r3.ce._setProp(n, s);
      }
      i3[0] && (o2 && !l3 ? s = false : i3[1] && (s === "" || s === Wt(n)) && (s = true));
    }
    return s;
  }
  function Xr(e, t, n = false) {
    const s = n ? Ji : t.propsCache, r3 = s.get(e);
    if (r3)
      return r3;
    const o2 = e.props, i3 = {}, l3 = [];
    let c2 = false;
    if (!j2(e)) {
      const a2 = (h2) => {
        c2 = true;
        const [_2, x4] = Xr(h2, t, true);
        fe3(i3, _2), x4 && l3.push(...x4);
      };
      !n && t.mixins.length && t.mixins.forEach(a2), e.extends && a2(e.extends), e.mixins && e.mixins.forEach(a2);
    }
    if (!o2 && !c2)
      return q5(e) && s.set(e, pt), pt;
    if (L3(o2))
      for (let a2 = 0; a2 < o2.length; a2++) {
        const h2 = He(o2[a2]);
        Ws(h2) && (i3[h2] = J5);
      }
    else if (o2)
      for (const a2 in o2) {
        const h2 = He(a2);
        if (Ws(h2)) {
          const _2 = o2[a2], x4 = i3[h2] = L3(_2) || j2(_2) ? { type: _2 } : fe3({}, _2), S3 = x4.type;
          let b = false, P3 = true;
          if (L3(S3))
            for (let I2 = 0; I2 < S3.length; ++I2) {
              const A4 = S3[I2], F4 = j2(A4) && A4.name;
              if (F4 === "Boolean") {
                b = true;
                break;
              } else
                F4 === "String" && (P3 = false);
            }
          else
            b = j2(S3) && S3.name === "Boolean";
          x4[0] = b, x4[1] = P3, (b || K5(x4, "default")) && l3.push(h2);
        }
      }
    const u = [i3, l3];
    return q5(e) && s.set(e, u), u;
  }
  function Ws(e) {
    return e[0] !== "$" && !Pt(e);
  }
  function oc(e) {
    return Zi(e);
  }
  function Zi(e, t) {
    const n = bn();
    n.__VUE__ = true;
    const { insert: s, remove: r3, patchProp: o2, createElement: i3, createText: l3, createComment: c2, setText: u, setElementText: a2, parentNode: h2, nextSibling: _2, setScopeId: x4 = Be3, insertStaticContent: S3 } = e, b = (f, d4, p3, v2 = null, g3 = null, m = null, T4 = void 0, k4 = null, w3 = !!d4.dynamicChildren) => {
      if (f === d4)
        return;
      f && !ft(f, d4) && (v2 = Qt2(f), Pe(f, g3, m, true), f = null), d4.patchFlag === -2 && (w3 = false, d4.dynamicChildren = null);
      const { type: y, ref: R3, shapeFlag: E4 } = d4;
      switch (y) {
        case Tn:
          P3(f, d4, p3, v2);
          break;
        case le5:
          I2(f, d4, p3, v2);
          break;
        case jn:
          f == null && A4(d4, p3, v2, T4);
          break;
        case me:
          he4(f, d4, p3, v2, g3, m, T4, k4, w3);
          break;
        default:
          E4 & 1 ? B2(f, d4, p3, v2, g3, m, T4, k4, w3) : E4 & 6 ? Ce4(f, d4, p3, v2, g3, m, T4, k4, w3) : (E4 & 64 || E4 & 128) && y.process(f, d4, p3, v2, g3, m, T4, k4, w3, kt2);
      }
      R3 != null && g3 ? Mt(R3, f && f.ref, m, d4 || f, !d4) : R3 == null && f && f.ref != null && Mt(f.ref, null, m, f, true);
    }, P3 = (f, d4, p3, v2) => {
      if (f == null)
        s(d4.el = l3(d4.children), p3, v2);
      else {
        const g3 = d4.el = f.el;
        d4.children !== f.children && u(g3, d4.children);
      }
    }, I2 = (f, d4, p3, v2) => {
      f == null ? s(d4.el = c2(d4.children || ""), p3, v2) : d4.el = f.el;
    }, A4 = (f, d4, p3, v2) => {
      [f.el, f.anchor] = S3(f.children, d4, p3, v2, f.el, f.anchor);
    }, F4 = ({ el: f, anchor: d4 }, p3, v2) => {
      let g3;
      for (; f && f !== d4; )
        g3 = _2(f), s(f, p3, v2), f = g3;
      s(d4, p3, v2);
    }, C3 = ({ el: f, anchor: d4 }) => {
      let p3;
      for (; f && f !== d4; )
        p3 = _2(f), r3(f), f = p3;
      r3(d4);
    }, B2 = (f, d4, p3, v2, g3, m, T4, k4, w3) => {
      if (d4.type === "svg" ? T4 = "svg" : d4.type === "math" && (T4 = "mathml"), f == null)
        $2(d4, p3, v2, g3, m, T4, k4, w3);
      else {
        const y = f.el && f.el._isVueCE ? f.el : null;
        try {
          y && y._beginPatch(), M2(f, d4, g3, m, T4, k4, w3);
        } finally {
          y && y._endPatch();
        }
      }
    }, $2 = (f, d4, p3, v2, g3, m, T4, k4) => {
      let w3, y;
      const { props: R3, shapeFlag: E4, transition: O5, dirs: D3 } = f;
      if (w3 = f.el = i3(f.type, m, R3 && R3.is, R3), E4 & 8 ? a2(w3, f.children) : E4 & 16 && G5(f.children, w3, null, v2, g3, Ln(f, m), T4, k4), D3 && it(f, null, v2, "created"), N2(w3, f, f.scopeId, T4, v2), R3) {
        for (const z4 in R3)
          z4 !== "value" && !Pt(z4) && o2(w3, z4, null, R3[z4], m, v2);
        "value" in R3 && o2(w3, "value", null, R3.value, m), (y = R3.onVnodeBeforeMount) && Me4(y, v2, f);
      }
      D3 && it(f, null, v2, "beforeMount");
      const H6 = Xi(g3, O5);
      H6 && O5.beforeEnter(w3), s(w3, d4, p3), ((y = R3 && R3.onVnodeMounted) || H6 || D3) && oe5(() => {
        y && Me4(y, v2, f), H6 && O5.enter(w3), D3 && it(f, null, v2, "mounted");
      }, g3);
    }, N2 = (f, d4, p3, v2, g3) => {
      if (p3 && x4(f, p3), v2)
        for (let m = 0; m < v2.length; m++)
          x4(f, v2[m]);
      if (g3) {
        let m = g3.subTree;
        if (d4 === m || ro(m.type) && (m.ssContent === d4 || m.ssFallback === d4)) {
          const T4 = g3.vnode;
          N2(f, T4, T4.scopeId, T4.slotScopeIds, g3.parent);
        }
      }
    }, G5 = (f, d4, p3, v2, g3, m, T4, k4, w3 = 0) => {
      for (let y = w3; y < f.length; y++) {
        const R3 = f[y] = k4 ? qe2(f[y]) : je(f[y]);
        b(null, R3, d4, p3, v2, g3, m, T4, k4);
      }
    }, M2 = (f, d4, p3, v2, g3, m, T4) => {
      const k4 = d4.el = f.el;
      let { patchFlag: w3, dynamicChildren: y, dirs: R3 } = d4;
      w3 |= f.patchFlag & 16;
      const E4 = f.props || J5, O5 = d4.props || J5;
      let D3;
      if (p3 && lt(p3, false), (D3 = O5.onVnodeBeforeUpdate) && Me4(D3, p3, d4, f), R3 && it(d4, f, p3, "beforeUpdate"), p3 && lt(p3, true), (E4.innerHTML && O5.innerHTML == null || E4.textContent && O5.textContent == null) && a2(k4, ""), y ? V2(f.dynamicChildren, y, k4, p3, v2, Ln(d4, g3), m) : T4 || Y4(f, d4, k4, null, p3, v2, Ln(d4, g3), m, false), w3 > 0) {
        if (w3 & 16)
          X4(k4, E4, O5, p3, g3);
        else if (w3 & 2 && E4.class !== O5.class && o2(k4, "class", null, O5.class, g3), w3 & 4 && o2(k4, "style", E4.style, O5.style, g3), w3 & 8) {
          const H6 = d4.dynamicProps;
          for (let z4 = 0; z4 < H6.length; z4++) {
            const W4 = H6[z4], pe4 = E4[W4], ge4 = O5[W4];
            (ge4 !== pe4 || W4 === "value") && o2(k4, W4, pe4, ge4, g3, p3);
          }
        }
        w3 & 1 && f.children !== d4.children && a2(k4, d4.children);
      } else
        !T4 && y == null && X4(k4, E4, O5, p3, g3);
      ((D3 = O5.onVnodeUpdated) || R3) && oe5(() => {
        D3 && Me4(D3, p3, d4, f), R3 && it(d4, f, p3, "updated");
      }, v2);
    }, V2 = (f, d4, p3, v2, g3, m, T4) => {
      for (let k4 = 0; k4 < d4.length; k4++) {
        const w3 = f[k4], y = d4[k4], R3 = w3.el && (w3.type === me || !ft(w3, y) || w3.shapeFlag & 198) ? h2(w3.el) : p3;
        b(w3, y, R3, null, v2, g3, m, T4, true);
      }
    }, X4 = (f, d4, p3, v2, g3) => {
      if (d4 !== p3) {
        if (d4 !== J5)
          for (const m in d4)
            !Pt(m) && !(m in p3) && o2(f, m, d4[m], null, g3, v2);
        for (const m in p3) {
          if (Pt(m))
            continue;
          const T4 = p3[m], k4 = d4[m];
          T4 !== k4 && m !== "value" && o2(f, m, k4, T4, g3, v2);
        }
        "value" in p3 && o2(f, "value", d4.value, p3.value, g3);
      }
    }, he4 = (f, d4, p3, v2, g3, m, T4, k4, w3) => {
      const y = d4.el = f ? f.el : l3(""), R3 = d4.anchor = f ? f.anchor : l3("");
      let { patchFlag: E4, dynamicChildren: O5, slotScopeIds: D3 } = d4;
      D3 && (k4 = k4 ? k4.concat(D3) : D3), f == null ? (s(y, p3, v2), s(R3, p3, v2), G5(d4.children || [], p3, R3, g3, m, T4, k4, w3)) : E4 > 0 && E4 & 64 && O5 && f.dynamicChildren && f.dynamicChildren.length === O5.length ? (V2(f.dynamicChildren, O5, p3, g3, m, T4, k4), (d4.key != null || g3 && d4 === g3.subTree) && bs(f, d4, true)) : Y4(f, d4, p3, R3, g3, m, T4, k4, w3);
    }, Ce4 = (f, d4, p3, v2, g3, m, T4, k4, w3) => {
      d4.slotScopeIds = k4, f == null ? d4.shapeFlag & 512 ? g3.ctx.activate(d4, p3, v2, T4, w3) : et2(d4, p3, v2, g3, m, T4, w3) : Zt2(f, d4, w3);
    }, et2 = (f, d4, p3, v2, g3, m, T4) => {
      const k4 = f.component = cl(f, v2, g3);
      if (Yt(f) && (k4.ctx.renderer = kt2), fl(k4, false, T4), k4.asyncDep) {
        if (g3 && g3.registerDep(k4, ae6, T4), !f.el) {
          const w3 = k4.subTree = Q(le5);
          I2(null, w3, d4, p3), f.placeholder = w3.el;
        }
      } else
        ae6(k4, f, d4, p3, g3, m, T4);
    }, Zt2 = (f, d4, p3) => {
      const v2 = d4.component = f.component;
      if (Ui(f, d4, p3))
        if (v2.asyncDep && !v2.asyncResolved) {
          ee4(v2, d4, p3);
          return;
        } else
          v2.next = d4, v2.update();
      else
        d4.el = f.el, v2.vnode = d4;
    }, ae6 = (f, d4, p3, v2, g3, m, T4) => {
      const k4 = () => {
        if (f.isMounted) {
          let { next: E4, bu: O5, u: D3, parent: H6, vnode: z4 } = f;
          {
            const Ie3 = no(f);
            if (Ie3) {
              E4 && (E4.el = z4.el, ee4(f, E4, T4)), Ie3.asyncDep.then(() => {
                oe5(() => {
                  f.isUnmounted || y();
                }, g3);
              });
              return;
            }
          }
          let W4 = E4, pe4;
          lt(f, false), E4 ? (E4.el = z4.el, ee4(f, E4, T4)) : E4 = z4, O5 && Cn(O5), (pe4 = E4.props && E4.props.onVnodeBeforeUpdate) && Me4(pe4, H6, E4, z4), lt(f, true);
          const ge4 = Us(f), Oe = f.subTree;
          f.subTree = ge4, b(Oe, ge4, h2(Oe.el), Qt2(Oe), f, g3, m), E4.el = ge4.el, W4 === null && Ki(f, ge4.el), D3 && oe5(D3, g3), (pe4 = E4.props && E4.props.onVnodeUpdated) && oe5(() => Me4(pe4, H6, E4, z4), g3);
        } else {
          let E4;
          const { el: O5, props: D3 } = d4, { bm: H6, m: z4, parent: W4, root: pe4, type: ge4 } = f, Oe = mt(d4);
          lt(f, false), H6 && Cn(H6), !Oe && (E4 = D3 && D3.onVnodeBeforeMount) && Me4(E4, W4, d4), lt(f, true);
          {
            pe4.ce && pe4.ce._hasShadowRoot() && pe4.ce._injectChildStyle(ge4, f.parent ? f.parent.type : void 0);
            const Ie3 = f.subTree = Us(f);
            b(null, Ie3, p3, v2, f, g3, m), d4.el = Ie3.el;
          }
          if (z4 && oe5(z4, g3), !Oe && (E4 = D3 && D3.onVnodeMounted)) {
            const Ie3 = d4;
            oe5(() => Me4(E4, W4, Ie3), g3);
          }
          (d4.shapeFlag & 256 || W4 && mt(W4.vnode) && W4.vnode.shapeFlag & 256) && f.a && oe5(f.a, g3), f.isMounted = true, d4 = p3 = v2 = null;
        }
      };
      f.scope.on();
      const w3 = f.effect = new fr(k4);
      f.scope.off();
      const y = f.update = w3.run.bind(w3), R3 = f.job = w3.runIfDirty.bind(w3);
      R3.i = f, R3.id = f.uid, w3.scheduler = () => ps(R3), lt(f, true), y();
    }, ee4 = (f, d4, p3) => {
      d4.component = f;
      const v2 = f.vnode.props;
      f.vnode = d4, f.next = null, qi(f, d4.props, v2, p3), zi(f, d4.children, p3), ze2(), Os(f), Ze();
    }, Y4 = (f, d4, p3, v2, g3, m, T4, k4, w3 = false) => {
      const y = f && f.children, R3 = f ? f.shapeFlag : 0, E4 = d4.children, { patchFlag: O5, shapeFlag: D3 } = d4;
      if (O5 > 0) {
        if (O5 & 128) {
          Xt2(y, E4, p3, v2, g3, m, T4, k4, w3);
          return;
        } else if (O5 & 256) {
          rt2(y, E4, p3, v2, g3, m, T4, k4, w3);
          return;
        }
      }
      D3 & 8 ? (R3 & 16 && wt(y, g3, m), E4 !== y && a2(p3, E4)) : R3 & 16 ? D3 & 16 ? Xt2(y, E4, p3, v2, g3, m, T4, k4, w3) : wt(y, g3, m, true) : (R3 & 8 && a2(p3, ""), D3 & 16 && G5(E4, p3, v2, g3, m, T4, k4, w3));
    }, rt2 = (f, d4, p3, v2, g3, m, T4, k4, w3) => {
      f = f || pt, d4 = d4 || pt;
      const y = f.length, R3 = d4.length, E4 = Math.min(y, R3);
      let O5;
      for (O5 = 0; O5 < E4; O5++) {
        const D3 = d4[O5] = w3 ? qe2(d4[O5]) : je(d4[O5]);
        b(f[O5], D3, p3, null, g3, m, T4, k4, w3);
      }
      y > R3 ? wt(f, g3, m, true, false, E4) : G5(d4, p3, v2, g3, m, T4, k4, w3, E4);
    }, Xt2 = (f, d4, p3, v2, g3, m, T4, k4, w3) => {
      let y = 0;
      const R3 = d4.length;
      let E4 = f.length - 1, O5 = R3 - 1;
      for (; y <= E4 && y <= O5; ) {
        const D3 = f[y], H6 = d4[y] = w3 ? qe2(d4[y]) : je(d4[y]);
        if (ft(D3, H6))
          b(D3, H6, p3, null, g3, m, T4, k4, w3);
        else
          break;
        y++;
      }
      for (; y <= E4 && y <= O5; ) {
        const D3 = f[E4], H6 = d4[O5] = w3 ? qe2(d4[O5]) : je(d4[O5]);
        if (ft(D3, H6))
          b(D3, H6, p3, null, g3, m, T4, k4, w3);
        else
          break;
        E4--, O5--;
      }
      if (y > E4) {
        if (y <= O5) {
          const D3 = O5 + 1, H6 = D3 < R3 ? d4[D3].el : v2;
          for (; y <= O5; )
            b(null, d4[y] = w3 ? qe2(d4[y]) : je(d4[y]), p3, H6, g3, m, T4, k4, w3), y++;
        }
      } else if (y > O5)
        for (; y <= E4; )
          Pe(f[y], g3, m, true), y++;
      else {
        const D3 = y, H6 = y, z4 = /* @__PURE__ */ new Map();
        for (y = H6; y <= O5; y++) {
          const be4 = d4[y] = w3 ? qe2(d4[y]) : je(d4[y]);
          be4.key != null && z4.set(be4.key, y);
        }
        let W4, pe4 = 0;
        const ge4 = O5 - H6 + 1;
        let Oe = false, Ie3 = 0;
        const Tt = new Array(ge4);
        for (y = 0; y < ge4; y++)
          Tt[y] = 0;
        for (y = D3; y <= E4; y++) {
          const be4 = f[y];
          if (pe4 >= ge4) {
            Pe(be4, g3, m, true);
            continue;
          }
          let Re3;
          if (be4.key != null)
            Re3 = z4.get(be4.key);
          else
            for (W4 = H6; W4 <= O5; W4++)
              if (Tt[W4 - H6] === 0 && ft(be4, d4[W4])) {
                Re3 = W4;
                break;
              }
          Re3 === void 0 ? Pe(be4, g3, m, true) : (Tt[Re3 - H6] = y + 1, Re3 >= Ie3 ? Ie3 = Re3 : Oe = true, b(be4, d4[Re3], p3, null, g3, m, T4, k4, w3), pe4++);
        }
        const ks = Oe ? Qi(Tt) : pt;
        for (W4 = ks.length - 1, y = ge4 - 1; y >= 0; y--) {
          const be4 = H6 + y, Re3 = d4[be4], Ts = d4[be4 + 1], Ss = be4 + 1 < R3 ? Ts.el || so(Ts) : v2;
          Tt[y] === 0 ? b(null, Re3, p3, Ss, g3, m, T4, k4, w3) : Oe && (W4 < 0 || y !== ks[W4] ? ot2(Re3, p3, Ss, 2) : W4--);
        }
      }
    }, ot2 = (f, d4, p3, v2, g3 = null) => {
      const { el: m, type: T4, transition: k4, children: w3, shapeFlag: y } = f;
      if (y & 6) {
        ot2(f.component.subTree, d4, p3, v2);
        return;
      }
      if (y & 128) {
        f.suspense.move(d4, p3, v2);
        return;
      }
      if (y & 64) {
        T4.move(f, d4, p3, kt2);
        return;
      }
      if (T4 === me) {
        s(m, d4, p3);
        for (let E4 = 0; E4 < w3.length; E4++)
          ot2(w3[E4], d4, p3, v2);
        s(f.anchor, d4, p3);
        return;
      }
      if (T4 === jn) {
        F4(f, d4, p3);
        return;
      }
      if (v2 !== 2 && y & 1 && k4)
        if (v2 === 0)
          k4.beforeEnter(m), s(m, d4, p3), oe5(() => k4.enter(m), g3);
        else {
          const { leave: E4, delayLeave: O5, afterLeave: D3 } = k4, H6 = () => {
            f.ctx.isUnmounted ? r3(m) : s(m, d4, p3);
          }, z4 = () => {
            m._isLeaving && m[De3](true), E4(m, () => {
              H6(), D3 && D3();
            });
          };
          O5 ? O5(m, H6, z4) : z4();
        }
      else
        s(m, d4, p3);
    }, Pe = (f, d4, p3, v2 = false, g3 = false) => {
      const { type: m, props: T4, ref: k4, children: w3, dynamicChildren: y, shapeFlag: R3, patchFlag: E4, dirs: O5, cacheIndex: D3 } = f;
      if (E4 === -2 && (g3 = false), k4 != null && (ze2(), Mt(k4, null, p3, f, true), Ze()), D3 != null && (d4.renderCache[D3] = void 0), R3 & 256) {
        d4.ctx.deactivate(f);
        return;
      }
      const H6 = R3 & 1 && O5, z4 = !mt(f);
      let W4;
      if (z4 && (W4 = T4 && T4.onVnodeBeforeUnmount) && Me4(W4, d4, f), R3 & 6)
        mo(f.component, p3, v2);
      else {
        if (R3 & 128) {
          f.suspense.unmount(p3, v2);
          return;
        }
        H6 && it(f, null, d4, "beforeUnmount"), R3 & 64 ? f.type.remove(f, d4, p3, kt2, v2) : y && !y.hasOnce && (m !== me || E4 > 0 && E4 & 64) ? wt(y, d4, p3, false, true) : (m === me && E4 & 384 || !g3 && R3 & 16) && wt(w3, d4, p3), v2 && xs(f);
      }
      (z4 && (W4 = T4 && T4.onVnodeUnmounted) || H6) && oe5(() => {
        W4 && Me4(W4, d4, f), H6 && it(f, null, d4, "unmounted");
      }, p3);
    }, xs = (f) => {
      const { type: d4, el: p3, anchor: v2, transition: g3 } = f;
      if (d4 === me) {
        _o(p3, v2);
        return;
      }
      if (d4 === jn) {
        C3(f);
        return;
      }
      const m = () => {
        r3(p3), g3 && !g3.persisted && g3.afterLeave && g3.afterLeave();
      };
      if (f.shapeFlag & 1 && g3 && !g3.persisted) {
        const { leave: T4, delayLeave: k4 } = g3, w3 = () => T4(p3, m);
        k4 ? k4(f.el, m, w3) : w3();
      } else
        m();
    }, _o = (f, d4) => {
      let p3;
      for (; f !== d4; )
        p3 = _2(f), r3(f), f = p3;
      r3(d4);
    }, mo = (f, d4, p3) => {
      const { bum: v2, scope: g3, job: m, subTree: T4, um: k4, m: w3, a: y } = f;
      qs(w3), qs(y), v2 && Cn(v2), g3.stop(), m && (m.flags |= 8, Pe(T4, f, d4, p3)), k4 && oe5(k4, d4), oe5(() => {
        f.isUnmounted = true;
      }, d4);
    }, wt = (f, d4, p3, v2 = false, g3 = false, m = 0) => {
      for (let T4 = m; T4 < f.length; T4++)
        Pe(f[T4], d4, p3, v2, g3);
    }, Qt2 = (f) => {
      if (f.shapeFlag & 6)
        return Qt2(f.component.subTree);
      if (f.shapeFlag & 128)
        return f.suspense.next();
      const d4 = _2(f.anchor || f.el), p3 = d4 && d4[Rr];
      return p3 ? _2(p3) : d4;
    };
    let En = false;
    const ws = (f, d4, p3) => {
      let v2;
      f == null ? d4._vnode && (Pe(d4._vnode, null, null, true), v2 = d4._vnode.component) : b(d4._vnode || null, f, d4, null, null, null, p3), d4._vnode = f, En || (En = true, Os(v2), Ar(), En = false);
    }, kt2 = { p: b, um: Pe, m: ot2, r: xs, mt: et2, mc: G5, pc: Y4, pbc: V2, n: Qt2, o: e };
    return { render: ws, hydrate: void 0, createApp: ji(ws) };
  }
  function Ln({ type: e, props: t }, n) {
    return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
  }
  function lt({ effect: e, job: t }, n) {
    n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
  }
  function Xi(e, t) {
    return (!e || e && !e.pendingBranch) && t && !t.persisted;
  }
  function bs(e, t, n = false) {
    const s = e.children, r3 = t.children;
    if (L3(s) && L3(r3))
      for (let o2 = 0; o2 < s.length; o2++) {
        const i3 = s[o2];
        let l3 = r3[o2];
        l3.shapeFlag & 1 && !l3.dynamicChildren && ((l3.patchFlag <= 0 || l3.patchFlag === 32) && (l3 = r3[o2] = qe2(r3[o2]), l3.el = i3.el), !n && l3.patchFlag !== -2 && bs(i3, l3)), l3.type === Tn && (l3.patchFlag === -1 && (l3 = r3[o2] = qe2(l3)), l3.el = i3.el), l3.type === le5 && !l3.el && (l3.el = i3.el);
      }
  }
  function Qi(e) {
    const t = e.slice(), n = [0];
    let s, r3, o2, i3, l3;
    const c2 = e.length;
    for (s = 0; s < c2; s++) {
      const u = e[s];
      if (u !== 0) {
        if (r3 = n[n.length - 1], e[r3] < u) {
          t[s] = r3, n.push(s);
          continue;
        }
        for (o2 = 0, i3 = n.length - 1; o2 < i3; )
          l3 = o2 + i3 >> 1, e[n[l3]] < u ? o2 = l3 + 1 : i3 = l3;
        u < e[n[o2]] && (o2 > 0 && (t[s] = n[o2 - 1]), n[o2] = s);
      }
    }
    for (o2 = n.length, i3 = n[o2 - 1]; o2-- > 0; )
      n[o2] = i3, i3 = t[i3];
    return n;
  }
  function no(e) {
    const t = e.subTree.component;
    if (t)
      return t.asyncDep && !t.asyncResolved ? t : no(t);
  }
  function qs(e) {
    if (e)
      for (let t = 0; t < e.length; t++)
        e[t].flags |= 8;
  }
  function so(e) {
    if (e.placeholder)
      return e.placeholder;
    const t = e.component;
    return t ? so(t.subTree) : null;
  }
  function el(e, t) {
    t && t.pendingBranch ? L3(e) ? t.effects.push(...e) : t.effects.push(e) : li(e);
  }
  function ke(e = false) {
    Lt.push(ve3 = e ? null : []);
  }
  function tl() {
    Lt.pop(), ve3 = Lt[Lt.length - 1] || null;
  }
  function gn(e, t = false) {
    Ht += e, e < 0 && ve3 && t && (ve3.hasOnce = true);
  }
  function oo(e) {
    return e.dynamicChildren = Ht > 0 ? ve3 || pt : null, tl(), Ht > 0 && ve3 && ve3.push(e), e;
  }
  function _n(e, t, n, s, r3, o2) {
    return oo(Ut(e, t, n, s, r3, o2, true));
  }
  function nt(e, t, n, s, r3) {
    return oo(Q(e, t, n, s, r3, true));
  }
  function Nt(e) {
    return e ? e.__v_isVNode === true : false;
  }
  function ft(e, t) {
    return e.type === t.type && e.key === t.key;
  }
  function Ut(e, t = null, n = null, s = 0, r3 = null, o2 = e === me ? 0 : 1, i3 = false, l3 = false) {
    const c2 = { __v_isVNode: true, __v_skip: true, type: e, props: t, key: t && io(t), ref: t && cn(t), scopeId: Pr, slotScopeIds: null, children: n, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetStart: null, targetAnchor: null, staticCount: 0, shapeFlag: o2, patchFlag: s, dynamicProps: r3, dynamicChildren: null, appContext: null, ctx: se5 };
    return l3 ? (vs(c2, n), o2 & 128 && e.normalize(c2)) : n && (c2.shapeFlag |= re5(n) ? 8 : 16), Ht > 0 && !i3 && ve3 && (c2.patchFlag > 0 || o2 & 6) && c2.patchFlag !== 32 && ve3.push(c2), c2;
  }
  function nl(e, t = null, n = null, s = 0, r3 = null, o2 = false) {
    if ((!e || e === Ci) && (e = le5), Nt(e)) {
      const l3 = st(e, t, true);
      return n && vs(l3, n), Ht > 0 && !o2 && ve3 && (l3.shapeFlag & 6 ? ve3[ve3.indexOf(e)] = l3 : ve3.push(l3)), l3.patchFlag = -2, l3;
    }
    if (pl(e) && (e = e.__vccOpts), t) {
      t = sl(t);
      let { class: l3, style: c2 } = t;
      l3 && !re5(l3) && (t.class = qt(l3)), q5(c2) && (hs(c2) && !L3(c2) && (c2 = fe3({}, c2)), t.style = os(c2));
    }
    const i3 = re5(e) ? 1 : ro(e) ? 128 : Mr(e) ? 64 : q5(e) ? 4 : j2(e) ? 2 : 0;
    return Ut(e, t, n, s, r3, i3, o2, true);
  }
  function sl(e) {
    return e ? hs(e) || zr(e) ? fe3({}, e) : e : null;
  }
  function st(e, t, n = false, s = false) {
    const { props: r3, ref: o2, patchFlag: i3, children: l3, transition: c2 } = e, u = t ? ol(r3 || {}, t) : r3, a2 = { __v_isVNode: true, __v_skip: true, type: e.type, props: u, key: u && io(u), ref: t && t.ref ? n && o2 ? L3(o2) ? o2.concat(cn(t)) : [o2, cn(t)] : cn(t) : o2, scopeId: e.scopeId, slotScopeIds: e.slotScopeIds, children: l3, target: e.target, targetStart: e.targetStart, targetAnchor: e.targetAnchor, staticCount: e.staticCount, shapeFlag: e.shapeFlag, patchFlag: t && e.type !== me ? i3 === -1 ? 16 : i3 | 16 : i3, dynamicProps: e.dynamicProps, dynamicChildren: e.dynamicChildren, appContext: e.appContext, dirs: e.dirs, transition: c2, component: e.component, suspense: e.suspense, ssContent: e.ssContent && st(e.ssContent), ssFallback: e.ssFallback && st(e.ssFallback), placeholder: e.placeholder, el: e.el, anchor: e.anchor, ctx: e.ctx, ce: e.ce };
    return c2 && s && Vt(a2, c2.clone(a2)), a2;
  }
  function rl(e = " ", t = 0) {
    return Q(Tn, null, e, t);
  }
  function Zn(e = "", t = false) {
    return t ? (ke(), nt(le5, null, e)) : Q(le5, null, e);
  }
  function je(e) {
    return e == null || typeof e == "boolean" ? Q(le5) : L3(e) ? Q(me, null, e.slice()) : Nt(e) ? qe2(e) : Q(Tn, null, String(e));
  }
  function qe2(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : st(e);
  }
  function vs(e, t) {
    let n = 0;
    const { shapeFlag: s } = e;
    if (t == null)
      t = null;
    else if (L3(t))
      n = 16;
    else if (typeof t == "object")
      if (s & 65) {
        const r3 = t.default;
        r3 && (r3._c && (r3._d = false), vs(e, r3()), r3._c && (r3._d = true));
        return;
      } else {
        n = 32;
        const r3 = t._;
        !r3 && !zr(t) ? t._ctx = se5 : r3 === 3 && se5 && (se5.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
      }
    else
      j2(t) ? (t = { default: t, _ctx: se5 }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [rl(t)]) : n = 8);
    e.children = t, e.shapeFlag |= n;
  }
  function ol(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n];
      for (const r3 in s)
        if (r3 === "class")
          t.class !== s.class && (t.class = qt([t.class, s.class]));
        else if (r3 === "style")
          t.style = os([t.style, s.style]);
        else if (ts(r3)) {
          const o2 = t[r3], i3 = s[r3];
          i3 && o2 !== i3 && !(L3(o2) && o2.includes(i3)) && (t[r3] = o2 ? [].concat(o2, i3) : i3);
        } else
          r3 !== "" && (t[r3] = s[r3]);
    }
    return t;
  }
  function Me4(e, t, n, s = null) {
    Ne3(e, t, 7, [n, s]);
  }
  function cl(e, t, n) {
    const s = e.type, r3 = (t ? t.appContext : e.appContext) || il, o2 = { uid: ll++, vnode: e, type: s, parent: t, appContext: r3, root: null, next: null, subTree: null, effect: null, update: null, job: null, scope: new Oo(true), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: t ? t.provides : Object.create(r3.provides), ids: t ? t.ids : ["", 0, 0], accessCache: null, renderCache: [], components: null, directives: null, propsOptions: Xr(s, r3), emitsOptions: qr(s, r3), emit: null, emitted: null, propsDefaults: J5, inheritAttrs: s.inheritAttrs, ctx: J5, data: J5, props: J5, attrs: J5, slots: J5, refs: J5, setupState: J5, setupContext: null, suspense: n, suspenseId: n ? n.pendingId : 0, asyncDep: null, asyncResolved: false, isMounted: false, isUnmounted: false, isDeactivated: false, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null };
    return o2.ctx = { _: o2 }, o2.root = t ? t.root : o2, o2.emit = Bi.bind(null, o2), e.ce && e.ce(o2), o2;
  }
  function co(e) {
    return e.vnode.shapeFlag & 4;
  }
  function fl(e, t = false, n = false) {
    t && Xn(t);
    const { props: s, children: r3 } = e.vnode, o2 = co(e);
    Wi(e, s, o2, t), Yi(e, r3, n || t);
    const i3 = o2 ? al(e, t) : void 0;
    return t && Xn(false), i3;
  }
  function al(e, t) {
    const n = e.type;
    e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Oi);
    const { setup: s } = n;
    if (s) {
      ze2();
      const r3 = e.setupContext = s.length > 1 ? dl(e) : null, o2 = zt(e), i3 = Jt(s, e, 0, [e.props, r3]), l3 = sr(i3);
      if (Ze(), o2(), (l3 || e.sp) && !mt(e) && _s(e), l3) {
        if (i3.then(Js, Js), t)
          return i3.then((c2) => {
            Gs(e, c2);
          }).catch((c2) => {
            Gt(c2, e, 0);
          });
        e.asyncDep = i3;
      } else
        Gs(e, i3);
    } else
      fo(e);
  }
  function Gs(e, t, n) {
    j2(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : q5(t) && (e.setupState = Tr(t)), fo(e);
  }
  function fo(e, t, n) {
    const s = e.type;
    e.render || (e.render = s.render || Be3);
    {
      const r3 = zt(e);
      ze2();
      try {
        Ii(e);
      } finally {
        Ze(), r3();
      }
    }
  }
  function dl(e) {
    const t = (n) => {
      e.exposed = n || {};
    };
    return { attrs: new Proxy(e.attrs, ul), slots: e.slots, emit: e.emit, expose: t };
  }
  function Sn(e) {
    return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Tr(Zo(e.exposed)), { get(t, n) {
      if (n in t)
        return t[n];
      if (n in Dt)
        return Dt[n](e);
    }, has(t, n) {
      return n in t || n in Dt;
    } })) : e.proxy;
  }
  function pl(e) {
    return j2(e) && "__vccOpts" in e;
  }
  function Qn(e, t, n) {
    try {
      gn(-1);
      const s = arguments.length;
      return s === 2 ? q5(t) && !L3(t) ? Nt(t) ? Q(e, null, [t]) : Q(e, t) : Q(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && Nt(n) && (n = [n]), Q(e, t, n));
    } finally {
      gn(1);
    }
  }
  function xl(e, t, n, s, r3, o2) {
    return ke(), _n("div", vl, [...t[0] || (t[0] = [Ut("span", { class: "opacity-60" }, "Dock", -1)])]);
  }
  function $n(e, t) {
    const n = window.__;
    return typeof n == "function" ? n(e, t) : e;
  }
  function Ol() {
    var _a, _b, _c, _d, _e5;
    return (_e5 = (_d = (_a = window.frappe) == null ? void 0 : _a.csrf_token) != null ? _d : (_c = (_b = window.dockBoot) == null ? void 0 : _b.session) == null ? void 0 : _c.csrf_token) != null ? _e5 : "";
  }
  async function xt(e, t = {}) {
    var _a, _b, _c;
    const n = await fetch("/api/method/" + e, { method: "POST", headers: { "Content-Type": "application/json", "X-Frappe-CSRF-Token": Ol() }, body: JSON.stringify(t) }), s = await n.json();
    if (!n.ok) {
      const r3 = (s == null ? void 0 : s._server_messages) ? (_b = (_a = JSON.parse(s._server_messages)) == null ? void 0 : _a[0]) == null ? void 0 : _b.message : (_c = s == null ? void 0 : s.exc_type) != null ? _c : "Server error";
      throw new Error(r3 != null ? r3 : "Request failed");
    }
    return s.message;
  }
  function Rl(e) {
    Xs || (Xs = true, (e == null ? void 0 : e.length) && (ye3.value = e));
  }
  function Ml(e, t, n) {
    var _a, _b;
    return (_b = (_a = ye3.value.find((s) => s.app === e && s.doctype === t && s.docname === n)) == null ? void 0 : _a.name) != null ? _b : null;
  }
  async function Fl(e) {
    if (uo.value)
      return;
    const t = `__tmp_${Date.now()}`, n = __spreadValues({ name: t, sort_order: ye3.value.length }, e);
    ye3.value.push(n);
    try {
      const s = await xt("dock.api.bookmarks.add", { app: e.app, doctype: e.doctype, docname: e.docname, label: e.label, icon: e.icon }), r3 = ye3.value.findIndex((o2) => o2.name === t);
      r3 >= 0 && (ye3.value[r3].name = s);
    } catch (e2) {
      ye3.value = ye3.value.filter((s) => s.name !== t);
    }
  }
  function Dl(e) {
    ye3.value = ye3.value.filter((t) => t.name !== e), xt("dock.api.bookmarks.remove", { bookmark_name: e }).catch(() => {
    });
  }
  function Ll(e) {
    const t = new Map(ye3.value.map((n) => [n.name, n]));
    ye3.value = e.map((n, s) => __spreadProps(__spreadValues({}, t.get(n)), { sort_order: s })), xt("dock.api.bookmarks.reorder", { ordered_names: e }).catch(() => {
    });
  }
  function ho() {
    return { bookmarks: ye3, atLimit: uo, init: Rl, isBookmarked: Ml, addBookmark: Fl, removeBookmark: Dl, reorderBookmarks: Ll };
  }
  function jl(e) {
    Qs || (Qs = true, (e == null ? void 0 : e.length) && (we3.value = e));
  }
  function $l(e) {
    const t = we3.value.findIndex((r3) => r3.app === e.app && r3.doctype === e.doctype && r3.docname === e.docname), n = new Date().toISOString(), s = __spreadProps(__spreadValues({ name: t >= 0 ? we3.value[t].name : "" }, e), { visited_at: n });
    t >= 0 && we3.value.splice(t, 1), we3.value.unshift(s), we3.value.length > 8 && (we3.value = we3.value.slice(0, 8)), xt("dock.api.recent.track", { app: e.app, doctype: e.doctype, docname: e.docname, label: e.label, icon: e.icon }).catch(() => {
    });
  }
  function Bl(e) {
    we3.value = we3.value.filter((t) => t.name !== e), xt("dock.api.recent.remove", { recent_item_name: e }).catch(() => {
    });
  }
  function Vl() {
    we3.value = [], xt("dock.api.recent.clear").catch(() => {
    });
  }
  function po() {
    return { items: we3, init: jl, trackItem: $l, removeItem: Bl, clearAll: Vl };
  }
  function go() {
    const e = Te(() => {
      var _a, _b, _c, _d;
      return (_d = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) != null ? _c : window.dockBoot) != null ? _d : null;
    }), t = Te(() => {
      var _a;
      return !!((_a = e.value) == null ? void 0 : _a.installed);
    }), n = Te(() => {
      var _a, _b;
      return (_b = (_a = e.value) == null ? void 0 : _a.settings) != null ? _b : null;
    }), s = Te(() => {
      var _a, _b;
      return (_b = (_a = e.value) == null ? void 0 : _a.registered_apps) != null ? _b : [];
    }), r3 = Te(() => {
      var _a, _b;
      return (_b = (_a = e.value) == null ? void 0 : _a.notification_types) != null ? _b : [];
    });
    return { dock: e, isInstalled: t, settings: n, registeredApps: s, notificationTypes: r3 };
  }
  var J5, pt, Be3, er, ts, tr, fe3, ns, yo, K5, L3, gt, nr, Es, j2, re5, Ve2, q5, sr, rr, Kt, bo, or, ss, Pt, yn, vo, He, xo, Wt, rs, An, $e3, Cn, ir, wo, Gl, As, bn, ko, To, So, Ao, Yl, lr, Po, cr, Pn, _e4, Oo, Z3, On, fr, ar, Ot, It, Ee3, gr, jt, Mo, fs, Vn, at, Hn, $t, Fo, Do, Lo, mr, yr, br, $o, Bo, Vo, Ho, Nn, en, Ko, Wo, qo, vr, xr, wr, Jo, Ae3, bt, Xo, Qo, ei, nn, fn, ct, de3, Fe3, _t, tt, ht, Sr, an, Bt, se5, Pr, ai, ui, Rr, Mr, Rt, Is, Rs, Ms, Kn, Fr, ec, De3, Et, xe3, gi, Dr, _i, tc, dn, js, mt, Yt, Qe, xi, Ft, wi, ki, Vr, hn, Ti, Si, Ei, Ci, Jn, Dt, Dn, Oi, Gn, Mi, Li, yt, $i, Vi, Hi, Ni, Gr, Yr, zr, Ji, ms, ys, Gi, Qr, eo, to, Yi, zi, oe5, ro, me, Tn, le5, jn, Lt, ve3, Ht, io, cn, Q, il, ll, ne5, lo, mn, Xn, zt, Js, vt, ul, Te, gl, _l, ml, Ys, We, yl, bl, vl, wl, kl, zs, Tl, Zs, Sl, El, At, Al, ao, Cl, Pl, Il, ye3, Xs, uo, we3, Qs, Hl, Nl, Ul, Kl, Wl, ql, ic;
  var init_dock_navbar_esm = __esm({
    "../dock/dock/public/js/dock-navbar.esm.js"() {
      J5 = {};
      pt = [];
      Be3 = () => {
      };
      er = () => false;
      ts = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97);
      tr = (e) => e.startsWith("onUpdate:");
      fe3 = Object.assign;
      ns = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      };
      yo = Object.prototype.hasOwnProperty;
      K5 = (e, t) => yo.call(e, t);
      L3 = Array.isArray;
      gt = (e) => Kt(e) === "[object Map]";
      nr = (e) => Kt(e) === "[object Set]";
      Es = (e) => Kt(e) === "[object Date]";
      j2 = (e) => typeof e == "function";
      re5 = (e) => typeof e == "string";
      Ve2 = (e) => typeof e == "symbol";
      q5 = (e) => e !== null && typeof e == "object";
      sr = (e) => (q5(e) || j2(e)) && j2(e.then) && j2(e.catch);
      rr = Object.prototype.toString;
      Kt = (e) => rr.call(e);
      bo = (e) => Kt(e).slice(8, -1);
      or = (e) => Kt(e) === "[object Object]";
      ss = (e) => re5(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e;
      Pt = es(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
      yn = (e) => {
        const t = /* @__PURE__ */ Object.create(null);
        return (n) => t[n] || (t[n] = e(n));
      };
      vo = /-\w/g;
      He = yn((e) => e.replace(vo, (t) => t.slice(1).toUpperCase()));
      xo = /\B([A-Z])/g;
      Wt = yn((e) => e.replace(xo, "-$1").toLowerCase());
      rs = yn((e) => e.charAt(0).toUpperCase() + e.slice(1));
      An = yn((e) => e ? `on${rs(e)}` : "");
      $e3 = (e, t) => !Object.is(e, t);
      Cn = (e, ...t) => {
        for (let n = 0; n < e.length; n++)
          e[n](...t);
      };
      ir = (e, t, n, s = false) => {
        Object.defineProperty(e, t, { configurable: true, enumerable: false, writable: s, value: n });
      };
      wo = (e) => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t;
      };
      Gl = (e) => {
        const t = re5(e) ? Number(e) : NaN;
        return isNaN(t) ? e : t;
      };
      bn = () => As || (As = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
      ko = /;(?![^(]*\))/g;
      To = /:([^]+)/;
      So = /\/\*[^]*?\*\//g;
      Ao = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
      Yl = es(Ao);
      lr = (e) => !!(e && e.__v_isRef === true);
      Po = (e) => re5(e) ? e : e == null ? "" : L3(e) || q5(e) && (e.toString === rr || !j2(e.toString)) ? lr(e) ? Po(e.value) : JSON.stringify(e, cr, 2) : String(e);
      cr = (e, t) => lr(t) ? cr(e, t.value) : gt(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, r3], o2) => (n[Pn(s, o2) + " =>"] = r3, n), {}) } : nr(t) ? { [`Set(${t.size})`]: [...t.values()].map((n) => Pn(n)) } : Ve2(t) ? Pn(t) : q5(t) && !L3(t) && !or(t) ? String(t) : t;
      Pn = (e, t = "") => {
        var n;
        return Ve2(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
      };
      Oo = class {
        constructor(t = false) {
          this.detached = t, this._active = true, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = false, this.__v_skip = true, this.parent = _e4, !t && _e4 && (this.index = (_e4.scopes || (_e4.scopes = [])).push(this) - 1);
        }
        get active() {
          return this._active;
        }
        pause() {
          if (this._active) {
            this._isPaused = true;
            let t, n;
            if (this.scopes)
              for (t = 0, n = this.scopes.length; t < n; t++)
                this.scopes[t].pause();
            for (t = 0, n = this.effects.length; t < n; t++)
              this.effects[t].pause();
          }
        }
        resume() {
          if (this._active && this._isPaused) {
            this._isPaused = false;
            let t, n;
            if (this.scopes)
              for (t = 0, n = this.scopes.length; t < n; t++)
                this.scopes[t].resume();
            for (t = 0, n = this.effects.length; t < n; t++)
              this.effects[t].resume();
          }
        }
        run(t) {
          if (this._active) {
            const n = _e4;
            try {
              return _e4 = this, t();
            } finally {
              _e4 = n;
            }
          }
        }
        on() {
          ++this._on === 1 && (this.prevScope = _e4, _e4 = this);
        }
        off() {
          this._on > 0 && --this._on === 0 && (_e4 = this.prevScope, this.prevScope = void 0);
        }
        stop(t) {
          if (this._active) {
            this._active = false;
            let n, s;
            for (n = 0, s = this.effects.length; n < s; n++)
              this.effects[n].stop();
            for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
              this.cleanups[n]();
            if (this.cleanups.length = 0, this.scopes) {
              for (n = 0, s = this.scopes.length; n < s; n++)
                this.scopes[n].stop(true);
              this.scopes.length = 0;
            }
            if (!this.detached && this.parent && !t) {
              const r3 = this.parent.scopes.pop();
              r3 && r3 !== this && (this.parent.scopes[this.index] = r3, r3.index = this.index);
            }
            this.parent = void 0;
          }
        }
      };
      On = /* @__PURE__ */ new WeakSet();
      fr = class {
        constructor(t) {
          this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, _e4 && _e4.active && _e4.effects.push(this);
        }
        pause() {
          this.flags |= 64;
        }
        resume() {
          this.flags & 64 && (this.flags &= -65, On.has(this) && (On.delete(this), this.trigger()));
        }
        notify() {
          this.flags & 2 && !(this.flags & 32) || this.flags & 8 || ur(this);
        }
        run() {
          if (!(this.flags & 1))
            return this.fn();
          this.flags |= 2, Cs(this), dr(this);
          const t = Z3, n = Ee3;
          Z3 = this, Ee3 = true;
          try {
            return this.fn();
          } finally {
            hr(this), Z3 = t, Ee3 = n, this.flags &= -3;
          }
        }
        stop() {
          if (this.flags & 1) {
            for (let t = this.deps; t; t = t.nextDep)
              cs(t);
            this.deps = this.depsTail = void 0, Cs(this), this.onStop && this.onStop(), this.flags &= -2;
          }
        }
        trigger() {
          this.flags & 64 ? On.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
        }
        runIfDirty() {
          Bn(this) && this.run();
        }
        get dirty() {
          return Bn(this);
        }
      };
      ar = 0;
      Ee3 = true;
      gr = [];
      jt = 0;
      Mo = class {
        constructor(t, n) {
          this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
        }
      };
      fs = class {
        constructor(t) {
          this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = true;
        }
        track(t) {
          if (!Z3 || !Ee3 || Z3 === this.computed)
            return;
          let n = this.activeLink;
          if (n === void 0 || n.sub !== Z3)
            n = this.activeLink = new Mo(Z3, this), Z3.deps ? (n.prevDep = Z3.depsTail, Z3.depsTail.nextDep = n, Z3.depsTail = n) : Z3.deps = Z3.depsTail = n, _r(n);
          else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
            const s = n.nextDep;
            s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = Z3.depsTail, n.nextDep = void 0, Z3.depsTail.nextDep = n, Z3.depsTail = n, Z3.deps === n && (Z3.deps = s);
          }
          return n;
        }
        trigger(t) {
          this.version++, jt++, this.notify(t);
        }
        notify(t) {
          is();
          try {
            for (let n = this.subs; n; n = n.prevSub)
              n.sub.notify() && n.sub.dep.notify();
          } finally {
            ls();
          }
        }
      };
      Vn = /* @__PURE__ */ new WeakMap();
      at = Symbol("");
      Hn = Symbol("");
      $t = Symbol("");
      Fo = { __proto__: null, [Symbol.iterator]() {
        return In(this, Symbol.iterator, (e) => Le3(this, e));
      }, concat(...e) {
        return dt(this).concat(...e.map((t) => L3(t) ? dt(t) : t));
      }, entries() {
        return In(this, "entries", (e) => (e[1] = Le3(this, e[1]), e));
      }, every(e, t) {
        return Ue2(this, "every", e, t, void 0, arguments);
      }, filter(e, t) {
        return Ue2(this, "filter", e, t, (n) => n.map((s) => Le3(this, s)), arguments);
      }, find(e, t) {
        return Ue2(this, "find", e, t, (n) => Le3(this, n), arguments);
      }, findIndex(e, t) {
        return Ue2(this, "findIndex", e, t, void 0, arguments);
      }, findLast(e, t) {
        return Ue2(this, "findLast", e, t, (n) => Le3(this, n), arguments);
      }, findLastIndex(e, t) {
        return Ue2(this, "findLastIndex", e, t, void 0, arguments);
      }, forEach(e, t) {
        return Ue2(this, "forEach", e, t, void 0, arguments);
      }, includes(...e) {
        return Rn(this, "includes", e);
      }, indexOf(...e) {
        return Rn(this, "indexOf", e);
      }, join(e) {
        return dt(this).join(e);
      }, lastIndexOf(...e) {
        return Rn(this, "lastIndexOf", e);
      }, map(e, t) {
        return Ue2(this, "map", e, t, void 0, arguments);
      }, pop() {
        return St(this, "pop");
      }, push(...e) {
        return St(this, "push", e);
      }, reduce(e, ...t) {
        return Ps(this, "reduce", e, t);
      }, reduceRight(e, ...t) {
        return Ps(this, "reduceRight", e, t);
      }, shift() {
        return St(this, "shift");
      }, some(e, t) {
        return Ue2(this, "some", e, t, void 0, arguments);
      }, splice(...e) {
        return St(this, "splice", e);
      }, toReversed() {
        return dt(this).toReversed();
      }, toSorted(e) {
        return dt(this).toSorted(e);
      }, toSpliced(...e) {
        return dt(this).toSpliced(...e);
      }, unshift(...e) {
        return St(this, "unshift", e);
      }, values() {
        return In(this, "values", (e) => Le3(this, e));
      } };
      Do = Array.prototype;
      Lo = es("__proto__,__v_isRef,__isVue");
      mr = new Set(Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ve2));
      yr = class {
        constructor(t = false, n = false) {
          this._isReadonly = t, this._isShallow = n;
        }
        get(t, n, s) {
          if (n === "__v_skip")
            return t.__v_skip;
          const r3 = this._isReadonly, o2 = this._isShallow;
          if (n === "__v_isReactive")
            return !r3;
          if (n === "__v_isReadonly")
            return r3;
          if (n === "__v_isShallow")
            return o2;
          if (n === "__v_raw")
            return s === (r3 ? o2 ? Jo : wr : o2 ? xr : vr).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
          const i3 = L3(t);
          if (!r3) {
            let c2;
            if (i3 && (c2 = Fo[n]))
              return c2;
            if (n === "hasOwnProperty")
              return jo;
          }
          const l3 = Reflect.get(t, n, ce4(t) ? t : s);
          if ((Ve2(n) ? mr.has(n) : Lo(n)) || (r3 || ie5(t, "get", n), o2))
            return l3;
          if (ce4(l3)) {
            const c2 = i3 && ss(n) ? l3 : l3.value;
            return r3 && q5(c2) ? Un(c2) : c2;
          }
          return q5(l3) ? r3 ? Un(l3) : us(l3) : l3;
        }
      };
      br = class extends yr {
        constructor(t = false) {
          super(false, t);
        }
        set(t, n, s, r3) {
          let o2 = t[n];
          const i3 = L3(t) && ss(n);
          if (!this._isShallow) {
            const u = Xe(o2);
            if (!Se3(s) && !Xe(s) && (o2 = U4(o2), s = U4(s)), !i3 && ce4(o2) && !ce4(s))
              return u || (o2.value = s), true;
          }
          const l3 = i3 ? Number(n) < t.length : K5(t, n), c2 = Reflect.set(t, n, s, ce4(t) ? t : r3);
          return t === U4(r3) && (l3 ? $e3(s, o2) && Je(t, "set", n, s) : Je(t, "add", n, s)), c2;
        }
        deleteProperty(t, n) {
          const s = K5(t, n);
          t[n];
          const r3 = Reflect.deleteProperty(t, n);
          return r3 && s && Je(t, "delete", n, void 0), r3;
        }
        has(t, n) {
          const s = Reflect.has(t, n);
          return (!Ve2(n) || !mr.has(n)) && ie5(t, "has", n), s;
        }
        ownKeys(t) {
          return ie5(t, "iterate", L3(t) ? "length" : at), Reflect.ownKeys(t);
        }
      };
      $o = class extends yr {
        constructor(t = false) {
          super(true, t);
        }
        set(t, n) {
          return true;
        }
        deleteProperty(t, n) {
          return true;
        }
      };
      Bo = new br();
      Vo = new $o();
      Ho = new br(true);
      Nn = (e) => e;
      en = (e) => Reflect.getPrototypeOf(e);
      Ko = { get: as(false, false) };
      Wo = { get: as(false, true) };
      qo = { get: as(true, false) };
      vr = /* @__PURE__ */ new WeakMap();
      xr = /* @__PURE__ */ new WeakMap();
      wr = /* @__PURE__ */ new WeakMap();
      Jo = /* @__PURE__ */ new WeakMap();
      Ae3 = (e) => q5(e) ? us(e) : e;
      bt = (e) => q5(e) ? Un(e) : e;
      Xo = class {
        constructor(t, n) {
          this.dep = new fs(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = n ? t : U4(t), this._value = n ? t : Ae3(t), this.__v_isShallow = n;
        }
        get value() {
          return this.dep.track(), this._value;
        }
        set value(t) {
          const n = this._rawValue, s = this.__v_isShallow || Se3(t) || Xe(t);
          t = s ? t : U4(t), $e3(t, n) && (this._rawValue = t, this._value = s ? t : Ae3(t), this.dep.trigger());
        }
      };
      Qo = { get: (e, t, n) => t === "__v_raw" ? e : te(Reflect.get(e, t, n)), set: (e, t, n, s) => {
        const r3 = e[t];
        return ce4(r3) && !ce4(n) ? (r3.value = n, true) : Reflect.set(e, t, n, s);
      } };
      ei = class {
        constructor(t, n, s) {
          this.fn = t, this.setter = n, this._value = void 0, this.dep = new fs(this), this.__v_isRef = true, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = jt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
        }
        notify() {
          if (this.flags |= 16, !(this.flags & 8) && Z3 !== this)
            return ur(this, true), true;
        }
        get value() {
          const t = this.dep.track();
          return pr(this), t && (t.version = this.dep.version), this._value;
        }
        set value(t) {
          this.setter && this.setter(t);
        }
      };
      nn = {};
      fn = /* @__PURE__ */ new WeakMap();
      de3 = [];
      Fe3 = -1;
      _t = [];
      tt = null;
      ht = 0;
      Sr = Promise.resolve();
      an = null;
      Bt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
      se5 = null;
      Pr = null;
      ai = Symbol.for("v-scx");
      ui = () => on(ai);
      Rr = Symbol("_vte");
      Mr = (e) => e.__isTeleport;
      Rt = (e) => e && (e.disabled || e.disabled === "");
      Is = (e) => e && (e.defer || e.defer === "");
      Rs = (e) => typeof SVGElement < "u" && e instanceof SVGElement;
      Ms = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement;
      Kn = (e, t) => {
        const n = e && e.to;
        return re5(n) ? t ? t(n) : null : n;
      };
      Fr = { name: "Teleport", __isTeleport: true, process(e, t, n, s, r3, o2, i3, l3, c2, u) {
        const { mc: a2, pc: h2, pbc: _2, o: { insert: x4, querySelector: S3, createText: b, createComment: P3 } } = u, I2 = Rt(t.props);
        let { shapeFlag: A4, children: F4, dynamicChildren: C3 } = t;
        if (e == null) {
          const B2 = t.el = b(""), $2 = t.anchor = b("");
          x4(B2, n, s), x4($2, n, s);
          const N2 = (M2, V2) => {
            A4 & 16 && a2(F4, M2, V2, r3, o2, i3, l3, c2);
          }, G5 = () => {
            const M2 = t.target = Kn(t.props, S3), V2 = Wn(M2, t, b, x4);
            M2 && (i3 !== "svg" && Rs(M2) ? i3 = "svg" : i3 !== "mathml" && Ms(M2) && (i3 = "mathml"), r3 && r3.isCE && (r3.ce._teleportTargets || (r3.ce._teleportTargets = /* @__PURE__ */ new Set())).add(M2), I2 || (N2(M2, V2), ln(t, false)));
          };
          I2 && (N2(n, $2), ln(t, true)), Is(t.props) ? (t.el.__isMounted = false, oe5(() => {
            G5(), delete t.el.__isMounted;
          }, o2)) : G5();
        } else {
          if (Is(t.props) && e.el.__isMounted === false) {
            oe5(() => {
              Fr.process(e, t, n, s, r3, o2, i3, l3, c2, u);
            }, o2);
            return;
          }
          t.el = e.el, t.targetStart = e.targetStart;
          const B2 = t.anchor = e.anchor, $2 = t.target = e.target, N2 = t.targetAnchor = e.targetAnchor, G5 = Rt(e.props), M2 = G5 ? n : $2, V2 = G5 ? B2 : N2;
          if (i3 === "svg" || Rs($2) ? i3 = "svg" : (i3 === "mathml" || Ms($2)) && (i3 = "mathml"), C3 ? (_2(e.dynamicChildren, C3, M2, r3, o2, i3, l3), bs(e, t, true)) : c2 || h2(e, t, M2, V2, r3, o2, i3, l3, false), I2)
            G5 ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : sn(t, n, B2, u, 1);
          else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
            const X4 = t.target = Kn(t.props, S3);
            X4 && sn(t, X4, null, u, 0);
          } else
            G5 && sn(t, $2, N2, u, 1);
          ln(t, I2);
        }
      }, remove(e, t, n, { um: s, o: { remove: r3 } }, o2) {
        const { shapeFlag: i3, children: l3, anchor: c2, targetStart: u, targetAnchor: a2, target: h2, props: _2 } = e;
        if (h2 && (r3(u), r3(a2)), o2 && r3(c2), i3 & 16) {
          const x4 = o2 || !Rt(_2);
          for (let S3 = 0; S3 < l3.length; S3++) {
            const b = l3[S3];
            s(b, t, n, x4, !!b.dynamicChildren);
          }
        }
      }, move: sn, hydrate: hi };
      ec = Fr;
      De3 = Symbol("_leaveCb");
      Et = Symbol("_enterCb");
      xe3 = [Function, Array];
      gi = { mode: String, appear: Boolean, persisted: Boolean, onBeforeEnter: xe3, onEnter: xe3, onAfterEnter: xe3, onEnterCancelled: xe3, onBeforeLeave: xe3, onLeave: xe3, onAfterLeave: xe3, onLeaveCancelled: xe3, onBeforeAppear: xe3, onAppear: xe3, onAfterAppear: xe3, onAppearCancelled: xe3 };
      Dr = (e) => {
        const t = e.subTree;
        return t.component ? Dr(t.component) : t;
      };
      _i = { name: "BaseTransition", props: gi, setup(e, { slots: t }) {
        const n = lo(), s = pi();
        return () => {
          const r3 = t.default && $r(t.default(), true);
          if (!r3 || !r3.length)
            return;
          const o2 = Lr(r3), i3 = U4(e), { mode: l3 } = i3;
          if (s.isLeaving)
            return Fn(o2);
          const c2 = Fs(o2);
          if (!c2)
            return Fn(o2);
          let u = qn(c2, i3, s, n, (h2) => u = h2);
          c2.type !== le5 && Vt(c2, u);
          let a2 = n.subTree && Fs(n.subTree);
          if (a2 && a2.type !== le5 && !ft(a2, c2) && Dr(n).type !== le5) {
            let h2 = qn(a2, i3, s, n);
            if (Vt(a2, h2), l3 === "out-in" && c2.type !== le5)
              return s.isLeaving = true, h2.afterLeave = () => {
                s.isLeaving = false, n.job.flags & 8 || n.update(), delete h2.afterLeave, a2 = void 0;
              }, Fn(o2);
            l3 === "in-out" && c2.type !== le5 ? h2.delayLeave = (_2, x4, S3) => {
              const b = jr(s, a2);
              b[String(a2.key)] = a2, _2[De3] = () => {
                x4(), _2[De3] = void 0, delete u.delayedLeave, a2 = void 0;
              }, u.delayedLeave = () => {
                S3(), delete u.delayedLeave, a2 = void 0;
              };
            } : a2 = void 0;
          } else
            a2 && (a2 = void 0);
          return o2;
        };
      } };
      tc = _i;
      dn = /* @__PURE__ */ new WeakMap();
      js = (e) => e.nodeType === 8;
      bn().requestIdleCallback;
      bn().cancelIdleCallback;
      mt = (e) => !!e.type.__asyncLoader;
      Yt = (e) => e.type.__isKeepAlive;
      Qe = (e) => (t, n = ne5) => {
        (!vt || e === "sp") && wn(e, (...s) => t(...s), n);
      };
      xi = Qe("bm");
      Ft = Qe("m");
      wi = Qe("bu");
      ki = Qe("u");
      Vr = Qe("bum");
      hn = Qe("um");
      Ti = Qe("sp");
      Si = Qe("rtg");
      Ei = Qe("rtc");
      Ci = Symbol.for("v-ndc");
      Jn = (e) => e ? co(e) ? Sn(e) : Jn(e.parent) : null;
      Dt = fe3(/* @__PURE__ */ Object.create(null), { $: (e) => e, $el: (e) => e.vnode.el, $data: (e) => e.data, $props: (e) => e.props, $attrs: (e) => e.attrs, $slots: (e) => e.slots, $refs: (e) => e.refs, $parent: (e) => Jn(e.parent), $root: (e) => Jn(e.root), $host: (e) => e.ce, $emit: (e) => e.emit, $options: (e) => Kr(e), $forceUpdate: (e) => e.f || (e.f = () => {
        ps(e.update);
      }), $nextTick: (e) => e.n || (e.n = oi.bind(e.proxy)), $watch: (e) => di.bind(e) });
      Dn = (e, t) => e !== J5 && !e.__isScriptSetup && K5(e, t);
      Oi = { get({ _: e }, t) {
        if (t === "__v_skip")
          return true;
        const { ctx: n, setupState: s, data: r3, props: o2, accessCache: i3, type: l3, appContext: c2 } = e;
        if (t[0] !== "$") {
          const _2 = i3[t];
          if (_2 !== void 0)
            switch (_2) {
              case 1:
                return s[t];
              case 2:
                return r3[t];
              case 4:
                return n[t];
              case 3:
                return o2[t];
            }
          else {
            if (Dn(s, t))
              return i3[t] = 1, s[t];
            if (r3 !== J5 && K5(r3, t))
              return i3[t] = 2, r3[t];
            if (K5(o2, t))
              return i3[t] = 3, o2[t];
            if (n !== J5 && K5(n, t))
              return i3[t] = 4, n[t];
            Gn && (i3[t] = 0);
          }
        }
        const u = Dt[t];
        let a2, h2;
        if (u)
          return t === "$attrs" && ie5(e.attrs, "get", ""), u(e);
        if ((a2 = l3.__cssModules) && (a2 = a2[t]))
          return a2;
        if (n !== J5 && K5(n, t))
          return i3[t] = 4, n[t];
        if (h2 = c2.config.globalProperties, K5(h2, t))
          return h2[t];
      }, set({ _: e }, t, n) {
        const { data: s, setupState: r3, ctx: o2 } = e;
        return Dn(r3, t) ? (r3[t] = n, true) : s !== J5 && K5(s, t) ? (s[t] = n, true) : K5(e.props, t) || t[0] === "$" && t.slice(1) in e ? false : (o2[t] = n, true);
      }, has({ _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r3, props: o2, type: i3 } }, l3) {
        let c2;
        return !!(n[l3] || e !== J5 && l3[0] !== "$" && K5(e, l3) || Dn(t, l3) || K5(o2, l3) || K5(s, l3) || K5(Dt, l3) || K5(r3.config.globalProperties, l3) || (c2 = i3.__cssModules) && c2[l3]);
      }, defineProperty(e, t, n) {
        return n.get != null ? e._.accessCache[t] = 0 : K5(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
      } };
      Gn = true;
      Mi = { data: Hs, props: Ns, emits: Ns, methods: Ct, computed: Ct, beforeCreate: ue3, created: ue3, beforeMount: ue3, mounted: ue3, beforeUpdate: ue3, updated: ue3, beforeDestroy: ue3, beforeUnmount: ue3, destroyed: ue3, unmounted: ue3, activated: ue3, deactivated: ue3, errorCaptured: ue3, serverPrefetch: ue3, components: Ct, directives: Ct, watch: Di, provide: Hs, inject: Fi };
      Li = 0;
      yt = null;
      $i = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${He(t)}Modifiers`] || e[`${Wt(t)}Modifiers`];
      Vi = /* @__PURE__ */ new WeakMap();
      Hi = (e) => {
        let t;
        for (const n in e)
          (n === "class" || n === "style" || ts(n)) && ((t || (t = {}))[n] = e[n]);
        return t;
      };
      Ni = (e, t) => {
        const n = {};
        for (const s in e)
          (!tr(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
        return n;
      };
      Gr = {};
      Yr = () => Object.create(Gr);
      zr = (e) => Object.getPrototypeOf(e) === Gr;
      Ji = /* @__PURE__ */ new WeakMap();
      ms = (e) => e === "_" || e === "_ctx" || e === "$stable";
      ys = (e) => L3(e) ? e.map(je) : [je(e)];
      Gi = (e, t, n) => {
        if (t._n)
          return t;
        const s = ci((...r3) => ys(t(...r3)), n);
        return s._c = false, s;
      };
      Qr = (e, t, n) => {
        const s = e._ctx;
        for (const r3 in e) {
          if (ms(r3))
            continue;
          const o2 = e[r3];
          if (j2(o2))
            t[r3] = Gi(r3, o2, s);
          else if (o2 != null) {
            const i3 = ys(o2);
            t[r3] = () => i3;
          }
        }
      };
      eo = (e, t) => {
        const n = ys(t);
        e.slots.default = () => n;
      };
      to = (e, t, n) => {
        for (const s in t)
          (n || !ms(s)) && (e[s] = t[s]);
      };
      Yi = (e, t, n) => {
        const s = e.slots = Yr();
        if (e.vnode.shapeFlag & 32) {
          const r3 = t._;
          r3 ? (to(s, t, n), n && ir(s, "_", r3, true)) : Qr(t, s);
        } else
          t && eo(e, t);
      };
      zi = (e, t, n) => {
        const { vnode: s, slots: r3 } = e;
        let o2 = true, i3 = J5;
        if (s.shapeFlag & 32) {
          const l3 = t._;
          l3 ? n && l3 === 1 ? o2 = false : to(r3, t, n) : (o2 = !t.$stable, Qr(t, r3)), i3 = t;
        } else
          t && (eo(e, t), i3 = { default: 1 });
        if (o2)
          for (const l3 in r3)
            !ms(l3) && i3[l3] == null && delete r3[l3];
      };
      oe5 = el;
      ro = (e) => e.__isSuspense;
      me = Symbol.for("v-fgt");
      Tn = Symbol.for("v-txt");
      le5 = Symbol.for("v-cmt");
      jn = Symbol.for("v-stc");
      Lt = [];
      ve3 = null;
      Ht = 1;
      io = ({ key: e }) => e != null ? e : null;
      cn = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e != null ? re5(e) || ce4(e) || j2(e) ? { i: se5, r: e, k: t, f: !!n } : e : null);
      Q = nl;
      il = Wr();
      ll = 0;
      ne5 = null;
      lo = () => ne5 || se5;
      {
        const e = bn(), t = (n, s) => {
          let r3;
          return (r3 = e[n]) || (r3 = e[n] = []), r3.push(s), (o2) => {
            r3.length > 1 ? r3.forEach((i3) => i3(o2)) : r3[0](o2);
          };
        };
        mn = t("__VUE_INSTANCE_SETTERS__", (n) => ne5 = n), Xn = t("__VUE_SSR_SETTERS__", (n) => vt = n);
      }
      zt = (e) => {
        const t = ne5;
        return mn(e), e.scope.on(), () => {
          e.scope.off(), mn(t);
        };
      };
      Js = () => {
        ne5 && ne5.scope.off(), mn(null);
      };
      vt = false;
      ul = { get(e, t) {
        return ie5(e, "get", ""), e[t];
      } };
      Te = (e, t) => ti(e, t, vt);
      gl = "3.5.30";
      _l = function() {
        const t = typeof document < "u" && document.createElement("link").relList;
        return t && t.supports && t.supports("modulepreload") ? "modulepreload" : "preload";
      }();
      ml = function(e) {
        return "/assets/dock/js/" + e;
      };
      Ys = {};
      We = function(t, n, s) {
        let r3 = Promise.resolve();
        if (n && n.length > 0) {
          let c2 = function(u) {
            return Promise.all(u.map((a2) => Promise.resolve(a2).then((h2) => ({ status: "fulfilled", value: h2 }), (h2) => ({ status: "rejected", reason: h2 }))));
          };
          document.getElementsByTagName("link");
          const i3 = document.querySelector("meta[property=csp-nonce]"), l3 = (i3 == null ? void 0 : i3.nonce) || (i3 == null ? void 0 : i3.getAttribute("nonce"));
          r3 = c2(n.map((u) => {
            if (u = ml(u), u in Ys)
              return;
            Ys[u] = true;
            const a2 = u.endsWith(".css"), h2 = a2 ? '[rel="stylesheet"]' : "";
            if (document.querySelector(`link[href="${u}"]${h2}`))
              return;
            const _2 = document.createElement("link");
            if (_2.rel = a2 ? "stylesheet" : _l, a2 || (_2.as = "script"), _2.crossOrigin = "", _2.href = u, l3 && _2.setAttribute("nonce", l3), document.head.appendChild(_2), a2)
              return new Promise((x4, S3) => {
                _2.addEventListener("load", x4), _2.addEventListener("error", () => S3(new Error(`Unable to preload CSS for ${u}`)));
              });
          }));
        }
        function o2(i3) {
          const l3 = new Event("vite:preloadError", { cancelable: true });
          if (l3.payload = i3, window.dispatchEvent(l3), !l3.defaultPrevented)
            throw i3;
        }
        return r3.then((i3) => {
          for (const l3 of i3 || [])
            l3.status === "rejected" && o2(l3.reason);
          return t().catch(o2);
        });
      };
      yl = { name: "DockFallbackBar" };
      bl = (e, t) => {
        const n = e.__vccOpts || e;
        for (const [s, r3] of t)
          n[s] = r3;
        return n;
      };
      vl = { role: "banner", class: "dock-fallback-bar h-14 sticky top-0 z-50 flex items-center px-4 bg-[var(--dock-bg)] border-b border-[var(--dock-border)] text-[var(--dock-text)] text-sm" };
      wl = bl(yl, [["render", xl]]);
      kl = (e) => {
        for (const t in e)
          if (t.startsWith("aria-") || t === "role" || t === "title")
            return true;
        return false;
      };
      zs = (e) => e === "";
      Tl = (...e) => e.filter((t, n, s) => !!t && t.trim() !== "" && s.indexOf(t) === n).join(" ").trim();
      Zs = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
      Sl = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (t, n, s) => s ? s.toUpperCase() : n.toLowerCase());
      El = (e) => {
        const t = Sl(e);
        return t.charAt(0).toUpperCase() + t.slice(1);
      };
      At = { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 2, "stroke-linecap": "round", "stroke-linejoin": "round" };
      Al = (_a, { slots: u }) => {
        var _b = _a, { name: e, iconNode: t, absoluteStrokeWidth: n, "absolute-stroke-width": s, strokeWidth: r3, "stroke-width": o2, size: i3 = At.width, color: l3 = At.stroke } = _b, c2 = __objRest(_b, ["name", "iconNode", "absoluteStrokeWidth", "absolute-stroke-width", "strokeWidth", "stroke-width", "size", "color"]);
        return Qn("svg", __spreadValues(__spreadProps(__spreadValues(__spreadValues({}, At), c2), { width: i3, height: i3, stroke: l3, "stroke-width": zs(n) || zs(s) || n === true || s === true ? Number(r3 || o2 || At["stroke-width"]) * 24 / Number(i3) : r3 || o2 || At["stroke-width"], class: Tl("lucide", c2.class, ...e ? [`lucide-${Zs(El(e))}-icon`, `lucide-${Zs(e)}`] : ["lucide-icon"]) }), !u.default && !kl(c2) && { "aria-hidden": "true" }), [...t.map((a2) => Qn(...a2)), ...u.default ? [u.default()] : []]);
      };
      ao = (e, t) => (n, { slots: s, attrs: r3 }) => Qn(Al, __spreadProps(__spreadValues(__spreadValues({}, r3), n), { iconNode: t, name: e }), s);
      Cl = ao("bookmark-check", [["path", { d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z", key: "oz39mx" }], ["path", { d: "m9 10 2 2 4-4", key: "1gnqz4" }]]);
      Pl = ao("bookmark", [["path", { d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z", key: "oz39mx" }]]);
      Il = 12;
      ye3 = Ye([]);
      Xs = false;
      uo = Te(() => ye3.value.length >= Il);
      we3 = Ye([]);
      Qs = false;
      Hl = ["aria-label", "disabled", "title"];
      Nl = { name: "DockPinButton" };
      Ul = gs(__spreadProps(__spreadValues({}, Nl), { props: { currentPath: {} }, setup(e) {
        const t = e, { atLimit: n, isBookmarked: s, addBookmark: r3, removeBookmark: o2 } = ho(), { items: i3 } = po(), { registeredApps: l3 } = go(), c2 = Te(() => {
          var _a;
          const b = {};
          for (const P3 of (_a = l3.value) != null ? _a : [])
            P3.color && (b[P3.app] = P3.color);
          return b;
        }), u = Te(() => {
          const b = t.currentPath.match(/^\/([^/]+)\/([^/]+)\/([^/]+)$/);
          if (!b)
            return null;
          const [, P3, I2, A4] = b;
          return P3 === "dock" ? null : { app: P3, doctype: I2, docname: decodeURIComponent(A4) };
        }), a2 = Te(() => u.value !== null), h2 = Te(() => u.value ? s(u.value.app, u.value.doctype, u.value.docname) : null), _2 = Te(() => h2.value !== null), x4 = Ye(false);
        async function S3() {
          var _a, _b, _c;
          if (u.value) {
            x4.value = true;
            try {
              if (_2.value && h2.value)
                o2(h2.value);
              else {
                const b = i3.value.find((P3) => P3.app === u.value.app && P3.doctype === u.value.doctype && P3.docname === u.value.docname);
                await r3({ app: u.value.app, doctype: u.value.doctype, docname: u.value.docname, label: (_a = b == null ? void 0 : b.label) != null ? _a : u.value.docname, icon: (_b = b == null ? void 0 : b.icon) != null ? _b : "", color: (_c = c2.value[u.value.app]) != null ? _c : "" });
              }
            } finally {
              x4.value = false;
            }
          }
        }
        return (b, P3) => a2.value ? (ke(), _n("button", { key: 0, class: qt(["flex items-center justify-center w-8 h-8 rounded-md transition-colors", [_2.value ? "text-[var(--dock-accent)]" : "text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10", te(n) && !_2.value && "opacity-40 cursor-not-allowed"]]), "aria-label": _2.value ? te($n)("Remove bookmark") : te($n)("Add bookmark"), disabled: x4.value || te(n) && !_2.value, title: te(n) && !_2.value ? te($n)("Bookmark limit reached (12)") : void 0, onClick: S3 }, [_2.value ? (ke(), nt(te(Cl), { key: 0, class: "w-4 h-4" })) : (ke(), nt(te(Pl), { key: 1, class: "w-4 h-4" }))], 10, Hl)) : Zn("", true);
      } }));
      Kl = { class: "flex-1 flex justify-center px-4" };
      Wl = { class: "flex items-center gap-1 flex-shrink-0" };
      ql = { name: "DockNavbar" };
      ic = gs(__spreadProps(__spreadValues({}, ql), { setup(e) {
        var _a, _b, _c, _d, _e5, _f, _g;
        const t = Ye(false), n = Ye(false), s = Ye(window.location.pathname);
        Hr(() => (t.value = true, false));
        function r3() {
          n.value = window.scrollY > 4;
        }
        Ft(() => window.addEventListener("scroll", r3, { passive: true })), hn(() => window.removeEventListener("scroll", r3));
        const { registeredApps: o2, dock: i3 } = go(), { init: l3, trackItem: c2 } = po(), { init: u } = ho();
        Ft(() => {
          var _a2, _b2;
          l3((_a2 = i3.value) == null ? void 0 : _a2.recent_items), u((_b2 = i3.value) == null ? void 0 : _b2.bookmarks);
          const $2 = window.location.pathname;
          s.value = $2;
          const N2 = o2.value.find((G5) => $2.startsWith(G5.route));
          (N2 == null ? void 0 : N2.color) && document.documentElement.style.setProperty("--dock-accent", N2.color);
        });
        function a2() {
          const $2 = window.location.pathname;
          s.value = $2;
          const N2 = $2.match(/^\/([^/]+)\/([^/]+)\/([^/]+)$/);
          if (N2) {
            const [, G5, M2, V2] = N2;
            if (G5 !== "dock") {
              const X4 = o2.value.find((he4) => he4.app === G5);
              c2({ app: G5, doctype: M2, docname: decodeURIComponent(V2), label: decodeURIComponent(V2), icon: (X4 == null ? void 0 : X4.color, "") });
            }
          }
        }
        function h2($2) {
          const N2 = $2.detail;
          N2 && c2(N2);
        }
        Ft(() => {
          const $2 = history.pushState.bind(history);
          history.__dockPushState = $2, history.pushState = function(...N2) {
            $2(...N2), a2();
          }, window.addEventListener("popstate", a2), window.addEventListener("dock:trackVisit", h2);
        }), hn(() => {
          history.__dockPushState && (history.pushState = history.__dockPushState, delete history.__dockPushState), window.removeEventListener("popstate", a2), window.removeEventListener("dock:trackVisit", h2);
        });
        const _2 = (_g = (_f = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.installed_apps) == null ? void 0 : _c.includes("jana")) != null ? _f : (_e5 = (_d = window.dockBoot) == null ? void 0 : _d.installed_apps) == null ? void 0 : _e5.includes("jana")) != null ? _g : false, x4 = Ke(() => We(() => Promise.resolve().then(() => (init_DockSidebarToggle_tSCXPFw6(), DockSidebarToggle_tSCXPFw6_exports)), [])), S3 = Ke(() => We(() => Promise.resolve().then(() => (init_DockAppLabel_CVmAu9t9(), DockAppLabel_CVmAu9t9_exports)), [])), b = Ke(() => We(() => Promise.resolve().then(() => (init_DockSearch_B2vSPXkp(), DockSearch_B2vSPXkp_exports)).then(($2) => $2.D), [])), P3 = Ke(() => We(() => Promise.resolve().then(() => (init_DockTimer_90Bo_qQ5(), DockTimer_90Bo_qQ5_exports)), [])), I2 = Ke(() => We(() => Promise.resolve().then(() => (init_DockTimerStaleWarning_DDNZLr8e(), DockTimerStaleWarning_DDNZLr8e_exports)), [])), A4 = Ke(() => We(() => Promise.resolve().then(() => (init_DockBell_kQiZXls(), DockBell_kQiZXls_exports)), [])), F4 = Ke(() => We(() => Promise.resolve().then(() => (init_DockJana_skD_EBbF(), DockJana_skD_EBbF_exports)), [])), C3 = Ke(() => We(() => Promise.resolve().then(() => (init_DockAppSwitcher_DOUOnjb(), DockAppSwitcher_DOUOnjb_exports)), [])), B2 = Ke(() => We(() => Promise.resolve().then(() => (init_DockAvatar_CfFMJ6HM(), DockAvatar_CfFMJ6HM_exports)), []));
        return ($2, N2) => (ke(), _n(me, null, [t.value ? (ke(), nt(wl, { key: 0 })) : (ke(), _n("header", { key: 1, role: "banner", class: qt(["dock-navbar h-14 sticky top-0 z-50 flex items-center gap-2 px-4 select-none bg-[var(--dock-bg)] text-[var(--dock-text)] transition-shadow duration-150", n.value ? "shadow-sm" : "border-b border-[var(--dock-border)] border-opacity-50"]) }, [Q(te(x4), { class: "flex-shrink-0" }), Q(te(S3), { class: "flex-shrink-0" }), Ut("div", Kl, [Q(te(b))]), Ut("div", Wl, [Q(Ul, { "current-path": s.value }, null, 8, ["current-path"]), Q(te(P3)), Q(te(A4)), te(_2) ? (ke(), nt(te(F4), { key: 0 })) : Zn("", true), Q(te(C3)), Q(te(B2))])], 2)), t.value ? Zn("", true) : (ke(), nt(te(I2), { key: 2 }))], 64));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/runtime-dom.esm-bundler-Df8L0cdI.js
  function Jt2(t) {
    const e = {};
    for (const c2 in t)
      c2 in Et2 || (e[c2] = t[c2]);
    if (t.css === false)
      return e;
    const { name: n = "v", type: s, duration: o2, enterFromClass: r3 = `${n}-enter-from`, enterActiveClass: i3 = `${n}-enter-active`, enterToClass: a2 = `${n}-enter-to`, appearFromClass: f = r3, appearActiveClass: l3 = i3, appearToClass: u = a2, leaveFromClass: p3 = `${n}-leave-from`, leaveActiveClass: m = `${n}-leave-active`, leaveToClass: _2 = `${n}-leave-to` } = t, M2 = Qt(o2), Mt2 = M2 && M2[0], wt = M2 && M2[1], { onBeforeEnter: j3, onEnter: U5, onEnterCancelled: z4, onLeave: G5, onLeaveCancelled: Nt2, onBeforeAppear: Lt2 = j3, onAppear: It2 = U5, onAppearCancelled: xt2 = z4 } = e, V2 = (c2, d4, T4, y) => {
      c2._enterCancelled = y, E3(c2, d4 ? u : a2), E3(c2, d4 ? l3 : i3), T4 && T4();
    }, W4 = (c2, d4) => {
      c2._isLeaving = false, E3(c2, p3), E3(c2, _2), E3(c2, m), d4 && d4();
    }, X4 = (c2) => (d4, T4) => {
      const y = c2 ? It2 : U5, Z4 = () => V2(d4, c2, T4);
      A3(y, [d4, Z4]), k3(() => {
        E3(d4, c2 ? f : r3), g2(d4, c2 ? u : a2), Y3(y) || tt2(d4, s, Mt2, Z4);
      });
    };
    return fe3(e, { onBeforeEnter(c2) {
      A3(j3, [c2]), g2(c2, r3), g2(c2, i3);
    }, onBeforeAppear(c2) {
      A3(Lt2, [c2]), g2(c2, f), g2(c2, l3);
    }, onEnter: X4(false), onAppear: X4(true), onLeave(c2, d4) {
      c2._isLeaving = true;
      const T4 = () => W4(c2, d4);
      g2(c2, p3), c2._enterCancelled ? (g2(c2, m), st2(c2)) : (st2(c2), g2(c2, m)), k3(() => {
        c2._isLeaving && (E3(c2, p3), g2(c2, _2), Y3(G5) || tt2(c2, s, wt, T4));
      }), A3(G5, [c2, T4]);
    }, onEnterCancelled(c2) {
      V2(c2, false, void 0, true), A3(z4, [c2]);
    }, onAppearCancelled(c2) {
      V2(c2, true, void 0, true), A3(xt2, [c2]);
    }, onLeaveCancelled(c2) {
      W4(c2), A3(Nt2, [c2]);
    } });
  }
  function Qt(t) {
    if (t == null)
      return null;
    if (q5(t))
      return [$(t.enter), $(t.leave)];
    {
      const e = $(t);
      return [e, e];
    }
  }
  function $(t) {
    return Gl(t);
  }
  function g2(t, e) {
    e.split(/\s+/).forEach((n) => n && t.classList.add(n)), (t[x3] || (t[x3] = /* @__PURE__ */ new Set())).add(e);
  }
  function E3(t, e) {
    e.split(/\s+/).forEach((s) => s && t.classList.remove(s));
    const n = t[x3];
    n && (n.delete(e), n.size || (t[x3] = void 0));
  }
  function k3(t) {
    requestAnimationFrame(() => {
      requestAnimationFrame(t);
    });
  }
  function tt2(t, e, n, s) {
    const o2 = t._endId = ++Yt2, r3 = () => {
      o2 === t._endId && s();
    };
    if (n != null)
      return setTimeout(r3, n);
    const { type: i3, timeout: a2, propCount: f } = kt(t, e);
    if (!i3)
      return s();
    const l3 = i3 + "end";
    let u = 0;
    const p3 = () => {
      t.removeEventListener(l3, m), r3();
    }, m = (_2) => {
      _2.target === t && ++u >= f && p3();
    };
    setTimeout(() => {
      u < f && p3();
    }, a2 + 1), t.addEventListener(l3, m);
  }
  function kt(t, e) {
    const n = window.getComputedStyle(t), s = (M2) => (n[M2] || "").split(", "), o2 = s(`${v}Delay`), r3 = s(`${v}Duration`), i3 = et(o2, r3), a2 = s(`${N}Delay`), f = s(`${N}Duration`), l3 = et(a2, f);
    let u = null, p3 = 0, m = 0;
    e === v ? i3 > 0 && (u = v, p3 = i3, m = r3.length) : e === N ? l3 > 0 && (u = N, p3 = l3, m = f.length) : (p3 = Math.max(i3, l3), u = p3 > 0 ? i3 > l3 ? v : N : null, m = u ? u === v ? r3.length : f.length : 0);
    const _2 = u === v && /\b(?:transform|all)(?:,|$)/.test(s(`${v}Property`).toString());
    return { type: u, timeout: p3, propCount: m, hasTransform: _2 };
  }
  function et(t, e) {
    for (; t.length < e.length; )
      t = t.concat(t);
    return Math.max(...e.map((n, s) => nt2(n) + nt2(t[s])));
  }
  function nt2(t) {
    return t === "auto" ? 0 : Number(t.slice(0, -1).replace(",", ".")) * 1e3;
  }
  function st2(t) {
    return (t ? t.ownerDocument : document).body.offsetHeight;
  }
  function te4(t, e, n) {
    const s = t[x3];
    s && (e = (e ? [e, ...s] : [...s]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e;
  }
  function oe6(t, e, n) {
    const s = t.style, o2 = re5(n);
    let r3 = false;
    if (n && !o2) {
      if (e)
        if (re5(e))
          for (const i3 of e.split(";")) {
            const a2 = i3.slice(0, i3.indexOf(":")).trim();
            n[a2] == null && O4(s, a2, "");
          }
        else
          for (const i3 in e)
            n[i3] == null && O4(s, i3, "");
      for (const i3 in n)
        i3 === "display" && (r3 = true), O4(s, i3, n[i3]);
    } else if (o2) {
      if (e !== n) {
        const i3 = s[ne6];
        i3 && (n += ";" + i3), s.cssText = n, r3 = se6.test(n);
      }
    } else
      e && t.removeAttribute("style");
    ot in t && (t[ot] = r3 ? s.display : "", t[ee3] && (s.display = "none"));
  }
  function O4(t, e, n) {
    if (L3(n))
      n.forEach((s) => O4(t, e, s));
    else if (n == null && (n = ""), e.startsWith("--"))
      t.setProperty(e, n);
    else {
      const s = ie6(t, e);
      it2.test(n) ? t.setProperty(Wt(s), n.replace(it2, ""), "important") : t[s] = n;
    }
  }
  function ie6(t, e) {
    const n = R2[e];
    if (n)
      return n;
    let s = He(e);
    if (s !== "filter" && s in t)
      return R2[e] = s;
    s = rs(s);
    for (let o2 = 0; o2 < rt.length; o2++) {
      const r3 = rt[o2] + s;
      if (r3 in t)
        return R2[e] = r3;
    }
    return e;
  }
  function at2(t, e, n, s, o2, r3 = Yl(e)) {
    s && e.startsWith("xlink:") ? n == null ? t.removeAttributeNS(ct2, e.slice(6, e.length)) : t.setAttributeNS(ct2, e, n) : n == null || r3 && !zl(n) ? t.removeAttribute(e) : t.setAttribute(e, r3 ? "" : Ve2(n) ? String(n) : n);
  }
  function ft2(t, e, n, s, o2) {
    if (e === "innerHTML" || e === "textContent") {
      n != null && (t[e] = e === "innerHTML" ? At2(n) : n);
      return;
    }
    const r3 = t.tagName;
    if (e === "value" && r3 !== "PROGRESS" && !r3.includes("-")) {
      const a2 = r3 === "OPTION" ? t.getAttribute("value") || "" : t.value, f = n == null ? t.type === "checkbox" ? "on" : "" : String(n);
      (a2 !== f || !("_value" in t)) && (t.value = f), n == null && t.removeAttribute(e), t._value = n;
      return;
    }
    let i3 = false;
    if (n === "" || n == null) {
      const a2 = typeof t[e];
      a2 === "boolean" ? n = zl(n) : n == null && a2 === "string" ? (n = "", i3 = true) : a2 === "number" && (n = 0, i3 = true);
    }
    try {
      t[e] = n;
    } catch (e2) {
    }
    i3 && t.removeAttribute(o2 || e);
  }
  function C2(t, e, n, s) {
    t.addEventListener(e, n, s);
  }
  function re6(t, e, n, s) {
    t.removeEventListener(e, n, s);
  }
  function ce5(t, e, n, s, o2 = null) {
    const r3 = t[lt2] || (t[lt2] = {}), i3 = r3[e];
    if (s && i3)
      i3.value = s;
    else {
      const [a2, f] = ae5(e);
      if (s) {
        const l3 = r3[e] = ue4(s, o2);
        C2(t, a2, l3, f);
      } else
        i3 && (re6(t, a2, i3, f), r3[e] = void 0);
    }
  }
  function ae5(t) {
    let e;
    if (ut2.test(t)) {
      e = {};
      let s;
      for (; s = t.match(ut2); )
        t = t.slice(0, t.length - s[0].length), e[s[0].toLowerCase()] = true;
    }
    return [t[2] === ":" ? t.slice(3) : Wt(t.slice(2)), e];
  }
  function ue4(t, e) {
    const n = (s) => {
      if (!s._vts)
        s._vts = Date.now();
      else if (s._vts <= n.attached)
        return;
      Ne3(de4(s, n.value), e, 5, [s]);
    };
    return n.value = t, n.attached = le6(), n;
  }
  function de4(t, e) {
    if (L3(e)) {
      const n = t.stopImmediatePropagation;
      return t.stopImmediatePropagation = () => {
        n.call(t), t._stopped = true;
      }, e.map((s) => (o2) => !o2._stopped && s && s(o2));
    } else
      return e;
  }
  function me5(t, e, n, s) {
    if (s)
      return !!(e === "innerHTML" || e === "textContent" || e in t && dt2(e) && j2(n));
    if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "autocorrect" || e === "sandbox" && t.tagName === "IFRAME" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
      return false;
    if (e === "width" || e === "height") {
      const o2 = t.tagName;
      if (o2 === "IMG" || o2 === "VIDEO" || o2 === "CANVAS" || o2 === "SOURCE")
        return false;
    }
    return dt2(e) && re5(n) ? false : e in t;
  }
  function ge3(t, e) {
    const n = t._def.props;
    if (!n)
      return false;
    const s = He(e);
    return Array.isArray(n) ? n.some((o2) => He(o2) === s) : Object.keys(n).some((o2) => He(o2) === s);
  }
  function he3(t) {
    t.target.composing = true;
  }
  function pt2(t) {
    const e = t.target;
    e.composing && (e.composing = false, e.dispatchEvent(new Event("input")));
  }
  function mt2(t, e, n) {
    return e && (t = t.trim()), n && (t = wo(t)), t;
  }
  function be3() {
    return St2 || (St2 = oc(Ce3));
  }
  function Te4(t) {
    if (t instanceof SVGElement)
      return "svg";
    if (typeof MathMLElement == "function" && t instanceof MathMLElement)
      return "mathml";
  }
  function Ae4(t) {
    return re5(t) ? document.querySelector(t) : t;
  }
  var H5, J6, At2, zt2, Gt2, h, Q6, Wt2, v, N, x3, Et2, Xt, Zt, _e3, A3, Y3, Yt2, ot, ee3, ne6, se6, it2, rt, R2, ct2, lt2, ut2, F3, fe4, le6, dt2, pe3, w2, S2, Me, Se4, ve4, Le, Ce3, St2, Ie2;
  var init_runtime_dom_esm_bundler_Df8L0cdI = __esm({
    "../dock/dock/public/js/chunks/runtime-dom.esm-bundler-Df8L0cdI.js"() {
      init_dock_navbar_esm();
      J6 = typeof window < "u" && window.trustedTypes;
      if (J6)
        try {
          H5 = J6.createPolicy("vue", { createHTML: (t) => t });
        } catch (e) {
        }
      At2 = H5 ? (t) => H5.createHTML(t) : (t) => t;
      zt2 = "http://www.w3.org/2000/svg";
      Gt2 = "http://www.w3.org/1998/Math/MathML";
      h = typeof document < "u" ? document : null;
      Q6 = h && h.createElement("template");
      Wt2 = { insert: (t, e, n) => {
        e.insertBefore(t, n || null);
      }, remove: (t) => {
        const e = t.parentNode;
        e && e.removeChild(t);
      }, createElement: (t, e, n, s) => {
        const o2 = e === "svg" ? h.createElementNS(zt2, t) : e === "mathml" ? h.createElementNS(Gt2, t) : n ? h.createElement(t, { is: n }) : h.createElement(t);
        return t === "select" && s && s.multiple != null && o2.setAttribute("multiple", s.multiple), o2;
      }, createText: (t) => h.createTextNode(t), createComment: (t) => h.createComment(t), setText: (t, e) => {
        t.nodeValue = e;
      }, setElementText: (t, e) => {
        t.textContent = e;
      }, parentNode: (t) => t.parentNode, nextSibling: (t) => t.nextSibling, querySelector: (t) => h.querySelector(t), setScopeId(t, e) {
        t.setAttribute(e, "");
      }, insertStaticContent(t, e, n, s, o2, r3) {
        const i3 = n ? n.previousSibling : e.lastChild;
        if (o2 && (o2 === r3 || o2.nextSibling))
          for (; e.insertBefore(o2.cloneNode(true), n), !(o2 === r3 || !(o2 = o2.nextSibling)); )
            ;
        else {
          Q6.innerHTML = At2(s === "svg" ? `<svg>${t}</svg>` : s === "mathml" ? `<math>${t}</math>` : t);
          const a2 = Q6.content;
          if (s === "svg" || s === "mathml") {
            const f = a2.firstChild;
            for (; f.firstChild; )
              a2.appendChild(f.firstChild);
            a2.removeChild(f);
          }
          e.insertBefore(a2, n);
        }
        return [i3 ? i3.nextSibling : e.firstChild, n ? n.previousSibling : e.lastChild];
      } };
      v = "transition";
      N = "animation";
      x3 = Symbol("_vtc");
      Et2 = { name: String, type: String, css: { type: Boolean, default: true }, duration: [String, Number, Object], enterFromClass: String, enterActiveClass: String, enterToClass: String, appearFromClass: String, appearActiveClass: String, appearToClass: String, leaveFromClass: String, leaveActiveClass: String, leaveToClass: String };
      Xt = fe3({}, gi, Et2);
      Zt = (t) => (t.displayName = "Transition", t.props = Xt, t);
      _e3 = Zt((t, { slots: e }) => Qn(tc, Jt2(t), e));
      A3 = (t, e = []) => {
        L3(t) ? t.forEach((n) => n(...e)) : t && t(...e);
      };
      Y3 = (t) => t ? L3(t) ? t.some((e) => e.length > 1) : t.length > 1 : false;
      Yt2 = 0;
      ot = Symbol("_vod");
      ee3 = Symbol("_vsh");
      ne6 = Symbol("");
      se6 = /(?:^|;)\s*display\s*:/;
      it2 = /\s*!important$/;
      rt = ["Webkit", "Moz", "ms"];
      R2 = {};
      ct2 = "http://www.w3.org/1999/xlink";
      lt2 = Symbol("_vei");
      ut2 = /(?:Once|Passive|Capture)$/;
      F3 = 0;
      fe4 = Promise.resolve();
      le6 = () => F3 || (fe4.then(() => F3 = 0), F3 = Date.now());
      dt2 = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123;
      pe3 = (t, e, n, s, o2, r3) => {
        const i3 = o2 === "svg";
        e === "class" ? te4(t, s, i3) : e === "style" ? oe6(t, n, s) : ts(e) ? tr(e) || ce5(t, e, n, s, r3) : (e[0] === "." ? (e = e.slice(1), true) : e[0] === "^" ? (e = e.slice(1), false) : me5(t, e, s, i3)) ? (ft2(t, e, s), !t.tagName.includes("-") && (e === "value" || e === "checked" || e === "selected") && at2(t, e, s, i3, r3, e !== "value")) : t._isVueCE && (ge3(t, e) || t._def.__asyncLoader && (/[A-Z]/.test(e) || !re5(s))) ? ft2(t, He(e), s, r3, e) : (e === "true-value" ? t._trueValue = s : e === "false-value" && (t._falseValue = s), at2(t, e, s, i3));
      };
      w2 = (t) => {
        const e = t.props["onUpdate:modelValue"] || false;
        return L3(e) ? (n) => Cn(e, n) : e;
      };
      S2 = Symbol("_assign");
      Me = { created(t, { modifiers: { lazy: e, trim: n, number: s } }, o2) {
        t[S2] = w2(o2);
        const r3 = s || o2.props && o2.props.type === "number";
        C2(t, e ? "change" : "input", (i3) => {
          i3.target.composing || t[S2](mt2(t.value, n, r3));
        }), (n || r3) && C2(t, "change", () => {
          t.value = mt2(t.value, n, r3);
        }), e || (C2(t, "compositionstart", he3), C2(t, "compositionend", pt2), C2(t, "change", pt2));
      }, mounted(t, { value: e }) {
        t.value = e != null ? e : "";
      }, beforeUpdate(t, { value: e, oldValue: n, modifiers: { lazy: s, trim: o2, number: r3 } }, i3) {
        if (t[S2] = w2(i3), t.composing)
          return;
        const a2 = (r3 || t.type === "number") && !/^0\d/.test(t.value) ? wo(t.value) : t.value, f = e != null ? e : "";
        a2 !== f && (document.activeElement === t && t.type !== "range" && (s && e === n || o2 && t.value.trim() === f) || (t.value = f));
      } };
      Se4 = ["ctrl", "shift", "alt", "meta"];
      ve4 = { stop: (t) => t.stopPropagation(), prevent: (t) => t.preventDefault(), self: (t) => t.target !== t.currentTarget, ctrl: (t) => !t.ctrlKey, shift: (t) => !t.shiftKey, alt: (t) => !t.altKey, meta: (t) => !t.metaKey, left: (t) => "button" in t && t.button !== 0, middle: (t) => "button" in t && t.button !== 1, right: (t) => "button" in t && t.button !== 2, exact: (t, e) => Se4.some((n) => t[`${n}Key`] && !e.includes(n)) };
      Le = (t, e) => {
        if (!t)
          return t;
        const n = t._withMods || (t._withMods = {}), s = e.join(".");
        return n[s] || (n[s] = (o2, ...r3) => {
          for (let i3 = 0; i3 < e.length; i3++) {
            const a2 = ve4[e[i3]];
            if (a2 && a2(o2, e))
              return;
          }
          return t(o2, ...r3);
        });
      };
      Ce3 = fe3({ patchProp: pe3 }, Wt2);
      Ie2 = (...t) => {
        const e = be3().createApp(...t), { mount: n } = e;
        return e.mount = (s) => {
          const o2 = Ae4(s);
          if (!o2)
            return;
          const r3 = e._component;
          !j2(r3) && !r3.render && !r3.template && (r3.template = o2.innerHTML), o2.nodeType === 1 && (o2.textContent = "");
          const i3 = n(o2, false, Te4(o2));
          return o2 instanceof Element && (o2.removeAttribute("v-cloak"), o2.setAttribute("data-v-app", "")), i3;
        }, e;
      };
    }
  });

  // ../dock/dock/public/js/dock.bundle.js
  init_runtime_dom_esm_bundler_Df8L0cdI();
  init_dock_navbar_esm();
  function r2() {
    var _a, _b, _c;
    if (!((_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) == null ? void 0 : _c.installed))
      return;
    const t = document.querySelector(".navbar.navbar-fixed-top");
    if (t) {
      const e = document.createElement("div");
      t.replaceWith(e), Ie2(ic).mount(e);
    } else {
      const e = document.createElement("div");
      document.body.prepend(e), Ie2(ic).mount(e);
    }
  }
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", r2) : r2();
})();
//# sourceMappingURL=dock.bundle.NWP36SGN.js.map
