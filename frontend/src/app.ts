// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic
//
// dock-app.js entry — full Vue SPA for /dock/* pages.
// Served via website_route_rules → dock/www/dock.html.

import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#dock-app')
