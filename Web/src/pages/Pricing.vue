<template>
	<main class="pricing">
		<div class="container">
			<div class="pricing__hero">
				<h1 class="page-title">Тарифи</h1>
				<p class="page-sub">Прозора ціна. Комісія тільки за результат.</p>

				<div class="toggle">
					<span :class="{ active: period === 'client' }" @click="period = 'client'">Для клієнтів</span>
					<span :class="{ active: period === 'dev' }" @click="period = 'dev'">Для розробників</span>
				</div>
			</div>

			<div class="plans">
				<div v-for="plan in currentPlans" :key="plan.name" class="plan" :class="{ 'plan--featured': plan.featured }">
					<div v-if="plan.featured" class="plan__badge">Популярний</div>
					<h3 class="plan__name">{{ plan.name }}</h3>
					<div class="plan__price">
						<strong>{{ plan.price }}</strong>
						<span>{{ plan.period }}</span>
					</div>
					<p class="plan__desc">{{ plan.desc }}</p>
					<ul class="plan__features">
						<li v-for="f in plan.features" :key="f">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none">
								<path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
							{{ f }}
						</li>
					</ul>
					<a href="#" class="plan__btn" :class="plan.featured ? 'plan__btn--primary' : 'plan__btn--ghost'">
						{{ plan.cta }}
					</a>
				</div>
			</div>

			<div class="compare">
				<h2 class="compare__title">Часто запитують</h2>
				<div class="compare__grid">
					<div v-for="item in faq" :key="item.q" class="compare__item">
						<h4>{{ item.q }}</h4>
						<p>{{ item.a }}</p>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

const period = ref<"client" | "dev">("client");

const clientPlans = [
	{
		name: "Безкоштовно",
		price: "$0",
		period: "назавжди",
		desc: "Для разового пошуку виконавця.",
		features: ["1 активне завдання", "До 10 пропозицій", "Базовий чат", "Escrow-оплата"],
		cta: "Почати безкоштовно",
		featured: false,
	},
	{
		name: "Pro",
		price: "$19",
		period: "/ місяць",
		desc: "Для регулярних замовлень та команд.",
		features: ["Необмежені завдання", "Пріоритетні пропозиції", "Розширений чат і файли", "Escrow-оплата", "Дедикована підтримка", "Аналітика проєктів"],
		cta: "Спробувати Pro",
		featured: true,
	},
	{
		name: "Business",
		price: "$79",
		period: "/ місяць",
		desc: "Для компаній і агенцій.",
		features: ["Все з Pro", "Командний доступ", "API інтеграція", "SLA 99.9%", "Персональний менеджер", "Кастомний договір"],
		cta: "Зв'язатись з нами",
		featured: false,
	},
];

const devPlans = [
	{
		name: "Базовий",
		price: "10%",
		period: "комісія з угоди",
		desc: "Стандартний доступ для всіх виконавців.",
		features: ["Доступ до всіх завдань", "Профіль та портфоліо", "Базовий рейтинг", "Escrow-оплата", "Підтримка"],
		cta: "Зареєструватись",
		featured: false,
	},
	{
		name: "Pro",
		price: "7%",
		period: "комісія + $12/міс",
		desc: "Менша комісія і більше видимості.",
		features: ["Знижена комісія 7%", "Пріоритет у пошуку", "Pro-бейдж у профілі", "Розширена аналітика", "Ранній доступ до завдань"],
		cta: "Стати Pro",
		featured: true,
	},
	{
		name: "Agency",
		price: "5%",
		period: "комісія + $49/міс",
		desc: "Для агенцій та команд розробників.",
		features: ["Комісія 5%", "Командний профіль", "До 10 членів команди", "API доступ", "Персональний менеджер"],
		cta: "Зв'язатись",
		featured: false,
	},
];

const currentPlans = computed(() => period.value === "client" ? clientPlans : devPlans);

