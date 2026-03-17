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

  // ../dock/dock/public/js/chunks/DockSidebarToggle-CmHh0zMR.js
  var DockSidebarToggle_CmHh0zMR_exports = {};
  __export(DockSidebarToggle_CmHh0zMR_exports, {
    default: () => k
  });
  var l, d, k;
  var init_DockSidebarToggle_CmHh0zMR = __esm({
    "../dock/dock/public/js/chunks/DockSidebarToggle-CmHh0zMR.js"() {
      init_dock_navbar_esm();
      l = _o("menu", [["path", { d: "M4 5h16", key: "1tepv9" }], ["path", { d: "M4 12h16", key: "1lakjw" }], ["path", { d: "M4 19h16", key: "1djgab" }]]);
      d = { name: "DockSidebarToggle" };
      k = ms(__spreadProps(__spreadValues({}, d), { setup(i2) {
        return (t6, e) => (Se(), bn("button", { class: "flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", "aria-label": "Toggle sidebar", title: "Toggle sidebar", onClick: e[0] || (e[0] = (u2) => t6.$emit("toggle")) }, [q(ee(l), { class: "w-5 h-5" })]));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/DockAppLabel-BUBzNJoT.js
  var DockAppLabel_BUBzNJoT_exports = {};
  __export(DockAppLabel_BUBzNJoT_exports, {
    default: () => g
  });
  var p, _, m, u, k2, g;
  var init_DockAppLabel_BUBzNJoT = __esm({
    "../dock/dock/public/js/chunks/DockAppLabel-BUBzNJoT.js"() {
      init_dock_navbar_esm();
      p = "/assets/dock/js/assets/dock-icon.svg";
      _ = { class: "dock-app-label flex items-center gap-2 min-w-0" };
      m = ["src"];
      u = { class: "text-sm font-medium text-[var(--dock-text)] truncate max-w-[140px]" };
      k2 = { name: "DockAppLabel" };
      g = ms(__spreadProps(__spreadValues({}, k2), { setup(f2) {
        const { settings: t6 } = vo(), o2 = Te(() => {
          var _a;
          const s = ((_a = t6.value) == null ? void 0 : _a.site_label) || "Dock";
          return s.charAt(0).toUpperCase() + s.slice(1);
        });
        return (s, x3) => (Se(), bn("div", _, [Kt("img", { src: ee(p), alt: "Dock", class: "h-6 w-6 rounded-md flex-shrink-0" }, null, 8, m), Kt("span", u, Do(o2.value), 1)]));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/search-Bi1C6pxc.js
  var r;
  var init_search_Bi1C6pxc = __esm({
    "../dock/dock/public/js/chunks/search-Bi1C6pxc.js"() {
      init_dock_navbar_esm();
      r = _o("search", [["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }], ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]]);
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

  // ../dock/dock/public/js/chunks/chevron-left-CFkzoTC-.js
  var t;
  var init_chevron_left_CFkzoTC = __esm({
    "../dock/dock/public/js/chunks/chevron-left-CFkzoTC-.js"() {
      init_dock_navbar_esm();
      t = _o("chevron-left", [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]);
    }
  });

  // ../dock/dock/public/js/chunks/DockSearchModal-DcZB4FhM.js
  var DockSearchModal_DcZB4FhM_exports = {};
  __export(DockSearchModal_DcZB4FhM_exports, {
    default: () => ta
  });
  function _e(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function je(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function He(s, k3) {
    if (!k3 || k3.length < 1)
      return _e(s);
    const v2 = je(k3), x3 = new RegExp(`(${v2})`, "gi");
    return _e(s).replace(x3, '<mark class="bg-yellow-200/60 dark:bg-yellow-500/30 text-inherit rounded-sm px-0.5">$1</mark>');
  }
  var Fe, Ke, Pe, We, Ge, Xe, Je, Qe, Ye, Ze, et, tt, te, at, lt, ot, rt, ae, nt2, st, ct, it, dt, $e, ut, vt, pt, kt, Ce, bt, gt, Se2, xt, ht, mt, ft, yt, wt2, _t, $t, Ct2, Ae, St, At, Rt, Mt, Tt, Et, Lt, Dt2, qt, Bt, Nt, It, Ot, Ut, Vt, zt, Ft, jt, Ht, Kt2, Pt, Wt, Gt, Xt, ta;
  var init_DockSearchModal_DcZB4FhM = __esm({
    "../dock/dock/public/js/chunks/DockSearchModal-DcZB4FhM.js"() {
      init_runtime_dom_esm_bundler_DJPzte74();
      init_dock_navbar_esm();
      init_search_Bi1C6pxc();
      init_x_Dj5OacS7();
      init_chevron_left_CFkzoTC();
      Fe = _o("triangle-alert", [["path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3", key: "wmoenq" }], ["path", { d: "M12 9v4", key: "juzpu7" }], ["path", { d: "M12 17h.01", key: "p32p05" }]]);
      Ke = { name: "DockStatusBadge" };
      Pe = ms(__spreadProps(__spreadValues({}, Ke), { props: { status: {}, category: {} }, setup(s) {
        const k3 = s, v2 = { active: { light: "bg-emerald-50 text-emerald-700", dark: "dark:bg-emerald-900/30 dark:text-emerald-400" }, completed: { light: "bg-emerald-50 text-emerald-700", dark: "dark:bg-emerald-900/30 dark:text-emerald-400" }, open: { light: "bg-emerald-50 text-emerald-700", dark: "dark:bg-emerald-900/30 dark:text-emerald-400" }, confirmed: { light: "bg-emerald-50 text-emerald-700", dark: "dark:bg-emerald-900/30 dark:text-emerald-400" }, accepted: { light: "bg-emerald-50 text-emerald-700", dark: "dark:bg-emerald-900/30 dark:text-emerald-400" }, "in progress": { light: "bg-blue-50 text-blue-700", dark: "dark:bg-blue-900/30 dark:text-blue-400" }, working: { light: "bg-blue-50 text-blue-700", dark: "dark:bg-blue-900/30 dark:text-blue-400" }, ongoing: { light: "bg-blue-50 text-blue-700", dark: "dark:bg-blue-900/30 dark:text-blue-400" }, pending: { light: "bg-blue-50 text-blue-700", dark: "dark:bg-blue-900/30 dark:text-blue-400" }, planning: { light: "bg-violet-50 text-violet-700", dark: "dark:bg-violet-900/30 dark:text-violet-400" }, draft: { light: "bg-violet-50 text-violet-700", dark: "dark:bg-violet-900/30 dark:text-violet-400" }, tentative: { light: "bg-violet-50 text-violet-700", dark: "dark:bg-violet-900/30 dark:text-violet-400" }, scheduled: { light: "bg-violet-50 text-violet-700", dark: "dark:bg-violet-900/30 dark:text-violet-400" }, "on hold": { light: "bg-amber-50 text-amber-700", dark: "dark:bg-amber-900/30 dark:text-amber-400" }, paused: { light: "bg-amber-50 text-amber-700", dark: "dark:bg-amber-900/30 dark:text-amber-400" }, overdue: { light: "bg-amber-50 text-amber-700", dark: "dark:bg-amber-900/30 dark:text-amber-400" }, "at risk": { light: "bg-amber-50 text-amber-700", dark: "dark:bg-amber-900/30 dark:text-amber-400" }, cancelled: { light: "bg-red-50 text-red-700", dark: "dark:bg-red-900/30 dark:text-red-400" }, closed: { light: "bg-red-50 text-red-700", dark: "dark:bg-red-900/30 dark:text-red-400" }, declined: { light: "bg-red-50 text-red-700", dark: "dark:bg-red-900/30 dark:text-red-400" }, rejected: { light: "bg-red-50 text-red-700", dark: "dark:bg-red-900/30 dark:text-red-400" } }, x3 = { urgent: { light: "bg-red-50 text-red-700", dark: "dark:bg-red-900/30 dark:text-red-400" }, high: { light: "bg-orange-50 text-orange-700", dark: "dark:bg-orange-900/30 dark:text-orange-400" }, medium: { light: "bg-yellow-50 text-yellow-700", dark: "dark:bg-yellow-900/30 dark:text-yellow-400" }, low: { light: "bg-gray-100 text-gray-600", dark: "dark:bg-gray-800 dark:text-gray-400" } }, h2 = { light: "bg-gray-100 text-gray-600", dark: "dark:bg-gray-800 dark:text-gray-400" }, M2 = Te(() => {
          var _a;
          const L3 = k3.status.toLowerCase();
          if (k3.category === "task" && x3[L3]) {
            const _2 = x3[L3];
            return `${_2.light} ${_2.dark}`;
          }
          const D3 = (_a = v2[L3]) != null ? _a : h2;
          return `${D3.light} ${D3.dark}`;
        });
        return (L3, D3) => (Se(), bn("span", { class: Jt(["inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium rounded-full leading-none whitespace-nowrap", M2.value]) }, Do(ee(Bn)(s.status)), 3));
      } }));
      We = ["id", "aria-selected"];
      Ge = { class: "flex-1 min-w-0" };
      Xe = { class: "flex items-center gap-2" };
      Je = ["innerHTML"];
      Qe = { key: 0, class: "shrink-0 px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-black/5 dark:bg-white/10 text-[var(--dock-icon)]" };
      Ye = { key: 0, class: "text-xs text-[var(--dock-icon)] truncate block" };
      Ze = { key: 0, class: "shrink-0 text-xs text-[var(--dock-icon)] mt-0.5" };
      et = { key: 2, class: "text-xs text-[var(--dock-icon)] shrink-0" };
      tt = { name: "DockSearchResultRow" };
      te = ms(__spreadProps(__spreadValues({}, tt), { props: { result: {}, query: {}, appColor: {}, appLabel: {}, focused: { type: Boolean }, showAppBadge: { type: Boolean } }, emits: ["navigate", "activate"], setup(s) {
        const k3 = s, v2 = Te(() => He(k3.result.label, k3.query));
        return (x3, h2) => {
          var _a;
          return Se(), bn("div", { id: `search-item-${s.result.name}`, role: "option", "aria-selected": s.focused, class: Jt(["flex items-start gap-3 px-4 py-2.5 cursor-pointer transition-colors", s.focused ? "bg-[var(--dock-accent)]/10" : "hover:bg-black/5 dark:hover:bg-white/5"]), onClick: h2[0] || (h2[0] = (M2) => x3.$emit("navigate", s.result)), onMouseenter: h2[1] || (h2[1] = (M2) => x3.$emit("activate", 0)) }, [Kt("div", { class: "w-2 h-2 mt-1.5 rounded-full shrink-0", style: ls({ backgroundColor: (_a = s.appColor) != null ? _a : "var(--dock-icon)" }) }, null, 4), Kt("div", Ge, [Kt("div", Xe, [Kt("span", { class: Jt(["text-sm font-medium truncate", (s.focused, "text-[var(--dock-text)]")]), innerHTML: v2.value }, null, 10, Je), s.showAppBadge && s.appLabel ? (Se(), bn("span", Qe, Do(s.appLabel), 1)) : Qn("", true)]), s.result.description ? (Se(), bn("span", Ye, Do(s.result.description), 1)) : Qn("", true)]), s.result.meta ? (Se(), bn("span", Ze, Do(s.result.meta), 1)) : Qn("", true), s.result.status ? (Se(), nt(Pe, { key: 1, status: s.result.status, category: s.result.category, class: "shrink-0 mt-0.5" }, null, 8, ["status", "category"])) : Qn("", true), !s.result.status && !s.result.meta ? (Se(), bn("span", et, Do(s.result.section), 1)) : Qn("", true)], 42, We);
        };
      } }));
      at = { class: "flex items-center gap-2 px-4 py-2 sticky top-0 bg-[var(--dock-bg)]/95 backdrop-blur-sm border-b border-[var(--dock-border)]/50", role: "presentation" };
      lt = { class: "text-[11px] font-semibold uppercase tracking-widest text-[var(--dock-icon)]" };
      ot = { class: "ml-auto text-[10px] text-[var(--dock-icon)]/60" };
      rt = { name: "DockSearchSectionHeader" };
      ae = ms(__spreadProps(__spreadValues({}, rt), { props: { label: {}, count: {} }, setup(s) {
        return (k3, v2) => (Se(), bn("div", at, [Kt("span", lt, Do(ee(Bn)(s.label)), 1), Kt("span", ot, Do(s.count), 1)]));
      } }));
      nt2 = { class: "py-4 px-4" };
      st = { class: "flex items-center justify-center gap-2 mb-3" };
      ct = { class: "text-sm text-[var(--dock-icon)]" };
      it = { class: "space-y-2" };
      dt = { name: "DockSearchLoading" };
      $e = ms(__spreadProps(__spreadValues({}, dt), { setup(s) {
        return (k3, v2) => (Se(), bn("div", nt2, [Kt("div", st, [v2[0] || (v2[0] = Kt("div", { class: "w-4 h-4 border-2 border-[var(--dock-icon)]/30 border-t-[var(--dock-accent)] rounded-full animate-spin" }, null, -1)), Kt("span", ct, Do(ee(Bn)("Searching...")), 1)]), Kt("div", it, [(Se(), bn(me, null, cc(4, (x3) => Kt("div", { key: x3, class: "flex gap-3 items-center animate-pulse" }, [v2[1] || (v2[1] = Kt("div", { class: "w-2 h-2 rounded-full bg-black/10 dark:bg-white/10 shrink-0" }, null, -1)), Kt("div", { class: "flex-1 h-3 rounded bg-black/10 dark:bg-white/10", style: ls({ width: `${60 + x3 * 8}%` }) }, null, 4), v2[2] || (v2[2] = Kt("div", { class: "w-12 h-2.5 rounded bg-black/10 dark:bg-white/10 shrink-0" }, null, -1))])), 64))])]));
      } }));
      ut = { class: "flex flex-col items-center justify-center py-8 px-4 text-center" };
      vt = { class: "text-sm font-medium text-[var(--dock-icon)]" };
      pt = { class: "text-xs text-[var(--dock-icon)]/70 mt-1" };
      kt = { name: "DockSearchEmpty" };
      Ce = ms(__spreadProps(__spreadValues({}, kt), { props: { query: {}, scopedApp: {} }, emits: ["clearScope"], setup(s, { emit: k3 }) {
        const v2 = k3;
        return (x3, h2) => (Se(), bn("div", ut, [q(ee(r), { class: "w-8 h-8 text-[var(--dock-icon)]/40 mb-3", "aria-hidden": "true" }), Kt("p", vt, Do(ee(Bn)("No results found")), 1), Kt("p", pt, Do(ee(Bn)("Try a different search term")), 1), s.scopedApp ? (Se(), bn("button", { key: 0, class: "mt-3 text-sm text-[var(--dock-accent)] hover:underline", onClick: h2[0] || (h2[0] = (M2) => v2("clearScope")) }, Do(ee(Bn)("Search in All apps")), 1)) : Qn("", true)]));
      } }));
      bt = { class: "flex items-center gap-2 px-4 py-3 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20" };
      gt = { name: "DockSearchError" };
      Se2 = ms(__spreadProps(__spreadValues({}, gt), { emits: ["retry"], setup(s) {
        return (k3, v2) => (Se(), bn("div", bt, [q(ee(Fe), { class: "w-4 h-4 shrink-0", "aria-hidden": "true" }), Kt("span", null, Do(ee(Bn)("Search is temporarily unavailable")), 1), Kt("button", { class: "ml-auto text-amber-700 dark:text-amber-300 underline hover:no-underline", onClick: v2[0] || (v2[0] = (x3) => k3.$emit("retry")) }, Do(ee(Bn)("Try again")), 1)]));
      } }));
      xt = { key: 0, class: "py-1" };
      ht = { class: "px-4 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--dock-icon)]" };
      mt = ["onClick"];
      ft = { class: "flex-1 min-w-0" };
      yt = { class: "text-sm text-[var(--dock-text)] truncate" };
      wt2 = { class: "text-[11px] text-[var(--dock-icon)] truncate" };
      _t = ["aria-label", "onClick"];
      $t = { key: 1, class: "px-4 py-3 text-xs text-[var(--dock-icon)]" };
      Ct2 = { name: "DockSearchRecent" };
      Ae = ms(__spreadProps(__spreadValues({}, Ct2), { emits: ["navigate"], setup(s, { emit: k3 }) {
        const v2 = k3, { items: x3, removeItem: h2 } = bo(), { registeredApps: M2 } = vo(), L3 = Te(() => {
          var _a;
          const _2 = {};
          for (const q4 of (_a = M2.value) != null ? _a : [])
            q4.color && (_2[q4.app] = q4.color);
          return _2;
        });
        function D3(_2) {
          return `/${_2.app}/${_2.doctype}/${encodeURIComponent(_2.docname)}`;
        }
        return (_2, q4) => ee(x3).length ? (Se(), bn("div", xt, [Kt("div", ht, Do(ee(Bn)("Recent")), 1), (Se(true), bn(me, null, cc(ee(x3), (p3) => {
          var _a;
          return Se(), bn("div", { key: p3.name, class: "group flex items-center gap-2.5 px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer", onClick: (C2) => v2("navigate", D3(p3)) }, [Kt("span", { class: "w-2 h-2 rounded-full shrink-0", style: ls({ background: (_a = L3.value[p3.app]) != null ? _a : "var(--dock-accent)" }) }, null, 4), Kt("div", ft, [Kt("div", yt, Do(p3.label), 1), Kt("div", wt2, Do(p3.doctype), 1)]), Kt("button", { class: "opacity-0 group-hover:opacity-100 text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-opacity", "aria-label": ee(Bn)("Remove from recent"), onClick: Ve((C2) => ee(h2)(p3.name), ["stop"]) }, [q(ee(c), { class: "w-3.5 h-3.5" })], 8, _t)], 8, mt);
        }), 128))])) : (Se(), bn("div", $t, Do(ee(Bn)("No recent items yet")), 1));
      } }));
      St = ["aria-label"];
      At = { class: "flex items-center gap-2 px-4 h-14 border-b border-[var(--dock-border)]" };
      Rt = ["aria-label"];
      Mt = ["placeholder", "aria-expanded", "aria-activedescendant"];
      Tt = ["aria-label"];
      Et = { class: "flex gap-1 px-4 py-2 overflow-x-auto border-b border-[var(--dock-border)]/50 scrollbar-hide" };
      Lt = ["onClick"];
      Dt2 = ["aria-label"];
      qt = { key: 0, class: "px-4 py-3 text-xs text-[var(--dock-icon)] text-center" };
      Bt = ["aria-label"];
      Nt = { class: "flex items-center gap-2 px-4 border-b border-[var(--dock-border)]" };
      It = ["placeholder", "aria-expanded", "aria-activedescendant"];
      Ot = ["aria-label"];
      Ut = { class: "flex gap-1 px-3 pt-2 pb-1 overflow-x-auto" };
      Vt = ["onClick"];
      zt = { key: 0, class: "flex gap-1 px-3 pb-2 overflow-x-auto" };
      Ft = ["onClick"];
      jt = ["aria-label"];
      Ht = { key: 0, class: "px-4 py-3 text-xs text-[var(--dock-icon)] text-center" };
      Kt2 = { key: 1, class: "px-4 py-2 border-t border-[var(--dock-border)] text-xs text-[var(--dock-icon)] flex items-center justify-between" };
      Pt = { class: "ml-2 px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[10px]" };
      Wt = { role: "status", "aria-live": "polite", "aria-atomic": "true", class: "sr-only" };
      Gt = { name: "DockSearchModal" };
      Xt = ms(__spreadProps(__spreadValues({}, Gt), { props: { returnFocusEl: {} }, emits: ["close"], setup(s, { emit: k3 }) {
        var _a, _b, _c, _d, _e6, _f, _g;
        const v2 = s, x3 = k3, { registeredApps: h2 } = vo(), M2 = (_d = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) != null ? _c : window.dockBoot) != null ? _d : {}, L3 = (_e6 = M2 == null ? void 0 : M2.search_sections) != null ? _e6 : {}, D3 = (_g = (_f = M2 == null ? void 0 : M2.settings) == null ? void 0 : _f.enable_recent_items) != null ? _g : true, _2 = Te(() => {
          var _a2;
          const l6 = {};
          for (const a2 of (_a2 = h2.value) != null ? _a2 : [])
            a2.color && (l6[a2.app] = a2.color);
          return l6;
        }), q4 = Te(() => {
          var _a2;
          const l6 = {};
          for (const a2 of (_a2 = h2.value) != null ? _a2 : [])
            a2.label && (l6[a2.app] = a2.label);
          return l6;
        }), p3 = Oe(null), C2 = Oe(null), Te3 = window.location.pathname, ne5 = h2.value.find((l6) => l6.route && Te3.startsWith(l6.route));
        ne5 && (p3.value = ne5.app);
        const se5 = Te(() => {
          var _a2;
          return p3.value ? (_a2 = L3[p3.value]) != null ? _a2 : [] : [];
        }), J5 = Te(() => !p3.value);
        function I2(l6) {
          p3.value = l6, C2.value = null, u2.value.length >= O.value && H6();
        }
        function ce7(l6) {
          C2.value = l6, u2.value.length >= O.value && H6();
        }
        const O = Te(() => C2.value ? 1 : 2), u2 = Oe(""), f2 = Oe([]), ie6 = Oe([]), B3 = Oe(false), z3 = Oe(false), F3 = Oe(false), T2 = Oe(false), b2 = Oe(-1), Q4 = Oe(true), Y3 = Te(() => {
          const l6 = [], a2 = /* @__PURE__ */ new Map();
          for (const t6 of f2.value) {
            const c4 = `${t6.app}:${t6.section}`;
            if (!a2.has(c4)) {
              const G3 = { label: t6.section, app: t6.app, items: [] };
              a2.set(c4, G3), l6.push(G3);
            }
            a2.get(c4).items.push(t6);
          }
          return l6;
        }), m4 = Te(() => f2.value), j3 = Te(() => f2.value.length);
        let Z4 = null, U3 = null;
        Ln(u2, (l6) => {
          if (F3.value = false, b2.value = -1, Z4 && clearTimeout(Z4), U3 && (clearTimeout(U3), z3.value = false), l6.length < O.value) {
            f2.value = [], ie6.value = [], B3.value = false, T2.value = false;
            return;
          }
          B3.value = true, U3 = setTimeout(() => {
            z3.value = true;
          }, 150), Z4 = setTimeout(H6, 300);
        });
        async function H6() {
          if (!(u2.value.length < O.value)) {
            B3.value = true, F3.value = false;
            try {
              const l6 = await wt("dock.api.search.global_search", __spreadValues(__spreadValues({ query: u2.value, per_section: 5 }, p3.value ? { app: p3.value } : {}), C2.value ? { section: C2.value } : {}));
              ie6.value = f2.value, f2.value = l6, T2.value = true;
            } catch (e) {
              F3.value = true;
            } finally {
              B3.value = false, z3.value = false, U3 && (clearTimeout(U3), U3 = null);
            }
          }
        }
        function X4(l6) {
          window.location.href = l6.route, K4();
        }
        function de6(l6) {
          window.location.href = l6, K4();
        }
        function K4() {
          x3("close"), ui(() => {
            var _a2;
            return (_a2 = v2.returnFocusEl) == null ? void 0 : _a2.focus();
          });
        }
        const P3 = Oe(null), W4 = Oe(null), Ee4 = 'input, button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';
        function Le5() {
          return P3.value ? Array.from(P3.value.querySelectorAll(Ee4)).filter((l6) => l6.offsetParent !== null) : [];
        }
        function ue5() {
          var _a2;
          const l6 = m4.value[b2.value];
          if (!l6)
            return;
          (_a2 = document.getElementById(`search-item-${l6.name}`)) == null ? void 0 : _a2.scrollIntoView({ block: "nearest" });
        }
        function ve4(l6) {
          var _a2, _b2;
          if (Q4.value = false, l6.key === "Escape") {
            u2.value ? (u2.value = "", f2.value = [], T2.value = false) : K4();
            return;
          }
          if (l6.key === "Tab") {
            const a2 = Le5();
            if (!a2.length)
              return;
            const t6 = a2[0], c4 = a2[a2.length - 1];
            l6.shiftKey ? document.activeElement === t6 && (l6.preventDefault(), c4.focus()) : document.activeElement === c4 && (l6.preventDefault(), t6.focus());
            return;
          }
          if (l6.key === "ArrowLeft" || l6.key === "ArrowRight") {
            const a2 = Array.from((_b2 = (_a2 = P3.value) == null ? void 0 : _a2.querySelectorAll("[data-scope-tab]")) != null ? _b2 : []), t6 = a2.indexOf(document.activeElement);
            if (t6 >= 0) {
              l6.preventDefault();
              const c4 = l6.key === "ArrowRight" ? (t6 + 1) % a2.length : (t6 - 1 + a2.length) % a2.length;
              a2[c4].focus();
            }
            return;
          }
          if (l6.key === "ArrowDown") {
            if (l6.preventDefault(), m4.value.length === 0)
              return;
            b2.value = (b2.value + 1) % m4.value.length, ue5();
          } else if (l6.key === "ArrowUp") {
            if (l6.preventDefault(), m4.value.length === 0)
              return;
            b2.value = b2.value <= 0 ? m4.value.length - 1 : b2.value - 1, ue5();
          } else
            l6.key === "Enter" && b2.value >= 0 && m4.value[b2.value] && (l6.ctrlKey || l6.metaKey ? window.open(m4.value[b2.value].route, "_blank") : X4(m4.value[b2.value]));
        }
        function pe5() {
          Q4.value = true;
        }
        function ee5(l6) {
          Q4.value && (b2.value = l6);
        }
        function De4(l6) {
          l6.target.id === "dock-search-backdrop" && K4();
        }
        Dt(() => {
          document.addEventListener("keydown", ve4), document.addEventListener("mousemove", pe5), ui(() => {
            var _a2;
            return (_a2 = W4.value) == null ? void 0 : _a2.focus();
          });
        }), _n(() => {
          document.removeEventListener("keydown", ve4), document.removeEventListener("mousemove", pe5);
        });
        const ke5 = Oe(window.innerWidth < 768);
        function be4() {
          ke5.value = window.innerWidth < 768;
        }
        Dt(() => window.addEventListener("resize", be4)), _n(() => window.removeEventListener("resize", be4));
        const qe3 = navigator.platform.toUpperCase().includes("MAC");
        return (l6, a2) => (Se(), nt(rc, { to: "body" }, [ke5.value ? (Se(), nt(xe, { key: 0, name: "slide-up" }, { default: pi(() => {
          var _a2;
          return [Kt("div", { ref_key: "modalRef", ref: P3, class: "fixed inset-0 z-[60] flex flex-col bg-[var(--dock-bg)]", role: "dialog", "aria-modal": "true", "aria-label": ee(Bn)("Search"), onMousedown: a2[4] || (a2[4] = Ve(() => {
          }, ["stop"])) }, [Kt("div", At, [Kt("button", { class: "p-1 -ml-1 text-[var(--dock-icon)]", "aria-label": ee(Bn)("Close search"), onClick: K4 }, [q(ee(t), { class: "w-5 h-5" })], 8, Rt), sc(Kt("input", { ref_key: "inputRef", ref: W4, "onUpdate:modelValue": a2[0] || (a2[0] = (t6) => u2.value = t6), type: "text", class: "flex-1 text-base bg-transparent outline-none text-[var(--dock-text)] placeholder:text-[var(--dock-icon)]", placeholder: ee(Bn)("Search..."), role: "combobox", "aria-autocomplete": "list", "aria-expanded": T2.value && j3.value > 0, "aria-controls": "dock-search-results", "aria-activedescendant": b2.value >= 0 ? `search-item-${(_a2 = m4.value[b2.value]) == null ? void 0 : _a2.name}` : void 0, autofocus: "" }, null, 8, Mt), [[Ct, u2.value]]), u2.value ? (Se(), bn("button", { key: 0, class: "p-1 text-[var(--dock-icon)]", "aria-label": ee(Bn)("Clear"), onClick: a2[1] || (a2[1] = (t6) => {
            var _a3;
            u2.value = "", (_a3 = W4.value) == null ? void 0 : _a3.focus();
          }) }, [q(ee(c), { class: "w-4 h-4" })], 8, Tt)) : Qn("", true)]), Kt("div", Et, [Kt("button", { "data-scope-tab": "", class: Jt(["px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors shrink-0", p3.value ? "bg-black/5 dark:bg-white/10 text-[var(--dock-icon)]" : "bg-[var(--dock-accent)] text-white"]), onClick: a2[2] || (a2[2] = (t6) => I2(null)) }, Do(ee(Bn)("All")), 3), (Se(true), bn(me, null, cc(ee(h2), (t6) => (Se(), bn("button", { key: t6.app, "data-scope-tab": "", class: Jt(["px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors shrink-0", p3.value === t6.app ? "bg-[var(--dock-accent)] text-white" : "bg-black/5 dark:bg-white/10 text-[var(--dock-icon)]"]), onClick: (c4) => I2(t6.app) }, Do(t6.label), 11, Lt))), 128))]), Kt("div", { id: "dock-search-results", class: "flex-1 overflow-y-auto overscroll-contain", role: "listbox", "aria-label": ee(Bn)("Search results") }, [z3.value && !f2.value.length ? (Se(), nt($e, { key: 0 })) : F3.value ? (Se(), nt(Se2, { key: 1, onRetry: H6 })) : u2.value.length >= O.value ? (Se(), bn(me, { key: 2 }, [u2.value.length === 1 && !C2.value ? (Se(), bn("div", qt, Do(ee(Bn)("Type at least 2 characters to search")), 1)) : T2.value && !f2.value.length && !B3.value ? (Se(), nt(Ce, { key: 1, query: u2.value, "scoped-app": p3.value, onClearScope: a2[3] || (a2[3] = (t6) => I2(null)) }, null, 8, ["query", "scoped-app"])) : f2.value.length ? (Se(true), bn(me, { key: 2 }, cc(Y3.value, (t6) => (Se(), bn(me, { key: `${t6.app}:${t6.label}` }, [q(ae, { label: t6.label, count: t6.items.length }, null, 8, ["label", "count"]), (Se(true), bn(me, null, cc(t6.items, (c4) => (Se(), nt(te, { key: c4.name, result: c4, query: u2.value, "app-color": _2.value[c4.app], "app-label": q4.value[c4.app], focused: m4.value.indexOf(c4) === b2.value, "show-app-badge": J5.value, class: "min-h-[44px]", onNavigate: X4, onActivate: (G3) => ee5(m4.value.indexOf(c4)) }, null, 8, ["result", "query", "app-color", "app-label", "focused", "show-app-badge", "onActivate"]))), 128))], 64))), 128)) : Qn("", true)], 64)) : ee(D3) ? (Se(), nt(Ae, { key: 3, onNavigate: de6 })) : Qn("", true)], 8, Dt2)], 40, St)];
        }), _: 1 })) : (Se(), nt(xe, { key: 1, name: "palette" }, { default: pi(() => {
          var _a2;
          return [Kt("div", { id: "dock-search-backdrop", class: "fixed inset-0 z-[60] flex justify-center items-start pt-[15vh] px-4", onMousedown: De4 }, [a2[14] || (a2[14] = Kt("div", { class: "absolute inset-0 bg-black/50 dark:bg-black/70", "aria-hidden": "true" }, null, -1)), Kt("div", { ref_key: "modalRef", ref: P3, role: "dialog", "aria-modal": "true", "aria-label": ee(Bn)("Search"), class: "relative w-full max-w-xl rounded-xl shadow-2xl overflow-hidden bg-[var(--dock-bg)] border border-[var(--dock-border)]", onMousedown: a2[10] || (a2[10] = Ve(() => {
          }, ["stop"])) }, [Kt("div", Nt, [q(ee(r), { class: "w-5 h-5 text-[var(--dock-icon)] shrink-0", "aria-hidden": "true" }), sc(Kt("input", { ref_key: "inputRef", ref: W4, "onUpdate:modelValue": a2[5] || (a2[5] = (t6) => u2.value = t6), type: "text", class: "flex-1 h-12 px-3 text-base bg-transparent text-[var(--dock-text)] placeholder:text-[var(--dock-icon)] outline-none", placeholder: ee(Bn)("Search..."), role: "combobox", "aria-autocomplete": "list", "aria-expanded": T2.value && j3.value > 0, "aria-controls": "dock-search-results", "aria-activedescendant": b2.value >= 0 ? `search-item-${(_a2 = m4.value[b2.value]) == null ? void 0 : _a2.name}` : void 0 }, null, 8, It), [[Ct, u2.value]]), u2.value ? (Se(), bn("button", { key: 0, class: "text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors", "aria-label": ee(Bn)("Clear"), onClick: a2[6] || (a2[6] = (t6) => {
            var _a3;
            u2.value = "", (_a3 = W4.value) == null ? void 0 : _a3.focus();
          }) }, [q(ee(c), { class: "w-4 h-4" })], 8, Ot)) : Qn("", true), a2[11] || (a2[11] = Kt("kbd", { class: "px-1.5 py-0.5 text-[10px] font-medium rounded bg-black/5 dark:bg-white/10 text-[var(--dock-icon)] border border-[var(--dock-border)]" }, " ESC ", -1))]), Kt("div", Ut, [Kt("button", { "data-scope-tab": "", class: Jt(["px-2.5 py-1 rounded-full text-xs font-medium transition-colors shrink-0", p3.value ? "text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10" : "bg-[var(--dock-accent)] text-white"]), onClick: a2[7] || (a2[7] = (t6) => I2(null)) }, Do(ee(Bn)("All")), 3), (Se(true), bn(me, null, cc(ee(h2), (t6) => (Se(), bn("button", { key: t6.app, "data-scope-tab": "", class: Jt(["px-2.5 py-1 rounded-full text-xs font-medium transition-colors shrink-0", p3.value === t6.app ? "bg-[var(--dock-accent)] text-white" : "text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10"]), onClick: (c4) => I2(t6.app) }, Do(t6.label), 11, Vt))), 128))]), se5.value.length > 1 ? (Se(), bn("div", zt, [Kt("button", { "data-scope-tab": "", class: Jt(["px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors shrink-0", C2.value ? "text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10" : "bg-[var(--dock-accent)]/15 text-[var(--dock-accent)]"]), onClick: a2[8] || (a2[8] = (t6) => ce7(null)) }, Do(ee(Bn)("All")), 3), (Se(true), bn(me, null, cc(se5.value, (t6) => (Se(), bn("button", { key: t6.label, "data-scope-tab": "", class: Jt(["px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors shrink-0", C2.value === t6.label ? "bg-[var(--dock-accent)]/15 text-[var(--dock-accent)]" : "text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10"]), onClick: (c4) => ce7(t6.label) }, Do(t6.label), 11, Ft))), 128))])) : Qn("", true), Kt("div", { id: "dock-search-results", role: "listbox", "aria-label": ee(Bn)("Search results"), class: "max-h-[60vh] overflow-y-auto overscroll-contain" }, [B3.value && f2.value.length ? (Se(true), bn(me, { key: 0 }, cc(Y3.value, (t6) => (Se(), bn(me, { key: `${t6.app}:${t6.label}` }, [q(ae, { label: t6.label, count: t6.items.length }, null, 8, ["label", "count"]), (Se(true), bn(me, null, cc(t6.items, (c4) => (Se(), nt(te, { key: c4.name, result: c4, query: u2.value, "app-color": _2.value[c4.app], "app-label": q4.value[c4.app], focused: m4.value.indexOf(c4) === b2.value, "show-app-badge": J5.value, onNavigate: X4, onActivate: (G3) => ee5(m4.value.indexOf(c4)) }, null, 8, ["result", "query", "app-color", "app-label", "focused", "show-app-badge", "onActivate"]))), 128))], 64))), 128)) : z3.value && !f2.value.length ? (Se(), nt($e, { key: 1 })) : F3.value ? (Se(), nt(Se2, { key: 2, onRetry: H6 })) : u2.value.length >= O.value ? (Se(), bn(me, { key: 3 }, [u2.value.length === 1 && !C2.value ? (Se(), bn("div", Ht, Do(ee(Bn)("Type at least 2 characters to search")), 1)) : T2.value && !f2.value.length && !B3.value ? (Se(), nt(Ce, { key: 1, query: u2.value, "scoped-app": p3.value, onClearScope: a2[9] || (a2[9] = (t6) => I2(null)) }, null, 8, ["query", "scoped-app"])) : f2.value.length ? (Se(true), bn(me, { key: 2 }, cc(Y3.value, (t6) => (Se(), bn(me, { key: `${t6.app}:${t6.label}` }, [q(ae, { label: t6.label, count: t6.items.length }, null, 8, ["label", "count"]), (Se(true), bn(me, null, cc(t6.items, (c4) => (Se(), nt(te, { key: c4.name, result: c4, query: u2.value, "app-color": _2.value[c4.app], "app-label": q4.value[c4.app], focused: m4.value.indexOf(c4) === b2.value, "show-app-badge": J5.value, onNavigate: X4, onActivate: (G3) => ee5(m4.value.indexOf(c4)) }, null, 8, ["result", "query", "app-color", "app-label", "focused", "show-app-badge", "onActivate"]))), 128))], 64))), 128)) : Qn("", true)], 64)) : ee(D3) ? (Se(), nt(Ae, { key: 4, onNavigate: de6 })) : Qn("", true)], 8, jt), f2.value.length ? (Se(), bn("div", Kt2, [Kt("span", null, [a2[12] || (a2[12] = Kt("kbd", { class: "px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[10px]" }, "\u2191\u2193", -1)), ll(" " + Do(ee(Bn)("navigate")) + " ", 1), a2[13] || (a2[13] = Kt("kbd", { class: "ml-2 px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[10px]" }, "\u21B5", -1)), ll(" " + Do(ee(Bn)("open")) + " ", 1), Kt("kbd", Pt, Do(ee(qe3) ? "\u2318" : "Ctrl") + "+\u21B5", 1), ll(" " + Do(ee(Bn)("new tab")), 1)])])) : Qn("", true), Kt("div", Wt, [B3.value ? (Se(), bn(me, { key: 0 }, [ll(Do(ee(Bn)("Searching...")), 1)], 64)) : T2.value && j3.value > 0 ? (Se(), bn(me, { key: 1 }, [ll(Do(ee(Bn)("{0} results found").replace("{0}", String(j3.value))), 1)], 64)) : T2.value && j3.value === 0 ? (Se(), bn(me, { key: 2 }, [ll(Do(ee(Bn)("No results found")), 1)], 64)) : Qn("", true)])], 40, Bt)], 32)];
        }), _: 1 }))]));
      } }));
      ta = wl(Xt, [["__scopeId", "data-v-dff646bd"]]);
    }
  });

  // ../dock/dock/public/js/chunks/DockSearch-BlWtw5wa.js
  var DockSearch_BlWtw5wa_exports = {};
  __export(DockSearch_BlWtw5wa_exports, {
    default: () => V
  });
  var __vite__mapDeps, K, S, D, E, M, V;
  var init_DockSearch_BlWtw5wa = __esm({
    "../dock/dock/public/js/chunks/DockSearch-BlWtw5wa.js"() {
      init_dock_navbar_esm();
      init_search_Bi1C6pxc();
      __vite__mapDeps = (i2, m4 = __vite__mapDeps, d2 = m4.f || (m4.f = ["assets/DockSearchModal.css"])) => i2.map((i3) => d2[i3]);
      K = ["aria-label", "title"];
      S = { class: "flex-1 text-sm text-left" };
      D = { class: "hidden lg:inline text-[10px] font-sans bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded shrink-0" };
      E = ["aria-label"];
      M = { name: "DockSearch" };
      V = ms(__spreadProps(__spreadValues({}, M), { setup(B3) {
        const k3 = Ae2(() => Ce2(() => Promise.resolve().then(() => (init_DockSearchModal_DcZB4FhM(), DockSearchModal_DcZB4FhM_exports)), __vite__mapDeps([0]))), n2 = Oe(null), r4 = Oe(false), c4 = navigator.platform.toUpperCase().includes("MAC");
        function s() {
          r4.value = true;
        }
        function _2() {
          var _a;
          r4.value = false, (_a = n2.value) == null ? void 0 : _a.focus();
        }
        function l6(t6) {
          (t6.metaKey || t6.ctrlKey) && t6.key === "k" && (t6.preventDefault(), s());
        }
        return Dt(() => document.addEventListener("keydown", l6)), _n(() => document.removeEventListener("keydown", l6)), (t6, L3) => (Se(), bn(me, null, [Kt("button", { ref_key: "pillRef", ref: n2, class: "dock-search hidden md:flex items-center gap-2 h-8 px-3 min-w-44 rounded-lg border border-[var(--dock-border)] bg-black/[0.02] dark:bg-white/[0.02] text-[var(--dock-icon)] hover:border-[var(--dock-accent)]/40 hover:bg-[var(--dock-accent)]/5 transition-all cursor-text", "aria-label": ee(Bn)("Open search"), title: `${ee(Bn)("Search")} (${ee(c4) ? "\u2318K" : "Ctrl+K"})`, onClick: s }, [q(ee(r), { class: "w-3.5 h-3.5 shrink-0" }), Kt("span", S, Do(ee(Bn)("Search...")), 1), Kt("kbd", D, Do(ee(c4) ? "\u2318K" : "Ctrl+K"), 1)], 8, K), Kt("button", { class: "dock-search md:hidden flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", "aria-label": ee(Bn)("Search"), onClick: s }, [q(ee(r), { class: "w-4 h-4" })], 8, E), r4.value ? (Se(), nt(ee(k3), { key: 0, "return-focus-el": n2.value, onClose: _2 }, null, 8, ["return-focus-el"])) : Qn("", true)], 64));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/useDropdownExclusion-CGCUs3Uj.js
  function r2(u2, f2) {
    const e = Oe(false);
    function n2(a2) {
      var _a;
      a2 ? (l2.value = u2, e.value = true) : e.value && (e.value = false, l2.value === u2 && (l2.value = null), (_a = f2.value) == null ? void 0 : _a.focus());
    }
    function s() {
      n2(!e.value);
    }
    function t6() {
      n2(false);
    }
    return Ln(l2, (a2) => {
      a2 !== u2 && e.value && (e.value = false);
    }), { open: e, toggle: s, close: t6 };
  }
  var l2;
  var init_useDropdownExclusion_CGCUs3Uj = __esm({
    "../dock/dock/public/js/chunks/useDropdownExclusion-CGCUs3Uj.js"() {
      init_dock_navbar_esm();
      l2 = Oe(null);
    }
  });

  // ../dock/dock/public/js/chunks/clock-CzVKVsBv.js
  var o;
  var init_clock_CzVKVsBv = __esm({
    "../dock/dock/public/js/chunks/clock-CzVKVsBv.js"() {
      init_dock_navbar_esm();
      o = _o("clock", [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }]]);
    }
  });

  // ../dock/dock/public/js/chunks/DockTimer-tucfUicX.js
  var DockTimer_tucfUicX_exports = {};
  __export(DockTimer_tucfUicX_exports, {
    default: () => qe
  });
  var ie, de, ce, ue, ve, me2, pe, ke, z, fe, xe2, ge, ye, be, _e2, he, we, $e3, Ce3, Te2, Se3, Ee, De, Be, Ne, Ve2, Ie, Le, Re, Me, Ae3, Fe2, Ke2, Ue, ze, Oe2, Pe2, Xe2, qe;
  var init_DockTimer_tucfUicX = __esm({
    "../dock/dock/public/js/chunks/DockTimer-tucfUicX.js"() {
      init_dock_navbar_esm();
      init_useDropdownExclusion_CGCUs3Uj();
      init_runtime_dom_esm_bundler_DJPzte74();
      init_x_Dj5OacS7();
      init_clock_CzVKVsBv();
      ie = { class: "p-3 space-y-3" };
      de = { class: "text-xs font-medium text-[var(--dock-text)]" };
      ce = { key: 0, class: "flex items-center gap-1.5 bg-black/5 dark:bg-white/10 rounded-md px-2 py-1 text-xs text-[var(--dock-text)]" };
      ue = { class: "truncate" };
      ve = ["placeholder"];
      me2 = { class: "flex gap-2" };
      pe = ["disabled"];
      ke = { name: "DockTimerStartForm" };
      z = ms(__spreadProps(__spreadValues({}, ke), { props: { pending: {}, loading: { type: Boolean } }, emits: ["start", "cancel"], setup(o2, { emit: f2 }) {
        var _a;
        const c4 = o2, v2 = f2, t6 = Oe((_a = c4.pending) != null ? _a : null), l6 = Oe("");
        function x3() {
          t6.value ? v2("start", t6.value) : v2("start", l6.value.trim() ? { app: "", doctype: "", name: "", label: l6.value.trim() } : null);
        }
        return (B3, g3) => (Se(), bn("div", ie, [Kt("p", de, Do(ee(Bn)("Start Timer")), 1), t6.value ? (Se(), bn("div", ce, [Kt("span", ue, Do(t6.value.label) + " \xB7 " + Do(t6.value.doctype), 1), Kt("button", { class: "shrink-0 text-[var(--dock-icon)] hover:text-[var(--dock-text)]", onClick: g3[0] || (g3[0] = (_2) => t6.value = null) }, [q(ee(c), { class: "w-3 h-3" })])])) : sc((Se(), bn("input", { key: 1, "onUpdate:modelValue": g3[1] || (g3[1] = (_2) => l6.value = _2), type: "text", class: "w-full text-sm rounded border border-[var(--dock-border)] bg-[var(--dock-bg)] text-[var(--dock-text)] px-2 py-1.5 placeholder-[var(--dock-icon)] focus:outline-none focus:ring-1 focus:ring-[var(--dock-accent)]", placeholder: ee(Bn)("What are you working on?"), onKeydown: $e2(x3, ["enter"]) }, null, 40, ve)), [[Ct, l6.value]]), Kt("div", me2, [Kt("button", { class: "flex-1 px-3 py-1.5 rounded-md bg-[var(--dock-accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50", disabled: o2.loading, onClick: x3 }, "\u25B6 " + Do(ee(Bn)("Start")), 9, pe), Kt("button", { class: "px-3 py-1.5 rounded-md text-sm text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10", onClick: g3[2] || (g3[2] = (_2) => v2("cancel")) }, Do(ee(Bn)("Cancel")), 1)])]));
      } }));
      fe = { class: "p-3 space-y-2" };
      xe2 = { class: "flex items-center gap-2" };
      ge = { key: 0, class: "text-xs text-[var(--dock-icon)]" };
      ye = { key: 0, class: "text-xs text-[var(--dock-text)] truncate" };
      be = { key: 0, class: "text-[var(--dock-icon)]" };
      _e2 = { class: "flex items-center gap-2 pt-1" };
      he = ["disabled"];
      we = ["disabled"];
      $e3 = ["disabled"];
      Ce3 = { name: "DockTimerActiveView" };
      Te2 = ms(__spreadProps(__spreadValues({}, Ce3), { props: { state: {}, display: {}, loading: { type: Boolean } }, emits: ["pause", "resume", "stop", "edit"], setup(o2, { emit: f2 }) {
        const c4 = f2;
        return (v2, t6) => (Se(), bn("div", fe, [Kt("div", xe2, [Kt("span", { class: Jt(["w-2 h-2 rounded-full shrink-0", o2.state.state === "running" ? "bg-green-500 animate-pulse" : "bg-amber-500"]) }, null, 2), Kt("span", { "aria-live": "polite", class: Jt(["text-sm font-mono font-semibold", o2.state.state === "running" ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"]) }, Do(o2.display), 3), o2.state.state === "paused" ? (Se(), bn("span", ge, "(" + Do(ee(Bn)("paused")) + ")", 1)) : Qn("", true)]), o2.state.context_label ? (Se(), bn("div", ye, [ll(Do(o2.state.context_label) + " ", 1), o2.state.context_doctype ? (Se(), bn("span", be, " \xB7 " + Do(o2.state.context_doctype), 1)) : Qn("", true)])) : Qn("", true), Kt("div", _e2, [o2.state.state === "running" ? (Se(), bn("button", { key: 0, class: "flex-1 px-3 py-1.5 rounded-md bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition-colors disabled:opacity-50", disabled: o2.loading, onClick: t6[0] || (t6[0] = (l6) => c4("pause")) }, "\u23F8 " + Do(ee(Bn)("Pause")), 9, he)) : (Se(), bn("button", { key: 1, class: "flex-1 px-3 py-1.5 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50", disabled: o2.loading, onClick: t6[1] || (t6[1] = (l6) => c4("resume")) }, "\u25B6 " + Do(ee(Bn)("Resume")), 9, we)), Kt("button", { class: "px-3 py-1.5 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50", disabled: o2.loading, onClick: t6[2] || (t6[2] = (l6) => c4("stop")) }, "\u23F9 " + Do(ee(Bn)("Stop")), 9, $e3), Kt("button", { class: "px-2 py-1.5 rounded-md text-xs text-[var(--dock-icon)] hover:text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10", onClick: t6[3] || (t6[3] = (l6) => c4("edit")) }, "\u270E")])]));
      } }));
      Se3 = { key: 0, class: "p-3 space-y-2" };
      Ee = { class: "text-sm text-green-600 dark:text-green-400 font-medium" };
      De = ["href"];
      Be = { key: 1, class: "p-3 space-y-3" };
      Ne = ["placeholder"];
      Ve2 = { class: "flex gap-2" };
      Ie = ["disabled"];
      Le = { name: "DockTimerStopForm" };
      Re = ms(__spreadProps(__spreadValues({}, Le), { props: { loading: { type: Boolean }, entryName: {} }, emits: ["stop", "cancel"], setup(o2, { emit: f2 }) {
        const c4 = f2, v2 = Oe("");
        return (t6, l6) => o2.entryName !== void 0 ? (Se(), bn("div", Se3, [Kt("p", Ee, "\u2713 " + Do(ee(Bn)("Time entry saved")), 1), o2.entryName ? (Se(), bn("a", { key: 0, href: `/app/ft-time-entry/${o2.entryName}`, class: "text-xs text-[var(--dock-accent)] hover:underline" }, Do(ee(Bn)("View time entry")) + " \u2192", 9, De)) : Qn("", true)])) : (Se(), bn("div", Be, [sc(Kt("textarea", { "onUpdate:modelValue": l6[0] || (l6[0] = (x3) => v2.value = x3), class: "w-full text-sm rounded border border-[var(--dock-border)] bg-[var(--dock-bg)] text-[var(--dock-text)] px-2 py-1.5 resize-none h-16 placeholder-[var(--dock-icon)] focus:outline-none focus:ring-1 focus:ring-[var(--dock-accent)]", placeholder: ee(Bn)("Add notes...") }, null, 8, Ne), [[Ct, v2.value]]), Kt("div", Ve2, [Kt("button", { class: "flex-1 px-3 py-1.5 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50", disabled: o2.loading, onClick: l6[1] || (l6[1] = (x3) => c4("stop", v2.value)) }, "\u23F9 " + Do(ee(Bn)("Stop & Save")), 9, Ie), Kt("button", { class: "px-3 py-1.5 rounded-md text-sm text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10", onClick: l6[2] || (l6[2] = (x3) => c4("cancel")) }, Do(ee(Bn)("Cancel")), 1)])]));
      } }));
      Me = { class: "p-3 text-sm text-[var(--dock-icon)] text-center" };
      Ae3 = { name: "DockTimerError" };
      Fe2 = ms(__spreadProps(__spreadValues({}, Ae3), { emits: ["retry"], setup(o2) {
        return (f2, c4) => (Se(), bn("div", Me, [ll(Do(ee(Bn)("Timer unavailable")) + " ", 1), Kt("button", { class: "underline ml-1 hover:text-[var(--dock-text)]", onClick: c4[0] || (c4[0] = (v2) => f2.$emit("retry")) }, Do(ee(Bn)("Try again")), 1)]));
      } }));
      Ke2 = { key: 0, id: "dock-timer-root", class: "dock-timer relative" };
      Ue = ["aria-label"];
      ze = { key: 0, class: "w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" };
      Oe2 = { key: 2, "aria-live": "polite" };
      Pe2 = { key: 0, role: "dialog", "aria-label": "Timer", class: "absolute right-0 top-full mt-2 w-64 bg-[var(--dock-bg)] border border-[var(--dock-border)] rounded-lg shadow-lg z-20 overflow-hidden" };
      Xe2 = { name: "DockTimer" };
      qe = ms(__spreadProps(__spreadValues({}, Xe2), { setup(o2) {
        var _a, _b, _c, _d, _e6, _f;
        const { settings: f2 } = vo(), c4 = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) != null ? _c : window.dockBoot, v2 = (c4 == null ? void 0 : c4.frappe_time_installed) === true && ((_d = f2.value) == null ? void 0 : _d.enable_global_timer) === true, t6 = Oe((_e6 = c4 == null ? void 0 : c4.timer_state) != null ? _e6 : { state: "stopped" }), l6 = Oe(null), x3 = Oe(null), { open: B3, toggle: g3, close: _2 } = r2("timer", x3), p3 = Oe("start"), m4 = Oe(false), h2 = Oe(false), L3 = Oe(void 0), S5 = Oe((_f = t6.value.elapsed_seconds) != null ? _f : 0);
        let E2 = null;
        function j3() {
          if (N2(), t6.value.state !== "running")
            return;
          const e = t6.value.started_at ? new Date(t6.value.started_at).getTime() : 0;
          E2 = setInterval(() => {
            S5.value = e ? Math.floor((Date.now() - e) / 1e3) : S5.value + 1;
          }, 1e3);
        }
        function N2() {
          E2 && (clearInterval(E2), E2 = null);
        }
        function w3(e) {
          var _a2;
          t6.value = e, S5.value = (_a2 = e.elapsed_seconds) != null ? _a2 : 0, N2(), e.state === "running" && j3(), (e.state === "stopped" || e.state === "running" || e.state === "paused") && (p3.value = e.state === "stopped" ? "start" : "active");
        }
        const D3 = Te(() => {
          const e = S5.value, a2 = Math.floor(e / 3600), y = Math.floor(e % 3600 / 60), Q4 = e % 60;
          return [a2, y, Q4].map((Y3) => String(Y3).padStart(2, "0")).join(":");
        });
        function R3(e) {
          w3(e);
        }
        let V4 = null;
        async function G3() {
          try {
            const e = await wt("dock.api.timer.get_state");
            w3(e);
          } catch (e) {
          }
        }
        function M2(e) {
          var _a2;
          l6.value = (_a2 = e.detail) != null ? _a2 : null;
        }
        Dt(() => {
          var _a2;
          if (!v2)
            return;
          w3(t6.value);
          const e = (_a2 = window.frappe) == null ? void 0 : _a2.realtime;
          (e == null ? void 0 : e.on) && e.on("dock_timer_update", R3), V4 = setInterval(G3, 3e4), window.addEventListener("dock:setTimerContext", M2), document.addEventListener("mousedown", A3), document.addEventListener("keydown", F3);
        }), _n(() => {
          var _a2;
          if (!v2)
            return;
          N2(), V4 && clearInterval(V4);
          const e = (_a2 = window.frappe) == null ? void 0 : _a2.realtime;
          (e == null ? void 0 : e.off) && e.off("dock_timer_update", R3), window.removeEventListener("dock:setTimerContext", M2), document.removeEventListener("mousedown", A3), document.removeEventListener("keydown", F3);
        });
        function A3(e) {
          const a2 = document.getElementById("dock-timer-root");
          a2 && !a2.contains(e.target) && _2();
        }
        function F3(e) {
          e.key === "Escape" && B3.value && _2();
        }
        async function K4(e) {
          m4.value = true, h2.value = false;
          try {
            const a2 = await wt("dock.api.timer.start", e ? { context_app: e.app, context_doctype: e.doctype, context_name: e.name, context_label: e.label } : {});
            w3(a2);
          } catch (e2) {
            h2.value = true;
          } finally {
            m4.value = false;
          }
        }
        async function H6() {
          m4.value = true;
          try {
            w3(await wt("dock.api.timer.pause"));
          } catch (e) {
            h2.value = true;
          } finally {
            m4.value = false;
          }
        }
        async function J5(e) {
          var _a2;
          m4.value = true;
          try {
            const a2 = await wt("dock.api.timer.stop", e ? { notes: e } : {});
            L3.value = (_a2 = a2.entry_name) != null ? _a2 : null, w3(a2), p3.value = "stop";
          } catch (e2) {
            h2.value = true;
          } finally {
            m4.value = false;
          }
        }
        async function W4(e) {
          if (e) {
            m4.value = true;
            try {
              const a2 = await wt("dock.api.timer.update_context", { context_app: e.app, context_doctype: e.doctype, context_name: e.name, context_label: e.label });
              w3(a2), p3.value = "active";
            } catch (e2) {
              h2.value = true;
            } finally {
              m4.value = false;
            }
          }
        }
        const q4 = Te(() => t6.value.state === "running" ? `Timer running, ${D3.value}. Click to manage.` : t6.value.state === "paused" ? `Timer paused, ${D3.value}. Click to manage.` : "Start timer");
        return (e, a2) => ee(v2) ? (Se(), bn("div", Ke2, [Kt("button", { ref_key: "timerTriggerRef", ref: x3, class: Jt(["flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-colors text-sm font-mono hover:bg-black/5 dark:hover:bg-white/10", { "text-green-600 dark:text-green-400": t6.value.state === "running", "text-amber-600 dark:text-amber-400": t6.value.state === "paused", "text-[var(--dock-icon)]": t6.value.state === "stopped" }]), "aria-label": q4.value, onClick: a2[0] || (a2[0] = (...y) => ee(g3) && ee(g3)(...y)) }, [t6.value.state === "running" ? (Se(), bn("span", ze)) : (Se(), nt(ee(o), { key: 1, class: "w-3.5 h-3.5" })), t6.value.state !== "stopped" ? (Se(), bn("span", Oe2, Do(D3.value), 1)) : Qn("", true)], 10, Ue), ee(B3) ? (Se(), bn("div", Pe2, [h2.value ? (Se(), nt(Fe2, { key: 0, onRetry: a2[1] || (a2[1] = (y) => h2.value = false) })) : (Se(), bn(me, { key: 1 }, [p3.value === "start" ? (Se(), nt(z, { key: 0, pending: l6.value, loading: m4.value, onStart: K4, onCancel: ee(_2) }, null, 8, ["pending", "loading", "onCancel"])) : p3.value === "active" && (t6.value.state === "running" || t6.value.state === "paused") ? (Se(), nt(Te2, { key: 1, state: t6.value, display: D3.value, loading: m4.value, onPause: H6, onResume: a2[2] || (a2[2] = (y) => K4(null)), onStop: a2[3] || (a2[3] = (y) => p3.value = "stop"), onEdit: a2[4] || (a2[4] = (y) => p3.value = "edit") }, null, 8, ["state", "display", "loading"])) : p3.value === "edit" ? (Se(), nt(z, { key: 2, pending: l6.value, loading: m4.value, onStart: W4, onCancel: a2[5] || (a2[5] = (y) => p3.value = "active") }, null, 8, ["pending", "loading"])) : p3.value === "stop" ? (Se(), nt(Re, { key: 3, loading: m4.value, "entry-name": L3.value, onStop: J5, onCancel: a2[6] || (a2[6] = (y) => p3.value = "active") }, null, 8, ["loading", "entry-name"])) : Qn("", true)], 64))])) : Qn("", true)])) : Qn("", true);
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/DockTimerStaleWarning-Bo8qkZM6.js
  var DockTimerStaleWarning_Bo8qkZM6_exports = {};
  __export(DockTimerStaleWarning_Bo8qkZM6_exports, {
    default: () => H
  });
  var w, D2, x, H;
  var init_DockTimerStaleWarning_Bo8qkZM6 = __esm({
    "../dock/dock/public/js/chunks/DockTimerStaleWarning-Bo8qkZM6.js"() {
      init_dock_navbar_esm();
      w = { key: 0, class: "w-full flex items-center justify-between gap-4 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-700 text-sm text-amber-800 dark:text-amber-300" };
      D2 = { class: "flex items-center gap-3 shrink-0" };
      x = { name: "DockTimerStaleWarning" };
      H = ms(__spreadProps(__spreadValues({}, x), { setup(E2) {
        var _a, _b, _c, _d;
        const e = (_d = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) != null ? _c : window.dockBoot) == null ? void 0 : _d.timer_state, i2 = Oe(false), a2 = Oe(false);
        function l6() {
          var _a2;
          if (!e)
            return 0;
          const t6 = (_a2 = e.elapsed_seconds) != null ? _a2 : 0;
          return e.state === "running" && e.started_at ? t6 + Math.floor((Date.now() - new Date(e.started_at).getTime()) / 1e3) : t6;
        }
        Dt(() => {
          (e == null ? void 0 : e.state) === "running" && l6() > 14400 && (a2.value = true);
        });
        const m4 = Te(() => {
          const t6 = l6(), o2 = Math.floor(t6 / 3600), u2 = Math.floor(t6 % 3600 / 60);
          return o2 > 0 ? `${o2}h ${u2}m` : `${u2}m`;
        });
        async function f2() {
          try {
            await wt("dock.api.timer.stop");
          } catch (e2) {
          }
          a2.value = false;
        }
        function p3() {
          i2.value = true, a2.value = false;
        }
        return (t6, o2) => a2.value && !i2.value ? (Se(), bn("div", w, [Kt("span", null, "\u26A0 " + Do(ee(Bn)("Your timer has been running for {0}").replace("{0}", m4.value)), 1), Kt("div", D2, [Kt("button", { class: "font-medium underline hover:no-underline", onClick: f2 }, Do(ee(Bn)("Stop & Save")), 1), Kt("button", { class: "hover:underline", onClick: p3 }, Do(ee(Bn)("Keep running")), 1)])])) : Qn("", true);
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/calendar-days-ht5iomBG.js
  var t2;
  var init_calendar_days_ht5iomBG = __esm({
    "../dock/dock/public/js/chunks/calendar-days-ht5iomBG.js"() {
      init_dock_navbar_esm();
      t2 = _o("calendar-days", [["path", { d: "M8 2v4", key: "1cmpym" }], ["path", { d: "M16 2v4", key: "4m81vk" }], ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }], ["path", { d: "M3 10h18", key: "8toen8" }], ["path", { d: "M8 14h.01", key: "6423bh" }], ["path", { d: "M12 14h.01", key: "1etili" }], ["path", { d: "M16 14h.01", key: "1gbofw" }], ["path", { d: "M8 18h.01", key: "lrp35t" }], ["path", { d: "M12 18h.01", key: "mhygvu" }], ["path", { d: "M16 18h.01", key: "kzsmim" }]]);
    }
  });

  // ../dock/dock/public/js/chunks/DockCalendarIcon-BKljMvxK.js
  var DockCalendarIcon_BKljMvxK_exports = {};
  __export(DockCalendarIcon_BKljMvxK_exports, {
    default: () => h
  });
  var c2, l3, h;
  var init_DockCalendarIcon_BKljMvxK = __esm({
    "../dock/dock/public/js/chunks/DockCalendarIcon-BKljMvxK.js"() {
      init_dock_navbar_esm();
      init_calendar_days_ht5iomBG();
      c2 = ["title", "aria-label"];
      l3 = { name: "DockCalendarIcon" };
      h = ms(__spreadProps(__spreadValues({}, l3), { setup(d2) {
        return (i2, _2) => (Se(), bn("a", { href: "/dock/calendar", class: "flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", title: ee(Bn)("Calendar"), "aria-label": ee(Bn)("Calendar") }, [q(ee(t2), { class: "w-4 h-4" })], 8, c2));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/users-UcYs3C0J.js
  var c3;
  var init_users_UcYs3C0J = __esm({
    "../dock/dock/public/js/chunks/users-UcYs3C0J.js"() {
      init_dock_navbar_esm();
      c3 = _o("users", [["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }], ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }], ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }], ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]]);
    }
  });

  // ../dock/dock/public/js/chunks/DockPeopleIcon-BS1osiom.js
  var DockPeopleIcon_BS1osiom_exports = {};
  __export(DockPeopleIcon_BS1osiom_exports, {
    default: () => m2
  });
  var l4, n, m2;
  var init_DockPeopleIcon_BS1osiom = __esm({
    "../dock/dock/public/js/chunks/DockPeopleIcon-BS1osiom.js"() {
      init_dock_navbar_esm();
      init_users_UcYs3C0J();
      l4 = ["title", "aria-label"];
      n = { name: "DockPeopleIcon" };
      m2 = ms(__spreadProps(__spreadValues({}, n), { setup(i2) {
        return (_2, p3) => (Se(), bn("a", { href: "/dock/people", class: "flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", title: ee(Bn)("People"), "aria-label": ee(Bn)("People") }, [q(ee(c3), { class: "w-4 h-4" })], 8, l4));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/useRelativeTime-DgKW5Wq7.js
  function a(o2) {
    const e = new Date(o2), i2 = new Date().getTime() - e.getTime(), t6 = Math.floor(i2 / 6e4);
    if (t6 < 60)
      return `${Math.max(t6, 1)}m`;
    const n2 = Math.floor(t6 / 60);
    return n2 < 24 ? `${n2}h` : e.toLocaleDateString(void 0, { month: "short", day: "numeric" });
  }
  var init_useRelativeTime_DgKW5Wq7 = __esm({
    "../dock/dock/public/js/chunks/useRelativeTime-DgKW5Wq7.js"() {
    }
  });

  // ../dock/dock/public/js/chunks/external-link-9a_au9DC.js
  var t3;
  var init_external_link_9a_au9DC = __esm({
    "../dock/dock/public/js/chunks/external-link-9a_au9DC.js"() {
      init_dock_navbar_esm();
      t3 = _o("external-link", [["path", { d: "M15 3h6v6", key: "1q9fwt" }], ["path", { d: "M10 14 21 3", key: "gplh6r" }], ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]]);
    }
  });

  // ../dock/dock/public/js/chunks/DockNotificationError.vue_vue_type_script_setup_true_lang-e1X6ri5b.js
  function X(t6, n2, i2, l6, d2, x3) {
    return Se(), bn("div", S2, [(Se(), bn(me, null, cc(3, (p3) => Kt("div", { key: p3, class: "px-3 py-2.5 flex gap-3 items-start animate-pulse" }, [...n2[0] || (n2[0] = [Kt("div", { class: "w-4 h-4 rounded bg-black/10 dark:bg-white/10 mt-0.5 shrink-0" }, null, -1), Kt("div", { class: "flex-1 space-y-1.5" }, [Kt("div", { class: "h-3 rounded bg-black/10 dark:bg-white/10 w-3/4" }), Kt("div", { class: "h-2.5 rounded bg-black/10 dark:bg-white/10 w-1/2" })], -1)])])), 64))]);
  }
  var L, R, T, V2, z2, B, j, F, q2, I, S2, A, G, H2, P, J, K2, Q;
  var init_DockNotificationError_vue_vue_type_script_setup_true_lang_e1X6ri5b = __esm({
    "../dock/dock/public/js/chunks/DockNotificationError.vue_vue_type_script_setup_true_lang-e1X6ri5b.js"() {
      init_runtime_dom_esm_bundler_DJPzte74();
      init_useRelativeTime_DgKW5Wq7();
      init_dock_navbar_esm();
      init_external_link_9a_au9DC();
      init_x_Dj5OacS7();
      L = { class: "flex-1 min-w-0" };
      R = { key: 0, class: "text-xs text-[var(--dock-icon)] truncate mt-0.5" };
      T = { class: "shrink-0 flex flex-col items-end gap-0.5 pt-0.5" };
      V2 = { class: "text-[10px] text-[var(--dock-icon)] capitalize" };
      z2 = { class: "text-[10px] text-[var(--dock-icon)]" };
      B = { class: "absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex gap-1" };
      j = ["href"];
      F = { name: "DockNotificationRow" };
      q2 = ms(__spreadProps(__spreadValues({}, F), { props: { notification: {}, typeInfo: {}, appColor: {} }, emits: ["markRead", "navigate"], setup(t6, { emit: n2 }) {
        const i2 = t6, l6 = n2, d2 = Te(() => !i2.notification.read), x3 = Te(() => a(i2.notification.creation));
        return (p3, r4) => {
          var _a;
          return Se(), bn("div", { role: "menuitem", class: "group relative flex gap-3 items-start px-3 py-2.5 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors", onClick: r4[2] || (r4[2] = (h2) => l6("navigate", t6.notification)) }, [Kt("div", { class: "w-2 h-2 rounded-full mt-1.5 shrink-0", style: ls({ backgroundColor: (_a = t6.appColor) != null ? _a : "var(--dock-icon)" }) }, null, 4), Kt("div", L, [Kt("p", { class: Jt(["text-sm truncate", d2.value ? "font-semibold text-[var(--dock-text)]" : "font-normal text-[var(--dock-text)]"]) }, Do(t6.notification.title), 3), t6.notification.message ? (Se(), bn("p", R, Do(t6.notification.message), 1)) : Qn("", true)]), Kt("div", T, [Kt("span", V2, Do(t6.notification.from_app), 1), Kt("span", z2, Do(x3.value), 1)]), Kt("div", B, [t6.notification.action_url ? (Se(), bn("a", { key: 0, href: t6.notification.action_url, target: "_blank", rel: "noopener", class: "w-6 h-6 flex items-center justify-center rounded bg-[var(--dock-bg)] shadow-sm text-[var(--dock-icon)] hover:text-[var(--dock-text)]", onClick: r4[0] || (r4[0] = Ve(() => {
          }, ["stop"])) }, [q(ee(t3), { class: "w-3 h-3" })], 8, j)) : Qn("", true), d2.value ? (Se(), bn("button", { key: 1, class: "w-6 h-6 flex items-center justify-center rounded bg-[var(--dock-bg)] shadow-sm text-[var(--dock-icon)] hover:text-[var(--dock-text)]", onClick: r4[1] || (r4[1] = Ve((h2) => l6("markRead", t6.notification.name), ["stop"])) }, [q(ee(c), { class: "w-3 h-3" })])) : Qn("", true)])]);
        };
      } }));
      I = { name: "DockNotificationLoading" };
      S2 = { class: "py-1" };
      A = wl(I, [["render", X]]);
      G = { class: "px-3 py-6 text-center text-sm text-[var(--dock-icon)]" };
      H2 = { name: "DockNotificationEmpty" };
      P = ms(__spreadProps(__spreadValues({}, H2), { setup(t6) {
        return (n2, i2) => (Se(), bn("div", G, Do(ee(Bn)("You're all caught up")), 1));
      } }));
      J = { class: "px-3 py-4 text-center text-sm text-[var(--dock-icon)]" };
      K2 = { name: "DockNotificationError" };
      Q = ms(__spreadProps(__spreadValues({}, K2), { emits: ["retry"], setup(t6) {
        return (n2, i2) => (Se(), bn("div", J, [ll(Do(ee(Bn)("Notification unavailable")) + " ", 1), Kt("button", { class: "underline ml-1 hover:text-[var(--dock-text)]", onClick: i2[0] || (i2[0] = (l6) => n2.$emit("retry")) }, Do(ee(Bn)("Try again")), 1)]));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/bell-Ba4xQ-ME.js
  var t4;
  var init_bell_Ba4xQ_ME = __esm({
    "../dock/dock/public/js/chunks/bell-Ba4xQ-ME.js"() {
      init_dock_navbar_esm();
      t4 = _o("bell", [["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }], ["path", { d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326", key: "11g9vi" }]]);
    }
  });

  // ../dock/dock/public/js/chunks/DockBell-XUmq9IaI.js
  var DockBell_XUmq9IaI_exports = {};
  __export(DockBell_XUmq9IaI_exports, {
    default: () => ce2
  });
  var G2, H3, J2, q3, P2, Q2, W, X2, Y, Z, ee2, ce2;
  var init_DockBell_XUmq9IaI = __esm({
    "../dock/dock/public/js/chunks/DockBell-XUmq9IaI.js"() {
      init_useDropdownExclusion_CGCUs3Uj();
      init_dock_navbar_esm();
      init_DockNotificationError_vue_vue_type_script_setup_true_lang_e1X6ri5b();
      init_bell_Ba4xQ_ME();
      init_runtime_dom_esm_bundler_DJPzte74();
      init_useRelativeTime_DgKW5Wq7();
      init_external_link_9a_au9DC();
      init_x_Dj5OacS7();
      G2 = { class: "absolute right-0 top-full mt-2 w-80 bg-[var(--dock-bg)] border border-[var(--dock-border)] rounded-lg shadow-lg z-20 overflow-hidden", role: "menu", "aria-label": "Notifications" };
      H3 = { class: "flex items-center justify-between px-3 py-2 border-b border-[var(--dock-border)]" };
      J2 = { class: "text-sm font-medium text-[var(--dock-text)]" };
      q3 = { class: "max-h-96 overflow-y-auto" };
      P2 = { class: "border-t border-[var(--dock-border)] px-3 py-2 text-center" };
      Q2 = { name: "DockNotificationDropdown" };
      W = ms(__spreadProps(__spreadValues({}, Q2), { props: { realtimeItems: {} }, emits: ["markRead", "markAllRead", "close"], setup(A3, { emit: b2 }) {
        var _a, _b, _c;
        const p3 = A3, u2 = b2, { registeredApps: k3 } = vo(), B3 = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) != null ? _c : window.dockBoot, t6 = Te(() => {
          var _a2;
          const e = {};
          for (const n2 of (_a2 = k3.value) != null ? _a2 : [])
            n2.color && (e[n2.app] = n2.color);
          return e;
        }), E2 = Te(() => {
          var _a2;
          return (_a2 = B3 == null ? void 0 : B3.notification_types) != null ? _a2 : {};
        }), i2 = Oe([]), f2 = Oe(true), m4 = Oe(false), v2 = Oe(), w3 = Te(() => {
          var _a2;
          const e = new Set(i2.value.map((a2) => a2.name));
          return [...((_a2 = p3.realtimeItems) != null ? _a2 : []).filter((a2) => !e.has(a2.name)), ...i2.value];
        });
        async function h2() {
          f2.value = true, m4.value = false;
          try {
            i2.value = await wt("dock.api.notifications.get_recent", { limit: 20 });
          } catch (e) {
            m4.value = true;
          } finally {
            f2.value = false;
          }
        }
        Dt(() => {
          h2(), setTimeout(() => {
            var _a2;
            return (_a2 = v2.value) == null ? void 0 : _a2.focus();
          }, 50);
        });
        async function y(e) {
          await wt("dock.api.notifications.mark_read", { notification_names: [e] });
          const n2 = i2.value.find((a2) => a2.name === e);
          n2 && (n2.read = 1), u2("markRead", [e]);
        }
        async function o2() {
          await wt("dock.api.notifications.mark_all_read"), i2.value.forEach((e) => {
            e.read = 1;
          }), u2("markAllRead");
        }
        function l6(e) {
          y(e.name), e.action_url && (window.location.href = e.action_url), u2("close");
        }
        return (e, n2) => (Se(), bn("div", G2, [Kt("div", H3, [Kt("span", J2, Do(ee(Bn)("Notifications")), 1), Kt("button", { ref_key: "markAllBtn", ref: v2, class: "text-xs text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors", onClick: o2 }, Do(ee(Bn)("Mark all read")), 513)]), Kt("div", q3, [f2.value ? (Se(), nt(A, { key: 0 })) : m4.value ? (Se(), nt(Q, { key: 1, onRetry: h2 })) : w3.value.length ? (Se(true), bn(me, { key: 3 }, cc(w3.value, (a2) => (Se(), nt(q2, { key: a2.name, notification: a2, "type-info": E2.value[a2.notification_type], "app-color": t6.value[a2.from_app], onMarkRead: y, onNavigate: l6 }, null, 8, ["notification", "type-info", "app-color"]))), 128)) : (Se(), nt(P, { key: 2 }))]), Kt("div", P2, [Kt("a", { href: "/dock/notifications", class: "text-xs text-[var(--dock-accent)] hover:underline", onClick: n2[0] || (n2[0] = (a2) => e.$emit("close")) }, Do(ee(Bn)("View all notifications")) + " \u2192", 1)])]));
      } }));
      X2 = { id: "dock-bell-root", class: "dock-bell relative" };
      Y = ["aria-expanded", "aria-label"];
      Z = { key: 0, class: "absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center leading-none" };
      ee2 = { name: "DockBell" };
      ce2 = ms(__spreadProps(__spreadValues({}, ee2), { setup(A3) {
        var _a, _b, _c, _d;
        const b2 = Oe(), { open: p3, toggle: u2, close: k3 } = r2("bell", b2), B3 = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) != null ? _c : window.dockBoot, t6 = Oe((_d = B3 == null ? void 0 : B3.unread_notifications) != null ? _d : 0), E2 = Te(() => t6.value > 99 ? "99+" : String(t6.value)), i2 = Oe([]);
        function f2(o2) {
          t6.value += 1, i2.value = [__spreadValues({ read: 0 }, o2), ...i2.value];
        }
        Dt(() => {
          var _a2;
          const o2 = (_a2 = window.frappe) == null ? void 0 : _a2.realtime;
          (o2 == null ? void 0 : o2.on) && o2.on("dock_notification", f2);
        }), _n(() => {
          var _a2;
          const o2 = (_a2 = window.frappe) == null ? void 0 : _a2.realtime;
          (o2 == null ? void 0 : o2.off) && o2.off("dock_notification", f2);
        });
        function m4(o2) {
          const l6 = document.getElementById("dock-bell-root");
          l6 && !l6.contains(o2.target) && k3();
        }
        Dt(() => document.addEventListener("mousedown", m4)), _n(() => document.removeEventListener("mousedown", m4));
        function v2(o2) {
          o2.key === "Escape" && p3.value && k3();
        }
        Dt(() => document.addEventListener("keydown", v2)), _n(() => document.removeEventListener("keydown", v2));
        function w3(o2) {
          t6.value = Math.max(0, t6.value - o2.length);
        }
        function h2() {
          t6.value = 0;
        }
        function y() {
          k3();
        }
        return (o2, l6) => (Se(), bn("div", X2, [Kt("button", { ref_key: "bellRef", ref: b2, class: "relative flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", "aria-expanded": ee(p3), "aria-label": t6.value > 0 ? `Notifications, ${t6.value} unread` : "Notifications", title: "Notifications", onClick: l6[0] || (l6[0] = (...e) => ee(u2) && ee(u2)(...e)) }, [q(ee(t4), { class: "w-4 h-4" }), t6.value > 0 ? (Se(), bn("span", Z, Do(E2.value), 1)) : Qn("", true)], 8, Y), ee(p3) ? (Se(), nt(W, { key: 0, "realtime-items": i2.value, onMarkRead: w3, onMarkAllRead: h2, onClose: y }, null, 8, ["realtime-items"])) : Qn("", true)]));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/DockJana-CeMkKhHe.js
  var DockJana_CeMkKhHe_exports = {};
  __export(DockJana_CeMkKhHe_exports, {
    default: () => p2
  });
  var l5, i, p2;
  var init_DockJana_CeMkKhHe = __esm({
    "../dock/dock/public/js/chunks/DockJana-CeMkKhHe.js"() {
      init_dock_navbar_esm();
      l5 = _o("message-circle", [["path", { d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719", key: "1sd12s" }]]);
      i = { name: "DockJana" };
      p2 = ms(__spreadProps(__spreadValues({}, i), { setup(d2) {
        return (a2, e) => (Se(), bn("button", { class: "flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", "aria-label": "Jana", title: "Jana", onClick: e[0] || (e[0] = (m4) => a2.$emit("open")) }, [q(ee(l5), { class: "w-4 h-4" })]));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/DockAppSwitcher-DF7FlgZm.js
  var DockAppSwitcher_DF7FlgZm_exports = {};
  __export(DockAppSwitcher_DF7FlgZm_exports, {
    default: () => Ne2
  });
  var te2, K3, oe, re, ae2, se, ne, ce3, le, ie2, de2, ue2, ke2, ve2, me3, fe2, pe2, be2, ge2, he2, xe3, ye2, we2, _e3, $e4, De2, Ce4, Re2, Ae4, Ee2, je2, Be2, Le2, Ne2;
  var init_DockAppSwitcher_DF7FlgZm = __esm({
    "../dock/dock/public/js/chunks/DockAppSwitcher-DF7FlgZm.js"() {
      init_runtime_dom_esm_bundler_DJPzte74();
      init_dock_navbar_esm();
      init_useDropdownExclusion_CGCUs3Uj();
      init_x_Dj5OacS7();
      init_users_UcYs3C0J();
      te2 = _o("grip-vertical", [["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }], ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }], ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }], ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }], ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }], ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]]);
      K3 = _o("grip", [["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }], ["circle", { cx: "19", cy: "5", r: "1", key: "w8mnmm" }], ["circle", { cx: "5", cy: "5", r: "1", key: "lttvr7" }], ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }], ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }], ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }], ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }], ["circle", { cx: "19", cy: "19", r: "1", key: "shf9b7" }], ["circle", { cx: "5", cy: "19", r: "1", key: "bfqh0e" }]]);
      oe = _o("pencil", [["path", { d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z", key: "1a8usu" }], ["path", { d: "m15 5 4 4", key: "1mk7zo" }]]);
      re = ["aria-label", "title"];
      ae2 = { class: "text-xs font-medium text-[var(--dock-text)] leading-snug line-clamp-2" };
      se = { class: "text-[10px] text-[var(--dock-icon)] mt-0.5 truncate" };
      ne = ["aria-label"];
      ce3 = { name: "DockBookmarkTile" };
      le = ms(__spreadProps(__spreadValues({}, ce3), { props: { bookmark: {}, editMode: { type: Boolean } }, emits: ["remove", "navigate"], setup(i2, { emit: y }) {
        const w3 = i2, b2 = y, { registeredApps: k3 } = vo(), g3 = Te(() => {
          var _a, _b;
          return (_b = (_a = k3.value.find((a2) => a2.app === w3.bookmark.app)) == null ? void 0 : _a.color) != null ? _b : "var(--dock-accent)";
        });
        function p3(l6) {
          return `/${l6.app}/${l6.doctype}/${encodeURIComponent(l6.docname)}`;
        }
        return (l6, a2) => (Se(), bn("div", { role: "link", "aria-label": `${i2.bookmark.label} (${i2.bookmark.doctype})`, title: i2.bookmark.label, class: "relative group rounded-lg border border-[var(--dock-border)] bg-[var(--dock-bg)] overflow-hidden cursor-pointer hover:shadow-sm transition-shadow", style: ls([{ "border-top-width": "4px" }, { borderTopColor: g3.value }]), onClick: a2[1] || (a2[1] = (D3) => !i2.editMode && b2("navigate", p3(i2.bookmark))) }, [i2.editMode ? (Se(), nt(ee(te2), { key: 0, role: "button", "aria-label": ee(Bn)("Drag to reorder {0}").replace("{0}", i2.bookmark.label), class: "dock-drag-handle absolute left-1 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--dock-icon)] cursor-grab" }, null, 8, ["aria-label"])) : Qn("", true), Kt("div", { class: Jt(["px-3 py-2", i2.editMode && "pl-6"]) }, [Kt("div", ae2, Do(i2.bookmark.label), 1), Kt("div", se, Do(i2.bookmark.doctype), 1)], 2), Kt("button", { class: Jt(["absolute top-1 right-1 transition-opacity text-[var(--dock-icon)] hover:text-[var(--dock-text)]", i2.editMode ? "opacity-100" : "opacity-0 group-hover:opacity-100"]), "aria-label": ee(Bn)("Remove bookmark"), onClick: a2[0] || (a2[0] = Ve((D3) => b2("remove", i2.bookmark.name), ["stop"])) }, [q(ee(c), { class: "w-3 h-3" })], 10, ne)], 12, re));
      } }));
      ie2 = { key: 0, class: "px-4 pt-3 pb-2" };
      de2 = { class: "flex items-center justify-between mb-2" };
      ue2 = { class: "text-[10px] font-semibold uppercase tracking-wider text-[var(--dock-icon)]" };
      ke2 = ["aria-label", "aria-pressed"];
      ve2 = { key: 0, class: "text-[10px] font-semibold" };
      me3 = { class: "grid grid-cols-3 gap-2" };
      fe2 = { name: "DockBookmarks" };
      pe2 = ms(__spreadProps(__spreadValues({}, fe2), { emits: ["close"], setup(i2, { emit: y }) {
        const w3 = y, { settings: b2 } = vo(), { bookmarks: k3, removeBookmark: g3, reorderBookmarks: p3 } = yo(), l6 = Oe(false), a2 = Oe(null);
        function D3(m4) {
          a2.value = m4;
        }
        function M2(m4, v2) {
          if (m4.preventDefault(), a2.value === null || a2.value === v2)
            return;
          const h2 = k3.value.splice(a2.value, 1)[0];
          k3.value.splice(v2, 0, h2), a2.value = v2;
        }
        function z3() {
          a2.value = null, p3(k3.value.map((m4) => m4.name));
        }
        function E2() {
          l6.value = false;
        }
        function S5(m4) {
          window.location.href = m4, w3("close");
        }
        return (m4, v2) => {
          var _a;
          return ee(k3).length && ((_a = ee(b2)) == null ? void 0 : _a.enable_bookmarks) !== false ? (Se(), bn("div", ie2, [Kt("div", de2, [Kt("span", ue2, Do(ee(Bn)("Pinned")), 1), Kt("button", { class: "text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors", "aria-label": ee(Bn)("Edit bookmarks"), "aria-pressed": l6.value, onClick: v2[0] || (v2[0] = (h2) => l6.value ? E2() : l6.value = true) }, [l6.value ? (Se(), bn("span", ve2, Do(ee(Bn)("Done")), 1)) : (Se(), nt(ee(oe), { key: 1, class: "w-3.5 h-3.5" }))], 8, ke2)]), Kt("div", me3, [(Se(true), bn(me, null, cc(ee(k3), (h2, j3) => (Se(), nt(le, { key: h2.name, bookmark: h2, "edit-mode": l6.value, draggable: l6.value, onDragstart: (C2) => D3(j3), onDragover: (C2) => M2(C2, j3), onDrop: z3, onRemove: ee(g3), onNavigate: S5 }, null, 8, ["bookmark", "edit-mode", "draggable", "onDragstart", "onDragover", "onRemove"]))), 128))]), v2[1] || (v2[1] = Kt("div", { class: "mt-2 border-b border-[var(--dock-border)]" }, null, -1))])) : Qn("", true);
        };
      } }));
      be2 = ["aria-expanded", "aria-label", "title"];
      ge2 = { key: 0, role: "dialog", "aria-label": "App switcher", class: "fixed inset-x-0 bottom-0 rounded-t-2xl z-40 sm:absolute sm:inset-x-auto sm:right-0 sm:bottom-auto sm:top-full sm:mt-2 sm:w-72 sm:rounded-lg sm:z-20 max-h-[420px] overflow-y-auto bg-[var(--dock-bg)] border border-[var(--dock-border)] shadow-lg p-3" };
      he2 = { role: "row", class: "contents" };
      xe3 = ["aria-label", "aria-current"];
      ye2 = { class: "w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-500/10 flex-shrink-0" };
      we2 = { class: "text-xs text-[var(--dock-text)] truncate w-full leading-tight" };
      _e3 = ["href", "aria-label", "aria-current", "onClick"];
      $e4 = ["src", "alt"];
      De2 = { class: "text-xs text-[var(--dock-text)] truncate w-full leading-tight" };
      Ce4 = { key: 0, class: "flex flex-col items-center gap-3 py-8 text-center" };
      Re2 = { class: "text-sm text-[var(--dock-icon)]" };
      Ae4 = { class: "border-t border-[var(--dock-border)] pt-2 mt-1 space-y-0.5" };
      Ee2 = { href: "/dock/apps", class: "flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-sm font-medium text-[var(--dock-accent)]" };
      je2 = { href: "/app", class: "flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-sm text-[var(--dock-icon)]" };
      Be2 = { name: "DockAppSwitcher" };
      Le2 = ms(__spreadProps(__spreadValues({}, Be2), { setup(i2) {
        const { registeredApps: y } = vo(), w3 = Oe(null), b2 = Oe(null), k3 = Oe(null), g3 = Oe(window.location.pathname), { open: p3, toggle: l6, close: a2 } = r2("switcher", w3), D3 = Te(() => {
          var _a, _b, _c, _d;
          return ((_d = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.user) == null ? void 0 : _c.roles) != null ? _d : []).includes("System Manager");
        }), M2 = Te(() => D3.value ? Bn("Install apps \u2192") : Bn("Browse all apps \u2192")), z3 = Te(() => {
          const s = y.value, n2 = [];
          for (let t6 = 0; t6 < s.length; t6 += 3)
            n2.push(s.slice(t6, t6 + 3));
          return n2;
        });
        function E2(s) {
          return g3.value.startsWith(s.route);
        }
        function S5() {
          a2(), window.location.href = "/dock/people";
        }
        function m4(s) {
          document.documentElement.style.setProperty("--dock-accent", s.color), window.location.href = s.route, a2();
        }
        function v2(s) {
          p3.value && b2.value && !b2.value.contains(s.target) && a2();
        }
        function h2(s) {
          s.key === "Escape" && p3.value && a2();
        }
        function j3(s) {
          var _a;
          if (!k3.value)
            return;
          const n2 = Array.from(k3.value.querySelectorAll('[role="gridcell"]')), t6 = n2.indexOf(s.target);
          if (t6 === -1)
            return;
          const _2 = 3;
          let r4 = -1;
          switch (s.key) {
            case "ArrowRight":
              r4 = t6 + 1 < n2.length ? t6 + 1 : t6;
              break;
            case "ArrowLeft":
              r4 = t6 - 1 >= 0 ? t6 - 1 : t6;
              break;
            case "ArrowDown":
              r4 = t6 + _2 < n2.length ? t6 + _2 : t6;
              break;
            case "ArrowUp":
              r4 = t6 - _2 >= 0 ? t6 - _2 : t6;
              break;
            case "Home":
              r4 = 0;
              break;
            case "End":
              r4 = n2.length - 1;
              break;
            default:
              return;
          }
          s.preventDefault(), (_a = n2[r4]) == null ? void 0 : _a.focus();
        }
        function C2() {
          g3.value = window.location.pathname;
        }
        return Dt(() => {
          document.addEventListener("click", v2), document.addEventListener("keydown", h2), window.addEventListener("popstate", C2);
        }), _n(() => {
          document.removeEventListener("click", v2), document.removeEventListener("keydown", h2), window.removeEventListener("popstate", C2);
        }), (s, n2) => (Se(), bn("div", { ref_key: "rootRef", ref: b2, class: "dock-app-switcher relative" }, [Kt("button", { ref_key: "triggerRef", ref: w3, class: "flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", "aria-expanded": ee(p3), "aria-haspopup": "true", "aria-label": ee(Bn)("Open app switcher"), title: ee(Bn)("App switcher"), onClick: n2[0] || (n2[0] = (...t6) => ee(l6) && ee(l6)(...t6)) }, [q(ee(K3), { class: "w-4 h-4" })], 8, be2), q(xe, { name: "dock-backdrop" }, { default: pi(() => [ee(p3) ? (Se(), bn("div", { key: 0, class: "fixed inset-0 bg-black/20 z-30 sm:hidden", "aria-hidden": "true", onClick: n2[1] || (n2[1] = (...t6) => ee(a2) && ee(a2)(...t6)) })) : Qn("", true)]), _: 1 }), q(xe, { name: "dock-switcher" }, { default: pi(() => [ee(p3) ? (Se(), bn("div", ge2, [n2[3] || (n2[3] = Kt("div", { class: "flex justify-center mb-3 sm:hidden" }, [Kt("div", { class: "w-10 h-1 rounded-full bg-gray-300 dark:bg-gray-600" })], -1)), fc(s.$slots, "panel-top", {}, void 0, true), q(pe2, { onClose: ee(a2) }, null, 8, ["onClose"]), Kt("div", { ref_key: "gridRef", ref: k3, role: "grid", "aria-label": "Apps", class: "grid grid-cols-3 gap-2 mb-3", onKeydown: j3 }, [Kt("div", he2, [Kt("a", { href: "/dock/people", role: "gridcell", tabindex: "0", "aria-label": ee(Bn)("People"), "aria-current": g3.value.startsWith("/dock/people") ? "true" : void 0, class: Jt(["flex flex-col items-center gap-1.5 p-2 rounded-lg text-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dock-accent)] focus-visible:ring-offset-1", { "ring-2 ring-[var(--dock-accent)]": g3.value.startsWith("/dock/people") }]), onClick: Ve(S5, ["prevent"]) }, [Kt("span", ye2, [q(ee(c3), { class: "w-6 h-6 text-indigo-500" })]), Kt("span", we2, Do(ee(Bn)("People")), 1)], 10, xe3)]), (Se(true), bn(me, null, cc(z3.value, (t6, _2) => (Se(), bn("div", { key: _2, role: "row", class: "contents" }, [(Se(true), bn(me, null, cc(t6, (r4) => (Se(), bn("a", { key: r4.app, href: r4.route, role: "gridcell", tabindex: "0", "aria-label": r4.label, "aria-current": E2(r4) ? "true" : void 0, class: Jt(["flex flex-col items-center gap-1.5 p-2 rounded-lg text-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dock-accent)] focus-visible:ring-offset-1", { "ring-2 ring-[var(--dock-accent)]": E2(r4) }]), onClick: Ve((Me3) => m4(r4), ["prevent"]) }, [Kt("span", { class: Jt(["w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0", r4.icon ? "" : "text-white text-xl font-bold"]), style: ls(r4.icon ? {} : { backgroundColor: r4.color }) }, [r4.icon ? (Se(), bn("img", { key: 0, src: r4.icon, alt: r4.label, class: "w-full h-full object-contain" }, null, 8, $e4)) : (Se(), bn(me, { key: 1 }, [ll(Do(r4.label[0]), 1)], 64))], 6), Kt("span", De2, Do(r4.label), 1)], 10, _e3))), 128))]))), 128))], 544), ee(y).length === 0 ? (Se(), bn("div", Ce4, [q(ee(K3), { class: "w-8 h-8 text-[var(--dock-icon)] opacity-40" }), Kt("p", Re2, Do(ee(Bn)("Discover ecosystem apps")), 1)])) : Qn("", true), Kt("div", Ae4, [Kt("a", Ee2, Do(M2.value), 1), Kt("a", je2, [n2[2] || (n2[2] = Kt("img", { src: "/assets/frappe/images/frappe-framework-logo.svg", alt: "Frappe", class: "w-4 h-4" }, null, -1)), ll(" " + Do(ee(Bn)("Frappe Desk")), 1)])])])) : Qn("", true)]), _: 3 })], 512));
      } }));
      Ne2 = wl(Le2, [["__scopeId", "data-v-deff156e"]]);
    }
  });

  // ../dock/dock/public/js/chunks/settings-Bn_0XBJA.js
  var t5;
  var init_settings_Bn_0XBJA = __esm({
    "../dock/dock/public/js/chunks/settings-Bn_0XBJA.js"() {
      init_dock_navbar_esm();
      t5 = _o("settings", [["path", { d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915", key: "1i5ecw" }], ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]]);
    }
  });

  // ../dock/dock/public/js/chunks/DockAvatar-NKUAtNRZ.js
  var DockAvatar_NKUAtNRZ_exports = {};
  __export(DockAvatar_NKUAtNRZ_exports, {
    default: () => Le3
  });
  function W2() {
    var _a, _b, _c, _d, _e6, _f, _g;
    const s = (_g = (_d = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) == null ? void 0 : _c.settings) == null ? void 0 : _d.theme) != null ? _g : (_f = (_e6 = window.dockBoot) == null ? void 0 : _e6.settings) == null ? void 0 : _f.theme;
    if (s === "light" || s === "dark" || s === "system")
      return s;
    const a2 = localStorage.getItem(H4);
    return a2 === "light" || a2 === "dark" || a2 === "system" ? a2 : "system";
  }
  function S3(s) {
    const a2 = s === "dark" || s === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", a2);
  }
  function ee3() {
    function s(a2) {
      f.value = a2, S3(a2), localStorage.setItem(H4, a2), wt("dock.api.settings.save_user_preference", { values: { theme: a2 } }).catch(() => {
      });
    }
    return { theme: f, setTheme: s };
  }
  var J3, X3, Y2, Z2, Q3, H4, f, te3, ae3, re2, oe2, se2, ne2, ie3, le2, ce4, de3, ue3, pe3, ke3, me4, he3, ve3, ge3, Le3;
  var init_DockAvatar_NKUAtNRZ = __esm({
    "../dock/dock/public/js/chunks/DockAvatar-NKUAtNRZ.js"() {
      init_runtime_dom_esm_bundler_DJPzte74();
      init_dock_navbar_esm();
      init_useDropdownExclusion_CGCUs3Uj();
      init_clock_CzVKVsBv();
      init_settings_Bn_0XBJA();
      J3 = _o("circle-user-round", [["path", { d: "M18 20a6 6 0 0 0-12 0", key: "1qehca" }], ["circle", { cx: "12", cy: "10", r: "4", key: "1h16sb" }], ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]]);
      X3 = _o("door-open", [["path", { d: "M11 20H2", key: "nlcfvz" }], ["path", { d: "M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z", key: "au4z13" }], ["path", { d: "M11 4H8a2 2 0 0 0-2 2v14", key: "74r1mk" }], ["path", { d: "M14 12h.01", key: "1jfl7z" }], ["path", { d: "M22 20h-3", key: "vhrsz" }]]);
      Y2 = _o("log-out", [["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }], ["path", { d: "M21 12H9", key: "dn1m92" }], ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]]);
      Z2 = _o("sliders-horizontal", [["path", { d: "M10 5H3", key: "1qgfaw" }], ["path", { d: "M12 19H3", key: "yhmn1j" }], ["path", { d: "M14 3v4", key: "1sua03" }], ["path", { d: "M16 17v4", key: "1q0r14" }], ["path", { d: "M21 12h-9", key: "1o4lsq" }], ["path", { d: "M21 19h-5", key: "1rlt1p" }], ["path", { d: "M21 5h-7", key: "1oszz2" }], ["path", { d: "M8 10v4", key: "tgpxqk" }], ["path", { d: "M8 12H3", key: "a7s4jb" }]]);
      Q3 = _o("user", [["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }], ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]]);
      H4 = "theme";
      f = Oe(W2());
      S3(f.value);
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (s) => {
        f.value === "system" && document.documentElement.classList.toggle("dark", s.matches);
      });
      te3 = ["aria-expanded", "aria-label", "title"];
      ae3 = ["src", "alt"];
      re2 = { key: 2 };
      oe2 = { key: 0, class: "absolute right-0 top-full mt-2 w-56 rounded-lg shadow-lg border border-[var(--dock-border)] bg-[var(--dock-bg)] py-1 z-20", role: "menu" };
      se2 = { class: "px-3 py-2.5 border-b border-[var(--dock-border)]" };
      ne2 = { class: "text-sm font-medium text-[var(--dock-text)] truncate" };
      ie3 = { class: "text-xs text-[var(--dock-icon)] truncate" };
      le2 = { class: "py-1 border-b border-[var(--dock-border)]" };
      ce4 = ["href"];
      de3 = { key: 0, class: "py-1 border-b border-[var(--dock-border)]" };
      ue3 = { class: "flex items-center gap-2 mb-2" };
      pe3 = { class: "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide" };
      ke3 = ["aria-label"];
      me4 = ["aria-checked", "onClick"];
      he3 = { class: "py-1" };
      ve3 = { href: "/app/logout", role: "menuitem", class: "flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-black/5 dark:hover:bg-white/10 transition-colors" };
      ge3 = { name: "DockAvatar" };
      Le3 = ms(__spreadProps(__spreadValues({}, ge3), { setup(s) {
        var _a, _b, _c, _d;
        const { theme: a2, setTheme: B3 } = ee3(), M2 = Oe(null), b2 = Oe(null), { open: x3, toggle: C2, close: i2 } = r2("avatar", M2), k3 = Te(() => {
          var _a2, _b2, _c2;
          return (_c2 = (_a2 = window.frappe) == null ? void 0 : _a2.session) != null ? _c2 : (_b2 = window.dockBoot) == null ? void 0 : _b2.session;
        }), v2 = Te(() => {
          var _a2, _b2, _c2, _d2;
          return (_d2 = (_c2 = (_a2 = k3.value) == null ? void 0 : _a2.user_fullname) != null ? _c2 : (_b2 = k3.value) == null ? void 0 : _b2.user) != null ? _d2 : "";
        }), w3 = Te(() => (v2.value || "?").split(" ").map((r4) => r4[0]).slice(0, 2).join("").toUpperCase()), L3 = ((_d = ((_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) != null ? _b : window.dockBoot) != null ? _c : {}).installed_apps) != null ? _d : []).includes("frappe_time"), E2 = Te(() => {
          var _a2, _b2, _c2, _d2, _e6;
          const d2 = (_d2 = (_c2 = (_b2 = (_a2 = window.frappe) == null ? void 0 : _a2.boot) == null ? void 0 : _b2.user) == null ? void 0 : _c2.roles) != null ? _d2 : [];
          return d2.includes("System Manager") || d2.includes("Dock Manager") ? true : !!((_e6 = window.dockBoot) == null ? void 0 : _e6.is_dock_manager);
        }), R3 = [{ value: "system", label: Bn("System") }, { value: "light", label: Bn("Light") }, { value: "dark", label: Bn("Dark") }];
        function T2(d2) {
          b2.value && !b2.value.contains(d2.target) && i2();
        }
        function z3(d2) {
          d2.key === "Escape" && x3.value && i2();
        }
        return Dt(() => {
          document.addEventListener("click", T2), document.addEventListener("keydown", z3);
        }), _n(() => {
          document.removeEventListener("click", T2), document.removeEventListener("keydown", z3);
        }), (d2, r4) => {
          var _a2;
          return Se(), bn("div", { ref_key: "wrapperRef", ref: b2, class: "dock-avatar relative" }, [Kt("button", { ref_key: "triggerRef", ref: M2, class: "w-8 h-8 rounded-full bg-black/10 dark:bg-white/20 hover:bg-black/15 dark:hover:bg-white/30 transition-colors flex items-center justify-center text-[var(--dock-text)] text-xs font-semibold overflow-hidden", "aria-expanded": ee(x3), "aria-haspopup": "true", "aria-label": ee(Bn)("User menu"), title: v2.value || ee(Bn)("User menu"), onClick: r4[0] || (r4[0] = (...t6) => ee(C2) && ee(C2)(...t6)) }, [((_a2 = k3.value) == null ? void 0 : _a2.user_image) ? (Se(), bn("img", { key: 0, src: k3.value.user_image, alt: v2.value, class: "w-8 h-8 object-cover" }, null, 8, ae3)) : !w3.value || w3.value === "?" ? (Se(), nt(ee(J3), { key: 1, class: "w-5 h-5 text-[var(--dock-icon)]" })) : (Se(), bn("span", re2, Do(w3.value), 1))], 8, te3), q(xe, { "enter-active-class": "transition ease-out duration-150", "enter-from-class": "opacity-0 translate-y-1.5", "enter-to-class": "opacity-100 translate-y-0", "leave-active-class": "transition ease-in duration-100", "leave-from-class": "opacity-100 translate-y-0", "leave-to-class": "opacity-0 translate-y-1.5" }, { default: pi(() => {
            var _a3, _b2;
            return [ee(x3) ? (Se(), bn("div", oe2, [Kt("div", se2, [Kt("p", ne2, Do(v2.value), 1), Kt("p", ie3, Do((_a3 = k3.value) == null ? void 0 : _a3.user), 1)]), Kt("div", le2, [Kt("a", { href: `/app/user/${(_b2 = k3.value) == null ? void 0 : _b2.user}`, role: "menuitem", class: "flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors no-underline", onClick: r4[1] || (r4[1] = (...t6) => ee(i2) && ee(i2)(...t6)) }, [q(ee(Q3), { class: "w-4 h-4 text-[var(--dock-icon)]", "aria-hidden": "true" }), ll(" " + Do(ee(Bn)("My Profile")), 1)], 8, ce4), Kt("a", { href: "/dock/settings", role: "menuitem", class: "flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors no-underline", onClick: r4[2] || (r4[2] = (...t6) => ee(i2) && ee(i2)(...t6)) }, [q(ee(Z2), { class: "w-4 h-4 text-[var(--dock-icon)]", "aria-hidden": "true" }), ll(" " + Do(ee(Bn)("Preferences")), 1)])]), ee(L3) || E2.value ? (Se(), bn("div", de3, [ee(L3) ? (Se(), bn("a", { key: 0, href: "/app/ft-timer", role: "menuitem", class: "flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors no-underline", onClick: r4[3] || (r4[3] = (...t6) => ee(i2) && ee(i2)(...t6)) }, [q(ee(o), { class: "w-4 h-4 text-[var(--dock-icon)]", "aria-hidden": "true" }), ll(" " + Do(ee(Bn)("Time")), 1)])) : Qn("", true), E2.value ? (Se(), bn("a", { key: 1, href: "/dock/guest", role: "menuitem", class: "flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors no-underline", onClick: r4[4] || (r4[4] = (...t6) => ee(i2) && ee(i2)(...t6)) }, [q(ee(X3), { class: "w-4 h-4 text-[var(--dock-icon)]", "aria-hidden": "true" }), ll(" " + Do(ee(Bn)("Guest Portal")), 1)])) : Qn("", true)])) : Qn("", true), Kt("div", { class: "px-4 py-3 border-b border-[var(--dock-border)]", onClick: r4[5] || (r4[5] = Ve(() => {
            }, ["stop"])) }, [Kt("div", ue3, [q(ee(t5), { class: "w-3.5 h-3.5 text-gray-500 dark:text-gray-400" }), Kt("span", pe3, Do(ee(Bn)("Theme")), 1)]), Kt("div", { class: "flex gap-1 bg-gray-100 dark:bg-gray-900 rounded-lg p-1", role: "radiogroup", "aria-label": ee(Bn)("Theme preference") }, [(Se(), bn(me, null, cc(R3, (t6) => Kt("button", { key: t6.value, class: Jt(["flex-1 px-3 py-1.5 text-xs font-medium rounded transition-colors", ee(a2) === t6.value ? "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm" : "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"]), role: "radio", "aria-checked": ee(a2) === t6.value, onClick: (be4) => ee(B3)(t6.value) }, Do(t6.label), 11, me4)), 64))], 8, ke3)]), Kt("div", he3, [Kt("a", ve3, [q(ee(Y2), { class: "w-4 h-4" }), ll(" " + Do(ee(Bn)("Log out")), 1)])])])) : Qn("", true)];
          }), _: 1 })], 512);
        };
      } }));
    }
  });

  // ../dock/dock/public/js/dock-navbar.esm.js
  function ns(e) {
    const t6 = /* @__PURE__ */ Object.create(null);
    for (const n2 of e.split(","))
      t6[n2] = 1;
    return (n2) => n2 in t6;
  }
  function ls(e) {
    if (L2(e)) {
      const t6 = {};
      for (let n2 = 0; n2 < e.length; n2++) {
        const s = e[n2], r4 = ne3(s) ? Ro(s) : ls(s);
        if (r4)
          for (const o2 in r4)
            t6[o2] = r4[o2];
      }
      return t6;
    } else if (ne3(e) || W3(e))
      return e;
  }
  function Ro(e) {
    const t6 = {};
    return e.replace(Io, "").split(Po).forEach((n2) => {
      if (n2) {
        const s = n2.split(Oo);
        s.length > 1 && (t6[s[0].trim()] = s[1].trim());
      }
    }), t6;
  }
  function Jt(e) {
    let t6 = "";
    if (ne3(e))
      t6 = e;
    else if (L2(e))
      for (let n2 = 0; n2 < e.length; n2++) {
        const s = Jt(e[n2]);
        s && (t6 += s + " ");
      }
    else if (W3(e))
      for (const n2 in e)
        e[n2] && (t6 += n2 + " ");
    return t6.trim();
  }
  function ec(e) {
    return !!e || e === "";
  }
  function Fo(e, t6) {
    if (e.length !== t6.length)
      return false;
    let n2 = true;
    for (let s = 0; n2 && s < e.length; s++)
      n2 = kn(e[s], t6[s]);
    return n2;
  }
  function kn(e, t6) {
    if (e === t6)
      return true;
    let n2 = Cs(e), s = Cs(t6);
    if (n2 || s)
      return n2 && s ? e.getTime() === t6.getTime() : false;
    if (n2 = Ke3(e), s = Ke3(t6), n2 || s)
      return e === t6;
    if (n2 = L2(e), s = L2(t6), n2 || s)
      return n2 && s ? Fo(e, t6) : false;
    if (n2 = W3(e), s = W3(t6), n2 || s) {
      if (!n2 || !s)
        return false;
      const r4 = Object.keys(e).length, o2 = Object.keys(t6).length;
      if (r4 !== o2)
        return false;
      for (const i2 in e) {
        const l6 = e.hasOwnProperty(i2), c4 = t6.hasOwnProperty(i2);
        if (l6 && !c4 || !l6 && c4 || !kn(e[i2], t6[i2]))
          return false;
      }
    }
    return String(e) === String(t6);
  }
  function jo() {
    return _e4;
  }
  function hr(e, t6 = false) {
    if (e.flags |= 8, t6) {
      e.next = Rt2, Rt2 = e;
      return;
    }
    e.next = It2, It2 = e;
  }
  function cs() {
    dr++;
  }
  function fs() {
    if (--dr > 0)
      return;
    if (Rt2) {
      let t6 = Rt2;
      for (Rt2 = void 0; t6; ) {
        const n2 = t6.next;
        t6.next = void 0, t6.flags &= -9, t6 = n2;
      }
    }
    let e;
    for (; It2; ) {
      let t6 = It2;
      for (It2 = void 0; t6; ) {
        const n2 = t6.next;
        if (t6.next = void 0, t6.flags &= -9, t6.flags & 1)
          try {
            t6.trigger();
          } catch (s) {
            e || (e = s);
          }
        t6 = n2;
      }
    }
    if (e)
      throw e;
  }
  function pr(e) {
    for (let t6 = e.deps; t6; t6 = t6.nextDep)
      t6.version = -1, t6.prevActiveLink = t6.dep.activeLink, t6.dep.activeLink = t6;
  }
  function gr(e) {
    let t6, n2 = e.depsTail, s = n2;
    for (; s; ) {
      const r4 = s.prevDep;
      s.version === -1 ? (s === n2 && (n2 = r4), as(s), $o(s)) : t6 = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r4;
    }
    e.deps = t6, e.depsTail = n2;
  }
  function Hn(e) {
    for (let t6 = e.deps; t6; t6 = t6.nextDep)
      if (t6.dep.version !== t6.version || t6.dep.computed && (_r(t6.dep.computed) || t6.dep.version !== t6.version))
        return true;
    return !!e._dirty;
  }
  function _r(e) {
    if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === $t2) || (e.globalVersion = $t2, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Hn(e))))
      return;
    e.flags |= 2;
    const t6 = e.dep, n2 = Z3, s = Pe3;
    Z3 = e, Pe3 = true;
    try {
      pr(e);
      const r4 = e.fn(e._value);
      (t6.version === 0 || Ne3(r4, e._value)) && (e.flags |= 128, e._value = r4, t6.version++);
    } catch (r4) {
      throw t6.version++, r4;
    } finally {
      Z3 = n2, Pe3 = s, gr(e), e.flags &= -3;
    }
  }
  function as(e, t6 = false) {
    const { dep: n2, prevSub: s, nextSub: r4 } = e;
    if (s && (s.nextSub = r4, e.prevSub = void 0), r4 && (r4.prevSub = s, e.nextSub = void 0), n2.subs === e && (n2.subs = s, !s && n2.computed)) {
      n2.computed.flags &= -5;
      for (let o2 = n2.computed.deps; o2; o2 = o2.nextDep)
        as(o2, true);
    }
    !t6 && !--n2.sc && n2.map && n2.map.delete(n2.key);
  }
  function $o(e) {
    const { prevDep: t6, nextDep: n2 } = e;
    t6 && (t6.nextDep = n2, e.prevDep = void 0), n2 && (n2.prevDep = t6, e.nextDep = void 0);
  }
  function Ze2() {
    mr.push(Pe3), Pe3 = false;
  }
  function Xe3() {
    const e = mr.pop();
    Pe3 = e === void 0 ? true : e;
  }
  function Os(e) {
    const { cleanup: t6 } = e;
    if (e.cleanup = void 0, t6) {
      const n2 = Z3;
      Z3 = void 0;
      try {
        t6();
      } finally {
        Z3 = n2;
      }
    }
  }
  function yr(e) {
    if (e.dep.sc++, e.sub.flags & 4) {
      const t6 = e.dep.computed;
      if (t6 && !e.dep.subs) {
        t6.flags |= 20;
        for (let s = t6.deps; s; s = s.nextDep)
          yr(s);
      }
      const n2 = e.dep.subs;
      n2 !== e && (e.prevSub = n2, n2 && (n2.nextSub = e)), e.dep.subs = e;
    }
  }
  function ie4(e, t6, n2) {
    if (Pe3 && Z3) {
      let s = Nn.get(e);
      s || Nn.set(e, s = /* @__PURE__ */ new Map());
      let r4 = s.get(n2);
      r4 || (s.set(n2, r4 = new us()), r4.map = s, r4.key = n2), r4.track();
    }
  }
  function Ye2(e, t6, n2, s, r4, o2) {
    const i2 = Nn.get(e);
    if (!i2) {
      $t2++;
      return;
    }
    const l6 = (c4) => {
      c4 && c4.trigger();
    };
    if (cs(), t6 === "clear")
      i2.forEach(l6);
    else {
      const c4 = L2(e), d2 = c4 && os(n2);
      if (c4 && n2 === "length") {
        const a2 = Number(s);
        i2.forEach((h2, y) => {
          (y === "length" || y === Vt2 || !Ke3(y) && y >= a2) && l6(h2);
        });
      } else
        switch ((n2 !== void 0 || i2.has(void 0)) && l6(i2.get(n2)), d2 && l6(i2.get(Vt2)), t6) {
          case "add":
            c4 ? d2 && l6(i2.get("length")) : (l6(i2.get(at2)), _t2(e) && l6(i2.get(Un)));
            break;
          case "delete":
            c4 || (l6(i2.get(at2)), _t2(e) && l6(i2.get(Un)));
            break;
          case "set":
            _t2(e) && l6(i2.get(at2));
            break;
        }
    }
    fs();
  }
  function ht2(e) {
    const t6 = H5(e);
    return t6 === e ? t6 : (ie4(t6, "iterate", Vt2), Ee3(e) ? t6 : t6.map(Ie2));
  }
  function Tn(e) {
    return ie4(e = H5(e), "iterate", Vt2), e;
  }
  function Be3(e, t6) {
    return Qe2(e) ? vt2(ut2(e) ? Ie2(t6) : t6) : Ie2(t6);
  }
  function Fn(e, t6, n2) {
    const s = Tn(e), r4 = s[t6]();
    return s !== e && !Ee3(e) && (r4._next = r4.next, r4.next = () => {
      const o2 = r4._next();
      return o2.done || (o2.value = n2(o2.value)), o2;
    }), r4;
  }
  function Je2(e, t6, n2, s, r4, o2) {
    const i2 = Tn(e), l6 = i2 !== e && !Ee3(e), c4 = i2[t6];
    if (c4 !== Ho[t6]) {
      const h2 = c4.apply(e, o2);
      return l6 ? Ie2(h2) : h2;
    }
    let d2 = n2;
    i2 !== e && (l6 ? d2 = function(h2, y) {
      return n2.call(this, Be3(e, h2), y, e);
    } : n2.length > 2 && (d2 = function(h2, y) {
      return n2.call(this, h2, y, e);
    }));
    const a2 = c4.call(i2, d2, s);
    return l6 && r4 ? r4(a2) : a2;
  }
  function Is(e, t6, n2, s) {
    const r4 = Tn(e), o2 = r4 !== e && !Ee3(e);
    let i2 = n2, l6 = false;
    r4 !== e && (o2 ? (l6 = s.length === 0, i2 = function(d2, a2, h2) {
      return l6 && (l6 = false, d2 = Be3(e, d2)), n2.call(this, d2, Be3(e, a2), h2, e);
    }) : n2.length > 3 && (i2 = function(d2, a2, h2) {
      return n2.call(this, d2, a2, h2, e);
    }));
    const c4 = r4[t6](i2, ...s);
    return l6 ? Be3(e, c4) : c4;
  }
  function Dn(e, t6, n2) {
    const s = H5(e);
    ie4(s, "iterate", Vt2);
    const r4 = s[t6](...n2);
    return (r4 === -1 || r4 === false) && gs(n2[0]) ? (n2[0] = H5(n2[0]), s[t6](...n2)) : r4;
  }
  function Et2(e, t6, n2 = []) {
    Ze2(), cs();
    const s = H5(e)[t6].apply(e, n2);
    return fs(), Xe3(), s;
  }
  function Uo(e) {
    Ke3(e) || (e = String(e));
    const t6 = H5(this);
    return ie4(t6, "has", e), t6.hasOwnProperty(e);
  }
  function Go(e, t6, n2) {
    return function(...s) {
      const r4 = this.__v_raw, o2 = H5(r4), i2 = _t2(o2), l6 = e === "entries" || e === Symbol.iterator && i2, c4 = e === "keys" && i2, d2 = r4[e](...s), a2 = n2 ? Kn : t6 ? vt2 : Ie2;
      return !t6 && ie4(o2, "iterate", c4 ? Un : at2), fe3(Object.create(d2), { next() {
        const { value: h2, done: y } = d2.next();
        return y ? { value: h2, done: y } : { value: l6 ? [a2(h2[0]), a2(h2[1])] : a2(h2), done: y };
      } });
    };
  }
  function tn(e) {
    return function(...t6) {
      return e === "delete" ? false : e === "clear" ? void 0 : this;
    };
  }
  function Yo(e, t6) {
    const n2 = { get(r4) {
      const o2 = this.__v_raw, i2 = H5(o2), l6 = H5(r4);
      e || (Ne3(r4, l6) && ie4(i2, "get", r4), ie4(i2, "get", l6));
      const { has: c4 } = en(i2), d2 = t6 ? Kn : e ? vt2 : Ie2;
      if (c4.call(i2, r4))
        return d2(o2.get(r4));
      if (c4.call(i2, l6))
        return d2(o2.get(l6));
      o2 !== i2 && o2.get(r4);
    }, get size() {
      const r4 = this.__v_raw;
      return !e && ie4(H5(r4), "iterate", at2), r4.size;
    }, has(r4) {
      const o2 = this.__v_raw, i2 = H5(o2), l6 = H5(r4);
      return e || (Ne3(r4, l6) && ie4(i2, "has", r4), ie4(i2, "has", l6)), r4 === l6 ? o2.has(r4) : o2.has(r4) || o2.has(l6);
    }, forEach(r4, o2) {
      const i2 = this, l6 = i2.__v_raw, c4 = H5(l6), d2 = t6 ? Kn : e ? vt2 : Ie2;
      return !e && ie4(c4, "iterate", at2), l6.forEach((a2, h2) => r4.call(o2, d2(a2), d2(h2), i2));
    } };
    return fe3(n2, e ? { add: tn("add"), set: tn("set"), delete: tn("delete"), clear: tn("clear") } : { add(r4) {
      const o2 = H5(this), i2 = en(o2), l6 = H5(r4), c4 = !t6 && !Ee3(r4) && !Qe2(r4) ? l6 : r4;
      return i2.has.call(o2, c4) || Ne3(r4, c4) && i2.has.call(o2, r4) || Ne3(l6, c4) && i2.has.call(o2, l6) || (o2.add(c4), Ye2(o2, "add", c4, c4)), this;
    }, set(r4, o2) {
      !t6 && !Ee3(o2) && !Qe2(o2) && (o2 = H5(o2));
      const i2 = H5(this), { has: l6, get: c4 } = en(i2);
      let d2 = l6.call(i2, r4);
      d2 || (r4 = H5(r4), d2 = l6.call(i2, r4));
      const a2 = c4.call(i2, r4);
      return i2.set(r4, o2), d2 ? Ne3(o2, a2) && Ye2(i2, "set", r4, o2) : Ye2(i2, "add", r4, o2), this;
    }, delete(r4) {
      const o2 = H5(this), { has: i2, get: l6 } = en(o2);
      let c4 = i2.call(o2, r4);
      c4 || (r4 = H5(r4), c4 = i2.call(o2, r4)), l6 && l6.call(o2, r4);
      const d2 = o2.delete(r4);
      return c4 && Ye2(o2, "delete", r4, void 0), d2;
    }, clear() {
      const r4 = H5(this), o2 = r4.size !== 0, i2 = r4.clear();
      return o2 && Ye2(r4, "clear", void 0, void 0), i2;
    } }), ["keys", "values", "entries", Symbol.iterator].forEach((r4) => {
      n2[r4] = Go(r4, e, t6);
    }), n2;
  }
  function ds(e, t6) {
    const n2 = Yo(e, t6);
    return (s, r4, o2) => r4 === "__v_isReactive" ? !e : r4 === "__v_isReadonly" ? e : r4 === "__v_raw" ? s : Reflect.get(U(n2, r4) && r4 in s ? n2 : s, r4, o2);
  }
  function ei(e) {
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
  function ti(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : ei(So(e));
  }
  function hs(e) {
    return Qe2(e) ? e : ps(e, false, Wo, zo, wr);
  }
  function ni(e) {
    return ps(e, false, Jo, Zo, kr);
  }
  function Wn(e) {
    return ps(e, true, qo, Xo, Tr);
  }
  function ps(e, t6, n2, s, r4) {
    if (!W3(e) || e.__v_raw && !(t6 && e.__v_isReactive))
      return e;
    const o2 = ti(e);
    if (o2 === 0)
      return e;
    const i2 = r4.get(e);
    if (i2)
      return i2;
    const l6 = new Proxy(e, o2 === 2 ? s : n2);
    return r4.set(e, l6), l6;
  }
  function ut2(e) {
    return Qe2(e) ? ut2(e.__v_raw) : !!(e && e.__v_isReactive);
  }
  function Qe2(e) {
    return !!(e && e.__v_isReadonly);
  }
  function Ee3(e) {
    return !!(e && e.__v_isShallow);
  }
  function gs(e) {
    return e ? !!e.__v_raw : false;
  }
  function H5(e) {
    const t6 = e && e.__v_raw;
    return t6 ? H5(t6) : e;
  }
  function si(e) {
    return !U(e, "__v_skip") && Object.isExtensible(e) && cr(e, "__v_skip", true), e;
  }
  function ce5(e) {
    return e ? e.__v_isRef === true : false;
  }
  function Oe(e) {
    return Sr(e, false);
  }
  function Sr(e, t6) {
    return ce5(e) ? e : new ri(e, t6);
  }
  function ee(e) {
    return ce5(e) ? e.value : e;
  }
  function Er(e) {
    return ut2(e) ? e : new Proxy(e, oi);
  }
  function li(e, t6, n2 = false) {
    let s, r4;
    return $(e) ? s = e : (s = e.get, r4 = e.set), new ii(s, r4, n2);
  }
  function ci(e, t6 = false, n2 = ct2) {
    if (n2) {
      let s = dn.get(n2);
      s || dn.set(n2, s = []), s.push(e);
    }
  }
  function fi(e, t6, n2 = J4) {
    const { immediate: s, deep: r4, once: o2, scheduler: i2, augmentJob: l6, call: c4 } = n2, d2 = (C2) => r4 ? C2 : Ee3(C2) || r4 === false || r4 === 0 ? ze2(C2, 1) : ze2(C2);
    let a2, h2, y, w3, T2 = false, v2 = false;
    if (ce5(e) ? (h2 = () => e.value, T2 = Ee3(e)) : ut2(e) ? (h2 = () => d2(e), T2 = true) : L2(e) ? (v2 = true, T2 = e.some((C2) => ut2(C2) || Ee3(C2)), h2 = () => e.map((C2) => {
      if (ce5(C2))
        return C2.value;
      if (ut2(C2))
        return d2(C2);
      if ($(C2))
        return c4 ? c4(C2, 2) : C2();
    })) : $(e) ? t6 ? h2 = c4 ? () => c4(e, 2) : e : h2 = () => {
      if (y) {
        Ze2();
        try {
          y();
        } finally {
          Xe3();
        }
      }
      const C2 = ct2;
      ct2 = a2;
      try {
        return c4 ? c4(e, 3, [w3]) : e(w3);
      } finally {
        ct2 = C2;
      }
    } : h2 = Ue2, t6 && r4) {
      const C2 = h2, V4 = r4 === true ? 1 / 0 : r4;
      h2 = () => ze2(C2(), V4);
    }
    const F3 = jo(), I2 = () => {
      a2.stop(), F3 && F3.active && rs(F3.effects, a2);
    };
    if (o2 && t6) {
      const C2 = t6;
      t6 = (...V4) => {
        C2(...V4), I2();
      };
    }
    let P3 = v2 ? new Array(e.length).fill(nn) : nn;
    const M2 = (C2) => {
      if (!(!(a2.flags & 1) || !a2.dirty && !C2))
        if (t6) {
          const V4 = a2.run();
          if (r4 || T2 || (v2 ? V4.some((G3, te5) => Ne3(G3, P3[te5])) : Ne3(V4, P3))) {
            y && y();
            const G3 = ct2;
            ct2 = a2;
            try {
              const te5 = [V4, P3 === nn ? void 0 : v2 && P3[0] === nn ? [] : P3, w3];
              P3 = V4, c4 ? c4(t6, 3, te5) : t6(...te5);
            } finally {
              ct2 = G3;
            }
          }
        } else
          a2.run();
    };
    return l6 && l6(M2), a2 = new ur(h2), a2.scheduler = i2 ? () => i2(M2, false) : M2, w3 = (C2) => ci(C2, false, a2), y = a2.onStop = () => {
      const C2 = dn.get(a2);
      if (C2) {
        if (c4)
          c4(C2, 4);
        else
          for (const V4 of C2)
            V4();
        dn.delete(a2);
      }
    }, t6 ? s ? M2(true) : P3 = a2.run() : i2 ? i2(M2.bind(null, true), true) : a2.run(), I2.pause = a2.pause.bind(a2), I2.resume = a2.resume.bind(a2), I2.stop = I2, I2;
  }
  function ze2(e, t6 = 1 / 0, n2) {
    if (t6 <= 0 || !W3(e) || e.__v_skip || (n2 = n2 || /* @__PURE__ */ new Map(), (n2.get(e) || 0) >= t6))
      return e;
    if (n2.set(e, t6), t6--, ce5(e))
      ze2(e.value, t6, n2);
    else if (L2(e))
      for (let s = 0; s < e.length; s++)
        ze2(e[s], t6, n2);
    else if (rr(e) || _t2(e))
      e.forEach((s) => {
        ze2(s, t6, n2);
      });
    else if (lr(e)) {
      for (const s in e)
        ze2(e[s], t6, n2);
      for (const s of Object.getOwnPropertySymbols(e))
        Object.prototype.propertyIsEnumerable.call(e, s) && ze2(e[s], t6, n2);
    }
    return e;
  }
  function Gt2(e, t6, n2, s) {
    try {
      return s ? e(...s) : e();
    } catch (r4) {
      Yt(r4, t6, n2);
    }
  }
  function qe2(e, t6, n2, s) {
    if ($(e)) {
      const r4 = Gt2(e, t6, n2, s);
      return r4 && or(r4) && r4.catch((o2) => {
        Yt(o2, t6, n2);
      }), r4;
    }
    if (L2(e)) {
      const r4 = [];
      for (let o2 = 0; o2 < e.length; o2++)
        r4.push(qe2(e[o2], t6, n2, s));
      return r4;
    }
  }
  function Yt(e, t6, n2, s = true) {
    const r4 = t6 ? t6.vnode : null, { errorHandler: o2, throwUnhandledErrorInProduction: i2 } = t6 && t6.appContext.config || J4;
    if (t6) {
      let l6 = t6.parent;
      const c4 = t6.proxy, d2 = `https://vuejs.org/error-reference/#runtime-${n2}`;
      for (; l6; ) {
        const a2 = l6.ec;
        if (a2) {
          for (let h2 = 0; h2 < a2.length; h2++)
            if (a2[h2](e, c4, d2) === false)
              return;
        }
        l6 = l6.parent;
      }
      if (o2) {
        Ze2(), Gt2(o2, null, 10, [e, c4, d2]), Xe3();
        return;
      }
    }
    ai(e, n2, r4, s, i2);
  }
  function ai(e, t6, n2, s = true, r4 = false) {
    if (r4)
      throw e;
    console.error(e);
  }
  function ui(e) {
    const t6 = hn || Ar;
    return e ? t6.then(this ? e.bind(this) : e) : t6;
  }
  function di(e) {
    let t6 = $e5 + 1, n2 = he4.length;
    for (; t6 < n2; ) {
      const s = t6 + n2 >>> 1, r4 = he4[s], o2 = Bt2(r4);
      o2 < e || o2 === e && r4.flags & 2 ? t6 = s + 1 : n2 = s;
    }
    return t6;
  }
  function _s(e) {
    if (!(e.flags & 1)) {
      const t6 = Bt2(e), n2 = he4[he4.length - 1];
      !n2 || !(e.flags & 2) && t6 >= Bt2(n2) ? he4.push(e) : he4.splice(di(t6), 0, e), e.flags |= 1, Cr();
    }
  }
  function Cr() {
    hn || (hn = Ar.then(Or));
  }
  function hi(e) {
    L2(e) ? mt2.push(...e) : tt2 && e.id === -1 ? tt2.splice(pt2 + 1, 0, e) : e.flags & 1 || (mt2.push(e), e.flags |= 1), Cr();
  }
  function Rs(e, t6, n2 = $e5 + 1) {
    for (; n2 < he4.length; n2++) {
      const s = he4[n2];
      if (s && s.flags & 2) {
        if (e && s.id !== e.uid)
          continue;
        he4.splice(n2, 1), n2--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
      }
    }
  }
  function Pr(e) {
    if (mt2.length) {
      const t6 = [...new Set(mt2)].sort((n2, s) => Bt2(n2) - Bt2(s));
      if (mt2.length = 0, tt2) {
        tt2.push(...t6);
        return;
      }
      for (tt2 = t6, pt2 = 0; pt2 < tt2.length; pt2++) {
        const n2 = tt2[pt2];
        n2.flags & 4 && (n2.flags &= -2), n2.flags & 8 || n2(), n2.flags &= -2;
      }
      tt2 = null, pt2 = 0;
    }
  }
  function Or(e) {
    try {
      for ($e5 = 0; $e5 < he4.length; $e5++) {
        const t6 = he4[$e5];
        t6 && !(t6.flags & 8) && (t6.flags & 4 && (t6.flags &= -2), Gt2(t6, t6.i, t6.i ? 15 : 14), t6.flags & 4 || (t6.flags &= -2));
      }
    } finally {
      for (; $e5 < he4.length; $e5++) {
        const t6 = he4[$e5];
        t6 && (t6.flags &= -2);
      }
      $e5 = -1, he4.length = 0, Pr(), hn = null, (he4.length || mt2.length) && Or();
    }
  }
  function pn(e) {
    const t6 = re3;
    return re3 = e, Ir = e && e.type.__scopeId || null, t6;
  }
  function pi(e, t6 = re3, n2) {
    if (!t6 || e._n)
      return e;
    const s = (...r4) => {
      s._d && yn(-1);
      const o2 = pn(t6);
      let i2;
      try {
        i2 = e(...r4);
      } finally {
        pn(o2), s._d && yn(1);
      }
      return i2;
    };
    return s._n = true, s._c = true, s._d = true, s;
  }
  function sc(e, t6) {
    if (re3 === null)
      return e;
    const n2 = Cn(re3), s = e.dirs || (e.dirs = []);
    for (let r4 = 0; r4 < t6.length; r4++) {
      let [o2, i2, l6, c4 = J4] = t6[r4];
      o2 && ($(o2) && (o2 = { mounted: o2, updated: o2 }), o2.deep && ze2(i2), s.push({ dir: o2, instance: n2, value: i2, oldValue: void 0, arg: l6, modifiers: c4 }));
    }
    return e;
  }
  function it2(e, t6, n2, s) {
    const r4 = e.dirs, o2 = t6 && t6.dirs;
    for (let i2 = 0; i2 < r4.length; i2++) {
      const l6 = r4[i2];
      o2 && (l6.oldValue = o2[i2].value);
      let c4 = l6.dir[s];
      c4 && (Ze2(), qe2(c4, n2, 8, [e.el, l6, e, t6]), Xe3());
    }
  }
  function gi(e, t6) {
    if (se3) {
      let n2 = se3.provides;
      const s = se3.parent && se3.parent.provides;
      s === n2 && (n2 = se3.provides = Object.create(s)), n2[e] = t6;
    }
  }
  function cn(e, t6, n2 = false) {
    const s = ho();
    if (s || bt2) {
      let r4 = bt2 ? bt2._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
      if (r4 && e in r4)
        return r4[e];
      if (arguments.length > 1)
        return n2 && $(t6) ? t6.call(s && s.proxy) : t6;
    }
  }
  function Ln(e, t6, n2) {
    return Rr(e, t6, n2);
  }
  function Rr(e, t6, n2 = J4) {
    const { immediate: s, deep: r4, flush: o2, once: i2 } = n2, l6 = fe3({}, n2), c4 = t6 && s || !t6 && o2 !== "post";
    let d2;
    if (xt2) {
      if (o2 === "sync") {
        const w3 = mi();
        d2 = w3.__watcherHandles || (w3.__watcherHandles = []);
      } else if (!c4) {
        const w3 = () => {
        };
        return w3.stop = Ue2, w3.resume = Ue2, w3.pause = Ue2, w3;
      }
    }
    const a2 = se3;
    l6.call = (w3, T2, v2) => qe2(w3, a2, T2, v2);
    let h2 = false;
    o2 === "post" ? l6.scheduler = (w3) => {
      oe3(w3, a2 && a2.suspense);
    } : o2 !== "sync" && (h2 = true, l6.scheduler = (w3, T2) => {
      T2 ? w3() : _s(w3);
    }), l6.augmentJob = (w3) => {
      t6 && (w3.flags |= 4), h2 && (w3.flags |= 2, a2 && (w3.id = a2.uid, w3.i = a2));
    };
    const y = fi(e, t6, l6);
    return xt2 && (d2 ? d2.push(y) : c4 && y()), y;
  }
  function yi(e, t6, n2) {
    const s = this.proxy, r4 = ne3(e) ? e.includes(".") ? Mr(s, e) : () => s[e] : e.bind(s, s);
    let o2;
    $(t6) ? o2 = t6 : (o2 = t6.handler, n2 = t6);
    const i2 = Zt(this), l6 = Rr(r4, o2.bind(s), n2);
    return i2(), l6;
  }
  function Mr(e, t6) {
    const n2 = t6.split(".");
    return () => {
      let s = e;
      for (let r4 = 0; r4 < n2.length && s; r4++)
        s = s[n2[r4]];
      return s;
    };
  }
  function sn(e, t6, n2, { o: { insert: s }, m: r4 }, o2 = 2) {
    o2 === 0 && s(e.targetAnchor, t6, n2);
    const { el: i2, anchor: l6, shapeFlag: c4, children: d2, props: a2 } = e, h2 = o2 === 2;
    if (h2 && s(i2, t6, n2), (!h2 || Mt2(a2)) && c4 & 16)
      for (let y = 0; y < d2.length; y++)
        r4(d2[y], t6, n2, 2);
    h2 && s(l6, t6, n2);
  }
  function bi(e, t6, n2, s, r4, o2, { o: { nextSibling: i2, parentNode: l6, querySelector: c4, insert: d2, createText: a2 } }, h2) {
    function y(F3, I2) {
      let P3 = I2;
      for (; P3; ) {
        if (P3 && P3.nodeType === 8) {
          if (P3.data === "teleport start anchor")
            t6.targetStart = P3;
          else if (P3.data === "teleport anchor") {
            t6.targetAnchor = P3, F3._lpa = t6.targetAnchor && i2(t6.targetAnchor);
            break;
          }
        }
        P3 = i2(P3);
      }
    }
    function w3(F3, I2) {
      I2.anchor = h2(i2(F3), I2, l6(F3), n2, s, r4, o2);
    }
    const T2 = t6.target = qn(t6.props, c4), v2 = Mt2(t6.props);
    if (T2) {
      const F3 = T2._lpa || T2.firstChild;
      t6.shapeFlag & 16 && (v2 ? (w3(e, t6), y(T2, F3), t6.targetAnchor || Jn(T2, t6, a2, d2, l6(e) === T2 ? e : null)) : (t6.anchor = i2(e), y(T2, F3), t6.targetAnchor || Jn(T2, t6, a2, d2), h2(F3 && i2(F3), t6, T2, n2, s, r4, o2))), fn(t6, v2);
    } else
      v2 && t6.shapeFlag & 16 && (w3(e, t6), t6.targetStart = e, t6.targetAnchor = i2(e));
    return t6.anchor && i2(t6.anchor);
  }
  function fn(e, t6) {
    const n2 = e.ctx;
    if (n2 && n2.ut) {
      let s, r4;
      for (t6 ? (s = e.el, r4 = e.anchor) : (s = e.targetStart, r4 = e.targetAnchor); s && s !== r4; )
        s.nodeType === 1 && s.setAttribute("data-v-owner", n2.uid), s = s.nextSibling;
      n2.ut();
    }
  }
  function Jn(e, t6, n2, s, r4 = null) {
    const o2 = t6.targetStart = n2(""), i2 = t6.targetAnchor = n2("");
    return o2[Fr] = i2, e && (s(o2, e, r4), s(i2, e, r4)), i2;
  }
  function vi() {
    const e = { isMounted: false, isLeaving: false, isUnmounting: false, leavingVNodes: /* @__PURE__ */ new Map() };
    return Dt(() => {
      e.isMounted = true;
    }), Nr(() => {
      e.isUnmounting = true;
    }), e;
  }
  function $r(e) {
    let t6 = e[0];
    if (e.length > 1) {
      for (const n2 of e)
        if (n2.type !== le3) {
          t6 = n2;
          break;
        }
    }
    return t6;
  }
  function Vr(e, t6) {
    const { leavingVNodes: n2 } = e;
    let s = n2.get(t6.type);
    return s || (s = /* @__PURE__ */ Object.create(null), n2.set(t6.type, s)), s;
  }
  function Gn(e, t6, n2, s, r4) {
    const { appear: o2, mode: i2, persisted: l6 = false, onBeforeEnter: c4, onEnter: d2, onAfterEnter: a2, onEnterCancelled: h2, onBeforeLeave: y, onLeave: w3, onAfterLeave: T2, onLeaveCancelled: v2, onBeforeAppear: F3, onAppear: I2, onAfterAppear: P3, onAppearCancelled: M2 } = t6, C2 = String(e.key), V4 = Vr(n2, e), G3 = (A3, j3) => {
      A3 && qe2(A3, s, 9, j3);
    }, te5 = (A3, j3) => {
      const N2 = j3[1];
      G3(A3, j3), L2(A3) ? A3.every((ae5) => ae5.length <= 1) && N2() : A3.length <= 1 && N2();
    }, Q4 = { mode: i2, persisted: l6, beforeEnter(A3) {
      let j3 = c4;
      if (!n2.isMounted)
        if (o2)
          j3 = F3 || c4;
        else
          return;
      A3[Ve3] && A3[Ve3](true);
      const N2 = V4[C2];
      N2 && ft2(e, N2) && N2.el[Ve3] && N2.el[Ve3](), G3(j3, [A3]);
    }, enter(A3) {
      if (V4[C2] === e)
        return;
      let j3 = d2, N2 = a2, ae5 = h2;
      if (!n2.isMounted)
        if (o2)
          j3 = I2 || d2, N2 = P3 || a2, ae5 = M2 || h2;
        else
          return;
      let be4 = false;
      A3[At2] = (dt3) => {
        be4 || (be4 = true, dt3 ? G3(ae5, [A3]) : G3(N2, [A3]), Q4.delayedLeave && Q4.delayedLeave(), A3[At2] = void 0);
      };
      const Re4 = A3[At2].bind(null, false);
      j3 ? te5(j3, [A3, Re4]) : Re4();
    }, leave(A3, j3) {
      const N2 = String(e.key);
      if (A3[At2] && A3[At2](true), n2.isUnmounting)
        return j3();
      G3(y, [A3]);
      let ae5 = false;
      A3[Ve3] = (Re4) => {
        ae5 || (ae5 = true, j3(), Re4 ? G3(v2, [A3]) : G3(T2, [A3]), A3[Ve3] = void 0, V4[N2] === e && delete V4[N2]);
      };
      const be4 = A3[Ve3].bind(null, false);
      V4[N2] = e, w3 ? te5(w3, [A3, be4]) : be4();
    }, clone(A3) {
      const j3 = Gn(A3, t6, n2, s, r4);
      return r4 && r4(j3), j3;
    } };
    return Q4;
  }
  function jn(e) {
    if (zt2(e))
      return e = st2(e), e.children = null, e;
  }
  function Ls(e) {
    if (!zt2(e))
      return Dr(e.type) && e.children ? $r(e.children) : e;
    if (e.component)
      return e.component.subTree;
    const { shapeFlag: t6, children: n2 } = e;
    if (n2) {
      if (t6 & 16)
        return n2[0];
      if (t6 & 32 && $(n2.default))
        return n2.default();
    }
  }
  function Ht2(e, t6) {
    e.shapeFlag & 6 && e.component ? (e.transition = t6, Ht2(e.component.subTree, t6)) : e.shapeFlag & 128 ? (e.ssContent.transition = t6.clone(e.ssContent), e.ssFallback.transition = t6.clone(e.ssFallback)) : e.transition = t6;
  }
  function Br(e, t6 = false, n2) {
    let s = [], r4 = 0;
    for (let o2 = 0; o2 < e.length; o2++) {
      let i2 = e[o2];
      const l6 = n2 == null ? i2.key : String(n2) + String(i2.key != null ? i2.key : o2);
      i2.type === me ? (i2.patchFlag & 128 && r4++, s = s.concat(Br(i2.children, t6, l6))) : (t6 || i2.type !== le3) && s.push(l6 != null ? st2(i2, { key: l6 }) : i2);
    }
    if (r4 > 1)
      for (let o2 = 0; o2 < s.length; o2++)
        s[o2].patchFlag = -2;
    return s;
  }
  function ms(e, t6) {
    return $(e) ? fe3({ name: e.name }, t6, { setup: e }) : e;
  }
  function ys(e) {
    e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
  }
  function js(e, t6) {
    let n2;
    return !!((n2 = Object.getOwnPropertyDescriptor(e, t6)) && !n2.configurable);
  }
  function Ft2(e, t6, n2, s, r4 = false) {
    if (L2(e)) {
      e.forEach((v2, F3) => Ft2(v2, t6 && (L2(t6) ? t6[F3] : t6), n2, s, r4));
      return;
    }
    if (yt2(s) && !r4) {
      s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Ft2(e, t6, n2, s.component.subTree);
      return;
    }
    const o2 = s.shapeFlag & 4 ? Cn(s.component) : s.el, i2 = r4 ? null : o2, { i: l6, r: c4 } = e, d2 = t6 && t6.r, a2 = l6.refs === J4 ? l6.refs = {} : l6.refs, h2 = l6.setupState, y = H5(h2), w3 = h2 === J4 ? nr : (v2) => js(a2, v2) ? false : U(y, v2), T2 = (v2, F3) => !(F3 && js(a2, F3));
    if (d2 != null && d2 !== c4) {
      if ($s(t6), ne3(d2))
        a2[d2] = null, w3(d2) && (h2[d2] = null);
      else if (ce5(d2)) {
        const v2 = t6;
        T2(d2, v2.k) && (d2.value = null), v2.k && (a2[v2.k] = null);
      }
    }
    if ($(c4))
      Gt2(c4, l6, 12, [i2, a2]);
    else {
      const v2 = ne3(c4), F3 = ce5(c4);
      if (v2 || F3) {
        const I2 = () => {
          if (e.f) {
            const P3 = v2 ? w3(c4) ? h2[c4] : a2[c4] : T2() || !e.k ? c4.value : a2[e.k];
            if (r4)
              L2(P3) && rs(P3, o2);
            else if (L2(P3))
              P3.includes(o2) || P3.push(o2);
            else if (v2)
              a2[c4] = [o2], w3(c4) && (h2[c4] = a2[c4]);
            else {
              const M2 = [o2];
              T2(c4, e.k) && (c4.value = M2), e.k && (a2[e.k] = M2);
            }
          } else
            v2 ? (a2[c4] = i2, w3(c4) && (h2[c4] = i2)) : F3 && (T2(c4, e.k) && (c4.value = i2), e.k && (a2[e.k] = i2));
        };
        if (i2) {
          const P3 = () => {
            I2(), gn.delete(e);
          };
          P3.id = -1, gn.set(e, P3), oe3(P3, n2);
        } else
          $s(e), I2();
      }
    }
  }
  function $s(e) {
    const t6 = gn.get(e);
    t6 && (t6.flags |= 8, gn.delete(e));
  }
  function ki(e, t6) {
    if (Vs(e) && e.data === "[") {
      let n2 = 1, s = e.nextSibling;
      for (; s; ) {
        if (s.nodeType === 1) {
          if (t6(s) === false)
            break;
        } else if (Vs(s))
          if (s.data === "]") {
            if (--n2 === 0)
              break;
          } else
            s.data === "[" && n2++;
        s = s.nextSibling;
      }
    } else
      t6(e);
  }
  function Ae2(e) {
    $(e) && (e = { loader: e });
    const { loader: t6, loadingComponent: n2, errorComponent: s, delay: r4 = 200, hydrate: o2, timeout: i2, suspensible: l6 = true, onError: c4 } = e;
    let d2 = null, a2, h2 = 0;
    const y = () => (h2++, d2 = null, w3()), w3 = () => {
      let T2;
      return d2 || (T2 = d2 = t6().catch((v2) => {
        if (v2 = v2 instanceof Error ? v2 : new Error(String(v2)), c4)
          return new Promise((F3, I2) => {
            c4(v2, () => F3(y()), () => I2(v2), h2 + 1);
          });
        throw v2;
      }).then((v2) => T2 !== d2 && d2 ? d2 : (v2 && (v2.__esModule || v2[Symbol.toStringTag] === "Module") && (v2 = v2.default), a2 = v2, v2)));
    };
    return ms({ name: "AsyncComponentWrapper", __asyncLoader: w3, __asyncHydrate(T2, v2, F3) {
      let I2 = false;
      (v2.bu || (v2.bu = [])).push(() => I2 = true);
      const P3 = () => {
        I2 || F3();
      }, M2 = o2 ? () => {
        const C2 = o2(P3, (V4) => ki(T2, V4));
        C2 && (v2.bum || (v2.bum = [])).push(C2);
      } : P3;
      a2 ? M2() : w3().then(() => !v2.isUnmounted && M2());
    }, get __asyncResolved() {
      return a2;
    }, setup() {
      const T2 = se3;
      if (ys(T2), a2)
        return () => rn(a2, T2);
      const v2 = (M2) => {
        d2 = null, Yt(M2, T2, 13, !s);
      };
      if (l6 && T2.suspense || xt2)
        return w3().then((M2) => () => rn(M2, T2)).catch((M2) => (v2(M2), () => s ? q(s, { error: M2 }) : null));
      const F3 = Oe(false), I2 = Oe(), P3 = Oe(!!r4);
      return r4 && setTimeout(() => {
        P3.value = false;
      }, r4), i2 != null && setTimeout(() => {
        if (!F3.value && !I2.value) {
          const M2 = new Error(`Async component timed out after ${i2}ms.`);
          v2(M2), I2.value = M2;
        }
      }, i2), w3().then(() => {
        F3.value = true, T2.parent && zt2(T2.parent.vnode) && T2.parent.update();
      }).catch((M2) => {
        v2(M2), I2.value = M2;
      }), () => {
        if (F3.value && a2)
          return rn(a2, T2);
        if (I2.value && s)
          return q(s, { error: I2.value });
        if (n2 && !P3.value)
          return rn(n2, T2);
      };
    } });
  }
  function rn(e, t6) {
    const { ref: n2, props: s, children: r4, ce: o2 } = t6.vnode, i2 = q(e, s, r4);
    return i2.ref = n2, i2.ce = o2, delete t6.vnode.ce, i2;
  }
  function Ti(e, t6) {
    Hr(e, "a", t6);
  }
  function Si(e, t6) {
    Hr(e, "da", t6);
  }
  function Hr(e, t6, n2 = se3) {
    const s = e.__wdc || (e.__wdc = () => {
      let r4 = n2;
      for (; r4; ) {
        if (r4.isDeactivated)
          return;
        r4 = r4.parent;
      }
      return e();
    });
    if (Sn(t6, s, n2), n2) {
      let r4 = n2.parent;
      for (; r4 && r4.parent; )
        zt2(r4.parent.vnode) && Ei(s, t6, n2, r4), r4 = r4.parent;
    }
  }
  function Ei(e, t6, n2, s) {
    const r4 = Sn(t6, e, s, true);
    _n(() => {
      rs(s[t6], r4);
    }, n2);
  }
  function Sn(e, t6, n2 = se3, s = false) {
    if (n2) {
      const r4 = n2[e] || (n2[e] = []), o2 = t6.__weh || (t6.__weh = (...i2) => {
        Ze2();
        const l6 = Zt(n2), c4 = qe2(t6, n2, e, i2);
        return l6(), Xe3(), c4;
      });
      return s ? r4.unshift(o2) : r4.push(o2), o2;
    }
  }
  function Ur(e, t6 = se3) {
    Sn("ec", e, t6);
  }
  function cc(e, t6, n2, s) {
    let r4;
    const o2 = n2, i2 = L2(e);
    if (i2 || ne3(e)) {
      const l6 = i2 && ut2(e);
      let c4 = false, d2 = false;
      l6 && (c4 = !Ee3(e), d2 = Qe2(e), e = Tn(e)), r4 = new Array(e.length);
      for (let a2 = 0, h2 = e.length; a2 < h2; a2++)
        r4[a2] = t6(c4 ? d2 ? vt2(Ie2(e[a2])) : Ie2(e[a2]) : e[a2], a2, void 0, o2);
    } else if (typeof e == "number") {
      r4 = new Array(e);
      for (let l6 = 0; l6 < e; l6++)
        r4[l6] = t6(l6 + 1, l6, void 0, o2);
    } else if (W3(e))
      if (e[Symbol.iterator])
        r4 = Array.from(e, (l6, c4) => t6(l6, c4, void 0, o2));
      else {
        const l6 = Object.keys(e);
        r4 = new Array(l6.length);
        for (let c4 = 0, d2 = l6.length; c4 < d2; c4++) {
          const a2 = l6[c4];
          r4[c4] = t6(e[a2], a2, c4, o2);
        }
      }
    else
      r4 = [];
    return r4;
  }
  function fc(e, t6, n2 = {}, s, r4) {
    if (re3.ce || re3.parent && yt2(re3.parent) && re3.parent.ce) {
      const d2 = Object.keys(n2).length > 0;
      return t6 !== "default" && (n2.name = t6), Se(), nt(me, null, [q("slot", n2, s)], d2 ? -2 : 64);
    }
    let o2 = e[t6];
    o2 && o2._c && (o2._d = false), Se();
    const i2 = o2 && Jr(o2(n2)), l6 = n2.key || i2 && i2.key, c4 = nt(me, { key: (l6 && !Ke3(l6) ? l6 : `_${t6}`) + (!i2 && s ? "_fb" : "") }, i2 || [], i2 && e._ === 1 ? 64 : -2);
    return !r4 && c4.scopeId && (c4.slotScopeIds = [c4.scopeId + "-s"]), o2 && o2._c && (o2._d = true), c4;
  }
  function Jr(e) {
    return e.some((t6) => Ut2(t6) ? !(t6.type === le3 || t6.type === me && !Jr(t6.children)) : true) ? e : null;
  }
  function Hs(e) {
    return L2(e) ? e.reduce((t6, n2) => (t6[n2] = null, t6), {}) : e;
  }
  function Fi(e) {
    const t6 = Yr(e), n2 = e.proxy, s = e.ctx;
    zn = false, t6.beforeCreate && Ns(t6.beforeCreate, e, "bc");
    const { data: r4, computed: o2, methods: i2, watch: l6, provide: c4, inject: d2, created: a2, beforeMount: h2, mounted: y, beforeUpdate: w3, updated: T2, activated: v2, deactivated: F3, beforeDestroy: I2, beforeUnmount: P3, destroyed: M2, unmounted: C2, render: V4, renderTracked: G3, renderTriggered: te5, errorCaptured: Q4, serverPrefetch: A3, expose: j3, inheritAttrs: N2, components: ae5, directives: be4, filters: Re4 } = t6;
    if (d2 && Di(d2, s, null), i2)
      for (const X4 in i2) {
        const Y3 = i2[X4];
        $(Y3) && (s[X4] = Y3.bind(n2));
      }
    if (r4) {
      const X4 = r4.call(n2, n2);
      W3(X4) && (e.data = hs(X4));
    }
    if (zn = true, o2)
      for (const X4 in o2) {
        const Y3 = o2[X4], rt3 = $(Y3) ? Y3.bind(n2, n2) : $(Y3.get) ? Y3.get.bind(n2, n2) : Ue2, Xt2 = !$(Y3) && $(Y3.set) ? Y3.set.bind(n2) : Ue2, ot3 = Te({ get: rt3, set: Xt2 });
        Object.defineProperty(s, X4, { enumerable: true, configurable: true, get: () => ot3.value, set: (Me3) => ot3.value = Me3 });
      }
    if (l6)
      for (const X4 in l6)
        Gr(l6[X4], s, n2, X4);
    if (c4) {
      const X4 = $(c4) ? c4.call(n2) : c4;
      Reflect.ownKeys(X4).forEach((Y3) => {
        gi(Y3, X4[Y3]);
      });
    }
    a2 && Ns(a2, e, "c");
    function ue5(X4, Y3) {
      L2(Y3) ? Y3.forEach((rt3) => X4(rt3.bind(n2))) : Y3 && X4(Y3.bind(n2));
    }
    if (ue5(Ai, h2), ue5(Dt, y), ue5(Ci, w3), ue5(Pi, T2), ue5(Ti, v2), ue5(Si, F3), ue5(Ur, Q4), ue5(Ri, G3), ue5(Ii, te5), ue5(Nr, P3), ue5(_n, C2), ue5(Oi, A3), L2(j3))
      if (j3.length) {
        const X4 = e.exposed || (e.exposed = {});
        j3.forEach((Y3) => {
          Object.defineProperty(X4, Y3, { get: () => n2[Y3], set: (rt3) => n2[Y3] = rt3, enumerable: true });
        });
      } else
        e.exposed || (e.exposed = {});
    V4 && e.render === Ue2 && (e.render = V4), N2 != null && (e.inheritAttrs = N2), ae5 && (e.components = ae5), be4 && (e.directives = be4), A3 && ys(e);
  }
  function Di(e, t6, n2 = Ue2) {
    L2(e) && (e = Zn(e));
    for (const s in e) {
      const r4 = e[s];
      let o2;
      W3(r4) ? "default" in r4 ? o2 = cn(r4.from || s, r4.default, true) : o2 = cn(r4.from || s) : o2 = cn(r4), ce5(o2) ? Object.defineProperty(t6, s, { enumerable: true, configurable: true, get: () => o2.value, set: (i2) => o2.value = i2 }) : t6[s] = o2;
    }
  }
  function Ns(e, t6, n2) {
    qe2(L2(e) ? e.map((s) => s.bind(t6.proxy)) : e.bind(t6.proxy), t6, n2);
  }
  function Gr(e, t6, n2, s) {
    let r4 = s.includes(".") ? Mr(n2, s) : () => n2[s];
    if (ne3(e)) {
      const o2 = t6[e];
      $(o2) && Ln(r4, o2);
    } else if ($(e))
      Ln(r4, e.bind(n2));
    else if (W3(e))
      if (L2(e))
        e.forEach((o2) => Gr(o2, t6, n2, s));
      else {
        const o2 = $(e.handler) ? e.handler.bind(n2) : t6[e.handler];
        $(o2) && Ln(r4, o2, e);
      }
  }
  function Yr(e) {
    const t6 = e.type, { mixins: n2, extends: s } = t6, { mixins: r4, optionsCache: o2, config: { optionMergeStrategies: i2 } } = e.appContext, l6 = o2.get(t6);
    let c4;
    return l6 ? c4 = l6 : !r4.length && !n2 && !s ? c4 = t6 : (c4 = {}, r4.length && r4.forEach((d2) => mn(c4, d2, i2, true)), mn(c4, t6, i2)), W3(t6) && o2.set(t6, c4), c4;
  }
  function mn(e, t6, n2, s = false) {
    const { mixins: r4, extends: o2 } = t6;
    o2 && mn(e, o2, n2, true), r4 && r4.forEach((i2) => mn(e, i2, n2, true));
    for (const i2 in t6)
      if (!(s && i2 === "expose")) {
        const l6 = Li[i2] || n2 && n2[i2];
        e[i2] = l6 ? l6(e[i2], t6[i2]) : t6[i2];
      }
    return e;
  }
  function Us(e, t6) {
    return t6 ? e ? function() {
      return fe3($(e) ? e.call(this, this) : e, $(t6) ? t6.call(this, this) : t6);
    } : t6 : e;
  }
  function ji(e, t6) {
    return Pt2(Zn(e), Zn(t6));
  }
  function Zn(e) {
    if (L2(e)) {
      const t6 = {};
      for (let n2 = 0; n2 < e.length; n2++)
        t6[e[n2]] = e[n2];
      return t6;
    }
    return e;
  }
  function de4(e, t6) {
    return e ? [...new Set([].concat(e, t6))] : t6;
  }
  function Pt2(e, t6) {
    return e ? fe3(/* @__PURE__ */ Object.create(null), e, t6) : t6;
  }
  function Ks(e, t6) {
    return e ? L2(e) && L2(t6) ? [.../* @__PURE__ */ new Set([...e, ...t6])] : fe3(/* @__PURE__ */ Object.create(null), Hs(e), Hs(t6 != null ? t6 : {})) : t6;
  }
  function $i(e, t6) {
    if (!e)
      return t6;
    if (!t6)
      return e;
    const n2 = fe3(/* @__PURE__ */ Object.create(null), e);
    for (const s in t6)
      n2[s] = de4(e[s], t6[s]);
    return n2;
  }
  function zr() {
    return { app: null, config: { isNativeTag: nr, performance: false, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: /* @__PURE__ */ Object.create(null), optionsCache: /* @__PURE__ */ new WeakMap(), propsCache: /* @__PURE__ */ new WeakMap(), emitsCache: /* @__PURE__ */ new WeakMap() };
  }
  function Bi(e, t6) {
    return function(s, r4 = null) {
      $(s) || (s = fe3({}, s)), r4 != null && !W3(r4) && (r4 = null);
      const o2 = zr(), i2 = /* @__PURE__ */ new WeakSet(), l6 = [];
      let c4 = false;
      const d2 = o2.app = { _uid: Vi++, _component: s, _props: r4, _container: null, _context: o2, _instance: null, version: yl, get config() {
        return o2.config;
      }, set config(a2) {
      }, use(a2, ...h2) {
        return i2.has(a2) || (a2 && $(a2.install) ? (i2.add(a2), a2.install(d2, ...h2)) : $(a2) && (i2.add(a2), a2(d2, ...h2))), d2;
      }, mixin(a2) {
        return o2.mixins.includes(a2) || o2.mixins.push(a2), d2;
      }, component(a2, h2) {
        return h2 ? (o2.components[a2] = h2, d2) : o2.components[a2];
      }, directive(a2, h2) {
        return h2 ? (o2.directives[a2] = h2, d2) : o2.directives[a2];
      }, mount(a2, h2, y) {
        if (!c4) {
          const w3 = d2._ceVNode || q(s, r4);
          return w3.appContext = o2, y === true ? y = "svg" : y === false && (y = void 0), e(w3, a2, y), c4 = true, d2._container = a2, a2.__vue_app__ = d2, Cn(w3.component);
        }
      }, onUnmount(a2) {
        l6.push(a2);
      }, unmount() {
        c4 && (qe2(l6, d2._instance, 16), e(null, d2._container), delete d2._container.__vue_app__);
      }, provide(a2, h2) {
        return o2.provides[a2] = h2, d2;
      }, runWithContext(a2) {
        const h2 = bt2;
        bt2 = d2;
        try {
          return a2();
        } finally {
          bt2 = h2;
        }
      } };
      return d2;
    };
  }
  function Ni(e, t6, ...n2) {
    if (e.isUnmounted)
      return;
    const s = e.vnode.props || J4;
    let r4 = n2;
    const o2 = t6.startsWith("update:"), i2 = o2 && Hi(s, t6.slice(7));
    i2 && (i2.trim && (r4 = n2.map((a2) => ne3(a2) ? a2.trim() : a2)), i2.number && (r4 = n2.map(Co)));
    let l6, c4 = s[l6 = On(t6)] || s[l6 = On(We2(t6))];
    !c4 && o2 && (c4 = s[l6 = On(qt2(t6))]), c4 && qe2(c4, e, 6, r4);
    const d2 = s[l6 + "Once"];
    if (d2) {
      if (!e.emitted)
        e.emitted = {};
      else if (e.emitted[l6])
        return;
      e.emitted[l6] = true, qe2(d2, e, 6, r4);
    }
  }
  function Zr(e, t6, n2 = false) {
    const s = n2 ? Ui : t6.emitsCache, r4 = s.get(e);
    if (r4 !== void 0)
      return r4;
    const o2 = e.emits;
    let i2 = {}, l6 = false;
    if (!$(e)) {
      const c4 = (d2) => {
        const a2 = Zr(d2, t6, true);
        a2 && (l6 = true, fe3(i2, a2));
      };
      !n2 && t6.mixins.length && t6.mixins.forEach(c4), e.extends && c4(e.extends), e.mixins && e.mixins.forEach(c4);
    }
    return !o2 && !l6 ? (W3(e) && s.set(e, null), null) : (L2(o2) ? o2.forEach((c4) => i2[c4] = null) : fe3(i2, o2), W3(e) && s.set(e, i2), i2);
  }
  function En(e, t6) {
    return !e || !ss(t6) ? false : (t6 = t6.slice(2).replace(/Once$/, ""), U(e, t6[0].toLowerCase() + t6.slice(1)) || U(e, qt2(t6)) || U(e, t6));
  }
  function Ws(e) {
    const { type: t6, vnode: n2, proxy: s, withProxy: r4, propsOptions: [o2], slots: i2, attrs: l6, emit: c4, render: d2, renderCache: a2, props: h2, data: y, setupState: w3, ctx: T2, inheritAttrs: v2 } = e, F3 = pn(e);
    let I2, P3;
    try {
      if (n2.shapeFlag & 4) {
        const C2 = r4 || s, V4 = C2;
        I2 = He2(d2.call(V4, C2, a2, h2, w3, y, T2)), P3 = l6;
      } else {
        const C2 = t6;
        I2 = He2(C2.length > 1 ? C2(h2, { attrs: l6, slots: i2, emit: c4 }) : C2(h2, null)), P3 = t6.props ? l6 : Ki(l6);
      }
    } catch (C2) {
      jt2.length = 0, Yt(C2, e, 1), I2 = q(le3);
    }
    let M2 = I2;
    if (P3 && v2 !== false) {
      const C2 = Object.keys(P3), { shapeFlag: V4 } = M2;
      C2.length && V4 & 7 && (o2 && C2.some(sr) && (P3 = Wi(P3, o2)), M2 = st2(M2, P3, false, true));
    }
    return n2.dirs && (M2 = st2(M2, null, false, true), M2.dirs = M2.dirs ? M2.dirs.concat(n2.dirs) : n2.dirs), n2.transition && Ht2(M2, n2.transition), I2 = M2, pn(F3), I2;
  }
  function qi(e, t6, n2) {
    const { props: s, children: r4, component: o2 } = e, { props: i2, children: l6, patchFlag: c4 } = t6, d2 = o2.emitsOptions;
    if (t6.dirs || t6.transition)
      return true;
    if (n2 && c4 >= 0) {
      if (c4 & 1024)
        return true;
      if (c4 & 16)
        return s ? qs(s, i2, d2) : !!i2;
      if (c4 & 8) {
        const a2 = t6.dynamicProps;
        for (let h2 = 0; h2 < a2.length; h2++) {
          const y = a2[h2];
          if (Xr(i2, s, y) && !En(d2, y))
            return true;
        }
      }
    } else
      return (r4 || l6) && (!l6 || !l6.$stable) ? true : s === i2 ? false : s ? i2 ? qs(s, i2, d2) : true : !!i2;
    return false;
  }
  function qs(e, t6, n2) {
    const s = Object.keys(t6);
    if (s.length !== Object.keys(e).length)
      return true;
    for (let r4 = 0; r4 < s.length; r4++) {
      const o2 = s[r4];
      if (Xr(t6, e, o2) && !En(n2, o2))
        return true;
    }
    return false;
  }
  function Xr(e, t6, n2) {
    const s = e[n2], r4 = t6[n2];
    return n2 === "style" && W3(s) && W3(r4) ? !kn(s, r4) : s !== r4;
  }
  function Ji({ vnode: e, parent: t6 }, n2) {
    for (; t6; ) {
      const s = t6.subTree;
      if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)
        (e = t6.vnode).el = n2, t6 = t6.parent;
      else
        break;
    }
  }
  function Gi(e, t6, n2, s = false) {
    const r4 = {}, o2 = eo();
    e.propsDefaults = /* @__PURE__ */ Object.create(null), no(e, t6, r4, o2);
    for (const i2 in e.propsOptions[0])
      i2 in r4 || (r4[i2] = void 0);
    n2 ? e.props = s ? r4 : ni(r4) : e.type.props ? e.props = r4 : e.props = o2, e.attrs = o2;
  }
  function Yi(e, t6, n2, s) {
    const { props: r4, attrs: o2, vnode: { patchFlag: i2 } } = e, l6 = H5(r4), [c4] = e.propsOptions;
    let d2 = false;
    if ((s || i2 > 0) && !(i2 & 16)) {
      if (i2 & 8) {
        const a2 = e.vnode.dynamicProps;
        for (let h2 = 0; h2 < a2.length; h2++) {
          let y = a2[h2];
          if (En(e.emitsOptions, y))
            continue;
          const w3 = t6[y];
          if (c4)
            if (U(o2, y))
              w3 !== o2[y] && (o2[y] = w3, d2 = true);
            else {
              const T2 = We2(y);
              r4[T2] = Xn(c4, l6, T2, w3, e, false);
            }
          else
            w3 !== o2[y] && (o2[y] = w3, d2 = true);
        }
      }
    } else {
      no(e, t6, r4, o2) && (d2 = true);
      let a2;
      for (const h2 in l6)
        (!t6 || !U(t6, h2) && ((a2 = qt2(h2)) === h2 || !U(t6, a2))) && (c4 ? n2 && (n2[h2] !== void 0 || n2[a2] !== void 0) && (r4[h2] = Xn(c4, l6, h2, void 0, e, true)) : delete r4[h2]);
      if (o2 !== l6)
        for (const h2 in o2)
          (!t6 || !U(t6, h2)) && (delete o2[h2], d2 = true);
    }
    d2 && Ye2(e.attrs, "set", "");
  }
  function no(e, t6, n2, s) {
    const [r4, o2] = e.propsOptions;
    let i2 = false, l6;
    if (t6)
      for (let c4 in t6) {
        if (Ot2(c4))
          continue;
        const d2 = t6[c4];
        let a2;
        r4 && U(r4, a2 = We2(c4)) ? !o2 || !o2.includes(a2) ? n2[a2] = d2 : (l6 || (l6 = {}))[a2] = d2 : En(e.emitsOptions, c4) || (!(c4 in s) || d2 !== s[c4]) && (s[c4] = d2, i2 = true);
      }
    if (o2) {
      const c4 = H5(n2), d2 = l6 || J4;
      for (let a2 = 0; a2 < o2.length; a2++) {
        const h2 = o2[a2];
        n2[h2] = Xn(r4, c4, h2, d2[h2], e, !U(d2, h2));
      }
    }
    return i2;
  }
  function Xn(e, t6, n2, s, r4, o2) {
    const i2 = e[n2];
    if (i2 != null) {
      const l6 = U(i2, "default");
      if (l6 && s === void 0) {
        const c4 = i2.default;
        if (i2.type !== Function && !i2.skipFactory && $(c4)) {
          const { propsDefaults: d2 } = r4;
          if (n2 in d2)
            s = d2[n2];
          else {
            const a2 = Zt(r4);
            s = d2[n2] = c4.call(null, t6), a2();
          }
        } else
          s = c4;
        r4.ce && r4.ce._setProp(n2, s);
      }
      i2[0] && (o2 && !l6 ? s = false : i2[1] && (s === "" || s === qt2(n2)) && (s = true));
    }
    return s;
  }
  function so(e, t6, n2 = false) {
    const s = n2 ? zi : t6.propsCache, r4 = s.get(e);
    if (r4)
      return r4;
    const o2 = e.props, i2 = {}, l6 = [];
    let c4 = false;
    if (!$(e)) {
      const a2 = (h2) => {
        c4 = true;
        const [y, w3] = so(h2, t6, true);
        fe3(i2, y), w3 && l6.push(...w3);
      };
      !n2 && t6.mixins.length && t6.mixins.forEach(a2), e.extends && a2(e.extends), e.mixins && e.mixins.forEach(a2);
    }
    if (!o2 && !c4)
      return W3(e) && s.set(e, gt2), gt2;
    if (L2(o2))
      for (let a2 = 0; a2 < o2.length; a2++) {
        const h2 = We2(o2[a2]);
        Js(h2) && (i2[h2] = J4);
      }
    else if (o2)
      for (const a2 in o2) {
        const h2 = We2(a2);
        if (Js(h2)) {
          const y = o2[a2], w3 = i2[h2] = L2(y) || $(y) ? { type: y } : fe3({}, y), T2 = w3.type;
          let v2 = false, F3 = true;
          if (L2(T2))
            for (let I2 = 0; I2 < T2.length; ++I2) {
              const P3 = T2[I2], M2 = $(P3) && P3.name;
              if (M2 === "Boolean") {
                v2 = true;
                break;
              } else
                M2 === "String" && (F3 = false);
            }
          else
            v2 = $(T2) && T2.name === "Boolean";
          w3[0] = v2, w3[1] = F3, (v2 || U(w3, "default")) && l6.push(h2);
        }
      }
    const d2 = [i2, l6];
    return W3(e) && s.set(e, d2), d2;
  }
  function Js(e) {
    return e[0] !== "$" && !Ot2(e);
  }
  function ac(e) {
    return el(e);
  }
  function el(e, t6) {
    const n2 = wn();
    n2.__VUE__ = true;
    const { insert: s, remove: r4, patchProp: o2, createElement: i2, createText: l6, createComment: c4, setText: d2, setElementText: a2, parentNode: h2, nextSibling: y, setScopeId: w3 = Ue2, insertStaticContent: T2 } = e, v2 = (f2, u2, p3, b2 = null, g3 = null, _2 = null, S5 = void 0, k3 = null, x3 = !!u2.dynamicChildren) => {
      if (f2 === u2)
        return;
      f2 && !ft2(f2, u2) && (b2 = Qt2(f2), Me3(f2, g3, _2, true), f2 = null), u2.patchFlag === -2 && (x3 = false, u2.dynamicChildren = null);
      const { type: m4, ref: R3, shapeFlag: E2 } = u2;
      switch (m4) {
        case An:
          F3(f2, u2, p3, b2);
          break;
        case le3:
          I2(f2, u2, p3, b2);
          break;
        case an:
          f2 == null && P3(u2, p3, b2, S5);
          break;
        case me:
          ae5(f2, u2, p3, b2, g3, _2, S5, k3, x3);
          break;
        default:
          E2 & 1 ? V4(f2, u2, p3, b2, g3, _2, S5, k3, x3) : E2 & 6 ? be4(f2, u2, p3, b2, g3, _2, S5, k3, x3) : (E2 & 64 || E2 & 128) && m4.process(f2, u2, p3, b2, g3, _2, S5, k3, x3, Tt2);
      }
      R3 != null && g3 ? Ft2(R3, f2 && f2.ref, _2, u2 || f2, !u2) : R3 == null && f2 && f2.ref != null && Ft2(f2.ref, null, _2, f2, true);
    }, F3 = (f2, u2, p3, b2) => {
      if (f2 == null)
        s(u2.el = l6(u2.children), p3, b2);
      else {
        const g3 = u2.el = f2.el;
        u2.children !== f2.children && d2(g3, u2.children);
      }
    }, I2 = (f2, u2, p3, b2) => {
      f2 == null ? s(u2.el = c4(u2.children || ""), p3, b2) : u2.el = f2.el;
    }, P3 = (f2, u2, p3, b2) => {
      [f2.el, f2.anchor] = T2(f2.children, u2, p3, b2, f2.el, f2.anchor);
    }, M2 = ({ el: f2, anchor: u2 }, p3, b2) => {
      let g3;
      for (; f2 && f2 !== u2; )
        g3 = y(f2), s(f2, p3, b2), f2 = g3;
      s(u2, p3, b2);
    }, C2 = ({ el: f2, anchor: u2 }) => {
      let p3;
      for (; f2 && f2 !== u2; )
        p3 = y(f2), r4(f2), f2 = p3;
      r4(u2);
    }, V4 = (f2, u2, p3, b2, g3, _2, S5, k3, x3) => {
      if (u2.type === "svg" ? S5 = "svg" : u2.type === "math" && (S5 = "mathml"), f2 == null)
        G3(u2, p3, b2, g3, _2, S5, k3, x3);
      else {
        const m4 = f2.el && f2.el._isVueCE ? f2.el : null;
        try {
          m4 && m4._beginPatch(), A3(f2, u2, g3, _2, S5, k3, x3);
        } finally {
          m4 && m4._endPatch();
        }
      }
    }, G3 = (f2, u2, p3, b2, g3, _2, S5, k3) => {
      let x3, m4;
      const { props: R3, shapeFlag: E2, transition: O, dirs: D3 } = f2;
      if (x3 = f2.el = i2(f2.type, _2, R3 && R3.is, R3), E2 & 8 ? a2(x3, f2.children) : E2 & 16 && Q4(f2.children, x3, null, b2, g3, Vn(f2, _2), S5, k3), D3 && it2(f2, null, b2, "created"), te5(x3, f2, f2.scopeId, S5, b2), R3) {
        for (const z3 in R3)
          z3 !== "value" && !Ot2(z3) && o2(x3, z3, null, R3[z3], _2, b2);
        "value" in R3 && o2(x3, "value", null, R3.value, _2), (m4 = R3.onVnodeBeforeMount) && je3(m4, b2, f2);
      }
      D3 && it2(f2, null, b2, "beforeMount");
      const B3 = tl(g3, O);
      B3 && O.beforeEnter(x3), s(x3, u2, p3), ((m4 = R3 && R3.onVnodeMounted) || B3 || D3) && oe3(() => {
        m4 && je3(m4, b2, f2), B3 && O.enter(x3), D3 && it2(f2, null, b2, "mounted");
      }, g3);
    }, te5 = (f2, u2, p3, b2, g3) => {
      if (p3 && w3(f2, p3), b2)
        for (let _2 = 0; _2 < b2.length; _2++)
          w3(f2, b2[_2]);
      if (g3) {
        let _2 = g3.subTree;
        if (u2 === _2 || fo(_2.type) && (_2.ssContent === u2 || _2.ssFallback === u2)) {
          const S5 = g3.vnode;
          te5(f2, S5, S5.scopeId, S5.slotScopeIds, g3.parent);
        }
      }
    }, Q4 = (f2, u2, p3, b2, g3, _2, S5, k3, x3 = 0) => {
      for (let m4 = x3; m4 < f2.length; m4++) {
        const R3 = f2[m4] = k3 ? Ge2(f2[m4]) : He2(f2[m4]);
        v2(null, R3, u2, p3, b2, g3, _2, S5, k3);
      }
    }, A3 = (f2, u2, p3, b2, g3, _2, S5) => {
      const k3 = u2.el = f2.el;
      let { patchFlag: x3, dynamicChildren: m4, dirs: R3 } = u2;
      x3 |= f2.patchFlag & 16;
      const E2 = f2.props || J4, O = u2.props || J4;
      let D3;
      if (p3 && lt2(p3, false), (D3 = O.onVnodeBeforeUpdate) && je3(D3, p3, u2, f2), R3 && it2(u2, f2, p3, "beforeUpdate"), p3 && lt2(p3, true), (E2.innerHTML && O.innerHTML == null || E2.textContent && O.textContent == null) && a2(k3, ""), m4 ? j3(f2.dynamicChildren, m4, k3, p3, b2, Vn(u2, g3), _2) : S5 || Y3(f2, u2, k3, null, p3, b2, Vn(u2, g3), _2, false), x3 > 0) {
        if (x3 & 16)
          N2(k3, E2, O, p3, g3);
        else if (x3 & 2 && E2.class !== O.class && o2(k3, "class", null, O.class, g3), x3 & 4 && o2(k3, "style", E2.style, O.style, g3), x3 & 8) {
          const B3 = u2.dynamicProps;
          for (let z3 = 0; z3 < B3.length; z3++) {
            const K4 = B3[z3], pe5 = E2[K4], ge5 = O[K4];
            (ge5 !== pe5 || K4 === "value") && o2(k3, K4, pe5, ge5, g3, p3);
          }
        }
        x3 & 1 && f2.children !== u2.children && a2(k3, u2.children);
      } else
        !S5 && m4 == null && N2(k3, E2, O, p3, g3);
      ((D3 = O.onVnodeUpdated) || R3) && oe3(() => {
        D3 && je3(D3, p3, u2, f2), R3 && it2(u2, f2, p3, "updated");
      }, b2);
    }, j3 = (f2, u2, p3, b2, g3, _2, S5) => {
      for (let k3 = 0; k3 < u2.length; k3++) {
        const x3 = f2[k3], m4 = u2[k3], R3 = x3.el && (x3.type === me || !ft2(x3, m4) || x3.shapeFlag & 198) ? h2(x3.el) : p3;
        v2(x3, m4, R3, null, b2, g3, _2, S5, true);
      }
    }, N2 = (f2, u2, p3, b2, g3) => {
      if (u2 !== p3) {
        if (u2 !== J4)
          for (const _2 in u2)
            !Ot2(_2) && !(_2 in p3) && o2(f2, _2, u2[_2], null, g3, b2);
        for (const _2 in p3) {
          if (Ot2(_2))
            continue;
          const S5 = p3[_2], k3 = u2[_2];
          S5 !== k3 && _2 !== "value" && o2(f2, _2, k3, S5, g3, b2);
        }
        "value" in p3 && o2(f2, "value", u2.value, p3.value, g3);
      }
    }, ae5 = (f2, u2, p3, b2, g3, _2, S5, k3, x3) => {
      const m4 = u2.el = f2 ? f2.el : l6(""), R3 = u2.anchor = f2 ? f2.anchor : l6("");
      let { patchFlag: E2, dynamicChildren: O, slotScopeIds: D3 } = u2;
      D3 && (k3 = k3 ? k3.concat(D3) : D3), f2 == null ? (s(m4, p3, b2), s(R3, p3, b2), Q4(u2.children || [], p3, R3, g3, _2, S5, k3, x3)) : E2 > 0 && E2 & 64 && O && f2.dynamicChildren && f2.dynamicChildren.length === O.length ? (j3(f2.dynamicChildren, O, p3, g3, _2, S5, k3), (u2.key != null || g3 && u2 === g3.subTree) && xs(f2, u2, true)) : Y3(f2, u2, p3, R3, g3, _2, S5, k3, x3);
    }, be4 = (f2, u2, p3, b2, g3, _2, S5, k3, x3) => {
      u2.slotScopeIds = k3, f2 == null ? u2.shapeFlag & 512 ? g3.ctx.activate(u2, p3, b2, S5, x3) : Re4(u2, p3, b2, g3, _2, S5, x3) : dt3(f2, u2, x3);
    }, Re4 = (f2, u2, p3, b2, g3, _2, S5) => {
      const k3 = f2.component = ul(f2, b2, g3);
      if (zt2(f2) && (k3.ctx.renderer = Tt2), dl(k3, false, S5), k3.asyncDep) {
        if (g3 && g3.registerDep(k3, ue5, S5), !f2.el) {
          const x3 = k3.subTree = q(le3);
          I2(null, x3, u2, p3), f2.placeholder = x3.el;
        }
      } else
        ue5(k3, f2, u2, p3, g3, _2, S5);
    }, dt3 = (f2, u2, p3) => {
      const b2 = u2.component = f2.component;
      if (qi(f2, u2, p3))
        if (b2.asyncDep && !b2.asyncResolved) {
          X4(b2, u2, p3);
          return;
        } else
          b2.next = u2, b2.update();
      else
        u2.el = f2.el, b2.vnode = u2;
    }, ue5 = (f2, u2, p3, b2, g3, _2, S5) => {
      const k3 = () => {
        if (f2.isMounted) {
          let { next: E2, bu: O, u: D3, parent: B3, vnode: z3 } = f2;
          {
            const De4 = lo(f2);
            if (De4) {
              E2 && (E2.el = z3.el, X4(f2, E2, S5)), De4.asyncDep.then(() => {
                oe3(() => {
                  f2.isUnmounted || m4();
                }, g3);
              });
              return;
            }
          }
          let K4 = E2, pe5;
          lt2(f2, false), E2 ? (E2.el = z3.el, X4(f2, E2, S5)) : E2 = z3, O && In(O), (pe5 = E2.props && E2.props.onVnodeBeforeUpdate) && je3(pe5, B3, E2, z3), lt2(f2, true);
          const ge5 = Ws(f2), Fe3 = f2.subTree;
          f2.subTree = ge5, v2(Fe3, ge5, h2(Fe3.el), Qt2(Fe3), f2, g3, _2), E2.el = ge5.el, K4 === null && Ji(f2, ge5.el), D3 && oe3(D3, g3), (pe5 = E2.props && E2.props.onVnodeUpdated) && oe3(() => je3(pe5, B3, E2, z3), g3);
        } else {
          let E2;
          const { el: O, props: D3 } = u2, { bm: B3, m: z3, parent: K4, root: pe5, type: ge5 } = f2, Fe3 = yt2(u2);
          lt2(f2, false), B3 && In(B3), !Fe3 && (E2 = D3 && D3.onVnodeBeforeMount) && je3(E2, K4, u2), lt2(f2, true);
          {
            pe5.ce && pe5.ce._hasShadowRoot() && pe5.ce._injectChildStyle(ge5, f2.parent ? f2.parent.type : void 0);
            const De4 = f2.subTree = Ws(f2);
            v2(null, De4, p3, b2, f2, g3, _2), u2.el = De4.el;
          }
          if (z3 && oe3(z3, g3), !Fe3 && (E2 = D3 && D3.onVnodeMounted)) {
            const De4 = u2;
            oe3(() => je3(E2, K4, De4), g3);
          }
          (u2.shapeFlag & 256 || K4 && yt2(K4.vnode) && K4.vnode.shapeFlag & 256) && f2.a && oe3(f2.a, g3), f2.isMounted = true, u2 = p3 = b2 = null;
        }
      };
      f2.scope.on();
      const x3 = f2.effect = new ur(k3);
      f2.scope.off();
      const m4 = f2.update = x3.run.bind(x3), R3 = f2.job = x3.runIfDirty.bind(x3);
      R3.i = f2, R3.id = f2.uid, x3.scheduler = () => _s(R3), lt2(f2, true), m4();
    }, X4 = (f2, u2, p3) => {
      u2.component = f2;
      const b2 = f2.vnode.props;
      f2.vnode = u2, f2.next = null, Yi(f2, u2.props, b2, p3), Qi(f2, u2.children, p3), Ze2(), Rs(f2), Xe3();
    }, Y3 = (f2, u2, p3, b2, g3, _2, S5, k3, x3 = false) => {
      const m4 = f2 && f2.children, R3 = f2 ? f2.shapeFlag : 0, E2 = u2.children, { patchFlag: O, shapeFlag: D3 } = u2;
      if (O > 0) {
        if (O & 128) {
          Xt2(m4, E2, p3, b2, g3, _2, S5, k3, x3);
          return;
        } else if (O & 256) {
          rt3(m4, E2, p3, b2, g3, _2, S5, k3, x3);
          return;
        }
      }
      D3 & 8 ? (R3 & 16 && kt3(m4, g3, _2), E2 !== m4 && a2(p3, E2)) : R3 & 16 ? D3 & 16 ? Xt2(m4, E2, p3, b2, g3, _2, S5, k3, x3) : kt3(m4, g3, _2, true) : (R3 & 8 && a2(p3, ""), D3 & 16 && Q4(E2, p3, b2, g3, _2, S5, k3, x3));
    }, rt3 = (f2, u2, p3, b2, g3, _2, S5, k3, x3) => {
      f2 = f2 || gt2, u2 = u2 || gt2;
      const m4 = f2.length, R3 = u2.length, E2 = Math.min(m4, R3);
      let O;
      for (O = 0; O < E2; O++) {
        const D3 = u2[O] = x3 ? Ge2(u2[O]) : He2(u2[O]);
        v2(f2[O], D3, p3, null, g3, _2, S5, k3, x3);
      }
      m4 > R3 ? kt3(f2, g3, _2, true, false, E2) : Q4(u2, p3, b2, g3, _2, S5, k3, x3, E2);
    }, Xt2 = (f2, u2, p3, b2, g3, _2, S5, k3, x3) => {
      let m4 = 0;
      const R3 = u2.length;
      let E2 = f2.length - 1, O = R3 - 1;
      for (; m4 <= E2 && m4 <= O; ) {
        const D3 = f2[m4], B3 = u2[m4] = x3 ? Ge2(u2[m4]) : He2(u2[m4]);
        if (ft2(D3, B3))
          v2(D3, B3, p3, null, g3, _2, S5, k3, x3);
        else
          break;
        m4++;
      }
      for (; m4 <= E2 && m4 <= O; ) {
        const D3 = f2[E2], B3 = u2[O] = x3 ? Ge2(u2[O]) : He2(u2[O]);
        if (ft2(D3, B3))
          v2(D3, B3, p3, null, g3, _2, S5, k3, x3);
        else
          break;
        E2--, O--;
      }
      if (m4 > E2) {
        if (m4 <= O) {
          const D3 = O + 1, B3 = D3 < R3 ? u2[D3].el : b2;
          for (; m4 <= O; )
            v2(null, u2[m4] = x3 ? Ge2(u2[m4]) : He2(u2[m4]), p3, B3, g3, _2, S5, k3, x3), m4++;
        }
      } else if (m4 > O)
        for (; m4 <= E2; )
          Me3(f2[m4], g3, _2, true), m4++;
      else {
        const D3 = m4, B3 = m4, z3 = /* @__PURE__ */ new Map();
        for (m4 = B3; m4 <= O; m4++) {
          const ve4 = u2[m4] = x3 ? Ge2(u2[m4]) : He2(u2[m4]);
          ve4.key != null && z3.set(ve4.key, m4);
        }
        let K4, pe5 = 0;
        const ge5 = O - B3 + 1;
        let Fe3 = false, De4 = 0;
        const St3 = new Array(ge5);
        for (m4 = 0; m4 < ge5; m4++)
          St3[m4] = 0;
        for (m4 = D3; m4 <= E2; m4++) {
          const ve4 = f2[m4];
          if (pe5 >= ge5) {
            Me3(ve4, g3, _2, true);
            continue;
          }
          let Le5;
          if (ve4.key != null)
            Le5 = z3.get(ve4.key);
          else
            for (K4 = B3; K4 <= O; K4++)
              if (St3[K4 - B3] === 0 && ft2(ve4, u2[K4])) {
                Le5 = K4;
                break;
              }
          Le5 === void 0 ? Me3(ve4, g3, _2, true) : (St3[Le5 - B3] = m4 + 1, Le5 >= De4 ? De4 = Le5 : Fe3 = true, v2(ve4, u2[Le5], p3, null, g3, _2, S5, k3, x3), pe5++);
        }
        const Ss = Fe3 ? nl(St3) : gt2;
        for (K4 = Ss.length - 1, m4 = ge5 - 1; m4 >= 0; m4--) {
          const ve4 = B3 + m4, Le5 = u2[ve4], Es = u2[ve4 + 1], As = ve4 + 1 < R3 ? Es.el || co(Es) : b2;
          St3[m4] === 0 ? v2(null, Le5, p3, As, g3, _2, S5, k3, x3) : Fe3 && (K4 < 0 || m4 !== Ss[K4] ? ot3(Le5, p3, As, 2) : K4--);
        }
      }
    }, ot3 = (f2, u2, p3, b2, g3 = null) => {
      const { el: _2, type: S5, transition: k3, children: x3, shapeFlag: m4 } = f2;
      if (m4 & 6) {
        ot3(f2.component.subTree, u2, p3, b2);
        return;
      }
      if (m4 & 128) {
        f2.suspense.move(u2, p3, b2);
        return;
      }
      if (m4 & 64) {
        S5.move(f2, u2, p3, Tt2);
        return;
      }
      if (S5 === me) {
        s(_2, u2, p3);
        for (let E2 = 0; E2 < x3.length; E2++)
          ot3(x3[E2], u2, p3, b2);
        s(f2.anchor, u2, p3);
        return;
      }
      if (S5 === an) {
        M2(f2, u2, p3);
        return;
      }
      if (b2 !== 2 && m4 & 1 && k3)
        if (b2 === 0)
          k3.beforeEnter(_2), s(_2, u2, p3), oe3(() => k3.enter(_2), g3);
        else {
          const { leave: E2, delayLeave: O, afterLeave: D3 } = k3, B3 = () => {
            f2.ctx.isUnmounted ? r4(_2) : s(_2, u2, p3);
          }, z3 = () => {
            _2._isLeaving && _2[Ve3](true), E2(_2, () => {
              B3(), D3 && D3();
            });
          };
          O ? O(_2, B3, z3) : z3();
        }
      else
        s(_2, u2, p3);
    }, Me3 = (f2, u2, p3, b2 = false, g3 = false) => {
      const { type: _2, props: S5, ref: k3, children: x3, dynamicChildren: m4, shapeFlag: R3, patchFlag: E2, dirs: O, cacheIndex: D3 } = f2;
      if (E2 === -2 && (g3 = false), k3 != null && (Ze2(), Ft2(k3, null, p3, f2, true), Xe3()), D3 != null && (u2.renderCache[D3] = void 0), R3 & 256) {
        u2.ctx.deactivate(f2);
        return;
      }
      const B3 = R3 & 1 && O, z3 = !yt2(f2);
      let K4;
      if (z3 && (K4 = S5 && S5.onVnodeBeforeUnmount) && je3(K4, u2, f2), R3 & 6)
        ko(f2.component, p3, b2);
      else {
        if (R3 & 128) {
          f2.suspense.unmount(p3, b2);
          return;
        }
        B3 && it2(f2, null, u2, "beforeUnmount"), R3 & 64 ? f2.type.remove(f2, u2, p3, Tt2, b2) : m4 && !m4.hasOnce && (_2 !== me || E2 > 0 && E2 & 64) ? kt3(m4, u2, p3, false, true) : (_2 === me && E2 & 384 || !g3 && R3 & 16) && kt3(x3, u2, p3), b2 && ks(f2);
      }
      (z3 && (K4 = S5 && S5.onVnodeUnmounted) || B3) && oe3(() => {
        K4 && je3(K4, u2, f2), B3 && it2(f2, null, u2, "unmounted");
      }, p3);
    }, ks = (f2) => {
      const { type: u2, el: p3, anchor: b2, transition: g3 } = f2;
      if (u2 === me) {
        wo(p3, b2);
        return;
      }
      if (u2 === an) {
        C2(f2);
        return;
      }
      const _2 = () => {
        r4(p3), g3 && !g3.persisted && g3.afterLeave && g3.afterLeave();
      };
      if (f2.shapeFlag & 1 && g3 && !g3.persisted) {
        const { leave: S5, delayLeave: k3 } = g3, x3 = () => S5(p3, _2);
        k3 ? k3(f2.el, _2, x3) : x3();
      } else
        _2();
    }, wo = (f2, u2) => {
      let p3;
      for (; f2 !== u2; )
        p3 = y(f2), r4(f2), f2 = p3;
      r4(u2);
    }, ko = (f2, u2, p3) => {
      const { bum: b2, scope: g3, job: _2, subTree: S5, um: k3, m: x3, a: m4 } = f2;
      Gs(x3), Gs(m4), b2 && In(b2), g3.stop(), _2 && (_2.flags |= 8, Me3(S5, f2, u2, p3)), k3 && oe3(k3, u2), oe3(() => {
        f2.isUnmounted = true;
      }, u2);
    }, kt3 = (f2, u2, p3, b2 = false, g3 = false, _2 = 0) => {
      for (let S5 = _2; S5 < f2.length; S5++)
        Me3(f2[S5], u2, p3, b2, g3);
    }, Qt2 = (f2) => {
      if (f2.shapeFlag & 6)
        return Qt2(f2.component.subTree);
      if (f2.shapeFlag & 128)
        return f2.suspense.next();
      const u2 = y(f2.anchor || f2.el), p3 = u2 && u2[Fr];
      return p3 ? y(p3) : u2;
    };
    let Pn = false;
    const Ts = (f2, u2, p3) => {
      let b2;
      f2 == null ? u2._vnode && (Me3(u2._vnode, null, null, true), b2 = u2._vnode.component) : v2(u2._vnode || null, f2, u2, null, null, null, p3), u2._vnode = f2, Pn || (Pn = true, Rs(b2), Pr(), Pn = false);
    }, Tt2 = { p: v2, um: Me3, m: ot3, r: ks, mt: Re4, mc: Q4, pc: Y3, pbc: j3, n: Qt2, o: e };
    return { render: Ts, hydrate: void 0, createApp: Bi(Ts) };
  }
  function Vn({ type: e, props: t6 }, n2) {
    return n2 === "svg" && e === "foreignObject" || n2 === "mathml" && e === "annotation-xml" && t6 && t6.encoding && t6.encoding.includes("html") ? void 0 : n2;
  }
  function lt2({ effect: e, job: t6 }, n2) {
    n2 ? (e.flags |= 32, t6.flags |= 4) : (e.flags &= -33, t6.flags &= -5);
  }
  function tl(e, t6) {
    return (!e || e && !e.pendingBranch) && t6 && !t6.persisted;
  }
  function xs(e, t6, n2 = false) {
    const s = e.children, r4 = t6.children;
    if (L2(s) && L2(r4))
      for (let o2 = 0; o2 < s.length; o2++) {
        const i2 = s[o2];
        let l6 = r4[o2];
        l6.shapeFlag & 1 && !l6.dynamicChildren && ((l6.patchFlag <= 0 || l6.patchFlag === 32) && (l6 = r4[o2] = Ge2(r4[o2]), l6.el = i2.el), !n2 && l6.patchFlag !== -2 && xs(i2, l6)), l6.type === An && (l6.patchFlag === -1 && (l6 = r4[o2] = Ge2(l6)), l6.el = i2.el), l6.type === le3 && !l6.el && (l6.el = i2.el);
      }
  }
  function nl(e) {
    const t6 = e.slice(), n2 = [0];
    let s, r4, o2, i2, l6;
    const c4 = e.length;
    for (s = 0; s < c4; s++) {
      const d2 = e[s];
      if (d2 !== 0) {
        if (r4 = n2[n2.length - 1], e[r4] < d2) {
          t6[s] = r4, n2.push(s);
          continue;
        }
        for (o2 = 0, i2 = n2.length - 1; o2 < i2; )
          l6 = o2 + i2 >> 1, e[n2[l6]] < d2 ? o2 = l6 + 1 : i2 = l6;
        d2 < e[n2[o2]] && (o2 > 0 && (t6[s] = n2[o2 - 1]), n2[o2] = s);
      }
    }
    for (o2 = n2.length, i2 = n2[o2 - 1]; o2-- > 0; )
      n2[o2] = i2, i2 = t6[i2];
    return n2;
  }
  function lo(e) {
    const t6 = e.subTree.component;
    if (t6)
      return t6.asyncDep && !t6.asyncResolved ? t6 : lo(t6);
  }
  function Gs(e) {
    if (e)
      for (let t6 = 0; t6 < e.length; t6++)
        e[t6].flags |= 8;
  }
  function co(e) {
    if (e.placeholder)
      return e.placeholder;
    const t6 = e.component;
    return t6 ? co(t6.subTree) : null;
  }
  function sl(e, t6) {
    t6 && t6.pendingBranch ? L2(e) ? t6.effects.push(...e) : t6.effects.push(e) : hi(e);
  }
  function Se(e = false) {
    jt2.push(xe4 = e ? null : []);
  }
  function rl() {
    jt2.pop(), xe4 = jt2[jt2.length - 1] || null;
  }
  function yn(e, t6 = false) {
    Nt2 += e, e < 0 && xe4 && t6 && (xe4.hasOnce = true);
  }
  function ao(e) {
    return e.dynamicChildren = Nt2 > 0 ? xe4 || gt2 : null, rl(), Nt2 > 0 && xe4 && xe4.push(e), e;
  }
  function bn(e, t6, n2, s, r4, o2) {
    return ao(Kt(e, t6, n2, s, r4, o2, true));
  }
  function nt(e, t6, n2, s, r4) {
    return ao(q(e, t6, n2, s, r4, true));
  }
  function Ut2(e) {
    return e ? e.__v_isVNode === true : false;
  }
  function ft2(e, t6) {
    return e.type === t6.type && e.key === t6.key;
  }
  function Kt(e, t6 = null, n2 = null, s = 0, r4 = null, o2 = e === me ? 0 : 1, i2 = false, l6 = false) {
    const c4 = { __v_isVNode: true, __v_skip: true, type: e, props: t6, key: t6 && uo(t6), ref: t6 && un(t6), scopeId: Ir, slotScopeIds: null, children: n2, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetStart: null, targetAnchor: null, staticCount: 0, shapeFlag: o2, patchFlag: s, dynamicProps: r4, dynamicChildren: null, appContext: null, ctx: re3 };
    return l6 ? (ws(c4, n2), o2 & 128 && e.normalize(c4)) : n2 && (c4.shapeFlag |= ne3(n2) ? 8 : 16), Nt2 > 0 && !i2 && xe4 && (c4.patchFlag > 0 || o2 & 6) && c4.patchFlag !== 32 && xe4.push(c4), c4;
  }
  function ol(e, t6 = null, n2 = null, s = 0, r4 = null, o2 = false) {
    if ((!e || e === Wr) && (e = le3), Ut2(e)) {
      const l6 = st2(e, t6, true);
      return n2 && ws(l6, n2), Nt2 > 0 && !o2 && xe4 && (l6.shapeFlag & 6 ? xe4[xe4.indexOf(e)] = l6 : xe4.push(l6)), l6.patchFlag = -2, l6;
    }
    if (ml(e) && (e = e.__vccOpts), t6) {
      t6 = il(t6);
      let { class: l6, style: c4 } = t6;
      l6 && !ne3(l6) && (t6.class = Jt(l6)), W3(c4) && (gs(c4) && !L2(c4) && (c4 = fe3({}, c4)), t6.style = ls(c4));
    }
    const i2 = ne3(e) ? 1 : fo(e) ? 128 : Dr(e) ? 64 : W3(e) ? 4 : $(e) ? 2 : 0;
    return Kt(e, t6, n2, s, r4, i2, o2, true);
  }
  function il(e) {
    return e ? gs(e) || to(e) ? fe3({}, e) : e : null;
  }
  function st2(e, t6, n2 = false, s = false) {
    const { props: r4, ref: o2, patchFlag: i2, children: l6, transition: c4 } = e, d2 = t6 ? cl(r4 || {}, t6) : r4, a2 = { __v_isVNode: true, __v_skip: true, type: e.type, props: d2, key: d2 && uo(d2), ref: t6 && t6.ref ? n2 && o2 ? L2(o2) ? o2.concat(un(t6)) : [o2, un(t6)] : un(t6) : o2, scopeId: e.scopeId, slotScopeIds: e.slotScopeIds, children: l6, target: e.target, targetStart: e.targetStart, targetAnchor: e.targetAnchor, staticCount: e.staticCount, shapeFlag: e.shapeFlag, patchFlag: t6 && e.type !== me ? i2 === -1 ? 16 : i2 | 16 : i2, dynamicProps: e.dynamicProps, dynamicChildren: e.dynamicChildren, appContext: e.appContext, dirs: e.dirs, transition: c4, component: e.component, suspense: e.suspense, ssContent: e.ssContent && st2(e.ssContent), ssFallback: e.ssFallback && st2(e.ssFallback), placeholder: e.placeholder, el: e.el, anchor: e.anchor, ctx: e.ctx, ce: e.ce };
    return c4 && s && Ht2(a2, c4.clone(a2)), a2;
  }
  function ll(e = " ", t6 = 0) {
    return q(An, null, e, t6);
  }
  function Qn(e = "", t6 = false) {
    return t6 ? (Se(), nt(le3, null, e)) : q(le3, null, e);
  }
  function He2(e) {
    return e == null || typeof e == "boolean" ? q(le3) : L2(e) ? q(me, null, e.slice()) : Ut2(e) ? Ge2(e) : q(An, null, String(e));
  }
  function Ge2(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : st2(e);
  }
  function ws(e, t6) {
    let n2 = 0;
    const { shapeFlag: s } = e;
    if (t6 == null)
      t6 = null;
    else if (L2(t6))
      n2 = 16;
    else if (typeof t6 == "object")
      if (s & 65) {
        const r4 = t6.default;
        r4 && (r4._c && (r4._d = false), ws(e, r4()), r4._c && (r4._d = true));
        return;
      } else {
        n2 = 32;
        const r4 = t6._;
        !r4 && !to(t6) ? t6._ctx = re3 : r4 === 3 && re3 && (re3.slots._ === 1 ? t6._ = 1 : (t6._ = 2, e.patchFlag |= 1024));
      }
    else
      $(t6) ? (t6 = { default: t6, _ctx: re3 }, n2 = 32) : (t6 = String(t6), s & 64 ? (n2 = 16, t6 = [ll(t6)]) : n2 = 8);
    e.children = t6, e.shapeFlag |= n2;
  }
  function cl(...e) {
    const t6 = {};
    for (let n2 = 0; n2 < e.length; n2++) {
      const s = e[n2];
      for (const r4 in s)
        if (r4 === "class")
          t6.class !== s.class && (t6.class = Jt([t6.class, s.class]));
        else if (r4 === "style")
          t6.style = ls([t6.style, s.style]);
        else if (ss(r4)) {
          const o2 = t6[r4], i2 = s[r4];
          i2 && o2 !== i2 && !(L2(o2) && o2.includes(i2)) && (t6[r4] = o2 ? [].concat(o2, i2) : i2);
        } else
          r4 !== "" && (t6[r4] = s[r4]);
    }
    return t6;
  }
  function je3(e, t6, n2, s = null) {
    qe2(e, t6, 7, [n2, s]);
  }
  function ul(e, t6, n2) {
    const s = e.type, r4 = (t6 ? t6.appContext : e.appContext) || fl, o2 = { uid: al++, vnode: e, type: s, parent: t6, appContext: r4, root: null, next: null, subTree: null, effect: null, update: null, job: null, scope: new Lo(true), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: t6 ? t6.provides : Object.create(r4.provides), ids: t6 ? t6.ids : ["", 0, 0], accessCache: null, renderCache: [], components: null, directives: null, propsOptions: so(s, r4), emitsOptions: Zr(s, r4), emit: null, emitted: null, propsDefaults: J4, inheritAttrs: s.inheritAttrs, ctx: J4, data: J4, props: J4, attrs: J4, slots: J4, refs: J4, setupState: J4, setupContext: null, suspense: n2, suspenseId: n2 ? n2.pendingId : 0, asyncDep: null, asyncResolved: false, isMounted: false, isUnmounted: false, isDeactivated: false, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null };
    return o2.ctx = { _: o2 }, o2.root = t6 ? t6.root : o2, o2.emit = Ni.bind(null, o2), e.ce && e.ce(o2), o2;
  }
  function po(e) {
    return e.vnode.shapeFlag & 4;
  }
  function dl(e, t6 = false, n2 = false) {
    t6 && es(t6);
    const { props: s, children: r4 } = e.vnode, o2 = po(e);
    Gi(e, s, o2, t6), Xi(e, r4, n2 || t6);
    const i2 = o2 ? hl(e, t6) : void 0;
    return t6 && es(false), i2;
  }
  function hl(e, t6) {
    const n2 = e.type;
    e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Mi);
    const { setup: s } = n2;
    if (s) {
      Ze2();
      const r4 = e.setupContext = s.length > 1 ? gl(e) : null, o2 = Zt(e), i2 = Gt2(s, e, 0, [e.props, r4]), l6 = or(i2);
      if (Xe3(), o2(), (l6 || e.sp) && !yt2(e) && ys(e), l6) {
        if (i2.then(Ys, Ys), t6)
          return i2.then((c4) => {
            zs(e, c4);
          }).catch((c4) => {
            Yt(c4, e, 0);
          });
        e.asyncDep = i2;
      } else
        zs(e, i2);
    } else
      go(e);
  }
  function zs(e, t6, n2) {
    $(t6) ? e.type.__ssrInlineRender ? e.ssrRender = t6 : e.render = t6 : W3(t6) && (e.setupState = Er(t6)), go(e);
  }
  function go(e, t6, n2) {
    const s = e.type;
    e.render || (e.render = s.render || Ue2);
    {
      const r4 = Zt(e);
      Ze2();
      try {
        Fi(e);
      } finally {
        Xe3(), r4();
      }
    }
  }
  function gl(e) {
    const t6 = (n2) => {
      e.exposed = n2 || {};
    };
    return { attrs: new Proxy(e.attrs, pl), slots: e.slots, emit: e.emit, expose: t6 };
  }
  function Cn(e) {
    return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Er(si(e.exposed)), { get(t6, n2) {
      if (n2 in t6)
        return t6[n2];
      if (n2 in Lt2)
        return Lt2[n2](e);
    }, has(t6, n2) {
      return n2 in t6 || n2 in Lt2;
    } })) : e.proxy;
  }
  function ml(e) {
    return $(e) && "__vccOpts" in e;
  }
  function ts(e, t6, n2) {
    try {
      yn(-1);
      const s = arguments.length;
      return s === 2 ? W3(t6) && !L2(t6) ? Ut2(t6) ? q(e, null, [t6]) : q(e, t6) : q(e, null, t6) : (s > 3 ? n2 = Array.prototype.slice.call(arguments, 2) : s === 3 && Ut2(n2) && (n2 = [n2]), q(e, t6, n2));
    } finally {
      yn(1);
    }
  }
  function Tl(e, t6, n2, s, r4, o2) {
    return Se(), bn("div", kl, [...t6[0] || (t6[0] = [Kt("span", { class: "opacity-60" }, "Dock", -1)])]);
  }
  function Bn(e, t6) {
    const n2 = window.__;
    return typeof n2 == "function" ? n2(e, t6) : e;
  }
  function Ml() {
    var _a, _b, _c, _d, _e6;
    return (_e6 = (_d = (_a = window.frappe) == null ? void 0 : _a.csrf_token) != null ? _d : (_c = (_b = window.dockBoot) == null ? void 0 : _b.session) == null ? void 0 : _c.csrf_token) != null ? _e6 : "";
  }
  async function wt(e, t6 = {}) {
    var _a, _b, _c;
    const n2 = await fetch("/api/method/" + e, { method: "POST", headers: { "Content-Type": "application/json", "X-Frappe-CSRF-Token": Ml() }, body: JSON.stringify(t6) }), s = await n2.json();
    if (!n2.ok) {
      const r4 = (s == null ? void 0 : s._server_messages) ? (_b = (_a = JSON.parse(s._server_messages)) == null ? void 0 : _a[0]) == null ? void 0 : _b.message : (_c = s == null ? void 0 : s.exc_type) != null ? _c : "Server error";
      throw new Error(r4 != null ? r4 : "Request failed");
    }
    return s.message;
  }
  function Dl(e) {
    er || (er = true, (e == null ? void 0 : e.length) && (ye3.value = e));
  }
  function Ll(e, t6, n2) {
    var _a, _b;
    return (_b = (_a = ye3.value.find((s) => s.app === e && s.doctype === t6 && s.docname === n2)) == null ? void 0 : _a.name) != null ? _b : null;
  }
  async function jl(e) {
    if (mo.value)
      return;
    const t6 = `__tmp_${Date.now()}`, n2 = __spreadValues({ name: t6, sort_order: ye3.value.length }, e);
    ye3.value.push(n2);
    try {
      const s = await wt("dock.api.bookmarks.add", { app: e.app, doctype: e.doctype, docname: e.docname, label: e.label, icon: e.icon }), r4 = ye3.value.findIndex((o2) => o2.name === t6);
      r4 >= 0 && (ye3.value[r4].name = s);
    } catch (e2) {
      ye3.value = ye3.value.filter((s) => s.name !== t6);
    }
  }
  function $l(e) {
    ye3.value = ye3.value.filter((t6) => t6.name !== e), wt("dock.api.bookmarks.remove", { bookmark_name: e }).catch(() => {
    });
  }
  function Vl(e) {
    const t6 = new Map(ye3.value.map((n2) => [n2.name, n2]));
    ye3.value = e.map((n2, s) => __spreadProps(__spreadValues({}, t6.get(n2)), { sort_order: s })), wt("dock.api.bookmarks.reorder", { ordered_names: e }).catch(() => {
    });
  }
  function yo() {
    return { bookmarks: ye3, atLimit: mo, init: Dl, isBookmarked: Ll, addBookmark: jl, removeBookmark: $l, reorderBookmarks: Vl };
  }
  function Bl(e) {
    tr || (tr = true, (e == null ? void 0 : e.length) && (ke4.value = e));
  }
  function Hl(e) {
    const t6 = ke4.value.findIndex((r4) => r4.app === e.app && r4.doctype === e.doctype && r4.docname === e.docname), n2 = new Date().toISOString(), s = __spreadProps(__spreadValues({ name: t6 >= 0 ? ke4.value[t6].name : "" }, e), { visited_at: n2 });
    t6 >= 0 && ke4.value.splice(t6, 1), ke4.value.unshift(s), ke4.value.length > 8 && (ke4.value = ke4.value.slice(0, 8)), wt("dock.api.recent.track", { app: e.app, doctype: e.doctype, docname: e.docname, label: e.label, icon: e.icon }).catch(() => {
    });
  }
  function Nl(e) {
    ke4.value = ke4.value.filter((t6) => t6.name !== e), wt("dock.api.recent.remove", { recent_item_name: e }).catch(() => {
    });
  }
  function Ul() {
    ke4.value = [], wt("dock.api.recent.clear").catch(() => {
    });
  }
  function bo() {
    return { items: ke4, init: Bl, trackItem: Hl, removeItem: Nl, clearAll: Ul };
  }
  function vo() {
    const e = Te(() => {
      var _a, _b, _c, _d;
      return (_d = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) != null ? _c : window.dockBoot) != null ? _d : null;
    }), t6 = Te(() => {
      var _a;
      return !!((_a = e.value) == null ? void 0 : _a.installed);
    }), n2 = Te(() => {
      var _a, _b;
      return (_b = (_a = e.value) == null ? void 0 : _a.settings) != null ? _b : null;
    }), s = Te(() => {
      var _a, _b;
      return (_b = (_a = e.value) == null ? void 0 : _a.registered_apps) != null ? _b : [];
    }), r4 = Te(() => {
      var _a, _b;
      return (_b = (_a = e.value) == null ? void 0 : _a.calendar_sources) != null ? _b : [];
    }), o2 = Te(() => {
      var _a, _b;
      return (_b = (_a = e.value) == null ? void 0 : _a.notification_types) != null ? _b : [];
    });
    return { dock: e, isInstalled: t6, settings: n2, registeredApps: s, calendarSources: r4, notificationTypes: o2 };
  }
  function Jl() {
    return { collapsed: on, mobileOpen: ln, toggle: () => {
      window.innerWidth <= 576 ? ln.value = !ln.value : (on.value = !on.value, localStorage.setItem(xo, String(on.value)));
    }, closeMobile: () => {
      ln.value = false;
    }, isMobile: () => window.innerWidth <= 576 };
  }
  var __vite__mapDeps2, J4, gt2, Ue2, nr, ss, sr, fe3, rs, To, U, L2, _t2, rr, Cs, $, ne3, Ke3, W3, or, ir, Wt2, So, lr, os, Ot2, xn, Eo, We2, Ao, qt2, is, On, Ne3, In, cr, Co, Xl, Ps, wn, Po, Oo, Io, Mo, Ql, fr, Do, ar, Rn, _e4, Lo, Z3, Mn, ur, dr, It2, Rt2, Pe3, mr, $t2, Vo, us, Nn, at2, Un, Vt2, Bo, Ho, No, br, vr, xr, Ko, Wo, qo, Jo, Kn, en, zo, Zo, Xo, wr, kr, Tr, Qo, Ie2, vt2, ri, oi, ii, nn, dn, ct2, he4, $e5, mt2, tt2, pt2, Ar, hn, Bt2, re3, Ir, _i, mi, Fr, Dr, Mt2, Ms, Fs, Ds, qn, Lr, rc, Ve3, At2, we3, xi, jr, wi, oc, gn, Vs, yt2, zt2, et2, Ai, Dt, Ci, Pi, Nr, _n, Oi, Ii, Ri, Wr, Yn, Lt2, $n, Mi, zn, Li, Vi, bt2, Hi, Ui, Ki, Wi, Qr, eo, to, zi, bs, vs, Zi, ro, oo, io, Xi, Qi, oe3, fo, me, An, le3, an, jt2, xe4, Nt2, uo, un, q, fl, al, se3, ho, vn, es, Zt, Ys, xt2, pl, Te, yl, bl, vl, Zs, Ce2, xl, wl, kl, Sl, El, Xs, Al, Qs, Cl, Pl, Ct3, Ol, _o, Il, Rl, Fl, ye3, er, mo, ke4, tr, Kl, Wl, ql, xo, on, ln, Gl, Yl, zl, dc;
  var init_dock_navbar_esm = __esm({
    "../dock/dock/public/js/dock-navbar.esm.js"() {
      __vite__mapDeps2 = (i2, m4 = __vite__mapDeps2, d2 = m4.f || (m4.f = ["assets/DockAppSwitcher.css"])) => i2.map((i3) => d2[i3]);
      J4 = {};
      gt2 = [];
      Ue2 = () => {
      };
      nr = () => false;
      ss = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97);
      sr = (e) => e.startsWith("onUpdate:");
      fe3 = Object.assign;
      rs = (e, t6) => {
        const n2 = e.indexOf(t6);
        n2 > -1 && e.splice(n2, 1);
      };
      To = Object.prototype.hasOwnProperty;
      U = (e, t6) => To.call(e, t6);
      L2 = Array.isArray;
      _t2 = (e) => Wt2(e) === "[object Map]";
      rr = (e) => Wt2(e) === "[object Set]";
      Cs = (e) => Wt2(e) === "[object Date]";
      $ = (e) => typeof e == "function";
      ne3 = (e) => typeof e == "string";
      Ke3 = (e) => typeof e == "symbol";
      W3 = (e) => e !== null && typeof e == "object";
      or = (e) => (W3(e) || $(e)) && $(e.then) && $(e.catch);
      ir = Object.prototype.toString;
      Wt2 = (e) => ir.call(e);
      So = (e) => Wt2(e).slice(8, -1);
      lr = (e) => Wt2(e) === "[object Object]";
      os = (e) => ne3(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e;
      Ot2 = ns(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
      xn = (e) => {
        const t6 = /* @__PURE__ */ Object.create(null);
        return (n2) => t6[n2] || (t6[n2] = e(n2));
      };
      Eo = /-\w/g;
      We2 = xn((e) => e.replace(Eo, (t6) => t6.slice(1).toUpperCase()));
      Ao = /\B([A-Z])/g;
      qt2 = xn((e) => e.replace(Ao, "-$1").toLowerCase());
      is = xn((e) => e.charAt(0).toUpperCase() + e.slice(1));
      On = xn((e) => e ? `on${is(e)}` : "");
      Ne3 = (e, t6) => !Object.is(e, t6);
      In = (e, ...t6) => {
        for (let n2 = 0; n2 < e.length; n2++)
          e[n2](...t6);
      };
      cr = (e, t6, n2, s = false) => {
        Object.defineProperty(e, t6, { configurable: true, enumerable: false, writable: s, value: n2 });
      };
      Co = (e) => {
        const t6 = parseFloat(e);
        return isNaN(t6) ? e : t6;
      };
      Xl = (e) => {
        const t6 = ne3(e) ? Number(e) : NaN;
        return isNaN(t6) ? e : t6;
      };
      wn = () => Ps || (Ps = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
      Po = /;(?![^(]*\))/g;
      Oo = /:([^]+)/;
      Io = /\/\*[^]*?\*\//g;
      Mo = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
      Ql = ns(Mo);
      fr = (e) => !!(e && e.__v_isRef === true);
      Do = (e) => ne3(e) ? e : e == null ? "" : L2(e) || W3(e) && (e.toString === ir || !$(e.toString)) ? fr(e) ? Do(e.value) : JSON.stringify(e, ar, 2) : String(e);
      ar = (e, t6) => fr(t6) ? ar(e, t6.value) : _t2(t6) ? { [`Map(${t6.size})`]: [...t6.entries()].reduce((n2, [s, r4], o2) => (n2[Rn(s, o2) + " =>"] = r4, n2), {}) } : rr(t6) ? { [`Set(${t6.size})`]: [...t6.values()].map((n2) => Rn(n2)) } : Ke3(t6) ? Rn(t6) : W3(t6) && !L2(t6) && !lr(t6) ? String(t6) : t6;
      Rn = (e, t6 = "") => {
        var n2;
        return Ke3(e) ? `Symbol(${(n2 = e.description) != null ? n2 : t6})` : e;
      };
      Lo = class {
        constructor(t6 = false) {
          this.detached = t6, this._active = true, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = false, this.__v_skip = true, this.parent = _e4, !t6 && _e4 && (this.index = (_e4.scopes || (_e4.scopes = [])).push(this) - 1);
        }
        get active() {
          return this._active;
        }
        pause() {
          if (this._active) {
            this._isPaused = true;
            let t6, n2;
            if (this.scopes)
              for (t6 = 0, n2 = this.scopes.length; t6 < n2; t6++)
                this.scopes[t6].pause();
            for (t6 = 0, n2 = this.effects.length; t6 < n2; t6++)
              this.effects[t6].pause();
          }
        }
        resume() {
          if (this._active && this._isPaused) {
            this._isPaused = false;
            let t6, n2;
            if (this.scopes)
              for (t6 = 0, n2 = this.scopes.length; t6 < n2; t6++)
                this.scopes[t6].resume();
            for (t6 = 0, n2 = this.effects.length; t6 < n2; t6++)
              this.effects[t6].resume();
          }
        }
        run(t6) {
          if (this._active) {
            const n2 = _e4;
            try {
              return _e4 = this, t6();
            } finally {
              _e4 = n2;
            }
          }
        }
        on() {
          ++this._on === 1 && (this.prevScope = _e4, _e4 = this);
        }
        off() {
          this._on > 0 && --this._on === 0 && (_e4 = this.prevScope, this.prevScope = void 0);
        }
        stop(t6) {
          if (this._active) {
            this._active = false;
            let n2, s;
            for (n2 = 0, s = this.effects.length; n2 < s; n2++)
              this.effects[n2].stop();
            for (this.effects.length = 0, n2 = 0, s = this.cleanups.length; n2 < s; n2++)
              this.cleanups[n2]();
            if (this.cleanups.length = 0, this.scopes) {
              for (n2 = 0, s = this.scopes.length; n2 < s; n2++)
                this.scopes[n2].stop(true);
              this.scopes.length = 0;
            }
            if (!this.detached && this.parent && !t6) {
              const r4 = this.parent.scopes.pop();
              r4 && r4 !== this && (this.parent.scopes[this.index] = r4, r4.index = this.index);
            }
            this.parent = void 0;
          }
        }
      };
      Mn = /* @__PURE__ */ new WeakSet();
      ur = class {
        constructor(t6) {
          this.fn = t6, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, _e4 && _e4.active && _e4.effects.push(this);
        }
        pause() {
          this.flags |= 64;
        }
        resume() {
          this.flags & 64 && (this.flags &= -65, Mn.has(this) && (Mn.delete(this), this.trigger()));
        }
        notify() {
          this.flags & 2 && !(this.flags & 32) || this.flags & 8 || hr(this);
        }
        run() {
          if (!(this.flags & 1))
            return this.fn();
          this.flags |= 2, Os(this), pr(this);
          const t6 = Z3, n2 = Pe3;
          Z3 = this, Pe3 = true;
          try {
            return this.fn();
          } finally {
            gr(this), Z3 = t6, Pe3 = n2, this.flags &= -3;
          }
        }
        stop() {
          if (this.flags & 1) {
            for (let t6 = this.deps; t6; t6 = t6.nextDep)
              as(t6);
            this.deps = this.depsTail = void 0, Os(this), this.onStop && this.onStop(), this.flags &= -2;
          }
        }
        trigger() {
          this.flags & 64 ? Mn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
        }
        runIfDirty() {
          Hn(this) && this.run();
        }
        get dirty() {
          return Hn(this);
        }
      };
      dr = 0;
      Pe3 = true;
      mr = [];
      $t2 = 0;
      Vo = class {
        constructor(t6, n2) {
          this.sub = t6, this.dep = n2, this.version = n2.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
        }
      };
      us = class {
        constructor(t6) {
          this.computed = t6, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = true;
        }
        track(t6) {
          if (!Z3 || !Pe3 || Z3 === this.computed)
            return;
          let n2 = this.activeLink;
          if (n2 === void 0 || n2.sub !== Z3)
            n2 = this.activeLink = new Vo(Z3, this), Z3.deps ? (n2.prevDep = Z3.depsTail, Z3.depsTail.nextDep = n2, Z3.depsTail = n2) : Z3.deps = Z3.depsTail = n2, yr(n2);
          else if (n2.version === -1 && (n2.version = this.version, n2.nextDep)) {
            const s = n2.nextDep;
            s.prevDep = n2.prevDep, n2.prevDep && (n2.prevDep.nextDep = s), n2.prevDep = Z3.depsTail, n2.nextDep = void 0, Z3.depsTail.nextDep = n2, Z3.depsTail = n2, Z3.deps === n2 && (Z3.deps = s);
          }
          return n2;
        }
        trigger(t6) {
          this.version++, $t2++, this.notify(t6);
        }
        notify(t6) {
          cs();
          try {
            for (let n2 = this.subs; n2; n2 = n2.prevSub)
              n2.sub.notify() && n2.sub.dep.notify();
          } finally {
            fs();
          }
        }
      };
      Nn = /* @__PURE__ */ new WeakMap();
      at2 = Symbol("");
      Un = Symbol("");
      Vt2 = Symbol("");
      Bo = { __proto__: null, [Symbol.iterator]() {
        return Fn(this, Symbol.iterator, (e) => Be3(this, e));
      }, concat(...e) {
        return ht2(this).concat(...e.map((t6) => L2(t6) ? ht2(t6) : t6));
      }, entries() {
        return Fn(this, "entries", (e) => (e[1] = Be3(this, e[1]), e));
      }, every(e, t6) {
        return Je2(this, "every", e, t6, void 0, arguments);
      }, filter(e, t6) {
        return Je2(this, "filter", e, t6, (n2) => n2.map((s) => Be3(this, s)), arguments);
      }, find(e, t6) {
        return Je2(this, "find", e, t6, (n2) => Be3(this, n2), arguments);
      }, findIndex(e, t6) {
        return Je2(this, "findIndex", e, t6, void 0, arguments);
      }, findLast(e, t6) {
        return Je2(this, "findLast", e, t6, (n2) => Be3(this, n2), arguments);
      }, findLastIndex(e, t6) {
        return Je2(this, "findLastIndex", e, t6, void 0, arguments);
      }, forEach(e, t6) {
        return Je2(this, "forEach", e, t6, void 0, arguments);
      }, includes(...e) {
        return Dn(this, "includes", e);
      }, indexOf(...e) {
        return Dn(this, "indexOf", e);
      }, join(e) {
        return ht2(this).join(e);
      }, lastIndexOf(...e) {
        return Dn(this, "lastIndexOf", e);
      }, map(e, t6) {
        return Je2(this, "map", e, t6, void 0, arguments);
      }, pop() {
        return Et2(this, "pop");
      }, push(...e) {
        return Et2(this, "push", e);
      }, reduce(e, ...t6) {
        return Is(this, "reduce", e, t6);
      }, reduceRight(e, ...t6) {
        return Is(this, "reduceRight", e, t6);
      }, shift() {
        return Et2(this, "shift");
      }, some(e, t6) {
        return Je2(this, "some", e, t6, void 0, arguments);
      }, splice(...e) {
        return Et2(this, "splice", e);
      }, toReversed() {
        return ht2(this).toReversed();
      }, toSorted(e) {
        return ht2(this).toSorted(e);
      }, toSpliced(...e) {
        return ht2(this).toSpliced(...e);
      }, unshift(...e) {
        return Et2(this, "unshift", e);
      }, values() {
        return Fn(this, "values", (e) => Be3(this, e));
      } };
      Ho = Array.prototype;
      No = ns("__proto__,__v_isRef,__isVue");
      br = new Set(Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ke3));
      vr = class {
        constructor(t6 = false, n2 = false) {
          this._isReadonly = t6, this._isShallow = n2;
        }
        get(t6, n2, s) {
          if (n2 === "__v_skip")
            return t6.__v_skip;
          const r4 = this._isReadonly, o2 = this._isShallow;
          if (n2 === "__v_isReactive")
            return !r4;
          if (n2 === "__v_isReadonly")
            return r4;
          if (n2 === "__v_isShallow")
            return o2;
          if (n2 === "__v_raw")
            return s === (r4 ? o2 ? Qo : Tr : o2 ? kr : wr).get(t6) || Object.getPrototypeOf(t6) === Object.getPrototypeOf(s) ? t6 : void 0;
          const i2 = L2(t6);
          if (!r4) {
            let c4;
            if (i2 && (c4 = Bo[n2]))
              return c4;
            if (n2 === "hasOwnProperty")
              return Uo;
          }
          const l6 = Reflect.get(t6, n2, ce5(t6) ? t6 : s);
          if ((Ke3(n2) ? br.has(n2) : No(n2)) || (r4 || ie4(t6, "get", n2), o2))
            return l6;
          if (ce5(l6)) {
            const c4 = i2 && os(n2) ? l6 : l6.value;
            return r4 && W3(c4) ? Wn(c4) : c4;
          }
          return W3(l6) ? r4 ? Wn(l6) : hs(l6) : l6;
        }
      };
      xr = class extends vr {
        constructor(t6 = false) {
          super(false, t6);
        }
        set(t6, n2, s, r4) {
          let o2 = t6[n2];
          const i2 = L2(t6) && os(n2);
          if (!this._isShallow) {
            const d2 = Qe2(o2);
            if (!Ee3(s) && !Qe2(s) && (o2 = H5(o2), s = H5(s)), !i2 && ce5(o2) && !ce5(s))
              return d2 || (o2.value = s), true;
          }
          const l6 = i2 ? Number(n2) < t6.length : U(t6, n2), c4 = Reflect.set(t6, n2, s, ce5(t6) ? t6 : r4);
          return t6 === H5(r4) && (l6 ? Ne3(s, o2) && Ye2(t6, "set", n2, s) : Ye2(t6, "add", n2, s)), c4;
        }
        deleteProperty(t6, n2) {
          const s = U(t6, n2);
          t6[n2];
          const r4 = Reflect.deleteProperty(t6, n2);
          return r4 && s && Ye2(t6, "delete", n2, void 0), r4;
        }
        has(t6, n2) {
          const s = Reflect.has(t6, n2);
          return (!Ke3(n2) || !br.has(n2)) && ie4(t6, "has", n2), s;
        }
        ownKeys(t6) {
          return ie4(t6, "iterate", L2(t6) ? "length" : at2), Reflect.ownKeys(t6);
        }
      };
      Ko = class extends vr {
        constructor(t6 = false) {
          super(true, t6);
        }
        set(t6, n2) {
          return true;
        }
        deleteProperty(t6, n2) {
          return true;
        }
      };
      Wo = new xr();
      qo = new Ko();
      Jo = new xr(true);
      Kn = (e) => e;
      en = (e) => Reflect.getPrototypeOf(e);
      zo = { get: ds(false, false) };
      Zo = { get: ds(false, true) };
      Xo = { get: ds(true, false) };
      wr = /* @__PURE__ */ new WeakMap();
      kr = /* @__PURE__ */ new WeakMap();
      Tr = /* @__PURE__ */ new WeakMap();
      Qo = /* @__PURE__ */ new WeakMap();
      Ie2 = (e) => W3(e) ? hs(e) : e;
      vt2 = (e) => W3(e) ? Wn(e) : e;
      ri = class {
        constructor(t6, n2) {
          this.dep = new us(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = n2 ? t6 : H5(t6), this._value = n2 ? t6 : Ie2(t6), this.__v_isShallow = n2;
        }
        get value() {
          return this.dep.track(), this._value;
        }
        set value(t6) {
          const n2 = this._rawValue, s = this.__v_isShallow || Ee3(t6) || Qe2(t6);
          t6 = s ? t6 : H5(t6), Ne3(t6, n2) && (this._rawValue = t6, this._value = s ? t6 : Ie2(t6), this.dep.trigger());
        }
      };
      oi = { get: (e, t6, n2) => t6 === "__v_raw" ? e : ee(Reflect.get(e, t6, n2)), set: (e, t6, n2, s) => {
        const r4 = e[t6];
        return ce5(r4) && !ce5(n2) ? (r4.value = n2, true) : Reflect.set(e, t6, n2, s);
      } };
      ii = class {
        constructor(t6, n2, s) {
          this.fn = t6, this.setter = n2, this._value = void 0, this.dep = new us(this), this.__v_isRef = true, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = $t2 - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n2, this.isSSR = s;
        }
        notify() {
          if (this.flags |= 16, !(this.flags & 8) && Z3 !== this)
            return hr(this, true), true;
        }
        get value() {
          const t6 = this.dep.track();
          return _r(this), t6 && (t6.version = this.dep.version), this._value;
        }
        set value(t6) {
          this.setter && this.setter(t6);
        }
      };
      nn = {};
      dn = /* @__PURE__ */ new WeakMap();
      he4 = [];
      $e5 = -1;
      mt2 = [];
      tt2 = null;
      pt2 = 0;
      Ar = Promise.resolve();
      hn = null;
      Bt2 = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
      re3 = null;
      Ir = null;
      _i = Symbol.for("v-scx");
      mi = () => cn(_i);
      Fr = Symbol("_vte");
      Dr = (e) => e.__isTeleport;
      Mt2 = (e) => e && (e.disabled || e.disabled === "");
      Ms = (e) => e && (e.defer || e.defer === "");
      Fs = (e) => typeof SVGElement < "u" && e instanceof SVGElement;
      Ds = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement;
      qn = (e, t6) => {
        const n2 = e && e.to;
        return ne3(n2) ? t6 ? t6(n2) : null : n2;
      };
      Lr = { name: "Teleport", __isTeleport: true, process(e, t6, n2, s, r4, o2, i2, l6, c4, d2) {
        const { mc: a2, pc: h2, pbc: y, o: { insert: w3, querySelector: T2, createText: v2, createComment: F3 } } = d2, I2 = Mt2(t6.props);
        let { shapeFlag: P3, children: M2, dynamicChildren: C2 } = t6;
        if (e == null) {
          const V4 = t6.el = v2(""), G3 = t6.anchor = v2("");
          w3(V4, n2, s), w3(G3, n2, s);
          const te5 = (A3, j3) => {
            P3 & 16 && a2(M2, A3, j3, r4, o2, i2, l6, c4);
          }, Q4 = () => {
            const A3 = t6.target = qn(t6.props, T2), j3 = Jn(A3, t6, v2, w3);
            A3 && (i2 !== "svg" && Fs(A3) ? i2 = "svg" : i2 !== "mathml" && Ds(A3) && (i2 = "mathml"), r4 && r4.isCE && (r4.ce._teleportTargets || (r4.ce._teleportTargets = /* @__PURE__ */ new Set())).add(A3), I2 || (te5(A3, j3), fn(t6, false)));
          };
          I2 && (te5(n2, G3), fn(t6, true)), Ms(t6.props) ? (t6.el.__isMounted = false, oe3(() => {
            Q4(), delete t6.el.__isMounted;
          }, o2)) : Q4();
        } else {
          if (Ms(t6.props) && e.el.__isMounted === false) {
            oe3(() => {
              Lr.process(e, t6, n2, s, r4, o2, i2, l6, c4, d2);
            }, o2);
            return;
          }
          t6.el = e.el, t6.targetStart = e.targetStart;
          const V4 = t6.anchor = e.anchor, G3 = t6.target = e.target, te5 = t6.targetAnchor = e.targetAnchor, Q4 = Mt2(e.props), A3 = Q4 ? n2 : G3, j3 = Q4 ? V4 : te5;
          if (i2 === "svg" || Fs(G3) ? i2 = "svg" : (i2 === "mathml" || Ds(G3)) && (i2 = "mathml"), C2 ? (y(e.dynamicChildren, C2, A3, r4, o2, i2, l6), xs(e, t6, true)) : c4 || h2(e, t6, A3, j3, r4, o2, i2, l6, false), I2)
            Q4 ? t6.props && e.props && t6.props.to !== e.props.to && (t6.props.to = e.props.to) : sn(t6, n2, V4, d2, 1);
          else if ((t6.props && t6.props.to) !== (e.props && e.props.to)) {
            const N2 = t6.target = qn(t6.props, T2);
            N2 && sn(t6, N2, null, d2, 0);
          } else
            Q4 && sn(t6, G3, te5, d2, 1);
          fn(t6, I2);
        }
      }, remove(e, t6, n2, { um: s, o: { remove: r4 } }, o2) {
        const { shapeFlag: i2, children: l6, anchor: c4, targetStart: d2, targetAnchor: a2, target: h2, props: y } = e;
        if (h2 && (r4(d2), r4(a2)), o2 && r4(c4), i2 & 16) {
          const w3 = o2 || !Mt2(y);
          for (let T2 = 0; T2 < l6.length; T2++) {
            const v2 = l6[T2];
            s(v2, t6, n2, w3, !!v2.dynamicChildren);
          }
        }
      }, move: sn, hydrate: bi };
      rc = Lr;
      Ve3 = Symbol("_leaveCb");
      At2 = Symbol("_enterCb");
      we3 = [Function, Array];
      xi = { mode: String, appear: Boolean, persisted: Boolean, onBeforeEnter: we3, onEnter: we3, onAfterEnter: we3, onEnterCancelled: we3, onBeforeLeave: we3, onLeave: we3, onAfterLeave: we3, onLeaveCancelled: we3, onBeforeAppear: we3, onAppear: we3, onAfterAppear: we3, onAppearCancelled: we3 };
      jr = (e) => {
        const t6 = e.subTree;
        return t6.component ? jr(t6.component) : t6;
      };
      wi = { name: "BaseTransition", props: xi, setup(e, { slots: t6 }) {
        const n2 = ho(), s = vi();
        return () => {
          const r4 = t6.default && Br(t6.default(), true);
          if (!r4 || !r4.length)
            return;
          const o2 = $r(r4), i2 = H5(e), { mode: l6 } = i2;
          if (s.isLeaving)
            return jn(o2);
          const c4 = Ls(o2);
          if (!c4)
            return jn(o2);
          let d2 = Gn(c4, i2, s, n2, (h2) => d2 = h2);
          c4.type !== le3 && Ht2(c4, d2);
          let a2 = n2.subTree && Ls(n2.subTree);
          if (a2 && a2.type !== le3 && !ft2(a2, c4) && jr(n2).type !== le3) {
            let h2 = Gn(a2, i2, s, n2);
            if (Ht2(a2, h2), l6 === "out-in" && c4.type !== le3)
              return s.isLeaving = true, h2.afterLeave = () => {
                s.isLeaving = false, n2.job.flags & 8 || n2.update(), delete h2.afterLeave, a2 = void 0;
              }, jn(o2);
            l6 === "in-out" && c4.type !== le3 ? h2.delayLeave = (y, w3, T2) => {
              const v2 = Vr(s, a2);
              v2[String(a2.key)] = a2, y[Ve3] = () => {
                w3(), y[Ve3] = void 0, delete d2.delayedLeave, a2 = void 0;
              }, d2.delayedLeave = () => {
                T2(), delete d2.delayedLeave, a2 = void 0;
              };
            } : a2 = void 0;
          } else
            a2 && (a2 = void 0);
          return o2;
        };
      } };
      oc = wi;
      gn = /* @__PURE__ */ new WeakMap();
      Vs = (e) => e.nodeType === 8;
      wn().requestIdleCallback;
      wn().cancelIdleCallback;
      yt2 = (e) => !!e.type.__asyncLoader;
      zt2 = (e) => e.type.__isKeepAlive;
      et2 = (e) => (t6, n2 = se3) => {
        (!xt2 || e === "sp") && Sn(e, (...s) => t6(...s), n2);
      };
      Ai = et2("bm");
      Dt = et2("m");
      Ci = et2("bu");
      Pi = et2("u");
      Nr = et2("bum");
      _n = et2("um");
      Oi = et2("sp");
      Ii = et2("rtg");
      Ri = et2("rtc");
      Wr = Symbol.for("v-ndc");
      Yn = (e) => e ? po(e) ? Cn(e) : Yn(e.parent) : null;
      Lt2 = fe3(/* @__PURE__ */ Object.create(null), { $: (e) => e, $el: (e) => e.vnode.el, $data: (e) => e.data, $props: (e) => e.props, $attrs: (e) => e.attrs, $slots: (e) => e.slots, $refs: (e) => e.refs, $parent: (e) => Yn(e.parent), $root: (e) => Yn(e.root), $host: (e) => e.ce, $emit: (e) => e.emit, $options: (e) => Yr(e), $forceUpdate: (e) => e.f || (e.f = () => {
        _s(e.update);
      }), $nextTick: (e) => e.n || (e.n = ui.bind(e.proxy)), $watch: (e) => yi.bind(e) });
      $n = (e, t6) => e !== J4 && !e.__isScriptSetup && U(e, t6);
      Mi = { get({ _: e }, t6) {
        if (t6 === "__v_skip")
          return true;
        const { ctx: n2, setupState: s, data: r4, props: o2, accessCache: i2, type: l6, appContext: c4 } = e;
        if (t6[0] !== "$") {
          const y = i2[t6];
          if (y !== void 0)
            switch (y) {
              case 1:
                return s[t6];
              case 2:
                return r4[t6];
              case 4:
                return n2[t6];
              case 3:
                return o2[t6];
            }
          else {
            if ($n(s, t6))
              return i2[t6] = 1, s[t6];
            if (r4 !== J4 && U(r4, t6))
              return i2[t6] = 2, r4[t6];
            if (U(o2, t6))
              return i2[t6] = 3, o2[t6];
            if (n2 !== J4 && U(n2, t6))
              return i2[t6] = 4, n2[t6];
            zn && (i2[t6] = 0);
          }
        }
        const d2 = Lt2[t6];
        let a2, h2;
        if (d2)
          return t6 === "$attrs" && ie4(e.attrs, "get", ""), d2(e);
        if ((a2 = l6.__cssModules) && (a2 = a2[t6]))
          return a2;
        if (n2 !== J4 && U(n2, t6))
          return i2[t6] = 4, n2[t6];
        if (h2 = c4.config.globalProperties, U(h2, t6))
          return h2[t6];
      }, set({ _: e }, t6, n2) {
        const { data: s, setupState: r4, ctx: o2 } = e;
        return $n(r4, t6) ? (r4[t6] = n2, true) : s !== J4 && U(s, t6) ? (s[t6] = n2, true) : U(e.props, t6) || t6[0] === "$" && t6.slice(1) in e ? false : (o2[t6] = n2, true);
      }, has({ _: { data: e, setupState: t6, accessCache: n2, ctx: s, appContext: r4, props: o2, type: i2 } }, l6) {
        let c4;
        return !!(n2[l6] || e !== J4 && l6[0] !== "$" && U(e, l6) || $n(t6, l6) || U(o2, l6) || U(s, l6) || U(Lt2, l6) || U(r4.config.globalProperties, l6) || (c4 = i2.__cssModules) && c4[l6]);
      }, defineProperty(e, t6, n2) {
        return n2.get != null ? e._.accessCache[t6] = 0 : U(n2, "value") && this.set(e, t6, n2.value, null), Reflect.defineProperty(e, t6, n2);
      } };
      zn = true;
      Li = { data: Us, props: Ks, emits: Ks, methods: Pt2, computed: Pt2, beforeCreate: de4, created: de4, beforeMount: de4, mounted: de4, beforeUpdate: de4, updated: de4, beforeDestroy: de4, beforeUnmount: de4, destroyed: de4, unmounted: de4, activated: de4, deactivated: de4, errorCaptured: de4, serverPrefetch: de4, components: Pt2, directives: Pt2, watch: $i, provide: Us, inject: ji };
      Vi = 0;
      bt2 = null;
      Hi = (e, t6) => t6 === "modelValue" || t6 === "model-value" ? e.modelModifiers : e[`${t6}Modifiers`] || e[`${We2(t6)}Modifiers`] || e[`${qt2(t6)}Modifiers`];
      Ui = /* @__PURE__ */ new WeakMap();
      Ki = (e) => {
        let t6;
        for (const n2 in e)
          (n2 === "class" || n2 === "style" || ss(n2)) && ((t6 || (t6 = {}))[n2] = e[n2]);
        return t6;
      };
      Wi = (e, t6) => {
        const n2 = {};
        for (const s in e)
          (!sr(s) || !(s.slice(9) in t6)) && (n2[s] = e[s]);
        return n2;
      };
      Qr = {};
      eo = () => Object.create(Qr);
      to = (e) => Object.getPrototypeOf(e) === Qr;
      zi = /* @__PURE__ */ new WeakMap();
      bs = (e) => e === "_" || e === "_ctx" || e === "$stable";
      vs = (e) => L2(e) ? e.map(He2) : [He2(e)];
      Zi = (e, t6, n2) => {
        if (t6._n)
          return t6;
        const s = pi((...r4) => vs(t6(...r4)), n2);
        return s._c = false, s;
      };
      ro = (e, t6, n2) => {
        const s = e._ctx;
        for (const r4 in e) {
          if (bs(r4))
            continue;
          const o2 = e[r4];
          if ($(o2))
            t6[r4] = Zi(r4, o2, s);
          else if (o2 != null) {
            const i2 = vs(o2);
            t6[r4] = () => i2;
          }
        }
      };
      oo = (e, t6) => {
        const n2 = vs(t6);
        e.slots.default = () => n2;
      };
      io = (e, t6, n2) => {
        for (const s in t6)
          (n2 || !bs(s)) && (e[s] = t6[s]);
      };
      Xi = (e, t6, n2) => {
        const s = e.slots = eo();
        if (e.vnode.shapeFlag & 32) {
          const r4 = t6._;
          r4 ? (io(s, t6, n2), n2 && cr(s, "_", r4, true)) : ro(t6, s);
        } else
          t6 && oo(e, t6);
      };
      Qi = (e, t6, n2) => {
        const { vnode: s, slots: r4 } = e;
        let o2 = true, i2 = J4;
        if (s.shapeFlag & 32) {
          const l6 = t6._;
          l6 ? n2 && l6 === 1 ? o2 = false : io(r4, t6, n2) : (o2 = !t6.$stable, ro(t6, r4)), i2 = t6;
        } else
          t6 && (oo(e, t6), i2 = { default: 1 });
        if (o2)
          for (const l6 in r4)
            !bs(l6) && i2[l6] == null && delete r4[l6];
      };
      oe3 = sl;
      fo = (e) => e.__isSuspense;
      me = Symbol.for("v-fgt");
      An = Symbol.for("v-txt");
      le3 = Symbol.for("v-cmt");
      an = Symbol.for("v-stc");
      jt2 = [];
      xe4 = null;
      Nt2 = 1;
      uo = ({ key: e }) => e != null ? e : null;
      un = ({ ref: e, ref_key: t6, ref_for: n2 }) => (typeof e == "number" && (e = "" + e), e != null ? ne3(e) || ce5(e) || $(e) ? { i: re3, r: e, k: t6, f: !!n2 } : e : null);
      q = ol;
      fl = zr();
      al = 0;
      se3 = null;
      ho = () => se3 || re3;
      {
        const e = wn(), t6 = (n2, s) => {
          let r4;
          return (r4 = e[n2]) || (r4 = e[n2] = []), r4.push(s), (o2) => {
            r4.length > 1 ? r4.forEach((i2) => i2(o2)) : r4[0](o2);
          };
        };
        vn = t6("__VUE_INSTANCE_SETTERS__", (n2) => se3 = n2), es = t6("__VUE_SSR_SETTERS__", (n2) => xt2 = n2);
      }
      Zt = (e) => {
        const t6 = se3;
        return vn(e), e.scope.on(), () => {
          e.scope.off(), vn(t6);
        };
      };
      Ys = () => {
        se3 && se3.scope.off(), vn(null);
      };
      xt2 = false;
      pl = { get(e, t6) {
        return ie4(e, "get", ""), e[t6];
      } };
      Te = (e, t6) => li(e, t6, xt2);
      yl = "3.5.30";
      bl = function() {
        const t6 = typeof document < "u" && document.createElement("link").relList;
        return t6 && t6.supports && t6.supports("modulepreload") ? "modulepreload" : "preload";
      }();
      vl = function(e) {
        return "/assets/dock/js/" + e;
      };
      Zs = {};
      Ce2 = function(t6, n2, s) {
        let r4 = Promise.resolve();
        if (n2 && n2.length > 0) {
          let c4 = function(d2) {
            return Promise.all(d2.map((a2) => Promise.resolve(a2).then((h2) => ({ status: "fulfilled", value: h2 }), (h2) => ({ status: "rejected", reason: h2 }))));
          };
          document.getElementsByTagName("link");
          const i2 = document.querySelector("meta[property=csp-nonce]"), l6 = (i2 == null ? void 0 : i2.nonce) || (i2 == null ? void 0 : i2.getAttribute("nonce"));
          r4 = c4(n2.map((d2) => {
            if (d2 = vl(d2), d2 in Zs)
              return;
            Zs[d2] = true;
            const a2 = d2.endsWith(".css"), h2 = a2 ? '[rel="stylesheet"]' : "";
            if (document.querySelector(`link[href="${d2}"]${h2}`))
              return;
            const y = document.createElement("link");
            if (y.rel = a2 ? "stylesheet" : bl, a2 || (y.as = "script"), y.crossOrigin = "", y.href = d2, l6 && y.setAttribute("nonce", l6), document.head.appendChild(y), a2)
              return new Promise((w3, T2) => {
                y.addEventListener("load", w3), y.addEventListener("error", () => T2(new Error(`Unable to preload CSS for ${d2}`)));
              });
          }));
        }
        function o2(i2) {
          const l6 = new Event("vite:preloadError", { cancelable: true });
          if (l6.payload = i2, window.dispatchEvent(l6), !l6.defaultPrevented)
            throw i2;
        }
        return r4.then((i2) => {
          for (const l6 of i2 || [])
            l6.status === "rejected" && o2(l6.reason);
          return t6().catch(o2);
        });
      };
      xl = { name: "DockFallbackBar" };
      wl = (e, t6) => {
        const n2 = e.__vccOpts || e;
        for (const [s, r4] of t6)
          n2[s] = r4;
        return n2;
      };
      kl = { role: "banner", class: "dock-fallback-bar h-14 sticky top-0 z-50 flex items-center px-4 bg-[var(--dock-bg)] border-b border-[var(--dock-border)] text-[var(--dock-text)] text-sm" };
      Sl = wl(xl, [["render", Tl]]);
      El = (e) => {
        for (const t6 in e)
          if (t6.startsWith("aria-") || t6 === "role" || t6 === "title")
            return true;
        return false;
      };
      Xs = (e) => e === "";
      Al = (...e) => e.filter((t6, n2, s) => !!t6 && t6.trim() !== "" && s.indexOf(t6) === n2).join(" ").trim();
      Qs = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
      Cl = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (t6, n2, s) => s ? s.toUpperCase() : n2.toLowerCase());
      Pl = (e) => {
        const t6 = Cl(e);
        return t6.charAt(0).toUpperCase() + t6.slice(1);
      };
      Ct3 = { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 2, "stroke-linecap": "round", "stroke-linejoin": "round" };
      Ol = (_a, { slots: d2 }) => {
        var _b = _a, { name: e, iconNode: t6, absoluteStrokeWidth: n2, "absolute-stroke-width": s, strokeWidth: r4, "stroke-width": o2, size: i2 = Ct3.width, color: l6 = Ct3.stroke } = _b, c4 = __objRest(_b, ["name", "iconNode", "absoluteStrokeWidth", "absolute-stroke-width", "strokeWidth", "stroke-width", "size", "color"]);
        return ts("svg", __spreadValues(__spreadProps(__spreadValues(__spreadValues({}, Ct3), c4), { width: i2, height: i2, stroke: l6, "stroke-width": Xs(n2) || Xs(s) || n2 === true || s === true ? Number(r4 || o2 || Ct3["stroke-width"]) * 24 / Number(i2) : r4 || o2 || Ct3["stroke-width"], class: Al("lucide", c4.class, ...e ? [`lucide-${Qs(Pl(e))}-icon`, `lucide-${Qs(e)}`] : ["lucide-icon"]) }), !d2.default && !El(c4) && { "aria-hidden": "true" }), [...t6.map((a2) => ts(...a2)), ...d2.default ? [d2.default()] : []]);
      };
      _o = (e, t6) => (n2, { slots: s, attrs: r4 }) => ts(Ol, __spreadProps(__spreadValues(__spreadValues({}, r4), n2), { iconNode: t6, name: e }), s);
      Il = _o("bookmark-check", [["path", { d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z", key: "oz39mx" }], ["path", { d: "m9 10 2 2 4-4", key: "1gnqz4" }]]);
      Rl = _o("bookmark", [["path", { d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z", key: "oz39mx" }]]);
      Fl = 12;
      ye3 = Oe([]);
      er = false;
      mo = Te(() => ye3.value.length >= Fl);
      ke4 = Oe([]);
      tr = false;
      Kl = ["aria-label", "disabled", "title"];
      Wl = { name: "DockPinButton" };
      ql = ms(__spreadProps(__spreadValues({}, Wl), { props: { currentPath: {} }, setup(e) {
        const t6 = e, { settings: n2 } = vo(), { atLimit: s, isBookmarked: r4, addBookmark: o2, removeBookmark: i2 } = yo(), { items: l6 } = bo(), c4 = Te(() => {
          const T2 = t6.currentPath.match(/^\/([^/]+)\/([^/]+)\/([^/]+)$/);
          if (!T2)
            return null;
          const [, v2, F3, I2] = T2;
          return v2 === "dock" ? null : { app: v2, doctype: F3, docname: decodeURIComponent(I2) };
        }), d2 = Te(() => {
          var _a;
          return c4.value !== null && ((_a = n2.value) == null ? void 0 : _a.enable_bookmarks) !== false;
        }), a2 = Te(() => c4.value ? r4(c4.value.app, c4.value.doctype, c4.value.docname) : null), h2 = Te(() => a2.value !== null), y = Oe(false);
        async function w3() {
          var _a, _b;
          if (c4.value) {
            y.value = true;
            try {
              if (h2.value && a2.value)
                i2(a2.value);
              else {
                const T2 = l6.value.find((v2) => v2.app === c4.value.app && v2.doctype === c4.value.doctype && v2.docname === c4.value.docname);
                await o2({ app: c4.value.app, doctype: c4.value.doctype, docname: c4.value.docname, label: (_a = T2 == null ? void 0 : T2.label) != null ? _a : c4.value.docname, icon: (_b = T2 == null ? void 0 : T2.icon) != null ? _b : "" });
              }
            } finally {
              y.value = false;
            }
          }
        }
        return (T2, v2) => d2.value ? (Se(), bn("button", { key: 0, class: Jt(["flex items-center justify-center w-8 h-8 rounded-md transition-colors", [h2.value ? "text-[var(--dock-accent)]" : "text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10", ee(s) && !h2.value && "opacity-40 cursor-not-allowed"]]), "aria-label": h2.value ? ee(Bn)("Remove bookmark") : ee(Bn)("Bookmark this record"), disabled: y.value || ee(s) && !h2.value, title: ee(s) && !h2.value ? ee(Bn)("Bookmark limit reached (12). Remove a bookmark to add another.") : void 0, onClick: w3 }, [h2.value ? (Se(), nt(ee(Il), { key: 0, class: "w-4 h-4" })) : (Se(), nt(ee(Rl), { key: 1, class: "w-4 h-4" }))], 10, Kl)) : Qn("", true);
      } }));
      xo = "dock-sidebar-collapsed";
      on = Oe(localStorage.getItem(xo) === "true");
      ln = Oe(false);
      Gl = { class: "flex-1 flex justify-center px-4" };
      Yl = { class: "flex items-center gap-1 flex-shrink-0" };
      zl = { name: "DockNavbar" };
      dc = ms(__spreadProps(__spreadValues({}, zl), { setup(e) {
        var _a, _b, _c, _d, _e6, _f, _g;
        const { toggle: t6 } = Jl(), n2 = Oe(false), s = Oe(false), r4 = Oe(window.location.pathname);
        Ur(() => (n2.value = true, false));
        function o2() {
          s.value = window.scrollY > 4;
        }
        Dt(() => window.addEventListener("scroll", o2, { passive: true })), _n(() => window.removeEventListener("scroll", o2));
        const { registeredApps: i2, dock: l6 } = vo(), { init: c4, trackItem: d2 } = bo(), { init: a2 } = yo();
        Dt(() => {
          var _a2, _b2;
          c4((_a2 = l6.value) == null ? void 0 : _a2.recent_items), a2((_b2 = l6.value) == null ? void 0 : _b2.bookmarks);
          const A3 = window.location.pathname;
          r4.value = A3;
          const j3 = i2.value.find((N2) => A3.startsWith(N2.route));
          (j3 == null ? void 0 : j3.color) && document.documentElement.style.setProperty("--dock-accent", j3.color);
        });
        function h2() {
          const A3 = window.location.pathname;
          r4.value = A3;
          const j3 = A3.match(/^\/([^/]+)\/([^/]+)\/([^/]+)$/);
          if (j3) {
            const [, N2, ae5, be4] = j3;
            if (N2 !== "dock" && !(N2 === "app" && ae5 === "user")) {
              const Re4 = i2.value.find((dt3) => dt3.app === N2);
              d2({ app: N2, doctype: ae5, docname: decodeURIComponent(be4), label: decodeURIComponent(be4), icon: (Re4 == null ? void 0 : Re4.color, "") });
            }
          }
        }
        function y(A3) {
          const j3 = A3.detail;
          j3 && d2(j3);
        }
        Dt(() => {
          const A3 = history.pushState.bind(history);
          history.__dockPushState = A3, history.pushState = function(...j3) {
            A3(...j3), h2();
          }, window.addEventListener("popstate", h2), window.addEventListener("dock:trackVisit", y);
        }), _n(() => {
          history.__dockPushState && (history.pushState = history.__dockPushState, delete history.__dockPushState), window.removeEventListener("popstate", h2), window.removeEventListener("dock:trackVisit", y);
        });
        const w3 = (_g = (_f = (_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.installed_apps) == null ? void 0 : _c.includes("jana")) != null ? _f : (_e6 = (_d = window.dockBoot) == null ? void 0 : _d.installed_apps) == null ? void 0 : _e6.includes("jana")) != null ? _g : false, T2 = Ae2(() => Ce2(() => Promise.resolve().then(() => (init_DockSidebarToggle_CmHh0zMR(), DockSidebarToggle_CmHh0zMR_exports)), [])), v2 = Ae2(() => Ce2(() => Promise.resolve().then(() => (init_DockAppLabel_BUBzNJoT(), DockAppLabel_BUBzNJoT_exports)), [])), F3 = Ae2(() => Ce2(() => Promise.resolve().then(() => (init_DockSearch_BlWtw5wa(), DockSearch_BlWtw5wa_exports)), [])), I2 = Ae2(() => Ce2(() => Promise.resolve().then(() => (init_DockTimer_tucfUicX(), DockTimer_tucfUicX_exports)), [])), P3 = Ae2(() => Ce2(() => Promise.resolve().then(() => (init_DockTimerStaleWarning_Bo8qkZM6(), DockTimerStaleWarning_Bo8qkZM6_exports)), [])), M2 = Ae2(() => Ce2(() => Promise.resolve().then(() => (init_DockCalendarIcon_BKljMvxK(), DockCalendarIcon_BKljMvxK_exports)), [])), C2 = Ae2(() => Ce2(() => Promise.resolve().then(() => (init_DockPeopleIcon_BS1osiom(), DockPeopleIcon_BS1osiom_exports)), [])), V4 = Ae2(() => Ce2(() => Promise.resolve().then(() => (init_DockBell_XUmq9IaI(), DockBell_XUmq9IaI_exports)), [])), G3 = Ae2(() => Ce2(() => Promise.resolve().then(() => (init_DockJana_CeMkKhHe(), DockJana_CeMkKhHe_exports)), [])), te5 = Ae2(() => Ce2(() => Promise.resolve().then(() => (init_DockAppSwitcher_DF7FlgZm(), DockAppSwitcher_DF7FlgZm_exports)), __vite__mapDeps2([0]))), Q4 = Ae2(() => Ce2(() => Promise.resolve().then(() => (init_DockAvatar_NKUAtNRZ(), DockAvatar_NKUAtNRZ_exports)), []));
        return (A3, j3) => (Se(), bn(me, null, [n2.value ? (Se(), nt(Sl, { key: 0 })) : (Se(), bn("header", { key: 1, role: "banner", class: Jt(["dock-navbar h-14 sticky top-0 z-50 flex items-center gap-2 px-4 select-none bg-[var(--dock-bg)] text-[var(--dock-text)] transition-shadow duration-150", s.value ? "shadow-sm" : "border-b border-[var(--dock-border)] border-opacity-50"]) }, [q(ee(T2), { class: "flex-shrink-0", onToggle: ee(t6) }, null, 8, ["onToggle"]), q(ee(v2), { class: "flex-shrink-0" }), Kt("div", Gl, [q(ee(F3))]), Kt("div", Yl, [q(ql, { "current-path": r4.value }, null, 8, ["current-path"]), q(ee(I2)), q(ee(M2)), q(ee(C2)), q(ee(V4)), ee(w3) ? (Se(), nt(ee(G3), { key: 0 })) : Qn("", true), q(ee(te5)), q(ee(Q4))])], 2)), n2.value ? Qn("", true) : (Se(), nt(ee(P3), { key: 2 }))], 64));
      } }));
    }
  });

  // ../dock/dock/public/js/chunks/runtime-dom.esm-bundler-DJPzte74.js
  function te4(t6) {
    const e = {};
    for (const c4 in t6)
      c4 in Mt3 || (e[c4] = t6[c4]);
    if (t6.css === false)
      return e;
    const { name: n2 = "v", type: s, duration: o2, enterFromClass: r4 = `${n2}-enter-from`, enterActiveClass: i2 = `${n2}-enter-active`, enterToClass: a2 = `${n2}-enter-to`, appearFromClass: f2 = r4, appearActiveClass: u2 = i2, appearToClass: l6 = a2, leaveFromClass: p3 = `${n2}-leave-from`, leaveActiveClass: h2 = `${n2}-leave-active`, leaveToClass: _2 = `${n2}-leave-to` } = t6, M2 = ee4(o2), Lt3 = M2 && M2[0], Dt3 = M2 && M2[1], { onBeforeEnter: X4, onEnter: Z4, onEnterCancelled: J5, onLeave: Q4, onLeaveCancelled: It3, onBeforeAppear: xt3 = X4, onAppear: Ot3 = Z4, onAppearCancelled: Pt3 = J5 } = e, H6 = (c4, d2, E2, O) => {
      c4._enterCancelled = O, w2(c4, d2 ? l6 : a2), w2(c4, d2 ? u2 : i2), E2 && E2();
    }, Y3 = (c4, d2) => {
      c4._isLeaving = false, w2(c4, p3), w2(c4, _2), w2(c4, h2), d2 && d2();
    }, k3 = (c4) => (d2, E2) => {
      const O = c4 ? Ot3 : Z4, tt3 = () => H6(d2, c4, E2);
      A2(O, [d2, tt3]), ot2(() => {
        w2(d2, c4 ? f2 : r4), g2(d2, c4 ? l6 : a2), st3(O) || it3(d2, s, Lt3, tt3);
      });
    };
    return fe3(e, { onBeforeEnter(c4) {
      A2(X4, [c4]), g2(c4, r4), g2(c4, i2);
    }, onBeforeAppear(c4) {
      A2(xt3, [c4]), g2(c4, f2), g2(c4, u2);
    }, onEnter: k3(false), onAppear: k3(true), onLeave(c4, d2) {
      c4._isLeaving = true;
      const E2 = () => Y3(c4, d2);
      g2(c4, p3), c4._enterCancelled ? (g2(c4, h2), at3(c4)) : (at3(c4), g2(c4, h2)), ot2(() => {
        c4._isLeaving && (w2(c4, p3), g2(c4, _2), st3(Q4) || it3(c4, s, Dt3, E2));
      }), A2(Q4, [c4, E2]);
    }, onEnterCancelled(c4) {
      H6(c4, false, void 0, true), A2(J5, [c4]);
    }, onAppearCancelled(c4) {
      H6(c4, true, void 0, true), A2(Pt3, [c4]);
    }, onLeaveCancelled(c4) {
      Y3(c4), A2(It3, [c4]);
    } });
  }
  function ee4(t6) {
    if (t6 == null)
      return null;
    if (W3(t6))
      return [F2(t6.enter), F2(t6.leave)];
    {
      const e = F2(t6);
      return [e, e];
    }
  }
  function F2(t6) {
    return Xl(t6);
  }
  function g2(t6, e) {
    e.split(/\s+/).forEach((n2) => n2 && t6.classList.add(n2)), (t6[x2] || (t6[x2] = /* @__PURE__ */ new Set())).add(e);
  }
  function w2(t6, e) {
    e.split(/\s+/).forEach((s) => s && t6.classList.remove(s));
    const n2 = t6[x2];
    n2 && (n2.delete(e), n2.size || (t6[x2] = void 0));
  }
  function ot2(t6) {
    requestAnimationFrame(() => {
      requestAnimationFrame(t6);
    });
  }
  function it3(t6, e, n2, s) {
    const o2 = t6._endId = ++ne4, r4 = () => {
      o2 === t6._endId && s();
    };
    if (n2 != null)
      return setTimeout(r4, n2);
    const { type: i2, timeout: a2, propCount: f2 } = se4(t6, e);
    if (!i2)
      return s();
    const u2 = i2 + "end";
    let l6 = 0;
    const p3 = () => {
      t6.removeEventListener(u2, h2), r4();
    }, h2 = (_2) => {
      _2.target === t6 && ++l6 >= f2 && p3();
    };
    setTimeout(() => {
      l6 < f2 && p3();
    }, a2 + 1), t6.addEventListener(u2, h2);
  }
  function se4(t6, e) {
    const n2 = window.getComputedStyle(t6), s = (M2) => (n2[M2] || "").split(", "), o2 = s(`${C}Delay`), r4 = s(`${C}Duration`), i2 = rt2(o2, r4), a2 = s(`${N}Delay`), f2 = s(`${N}Duration`), u2 = rt2(a2, f2);
    let l6 = null, p3 = 0, h2 = 0;
    e === C ? i2 > 0 && (l6 = C, p3 = i2, h2 = r4.length) : e === N ? u2 > 0 && (l6 = N, p3 = u2, h2 = f2.length) : (p3 = Math.max(i2, u2), l6 = p3 > 0 ? i2 > u2 ? C : N : null, h2 = l6 ? l6 === C ? r4.length : f2.length : 0);
    const _2 = l6 === C && /\b(?:transform|all)(?:,|$)/.test(s(`${C}Property`).toString());
    return { type: l6, timeout: p3, propCount: h2, hasTransform: _2 };
  }
  function rt2(t6, e) {
    for (; t6.length < e.length; )
      t6 = t6.concat(t6);
    return Math.max(...e.map((n2, s) => ct3(n2) + ct3(t6[s])));
  }
  function ct3(t6) {
    return t6 === "auto" ? 0 : Number(t6.slice(0, -1).replace(",", ".")) * 1e3;
  }
  function at3(t6) {
    return (t6 ? t6.ownerDocument : document).body.offsetHeight;
  }
  function oe4(t6, e, n2) {
    const s = t6[x2];
    s && (e = (e ? [e, ...s] : [...s]).join(" ")), e == null ? t6.removeAttribute("class") : n2 ? t6.setAttribute("class", e) : t6.className = e;
  }
  function ce6(t6, e, n2) {
    const s = t6.style, o2 = ne3(n2);
    let r4 = false;
    if (n2 && !o2) {
      if (e)
        if (ne3(e))
          for (const i2 of e.split(";")) {
            const a2 = i2.slice(0, i2.indexOf(":")).trim();
            n2[a2] == null && V3(s, a2, "");
          }
        else
          for (const i2 in e)
            n2[i2] == null && V3(s, i2, "");
      for (const i2 in n2)
        i2 === "display" && (r4 = true), V3(s, i2, n2[i2]);
    } else if (o2) {
      if (e !== n2) {
        const i2 = s[ie5];
        i2 && (n2 += ";" + i2), s.cssText = n2, r4 = re4.test(n2);
      }
    } else
      e && t6.removeAttribute("style");
    R2 in t6 && (t6[R2] = r4 ? s.display : "", t6[yt3] && (s.display = "none"));
  }
  function V3(t6, e, n2) {
    if (L2(n2))
      n2.forEach((s) => V3(t6, e, s));
    else if (n2 == null && (n2 = ""), e.startsWith("--"))
      t6.setProperty(e, n2);
    else {
      const s = ae4(t6, e);
      ft3.test(n2) ? t6.setProperty(qt2(s), n2.replace(ft3, ""), "important") : t6[s] = n2;
    }
  }
  function ae4(t6, e) {
    const n2 = B2[e];
    if (n2)
      return n2;
    let s = We2(e);
    if (s !== "filter" && s in t6)
      return B2[e] = s;
    s = is(s);
    for (let o2 = 0; o2 < ut3.length; o2++) {
      const r4 = ut3[o2] + s;
      if (r4 in t6)
        return B2[e] = r4;
    }
    return e;
  }
  function dt2(t6, e, n2, s, o2, r4 = Ql(e)) {
    s && e.startsWith("xlink:") ? n2 == null ? t6.removeAttributeNS(lt3, e.slice(6, e.length)) : t6.setAttributeNS(lt3, e, n2) : n2 == null || r4 && !ec(n2) ? t6.removeAttribute(e) : t6.setAttribute(e, r4 ? "" : Ke3(n2) ? String(n2) : n2);
  }
  function pt3(t6, e, n2, s, o2) {
    if (e === "innerHTML" || e === "textContent") {
      n2 != null && (t6[e] = e === "innerHTML" ? _t3(n2) : n2);
      return;
    }
    const r4 = t6.tagName;
    if (e === "value" && r4 !== "PROGRESS" && !r4.includes("-")) {
      const a2 = r4 === "OPTION" ? t6.getAttribute("value") || "" : t6.value, f2 = n2 == null ? t6.type === "checkbox" ? "on" : "" : String(n2);
      (a2 !== f2 || !("_value" in t6)) && (t6.value = f2), n2 == null && t6.removeAttribute(e), t6._value = n2;
      return;
    }
    let i2 = false;
    if (n2 === "" || n2 == null) {
      const a2 = typeof t6[e];
      a2 === "boolean" ? n2 = ec(n2) : n2 == null && a2 === "string" ? (n2 = "", i2 = true) : a2 === "number" && (n2 = 0, i2 = true);
    }
    try {
      t6[e] = n2;
    } catch (e2) {
    }
    i2 && t6.removeAttribute(o2 || e);
  }
  function b(t6, e, n2, s) {
    t6.addEventListener(e, n2, s);
  }
  function fe4(t6, e, n2, s) {
    t6.removeEventListener(e, n2, s);
  }
  function ue4(t6, e, n2, s, o2 = null) {
    const r4 = t6[mt3] || (t6[mt3] = {}), i2 = r4[e];
    if (s && i2)
      i2.value = s;
    else {
      const [a2, f2] = le4(e);
      if (s) {
        const u2 = r4[e] = me5(s, o2);
        b(t6, a2, u2, f2);
      } else
        i2 && (fe4(t6, a2, i2, f2), r4[e] = void 0);
    }
  }
  function le4(t6) {
    let e;
    if (ht3.test(t6)) {
      e = {};
      let s;
      for (; s = t6.match(ht3); )
        t6 = t6.slice(0, t6.length - s[0].length), e[s[0].toLowerCase()] = true;
    }
    return [t6[2] === ":" ? t6.slice(3) : qt2(t6.slice(2)), e];
  }
  function me5(t6, e) {
    const n2 = (s) => {
      if (!s._vts)
        s._vts = Date.now();
      else if (s._vts <= n2.attached)
        return;
      qe2(he5(s, n2.value), e, 5, [s]);
    };
    return n2.value = t6, n2.attached = pe4(), n2;
  }
  function he5(t6, e) {
    if (L2(e)) {
      const n2 = t6.stopImmediatePropagation;
      return t6.stopImmediatePropagation = () => {
        n2.call(t6), t6._stopped = true;
      }, e.map((s) => (o2) => !o2._stopped && s && s(o2));
    } else
      return e;
  }
  function Se4(t6, e, n2, s) {
    if (s)
      return !!(e === "innerHTML" || e === "textContent" || e in t6 && gt3(e) && $(n2));
    if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "autocorrect" || e === "sandbox" && t6.tagName === "IFRAME" || e === "form" || e === "list" && t6.tagName === "INPUT" || e === "type" && t6.tagName === "TEXTAREA")
      return false;
    if (e === "width" || e === "height") {
      const o2 = t6.tagName;
      if (o2 === "IMG" || o2 === "VIDEO" || o2 === "CANVAS" || o2 === "SOURCE")
        return false;
    }
    return gt3(e) && ne3(n2) ? false : e in t6;
  }
  function be3(t6, e) {
    const n2 = t6._def.props;
    if (!n2)
      return false;
    const s = We2(e);
    return Array.isArray(n2) ? n2.some((o2) => We2(o2) === s) : Object.keys(n2).some((o2) => We2(o2) === s);
  }
  function Ce5(t6) {
    t6.target.composing = true;
  }
  function St2(t6) {
    const e = t6.target;
    e.composing && (e.composing = false, e.dispatchEvent(new Event("input")));
  }
  function bt3(t6, e, n2) {
    return e && (t6 = t6.trim()), n2 && (t6 = Co(t6)), t6;
  }
  function Ne4() {
    return Et3 || (Et3 = ac(ye4));
  }
  function Le4(t6) {
    if (t6 instanceof SVGElement)
      return "svg";
    if (typeof MathMLElement == "function" && t6 instanceof MathMLElement)
      return "mathml";
  }
  function De3(t6) {
    return ne3(t6) ? document.querySelector(t6) : t6;
  }
  var j2, et3, _t3, Zt2, Jt2, S4, nt3, Qt, C, N, x2, Mt3, Yt2, kt2, xe, A2, st3, ne4, R2, yt3, ie5, re4, ft3, ut3, B2, lt3, mt3, ht3, U2, de5, pe4, gt3, ge4, v, m3, Ct, we4, _e5, Ve, Me2, $e2, ye4, Et3, Re3;
  var init_runtime_dom_esm_bundler_DJPzte74 = __esm({
    "../dock/dock/public/js/chunks/runtime-dom.esm-bundler-DJPzte74.js"() {
      init_dock_navbar_esm();
      et3 = typeof window < "u" && window.trustedTypes;
      if (et3)
        try {
          j2 = et3.createPolicy("vue", { createHTML: (t6) => t6 });
        } catch (e) {
        }
      _t3 = j2 ? (t6) => j2.createHTML(t6) : (t6) => t6;
      Zt2 = "http://www.w3.org/2000/svg";
      Jt2 = "http://www.w3.org/1998/Math/MathML";
      S4 = typeof document < "u" ? document : null;
      nt3 = S4 && S4.createElement("template");
      Qt = { insert: (t6, e, n2) => {
        e.insertBefore(t6, n2 || null);
      }, remove: (t6) => {
        const e = t6.parentNode;
        e && e.removeChild(t6);
      }, createElement: (t6, e, n2, s) => {
        const o2 = e === "svg" ? S4.createElementNS(Zt2, t6) : e === "mathml" ? S4.createElementNS(Jt2, t6) : n2 ? S4.createElement(t6, { is: n2 }) : S4.createElement(t6);
        return t6 === "select" && s && s.multiple != null && o2.setAttribute("multiple", s.multiple), o2;
      }, createText: (t6) => S4.createTextNode(t6), createComment: (t6) => S4.createComment(t6), setText: (t6, e) => {
        t6.nodeValue = e;
      }, setElementText: (t6, e) => {
        t6.textContent = e;
      }, parentNode: (t6) => t6.parentNode, nextSibling: (t6) => t6.nextSibling, querySelector: (t6) => S4.querySelector(t6), setScopeId(t6, e) {
        t6.setAttribute(e, "");
      }, insertStaticContent(t6, e, n2, s, o2, r4) {
        const i2 = n2 ? n2.previousSibling : e.lastChild;
        if (o2 && (o2 === r4 || o2.nextSibling))
          for (; e.insertBefore(o2.cloneNode(true), n2), !(o2 === r4 || !(o2 = o2.nextSibling)); )
            ;
        else {
          nt3.innerHTML = _t3(s === "svg" ? `<svg>${t6}</svg>` : s === "mathml" ? `<math>${t6}</math>` : t6);
          const a2 = nt3.content;
          if (s === "svg" || s === "mathml") {
            const f2 = a2.firstChild;
            for (; f2.firstChild; )
              a2.appendChild(f2.firstChild);
            a2.removeChild(f2);
          }
          e.insertBefore(a2, n2);
        }
        return [i2 ? i2.nextSibling : e.firstChild, n2 ? n2.previousSibling : e.lastChild];
      } };
      C = "transition";
      N = "animation";
      x2 = Symbol("_vtc");
      Mt3 = { name: String, type: String, css: { type: Boolean, default: true }, duration: [String, Number, Object], enterFromClass: String, enterActiveClass: String, enterToClass: String, appearFromClass: String, appearActiveClass: String, appearToClass: String, leaveFromClass: String, leaveActiveClass: String, leaveToClass: String };
      Yt2 = fe3({}, xi, Mt3);
      kt2 = (t6) => (t6.displayName = "Transition", t6.props = Yt2, t6);
      xe = kt2((t6, { slots: e }) => ts(oc, te4(t6), e));
      A2 = (t6, e = []) => {
        L2(t6) ? t6.forEach((n2) => n2(...e)) : t6 && t6(...e);
      };
      st3 = (t6) => t6 ? L2(t6) ? t6.some((e) => e.length > 1) : t6.length > 1 : false;
      ne4 = 0;
      R2 = Symbol("_vod");
      yt3 = Symbol("_vsh");
      ie5 = Symbol("");
      re4 = /(?:^|;)\s*display\s*:/;
      ft3 = /\s*!important$/;
      ut3 = ["Webkit", "Moz", "ms"];
      B2 = {};
      lt3 = "http://www.w3.org/1999/xlink";
      mt3 = Symbol("_vei");
      ht3 = /(?:Once|Passive|Capture)$/;
      U2 = 0;
      de5 = Promise.resolve();
      pe4 = () => U2 || (de5.then(() => U2 = 0), U2 = Date.now());
      gt3 = (t6) => t6.charCodeAt(0) === 111 && t6.charCodeAt(1) === 110 && t6.charCodeAt(2) > 96 && t6.charCodeAt(2) < 123;
      ge4 = (t6, e, n2, s, o2, r4) => {
        const i2 = o2 === "svg";
        e === "class" ? oe4(t6, s, i2) : e === "style" ? ce6(t6, n2, s) : ss(e) ? sr(e) || ue4(t6, e, n2, s, r4) : (e[0] === "." ? (e = e.slice(1), true) : e[0] === "^" ? (e = e.slice(1), false) : Se4(t6, e, s, i2)) ? (pt3(t6, e, s), !t6.tagName.includes("-") && (e === "value" || e === "checked" || e === "selected") && dt2(t6, e, s, i2, r4, e !== "value")) : t6._isVueCE && (be3(t6, e) || t6._def.__asyncLoader && (/[A-Z]/.test(e) || !ne3(s))) ? pt3(t6, We2(e), s, r4, e) : (e === "true-value" ? t6._trueValue = s : e === "false-value" && (t6._falseValue = s), dt2(t6, e, s, i2));
      };
      v = (t6) => {
        const e = t6.props["onUpdate:modelValue"] || false;
        return L2(e) ? (n2) => In(e, n2) : e;
      };
      m3 = Symbol("_assign");
      Ct = { created(t6, { modifiers: { lazy: e, trim: n2, number: s } }, o2) {
        t6[m3] = v(o2);
        const r4 = s || o2.props && o2.props.type === "number";
        b(t6, e ? "change" : "input", (i2) => {
          i2.target.composing || t6[m3](bt3(t6.value, n2, r4));
        }), (n2 || r4) && b(t6, "change", () => {
          t6.value = bt3(t6.value, n2, r4);
        }), e || (b(t6, "compositionstart", Ce5), b(t6, "compositionend", St2), b(t6, "change", St2));
      }, mounted(t6, { value: e }) {
        t6.value = e != null ? e : "";
      }, beforeUpdate(t6, { value: e, oldValue: n2, modifiers: { lazy: s, trim: o2, number: r4 } }, i2) {
        if (t6[m3] = v(i2), t6.composing)
          return;
        const a2 = (r4 || t6.type === "number") && !/^0\d/.test(t6.value) ? Co(t6.value) : t6.value, f2 = e != null ? e : "";
        a2 !== f2 && (document.activeElement === t6 && t6.type !== "range" && (s && e === n2 || o2 && t6.value.trim() === f2) || (t6.value = f2));
      } };
      we4 = ["ctrl", "shift", "alt", "meta"];
      _e5 = { stop: (t6) => t6.stopPropagation(), prevent: (t6) => t6.preventDefault(), self: (t6) => t6.target !== t6.currentTarget, ctrl: (t6) => !t6.ctrlKey, shift: (t6) => !t6.shiftKey, alt: (t6) => !t6.altKey, meta: (t6) => !t6.metaKey, left: (t6) => "button" in t6 && t6.button !== 0, middle: (t6) => "button" in t6 && t6.button !== 1, right: (t6) => "button" in t6 && t6.button !== 2, exact: (t6, e) => we4.some((n2) => t6[`${n2}Key`] && !e.includes(n2)) };
      Ve = (t6, e) => {
        if (!t6)
          return t6;
        const n2 = t6._withMods || (t6._withMods = {}), s = e.join(".");
        return n2[s] || (n2[s] = (o2, ...r4) => {
          for (let i2 = 0; i2 < e.length; i2++) {
            const a2 = _e5[e[i2]];
            if (a2 && a2(o2, e))
              return;
          }
          return t6(o2, ...r4);
        });
      };
      Me2 = { esc: "escape", space: " ", up: "arrow-up", left: "arrow-left", right: "arrow-right", down: "arrow-down", delete: "backspace" };
      $e2 = (t6, e) => {
        const n2 = t6._withKeys || (t6._withKeys = {}), s = e.join(".");
        return n2[s] || (n2[s] = (o2) => {
          if (!("key" in o2))
            return;
          const r4 = qt2(o2.key);
          if (e.some((i2) => i2 === r4 || Me2[i2] === r4))
            return t6(o2);
        });
      };
      ye4 = fe3({ patchProp: ge4 }, Qt);
      Re3 = (...t6) => {
        const e = Ne4().createApp(...t6), { mount: n2 } = e;
        return e.mount = (s) => {
          const o2 = De3(s);
          if (!o2)
            return;
          const r4 = e._component;
          !$(r4) && !r4.render && !r4.template && (r4.template = o2.innerHTML), o2.nodeType === 1 && (o2.textContent = "");
          const i2 = n2(o2, false, Le4(o2));
          return o2 instanceof Element && (o2.removeAttribute("v-cloak"), o2.setAttribute("data-v-app", "")), i2;
        }, e;
      };
    }
  });

  // ../dock/dock/public/js/dock.bundle.js
  init_runtime_dom_esm_bundler_DJPzte74();
  init_dock_navbar_esm();
  function r3() {
    var _a, _b, _c;
    if (!((_c = (_b = (_a = window.frappe) == null ? void 0 : _a.boot) == null ? void 0 : _b.dock) == null ? void 0 : _c.installed))
      return;
    const t6 = document.querySelector(".navbar.navbar-fixed-top");
    if (t6) {
      const e = document.createElement("div");
      t6.replaceWith(e), Re3(dc).mount(e);
    } else {
      const e = document.createElement("div");
      document.body.prepend(e), Re3(dc).mount(e);
    }
  }
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", r3) : r3();
})();
//# sourceMappingURL=dock.bundle.OJVWRWU2.js.map
