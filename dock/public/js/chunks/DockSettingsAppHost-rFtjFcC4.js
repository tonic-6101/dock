import{defineComponent as g,computed as s,defineAsyncComponent as f,openBlock as a,createElementBlock as l,toDisplayString as r,unref as c,createCommentVNode as u,createBlock as h,resolveDynamicComponent as y,createElementVNode as m}from"/assets/dock/js/vendor/vue.esm.js";import{u as _}from"./vue-router-CXl03l8t.js";import{u as k,a as t}from"./DockNavbar.vue_vue_type_script_setup_true_lang-aBIQH_KM.js";const b={class:"max-w-2xl mx-auto px-6 py-8"},w={key:0,class:"text-xl font-semibold text-gray-900 dark:text-white mb-8"},C={key:2,class:"text-center py-20"},S={class:"text-lg font-semibold text-gray-900 dark:text-white mb-2"},B={class:"text-sm text-gray-500 dark:text-gray-400"},N={name:"DockSettingsAppHost"},E=g({...N,setup($){const i=_(),{dock:p}=k(),x=s(()=>i.params.appName),e=s(()=>(p.value?.settings_sections??[]).find(o=>o.route===x.value)??null),d=s(()=>!e.value?.bundle||!e.value?.component?null:f({loader:()=>import(e.value.bundle).then(n=>{const o=n[e.value.component]??n.default;if(!o)throw new Error(`Component "${e.value.component}" not found in bundle "${e.value.bundle}"`);return o}),loadingComponent:{template:`<div class="flex items-center justify-center py-20">
        <div class="text-center">
          <div class="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 border-t-dock-500 rounded-full animate-spin mx-auto mb-3"></div>
          <p class="text-sm text-gray-500 dark:text-gray-400">${t("Loading settings...")}</p>
        </div>
      </div>`},errorComponent:{template:`<div class="max-w-md mx-auto px-6 py-16 text-center">
        <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
          <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">${t("Failed to load settings")}</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">${t("The settings component could not be loaded. Please reload the page.")}</p>
      </div>`},delay:200,timeout:15e3})),v=s(()=>i.query.section??void 0);return(n,o)=>(a(),l("div",b,[e.value?(a(),l("h1",w,r(e.value.label)+" "+r(c(t)("Settings")),1)):u("",!0),d.value?(a(),h(y(d.value),{key:1,section:v.value},null,8,["section"])):e.value?u("",!0):(a(),l("div",C,[m("h2",S,r(c(t)("Settings not found")),1),m("p",B,r(c(t)("No settings registered for this app.")),1)]))]))}});export{E as default};
