<script lang="ts" setup>
import { ref } from "vue";

const selectedSkill = ref("all");

const skills = ["all", "Frontend", "Backend", "Mobile", "DevOps", "UI/UX", "AI/ML"];

const developers = [
	{ id: 1, name: "Олексій Коваль", title: "Senior Frontend Developer", skills: ["Vue", "React", "TypeScript"], rate: 45, rating: 4.9, reviews: 38, available: true },
	{ id: 2, name: "Марія Бондаренко", title: "Fullstack Developer", skills: ["Node.js", "PostgreSQL", "Docker"], rate: 55, rating: 4.8, reviews: 52, available: true },
	{ id: 3, name: "Іван Мельник", title: "Mobile Developer", skills: ["React Native", "Swift", "Kotlin"], rate: 50, rating: 5.0, reviews: 21, available: false },
	{ id: 4, name: "Анна Шевченко", title: "DevOps Engineer", skills: ["AWS", "Kubernetes", "Terraform"], rate: 60, rating: 4.7, reviews: 17, available: true },
	{ id: 5, name: "Дмитро Лисенко", title: "Backend Developer", skills: ["Go", "Redis", "gRPC"], rate: 52, rating: 4.9, reviews: 44, available: true },
	{ id: 6, name: "Соломія Гнатів", title: "UI/UX Designer & Developer", skills: ["Figma", "Vue", "SCSS"], rate: 40, rating: 4.8, reviews: 29, available: false },
];
</script>

<template>
	<main class="catalog">
		<div class="catalog__header">
			<div class="container">
				<h1 class="page-title">Знайти розробника</h1>
				<p class="page-sub">{{ developers.length }} спеціалістів готові до роботи</p>
			</div>
		</div>

		<div class="container catalog__body">
			<aside class="filters">
				<h3 class="filters__title">Фільтри</h3>

				<div class="filters__group">
					<label class="filters__label">Напрям</label>
					<div class="filters__tags">
						<button
							v-for="skill in skills"
							:key="skill"
							class="tag"
							:class="{ 'tag--active': selectedSkill === skill }"
							@click="selectedSkill = skill"
						>
							{{ skill === "all" ? "Всі" : skill }}
						</button>
					</div>
				</div>

				<div class="filters__group">
					<label class="filters__label">Ставка ($/год)</label>
					<div class="filters__range">
						<input type="range" min="10" max="150" value="100" />
						<div class="filters__range-vals"><span>$10</span><span>$100</span></div>
					</div>
				</div>

				<div class="filters__group">
					<label class="filters__label">Доступність</label>
					<label class="filters__check">
						<input type="checkbox" checked /> Тільки доступні
					</label>
				</div>
			</aside>

			<div class="dev-grid">
				<div v-for="dev in developers" :key="dev.id" class="dev-card">
					<div class="dev-card__top">
						<div class="dev-card__avatar">
							{{ dev.name.charAt(0) }}
						</div>
						<div class="dev-card__info">
							<div class="dev-card__name">{{ dev.name }}</div>
							<div class="dev-card__title">{{ dev.title }}</div>
						</div>
						<span class="dev-card__badge" :class="dev.available ? 'dev-card__badge--on' : 'dev-card__badge--off'">
							{{ dev.available ? "Доступний" : "Зайнятий" }}
						</span>
					</div>
					<div class="dev-card__skills">
						<span v-for="s in dev.skills" :key="s" class="skill-tag">{{ s }}</span>
					</div>
					<div class="dev-card__bottom">
						<div class="dev-card__rate">${{ dev.rate }}<span>/год</span></div>
						<div class="dev-card__rating">
							★ {{ dev.rating }} <span>({{ dev.reviews }})</span>
						</div>
						<a href="#" class="dev-card__btn">Переглянути</a>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<style lang="scss" scoped>
$violet: #a855f7;
$violet-dim: rgba(#a855f7, 0.1);

.container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 2rem;
}

