<template>
	<main class="devs">
		<section class="devs__hero">
			<div class="container">
				<div class="devs__hero-badge">Для розробників</div>
				<h1 class="devs__title">Знаходь клієнтів.<br><span class="accent">Заробляй на своїх навичках.</span></h1>
				<p class="devs__sub">Приєднуйся до 2 400+ розробників які вже знаходять проєкти через Hexly.</p>
				<button class="btn btn--primary" @click="open('register')">Створити профіль безкоштовно</button>
			</div>
		</section>

		<section class="benefits">
			<div class="container">
				<h2 class="section-title">Чому Hexly?</h2>
				<div class="benefits__grid">
					<div v-for="b in benefits" :key="b.title" class="benefit-card">
						<div class="benefit-card__icon" v-html="b.icon" />
						<h3 class="benefit-card__title">{{ b.title }}</h3>
						<p class="benefit-card__text">{{ b.text }}</p>
					</div>
				</div>
			</div>
		</section>

		<section class="stats-section">
			<div class="container">
				<div class="stats-section__grid">
					<div v-for="s in stats" :key="s.label" class="stat-item">
						<strong>{{ s.value }}</strong>
						<span>{{ s.label }}</span>
					</div>
				</div>
			</div>
		</section>

		<section class="join">
			<div class="container">
				<h2 class="section-title">Як почати</h2>
				<div class="join__steps">
					<div v-for="(step, i) in joinSteps" :key="i" class="join-step">
						<div class="join-step__num">{{ i + 1 }}</div>
						<h3 class="join-step__title">{{ step.title }}</h3>
						<p class="join-step__text">{{ step.text }}</p>
					</div>
				</div>
				<div class="join__cta">
					<button class="btn btn--primary" @click="open('register')">Почати зараз</button>
					<a href="/how" class="btn btn--ghost">Дізнатись більше</a>
				</div>
			</div>
		</section>
	</main>
</template>

