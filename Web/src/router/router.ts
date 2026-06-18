import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", component: () => import("../pages/Home.vue") },
		{ path: "/catalog", component: () => import("../pages/Catalog.vue") },
		{ path: "/how", component: () => import("../pages/How.vue") },
		{ path: "/devs", component: () => import("../pages/Devs.vue") },
		{ path: "/pricing", component: () => import("../pages/Pricing.vue") },
		{ path: "/about", component: () => import("../pages/About.vue") },
		{ path: "/contacts", component: () => import("../pages/Contacts.vue") },
		{ path: "/blog", component: () => import("../pages/Blog.vue") },
		{ path: "/privacy", component: () => import("../pages/Privacy.vue") },
		{ path: "/terms", component: () => import("../pages/Terms.vue") },
		{ path: "/login", component: () => import("../pages/Login.vue") },
		{ path: "/:pathMatch(.*)*", component: () => import("../pages/NotFound.vue") },
	],
});

export default router;