.catalog {
	padding-top: 64px;

	&__header {
		padding: 3rem 0 2.5rem;
		border-bottom: 1px solid rgba(255,255,255,0.06);
	}

	&__body {
		display: grid;
		grid-template-columns: 240px 1fr;
		gap: 2.5rem;
		padding-top: 2.5rem;
		padding-bottom: 4rem;
	}
}

.page-title {
	font-size: 2rem;
	font-weight: 700;
	color: #fff;
	margin: 0 0 0.4rem;
}

.page-sub {
	color: rgba(255,255,255,0.4);
	font-size: 0.9rem;
	margin: 0;
}

.filters {
	&__title {
		font-size: 0.8rem;
		font-weight: 600;
		color: rgba(255,255,255,0.4);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		margin: 0 0 1.5rem;
	}

	&__group {
		margin-bottom: 2rem;
	}

	&__label {
		display: block;
		font-size: 0.85rem;
		color: rgba(255,255,255,0.6);
		margin-bottom: 0.75rem;
	}

	&__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	&__range {
		input[type="range"] {
			width: 100%;
			accent-color: $violet;
		}
	}

	&__range-vals {
		display: flex;
		justify-content: space-between;
		font-size: 0.8rem;
		color: rgba(255,255,255,0.35);
		margin-top: 0.4rem;
	}

	&__check {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: rgba(255,255,255,0.6);
		cursor: pointer;

		input { accent-color: $violet; }
	}
}

.tag {
	padding: 0.3rem 0.7rem;
	border-radius: 6px;
	border: 1px solid rgba(255,255,255,0.08);
	background: transparent;
	color: rgba(255,255,255,0.45);
	font-size: 0.8rem;
	cursor: pointer;
	transition: all 0.15s;

	&:hover { color: rgba(255,255,255,0.8); border-color: rgba(255,255,255,0.2); }
	&--active { background: $violet-dim; border-color: rgba($violet,0.4); color: $violet; }
}

.dev-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
	align-content: start;
}

.dev-card {
	padding: 1.5rem;
	border-radius: 14px;
	border: 1px solid rgba(255,255,255,0.07);
	background: rgba(255,255,255,0.02);
	transition: border-color 0.2s;

	&:hover { border-color: rgba($violet,0.3); }

	&__top {
		display: flex;
		align-items: center;
		gap: 0.9rem;
		margin-bottom: 1rem;
	}

	&__avatar {
		width: 44px;
		height: 44px;
		border-radius: 12px;
		background: $violet-dim;
		border: 1px solid rgba($violet,0.3);
		color: $violet;
		font-size: 1.1rem;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	&__info { flex: 1; min-width: 0; }

	&__name {
		font-size: 0.95rem;
		font-weight: 600;
		color: #fff;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&__title {
		font-size: 0.8rem;
		color: rgba(255,255,255,0.4);
		margin-top: 2px;
	}

	&__badge {
		flex-shrink: 0;
		font-size: 0.72rem;
		padding: 0.2rem 0.6rem;
		border-radius: 100px;

		&--on { background: rgba(34,197,94,0.12); color: #4ade80; border: 1px solid rgba(34,197,94,0.25); }
		&--off { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.3); border: 1px solid rgba(255,255,255,0.08); }
	}

	&__skills {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin-bottom: 1.25rem;
	}

	&__bottom {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	&__rate {
		font-size: 1rem;
		font-weight: 700;
		color: #fff;
		span { font-size: 0.75rem; color: rgba(255,255,255,0.35); font-weight: 400; }
	}

	&__rating {
		font-size: 0.82rem;
		color: #fbbf24;
		span { color: rgba(255,255,255,0.3); }
	}

	&__btn {
		margin-left: auto;
		padding: 0.35rem 0.9rem;
		border-radius: 7px;
		border: 1px solid rgba($violet,0.35);
		background: $violet-dim;
		color: $violet;
		font-size: 0.8rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.15s;

		&:hover { background: rgba($violet,0.2); }
	}
}

.skill-tag {
	padding: 0.2rem 0.55rem;
	border-radius: 5px;
	background: rgba(255,255,255,0.05);
	border: 1px solid rgba(255,255,255,0.07);
	color: rgba(255,255,255,0.5);
	font-size: 0.75rem;
}
</style>
