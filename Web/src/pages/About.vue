<template>
	<main class="about">
		<section class="about__hero">
			<div class="container">
				<h1 class="page-title">Про нас</h1>
				<p class="page-sub">Ми будуємо найкращий маркетплейс IT-спеціалістів в Україні</p>
			</div>
		</section>

		<section class="mission">
			<div class="container mission__grid">
				<div class="mission__text">
					<h2>Наша місія</h2>
					<p>Hexly з'єднує талановитих українських розробників із замовниками з усього світу. Ми хочемо, щоб кожен розробник міг знайти гідний проєкт, а кожен клієнт — перевіреного виконавця без зайвих ризиків.</p>
					<p>Платформа побудована розробниками для розробників. Ми розуміємо специфіку IT-проєктів і будуємо інструменти, які реально допомагають.</p>
				</div>
				<div class="mission__stats">
					<div v-for="s in stats" :key="s.label" class="mission__stat">
						<strong>{{ s.value }}</strong>
						<span>{{ s.label }}</span>
					</div>
				</div>
			</div>
		</section>

		<section class="values">
			<div class="container">
				<h2 class="section-title">Наші цінності</h2>
				<div class="values__grid">
					<div v-for="v in values" :key="v.title" class="value-card">
						<div class="value-card__icon" v-html="v.icon" />
						<h3>{{ v.title }}</h3>
						<p>{{ v.text }}</p>
					</div>
				</div>
			</div>
		</section>

		<section class="team">
			<div class="container">
				<h2 class="section-title">Команда</h2>
				<div class="team__grid">
					<div v-for="m in team" :key="m.name" class="team-card">
						<div class="team-card__avatar">{{ m.name.charAt(0) }}</div>
						<div class="team-card__name">{{ m.name }}</div>
						<div class="team-card__role">{{ m.role }}</div>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>

<script lang="ts" setup>
const stats = [
	{ value: "2021", label: "рік заснування" },
	{ value: "2 400+", label: "розробників" },
	{ value: "850+", label: "проєктів виконано" },
	{ value: "12", label: "людей у команді" },
];

const values = [
	{
		title: "Прозорість",
		text: "Ніяких прихованих комісій і дрібного шрифту. Всі умови чіткі та зрозумілі.",
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16" stroke-width="2.5"/></svg>`,
	},
	{
		title: "Безпека",
		text: "Escrow-рахунок захищає і клієнта, і розробника на кожному етапі роботи.",
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
	},
	{
		title: "Якість",
		text: "Верифікація навичок, рейтинги та відгуки — щоб клієнт завжди отримував результат.",
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
	},
	{
		title: "Підтримка",
		text: "Команда на зв'язку 24/7. Будь-яке питання — відповідь протягом 2 годин.",
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
	},
];

const team = [
	{ name: "Олег Савченко", role: "CEO & Co-founder" },
	{ name: "Катерина Руденко", role: "CTO & Co-founder" },
	{ name: "Максим Ткач", role: "Head of Product" },
	{ name: "Вікторія Панченко", role: "Head of Marketing" },
];
</script>

<style lang="scss" scoped>
$violet: #a855f7;
$violet-dim: rgba(#a855f7, 0.1);

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

.about {
	padding-top: 64px;

	&__hero {
		padding: 4rem 0 3rem;
		text-align: center;
		background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba($violet, 0.1) 0%, transparent 70%);
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

.mission {
	padding: 4rem 0;
	border-top: 1px solid rgba(255,255,255,0.06);

	&__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: center;
	}

	&__text {
		h2 {
			font-size: 1.5rem;
			font-weight: 700;
			color: #fff;
			margin: 0 0 1rem;
		}
		p {
			color: rgba(255,255,255,0.5);
			line-height: 1.8;
			font-size: 0.95rem;
			margin: 0 0 1rem;
		}
	}

	&__stats {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	&__stat {
		padding: 1.5rem;
		border-radius: 14px;
		border: 1px solid rgba(255,255,255,0.07);
		background: rgba(255,255,255,0.02);
		display: flex;
		flex-direction: column;
		gap: 4px;

		strong {
			font-size: 1.75rem;
			font-weight: 800;
			color: $violet;
		}

		span {
			font-size: 0.8rem;
			color: rgba(255,255,255,0.4);
		}
	}
}

.values {
	padding: 4rem 0;
	border-top: 1px solid rgba(255,255,255,0.06);

	&__grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
	}
}

.value-card {
	padding: 1.75rem;
	border-radius: 14px;
	border: 1px solid rgba(255,255,255,0.07);
	background: rgba(255,255,255,0.02);

	&__icon {
		width: 40px;
		height: 40px;
		border-radius: 10px;
		background: $violet-dim;
		border: 1px solid rgba($violet,0.2);
		color: $violet;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1rem;

		svg { width: 20px; height: 20px; }
	}

	h3 {
		font-size: 1rem;
		font-weight: 700;
		color: #fff;
		margin: 0 0 0.5rem;
	}

	p {
		font-size: 0.85rem;
		color: rgba(255,255,255,0.4);
		line-height: 1.7;
		margin: 0;
	}
}

.team {
	padding: 4rem 0 6rem;
	border-top: 1px solid rgba(255,255,255,0.06);

	&__grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
	}
}

.team-card {
	padding: 2rem 1.5rem;
	border-radius: 14px;
	border: 1px solid rgba(255,255,255,0.07);
	background: rgba(255,255,255,0.02);
	text-align: center;

	&__avatar {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background: $violet-dim;
		border: 1px solid rgba($violet,0.3);
		color: $violet;
		font-size: 1.3rem;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 1rem;
	}

	&__name {
		font-size: 0.95rem;
		font-weight: 600;
		color: #fff;
		margin-bottom: 4px;
	}

	&__role {
		font-size: 0.8rem;
		color: rgba(255,255,255,0.4);
	}
}
</style>