<script lang="ts" setup>
import { useAuth } from "../composables/useAuth";
const { open } = useAuth();
const benefits = [
	{
		title: "Тільки релевантні проєкти",
		text: "Алгоритм підбирає завдання під твій стек. Ніякого спаму — тільки те що тобі підходить.",
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
	},
	{
		title: "Безпечна оплата",
		text: "Escrow-рахунок захищає твої гроші. Кошти гарантовано надходять після підтвердження роботи.",
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`,
	},
	{
		title: "Будуй репутацію",
		text: "Кожен успішний проєкт додає рейтинг. Висока репутація — вищі ставки і більше клієнтів.",
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
	},
	{
		title: "Прямий контакт",
		text: "Спілкуйся з клієнтами напряму без посередників. Всі домовленості — в одному місці.",
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
	},
	{
		title: "Ринкові ставки",
		text: "Середня ставка розробника на платформі — $48/год. Ти сам визначаєш свою вартість.",
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
	},
	{
		title: "Підтримка 24/7",
		text: "Є питання чи спір — ми розберемось. Команда підтримки відповідає протягом 2 годин.",
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
	},
];

const stats = [
	{ value: "2 400+", label: "активних розробників" },
	{ value: "$48", label: "середня ставка /год" },
	{ value: "850+", label: "виконаних проєктів" },
	{ value: "10%", label: "комісія платформи" },
];

const joinSteps = [
	{ title: "Зареєструйся", text: "Заповни базову інформацію та верифікуй email. Займе 2 хвилини." },
	{ title: "Заповни профіль", text: "Додай навички, досвід і портфоліо. Повний профіль отримує в 3 рази більше відгуків." },
	{ title: "Відгукуйся на проєкти", text: "Знаходь підходящі завдання і надсилай персоналізовані пропозиції." },
];
</script>

<style lang="scss" scoped>
$violet: #a855f7;
$violet-dim: rgba(#a855f7, 0.1);
$violet-glow: rgba(#a855f7, 0.3);

.container {
	max-width: 1100px;
	margin: 0 auto;
	padding: 0 2rem;
}

.section-title {
	font-size: 1.75rem;
	font-weight: 700;
	color: #fff;
	text-align: center;
	margin: 0 0 2.5rem;
}

.accent {
	background: linear-gradient(135deg, $violet 0%, #60a5fa 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
}

.btn {
	display: inline-flex;
	align-items: center;
	padding: 0.65rem 1.4rem;
	border-radius: 10px;
	font-size: 0.9rem;
	font-weight: 600;
	font-family: inherit;
	text-decoration: none;
	border: none;
	cursor: pointer;
	transition: all 0.2s;

	&--primary {
		background: $violet;
		color: #fff;
		&:hover { background: lighten(#a855f7, 8%); box-shadow: 0 0 24px $violet-glow; }
	}

	&--ghost {
		background: rgba(255,255,255,0.06);
		border: 1px solid rgba(255,255,255,0.1);
		color: rgba(255,255,255,0.75);
		&:hover { background: rgba(255,255,255,0.1); color: #fff; }
	}
}

.devs {
	padding-top: 64px;

	&__hero {
		padding: 5rem 0 4rem;
		text-align: center;
		background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba($violet, 0.1) 0%, transparent 70%);
	}

	&__hero-badge {
		display: inline-block;
		padding: 0.3rem 0.9rem;
		border-radius: 100px;
		border: 1px solid rgba($violet, 0.3);
		background: $violet-dim;
		color: rgba($violet, 0.9);
		font-size: 0.8rem;
		margin-bottom: 1.5rem;
	}

	&__title {
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 800;
		color: #fff;
		line-height: 1.2;
		letter-spacing: -0.03em;
		margin: 0 0 1rem;
	}

	&__sub {
		color: rgba(255,255,255,0.5);
		font-size: 1rem;
		margin: 0 0 2rem;
	}
}

.benefits {
	padding: 5rem 0;
	border-top: 1px solid rgba(255,255,255,0.06);

	&__grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}
}

.benefit-card {
	padding: 1.75rem;
	border-radius: 14px;
	border: 1px solid rgba(255,255,255,0.07);
	background: rgba(255,255,255,0.02);

	&__icon {
		color: $violet;
		margin-bottom: 1rem;
		filter: drop-shadow(0 0 6px rgba($violet, 0.4));

		:deep(svg) {
			width: 22px;
			height: 22px;
			display: block;
		}
	}

	&__title {
		font-size: 1rem;
		font-weight: 700;
		color: #fff;
		margin: 0 0 0.5rem;
	}

	&__text {
		font-size: 0.875rem;
		color: rgba(255,255,255,0.4);
		line-height: 1.7;
		margin: 0;
	}
}

.stats-section {
	padding: 3rem 0;
	border-top: 1px solid rgba(255,255,255,0.06);
	background: rgba($violet, 0.03);

	&__grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		text-align: center;
	}
}

.stat-item {
	display: flex;
	flex-direction: column;
	gap: 4px;

	strong {
		font-size: 2rem;
		font-weight: 800;
		color: $violet;
	}

	span {
		font-size: 0.85rem;
		color: rgba(255,255,255,0.4);
	}
}

.join {
	padding: 5rem 0 6rem;
	border-top: 1px solid rgba(255,255,255,0.06);

	&__steps {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	&__cta {
		display: flex;
		gap: 1rem;
		justify-content: center;
	}
}

.join-step {
	padding: 2rem;
	border-radius: 14px;
	border: 1px solid rgba(255,255,255,0.07);
	background: rgba(255,255,255,0.02);
	text-align: center;

	&__num {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: $violet-dim;
		border: 1px solid rgba($violet,0.3);
		color: $violet;
		font-weight: 700;
		font-size: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 1rem;
	}

	&__title {
		font-size: 1rem;
		font-weight: 700;
		color: #fff;
		margin: 0 0 0.5rem;
	}

	&__text {
		font-size: 0.875rem;
		color: rgba(255,255,255,0.4);
		line-height: 1.7;
		margin: 0;
	}
}
</style>
