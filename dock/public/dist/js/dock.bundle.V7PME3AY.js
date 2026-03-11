(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a2, b2) => {
    for (var prop in b2 || (b2 = {}))
      if (__hasOwnProp.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b2)) {
        if (__propIsEnum.call(b2, prop))
          __defNormalProp(a2, prop, b2[prop]);
      }
    return a2;
  };
  var __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
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

  // ../dock/dock/public/js/chunks/DockSidebarToggle--kRCh3VX.js
  var DockSidebarToggle_kRCh3VX_exports = {};
  __export(DockSidebarToggle_kRCh3VX_exports, {
    default: () => k
  });
  var l, d, k;
  var init_DockSidebarToggle_kRCh3VX = __esm({
    "../dock/dock/public/js/chunks/DockSidebarToggle--kRCh3VX.js"() {
      init_dock_navbar_esm();
      l = zr("menu", [["path", { d: "M4 5h16", key: "1tepv9" }], ["path", { d: "M4 12h16", key: "1lakjw" }], ["path", { d: "M4 19h16", key: "1djgab" }]]);
      d = { name: "DockSidebarToggle" };
      k = cn(__spreadProps(__spreadValues({}, d), { setup(i2) {
        return (t, e) => (Me(), ls("button", { class: "flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", "aria-label": "Toggle sidebar", title: "Toggle sidebar", onClick: e[0] || (e[0] = (u3) => t.$emit("toggle")) }, [Y(X(l), { class: "w-4 h-4" })]));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/DockAppLabel-C3lqAbAn.js
  var DockAppLabel_C3lqAbAn_exports = {};
  __export(DockAppLabel_C3lqAbAn_exports, {
    default: () => u
  });
  var p, l2, u;
  var init_DockAppLabel_C3lqAbAn = __esm({
    "../dock/dock/public/js/chunks/DockAppLabel-C3lqAbAn.js"() {
      init_dock_navbar_esm();
      p = { class: "dock-app-label text-sm font-semibold text-[var(--dock-text)] truncate max-w-[160px]" };
      l2 = { name: "DockAppLabel" };
      u = cn(__spreadProps(__spreadValues({}, l2), { setup(r2) {
        const { settings: t } = Qr();
        return (_2, i2) => {
          var _a;
          return Me(), ls("span", p, po(((_a = X(t)) == null ? void 0 : _a.site_label) || "Desk"), 1);
        };
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/x-CHOEN0ia.js
  var o;
  var init_x_CHOEN0ia = __esm({
    "../dock/dock/public/js/chunks/x-CHOEN0ia.js"() {
      init_dock_navbar_esm();
      o = zr("x", [["path", { d: "M18 6 6 18", key: "1bl5f8" }], ["path", { d: "m6 6 12 12", key: "d8bk6v" }]]);
    }
  });

  // ../dock/dock/public/js/chunks/DockSearchModal-DQbpqt6F.js
  var DockSearchModal_DQbpqt6F_exports = {};
  __export(DockSearchModal_DQbpqt6F_exports, {
    default: () => Fe
  });
  function ie(r2, i2, l5, x3, m, d3) {
    return Me(), ls("div", ce, [(Me(), ls(Oe, null, Nl(4, (p4) => Dt("div", { key: p4, class: "flex gap-3 items-center animate-pulse" }, [i2[0] || (i2[0] = Dt("div", { class: "w-2 h-2 rounded-full bg-black/10 dark:bg-white/10 shrink-0" }, null, -1)), Dt("div", { class: "flex-1 h-3 rounded bg-black/10 dark:bg-white/10", style: zs({ width: `${60 + p4 * 8}%` }) }, null, 4), i2[1] || (i2[1] = Dt("div", { class: "w-12 h-2.5 rounded bg-black/10 dark:bg-white/10 shrink-0" }, null, -1))])), 64))]);
  }
  var oe, ae, se, ne, re, le, ce, ue, de, pe, ve, ke, fe, xe, he, me, be, ye2, ge, _e, we, $e, Ce, Se, De, Re, Ae, Ee, Me2, Ne2, Be, Te, qe, Fe;
  var init_DockSearchModal_DQbpqt6F = __esm({
    "../dock/dock/public/js/chunks/DockSearchModal-DQbpqt6F.js"() {
      init_runtime_dom_esm_bundler_CKC4ttiH();
      init_dock_navbar_esm();
      init_x_CHOEN0ia();
      init_DockSearch_DqvTXRMe();
      oe = ["aria-selected"];
      ae = { class: "flex-1 text-sm text-[var(--dock-text)] truncate" };
      se = { class: "text-xs text-[var(--dock-icon)] shrink-0" };
      ne = { name: "DockSearchResultRow" };
      re = cn(__spreadProps(__spreadValues({}, ne), { props: { result: {}, appColor: {}, focused: { type: Boolean } }, emits: ["navigate"], setup(r2) {
        return (i2, l5) => {
          var _a;
          return Me(), ls("div", { role: "option", "aria-selected": r2.focused, class: $t(["flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors", r2.focused ? "bg-black/10 dark:bg-white/10" : "hover:bg-black/5 dark:hover:bg-white/5"]), onClick: l5[0] || (l5[0] = (x3) => i2.$emit("navigate", r2.result)) }, [Dt("div", { class: "w-2 h-2 rounded-full shrink-0", style: zs({ backgroundColor: (_a = r2.appColor) != null ? _a : "var(--dock-icon)" }) }, null, 4), Dt("span", ae, po(r2.result.label), 1), Dt("span", se, po(r2.result.section), 1)], 10, oe);
        };
      } }));
      le = { name: "DockSearchLoading" };
      ce = { class: "py-2 px-3 space-y-2" };
      ue = ol(le, [["render", ie]]);
      de = { class: "px-4 py-6 text-center text-sm text-[var(--dock-icon)]" };
      pe = { key: 0 };
      ve = { key: 1 };
      ke = { name: "DockSearchEmpty" };
      fe = cn(__spreadProps(__spreadValues({}, ke), { props: { query: {}, scopedApp: {} }, emits: ["clearScope"], setup(r2, { emit: i2 }) {
        const l5 = i2;
        return (x3, m) => (Me(), ls("div", de, [r2.scopedApp ? (Me(), ls("p", pe, po(X(Os)('No results for "{0}"').replace("{0}", r2.query)) + " " + po(X(Os)("in {0}").replace("{0}", r2.scopedApp)), 1)) : (Me(), ls("p", ve, po(X(Os)('No results for "{0}"').replace("{0}", r2.query)), 1)), r2.scopedApp ? (Me(), ls("button", { key: 2, class: "mt-2 text-[var(--dock-accent)] hover:underline", onClick: m[0] || (m[0] = (d3) => l5("clearScope")) }, po(X(Os)("Search in All apps")), 1)) : Ns("", true)]));
      } }));
      xe = { class: "px-4 py-6 text-center text-sm text-[var(--dock-icon)]" };
      he = { name: "DockSearchError" };
      me = cn(__spreadProps(__spreadValues({}, he), { emits: ["retry"], setup(r2) {
        return (i2, l5) => (Me(), ls("div", xe, [Ui(po(X(Os)("Search unavailable")) + " ", 1), Dt("button", { class: "underline ml-1 hover:text-[var(--dock-text)]", onClick: l5[0] || (l5[0] = (x3) => i2.$emit("retry")) }, po(X(Os)("Try again")), 1)]));
      } }));
      be = { key: 0, class: "py-1" };
      ye2 = { class: "px-4 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--dock-icon)]" };
      ge = ["onClick"];
      _e = { class: "flex-1 min-w-0" };
      we = { class: "text-sm text-[var(--dock-text)] truncate" };
      $e = { class: "text-[11px] text-[var(--dock-icon)] truncate" };
      Ce = ["aria-label", "onClick"];
      Se = { key: 1, class: "px-4 py-3 text-xs text-[var(--dock-icon)]" };
      De = { name: "DockSearchRecent" };
      Re = cn(__spreadProps(__spreadValues({}, De), { emits: ["navigate"], setup(r2, { emit: i2 }) {
        const l5 = i2, { items: x3, removeItem: m } = Ol(), { registeredApps: d3 } = Qr(), p4 = ye(() => {
          var _a;
          const v = {};
          for (const h of (_a = d3.value) != null ? _a : [])
            h.color && (v[h.app] = h.color);
          return v;
        });
        function b2(v) {
          return `/${v.app}/${v.doctype}/${encodeURIComponent(v.docname)}`;
        }
        return (v, h) => X(x3).length ? (Me(), ls("div", be, [Dt("div", ye2, po(X(Os)("Recent")), 1), (Me(true), ls(Oe, null, Nl(X(x3), (c) => {
          var _a;
          return Me(), ls("div", { key: c.name, class: "group flex items-center gap-2.5 px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer", onClick: (S5) => l5("navigate", b2(c)) }, [Dt("span", { class: "w-2 h-2 rounded-full shrink-0", style: zs({ background: (_a = p4.value[c.app]) != null ? _a : "var(--dock-accent)" }) }, null, 4), Dt("div", _e, [Dt("div", we, po(c.label), 1), Dt("div", $e, po(c.doctype), 1)]), Dt("button", { class: "opacity-0 group-hover:opacity-100 text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-opacity", "aria-label": X(Os)("Remove from recent"), onClick: Rt((S5) => X(m)(c.name), ["stop"]) }, [Y(X(o), { class: "w-3.5 h-3.5" })], 8, Ce)], 8, ge);
        }), 128))])) : (Me(), ls("div", Se, po(X(Os)("No recent items")), 1));
      } }));
      Ae = { role: "dialog", "aria-modal": "true", "aria-label": "Global search", class: "w-full max-w-lg bg-[var(--dock-bg)] border border-[var(--dock-border)] rounded-xl shadow-2xl overflow-hidden" };
      Ee = { class: "flex items-center gap-2 px-4 py-3 border-b border-[var(--dock-border)]" };
      Me2 = ["placeholder"];
      Ne2 = { class: "flex gap-1 px-3 pt-2 pb-1 overflow-x-auto" };
      Be = ["onClick"];
      Te = { role: "listbox", class: "max-h-[60vh] overflow-y-auto" };
      qe = { name: "DockSearchModal" };
      Fe = cn(__spreadProps(__spreadValues({}, qe), { emits: ["close"], setup(r2, { emit: i2 }) {
        const l5 = i2, { registeredApps: x3 } = Qr(), m = ye(() => {
          var _a;
          const t = {};
          for (const a2 of (_a = x3.value) != null ? _a : [])
            a2.color && (t[a2.app] = a2.color);
          return t;
        }), d3 = Ne(""), p4 = Ne(null), b2 = Ne([]), v = Ne(false), h = Ne(false), c = Ne(-1), S5 = Ne(null), F6 = ye(() => {
          const t = {};
          for (const a2 of b2.value)
            t[a2.app] || (t[a2.app] = []), t[a2.app].push(a2);
          return t;
        }), A2 = ye(() => b2.value);
        let E5 = null;
        Es(d3, (t) => {
          if (h.value = false, c.value = -1, E5 && clearTimeout(E5), t.length < 2) {
            b2.value = [], v.value = false;
            return;
          }
          v.value = true, E5 = setTimeout(w3, 200);
        });
        async function w3() {
          if (!(d3.value.length < 2)) {
            v.value = true, h.value = false;
            try {
              b2.value = await pt("dock.api.search.global_search", __spreadValues({ query: d3.value }, p4.value ? { app: p4.value } : {}));
            } catch (e) {
              h.value = true;
            } finally {
              v.value = false;
            }
          }
        }
        function T6(t) {
          if (t.key === "Escape") {
            l5("close");
            return;
          }
          t.key === "ArrowDown" ? (t.preventDefault(), c.value = Math.min(c.value + 1, A2.value.length - 1)) : t.key === "ArrowUp" ? (t.preventDefault(), c.value = Math.max(c.value - 1, 0)) : t.key === "Enter" && c.value >= 0 && q6(A2.value[c.value]);
        }
        function q6(t) {
          window.location.href = t.route, l5("close");
        }
        function G5(t) {
          window.location.href = t, l5("close");
        }
        function K6(t) {
          t.target.id === "dock-search-backdrop" && l5("close");
        }
        return Xt(() => Ko(() => {
          var _a;
          return (_a = S5.value) == null ? void 0 : _a.focus();
        })), Xt(() => document.addEventListener("keydown", T6)), rs(() => document.removeEventListener("keydown", T6)), (t, a2) => (Me(), ut(Bl, { to: "body" }, [Dt("div", { id: "dock-search-backdrop", class: "fixed inset-0 z-40 bg-black/40 flex items-start justify-center pt-[10vh] px-4", onMousedown: K6 }, [Dt("div", Ae, [Dt("div", Ee, [Y(X(d2), { class: "w-4 h-4 text-[var(--dock-icon)] shrink-0" }), Hl(Dt("input", { ref_key: "inputRef", ref: S5, "onUpdate:modelValue": a2[0] || (a2[0] = (k2) => d3.value = k2), type: "text", class: "flex-1 bg-transparent text-[var(--dock-text)] text-sm outline-none placeholder-[var(--dock-icon)]", placeholder: X(Os)("Search...") }, null, 8, Me2), [[It, d3.value]]), d3.value ? (Me(), ls("button", { key: 0, class: "text-[var(--dock-icon)] hover:text-[var(--dock-text)]", onClick: a2[1] || (a2[1] = (k2) => d3.value = "") }, [Y(X(o), { class: "w-4 h-4" })])) : Ns("", true), a2[4] || (a2[4] = Dt("kbd", { class: "text-xs text-[var(--dock-icon)] bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded" }, "Esc", -1))]), Dt("div", Ne2, [Dt("button", { class: $t(["px-2.5 py-1 rounded-full text-xs font-medium transition-colors shrink-0", p4.value ? "text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10" : "bg-[var(--dock-accent)] text-white"]), onClick: a2[2] || (a2[2] = (k2) => {
          p4.value = null, w3();
        }) }, po(X(Os)("All")), 3), (Me(true), ls(Oe, null, Nl(X(x3), (k2) => (Me(), ls("button", { key: k2.app, class: $t(["px-2.5 py-1 rounded-full text-xs font-medium transition-colors shrink-0", p4.value === k2.app ? "bg-[var(--dock-accent)] text-white" : "text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10"]), onClick: (L4) => {
          p4.value = k2.app, w3();
        } }, po(k2.label), 11, Be))), 128))]), Dt("div", Te, [v.value ? (Me(), ut(ue, { key: 0 })) : h.value ? (Me(), ut(me, { key: 1, onRetry: w3 })) : d3.value.length >= 2 ? (Me(), ls(Oe, { key: 2 }, [b2.value.length ? (Me(true), ls(Oe, { key: 1 }, Nl(F6.value, (k2, L4) => (Me(), ls(Oe, { key: L4 }, [(Me(true), ls(Oe, null, Nl(k2, (D4, Le3) => (Me(), ut(re, { key: D4.name, result: D4, "app-color": m.value[D4.app], focused: A2.value.indexOf(D4) === c.value, onNavigate: q6 }, null, 8, ["result", "app-color", "focused"]))), 128)), a2[5] || (a2[5] = Dt("div", { class: "mx-4 border-b border-[var(--dock-border)]" }, null, -1))], 64))), 128)) : (Me(), ut(fe, { key: 0, query: d3.value, "scoped-app": p4.value, onClearScope: a2[3] || (a2[3] = (k2) => {
          p4.value = null, w3();
        }) }, null, 8, ["query", "scoped-app"]))], 64)) : (Me(), ut(Re, { key: 3, onNavigate: G5 }))])])], 32)]));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/DockSearch-DqvTXRMe.js
  var DockSearch_DqvTXRMe_exports = {};
  __export(DockSearch_DqvTXRMe_exports, {
    D: () => E,
    S: () => d2
  });
  var d2, S, D, E;
  var init_DockSearch_DqvTXRMe = __esm({
    "../dock/dock/public/js/chunks/DockSearch-DqvTXRMe.js"() {
      init_dock_navbar_esm();
      d2 = zr("search", [["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }], ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]]);
      S = { name: "DockSearch" };
      D = cn(__spreadProps(__spreadValues({}, S), { setup(C2) {
        const t = Ne(false), i2 = $e2(() => Le(() => Promise.resolve().then(() => (init_DockSearchModal_DQbpqt6F(), DockSearchModal_DQbpqt6F_exports)), []));
        function r2(o2) {
          (o2.metaKey || o2.ctrlKey) && o2.key === "k" && (o2.preventDefault(), t.value = true);
        }
        return Xt(() => document.addEventListener("keydown", r2)), rs(() => document.removeEventListener("keydown", r2)), (o2, e) => (Me(), ls(Oe, null, [Dt("button", { class: "dock-search hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors text-[var(--dock-icon)] text-sm min-w-[180px]", "aria-label": "Search", onClick: e[0] || (e[0] = (s) => t.value = true) }, [Y(X(d2), { class: "w-3.5 h-3.5 shrink-0" }), Dt("span", null, po(X(Os)("Search...")), 1), e[3] || (e[3] = Dt("kbd", { class: "ml-auto text-xs bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono" }, "\u2318K", -1))]), Dt("button", { class: "dock-search md:hidden flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", "aria-label": "Search", title: "Search", onClick: e[1] || (e[1] = (s) => t.value = true) }, [Y(X(d2), { class: "w-4 h-4" })]), t.value ? (Me(), ut(X(i2), { key: 0, onClose: e[2] || (e[2] = (s) => t.value = false) })) : Ns("", true)], 64));
      } }));
      E = Object.freeze(Object.defineProperty({ __proto__: null, default: D }, Symbol.toStringTag, { value: "Module" }));
    }
  });

  // ../dock/dock/public/js/chunks/DockTimer-k0j7AUic.js
  var DockTimer_k0j7AUic_exports = {};
  __export(DockTimer_k0j7AUic_exports, {
    default: () => je
  });
  var ne2, oe2, se2, le2, re2, ie2, de2, ce2, ue2, F, ve2, me2, pe2, ke2, xe2, fe2, ye3, ge2, be2, _e2, he2, $e3, we2, Ce2, Te2, Se2, Ee2, Be2, De2, Ne3, Ie, Le2, Me3, Ve, Ae2, ze, Fe2, Re2, Ue, je;
  var init_DockTimer_k0j7AUic = __esm({
    "../dock/dock/public/js/chunks/DockTimer-k0j7AUic.js"() {
      init_dock_navbar_esm();
      init_x_CHOEN0ia();
      init_runtime_dom_esm_bundler_CKC4ttiH();
      ne2 = zr("clock", [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }]]);
      oe2 = { class: "p-3 space-y-3" };
      se2 = { class: "text-xs font-medium text-[var(--dock-text)]" };
      le2 = { key: 0, class: "flex items-center gap-1.5 bg-black/5 dark:bg-white/10 rounded-md px-2 py-1 text-xs text-[var(--dock-text)]" };
      re2 = { class: "truncate" };
      ie2 = ["placeholder"];
      de2 = { class: "flex gap-2" };
      ce2 = ["disabled"];
      ue2 = { name: "DockTimerStartForm" };
      F = cn(__spreadProps(__spreadValues({}, ue2), { props: { pending: {}, loading: { type: Boolean } }, emits: ["start", "cancel"], setup(o2, { emit: f }) {
        var _a;
        const c = o2, p4 = f, t = Ne((_a = c.pending) != null ? _a : null);
        return (u3, r2) => (Me(), ls("div", oe2, [Dt("p", se2, po(X(Os)("Start Timer")), 1), t.value ? (Me(), ls("div", le2, [Dt("span", re2, po(t.value.label) + " \xB7 " + po(t.value.doctype), 1), Dt("button", { class: "shrink-0 text-[var(--dock-icon)] hover:text-[var(--dock-text)]", onClick: r2[0] || (r2[0] = (m) => t.value = null) }, [Y(X(o), { class: "w-3 h-3" })])])) : (Me(), ls("input", { key: 1, type: "text", class: "w-full text-sm rounded border border-[var(--dock-border)] bg-[var(--dock-bg)] text-[var(--dock-text)] px-2 py-1.5 placeholder-[var(--dock-icon)] focus:outline-none focus:ring-1 focus:ring-[var(--dock-accent)]", placeholder: X(Os)("What are you working on?") }, null, 8, ie2)), Dt("div", de2, [Dt("button", { class: "flex-1 px-3 py-1.5 rounded-md bg-[var(--dock-accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50", disabled: o2.loading, onClick: r2[1] || (r2[1] = (m) => p4("start", t.value)) }, "\u25B6 " + po(X(Os)("Start")), 9, ce2), Dt("button", { class: "px-3 py-1.5 rounded-md text-sm text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10", onClick: r2[2] || (r2[2] = (m) => p4("cancel")) }, po(X(Os)("Cancel")), 1)])]));
      } }));
      ve2 = { class: "p-3 space-y-2" };
      me2 = { class: "flex items-center gap-2" };
      pe2 = { key: 0, class: "text-xs text-[var(--dock-icon)]" };
      ke2 = { key: 0, class: "text-xs text-[var(--dock-text)] truncate" };
      xe2 = { key: 0, class: "text-[var(--dock-icon)]" };
      fe2 = { class: "flex items-center gap-2 pt-1" };
      ye3 = ["disabled"];
      ge2 = ["disabled"];
      be2 = ["disabled"];
      _e2 = { name: "DockTimerActiveView" };
      he2 = cn(__spreadProps(__spreadValues({}, _e2), { props: { state: {}, display: {}, loading: { type: Boolean } }, emits: ["pause", "resume", "stop", "edit"], setup(o2, { emit: f }) {
        const c = f;
        return (p4, t) => (Me(), ls("div", ve2, [Dt("div", me2, [Dt("span", { class: $t(["w-2 h-2 rounded-full shrink-0", o2.state.state === "running" ? "bg-green-500 animate-pulse" : "bg-amber-500"]) }, null, 2), Dt("span", { "aria-live": "polite", class: $t(["text-sm font-mono font-semibold", o2.state.state === "running" ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"]) }, po(o2.display), 3), o2.state.state === "paused" ? (Me(), ls("span", pe2, "(" + po(X(Os)("paused")) + ")", 1)) : Ns("", true)]), o2.state.context_label ? (Me(), ls("div", ke2, [Ui(po(o2.state.context_label) + " ", 1), o2.state.context_doctype ? (Me(), ls("span", xe2, " \xB7 " + po(o2.state.context_doctype), 1)) : Ns("", true)])) : Ns("", true), Dt("div", fe2, [o2.state.state === "running" ? (Me(), ls("button", { key: 0, class: "flex-1 px-3 py-1.5 rounded-md bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition-colors disabled:opacity-50", disabled: o2.loading, onClick: t[0] || (t[0] = (u3) => c("pause")) }, "\u23F8 " + po(X(Os)("Pause")), 9, ye3)) : (Me(), ls("button", { key: 1, class: "flex-1 px-3 py-1.5 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50", disabled: o2.loading, onClick: t[1] || (t[1] = (u3) => c("resume")) }, "\u25B6 " + po(X(Os)("Resume")), 9, ge2)), Dt("button", { class: "px-3 py-1.5 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50", disabled: o2.loading, onClick: t[2] || (t[2] = (u3) => c("stop")) }, "\u23F9 " + po(X(Os)("Stop")), 9, be2), Dt("button", { class: "px-2 py-1.5 rounded-md text-xs text-[var(--dock-icon)] hover:text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10", onClick: t[3] || (t[3] = (u3) => c("edit")) }, "\u270E")])]));
      } }));
      $e3 = { key: 0, class: "p-3 space-y-2" };
      we2 = { class: "text-sm text-green-600 dark:text-green-400 font-medium" };
      Ce2 = ["href"];
      Te2 = { key: 1, class: "p-3 space-y-3" };
      Se2 = ["placeholder"];
      Ee2 = { class: "flex gap-2" };
      Be2 = ["disabled"];
      De2 = { name: "DockTimerStopForm" };
      Ne3 = cn(__spreadProps(__spreadValues({}, De2), { props: { loading: { type: Boolean }, entryName: {} }, emits: ["stop", "cancel"], setup(o2, { emit: f }) {
        const c = f, p4 = Ne("");
        return (t, u3) => o2.entryName !== void 0 && o2.entryName !== null ? (Me(), ls("div", $e3, [Dt("p", we2, "\u2713 " + po(X(Os)("Time entry saved")), 1), Dt("a", { href: `/app/ft-time-entry/${o2.entryName}`, class: "text-xs text-[var(--dock-accent)] hover:underline" }, po(X(Os)("View time entry")) + " \u2192", 9, Ce2)])) : (Me(), ls("div", Te2, [Hl(Dt("textarea", { "onUpdate:modelValue": u3[0] || (u3[0] = (r2) => p4.value = r2), class: "w-full text-sm rounded border border-[var(--dock-border)] bg-[var(--dock-bg)] text-[var(--dock-text)] px-2 py-1.5 resize-none h-16 placeholder-[var(--dock-icon)] focus:outline-none focus:ring-1 focus:ring-[var(--dock-accent)]", placeholder: X(Os)("Add notes...") }, null, 8, Se2), [[It, p4.value]]), Dt("div", Ee2, [Dt("button", { class: "flex-1 px-3 py-1.5 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50", disabled: o2.loading, onClick: u3[1] || (u3[1] = (r2) => c("stop", p4.value)) }, "\u23F9 " + po(X(Os)("Stop & Save")), 9, Be2), Dt("button", { class: "px-3 py-1.5 rounded-md text-sm text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10", onClick: u3[2] || (u3[2] = (r2) => c("cancel")) }, po(X(Os)("Cancel")), 1)])]));
      } }));
      Ie = { class: "p-3 text-sm text-[var(--dock-icon)] text-center" };
      Le2 = { name: "DockTimerError" };
      Me3 = cn(__spreadProps(__spreadValues({}, Le2), { emits: ["retry"], setup(o2) {
        return (f, c) => (Me(), ls("div", Ie, [Ui(po(X(Os)("Timer unavailable")) + " ", 1), Dt("button", { class: "underline ml-1 hover:text-[var(--dock-text)]", onClick: c[0] || (c[0] = (p4) => f.$emit("retry")) }, po(X(Os)("Try again")), 1)]));
      } }));
      Ve = { key: 0, id: "dock-timer-root", class: "dock-timer relative" };
      Ae2 = ["aria-label"];
      ze = { key: 0, class: "w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" };
      Fe2 = { key: 2 };
      Re2 = { key: 0, role: "dialog", "aria-label": "Timer", class: "absolute right-0 top-full mt-2 w-64 bg-[var(--dock-bg)] border border-[var(--dock-border)] rounded-lg shadow-lg z-20 overflow-hidden" };
      Ue = { name: "DockTimer" };
      je = cn(__spreadProps(__spreadValues({}, Ue), { setup(o2) {
        var _a, _b, _c, _d, _e4, _f;
        const { settings: f } = Qr(), c = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) != null ? _c : window.dockBoot, p4 = (c == null ? void 0 : c.frappe_time_installed) === true && ((_d = f.value) == null ? void 0 : _d.enable_global_timer) === true, t = Ne((_e4 = c == null ? void 0 : c.timer_state) != null ? _e4 : { state: "stopped" }), u3 = Ne(null), r2 = Ne(false), m = Ne("start"), k2 = Ne(false), g2 = Ne(false), N4 = Ne(void 0), C2 = Ne((_f = t.value.elapsed_seconds) != null ? _f : 0);
        let T6 = null;
        function U5() {
          if (E5(), t.value.state !== "running")
            return;
          const e = t.value.started_at ? new Date(t.value.started_at).getTime() : 0;
          T6 = setInterval(() => {
            C2.value = e ? Math.floor((Date.now() - e) / 1e3) : C2.value + 1;
          }, 1e3);
        }
        function E5() {
          T6 && (clearInterval(T6), T6 = null);
        }
        function b2(e) {
          var _a2;
          t.value = e, C2.value = (_a2 = e.elapsed_seconds) != null ? _a2 : 0, E5(), e.state === "running" && U5(), (e.state === "stopped" || e.state === "running" || e.state === "paused") && (m.value = e.state === "stopped" ? "start" : "active");
        }
        const S5 = ye(() => {
          const e = C2.value, a2 = Math.floor(e / 3600), y2 = Math.floor(e % 3600 / 60), H7 = e % 60;
          return [a2, y2, H7].map((J6) => String(J6).padStart(2, "0")).join(":");
        });
        function I4(e) {
          b2(e);
        }
        let B5 = null;
        async function K6() {
          try {
            const e = await pt("dock.api.timer.get_state");
            b2(e);
          } catch (e) {
          }
        }
        function L4(e) {
          var _a2;
          u3.value = (_a2 = e.detail) != null ? _a2 : null;
        }
        Xt(() => {
          var _a2;
          if (!p4)
            return;
          b2(t.value);
          const e = (_a2 = window.frappe) == null ? void 0 : _a2.realtime;
          (e == null ? void 0 : e.on) && e.on("dock_timer_update", I4), B5 = setInterval(K6, 3e4), window.addEventListener("dock:setTimerContext", L4), document.addEventListener("mousedown", M2), document.addEventListener("keydown", V4);
        }), rs(() => {
          var _a2;
          if (!p4)
            return;
          E5(), B5 && clearInterval(B5);
          const e = (_a2 = window.frappe) == null ? void 0 : _a2.realtime;
          (e == null ? void 0 : e.off) && e.off("dock_timer_update", I4), window.removeEventListener("dock:setTimerContext", L4), document.removeEventListener("mousedown", M2), document.removeEventListener("keydown", V4);
        });
        function M2(e) {
          const a2 = document.getElementById("dock-timer-root");
          a2 && !a2.contains(e.target) && (r2.value = false);
        }
        function V4(e) {
          e.key === "Escape" && r2.value && (r2.value = false);
        }
        async function A2(e) {
          k2.value = true, g2.value = false;
          try {
            const a2 = await pt("dock.api.timer.start", e ? { context_app: e.app, context_doctype: e.doctype, context_name: e.name, context_label: e.label } : {});
            b2(a2);
          } catch (e2) {
            g2.value = true;
          } finally {
            k2.value = false;
          }
        }
        async function O6() {
          k2.value = true;
          try {
            b2(await pt("dock.api.timer.pause"));
          } catch (e) {
            g2.value = true;
          } finally {
            k2.value = false;
          }
        }
        async function P6(e) {
          var _a2;
          k2.value = true;
          try {
            const a2 = await pt("dock.api.timer.stop", e ? { notes: e } : {});
            N4.value = (_a2 = a2.entry_name) != null ? _a2 : null, b2(a2), m.value = "stop";
          } catch (e2) {
            g2.value = true;
          } finally {
            k2.value = false;
          }
        }
        async function j3(e) {
          if (e) {
            k2.value = true;
            try {
              const a2 = await pt("dock.api.timer.update_context", { context_app: e.app, context_doctype: e.doctype, context_name: e.name, context_label: e.label });
              b2(a2), m.value = "active";
            } catch (e2) {
              g2.value = true;
            } finally {
              k2.value = false;
            }
          }
        }
        const G5 = ye(() => t.value.state === "running" ? `Timer running, ${S5.value}. Click to manage.` : t.value.state === "paused" ? `Timer paused, ${S5.value}. Click to manage.` : "Start timer");
        return (e, a2) => X(p4) ? (Me(), ls("div", Ve, [Dt("button", { class: $t(["flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-colors text-sm font-mono hover:bg-black/5 dark:hover:bg-white/10", { "text-green-600 dark:text-green-400": t.value.state === "running", "text-amber-600 dark:text-amber-400": t.value.state === "paused", "text-[var(--dock-icon)]": t.value.state === "stopped" }]), "aria-label": G5.value, onClick: a2[0] || (a2[0] = (y2) => r2.value = !r2.value) }, [t.value.state === "running" ? (Me(), ls("span", ze)) : (Me(), ut(X(ne2), { key: 1, class: "w-3.5 h-3.5" })), t.value.state !== "stopped" ? (Me(), ls("span", Fe2, po(S5.value), 1)) : Ns("", true)], 10, Ae2), r2.value ? (Me(), ls("div", Re2, [g2.value ? (Me(), ut(Me3, { key: 0, onRetry: a2[1] || (a2[1] = (y2) => g2.value = false) })) : (Me(), ls(Oe, { key: 1 }, [m.value === "start" ? (Me(), ut(F, { key: 0, pending: u3.value, loading: k2.value, onStart: A2, onCancel: a2[2] || (a2[2] = (y2) => r2.value = false) }, null, 8, ["pending", "loading"])) : m.value === "active" && (t.value.state === "running" || t.value.state === "paused") ? (Me(), ut(he2, { key: 1, state: t.value, display: S5.value, loading: k2.value, onPause: O6, onResume: a2[3] || (a2[3] = (y2) => A2(null)), onStop: a2[4] || (a2[4] = (y2) => m.value = "stop"), onEdit: a2[5] || (a2[5] = (y2) => m.value = "edit") }, null, 8, ["state", "display", "loading"])) : m.value === "edit" ? (Me(), ut(F, { key: 2, pending: u3.value, loading: k2.value, onStart: j3, onCancel: a2[6] || (a2[6] = (y2) => m.value = "active") }, null, 8, ["pending", "loading"])) : m.value === "stop" ? (Me(), ut(Ne3, { key: 3, loading: k2.value, "entry-name": N4.value, onStop: P6, onCancel: a2[7] || (a2[7] = (y2) => m.value = "active") }, null, 8, ["loading", "entry-name"])) : Ns("", true)], 64))])) : Ns("", true)])) : Ns("", true);
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/DockTimerStaleWarning-Cx93gFY2.js
  var DockTimerStaleWarning_Cx93gFY2_exports = {};
  __export(DockTimerStaleWarning_Cx93gFY2_exports, {
    default: () => B
  });
  var g, x, w, B;
  var init_DockTimerStaleWarning_Cx93gFY2 = __esm({
    "../dock/dock/public/js/chunks/DockTimerStaleWarning-Cx93gFY2.js"() {
      init_dock_navbar_esm();
      g = { key: 0, class: "w-full flex items-center justify-between gap-4 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-700 text-sm text-amber-800 dark:text-amber-300" };
      x = { class: "flex items-center gap-3 shrink-0" };
      w = { name: "DockTimerStaleWarning" };
      B = cn(__spreadProps(__spreadValues({}, w), { setup(E5) {
        var _a, _b, _c, _d;
        const a2 = (_d = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) != null ? _c : window.dockBoot) == null ? void 0 : _d.timer_state, l5 = Ne(false), e = Ne(false);
        Xt(() => {
          (a2 == null ? void 0 : a2.state) === "running" && (a2 == null ? void 0 : a2.elapsed_seconds) > 14400 && (e.value = true);
        });
        const d3 = ye(() => {
          var _a2;
          const n = (_a2 = a2 == null ? void 0 : a2.elapsed_seconds) != null ? _a2 : 0, o2 = Math.floor(n / 3600), i2 = Math.floor(n % 3600 / 60);
          return o2 > 0 ? `${o2}h ${i2}m` : `${i2}m`;
        });
        async function m() {
          try {
            await pt("dock.api.timer.stop");
          } catch (e2) {
          }
          e.value = false;
        }
        function p4() {
          l5.value = true, e.value = false;
        }
        return (n, o2) => e.value && !l5.value ? (Me(), ls("div", g, [Dt("span", null, "\u26A0 " + po(X(Os)("Your timer has been running for {0}").replace("{0}", d3.value)), 1), Dt("div", x, [Dt("button", { class: "font-medium underline hover:no-underline", onClick: m }, po(X(Os)("Stop & Save")), 1), Dt("button", { class: "hover:underline", onClick: p4 }, po(X(Os)("Keep running")), 1)])])) : Ns("", true);
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/DockNotificationError.vue_vue_type_script_setup_true_lang-CoQw3xtm.js
  function L(t) {
    const o2 = new Date(t), c = new Date().getTime() - o2.getTime(), s = Math.floor(c / 6e4);
    if (s < 60)
      return `${Math.max(s, 1)}m`;
    const d3 = Math.floor(s / 60);
    return d3 < 24 ? `${d3}h` : o2.toLocaleDateString(void 0, { month: "short", day: "numeric" });
  }
  function H(t, o2, a2, c, s, d3) {
    return Me(), ls("div", j, [(Me(), ls(Oe, null, Nl(3, (k2) => Dt("div", { key: k2, class: "px-3 py-2.5 flex gap-3 items-start animate-pulse" }, [...o2[0] || (o2[0] = [Dt("div", { class: "w-4 h-4 rounded bg-black/10 dark:bg-white/10 mt-0.5 shrink-0" }, null, -1), Dt("div", { class: "flex-1 space-y-1.5" }, [Dt("div", { class: "h-3 rounded bg-black/10 dark:bg-white/10 w-3/4" }), Dt("div", { class: "h-2.5 rounded bg-black/10 dark:bg-white/10 w-1/2" })], -1)])])), 64))]);
  }
  var M, E2, T, V, z, q, B2, I, R, O, S2, j, P, F2, G, Q, J, K, U;
  var init_DockNotificationError_vue_vue_type_script_setup_true_lang_CoQw3xtm = __esm({
    "../dock/dock/public/js/chunks/DockNotificationError.vue_vue_type_script_setup_true_lang-CoQw3xtm.js"() {
      init_runtime_dom_esm_bundler_CKC4ttiH();
      init_dock_navbar_esm();
      init_x_CHOEN0ia();
      M = zr("external-link", [["path", { d: "M15 3h6v6", key: "1q9fwt" }], ["path", { d: "M10 14 21 3", key: "gplh6r" }], ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]]);
      E2 = { class: "flex-1 min-w-0" };
      T = { key: 0, class: "text-xs text-[var(--dock-icon)] truncate mt-0.5" };
      V = { class: "shrink-0 flex flex-col items-end gap-0.5 pt-0.5" };
      z = { class: "text-[10px] text-[var(--dock-icon)] capitalize" };
      q = { class: "text-[10px] text-[var(--dock-icon)]" };
      B2 = { class: "absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex gap-1" };
      I = ["href"];
      R = { name: "DockNotificationRow" };
      O = cn(__spreadProps(__spreadValues({}, R), { props: { notification: {}, typeInfo: {}, appColor: {} }, emits: ["markRead", "navigate"], setup(t, { emit: o2 }) {
        const a2 = t, c = o2, s = ye(() => !a2.notification.read), d3 = ye(() => L(a2.notification.creation));
        return (k2, l5) => {
          var _a;
          return Me(), ls("div", { role: "menuitem", class: "group relative flex gap-3 items-start px-3 py-2.5 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors", onClick: l5[2] || (l5[2] = (g2) => c("navigate", t.notification)) }, [Dt("div", { class: "w-2 h-2 rounded-full mt-1.5 shrink-0", style: zs({ backgroundColor: (_a = t.appColor) != null ? _a : "var(--dock-icon)" }) }, null, 4), Dt("div", E2, [Dt("p", { class: $t(["text-sm truncate", s.value ? "font-semibold text-[var(--dock-text)]" : "font-normal text-[var(--dock-text)]"]) }, po(t.notification.title), 3), t.notification.message ? (Me(), ls("p", T, po(t.notification.message), 1)) : Ns("", true)]), Dt("div", V, [Dt("span", z, po(t.notification.from_app), 1), Dt("span", q, po(d3.value), 1)]), Dt("div", B2, [t.notification.action_url ? (Me(), ls("a", { key: 0, href: t.notification.action_url, target: "_blank", rel: "noopener", class: "w-6 h-6 flex items-center justify-center rounded bg-[var(--dock-bg)] shadow-sm text-[var(--dock-icon)] hover:text-[var(--dock-text)]", onClick: l5[0] || (l5[0] = Rt(() => {
          }, ["stop"])) }, [Y(X(M), { class: "w-3 h-3" })], 8, I)) : Ns("", true), s.value ? (Me(), ls("button", { key: 1, class: "w-6 h-6 flex items-center justify-center rounded bg-[var(--dock-bg)] shadow-sm text-[var(--dock-icon)] hover:text-[var(--dock-text)]", onClick: l5[1] || (l5[1] = Rt((g2) => c("markRead", t.notification.name), ["stop"])) }, [Y(X(o), { class: "w-3 h-3" })])) : Ns("", true)])]);
        };
      } }));
      S2 = { name: "DockNotificationLoading" };
      j = { class: "py-1" };
      P = ol(S2, [["render", H]]);
      F2 = { class: "px-3 py-6 text-center text-sm text-[var(--dock-icon)]" };
      G = { name: "DockNotificationEmpty" };
      Q = cn(__spreadProps(__spreadValues({}, G), { setup(t) {
        return (o2, a2) => (Me(), ls("div", F2, po(X(Os)("You're all caught up")), 1));
      } }));
      J = { class: "px-3 py-4 text-center text-sm text-[var(--dock-icon)]" };
      K = { name: "DockNotificationError" };
      U = cn(__spreadProps(__spreadValues({}, K), { emits: ["retry"], setup(t) {
        return (o2, a2) => (Me(), ls("div", J, [Ui(po(X(Os)("Notification unavailable")) + " ", 1), Dt("button", { class: "underline ml-1 hover:text-[var(--dock-text)]", onClick: a2[0] || (a2[0] = (c) => o2.$emit("retry")) }, po(X(Os)("Try again")), 1)]));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/DockBell-OFxCQxBn.js
  var DockBell_OFxCQxBn_exports = {};
  __export(DockBell_OFxCQxBn_exports, {
    default: () => te
  });
  var O2, S3, G2, H2, T2, U2, q2, J2, P2, Q2, W, X2, te;
  var init_DockBell_OFxCQxBn = __esm({
    "../dock/dock/public/js/chunks/DockBell-OFxCQxBn.js"() {
      init_dock_navbar_esm();
      init_DockNotificationError_vue_vue_type_script_setup_true_lang_CoQw3xtm();
      init_runtime_dom_esm_bundler_CKC4ttiH();
      init_x_CHOEN0ia();
      O2 = zr("bell", [["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }], ["path", { d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326", key: "11g9vi" }]]);
      S3 = { class: "absolute right-0 top-full mt-2 w-80 bg-[var(--dock-bg)] border border-[var(--dock-border)] rounded-lg shadow-lg z-20 overflow-hidden", role: "menu", "aria-label": "Notifications" };
      G2 = { class: "flex items-center justify-between px-3 py-2 border-b border-[var(--dock-border)]" };
      H2 = { class: "text-sm font-medium text-[var(--dock-text)]" };
      T2 = { class: "max-h-96 overflow-y-auto" };
      U2 = { class: "border-t border-[var(--dock-border)] px-3 py-2 text-center" };
      q2 = { name: "DockNotificationDropdown" };
      J2 = cn(__spreadProps(__spreadValues({}, q2), { emits: ["markRead", "markAllRead", "close"], setup(A2, { emit: a2 }) {
        var _a, _b, _c;
        const d3 = a2, { registeredApps: t } = Qr(), h = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) != null ? _c : window.dockBoot, p4 = ye(() => {
          var _a2;
          const o2 = {};
          for (const i2 of (_a2 = t.value) != null ? _a2 : [])
            i2.color && (o2[i2.app] = i2.color);
          return o2;
        }), k2 = ye(() => {
          var _a2;
          return (_a2 = h == null ? void 0 : h.notification_types) != null ? _a2 : {};
        }), s = Ne([]), u3 = Ne(true), f = Ne(false);
        async function e() {
          u3.value = true, f.value = false;
          try {
            s.value = await pt("dock.api.notifications.get_recent", { limit: 20 });
          } catch (e2) {
            f.value = true;
          } finally {
            u3.value = false;
          }
        }
        Xt(e);
        async function n(o2) {
          await pt("dock.api.notifications.mark_read", { notification_names: [o2] });
          const i2 = s.value.find((c) => c.name === o2);
          i2 && (i2.read = 1), d3("markRead", [o2]);
        }
        async function x3() {
          await pt("dock.api.notifications.mark_all_read"), s.value.forEach((o2) => {
            o2.read = 1;
          }), d3("markAllRead");
        }
        function C2(o2) {
          n(o2.name), o2.action_url && (window.location.href = o2.action_url), d3("close");
        }
        return (o2, i2) => (Me(), ls("div", S3, [Dt("div", G2, [Dt("span", H2, po(X(Os)("Notifications")), 1), Dt("button", { class: "text-xs text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors", onClick: x3 }, po(X(Os)("Mark all read")), 1)]), Dt("div", T2, [u3.value ? (Me(), ut(P, { key: 0 })) : f.value ? (Me(), ut(U, { key: 1, onRetry: e })) : s.value.length ? (Me(true), ls(Oe, { key: 3 }, Nl(s.value, (c) => (Me(), ut(O, { key: c.name, notification: c, "type-info": k2.value[c.notification_type], "app-color": p4.value[c.from_app], onMarkRead: n, onNavigate: C2 }, null, 8, ["notification", "type-info", "app-color"]))), 128)) : (Me(), ut(Q, { key: 2 }))]), Dt("div", U2, [Dt("a", { href: "/dock/notifications", class: "text-xs text-[var(--dock-accent)] hover:underline", onClick: i2[0] || (i2[0] = (c) => o2.$emit("close")) }, po(X(Os)("View all notifications")) + " \u2192", 1)])]));
      } }));
      P2 = { id: "dock-bell-root", class: "dock-bell relative" };
      Q2 = ["aria-expanded", "aria-label"];
      W = { key: 0, class: "absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center leading-none" };
      X2 = { name: "DockBell" };
      te = cn(__spreadProps(__spreadValues({}, X2), { setup(A2) {
        var _a, _b, _c, _d;
        const a2 = Ne(false), d3 = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) != null ? _c : window.dockBoot, t = Ne((_d = d3 == null ? void 0 : d3.unread_notifications) != null ? _d : 0), h = ye(() => t.value > 99 ? "99+" : String(t.value));
        function p4(e) {
          t.value += 1;
        }
        Xt(() => {
          var _a2;
          const e = (_a2 = window.frappe) == null ? void 0 : _a2.realtime;
          (e == null ? void 0 : e.on) && e.on("dock_notification", p4);
        }), rs(() => {
          var _a2;
          const e = (_a2 = window.frappe) == null ? void 0 : _a2.realtime;
          (e == null ? void 0 : e.off) && e.off("dock_notification", p4);
        });
        function k2(e) {
          const n = document.getElementById("dock-bell-root");
          n && !n.contains(e.target) && (a2.value = false);
        }
        Xt(() => document.addEventListener("mousedown", k2)), rs(() => document.removeEventListener("mousedown", k2));
        function s(e) {
          e.key === "Escape" && a2.value && (a2.value = false);
        }
        Xt(() => document.addEventListener("keydown", s)), rs(() => document.removeEventListener("keydown", s));
        function u3(e) {
          t.value = Math.max(0, t.value - e.length);
        }
        function f() {
          t.value = 0;
        }
        return (e, n) => (Me(), ls("div", P2, [Dt("button", { class: "relative flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", "aria-expanded": a2.value, "aria-label": t.value > 0 ? `Notifications, ${t.value} unread` : "Notifications", title: "Notifications", onClick: n[0] || (n[0] = (x3) => a2.value = !a2.value) }, [Y(X(O2), { class: "w-4 h-4" }), t.value > 0 ? (Me(), ls("span", W, po(h.value), 1)) : Ns("", true)], 8, Q2), a2.value ? (Me(), ut(J2, { key: 0, onMarkRead: u3, onMarkAllRead: f, onClose: n[1] || (n[1] = (x3) => a2.value = false) })) : Ns("", true)]));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/DockJana-DfKEJtCf.js
  var DockJana_DfKEJtCf_exports = {};
  __export(DockJana_DfKEJtCf_exports, {
    default: () => p2
  });
  var l3, i, p2;
  var init_DockJana_DfKEJtCf = __esm({
    "../dock/dock/public/js/chunks/DockJana-DfKEJtCf.js"() {
      init_dock_navbar_esm();
      l3 = zr("message-circle", [["path", { d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719", key: "1sd12s" }]]);
      i = { name: "DockJana" };
      p2 = cn(__spreadProps(__spreadValues({}, i), { setup(d3) {
        return (a2, e) => (Me(), ls("button", { class: "flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", "aria-label": "Jana", title: "Jana", onClick: e[0] || (e[0] = (u3) => a2.$emit("open")) }, [Y(X(l3), { class: "w-4 h-4" })]));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/DockAppSwitcher-BnQc3lQS.js
  var DockAppSwitcher_BnQc3lQS_exports = {};
  __export(DockAppSwitcher_BnQc3lQS_exports, {
    default: () => ve3
  });
  var T3, D2, G3, P3, q3, J3, K2, O3, U3, X3, H3, Q3, W2, Y2, Z, ee, te2, oe3, re3, ae2, se3, ne3, ce3, le3, ie3, ve3;
  var init_DockAppSwitcher_BnQc3lQS = __esm({
    "../dock/dock/public/js/chunks/DockAppSwitcher-BnQc3lQS.js"() {
      init_dock_navbar_esm();
      init_runtime_dom_esm_bundler_CKC4ttiH();
      init_x_CHOEN0ia();
      T3 = zr("check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
      D2 = zr("grid-3x3", [["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }], ["path", { d: "M3 9h18", key: "1pudct" }], ["path", { d: "M3 15h18", key: "5xshup" }], ["path", { d: "M9 3v18", key: "fh3hqa" }], ["path", { d: "M15 3v18", key: "14nvp0" }]]);
      G3 = zr("grip-vertical", [["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }], ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }], ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }], ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }], ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }], ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]]);
      P3 = zr("pencil", [["path", { d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z", key: "1a8usu" }], ["path", { d: "m15 5 4 4", key: "1mk7zo" }]]);
      q3 = { class: "text-xs font-medium text-[var(--dock-text)] leading-snug line-clamp-2" };
      J3 = { class: "text-[10px] text-[var(--dock-icon)] mt-0.5 truncate" };
      K2 = ["aria-label"];
      O3 = { name: "DockBookmarkTile" };
      U3 = cn(__spreadProps(__spreadValues({}, O3), { props: { bookmark: {}, editMode: { type: Boolean } }, emits: ["remove", "navigate"], setup(s, { emit: m }) {
        const n = m;
        function l5(r2) {
          return `/${r2.app}/${r2.doctype}/${encodeURIComponent(r2.docname)}`;
        }
        return (r2, o2) => (Me(), ls("div", { class: "relative group rounded-lg border border-[var(--dock-border)] bg-[var(--dock-bg)] overflow-hidden cursor-pointer hover:shadow-sm transition-shadow", style: zs([{ "border-top-width": "4px" }, { borderTopColor: s.bookmark.color || "var(--dock-accent)" }]), onClick: o2[1] || (o2[1] = (c) => !s.editMode && n("navigate", l5(s.bookmark))) }, [s.editMode ? (Me(), ut(X(G3), { key: 0, class: "dock-drag-handle absolute left-1 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--dock-icon)] cursor-grab" })) : Ns("", true), Dt("div", { class: $t(["px-3 py-2", s.editMode && "pl-6"]) }, [Dt("div", q3, po(s.bookmark.label), 1), Dt("div", J3, po(s.bookmark.doctype), 1)], 2), Dt("button", { class: "absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--dock-icon)] hover:text-[var(--dock-text)]", "aria-label": X(Os)("Remove bookmark"), onClick: o2[0] || (o2[0] = Rt((c) => n("remove", s.bookmark.name), ["stop"])) }, [Y(X(o), { class: "w-3 h-3" })], 8, K2)], 4));
      } }));
      X3 = { key: 0, class: "px-4 pt-3 pb-2" };
      H3 = { class: "flex items-center justify-between mb-2" };
      Q3 = { class: "text-[10px] font-semibold uppercase tracking-wider text-[var(--dock-icon)]" };
      W2 = ["aria-label"];
      Y2 = { class: "grid grid-cols-3 gap-2" };
      Z = { name: "DockBookmarks" };
      ee = cn(__spreadProps(__spreadValues({}, Z), { emits: ["close"], setup(s, { emit: m }) {
        const n = m, { bookmarks: l5, removeBookmark: r2, reorderBookmarks: o2 } = Xr(), c = Ne(false), k2 = Ne(null);
        function j3(i2) {
          k2.value = i2;
        }
        function z3(i2, d3) {
          if (i2.preventDefault(), k2.value === null || k2.value === d3)
            return;
          const p4 = l5.value.splice(k2.value, 1)[0];
          l5.value.splice(d3, 0, p4), k2.value = d3;
        }
        function N4() {
          k2.value = null;
        }
        function A2() {
          c.value = false, o2(l5.value.map((i2) => i2.name));
        }
        function V4(i2) {
          window.location.href = i2, n("close");
        }
        return (i2, d3) => X(l5).length ? (Me(), ls("div", X3, [Dt("div", H3, [Dt("span", Q3, po(X(Os)("Pinned")), 1), Dt("button", { class: "text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors", "aria-label": c.value ? X(Os)("Done editing") : X(Os)("Edit bookmarks"), onClick: d3[0] || (d3[0] = (p4) => c.value ? A2() : c.value = true) }, [c.value ? (Me(), ut(X(T3), { key: 0, class: "w-3.5 h-3.5" })) : (Me(), ut(X(P3), { key: 1, class: "w-3.5 h-3.5" }))], 8, W2)]), Dt("div", Y2, [(Me(true), ls(Oe, null, Nl(X(l5), (p4, w3) => (Me(), ut(U3, { key: p4.name, bookmark: p4, "edit-mode": c.value, draggable: c.value, onDragstart: ($2) => j3(w3), onDragover: ($2) => z3($2, w3), onDrop: N4, onRemove: X(r2), onNavigate: V4 }, null, 8, ["bookmark", "edit-mode", "draggable", "onDragstart", "onDragover", "onRemove"]))), 128))]), d3[1] || (d3[1] = Dt("div", { class: "mt-2 border-b border-[var(--dock-border)]" }, null, -1))])) : Ns("", true);
      } }));
      te2 = { class: "dock-app-switcher relative" };
      oe3 = ["aria-expanded"];
      re3 = { key: 0, class: "absolute right-0 top-full mt-2 w-72 bg-[var(--dock-bg)] border border-[var(--dock-border)] rounded-lg shadow-lg p-3 z-20", role: "menu" };
      ae2 = { class: "grid grid-cols-3 gap-2 mb-3" };
      se3 = ["href"];
      ne3 = { class: "text-xs text-[var(--dock-text)] truncate w-full text-center" };
      ce3 = { class: "border-t border-[var(--dock-border)] pt-2" };
      le3 = { href: "/app", role: "menuitem", class: "flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-sm text-[var(--dock-icon)]" };
      ie3 = { name: "DockAppSwitcher" };
      ve3 = cn(__spreadProps(__spreadValues({}, ie3), { setup(s) {
        const { registeredApps: m } = Qr(), n = Ne(false);
        return (l5, r2) => (Me(), ls("div", te2, [Dt("button", { class: "flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", "aria-expanded": n.value, "aria-haspopup": "true", "aria-label": "App switcher", title: "App switcher", onClick: r2[0] || (r2[0] = (o2) => n.value = !n.value) }, [Y(X(D2), { class: "w-4 h-4" })], 8, oe3), n.value ? (Me(), ls("div", re3, [Y(ee, { onClose: r2[1] || (r2[1] = (o2) => n.value = false) }), Dt("div", ae2, [(Me(true), ls(Oe, null, Nl(X(m), (o2) => (Me(), ls("a", { key: o2.app, href: o2.route, role: "menuitem", class: "flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-center" }, [Dt("span", { class: "w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg font-bold", style: zs({ backgroundColor: o2.color }) }, po(o2.label[0]), 5), Dt("span", ne3, po(o2.label), 1)], 8, se3))), 128))]), Dt("div", ce3, [Dt("a", le3, [Y(X(D2), { class: "w-4 h-4" }), Ui(" " + po(X(Os)("Frappe Desk")), 1)])])])) : Ns("", true)]));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/DockAvatar-CJHfgsGb.js
  var DockAvatar_CJHfgsGb_exports = {};
  __export(DockAvatar_CJHfgsGb_exports, {
    default: () => ae3
  });
  var B3, $, z2, I2, L2, N, S4, V2, A, D3, E3, T4, U4, q4, H4, F3, P4, G4, J4, O4, R2, K3, Q4, W3, X4, Y3, Z2, ee2, ae3;
  var init_DockAvatar_CJHfgsGb = __esm({
    "../dock/dock/public/js/chunks/DockAvatar-CJHfgsGb.js"() {
      init_dock_navbar_esm();
      B3 = zr("circle-user-round", [["path", { d: "M18 20a6 6 0 0 0-12 0", key: "1qehca" }], ["circle", { cx: "12", cy: "10", r: "4", key: "1h16sb" }], ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]]);
      $ = zr("log-out", [["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }], ["path", { d: "M21 12H9", key: "dn1m92" }], ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]]);
      z2 = zr("monitor", [["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }], ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }], ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]]);
      I2 = zr("moon", [["path", { d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401", key: "kfwtm" }]]);
      L2 = zr("sun", [["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }], ["path", { d: "M12 2v2", key: "tus03m" }], ["path", { d: "M12 20v2", key: "1lh1kg" }], ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }], ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }], ["path", { d: "M2 12h2", key: "1t8f8n" }], ["path", { d: "M20 12h2", key: "1q8mjw" }], ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }], ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]]);
      N = { class: "dock-avatar relative" };
      S4 = ["aria-expanded"];
      V2 = ["src", "alt"];
      A = { key: 2 };
      D3 = { key: 0, class: "absolute right-0 top-full mt-2 w-56 bg-[var(--dock-bg)] border border-[var(--dock-border)] rounded-lg shadow-lg py-1 z-20", role: "menu" };
      E3 = { class: "px-3 py-2 border-b border-[var(--dock-border)]" };
      T4 = { class: "text-sm font-medium text-[var(--dock-text)] truncate" };
      U4 = { class: "text-xs text-[var(--dock-icon)] truncate" };
      q4 = { class: "py-1 border-b border-[var(--dock-border)]" };
      H4 = ["href"];
      F3 = { href: "/dock/settings", role: "menuitem", class: "block px-3 py-1.5 text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors" };
      P4 = { key: 0, class: "py-1 border-b border-[var(--dock-border)]" };
      G4 = { key: 0, href: "/app/ft-timer", role: "menuitem", class: "block px-3 py-1.5 text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors" };
      J4 = { key: 1, href: "/dock/guest/sessions", role: "menuitem", class: "block px-3 py-1.5 text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors" };
      O4 = { href: "/dock/people", role: "menuitem", class: "block px-3 py-1.5 text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors" };
      R2 = { class: "px-3 py-2 border-b border-[var(--dock-border)]" };
      K3 = { class: "flex gap-1 bg-black/5 dark:bg-white/10 rounded-full p-1" };
      Q4 = ["aria-pressed", "title"];
      W3 = ["aria-pressed", "title"];
      X4 = ["aria-pressed", "title"];
      Y3 = { class: "py-1" };
      Z2 = { href: "/app/logout", role: "menuitem", class: "flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-black/5 dark:hover:bg-white/10 transition-colors" };
      ee2 = { name: "DockAvatar" };
      ae3 = cn(__spreadProps(__spreadValues({}, ee2), { setup(te4) {
        var _a, _b, _c, _d, _e4;
        const k2 = Ne(false), r2 = ye(() => {
          var _a2, _b2, _c2;
          return (_c2 = (_a2 = window.frappe) == null ? void 0 : _a2.session) != null ? _c2 : (_b2 = window.dockBoot) == null ? void 0 : _b2.session;
        }), p4 = ye(() => {
          var _a2, _b2;
          return (((_a2 = r2.value) == null ? void 0 : _a2.user_fullname) || ((_b2 = r2.value) == null ? void 0 : _b2.user) || "?").split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
        }), b2 = (_d = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) != null ? _b : window.dockBoot) == null ? void 0 : _c.installed_apps) != null ? _d : [], y2 = b2.includes("frappe_time"), _2 = b2.includes("frame"), l5 = Ne((_e4 = localStorage.getItem("dock-theme")) != null ? _e4 : "system");
        function m(d3) {
          l5.value = d3, localStorage.setItem("dock-theme", d3);
          const s = d3 === "dark" || d3 === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches;
          document.documentElement.classList.toggle("dark", s), pt("dock.api.settings.save_user_preference", { values: { theme: d3 } }).catch(() => {
          });
        }
        return (d3, s) => {
          var _a2, _b2, _c2, _d2, _e5;
          return Me(), ls("div", N, [Dt("button", { class: "w-8 h-8 rounded-full bg-black/10 dark:bg-white/20 hover:bg-black/15 dark:hover:bg-white/30 transition-colors flex items-center justify-center text-[var(--dock-text)] text-xs font-semibold overflow-hidden", "aria-expanded": k2.value, "aria-haspopup": "true", "aria-label": "User menu", title: "User menu", onClick: s[0] || (s[0] = (v) => k2.value = !k2.value) }, [((_a2 = r2.value) == null ? void 0 : _a2.user_image) ? (Me(), ls("img", { key: 0, src: r2.value.user_image, alt: (_b2 = r2.value) == null ? void 0 : _b2.user_fullname, class: "w-8 h-8 object-cover" }, null, 8, V2)) : !p4.value || p4.value === "?" ? (Me(), ut(X(B3), { key: 1, class: "w-5 h-5 text-[var(--dock-icon)]" })) : (Me(), ls("span", A, po(p4.value), 1))], 8, S4), k2.value ? (Me(), ls("div", D3, [Dt("div", E3, [Dt("p", T4, po((_c2 = r2.value) == null ? void 0 : _c2.user_fullname), 1), Dt("p", U4, po((_d2 = r2.value) == null ? void 0 : _d2.user), 1)]), Dt("div", q4, [Dt("a", { href: `/app/user/${(_e5 = r2.value) == null ? void 0 : _e5.user}`, role: "menuitem", class: "block px-3 py-1.5 text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors" }, po(X(Os)("My Profile")), 9, H4), Dt("a", F3, po(X(Os)("Preferences")), 1)]), X(y2) || X(_2) ? (Me(), ls("div", P4, [X(y2) ? (Me(), ls("a", G4, po(X(Os)("Time")), 1)) : Ns("", true), X(_2) ? (Me(), ls("a", J4, po(X(Os)("Frame")), 1)) : Ns("", true), Dt("a", O4, po(X(Os)("Ecosystem Apps")), 1)])) : Ns("", true), Dt("div", R2, [Dt("div", K3, [Dt("button", { class: $t([l5.value === "light" ? "bg-[var(--dock-bg)] shadow-sm text-[var(--dock-text)]" : "text-[var(--dock-icon)] hover:text-[var(--dock-text)]", "flex-1 flex items-center justify-center rounded-full p-1 transition-all"]), "aria-pressed": l5.value === "light", title: X(Os)("Light"), onClick: s[1] || (s[1] = (v) => m("light")) }, [Y(X(L2), { class: "w-4 h-4" })], 10, Q4), Dt("button", { class: $t([l5.value === "system" ? "bg-[var(--dock-bg)] shadow-sm text-[var(--dock-text)]" : "text-[var(--dock-icon)] hover:text-[var(--dock-text)]", "flex-1 flex items-center justify-center rounded-full p-1 transition-all"]), "aria-pressed": l5.value === "system", title: X(Os)("System"), onClick: s[2] || (s[2] = (v) => m("system")) }, [Y(X(z2), { class: "w-4 h-4" })], 10, W3), Dt("button", { class: $t([l5.value === "dark" ? "bg-[var(--dock-bg)] shadow-sm text-[var(--dock-text)]" : "text-[var(--dock-icon)] hover:text-[var(--dock-text)]", "flex-1 flex items-center justify-center rounded-full p-1 transition-all"]), "aria-pressed": l5.value === "dark", title: X(Os)("Dark"), onClick: s[3] || (s[3] = (v) => m("dark")) }, [Y(X(I2), { class: "w-4 h-4" })], 10, X4)])]), Dt("div", Y3, [Dt("a", Z2, [Y(X($), { class: "w-4 h-4" }), Ui(" " + po(X(Os)("Log out")), 1)])])])) : Ns("", true)]);
        };
      } }));
    }
  });

  // ../dock/dock/public/js/dock-navbar.esm.js
  function Ws(e) {
    const t = /* @__PURE__ */ Object.create(null);
    for (const s of e.split(","))
      t[s] = 1;
    return (s) => s in t;
  }
  function zs(e) {
    if (F4(e)) {
      const t = {};
      for (let s = 0; s < e.length; s++) {
        const n = e[s], r2 = oe4(n) ? uo(n) : zs(n);
        if (r2)
          for (const o2 in r2)
            t[o2] = r2[o2];
      }
      return t;
    } else if (oe4(e) || N2(e))
      return e;
  }
  function uo(e) {
    const t = {};
    return e.replace(fo, "").split(lo).forEach((s) => {
      if (s) {
        const n = s.split(co);
        n.length > 1 && (t[n[0].trim()] = n[1].trim());
      }
    }), t;
  }
  function $t(e) {
    let t = "";
    if (oe4(e))
      t = e;
    else if (F4(e))
      for (let s = 0; s < e.length; s++) {
        const n = $t(e[s]);
        n && (t += n + " ");
      }
    else if (N2(e))
      for (const s in e)
        e[s] && (t += s + " ");
    return t.trim();
  }
  function jl(e) {
    return !!e || e === "";
  }
  function ho(e, t) {
    if (e.length !== t.length)
      return false;
    let s = true;
    for (let n = 0; s && n < e.length; n++)
      s = ds(e[n], t[n]);
    return s;
  }
  function ds(e, t) {
    if (e === t)
      return true;
    let s = xn(e), n = xn(t);
    if (s || n)
      return s && n ? e.getTime() === t.getTime() : false;
    if (s = Ue2(e), n = Ue2(t), s || n)
      return e === t;
    if (s = F4(e), n = F4(t), s || n)
      return s && n ? ho(e, t) : false;
    if (s = N2(e), n = N2(t), s || n) {
      if (!s || !n)
        return false;
      const r2 = Object.keys(e).length, o2 = Object.keys(t).length;
      if (r2 !== o2)
        return false;
      for (const i2 in e) {
        const l5 = e.hasOwnProperty(i2), c = t.hasOwnProperty(i2);
        if (l5 && !c || !l5 && c || !ds(e[i2], t[i2]))
          return false;
      }
    }
    return String(e) === String(t);
  }
  function _o() {
    return de3;
  }
  function or(e, t = false) {
    if (e.flags |= 8, t) {
      e.next = Tt, Tt = e;
      return;
    }
    e.next = kt, kt = e;
  }
  function Zs() {
    rr++;
  }
  function Xs() {
    if (--rr > 0)
      return;
    if (Tt) {
      let t = Tt;
      for (Tt = void 0; t; ) {
        const s = t.next;
        t.next = void 0, t.flags &= -9, t = s;
      }
    }
    let e;
    for (; kt; ) {
      let t = kt;
      for (kt = void 0; t; ) {
        const s = t.next;
        if (t.next = void 0, t.flags &= -9, t.flags & 1)
          try {
            t.trigger();
          } catch (n) {
            e || (e = n);
          }
        t = s;
      }
    }
    if (e)
      throw e;
  }
  function ir(e) {
    for (let t = e.deps; t; t = t.nextDep)
      t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
  }
  function lr(e) {
    let t, s = e.depsTail, n = s;
    for (; n; ) {
      const r2 = n.prevDep;
      n.version === -1 ? (n === s && (s = r2), Qs(n), mo(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = r2;
    }
    e.deps = t, e.depsTail = s;
  }
  function Rs(e) {
    for (let t = e.deps; t; t = t.nextDep)
      if (t.dep.version !== t.version || t.dep.computed && (cr(t.dep.computed) || t.dep.version !== t.version))
        return true;
    return !!e._dirty;
  }
  function cr(e) {
    if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ot) || (e.globalVersion = Ot, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Rs(e))))
      return;
    e.flags |= 2;
    const t = e.dep, s = J5, n = ve4;
    J5 = e, ve4 = true;
    try {
      ir(e);
      const r2 = e.fn(e._value);
      (t.version === 0 || Ie2(r2, e._value)) && (e.flags |= 128, e._value = r2, t.version++);
    } catch (r2) {
      throw t.version++, r2;
    } finally {
      J5 = s, ve4 = n, lr(e), e.flags &= -3;
    }
  }
  function Qs(e, t = false) {
    const { dep: s, prevSub: n, nextSub: r2 } = e;
    if (n && (n.nextSub = r2, e.prevSub = void 0), r2 && (r2.prevSub = n, e.nextSub = void 0), s.subs === e && (s.subs = n, !n && s.computed)) {
      s.computed.flags &= -5;
      for (let o2 = s.computed.deps; o2; o2 = o2.nextDep)
        Qs(o2, true);
    }
    !t && !--s.sc && s.map && s.map.delete(s.key);
  }
  function mo(e) {
    const { prevDep: t, nextDep: s } = e;
    t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
  }
  function Ke() {
    fr.push(ve4), ve4 = false;
  }
  function We() {
    const e = fr.pop();
    ve4 = e === void 0 ? true : e;
  }
  function kn(e) {
    const { cleanup: t } = e;
    if (e.cleanup = void 0, t) {
      const s = J5;
      J5 = void 0;
      try {
        t();
      } finally {
        J5 = s;
      }
    }
  }
  function ur(e) {
    if (e.dep.sc++, e.sub.flags & 4) {
      const t = e.dep.computed;
      if (t && !e.dep.subs) {
        t.flags |= 20;
        for (let n = t.deps; n; n = n.nextDep)
          ur(n);
      }
      const s = e.dep.subs;
      s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
    }
  }
  function se4(e, t, s) {
    if (ve4 && J5) {
      let n = Is.get(e);
      n || Is.set(e, n = /* @__PURE__ */ new Map());
      let r2 = n.get(s);
      r2 || (n.set(s, r2 = new en()), r2.map = n, r2.key = s), r2.track();
    }
  }
  function Be3(e, t, s, n, r2, o2) {
    const i2 = Is.get(e);
    if (!i2) {
      Ot++;
      return;
    }
    const l5 = (c) => {
      c && c.trigger();
    };
    if (Zs(), t === "clear")
      i2.forEach(l5);
    else {
      const c = F4(e), d3 = c && Gs(s);
      if (c && s === "length") {
        const u3 = Number(n);
        i2.forEach((h, b2) => {
          (b2 === "length" || b2 === Rt2 || !Ue2(b2) && b2 >= u3) && l5(h);
        });
      } else
        switch ((s !== void 0 || i2.has(void 0)) && l5(i2.get(s)), d3 && l5(i2.get(Rt2)), t) {
          case "add":
            c ? d3 && l5(i2.get("length")) : (l5(i2.get(st)), lt(e) && l5(i2.get(Ms)));
            break;
          case "delete":
            c || (l5(i2.get(st)), lt(e) && l5(i2.get(Ms)));
            break;
          case "set":
            lt(e) && l5(i2.get(st));
            break;
        }
    }
    Xs();
  }
  function rt(e) {
    const t = H5(e);
    return t === e ? t : (se4(t, "iterate", Rt2), be3(e) ? t : t.map(xe3));
  }
  function hs(e) {
    return se4(e = H5(e), "iterate", Rt2), e;
  }
  function Pe(e, t) {
    return qe2(e) ? at(nt(e) ? xe3(t) : t) : xe3(t);
  }
  function Ts(e, t, s) {
    const n = hs(e), r2 = n[t]();
    return n !== e && !be3(e) && (r2._next = r2.next, r2.next = () => {
      const o2 = r2._next();
      return o2.done || (o2.value = s(o2.value)), o2;
    }), r2;
  }
  function je2(e, t, s, n, r2, o2) {
    const i2 = hs(e), l5 = i2 !== e && !be3(e), c = i2[t];
    if (c !== vo[t]) {
      const h = c.apply(e, o2);
      return l5 ? xe3(h) : h;
    }
    let d3 = s;
    i2 !== e && (l5 ? d3 = function(h, b2) {
      return s.call(this, Pe(e, h), b2, e);
    } : s.length > 2 && (d3 = function(h, b2) {
      return s.call(this, h, b2, e);
    }));
    const u3 = c.call(i2, d3, n);
    return l5 && r2 ? r2(u3) : u3;
  }
  function Tn(e, t, s, n) {
    const r2 = hs(e), o2 = r2 !== e && !be3(e);
    let i2 = s, l5 = false;
    r2 !== e && (o2 ? (l5 = n.length === 0, i2 = function(d3, u3, h) {
      return l5 && (l5 = false, d3 = Pe(e, d3)), s.call(this, d3, Pe(e, u3), h, e);
    }) : s.length > 3 && (i2 = function(d3, u3, h) {
      return s.call(this, d3, u3, h, e);
    }));
    const c = r2[t](i2, ...n);
    return l5 ? Pe(e, c) : c;
  }
  function Ss(e, t, s) {
    const n = H5(e);
    se4(n, "iterate", Rt2);
    const r2 = n[t](...s);
    return (r2 === -1 || r2 === false) && rn(s[0]) ? (s[0] = H5(s[0]), n[t](...s)) : r2;
  }
  function yt(e, t, s = []) {
    Ke(), Zs();
    const n = H5(e)[t].apply(e, s);
    return Xs(), We(), n;
  }
  function wo(e) {
    Ue2(e) || (e = String(e));
    const t = H5(this);
    return se4(t, "has", e), t.hasOwnProperty(e);
  }
  function Ao(e, t, s) {
    return function(...n) {
      const r2 = this.__v_raw, o2 = H5(r2), i2 = lt(o2), l5 = e === "entries" || e === Symbol.iterator && i2, c = e === "keys" && i2, d3 = r2[e](...n), u3 = s ? Ds : t ? at : xe3;
      return !t && se4(o2, "iterate", c ? Ms : st), re4(Object.create(d3), { next() {
        const { value: h, done: b2 } = d3.next();
        return b2 ? { value: h, done: b2 } : { value: l5 ? [u3(h[0]), u3(h[1])] : u3(h), done: b2 };
      } });
    };
  }
  function qt(e) {
    return function(...t) {
      return e === "delete" ? false : e === "clear" ? void 0 : this;
    };
  }
  function Co(e, t) {
    const s = { get(r2) {
      const o2 = this.__v_raw, i2 = H5(o2), l5 = H5(r2);
      e || (Ie2(r2, l5) && se4(i2, "get", r2), se4(i2, "get", l5));
      const { has: c } = Wt(i2), d3 = t ? Ds : e ? at : xe3;
      if (c.call(i2, r2))
        return d3(o2.get(r2));
      if (c.call(i2, l5))
        return d3(o2.get(l5));
      o2 !== i2 && o2.get(r2);
    }, get size() {
      const r2 = this.__v_raw;
      return !e && se4(H5(r2), "iterate", st), r2.size;
    }, has(r2) {
      const o2 = this.__v_raw, i2 = H5(o2), l5 = H5(r2);
      return e || (Ie2(r2, l5) && se4(i2, "has", r2), se4(i2, "has", l5)), r2 === l5 ? o2.has(r2) : o2.has(r2) || o2.has(l5);
    }, forEach(r2, o2) {
      const i2 = this, l5 = i2.__v_raw, c = H5(l5), d3 = t ? Ds : e ? at : xe3;
      return !e && se4(c, "iterate", st), l5.forEach((u3, h) => r2.call(o2, d3(u3), d3(h), i2));
    } };
    return re4(s, e ? { add: qt("add"), set: qt("set"), delete: qt("delete"), clear: qt("clear") } : { add(r2) {
      const o2 = H5(this), i2 = Wt(o2), l5 = H5(r2), c = !t && !be3(r2) && !qe2(r2) ? l5 : r2;
      return i2.has.call(o2, c) || Ie2(r2, c) && i2.has.call(o2, r2) || Ie2(l5, c) && i2.has.call(o2, l5) || (o2.add(c), Be3(o2, "add", c, c)), this;
    }, set(r2, o2) {
      !t && !be3(o2) && !qe2(o2) && (o2 = H5(o2));
      const i2 = H5(this), { has: l5, get: c } = Wt(i2);
      let d3 = l5.call(i2, r2);
      d3 || (r2 = H5(r2), d3 = l5.call(i2, r2));
      const u3 = c.call(i2, r2);
      return i2.set(r2, o2), d3 ? Ie2(o2, u3) && Be3(i2, "set", r2, o2) : Be3(i2, "add", r2, o2), this;
    }, delete(r2) {
      const o2 = H5(this), { has: i2, get: l5 } = Wt(o2);
      let c = i2.call(o2, r2);
      c || (r2 = H5(r2), c = i2.call(o2, r2)), l5 && l5.call(o2, r2);
      const d3 = o2.delete(r2);
      return c && Be3(o2, "delete", r2, void 0), d3;
    }, clear() {
      const r2 = H5(this), o2 = r2.size !== 0, i2 = r2.clear();
      return o2 && Be3(r2, "clear", void 0, void 0), i2;
    } }), ["keys", "values", "entries", Symbol.iterator].forEach((r2) => {
      s[r2] = Ao(r2, e, t);
    }), s;
  }
  function tn(e, t) {
    const s = Co(e, t);
    return (n, r2, o2) => r2 === "__v_isReactive" ? !e : r2 === "__v_isReadonly" ? e : r2 === "__v_raw" ? n : Reflect.get(B4(s, r2) && r2 in n ? s : n, r2, o2);
  }
  function Mo(e) {
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
  function Do(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Mo(no(e));
  }
  function sn(e) {
    return qe2(e) ? e : nn(e, false, To, Po, pr);
  }
  function Fo(e) {
    return nn(e, false, Eo, Oo, gr);
  }
  function Fs(e) {
    return nn(e, true, So, Ro, _r);
  }
  function nn(e, t, s, n, r2) {
    if (!N2(e) || e.__v_raw && !(t && e.__v_isReactive))
      return e;
    const o2 = Do(e);
    if (o2 === 0)
      return e;
    const i2 = r2.get(e);
    if (i2)
      return i2;
    const l5 = new Proxy(e, o2 === 2 ? n : s);
    return r2.set(e, l5), l5;
  }
  function nt(e) {
    return qe2(e) ? nt(e.__v_raw) : !!(e && e.__v_isReactive);
  }
  function qe2(e) {
    return !!(e && e.__v_isReadonly);
  }
  function be3(e) {
    return !!(e && e.__v_isShallow);
  }
  function rn(e) {
    return e ? !!e.__v_raw : false;
  }
  function H5(e) {
    const t = e && e.__v_raw;
    return t ? H5(t) : e;
  }
  function jo(e) {
    return !B4(e, "__v_skip") && Object.isExtensible(e) && er(e, "__v_skip", true), e;
  }
  function ne4(e) {
    return e ? e.__v_isRef === true : false;
  }
  function Ne(e) {
    return mr(e, false);
  }
  function mr(e, t) {
    return ne4(e) ? e : new $o(e, t);
  }
  function X(e) {
    return ne4(e) ? e.value : e;
  }
  function yr(e) {
    return nt(e) ? e : new Proxy(e, Lo);
  }
  function Bo(e, t, s = false) {
    let n, r2;
    return j2(e) ? n = e : (n = e.get, r2 = e.set), new Ho(n, r2, s);
  }
  function Vo(e, t = false, s = tt) {
    if (s) {
      let n = es.get(s);
      n || es.set(s, n = []), n.push(e);
    }
  }
  function No(e, t, s = K4) {
    const { immediate: n, deep: r2, once: o2, scheduler: i2, augmentJob: l5, call: c } = s, d3 = (C2) => r2 ? C2 : be3(C2) || r2 === false || r2 === 0 ? Ve2(C2, 1) : Ve2(C2);
    let u3, h, b2, k2, S5 = false, v = false;
    if (ne4(e) ? (h = () => e.value, S5 = be3(e)) : nt(e) ? (h = () => d3(e), S5 = true) : F4(e) ? (v = true, S5 = e.some((C2) => nt(C2) || be3(C2)), h = () => e.map((C2) => {
      if (ne4(C2))
        return C2.value;
      if (nt(C2))
        return d3(C2);
      if (j2(C2))
        return c ? c(C2, 2) : C2();
    })) : j2(e) ? t ? h = c ? () => c(e, 2) : e : h = () => {
      if (b2) {
        Ke();
        try {
          b2();
        } finally {
          We();
        }
      }
      const C2 = tt;
      tt = u3;
      try {
        return c ? c(e, 3, [k2]) : e(k2);
      } finally {
        tt = C2;
      }
    } : h = De3, t && r2) {
      const C2 = h, $2 = r2 === true ? 1 / 0 : r2;
      h = () => Ve2(C2(), $2);
    }
    const D4 = _o(), R4 = () => {
      u3.stop(), D4 && D4.active && Js(D4.effects, u3);
    };
    if (o2 && t) {
      const C2 = t;
      t = (...$2) => {
        C2(...$2), R4();
      };
    }
    let A2 = v ? new Array(e.length).fill(Jt) : Jt;
    const I4 = (C2) => {
      if (!(!(u3.flags & 1) || !u3.dirty && !C2))
        if (t) {
          const $2 = u3.run();
          if (r2 || S5 || (v ? $2.some((U5, G5) => Ie2(U5, A2[G5])) : Ie2($2, A2))) {
            b2 && b2();
            const U5 = tt;
            tt = u3;
            try {
              const G5 = [$2, A2 === Jt ? void 0 : v && A2[0] === Jt ? [] : A2, k2];
              A2 = $2, c ? c(t, 3, G5) : t(...G5);
            } finally {
              tt = U5;
            }
          }
        } else
          u3.run();
    };
    return l5 && l5(I4), u3 = new nr(h), u3.scheduler = i2 ? () => i2(I4, false) : I4, k2 = (C2) => Vo(C2, false, u3), b2 = u3.onStop = () => {
      const C2 = es.get(u3);
      if (C2) {
        if (c)
          c(C2, 4);
        else
          for (const $2 of C2)
            $2();
        es.delete(u3);
      }
    }, t ? n ? I4(true) : A2 = u3.run() : i2 ? i2(I4.bind(null, true), true) : u3.run(), R4.pause = u3.pause.bind(u3), R4.resume = u3.resume.bind(u3), R4.stop = R4, R4;
  }
  function Ve2(e, t = 1 / 0, s) {
    if (t <= 0 || !N2(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
      return e;
    if (s.set(e, t), t--, ne4(e))
      Ve2(e.value, t, s);
    else if (F4(e))
      for (let n = 0; n < e.length; n++)
        Ve2(e[n], t, s);
    else if (zn(e) || lt(e))
      e.forEach((n) => {
        Ve2(n, t, s);
      });
    else if (Qn(e)) {
      for (const n in e)
        Ve2(e[n], t, s);
      for (const n of Object.getOwnPropertySymbols(e))
        Object.prototype.propertyIsEnumerable.call(e, n) && Ve2(e[n], t, s);
    }
    return e;
  }
  function Lt(e, t, s, n) {
    try {
      return n ? e(...n) : e();
    } catch (r2) {
      Ht(r2, t, s);
    }
  }
  function Je(e, t, s, n) {
    if (j2(e)) {
      const r2 = Lt(e, t, s, n);
      return r2 && Zn(r2) && r2.catch((o2) => {
        Ht(o2, t, s);
      }), r2;
    }
    if (F4(e)) {
      const r2 = [];
      for (let o2 = 0; o2 < e.length; o2++)
        r2.push(Je(e[o2], t, s, n));
      return r2;
    }
  }
  function Ht(e, t, s, n = true) {
    const r2 = t ? t.vnode : null, { errorHandler: o2, throwUnhandledErrorInProduction: i2 } = t && t.appContext.config || K4;
    if (t) {
      let l5 = t.parent;
      const c = t.proxy, d3 = `https://vuejs.org/error-reference/#runtime-${s}`;
      for (; l5; ) {
        const u3 = l5.ec;
        if (u3) {
          for (let h = 0; h < u3.length; h++)
            if (u3[h](e, c, d3) === false)
              return;
        }
        l5 = l5.parent;
      }
      if (o2) {
        Ke(), Lt(o2, null, 10, [e, c, d3]), We();
        return;
      }
    }
    Uo(e, s, r2, n, i2);
  }
  function Uo(e, t, s, n = true, r2 = false) {
    if (r2)
      throw e;
    console.error(e);
  }
  function Ko(e) {
    const t = ts || br;
    return e ? t.then(this ? e.bind(this) : e) : t;
  }
  function Wo(e) {
    let t = Ce3 + 1, s = fe3.length;
    for (; t < s; ) {
      const n = t + s >>> 1, r2 = fe3[n], o2 = It2(r2);
      o2 < e || o2 === e && r2.flags & 2 ? t = n + 1 : s = n;
    }
    return t;
  }
  function on(e) {
    if (!(e.flags & 1)) {
      const t = It2(e), s = fe3[fe3.length - 1];
      !s || !(e.flags & 2) && t >= It2(s) ? fe3.push(e) : fe3.splice(Wo(t), 0, e), e.flags |= 1, vr();
    }
  }
  function vr() {
    ts || (ts = br.then(wr));
  }
  function qo(e) {
    F4(e) ? ct.push(...e) : Ye && e.id === -1 ? Ye.splice(ot + 1, 0, e) : e.flags & 1 || (ct.push(e), e.flags |= 1), vr();
  }
  function Sn(e, t, s = Ce3 + 1) {
    for (; s < fe3.length; s++) {
      const n = fe3[s];
      if (n && n.flags & 2) {
        if (e && n.id !== e.uid)
          continue;
        fe3.splice(s, 1), s--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
      }
    }
  }
  function xr(e) {
    if (ct.length) {
      const t = [...new Set(ct)].sort((s, n) => It2(s) - It2(n));
      if (ct.length = 0, Ye) {
        Ye.push(...t);
        return;
      }
      for (Ye = t, ot = 0; ot < Ye.length; ot++) {
        const s = Ye[ot];
        s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
      }
      Ye = null, ot = 0;
    }
  }
  function wr(e) {
    try {
      for (Ce3 = 0; Ce3 < fe3.length; Ce3++) {
        const t = fe3[Ce3];
        t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Lt(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
      }
    } finally {
      for (; Ce3 < fe3.length; Ce3++) {
        const t = fe3[Ce3];
        t && (t.flags &= -2);
      }
      Ce3 = -1, fe3.length = 0, xr(), ts = null, (fe3.length || ct.length) && wr();
    }
  }
  function ss(e) {
    const t = ge3;
    return ge3 = e, kr = e && e.type.__scopeId || null, t;
  }
  function Jo(e, t = ge3, s) {
    if (!t || e._n)
      return e;
    const n = (...r2) => {
      n._d && is(-1);
      const o2 = ss(t);
      let i2;
      try {
        i2 = e(...r2);
      } finally {
        ss(o2), n._d && is(1);
      }
      return i2;
    };
    return n._n = true, n._c = true, n._d = true, n;
  }
  function Hl(e, t) {
    if (ge3 === null)
      return e;
    const s = ms(ge3), n = e.dirs || (e.dirs = []);
    for (let r2 = 0; r2 < t.length; r2++) {
      let [o2, i2, l5, c = K4] = t[r2];
      o2 && (j2(o2) && (o2 = { mounted: o2, updated: o2 }), o2.deep && Ve2(i2), n.push({ dir: o2, instance: s, value: i2, oldValue: void 0, arg: l5, modifiers: c }));
    }
    return e;
  }
  function Qe(e, t, s, n) {
    const r2 = e.dirs, o2 = t && t.dirs;
    for (let i2 = 0; i2 < r2.length; i2++) {
      const l5 = r2[i2];
      o2 && (l5.oldValue = o2[i2].value);
      let c = l5.dir[n];
      c && (Ke(), Je(c, s, 8, [e.el, l5, e, t]), We());
    }
  }
  function Go(e, t) {
    if (ee3) {
      let s = ee3.provides;
      const n = ee3.parent && ee3.parent.provides;
      n === s && (s = ee3.provides = Object.create(n)), s[e] = t;
    }
  }
  function zt(e, t, s = false) {
    const n = Gi();
    if (n || ft) {
      let r2 = ft ? ft._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
      if (r2 && e in r2)
        return r2[e];
      if (arguments.length > 1)
        return s && j2(t) ? t.call(n && n.proxy) : t;
    }
  }
  function Es(e, t, s) {
    return Tr(e, t, s);
  }
  function Tr(e, t, s = K4) {
    const { immediate: n, deep: r2, flush: o2, once: i2 } = s, l5 = re4({}, s), c = t && n || !t && o2 !== "post";
    let d3;
    if (ht) {
      if (o2 === "sync") {
        const k2 = zo();
        d3 = k2.__watcherHandles || (k2.__watcherHandles = []);
      } else if (!c) {
        const k2 = () => {
        };
        return k2.stop = De3, k2.resume = De3, k2.pause = De3, k2;
      }
    }
    const u3 = ee3;
    l5.call = (k2, S5, v) => Je(k2, u3, S5, v);
    let h = false;
    o2 === "post" ? l5.scheduler = (k2) => {
      te3(k2, u3 && u3.suspense);
    } : o2 !== "sync" && (h = true, l5.scheduler = (k2, S5) => {
      S5 ? k2() : on(k2);
    }), l5.augmentJob = (k2) => {
      t && (k2.flags |= 4), h && (k2.flags |= 2, u3 && (k2.id = u3.uid, k2.i = u3));
    };
    const b2 = No(e, t, l5);
    return ht && (d3 ? d3.push(b2) : c && b2()), b2;
  }
  function Zo(e, t, s) {
    const n = this.proxy, r2 = oe4(e) ? e.includes(".") ? Sr(n, e) : () => n[e] : e.bind(n, n);
    let o2;
    j2(t) ? o2 = t : (o2 = t.handler, s = t);
    const i2 = Bt(this), l5 = Tr(r2, o2.bind(n), s);
    return i2(), l5;
  }
  function Sr(e, t) {
    const s = t.split(".");
    return () => {
      let n = e;
      for (let r2 = 0; r2 < s.length && n; r2++)
        n = n[s[r2]];
      return n;
    };
  }
  function Gt(e, t, s, { o: { insert: n }, m: r2 }, o2 = 2) {
    o2 === 0 && n(e.targetAnchor, t, s);
    const { el: i2, anchor: l5, shapeFlag: c, children: d3, props: u3 } = e, h = o2 === 2;
    if (h && n(i2, t, s), (!h || St(u3)) && c & 16)
      for (let b2 = 0; b2 < d3.length; b2++)
        r2(d3[b2], t, s, 2);
    h && n(l5, t, s);
  }
  function Qo(e, t, s, n, r2, o2, { o: { nextSibling: i2, parentNode: l5, querySelector: c, insert: d3, createText: u3 } }, h) {
    function b2(D4, R4) {
      let A2 = R4;
      for (; A2; ) {
        if (A2 && A2.nodeType === 8) {
          if (A2.data === "teleport start anchor")
            t.targetStart = A2;
          else if (A2.data === "teleport anchor") {
            t.targetAnchor = A2, D4._lpa = t.targetAnchor && i2(t.targetAnchor);
            break;
          }
        }
        A2 = i2(A2);
      }
    }
    function k2(D4, R4) {
      R4.anchor = h(i2(D4), R4, l5(D4), s, n, r2, o2);
    }
    const S5 = t.target = js(t.props, c), v = St(t.props);
    if (S5) {
      const D4 = S5._lpa || S5.firstChild;
      t.shapeFlag & 16 && (v ? (k2(e, t), b2(S5, D4), t.targetAnchor || $s(S5, t, u3, d3, l5(e) === S5 ? e : null)) : (t.anchor = i2(e), b2(S5, D4), t.targetAnchor || $s(S5, t, u3, d3), h(D4 && i2(D4), t, S5, s, n, r2, o2))), Zt(t, v);
    } else
      v && t.shapeFlag & 16 && (k2(e, t), t.targetStart = e, t.targetAnchor = i2(e));
    return t.anchor && i2(t.anchor);
  }
  function Zt(e, t) {
    const s = e.ctx;
    if (s && s.ut) {
      let n, r2;
      for (t ? (n = e.el, r2 = e.anchor) : (n = e.targetStart, r2 = e.targetAnchor); n && n !== r2; )
        n.nodeType === 1 && n.setAttribute("data-v-owner", s.uid), n = n.nextSibling;
      s.ut();
    }
  }
  function $s(e, t, s, n, r2 = null) {
    const o2 = t.targetStart = s(""), i2 = t.targetAnchor = s("");
    return o2[Er] = i2, e && (n(o2, e, r2), n(i2, e, r2)), i2;
  }
  function ln(e, t) {
    e.shapeFlag & 6 && e.component ? (e.transition = t, ln(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
  }
  function cn(e, t) {
    return j2(e) ? re4({ name: e.name }, t, { setup: e }) : e;
  }
  function fn(e) {
    e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
  }
  function Pn(e, t) {
    let s;
    return !!((s = Object.getOwnPropertyDescriptor(e, t)) && !s.configurable);
  }
  function Et(e, t, s, n, r2 = false) {
    if (F4(e)) {
      e.forEach((v, D4) => Et(v, t && (F4(t) ? t[D4] : t), s, n, r2));
      return;
    }
    if (At(n) && !r2) {
      n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && Et(e, t, s, n.component.subTree);
      return;
    }
    const o2 = n.shapeFlag & 4 ? ms(n.component) : n.el, i2 = r2 ? null : o2, { i: l5, r: c } = e, d3 = t && t.r, u3 = l5.refs === K4 ? l5.refs = {} : l5.refs, h = l5.setupState, b2 = H5(h), k2 = h === K4 ? Gn : (v) => Pn(u3, v) ? false : B4(b2, v), S5 = (v, D4) => !(D4 && Pn(u3, D4));
    if (d3 != null && d3 !== c) {
      if (On(t), oe4(d3))
        u3[d3] = null, k2(d3) && (h[d3] = null);
      else if (ne4(d3)) {
        const v = t;
        S5(d3, v.k) && (d3.value = null), v.k && (u3[v.k] = null);
      }
    }
    if (j2(c))
      Lt(c, l5, 12, [i2, u3]);
    else {
      const v = oe4(c), D4 = ne4(c);
      if (v || D4) {
        const R4 = () => {
          if (e.f) {
            const A2 = v ? k2(c) ? h[c] : u3[c] : S5() || !e.k ? c.value : u3[e.k];
            if (r2)
              F4(A2) && Js(A2, o2);
            else if (F4(A2))
              A2.includes(o2) || A2.push(o2);
            else if (v)
              u3[c] = [o2], k2(c) && (h[c] = u3[c]);
            else {
              const I4 = [o2];
              S5(c, e.k) && (c.value = I4), e.k && (u3[e.k] = I4);
            }
          } else
            v ? (u3[c] = i2, k2(c) && (h[c] = i2)) : D4 && (S5(c, e.k) && (c.value = i2), e.k && (u3[e.k] = i2));
        };
        if (i2) {
          const A2 = () => {
            R4(), ns.delete(e);
          };
          A2.id = -1, ns.set(e, A2), te3(A2, s);
        } else
          On(e), R4();
      }
    }
  }
  function On(e) {
    const t = ns.get(e);
    t && (t.flags |= 8, ns.delete(e));
  }
  function ti(e, t) {
    if (Rn(e) && e.data === "[") {
      let s = 1, n = e.nextSibling;
      for (; n; ) {
        if (n.nodeType === 1) {
          if (t(n) === false)
            break;
        } else if (Rn(n))
          if (n.data === "]") {
            if (--s === 0)
              break;
          } else
            n.data === "[" && s++;
        n = n.nextSibling;
      }
    } else
      t(e);
  }
  function $e2(e) {
    j2(e) && (e = { loader: e });
    const { loader: t, loadingComponent: s, errorComponent: n, delay: r2 = 200, hydrate: o2, timeout: i2, suspensible: l5 = true, onError: c } = e;
    let d3 = null, u3, h = 0;
    const b2 = () => (h++, d3 = null, k2()), k2 = () => {
      let S5;
      return d3 || (S5 = d3 = t().catch((v) => {
        if (v = v instanceof Error ? v : new Error(String(v)), c)
          return new Promise((D4, R4) => {
            c(v, () => D4(b2()), () => R4(v), h + 1);
          });
        throw v;
      }).then((v) => S5 !== d3 && d3 ? d3 : (v && (v.__esModule || v[Symbol.toStringTag] === "Module") && (v = v.default), u3 = v, v)));
    };
    return cn({ name: "AsyncComponentWrapper", __asyncLoader: k2, __asyncHydrate(S5, v, D4) {
      let R4 = false;
      (v.bu || (v.bu = [])).push(() => R4 = true);
      const A2 = () => {
        R4 || D4();
      }, I4 = o2 ? () => {
        const C2 = o2(A2, ($2) => ti(S5, $2));
        C2 && (v.bum || (v.bum = [])).push(C2);
      } : A2;
      u3 ? I4() : k2().then(() => !v.isUnmounted && I4());
    }, get __asyncResolved() {
      return u3;
    }, setup() {
      const S5 = ee3;
      if (fn(S5), u3)
        return () => Yt(u3, S5);
      const v = (I4) => {
        d3 = null, Ht(I4, S5, 13, !n);
      };
      if (l5 && S5.suspense || ht)
        return k2().then((I4) => () => Yt(I4, S5)).catch((I4) => (v(I4), () => n ? Y(n, { error: I4 }) : null));
      const D4 = Ne(false), R4 = Ne(), A2 = Ne(!!r2);
      return r2 && setTimeout(() => {
        A2.value = false;
      }, r2), i2 != null && setTimeout(() => {
        if (!D4.value && !R4.value) {
          const I4 = new Error(`Async component timed out after ${i2}ms.`);
          v(I4), R4.value = I4;
        }
      }, i2), k2().then(() => {
        D4.value = true, S5.parent && un(S5.parent.vnode) && S5.parent.update();
      }).catch((I4) => {
        v(I4), R4.value = I4;
      }), () => {
        if (D4.value && u3)
          return Yt(u3, S5);
        if (R4.value && n)
          return Y(n, { error: R4.value });
        if (s && !A2.value)
          return Yt(s, S5);
      };
    } });
  }
  function Yt(e, t) {
    const { ref: s, props: n, children: r2, ce: o2 } = t.vnode, i2 = Y(e, n, r2);
    return i2.ref = s, i2.ce = o2, delete t.vnode.ce, i2;
  }
  function si(e, t) {
    Cr(e, "a", t);
  }
  function ni(e, t) {
    Cr(e, "da", t);
  }
  function Cr(e, t, s = ee3) {
    const n = e.__wdc || (e.__wdc = () => {
      let r2 = s;
      for (; r2; ) {
        if (r2.isDeactivated)
          return;
        r2 = r2.parent;
      }
      return e();
    });
    if (ps(t, n, s), s) {
      let r2 = s.parent;
      for (; r2 && r2.parent; )
        un(r2.parent.vnode) && ri(n, t, s, r2), r2 = r2.parent;
    }
  }
  function ri(e, t, s, n) {
    const r2 = ps(t, e, n, true);
    rs(() => {
      Js(n[t], r2);
    }, s);
  }
  function ps(e, t, s = ee3, n = false) {
    if (s) {
      const r2 = s[e] || (s[e] = []), o2 = t.__weh || (t.__weh = (...i2) => {
        Ke();
        const l5 = Bt(s), c = Je(t, s, e, i2);
        return l5(), We(), c;
      });
      return n ? r2.unshift(o2) : r2.push(o2), o2;
    }
  }
  function Pr(e, t = ee3) {
    ps("ec", e, t);
  }
  function Nl(e, t, s, n) {
    let r2;
    const o2 = s, i2 = F4(e);
    if (i2 || oe4(e)) {
      const l5 = i2 && nt(e);
      let c = false, d3 = false;
      l5 && (c = !be3(e), d3 = qe2(e), e = hs(e)), r2 = new Array(e.length);
      for (let u3 = 0, h = e.length; u3 < h; u3++)
        r2[u3] = t(c ? d3 ? at(xe3(e[u3])) : xe3(e[u3]) : e[u3], u3, void 0, o2);
    } else if (typeof e == "number") {
      r2 = new Array(e);
      for (let l5 = 0; l5 < e; l5++)
        r2[l5] = t(l5 + 1, l5, void 0, o2);
    } else if (N2(e))
      if (e[Symbol.iterator])
        r2 = Array.from(e, (l5, c) => t(l5, c, void 0, o2));
      else {
        const l5 = Object.keys(e);
        r2 = new Array(l5.length);
        for (let c = 0, d3 = l5.length; c < d3; c++) {
          const u3 = l5[c];
          r2[c] = t(e[u3], u3, c, o2);
        }
      }
    else
      r2 = [];
    return r2;
  }
  function Mn(e) {
    return F4(e) ? e.reduce((t, s) => (t[s] = null, t), {}) : e;
  }
  function _i(e) {
    const t = Rr(e), s = e.proxy, n = e.ctx;
    Hs = false, t.beforeCreate && Dn(t.beforeCreate, e, "bc");
    const { data: r2, computed: o2, methods: i2, watch: l5, provide: c, inject: d3, created: u3, beforeMount: h, mounted: b2, beforeUpdate: k2, updated: S5, activated: v, deactivated: D4, beforeDestroy: R4, beforeUnmount: A2, destroyed: I4, unmounted: C2, render: $2, renderTracked: U5, renderTriggered: G5, errorCaptured: Q5, serverPrefetch: Z3, expose: ie4, inheritAttrs: we3, components: Vt, directives: Nt2, filters: ys } = t;
    if (d3 && mi(d3, n, null), i2)
      for (const z3 in i2) {
        const W4 = i2[z3];
        j2(W4) && (n[z3] = W4.bind(s));
      }
    if (r2) {
      const z3 = r2.call(s, s);
      N2(z3) && (e.data = sn(z3));
    }
    if (Hs = true, o2)
      for (const z3 in o2) {
        const W4 = o2[z3], Ze = j2(W4) ? W4.bind(s, s) : j2(W4.get) ? W4.get.bind(s, s) : De3, Ut = !j2(W4) && j2(W4.set) ? W4.set.bind(s) : De3, Xe = ye({ get: Ze, set: Ut });
        Object.defineProperty(n, z3, { enumerable: true, configurable: true, get: () => Xe.value, set: (ke3) => Xe.value = ke3 });
      }
    if (l5)
      for (const z3 in l5)
        Or(l5[z3], n, s, z3);
    if (c) {
      const z3 = j2(c) ? c.call(s) : c;
      Reflect.ownKeys(z3).forEach((W4) => {
        Go(W4, z3[W4]);
      });
    }
    u3 && Dn(u3, e, "c");
    function le4(z3, W4) {
      F4(W4) ? W4.forEach((Ze) => z3(Ze.bind(s))) : W4 && z3(W4.bind(s));
    }
    if (le4(oi, h), le4(Xt, b2), le4(ii, k2), le4(li, S5), le4(si, v), le4(ni, D4), le4(Pr, Q5), le4(ai, U5), le4(ui, G5), le4(ci, A2), le4(rs, C2), le4(fi, Z3), F4(ie4))
      if (ie4.length) {
        const z3 = e.exposed || (e.exposed = {});
        ie4.forEach((W4) => {
          Object.defineProperty(z3, W4, { get: () => s[W4], set: (Ze) => s[W4] = Ze, enumerable: true });
        });
      } else
        e.exposed || (e.exposed = {});
    $2 && e.render === De3 && (e.render = $2), we3 != null && (e.inheritAttrs = we3), Vt && (e.components = Vt), Nt2 && (e.directives = Nt2), Z3 && fn(e);
  }
  function mi(e, t, s = De3) {
    F4(e) && (e = Bs(e));
    for (const n in e) {
      const r2 = e[n];
      let o2;
      N2(r2) ? "default" in r2 ? o2 = zt(r2.from || n, r2.default, true) : o2 = zt(r2.from || n) : o2 = zt(r2), ne4(o2) ? Object.defineProperty(t, n, { enumerable: true, configurable: true, get: () => o2.value, set: (i2) => o2.value = i2 }) : t[n] = o2;
    }
  }
  function Dn(e, t, s) {
    Je(F4(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy), t, s);
  }
  function Or(e, t, s, n) {
    let r2 = n.includes(".") ? Sr(s, n) : () => s[n];
    if (oe4(e)) {
      const o2 = t[e];
      j2(o2) && Es(r2, o2);
    } else if (j2(e))
      Es(r2, e.bind(s));
    else if (N2(e))
      if (F4(e))
        e.forEach((o2) => Or(o2, t, s, n));
      else {
        const o2 = j2(e.handler) ? e.handler.bind(s) : t[e.handler];
        j2(o2) && Es(r2, o2, e);
      }
  }
  function Rr(e) {
    const t = e.type, { mixins: s, extends: n } = t, { mixins: r2, optionsCache: o2, config: { optionMergeStrategies: i2 } } = e.appContext, l5 = o2.get(t);
    let c;
    return l5 ? c = l5 : !r2.length && !s && !n ? c = t : (c = {}, r2.length && r2.forEach((d3) => os(c, d3, i2, true)), os(c, t, i2)), N2(t) && o2.set(t, c), c;
  }
  function os(e, t, s, n = false) {
    const { mixins: r2, extends: o2 } = t;
    o2 && os(e, o2, s, true), r2 && r2.forEach((i2) => os(e, i2, s, true));
    for (const i2 in t)
      if (!(n && i2 === "expose")) {
        const l5 = yi[i2] || s && s[i2];
        e[i2] = l5 ? l5(e[i2], t[i2]) : t[i2];
      }
    return e;
  }
  function Fn(e, t) {
    return t ? e ? function() {
      return re4(j2(e) ? e.call(this, this) : e, j2(t) ? t.call(this, this) : t);
    } : t : e;
  }
  function bi(e, t) {
    return xt(Bs(e), Bs(t));
  }
  function Bs(e) {
    if (F4(e)) {
      const t = {};
      for (let s = 0; s < e.length; s++)
        t[e[s]] = e[s];
      return t;
    }
    return e;
  }
  function ce4(e, t) {
    return e ? [...new Set([].concat(e, t))] : t;
  }
  function xt(e, t) {
    return e ? re4(/* @__PURE__ */ Object.create(null), e, t) : t;
  }
  function jn(e, t) {
    return e ? F4(e) && F4(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : re4(/* @__PURE__ */ Object.create(null), Mn(e), Mn(t != null ? t : {})) : t;
  }
  function vi(e, t) {
    if (!e)
      return t;
    if (!t)
      return e;
    const s = re4(/* @__PURE__ */ Object.create(null), e);
    for (const n in t)
      s[n] = ce4(e[n], t[n]);
    return s;
  }
  function Ir() {
    return { app: null, config: { isNativeTag: Gn, performance: false, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: /* @__PURE__ */ Object.create(null), optionsCache: /* @__PURE__ */ new WeakMap(), propsCache: /* @__PURE__ */ new WeakMap(), emitsCache: /* @__PURE__ */ new WeakMap() };
  }
  function wi(e, t) {
    return function(n, r2 = null) {
      j2(n) || (n = re4({}, n)), r2 != null && !N2(r2) && (r2 = null);
      const o2 = Ir(), i2 = /* @__PURE__ */ new WeakSet(), l5 = [];
      let c = false;
      const d3 = o2.app = { _uid: xi++, _component: n, _props: r2, _container: null, _context: o2, _instance: null, version: tl, get config() {
        return o2.config;
      }, set config(u3) {
      }, use(u3, ...h) {
        return i2.has(u3) || (u3 && j2(u3.install) ? (i2.add(u3), u3.install(d3, ...h)) : j2(u3) && (i2.add(u3), u3(d3, ...h))), d3;
      }, mixin(u3) {
        return o2.mixins.includes(u3) || o2.mixins.push(u3), d3;
      }, component(u3, h) {
        return h ? (o2.components[u3] = h, d3) : o2.components[u3];
      }, directive(u3, h) {
        return h ? (o2.directives[u3] = h, d3) : o2.directives[u3];
      }, mount(u3, h, b2) {
        if (!c) {
          const k2 = d3._ceVNode || Y(n, r2);
          return k2.appContext = o2, b2 === true ? b2 = "svg" : b2 === false && (b2 = void 0), e(k2, u3, b2), c = true, d3._container = u3, u3.__vue_app__ = d3, ms(k2.component);
        }
      }, onUnmount(u3) {
        l5.push(u3);
      }, unmount() {
        c && (Je(l5, d3._instance, 16), e(null, d3._container), delete d3._container.__vue_app__);
      }, provide(u3, h) {
        return o2.provides[u3] = h, d3;
      }, runWithContext(u3) {
        const h = ft;
        ft = d3;
        try {
          return u3();
        } finally {
          ft = h;
        }
      } };
      return d3;
    };
  }
  function Ti(e, t, ...s) {
    if (e.isUnmounted)
      return;
    const n = e.vnode.props || K4;
    let r2 = s;
    const o2 = t.startsWith("update:"), i2 = o2 && ki(n, t.slice(7));
    i2 && (i2.trim && (r2 = s.map((u3) => oe4(u3) ? u3.trim() : u3)), i2.number && (r2 = s.map(io)));
    let l5, c = n[l5 = vs(t)] || n[l5 = vs(Fe3(t))];
    !c && o2 && (c = n[l5 = vs(jt(t))]), c && Je(c, e, 6, r2);
    const d3 = n[l5 + "Once"];
    if (d3) {
      if (!e.emitted)
        e.emitted = {};
      else if (e.emitted[l5])
        return;
      e.emitted[l5] = true, Je(d3, e, 6, r2);
    }
  }
  function Mr(e, t, s = false) {
    const n = s ? Si : t.emitsCache, r2 = n.get(e);
    if (r2 !== void 0)
      return r2;
    const o2 = e.emits;
    let i2 = {}, l5 = false;
    if (!j2(e)) {
      const c = (d3) => {
        const u3 = Mr(d3, t, true);
        u3 && (l5 = true, re4(i2, u3));
      };
      !s && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
    }
    return !o2 && !l5 ? (N2(e) && n.set(e, null), null) : (F4(o2) ? o2.forEach((c) => i2[c] = null) : re4(i2, o2), N2(e) && n.set(e, i2), i2);
  }
  function gs(e, t) {
    return !e || !qs(t) ? false : (t = t.slice(2).replace(/Once$/, ""), B4(e, t[0].toLowerCase() + t.slice(1)) || B4(e, jt(t)) || B4(e, t));
  }
  function $n(e) {
    const { type: t, vnode: s, proxy: n, withProxy: r2, propsOptions: [o2], slots: i2, attrs: l5, emit: c, render: d3, renderCache: u3, props: h, data: b2, setupState: k2, ctx: S5, inheritAttrs: v } = e, D4 = ss(e);
    let R4, A2;
    try {
      if (s.shapeFlag & 4) {
        const C2 = r2 || n, $2 = C2;
        R4 = Re3(d3.call($2, C2, u3, h, k2, b2, S5)), A2 = l5;
      } else {
        const C2 = t;
        R4 = Re3(C2.length > 1 ? C2(h, { attrs: l5, slots: i2, emit: c }) : C2(h, null)), A2 = t.props ? l5 : Ei(l5);
      }
    } catch (C2) {
      Pt.length = 0, Ht(C2, e, 1), R4 = Y(ze2);
    }
    let I4 = R4;
    if (A2 && v !== false) {
      const C2 = Object.keys(A2), { shapeFlag: $2 } = I4;
      C2.length && $2 & 7 && (o2 && C2.some(Yn) && (A2 = Ai(A2, o2)), I4 = dt(I4, A2, false, true));
    }
    return s.dirs && (I4 = dt(I4, null, false, true), I4.dirs = I4.dirs ? I4.dirs.concat(s.dirs) : s.dirs), s.transition && ln(I4, s.transition), R4 = I4, ss(D4), R4;
  }
  function Ci(e, t, s) {
    const { props: n, children: r2, component: o2 } = e, { props: i2, children: l5, patchFlag: c } = t, d3 = o2.emitsOptions;
    if (t.dirs || t.transition)
      return true;
    if (s && c >= 0) {
      if (c & 1024)
        return true;
      if (c & 16)
        return n ? Ln(n, i2, d3) : !!i2;
      if (c & 8) {
        const u3 = t.dynamicProps;
        for (let h = 0; h < u3.length; h++) {
          const b2 = u3[h];
          if (Dr(i2, n, b2) && !gs(d3, b2))
            return true;
        }
      }
    } else
      return (r2 || l5) && (!l5 || !l5.$stable) ? true : n === i2 ? false : n ? i2 ? Ln(n, i2, d3) : true : !!i2;
    return false;
  }
  function Ln(e, t, s) {
    const n = Object.keys(t);
    if (n.length !== Object.keys(e).length)
      return true;
    for (let r2 = 0; r2 < n.length; r2++) {
      const o2 = n[r2];
      if (Dr(t, e, o2) && !gs(s, o2))
        return true;
    }
    return false;
  }
  function Dr(e, t, s) {
    const n = e[s], r2 = t[s];
    return s === "style" && N2(n) && N2(r2) ? !ds(n, r2) : n !== r2;
  }
  function Pi({ vnode: e, parent: t }, s) {
    for (; t; ) {
      const n = t.subTree;
      if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e)
        (e = t.vnode).el = s, t = t.parent;
      else
        break;
    }
  }
  function Oi(e, t, s, n = false) {
    const r2 = {}, o2 = jr();
    e.propsDefaults = /* @__PURE__ */ Object.create(null), Lr(e, t, r2, o2);
    for (const i2 in e.propsOptions[0])
      i2 in r2 || (r2[i2] = void 0);
    s ? e.props = n ? r2 : Fo(r2) : e.type.props ? e.props = r2 : e.props = o2, e.attrs = o2;
  }
  function Ri(e, t, s, n) {
    const { props: r2, attrs: o2, vnode: { patchFlag: i2 } } = e, l5 = H5(r2), [c] = e.propsOptions;
    let d3 = false;
    if ((n || i2 > 0) && !(i2 & 16)) {
      if (i2 & 8) {
        const u3 = e.vnode.dynamicProps;
        for (let h = 0; h < u3.length; h++) {
          let b2 = u3[h];
          if (gs(e.emitsOptions, b2))
            continue;
          const k2 = t[b2];
          if (c)
            if (B4(o2, b2))
              k2 !== o2[b2] && (o2[b2] = k2, d3 = true);
            else {
              const S5 = Fe3(b2);
              r2[S5] = Vs(c, l5, S5, k2, e, false);
            }
          else
            k2 !== o2[b2] && (o2[b2] = k2, d3 = true);
        }
      }
    } else {
      Lr(e, t, r2, o2) && (d3 = true);
      let u3;
      for (const h in l5)
        (!t || !B4(t, h) && ((u3 = jt(h)) === h || !B4(t, u3))) && (c ? s && (s[h] !== void 0 || s[u3] !== void 0) && (r2[h] = Vs(c, l5, h, void 0, e, true)) : delete r2[h]);
      if (o2 !== l5)
        for (const h in o2)
          (!t || !B4(t, h)) && (delete o2[h], d3 = true);
    }
    d3 && Be3(e.attrs, "set", "");
  }
  function Lr(e, t, s, n) {
    const [r2, o2] = e.propsOptions;
    let i2 = false, l5;
    if (t)
      for (let c in t) {
        if (wt(c))
          continue;
        const d3 = t[c];
        let u3;
        r2 && B4(r2, u3 = Fe3(c)) ? !o2 || !o2.includes(u3) ? s[u3] = d3 : (l5 || (l5 = {}))[u3] = d3 : gs(e.emitsOptions, c) || (!(c in n) || d3 !== n[c]) && (n[c] = d3, i2 = true);
      }
    if (o2) {
      const c = H5(s), d3 = l5 || K4;
      for (let u3 = 0; u3 < o2.length; u3++) {
        const h = o2[u3];
        s[h] = Vs(r2, c, h, d3[h], e, !B4(d3, h));
      }
    }
    return i2;
  }
  function Vs(e, t, s, n, r2, o2) {
    const i2 = e[s];
    if (i2 != null) {
      const l5 = B4(i2, "default");
      if (l5 && n === void 0) {
        const c = i2.default;
        if (i2.type !== Function && !i2.skipFactory && j2(c)) {
          const { propsDefaults: d3 } = r2;
          if (s in d3)
            n = d3[s];
          else {
            const u3 = Bt(r2);
            n = d3[s] = c.call(null, t), u3();
          }
        } else
          n = c;
        r2.ce && r2.ce._setProp(s, n);
      }
      i2[0] && (o2 && !l5 ? n = false : i2[1] && (n === "" || n === jt(s)) && (n = true));
    }
    return n;
  }
  function Hr(e, t, s = false) {
    const n = s ? Ii : t.propsCache, r2 = n.get(e);
    if (r2)
      return r2;
    const o2 = e.props, i2 = {}, l5 = [];
    let c = false;
    if (!j2(e)) {
      const u3 = (h) => {
        c = true;
        const [b2, k2] = Hr(h, t, true);
        re4(i2, b2), k2 && l5.push(...k2);
      };
      !s && t.mixins.length && t.mixins.forEach(u3), e.extends && u3(e.extends), e.mixins && e.mixins.forEach(u3);
    }
    if (!o2 && !c)
      return N2(e) && n.set(e, it), it;
    if (F4(o2))
      for (let u3 = 0; u3 < o2.length; u3++) {
        const h = Fe3(o2[u3]);
        Hn(h) && (i2[h] = K4);
      }
    else if (o2)
      for (const u3 in o2) {
        const h = Fe3(u3);
        if (Hn(h)) {
          const b2 = o2[u3], k2 = i2[h] = F4(b2) || j2(b2) ? { type: b2 } : re4({}, b2), S5 = k2.type;
          let v = false, D4 = true;
          if (F4(S5))
            for (let R4 = 0; R4 < S5.length; ++R4) {
              const A2 = S5[R4], I4 = j2(A2) && A2.name;
              if (I4 === "Boolean") {
                v = true;
                break;
              } else
                I4 === "String" && (D4 = false);
            }
          else
            v = j2(S5) && S5.name === "Boolean";
          k2[0] = v, k2[1] = D4, (v || B4(k2, "default")) && l5.push(h);
        }
      }
    const d3 = [i2, l5];
    return N2(e) && n.set(e, d3), d3;
  }
  function Hn(e) {
    return e[0] !== "$" && !wt(e);
  }
  function Ul(e) {
    return ji(e);
  }
  function ji(e, t) {
    const s = as();
    s.__VUE__ = true;
    const { insert: n, remove: r2, patchProp: o2, createElement: i2, createText: l5, createComment: c, setText: d3, setElementText: u3, parentNode: h, nextSibling: b2, setScopeId: k2 = De3, insertStaticContent: S5 } = e, v = (f, a2, p4, y2 = null, g2 = null, _2 = null, T6 = void 0, w3 = null, x3 = !!a2.dynamicChildren) => {
      if (f === a2)
        return;
      f && !bt(f, a2) && (y2 = Kt(f), ke3(f, g2, _2, true), f = null), a2.patchFlag === -2 && (x3 = false, a2.dynamicChildren = null);
      const { type: m, ref: O6, shapeFlag: E5 } = a2;
      switch (m) {
        case _s:
          D4(f, a2, p4, y2);
          break;
        case ze2:
          R4(f, a2, p4, y2);
          break;
        case Ps:
          f == null && A2(a2, p4, y2, T6);
          break;
        case Oe:
          Vt(f, a2, p4, y2, g2, _2, T6, w3, x3);
          break;
        default:
          E5 & 1 ? $2(f, a2, p4, y2, g2, _2, T6, w3, x3) : E5 & 6 ? Nt2(f, a2, p4, y2, g2, _2, T6, w3, x3) : (E5 & 64 || E5 & 128) && m.process(f, a2, p4, y2, g2, _2, T6, w3, x3, _t2);
      }
      O6 != null && g2 ? Et(O6, f && f.ref, _2, a2 || f, !a2) : O6 == null && f && f.ref != null && Et(f.ref, null, _2, f, true);
    }, D4 = (f, a2, p4, y2) => {
      if (f == null)
        n(a2.el = l5(a2.children), p4, y2);
      else {
        const g2 = a2.el = f.el;
        a2.children !== f.children && d3(g2, a2.children);
      }
    }, R4 = (f, a2, p4, y2) => {
      f == null ? n(a2.el = c(a2.children || ""), p4, y2) : a2.el = f.el;
    }, A2 = (f, a2, p4, y2) => {
      [f.el, f.anchor] = S5(f.children, a2, p4, y2, f.el, f.anchor);
    }, I4 = ({ el: f, anchor: a2 }, p4, y2) => {
      let g2;
      for (; f && f !== a2; )
        g2 = b2(f), n(f, p4, y2), f = g2;
      n(a2, p4, y2);
    }, C2 = ({ el: f, anchor: a2 }) => {
      let p4;
      for (; f && f !== a2; )
        p4 = b2(f), r2(f), f = p4;
      r2(a2);
    }, $2 = (f, a2, p4, y2, g2, _2, T6, w3, x3) => {
      if (a2.type === "svg" ? T6 = "svg" : a2.type === "math" && (T6 = "mathml"), f == null)
        U5(a2, p4, y2, g2, _2, T6, w3, x3);
      else {
        const m = f.el && f.el._isVueCE ? f.el : null;
        try {
          m && m._beginPatch(), Z3(f, a2, g2, _2, T6, w3, x3);
        } finally {
          m && m._endPatch();
        }
      }
    }, U5 = (f, a2, p4, y2, g2, _2, T6, w3) => {
      let x3, m;
      const { props: O6, shapeFlag: E5, transition: P6, dirs: M2 } = f;
      if (x3 = f.el = i2(f.type, _2, O6 && O6.is, O6), E5 & 8 ? u3(x3, f.children) : E5 & 16 && Q5(f.children, x3, null, y2, g2, Cs(f, _2), T6, w3), M2 && Qe(f, null, y2, "created"), G5(x3, f, f.scopeId, T6, y2), O6) {
        for (const q6 in O6)
          q6 !== "value" && !wt(q6) && o2(x3, q6, null, O6[q6], _2, y2);
        "value" in O6 && o2(x3, "value", null, O6.value, _2), (m = O6.onVnodeBeforeMount) && Ae3(m, y2, f);
      }
      M2 && Qe(f, null, y2, "beforeMount");
      const L4 = $i(g2, P6);
      L4 && P6.beforeEnter(x3), n(x3, a2, p4), ((m = O6 && O6.onVnodeMounted) || L4 || M2) && te3(() => {
        m && Ae3(m, y2, f), L4 && P6.enter(x3), M2 && Qe(f, null, y2, "mounted");
      }, g2);
    }, G5 = (f, a2, p4, y2, g2) => {
      if (p4 && k2(f, p4), y2)
        for (let _2 = 0; _2 < y2.length; _2++)
          k2(f, y2[_2]);
      if (g2) {
        let _2 = g2.subTree;
        if (a2 === _2 || Wr(_2.type) && (_2.ssContent === a2 || _2.ssFallback === a2)) {
          const T6 = g2.vnode;
          G5(f, T6, T6.scopeId, T6.slotScopeIds, g2.parent);
        }
      }
    }, Q5 = (f, a2, p4, y2, g2, _2, T6, w3, x3 = 0) => {
      for (let m = x3; m < f.length; m++) {
        const O6 = f[m] = w3 ? He(f[m]) : Re3(f[m]);
        v(null, O6, a2, p4, y2, g2, _2, T6, w3);
      }
    }, Z3 = (f, a2, p4, y2, g2, _2, T6) => {
      const w3 = a2.el = f.el;
      let { patchFlag: x3, dynamicChildren: m, dirs: O6 } = a2;
      x3 |= f.patchFlag & 16;
      const E5 = f.props || K4, P6 = a2.props || K4;
      let M2;
      if (p4 && et(p4, false), (M2 = P6.onVnodeBeforeUpdate) && Ae3(M2, p4, a2, f), O6 && Qe(a2, f, p4, "beforeUpdate"), p4 && et(p4, true), (E5.innerHTML && P6.innerHTML == null || E5.textContent && P6.textContent == null) && u3(w3, ""), m ? ie4(f.dynamicChildren, m, w3, p4, y2, Cs(a2, g2), _2) : T6 || W4(f, a2, w3, null, p4, y2, Cs(a2, g2), _2, false), x3 > 0) {
        if (x3 & 16)
          we3(w3, E5, P6, p4, g2);
        else if (x3 & 2 && E5.class !== P6.class && o2(w3, "class", null, P6.class, g2), x3 & 4 && o2(w3, "style", E5.style, P6.style, g2), x3 & 8) {
          const L4 = a2.dynamicProps;
          for (let q6 = 0; q6 < L4.length; q6++) {
            const V4 = L4[q6], ue3 = E5[V4], ae4 = P6[V4];
            (ae4 !== ue3 || V4 === "value") && o2(w3, V4, ue3, ae4, g2, p4);
          }
        }
        x3 & 1 && f.children !== a2.children && u3(w3, a2.children);
      } else
        !T6 && m == null && we3(w3, E5, P6, p4, g2);
      ((M2 = P6.onVnodeUpdated) || O6) && te3(() => {
        M2 && Ae3(M2, p4, a2, f), O6 && Qe(a2, f, p4, "updated");
      }, y2);
    }, ie4 = (f, a2, p4, y2, g2, _2, T6) => {
      for (let w3 = 0; w3 < a2.length; w3++) {
        const x3 = f[w3], m = a2[w3], O6 = x3.el && (x3.type === Oe || !bt(x3, m) || x3.shapeFlag & 198) ? h(x3.el) : p4;
        v(x3, m, O6, null, y2, g2, _2, T6, true);
      }
    }, we3 = (f, a2, p4, y2, g2) => {
      if (a2 !== p4) {
        if (a2 !== K4)
          for (const _2 in a2)
            !wt(_2) && !(_2 in p4) && o2(f, _2, a2[_2], null, g2, y2);
        for (const _2 in p4) {
          if (wt(_2))
            continue;
          const T6 = p4[_2], w3 = a2[_2];
          T6 !== w3 && _2 !== "value" && o2(f, _2, w3, T6, g2, y2);
        }
        "value" in p4 && o2(f, "value", a2.value, p4.value, g2);
      }
    }, Vt = (f, a2, p4, y2, g2, _2, T6, w3, x3) => {
      const m = a2.el = f ? f.el : l5(""), O6 = a2.anchor = f ? f.anchor : l5("");
      let { patchFlag: E5, dynamicChildren: P6, slotScopeIds: M2 } = a2;
      M2 && (w3 = w3 ? w3.concat(M2) : M2), f == null ? (n(m, p4, y2), n(O6, p4, y2), Q5(a2.children || [], p4, O6, g2, _2, T6, w3, x3)) : E5 > 0 && E5 & 64 && P6 && f.dynamicChildren && f.dynamicChildren.length === P6.length ? (ie4(f.dynamicChildren, P6, p4, g2, _2, T6, w3), (a2.key != null || g2 && a2 === g2.subTree) && hn(f, a2, true)) : W4(f, a2, p4, O6, g2, _2, T6, w3, x3);
    }, Nt2 = (f, a2, p4, y2, g2, _2, T6, w3, x3) => {
      a2.slotScopeIds = w3, f == null ? a2.shapeFlag & 512 ? g2.ctx.activate(a2, p4, y2, T6, x3) : ys(a2, p4, y2, g2, _2, T6, x3) : gn(f, a2, x3);
    }, ys = (f, a2, p4, y2, g2, _2, T6) => {
      const w3 = f.component = Ji(f, y2, g2);
      if (un(f) && (w3.ctx.renderer = _t2), Yi(w3, false, T6), w3.asyncDep) {
        if (g2 && g2.registerDep(w3, le4, T6), !f.el) {
          const x3 = w3.subTree = Y(ze2);
          R4(null, x3, a2, p4), f.placeholder = x3.el;
        }
      } else
        le4(w3, f, a2, p4, g2, _2, T6);
    }, gn = (f, a2, p4) => {
      const y2 = a2.component = f.component;
      if (Ci(f, a2, p4))
        if (y2.asyncDep && !y2.asyncResolved) {
          z3(y2, a2, p4);
          return;
        } else
          y2.next = a2, y2.update();
      else
        a2.el = f.el, y2.vnode = a2;
    }, le4 = (f, a2, p4, y2, g2, _2, T6) => {
      const w3 = () => {
        if (f.isMounted) {
          let { next: E5, bu: P6, u: M2, parent: L4, vnode: q6 } = f;
          {
            const Se3 = Ur(f);
            if (Se3) {
              E5 && (E5.el = q6.el, z3(f, E5, T6)), Se3.asyncDep.then(() => {
                te3(() => {
                  f.isUnmounted || m();
                }, g2);
              });
              return;
            }
          }
          let V4 = E5, ue3;
          et(f, false), E5 ? (E5.el = q6.el, z3(f, E5, T6)) : E5 = q6, P6 && xs(P6), (ue3 = E5.props && E5.props.onVnodeBeforeUpdate) && Ae3(ue3, L4, E5, q6), et(f, true);
          const ae4 = $n(f), Te3 = f.subTree;
          f.subTree = ae4, v(Te3, ae4, h(Te3.el), Kt(Te3), f, g2, _2), E5.el = ae4.el, V4 === null && Pi(f, ae4.el), M2 && te3(M2, g2), (ue3 = E5.props && E5.props.onVnodeUpdated) && te3(() => Ae3(ue3, L4, E5, q6), g2);
        } else {
          let E5;
          const { el: P6, props: M2 } = a2, { bm: L4, m: q6, parent: V4, root: ue3, type: ae4 } = f, Te3 = At(a2);
          et(f, false), L4 && xs(L4), !Te3 && (E5 = M2 && M2.onVnodeBeforeMount) && Ae3(E5, V4, a2), et(f, true);
          {
            ue3.ce && ue3.ce._hasShadowRoot() && ue3.ce._injectChildStyle(ae4, f.parent ? f.parent.type : void 0);
            const Se3 = f.subTree = $n(f);
            v(null, Se3, p4, y2, f, g2, _2), a2.el = Se3.el;
          }
          if (q6 && te3(q6, g2), !Te3 && (E5 = M2 && M2.onVnodeMounted)) {
            const Se3 = a2;
            te3(() => Ae3(E5, V4, Se3), g2);
          }
          (a2.shapeFlag & 256 || V4 && At(V4.vnode) && V4.vnode.shapeFlag & 256) && f.a && te3(f.a, g2), f.isMounted = true, a2 = p4 = y2 = null;
        }
      };
      f.scope.on();
      const x3 = f.effect = new nr(w3);
      f.scope.off();
      const m = f.update = x3.run.bind(x3), O6 = f.job = x3.runIfDirty.bind(x3);
      O6.i = f, O6.id = f.uid, x3.scheduler = () => on(O6), et(f, true), m();
    }, z3 = (f, a2, p4) => {
      a2.component = f;
      const y2 = f.vnode.props;
      f.vnode = a2, f.next = null, Ri(f, a2.props, y2, p4), Fi(f, a2.children, p4), Ke(), Sn(f), We();
    }, W4 = (f, a2, p4, y2, g2, _2, T6, w3, x3 = false) => {
      const m = f && f.children, O6 = f ? f.shapeFlag : 0, E5 = a2.children, { patchFlag: P6, shapeFlag: M2 } = a2;
      if (P6 > 0) {
        if (P6 & 128) {
          Ut(m, E5, p4, y2, g2, _2, T6, w3, x3);
          return;
        } else if (P6 & 256) {
          Ze(m, E5, p4, y2, g2, _2, T6, w3, x3);
          return;
        }
      }
      M2 & 8 ? (O6 & 16 && gt2(m, g2, _2), E5 !== m && u3(p4, E5)) : O6 & 16 ? M2 & 16 ? Ut(m, E5, p4, y2, g2, _2, T6, w3, x3) : gt2(m, g2, _2, true) : (O6 & 8 && u3(p4, ""), M2 & 16 && Q5(E5, p4, y2, g2, _2, T6, w3, x3));
    }, Ze = (f, a2, p4, y2, g2, _2, T6, w3, x3) => {
      f = f || it, a2 = a2 || it;
      const m = f.length, O6 = a2.length, E5 = Math.min(m, O6);
      let P6;
      for (P6 = 0; P6 < E5; P6++) {
        const M2 = a2[P6] = x3 ? He(a2[P6]) : Re3(a2[P6]);
        v(f[P6], M2, p4, null, g2, _2, T6, w3, x3);
      }
      m > O6 ? gt2(f, g2, _2, true, false, E5) : Q5(a2, p4, y2, g2, _2, T6, w3, x3, E5);
    }, Ut = (f, a2, p4, y2, g2, _2, T6, w3, x3) => {
      let m = 0;
      const O6 = a2.length;
      let E5 = f.length - 1, P6 = O6 - 1;
      for (; m <= E5 && m <= P6; ) {
        const M2 = f[m], L4 = a2[m] = x3 ? He(a2[m]) : Re3(a2[m]);
        if (bt(M2, L4))
          v(M2, L4, p4, null, g2, _2, T6, w3, x3);
        else
          break;
        m++;
      }
      for (; m <= E5 && m <= P6; ) {
        const M2 = f[E5], L4 = a2[P6] = x3 ? He(a2[P6]) : Re3(a2[P6]);
        if (bt(M2, L4))
          v(M2, L4, p4, null, g2, _2, T6, w3, x3);
        else
          break;
        E5--, P6--;
      }
      if (m > E5) {
        if (m <= P6) {
          const M2 = P6 + 1, L4 = M2 < O6 ? a2[M2].el : y2;
          for (; m <= P6; )
            v(null, a2[m] = x3 ? He(a2[m]) : Re3(a2[m]), p4, L4, g2, _2, T6, w3, x3), m++;
        }
      } else if (m > P6)
        for (; m <= E5; )
          ke3(f[m], g2, _2, true), m++;
      else {
        const M2 = m, L4 = m, q6 = /* @__PURE__ */ new Map();
        for (m = L4; m <= P6; m++) {
          const pe3 = a2[m] = x3 ? He(a2[m]) : Re3(a2[m]);
          pe3.key != null && q6.set(pe3.key, m);
        }
        let V4, ue3 = 0;
        const ae4 = P6 - L4 + 1;
        let Te3 = false, Se3 = 0;
        const mt2 = new Array(ae4);
        for (m = 0; m < ae4; m++)
          mt2[m] = 0;
        for (m = M2; m <= E5; m++) {
          const pe3 = f[m];
          if (ue3 >= ae4) {
            ke3(pe3, g2, _2, true);
            continue;
          }
          let Ee3;
          if (pe3.key != null)
            Ee3 = q6.get(pe3.key);
          else
            for (V4 = L4; V4 <= P6; V4++)
              if (mt2[V4 - L4] === 0 && bt(pe3, a2[V4])) {
                Ee3 = V4;
                break;
              }
          Ee3 === void 0 ? ke3(pe3, g2, _2, true) : (mt2[Ee3 - L4] = m + 1, Ee3 >= Se3 ? Se3 = Ee3 : Te3 = true, v(pe3, a2[Ee3], p4, null, g2, _2, T6, w3, x3), ue3++);
        }
        const yn = Te3 ? Li(mt2) : it;
        for (V4 = yn.length - 1, m = ae4 - 1; m >= 0; m--) {
          const pe3 = L4 + m, Ee3 = a2[pe3], bn = a2[pe3 + 1], vn = pe3 + 1 < O6 ? bn.el || Kr(bn) : y2;
          mt2[m] === 0 ? v(null, Ee3, p4, vn, g2, _2, T6, w3, x3) : Te3 && (V4 < 0 || m !== yn[V4] ? Xe(Ee3, p4, vn, 2) : V4--);
        }
      }
    }, Xe = (f, a2, p4, y2, g2 = null) => {
      const { el: _2, type: T6, transition: w3, children: x3, shapeFlag: m } = f;
      if (m & 6) {
        Xe(f.component.subTree, a2, p4, y2);
        return;
      }
      if (m & 128) {
        f.suspense.move(a2, p4, y2);
        return;
      }
      if (m & 64) {
        T6.move(f, a2, p4, _t2);
        return;
      }
      if (T6 === Oe) {
        n(_2, a2, p4);
        for (let E5 = 0; E5 < x3.length; E5++)
          Xe(x3[E5], a2, p4, y2);
        n(f.anchor, a2, p4);
        return;
      }
      if (T6 === Ps) {
        I4(f, a2, p4);
        return;
      }
      if (y2 !== 2 && m & 1 && w3)
        if (y2 === 0)
          w3.beforeEnter(_2), n(_2, a2, p4), te3(() => w3.enter(_2), g2);
        else {
          const { leave: E5, delayLeave: P6, afterLeave: M2 } = w3, L4 = () => {
            f.ctx.isUnmounted ? r2(_2) : n(_2, a2, p4);
          }, q6 = () => {
            _2._isLeaving && _2[ei](true), E5(_2, () => {
              L4(), M2 && M2();
            });
          };
          P6 ? P6(_2, L4, q6) : q6();
        }
      else
        n(_2, a2, p4);
    }, ke3 = (f, a2, p4, y2 = false, g2 = false) => {
      const { type: _2, props: T6, ref: w3, children: x3, dynamicChildren: m, shapeFlag: O6, patchFlag: E5, dirs: P6, cacheIndex: M2 } = f;
      if (E5 === -2 && (g2 = false), w3 != null && (Ke(), Et(w3, null, p4, f, true), We()), M2 != null && (a2.renderCache[M2] = void 0), O6 & 256) {
        a2.ctx.deactivate(f);
        return;
      }
      const L4 = O6 & 1 && P6, q6 = !At(f);
      let V4;
      if (q6 && (V4 = T6 && T6.onVnodeBeforeUnmount) && Ae3(V4, a2, f), O6 & 6)
        to(f.component, p4, y2);
      else {
        if (O6 & 128) {
          f.suspense.unmount(p4, y2);
          return;
        }
        L4 && Qe(f, null, a2, "beforeUnmount"), O6 & 64 ? f.type.remove(f, a2, p4, _t2, y2) : m && !m.hasOnce && (_2 !== Oe || E5 > 0 && E5 & 64) ? gt2(m, a2, p4, false, true) : (_2 === Oe && E5 & 384 || !g2 && O6 & 16) && gt2(x3, a2, p4), y2 && _n(f);
      }
      (q6 && (V4 = T6 && T6.onVnodeUnmounted) || L4) && te3(() => {
        V4 && Ae3(V4, a2, f), L4 && Qe(f, null, a2, "unmounted");
      }, p4);
    }, _n = (f) => {
      const { type: a2, el: p4, anchor: y2, transition: g2 } = f;
      if (a2 === Oe) {
        eo(p4, y2);
        return;
      }
      if (a2 === Ps) {
        C2(f);
        return;
      }
      const _2 = () => {
        r2(p4), g2 && !g2.persisted && g2.afterLeave && g2.afterLeave();
      };
      if (f.shapeFlag & 1 && g2 && !g2.persisted) {
        const { leave: T6, delayLeave: w3 } = g2, x3 = () => T6(p4, _2);
        w3 ? w3(f.el, _2, x3) : x3();
      } else
        _2();
    }, eo = (f, a2) => {
      let p4;
      for (; f !== a2; )
        p4 = b2(f), r2(f), f = p4;
      r2(a2);
    }, to = (f, a2, p4) => {
      const { bum: y2, scope: g2, job: _2, subTree: T6, um: w3, m: x3, a: m } = f;
      Bn(x3), Bn(m), y2 && xs(y2), g2.stop(), _2 && (_2.flags |= 8, ke3(T6, f, a2, p4)), w3 && te3(w3, a2), te3(() => {
        f.isUnmounted = true;
      }, a2);
    }, gt2 = (f, a2, p4, y2 = false, g2 = false, _2 = 0) => {
      for (let T6 = _2; T6 < f.length; T6++)
        ke3(f[T6], a2, p4, y2, g2);
    }, Kt = (f) => {
      if (f.shapeFlag & 6)
        return Kt(f.component.subTree);
      if (f.shapeFlag & 128)
        return f.suspense.next();
      const a2 = b2(f.anchor || f.el), p4 = a2 && a2[Er];
      return p4 ? b2(p4) : a2;
    };
    let bs = false;
    const mn = (f, a2, p4) => {
      let y2;
      f == null ? a2._vnode && (ke3(a2._vnode, null, null, true), y2 = a2._vnode.component) : v(a2._vnode || null, f, a2, null, null, null, p4), a2._vnode = f, bs || (bs = true, Sn(y2), xr(), bs = false);
    }, _t2 = { p: v, um: ke3, m: Xe, r: _n, mt: ys, mc: Q5, pc: W4, pbc: ie4, n: Kt, o: e };
    return { render: mn, hydrate: void 0, createApp: wi(mn) };
  }
  function Cs({ type: e, props: t }, s) {
    return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
  }
  function et({ effect: e, job: t }, s) {
    s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
  }
  function $i(e, t) {
    return (!e || e && !e.pendingBranch) && t && !t.persisted;
  }
  function hn(e, t, s = false) {
    const n = e.children, r2 = t.children;
    if (F4(n) && F4(r2))
      for (let o2 = 0; o2 < n.length; o2++) {
        const i2 = n[o2];
        let l5 = r2[o2];
        l5.shapeFlag & 1 && !l5.dynamicChildren && ((l5.patchFlag <= 0 || l5.patchFlag === 32) && (l5 = r2[o2] = He(r2[o2]), l5.el = i2.el), !s && l5.patchFlag !== -2 && hn(i2, l5)), l5.type === _s && (l5.patchFlag === -1 && (l5 = r2[o2] = He(l5)), l5.el = i2.el), l5.type === ze2 && !l5.el && (l5.el = i2.el);
      }
  }
  function Li(e) {
    const t = e.slice(), s = [0];
    let n, r2, o2, i2, l5;
    const c = e.length;
    for (n = 0; n < c; n++) {
      const d3 = e[n];
      if (d3 !== 0) {
        if (r2 = s[s.length - 1], e[r2] < d3) {
          t[n] = r2, s.push(n);
          continue;
        }
        for (o2 = 0, i2 = s.length - 1; o2 < i2; )
          l5 = o2 + i2 >> 1, e[s[l5]] < d3 ? o2 = l5 + 1 : i2 = l5;
        d3 < e[s[o2]] && (o2 > 0 && (t[n] = s[o2 - 1]), s[o2] = n);
      }
    }
    for (o2 = s.length, i2 = s[o2 - 1]; o2-- > 0; )
      s[o2] = i2, i2 = t[i2];
    return s;
  }
  function Ur(e) {
    const t = e.subTree.component;
    if (t)
      return t.asyncDep && !t.asyncResolved ? t : Ur(t);
  }
  function Bn(e) {
    if (e)
      for (let t = 0; t < e.length; t++)
        e[t].flags |= 8;
  }
  function Kr(e) {
    if (e.placeholder)
      return e.placeholder;
    const t = e.component;
    return t ? Kr(t.subTree) : null;
  }
  function Hi(e, t) {
    t && t.pendingBranch ? F4(e) ? t.effects.push(...e) : t.effects.push(e) : qo(e);
  }
  function Me(e = false) {
    Pt.push(_e3 = e ? null : []);
  }
  function Bi() {
    Pt.pop(), _e3 = Pt[Pt.length - 1] || null;
  }
  function is(e, t = false) {
    Mt += e, e < 0 && _e3 && t && (_e3.hasOnce = true);
  }
  function qr(e) {
    return e.dynamicChildren = Mt > 0 ? _e3 || it : null, Bi(), Mt > 0 && _e3 && _e3.push(e), e;
  }
  function ls(e, t, s, n, r2, o2) {
    return qr(Dt(e, t, s, n, r2, o2, true));
  }
  function ut(e, t, s, n, r2) {
    return qr(Y(e, t, s, n, r2, true));
  }
  function cs(e) {
    return e ? e.__v_isVNode === true : false;
  }
  function bt(e, t) {
    return e.type === t.type && e.key === t.key;
  }
  function Dt(e, t = null, s = null, n = 0, r2 = null, o2 = e === Oe ? 0 : 1, i2 = false, l5 = false) {
    const c = { __v_isVNode: true, __v_skip: true, type: e, props: t, key: t && Jr(t), ref: t && Qt(t), scopeId: kr, slotScopeIds: null, children: s, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetStart: null, targetAnchor: null, staticCount: 0, shapeFlag: o2, patchFlag: n, dynamicProps: r2, dynamicChildren: null, appContext: null, ctx: ge3 };
    return l5 ? (pn(c, s), o2 & 128 && e.normalize(c)) : s && (c.shapeFlag |= oe4(s) ? 8 : 16), Mt > 0 && !i2 && _e3 && (c.patchFlag > 0 || o2 & 6) && c.patchFlag !== 32 && _e3.push(c), c;
  }
  function Vi(e, t = null, s = null, n = 0, r2 = null, o2 = false) {
    if ((!e || e === hi) && (e = ze2), cs(e)) {
      const l5 = dt(e, t, true);
      return s && pn(l5, s), Mt > 0 && !o2 && _e3 && (l5.shapeFlag & 6 ? _e3[_e3.indexOf(e)] = l5 : _e3.push(l5)), l5.patchFlag = -2, l5;
    }
    if (el(e) && (e = e.__vccOpts), t) {
      t = Ni(t);
      let { class: l5, style: c } = t;
      l5 && !oe4(l5) && (t.class = $t(l5)), N2(c) && (rn(c) && !F4(c) && (c = re4({}, c)), t.style = zs(c));
    }
    const i2 = oe4(e) ? 1 : Wr(e) ? 128 : Xo(e) ? 64 : N2(e) ? 4 : j2(e) ? 2 : 0;
    return Dt(e, t, s, n, r2, i2, o2, true);
  }
  function Ni(e) {
    return e ? rn(e) || $r(e) ? re4({}, e) : e : null;
  }
  function dt(e, t, s = false, n = false) {
    const { props: r2, ref: o2, patchFlag: i2, children: l5, transition: c } = e, d3 = t ? Ki(r2 || {}, t) : r2, u3 = { __v_isVNode: true, __v_skip: true, type: e.type, props: d3, key: d3 && Jr(d3), ref: t && t.ref ? s && o2 ? F4(o2) ? o2.concat(Qt(t)) : [o2, Qt(t)] : Qt(t) : o2, scopeId: e.scopeId, slotScopeIds: e.slotScopeIds, children: l5, target: e.target, targetStart: e.targetStart, targetAnchor: e.targetAnchor, staticCount: e.staticCount, shapeFlag: e.shapeFlag, patchFlag: t && e.type !== Oe ? i2 === -1 ? 16 : i2 | 16 : i2, dynamicProps: e.dynamicProps, dynamicChildren: e.dynamicChildren, appContext: e.appContext, dirs: e.dirs, transition: c, component: e.component, suspense: e.suspense, ssContent: e.ssContent && dt(e.ssContent), ssFallback: e.ssFallback && dt(e.ssFallback), placeholder: e.placeholder, el: e.el, anchor: e.anchor, ctx: e.ctx, ce: e.ce };
    return c && n && ln(u3, c.clone(u3)), u3;
  }
  function Ui(e = " ", t = 0) {
    return Y(_s, null, e, t);
  }
  function Ns(e = "", t = false) {
    return t ? (Me(), ut(ze2, null, e)) : Y(ze2, null, e);
  }
  function Re3(e) {
    return e == null || typeof e == "boolean" ? Y(ze2) : F4(e) ? Y(Oe, null, e.slice()) : cs(e) ? He(e) : Y(_s, null, String(e));
  }
  function He(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : dt(e);
  }
  function pn(e, t) {
    let s = 0;
    const { shapeFlag: n } = e;
    if (t == null)
      t = null;
    else if (F4(t))
      s = 16;
    else if (typeof t == "object")
      if (n & 65) {
        const r2 = t.default;
        r2 && (r2._c && (r2._d = false), pn(e, r2()), r2._c && (r2._d = true));
        return;
      } else {
        s = 32;
        const r2 = t._;
        !r2 && !$r(t) ? t._ctx = ge3 : r2 === 3 && ge3 && (ge3.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
      }
    else
      j2(t) ? (t = { default: t, _ctx: ge3 }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [Ui(t)]) : s = 8);
    e.children = t, e.shapeFlag |= s;
  }
  function Ki(...e) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s];
      for (const r2 in n)
        if (r2 === "class")
          t.class !== n.class && (t.class = $t([t.class, n.class]));
        else if (r2 === "style")
          t.style = zs([t.style, n.style]);
        else if (qs(r2)) {
          const o2 = t[r2], i2 = n[r2];
          i2 && o2 !== i2 && !(F4(o2) && o2.includes(i2)) && (t[r2] = o2 ? [].concat(o2, i2) : i2);
        } else
          r2 !== "" && (t[r2] = n[r2]);
    }
    return t;
  }
  function Ae3(e, t, s, n = null) {
    Je(e, t, 7, [s, n]);
  }
  function Ji(e, t, s) {
    const n = e.type, r2 = (t ? t.appContext : e.appContext) || Wi, o2 = { uid: qi++, vnode: e, type: n, parent: t, appContext: r2, root: null, next: null, subTree: null, effect: null, update: null, job: null, scope: new go(true), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: t ? t.provides : Object.create(r2.provides), ids: t ? t.ids : ["", 0, 0], accessCache: null, renderCache: [], components: null, directives: null, propsOptions: Hr(n, r2), emitsOptions: Mr(n, r2), emit: null, emitted: null, propsDefaults: K4, inheritAttrs: n.inheritAttrs, ctx: K4, data: K4, props: K4, attrs: K4, slots: K4, refs: K4, setupState: K4, setupContext: null, suspense: s, suspenseId: s ? s.pendingId : 0, asyncDep: null, asyncResolved: false, isMounted: false, isUnmounted: false, isDeactivated: false, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null };
    return o2.ctx = { _: o2 }, o2.root = t ? t.root : o2, o2.emit = Ti.bind(null, o2), e.ce && e.ce(o2), o2;
  }
  function Gr(e) {
    return e.vnode.shapeFlag & 4;
  }
  function Yi(e, t = false, s = false) {
    t && Us(t);
    const { props: n, children: r2 } = e.vnode, o2 = Gr(e);
    Oi(e, n, o2, t), Di(e, r2, s || t);
    const i2 = o2 ? zi(e, t) : void 0;
    return t && Us(false), i2;
  }
  function zi(e, t) {
    const s = e.type;
    e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, gi);
    const { setup: n } = s;
    if (n) {
      Ke();
      const r2 = e.setupContext = n.length > 1 ? Xi(e) : null, o2 = Bt(e), i2 = Lt(n, e, 0, [e.props, r2]), l5 = Zn(i2);
      if (We(), o2(), (l5 || e.sp) && !At(e) && fn(e), l5) {
        if (i2.then(Vn, Vn), t)
          return i2.then((c) => {
            Nn(e, c);
          }).catch((c) => {
            Ht(c, e, 0);
          });
        e.asyncDep = i2;
      } else
        Nn(e, i2);
    } else
      Yr(e);
  }
  function Nn(e, t, s) {
    j2(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : N2(t) && (e.setupState = yr(t)), Yr(e);
  }
  function Yr(e, t, s) {
    const n = e.type;
    e.render || (e.render = n.render || De3);
    {
      const r2 = Bt(e);
      Ke();
      try {
        _i(e);
      } finally {
        We(), r2();
      }
    }
  }
  function Xi(e) {
    const t = (s) => {
      e.exposed = s || {};
    };
    return { attrs: new Proxy(e.attrs, Zi), slots: e.slots, emit: e.emit, expose: t };
  }
  function ms(e) {
    return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(yr(jo(e.exposed)), { get(t, s) {
      if (s in t)
        return t[s];
      if (s in Ct)
        return Ct[s](e);
    }, has(t, s) {
      return s in t || s in Ct;
    } })) : e.proxy;
  }
  function el(e) {
    return j2(e) && "__vccOpts" in e;
  }
  function Ks(e, t, s) {
    try {
      is(-1);
      const n = arguments.length;
      return n === 2 ? N2(t) && !F4(t) ? cs(t) ? Y(e, null, [t]) : Y(e, t) : Y(e, null, t) : (n > 3 ? s = Array.prototype.slice.call(arguments, 2) : n === 3 && cs(s) && (s = [s]), Y(e, t, s));
    } finally {
      is(1);
    }
  }
  function ll(e, t, s, n, r2, o2) {
    return Me(), ls("div", il, [...t[0] || (t[0] = [Dt("span", { class: "opacity-60" }, "Dock", -1)])]);
  }
  function Os(e, t) {
    const s = window.__;
    return typeof s == "function" ? s(e, t) : e;
  }
  function _l() {
    var _a, _b, _c, _d, _e4;
    return (_e4 = (_d = (_a = window.frappe) == null ? void 0 : _a.csrf_token) != null ? _d : (_c = (_b = window.dockBoot) == null ? void 0 : _b.session) == null ? void 0 : _c.csrf_token) != null ? _e4 : "";
  }
  async function pt(e, t = {}) {
    var _a, _b, _c;
    const s = await fetch("/api/method/" + e, { method: "POST", headers: { "Content-Type": "application/json", "X-Frappe-CSRF-Token": _l() }, body: JSON.stringify(t) }), n = await s.json();
    if (!s.ok) {
      const r2 = (n == null ? void 0 : n._server_messages) ? (_b = (_a = JSON.parse(n._server_messages)) == null ? void 0 : _a[0]) == null ? void 0 : _b.message : (_c = n == null ? void 0 : n.exc_type) != null ? _c : "Server error";
      throw new Error(r2 != null ? r2 : "Request failed");
    }
    return n.message;
  }
  function yl(e) {
    qn || (qn = true, (e == null ? void 0 : e.length) && (he3.value = e));
  }
  function bl(e, t, s) {
    var _a, _b;
    return (_b = (_a = he3.value.find((n) => n.app === e && n.doctype === t && n.docname === s)) == null ? void 0 : _a.name) != null ? _b : null;
  }
  async function vl(e) {
    if (Zr.value)
      return;
    const t = `__tmp_${Date.now()}`, s = __spreadValues({ name: t, sort_order: he3.value.length }, e);
    he3.value.push(s);
    try {
      const n = await pt("dock.api.bookmarks.add", { app: e.app, doctype: e.doctype, docname: e.docname, label: e.label, icon: e.icon }), r2 = he3.value.findIndex((o2) => o2.name === t);
      r2 >= 0 && (he3.value[r2].name = n);
    } catch (e2) {
      he3.value = he3.value.filter((n) => n.name !== t);
    }
  }
  function xl(e) {
    he3.value = he3.value.filter((t) => t.name !== e), pt("dock.api.bookmarks.remove", { bookmark_name: e }).catch(() => {
    });
  }
  function wl(e) {
    const t = new Map(he3.value.map((s) => [s.name, s]));
    he3.value = e.map((s, n) => __spreadProps(__spreadValues({}, t.get(s)), { sort_order: n })), pt("dock.api.bookmarks.reorder", { ordered_names: e }).catch(() => {
    });
  }
  function Xr() {
    return { bookmarks: he3, atLimit: Zr, init: yl, isBookmarked: bl, addBookmark: vl, removeBookmark: xl, reorderBookmarks: wl };
  }
  function Qr() {
    const e = ye(() => {
      var _a, _b, _c, _d;
      return (_d = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) != null ? _c : window.dockBoot) != null ? _d : null;
    }), t = ye(() => {
      var _a;
      return !!((_a = e.value) == null ? void 0 : _a.installed);
    }), s = ye(() => {
      var _a, _b;
      return (_b = (_a = e.value) == null ? void 0 : _a.settings) != null ? _b : null;
    }), n = ye(() => {
      var _a, _b;
      return (_b = (_a = e.value) == null ? void 0 : _a.registered_apps) != null ? _b : [];
    }), r2 = ye(() => {
      var _a, _b;
      return (_b = (_a = e.value) == null ? void 0 : _a.notification_types) != null ? _b : [];
    });
    return { dock: e, isInstalled: t, settings: s, registeredApps: n, notificationTypes: r2 };
  }
  function El(e) {
    Jn || (Jn = true, (e == null ? void 0 : e.length) && (me3.value = e));
  }
  function Al(e) {
    const t = me3.value.findIndex((r2) => r2.app === e.app && r2.doctype === e.doctype && r2.docname === e.docname), s = new Date().toISOString(), n = __spreadProps(__spreadValues({ name: t >= 0 ? me3.value[t].name : "" }, e), { visited_at: s });
    t >= 0 && me3.value.splice(t, 1), me3.value.unshift(n), me3.value.length > 8 && (me3.value = me3.value.slice(0, 8)), pt("dock.api.recent.track", { app: e.app, doctype: e.doctype, docname: e.docname, label: e.label, icon: e.icon }).catch(() => {
    });
  }
  function Cl(e) {
    me3.value = me3.value.filter((t) => t.name !== e), pt("dock.api.recent.remove", { recent_item_name: e }).catch(() => {
    });
  }
  function Pl() {
    me3.value = [], pt("dock.api.recent.clear").catch(() => {
    });
  }
  function Ol() {
    return { items: me3, init: El, trackItem: Al, removeItem: Cl, clearAll: Pl };
  }
  var K4, it, De3, Gn, qs, Yn, re4, Js, so, B4, F4, lt, zn, xn, j2, oe4, Ue2, N2, Zn, Xn, Ft, no, Qn, Gs, wt, us, ro, Fe3, oo, jt, Ys, vs, Ie2, xs, er, io, wn, as, lo, co, fo, ao, Fl, tr, po, sr, ws, de3, go, J5, ks, nr, rr, kt, Tt, ve4, fr, Ot, yo, en, Is, st, Ms, Rt2, bo, vo, xo, ar, dr, hr, ko, To, So, Eo, Ds, Wt, Po, Oo, Ro, pr, gr, _r, Io, xe3, at, $o, Lo, Ho, Jt, es, tt, fe3, Ce3, ct, Ye, ot, br, ts, It2, ge3, kr, Yo, zo, Er, Xo, St, En, An, Cn, js, Ar, Bl, ei, ns, Rn, At, un, Ge, oi, Xt, ii, li, ci, rs, fi, ui, ai, hi, Ls, Ct, As, gi, Hs, yi, xi, ft, ki, Si, Ei, Ai, Fr, jr, $r, Ii, an, dn, Mi, Br, Vr, Nr, Di, Fi, te3, Wr, Oe, _s, ze2, Ps, Pt, _e3, Mt, Jr, Qt, Y, Wi, qi, ee3, Gi, fs, Us, Bt, Vn, ht, Zi, ye, tl, sl, nl, Un, Le, rl, ol, il, cl, fl, Kn, ul, Wn, al, dl, vt, hl, zr, pl, gl, ml, he3, qn, Zr, kl, Tl, Sl, me3, Jn, Rl, Il, Ml, Kl;
  var init_dock_navbar_esm = __esm({
    "../dock/dock/public/js/dock-navbar.esm.js"() {
      K4 = {};
      it = [];
      De3 = () => {
      };
      Gn = () => false;
      qs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97);
      Yn = (e) => e.startsWith("onUpdate:");
      re4 = Object.assign;
      Js = (e, t) => {
        const s = e.indexOf(t);
        s > -1 && e.splice(s, 1);
      };
      so = Object.prototype.hasOwnProperty;
      B4 = (e, t) => so.call(e, t);
      F4 = Array.isArray;
      lt = (e) => Ft(e) === "[object Map]";
      zn = (e) => Ft(e) === "[object Set]";
      xn = (e) => Ft(e) === "[object Date]";
      j2 = (e) => typeof e == "function";
      oe4 = (e) => typeof e == "string";
      Ue2 = (e) => typeof e == "symbol";
      N2 = (e) => e !== null && typeof e == "object";
      Zn = (e) => (N2(e) || j2(e)) && j2(e.then) && j2(e.catch);
      Xn = Object.prototype.toString;
      Ft = (e) => Xn.call(e);
      no = (e) => Ft(e).slice(8, -1);
      Qn = (e) => Ft(e) === "[object Object]";
      Gs = (e) => oe4(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e;
      wt = Ws(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
      us = (e) => {
        const t = /* @__PURE__ */ Object.create(null);
        return (s) => t[s] || (t[s] = e(s));
      };
      ro = /-\w/g;
      Fe3 = us((e) => e.replace(ro, (t) => t.slice(1).toUpperCase()));
      oo = /\B([A-Z])/g;
      jt = us((e) => e.replace(oo, "-$1").toLowerCase());
      Ys = us((e) => e.charAt(0).toUpperCase() + e.slice(1));
      vs = us((e) => e ? `on${Ys(e)}` : "");
      Ie2 = (e, t) => !Object.is(e, t);
      xs = (e, ...t) => {
        for (let s = 0; s < e.length; s++)
          e[s](...t);
      };
      er = (e, t, s, n = false) => {
        Object.defineProperty(e, t, { configurable: true, enumerable: false, writable: n, value: s });
      };
      io = (e) => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t;
      };
      as = () => wn || (wn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
      lo = /;(?![^(]*\))/g;
      co = /:([^]+)/;
      fo = /\/\*[^]*?\*\//g;
      ao = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
      Fl = Ws(ao);
      tr = (e) => !!(e && e.__v_isRef === true);
      po = (e) => oe4(e) ? e : e == null ? "" : F4(e) || N2(e) && (e.toString === Xn || !j2(e.toString)) ? tr(e) ? po(e.value) : JSON.stringify(e, sr, 2) : String(e);
      sr = (e, t) => tr(t) ? sr(e, t.value) : lt(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((s, [n, r2], o2) => (s[ws(n, o2) + " =>"] = r2, s), {}) } : zn(t) ? { [`Set(${t.size})`]: [...t.values()].map((s) => ws(s)) } : Ue2(t) ? ws(t) : N2(t) && !F4(t) && !Qn(t) ? String(t) : t;
      ws = (e, t = "") => {
        var s;
        return Ue2(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e;
      };
      go = class {
        constructor(t = false) {
          this.detached = t, this._active = true, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = false, this.__v_skip = true, this.parent = de3, !t && de3 && (this.index = (de3.scopes || (de3.scopes = [])).push(this) - 1);
        }
        get active() {
          return this._active;
        }
        pause() {
          if (this._active) {
            this._isPaused = true;
            let t, s;
            if (this.scopes)
              for (t = 0, s = this.scopes.length; t < s; t++)
                this.scopes[t].pause();
            for (t = 0, s = this.effects.length; t < s; t++)
              this.effects[t].pause();
          }
        }
        resume() {
          if (this._active && this._isPaused) {
            this._isPaused = false;
            let t, s;
            if (this.scopes)
              for (t = 0, s = this.scopes.length; t < s; t++)
                this.scopes[t].resume();
            for (t = 0, s = this.effects.length; t < s; t++)
              this.effects[t].resume();
          }
        }
        run(t) {
          if (this._active) {
            const s = de3;
            try {
              return de3 = this, t();
            } finally {
              de3 = s;
            }
          }
        }
        on() {
          ++this._on === 1 && (this.prevScope = de3, de3 = this);
        }
        off() {
          this._on > 0 && --this._on === 0 && (de3 = this.prevScope, this.prevScope = void 0);
        }
        stop(t) {
          if (this._active) {
            this._active = false;
            let s, n;
            for (s = 0, n = this.effects.length; s < n; s++)
              this.effects[s].stop();
            for (this.effects.length = 0, s = 0, n = this.cleanups.length; s < n; s++)
              this.cleanups[s]();
            if (this.cleanups.length = 0, this.scopes) {
              for (s = 0, n = this.scopes.length; s < n; s++)
                this.scopes[s].stop(true);
              this.scopes.length = 0;
            }
            if (!this.detached && this.parent && !t) {
              const r2 = this.parent.scopes.pop();
              r2 && r2 !== this && (this.parent.scopes[this.index] = r2, r2.index = this.index);
            }
            this.parent = void 0;
          }
        }
      };
      ks = /* @__PURE__ */ new WeakSet();
      nr = class {
        constructor(t) {
          this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, de3 && de3.active && de3.effects.push(this);
        }
        pause() {
          this.flags |= 64;
        }
        resume() {
          this.flags & 64 && (this.flags &= -65, ks.has(this) && (ks.delete(this), this.trigger()));
        }
        notify() {
          this.flags & 2 && !(this.flags & 32) || this.flags & 8 || or(this);
        }
        run() {
          if (!(this.flags & 1))
            return this.fn();
          this.flags |= 2, kn(this), ir(this);
          const t = J5, s = ve4;
          J5 = this, ve4 = true;
          try {
            return this.fn();
          } finally {
            lr(this), J5 = t, ve4 = s, this.flags &= -3;
          }
        }
        stop() {
          if (this.flags & 1) {
            for (let t = this.deps; t; t = t.nextDep)
              Qs(t);
            this.deps = this.depsTail = void 0, kn(this), this.onStop && this.onStop(), this.flags &= -2;
          }
        }
        trigger() {
          this.flags & 64 ? ks.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
        }
        runIfDirty() {
          Rs(this) && this.run();
        }
        get dirty() {
          return Rs(this);
        }
      };
      rr = 0;
      ve4 = true;
      fr = [];
      Ot = 0;
      yo = class {
        constructor(t, s) {
          this.sub = t, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
        }
      };
      en = class {
        constructor(t) {
          this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = true;
        }
        track(t) {
          if (!J5 || !ve4 || J5 === this.computed)
            return;
          let s = this.activeLink;
          if (s === void 0 || s.sub !== J5)
            s = this.activeLink = new yo(J5, this), J5.deps ? (s.prevDep = J5.depsTail, J5.depsTail.nextDep = s, J5.depsTail = s) : J5.deps = J5.depsTail = s, ur(s);
          else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
            const n = s.nextDep;
            n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = J5.depsTail, s.nextDep = void 0, J5.depsTail.nextDep = s, J5.depsTail = s, J5.deps === s && (J5.deps = n);
          }
          return s;
        }
        trigger(t) {
          this.version++, Ot++, this.notify(t);
        }
        notify(t) {
          Zs();
          try {
            for (let s = this.subs; s; s = s.prevSub)
              s.sub.notify() && s.sub.dep.notify();
          } finally {
            Xs();
          }
        }
      };
      Is = /* @__PURE__ */ new WeakMap();
      st = Symbol("");
      Ms = Symbol("");
      Rt2 = Symbol("");
      bo = { __proto__: null, [Symbol.iterator]() {
        return Ts(this, Symbol.iterator, (e) => Pe(this, e));
      }, concat(...e) {
        return rt(this).concat(...e.map((t) => F4(t) ? rt(t) : t));
      }, entries() {
        return Ts(this, "entries", (e) => (e[1] = Pe(this, e[1]), e));
      }, every(e, t) {
        return je2(this, "every", e, t, void 0, arguments);
      }, filter(e, t) {
        return je2(this, "filter", e, t, (s) => s.map((n) => Pe(this, n)), arguments);
      }, find(e, t) {
        return je2(this, "find", e, t, (s) => Pe(this, s), arguments);
      }, findIndex(e, t) {
        return je2(this, "findIndex", e, t, void 0, arguments);
      }, findLast(e, t) {
        return je2(this, "findLast", e, t, (s) => Pe(this, s), arguments);
      }, findLastIndex(e, t) {
        return je2(this, "findLastIndex", e, t, void 0, arguments);
      }, forEach(e, t) {
        return je2(this, "forEach", e, t, void 0, arguments);
      }, includes(...e) {
        return Ss(this, "includes", e);
      }, indexOf(...e) {
        return Ss(this, "indexOf", e);
      }, join(e) {
        return rt(this).join(e);
      }, lastIndexOf(...e) {
        return Ss(this, "lastIndexOf", e);
      }, map(e, t) {
        return je2(this, "map", e, t, void 0, arguments);
      }, pop() {
        return yt(this, "pop");
      }, push(...e) {
        return yt(this, "push", e);
      }, reduce(e, ...t) {
        return Tn(this, "reduce", e, t);
      }, reduceRight(e, ...t) {
        return Tn(this, "reduceRight", e, t);
      }, shift() {
        return yt(this, "shift");
      }, some(e, t) {
        return je2(this, "some", e, t, void 0, arguments);
      }, splice(...e) {
        return yt(this, "splice", e);
      }, toReversed() {
        return rt(this).toReversed();
      }, toSorted(e) {
        return rt(this).toSorted(e);
      }, toSpliced(...e) {
        return rt(this).toSpliced(...e);
      }, unshift(...e) {
        return yt(this, "unshift", e);
      }, values() {
        return Ts(this, "values", (e) => Pe(this, e));
      } };
      vo = Array.prototype;
      xo = Ws("__proto__,__v_isRef,__isVue");
      ar = new Set(Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ue2));
      dr = class {
        constructor(t = false, s = false) {
          this._isReadonly = t, this._isShallow = s;
        }
        get(t, s, n) {
          if (s === "__v_skip")
            return t.__v_skip;
          const r2 = this._isReadonly, o2 = this._isShallow;
          if (s === "__v_isReactive")
            return !r2;
          if (s === "__v_isReadonly")
            return r2;
          if (s === "__v_isShallow")
            return o2;
          if (s === "__v_raw")
            return n === (r2 ? o2 ? Io : _r : o2 ? gr : pr).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
          const i2 = F4(t);
          if (!r2) {
            let c;
            if (i2 && (c = bo[s]))
              return c;
            if (s === "hasOwnProperty")
              return wo;
          }
          const l5 = Reflect.get(t, s, ne4(t) ? t : n);
          if ((Ue2(s) ? ar.has(s) : xo(s)) || (r2 || se4(t, "get", s), o2))
            return l5;
          if (ne4(l5)) {
            const c = i2 && Gs(s) ? l5 : l5.value;
            return r2 && N2(c) ? Fs(c) : c;
          }
          return N2(l5) ? r2 ? Fs(l5) : sn(l5) : l5;
        }
      };
      hr = class extends dr {
        constructor(t = false) {
          super(false, t);
        }
        set(t, s, n, r2) {
          let o2 = t[s];
          const i2 = F4(t) && Gs(s);
          if (!this._isShallow) {
            const d3 = qe2(o2);
            if (!be3(n) && !qe2(n) && (o2 = H5(o2), n = H5(n)), !i2 && ne4(o2) && !ne4(n))
              return d3 || (o2.value = n), true;
          }
          const l5 = i2 ? Number(s) < t.length : B4(t, s), c = Reflect.set(t, s, n, ne4(t) ? t : r2);
          return t === H5(r2) && (l5 ? Ie2(n, o2) && Be3(t, "set", s, n) : Be3(t, "add", s, n)), c;
        }
        deleteProperty(t, s) {
          const n = B4(t, s);
          t[s];
          const r2 = Reflect.deleteProperty(t, s);
          return r2 && n && Be3(t, "delete", s, void 0), r2;
        }
        has(t, s) {
          const n = Reflect.has(t, s);
          return (!Ue2(s) || !ar.has(s)) && se4(t, "has", s), n;
        }
        ownKeys(t) {
          return se4(t, "iterate", F4(t) ? "length" : st), Reflect.ownKeys(t);
        }
      };
      ko = class extends dr {
        constructor(t = false) {
          super(true, t);
        }
        set(t, s) {
          return true;
        }
        deleteProperty(t, s) {
          return true;
        }
      };
      To = new hr();
      So = new ko();
      Eo = new hr(true);
      Ds = (e) => e;
      Wt = (e) => Reflect.getPrototypeOf(e);
      Po = { get: tn(false, false) };
      Oo = { get: tn(false, true) };
      Ro = { get: tn(true, false) };
      pr = /* @__PURE__ */ new WeakMap();
      gr = /* @__PURE__ */ new WeakMap();
      _r = /* @__PURE__ */ new WeakMap();
      Io = /* @__PURE__ */ new WeakMap();
      xe3 = (e) => N2(e) ? sn(e) : e;
      at = (e) => N2(e) ? Fs(e) : e;
      $o = class {
        constructor(t, s) {
          this.dep = new en(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = s ? t : H5(t), this._value = s ? t : xe3(t), this.__v_isShallow = s;
        }
        get value() {
          return this.dep.track(), this._value;
        }
        set value(t) {
          const s = this._rawValue, n = this.__v_isShallow || be3(t) || qe2(t);
          t = n ? t : H5(t), Ie2(t, s) && (this._rawValue = t, this._value = n ? t : xe3(t), this.dep.trigger());
        }
      };
      Lo = { get: (e, t, s) => t === "__v_raw" ? e : X(Reflect.get(e, t, s)), set: (e, t, s, n) => {
        const r2 = e[t];
        return ne4(r2) && !ne4(s) ? (r2.value = s, true) : Reflect.set(e, t, s, n);
      } };
      Ho = class {
        constructor(t, s, n) {
          this.fn = t, this.setter = s, this._value = void 0, this.dep = new en(this), this.__v_isRef = true, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ot - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
        }
        notify() {
          if (this.flags |= 16, !(this.flags & 8) && J5 !== this)
            return or(this, true), true;
        }
        get value() {
          const t = this.dep.track();
          return cr(this), t && (t.version = this.dep.version), this._value;
        }
        set value(t) {
          this.setter && this.setter(t);
        }
      };
      Jt = {};
      es = /* @__PURE__ */ new WeakMap();
      fe3 = [];
      Ce3 = -1;
      ct = [];
      Ye = null;
      ot = 0;
      br = Promise.resolve();
      ts = null;
      It2 = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
      ge3 = null;
      kr = null;
      Yo = Symbol.for("v-scx");
      zo = () => zt(Yo);
      Er = Symbol("_vte");
      Xo = (e) => e.__isTeleport;
      St = (e) => e && (e.disabled || e.disabled === "");
      En = (e) => e && (e.defer || e.defer === "");
      An = (e) => typeof SVGElement < "u" && e instanceof SVGElement;
      Cn = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement;
      js = (e, t) => {
        const s = e && e.to;
        return oe4(s) ? t ? t(s) : null : s;
      };
      Ar = { name: "Teleport", __isTeleport: true, process(e, t, s, n, r2, o2, i2, l5, c, d3) {
        const { mc: u3, pc: h, pbc: b2, o: { insert: k2, querySelector: S5, createText: v, createComment: D4 } } = d3, R4 = St(t.props);
        let { shapeFlag: A2, children: I4, dynamicChildren: C2 } = t;
        if (e == null) {
          const $2 = t.el = v(""), U5 = t.anchor = v("");
          k2($2, s, n), k2(U5, s, n);
          const G5 = (Z3, ie4) => {
            A2 & 16 && u3(I4, Z3, ie4, r2, o2, i2, l5, c);
          }, Q5 = () => {
            const Z3 = t.target = js(t.props, S5), ie4 = $s(Z3, t, v, k2);
            Z3 && (i2 !== "svg" && An(Z3) ? i2 = "svg" : i2 !== "mathml" && Cn(Z3) && (i2 = "mathml"), r2 && r2.isCE && (r2.ce._teleportTargets || (r2.ce._teleportTargets = /* @__PURE__ */ new Set())).add(Z3), R4 || (G5(Z3, ie4), Zt(t, false)));
          };
          R4 && (G5(s, U5), Zt(t, true)), En(t.props) ? (t.el.__isMounted = false, te3(() => {
            Q5(), delete t.el.__isMounted;
          }, o2)) : Q5();
        } else {
          if (En(t.props) && e.el.__isMounted === false) {
            te3(() => {
              Ar.process(e, t, s, n, r2, o2, i2, l5, c, d3);
            }, o2);
            return;
          }
          t.el = e.el, t.targetStart = e.targetStart;
          const $2 = t.anchor = e.anchor, U5 = t.target = e.target, G5 = t.targetAnchor = e.targetAnchor, Q5 = St(e.props), Z3 = Q5 ? s : U5, ie4 = Q5 ? $2 : G5;
          if (i2 === "svg" || An(U5) ? i2 = "svg" : (i2 === "mathml" || Cn(U5)) && (i2 = "mathml"), C2 ? (b2(e.dynamicChildren, C2, Z3, r2, o2, i2, l5), hn(e, t, true)) : c || h(e, t, Z3, ie4, r2, o2, i2, l5, false), R4)
            Q5 ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Gt(t, s, $2, d3, 1);
          else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
            const we3 = t.target = js(t.props, S5);
            we3 && Gt(t, we3, null, d3, 0);
          } else
            Q5 && Gt(t, U5, G5, d3, 1);
          Zt(t, R4);
        }
      }, remove(e, t, s, { um: n, o: { remove: r2 } }, o2) {
        const { shapeFlag: i2, children: l5, anchor: c, targetStart: d3, targetAnchor: u3, target: h, props: b2 } = e;
        if (h && (r2(d3), r2(u3)), o2 && r2(c), i2 & 16) {
          const k2 = o2 || !St(b2);
          for (let S5 = 0; S5 < l5.length; S5++) {
            const v = l5[S5];
            n(v, t, s, k2, !!v.dynamicChildren);
          }
        }
      }, move: Gt, hydrate: Qo };
      Bl = Ar;
      ei = Symbol("_leaveCb");
      ns = /* @__PURE__ */ new WeakMap();
      Rn = (e) => e.nodeType === 8;
      as().requestIdleCallback;
      as().cancelIdleCallback;
      At = (e) => !!e.type.__asyncLoader;
      un = (e) => e.type.__isKeepAlive;
      Ge = (e) => (t, s = ee3) => {
        (!ht || e === "sp") && ps(e, (...n) => t(...n), s);
      };
      oi = Ge("bm");
      Xt = Ge("m");
      ii = Ge("bu");
      li = Ge("u");
      ci = Ge("bum");
      rs = Ge("um");
      fi = Ge("sp");
      ui = Ge("rtg");
      ai = Ge("rtc");
      hi = Symbol.for("v-ndc");
      Ls = (e) => e ? Gr(e) ? ms(e) : Ls(e.parent) : null;
      Ct = re4(/* @__PURE__ */ Object.create(null), { $: (e) => e, $el: (e) => e.vnode.el, $data: (e) => e.data, $props: (e) => e.props, $attrs: (e) => e.attrs, $slots: (e) => e.slots, $refs: (e) => e.refs, $parent: (e) => Ls(e.parent), $root: (e) => Ls(e.root), $host: (e) => e.ce, $emit: (e) => e.emit, $options: (e) => Rr(e), $forceUpdate: (e) => e.f || (e.f = () => {
        on(e.update);
      }), $nextTick: (e) => e.n || (e.n = Ko.bind(e.proxy)), $watch: (e) => Zo.bind(e) });
      As = (e, t) => e !== K4 && !e.__isScriptSetup && B4(e, t);
      gi = { get({ _: e }, t) {
        if (t === "__v_skip")
          return true;
        const { ctx: s, setupState: n, data: r2, props: o2, accessCache: i2, type: l5, appContext: c } = e;
        if (t[0] !== "$") {
          const b2 = i2[t];
          if (b2 !== void 0)
            switch (b2) {
              case 1:
                return n[t];
              case 2:
                return r2[t];
              case 4:
                return s[t];
              case 3:
                return o2[t];
            }
          else {
            if (As(n, t))
              return i2[t] = 1, n[t];
            if (r2 !== K4 && B4(r2, t))
              return i2[t] = 2, r2[t];
            if (B4(o2, t))
              return i2[t] = 3, o2[t];
            if (s !== K4 && B4(s, t))
              return i2[t] = 4, s[t];
            Hs && (i2[t] = 0);
          }
        }
        const d3 = Ct[t];
        let u3, h;
        if (d3)
          return t === "$attrs" && se4(e.attrs, "get", ""), d3(e);
        if ((u3 = l5.__cssModules) && (u3 = u3[t]))
          return u3;
        if (s !== K4 && B4(s, t))
          return i2[t] = 4, s[t];
        if (h = c.config.globalProperties, B4(h, t))
          return h[t];
      }, set({ _: e }, t, s) {
        const { data: n, setupState: r2, ctx: o2 } = e;
        return As(r2, t) ? (r2[t] = s, true) : n !== K4 && B4(n, t) ? (n[t] = s, true) : B4(e.props, t) || t[0] === "$" && t.slice(1) in e ? false : (o2[t] = s, true);
      }, has({ _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: r2, props: o2, type: i2 } }, l5) {
        let c;
        return !!(s[l5] || e !== K4 && l5[0] !== "$" && B4(e, l5) || As(t, l5) || B4(o2, l5) || B4(n, l5) || B4(Ct, l5) || B4(r2.config.globalProperties, l5) || (c = i2.__cssModules) && c[l5]);
      }, defineProperty(e, t, s) {
        return s.get != null ? e._.accessCache[t] = 0 : B4(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
      } };
      Hs = true;
      yi = { data: Fn, props: jn, emits: jn, methods: xt, computed: xt, beforeCreate: ce4, created: ce4, beforeMount: ce4, mounted: ce4, beforeUpdate: ce4, updated: ce4, beforeDestroy: ce4, beforeUnmount: ce4, destroyed: ce4, unmounted: ce4, activated: ce4, deactivated: ce4, errorCaptured: ce4, serverPrefetch: ce4, components: xt, directives: xt, watch: vi, provide: Fn, inject: bi };
      xi = 0;
      ft = null;
      ki = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Fe3(t)}Modifiers`] || e[`${jt(t)}Modifiers`];
      Si = /* @__PURE__ */ new WeakMap();
      Ei = (e) => {
        let t;
        for (const s in e)
          (s === "class" || s === "style" || qs(s)) && ((t || (t = {}))[s] = e[s]);
        return t;
      };
      Ai = (e, t) => {
        const s = {};
        for (const n in e)
          (!Yn(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
        return s;
      };
      Fr = {};
      jr = () => Object.create(Fr);
      $r = (e) => Object.getPrototypeOf(e) === Fr;
      Ii = /* @__PURE__ */ new WeakMap();
      an = (e) => e === "_" || e === "_ctx" || e === "$stable";
      dn = (e) => F4(e) ? e.map(Re3) : [Re3(e)];
      Mi = (e, t, s) => {
        if (t._n)
          return t;
        const n = Jo((...r2) => dn(t(...r2)), s);
        return n._c = false, n;
      };
      Br = (e, t, s) => {
        const n = e._ctx;
        for (const r2 in e) {
          if (an(r2))
            continue;
          const o2 = e[r2];
          if (j2(o2))
            t[r2] = Mi(r2, o2, n);
          else if (o2 != null) {
            const i2 = dn(o2);
            t[r2] = () => i2;
          }
        }
      };
      Vr = (e, t) => {
        const s = dn(t);
        e.slots.default = () => s;
      };
      Nr = (e, t, s) => {
        for (const n in t)
          (s || !an(n)) && (e[n] = t[n]);
      };
      Di = (e, t, s) => {
        const n = e.slots = jr();
        if (e.vnode.shapeFlag & 32) {
          const r2 = t._;
          r2 ? (Nr(n, t, s), s && er(n, "_", r2, true)) : Br(t, n);
        } else
          t && Vr(e, t);
      };
      Fi = (e, t, s) => {
        const { vnode: n, slots: r2 } = e;
        let o2 = true, i2 = K4;
        if (n.shapeFlag & 32) {
          const l5 = t._;
          l5 ? s && l5 === 1 ? o2 = false : Nr(r2, t, s) : (o2 = !t.$stable, Br(t, r2)), i2 = t;
        } else
          t && (Vr(e, t), i2 = { default: 1 });
        if (o2)
          for (const l5 in r2)
            !an(l5) && i2[l5] == null && delete r2[l5];
      };
      te3 = Hi;
      Wr = (e) => e.__isSuspense;
      Oe = Symbol.for("v-fgt");
      _s = Symbol.for("v-txt");
      ze2 = Symbol.for("v-cmt");
      Ps = Symbol.for("v-stc");
      Pt = [];
      _e3 = null;
      Mt = 1;
      Jr = ({ key: e }) => e != null ? e : null;
      Qt = ({ ref: e, ref_key: t, ref_for: s }) => (typeof e == "number" && (e = "" + e), e != null ? oe4(e) || ne4(e) || j2(e) ? { i: ge3, r: e, k: t, f: !!s } : e : null);
      Y = Vi;
      Wi = Ir();
      qi = 0;
      ee3 = null;
      Gi = () => ee3 || ge3;
      {
        const e = as(), t = (s, n) => {
          let r2;
          return (r2 = e[s]) || (r2 = e[s] = []), r2.push(n), (o2) => {
            r2.length > 1 ? r2.forEach((i2) => i2(o2)) : r2[0](o2);
          };
        };
        fs = t("__VUE_INSTANCE_SETTERS__", (s) => ee3 = s), Us = t("__VUE_SSR_SETTERS__", (s) => ht = s);
      }
      Bt = (e) => {
        const t = ee3;
        return fs(e), e.scope.on(), () => {
          e.scope.off(), fs(t);
        };
      };
      Vn = () => {
        ee3 && ee3.scope.off(), fs(null);
      };
      ht = false;
      Zi = { get(e, t) {
        return se4(e, "get", ""), e[t];
      } };
      ye = (e, t) => Bo(e, t, ht);
      tl = "3.5.30";
      sl = function() {
        const t = typeof document < "u" && document.createElement("link").relList;
        return t && t.supports && t.supports("modulepreload") ? "modulepreload" : "preload";
      }();
      nl = function(e) {
        return "/assets/dock/js/" + e;
      };
      Un = {};
      Le = function(t, s, n) {
        let r2 = Promise.resolve();
        if (s && s.length > 0) {
          let c = function(d3) {
            return Promise.all(d3.map((u3) => Promise.resolve(u3).then((h) => ({ status: "fulfilled", value: h }), (h) => ({ status: "rejected", reason: h }))));
          };
          document.getElementsByTagName("link");
          const i2 = document.querySelector("meta[property=csp-nonce]"), l5 = (i2 == null ? void 0 : i2.nonce) || (i2 == null ? void 0 : i2.getAttribute("nonce"));
          r2 = c(s.map((d3) => {
            if (d3 = nl(d3), d3 in Un)
              return;
            Un[d3] = true;
            const u3 = d3.endsWith(".css"), h = u3 ? '[rel="stylesheet"]' : "";
            if (document.querySelector(`link[href="${d3}"]${h}`))
              return;
            const b2 = document.createElement("link");
            if (b2.rel = u3 ? "stylesheet" : sl, u3 || (b2.as = "script"), b2.crossOrigin = "", b2.href = d3, l5 && b2.setAttribute("nonce", l5), document.head.appendChild(b2), u3)
              return new Promise((k2, S5) => {
                b2.addEventListener("load", k2), b2.addEventListener("error", () => S5(new Error(`Unable to preload CSS for ${d3}`)));
              });
          }));
        }
        function o2(i2) {
          const l5 = new Event("vite:preloadError", { cancelable: true });
          if (l5.payload = i2, window.dispatchEvent(l5), !l5.defaultPrevented)
            throw i2;
        }
        return r2.then((i2) => {
          for (const l5 of i2 || [])
            l5.status === "rejected" && o2(l5.reason);
          return t().catch(o2);
        });
      };
      rl = { name: "DockFallbackBar" };
      ol = (e, t) => {
        const s = e.__vccOpts || e;
        for (const [n, r2] of t)
          s[n] = r2;
        return s;
      };
      il = { role: "banner", class: "dock-fallback-bar h-14 sticky top-0 z-50 flex items-center px-4 bg-[var(--dock-bg)] border-b border-[var(--dock-border)] text-[var(--dock-text)] text-sm" };
      cl = ol(rl, [["render", ll]]);
      fl = (e) => {
        for (const t in e)
          if (t.startsWith("aria-") || t === "role" || t === "title")
            return true;
        return false;
      };
      Kn = (e) => e === "";
      ul = (...e) => e.filter((t, s, n) => !!t && t.trim() !== "" && n.indexOf(t) === s).join(" ").trim();
      Wn = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
      al = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (t, s, n) => n ? n.toUpperCase() : s.toLowerCase());
      dl = (e) => {
        const t = al(e);
        return t.charAt(0).toUpperCase() + t.slice(1);
      };
      vt = { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 2, "stroke-linecap": "round", "stroke-linejoin": "round" };
      hl = (_a, { slots: d3 }) => {
        var _b = _a, { name: e, iconNode: t, absoluteStrokeWidth: s, "absolute-stroke-width": n, strokeWidth: r2, "stroke-width": o2, size: i2 = vt.width, color: l5 = vt.stroke } = _b, c = __objRest(_b, ["name", "iconNode", "absoluteStrokeWidth", "absolute-stroke-width", "strokeWidth", "stroke-width", "size", "color"]);
        return Ks("svg", __spreadValues(__spreadProps(__spreadValues(__spreadValues({}, vt), c), { width: i2, height: i2, stroke: l5, "stroke-width": Kn(s) || Kn(n) || s === true || n === true ? Number(r2 || o2 || vt["stroke-width"]) * 24 / Number(i2) : r2 || o2 || vt["stroke-width"], class: ul("lucide", c.class, ...e ? [`lucide-${Wn(dl(e))}-icon`, `lucide-${Wn(e)}`] : ["lucide-icon"]) }), !d3.default && !fl(c) && { "aria-hidden": "true" }), [...t.map((u3) => Ks(...u3)), ...d3.default ? [d3.default()] : []]);
      };
      zr = (e, t) => (s, { slots: n, attrs: r2 }) => Ks(hl, __spreadProps(__spreadValues(__spreadValues({}, r2), s), { iconNode: t, name: e }), n);
      pl = zr("bookmark-check", [["path", { d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z", key: "oz39mx" }], ["path", { d: "m9 10 2 2 4-4", key: "1gnqz4" }]]);
      gl = zr("bookmark", [["path", { d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z", key: "oz39mx" }]]);
      ml = 12;
      he3 = Ne([]);
      qn = false;
      Zr = ye(() => he3.value.length >= ml);
      kl = ["aria-label", "disabled", "title"];
      Tl = { name: "DockPinButton" };
      Sl = cn(__spreadProps(__spreadValues({}, Tl), { props: { currentPath: {} }, setup(e) {
        const t = e, { atLimit: s, isBookmarked: n, addBookmark: r2, removeBookmark: o2 } = Xr(), { registeredApps: i2 } = Qr(), l5 = ye(() => {
          var _a;
          const S5 = {};
          for (const v of (_a = i2.value) != null ? _a : [])
            v.color && (S5[v.app] = v.color);
          return S5;
        }), c = ye(() => {
          const S5 = t.currentPath.match(/^\/([^/]+)\/([^/]+)\/([^/]+)$/);
          if (!S5)
            return null;
          const [, v, D4, R4] = S5;
          return v === "dock" ? null : { app: v, doctype: D4, docname: decodeURIComponent(R4) };
        }), d3 = ye(() => c.value !== null), u3 = ye(() => c.value ? n(c.value.app, c.value.doctype, c.value.docname) : null), h = ye(() => u3.value !== null), b2 = Ne(false);
        async function k2() {
          var _a;
          if (c.value) {
            b2.value = true;
            try {
              h.value && u3.value ? o2(u3.value) : await r2({ app: c.value.app, doctype: c.value.doctype, docname: c.value.docname, label: c.value.docname, icon: "", color: (_a = l5.value[c.value.app]) != null ? _a : "" });
            } finally {
              b2.value = false;
            }
          }
        }
        return (S5, v) => d3.value ? (Me(), ls("button", { key: 0, class: $t(["flex items-center justify-center w-8 h-8 rounded-md transition-colors", [h.value ? "text-[var(--dock-accent)]" : "text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10", X(s) && !h.value && "opacity-40 cursor-not-allowed"]]), "aria-label": h.value ? X(Os)("Remove bookmark") : X(Os)("Add bookmark"), disabled: b2.value || X(s) && !h.value, title: X(s) && !h.value ? X(Os)("Bookmark limit reached (12)") : void 0, onClick: k2 }, [h.value ? (Me(), ut(X(pl), { key: 0, class: "w-4 h-4" })) : (Me(), ut(X(gl), { key: 1, class: "w-4 h-4" }))], 10, kl)) : Ns("", true);
      } }));
      me3 = Ne([]);
      Jn = false;
      Rl = { class: "flex-1 flex justify-center px-4" };
      Il = { class: "flex items-center gap-1 flex-shrink-0" };
      Ml = { name: "DockNavbar" };
      Kl = cn(__spreadProps(__spreadValues({}, Ml), { setup(e) {
        var _a, _b, _c, _d, _e4, _f, _g;
        const t = Ne(false), s = Ne(false), n = Ne(window.location.pathname);
        Pr(() => (t.value = true, false));
        function r2() {
          s.value = window.scrollY > 4;
        }
        Xt(() => window.addEventListener("scroll", r2, { passive: true })), rs(() => window.removeEventListener("scroll", r2));
        const { registeredApps: o2, dock: i2 } = Qr(), { init: l5, trackItem: c } = Ol(), { init: d3 } = Xr();
        Xt(() => {
          var _a2, _b2;
          l5((_a2 = i2.value) == null ? void 0 : _a2.recent_items), d3((_b2 = i2.value) == null ? void 0 : _b2.bookmarks);
          const $2 = window.location.pathname;
          n.value = $2;
          const U5 = o2.value.find((G5) => $2.startsWith(G5.route));
          (U5 == null ? void 0 : U5.color) && document.documentElement.style.setProperty("--dock-accent", U5.color);
        });
        function u3() {
          const $2 = window.location.pathname;
          n.value = $2;
          const U5 = $2.match(/^\/([^/]+)\/([^/]+)\/([^/]+)$/);
          if (U5) {
            const [, G5, Q5, Z3] = U5;
            if (G5 !== "dock") {
              const ie4 = o2.value.find((we3) => we3.app === G5);
              c({ app: G5, doctype: Q5, docname: decodeURIComponent(Z3), label: decodeURIComponent(Z3), icon: (ie4 == null ? void 0 : ie4.color, "") });
            }
          }
        }
        Xt(() => {
          const $2 = history.pushState.bind(history);
          history.__dockPushState = $2, history.pushState = function(...U5) {
            $2(...U5), u3();
          }, window.addEventListener("popstate", u3), window.addEventListener("dock:trackVisit", (U5) => {
            const G5 = U5.detail;
            G5 && c(G5);
          });
        }), rs(() => {
          history.__dockPushState && (history.pushState = history.__dockPushState, delete history.__dockPushState), window.removeEventListener("popstate", u3);
        });
        const h = (_g = (_f = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.installed_apps) == null ? void 0 : _c.includes("jana")) != null ? _f : (_e4 = (_d = window.dockBoot) == null ? void 0 : _d.installed_apps) == null ? void 0 : _e4.includes("jana")) != null ? _g : false, b2 = $e2(() => Le(() => Promise.resolve().then(() => (init_DockSidebarToggle_kRCh3VX(), DockSidebarToggle_kRCh3VX_exports)), [])), k2 = $e2(() => Le(() => Promise.resolve().then(() => (init_DockAppLabel_C3lqAbAn(), DockAppLabel_C3lqAbAn_exports)), [])), S5 = $e2(() => Le(() => Promise.resolve().then(() => (init_DockSearch_DqvTXRMe(), DockSearch_DqvTXRMe_exports)).then(($2) => $2.D), [])), v = $e2(() => Le(() => Promise.resolve().then(() => (init_DockTimer_k0j7AUic(), DockTimer_k0j7AUic_exports)), [])), D4 = $e2(() => Le(() => Promise.resolve().then(() => (init_DockTimerStaleWarning_Cx93gFY2(), DockTimerStaleWarning_Cx93gFY2_exports)), [])), R4 = $e2(() => Le(() => Promise.resolve().then(() => (init_DockBell_OFxCQxBn(), DockBell_OFxCQxBn_exports)), [])), A2 = $e2(() => Le(() => Promise.resolve().then(() => (init_DockJana_DfKEJtCf(), DockJana_DfKEJtCf_exports)), [])), I4 = $e2(() => Le(() => Promise.resolve().then(() => (init_DockAppSwitcher_BnQc3lQS(), DockAppSwitcher_BnQc3lQS_exports)), [])), C2 = $e2(() => Le(() => Promise.resolve().then(() => (init_DockAvatar_CJHfgsGb(), DockAvatar_CJHfgsGb_exports)), []));
        return ($2, U5) => (Me(), ls(Oe, null, [t.value ? (Me(), ut(cl, { key: 0 })) : (Me(), ls("header", { key: 1, role: "banner", class: $t(["dock-navbar h-14 sticky top-0 z-50 flex items-center gap-2 px-4 select-none bg-[var(--dock-bg)] text-[var(--dock-text)] transition-shadow duration-150", s.value ? "shadow-sm" : "border-b border-[var(--dock-border)] border-opacity-50"]) }, [Y(X(b2), { class: "flex-shrink-0" }), Y(X(k2), { class: "flex-shrink-0" }), Dt("div", Rl, [Y(X(S5))]), Dt("div", Il, [Y(Sl, { "current-path": n.value }, null, 8, ["current-path"]), Y(X(v)), Y(X(R4)), X(h) ? (Me(), ut(X(A2), { key: 0 })) : Ns("", true), Y(X(I4)), Y(X(C2))])], 2)), t.value ? Ns("", true) : (Me(), ut(X(D4), { key: 2 }))], 64));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/runtime-dom.esm-bundler-CKC4ttiH.js
  function ct2(t, e, n) {
    const s = t[rt2];
    s && (e = (e ? [e, ...s] : [...s]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e;
  }
  function ut2(t, e, n) {
    const s = t.style, i2 = oe4(n);
    let r2 = false;
    if (n && !i2) {
      if (e)
        if (oe4(e))
          for (const o2 of e.split(";")) {
            const c = o2.slice(0, o2.indexOf(":")).trim();
            n[c] == null && b(s, c, "");
          }
        else
          for (const o2 in e)
            n[o2] == null && b(s, o2, "");
      for (const o2 in n)
        o2 === "display" && (r2 = true), b(s, o2, n[o2]);
    } else if (i2) {
      if (e !== n) {
        const o2 = s[at2];
        o2 && (n += ";" + o2), s.cssText = n, r2 = lt2.test(n);
      }
    } else
      e && t.removeAttribute("style");
    N3 in t && (t[N3] = r2 ? s.display : "", t[ft2] && (s.display = "none"));
  }
  function b(t, e, n) {
    if (F4(n))
      n.forEach((s) => b(t, e, s));
    else if (n == null && (n = ""), e.startsWith("--"))
      t.setProperty(e, n);
    else {
      const s = dt2(t, e);
      x2.test(n) ? t.setProperty(jt(s), n.replace(x2, ""), "important") : t[s] = n;
    }
  }
  function dt2(t, e) {
    const n = C[e];
    if (n)
      return n;
    let s = Fe3(e);
    if (s !== "filter" && s in t)
      return C[e] = s;
    s = Ys(s);
    for (let i2 = 0; i2 < L3.length; i2++) {
      const r2 = L3[i2] + s;
      if (r2 in t)
        return C[e] = r2;
    }
    return e;
  }
  function I3(t, e, n, s, i2, r2 = Fl(e)) {
    s && e.startsWith("xlink:") ? n == null ? t.removeAttributeNS(P5, e.slice(6, e.length)) : t.setAttributeNS(P5, e, n) : n == null || r2 && !jl(n) ? t.removeAttribute(e) : t.setAttribute(e, r2 ? "" : Ue2(n) ? String(n) : n);
  }
  function O5(t, e, n, s, i2) {
    if (e === "innerHTML" || e === "textContent") {
      n != null && (t[e] = e === "innerHTML" ? F5(n) : n);
      return;
    }
    const r2 = t.tagName;
    if (e === "value" && r2 !== "PROGRESS" && !r2.includes("-")) {
      const c = r2 === "OPTION" ? t.getAttribute("value") || "" : t.value, f = n == null ? t.type === "checkbox" ? "on" : "" : String(n);
      (c !== f || !("_value" in t)) && (t.value = f), n == null && t.removeAttribute(e), t._value = n;
      return;
    }
    let o2 = false;
    if (n === "" || n == null) {
      const c = typeof t[e];
      c === "boolean" ? n = jl(n) : n == null && c === "string" ? (n = "", o2 = true) : c === "number" && (n = 0, o2 = true);
    }
    try {
      t[e] = n;
    } catch (e2) {
    }
    o2 && t.removeAttribute(i2 || e);
  }
  function u2(t, e, n, s) {
    t.addEventListener(e, n, s);
  }
  function pt2(t, e, n, s) {
    t.removeEventListener(e, n, s);
  }
  function mt(t, e, n, s, i2 = null) {
    const r2 = t[V3] || (t[V3] = {}), o2 = r2[e];
    if (s && o2)
      o2.value = s;
    else {
      const [c, f] = ht2(e);
      if (s) {
        const d3 = r2[e] = bt2(s, i2);
        u2(t, c, d3, f);
      } else
        o2 && (pt2(t, c, o2, f), r2[e] = void 0);
    }
  }
  function ht2(t) {
    let e;
    if (R3.test(t)) {
      e = {};
      let s;
      for (; s = t.match(R3); )
        t = t.slice(0, t.length - s[0].length), e[s[0].toLowerCase()] = true;
    }
    return [t[2] === ":" ? t.slice(3) : jt(t.slice(2)), e];
  }
  function bt2(t, e) {
    const n = (s) => {
      if (!s._vts)
        s._vts = Date.now();
      else if (s._vts <= n.attached)
        return;
      Je(At2(s, n.value), e, 5, [s]);
    };
    return n.value = t, n.attached = St2(), n;
  }
  function At2(t, e) {
    if (F4(e)) {
      const n = t.stopImmediatePropagation;
      return t.stopImmediatePropagation = () => {
        n.call(t), t._stopped = true;
      }, e.map((s) => (i2) => !i2._stopped && s && s(i2));
    } else
      return e;
  }
  function Et2(t, e, n, s) {
    if (s)
      return !!(e === "innerHTML" || e === "textContent" || e in t && H6(e) && j2(n));
    if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "autocorrect" || e === "sandbox" && t.tagName === "IFRAME" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
      return false;
    if (e === "width" || e === "height") {
      const i2 = t.tagName;
      if (i2 === "IMG" || i2 === "VIDEO" || i2 === "CANVAS" || i2 === "SOURCE")
        return false;
    }
    return H6(e) && oe4(n) ? false : e in t;
  }
  function _t(t, e) {
    const n = t._def.props;
    if (!n)
      return false;
    const s = Fe3(e);
    return Array.isArray(n) ? n.some((i2) => Fe3(i2) === s) : Object.keys(n).some((i2) => Fe3(i2) === s);
  }
  function vt2(t) {
    t.target.composing = true;
  }
  function K5(t) {
    const e = t.target;
    e.composing && (e.composing = false, e.dispatchEvent(new Event("input")));
  }
  function y(t, e, n) {
    return e && (t = t.trim()), n && (t = io(t)), t;
  }
  function Nt() {
    return q5 || (q5 = Ul(Tt2));
  }
  function xt2(t) {
    if (t instanceof SVGElement)
      return "svg";
    if (typeof MathMLElement == "function" && t instanceof MathMLElement)
      return "mathml";
  }
  function Lt2(t) {
    return oe4(t) ? document.querySelector(t) : t;
  }
  var _, w2, F5, st2, it2, a, T5, ot2, rt2, N3, ft2, at2, lt2, x2, L3, C, P5, V3, R3, E4, gt, St2, H6, Ct2, p3, l4, It, Mt2, wt2, Rt, Tt2, q5, Ht2;
  var init_runtime_dom_esm_bundler_CKC4ttiH = __esm({
    "../dock/dock/public/js/chunks/runtime-dom.esm-bundler-CKC4ttiH.js"() {
      init_dock_navbar_esm();
      w2 = typeof window < "u" && window.trustedTypes;
      if (w2)
        try {
          _ = w2.createPolicy("vue", { createHTML: (t) => t });
        } catch (e) {
        }
      F5 = _ ? (t) => _.createHTML(t) : (t) => t;
      st2 = "http://www.w3.org/2000/svg";
      it2 = "http://www.w3.org/1998/Math/MathML";
      a = typeof document < "u" ? document : null;
      T5 = a && a.createElement("template");
      ot2 = { insert: (t, e, n) => {
        e.insertBefore(t, n || null);
      }, remove: (t) => {
        const e = t.parentNode;
        e && e.removeChild(t);
      }, createElement: (t, e, n, s) => {
        const i2 = e === "svg" ? a.createElementNS(st2, t) : e === "mathml" ? a.createElementNS(it2, t) : n ? a.createElement(t, { is: n }) : a.createElement(t);
        return t === "select" && s && s.multiple != null && i2.setAttribute("multiple", s.multiple), i2;
      }, createText: (t) => a.createTextNode(t), createComment: (t) => a.createComment(t), setText: (t, e) => {
        t.nodeValue = e;
      }, setElementText: (t, e) => {
        t.textContent = e;
      }, parentNode: (t) => t.parentNode, nextSibling: (t) => t.nextSibling, querySelector: (t) => a.querySelector(t), setScopeId(t, e) {
        t.setAttribute(e, "");
      }, insertStaticContent(t, e, n, s, i2, r2) {
        const o2 = n ? n.previousSibling : e.lastChild;
        if (i2 && (i2 === r2 || i2.nextSibling))
          for (; e.insertBefore(i2.cloneNode(true), n), !(i2 === r2 || !(i2 = i2.nextSibling)); )
            ;
        else {
          T5.innerHTML = F5(s === "svg" ? `<svg>${t}</svg>` : s === "mathml" ? `<math>${t}</math>` : t);
          const c = T5.content;
          if (s === "svg" || s === "mathml") {
            const f = c.firstChild;
            for (; f.firstChild; )
              c.appendChild(f.firstChild);
            c.removeChild(f);
          }
          e.insertBefore(c, n);
        }
        return [o2 ? o2.nextSibling : e.firstChild, n ? n.previousSibling : e.lastChild];
      } };
      rt2 = Symbol("_vtc");
      N3 = Symbol("_vod");
      ft2 = Symbol("_vsh");
      at2 = Symbol("");
      lt2 = /(?:^|;)\s*display\s*:/;
      x2 = /\s*!important$/;
      L3 = ["Webkit", "Moz", "ms"];
      C = {};
      P5 = "http://www.w3.org/1999/xlink";
      V3 = Symbol("_vei");
      R3 = /(?:Once|Passive|Capture)$/;
      E4 = 0;
      gt = Promise.resolve();
      St2 = () => E4 || (gt.then(() => E4 = 0), E4 = Date.now());
      H6 = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123;
      Ct2 = (t, e, n, s, i2, r2) => {
        const o2 = i2 === "svg";
        e === "class" ? ct2(t, s, o2) : e === "style" ? ut2(t, n, s) : qs(e) ? Yn(e) || mt(t, e, n, s, r2) : (e[0] === "." ? (e = e.slice(1), true) : e[0] === "^" ? (e = e.slice(1), false) : Et2(t, e, s, o2)) ? (O5(t, e, s), !t.tagName.includes("-") && (e === "value" || e === "checked" || e === "selected") && I3(t, e, s, o2, r2, e !== "value")) : t._isVueCE && (_t(t, e) || t._def.__asyncLoader && (/[A-Z]/.test(e) || !oe4(s))) ? O5(t, Fe3(e), s, r2, e) : (e === "true-value" ? t._trueValue = s : e === "false-value" && (t._falseValue = s), I3(t, e, s, o2));
      };
      p3 = (t) => {
        const e = t.props["onUpdate:modelValue"] || false;
        return F4(e) ? (n) => xs(e, n) : e;
      };
      l4 = Symbol("_assign");
      It = { created(t, { modifiers: { lazy: e, trim: n, number: s } }, i2) {
        t[l4] = p3(i2);
        const r2 = s || i2.props && i2.props.type === "number";
        u2(t, e ? "change" : "input", (o2) => {
          o2.target.composing || t[l4](y(t.value, n, r2));
        }), (n || r2) && u2(t, "change", () => {
          t.value = y(t.value, n, r2);
        }), e || (u2(t, "compositionstart", vt2), u2(t, "compositionend", K5), u2(t, "change", K5));
      }, mounted(t, { value: e }) {
        t.value = e != null ? e : "";
      }, beforeUpdate(t, { value: e, oldValue: n, modifiers: { lazy: s, trim: i2, number: r2 } }, o2) {
        if (t[l4] = p3(o2), t.composing)
          return;
        const c = (r2 || t.type === "number") && !/^0\d/.test(t.value) ? io(t.value) : t.value, f = e != null ? e : "";
        c !== f && (document.activeElement === t && t.type !== "range" && (s && e === n || i2 && t.value.trim() === f) || (t.value = f));
      } };
      Mt2 = ["ctrl", "shift", "alt", "meta"];
      wt2 = { stop: (t) => t.stopPropagation(), prevent: (t) => t.preventDefault(), self: (t) => t.target !== t.currentTarget, ctrl: (t) => !t.ctrlKey, shift: (t) => !t.shiftKey, alt: (t) => !t.altKey, meta: (t) => !t.metaKey, left: (t) => "button" in t && t.button !== 0, middle: (t) => "button" in t && t.button !== 1, right: (t) => "button" in t && t.button !== 2, exact: (t, e) => Mt2.some((n) => t[`${n}Key`] && !e.includes(n)) };
      Rt = (t, e) => {
        if (!t)
          return t;
        const n = t._withMods || (t._withMods = {}), s = e.join(".");
        return n[s] || (n[s] = (i2, ...r2) => {
          for (let o2 = 0; o2 < e.length; o2++) {
            const c = wt2[e[o2]];
            if (c && c(i2, e))
              return;
          }
          return t(i2, ...r2);
        });
      };
      Tt2 = re4({ patchProp: Ct2 }, ot2);
      Ht2 = (...t) => {
        const e = Nt().createApp(...t), { mount: n } = e;
        return e.mount = (s) => {
          const i2 = Lt2(s);
          if (!i2)
            return;
          const r2 = e._component;
          !j2(r2) && !r2.render && !r2.template && (r2.template = i2.innerHTML), i2.nodeType === 1 && (i2.textContent = "");
          const o2 = n(i2, false, xt2(i2));
          return i2 instanceof Element && (i2.removeAttribute("v-cloak"), i2.setAttribute("data-v-app", "")), o2;
        }, e;
      };
    }
  });

  // ../dock/dock/public/js/dock.bundle.js
  init_runtime_dom_esm_bundler_CKC4ttiH();
  init_dock_navbar_esm();
  function r() {
    var _a, _b, _c;
    if (!((_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) == null ? void 0 : _c.installed))
      return;
    const t = document.querySelector(".navbar.navbar-fixed-top");
    if (t) {
      const e = document.createElement("div");
      t.replaceWith(e), Ht2(Kl).mount(e);
    } else {
      const e = document.createElement("div");
      document.body.prepend(e), Ht2(Kl).mount(e);
    }
  }
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", r) : r();
})();
//# sourceMappingURL=dock.bundle.V7PME3AY.js.map
