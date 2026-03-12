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

  // ../dock/dock/public/js/chunks/DockSidebarToggle-BFAbmNrj.js
  var DockSidebarToggle_BFAbmNrj_exports = {};
  __export(DockSidebarToggle_BFAbmNrj_exports, {
    default: () => k
  });
  var l, d, k;
  var init_DockSidebarToggle_BFAbmNrj = __esm({
    "../dock/dock/public/js/chunks/DockSidebarToggle-BFAbmNrj.js"() {
      init_dock_navbar_esm();
      l = _o("menu", [["path", { d: "M4 5h16", key: "1tepv9" }], ["path", { d: "M4 12h16", key: "1lakjw" }], ["path", { d: "M4 19h16", key: "1djgab" }]]);
      d = { name: "DockSidebarToggle" };
      k = ms(__spreadProps(__spreadValues({}, d), { setup(i2) {
        return (t5, e) => (Se(), yn("button", { class: "flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", "aria-label": "Toggle sidebar", title: "Toggle sidebar", onClick: e[0] || (e[0] = (u2) => t5.$emit("toggle")) }, [Z(te(l), { class: "w-5 h-5" })]));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/DockAppLabel-YzA6JhFa.js
  var DockAppLabel_YzA6JhFa_exports = {};
  __export(DockAppLabel_YzA6JhFa_exports, {
    default: () => D
  });
  var p, _, m, u, k2, D;
  var init_DockAppLabel_YzA6JhFa = __esm({
    "../dock/dock/public/js/chunks/DockAppLabel-YzA6JhFa.js"() {
      init_dock_navbar_esm();
      p = "/assets/dock/js/assets/dock-icon.svg";
      _ = { class: "dock-app-label flex items-center gap-2 min-w-0" };
      m = ["src"];
      u = { class: "text-sm font-medium text-[var(--dock-text)] truncate max-w-[140px]" };
      k2 = { name: "DockAppLabel" };
      D = ms(__spreadProps(__spreadValues({}, k2), { setup(f) {
        const { settings: t5 } = ql(), o = Te(() => {
          var _a;
          const s = ((_a = t5.value) == null ? void 0 : _a.site_label) || "Dock";
          return s.charAt(0).toUpperCase() + s.slice(1);
        });
        return (s, x3) => (Se(), yn("div", _, [Ut("img", { src: te(p), alt: "Dock", class: "h-6 w-6 rounded-md flex-shrink-0" }, null, 8, m), Ut("span", u, Fo(o.value), 1)]));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/x-Dj5OacS7.js
  var c;
  var init_x_Dj5OacS7 = __esm({
    "../dock/dock/public/js/chunks/x-Dj5OacS7.js"() {
      init_dock_navbar_esm();
      c = _o("x", [["path", { d: "M18 6 6 18", key: "1bl5f8" }], ["path", { d: "m6 6 12 12", key: "d8bk6v" }]]);
    }
  });

  // ../dock/dock/public/js/chunks/DockSearchModal-BmVNWX-K.js
  var DockSearchModal_BmVNWX_K_exports = {};
  __export(DockSearchModal_BmVNWX_K_exports, {
    default: () => fe
  });
  var oe, ae, te2, le, re, se, ne, fe;
  var init_DockSearchModal_BmVNWX_K = __esm({
    "../dock/dock/public/js/chunks/DockSearchModal-BmVNWX-K.js"() {
      init_runtime_dom_esm_bundler_uPARf279();
      init_dock_navbar_esm();
      init_DockSearch_Bs4BTOyj();
      init_x_Dj5OacS7();
      oe = { role: "dialog", "aria-modal": "true", "aria-label": "Global search", class: "w-full max-w-lg bg-[var(--dock-bg)] border border-[var(--dock-border)] rounded-xl shadow-2xl overflow-hidden" };
      ae = { class: "flex items-center gap-2 px-4 py-3 border-b border-[var(--dock-border)]" };
      te2 = ["placeholder"];
      le = { class: "flex gap-1 px-3 pt-2 pb-1 overflow-x-auto" };
      re = ["onClick"];
      se = { role: "listbox", class: "max-h-[60vh] overflow-y-auto" };
      ne = { name: "DockSearchModal" };
      fe = ms(__spreadProps(__spreadValues({}, ne), { emits: ["close"], setup(ue5, { emit: B2 }) {
        const m2 = B2, { registeredApps: _2 } = ql(), L4 = Te(() => {
          var _a;
          const e = {};
          for (const o of (_a = _2.value) != null ? _a : [])
            o.color && (e[o.app] = o.color);
          return e;
        }), l4 = Ce(""), s = Ce(null), d2 = Ce([]), v2 = Ce(false), x3 = Ce(false), n = Ce(-1), C3 = Ce(null), N3 = Te(() => {
          const e = {};
          for (const o of d2.value)
            e[o.app] || (e[o.app] = []), e[o.app].push(o);
          return e;
        }), h3 = Te(() => d2.value);
        let y = null;
        Dn(l4, (e) => {
          if (x3.value = false, n.value = -1, y && clearTimeout(y), e.length < 2) {
            d2.value = [], v2.value = false;
            return;
          }
          v2.value = true, y = setTimeout(p4, 200);
        });
        async function p4() {
          if (!(l4.value.length < 2)) {
            v2.value = true, x3.value = false;
            try {
              d2.value = await xt("dock.api.search.global_search", __spreadValues({ query: l4.value }, s.value ? { app: s.value } : {}));
            } catch (e) {
              x3.value = true;
            } finally {
              v2.value = false;
            }
          }
        }
        function D2(e) {
          if (e.key === "Escape") {
            m2("close");
            return;
          }
          e.key === "ArrowDown" ? (e.preventDefault(), n.value = Math.min(n.value + 1, h3.value.length - 1)) : e.key === "ArrowUp" ? (e.preventDefault(), n.value = Math.max(n.value - 1, 0)) : e.key === "Enter" && n.value >= 0 && S3(h3.value[n.value]);
        }
        function S3(e) {
          window.location.href = e.route, m2("close");
        }
        function V2(e) {
          window.location.href = e, m2("close");
        }
        function q5(e) {
          e.target.id === "dock-search-backdrop" && m2("close");
        }
        return Ft(() => ai(() => {
          var _a;
          return (_a = C3.value) == null ? void 0 : _a.focus();
        })), Ft(() => document.addEventListener("keydown", D2)), gn(() => document.removeEventListener("keydown", D2)), (e, o) => (Se(), nt(rc, { to: "body" }, [Ut("div", { id: "dock-search-backdrop", class: "fixed inset-0 z-40 bg-black/40 flex items-start justify-center pt-[10vh] px-4", onMousedown: q5 }, [Ut("div", oe, [Ut("div", ae, [Z(te(K), { class: "w-4 h-4 text-[var(--dock-icon)] shrink-0" }), sc(Ut("input", { ref_key: "inputRef", ref: C3, "onUpdate:modelValue": o[0] || (o[0] = (t5) => l4.value = t5), type: "text", class: "flex-1 bg-transparent text-[var(--dock-text)] text-sm outline-none placeholder-[var(--dock-icon)]", placeholder: te(Vn)("Search...") }, null, 8, te2), [[Me, l4.value]]), l4.value ? (Se(), yn("button", { key: 0, class: "text-[var(--dock-icon)] hover:text-[var(--dock-text)]", onClick: o[1] || (o[1] = (t5) => l4.value = "") }, [Z(te(c), { class: "w-4 h-4" })])) : Qn("", true), o[4] || (o[4] = Ut("kbd", { class: "text-xs text-[var(--dock-icon)] bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded" }, "Esc", -1))]), Ut("div", le, [Ut("button", { class: qt(["px-2.5 py-1 rounded-full text-xs font-medium transition-colors shrink-0", s.value ? "text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10" : "bg-[var(--dock-accent)] text-white"]), onClick: o[2] || (o[2] = (t5) => {
          s.value = null, p4();
        }) }, Fo(te(Vn)("All")), 3), (Se(true), yn(me, null, cc(te(_2), (t5) => (Se(), yn("button", { key: t5.app, class: qt(["px-2.5 py-1 rounded-full text-xs font-medium transition-colors shrink-0", s.value === t5.app ? "bg-[var(--dock-accent)] text-white" : "text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10"]), onClick: (E3) => {
          s.value = t5.app, p4();
        } }, Fo(t5.label), 11, re))), 128))]), Ut("div", se, [v2.value ? (Se(), nt(me2, { key: 0 })) : x3.value ? (Se(), nt(Se2, { key: 1, onRetry: p4 })) : l4.value.length >= 2 ? (Se(), yn(me, { key: 2 }, [d2.value.length ? (Se(true), yn(me, { key: 1 }, cc(N3.value, (t5, E3) => (Se(), yn(me, { key: E3 }, [(Se(true), yn(me, null, cc(t5, (b, ce5) => (Se(), nt(pe, { key: b.name, result: b, "app-color": L4.value[b.app], focused: h3.value.indexOf(b) === n.value, onNavigate: S3 }, null, 8, ["result", "app-color", "focused"]))), 128)), o[5] || (o[5] = Ut("div", { class: "mx-4 border-b border-[var(--dock-border)]" }, null, -1))], 64))), 128)) : (Se(), nt(_e, { key: 0, query: l4.value, "scoped-app": s.value, onClearScope: o[3] || (o[3] = (t5) => {
          s.value = null, p4();
        }) }, null, 8, ["query", "scoped-app"]))], 64)) : (Se(), nt(Ie, { key: 3, onNavigate: V2 }))])])], 32)]));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/DockSearch-Bs4BTOyj.js
  var DockSearch_Bs4BTOyj_exports = {};
  __export(DockSearch_Bs4BTOyj_exports, {
    D: () => me2,
    S: () => K,
    _: () => Se2,
    a: () => _e,
    b: () => pe,
    c: () => Ie,
    d: () => Je
  });
  function he(s, u2, p4, l4, k4, x3) {
    return Se(), yn("div", ke, [(Se(), yn(me, null, cc(4, (h3) => Ut("div", { key: h3, class: "flex gap-3 items-center animate-pulse" }, [u2[0] || (u2[0] = Ut("div", { class: "w-2 h-2 rounded-full bg-black/10 dark:bg-white/10 shrink-0" }, null, -1)), Ut("div", { class: "flex-1 h-3 rounded bg-black/10 dark:bg-white/10", style: ls({ width: `${60 + h3 * 8}%` }) }, null, 4), u2[1] || (u2[1] = Ut("div", { class: "w-12 h-2.5 rounded bg-black/10 dark:bg-white/10 shrink-0" }, null, -1))])), 64))]);
  }
  var K, ie, ue, de, ve, pe, fe2, ke, me2, xe, ye2, be, ge, _e, we, $e, Se2, Ce2, De2, Re, Ae, Ee, Me2, Le2, Ne, Te2, Ie, Oe, Ve, qe, je2, Be, Ke, Ue, ze, Fe, Je;
  var init_DockSearch_Bs4BTOyj = __esm({
    "../dock/dock/public/js/chunks/DockSearch-Bs4BTOyj.js"() {
      init_dock_navbar_esm();
      init_runtime_dom_esm_bundler_uPARf279();
      init_x_Dj5OacS7();
      K = _o("search", [["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }], ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]]);
      ie = ["aria-selected"];
      ue = { class: "flex-1 text-sm text-[var(--dock-text)] truncate" };
      de = { class: "text-xs text-[var(--dock-icon)] shrink-0" };
      ve = { name: "DockSearchResultRow" };
      pe = ms(__spreadProps(__spreadValues({}, ve), { props: { result: {}, appColor: {}, focused: { type: Boolean } }, emits: ["navigate"], setup(s) {
        return (u2, p4) => {
          var _a;
          return Se(), yn("div", { role: "option", "aria-selected": s.focused, class: qt(["flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors", s.focused ? "bg-black/10 dark:bg-white/10" : "hover:bg-black/5 dark:hover:bg-white/5"]), onClick: p4[0] || (p4[0] = (l4) => u2.$emit("navigate", s.result)) }, [Ut("div", { class: "w-2 h-2 rounded-full shrink-0", style: ls({ backgroundColor: (_a = s.appColor) != null ? _a : "var(--dock-icon)" }) }, null, 4), Ut("span", ue, Fo(s.result.label), 1), Ut("span", de, Fo(s.result.section), 1)], 10, ie);
        };
      } }));
      fe2 = { name: "DockSearchLoading" };
      ke = { class: "py-2 px-3 space-y-2" };
      me2 = xl(fe2, [["render", he]]);
      xe = { class: "px-4 py-6 text-center text-sm text-[var(--dock-icon)]" };
      ye2 = { key: 0 };
      be = { key: 1 };
      ge = { name: "DockSearchEmpty" };
      _e = ms(__spreadProps(__spreadValues({}, ge), { props: { query: {}, scopedApp: {} }, emits: ["clearScope"], setup(s, { emit: u2 }) {
        const p4 = u2;
        return (l4, k4) => (Se(), yn("div", xe, [s.scopedApp ? (Se(), yn("p", ye2, Fo(te(Vn)('No results for "{0}"').replace("{0}", s.query)) + " " + Fo(te(Vn)("in {0}").replace("{0}", s.scopedApp)), 1)) : (Se(), yn("p", be, Fo(te(Vn)('No results for "{0}"').replace("{0}", s.query)), 1)), s.scopedApp ? (Se(), yn("button", { key: 2, class: "mt-2 text-[var(--dock-accent)] hover:underline", onClick: k4[0] || (k4[0] = (x3) => p4("clearScope")) }, Fo(te(Vn)("Search in All apps")), 1)) : Qn("", true)]));
      } }));
      we = { class: "px-4 py-6 text-center text-sm text-[var(--dock-icon)]" };
      $e = { name: "DockSearchError" };
      Se2 = ms(__spreadProps(__spreadValues({}, $e), { emits: ["retry"], setup(s) {
        return (u2, p4) => (Se(), yn("div", we, [il(Fo(te(Vn)("Search unavailable")) + " ", 1), Ut("button", { class: "underline ml-1 hover:text-[var(--dock-text)]", onClick: p4[0] || (p4[0] = (l4) => u2.$emit("retry")) }, Fo(te(Vn)("Try again")), 1)]));
      } }));
      Ce2 = { key: 0, class: "py-1" };
      De2 = { class: "px-4 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--dock-icon)]" };
      Re = ["onClick"];
      Ae = { class: "flex-1 min-w-0" };
      Ee = { class: "text-sm text-[var(--dock-text)] truncate" };
      Me2 = { class: "text-[11px] text-[var(--dock-icon)] truncate" };
      Le2 = ["aria-label", "onClick"];
      Ne = { key: 1, class: "px-4 py-3 text-xs text-[var(--dock-icon)]" };
      Te2 = { name: "DockSearchRecent" };
      Ie = ms(__spreadProps(__spreadValues({}, Te2), { emits: ["navigate"], setup(s, { emit: u2 }) {
        const p4 = u2, { items: l4, removeItem: k4 } = bo(), { registeredApps: x3 } = ql(), h3 = Te(() => {
          var _a;
          const f = {};
          for (const y of (_a = x3.value) != null ? _a : [])
            y.color && (f[y.app] = y.color);
          return f;
        });
        function g3(f) {
          return `/${f.app}/${f.doctype}/${encodeURIComponent(f.docname)}`;
        }
        return (f, y) => te(l4).length ? (Se(), yn("div", Ce2, [Ut("div", De2, Fo(te(Vn)("Recent")), 1), (Se(true), yn(me, null, cc(te(l4), (c3) => {
          var _a;
          return Se(), yn("div", { key: c3.name, class: "group flex items-center gap-2.5 px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer", onClick: (w) => p4("navigate", g3(c3)) }, [Ut("span", { class: "w-2 h-2 rounded-full shrink-0", style: ls({ background: (_a = h3.value[c3.app]) != null ? _a : "var(--dock-accent)" }) }, null, 4), Ut("div", Ae, [Ut("div", Ee, Fo(c3.label), 1), Ut("div", Me2, Fo(c3.doctype), 1)]), Ut("button", { class: "opacity-0 group-hover:opacity-100 text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-opacity", "aria-label": te(Vn)("Remove from recent"), onClick: ye((w) => te(k4)(c3.name), ["stop"]) }, [Z(te(c), { class: "w-3.5 h-3.5" })], 8, Le2)], 8, Re);
        }), 128))])) : (Se(), yn("div", Ne, Fo(te(Vn)("No recent items")), 1));
      } }));
      Oe = { class: "flex items-center w-full h-9 rounded-lg border border-[var(--dock-border)] bg-[var(--dock-bg)] overflow-hidden transition-all focus-within:ring-2 focus-within:ring-[var(--dock-accent)]/30 focus-within:border-[var(--dock-accent)]" };
      Ve = { value: "" };
      qe = ["value"];
      je2 = ["placeholder"];
      Be = ["aria-label"];
      Ke = { key: 0, class: "absolute top-full left-0 right-0 mt-1 rounded-lg shadow-lg border border-[var(--dock-border)] bg-[var(--dock-bg)] max-h-96 overflow-y-auto z-20", role: "listbox" };
      Ue = ["aria-label", "title"];
      ze = { name: "DockSearch" };
      Fe = ms(__spreadProps(__spreadValues({}, ze), { setup(s) {
        const u2 = De(() => je(() => Promise.resolve().then(() => (init_DockSearchModal_BmVNWX_K(), DockSearchModal_BmVNWX_K_exports)), [])), { registeredApps: p4 } = ql(), l4 = Ce(""), k4 = Ce(""), x3 = Ce([]), h3 = Ce(false), g3 = Ce(false), f = Ce(false), y = Ce(false), c3 = Ce(-1), w = Ce(null), A4 = Ce(null), E3 = Te(() => x3.value), z5 = Te(() => {
          const e = {};
          for (const t5 of x3.value)
            e[t5.app] || (e[t5.app] = []), e[t5.app].push(t5);
          return e;
        }), F4 = Te(() => {
          var _a;
          const e = {};
          for (const t5 of (_a = p4.value) != null ? _a : [])
            t5.color && (e[t5.app] = t5.color);
          return e;
        });
        let M3 = null;
        Dn(l4, (e) => {
          if (g3.value = false, c3.value = -1, M3 && clearTimeout(M3), e.length < 2) {
            x3.value = [], h3.value = false;
            return;
          }
          h3.value = true, f.value = true, M3 = setTimeout($2, 200);
        });
        async function $2() {
          if (!(l4.value.length < 2)) {
            h3.value = true, g3.value = false;
            try {
              x3.value = await xt("dock.api.search.global_search", __spreadValues({ query: l4.value }, k4.value ? { app: k4.value } : {}));
            } catch (e) {
              g3.value = true;
            } finally {
              h3.value = false;
            }
          }
        }
        function P3(e) {
          if (e.key === "Escape") {
            D2(), e.target.blur();
            return;
          }
          e.key === "ArrowDown" ? (e.preventDefault(), c3.value = Math.min(c3.value + 1, E3.value.length - 1)) : e.key === "ArrowUp" ? (e.preventDefault(), c3.value = Math.max(c3.value - 1, 0)) : e.key === "Enter" && c3.value >= 0 && V2(E3.value[c3.value]);
        }
        function O4(e) {
          (e.metaKey || e.ctrlKey) && e.key === "k" && (e.preventDefault(), ai(() => {
            var _a;
            return (_a = w.value) == null ? void 0 : _a.focus();
          }), f.value = true);
        }
        function V2(e) {
          window.location.href = e.route, D2();
        }
        function G4(e) {
          window.location.href = e, D2();
        }
        function D2() {
          f.value = false, c3.value = -1;
        }
        function q5(e) {
          A4.value && !A4.value.contains(e.target) && D2();
        }
        return Ft(() => {
          document.addEventListener("keydown", O4), document.addEventListener("click", q5);
        }), gn(() => {
          document.removeEventListener("keydown", O4), document.removeEventListener("click", q5);
        }), (e, t5) => (Se(), yn(me, null, [Ut("div", { ref_key: "containerRef", ref: A4, class: "dock-search hidden md:flex items-center flex-1 max-w-lg mx-4 relative" }, [Ut("div", Oe, [sc(Ut("select", { "onUpdate:modelValue": t5[0] || (t5[0] = (i2) => k4.value = i2), class: "h-full px-3 text-sm text-[var(--dock-icon)] bg-black/5 dark:bg-white/5 border-r border-[var(--dock-border)] outline-none cursor-pointer shrink-0", onChange: t5[1] || (t5[1] = (i2) => l4.value.length >= 2 && $2()) }, [Ut("option", Ve, Fo(te(Vn)("All")), 1), (Se(true), yn(me, null, cc(te(p4), (i2) => (Se(), yn("option", { key: i2.app, value: i2.app }, Fo(i2.label), 9, qe))), 128))], 544), [[Le, k4.value]]), sc(Ut("input", { ref_key: "inputRef", ref: w, "onUpdate:modelValue": t5[2] || (t5[2] = (i2) => l4.value = i2), type: "text", placeholder: te(Vn)("Search..."), class: "flex-1 h-full px-3 text-sm bg-transparent text-[var(--dock-text)] placeholder-[var(--dock-icon)] outline-none min-w-0", onFocus: t5[3] || (t5[3] = (i2) => f.value = true), onKeydown: P3 }, null, 40, je2), [[Me, l4.value]]), Ut("button", { class: "h-full px-3 text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors", "aria-label": te(Vn)("Search"), onClick: t5[4] || (t5[4] = (i2) => {
          var _a;
          return l4.value.length >= 2 ? $2() : (_a = w.value) == null ? void 0 : _a.focus();
        }) }, [Z(te(K), { class: "w-4 h-4" })], 8, Be)]), f.value ? (Se(), yn("div", Ke, [h3.value ? (Se(), nt(me2, { key: 0 })) : g3.value ? (Se(), nt(Se2, { key: 1, onRetry: $2 })) : l4.value.length >= 2 ? (Se(), yn(me, { key: 2 }, [x3.value.length ? (Se(true), yn(me, { key: 1 }, cc(z5.value, (i2, j3) => (Se(), yn(me, { key: j3 }, [(Se(true), yn(me, null, cc(i2, (L4) => (Se(), nt(pe, { key: L4.name, result: L4, "app-color": F4.value[String(j3)], focused: E3.value.indexOf(L4) === c3.value, onNavigate: V2 }, null, 8, ["result", "app-color", "focused"]))), 128)), t5[8] || (t5[8] = Ut("div", { class: "mx-4 border-b border-[var(--dock-border)]" }, null, -1))], 64))), 128)) : (Se(), nt(_e, { key: 0, query: l4.value, "scoped-app": k4.value || null, onClearScope: t5[5] || (t5[5] = (i2) => {
          k4.value = "", $2();
        }) }, null, 8, ["query", "scoped-app"]))], 64)) : (Se(), nt(Ie, { key: 3, onNavigate: G4 }))])) : Qn("", true)], 512), Ut("button", { class: "dock-search md:hidden flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", "aria-label": te(Vn)("Search"), title: te(Vn)("Search"), onClick: t5[6] || (t5[6] = (i2) => y.value = true) }, [Z(te(K), { class: "w-4 h-4" })], 8, Ue), y.value ? (Se(), nt(te(u2), { key: 0, onClose: t5[7] || (t5[7] = (i2) => y.value = false) })) : Qn("", true)], 64));
      } }));
      Je = Object.freeze(Object.defineProperty({ __proto__: null, default: Fe }, Symbol.toStringTag, { value: "Module" }));
    }
  });

  // ../dock/dock/public/js/chunks/DockTimer-Bf3K_MD2.js
  var DockTimer_Bf3K_MD2_exports = {};
  __export(DockTimer_Bf3K_MD2_exports, {
    default: () => je3
  });
  var ne2, oe2, se2, le2, re2, ie2, de2, ce, ue2, z, ve2, me3, pe2, ke2, xe2, fe3, ge2, ye3, be2, _e2, he2, $e2, we2, Ce3, Te3, Se3, Ee2, De3, Be2, Ie2, Le3, Ne2, Ve2, Me3, Ae2, Re2, ze2, Fe2, Ue2, je3;
  var init_DockTimer_Bf3K_MD2 = __esm({
    "../dock/dock/public/js/chunks/DockTimer-Bf3K_MD2.js"() {
      init_dock_navbar_esm();
      init_x_Dj5OacS7();
      init_runtime_dom_esm_bundler_uPARf279();
      ne2 = _o("clock", [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }]]);
      oe2 = { class: "p-3 space-y-3" };
      se2 = { class: "text-xs font-medium text-[var(--dock-text)]" };
      le2 = { key: 0, class: "flex items-center gap-1.5 bg-black/5 dark:bg-white/10 rounded-md px-2 py-1 text-xs text-[var(--dock-text)]" };
      re2 = { class: "truncate" };
      ie2 = ["placeholder"];
      de2 = { class: "flex gap-2" };
      ce = ["disabled"];
      ue2 = { name: "DockTimerStartForm" };
      z = ms(__spreadProps(__spreadValues({}, ue2), { props: { pending: {}, loading: { type: Boolean } }, emits: ["start", "cancel"], setup(o, { emit: f }) {
        var _a;
        const c3 = o, p4 = f, t5 = Ce((_a = c3.pending) != null ? _a : null);
        return (u2, r2) => (Se(), yn("div", oe2, [Ut("p", se2, Fo(te(Vn)("Start Timer")), 1), t5.value ? (Se(), yn("div", le2, [Ut("span", re2, Fo(t5.value.label) + " \xB7 " + Fo(t5.value.doctype), 1), Ut("button", { class: "shrink-0 text-[var(--dock-icon)] hover:text-[var(--dock-text)]", onClick: r2[0] || (r2[0] = (m2) => t5.value = null) }, [Z(te(c), { class: "w-3 h-3" })])])) : (Se(), yn("input", { key: 1, type: "text", class: "w-full text-sm rounded border border-[var(--dock-border)] bg-[var(--dock-bg)] text-[var(--dock-text)] px-2 py-1.5 placeholder-[var(--dock-icon)] focus:outline-none focus:ring-1 focus:ring-[var(--dock-accent)]", placeholder: te(Vn)("What are you working on?") }, null, 8, ie2)), Ut("div", de2, [Ut("button", { class: "flex-1 px-3 py-1.5 rounded-md bg-[var(--dock-accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50", disabled: o.loading, onClick: r2[1] || (r2[1] = (m2) => p4("start", t5.value)) }, "\u25B6 " + Fo(te(Vn)("Start")), 9, ce), Ut("button", { class: "px-3 py-1.5 rounded-md text-sm text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10", onClick: r2[2] || (r2[2] = (m2) => p4("cancel")) }, Fo(te(Vn)("Cancel")), 1)])]));
      } }));
      ve2 = { class: "p-3 space-y-2" };
      me3 = { class: "flex items-center gap-2" };
      pe2 = { key: 0, class: "text-xs text-[var(--dock-icon)]" };
      ke2 = { key: 0, class: "text-xs text-[var(--dock-text)] truncate" };
      xe2 = { key: 0, class: "text-[var(--dock-icon)]" };
      fe3 = { class: "flex items-center gap-2 pt-1" };
      ge2 = ["disabled"];
      ye3 = ["disabled"];
      be2 = ["disabled"];
      _e2 = { name: "DockTimerActiveView" };
      he2 = ms(__spreadProps(__spreadValues({}, _e2), { props: { state: {}, display: {}, loading: { type: Boolean } }, emits: ["pause", "resume", "stop", "edit"], setup(o, { emit: f }) {
        const c3 = f;
        return (p4, t5) => (Se(), yn("div", ve2, [Ut("div", me3, [Ut("span", { class: qt(["w-2 h-2 rounded-full shrink-0", o.state.state === "running" ? "bg-green-500 animate-pulse" : "bg-amber-500"]) }, null, 2), Ut("span", { "aria-live": "polite", class: qt(["text-sm font-mono font-semibold", o.state.state === "running" ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"]) }, Fo(o.display), 3), o.state.state === "paused" ? (Se(), yn("span", pe2, "(" + Fo(te(Vn)("paused")) + ")", 1)) : Qn("", true)]), o.state.context_label ? (Se(), yn("div", ke2, [il(Fo(o.state.context_label) + " ", 1), o.state.context_doctype ? (Se(), yn("span", xe2, " \xB7 " + Fo(o.state.context_doctype), 1)) : Qn("", true)])) : Qn("", true), Ut("div", fe3, [o.state.state === "running" ? (Se(), yn("button", { key: 0, class: "flex-1 px-3 py-1.5 rounded-md bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition-colors disabled:opacity-50", disabled: o.loading, onClick: t5[0] || (t5[0] = (u2) => c3("pause")) }, "\u23F8 " + Fo(te(Vn)("Pause")), 9, ge2)) : (Se(), yn("button", { key: 1, class: "flex-1 px-3 py-1.5 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50", disabled: o.loading, onClick: t5[1] || (t5[1] = (u2) => c3("resume")) }, "\u25B6 " + Fo(te(Vn)("Resume")), 9, ye3)), Ut("button", { class: "px-3 py-1.5 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50", disabled: o.loading, onClick: t5[2] || (t5[2] = (u2) => c3("stop")) }, "\u23F9 " + Fo(te(Vn)("Stop")), 9, be2), Ut("button", { class: "px-2 py-1.5 rounded-md text-xs text-[var(--dock-icon)] hover:text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10", onClick: t5[3] || (t5[3] = (u2) => c3("edit")) }, "\u270E")])]));
      } }));
      $e2 = { key: 0, class: "p-3 space-y-2" };
      we2 = { class: "text-sm text-green-600 dark:text-green-400 font-medium" };
      Ce3 = ["href"];
      Te3 = { key: 1, class: "p-3 space-y-3" };
      Se3 = ["placeholder"];
      Ee2 = { class: "flex gap-2" };
      De3 = ["disabled"];
      Be2 = { name: "DockTimerStopForm" };
      Ie2 = ms(__spreadProps(__spreadValues({}, Be2), { props: { loading: { type: Boolean }, entryName: {} }, emits: ["stop", "cancel"], setup(o, { emit: f }) {
        const c3 = f, p4 = Ce("");
        return (t5, u2) => o.entryName !== void 0 && o.entryName !== null ? (Se(), yn("div", $e2, [Ut("p", we2, "\u2713 " + Fo(te(Vn)("Time entry saved")), 1), Ut("a", { href: `/app/ft-time-entry/${o.entryName}`, class: "text-xs text-[var(--dock-accent)] hover:underline" }, Fo(te(Vn)("View time entry")) + " \u2192", 9, Ce3)])) : (Se(), yn("div", Te3, [sc(Ut("textarea", { "onUpdate:modelValue": u2[0] || (u2[0] = (r2) => p4.value = r2), class: "w-full text-sm rounded border border-[var(--dock-border)] bg-[var(--dock-bg)] text-[var(--dock-text)] px-2 py-1.5 resize-none h-16 placeholder-[var(--dock-icon)] focus:outline-none focus:ring-1 focus:ring-[var(--dock-accent)]", placeholder: te(Vn)("Add notes...") }, null, 8, Se3), [[Me, p4.value]]), Ut("div", Ee2, [Ut("button", { class: "flex-1 px-3 py-1.5 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50", disabled: o.loading, onClick: u2[1] || (u2[1] = (r2) => c3("stop", p4.value)) }, "\u23F9 " + Fo(te(Vn)("Stop & Save")), 9, De3), Ut("button", { class: "px-3 py-1.5 rounded-md text-sm text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10", onClick: u2[2] || (u2[2] = (r2) => c3("cancel")) }, Fo(te(Vn)("Cancel")), 1)])]));
      } }));
      Le3 = { class: "p-3 text-sm text-[var(--dock-icon)] text-center" };
      Ne2 = { name: "DockTimerError" };
      Ve2 = ms(__spreadProps(__spreadValues({}, Ne2), { emits: ["retry"], setup(o) {
        return (f, c3) => (Se(), yn("div", Le3, [il(Fo(te(Vn)("Timer unavailable")) + " ", 1), Ut("button", { class: "underline ml-1 hover:text-[var(--dock-text)]", onClick: c3[0] || (c3[0] = (p4) => f.$emit("retry")) }, Fo(te(Vn)("Try again")), 1)]));
      } }));
      Me3 = { key: 0, id: "dock-timer-root", class: "dock-timer relative" };
      Ae2 = ["aria-label"];
      Re2 = { key: 0, class: "w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" };
      ze2 = { key: 2 };
      Fe2 = { key: 0, role: "dialog", "aria-label": "Timer", class: "absolute right-0 top-full mt-2 w-64 bg-[var(--dock-bg)] border border-[var(--dock-border)] rounded-lg shadow-lg z-20 overflow-hidden" };
      Ue2 = { name: "DockTimer" };
      je3 = ms(__spreadProps(__spreadValues({}, Ue2), { setup(o) {
        var _a, _b, _c, _d, _e5, _f;
        const { settings: f } = ql(), c3 = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) != null ? _c : window.dockBoot, p4 = (c3 == null ? void 0 : c3.frappe_time_installed) === true && ((_d = f.value) == null ? void 0 : _d.enable_global_timer) === true, t5 = Ce((_e5 = c3 == null ? void 0 : c3.timer_state) != null ? _e5 : { state: "stopped" }), u2 = Ce(null), r2 = Ce(false), m2 = Ce("start"), k4 = Ce(false), y = Ce(false), I3 = Ce(void 0), C3 = Ce((_f = t5.value.elapsed_seconds) != null ? _f : 0);
        let T3 = null;
        function U4() {
          if (E3(), t5.value.state !== "running")
            return;
          const e = t5.value.started_at ? new Date(t5.value.started_at).getTime() : 0;
          T3 = setInterval(() => {
            C3.value = e ? Math.floor((Date.now() - e) / 1e3) : C3.value + 1;
          }, 1e3);
        }
        function E3() {
          T3 && (clearInterval(T3), T3 = null);
        }
        function b(e) {
          var _a2;
          t5.value = e, C3.value = (_a2 = e.elapsed_seconds) != null ? _a2 : 0, E3(), e.state === "running" && U4(), (e.state === "stopped" || e.state === "running" || e.state === "paused") && (m2.value = e.state === "stopped" ? "start" : "active");
        }
        const S3 = Te(() => {
          const e = C3.value, a2 = Math.floor(e / 3600), g3 = Math.floor(e % 3600 / 60), H4 = e % 60;
          return [a2, g3, H4].map((J5) => String(J5).padStart(2, "0")).join(":");
        });
        function L4(e) {
          b(e);
        }
        let D2 = null;
        async function P3() {
          try {
            const e = await xt("dock.api.timer.get_state");
            b(e);
          } catch (e) {
          }
        }
        function N3(e) {
          var _a2;
          u2.value = (_a2 = e.detail) != null ? _a2 : null;
        }
        Ft(() => {
          var _a2;
          if (!p4)
            return;
          b(t5.value);
          const e = (_a2 = window.frappe) == null ? void 0 : _a2.realtime;
          (e == null ? void 0 : e.on) && e.on("dock_timer_update", L4), D2 = setInterval(P3, 3e4), window.addEventListener("dock:setTimerContext", N3), document.addEventListener("mousedown", V2), document.addEventListener("keydown", M3);
        }), gn(() => {
          var _a2;
          if (!p4)
            return;
          E3(), D2 && clearInterval(D2);
          const e = (_a2 = window.frappe) == null ? void 0 : _a2.realtime;
          (e == null ? void 0 : e.off) && e.off("dock_timer_update", L4), window.removeEventListener("dock:setTimerContext", N3), document.removeEventListener("mousedown", V2), document.removeEventListener("keydown", M3);
        });
        function V2(e) {
          const a2 = document.getElementById("dock-timer-root");
          a2 && !a2.contains(e.target) && (r2.value = false);
        }
        function M3(e) {
          e.key === "Escape" && r2.value && (r2.value = false);
        }
        async function A4(e) {
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
        async function K6() {
          k4.value = true;
          try {
            b(await xt("dock.api.timer.pause"));
          } catch (e) {
            y.value = true;
          } finally {
            k4.value = false;
          }
        }
        async function O4(e) {
          var _a2;
          k4.value = true;
          try {
            const a2 = await xt("dock.api.timer.stop", e ? { notes: e } : {});
            I3.value = (_a2 = a2.entry_name) != null ? _a2 : null, b(a2), m2.value = "stop";
          } catch (e2) {
            y.value = true;
          } finally {
            k4.value = false;
          }
        }
        async function j3(e) {
          if (e) {
            k4.value = true;
            try {
              const a2 = await xt("dock.api.timer.update_context", { context_app: e.app, context_doctype: e.doctype, context_name: e.name, context_label: e.label });
              b(a2), m2.value = "active";
            } catch (e2) {
              y.value = true;
            } finally {
              k4.value = false;
            }
          }
        }
        const G4 = Te(() => t5.value.state === "running" ? `Timer running, ${S3.value}. Click to manage.` : t5.value.state === "paused" ? `Timer paused, ${S3.value}. Click to manage.` : "Start timer");
        return (e, a2) => te(p4) ? (Se(), yn("div", Me3, [Ut("button", { class: qt(["flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-colors text-sm font-mono hover:bg-black/5 dark:hover:bg-white/10", { "text-green-600 dark:text-green-400": t5.value.state === "running", "text-amber-600 dark:text-amber-400": t5.value.state === "paused", "text-[var(--dock-icon)]": t5.value.state === "stopped" }]), "aria-label": G4.value, onClick: a2[0] || (a2[0] = (g3) => r2.value = !r2.value) }, [t5.value.state === "running" ? (Se(), yn("span", Re2)) : (Se(), nt(te(ne2), { key: 1, class: "w-3.5 h-3.5" })), t5.value.state !== "stopped" ? (Se(), yn("span", ze2, Fo(S3.value), 1)) : Qn("", true)], 10, Ae2), r2.value ? (Se(), yn("div", Fe2, [y.value ? (Se(), nt(Ve2, { key: 0, onRetry: a2[1] || (a2[1] = (g3) => y.value = false) })) : (Se(), yn(me, { key: 1 }, [m2.value === "start" ? (Se(), nt(z, { key: 0, pending: u2.value, loading: k4.value, onStart: A4, onCancel: a2[2] || (a2[2] = (g3) => r2.value = false) }, null, 8, ["pending", "loading"])) : m2.value === "active" && (t5.value.state === "running" || t5.value.state === "paused") ? (Se(), nt(he2, { key: 1, state: t5.value, display: S3.value, loading: k4.value, onPause: K6, onResume: a2[3] || (a2[3] = (g3) => A4(null)), onStop: a2[4] || (a2[4] = (g3) => m2.value = "stop"), onEdit: a2[5] || (a2[5] = (g3) => m2.value = "edit") }, null, 8, ["state", "display", "loading"])) : m2.value === "edit" ? (Se(), nt(z, { key: 2, pending: u2.value, loading: k4.value, onStart: j3, onCancel: a2[6] || (a2[6] = (g3) => m2.value = "active") }, null, 8, ["pending", "loading"])) : m2.value === "stop" ? (Se(), nt(Ie2, { key: 3, loading: k4.value, "entry-name": I3.value, onStop: O4, onCancel: a2[7] || (a2[7] = (g3) => m2.value = "active") }, null, 8, ["loading", "entry-name"])) : Qn("", true)], 64))])) : Qn("", true)])) : Qn("", true);
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/DockTimerStaleWarning-DDNZLr8e.js
  var DockTimerStaleWarning_DDNZLr8e_exports = {};
  __export(DockTimerStaleWarning_DDNZLr8e_exports, {
    default: () => A
  });
  var g, x, E, A;
  var init_DockTimerStaleWarning_DDNZLr8e = __esm({
    "../dock/dock/public/js/chunks/DockTimerStaleWarning-DDNZLr8e.js"() {
      init_dock_navbar_esm();
      g = { key: 0, class: "w-full flex items-center justify-between gap-4 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-700 text-sm text-amber-800 dark:text-amber-300" };
      x = { class: "flex items-center gap-3 shrink-0" };
      E = { name: "DockTimerStaleWarning" };
      A = ms(__spreadProps(__spreadValues({}, E), { setup(w) {
        var _a, _b, _c, _d;
        const a2 = (_d = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) != null ? _c : window.dockBoot) == null ? void 0 : _d.timer_state, l4 = Ce(false), e = Ce(false);
        Ft(() => {
          (a2 == null ? void 0 : a2.state) === "running" && (a2 == null ? void 0 : a2.elapsed_seconds) > 14400 && (e.value = true);
        });
        const d2 = Te(() => {
          var _a2;
          const n = (_a2 = a2 == null ? void 0 : a2.elapsed_seconds) != null ? _a2 : 0, o = Math.floor(n / 3600), i2 = Math.floor(n % 3600 / 60);
          return o > 0 ? `${o}h ${i2}m` : `${i2}m`;
        });
        async function m2() {
          try {
            await xt("dock.api.timer.stop");
          } catch (e2) {
          }
          e.value = false;
        }
        function p4() {
          l4.value = true, e.value = false;
        }
        return (n, o) => e.value && !l4.value ? (Se(), yn("div", g, [Ut("span", null, "\u26A0 " + Fo(te(Vn)("Your timer has been running for {0}").replace("{0}", d2.value)), 1), Ut("div", x, [Ut("button", { class: "font-medium underline hover:no-underline", onClick: m2 }, Fo(te(Vn)("Stop & Save")), 1), Ut("button", { class: "hover:underline", onClick: p4 }, Fo(te(Vn)("Keep running")), 1)])])) : Qn("", true);
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/calendar-days-ht5iomBG.js
  var t;
  var init_calendar_days_ht5iomBG = __esm({
    "../dock/dock/public/js/chunks/calendar-days-ht5iomBG.js"() {
      init_dock_navbar_esm();
      t = _o("calendar-days", [["path", { d: "M8 2v4", key: "1cmpym" }], ["path", { d: "M16 2v4", key: "4m81vk" }], ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }], ["path", { d: "M3 10h18", key: "8toen8" }], ["path", { d: "M8 14h.01", key: "6423bh" }], ["path", { d: "M12 14h.01", key: "1etili" }], ["path", { d: "M16 14h.01", key: "1gbofw" }], ["path", { d: "M8 18h.01", key: "lrp35t" }], ["path", { d: "M12 18h.01", key: "mhygvu" }], ["path", { d: "M16 18h.01", key: "kzsmim" }]]);
    }
  });

  // ../dock/dock/public/js/chunks/DockCalendarIcon-CiPK_4bv.js
  var DockCalendarIcon_CiPK_4bv_exports = {};
  __export(DockCalendarIcon_CiPK_4bv_exports, {
    default: () => h
  });
  var c2, l2, h;
  var init_DockCalendarIcon_CiPK_4bv = __esm({
    "../dock/dock/public/js/chunks/DockCalendarIcon-CiPK_4bv.js"() {
      init_dock_navbar_esm();
      init_calendar_days_ht5iomBG();
      c2 = ["title", "aria-label"];
      l2 = { name: "DockCalendarIcon" };
      h = ms(__spreadProps(__spreadValues({}, l2), { setup(d2) {
        return (i2, _2) => (Se(), yn("a", { href: "/dock/calendar", class: "flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", title: te(Vn)("Calendar"), "aria-label": te(Vn)("Calendar") }, [Z(te(t), { class: "w-4 h-4" })], 8, c2));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/useRelativeTime-DgKW5Wq7.js
  function a(o) {
    const e = new Date(o), i2 = new Date().getTime() - e.getTime(), t5 = Math.floor(i2 / 6e4);
    if (t5 < 60)
      return `${Math.max(t5, 1)}m`;
    const n = Math.floor(t5 / 60);
    return n < 24 ? `${n}h` : e.toLocaleDateString(void 0, { month: "short", day: "numeric" });
  }
  var init_useRelativeTime_DgKW5Wq7 = __esm({
    "../dock/dock/public/js/chunks/useRelativeTime-DgKW5Wq7.js"() {
    }
  });

  // ../dock/dock/public/js/chunks/external-link-9a_au9DC.js
  var t2;
  var init_external_link_9a_au9DC = __esm({
    "../dock/dock/public/js/chunks/external-link-9a_au9DC.js"() {
      init_dock_navbar_esm();
      t2 = _o("external-link", [["path", { d: "M15 3h6v6", key: "1q9fwt" }], ["path", { d: "M10 14 21 3", key: "gplh6r" }], ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]]);
    }
  });

  // ../dock/dock/public/js/chunks/DockNotificationError.vue_vue_type_script_setup_true_lang-DGfYnXnV.js
  function S(t5, n, i2, l4, d2, x3) {
    return Se(), yn("div", M, [(Se(), yn(me, null, cc(3, (p4) => Ut("div", { key: p4, class: "px-3 py-2.5 flex gap-3 items-start animate-pulse" }, [...n[0] || (n[0] = [Ut("div", { class: "w-4 h-4 rounded bg-black/10 dark:bg-white/10 mt-0.5 shrink-0" }, null, -1), Ut("div", { class: "flex-1 space-y-1.5" }, [Ut("div", { class: "h-3 rounded bg-black/10 dark:bg-white/10 w-3/4" }), Ut("div", { class: "h-2.5 rounded bg-black/10 dark:bg-white/10 w-1/2" })], -1)])])), 64))]);
  }
  var z2, L, V, B, R, T, j, F, q, I, M, A2, G, H, J, K2, O, U;
  var init_DockNotificationError_vue_vue_type_script_setup_true_lang_DGfYnXnV = __esm({
    "../dock/dock/public/js/chunks/DockNotificationError.vue_vue_type_script_setup_true_lang-DGfYnXnV.js"() {
      init_runtime_dom_esm_bundler_uPARf279();
      init_useRelativeTime_DgKW5Wq7();
      init_external_link_9a_au9DC();
      init_x_Dj5OacS7();
      init_dock_navbar_esm();
      z2 = { class: "flex-1 min-w-0" };
      L = { key: 0, class: "text-xs text-[var(--dock-icon)] truncate mt-0.5" };
      V = { class: "shrink-0 flex flex-col items-end gap-0.5 pt-0.5" };
      B = { class: "text-[10px] text-[var(--dock-icon)] capitalize" };
      R = { class: "text-[10px] text-[var(--dock-icon)]" };
      T = { class: "absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex gap-1" };
      j = ["href"];
      F = { name: "DockNotificationRow" };
      q = ms(__spreadProps(__spreadValues({}, F), { props: { notification: {}, typeInfo: {}, appColor: {} }, emits: ["markRead", "navigate"], setup(t5, { emit: n }) {
        const i2 = t5, l4 = n, d2 = Te(() => !i2.notification.read), x3 = Te(() => a(i2.notification.creation));
        return (p4, r2) => {
          var _a;
          return Se(), yn("div", { role: "menuitem", class: "group relative flex gap-3 items-start px-3 py-2.5 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors", onClick: r2[2] || (r2[2] = (h3) => l4("navigate", t5.notification)) }, [Ut("div", { class: "w-2 h-2 rounded-full mt-1.5 shrink-0", style: ls({ backgroundColor: (_a = t5.appColor) != null ? _a : "var(--dock-icon)" }) }, null, 4), Ut("div", z2, [Ut("p", { class: qt(["text-sm truncate", d2.value ? "font-semibold text-[var(--dock-text)]" : "font-normal text-[var(--dock-text)]"]) }, Fo(t5.notification.title), 3), t5.notification.message ? (Se(), yn("p", L, Fo(t5.notification.message), 1)) : Qn("", true)]), Ut("div", V, [Ut("span", B, Fo(t5.notification.from_app), 1), Ut("span", R, Fo(x3.value), 1)]), Ut("div", T, [t5.notification.action_url ? (Se(), yn("a", { key: 0, href: t5.notification.action_url, target: "_blank", rel: "noopener", class: "w-6 h-6 flex items-center justify-center rounded bg-[var(--dock-bg)] shadow-sm text-[var(--dock-icon)] hover:text-[var(--dock-text)]", onClick: r2[0] || (r2[0] = ye(() => {
          }, ["stop"])) }, [Z(te(t2), { class: "w-3 h-3" })], 8, j)) : Qn("", true), d2.value ? (Se(), yn("button", { key: 1, class: "w-6 h-6 flex items-center justify-center rounded bg-[var(--dock-bg)] shadow-sm text-[var(--dock-icon)] hover:text-[var(--dock-text)]", onClick: r2[1] || (r2[1] = ye((h3) => l4("markRead", t5.notification.name), ["stop"])) }, [Z(te(c), { class: "w-3 h-3" })])) : Qn("", true)])]);
        };
      } }));
      I = { name: "DockNotificationLoading" };
      M = { class: "py-1" };
      A2 = xl(I, [["render", S]]);
      G = { class: "px-3 py-6 text-center text-sm text-[var(--dock-icon)]" };
      H = { name: "DockNotificationEmpty" };
      J = ms(__spreadProps(__spreadValues({}, H), { setup(t5) {
        return (n, i2) => (Se(), yn("div", G, Fo(te(Vn)("You're all caught up")), 1));
      } }));
      K2 = { class: "px-3 py-4 text-center text-sm text-[var(--dock-icon)]" };
      O = { name: "DockNotificationError" };
      U = ms(__spreadProps(__spreadValues({}, O), { emits: ["retry"], setup(t5) {
        return (n, i2) => (Se(), yn("div", K2, [il(Fo(te(Vn)("Notification unavailable")) + " ", 1), Ut("button", { class: "underline ml-1 hover:text-[var(--dock-text)]", onClick: i2[0] || (i2[0] = (l4) => n.$emit("retry")) }, Fo(te(Vn)("Try again")), 1)]));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/bell-Ba4xQ-ME.js
  var t3;
  var init_bell_Ba4xQ_ME = __esm({
    "../dock/dock/public/js/chunks/bell-Ba4xQ-ME.js"() {
      init_dock_navbar_esm();
      t3 = _o("bell", [["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }], ["path", { d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326", key: "11g9vi" }]]);
    }
  });

  // ../dock/dock/public/js/chunks/DockBell-CwTetaIg.js
  var DockBell_CwTetaIg_exports = {};
  __export(DockBell_CwTetaIg_exports, {
    default: () => ne3
  });
  var K3, U2, G2, H2, J2, O2, P, Q, T2, q2, W, ne3;
  var init_DockBell_CwTetaIg = __esm({
    "../dock/dock/public/js/chunks/DockBell-CwTetaIg.js"() {
      init_dock_navbar_esm();
      init_DockNotificationError_vue_vue_type_script_setup_true_lang_DGfYnXnV();
      init_bell_Ba4xQ_ME();
      init_runtime_dom_esm_bundler_uPARf279();
      init_useRelativeTime_DgKW5Wq7();
      init_external_link_9a_au9DC();
      init_x_Dj5OacS7();
      K3 = { class: "absolute right-0 top-full mt-2 w-80 bg-[var(--dock-bg)] border border-[var(--dock-border)] rounded-lg shadow-lg z-20 overflow-hidden", role: "menu", "aria-label": "Notifications" };
      U2 = { class: "flex items-center justify-between px-3 py-2 border-b border-[var(--dock-border)]" };
      G2 = { class: "text-sm font-medium text-[var(--dock-text)]" };
      H2 = { class: "max-h-96 overflow-y-auto" };
      J2 = { class: "border-t border-[var(--dock-border)] px-3 py-2 text-center" };
      O2 = { name: "DockNotificationDropdown" };
      P = ms(__spreadProps(__spreadValues({}, O2), { emits: ["markRead", "markAllRead", "close"], setup(M3, { emit: a2 }) {
        var _a, _b, _c;
        const d2 = a2, { registeredApps: t5 } = ql(), x3 = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) != null ? _c : window.dockBoot, v2 = Te(() => {
          var _a2;
          const o = {};
          for (const i2 of (_a2 = t5.value) != null ? _a2 : [])
            i2.color && (o[i2.app] = i2.color);
          return o;
        }), k4 = Te(() => {
          var _a2;
          return (_a2 = x3 == null ? void 0 : x3.notification_types) != null ? _a2 : {};
        }), s = Ce([]), u2 = Ce(true), f = Ce(false);
        async function e() {
          u2.value = true, f.value = false;
          try {
            s.value = await xt("dock.api.notifications.get_recent", { limit: 20 });
          } catch (e2) {
            f.value = true;
          } finally {
            u2.value = false;
          }
        }
        Ft(e);
        async function n(o) {
          await xt("dock.api.notifications.mark_read", { notification_names: [o] });
          const i2 = s.value.find((l4) => l4.name === o);
          i2 && (i2.read = 1), d2("markRead", [o]);
        }
        async function h3() {
          await xt("dock.api.notifications.mark_all_read"), s.value.forEach((o) => {
            o.read = 1;
          }), d2("markAllRead");
        }
        function C3(o) {
          n(o.name), o.action_url && (window.location.href = o.action_url), d2("close");
        }
        return (o, i2) => (Se(), yn("div", K3, [Ut("div", U2, [Ut("span", G2, Fo(te(Vn)("Notifications")), 1), Ut("button", { class: "text-xs text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors", onClick: h3 }, Fo(te(Vn)("Mark all read")), 1)]), Ut("div", H2, [u2.value ? (Se(), nt(A2, { key: 0 })) : f.value ? (Se(), nt(U, { key: 1, onRetry: e })) : s.value.length ? (Se(true), yn(me, { key: 3 }, cc(s.value, (l4) => (Se(), nt(q, { key: l4.name, notification: l4, "type-info": k4.value[l4.notification_type], "app-color": v2.value[l4.from_app], onMarkRead: n, onNavigate: C3 }, null, 8, ["notification", "type-info", "app-color"]))), 128)) : (Se(), nt(J, { key: 2 }))]), Ut("div", J2, [Ut("a", { href: "/dock/notifications", class: "text-xs text-[var(--dock-accent)] hover:underline", onClick: i2[0] || (i2[0] = (l4) => o.$emit("close")) }, Fo(te(Vn)("View all notifications")) + " \u2192", 1)])]));
      } }));
      Q = { id: "dock-bell-root", class: "dock-bell relative" };
      T2 = ["aria-expanded", "aria-label"];
      q2 = { key: 0, class: "absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center leading-none" };
      W = { name: "DockBell" };
      ne3 = ms(__spreadProps(__spreadValues({}, W), { setup(M3) {
        var _a, _b, _c, _d;
        const a2 = Ce(false), d2 = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) != null ? _c : window.dockBoot, t5 = Ce((_d = d2 == null ? void 0 : d2.unread_notifications) != null ? _d : 0), x3 = Te(() => t5.value > 99 ? "99+" : String(t5.value));
        function v2(e) {
          t5.value += 1;
        }
        Ft(() => {
          var _a2;
          const e = (_a2 = window.frappe) == null ? void 0 : _a2.realtime;
          (e == null ? void 0 : e.on) && e.on("dock_notification", v2);
        }), gn(() => {
          var _a2;
          const e = (_a2 = window.frappe) == null ? void 0 : _a2.realtime;
          (e == null ? void 0 : e.off) && e.off("dock_notification", v2);
        });
        function k4(e) {
          const n = document.getElementById("dock-bell-root");
          n && !n.contains(e.target) && (a2.value = false);
        }
        Ft(() => document.addEventListener("mousedown", k4)), gn(() => document.removeEventListener("mousedown", k4));
        function s(e) {
          e.key === "Escape" && a2.value && (a2.value = false);
        }
        Ft(() => document.addEventListener("keydown", s)), gn(() => document.removeEventListener("keydown", s));
        function u2(e) {
          t5.value = Math.max(0, t5.value - e.length);
        }
        function f() {
          t5.value = 0;
        }
        return (e, n) => (Se(), yn("div", Q, [Ut("button", { class: "relative flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", "aria-expanded": a2.value, "aria-label": t5.value > 0 ? `Notifications, ${t5.value} unread` : "Notifications", title: "Notifications", onClick: n[0] || (n[0] = (h3) => a2.value = !a2.value) }, [Z(te(t3), { class: "w-4 h-4" }), t5.value > 0 ? (Se(), yn("span", q2, Fo(x3.value), 1)) : Qn("", true)], 8, T2), a2.value ? (Se(), nt(P, { key: 0, onMarkRead: u2, onMarkAllRead: f, onClose: n[1] || (n[1] = (h3) => a2.value = false) })) : Qn("", true)]));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/DockJana-CcP1bCjC.js
  var DockJana_CcP1bCjC_exports = {};
  __export(DockJana_CcP1bCjC_exports, {
    default: () => p2
  });
  var l3, i, p2;
  var init_DockJana_CcP1bCjC = __esm({
    "../dock/dock/public/js/chunks/DockJana-CcP1bCjC.js"() {
      init_dock_navbar_esm();
      l3 = _o("message-circle", [["path", { d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719", key: "1sd12s" }]]);
      i = { name: "DockJana" };
      p2 = ms(__spreadProps(__spreadValues({}, i), { setup(d2) {
        return (a2, e) => (Se(), yn("button", { class: "flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", "aria-label": "Jana", title: "Jana", onClick: e[0] || (e[0] = (m2) => a2.$emit("open")) }, [Z(te(l3), { class: "w-4 h-4" })]));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/DockAppSwitcher-CUNeqAr0.js
  var DockAppSwitcher_CUNeqAr0_exports = {};
  __export(DockAppSwitcher_CUNeqAr0_exports, {
    default: () => Be3
  });
  var P2, J3, Q2, W2, Y, Z2, ee, te3, oe3, ae2, re3, se3, ne4, le3, ce2, ie3, de3, ue3, ve3, ke3, me4, pe3, fe4, be3, he3, ge3, xe3, ye4, we4, _e3, Be3;
  var init_DockAppSwitcher_CUNeqAr0 = __esm({
    "../dock/dock/public/js/chunks/DockAppSwitcher-CUNeqAr0.js"() {
      init_runtime_dom_esm_bundler_uPARf279();
      init_dock_navbar_esm();
      init_x_Dj5OacS7();
      P2 = _o("grid-3x3", [["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }], ["path", { d: "M3 9h18", key: "1pudct" }], ["path", { d: "M3 15h18", key: "5xshup" }], ["path", { d: "M9 3v18", key: "fh3hqa" }], ["path", { d: "M15 3v18", key: "14nvp0" }]]);
      J3 = _o("grip-vertical", [["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }], ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }], ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }], ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }], ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }], ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]]);
      Q2 = _o("pencil", [["path", { d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z", key: "1a8usu" }], ["path", { d: "m15 5 4 4", key: "1mk7zo" }]]);
      W2 = ["aria-label", "title"];
      Y = { class: "text-xs font-medium text-[var(--dock-text)] leading-snug line-clamp-2" };
      Z2 = { class: "text-[10px] text-[var(--dock-icon)] mt-0.5 truncate" };
      ee = ["aria-label"];
      te3 = { name: "DockBookmarkTile" };
      oe3 = ms(__spreadProps(__spreadValues({}, te3), { props: { bookmark: {}, editMode: { type: Boolean } }, emits: ["remove", "navigate"], setup(s, { emit: g3 }) {
        const c3 = s, i2 = g3, { registeredApps: x3 } = ql(), w = Te(() => {
          var _a, _b;
          return (_b = (_a = x3.value.find((u2) => u2.app === c3.bookmark.app)) == null ? void 0 : _a.color) != null ? _b : "var(--dock-accent)";
        });
        function d2(n) {
          return `/${n.app}/${n.doctype}/${encodeURIComponent(n.docname)}`;
        }
        return (n, u2) => (Se(), yn("div", { role: "link", "aria-label": `${s.bookmark.label} (${s.bookmark.doctype})`, title: s.bookmark.label, class: "relative group rounded-lg border border-[var(--dock-border)] bg-[var(--dock-bg)] overflow-hidden cursor-pointer hover:shadow-sm transition-shadow", style: ls([{ "border-top-width": "4px" }, { borderTopColor: w.value }]), onClick: u2[1] || (u2[1] = (f) => !s.editMode && i2("navigate", d2(s.bookmark))) }, [s.editMode ? (Se(), nt(te(J3), { key: 0, role: "button", "aria-label": te(Vn)("Drag to reorder {0}").replace("{0}", s.bookmark.label), class: "dock-drag-handle absolute left-1 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--dock-icon)] cursor-grab" }, null, 8, ["aria-label"])) : Qn("", true), Ut("div", { class: qt(["px-3 py-2", s.editMode && "pl-6"]) }, [Ut("div", Y, Fo(s.bookmark.label), 1), Ut("div", Z2, Fo(s.bookmark.doctype), 1)], 2), Ut("button", { class: "absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--dock-icon)] hover:text-[var(--dock-text)]", "aria-label": te(Vn)("Remove bookmark"), onClick: u2[0] || (u2[0] = ye((f) => i2("remove", s.bookmark.name), ["stop"])) }, [Z(te(c), { class: "w-3 h-3" })], 8, ee)], 12, W2));
      } }));
      ae2 = { key: 0, class: "px-4 pt-3 pb-2" };
      re3 = { class: "flex items-center justify-between mb-2" };
      se3 = { class: "text-[10px] font-semibold uppercase tracking-wider text-[var(--dock-icon)]" };
      ne4 = ["aria-label", "aria-pressed"];
      le3 = { key: 0, class: "text-[10px] font-semibold" };
      ce2 = { class: "grid grid-cols-3 gap-2" };
      ie3 = { name: "DockBookmarks" };
      de3 = ms(__spreadProps(__spreadValues({}, ie3), { emits: ["close"], setup(s, { emit: g3 }) {
        const c3 = g3, { bookmarks: i2, removeBookmark: x3, reorderBookmarks: w } = yo(), d2 = Ce(false), n = Ce(null);
        function u2(v2) {
          n.value = v2;
        }
        function f(v2, k4) {
          if (v2.preventDefault(), n.value === null || n.value === k4)
            return;
          const e = i2.value.splice(n.value, 1)[0];
          i2.value.splice(k4, 0, e), n.value = k4;
        }
        function B2() {
          n.value = null;
        }
        function E3() {
          d2.value = false, w(i2.value.map((v2) => v2.name));
        }
        function $2(v2) {
          window.location.href = v2, c3("close");
        }
        return (v2, k4) => te(i2).length ? (Se(), yn("div", ae2, [Ut("div", re3, [Ut("span", se3, Fo(te(Vn)("Pinned")), 1), Ut("button", { class: "text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors", "aria-label": te(Vn)("Edit bookmarks"), "aria-pressed": d2.value, onClick: k4[0] || (k4[0] = (e) => d2.value ? E3() : d2.value = true) }, [d2.value ? (Se(), yn("span", le3, Fo(te(Vn)("Done")), 1)) : (Se(), nt(te(Q2), { key: 1, class: "w-3.5 h-3.5" }))], 8, ne4)]), Ut("div", ce2, [(Se(true), yn(me, null, cc(te(i2), (e, m2) => (Se(), nt(oe3, { key: e.name, bookmark: e, "edit-mode": d2.value, draggable: d2.value, onDragstart: (b) => u2(m2), onDragover: (b) => f(b, m2), onDrop: B2, onRemove: te(x3), onNavigate: $2 }, null, 8, ["bookmark", "edit-mode", "draggable", "onDragstart", "onDragover", "onRemove"]))), 128))]), k4[1] || (k4[1] = Ut("div", { class: "mt-2 border-b border-[var(--dock-border)]" }, null, -1))])) : Qn("", true);
      } }));
      ue3 = ["aria-expanded", "title"];
      ve3 = { key: 0, role: "dialog", "aria-label": "App switcher", class: "fixed inset-x-0 bottom-0 rounded-t-2xl z-40 sm:absolute sm:inset-x-auto sm:right-0 sm:bottom-auto sm:top-full sm:mt-2 sm:w-72 sm:rounded-lg sm:z-20 max-h-[420px] overflow-y-auto bg-[var(--dock-bg)] border border-[var(--dock-border)] shadow-lg p-3" };
      ke3 = { key: 0, role: "grid", "aria-label": "Installed apps", class: "grid grid-cols-3 gap-2 mb-3" };
      me4 = ["href", "aria-label", "aria-current", "onClick"];
      pe3 = ["src", "alt"];
      fe4 = { class: "text-xs text-[var(--dock-text)] truncate w-full leading-tight" };
      be3 = { key: 1, class: "flex flex-col items-center gap-3 py-8 text-center" };
      he3 = { class: "text-sm text-[var(--dock-icon)]" };
      ge3 = { class: "border-t border-[var(--dock-border)] pt-2 mt-1 space-y-0.5" };
      xe3 = { href: "/dock/apps", class: "flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-sm font-medium text-[var(--dock-accent)]" };
      ye4 = { href: "/app", class: "flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-sm text-[var(--dock-icon)]" };
      we4 = { name: "DockAppSwitcher" };
      _e3 = ms(__spreadProps(__spreadValues({}, we4), { setup(s) {
        const { registeredApps: g3 } = ql(), c3 = Ce(false), i2 = Ce(null), x3 = Ce(window.location.pathname), w = Te(() => {
          var _a, _b;
          return !!((_b = (_a = window.frappe) == null ? void 0 : _a.user_roles) == null ? void 0 : _b.includes("System Manager"));
        }), d2 = Te(() => w.value ? Vn("Install apps \u2192") : Vn("Browse all apps \u2192")), n = Te(() => {
          const e = g3.value, m2 = [];
          for (let b = 0; b < e.length; b += 3)
            m2.push(e.slice(b, b + 3));
          return m2;
        });
        function u2(e) {
          return x3.value.startsWith(e.route);
        }
        function f() {
          c3.value = false;
        }
        function B2() {
          c3.value = !c3.value;
        }
        function E3(e) {
          document.documentElement.style.setProperty("--dock-accent", e.color), window.location.href = e.route, f();
        }
        function $2(e) {
          c3.value && i2.value && !i2.value.contains(e.target) && f();
        }
        function v2(e) {
          e.key === "Escape" && c3.value && f();
        }
        function k4() {
          x3.value = window.location.pathname;
        }
        return Ft(() => {
          document.addEventListener("click", $2), document.addEventListener("keydown", v2), window.addEventListener("popstate", k4);
        }), gn(() => {
          document.removeEventListener("click", $2), document.removeEventListener("keydown", v2), window.removeEventListener("popstate", k4);
        }), (e, m2) => (Se(), yn("div", { ref_key: "rootRef", ref: i2, class: "dock-app-switcher relative" }, [Ut("button", { class: "flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", "aria-expanded": c3.value, "aria-haspopup": "true", "aria-label": "Open app switcher", title: te(Vn)("App switcher"), onClick: B2 }, [Z(te(P2), { class: "w-4 h-4" })], 8, ue3), Z(we3, { name: "dock-backdrop" }, { default: hi(() => [c3.value ? (Se(), yn("div", { key: 0, class: "fixed inset-0 bg-black/20 z-30 sm:hidden", "aria-hidden": "true", onClick: f })) : Qn("", true)]), _: 1 }), Z(we3, { name: "dock-switcher" }, { default: hi(() => [c3.value ? (Se(), yn("div", ve3, [m2[1] || (m2[1] = Ut("div", { class: "flex justify-center mb-3 sm:hidden" }, [Ut("div", { class: "w-10 h-1 rounded-full bg-gray-300 dark:bg-gray-600" })], -1)), fc(e.$slots, "panel-top", {}, void 0, true), Z(de3, { onClose: f }), te(g3).length > 0 ? (Se(), yn("div", ke3, [(Se(true), yn(me, null, cc(n.value, (b, O4) => (Se(), yn("div", { key: O4, role: "row", class: "contents" }, [(Se(true), yn(me, null, cc(b, (l4) => (Se(), yn("a", { key: l4.app, href: l4.route, role: "gridcell", "aria-label": l4.label, "aria-current": u2(l4) ? "true" : void 0, class: qt(["flex flex-col items-center gap-1.5 p-2 rounded-lg text-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dock-accent)] focus-visible:ring-offset-1", { "ring-2 ring-[var(--dock-accent)]": u2(l4) }]), onClick: ye(($e4) => E3(l4), ["prevent"]) }, [Ut("span", { class: qt(["w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0", l4.icon ? "" : "text-white text-xl font-bold"]), style: ls(l4.icon ? {} : { backgroundColor: l4.color }) }, [l4.icon ? (Se(), yn("img", { key: 0, src: l4.icon, alt: l4.label, class: "w-full h-full object-contain" }, null, 8, pe3)) : (Se(), yn(me, { key: 1 }, [il(Fo(l4.label[0]), 1)], 64))], 6), Ut("span", fe4, Fo(l4.label), 1)], 10, me4))), 128))]))), 128))])) : (Se(), yn("div", be3, [Z(te(P2), { class: "w-8 h-8 text-[var(--dock-icon)] opacity-40" }), Ut("p", he3, Fo(te(Vn)("Discover ecosystem apps")), 1)])), Ut("div", ge3, [Ut("a", xe3, Fo(d2.value), 1), Ut("a", ye4, [m2[0] || (m2[0] = Ut("img", { src: "/assets/frappe/images/frappe-framework-logo.svg", alt: "Frappe", class: "w-4 h-4" }, null, -1)), il(" " + Fo(te(Vn)("Frappe Desk")), 1)])])])) : Qn("", true)]), _: 3 })], 512));
      } }));
      Be3 = xl(_e3, [["__scopeId", "data-v-c8e97272"]]);
    }
  });

  // ../dock/dock/public/js/chunks/settings-Bn_0XBJA.js
  var t4;
  var init_settings_Bn_0XBJA = __esm({
    "../dock/dock/public/js/chunks/settings-Bn_0XBJA.js"() {
      init_dock_navbar_esm();
      t4 = _o("settings", [["path", { d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915", key: "1i5ecw" }], ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]]);
    }
  });

  // ../dock/dock/public/js/chunks/DockAvatar-6litHua8.js
  var DockAvatar_6litHua8_exports = {};
  __export(DockAvatar_6litHua8_exports, {
    default: () => ke4
  });
  function H3() {
    var _a, _b, _c, _d, _e5, _f, _g;
    const r2 = (_g = (_d = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) == null ? void 0 : _c.settings) == null ? void 0 : _d.theme) != null ? _g : (_f = (_e5 = window.dockBoot) == null ? void 0 : _e5.settings) == null ? void 0 : _f.theme;
    if (r2 === "light" || r2 === "dark" || r2 === "system")
      return r2;
    const o = localStorage.getItem(C);
    return o === "light" || o === "dark" || o === "system" ? o : "system";
  }
  function L2(r2) {
    const o = r2 === "dark" || r2 === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", o);
  }
  function K4() {
    function r2(o) {
      p3.value = o, L2(o), localStorage.setItem(C, o), xt("dock.api.settings.save_user_preference", { values: { theme: o } }).catch(() => {
      });
    }
    return { theme: p3, setTheme: r2 };
  }
  var z3, G3, C, p3, F2, Y2, q3, J4, Q3, Z3, W3, X, ee2, te4, ae3, oe4, se4, re4, le4, ne5, ie4, ke4;
  var init_DockAvatar_6litHua8 = __esm({
    "../dock/dock/public/js/chunks/DockAvatar-6litHua8.js"() {
      init_runtime_dom_esm_bundler_uPARf279();
      init_dock_navbar_esm();
      init_settings_Bn_0XBJA();
      z3 = _o("circle-user-round", [["path", { d: "M18 20a6 6 0 0 0-12 0", key: "1qehca" }], ["circle", { cx: "12", cy: "10", r: "4", key: "1h16sb" }], ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]]);
      G3 = _o("log-out", [["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }], ["path", { d: "M21 12H9", key: "dn1m92" }], ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]]);
      C = "theme";
      p3 = Ce(H3());
      L2(p3.value);
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (r2) => {
        p3.value === "system" && document.documentElement.classList.toggle("dark", r2.matches);
      });
      F2 = ["aria-expanded", "aria-label", "title"];
      Y2 = ["src", "alt"];
      q3 = { key: 2 };
      J4 = { key: 0, class: "absolute right-0 top-full mt-2 w-56 rounded-lg shadow-lg border border-[var(--dock-border)] bg-[var(--dock-bg)] py-1 z-20", role: "menu" };
      Q3 = { class: "px-3 py-2.5 border-b border-[var(--dock-border)]" };
      Z3 = { class: "text-sm font-medium text-[var(--dock-text)] truncate" };
      W3 = { class: "text-xs text-[var(--dock-icon)] truncate" };
      X = { class: "py-1 border-b border-[var(--dock-border)]" };
      ee2 = ["href"];
      te4 = { class: "py-1 border-b border-[var(--dock-border)]" };
      ae3 = { class: "flex items-center gap-2 mb-2" };
      oe4 = { class: "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide" };
      se4 = ["aria-label"];
      re4 = ["aria-checked", "onClick"];
      le4 = { class: "py-1" };
      ne5 = { href: "/app/logout", role: "menuitem", class: "flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-black/5 dark:hover:bg-white/10 transition-colors" };
      ie4 = { name: "DockAvatar" };
      ke4 = ms(__spreadProps(__spreadValues({}, ie4), { setup(r2) {
        var _a, _b, _c, _d;
        const { theme: o, setTheme: E3 } = K4(), l4 = Ce(false), k4 = Ce(null), d2 = Te(() => {
          var _a2, _b2, _c2;
          return (_c2 = (_a2 = window.frappe) == null ? void 0 : _a2.session) != null ? _c2 : (_b2 = window.dockBoot) == null ? void 0 : _b2.session;
        }), v2 = Te(() => {
          var _a2, _b2, _c2, _d2;
          return (_d2 = (_c2 = (_a2 = d2.value) == null ? void 0 : _a2.user_fullname) != null ? _c2 : (_b2 = d2.value) == null ? void 0 : _b2.user) != null ? _d2 : "";
        }), h3 = Te(() => (v2.value || "?").split(" ").map((a2) => a2[0]).slice(0, 2).join("").toUpperCase()), T3 = ((_d = ((_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) != null ? _b : window.dockBoot) != null ? _c : {}).installed_apps) != null ? _d : []).includes("frappe_time"), M3 = [{ value: "system", label: Vn("System") }, { value: "light", label: Vn("Light") }, { value: "dark", label: Vn("Dark") }];
        function y(m2) {
          k4.value && !k4.value.contains(m2.target) && (l4.value = false);
        }
        function x3(m2) {
          m2.key === "Escape" && (l4.value = false);
        }
        return Ft(() => {
          document.addEventListener("click", y), document.addEventListener("keydown", x3);
        }), gn(() => {
          document.removeEventListener("click", y), document.removeEventListener("keydown", x3);
        }), (m2, a2) => {
          var _a2;
          return Se(), yn("div", { ref_key: "wrapperRef", ref: k4, class: "dock-avatar relative" }, [Ut("button", { class: "w-8 h-8 rounded-full bg-black/10 dark:bg-white/20 hover:bg-black/15 dark:hover:bg-white/30 transition-colors flex items-center justify-center text-[var(--dock-text)] text-xs font-semibold overflow-hidden", "aria-expanded": l4.value, "aria-haspopup": "true", "aria-label": te(Vn)("User menu"), title: v2.value || te(Vn)("User menu"), onClick: a2[0] || (a2[0] = (n) => l4.value = !l4.value) }, [((_a2 = d2.value) == null ? void 0 : _a2.user_image) ? (Se(), yn("img", { key: 0, src: d2.value.user_image, alt: v2.value, class: "w-8 h-8 object-cover" }, null, 8, Y2)) : !h3.value || h3.value === "?" ? (Se(), nt(te(z3), { key: 1, class: "w-5 h-5 text-[var(--dock-icon)]" })) : (Se(), yn("span", q3, Fo(h3.value), 1))], 8, F2), Z(we3, { "enter-active-class": "transition ease-out duration-150", "enter-from-class": "opacity-0 translate-y-1.5", "enter-to-class": "opacity-100 translate-y-0", "leave-active-class": "transition ease-in duration-100", "leave-from-class": "opacity-100 translate-y-0", "leave-to-class": "opacity-0 translate-y-1.5" }, { default: hi(() => {
            var _a3, _b2;
            return [l4.value ? (Se(), yn("div", J4, [Ut("div", Q3, [Ut("p", Z3, Fo(v2.value), 1), Ut("p", W3, Fo((_a3 = d2.value) == null ? void 0 : _a3.user), 1)]), Ut("div", X, [Ut("a", { href: `/app/user/${(_b2 = d2.value) == null ? void 0 : _b2.user}`, role: "menuitem", class: "block px-3 py-1.5 text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", onClick: a2[1] || (a2[1] = (n) => l4.value = false) }, Fo(te(Vn)("My Profile")), 9, ee2), Ut("a", { href: "/dock/settings", role: "menuitem", class: "block px-3 py-1.5 text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", onClick: a2[2] || (a2[2] = (n) => l4.value = false) }, Fo(te(Vn)("Preferences")), 1)]), Ut("div", te4, [te(T3) ? (Se(), yn("a", { key: 0, href: "/app/ft-timer", role: "menuitem", class: "block px-3 py-1.5 text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", onClick: a2[3] || (a2[3] = (n) => l4.value = false) }, Fo(te(Vn)("Time")), 1)) : Qn("", true), Ut("a", { href: "/dock/guest", role: "menuitem", class: "block px-3 py-1.5 text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", onClick: a2[4] || (a2[4] = (n) => l4.value = false) }, Fo(te(Vn)("Guest Portal")), 1), Ut("a", { href: "/dock/people", role: "menuitem", class: "block px-3 py-1.5 text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", onClick: a2[5] || (a2[5] = (n) => l4.value = false) }, Fo(te(Vn)("People")), 1)]), Ut("div", { class: "px-4 py-3 border-b border-[var(--dock-border)]", onClick: a2[6] || (a2[6] = ye(() => {
            }, ["stop"])) }, [Ut("div", ae3, [Z(te(t4), { class: "w-3.5 h-3.5 text-gray-500 dark:text-gray-400" }), Ut("span", oe4, Fo(te(Vn)("Theme")), 1)]), Ut("div", { class: "flex gap-1 bg-gray-100 dark:bg-gray-900 rounded-lg p-1", role: "radiogroup", "aria-label": te(Vn)("Theme preference") }, [(Se(), yn(me, null, cc(M3, (n) => Ut("button", { key: n.value, class: qt(["flex-1 px-3 py-1.5 text-xs font-medium rounded transition-colors", te(o) === n.value ? "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm" : "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"]), role: "radio", "aria-checked": te(o) === n.value, onClick: (ue5) => te(E3)(n.value) }, Fo(n.label), 11, re4)), 64))], 8, se4)]), Ut("div", le4, [Ut("a", ne5, [Z(te(G3), { class: "w-4 h-4" }), il(" " + Fo(te(Vn)("Log out")), 1)])])])) : Qn("", true)];
          }), _: 1 })], 512);
        };
      } }));
    }
  });

  // ../dock/dock/public/js/dock-navbar.esm.js
  function ns(e) {
    const t5 = /* @__PURE__ */ Object.create(null);
    for (const n of e.split(","))
      t5[n] = 1;
    return (n) => n in t5;
  }
  function ls(e) {
    if (L3(e)) {
      const t5 = {};
      for (let n = 0; n < e.length; n++) {
        const s = e[n], r2 = ne6(s) ? Io(s) : ls(s);
        if (r2)
          for (const o in r2)
            t5[o] = r2[o];
      }
      return t5;
    } else if (ne6(e) || W4(e))
      return e;
  }
  function Io(e) {
    const t5 = {};
    return e.replace(Oo, "").split(Co).forEach((n) => {
      if (n) {
        const s = n.split(Po);
        s.length > 1 && (t5[s[0].trim()] = s[1].trim());
      }
    }), t5;
  }
  function qt(e) {
    let t5 = "";
    if (ne6(e))
      t5 = e;
    else if (L3(e))
      for (let n = 0; n < e.length; n++) {
        const s = qt(e[n]);
        s && (t5 += s + " ");
      }
    else if (W4(e))
      for (const n in e)
        e[n] && (t5 += n + " ");
    return t5.trim();
  }
  function ec(e) {
    return !!e || e === "";
  }
  function Mo(e, t5) {
    if (e.length !== t5.length)
      return false;
    let n = true;
    for (let s = 0; n && s < e.length; s++)
      n = wn(e[s], t5[s]);
    return n;
  }
  function wn(e, t5) {
    if (e === t5)
      return true;
    let n = Cs(e), s = Cs(t5);
    if (n || s)
      return n && s ? e.getTime() === t5.getTime() : false;
    if (n = Ke2(e), s = Ke2(t5), n || s)
      return e === t5;
    if (n = L3(e), s = L3(t5), n || s)
      return n && s ? Mo(e, t5) : false;
    if (n = W4(e), s = W4(t5), n || s) {
      if (!n || !s)
        return false;
      const r2 = Object.keys(e).length, o = Object.keys(t5).length;
      if (r2 !== o)
        return false;
      for (const i2 in e) {
        const l4 = e.hasOwnProperty(i2), c3 = t5.hasOwnProperty(i2);
        if (l4 && !c3 || !l4 && c3 || !wn(e[i2], t5[i2]))
          return false;
      }
    }
    return String(e) === String(t5);
  }
  function tc(e, t5) {
    return e.findIndex((n) => wn(n, t5));
  }
  function Lo() {
    return _e4;
  }
  function hr(e, t5 = false) {
    if (e.flags |= 8, t5) {
      e.next = It, It = e;
      return;
    }
    e.next = Ot, Ot = e;
  }
  function cs() {
    dr++;
  }
  function fs() {
    if (--dr > 0)
      return;
    if (It) {
      let t5 = It;
      for (It = void 0; t5; ) {
        const n = t5.next;
        t5.next = void 0, t5.flags &= -9, t5 = n;
      }
    }
    let e;
    for (; Ot; ) {
      let t5 = Ot;
      for (Ot = void 0; t5; ) {
        const n = t5.next;
        if (t5.next = void 0, t5.flags &= -9, t5.flags & 1)
          try {
            t5.trigger();
          } catch (s) {
            e || (e = s);
          }
        t5 = n;
      }
    }
    if (e)
      throw e;
  }
  function pr(e) {
    for (let t5 = e.deps; t5; t5 = t5.nextDep)
      t5.version = -1, t5.prevActiveLink = t5.dep.activeLink, t5.dep.activeLink = t5;
  }
  function gr(e) {
    let t5, n = e.depsTail, s = n;
    for (; s; ) {
      const r2 = s.prevDep;
      s.version === -1 ? (s === n && (n = r2), as(s), jo(s)) : t5 = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r2;
    }
    e.deps = t5, e.depsTail = n;
  }
  function Hn(e) {
    for (let t5 = e.deps; t5; t5 = t5.nextDep)
      if (t5.dep.version !== t5.version || t5.dep.computed && (_r(t5.dep.computed) || t5.dep.version !== t5.version))
        return true;
    return !!e._dirty;
  }
  function _r(e) {
    if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === jt) || (e.globalVersion = jt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Hn(e))))
      return;
    e.flags |= 2;
    const t5 = e.dep, n = z4, s = Ae3;
    z4 = e, Ae3 = true;
    try {
      pr(e);
      const r2 = e.fn(e._value);
      (t5.version === 0 || Ne3(r2, e._value)) && (e.flags |= 128, e._value = r2, t5.version++);
    } catch (r2) {
      throw t5.version++, r2;
    } finally {
      z4 = n, Ae3 = s, gr(e), e.flags &= -3;
    }
  }
  function as(e, t5 = false) {
    const { dep: n, prevSub: s, nextSub: r2 } = e;
    if (s && (s.nextSub = r2, e.prevSub = void 0), r2 && (r2.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
      n.computed.flags &= -5;
      for (let o = n.computed.deps; o; o = o.nextDep)
        as(o, true);
    }
    !t5 && !--n.sc && n.map && n.map.delete(n.key);
  }
  function jo(e) {
    const { prevDep: t5, nextDep: n } = e;
    t5 && (t5.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t5, e.nextDep = void 0);
  }
  function Ze() {
    mr.push(Ae3), Ae3 = false;
  }
  function Xe() {
    const e = mr.pop();
    Ae3 = e === void 0 ? true : e;
  }
  function Os(e) {
    const { cleanup: t5 } = e;
    if (e.cleanup = void 0, t5) {
      const n = z4;
      z4 = void 0;
      try {
        t5();
      } finally {
        z4 = n;
      }
    }
  }
  function yr(e) {
    if (e.dep.sc++, e.sub.flags & 4) {
      const t5 = e.dep.computed;
      if (t5 && !e.dep.subs) {
        t5.flags |= 20;
        for (let s = t5.deps; s; s = s.nextDep)
          yr(s);
      }
      const n = e.dep.subs;
      n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
    }
  }
  function ie5(e, t5, n) {
    if (Ae3 && z4) {
      let s = Nn.get(e);
      s || Nn.set(e, s = /* @__PURE__ */ new Map());
      let r2 = s.get(n);
      r2 || (s.set(n, r2 = new us()), r2.map = s, r2.key = n), r2.track();
    }
  }
  function Ye(e, t5, n, s, r2, o) {
    const i2 = Nn.get(e);
    if (!i2) {
      jt++;
      return;
    }
    const l4 = (c3) => {
      c3 && c3.trigger();
    };
    if (cs(), t5 === "clear")
      i2.forEach(l4);
    else {
      const c3 = L3(e), d2 = c3 && os(n);
      if (c3 && n === "length") {
        const a2 = Number(s);
        i2.forEach((h3, b) => {
          (b === "length" || b === $t || !Ke2(b) && b >= a2) && l4(h3);
        });
      } else
        switch ((n !== void 0 || i2.has(void 0)) && l4(i2.get(n)), d2 && l4(i2.get($t)), t5) {
          case "add":
            c3 ? d2 && l4(i2.get("length")) : (l4(i2.get(at)), gt(e) && l4(i2.get(Un)));
            break;
          case "delete":
            c3 || (l4(i2.get(at)), gt(e) && l4(i2.get(Un)));
            break;
          case "set":
            gt(e) && l4(i2.get(at));
            break;
        }
    }
    fs();
  }
  function dt(e) {
    const t5 = N(e);
    return t5 === e ? t5 : (ie5(t5, "iterate", $t), Ee3(e) ? t5 : t5.map(Pe));
  }
  function kn(e) {
    return ie5(e = N(e), "iterate", $t), e;
  }
  function Ve3(e, t5) {
    return Qe(e) ? bt(ut(e) ? Pe(t5) : t5) : Pe(t5);
  }
  function Mn(e, t5, n) {
    const s = kn(e), r2 = s[t5]();
    return s !== e && !Ee3(e) && (r2._next = r2.next, r2.next = () => {
      const o = r2._next();
      return o.done || (o.value = n(o.value)), o;
    }), r2;
  }
  function Je2(e, t5, n, s, r2, o) {
    const i2 = kn(e), l4 = i2 !== e && !Ee3(e), c3 = i2[t5];
    if (c3 !== Vo[t5]) {
      const h3 = c3.apply(e, o);
      return l4 ? Pe(h3) : h3;
    }
    let d2 = n;
    i2 !== e && (l4 ? d2 = function(h3, b) {
      return n.call(this, Ve3(e, h3), b, e);
    } : n.length > 2 && (d2 = function(h3, b) {
      return n.call(this, h3, b, e);
    }));
    const a2 = c3.call(i2, d2, s);
    return l4 && r2 ? r2(a2) : a2;
  }
  function Is(e, t5, n, s) {
    const r2 = kn(e), o = r2 !== e && !Ee3(e);
    let i2 = n, l4 = false;
    r2 !== e && (o ? (l4 = s.length === 0, i2 = function(d2, a2, h3) {
      return l4 && (l4 = false, d2 = Ve3(e, d2)), n.call(this, d2, Ve3(e, a2), h3, e);
    }) : n.length > 3 && (i2 = function(d2, a2, h3) {
      return n.call(this, d2, a2, h3, e);
    }));
    const c3 = r2[t5](i2, ...s);
    return l4 ? Ve3(e, c3) : c3;
  }
  function Fn(e, t5, n) {
    const s = N(e);
    ie5(s, "iterate", $t);
    const r2 = s[t5](...n);
    return (r2 === -1 || r2 === false) && gs(n[0]) ? (n[0] = N(n[0]), s[t5](...n)) : r2;
  }
  function St(e, t5, n = []) {
    Ze(), cs();
    const s = N(e)[t5].apply(e, n);
    return fs(), Xe(), s;
  }
  function No(e) {
    Ke2(e) || (e = String(e));
    const t5 = N(this);
    return ie5(t5, "has", e), t5.hasOwnProperty(e);
  }
  function Jo(e, t5, n) {
    return function(...s) {
      const r2 = this.__v_raw, o = N(r2), i2 = gt(o), l4 = e === "entries" || e === Symbol.iterator && i2, c3 = e === "keys" && i2, d2 = r2[e](...s), a2 = n ? Kn : t5 ? bt : Pe;
      return !t5 && ie5(o, "iterate", c3 ? Un : at), fe5(Object.create(d2), { next() {
        const { value: h3, done: b } = d2.next();
        return b ? { value: h3, done: b } : { value: l4 ? [a2(h3[0]), a2(h3[1])] : a2(h3), done: b };
      } });
    };
  }
  function tn(e) {
    return function(...t5) {
      return e === "delete" ? false : e === "clear" ? void 0 : this;
    };
  }
  function Go(e, t5) {
    const n = { get(r2) {
      const o = this.__v_raw, i2 = N(o), l4 = N(r2);
      e || (Ne3(r2, l4) && ie5(i2, "get", r2), ie5(i2, "get", l4));
      const { has: c3 } = en(i2), d2 = t5 ? Kn : e ? bt : Pe;
      if (c3.call(i2, r2))
        return d2(o.get(r2));
      if (c3.call(i2, l4))
        return d2(o.get(l4));
      o !== i2 && o.get(r2);
    }, get size() {
      const r2 = this.__v_raw;
      return !e && ie5(N(r2), "iterate", at), r2.size;
    }, has(r2) {
      const o = this.__v_raw, i2 = N(o), l4 = N(r2);
      return e || (Ne3(r2, l4) && ie5(i2, "has", r2), ie5(i2, "has", l4)), r2 === l4 ? o.has(r2) : o.has(r2) || o.has(l4);
    }, forEach(r2, o) {
      const i2 = this, l4 = i2.__v_raw, c3 = N(l4), d2 = t5 ? Kn : e ? bt : Pe;
      return !e && ie5(c3, "iterate", at), l4.forEach((a2, h3) => r2.call(o, d2(a2), d2(h3), i2));
    } };
    return fe5(n, e ? { add: tn("add"), set: tn("set"), delete: tn("delete"), clear: tn("clear") } : { add(r2) {
      const o = N(this), i2 = en(o), l4 = N(r2), c3 = !t5 && !Ee3(r2) && !Qe(r2) ? l4 : r2;
      return i2.has.call(o, c3) || Ne3(r2, c3) && i2.has.call(o, r2) || Ne3(l4, c3) && i2.has.call(o, l4) || (o.add(c3), Ye(o, "add", c3, c3)), this;
    }, set(r2, o) {
      !t5 && !Ee3(o) && !Qe(o) && (o = N(o));
      const i2 = N(this), { has: l4, get: c3 } = en(i2);
      let d2 = l4.call(i2, r2);
      d2 || (r2 = N(r2), d2 = l4.call(i2, r2));
      const a2 = c3.call(i2, r2);
      return i2.set(r2, o), d2 ? Ne3(o, a2) && Ye(i2, "set", r2, o) : Ye(i2, "add", r2, o), this;
    }, delete(r2) {
      const o = N(this), { has: i2, get: l4 } = en(o);
      let c3 = i2.call(o, r2);
      c3 || (r2 = N(r2), c3 = i2.call(o, r2)), l4 && l4.call(o, r2);
      const d2 = o.delete(r2);
      return c3 && Ye(o, "delete", r2, void 0), d2;
    }, clear() {
      const r2 = N(this), o = r2.size !== 0, i2 = r2.clear();
      return o && Ye(r2, "clear", void 0, void 0), i2;
    } }), ["keys", "values", "entries", Symbol.iterator].forEach((r2) => {
      n[r2] = Jo(r2, e, t5);
    }), n;
  }
  function ds(e, t5) {
    const n = Go(e, t5);
    return (s, r2, o) => r2 === "__v_isReactive" ? !e : r2 === "__v_isReadonly" ? e : r2 === "__v_raw" ? s : Reflect.get(U3(n, r2) && r2 in s ? n : s, r2, o);
  }
  function Qo(e) {
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
  function ei(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Qo(To(e));
  }
  function hs(e) {
    return Qe(e) ? e : ps(e, false, Ko, Yo, wr);
  }
  function ti(e) {
    return ps(e, false, qo, zo, kr);
  }
  function Wn(e) {
    return ps(e, true, Wo, Zo, Tr);
  }
  function ps(e, t5, n, s, r2) {
    if (!W4(e) || e.__v_raw && !(t5 && e.__v_isReactive))
      return e;
    const o = ei(e);
    if (o === 0)
      return e;
    const i2 = r2.get(e);
    if (i2)
      return i2;
    const l4 = new Proxy(e, o === 2 ? s : n);
    return r2.set(e, l4), l4;
  }
  function ut(e) {
    return Qe(e) ? ut(e.__v_raw) : !!(e && e.__v_isReactive);
  }
  function Qe(e) {
    return !!(e && e.__v_isReadonly);
  }
  function Ee3(e) {
    return !!(e && e.__v_isShallow);
  }
  function gs(e) {
    return e ? !!e.__v_raw : false;
  }
  function N(e) {
    const t5 = e && e.__v_raw;
    return t5 ? N(t5) : e;
  }
  function ni(e) {
    return !U3(e, "__v_skip") && Object.isExtensible(e) && cr(e, "__v_skip", true), e;
  }
  function ce3(e) {
    return e ? e.__v_isRef === true : false;
  }
  function Ce(e) {
    return Sr(e, false);
  }
  function Sr(e, t5) {
    return ce3(e) ? e : new si(e, t5);
  }
  function te(e) {
    return ce3(e) ? e.value : e;
  }
  function Er(e) {
    return ut(e) ? e : new Proxy(e, ri);
  }
  function ii(e, t5, n = false) {
    let s, r2;
    return j2(e) ? s = e : (s = e.get, r2 = e.set), new oi(s, r2, n);
  }
  function li(e, t5 = false, n = ct) {
    if (n) {
      let s = un.get(n);
      s || un.set(n, s = []), s.push(e);
    }
  }
  function ci(e, t5, n = q4) {
    const { immediate: s, deep: r2, once: o, scheduler: i2, augmentJob: l4, call: c3 } = n, d2 = (C3) => r2 ? C3 : Ee3(C3) || r2 === false || r2 === 0 ? ze3(C3, 1) : ze3(C3);
    let a2, h3, b, x3, k4 = false, v2 = false;
    if (ce3(e) ? (h3 = () => e.value, k4 = Ee3(e)) : ut(e) ? (h3 = () => d2(e), k4 = true) : L3(e) ? (v2 = true, k4 = e.some((C3) => ut(C3) || Ee3(C3)), h3 = () => e.map((C3) => {
      if (ce3(C3))
        return C3.value;
      if (ut(C3))
        return d2(C3);
      if (j2(C3))
        return c3 ? c3(C3, 2) : C3();
    })) : j2(e) ? t5 ? h3 = c3 ? () => c3(e, 2) : e : h3 = () => {
      if (b) {
        Ze();
        try {
          b();
        } finally {
          Xe();
        }
      }
      const C3 = ct;
      ct = a2;
      try {
        return c3 ? c3(e, 3, [x3]) : e(x3);
      } finally {
        ct = C3;
      }
    } : h3 = Ue3, t5 && r2) {
      const C3 = h3, B2 = r2 === true ? 1 / 0 : r2;
      h3 = () => ze3(C3(), B2);
    }
    const F4 = Lo(), R3 = () => {
      a2.stop(), F4 && F4.active && rs(F4.effects, a2);
    };
    if (o && t5) {
      const C3 = t5;
      t5 = (...B2) => {
        C3(...B2), R3();
      };
    }
    let P3 = v2 ? new Array(e.length).fill(nn) : nn;
    const M3 = (C3) => {
      if (!(!(a2.flags & 1) || !a2.dirty && !C3))
        if (t5) {
          const B2 = a2.run();
          if (r2 || k4 || (v2 ? B2.some((J5, ee4) => Ne3(J5, P3[ee4])) : Ne3(B2, P3))) {
            b && b();
            const J5 = ct;
            ct = a2;
            try {
              const ee4 = [B2, P3 === nn ? void 0 : v2 && P3[0] === nn ? [] : P3, x3];
              P3 = B2, c3 ? c3(t5, 3, ee4) : t5(...ee4);
            } finally {
              ct = J5;
            }
          }
        } else
          a2.run();
    };
    return l4 && l4(M3), a2 = new ur(h3), a2.scheduler = i2 ? () => i2(M3, false) : M3, x3 = (C3) => li(C3, false, a2), b = a2.onStop = () => {
      const C3 = un.get(a2);
      if (C3) {
        if (c3)
          c3(C3, 4);
        else
          for (const B2 of C3)
            B2();
        un.delete(a2);
      }
    }, t5 ? s ? M3(true) : P3 = a2.run() : i2 ? i2(M3.bind(null, true), true) : a2.run(), R3.pause = a2.pause.bind(a2), R3.resume = a2.resume.bind(a2), R3.stop = R3, R3;
  }
  function ze3(e, t5 = 1 / 0, n) {
    if (t5 <= 0 || !W4(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t5))
      return e;
    if (n.set(e, t5), t5--, ce3(e))
      ze3(e.value, t5, n);
    else if (L3(e))
      for (let s = 0; s < e.length; s++)
        ze3(e[s], t5, n);
    else if (rr(e) || gt(e))
      e.forEach((s) => {
        ze3(s, t5, n);
      });
    else if (lr(e)) {
      for (const s in e)
        ze3(e[s], t5, n);
      for (const s of Object.getOwnPropertySymbols(e))
        Object.prototype.propertyIsEnumerable.call(e, s) && ze3(e[s], t5, n);
    }
    return e;
  }
  function Jt(e, t5, n, s) {
    try {
      return s ? e(...s) : e();
    } catch (r2) {
      Gt(r2, t5, n);
    }
  }
  function qe2(e, t5, n, s) {
    if (j2(e)) {
      const r2 = Jt(e, t5, n, s);
      return r2 && or(r2) && r2.catch((o) => {
        Gt(o, t5, n);
      }), r2;
    }
    if (L3(e)) {
      const r2 = [];
      for (let o = 0; o < e.length; o++)
        r2.push(qe2(e[o], t5, n, s));
      return r2;
    }
  }
  function Gt(e, t5, n, s = true) {
    const r2 = t5 ? t5.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: i2 } = t5 && t5.appContext.config || q4;
    if (t5) {
      let l4 = t5.parent;
      const c3 = t5.proxy, d2 = `https://vuejs.org/error-reference/#runtime-${n}`;
      for (; l4; ) {
        const a2 = l4.ec;
        if (a2) {
          for (let h3 = 0; h3 < a2.length; h3++)
            if (a2[h3](e, c3, d2) === false)
              return;
        }
        l4 = l4.parent;
      }
      if (o) {
        Ze(), Jt(o, null, 10, [e, c3, d2]), Xe();
        return;
      }
    }
    fi(e, n, r2, s, i2);
  }
  function fi(e, t5, n, s = true, r2 = false) {
    if (r2)
      throw e;
    console.error(e);
  }
  function ai(e) {
    const t5 = dn || Ar;
    return e ? t5.then(this ? e.bind(this) : e) : t5;
  }
  function ui(e) {
    let t5 = $e3 + 1, n = he4.length;
    for (; t5 < n; ) {
      const s = t5 + n >>> 1, r2 = he4[s], o = Bt(r2);
      o < e || o === e && r2.flags & 2 ? t5 = s + 1 : n = s;
    }
    return t5;
  }
  function _s(e) {
    if (!(e.flags & 1)) {
      const t5 = Bt(e), n = he4[he4.length - 1];
      !n || !(e.flags & 2) && t5 >= Bt(n) ? he4.push(e) : he4.splice(ui(t5), 0, e), e.flags |= 1, Cr();
    }
  }
  function Cr() {
    dn || (dn = Ar.then(Or));
  }
  function di(e) {
    L3(e) ? _t.push(...e) : tt && e.id === -1 ? tt.splice(ht + 1, 0, e) : e.flags & 1 || (_t.push(e), e.flags |= 1), Cr();
  }
  function Rs(e, t5, n = $e3 + 1) {
    for (; n < he4.length; n++) {
      const s = he4[n];
      if (s && s.flags & 2) {
        if (e && s.id !== e.uid)
          continue;
        he4.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
      }
    }
  }
  function Pr(e) {
    if (_t.length) {
      const t5 = [...new Set(_t)].sort((n, s) => Bt(n) - Bt(s));
      if (_t.length = 0, tt) {
        tt.push(...t5);
        return;
      }
      for (tt = t5, ht = 0; ht < tt.length; ht++) {
        const n = tt[ht];
        n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
      }
      tt = null, ht = 0;
    }
  }
  function Or(e) {
    try {
      for ($e3 = 0; $e3 < he4.length; $e3++) {
        const t5 = he4[$e3];
        t5 && !(t5.flags & 8) && (t5.flags & 4 && (t5.flags &= -2), Jt(t5, t5.i, t5.i ? 15 : 14), t5.flags & 4 || (t5.flags &= -2));
      }
    } finally {
      for (; $e3 < he4.length; $e3++) {
        const t5 = he4[$e3];
        t5 && (t5.flags &= -2);
      }
      $e3 = -1, he4.length = 0, Pr(), dn = null, (he4.length || _t.length) && Or();
    }
  }
  function hn(e) {
    const t5 = re5;
    return re5 = e, Ir = e && e.type.__scopeId || null, t5;
  }
  function hi(e, t5 = re5, n) {
    if (!t5 || e._n)
      return e;
    const s = (...r2) => {
      s._d && mn(-1);
      const o = hn(t5);
      let i2;
      try {
        i2 = e(...r2);
      } finally {
        hn(o), s._d && mn(1);
      }
      return i2;
    };
    return s._n = true, s._c = true, s._d = true, s;
  }
  function sc(e, t5) {
    if (re5 === null)
      return e;
    const n = An(re5), s = e.dirs || (e.dirs = []);
    for (let r2 = 0; r2 < t5.length; r2++) {
      let [o, i2, l4, c3 = q4] = t5[r2];
      o && (j2(o) && (o = { mounted: o, updated: o }), o.deep && ze3(i2), s.push({ dir: o, instance: n, value: i2, oldValue: void 0, arg: l4, modifiers: c3 }));
    }
    return e;
  }
  function it(e, t5, n, s) {
    const r2 = e.dirs, o = t5 && t5.dirs;
    for (let i2 = 0; i2 < r2.length; i2++) {
      const l4 = r2[i2];
      o && (l4.oldValue = o[i2].value);
      let c3 = l4.dir[s];
      c3 && (Ze(), qe2(c3, n, 8, [e.el, l4, e, t5]), Xe());
    }
  }
  function pi(e, t5) {
    if (se5) {
      let n = se5.provides;
      const s = se5.parent && se5.parent.provides;
      s === n && (n = se5.provides = Object.create(s)), n[e] = t5;
    }
  }
  function cn(e, t5, n = false) {
    const s = ho();
    if (s || yt) {
      let r2 = yt ? yt._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
      if (r2 && e in r2)
        return r2[e];
      if (arguments.length > 1)
        return n && j2(t5) ? t5.call(s && s.proxy) : t5;
    }
  }
  function Dn(e, t5, n) {
    return Rr(e, t5, n);
  }
  function Rr(e, t5, n = q4) {
    const { immediate: s, deep: r2, flush: o, once: i2 } = n, l4 = fe5({}, n), c3 = t5 && s || !t5 && o !== "post";
    let d2;
    if (vt) {
      if (o === "sync") {
        const x3 = _i();
        d2 = x3.__watcherHandles || (x3.__watcherHandles = []);
      } else if (!c3) {
        const x3 = () => {
        };
        return x3.stop = Ue3, x3.resume = Ue3, x3.pause = Ue3, x3;
      }
    }
    const a2 = se5;
    l4.call = (x3, k4, v2) => qe2(x3, a2, k4, v2);
    let h3 = false;
    o === "post" ? l4.scheduler = (x3) => {
      oe5(x3, a2 && a2.suspense);
    } : o !== "sync" && (h3 = true, l4.scheduler = (x3, k4) => {
      k4 ? x3() : _s(x3);
    }), l4.augmentJob = (x3) => {
      t5 && (x3.flags |= 4), h3 && (x3.flags |= 2, a2 && (x3.id = a2.uid, x3.i = a2));
    };
    const b = ci(e, t5, l4);
    return vt && (d2 ? d2.push(b) : c3 && b()), b;
  }
  function mi(e, t5, n) {
    const s = this.proxy, r2 = ne6(e) ? e.includes(".") ? Mr(s, e) : () => s[e] : e.bind(s, s);
    let o;
    j2(t5) ? o = t5 : (o = t5.handler, n = t5);
    const i2 = zt(this), l4 = Rr(r2, o.bind(s), n);
    return i2(), l4;
  }
  function Mr(e, t5) {
    const n = t5.split(".");
    return () => {
      let s = e;
      for (let r2 = 0; r2 < n.length && s; r2++)
        s = s[n[r2]];
      return s;
    };
  }
  function sn(e, t5, n, { o: { insert: s }, m: r2 }, o = 2) {
    o === 0 && s(e.targetAnchor, t5, n);
    const { el: i2, anchor: l4, shapeFlag: c3, children: d2, props: a2 } = e, h3 = o === 2;
    if (h3 && s(i2, t5, n), (!h3 || Rt(a2)) && c3 & 16)
      for (let b = 0; b < d2.length; b++)
        r2(d2[b], t5, n, 2);
    h3 && s(l4, t5, n);
  }
  function yi(e, t5, n, s, r2, o, { o: { nextSibling: i2, parentNode: l4, querySelector: c3, insert: d2, createText: a2 } }, h3) {
    function b(F4, R3) {
      let P3 = R3;
      for (; P3; ) {
        if (P3 && P3.nodeType === 8) {
          if (P3.data === "teleport start anchor")
            t5.targetStart = P3;
          else if (P3.data === "teleport anchor") {
            t5.targetAnchor = P3, F4._lpa = t5.targetAnchor && i2(t5.targetAnchor);
            break;
          }
        }
        P3 = i2(P3);
      }
    }
    function x3(F4, R3) {
      R3.anchor = h3(i2(F4), R3, l4(F4), n, s, r2, o);
    }
    const k4 = t5.target = qn(t5.props, c3), v2 = Rt(t5.props);
    if (k4) {
      const F4 = k4._lpa || k4.firstChild;
      t5.shapeFlag & 16 && (v2 ? (x3(e, t5), b(k4, F4), t5.targetAnchor || Jn(k4, t5, a2, d2, l4(e) === k4 ? e : null)) : (t5.anchor = i2(e), b(k4, F4), t5.targetAnchor || Jn(k4, t5, a2, d2), h3(F4 && i2(F4), t5, k4, n, s, r2, o))), fn(t5, v2);
    } else
      v2 && t5.shapeFlag & 16 && (x3(e, t5), t5.targetStart = e, t5.targetAnchor = i2(e));
    return t5.anchor && i2(t5.anchor);
  }
  function fn(e, t5) {
    const n = e.ctx;
    if (n && n.ut) {
      let s, r2;
      for (t5 ? (s = e.el, r2 = e.anchor) : (s = e.targetStart, r2 = e.targetAnchor); s && s !== r2; )
        s.nodeType === 1 && s.setAttribute("data-v-owner", n.uid), s = s.nextSibling;
      n.ut();
    }
  }
  function Jn(e, t5, n, s, r2 = null) {
    const o = t5.targetStart = n(""), i2 = t5.targetAnchor = n("");
    return o[Fr] = i2, e && (s(o, e, r2), s(i2, e, r2)), i2;
  }
  function bi() {
    const e = { isMounted: false, isLeaving: false, isUnmounting: false, leavingVNodes: /* @__PURE__ */ new Map() };
    return Ft(() => {
      e.isMounted = true;
    }), Nr(() => {
      e.isUnmounting = true;
    }), e;
  }
  function $r(e) {
    let t5 = e[0];
    if (e.length > 1) {
      for (const n of e)
        if (n.type !== le5) {
          t5 = n;
          break;
        }
    }
    return t5;
  }
  function Br(e, t5) {
    const { leavingVNodes: n } = e;
    let s = n.get(t5.type);
    return s || (s = /* @__PURE__ */ Object.create(null), n.set(t5.type, s)), s;
  }
  function Gn(e, t5, n, s, r2) {
    const { appear: o, mode: i2, persisted: l4 = false, onBeforeEnter: c3, onEnter: d2, onAfterEnter: a2, onEnterCancelled: h3, onBeforeLeave: b, onLeave: x3, onAfterLeave: k4, onLeaveCancelled: v2, onBeforeAppear: F4, onAppear: R3, onAfterAppear: P3, onAppearCancelled: M3 } = t5, C3 = String(e.key), B2 = Br(n, e), J5 = (A4, $2) => {
      A4 && qe2(A4, s, 9, $2);
    }, ee4 = (A4, $2) => {
      const X2 = $2[1];
      J5(A4, $2), L3(A4) ? A4.every((ae5) => ae5.length <= 1) && X2() : A4.length <= 1 && X2();
    }, V2 = { mode: i2, persisted: l4, beforeEnter(A4) {
      let $2 = c3;
      if (!n.isMounted)
        if (o)
          $2 = F4 || c3;
        else
          return;
      A4[Be4] && A4[Be4](true);
      const X2 = B2[C3];
      X2 && ft(e, X2) && X2.el[Be4] && X2.el[Be4](), J5($2, [A4]);
    }, enter(A4) {
      if (B2[C3] === e)
        return;
      let $2 = d2, X2 = a2, ae5 = h3;
      if (!n.isMounted)
        if (o)
          $2 = R3 || d2, X2 = P3 || a2, ae5 = M3 || h3;
        else
          return;
      let xe5 = false;
      A4[Et] = (Zt2) => {
        xe5 || (xe5 = true, Zt2 ? J5(ae5, [A4]) : J5(X2, [A4]), V2.delayedLeave && V2.delayedLeave(), A4[Et] = void 0);
      };
      const Oe2 = A4[Et].bind(null, false);
      $2 ? ee4($2, [A4, Oe2]) : Oe2();
    }, leave(A4, $2) {
      const X2 = String(e.key);
      if (A4[Et] && A4[Et](true), n.isUnmounting)
        return $2();
      J5(b, [A4]);
      let ae5 = false;
      A4[Be4] = (Oe2) => {
        ae5 || (ae5 = true, $2(), Oe2 ? J5(v2, [A4]) : J5(k4, [A4]), A4[Be4] = void 0, B2[X2] === e && delete B2[X2]);
      };
      const xe5 = A4[Be4].bind(null, false);
      B2[X2] = e, x3 ? ee4(x3, [A4, xe5]) : xe5();
    }, clone(A4) {
      const $2 = Gn(A4, t5, n, s, r2);
      return r2 && r2($2), $2;
    } };
    return V2;
  }
  function Ln(e) {
    if (Yt(e))
      return e = st(e), e.children = null, e;
  }
  function Ls(e) {
    if (!Yt(e))
      return Dr(e.type) && e.children ? $r(e.children) : e;
    if (e.component)
      return e.component.subTree;
    const { shapeFlag: t5, children: n } = e;
    if (n) {
      if (t5 & 16)
        return n[0];
      if (t5 & 32 && j2(n.default))
        return n.default();
    }
  }
  function Vt(e, t5) {
    e.shapeFlag & 6 && e.component ? (e.transition = t5, Vt(e.component.subTree, t5)) : e.shapeFlag & 128 ? (e.ssContent.transition = t5.clone(e.ssContent), e.ssFallback.transition = t5.clone(e.ssFallback)) : e.transition = t5;
  }
  function Vr(e, t5 = false, n) {
    let s = [], r2 = 0;
    for (let o = 0; o < e.length; o++) {
      let i2 = e[o];
      const l4 = n == null ? i2.key : String(n) + String(i2.key != null ? i2.key : o);
      i2.type === me ? (i2.patchFlag & 128 && r2++, s = s.concat(Vr(i2.children, t5, l4))) : (t5 || i2.type !== le5) && s.push(l4 != null ? st(i2, { key: l4 }) : i2);
    }
    if (r2 > 1)
      for (let o = 0; o < s.length; o++)
        s[o].patchFlag = -2;
    return s;
  }
  function ms(e, t5) {
    return j2(e) ? fe5({ name: e.name }, t5, { setup: e }) : e;
  }
  function ys(e) {
    e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
  }
  function js(e, t5) {
    let n;
    return !!((n = Object.getOwnPropertyDescriptor(e, t5)) && !n.configurable);
  }
  function Mt(e, t5, n, s, r2 = false) {
    if (L3(e)) {
      e.forEach((v2, F4) => Mt(v2, t5 && (L3(t5) ? t5[F4] : t5), n, s, r2));
      return;
    }
    if (mt(s) && !r2) {
      s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Mt(e, t5, n, s.component.subTree);
      return;
    }
    const o = s.shapeFlag & 4 ? An(s.component) : s.el, i2 = r2 ? null : o, { i: l4, r: c3 } = e, d2 = t5 && t5.r, a2 = l4.refs === q4 ? l4.refs = {} : l4.refs, h3 = l4.setupState, b = N(h3), x3 = h3 === q4 ? nr : (v2) => js(a2, v2) ? false : U3(b, v2), k4 = (v2, F4) => !(F4 && js(a2, F4));
    if (d2 != null && d2 !== c3) {
      if ($s(t5), ne6(d2))
        a2[d2] = null, x3(d2) && (h3[d2] = null);
      else if (ce3(d2)) {
        const v2 = t5;
        k4(d2, v2.k) && (d2.value = null), v2.k && (a2[v2.k] = null);
      }
    }
    if (j2(c3))
      Jt(c3, l4, 12, [i2, a2]);
    else {
      const v2 = ne6(c3), F4 = ce3(c3);
      if (v2 || F4) {
        const R3 = () => {
          if (e.f) {
            const P3 = v2 ? x3(c3) ? h3[c3] : a2[c3] : k4() || !e.k ? c3.value : a2[e.k];
            if (r2)
              L3(P3) && rs(P3, o);
            else if (L3(P3))
              P3.includes(o) || P3.push(o);
            else if (v2)
              a2[c3] = [o], x3(c3) && (h3[c3] = a2[c3]);
            else {
              const M3 = [o];
              k4(c3, e.k) && (c3.value = M3), e.k && (a2[e.k] = M3);
            }
          } else
            v2 ? (a2[c3] = i2, x3(c3) && (h3[c3] = i2)) : F4 && (k4(c3, e.k) && (c3.value = i2), e.k && (a2[e.k] = i2));
        };
        if (i2) {
          const P3 = () => {
            R3(), pn.delete(e);
          };
          P3.id = -1, pn.set(e, P3), oe5(P3, n);
        } else
          $s(e), R3();
      }
    }
  }
  function $s(e) {
    const t5 = pn.get(e);
    t5 && (t5.flags |= 8, pn.delete(e));
  }
  function wi(e, t5) {
    if (Bs(e) && e.data === "[") {
      let n = 1, s = e.nextSibling;
      for (; s; ) {
        if (s.nodeType === 1) {
          if (t5(s) === false)
            break;
        } else if (Bs(s))
          if (s.data === "]") {
            if (--n === 0)
              break;
          } else
            s.data === "[" && n++;
        s = s.nextSibling;
      }
    } else
      t5(e);
  }
  function De(e) {
    j2(e) && (e = { loader: e });
    const { loader: t5, loadingComponent: n, errorComponent: s, delay: r2 = 200, hydrate: o, timeout: i2, suspensible: l4 = true, onError: c3 } = e;
    let d2 = null, a2, h3 = 0;
    const b = () => (h3++, d2 = null, x3()), x3 = () => {
      let k4;
      return d2 || (k4 = d2 = t5().catch((v2) => {
        if (v2 = v2 instanceof Error ? v2 : new Error(String(v2)), c3)
          return new Promise((F4, R3) => {
            c3(v2, () => F4(b()), () => R3(v2), h3 + 1);
          });
        throw v2;
      }).then((v2) => k4 !== d2 && d2 ? d2 : (v2 && (v2.__esModule || v2[Symbol.toStringTag] === "Module") && (v2 = v2.default), a2 = v2, v2)));
    };
    return ms({ name: "AsyncComponentWrapper", __asyncLoader: x3, __asyncHydrate(k4, v2, F4) {
      let R3 = false;
      (v2.bu || (v2.bu = [])).push(() => R3 = true);
      const P3 = () => {
        R3 || F4();
      }, M3 = o ? () => {
        const C3 = o(P3, (B2) => wi(k4, B2));
        C3 && (v2.bum || (v2.bum = [])).push(C3);
      } : P3;
      a2 ? M3() : x3().then(() => !v2.isUnmounted && M3());
    }, get __asyncResolved() {
      return a2;
    }, setup() {
      const k4 = se5;
      if (ys(k4), a2)
        return () => rn(a2, k4);
      const v2 = (M3) => {
        d2 = null, Gt(M3, k4, 13, !s);
      };
      if (l4 && k4.suspense || vt)
        return x3().then((M3) => () => rn(M3, k4)).catch((M3) => (v2(M3), () => s ? Z(s, { error: M3 }) : null));
      const F4 = Ce(false), R3 = Ce(), P3 = Ce(!!r2);
      return r2 && setTimeout(() => {
        P3.value = false;
      }, r2), i2 != null && setTimeout(() => {
        if (!F4.value && !R3.value) {
          const M3 = new Error(`Async component timed out after ${i2}ms.`);
          v2(M3), R3.value = M3;
        }
      }, i2), x3().then(() => {
        F4.value = true, k4.parent && Yt(k4.parent.vnode) && k4.parent.update();
      }).catch((M3) => {
        v2(M3), R3.value = M3;
      }), () => {
        if (F4.value && a2)
          return rn(a2, k4);
        if (R3.value && s)
          return Z(s, { error: R3.value });
        if (n && !P3.value)
          return rn(n, k4);
      };
    } });
  }
  function rn(e, t5) {
    const { ref: n, props: s, children: r2, ce: o } = t5.vnode, i2 = Z(e, s, r2);
    return i2.ref = n, i2.ce = o, delete t5.vnode.ce, i2;
  }
  function ki(e, t5) {
    Hr(e, "a", t5);
  }
  function Ti(e, t5) {
    Hr(e, "da", t5);
  }
  function Hr(e, t5, n = se5) {
    const s = e.__wdc || (e.__wdc = () => {
      let r2 = n;
      for (; r2; ) {
        if (r2.isDeactivated)
          return;
        r2 = r2.parent;
      }
      return e();
    });
    if (Tn(t5, s, n), n) {
      let r2 = n.parent;
      for (; r2 && r2.parent; )
        Yt(r2.parent.vnode) && Si(s, t5, n, r2), r2 = r2.parent;
    }
  }
  function Si(e, t5, n, s) {
    const r2 = Tn(t5, e, s, true);
    gn(() => {
      rs(s[t5], r2);
    }, n);
  }
  function Tn(e, t5, n = se5, s = false) {
    if (n) {
      const r2 = n[e] || (n[e] = []), o = t5.__weh || (t5.__weh = (...i2) => {
        Ze();
        const l4 = zt(n), c3 = qe2(t5, n, e, i2);
        return l4(), Xe(), c3;
      });
      return s ? r2.unshift(o) : r2.push(o), o;
    }
  }
  function Ur(e, t5 = se5) {
    Tn("ec", e, t5);
  }
  function cc(e, t5, n, s) {
    let r2;
    const o = n, i2 = L3(e);
    if (i2 || ne6(e)) {
      const l4 = i2 && ut(e);
      let c3 = false, d2 = false;
      l4 && (c3 = !Ee3(e), d2 = Qe(e), e = kn(e)), r2 = new Array(e.length);
      for (let a2 = 0, h3 = e.length; a2 < h3; a2++)
        r2[a2] = t5(c3 ? d2 ? bt(Pe(e[a2])) : Pe(e[a2]) : e[a2], a2, void 0, o);
    } else if (typeof e == "number") {
      r2 = new Array(e);
      for (let l4 = 0; l4 < e; l4++)
        r2[l4] = t5(l4 + 1, l4, void 0, o);
    } else if (W4(e))
      if (e[Symbol.iterator])
        r2 = Array.from(e, (l4, c3) => t5(l4, c3, void 0, o));
      else {
        const l4 = Object.keys(e);
        r2 = new Array(l4.length);
        for (let c3 = 0, d2 = l4.length; c3 < d2; c3++) {
          const a2 = l4[c3];
          r2[c3] = t5(e[a2], a2, c3, o);
        }
      }
    else
      r2 = [];
    return r2;
  }
  function fc(e, t5, n = {}, s, r2) {
    if (re5.ce || re5.parent && mt(re5.parent) && re5.parent.ce) {
      const d2 = Object.keys(n).length > 0;
      return t5 !== "default" && (n.name = t5), Se(), nt(me, null, [Z("slot", n, s)], d2 ? -2 : 64);
    }
    let o = e[t5];
    o && o._c && (o._d = false), Se();
    const i2 = o && Jr(o(n)), l4 = n.key || i2 && i2.key, c3 = nt(me, { key: (l4 && !Ke2(l4) ? l4 : `_${t5}`) + (!i2 && s ? "_fb" : "") }, i2 || [], i2 && e._ === 1 ? 64 : -2);
    return !r2 && c3.scopeId && (c3.slotScopeIds = [c3.scopeId + "-s"]), o && o._c && (o._d = true), c3;
  }
  function Jr(e) {
    return e.some((t5) => Nt(t5) ? !(t5.type === le5 || t5.type === me && !Jr(t5.children)) : true) ? e : null;
  }
  function Hs(e) {
    return L3(e) ? e.reduce((t5, n) => (t5[n] = null, t5), {}) : e;
  }
  function Mi(e) {
    const t5 = Yr(e), n = e.proxy, s = e.ctx;
    zn = false, t5.beforeCreate && Ns(t5.beforeCreate, e, "bc");
    const { data: r2, computed: o, methods: i2, watch: l4, provide: c3, inject: d2, created: a2, beforeMount: h3, mounted: b, beforeUpdate: x3, updated: k4, activated: v2, deactivated: F4, beforeDestroy: R3, beforeUnmount: P3, destroyed: M3, unmounted: C3, render: B2, renderTracked: J5, renderTriggered: ee4, errorCaptured: V2, serverPrefetch: A4, expose: $2, inheritAttrs: X2, components: ae5, directives: xe5, filters: Oe2 } = t5;
    if (d2 && Fi(d2, s, null), i2)
      for (const Q5 in i2) {
        const G4 = i2[Q5];
        j2(G4) && (s[Q5] = G4.bind(n));
      }
    if (r2) {
      const Q5 = r2.call(n, n);
      W4(Q5) && (e.data = hs(Q5));
    }
    if (zn = true, o)
      for (const Q5 in o) {
        const G4 = o[Q5], rt2 = j2(G4) ? G4.bind(n, n) : j2(G4.get) ? G4.get.bind(n, n) : Ue3, Xt2 = !j2(G4) && j2(G4.set) ? G4.set.bind(n) : Ue3, ot2 = Te({ get: rt2, set: Xt2 });
        Object.defineProperty(s, Q5, { enumerable: true, configurable: true, get: () => ot2.value, set: (Ie3) => ot2.value = Ie3 });
      }
    if (l4)
      for (const Q5 in l4)
        Gr(l4[Q5], s, n, Q5);
    if (c3) {
      const Q5 = j2(c3) ? c3.call(n) : c3;
      Reflect.ownKeys(Q5).forEach((G4) => {
        pi(G4, Q5[G4]);
      });
    }
    a2 && Ns(a2, e, "c");
    function ue5(Q5, G4) {
      L3(G4) ? G4.forEach((rt2) => Q5(rt2.bind(n))) : G4 && Q5(G4.bind(n));
    }
    if (ue5(Ei, h3), ue5(Ft, b), ue5(Ai, x3), ue5(Ci, k4), ue5(ki, v2), ue5(Ti, F4), ue5(Ur, V2), ue5(Ii, J5), ue5(Oi, ee4), ue5(Nr, P3), ue5(gn, C3), ue5(Pi, A4), L3($2))
      if ($2.length) {
        const Q5 = e.exposed || (e.exposed = {});
        $2.forEach((G4) => {
          Object.defineProperty(Q5, G4, { get: () => n[G4], set: (rt2) => n[G4] = rt2, enumerable: true });
        });
      } else
        e.exposed || (e.exposed = {});
    B2 && e.render === Ue3 && (e.render = B2), X2 != null && (e.inheritAttrs = X2), ae5 && (e.components = ae5), xe5 && (e.directives = xe5), A4 && ys(e);
  }
  function Fi(e, t5, n = Ue3) {
    L3(e) && (e = Zn(e));
    for (const s in e) {
      const r2 = e[s];
      let o;
      W4(r2) ? "default" in r2 ? o = cn(r2.from || s, r2.default, true) : o = cn(r2.from || s) : o = cn(r2), ce3(o) ? Object.defineProperty(t5, s, { enumerable: true, configurable: true, get: () => o.value, set: (i2) => o.value = i2 }) : t5[s] = o;
    }
  }
  function Ns(e, t5, n) {
    qe2(L3(e) ? e.map((s) => s.bind(t5.proxy)) : e.bind(t5.proxy), t5, n);
  }
  function Gr(e, t5, n, s) {
    let r2 = s.includes(".") ? Mr(n, s) : () => n[s];
    if (ne6(e)) {
      const o = t5[e];
      j2(o) && Dn(r2, o);
    } else if (j2(e))
      Dn(r2, e.bind(n));
    else if (W4(e))
      if (L3(e))
        e.forEach((o) => Gr(o, t5, n, s));
      else {
        const o = j2(e.handler) ? e.handler.bind(n) : t5[e.handler];
        j2(o) && Dn(r2, o, e);
      }
  }
  function Yr(e) {
    const t5 = e.type, { mixins: n, extends: s } = t5, { mixins: r2, optionsCache: o, config: { optionMergeStrategies: i2 } } = e.appContext, l4 = o.get(t5);
    let c3;
    return l4 ? c3 = l4 : !r2.length && !n && !s ? c3 = t5 : (c3 = {}, r2.length && r2.forEach((d2) => _n(c3, d2, i2, true)), _n(c3, t5, i2)), W4(t5) && o.set(t5, c3), c3;
  }
  function _n(e, t5, n, s = false) {
    const { mixins: r2, extends: o } = t5;
    o && _n(e, o, n, true), r2 && r2.forEach((i2) => _n(e, i2, n, true));
    for (const i2 in t5)
      if (!(s && i2 === "expose")) {
        const l4 = Di[i2] || n && n[i2];
        e[i2] = l4 ? l4(e[i2], t5[i2]) : t5[i2];
      }
    return e;
  }
  function Us(e, t5) {
    return t5 ? e ? function() {
      return fe5(j2(e) ? e.call(this, this) : e, j2(t5) ? t5.call(this, this) : t5);
    } : t5 : e;
  }
  function Li(e, t5) {
    return Ct(Zn(e), Zn(t5));
  }
  function Zn(e) {
    if (L3(e)) {
      const t5 = {};
      for (let n = 0; n < e.length; n++)
        t5[e[n]] = e[n];
      return t5;
    }
    return e;
  }
  function de4(e, t5) {
    return e ? [...new Set([].concat(e, t5))] : t5;
  }
  function Ct(e, t5) {
    return e ? fe5(/* @__PURE__ */ Object.create(null), e, t5) : t5;
  }
  function Ks(e, t5) {
    return e ? L3(e) && L3(t5) ? [.../* @__PURE__ */ new Set([...e, ...t5])] : fe5(/* @__PURE__ */ Object.create(null), Hs(e), Hs(t5 != null ? t5 : {})) : t5;
  }
  function ji(e, t5) {
    if (!e)
      return t5;
    if (!t5)
      return e;
    const n = fe5(/* @__PURE__ */ Object.create(null), e);
    for (const s in t5)
      n[s] = de4(e[s], t5[s]);
    return n;
  }
  function zr() {
    return { app: null, config: { isNativeTag: nr, performance: false, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: /* @__PURE__ */ Object.create(null), optionsCache: /* @__PURE__ */ new WeakMap(), propsCache: /* @__PURE__ */ new WeakMap(), emitsCache: /* @__PURE__ */ new WeakMap() };
  }
  function Bi(e, t5) {
    return function(s, r2 = null) {
      j2(s) || (s = fe5({}, s)), r2 != null && !W4(r2) && (r2 = null);
      const o = zr(), i2 = /* @__PURE__ */ new WeakSet(), l4 = [];
      let c3 = false;
      const d2 = o.app = { _uid: $i++, _component: s, _props: r2, _container: null, _context: o, _instance: null, version: ml, get config() {
        return o.config;
      }, set config(a2) {
      }, use(a2, ...h3) {
        return i2.has(a2) || (a2 && j2(a2.install) ? (i2.add(a2), a2.install(d2, ...h3)) : j2(a2) && (i2.add(a2), a2(d2, ...h3))), d2;
      }, mixin(a2) {
        return o.mixins.includes(a2) || o.mixins.push(a2), d2;
      }, component(a2, h3) {
        return h3 ? (o.components[a2] = h3, d2) : o.components[a2];
      }, directive(a2, h3) {
        return h3 ? (o.directives[a2] = h3, d2) : o.directives[a2];
      }, mount(a2, h3, b) {
        if (!c3) {
          const x3 = d2._ceVNode || Z(s, r2);
          return x3.appContext = o, b === true ? b = "svg" : b === false && (b = void 0), e(x3, a2, b), c3 = true, d2._container = a2, a2.__vue_app__ = d2, An(x3.component);
        }
      }, onUnmount(a2) {
        l4.push(a2);
      }, unmount() {
        c3 && (qe2(l4, d2._instance, 16), e(null, d2._container), delete d2._container.__vue_app__);
      }, provide(a2, h3) {
        return o.provides[a2] = h3, d2;
      }, runWithContext(a2) {
        const h3 = yt;
        yt = d2;
        try {
          return a2();
        } finally {
          yt = h3;
        }
      } };
      return d2;
    };
  }
  function Hi(e, t5, ...n) {
    if (e.isUnmounted)
      return;
    const s = e.vnode.props || q4;
    let r2 = n;
    const o = t5.startsWith("update:"), i2 = o && Vi(s, t5.slice(7));
    i2 && (i2.trim && (r2 = n.map((a2) => ne6(a2) ? a2.trim() : a2)), i2.number && (r2 = n.map(Ao)));
    let l4, c3 = s[l4 = Pn(t5)] || s[l4 = Pn(We(t5))];
    !c3 && o && (c3 = s[l4 = Pn(Wt(t5))]), c3 && qe2(c3, e, 6, r2);
    const d2 = s[l4 + "Once"];
    if (d2) {
      if (!e.emitted)
        e.emitted = {};
      else if (e.emitted[l4])
        return;
      e.emitted[l4] = true, qe2(d2, e, 6, r2);
    }
  }
  function Zr(e, t5, n = false) {
    const s = n ? Ni : t5.emitsCache, r2 = s.get(e);
    if (r2 !== void 0)
      return r2;
    const o = e.emits;
    let i2 = {}, l4 = false;
    if (!j2(e)) {
      const c3 = (d2) => {
        const a2 = Zr(d2, t5, true);
        a2 && (l4 = true, fe5(i2, a2));
      };
      !n && t5.mixins.length && t5.mixins.forEach(c3), e.extends && c3(e.extends), e.mixins && e.mixins.forEach(c3);
    }
    return !o && !l4 ? (W4(e) && s.set(e, null), null) : (L3(o) ? o.forEach((c3) => i2[c3] = null) : fe5(i2, o), W4(e) && s.set(e, i2), i2);
  }
  function Sn(e, t5) {
    return !e || !ss(t5) ? false : (t5 = t5.slice(2).replace(/Once$/, ""), U3(e, t5[0].toLowerCase() + t5.slice(1)) || U3(e, Wt(t5)) || U3(e, t5));
  }
  function Ws(e) {
    const { type: t5, vnode: n, proxy: s, withProxy: r2, propsOptions: [o], slots: i2, attrs: l4, emit: c3, render: d2, renderCache: a2, props: h3, data: b, setupState: x3, ctx: k4, inheritAttrs: v2 } = e, F4 = hn(e);
    let R3, P3;
    try {
      if (n.shapeFlag & 4) {
        const C3 = r2 || s, B2 = C3;
        R3 = He(d2.call(B2, C3, a2, h3, x3, b, k4)), P3 = l4;
      } else {
        const C3 = t5;
        R3 = He(C3.length > 1 ? C3(h3, { attrs: l4, slots: i2, emit: c3 }) : C3(h3, null)), P3 = t5.props ? l4 : Ui(l4);
      }
    } catch (C3) {
      Lt.length = 0, Gt(C3, e, 1), R3 = Z(le5);
    }
    let M3 = R3;
    if (P3 && v2 !== false) {
      const C3 = Object.keys(P3), { shapeFlag: B2 } = M3;
      C3.length && B2 & 7 && (o && C3.some(sr) && (P3 = Ki(P3, o)), M3 = st(M3, P3, false, true));
    }
    return n.dirs && (M3 = st(M3, null, false, true), M3.dirs = M3.dirs ? M3.dirs.concat(n.dirs) : n.dirs), n.transition && Vt(M3, n.transition), R3 = M3, hn(F4), R3;
  }
  function Wi(e, t5, n) {
    const { props: s, children: r2, component: o } = e, { props: i2, children: l4, patchFlag: c3 } = t5, d2 = o.emitsOptions;
    if (t5.dirs || t5.transition)
      return true;
    if (n && c3 >= 0) {
      if (c3 & 1024)
        return true;
      if (c3 & 16)
        return s ? qs(s, i2, d2) : !!i2;
      if (c3 & 8) {
        const a2 = t5.dynamicProps;
        for (let h3 = 0; h3 < a2.length; h3++) {
          const b = a2[h3];
          if (Xr(i2, s, b) && !Sn(d2, b))
            return true;
        }
      }
    } else
      return (r2 || l4) && (!l4 || !l4.$stable) ? true : s === i2 ? false : s ? i2 ? qs(s, i2, d2) : true : !!i2;
    return false;
  }
  function qs(e, t5, n) {
    const s = Object.keys(t5);
    if (s.length !== Object.keys(e).length)
      return true;
    for (let r2 = 0; r2 < s.length; r2++) {
      const o = s[r2];
      if (Xr(t5, e, o) && !Sn(n, o))
        return true;
    }
    return false;
  }
  function Xr(e, t5, n) {
    const s = e[n], r2 = t5[n];
    return n === "style" && W4(s) && W4(r2) ? !wn(s, r2) : s !== r2;
  }
  function qi({ vnode: e, parent: t5 }, n) {
    for (; t5; ) {
      const s = t5.subTree;
      if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)
        (e = t5.vnode).el = n, t5 = t5.parent;
      else
        break;
    }
  }
  function Ji(e, t5, n, s = false) {
    const r2 = {}, o = eo();
    e.propsDefaults = /* @__PURE__ */ Object.create(null), no(e, t5, r2, o);
    for (const i2 in e.propsOptions[0])
      i2 in r2 || (r2[i2] = void 0);
    n ? e.props = s ? r2 : ti(r2) : e.type.props ? e.props = r2 : e.props = o, e.attrs = o;
  }
  function Gi(e, t5, n, s) {
    const { props: r2, attrs: o, vnode: { patchFlag: i2 } } = e, l4 = N(r2), [c3] = e.propsOptions;
    let d2 = false;
    if ((s || i2 > 0) && !(i2 & 16)) {
      if (i2 & 8) {
        const a2 = e.vnode.dynamicProps;
        for (let h3 = 0; h3 < a2.length; h3++) {
          let b = a2[h3];
          if (Sn(e.emitsOptions, b))
            continue;
          const x3 = t5[b];
          if (c3)
            if (U3(o, b))
              x3 !== o[b] && (o[b] = x3, d2 = true);
            else {
              const k4 = We(b);
              r2[k4] = Xn(c3, l4, k4, x3, e, false);
            }
          else
            x3 !== o[b] && (o[b] = x3, d2 = true);
        }
      }
    } else {
      no(e, t5, r2, o) && (d2 = true);
      let a2;
      for (const h3 in l4)
        (!t5 || !U3(t5, h3) && ((a2 = Wt(h3)) === h3 || !U3(t5, a2))) && (c3 ? n && (n[h3] !== void 0 || n[a2] !== void 0) && (r2[h3] = Xn(c3, l4, h3, void 0, e, true)) : delete r2[h3]);
      if (o !== l4)
        for (const h3 in o)
          (!t5 || !U3(t5, h3)) && (delete o[h3], d2 = true);
    }
    d2 && Ye(e.attrs, "set", "");
  }
  function no(e, t5, n, s) {
    const [r2, o] = e.propsOptions;
    let i2 = false, l4;
    if (t5)
      for (let c3 in t5) {
        if (Pt(c3))
          continue;
        const d2 = t5[c3];
        let a2;
        r2 && U3(r2, a2 = We(c3)) ? !o || !o.includes(a2) ? n[a2] = d2 : (l4 || (l4 = {}))[a2] = d2 : Sn(e.emitsOptions, c3) || (!(c3 in s) || d2 !== s[c3]) && (s[c3] = d2, i2 = true);
      }
    if (o) {
      const c3 = N(n), d2 = l4 || q4;
      for (let a2 = 0; a2 < o.length; a2++) {
        const h3 = o[a2];
        n[h3] = Xn(r2, c3, h3, d2[h3], e, !U3(d2, h3));
      }
    }
    return i2;
  }
  function Xn(e, t5, n, s, r2, o) {
    const i2 = e[n];
    if (i2 != null) {
      const l4 = U3(i2, "default");
      if (l4 && s === void 0) {
        const c3 = i2.default;
        if (i2.type !== Function && !i2.skipFactory && j2(c3)) {
          const { propsDefaults: d2 } = r2;
          if (n in d2)
            s = d2[n];
          else {
            const a2 = zt(r2);
            s = d2[n] = c3.call(null, t5), a2();
          }
        } else
          s = c3;
        r2.ce && r2.ce._setProp(n, s);
      }
      i2[0] && (o && !l4 ? s = false : i2[1] && (s === "" || s === Wt(n)) && (s = true));
    }
    return s;
  }
  function so(e, t5, n = false) {
    const s = n ? Yi : t5.propsCache, r2 = s.get(e);
    if (r2)
      return r2;
    const o = e.props, i2 = {}, l4 = [];
    let c3 = false;
    if (!j2(e)) {
      const a2 = (h3) => {
        c3 = true;
        const [b, x3] = so(h3, t5, true);
        fe5(i2, b), x3 && l4.push(...x3);
      };
      !n && t5.mixins.length && t5.mixins.forEach(a2), e.extends && a2(e.extends), e.mixins && e.mixins.forEach(a2);
    }
    if (!o && !c3)
      return W4(e) && s.set(e, pt), pt;
    if (L3(o))
      for (let a2 = 0; a2 < o.length; a2++) {
        const h3 = We(o[a2]);
        Js(h3) && (i2[h3] = q4);
      }
    else if (o)
      for (const a2 in o) {
        const h3 = We(a2);
        if (Js(h3)) {
          const b = o[a2], x3 = i2[h3] = L3(b) || j2(b) ? { type: b } : fe5({}, b), k4 = x3.type;
          let v2 = false, F4 = true;
          if (L3(k4))
            for (let R3 = 0; R3 < k4.length; ++R3) {
              const P3 = k4[R3], M3 = j2(P3) && P3.name;
              if (M3 === "Boolean") {
                v2 = true;
                break;
              } else
                M3 === "String" && (F4 = false);
            }
          else
            v2 = j2(k4) && k4.name === "Boolean";
          x3[0] = v2, x3[1] = F4, (v2 || U3(x3, "default")) && l4.push(h3);
        }
      }
    const d2 = [i2, l4];
    return W4(e) && s.set(e, d2), d2;
  }
  function Js(e) {
    return e[0] !== "$" && !Pt(e);
  }
  function ac(e) {
    return Qi(e);
  }
  function Qi(e, t5) {
    const n = xn();
    n.__VUE__ = true;
    const { insert: s, remove: r2, patchProp: o, createElement: i2, createText: l4, createComment: c3, setText: d2, setElementText: a2, parentNode: h3, nextSibling: b, setScopeId: x3 = Ue3, insertStaticContent: k4 } = e, v2 = (f, u2, p4, y = null, g3 = null, _2 = null, S3 = void 0, T3 = null, w = !!u2.dynamicChildren) => {
      if (f === u2)
        return;
      f && !ft(f, u2) && (y = Qt2(f), Ie3(f, g3, _2, true), f = null), u2.patchFlag === -2 && (w = false, u2.dynamicChildren = null);
      const { type: m2, ref: I3, shapeFlag: E3 } = u2;
      switch (m2) {
        case En:
          F4(f, u2, p4, y);
          break;
        case le5:
          R3(f, u2, p4, y);
          break;
        case Bn:
          f == null && P3(u2, p4, y, S3);
          break;
        case me:
          ae5(f, u2, p4, y, g3, _2, S3, T3, w);
          break;
        default:
          E3 & 1 ? B2(f, u2, p4, y, g3, _2, S3, T3, w) : E3 & 6 ? xe5(f, u2, p4, y, g3, _2, S3, T3, w) : (E3 & 64 || E3 & 128) && m2.process(f, u2, p4, y, g3, _2, S3, T3, w, kt2);
      }
      I3 != null && g3 ? Mt(I3, f && f.ref, _2, u2 || f, !u2) : I3 == null && f && f.ref != null && Mt(f.ref, null, _2, f, true);
    }, F4 = (f, u2, p4, y) => {
      if (f == null)
        s(u2.el = l4(u2.children), p4, y);
      else {
        const g3 = u2.el = f.el;
        u2.children !== f.children && d2(g3, u2.children);
      }
    }, R3 = (f, u2, p4, y) => {
      f == null ? s(u2.el = c3(u2.children || ""), p4, y) : u2.el = f.el;
    }, P3 = (f, u2, p4, y) => {
      [f.el, f.anchor] = k4(f.children, u2, p4, y, f.el, f.anchor);
    }, M3 = ({ el: f, anchor: u2 }, p4, y) => {
      let g3;
      for (; f && f !== u2; )
        g3 = b(f), s(f, p4, y), f = g3;
      s(u2, p4, y);
    }, C3 = ({ el: f, anchor: u2 }) => {
      let p4;
      for (; f && f !== u2; )
        p4 = b(f), r2(f), f = p4;
      r2(u2);
    }, B2 = (f, u2, p4, y, g3, _2, S3, T3, w) => {
      if (u2.type === "svg" ? S3 = "svg" : u2.type === "math" && (S3 = "mathml"), f == null)
        J5(u2, p4, y, g3, _2, S3, T3, w);
      else {
        const m2 = f.el && f.el._isVueCE ? f.el : null;
        try {
          m2 && m2._beginPatch(), A4(f, u2, g3, _2, S3, T3, w);
        } finally {
          m2 && m2._endPatch();
        }
      }
    }, J5 = (f, u2, p4, y, g3, _2, S3, T3) => {
      let w, m2;
      const { props: I3, shapeFlag: E3, transition: O4, dirs: D2 } = f;
      if (w = f.el = i2(f.type, _2, I3 && I3.is, I3), E3 & 8 ? a2(w, f.children) : E3 & 16 && V2(f.children, w, null, y, g3, $n(f, _2), S3, T3), D2 && it(f, null, y, "created"), ee4(w, f, f.scopeId, S3, y), I3) {
        for (const Y4 in I3)
          Y4 !== "value" && !Pt(Y4) && o(w, Y4, null, I3[Y4], _2, y);
        "value" in I3 && o(w, "value", null, I3.value, _2), (m2 = I3.onVnodeBeforeMount) && Le4(m2, y, f);
      }
      D2 && it(f, null, y, "beforeMount");
      const H4 = el(g3, O4);
      H4 && O4.beforeEnter(w), s(w, u2, p4), ((m2 = I3 && I3.onVnodeMounted) || H4 || D2) && oe5(() => {
        m2 && Le4(m2, y, f), H4 && O4.enter(w), D2 && it(f, null, y, "mounted");
      }, g3);
    }, ee4 = (f, u2, p4, y, g3) => {
      if (p4 && x3(f, p4), y)
        for (let _2 = 0; _2 < y.length; _2++)
          x3(f, y[_2]);
      if (g3) {
        let _2 = g3.subTree;
        if (u2 === _2 || fo(_2.type) && (_2.ssContent === u2 || _2.ssFallback === u2)) {
          const S3 = g3.vnode;
          ee4(f, S3, S3.scopeId, S3.slotScopeIds, g3.parent);
        }
      }
    }, V2 = (f, u2, p4, y, g3, _2, S3, T3, w = 0) => {
      for (let m2 = w; m2 < f.length; m2++) {
        const I3 = f[m2] = T3 ? Ge(f[m2]) : He(f[m2]);
        v2(null, I3, u2, p4, y, g3, _2, S3, T3);
      }
    }, A4 = (f, u2, p4, y, g3, _2, S3) => {
      const T3 = u2.el = f.el;
      let { patchFlag: w, dynamicChildren: m2, dirs: I3 } = u2;
      w |= f.patchFlag & 16;
      const E3 = f.props || q4, O4 = u2.props || q4;
      let D2;
      if (p4 && lt(p4, false), (D2 = O4.onVnodeBeforeUpdate) && Le4(D2, p4, u2, f), I3 && it(u2, f, p4, "beforeUpdate"), p4 && lt(p4, true), (E3.innerHTML && O4.innerHTML == null || E3.textContent && O4.textContent == null) && a2(T3, ""), m2 ? $2(f.dynamicChildren, m2, T3, p4, y, $n(u2, g3), _2) : S3 || G4(f, u2, T3, null, p4, y, $n(u2, g3), _2, false), w > 0) {
        if (w & 16)
          X2(T3, E3, O4, p4, g3);
        else if (w & 2 && E3.class !== O4.class && o(T3, "class", null, O4.class, g3), w & 4 && o(T3, "style", E3.style, O4.style, g3), w & 8) {
          const H4 = u2.dynamicProps;
          for (let Y4 = 0; Y4 < H4.length; Y4++) {
            const K6 = H4[Y4], pe5 = E3[K6], ge5 = O4[K6];
            (ge5 !== pe5 || K6 === "value") && o(T3, K6, pe5, ge5, g3, p4);
          }
        }
        w & 1 && f.children !== u2.children && a2(T3, u2.children);
      } else
        !S3 && m2 == null && X2(T3, E3, O4, p4, g3);
      ((D2 = O4.onVnodeUpdated) || I3) && oe5(() => {
        D2 && Le4(D2, p4, u2, f), I3 && it(u2, f, p4, "updated");
      }, y);
    }, $2 = (f, u2, p4, y, g3, _2, S3) => {
      for (let T3 = 0; T3 < u2.length; T3++) {
        const w = f[T3], m2 = u2[T3], I3 = w.el && (w.type === me || !ft(w, m2) || w.shapeFlag & 198) ? h3(w.el) : p4;
        v2(w, m2, I3, null, y, g3, _2, S3, true);
      }
    }, X2 = (f, u2, p4, y, g3) => {
      if (u2 !== p4) {
        if (u2 !== q4)
          for (const _2 in u2)
            !Pt(_2) && !(_2 in p4) && o(f, _2, u2[_2], null, g3, y);
        for (const _2 in p4) {
          if (Pt(_2))
            continue;
          const S3 = p4[_2], T3 = u2[_2];
          S3 !== T3 && _2 !== "value" && o(f, _2, T3, S3, g3, y);
        }
        "value" in p4 && o(f, "value", u2.value, p4.value, g3);
      }
    }, ae5 = (f, u2, p4, y, g3, _2, S3, T3, w) => {
      const m2 = u2.el = f ? f.el : l4(""), I3 = u2.anchor = f ? f.anchor : l4("");
      let { patchFlag: E3, dynamicChildren: O4, slotScopeIds: D2 } = u2;
      D2 && (T3 = T3 ? T3.concat(D2) : D2), f == null ? (s(m2, p4, y), s(I3, p4, y), V2(u2.children || [], p4, I3, g3, _2, S3, T3, w)) : E3 > 0 && E3 & 64 && O4 && f.dynamicChildren && f.dynamicChildren.length === O4.length ? ($2(f.dynamicChildren, O4, p4, g3, _2, S3, T3), (u2.key != null || g3 && u2 === g3.subTree) && xs(f, u2, true)) : G4(f, u2, p4, I3, g3, _2, S3, T3, w);
    }, xe5 = (f, u2, p4, y, g3, _2, S3, T3, w) => {
      u2.slotScopeIds = T3, f == null ? u2.shapeFlag & 512 ? g3.ctx.activate(u2, p4, y, S3, w) : Oe2(u2, p4, y, g3, _2, S3, w) : Zt2(f, u2, w);
    }, Oe2 = (f, u2, p4, y, g3, _2, S3) => {
      const T3 = f.component = al(f, y, g3);
      if (Yt(f) && (T3.ctx.renderer = kt2), ul(T3, false, S3), T3.asyncDep) {
        if (g3 && g3.registerDep(T3, ue5, S3), !f.el) {
          const w = T3.subTree = Z(le5);
          R3(null, w, u2, p4), f.placeholder = w.el;
        }
      } else
        ue5(T3, f, u2, p4, g3, _2, S3);
    }, Zt2 = (f, u2, p4) => {
      const y = u2.component = f.component;
      if (Wi(f, u2, p4))
        if (y.asyncDep && !y.asyncResolved) {
          Q5(y, u2, p4);
          return;
        } else
          y.next = u2, y.update();
      else
        u2.el = f.el, y.vnode = u2;
    }, ue5 = (f, u2, p4, y, g3, _2, S3) => {
      const T3 = () => {
        if (f.isMounted) {
          let { next: E3, bu: O4, u: D2, parent: H4, vnode: Y4 } = f;
          {
            const Me4 = lo(f);
            if (Me4) {
              E3 && (E3.el = Y4.el, Q5(f, E3, S3)), Me4.asyncDep.then(() => {
                oe5(() => {
                  f.isUnmounted || m2();
                }, g3);
              });
              return;
            }
          }
          let K6 = E3, pe5;
          lt(f, false), E3 ? (E3.el = Y4.el, Q5(f, E3, S3)) : E3 = Y4, O4 && On(O4), (pe5 = E3.props && E3.props.onVnodeBeforeUpdate) && Le4(pe5, H4, E3, Y4), lt(f, true);
          const ge5 = Ws(f), Re3 = f.subTree;
          f.subTree = ge5, v2(Re3, ge5, h3(Re3.el), Qt2(Re3), f, g3, _2), E3.el = ge5.el, K6 === null && qi(f, ge5.el), D2 && oe5(D2, g3), (pe5 = E3.props && E3.props.onVnodeUpdated) && oe5(() => Le4(pe5, H4, E3, Y4), g3);
        } else {
          let E3;
          const { el: O4, props: D2 } = u2, { bm: H4, m: Y4, parent: K6, root: pe5, type: ge5 } = f, Re3 = mt(u2);
          lt(f, false), H4 && On(H4), !Re3 && (E3 = D2 && D2.onVnodeBeforeMount) && Le4(E3, K6, u2), lt(f, true);
          {
            pe5.ce && pe5.ce._hasShadowRoot() && pe5.ce._injectChildStyle(ge5, f.parent ? f.parent.type : void 0);
            const Me4 = f.subTree = Ws(f);
            v2(null, Me4, p4, y, f, g3, _2), u2.el = Me4.el;
          }
          if (Y4 && oe5(Y4, g3), !Re3 && (E3 = D2 && D2.onVnodeMounted)) {
            const Me4 = u2;
            oe5(() => Le4(E3, K6, Me4), g3);
          }
          (u2.shapeFlag & 256 || K6 && mt(K6.vnode) && K6.vnode.shapeFlag & 256) && f.a && oe5(f.a, g3), f.isMounted = true, u2 = p4 = y = null;
        }
      };
      f.scope.on();
      const w = f.effect = new ur(T3);
      f.scope.off();
      const m2 = f.update = w.run.bind(w), I3 = f.job = w.runIfDirty.bind(w);
      I3.i = f, I3.id = f.uid, w.scheduler = () => _s(I3), lt(f, true), m2();
    }, Q5 = (f, u2, p4) => {
      u2.component = f;
      const y = f.vnode.props;
      f.vnode = u2, f.next = null, Gi(f, u2.props, y, p4), Xi(f, u2.children, p4), Ze(), Rs(f), Xe();
    }, G4 = (f, u2, p4, y, g3, _2, S3, T3, w = false) => {
      const m2 = f && f.children, I3 = f ? f.shapeFlag : 0, E3 = u2.children, { patchFlag: O4, shapeFlag: D2 } = u2;
      if (O4 > 0) {
        if (O4 & 128) {
          Xt2(m2, E3, p4, y, g3, _2, S3, T3, w);
          return;
        } else if (O4 & 256) {
          rt2(m2, E3, p4, y, g3, _2, S3, T3, w);
          return;
        }
      }
      D2 & 8 ? (I3 & 16 && wt(m2, g3, _2), E3 !== m2 && a2(p4, E3)) : I3 & 16 ? D2 & 16 ? Xt2(m2, E3, p4, y, g3, _2, S3, T3, w) : wt(m2, g3, _2, true) : (I3 & 8 && a2(p4, ""), D2 & 16 && V2(E3, p4, y, g3, _2, S3, T3, w));
    }, rt2 = (f, u2, p4, y, g3, _2, S3, T3, w) => {
      f = f || pt, u2 = u2 || pt;
      const m2 = f.length, I3 = u2.length, E3 = Math.min(m2, I3);
      let O4;
      for (O4 = 0; O4 < E3; O4++) {
        const D2 = u2[O4] = w ? Ge(u2[O4]) : He(u2[O4]);
        v2(f[O4], D2, p4, null, g3, _2, S3, T3, w);
      }
      m2 > I3 ? wt(f, g3, _2, true, false, E3) : V2(u2, p4, y, g3, _2, S3, T3, w, E3);
    }, Xt2 = (f, u2, p4, y, g3, _2, S3, T3, w) => {
      let m2 = 0;
      const I3 = u2.length;
      let E3 = f.length - 1, O4 = I3 - 1;
      for (; m2 <= E3 && m2 <= O4; ) {
        const D2 = f[m2], H4 = u2[m2] = w ? Ge(u2[m2]) : He(u2[m2]);
        if (ft(D2, H4))
          v2(D2, H4, p4, null, g3, _2, S3, T3, w);
        else
          break;
        m2++;
      }
      for (; m2 <= E3 && m2 <= O4; ) {
        const D2 = f[E3], H4 = u2[O4] = w ? Ge(u2[O4]) : He(u2[O4]);
        if (ft(D2, H4))
          v2(D2, H4, p4, null, g3, _2, S3, T3, w);
        else
          break;
        E3--, O4--;
      }
      if (m2 > E3) {
        if (m2 <= O4) {
          const D2 = O4 + 1, H4 = D2 < I3 ? u2[D2].el : y;
          for (; m2 <= O4; )
            v2(null, u2[m2] = w ? Ge(u2[m2]) : He(u2[m2]), p4, H4, g3, _2, S3, T3, w), m2++;
        }
      } else if (m2 > O4)
        for (; m2 <= E3; )
          Ie3(f[m2], g3, _2, true), m2++;
      else {
        const D2 = m2, H4 = m2, Y4 = /* @__PURE__ */ new Map();
        for (m2 = H4; m2 <= O4; m2++) {
          const be5 = u2[m2] = w ? Ge(u2[m2]) : He(u2[m2]);
          be5.key != null && Y4.set(be5.key, m2);
        }
        let K6, pe5 = 0;
        const ge5 = O4 - H4 + 1;
        let Re3 = false, Me4 = 0;
        const Tt = new Array(ge5);
        for (m2 = 0; m2 < ge5; m2++)
          Tt[m2] = 0;
        for (m2 = D2; m2 <= E3; m2++) {
          const be5 = f[m2];
          if (pe5 >= ge5) {
            Ie3(be5, g3, _2, true);
            continue;
          }
          let Fe3;
          if (be5.key != null)
            Fe3 = Y4.get(be5.key);
          else
            for (K6 = H4; K6 <= O4; K6++)
              if (Tt[K6 - H4] === 0 && ft(be5, u2[K6])) {
                Fe3 = K6;
                break;
              }
          Fe3 === void 0 ? Ie3(be5, g3, _2, true) : (Tt[Fe3 - H4] = m2 + 1, Fe3 >= Me4 ? Me4 = Fe3 : Re3 = true, v2(be5, u2[Fe3], p4, null, g3, _2, S3, T3, w), pe5++);
        }
        const Ss = Re3 ? tl(Tt) : pt;
        for (K6 = Ss.length - 1, m2 = ge5 - 1; m2 >= 0; m2--) {
          const be5 = H4 + m2, Fe3 = u2[be5], Es = u2[be5 + 1], As = be5 + 1 < I3 ? Es.el || co(Es) : y;
          Tt[m2] === 0 ? v2(null, Fe3, p4, As, g3, _2, S3, T3, w) : Re3 && (K6 < 0 || m2 !== Ss[K6] ? ot2(Fe3, p4, As, 2) : K6--);
        }
      }
    }, ot2 = (f, u2, p4, y, g3 = null) => {
      const { el: _2, type: S3, transition: T3, children: w, shapeFlag: m2 } = f;
      if (m2 & 6) {
        ot2(f.component.subTree, u2, p4, y);
        return;
      }
      if (m2 & 128) {
        f.suspense.move(u2, p4, y);
        return;
      }
      if (m2 & 64) {
        S3.move(f, u2, p4, kt2);
        return;
      }
      if (S3 === me) {
        s(_2, u2, p4);
        for (let E3 = 0; E3 < w.length; E3++)
          ot2(w[E3], u2, p4, y);
        s(f.anchor, u2, p4);
        return;
      }
      if (S3 === Bn) {
        M3(f, u2, p4);
        return;
      }
      if (y !== 2 && m2 & 1 && T3)
        if (y === 0)
          T3.beforeEnter(_2), s(_2, u2, p4), oe5(() => T3.enter(_2), g3);
        else {
          const { leave: E3, delayLeave: O4, afterLeave: D2 } = T3, H4 = () => {
            f.ctx.isUnmounted ? r2(_2) : s(_2, u2, p4);
          }, Y4 = () => {
            _2._isLeaving && _2[Be4](true), E3(_2, () => {
              H4(), D2 && D2();
            });
          };
          O4 ? O4(_2, H4, Y4) : Y4();
        }
      else
        s(_2, u2, p4);
    }, Ie3 = (f, u2, p4, y = false, g3 = false) => {
      const { type: _2, props: S3, ref: T3, children: w, dynamicChildren: m2, shapeFlag: I3, patchFlag: E3, dirs: O4, cacheIndex: D2 } = f;
      if (E3 === -2 && (g3 = false), T3 != null && (Ze(), Mt(T3, null, p4, f, true), Xe()), D2 != null && (u2.renderCache[D2] = void 0), I3 & 256) {
        u2.ctx.deactivate(f);
        return;
      }
      const H4 = I3 & 1 && O4, Y4 = !mt(f);
      let K6;
      if (Y4 && (K6 = S3 && S3.onVnodeBeforeUnmount) && Le4(K6, u2, f), I3 & 6)
        wo(f.component, p4, y);
      else {
        if (I3 & 128) {
          f.suspense.unmount(p4, y);
          return;
        }
        H4 && it(f, null, u2, "beforeUnmount"), I3 & 64 ? f.type.remove(f, u2, p4, kt2, y) : m2 && !m2.hasOnce && (_2 !== me || E3 > 0 && E3 & 64) ? wt(m2, u2, p4, false, true) : (_2 === me && E3 & 384 || !g3 && I3 & 16) && wt(w, u2, p4), y && ks(f);
      }
      (Y4 && (K6 = S3 && S3.onVnodeUnmounted) || H4) && oe5(() => {
        K6 && Le4(K6, u2, f), H4 && it(f, null, u2, "unmounted");
      }, p4);
    }, ks = (f) => {
      const { type: u2, el: p4, anchor: y, transition: g3 } = f;
      if (u2 === me) {
        xo(p4, y);
        return;
      }
      if (u2 === Bn) {
        C3(f);
        return;
      }
      const _2 = () => {
        r2(p4), g3 && !g3.persisted && g3.afterLeave && g3.afterLeave();
      };
      if (f.shapeFlag & 1 && g3 && !g3.persisted) {
        const { leave: S3, delayLeave: T3 } = g3, w = () => S3(p4, _2);
        T3 ? T3(f.el, _2, w) : w();
      } else
        _2();
    }, xo = (f, u2) => {
      let p4;
      for (; f !== u2; )
        p4 = b(f), r2(f), f = p4;
      r2(u2);
    }, wo = (f, u2, p4) => {
      const { bum: y, scope: g3, job: _2, subTree: S3, um: T3, m: w, a: m2 } = f;
      Gs(w), Gs(m2), y && On(y), g3.stop(), _2 && (_2.flags |= 8, Ie3(S3, f, u2, p4)), T3 && oe5(T3, u2), oe5(() => {
        f.isUnmounted = true;
      }, u2);
    }, wt = (f, u2, p4, y = false, g3 = false, _2 = 0) => {
      for (let S3 = _2; S3 < f.length; S3++)
        Ie3(f[S3], u2, p4, y, g3);
    }, Qt2 = (f) => {
      if (f.shapeFlag & 6)
        return Qt2(f.component.subTree);
      if (f.shapeFlag & 128)
        return f.suspense.next();
      const u2 = b(f.anchor || f.el), p4 = u2 && u2[Fr];
      return p4 ? b(p4) : u2;
    };
    let Cn = false;
    const Ts = (f, u2, p4) => {
      let y;
      f == null ? u2._vnode && (Ie3(u2._vnode, null, null, true), y = u2._vnode.component) : v2(u2._vnode || null, f, u2, null, null, null, p4), u2._vnode = f, Cn || (Cn = true, Rs(y), Pr(), Cn = false);
    }, kt2 = { p: v2, um: Ie3, m: ot2, r: ks, mt: Oe2, mc: V2, pc: G4, pbc: $2, n: Qt2, o: e };
    return { render: Ts, hydrate: void 0, createApp: Bi(Ts) };
  }
  function $n({ type: e, props: t5 }, n) {
    return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t5 && t5.encoding && t5.encoding.includes("html") ? void 0 : n;
  }
  function lt({ effect: e, job: t5 }, n) {
    n ? (e.flags |= 32, t5.flags |= 4) : (e.flags &= -33, t5.flags &= -5);
  }
  function el(e, t5) {
    return (!e || e && !e.pendingBranch) && t5 && !t5.persisted;
  }
  function xs(e, t5, n = false) {
    const s = e.children, r2 = t5.children;
    if (L3(s) && L3(r2))
      for (let o = 0; o < s.length; o++) {
        const i2 = s[o];
        let l4 = r2[o];
        l4.shapeFlag & 1 && !l4.dynamicChildren && ((l4.patchFlag <= 0 || l4.patchFlag === 32) && (l4 = r2[o] = Ge(r2[o]), l4.el = i2.el), !n && l4.patchFlag !== -2 && xs(i2, l4)), l4.type === En && (l4.patchFlag === -1 && (l4 = r2[o] = Ge(l4)), l4.el = i2.el), l4.type === le5 && !l4.el && (l4.el = i2.el);
      }
  }
  function tl(e) {
    const t5 = e.slice(), n = [0];
    let s, r2, o, i2, l4;
    const c3 = e.length;
    for (s = 0; s < c3; s++) {
      const d2 = e[s];
      if (d2 !== 0) {
        if (r2 = n[n.length - 1], e[r2] < d2) {
          t5[s] = r2, n.push(s);
          continue;
        }
        for (o = 0, i2 = n.length - 1; o < i2; )
          l4 = o + i2 >> 1, e[n[l4]] < d2 ? o = l4 + 1 : i2 = l4;
        d2 < e[n[o]] && (o > 0 && (t5[s] = n[o - 1]), n[o] = s);
      }
    }
    for (o = n.length, i2 = n[o - 1]; o-- > 0; )
      n[o] = i2, i2 = t5[i2];
    return n;
  }
  function lo(e) {
    const t5 = e.subTree.component;
    if (t5)
      return t5.asyncDep && !t5.asyncResolved ? t5 : lo(t5);
  }
  function Gs(e) {
    if (e)
      for (let t5 = 0; t5 < e.length; t5++)
        e[t5].flags |= 8;
  }
  function co(e) {
    if (e.placeholder)
      return e.placeholder;
    const t5 = e.component;
    return t5 ? co(t5.subTree) : null;
  }
  function nl(e, t5) {
    t5 && t5.pendingBranch ? L3(e) ? t5.effects.push(...e) : t5.effects.push(e) : di(e);
  }
  function Se(e = false) {
    Lt.push(ve4 = e ? null : []);
  }
  function sl() {
    Lt.pop(), ve4 = Lt[Lt.length - 1] || null;
  }
  function mn(e, t5 = false) {
    Ht += e, e < 0 && ve4 && t5 && (ve4.hasOnce = true);
  }
  function ao(e) {
    return e.dynamicChildren = Ht > 0 ? ve4 || pt : null, sl(), Ht > 0 && ve4 && ve4.push(e), e;
  }
  function yn(e, t5, n, s, r2, o) {
    return ao(Ut(e, t5, n, s, r2, o, true));
  }
  function nt(e, t5, n, s, r2) {
    return ao(Z(e, t5, n, s, r2, true));
  }
  function Nt(e) {
    return e ? e.__v_isVNode === true : false;
  }
  function ft(e, t5) {
    return e.type === t5.type && e.key === t5.key;
  }
  function Ut(e, t5 = null, n = null, s = 0, r2 = null, o = e === me ? 0 : 1, i2 = false, l4 = false) {
    const c3 = { __v_isVNode: true, __v_skip: true, type: e, props: t5, key: t5 && uo(t5), ref: t5 && an(t5), scopeId: Ir, slotScopeIds: null, children: n, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetStart: null, targetAnchor: null, staticCount: 0, shapeFlag: o, patchFlag: s, dynamicProps: r2, dynamicChildren: null, appContext: null, ctx: re5 };
    return l4 ? (ws(c3, n), o & 128 && e.normalize(c3)) : n && (c3.shapeFlag |= ne6(n) ? 8 : 16), Ht > 0 && !i2 && ve4 && (c3.patchFlag > 0 || o & 6) && c3.patchFlag !== 32 && ve4.push(c3), c3;
  }
  function rl(e, t5 = null, n = null, s = 0, r2 = null, o = false) {
    if ((!e || e === Wr) && (e = le5), Nt(e)) {
      const l4 = st(e, t5, true);
      return n && ws(l4, n), Ht > 0 && !o && ve4 && (l4.shapeFlag & 6 ? ve4[ve4.indexOf(e)] = l4 : ve4.push(l4)), l4.patchFlag = -2, l4;
    }
    if (_l(e) && (e = e.__vccOpts), t5) {
      t5 = ol(t5);
      let { class: l4, style: c3 } = t5;
      l4 && !ne6(l4) && (t5.class = qt(l4)), W4(c3) && (gs(c3) && !L3(c3) && (c3 = fe5({}, c3)), t5.style = ls(c3));
    }
    const i2 = ne6(e) ? 1 : fo(e) ? 128 : Dr(e) ? 64 : W4(e) ? 4 : j2(e) ? 2 : 0;
    return Ut(e, t5, n, s, r2, i2, o, true);
  }
  function ol(e) {
    return e ? gs(e) || to(e) ? fe5({}, e) : e : null;
  }
  function st(e, t5, n = false, s = false) {
    const { props: r2, ref: o, patchFlag: i2, children: l4, transition: c3 } = e, d2 = t5 ? ll(r2 || {}, t5) : r2, a2 = { __v_isVNode: true, __v_skip: true, type: e.type, props: d2, key: d2 && uo(d2), ref: t5 && t5.ref ? n && o ? L3(o) ? o.concat(an(t5)) : [o, an(t5)] : an(t5) : o, scopeId: e.scopeId, slotScopeIds: e.slotScopeIds, children: l4, target: e.target, targetStart: e.targetStart, targetAnchor: e.targetAnchor, staticCount: e.staticCount, shapeFlag: e.shapeFlag, patchFlag: t5 && e.type !== me ? i2 === -1 ? 16 : i2 | 16 : i2, dynamicProps: e.dynamicProps, dynamicChildren: e.dynamicChildren, appContext: e.appContext, dirs: e.dirs, transition: c3, component: e.component, suspense: e.suspense, ssContent: e.ssContent && st(e.ssContent), ssFallback: e.ssFallback && st(e.ssFallback), placeholder: e.placeholder, el: e.el, anchor: e.anchor, ctx: e.ctx, ce: e.ce };
    return c3 && s && Vt(a2, c3.clone(a2)), a2;
  }
  function il(e = " ", t5 = 0) {
    return Z(En, null, e, t5);
  }
  function Qn(e = "", t5 = false) {
    return t5 ? (Se(), nt(le5, null, e)) : Z(le5, null, e);
  }
  function He(e) {
    return e == null || typeof e == "boolean" ? Z(le5) : L3(e) ? Z(me, null, e.slice()) : Nt(e) ? Ge(e) : Z(En, null, String(e));
  }
  function Ge(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : st(e);
  }
  function ws(e, t5) {
    let n = 0;
    const { shapeFlag: s } = e;
    if (t5 == null)
      t5 = null;
    else if (L3(t5))
      n = 16;
    else if (typeof t5 == "object")
      if (s & 65) {
        const r2 = t5.default;
        r2 && (r2._c && (r2._d = false), ws(e, r2()), r2._c && (r2._d = true));
        return;
      } else {
        n = 32;
        const r2 = t5._;
        !r2 && !to(t5) ? t5._ctx = re5 : r2 === 3 && re5 && (re5.slots._ === 1 ? t5._ = 1 : (t5._ = 2, e.patchFlag |= 1024));
      }
    else
      j2(t5) ? (t5 = { default: t5, _ctx: re5 }, n = 32) : (t5 = String(t5), s & 64 ? (n = 16, t5 = [il(t5)]) : n = 8);
    e.children = t5, e.shapeFlag |= n;
  }
  function ll(...e) {
    const t5 = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n];
      for (const r2 in s)
        if (r2 === "class")
          t5.class !== s.class && (t5.class = qt([t5.class, s.class]));
        else if (r2 === "style")
          t5.style = ls([t5.style, s.style]);
        else if (ss(r2)) {
          const o = t5[r2], i2 = s[r2];
          i2 && o !== i2 && !(L3(o) && o.includes(i2)) && (t5[r2] = o ? [].concat(o, i2) : i2);
        } else
          r2 !== "" && (t5[r2] = s[r2]);
    }
    return t5;
  }
  function Le4(e, t5, n, s = null) {
    qe2(e, t5, 7, [n, s]);
  }
  function al(e, t5, n) {
    const s = e.type, r2 = (t5 ? t5.appContext : e.appContext) || cl, o = { uid: fl++, vnode: e, type: s, parent: t5, appContext: r2, root: null, next: null, subTree: null, effect: null, update: null, job: null, scope: new Do(true), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: t5 ? t5.provides : Object.create(r2.provides), ids: t5 ? t5.ids : ["", 0, 0], accessCache: null, renderCache: [], components: null, directives: null, propsOptions: so(s, r2), emitsOptions: Zr(s, r2), emit: null, emitted: null, propsDefaults: q4, inheritAttrs: s.inheritAttrs, ctx: q4, data: q4, props: q4, attrs: q4, slots: q4, refs: q4, setupState: q4, setupContext: null, suspense: n, suspenseId: n ? n.pendingId : 0, asyncDep: null, asyncResolved: false, isMounted: false, isUnmounted: false, isDeactivated: false, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null };
    return o.ctx = { _: o }, o.root = t5 ? t5.root : o, o.emit = Hi.bind(null, o), e.ce && e.ce(o), o;
  }
  function po(e) {
    return e.vnode.shapeFlag & 4;
  }
  function ul(e, t5 = false, n = false) {
    t5 && es(t5);
    const { props: s, children: r2 } = e.vnode, o = po(e);
    Ji(e, s, o, t5), Zi(e, r2, n || t5);
    const i2 = o ? dl(e, t5) : void 0;
    return t5 && es(false), i2;
  }
  function dl(e, t5) {
    const n = e.type;
    e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Ri);
    const { setup: s } = n;
    if (s) {
      Ze();
      const r2 = e.setupContext = s.length > 1 ? pl(e) : null, o = zt(e), i2 = Jt(s, e, 0, [e.props, r2]), l4 = or(i2);
      if (Xe(), o(), (l4 || e.sp) && !mt(e) && ys(e), l4) {
        if (i2.then(Ys, Ys), t5)
          return i2.then((c3) => {
            zs(e, c3);
          }).catch((c3) => {
            Gt(c3, e, 0);
          });
        e.asyncDep = i2;
      } else
        zs(e, i2);
    } else
      go(e);
  }
  function zs(e, t5, n) {
    j2(t5) ? e.type.__ssrInlineRender ? e.ssrRender = t5 : e.render = t5 : W4(t5) && (e.setupState = Er(t5)), go(e);
  }
  function go(e, t5, n) {
    const s = e.type;
    e.render || (e.render = s.render || Ue3);
    {
      const r2 = zt(e);
      Ze();
      try {
        Mi(e);
      } finally {
        Xe(), r2();
      }
    }
  }
  function pl(e) {
    const t5 = (n) => {
      e.exposed = n || {};
    };
    return { attrs: new Proxy(e.attrs, hl), slots: e.slots, emit: e.emit, expose: t5 };
  }
  function An(e) {
    return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Er(ni(e.exposed)), { get(t5, n) {
      if (n in t5)
        return t5[n];
      if (n in Dt)
        return Dt[n](e);
    }, has(t5, n) {
      return n in t5 || n in Dt;
    } })) : e.proxy;
  }
  function _l(e) {
    return j2(e) && "__vccOpts" in e;
  }
  function ts(e, t5, n) {
    try {
      mn(-1);
      const s = arguments.length;
      return s === 2 ? W4(t5) && !L3(t5) ? Nt(t5) ? Z(e, null, [t5]) : Z(e, t5) : Z(e, null, t5) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && Nt(n) && (n = [n]), Z(e, t5, n));
    } finally {
      mn(1);
    }
  }
  function kl(e, t5, n, s, r2, o) {
    return Se(), yn("div", wl, [...t5[0] || (t5[0] = [Ut("span", { class: "opacity-60" }, "Dock", -1)])]);
  }
  function Vn(e, t5) {
    const n = window.__;
    return typeof n == "function" ? n(e, t5) : e;
  }
  function Rl() {
    var _a, _b, _c, _d, _e5;
    return (_e5 = (_d = (_a = window.frappe) == null ? void 0 : _a.csrf_token) != null ? _d : (_c = (_b = window.dockBoot) == null ? void 0 : _b.session) == null ? void 0 : _c.csrf_token) != null ? _e5 : "";
  }
  async function xt(e, t5 = {}) {
    var _a, _b, _c;
    const n = await fetch("/api/method/" + e, { method: "POST", headers: { "Content-Type": "application/json", "X-Frappe-CSRF-Token": Rl() }, body: JSON.stringify(t5) }), s = await n.json();
    if (!n.ok) {
      const r2 = (s == null ? void 0 : s._server_messages) ? (_b = (_a = JSON.parse(s._server_messages)) == null ? void 0 : _a[0]) == null ? void 0 : _b.message : (_c = s == null ? void 0 : s.exc_type) != null ? _c : "Server error";
      throw new Error(r2 != null ? r2 : "Request failed");
    }
    return s.message;
  }
  function Fl(e) {
    er || (er = true, (e == null ? void 0 : e.length) && (ye5.value = e));
  }
  function Dl(e, t5, n) {
    var _a, _b;
    return (_b = (_a = ye5.value.find((s) => s.app === e && s.doctype === t5 && s.docname === n)) == null ? void 0 : _a.name) != null ? _b : null;
  }
  async function Ll(e) {
    if (mo.value)
      return;
    const t5 = `__tmp_${Date.now()}`, n = __spreadValues({ name: t5, sort_order: ye5.value.length }, e);
    ye5.value.push(n);
    try {
      const s = await xt("dock.api.bookmarks.add", { app: e.app, doctype: e.doctype, docname: e.docname, label: e.label, icon: e.icon }), r2 = ye5.value.findIndex((o) => o.name === t5);
      r2 >= 0 && (ye5.value[r2].name = s);
    } catch (e2) {
      ye5.value = ye5.value.filter((s) => s.name !== t5);
    }
  }
  function jl(e) {
    ye5.value = ye5.value.filter((t5) => t5.name !== e), xt("dock.api.bookmarks.remove", { bookmark_name: e }).catch(() => {
    });
  }
  function $l(e) {
    const t5 = new Map(ye5.value.map((n) => [n.name, n]));
    ye5.value = e.map((n, s) => __spreadProps(__spreadValues({}, t5.get(n)), { sort_order: s })), xt("dock.api.bookmarks.reorder", { ordered_names: e }).catch(() => {
    });
  }
  function yo() {
    return { bookmarks: ye5, atLimit: mo, init: Fl, isBookmarked: Dl, addBookmark: Ll, removeBookmark: jl, reorderBookmarks: $l };
  }
  function Bl(e) {
    tr || (tr = true, (e == null ? void 0 : e.length) && (ke5.value = e));
  }
  function Vl(e) {
    const t5 = ke5.value.findIndex((r2) => r2.app === e.app && r2.doctype === e.doctype && r2.docname === e.docname), n = new Date().toISOString(), s = __spreadProps(__spreadValues({ name: t5 >= 0 ? ke5.value[t5].name : "" }, e), { visited_at: n });
    t5 >= 0 && ke5.value.splice(t5, 1), ke5.value.unshift(s), ke5.value.length > 8 && (ke5.value = ke5.value.slice(0, 8)), xt("dock.api.recent.track", { app: e.app, doctype: e.doctype, docname: e.docname, label: e.label, icon: e.icon }).catch(() => {
    });
  }
  function Hl(e) {
    ke5.value = ke5.value.filter((t5) => t5.name !== e), xt("dock.api.recent.remove", { recent_item_name: e }).catch(() => {
    });
  }
  function Nl() {
    ke5.value = [], xt("dock.api.recent.clear").catch(() => {
    });
  }
  function bo() {
    return { items: ke5, init: Bl, trackItem: Vl, removeItem: Hl, clearAll: Nl };
  }
  function ql() {
    const e = Te(() => {
      var _a, _b, _c, _d;
      return (_d = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) != null ? _c : window.dockBoot) != null ? _d : null;
    }), t5 = Te(() => {
      var _a;
      return !!((_a = e.value) == null ? void 0 : _a.installed);
    }), n = Te(() => {
      var _a, _b;
      return (_b = (_a = e.value) == null ? void 0 : _a.settings) != null ? _b : null;
    }), s = Te(() => {
      var _a, _b;
      return (_b = (_a = e.value) == null ? void 0 : _a.registered_apps) != null ? _b : [];
    }), r2 = Te(() => {
      var _a, _b;
      return (_b = (_a = e.value) == null ? void 0 : _a.calendar_sources) != null ? _b : [];
    }), o = Te(() => {
      var _a, _b;
      return (_b = (_a = e.value) == null ? void 0 : _a.notification_types) != null ? _b : [];
    });
    return { dock: e, isInstalled: t5, settings: n, registeredApps: s, calendarSources: r2, notificationTypes: o };
  }
  function Jl() {
    return { collapsed: on, mobileOpen: ln, toggle: () => {
      window.innerWidth <= 576 ? ln.value = !ln.value : (on.value = !on.value, localStorage.setItem(vo, String(on.value)));
    }, closeMobile: () => {
      ln.value = false;
    }, isMobile: () => window.innerWidth <= 576 };
  }
  var __vite__mapDeps, q4, pt, Ue3, nr, ss, sr, fe5, rs, ko, U3, L3, gt, rr, Cs, j2, ne6, Ke2, W4, or, ir, Kt, To, lr, os, Pt, vn, So, We, Eo, Wt, is, Pn, Ne3, On, cr, Ao, Xl, Ps, xn, Co, Po, Oo, Ro, Ql, fr, Fo, ar, In, _e4, Do, z4, Rn, ur, dr, Ot, It, Ae3, mr, jt, $o, us, Nn, at, Un, $t, Bo, Vo, Ho, br, vr, xr, Uo, Ko, Wo, qo, Kn, en, Yo, zo, Zo, wr, kr, Tr, Xo, Pe, bt, si, ri, oi, nn, un, ct, he4, $e3, _t, tt, ht, Ar, dn, Bt, re5, Ir, gi, _i, Fr, Dr, Rt, Ms, Fs, Ds, qn, Lr, rc, Be4, Et, we5, vi, jr, xi, oc, pn, Bs, mt, Yt, et, Ei, Ft, Ai, Ci, Nr, gn, Pi, Oi, Ii, Wr, Yn, Dt, jn, Ri, zn, Di, $i, yt, Vi, Ni, Ui, Ki, Qr, eo, to, Yi, bs, vs, zi, ro, oo, io, Zi, Xi, oe5, fo, me, En, le5, Bn, Lt, ve4, Ht, uo, an, Z, cl, fl, se5, ho, bn, es, zt, Ys, vt, hl, Te, ml, yl, bl, Zs, je, vl, xl, wl, Tl, Sl, Xs, El, Qs, Al, Cl, At, Pl, _o, Ol, Il, Ml, ye5, er, mo, ke5, tr, Ul, Kl, Wl, vo, on, ln, Gl, Yl, zl, uc;
  var init_dock_navbar_esm = __esm({
    "../dock/dock/public/js/dock-navbar.esm.js"() {
      __vite__mapDeps = (i2, m2 = __vite__mapDeps, d2 = m2.f || (m2.f = ["assets/DockAppSwitcher.css"])) => i2.map((i3) => d2[i3]);
      q4 = {};
      pt = [];
      Ue3 = () => {
      };
      nr = () => false;
      ss = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97);
      sr = (e) => e.startsWith("onUpdate:");
      fe5 = Object.assign;
      rs = (e, t5) => {
        const n = e.indexOf(t5);
        n > -1 && e.splice(n, 1);
      };
      ko = Object.prototype.hasOwnProperty;
      U3 = (e, t5) => ko.call(e, t5);
      L3 = Array.isArray;
      gt = (e) => Kt(e) === "[object Map]";
      rr = (e) => Kt(e) === "[object Set]";
      Cs = (e) => Kt(e) === "[object Date]";
      j2 = (e) => typeof e == "function";
      ne6 = (e) => typeof e == "string";
      Ke2 = (e) => typeof e == "symbol";
      W4 = (e) => e !== null && typeof e == "object";
      or = (e) => (W4(e) || j2(e)) && j2(e.then) && j2(e.catch);
      ir = Object.prototype.toString;
      Kt = (e) => ir.call(e);
      To = (e) => Kt(e).slice(8, -1);
      lr = (e) => Kt(e) === "[object Object]";
      os = (e) => ne6(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e;
      Pt = ns(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
      vn = (e) => {
        const t5 = /* @__PURE__ */ Object.create(null);
        return (n) => t5[n] || (t5[n] = e(n));
      };
      So = /-\w/g;
      We = vn((e) => e.replace(So, (t5) => t5.slice(1).toUpperCase()));
      Eo = /\B([A-Z])/g;
      Wt = vn((e) => e.replace(Eo, "-$1").toLowerCase());
      is = vn((e) => e.charAt(0).toUpperCase() + e.slice(1));
      Pn = vn((e) => e ? `on${is(e)}` : "");
      Ne3 = (e, t5) => !Object.is(e, t5);
      On = (e, ...t5) => {
        for (let n = 0; n < e.length; n++)
          e[n](...t5);
      };
      cr = (e, t5, n, s = false) => {
        Object.defineProperty(e, t5, { configurable: true, enumerable: false, writable: s, value: n });
      };
      Ao = (e) => {
        const t5 = parseFloat(e);
        return isNaN(t5) ? e : t5;
      };
      Xl = (e) => {
        const t5 = ne6(e) ? Number(e) : NaN;
        return isNaN(t5) ? e : t5;
      };
      xn = () => Ps || (Ps = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
      Co = /;(?![^(]*\))/g;
      Po = /:([^]+)/;
      Oo = /\/\*[^]*?\*\//g;
      Ro = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
      Ql = ns(Ro);
      fr = (e) => !!(e && e.__v_isRef === true);
      Fo = (e) => ne6(e) ? e : e == null ? "" : L3(e) || W4(e) && (e.toString === ir || !j2(e.toString)) ? fr(e) ? Fo(e.value) : JSON.stringify(e, ar, 2) : String(e);
      ar = (e, t5) => fr(t5) ? ar(e, t5.value) : gt(t5) ? { [`Map(${t5.size})`]: [...t5.entries()].reduce((n, [s, r2], o) => (n[In(s, o) + " =>"] = r2, n), {}) } : rr(t5) ? { [`Set(${t5.size})`]: [...t5.values()].map((n) => In(n)) } : Ke2(t5) ? In(t5) : W4(t5) && !L3(t5) && !lr(t5) ? String(t5) : t5;
      In = (e, t5 = "") => {
        var n;
        return Ke2(e) ? `Symbol(${(n = e.description) != null ? n : t5})` : e;
      };
      Do = class {
        constructor(t5 = false) {
          this.detached = t5, this._active = true, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = false, this.__v_skip = true, this.parent = _e4, !t5 && _e4 && (this.index = (_e4.scopes || (_e4.scopes = [])).push(this) - 1);
        }
        get active() {
          return this._active;
        }
        pause() {
          if (this._active) {
            this._isPaused = true;
            let t5, n;
            if (this.scopes)
              for (t5 = 0, n = this.scopes.length; t5 < n; t5++)
                this.scopes[t5].pause();
            for (t5 = 0, n = this.effects.length; t5 < n; t5++)
              this.effects[t5].pause();
          }
        }
        resume() {
          if (this._active && this._isPaused) {
            this._isPaused = false;
            let t5, n;
            if (this.scopes)
              for (t5 = 0, n = this.scopes.length; t5 < n; t5++)
                this.scopes[t5].resume();
            for (t5 = 0, n = this.effects.length; t5 < n; t5++)
              this.effects[t5].resume();
          }
        }
        run(t5) {
          if (this._active) {
            const n = _e4;
            try {
              return _e4 = this, t5();
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
        stop(t5) {
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
            if (!this.detached && this.parent && !t5) {
              const r2 = this.parent.scopes.pop();
              r2 && r2 !== this && (this.parent.scopes[this.index] = r2, r2.index = this.index);
            }
            this.parent = void 0;
          }
        }
      };
      Rn = /* @__PURE__ */ new WeakSet();
      ur = class {
        constructor(t5) {
          this.fn = t5, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, _e4 && _e4.active && _e4.effects.push(this);
        }
        pause() {
          this.flags |= 64;
        }
        resume() {
          this.flags & 64 && (this.flags &= -65, Rn.has(this) && (Rn.delete(this), this.trigger()));
        }
        notify() {
          this.flags & 2 && !(this.flags & 32) || this.flags & 8 || hr(this);
        }
        run() {
          if (!(this.flags & 1))
            return this.fn();
          this.flags |= 2, Os(this), pr(this);
          const t5 = z4, n = Ae3;
          z4 = this, Ae3 = true;
          try {
            return this.fn();
          } finally {
            gr(this), z4 = t5, Ae3 = n, this.flags &= -3;
          }
        }
        stop() {
          if (this.flags & 1) {
            for (let t5 = this.deps; t5; t5 = t5.nextDep)
              as(t5);
            this.deps = this.depsTail = void 0, Os(this), this.onStop && this.onStop(), this.flags &= -2;
          }
        }
        trigger() {
          this.flags & 64 ? Rn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
        }
        runIfDirty() {
          Hn(this) && this.run();
        }
        get dirty() {
          return Hn(this);
        }
      };
      dr = 0;
      Ae3 = true;
      mr = [];
      jt = 0;
      $o = class {
        constructor(t5, n) {
          this.sub = t5, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
        }
      };
      us = class {
        constructor(t5) {
          this.computed = t5, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = true;
        }
        track(t5) {
          if (!z4 || !Ae3 || z4 === this.computed)
            return;
          let n = this.activeLink;
          if (n === void 0 || n.sub !== z4)
            n = this.activeLink = new $o(z4, this), z4.deps ? (n.prevDep = z4.depsTail, z4.depsTail.nextDep = n, z4.depsTail = n) : z4.deps = z4.depsTail = n, yr(n);
          else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
            const s = n.nextDep;
            s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = z4.depsTail, n.nextDep = void 0, z4.depsTail.nextDep = n, z4.depsTail = n, z4.deps === n && (z4.deps = s);
          }
          return n;
        }
        trigger(t5) {
          this.version++, jt++, this.notify(t5);
        }
        notify(t5) {
          cs();
          try {
            for (let n = this.subs; n; n = n.prevSub)
              n.sub.notify() && n.sub.dep.notify();
          } finally {
            fs();
          }
        }
      };
      Nn = /* @__PURE__ */ new WeakMap();
      at = Symbol("");
      Un = Symbol("");
      $t = Symbol("");
      Bo = { __proto__: null, [Symbol.iterator]() {
        return Mn(this, Symbol.iterator, (e) => Ve3(this, e));
      }, concat(...e) {
        return dt(this).concat(...e.map((t5) => L3(t5) ? dt(t5) : t5));
      }, entries() {
        return Mn(this, "entries", (e) => (e[1] = Ve3(this, e[1]), e));
      }, every(e, t5) {
        return Je2(this, "every", e, t5, void 0, arguments);
      }, filter(e, t5) {
        return Je2(this, "filter", e, t5, (n) => n.map((s) => Ve3(this, s)), arguments);
      }, find(e, t5) {
        return Je2(this, "find", e, t5, (n) => Ve3(this, n), arguments);
      }, findIndex(e, t5) {
        return Je2(this, "findIndex", e, t5, void 0, arguments);
      }, findLast(e, t5) {
        return Je2(this, "findLast", e, t5, (n) => Ve3(this, n), arguments);
      }, findLastIndex(e, t5) {
        return Je2(this, "findLastIndex", e, t5, void 0, arguments);
      }, forEach(e, t5) {
        return Je2(this, "forEach", e, t5, void 0, arguments);
      }, includes(...e) {
        return Fn(this, "includes", e);
      }, indexOf(...e) {
        return Fn(this, "indexOf", e);
      }, join(e) {
        return dt(this).join(e);
      }, lastIndexOf(...e) {
        return Fn(this, "lastIndexOf", e);
      }, map(e, t5) {
        return Je2(this, "map", e, t5, void 0, arguments);
      }, pop() {
        return St(this, "pop");
      }, push(...e) {
        return St(this, "push", e);
      }, reduce(e, ...t5) {
        return Is(this, "reduce", e, t5);
      }, reduceRight(e, ...t5) {
        return Is(this, "reduceRight", e, t5);
      }, shift() {
        return St(this, "shift");
      }, some(e, t5) {
        return Je2(this, "some", e, t5, void 0, arguments);
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
        return Mn(this, "values", (e) => Ve3(this, e));
      } };
      Vo = Array.prototype;
      Ho = ns("__proto__,__v_isRef,__isVue");
      br = new Set(Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ke2));
      vr = class {
        constructor(t5 = false, n = false) {
          this._isReadonly = t5, this._isShallow = n;
        }
        get(t5, n, s) {
          if (n === "__v_skip")
            return t5.__v_skip;
          const r2 = this._isReadonly, o = this._isShallow;
          if (n === "__v_isReactive")
            return !r2;
          if (n === "__v_isReadonly")
            return r2;
          if (n === "__v_isShallow")
            return o;
          if (n === "__v_raw")
            return s === (r2 ? o ? Xo : Tr : o ? kr : wr).get(t5) || Object.getPrototypeOf(t5) === Object.getPrototypeOf(s) ? t5 : void 0;
          const i2 = L3(t5);
          if (!r2) {
            let c3;
            if (i2 && (c3 = Bo[n]))
              return c3;
            if (n === "hasOwnProperty")
              return No;
          }
          const l4 = Reflect.get(t5, n, ce3(t5) ? t5 : s);
          if ((Ke2(n) ? br.has(n) : Ho(n)) || (r2 || ie5(t5, "get", n), o))
            return l4;
          if (ce3(l4)) {
            const c3 = i2 && os(n) ? l4 : l4.value;
            return r2 && W4(c3) ? Wn(c3) : c3;
          }
          return W4(l4) ? r2 ? Wn(l4) : hs(l4) : l4;
        }
      };
      xr = class extends vr {
        constructor(t5 = false) {
          super(false, t5);
        }
        set(t5, n, s, r2) {
          let o = t5[n];
          const i2 = L3(t5) && os(n);
          if (!this._isShallow) {
            const d2 = Qe(o);
            if (!Ee3(s) && !Qe(s) && (o = N(o), s = N(s)), !i2 && ce3(o) && !ce3(s))
              return d2 || (o.value = s), true;
          }
          const l4 = i2 ? Number(n) < t5.length : U3(t5, n), c3 = Reflect.set(t5, n, s, ce3(t5) ? t5 : r2);
          return t5 === N(r2) && (l4 ? Ne3(s, o) && Ye(t5, "set", n, s) : Ye(t5, "add", n, s)), c3;
        }
        deleteProperty(t5, n) {
          const s = U3(t5, n);
          t5[n];
          const r2 = Reflect.deleteProperty(t5, n);
          return r2 && s && Ye(t5, "delete", n, void 0), r2;
        }
        has(t5, n) {
          const s = Reflect.has(t5, n);
          return (!Ke2(n) || !br.has(n)) && ie5(t5, "has", n), s;
        }
        ownKeys(t5) {
          return ie5(t5, "iterate", L3(t5) ? "length" : at), Reflect.ownKeys(t5);
        }
      };
      Uo = class extends vr {
        constructor(t5 = false) {
          super(true, t5);
        }
        set(t5, n) {
          return true;
        }
        deleteProperty(t5, n) {
          return true;
        }
      };
      Ko = new xr();
      Wo = new Uo();
      qo = new xr(true);
      Kn = (e) => e;
      en = (e) => Reflect.getPrototypeOf(e);
      Yo = { get: ds(false, false) };
      zo = { get: ds(false, true) };
      Zo = { get: ds(true, false) };
      wr = /* @__PURE__ */ new WeakMap();
      kr = /* @__PURE__ */ new WeakMap();
      Tr = /* @__PURE__ */ new WeakMap();
      Xo = /* @__PURE__ */ new WeakMap();
      Pe = (e) => W4(e) ? hs(e) : e;
      bt = (e) => W4(e) ? Wn(e) : e;
      si = class {
        constructor(t5, n) {
          this.dep = new us(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = n ? t5 : N(t5), this._value = n ? t5 : Pe(t5), this.__v_isShallow = n;
        }
        get value() {
          return this.dep.track(), this._value;
        }
        set value(t5) {
          const n = this._rawValue, s = this.__v_isShallow || Ee3(t5) || Qe(t5);
          t5 = s ? t5 : N(t5), Ne3(t5, n) && (this._rawValue = t5, this._value = s ? t5 : Pe(t5), this.dep.trigger());
        }
      };
      ri = { get: (e, t5, n) => t5 === "__v_raw" ? e : te(Reflect.get(e, t5, n)), set: (e, t5, n, s) => {
        const r2 = e[t5];
        return ce3(r2) && !ce3(n) ? (r2.value = n, true) : Reflect.set(e, t5, n, s);
      } };
      oi = class {
        constructor(t5, n, s) {
          this.fn = t5, this.setter = n, this._value = void 0, this.dep = new us(this), this.__v_isRef = true, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = jt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
        }
        notify() {
          if (this.flags |= 16, !(this.flags & 8) && z4 !== this)
            return hr(this, true), true;
        }
        get value() {
          const t5 = this.dep.track();
          return _r(this), t5 && (t5.version = this.dep.version), this._value;
        }
        set value(t5) {
          this.setter && this.setter(t5);
        }
      };
      nn = {};
      un = /* @__PURE__ */ new WeakMap();
      he4 = [];
      $e3 = -1;
      _t = [];
      tt = null;
      ht = 0;
      Ar = Promise.resolve();
      dn = null;
      Bt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
      re5 = null;
      Ir = null;
      gi = Symbol.for("v-scx");
      _i = () => cn(gi);
      Fr = Symbol("_vte");
      Dr = (e) => e.__isTeleport;
      Rt = (e) => e && (e.disabled || e.disabled === "");
      Ms = (e) => e && (e.defer || e.defer === "");
      Fs = (e) => typeof SVGElement < "u" && e instanceof SVGElement;
      Ds = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement;
      qn = (e, t5) => {
        const n = e && e.to;
        return ne6(n) ? t5 ? t5(n) : null : n;
      };
      Lr = { name: "Teleport", __isTeleport: true, process(e, t5, n, s, r2, o, i2, l4, c3, d2) {
        const { mc: a2, pc: h3, pbc: b, o: { insert: x3, querySelector: k4, createText: v2, createComment: F4 } } = d2, R3 = Rt(t5.props);
        let { shapeFlag: P3, children: M3, dynamicChildren: C3 } = t5;
        if (e == null) {
          const B2 = t5.el = v2(""), J5 = t5.anchor = v2("");
          x3(B2, n, s), x3(J5, n, s);
          const ee4 = (A4, $2) => {
            P3 & 16 && a2(M3, A4, $2, r2, o, i2, l4, c3);
          }, V2 = () => {
            const A4 = t5.target = qn(t5.props, k4), $2 = Jn(A4, t5, v2, x3);
            A4 && (i2 !== "svg" && Fs(A4) ? i2 = "svg" : i2 !== "mathml" && Ds(A4) && (i2 = "mathml"), r2 && r2.isCE && (r2.ce._teleportTargets || (r2.ce._teleportTargets = /* @__PURE__ */ new Set())).add(A4), R3 || (ee4(A4, $2), fn(t5, false)));
          };
          R3 && (ee4(n, J5), fn(t5, true)), Ms(t5.props) ? (t5.el.__isMounted = false, oe5(() => {
            V2(), delete t5.el.__isMounted;
          }, o)) : V2();
        } else {
          if (Ms(t5.props) && e.el.__isMounted === false) {
            oe5(() => {
              Lr.process(e, t5, n, s, r2, o, i2, l4, c3, d2);
            }, o);
            return;
          }
          t5.el = e.el, t5.targetStart = e.targetStart;
          const B2 = t5.anchor = e.anchor, J5 = t5.target = e.target, ee4 = t5.targetAnchor = e.targetAnchor, V2 = Rt(e.props), A4 = V2 ? n : J5, $2 = V2 ? B2 : ee4;
          if (i2 === "svg" || Fs(J5) ? i2 = "svg" : (i2 === "mathml" || Ds(J5)) && (i2 = "mathml"), C3 ? (b(e.dynamicChildren, C3, A4, r2, o, i2, l4), xs(e, t5, true)) : c3 || h3(e, t5, A4, $2, r2, o, i2, l4, false), R3)
            V2 ? t5.props && e.props && t5.props.to !== e.props.to && (t5.props.to = e.props.to) : sn(t5, n, B2, d2, 1);
          else if ((t5.props && t5.props.to) !== (e.props && e.props.to)) {
            const X2 = t5.target = qn(t5.props, k4);
            X2 && sn(t5, X2, null, d2, 0);
          } else
            V2 && sn(t5, J5, ee4, d2, 1);
          fn(t5, R3);
        }
      }, remove(e, t5, n, { um: s, o: { remove: r2 } }, o) {
        const { shapeFlag: i2, children: l4, anchor: c3, targetStart: d2, targetAnchor: a2, target: h3, props: b } = e;
        if (h3 && (r2(d2), r2(a2)), o && r2(c3), i2 & 16) {
          const x3 = o || !Rt(b);
          for (let k4 = 0; k4 < l4.length; k4++) {
            const v2 = l4[k4];
            s(v2, t5, n, x3, !!v2.dynamicChildren);
          }
        }
      }, move: sn, hydrate: yi };
      rc = Lr;
      Be4 = Symbol("_leaveCb");
      Et = Symbol("_enterCb");
      we5 = [Function, Array];
      vi = { mode: String, appear: Boolean, persisted: Boolean, onBeforeEnter: we5, onEnter: we5, onAfterEnter: we5, onEnterCancelled: we5, onBeforeLeave: we5, onLeave: we5, onAfterLeave: we5, onLeaveCancelled: we5, onBeforeAppear: we5, onAppear: we5, onAfterAppear: we5, onAppearCancelled: we5 };
      jr = (e) => {
        const t5 = e.subTree;
        return t5.component ? jr(t5.component) : t5;
      };
      xi = { name: "BaseTransition", props: vi, setup(e, { slots: t5 }) {
        const n = ho(), s = bi();
        return () => {
          const r2 = t5.default && Vr(t5.default(), true);
          if (!r2 || !r2.length)
            return;
          const o = $r(r2), i2 = N(e), { mode: l4 } = i2;
          if (s.isLeaving)
            return Ln(o);
          const c3 = Ls(o);
          if (!c3)
            return Ln(o);
          let d2 = Gn(c3, i2, s, n, (h3) => d2 = h3);
          c3.type !== le5 && Vt(c3, d2);
          let a2 = n.subTree && Ls(n.subTree);
          if (a2 && a2.type !== le5 && !ft(a2, c3) && jr(n).type !== le5) {
            let h3 = Gn(a2, i2, s, n);
            if (Vt(a2, h3), l4 === "out-in" && c3.type !== le5)
              return s.isLeaving = true, h3.afterLeave = () => {
                s.isLeaving = false, n.job.flags & 8 || n.update(), delete h3.afterLeave, a2 = void 0;
              }, Ln(o);
            l4 === "in-out" && c3.type !== le5 ? h3.delayLeave = (b, x3, k4) => {
              const v2 = Br(s, a2);
              v2[String(a2.key)] = a2, b[Be4] = () => {
                x3(), b[Be4] = void 0, delete d2.delayedLeave, a2 = void 0;
              }, d2.delayedLeave = () => {
                k4(), delete d2.delayedLeave, a2 = void 0;
              };
            } : a2 = void 0;
          } else
            a2 && (a2 = void 0);
          return o;
        };
      } };
      oc = xi;
      pn = /* @__PURE__ */ new WeakMap();
      Bs = (e) => e.nodeType === 8;
      xn().requestIdleCallback;
      xn().cancelIdleCallback;
      mt = (e) => !!e.type.__asyncLoader;
      Yt = (e) => e.type.__isKeepAlive;
      et = (e) => (t5, n = se5) => {
        (!vt || e === "sp") && Tn(e, (...s) => t5(...s), n);
      };
      Ei = et("bm");
      Ft = et("m");
      Ai = et("bu");
      Ci = et("u");
      Nr = et("bum");
      gn = et("um");
      Pi = et("sp");
      Oi = et("rtg");
      Ii = et("rtc");
      Wr = Symbol.for("v-ndc");
      Yn = (e) => e ? po(e) ? An(e) : Yn(e.parent) : null;
      Dt = fe5(/* @__PURE__ */ Object.create(null), { $: (e) => e, $el: (e) => e.vnode.el, $data: (e) => e.data, $props: (e) => e.props, $attrs: (e) => e.attrs, $slots: (e) => e.slots, $refs: (e) => e.refs, $parent: (e) => Yn(e.parent), $root: (e) => Yn(e.root), $host: (e) => e.ce, $emit: (e) => e.emit, $options: (e) => Yr(e), $forceUpdate: (e) => e.f || (e.f = () => {
        _s(e.update);
      }), $nextTick: (e) => e.n || (e.n = ai.bind(e.proxy)), $watch: (e) => mi.bind(e) });
      jn = (e, t5) => e !== q4 && !e.__isScriptSetup && U3(e, t5);
      Ri = { get({ _: e }, t5) {
        if (t5 === "__v_skip")
          return true;
        const { ctx: n, setupState: s, data: r2, props: o, accessCache: i2, type: l4, appContext: c3 } = e;
        if (t5[0] !== "$") {
          const b = i2[t5];
          if (b !== void 0)
            switch (b) {
              case 1:
                return s[t5];
              case 2:
                return r2[t5];
              case 4:
                return n[t5];
              case 3:
                return o[t5];
            }
          else {
            if (jn(s, t5))
              return i2[t5] = 1, s[t5];
            if (r2 !== q4 && U3(r2, t5))
              return i2[t5] = 2, r2[t5];
            if (U3(o, t5))
              return i2[t5] = 3, o[t5];
            if (n !== q4 && U3(n, t5))
              return i2[t5] = 4, n[t5];
            zn && (i2[t5] = 0);
          }
        }
        const d2 = Dt[t5];
        let a2, h3;
        if (d2)
          return t5 === "$attrs" && ie5(e.attrs, "get", ""), d2(e);
        if ((a2 = l4.__cssModules) && (a2 = a2[t5]))
          return a2;
        if (n !== q4 && U3(n, t5))
          return i2[t5] = 4, n[t5];
        if (h3 = c3.config.globalProperties, U3(h3, t5))
          return h3[t5];
      }, set({ _: e }, t5, n) {
        const { data: s, setupState: r2, ctx: o } = e;
        return jn(r2, t5) ? (r2[t5] = n, true) : s !== q4 && U3(s, t5) ? (s[t5] = n, true) : U3(e.props, t5) || t5[0] === "$" && t5.slice(1) in e ? false : (o[t5] = n, true);
      }, has({ _: { data: e, setupState: t5, accessCache: n, ctx: s, appContext: r2, props: o, type: i2 } }, l4) {
        let c3;
        return !!(n[l4] || e !== q4 && l4[0] !== "$" && U3(e, l4) || jn(t5, l4) || U3(o, l4) || U3(s, l4) || U3(Dt, l4) || U3(r2.config.globalProperties, l4) || (c3 = i2.__cssModules) && c3[l4]);
      }, defineProperty(e, t5, n) {
        return n.get != null ? e._.accessCache[t5] = 0 : U3(n, "value") && this.set(e, t5, n.value, null), Reflect.defineProperty(e, t5, n);
      } };
      zn = true;
      Di = { data: Us, props: Ks, emits: Ks, methods: Ct, computed: Ct, beforeCreate: de4, created: de4, beforeMount: de4, mounted: de4, beforeUpdate: de4, updated: de4, beforeDestroy: de4, beforeUnmount: de4, destroyed: de4, unmounted: de4, activated: de4, deactivated: de4, errorCaptured: de4, serverPrefetch: de4, components: Ct, directives: Ct, watch: ji, provide: Us, inject: Li };
      $i = 0;
      yt = null;
      Vi = (e, t5) => t5 === "modelValue" || t5 === "model-value" ? e.modelModifiers : e[`${t5}Modifiers`] || e[`${We(t5)}Modifiers`] || e[`${Wt(t5)}Modifiers`];
      Ni = /* @__PURE__ */ new WeakMap();
      Ui = (e) => {
        let t5;
        for (const n in e)
          (n === "class" || n === "style" || ss(n)) && ((t5 || (t5 = {}))[n] = e[n]);
        return t5;
      };
      Ki = (e, t5) => {
        const n = {};
        for (const s in e)
          (!sr(s) || !(s.slice(9) in t5)) && (n[s] = e[s]);
        return n;
      };
      Qr = {};
      eo = () => Object.create(Qr);
      to = (e) => Object.getPrototypeOf(e) === Qr;
      Yi = /* @__PURE__ */ new WeakMap();
      bs = (e) => e === "_" || e === "_ctx" || e === "$stable";
      vs = (e) => L3(e) ? e.map(He) : [He(e)];
      zi = (e, t5, n) => {
        if (t5._n)
          return t5;
        const s = hi((...r2) => vs(t5(...r2)), n);
        return s._c = false, s;
      };
      ro = (e, t5, n) => {
        const s = e._ctx;
        for (const r2 in e) {
          if (bs(r2))
            continue;
          const o = e[r2];
          if (j2(o))
            t5[r2] = zi(r2, o, s);
          else if (o != null) {
            const i2 = vs(o);
            t5[r2] = () => i2;
          }
        }
      };
      oo = (e, t5) => {
        const n = vs(t5);
        e.slots.default = () => n;
      };
      io = (e, t5, n) => {
        for (const s in t5)
          (n || !bs(s)) && (e[s] = t5[s]);
      };
      Zi = (e, t5, n) => {
        const s = e.slots = eo();
        if (e.vnode.shapeFlag & 32) {
          const r2 = t5._;
          r2 ? (io(s, t5, n), n && cr(s, "_", r2, true)) : ro(t5, s);
        } else
          t5 && oo(e, t5);
      };
      Xi = (e, t5, n) => {
        const { vnode: s, slots: r2 } = e;
        let o = true, i2 = q4;
        if (s.shapeFlag & 32) {
          const l4 = t5._;
          l4 ? n && l4 === 1 ? o = false : io(r2, t5, n) : (o = !t5.$stable, ro(t5, r2)), i2 = t5;
        } else
          t5 && (oo(e, t5), i2 = { default: 1 });
        if (o)
          for (const l4 in r2)
            !bs(l4) && i2[l4] == null && delete r2[l4];
      };
      oe5 = nl;
      fo = (e) => e.__isSuspense;
      me = Symbol.for("v-fgt");
      En = Symbol.for("v-txt");
      le5 = Symbol.for("v-cmt");
      Bn = Symbol.for("v-stc");
      Lt = [];
      ve4 = null;
      Ht = 1;
      uo = ({ key: e }) => e != null ? e : null;
      an = ({ ref: e, ref_key: t5, ref_for: n }) => (typeof e == "number" && (e = "" + e), e != null ? ne6(e) || ce3(e) || j2(e) ? { i: re5, r: e, k: t5, f: !!n } : e : null);
      Z = rl;
      cl = zr();
      fl = 0;
      se5 = null;
      ho = () => se5 || re5;
      {
        const e = xn(), t5 = (n, s) => {
          let r2;
          return (r2 = e[n]) || (r2 = e[n] = []), r2.push(s), (o) => {
            r2.length > 1 ? r2.forEach((i2) => i2(o)) : r2[0](o);
          };
        };
        bn = t5("__VUE_INSTANCE_SETTERS__", (n) => se5 = n), es = t5("__VUE_SSR_SETTERS__", (n) => vt = n);
      }
      zt = (e) => {
        const t5 = se5;
        return bn(e), e.scope.on(), () => {
          e.scope.off(), bn(t5);
        };
      };
      Ys = () => {
        se5 && se5.scope.off(), bn(null);
      };
      vt = false;
      hl = { get(e, t5) {
        return ie5(e, "get", ""), e[t5];
      } };
      Te = (e, t5) => ii(e, t5, vt);
      ml = "3.5.30";
      yl = function() {
        const t5 = typeof document < "u" && document.createElement("link").relList;
        return t5 && t5.supports && t5.supports("modulepreload") ? "modulepreload" : "preload";
      }();
      bl = function(e) {
        return "/assets/dock/js/" + e;
      };
      Zs = {};
      je = function(t5, n, s) {
        let r2 = Promise.resolve();
        if (n && n.length > 0) {
          let c3 = function(d2) {
            return Promise.all(d2.map((a2) => Promise.resolve(a2).then((h3) => ({ status: "fulfilled", value: h3 }), (h3) => ({ status: "rejected", reason: h3 }))));
          };
          document.getElementsByTagName("link");
          const i2 = document.querySelector("meta[property=csp-nonce]"), l4 = (i2 == null ? void 0 : i2.nonce) || (i2 == null ? void 0 : i2.getAttribute("nonce"));
          r2 = c3(n.map((d2) => {
            if (d2 = bl(d2), d2 in Zs)
              return;
            Zs[d2] = true;
            const a2 = d2.endsWith(".css"), h3 = a2 ? '[rel="stylesheet"]' : "";
            if (document.querySelector(`link[href="${d2}"]${h3}`))
              return;
            const b = document.createElement("link");
            if (b.rel = a2 ? "stylesheet" : yl, a2 || (b.as = "script"), b.crossOrigin = "", b.href = d2, l4 && b.setAttribute("nonce", l4), document.head.appendChild(b), a2)
              return new Promise((x3, k4) => {
                b.addEventListener("load", x3), b.addEventListener("error", () => k4(new Error(`Unable to preload CSS for ${d2}`)));
              });
          }));
        }
        function o(i2) {
          const l4 = new Event("vite:preloadError", { cancelable: true });
          if (l4.payload = i2, window.dispatchEvent(l4), !l4.defaultPrevented)
            throw i2;
        }
        return r2.then((i2) => {
          for (const l4 of i2 || [])
            l4.status === "rejected" && o(l4.reason);
          return t5().catch(o);
        });
      };
      vl = { name: "DockFallbackBar" };
      xl = (e, t5) => {
        const n = e.__vccOpts || e;
        for (const [s, r2] of t5)
          n[s] = r2;
        return n;
      };
      wl = { role: "banner", class: "dock-fallback-bar h-14 sticky top-0 z-50 flex items-center px-4 bg-[var(--dock-bg)] border-b border-[var(--dock-border)] text-[var(--dock-text)] text-sm" };
      Tl = xl(vl, [["render", kl]]);
      Sl = (e) => {
        for (const t5 in e)
          if (t5.startsWith("aria-") || t5 === "role" || t5 === "title")
            return true;
        return false;
      };
      Xs = (e) => e === "";
      El = (...e) => e.filter((t5, n, s) => !!t5 && t5.trim() !== "" && s.indexOf(t5) === n).join(" ").trim();
      Qs = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
      Al = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (t5, n, s) => s ? s.toUpperCase() : n.toLowerCase());
      Cl = (e) => {
        const t5 = Al(e);
        return t5.charAt(0).toUpperCase() + t5.slice(1);
      };
      At = { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 2, "stroke-linecap": "round", "stroke-linejoin": "round" };
      Pl = (_a, { slots: d2 }) => {
        var _b = _a, { name: e, iconNode: t5, absoluteStrokeWidth: n, "absolute-stroke-width": s, strokeWidth: r2, "stroke-width": o, size: i2 = At.width, color: l4 = At.stroke } = _b, c3 = __objRest(_b, ["name", "iconNode", "absoluteStrokeWidth", "absolute-stroke-width", "strokeWidth", "stroke-width", "size", "color"]);
        return ts("svg", __spreadValues(__spreadProps(__spreadValues(__spreadValues({}, At), c3), { width: i2, height: i2, stroke: l4, "stroke-width": Xs(n) || Xs(s) || n === true || s === true ? Number(r2 || o || At["stroke-width"]) * 24 / Number(i2) : r2 || o || At["stroke-width"], class: El("lucide", c3.class, ...e ? [`lucide-${Qs(Cl(e))}-icon`, `lucide-${Qs(e)}`] : ["lucide-icon"]) }), !d2.default && !Sl(c3) && { "aria-hidden": "true" }), [...t5.map((a2) => ts(...a2)), ...d2.default ? [d2.default()] : []]);
      };
      _o = (e, t5) => (n, { slots: s, attrs: r2 }) => ts(Pl, __spreadProps(__spreadValues(__spreadValues({}, r2), n), { iconNode: t5, name: e }), s);
      Ol = _o("bookmark-check", [["path", { d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z", key: "oz39mx" }], ["path", { d: "m9 10 2 2 4-4", key: "1gnqz4" }]]);
      Il = _o("bookmark", [["path", { d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z", key: "oz39mx" }]]);
      Ml = 12;
      ye5 = Ce([]);
      er = false;
      mo = Te(() => ye5.value.length >= Ml);
      ke5 = Ce([]);
      tr = false;
      Ul = ["aria-label", "disabled", "title"];
      Kl = { name: "DockPinButton" };
      Wl = ms(__spreadProps(__spreadValues({}, Kl), { props: { currentPath: {} }, setup(e) {
        const t5 = e, { atLimit: n, isBookmarked: s, addBookmark: r2, removeBookmark: o } = yo(), { items: i2 } = bo(), l4 = Te(() => {
          const x3 = t5.currentPath.match(/^\/([^/]+)\/([^/]+)\/([^/]+)$/);
          if (!x3)
            return null;
          const [, k4, v2, F4] = x3;
          return k4 === "dock" ? null : { app: k4, doctype: v2, docname: decodeURIComponent(F4) };
        }), c3 = Te(() => l4.value !== null), d2 = Te(() => l4.value ? s(l4.value.app, l4.value.doctype, l4.value.docname) : null), a2 = Te(() => d2.value !== null), h3 = Ce(false);
        async function b() {
          var _a, _b;
          if (l4.value) {
            h3.value = true;
            try {
              if (a2.value && d2.value)
                o(d2.value);
              else {
                const x3 = i2.value.find((k4) => k4.app === l4.value.app && k4.doctype === l4.value.doctype && k4.docname === l4.value.docname);
                await r2({ app: l4.value.app, doctype: l4.value.doctype, docname: l4.value.docname, label: (_a = x3 == null ? void 0 : x3.label) != null ? _a : l4.value.docname, icon: (_b = x3 == null ? void 0 : x3.icon) != null ? _b : "" });
              }
            } finally {
              h3.value = false;
            }
          }
        }
        return (x3, k4) => c3.value ? (Se(), yn("button", { key: 0, class: qt(["flex items-center justify-center w-8 h-8 rounded-md transition-colors", [a2.value ? "text-[var(--dock-accent)]" : "text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10", te(n) && !a2.value && "opacity-40 cursor-not-allowed"]]), "aria-label": a2.value ? te(Vn)("Remove bookmark") : te(Vn)("Bookmark this record"), disabled: h3.value || te(n) && !a2.value, title: te(n) && !a2.value ? te(Vn)("Bookmark limit reached (12). Remove a bookmark to add another.") : void 0, onClick: b }, [a2.value ? (Se(), nt(te(Ol), { key: 0, class: "w-4 h-4" })) : (Se(), nt(te(Il), { key: 1, class: "w-4 h-4" }))], 10, Ul)) : Qn("", true);
      } }));
      vo = "dock-sidebar-collapsed";
      on = Ce(localStorage.getItem(vo) === "true");
      ln = Ce(false);
      Gl = { class: "flex-1 flex justify-center px-4" };
      Yl = { class: "flex items-center gap-1 flex-shrink-0" };
      zl = { name: "DockNavbar" };
      uc = ms(__spreadProps(__spreadValues({}, zl), { setup(e) {
        var _a, _b, _c, _d, _e5, _f, _g;
        const { toggle: t5 } = Jl(), n = Ce(false), s = Ce(false), r2 = Ce(window.location.pathname);
        Ur(() => (n.value = true, false));
        function o() {
          s.value = window.scrollY > 4;
        }
        Ft(() => window.addEventListener("scroll", o, { passive: true })), gn(() => window.removeEventListener("scroll", o));
        const { registeredApps: i2, dock: l4 } = ql(), { init: c3, trackItem: d2 } = bo(), { init: a2 } = yo();
        Ft(() => {
          var _a2, _b2;
          c3((_a2 = l4.value) == null ? void 0 : _a2.recent_items), a2((_b2 = l4.value) == null ? void 0 : _b2.bookmarks);
          const V2 = window.location.pathname;
          r2.value = V2;
          const A4 = i2.value.find(($2) => V2.startsWith($2.route));
          (A4 == null ? void 0 : A4.color) && document.documentElement.style.setProperty("--dock-accent", A4.color);
        });
        function h3() {
          const V2 = window.location.pathname;
          r2.value = V2;
          const A4 = V2.match(/^\/([^/]+)\/([^/]+)\/([^/]+)$/);
          if (A4) {
            const [, $2, X2, ae5] = A4;
            if ($2 !== "dock") {
              const xe5 = i2.value.find((Oe2) => Oe2.app === $2);
              d2({ app: $2, doctype: X2, docname: decodeURIComponent(ae5), label: decodeURIComponent(ae5), icon: (xe5 == null ? void 0 : xe5.color, "") });
            }
          }
        }
        function b(V2) {
          const A4 = V2.detail;
          A4 && d2(A4);
        }
        Ft(() => {
          const V2 = history.pushState.bind(history);
          history.__dockPushState = V2, history.pushState = function(...A4) {
            V2(...A4), h3();
          }, window.addEventListener("popstate", h3), window.addEventListener("dock:trackVisit", b);
        }), gn(() => {
          history.__dockPushState && (history.pushState = history.__dockPushState, delete history.__dockPushState), window.removeEventListener("popstate", h3), window.removeEventListener("dock:trackVisit", b);
        });
        const x3 = (_g = (_f = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.installed_apps) == null ? void 0 : _c.includes("jana")) != null ? _f : (_e5 = (_d = window.dockBoot) == null ? void 0 : _d.installed_apps) == null ? void 0 : _e5.includes("jana")) != null ? _g : false, k4 = De(() => je(() => Promise.resolve().then(() => (init_DockSidebarToggle_BFAbmNrj(), DockSidebarToggle_BFAbmNrj_exports)), [])), v2 = De(() => je(() => Promise.resolve().then(() => (init_DockAppLabel_YzA6JhFa(), DockAppLabel_YzA6JhFa_exports)), [])), F4 = De(() => je(() => Promise.resolve().then(() => (init_DockSearch_Bs4BTOyj(), DockSearch_Bs4BTOyj_exports)).then((V2) => V2.d), [])), R3 = De(() => je(() => Promise.resolve().then(() => (init_DockTimer_Bf3K_MD2(), DockTimer_Bf3K_MD2_exports)), [])), P3 = De(() => je(() => Promise.resolve().then(() => (init_DockTimerStaleWarning_DDNZLr8e(), DockTimerStaleWarning_DDNZLr8e_exports)), [])), M3 = De(() => je(() => Promise.resolve().then(() => (init_DockCalendarIcon_CiPK_4bv(), DockCalendarIcon_CiPK_4bv_exports)), [])), C3 = De(() => je(() => Promise.resolve().then(() => (init_DockBell_CwTetaIg(), DockBell_CwTetaIg_exports)), [])), B2 = De(() => je(() => Promise.resolve().then(() => (init_DockJana_CcP1bCjC(), DockJana_CcP1bCjC_exports)), [])), J5 = De(() => je(() => Promise.resolve().then(() => (init_DockAppSwitcher_CUNeqAr0(), DockAppSwitcher_CUNeqAr0_exports)), __vite__mapDeps([0]))), ee4 = De(() => je(() => Promise.resolve().then(() => (init_DockAvatar_6litHua8(), DockAvatar_6litHua8_exports)), []));
        return (V2, A4) => (Se(), yn(me, null, [n.value ? (Se(), nt(Tl, { key: 0 })) : (Se(), yn("header", { key: 1, role: "banner", class: qt(["dock-navbar h-14 sticky top-0 z-50 flex items-center gap-2 px-4 select-none bg-[var(--dock-bg)] text-[var(--dock-text)] transition-shadow duration-150", s.value ? "shadow-sm" : "border-b border-[var(--dock-border)] border-opacity-50"]) }, [Z(te(k4), { class: "flex-shrink-0", onToggle: te(t5) }, null, 8, ["onToggle"]), Z(te(v2), { class: "flex-shrink-0" }), Ut("div", Gl, [Z(te(F4))]), Ut("div", Yl, [Z(Wl, { "current-path": r2.value }, null, 8, ["current-path"]), Z(te(R3)), Z(te(M3)), Z(te(C3)), te(x3) ? (Se(), nt(te(B2), { key: 0 })) : Qn("", true), Z(te(J5)), Z(te(ee4))])], 2)), n.value ? Qn("", true) : (Se(), nt(te(P3), { key: 2 }))], 64));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/runtime-dom.esm-bundler-uPARf279.js
  function Jt2(t5) {
    const e = {};
    for (const c3 in t5)
      c3 in Et2 || (e[c3] = t5[c3]);
    if (t5.css === false)
      return e;
    const { name: n = "v", type: s, duration: o, enterFromClass: r2 = `${n}-enter-from`, enterActiveClass: i2 = `${n}-enter-active`, enterToClass: a2 = `${n}-enter-to`, appearFromClass: f = r2, appearActiveClass: l4 = i2, appearToClass: u2 = a2, leaveFromClass: p4 = `${n}-leave-from`, leaveActiveClass: m2 = `${n}-leave-active`, leaveToClass: _2 = `${n}-leave-to` } = t5, w = Qt(o), wt = w && w[0], Mt2 = w && w[1], { onBeforeEnter: U4, onEnter: z5, onEnterCancelled: G4, onLeave: W5, onLeaveCancelled: Nt2, onBeforeAppear: Lt2 = U4, onAppear: yt2 = z5, onAppearCancelled: It2 = G4 } = e, V2 = (c3, d2, T3, D2) => {
      c3._enterCancelled = D2, E2(c3, d2 ? u2 : a2), E2(c3, d2 ? l4 : i2), T3 && T3();
    }, X2 = (c3, d2) => {
      c3._isLeaving = false, E2(c3, p4), E2(c3, _2), E2(c3, m2), d2 && d2();
    }, Z4 = (c3) => (d2, T3) => {
      const D2 = c3 ? yt2 : z5, J5 = () => V2(d2, c3, T3);
      A3(D2, [d2, J5]), tt2(() => {
        E2(d2, c3 ? f : r2), g2(d2, c3 ? u2 : a2), k3(D2) || et2(d2, s, wt, J5);
      });
    };
    return fe5(e, { onBeforeEnter(c3) {
      A3(U4, [c3]), g2(c3, r2), g2(c3, i2);
    }, onBeforeAppear(c3) {
      A3(Lt2, [c3]), g2(c3, f), g2(c3, l4);
    }, onEnter: Z4(false), onAppear: Z4(true), onLeave(c3, d2) {
      c3._isLeaving = true;
      const T3 = () => X2(c3, d2);
      g2(c3, p4), c3._enterCancelled ? (g2(c3, m2), ot(c3)) : (ot(c3), g2(c3, m2)), tt2(() => {
        c3._isLeaving && (E2(c3, p4), g2(c3, _2), k3(W5) || et2(c3, s, Mt2, T3));
      }), A3(W5, [c3, T3]);
    }, onEnterCancelled(c3) {
      V2(c3, false, void 0, true), A3(G4, [c3]);
    }, onAppearCancelled(c3) {
      V2(c3, true, void 0, true), A3(It2, [c3]);
    }, onLeaveCancelled(c3) {
      X2(c3), A3(Nt2, [c3]);
    } });
  }
  function Qt(t5) {
    if (t5 == null)
      return null;
    if (W4(t5))
      return [$(t5.enter), $(t5.leave)];
    {
      const e = $(t5);
      return [e, e];
    }
  }
  function $(t5) {
    return Xl(t5);
  }
  function g2(t5, e) {
    e.split(/\s+/).forEach((n) => n && t5.classList.add(n)), (t5[I2] || (t5[I2] = /* @__PURE__ */ new Set())).add(e);
  }
  function E2(t5, e) {
    e.split(/\s+/).forEach((s) => s && t5.classList.remove(s));
    const n = t5[I2];
    n && (n.delete(e), n.size || (t5[I2] = void 0));
  }
  function tt2(t5) {
    requestAnimationFrame(() => {
      requestAnimationFrame(t5);
    });
  }
  function et2(t5, e, n, s) {
    const o = t5._endId = ++Yt2, r2 = () => {
      o === t5._endId && s();
    };
    if (n != null)
      return setTimeout(r2, n);
    const { type: i2, timeout: a2, propCount: f } = kt(t5, e);
    if (!i2)
      return s();
    const l4 = i2 + "end";
    let u2 = 0;
    const p4 = () => {
      t5.removeEventListener(l4, m2), r2();
    }, m2 = (_2) => {
      _2.target === t5 && ++u2 >= f && p4();
    };
    setTimeout(() => {
      u2 < f && p4();
    }, a2 + 1), t5.addEventListener(l4, m2);
  }
  function kt(t5, e) {
    const n = window.getComputedStyle(t5), s = (w) => (n[w] || "").split(", "), o = s(`${v}Delay`), r2 = s(`${v}Duration`), i2 = nt2(o, r2), a2 = s(`${N2}Delay`), f = s(`${N2}Duration`), l4 = nt2(a2, f);
    let u2 = null, p4 = 0, m2 = 0;
    e === v ? i2 > 0 && (u2 = v, p4 = i2, m2 = r2.length) : e === N2 ? l4 > 0 && (u2 = N2, p4 = l4, m2 = f.length) : (p4 = Math.max(i2, l4), u2 = p4 > 0 ? i2 > l4 ? v : N2 : null, m2 = u2 ? u2 === v ? r2.length : f.length : 0);
    const _2 = u2 === v && /\b(?:transform|all)(?:,|$)/.test(s(`${v}Property`).toString());
    return { type: u2, timeout: p4, propCount: m2, hasTransform: _2 };
  }
  function nt2(t5, e) {
    for (; t5.length < e.length; )
      t5 = t5.concat(t5);
    return Math.max(...e.map((n, s) => st2(n) + st2(t5[s])));
  }
  function st2(t5) {
    return t5 === "auto" ? 0 : Number(t5.slice(0, -1).replace(",", ".")) * 1e3;
  }
  function ot(t5) {
    return (t5 ? t5.ownerDocument : document).body.offsetHeight;
  }
  function te5(t5, e, n) {
    const s = t5[I2];
    s && (e = (e ? [e, ...s] : [...s]).join(" ")), e == null ? t5.removeAttribute("class") : n ? t5.setAttribute("class", e) : t5.className = e;
  }
  function oe6(t5, e, n) {
    const s = t5.style, o = ne6(n);
    let r2 = false;
    if (n && !o) {
      if (e)
        if (ne6(e))
          for (const i2 of e.split(";")) {
            const a2 = i2.slice(0, i2.indexOf(":")).trim();
            n[a2] == null && O3(s, a2, "");
          }
        else
          for (const i2 in e)
            n[i2] == null && O3(s, i2, "");
      for (const i2 in n)
        i2 === "display" && (r2 = true), O3(s, i2, n[i2]);
    } else if (o) {
      if (e !== n) {
        const i2 = s[ne7];
        i2 && (n += ";" + i2), s.cssText = n, r2 = se6.test(n);
      }
    } else
      e && t5.removeAttribute("style");
    it2 in t5 && (t5[it2] = r2 ? s.display : "", t5[ee3] && (s.display = "none"));
  }
  function O3(t5, e, n) {
    if (L3(n))
      n.forEach((s) => O3(t5, e, s));
    else if (n == null && (n = ""), e.startsWith("--"))
      t5.setProperty(e, n);
    else {
      const s = ie6(t5, e);
      rt.test(n) ? t5.setProperty(Wt(s), n.replace(rt, ""), "important") : t5[s] = n;
    }
  }
  function ie6(t5, e) {
    const n = K5[e];
    if (n)
      return n;
    let s = We(e);
    if (s !== "filter" && s in t5)
      return K5[e] = s;
    s = is(s);
    for (let o = 0; o < ct2.length; o++) {
      const r2 = ct2[o] + s;
      if (r2 in t5)
        return K5[e] = r2;
    }
    return e;
  }
  function ft2(t5, e, n, s, o, r2 = Ql(e)) {
    s && e.startsWith("xlink:") ? n == null ? t5.removeAttributeNS(at2, e.slice(6, e.length)) : t5.setAttributeNS(at2, e, n) : n == null || r2 && !ec(n) ? t5.removeAttribute(e) : t5.setAttribute(e, r2 ? "" : Ke2(n) ? String(n) : n);
  }
  function lt2(t5, e, n, s, o) {
    if (e === "innerHTML" || e === "textContent") {
      n != null && (t5[e] = e === "innerHTML" ? At2(n) : n);
      return;
    }
    const r2 = t5.tagName;
    if (e === "value" && r2 !== "PROGRESS" && !r2.includes("-")) {
      const a2 = r2 === "OPTION" ? t5.getAttribute("value") || "" : t5.value, f = n == null ? t5.type === "checkbox" ? "on" : "" : String(n);
      (a2 !== f || !("_value" in t5)) && (t5.value = f), n == null && t5.removeAttribute(e), t5._value = n;
      return;
    }
    let i2 = false;
    if (n === "" || n == null) {
      const a2 = typeof t5[e];
      a2 === "boolean" ? n = ec(n) : n == null && a2 === "string" ? (n = "", i2 = true) : a2 === "number" && (n = 0, i2 = true);
    }
    try {
      t5[e] = n;
    } catch (e2) {
    }
    i2 && t5.removeAttribute(o || e);
  }
  function C2(t5, e, n, s) {
    t5.addEventListener(e, n, s);
  }
  function re6(t5, e, n, s) {
    t5.removeEventListener(e, n, s);
  }
  function ce4(t5, e, n, s, o = null) {
    const r2 = t5[ut2] || (t5[ut2] = {}), i2 = r2[e];
    if (s && i2)
      i2.value = s;
    else {
      const [a2, f] = ae4(e);
      if (s) {
        const l4 = r2[e] = ue4(s, o);
        C2(t5, a2, l4, f);
      } else
        i2 && (re6(t5, a2, i2, f), r2[e] = void 0);
    }
  }
  function ae4(t5) {
    let e;
    if (dt2.test(t5)) {
      e = {};
      let s;
      for (; s = t5.match(dt2); )
        t5 = t5.slice(0, t5.length - s[0].length), e[s[0].toLowerCase()] = true;
    }
    return [t5[2] === ":" ? t5.slice(3) : Wt(t5.slice(2)), e];
  }
  function ue4(t5, e) {
    const n = (s) => {
      if (!s._vts)
        s._vts = Date.now();
      else if (s._vts <= n.attached)
        return;
      qe2(de5(s, n.value), e, 5, [s]);
    };
    return n.value = t5, n.attached = le6(), n;
  }
  function de5(t5, e) {
    if (L3(e)) {
      const n = t5.stopImmediatePropagation;
      return t5.stopImmediatePropagation = () => {
        n.call(t5), t5._stopped = true;
      }, e.map((s) => (o) => !o._stopped && s && s(o));
    } else
      return e;
  }
  function me5(t5, e, n, s) {
    if (s)
      return !!(e === "innerHTML" || e === "textContent" || e in t5 && pt2(e) && j2(n));
    if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "autocorrect" || e === "sandbox" && t5.tagName === "IFRAME" || e === "form" || e === "list" && t5.tagName === "INPUT" || e === "type" && t5.tagName === "TEXTAREA")
      return false;
    if (e === "width" || e === "height") {
      const o = t5.tagName;
      if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
        return false;
    }
    return pt2(e) && ne6(n) ? false : e in t5;
  }
  function ge4(t5, e) {
    const n = t5._def.props;
    if (!n)
      return false;
    const s = We(e);
    return Array.isArray(n) ? n.some((o) => We(o) === s) : Object.keys(n).some((o) => We(o) === s);
  }
  function he5(t5) {
    t5.target.composing = true;
  }
  function mt2(t5) {
    const e = t5.target;
    e.composing && (e.composing = false, e.dispatchEvent(new Event("input")));
  }
  function gt2(t5, e, n) {
    return e && (t5 = t5.trim()), n && (t5 = Ao(t5)), t5;
  }
  function St2(t5, e) {
    const n = t5.multiple, s = L3(e);
    if (!(n && !s && !rr(e))) {
      for (let o = 0, r2 = t5.options.length; o < r2; o++) {
        const i2 = t5.options[o], a2 = x2(i2);
        if (n)
          if (s) {
            const f = typeof a2;
            f === "string" || f === "number" ? i2.selected = e.some((l4) => String(l4) === String(a2)) : i2.selected = tc(e, a2) > -1;
          } else
            i2.selected = e.has(a2);
        else if (wn(x2(i2), e)) {
          t5.selectedIndex !== o && (t5.selectedIndex = o);
          return;
        }
      }
      !n && t5.selectedIndex !== -1 && (t5.selectedIndex = -1);
    }
  }
  function x2(t5) {
    return "_value" in t5 ? t5._value : t5.value;
  }
  function Te4() {
    return vt2 || (vt2 = ac(be4));
  }
  function Ae4(t5) {
    if (t5 instanceof SVGElement)
      return "svg";
    if (typeof MathMLElement == "function" && t5 instanceof MathMLElement)
      return "mathml";
  }
  function Ee4(t5) {
    return ne6(t5) ? document.querySelector(t5) : t5;
  }
  var F3, Q4, At2, zt2, Gt2, h2, Y3, Wt2, v, N2, I2, Et2, Xt, Zt, we3, A3, k3, Yt2, it2, ee3, ne7, se6, rt, ct2, K5, at2, ut2, dt2, R2, fe6, le6, pt2, pe4, M2, S2, Me, Le, Se4, ve5, ye, be4, vt2, xe4;
  var init_runtime_dom_esm_bundler_uPARf279 = __esm({
    "../dock/dock/public/js/chunks/runtime-dom.esm-bundler-uPARf279.js"() {
      init_dock_navbar_esm();
      Q4 = typeof window < "u" && window.trustedTypes;
      if (Q4)
        try {
          F3 = Q4.createPolicy("vue", { createHTML: (t5) => t5 });
        } catch (e) {
        }
      At2 = F3 ? (t5) => F3.createHTML(t5) : (t5) => t5;
      zt2 = "http://www.w3.org/2000/svg";
      Gt2 = "http://www.w3.org/1998/Math/MathML";
      h2 = typeof document < "u" ? document : null;
      Y3 = h2 && h2.createElement("template");
      Wt2 = { insert: (t5, e, n) => {
        e.insertBefore(t5, n || null);
      }, remove: (t5) => {
        const e = t5.parentNode;
        e && e.removeChild(t5);
      }, createElement: (t5, e, n, s) => {
        const o = e === "svg" ? h2.createElementNS(zt2, t5) : e === "mathml" ? h2.createElementNS(Gt2, t5) : n ? h2.createElement(t5, { is: n }) : h2.createElement(t5);
        return t5 === "select" && s && s.multiple != null && o.setAttribute("multiple", s.multiple), o;
      }, createText: (t5) => h2.createTextNode(t5), createComment: (t5) => h2.createComment(t5), setText: (t5, e) => {
        t5.nodeValue = e;
      }, setElementText: (t5, e) => {
        t5.textContent = e;
      }, parentNode: (t5) => t5.parentNode, nextSibling: (t5) => t5.nextSibling, querySelector: (t5) => h2.querySelector(t5), setScopeId(t5, e) {
        t5.setAttribute(e, "");
      }, insertStaticContent(t5, e, n, s, o, r2) {
        const i2 = n ? n.previousSibling : e.lastChild;
        if (o && (o === r2 || o.nextSibling))
          for (; e.insertBefore(o.cloneNode(true), n), !(o === r2 || !(o = o.nextSibling)); )
            ;
        else {
          Y3.innerHTML = At2(s === "svg" ? `<svg>${t5}</svg>` : s === "mathml" ? `<math>${t5}</math>` : t5);
          const a2 = Y3.content;
          if (s === "svg" || s === "mathml") {
            const f = a2.firstChild;
            for (; f.firstChild; )
              a2.appendChild(f.firstChild);
            a2.removeChild(f);
          }
          e.insertBefore(a2, n);
        }
        return [i2 ? i2.nextSibling : e.firstChild, n ? n.previousSibling : e.lastChild];
      } };
      v = "transition";
      N2 = "animation";
      I2 = Symbol("_vtc");
      Et2 = { name: String, type: String, css: { type: Boolean, default: true }, duration: [String, Number, Object], enterFromClass: String, enterActiveClass: String, enterToClass: String, appearFromClass: String, appearActiveClass: String, appearToClass: String, leaveFromClass: String, leaveActiveClass: String, leaveToClass: String };
      Xt = fe5({}, vi, Et2);
      Zt = (t5) => (t5.displayName = "Transition", t5.props = Xt, t5);
      we3 = Zt((t5, { slots: e }) => ts(oc, Jt2(t5), e));
      A3 = (t5, e = []) => {
        L3(t5) ? t5.forEach((n) => n(...e)) : t5 && t5(...e);
      };
      k3 = (t5) => t5 ? L3(t5) ? t5.some((e) => e.length > 1) : t5.length > 1 : false;
      Yt2 = 0;
      it2 = Symbol("_vod");
      ee3 = Symbol("_vsh");
      ne7 = Symbol("");
      se6 = /(?:^|;)\s*display\s*:/;
      rt = /\s*!important$/;
      ct2 = ["Webkit", "Moz", "ms"];
      K5 = {};
      at2 = "http://www.w3.org/1999/xlink";
      ut2 = Symbol("_vei");
      dt2 = /(?:Once|Passive|Capture)$/;
      R2 = 0;
      fe6 = Promise.resolve();
      le6 = () => R2 || (fe6.then(() => R2 = 0), R2 = Date.now());
      pt2 = (t5) => t5.charCodeAt(0) === 111 && t5.charCodeAt(1) === 110 && t5.charCodeAt(2) > 96 && t5.charCodeAt(2) < 123;
      pe4 = (t5, e, n, s, o, r2) => {
        const i2 = o === "svg";
        e === "class" ? te5(t5, s, i2) : e === "style" ? oe6(t5, n, s) : ss(e) ? sr(e) || ce4(t5, e, n, s, r2) : (e[0] === "." ? (e = e.slice(1), true) : e[0] === "^" ? (e = e.slice(1), false) : me5(t5, e, s, i2)) ? (lt2(t5, e, s), !t5.tagName.includes("-") && (e === "value" || e === "checked" || e === "selected") && ft2(t5, e, s, i2, r2, e !== "value")) : t5._isVueCE && (ge4(t5, e) || t5._def.__asyncLoader && (/[A-Z]/.test(e) || !ne6(s))) ? lt2(t5, We(e), s, r2, e) : (e === "true-value" ? t5._trueValue = s : e === "false-value" && (t5._falseValue = s), ft2(t5, e, s, i2));
      };
      M2 = (t5) => {
        const e = t5.props["onUpdate:modelValue"] || false;
        return L3(e) ? (n) => On(e, n) : e;
      };
      S2 = Symbol("_assign");
      Me = { created(t5, { modifiers: { lazy: e, trim: n, number: s } }, o) {
        t5[S2] = M2(o);
        const r2 = s || o.props && o.props.type === "number";
        C2(t5, e ? "change" : "input", (i2) => {
          i2.target.composing || t5[S2](gt2(t5.value, n, r2));
        }), (n || r2) && C2(t5, "change", () => {
          t5.value = gt2(t5.value, n, r2);
        }), e || (C2(t5, "compositionstart", he5), C2(t5, "compositionend", mt2), C2(t5, "change", mt2));
      }, mounted(t5, { value: e }) {
        t5.value = e != null ? e : "";
      }, beforeUpdate(t5, { value: e, oldValue: n, modifiers: { lazy: s, trim: o, number: r2 } }, i2) {
        if (t5[S2] = M2(i2), t5.composing)
          return;
        const a2 = (r2 || t5.type === "number") && !/^0\d/.test(t5.value) ? Ao(t5.value) : t5.value, f = e != null ? e : "";
        a2 !== f && (document.activeElement === t5 && t5.type !== "range" && (s && e === n || o && t5.value.trim() === f) || (t5.value = f));
      } };
      Le = { deep: true, created(t5, { value: e, modifiers: { number: n } }, s) {
        const o = rr(e);
        C2(t5, "change", () => {
          const r2 = Array.prototype.filter.call(t5.options, (i2) => i2.selected).map((i2) => n ? Ao(x2(i2)) : x2(i2));
          t5[S2](t5.multiple ? o ? new Set(r2) : r2 : r2[0]), t5._assigning = true, ai(() => {
            t5._assigning = false;
          });
        }), t5[S2] = M2(s);
      }, mounted(t5, { value: e }) {
        St2(t5, e);
      }, beforeUpdate(t5, e, n) {
        t5[S2] = M2(n);
      }, updated(t5, { value: e }) {
        t5._assigning || St2(t5, e);
      } };
      Se4 = ["ctrl", "shift", "alt", "meta"];
      ve5 = { stop: (t5) => t5.stopPropagation(), prevent: (t5) => t5.preventDefault(), self: (t5) => t5.target !== t5.currentTarget, ctrl: (t5) => !t5.ctrlKey, shift: (t5) => !t5.shiftKey, alt: (t5) => !t5.altKey, meta: (t5) => !t5.metaKey, left: (t5) => "button" in t5 && t5.button !== 0, middle: (t5) => "button" in t5 && t5.button !== 1, right: (t5) => "button" in t5 && t5.button !== 2, exact: (t5, e) => Se4.some((n) => t5[`${n}Key`] && !e.includes(n)) };
      ye = (t5, e) => {
        if (!t5)
          return t5;
        const n = t5._withMods || (t5._withMods = {}), s = e.join(".");
        return n[s] || (n[s] = (o, ...r2) => {
          for (let i2 = 0; i2 < e.length; i2++) {
            const a2 = ve5[e[i2]];
            if (a2 && a2(o, e))
              return;
          }
          return t5(o, ...r2);
        });
      };
      be4 = fe5({ patchProp: pe4 }, Wt2);
      xe4 = (...t5) => {
        const e = Te4().createApp(...t5), { mount: n } = e;
        return e.mount = (s) => {
          const o = Ee4(s);
          if (!o)
            return;
          const r2 = e._component;
          !j2(r2) && !r2.render && !r2.template && (r2.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
          const i2 = n(o, false, Ae4(o));
          return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i2;
        }, e;
      };
    }
  });

  // ../dock/dock/public/js/dock.bundle.js
  init_runtime_dom_esm_bundler_uPARf279();
  init_dock_navbar_esm();
  function r() {
    var _a, _b, _c;
    if (!((_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) == null ? void 0 : _c.installed))
      return;
    const t5 = document.querySelector(".navbar.navbar-fixed-top");
    if (t5) {
      const e = document.createElement("div");
      t5.replaceWith(e), xe4(uc).mount(e);
    } else {
      const e = document.createElement("div");
      document.body.prepend(e), xe4(uc).mount(e);
    }
  }
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", r) : r();
})();
//# sourceMappingURL=dock.bundle.X2HSB7E5.js.map
