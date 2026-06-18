<script lang="ts" setup>
const links = [
	{ key: "main", text: "Главная", url: "/" },
	{ key: "contacts", text: "Контакты", url: "/contacts" },
	{ key: "about", text: "О нас", url: "/about" },
	{ key: "profile", text: "Профиль", url: "/profile" },
];
</script>
<template>
	<header class="header">
		<div class="header__logo">
			<div class="header__logo-icon">
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
					<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</div>
			<div class="header__logo-text">
				<span class="header__logo-title">WithoutAI</span>
				<span class="header__logo-sub">Platform</span>
			</div>
		</div>

		<nav class="header__nav">
			<a v-for="item in links" :key="item.key" :href="item.url" class="header__link">
				{{ item.text }}
			</a>
		</nav>

		<button class="header__btn">
			<svg width="15" height="15" viewBox="0 0 24 24" fill="none">
				<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
			Выйти
		</button>

		<div class="header__border" />
	</header>
</template>
<style lang="scss" scoped>
$cyan: #22d3ee;
$cyan-dim: rgba(#22d3ee, 0.15);
$cyan-glow: rgba(#22d3ee, 0.4);

.header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
	height: 60px;
	padding: 0 1.5rem;
	display: flex;
	align-items: center;
	gap: 2rem;
	background: rgba(8, 8, 14, 0.75);
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);

	&__border {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, $cyan-dim 30%, $cyan-dim 70%, transparent);
	}

	&__logo {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		flex-shrink: 0;
	}

	&__logo-icon {
		width: 34px;
		height: 34px;
		border-radius: 8px;
		background: rgba($cyan, 0.1);
		border: 1px solid rgba($cyan, 0.25);
		display: flex;
		align-items: center;
		justify-content: center;
		color: $cyan;
		box-shadow: 0 0 12px rgba($cyan, 0.15);
	}

	&__logo-text {
		display: flex;
		flex-direction: column;
		line-height: 1;
		gap: 2px;
	}

	&__logo-title {
		font-size: 0.95rem;
		font-weight: 600;
		color: $cyan;
		letter-spacing: 0.02em;
	}

	&__logo-sub {
		font-size: 0.6rem;
		color: rgba(255, 255, 255, 0.3);
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	&__nav {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		margin: 0 auto;
	}

	&__link {
		position: relative;
		padding: 0.4rem 0.85rem;
		border-radius: 6px;
		color: rgba(255, 255, 255, 0.5);
		text-decoration: none;
		font-size: 0.875rem;
		letter-spacing: 0.01em;
		transition: color 0.2s, background 0.2s;

		&:hover {
			color: rgba(255, 255, 255, 0.9);
			background: rgba(255, 255, 255, 0.06);
		}

		&.active {
			color: $cyan;
			background: $cyan-dim;

			&::after {
				content: "";
				position: absolute;
				bottom: -1px;
				left: 20%;
				right: 20%;
				height: 2px;
				background: $cyan;
				border-radius: 2px;
				box-shadow: 0 0 8px $cyan-glow;
			}
		}
	}

	&__btn {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.4rem 0.9rem;
		border-radius: 8px;
		border: 1px solid rgba(239, 68, 68, 0.35);
		background: rgba(239, 68, 68, 0.08);
		color: rgba(239, 68, 68, 0.8);
		font-size: 0.85rem;
		cursor: pointer;
		transition: background 0.2s, color 0.2s, border-color 0.2s;

		&:hover {
			background: rgba(239, 68, 68, 0.15);
			border-color: rgba(239, 68, 68, 0.6);
			color: #ef4444;
		}
	}
}
</style>
