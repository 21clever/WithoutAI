<template>
	<main class="blog">
		<div class="container">
			<div class="blog__hero">
				<h1 class="page-title">Блог</h1>
				<p class="page-sub">Поради, кейси та інсайти зі світу IT-фрилансу</p>
			</div>

			<div class="blog__featured">
				<a href="#" class="post-featured">
					<div class="post-featured__content">
						<div class="post-featured__tag">Кар'єра</div>
						<h2 class="post-featured__title">Як виставити правильну ставку на фрилансі: повний гайд для розробників</h2>
						<p class="post-featured__text">Розбираємо як розрахувати свою вартість, враховуючи досвід, ринок і тип проєктів. Реальні цифри і стратегії переговорів.</p>
						<div class="post-featured__meta">
							<span>15 хв читання</span>
							<span>·</span>
							<span>12 червня 2025</span>
						</div>
					</div>
				</a>
			</div>

			<div class="blog__grid">
				<a v-for="post in posts" :key="post.title" href="#" class="post-card">
					<div class="post-card__tag">{{ post.tag }}</div>
					<h3 class="post-card__title">{{ post.title }}</h3>
					<p class="post-card__text">{{ post.text }}</p>
					<div class="post-card__meta">
						<span>{{ post.time }}</span>
						<span>{{ post.date }}</span>
					</div>
				</a>
			</div>
		</div>
	</main>
</template>

<script lang="ts" setup>
const posts = [
	{
		tag: "Технології",
		title: "Go vs Node.js у 2025: що обрати для бекенду",
		text: "Порівнюємо продуктивність, екосистему та попит на ринку. Дані з реальних проєктів.",
		time: "8 хв",
		date: "5 червня 2025",
	},
	{
		tag: "Продуктивність",
		title: "5 інструментів які прискорять твою роботу як фрилансера",
		text: "Від тайм-трекерів до AI-асистентів — що реально економить час і нерви.",
		time: "5 хв",
		date: "28 травня 2025",
	},
	{
		tag: "Клієнти",
		title: "Як написати пропозицію яку точно прочитають",
		text: "Розбираємо анатомію успішного відгуку: що писати, чого уникати і як виділитись серед десятків кандидатів.",
		time: "6 хв",
		date: "20 травня 2025",
	},
	{
		tag: "Фінанси",
		title: "Оподаткування IT-фрилансерів в Україні: що змінилось у 2025",
		text: "ФОП 3 групи, єдиний податок, і що робити якщо клієнт за кордоном.",
		time: "10 хв",
		date: "12 травня 2025",
	},
	{
		tag: "Кар'єра",
		title: "Портфоліо яке продає: як показати себе без досвіду",
		text: "Pet-проєкти, open source і контриб'ютинг — реальні стратегії для джунів.",
		time: "7 хв",
		date: "5 травня 2025",
	},
	{
		tag: "Технології",
		title: "Мікросервіси чи моноліт: коли що обирати",
		text: "Без фанатизму — практичне порівняння для реальних проєктів різного масштабу.",
		time: "9 хв",
		date: "28 квітня 2025",
	},
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

.blog {
	padding-top: 64px;

	&__hero {
		padding: 4rem 0 3rem;
		text-align: center;
	}

	&__featured {
		margin-bottom: 2rem;
	}

	&__grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		padding-bottom: 5rem;
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

.post-featured {
	display: block;
	padding: 2.5rem;
	border-radius: 18px;
	border: 1px solid rgba($violet,0.2);
	background: rgba($violet,0.04);
	text-decoration: none;
	transition: border-color 0.2s, background 0.2s;

	&:hover {
		border-color: rgba($violet,0.4);
		background: rgba($violet,0.07);
	}

	&__tag {
		display: inline-block;
		padding: 0.2rem 0.7rem;
		border-radius: 100px;
		background: $violet-dim;
		border: 1px solid rgba($violet,0.3);
		color: $violet;
		font-size: 0.75rem;
		margin-bottom: 1rem;
	}

	&__title {
		font-size: 1.5rem;
		font-weight: 700;
		color: #fff;
		margin: 0 0 0.75rem;
		max-width: 700px;
		line-height: 1.35;
	}

	&__text {
		font-size: 0.95rem;
		color: rgba(255,255,255,0.5);
		line-height: 1.7;
		margin: 0 0 1.25rem;
		max-width: 600px;
	}

	&__meta {
		display: flex;
		gap: 0.5rem;
		font-size: 0.8rem;
		color: rgba(255,255,255,0.3);
	}
}

.post-card {
	display: flex;
	flex-direction: column;
	padding: 1.5rem;
	border-radius: 14px;
	border: 1px solid rgba(255,255,255,0.07);
	background: rgba(255,255,255,0.02);
	text-decoration: none;
	transition: border-color 0.2s, background 0.2s;

	&:hover {
		border-color: rgba($violet,0.25);
		background: rgba($violet,0.03);
	}

	&__tag {
		display: inline-block;
		padding: 0.15rem 0.6rem;
		border-radius: 100px;
		background: rgba(255,255,255,0.05);
		border: 1px solid rgba(255,255,255,0.08);
		color: rgba(255,255,255,0.4);
		font-size: 0.72rem;
		margin-bottom: 0.75rem;
		width: fit-content;
	}

	&__title {
		font-size: 0.95rem;
		font-weight: 700;
		color: rgba(255,255,255,0.9);
		margin: 0 0 0.6rem;
		line-height: 1.4;
	}

	&__text {
		font-size: 0.85rem;
		color: rgba(255,255,255,0.4);
		line-height: 1.7;
		margin: 0;
		flex: 1;
	}

	&__meta {
		display: flex;
		justify-content: space-between;
		font-size: 0.75rem;
		color: rgba(255,255,255,0.25);
		margin-top: 1.25rem;
		padding-top: 1rem;
		border-top: 1px solid rgba(255,255,255,0.05);
	}
}
</style>
