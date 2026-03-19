// Auto-generated IIFE loader — do not edit. See vite.config.ts deskBundleLoader().
// Frappe loads this via <script type="text/javascript"> (not module), so we
// use dynamic import() to bootstrap the real ESM entry point.
;(function() {
  function mount() {
    var boot = window.frappe && window.frappe.boot && window.frappe.boot.dock;
    if (!boot || !boot.installed) return;
    import('/assets/dock/js/dock-desk.js').catch(function(err) {
      console.error('[Dock] Failed to load navbar module:', err);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
