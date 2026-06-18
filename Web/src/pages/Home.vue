<template>
	<main class="home">

		<!-- HERO -->
		<section class="hero">
			<div class="hero__bg" />
			<div class="container">
				<div class="hero__badge">🇺🇦 Українська IT-платформа</div>
				<h1 class="hero__title">
					Знайди розробника<br>
					<span class="hero__title--accent">для будь-якого проєкту</span>
				</h1>
				<p class="hero__sub">
					Hexly — маркетплейс IT-спеціалістів. Публікуй завдання, отримуй пропозиції від перевірених розробників і запускай проєкти швидше.
				</p>
				<div class="hero__actions">
					<button class="btn btn--primary" @click="open('login')">Розмістити завдання</button>
					<a href="/catalog" class="btn btn--ghost">Переглянути розробників</a>
				</div>
				<div class="hero__stats">
					<div class="hero__stat">
						<strong>2 400+</strong>
						<span>розробників</span>
					</div>
					<div class="hero__stat-divider" />
					<div class="hero__stat">
						<strong>850+</strong>
						<span>виконаних проєктів</span>
					</div>
					<div class="hero__stat-divider" />
					<div class="hero__stat">
						<strong>98%</strong>
						<span>задоволених клієнтів</span>
					</div>
				</div>
			</div>
		</section>

		<!-- SKILLS -->
		<section class="skills">
			<div class="container">
				<h2 class="section-title">Популярні напрями</h2>
				<p class="section-sub">Знайди спеціаліста за технологією або напрямом</p>
				<div class="skills__grid">
					<a v-for="skill in skills" :key="skill.tag" href="#" class="skill-card">
						<div class="skill-card__icon" v-html="skill.icon" />
						<span class="skill-card__name">{{ skill.name }}</span>
						<span class="skill-card__count">{{ skill.count }} спеціалістів</span>
					</a>
				</div>
			</div>
		</section>

		<!-- HOW IT WORKS -->
		<section class="how">
			<div class="container">
				<h2 class="section-title">Як це працює</h2>
				<p class="section-sub">Три прості кроки до запуску вашого проєкту</p>
				<div class="how__steps">
					<div v-for="(step, i) in steps" :key="i" class="step">
						<div class="step__num">{{ i + 1 }}</div>
						<h3 class="step__title">{{ step.title }}</h3>
						<p class="step__text">{{ step.text }}</p>
					</div>
				</div>
			</div>
		</section>

		<!-- CTA -->
		<section class="cta">
			<div class="container">
				<div class="cta__card">
					<div class="cta__glow" />
					<h2 class="cta__title">Готовий розпочати?</h2>
					<p class="cta__sub">Розміщення завдання безкоштовне. Оплата лише за результат.</p>
					<div class="cta__actions">
						<button class="btn btn--primary" @click="open('login')">Розмістити завдання</button>
						<button class="btn btn--outline" @click="open('register')">Стати розробником</button>
					</div>
				</div>
			</div>
		</section>

	</main>
</template>

<script lang="ts" setup>
import { useAuth } from "../composables/useAuth";
const { open } = useAuth();

const skills = [
	{
		tag: "frontend", name: "Frontend", count: 640,
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
	},
	{
		tag: "backend", name: "Backend", count: 580,
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="5" rx="2"/><rect x="2" y="10" width="20" height="5" rx="2"/><rect x="2" y="17" width="20" height="5" rx="2"/><circle cx="18" cy="5.5" r="1" fill="currentColor" stroke="none"/><circle cx="18" cy="12.5" r="1" fill="currentColor" stroke="none"/></svg>`,
	},
	{
		tag: "mobile", name: "Mobile", count: 310,
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="3"/><line x1="12" y1="18" x2="12.01" y2="18" stroke-width="2.5"/></svg>`,
	},
	{
		tag: "devops", name: "DevOps", count: 195,
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 8v4l2.5 2.5"/><path d="M18 2v4h4"/><path d="M22 2 18 6"/></svg>`,
	},
	{
		tag: "uiux", name: "UI / UX", count: 270,
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>`,
	},
	{
		tag: "data", name: "Data Science", count: 140,
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`,
	},
	{
		tag: "security", name: "Security", count: 88,
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
	},
	{
		tag: "ai", name: "AI / ML", count: 165,
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none"/><circle cx="15.5" cy="8.5" r="1.5" fill="currentColor" stroke="none"/><path d="M7 15a5 5 0 0 0 10 0"/></svg>`,
	},
];

const steps = [
	{
		title: "Опублікуй завдання",
		text: "Опиши що потрібно зробити, вкажи стек та бюджет. Займе не більше 5 хвилин.",
	},
	{
		title: "Отримай пропозиції",
		text: "Протягом 24 годин розробники надішлють свої пропозиції з портфоліо та оцінкою.",
	},
	{
		title: "Обери найкращого",
		text: "Порівняй кандидатів, поспілкуйся в чаті та запусти проєкт з гарантією якості.",
	},
];
</script>