const faq = [
	{ q: "Коли знімається комісія?", a: "Комісія знімається тільки після успішного завершення проєкту та підтвердження клієнта." },
	{ q: "Чи є скритих платежів?", a: "Ні. Ціна яку ти бачиш — фінальна. Ніяких сюрпризів." },
	{ q: "Можна скасувати підписку?", a: "Так, в будь-який момент. Доступ зберігається до кінця оплаченого періоду." },
	{ q: "Які способи оплати?", a: "Visa, Mastercard, Apple Pay, Google Pay та банківський переказ (IBAN)." },
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

.pricing {
	padding-top: 64px;

	&__hero {
		padding: 4rem 0 3rem;
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
	margin: 0 0 2rem;
}

.toggle {
	display: inline-flex;
	border: 1px solid rgba(255,255,255,0.08);
	border-radius: 10px;
	overflow: hidden;

	span {
		padding: 0.5rem 1.25rem;
		font-size: 0.875rem;
		color: rgba(255,255,255,0.4);
		cursor: pointer;
		transition: all 0.15s;

		&.active {
			background: $violet-dim;
			color: $violet;
		}
	}
}

.plans {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1rem;
	margin-bottom: 5rem;
}

.plan {
	position: relative;
	padding: 2rem;
	border-radius: 16px;
	border: 1px solid rgba(255,255,255,0.07);
	background: rgba(255,255,255,0.02);
	display: flex;
	flex-direction: column;

	&--featured {
		border-color: rgba($violet,0.4);
		background: rgba($violet,0.05);
	}

	&__badge {
		position: absolute;
		top: -1px;
		left: 50%;
		transform: translateX(-50%);
		padding: 0.2rem 0.8rem;
		border-radius: 0 0 8px 8px;
		background: $violet;
		color: #fff;
		font-size: 0.72rem;
		font-weight: 600;
	}

	&__name {
		font-size: 1rem;
		font-weight: 700;
		color: rgba(255,255,255,0.8);
		margin: 0.75rem 0 0.75rem;
	}

	&__price {
		margin-bottom: 0.75rem;

		strong {
			font-size: 2rem;
			font-weight: 800;
			color: #fff;
		}

		span {
			font-size: 0.85rem;
			color: rgba(255,255,255,0.35);
			margin-left: 0.25rem;
		}
	}

	&__desc {
		font-size: 0.85rem;
		color: rgba(255,255,255,0.4);
		margin: 0 0 1.5rem;
		line-height: 1.6;
	}

	&__features {
		list-style: none;
		padding: 0;
		margin: 0 0 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
		flex: 1;

		li {
			display: flex;
			align-items: center;
			gap: 0.6rem;
			font-size: 0.875rem;
			color: rgba(255,255,255,0.65);

			svg { color: #4ade80; flex-shrink: 0; }
		}
	}

	&__btn {
		display: block;
		text-align: center;
		padding: 0.6rem 1rem;
		border-radius: 9px;
		font-size: 0.875rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.2s;

		&--primary {
			background: $violet;
			color: #fff;
			&:hover { background: lighten(#a855f7, 8%); box-shadow: 0 0 20px $violet-glow; }
		}

		&--ghost {
			border: 1px solid rgba(255,255,255,0.1);
			background: rgba(255,255,255,0.04);
			color: rgba(255,255,255,0.6);
			&:hover { background: rgba(255,255,255,0.08); color: #fff; }
		}
	}
}

.compare {
	border-top: 1px solid rgba(255,255,255,0.06);
	padding: 3.5rem 0 5rem;

	&__title {
		font-size: 1.5rem;
		font-weight: 700;
		color: #fff;
		margin: 0 0 2rem;
		text-align: center;
	}

	&__grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	&__item {
		padding: 1.5rem;
		border-radius: 12px;
		border: 1px solid rgba(255,255,255,0.06);
		background: rgba(255,255,255,0.02);

		h4 {
			font-size: 0.95rem;
			font-weight: 600;
			color: rgba(255,255,255,0.85);
			margin: 0 0 0.5rem;
		}

		p {
			font-size: 0.875rem;
			color: rgba(255,255,255,0.4);
			line-height: 1.7;
			margin: 0;
		}
	}
}
</style>
