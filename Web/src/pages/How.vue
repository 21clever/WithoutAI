<template>
	<main class="how">
		<div class="container">
			<div class="how__hero">
				<h1 class="page-title">Як це працює</h1>
				<p class="page-sub">Від публікації завдання до готового результату — просто і прозоро</p>
			</div>

			<div class="tabs">
				<button class="tab" :class="{ 'tab--active': tab === 'client' }" @click="tab = 'client'">Я клієнт</button>
				<button class="tab" :class="{ 'tab--active': tab === 'dev' }" @click="tab = 'dev'">Я розробник</button>
			</div>

			<div v-if="tab === 'client'" class="steps">
				<div v-for="(step, i) in clientSteps" :key="i" class="step">
					<div class="step__left">
						<div class="step__num">{{ i + 1 }}</div>
						<div v-if="i < clientSteps.length - 1" class="step__line" />
					</div>
					<div class="step__content">
						<div class="step__icon" v-html="step.icon" />
						<h3 class="step__title">{{ step.title }}</h3>
						<p class="step__text">{{ step.text }}</p>
					</div>
				</div>
			</div>

			<div v-else class="steps">
				<div v-for="(step, i) in devSteps" :key="i" class="step">
					<div class="step__left">
						<div class="step__num">{{ i + 1 }}</div>
						<div v-if="i < devSteps.length - 1" class="step__line" />
					</div>
					<div class="step__content">
						<div class="step__icon" v-html="step.icon" />
						<h3 class="step__title">{{ step.title }}</h3>
						<p class="step__text">{{ step.text }}</p>
					</div>
				</div>
			</div>

			<div class="faq">
				<h2 class="faq__title">Часті запитання</h2>
				<div class="faq__list">
					<div v-for="(item, i) in faq" :key="i" class="faq__item" @click="openFaq = openFaq === i ? null : i">
						<div class="faq__q">
							{{ item.q }}
							<span class="faq__arrow" :class="{ 'faq__arrow--open': openFaq === i }">›</span>
						</div>
						<div v-if="openFaq === i" class="faq__a">{{ item.a }}</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const tab = ref<"client" | "dev">("client");
const openFaq = ref<number | null>(null);

const clientSteps = [
	{
		title: "Опублікуй завдання",
		text: "Опиши що потрібно зробити: технології, терміни, бюджет. Публікація безкоштовна і займає 5 хвилин.",
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
	},
	{
		title: "Отримай пропозиції",
		text: "Протягом 24 годин ти отримаєш відгуки від перевірених розробників з портфоліо та оцінкою вартості.",
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 5.72 5.72l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.22 16z"/></svg>`,
	},
	{
		title: "Обговори деталі",
		text: "Поспілкуйся з кандидатами в чаті, задай питання, порівняй підходи і обери найкращого.",
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
	},
	{
		title: "Запусти проєкт",
		text: "Працюй з розробником через платформу. Оплата проходить через безпечний escrow — гроші перейдуть після твого підтвердження.",
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12H19M12 5l7 7-7 7"/></svg>`,
	},
];

const devSteps = [
	{
		title: "Створи профіль",
		text: "Заповни профіль: навички, портфоліо, ставка. Верифікуй свої компетенції через тест або GitHub.",
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
	},
	{
		title: "Знаходь завдання",
		text: "Переглядай нові завдання за своїм стеком. Налаштуй сповіщення щоб першим реагувати на підходящі.",
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
	},
	{
		title: "Надсилай пропозиції",
		text: "Відправ персоналізовану пропозицію: вкажи свій підхід, терміни та вартість. Клієнти цінують конкретику.",
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
	},
	{
		title: "Отримуй оплату",
		text: "Після підтвердження клієнта кошти надходять на твій рахунок. Виводь на карту або IBAN.",
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`,
	},
];

const faq = [
	{ q: "Скільки коштує розміщення завдання?", a: "Публікація завдань безкоштовна. Комісія платформи стягується лише з виконавця — 10% від суми угоди." },
	{ q: "Як працює захист оплати?", a: "Кошти блокуються на escrow-рахунку після прийняття пропозиції. Розробник отримає їх тільки після твого підтвердження результату." },
	{ q: "Що якщо розробник не виконав роботу?", a: "У разі спору відкривається медіація. Якщо розробник порушив умови — кошти повертаються клієнту." },
	{ q: "Чи можна найняти команду?", a: "Так, можна опублікувати кілька позицій для одного проєкту або найняти агенцію." },
];
</script>

<style lang="scss" scoped>
$violet: #a855f7;
$violet-dim: rgba(#a855f7, 0.1);

.container {
	max-width: 800px;
	margin: 0 auto;
	padding: 0 2rem;
}

.how {
	padding-top: 64px;

	&__hero {
		padding: 4rem 0 2.5rem;
		text-align: center;
	}
}

.page-title {
	font-size: 2.25rem;
	font-weight: 800;
	color: #fff;
	margin: 0 0 0.6rem;
}

.page-sub {
	color: rgba(255,255,255,0.45);
	font-size: 1rem;
	margin: 0;
}

.tabs {
	display: flex;
	gap: 0.5rem;
	justify-content: center;
	margin-bottom: 3rem;
}

.tab {
	padding: 0.5rem 1.5rem;
	border-radius: 8px;
	border: 1px solid rgba(255,255,255,0.08);
	background: transparent;
	color: rgba(255,255,255,0.45);
	font-size: 0.9rem;
	cursor: pointer;
	transition: all 0.15s;

	&--active {
		background: $violet-dim;
		border-color: rgba($violet,0.4);
		color: $violet;
	}
}

.steps {
	display: flex;
	flex-direction: column;
	margin-bottom: 5rem;
}

.step {
	display: grid;
	grid-template-columns: 48px 1fr;
	gap: 1.5rem;

	&__left {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	&__num {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		border: 1px solid rgba($violet,0.4);
		background: $violet-dim;
		color: $violet;
		font-weight: 700;
		font-size: 0.9rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	&__line {
		flex: 1;
		width: 1px;
		background: rgba($violet,0.15);
		margin: 0.5rem 0;
	}

	&__content {
		padding-bottom: 2.5rem;
	}

	&__icon {
		color: $violet;
		margin-bottom: 0.6rem;
		filter: drop-shadow(0 0 6px rgba($violet, 0.4));

		:deep(svg) {
			width: 22px;
			height: 22px;
			display: block;
		}
	}

	&__title {
		font-size: 1.05rem;
		font-weight: 700;
		color: #fff;
		margin: 0 0 0.5rem;
	}

	&__text {
		font-size: 0.9rem;
		color: rgba(255,255,255,0.45);
		line-height: 1.7;
		margin: 0;
	}
}

.faq {
	border-top: 1px solid rgba(255,255,255,0.06);
	padding: 3rem 0 5rem;

	&__title {
		font-size: 1.5rem;
		font-weight: 700;
		color: #fff;
		margin: 0 0 1.5rem;
	}

	&__item {
		border-bottom: 1px solid rgba(255,255,255,0.06);
		padding: 1.1rem 0;
		cursor: pointer;
	}

	&__q {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.95rem;
		color: rgba(255,255,255,0.8);
	}

	&__arrow {
		color: rgba(255,255,255,0.3);
		font-size: 1.2rem;
		transition: transform 0.2s;
		&--open { transform: rotate(90deg); color: $violet; }
	}

	&__a {
		font-size: 0.875rem;
		color: rgba(255,255,255,0.45);
		line-height: 1.7;
		margin-top: 0.75rem;
	}
}
</style>
