<template>
	<main class="not-found">
		<div class="not-found__bg" />

		<div class="not-found__content">
			<div class="glitch" data-text="404">404</div>
			<h1 class="not-found__title">Сторінку не знайдено</h1>
			<p class="not-found__sub">Схоже, ця сторінка десь загубилась у мережі. Повернись на головну і спробуй ще раз.</p>
			<div class="not-found__actions">
				<RouterLink to="/" class="btn btn--primary">На головну</RouterLink>
				<RouterLink to="/catalog" class="btn btn--ghost">Переглянути розробників</RouterLink>
			</div>
		</div>

		<div class="not-found__particles">
			<span v-for="i in 20" :key="i" class="particle" :style="particleStyle(i)" />
		</div>
	</main>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";

function particleStyle(i: number) {
	const size = 2 + (i % 4);
	return {
		left: `${(i * 5.3) % 100}%`,
		top: `${(i * 7.7) % 100}%`,
		width: `${size}px`,
		height: `${size}px`,
		animationDelay: `${(i * 0.37) % 4}s`,
		animationDuration: `${3 + (i % 4)}s`,
	};
}
</script>

<style lang="scss" scoped>
$violet: #a855f7;
$violet-dim: rgba(#a855f7, 0.12);
$violet-glow: rgba(#a855f7, 0.5);

.not-found {
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	overflow: hidden;
	text-align: center;

	&__bg {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(ellipse 70% 60% at 50% 50%, rgba($violet, 0.08) 0%, transparent 70%);
		pointer-events: none;
	}

	&__content {
		position: relative;
		z-index: 2;
		padding: 2rem;
	}

	&__title {
		font-size: 1.5rem;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.85);
		margin: 0 0 0.75rem;
	}

	&__sub {
		font-size: 0.95rem;
		color: rgba(255, 255, 255, 0.4);
		max-width: 420px;
		line-height: 1.7;
		margin: 0 auto 2.5rem;
	}

	&__actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
	}

	&__particles {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 1;
	}
}

// 404 GLITCH
.glitch {
	font-size: clamp(7rem, 20vw, 14rem);
	font-weight: 900;
	color: #fff;
	letter-spacing: -0.04em;
	line-height: 1;
	margin-bottom: 1.5rem;
	position: relative;
	display: inline-block;
	text-shadow:
		0 0 20px rgba($violet, 0.6),
		0 0 60px rgba($violet, 0.3),
		0 0 100px rgba($violet, 0.15);
	animation: flicker 6s infinite;

	&::before,
	&::after {
		content: attr(data-text);
		position: absolute;
		inset: 0;
		background: transparent;
	}

	&::before {
		color: #a855f7;
		clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
		animation: glitch-top 4s infinite;
		opacity: 0.8;
	}

	&::after {
		color: #60a5fa;
		clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
		animation: glitch-bottom 4s infinite;
		opacity: 0.7;
	}
}

@keyframes flicker {
	0%, 95%, 100% { opacity: 1; }
	96% { opacity: 0.85; }
	97% { opacity: 1; }
	98% { opacity: 0.7; }
	99% { opacity: 1; }
}

@keyframes glitch-top {
	0%, 90%, 100% { transform: translate(0); }
	92% { transform: translate(-4px, -2px); }
	94% { transform: translate(4px, 2px); }
	96% { transform: translate(-2px, 0); }
}

@keyframes glitch-bottom {
	0%, 90%, 100% { transform: translate(0); }
	91% { transform: translate(4px, 2px); }
	93% { transform: translate(-4px, -2px); }
	95% { transform: translate(2px, 0); }
}

// PARTICLES
.particle {
	position: absolute;
	border-radius: 50%;
	background: $violet;
	opacity: 0;
	animation: float linear infinite;
	box-shadow: 0 0 6px $violet-glow;
}

@keyframes float {
	0% { opacity: 0; transform: translateY(0) scale(1); }
	20% { opacity: 0.6; }
	80% { opacity: 0.3; }
	100% { opacity: 0; transform: translateY(-120px) scale(0.5); }
}

// BUTTONS
.btn {
	display: inline-flex;
	align-items: center;
	padding: 0.65rem 1.4rem;
	border-radius: 10px;
	font-size: 0.9rem;
	font-weight: 600;
	text-decoration: none;
	transition: all 0.2s;

	&--primary {
		background: $violet;
		color: #fff;
		&:hover { background: lighten(#a855f7, 8%); box-shadow: 0 0 24px $violet-glow; }
	}

	&--ghost {
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: rgba(255, 255, 255, 0.75);
		&:hover { background: rgba(255, 255, 255, 0.1); color: #fff; }
	}
}
</style>