<style lang="scss" scoped>
$violet: #a855f7;
$violet-dim: rgba(#a855f7, 0.1);
$violet-glow: rgba(#a855f7, 0.3);

.container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 2rem;
}

.section-title {
	font-size: 2rem;
	font-weight: 700;
	color: #fff;
	margin: 0 0 0.5rem;
	text-align: center;
}

.section-sub {
	font-size: 1rem;
	color: rgba(255, 255, 255, 0.45);
	text-align: center;
	margin: 0 0 3rem;
}

// HERO
.hero {
	position: relative;
	padding: 140px 0 100px;
	overflow: hidden;
	text-align: center;

	&__bg {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(ellipse 60% 50% at 50% 0%, rgba($violet, 0.12) 0%, transparent 70%);
		pointer-events: none;
	}

	&__badge {
		display: inline-block;
		padding: 0.3rem 0.9rem;
		border-radius: 100px;
		border: 1px solid rgba($violet, 0.3);
		background: $violet-dim;
		color: rgba($violet, 0.9);
		font-size: 0.8rem;
		letter-spacing: 0.02em;
		margin-bottom: 1.75rem;
	}

	&__title {
		font-size: clamp(2.2rem, 5vw, 3.5rem);
		font-weight: 800;
		color: #fff;
		line-height: 1.15;
		letter-spacing: -0.03em;
		margin: 0 0 1.25rem;

		&--accent {
			background: linear-gradient(135deg, $violet 0%, #60a5fa 100%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
		}
	}

	&__sub {
		font-size: 1.05rem;
		color: rgba(255, 255, 255, 0.5);
		max-width: 560px;
		margin: 0 auto 2.5rem;
		line-height: 1.7;
	}

	&__actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-bottom: 4rem;
	}

	&__stats {
		display: inline-flex;
		align-items: center;
		gap: 2rem;
		padding: 1rem 2rem;
		border-radius: 16px;
		border: 1px solid rgba(255, 255, 255, 0.07);
		background: rgba(255, 255, 255, 0.03);
	}

	&__stat {
		display: flex;
		flex-direction: column;
		gap: 2px;

		strong {
			font-size: 1.4rem;
			font-weight: 700;
			color: #fff;
		}

		span {
			font-size: 0.8rem;
			color: rgba(255, 255, 255, 0.4);
		}
	}

	&__stat-divider {
		width: 1px;
		height: 32px;
		background: rgba(255, 255, 255, 0.08);
	}
}

// BUTTONS
.btn {
	display: inline-flex;
	align-items: center;
	padding: 0.65rem 1.4rem;
	border: none;
	font-family: inherit;
	cursor: pointer;
	border-radius: 10px;
	font-size: 0.9rem;
	font-weight: 600;
	text-decoration: none;
	transition: all 0.2s;

	&--primary {
		background: $violet;
		color: #fff;

		&:hover {
			background: lighten(#a855f7, 8%);
			box-shadow: 0 0 24px $violet-glow;
		}
	}

	&--ghost {
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: rgba(255, 255, 255, 0.75);

		&:hover {
			background: rgba(255, 255, 255, 0.1);
			color: #fff;
		}
	}

	&--outline {
		background: transparent;
		border: 1px solid rgba($violet, 0.4);
		color: $violet;

		&:hover {
			background: $violet-dim;
			border-color: rgba($violet, 0.7);
		}
	}
}

// SKILLS
.skills {
	padding: 80px 0;
	border-top: 1px solid rgba(255, 255, 255, 0.05);

	&__grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
	}
}

.skill-card {
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
	padding: 1.25rem 1.5rem;
	border-radius: 12px;
	border: 1px solid rgba(255, 255, 255, 0.07);
	background: rgba(255, 255, 255, 0.03);
	text-decoration: none;
	transition: border-color 0.2s, background 0.2s;

	&:hover {
		border-color: rgba($violet, 0.35);
		background: $violet-dim;
	}

	&__icon {
		color: $violet;
		margin-bottom: 0.5rem;
		filter: drop-shadow(0 0 6px rgba($violet, 0.5));
		transition: filter 0.2s;
		width: 24px;
		height: 24px;

		:deep(svg) {
			width: 24px;
			height: 24px;
			display: block;
		}
	}

	&:hover &__icon {
		filter: drop-shadow(0 0 10px rgba($violet, 0.8));
	}

	&__name {
		font-size: 0.95rem;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.9);
	}

	&__count {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.35);
	}
}

// HOW IT WORKS
.how {
	padding: 80px 0;
	border-top: 1px solid rgba(255, 255, 255, 0.05);

	&__steps {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}
}

.step {
	padding: 2rem;
	border-radius: 16px;
	border: 1px solid rgba(255, 255, 255, 0.07);
	background: rgba(255, 255, 255, 0.02);

	&__num {
		width: 40px;
		height: 40px;
		border-radius: 10px;
		background: $violet-dim;
		border: 1px solid rgba($violet, 0.3);
		color: $violet;
		font-size: 1rem;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1.25rem;
	}

	&__title {
		font-size: 1.05rem;
		font-weight: 700;
		color: #fff;
		margin: 0 0 0.6rem;
	}

	&__text {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.45);
		line-height: 1.7;
		margin: 0;
	}
}

// CTA
.cta {
	padding: 80px 0 100px;
	border-top: 1px solid rgba(255, 255, 255, 0.05);

	&__card {
		position: relative;
		overflow: hidden;
		padding: 4rem;
		border-radius: 24px;
		border: 1px solid rgba($violet, 0.2);
		background: rgba($violet, 0.05);
		text-align: center;
	}

	&__glow {
		position: absolute;
		top: -60px;
		left: 50%;
		transform: translateX(-50%);
		width: 400px;
		height: 200px;
		background: radial-gradient(ellipse, rgba($violet, 0.2) 0%, transparent 70%);
		pointer-events: none;
	}

	&__title {
		font-size: 2rem;
		font-weight: 800;
		color: #fff;
		margin: 0 0 0.75rem;
	}

	&__sub {
		font-size: 1rem;
		color: rgba(255, 255, 255, 0.45);
		margin: 0 0 2rem;
	}

	&__actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
	}
}
</style>
