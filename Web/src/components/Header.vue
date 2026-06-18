<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { useAuth } from "../composables/useAuth";

const { user, open, logout } = useAuth();

const links = [
	{ key: "catalog", text: "Знайти розробника", url: "/catalog" },
	{ key: "how", text: "Як це працює", url: "/how" },
	{ key: "devs", text: "Для розробників", url: "/devs" },
	{ key: "pricing", text: "Тарифи", url: "/pricing" },
];
</script>
<template>
	<header class="header">
		<RouterLink to="/" class="logo">
			<svg class="logo__icon" viewBox="0 0 36 36" fill="none">
				<polygon points="18,2 33,10 33,26 18,34 3,26 3,10" fill="rgba(168,85,247,0.12)" stroke="rgba(168,85,247,0.6)" stroke-width="1.5"/>
				<text x="18" y="23" text-anchor="middle" font-size="11" font-weight="700" font-family="monospace" fill="#a855f7">&lt;/&gt;</text>
			</svg>
			<span class="logo__name">Hexly</span>
		</RouterLink>

		<nav class="nav">
			<RouterLink v-for="item in links" :key="item.key" :to="item.url" class="nav__link">
				{{ item.text }}
			</RouterLink>
		</nav>

		<div class="actions">
			<template v-if="user">
				<span class="actions__name">{{ user.name }}</span>
				<button class="actions__logout" @click="logout">Вийти</button>
			</template>
			<template v-else>
				<button class="actions__signin" @click="open">Увійти</button>
				<button class="actions__post" @click="open('login')">Розмістити замовлення</button>
			</template>
		</div>

		<div class="header__line" />
	</header>
</template>
<style lang="scss" scoped>
$violet: #a855f7;
$violet-dim: rgba(#a855f7, 0.12);
$violet-glow: rgba(#a855f7, 0.35);

.header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
	height: 64px;
	padding: 0 2rem;
	display: flex;
	align-items: center;
	gap: 2.5rem;
	background: rgba(8, 6, 14, 0.8);
	backdrop-filter: blur(24px);

	&__line {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, $violet-glow 40%, $violet-glow 60%, transparent);
	}
}

.logo {
	display: flex;
	align-items: center;
	gap: 0.55rem;
	text-decoration: none;
	flex-shrink: 0;

	&__icon {
		width: 36px;
		height: 36px;
		filter: drop-shadow(0 0 6px $violet-glow);
	}

	&__name {
		font-size: 1.15rem;
		font-weight: 700;
		color: #fff;
		letter-spacing: -0.02em;
	}
}

.nav {
	display: flex;
	align-items: center;
	gap: 0.25rem;
	margin: 0 auto;

	&__link {
		padding: 0.4rem 0.8rem;
		border-radius: 6px;
		color: rgba(255, 255, 255, 0.5);
		text-decoration: none;
		font-size: 0.875rem;
		transition: color 0.15s, background 0.15s;

		&:hover {
			color: rgba(255, 255, 255, 0.9);
			background: rgba(255, 255, 255, 0.06);
		}
	}
}

.actions {
	display: flex;
	align-items: center;
	gap: 0.75rem;
	flex-shrink: 0;

	&__name {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.7);
	}

	&__logout {
		padding: 0.4rem 0.9rem;
		background: none;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: rgba(255, 255, 255, 0.4);
		font-size: 0.875rem;
		cursor: pointer;
		transition: color 0.15s, border-color 0.15s;

		&:hover { color: #fff; border-color: rgba(255, 255, 255, 0.25); }
	}

	&__signin {
		padding: 0.4rem 0.9rem;
		color: rgba(255, 255, 255, 0.55);
		background: none;
		border: none;
		font-size: 0.875rem;
		border-radius: 8px;
		cursor: pointer;
		transition: color 0.15s;

		&:hover { color: #fff; }
	}

	&__post {
		padding: 0.45rem 1.1rem;
		background: $violet-dim;
		border: 1px solid rgba($violet, 0.4);
		color: $violet;
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 600;
		border-radius: 8px;
		transition: background 0.15s, box-shadow 0.15s, color 0.15s;

		&:hover {
			background: rgba($violet, 0.2);
			box-shadow: 0 0 16px $violet-glow;
			color: lighten(#a855f7, 12%);
		}
	}
}
</style>
