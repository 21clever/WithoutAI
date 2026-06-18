<template>
	<main class="legal">
		<div class="container">
			<h1 class="page-title">Політика конфіденційності</h1>
			<p class="page-date">Оновлено: 1 червня 2025</p>

			<div class="legal__body">
				<section v-for="section in sections" :key="section.title" class="legal__section">
					<h2>{{ section.title }}</h2>
					<p v-for="p in section.content" :key="p">{{ p }}</p>
				</section>
			</div>
		</div>
	</main>
</template>

<script lang="ts" setup>
const sections = [
	{
		title: "1. Яку інформацію ми збираємо",
		content: [
			"При реєстрації ми збираємо ім'я, email-адресу та пароль. Для розробників — також інформацію про навички, досвід та портфоліо.",
			"При використанні платформи ми автоматично збираємо дані про дії на сайті, IP-адресу, тип браузера та пристрою для забезпечення безпеки та аналітики.",
		],
	},
	{
		title: "2. Як ми використовуємо ваші дані",
		content: [
			"Дані використовуються для надання послуг платформи, персоналізації рекомендацій, забезпечення безпеки транзакцій та комунікації з вами.",
			"Ми не продаємо ваші персональні дані третім особам. Передача даних можлива лише в межах надання послуг платформи (платіжні системи, хостинг).",
		],
	},
	{
		title: "3. Зберігання та захист даних",
		content: [
			"Усі дані зберігаються на захищених серверах в межах ЄС. Ми використовуємо шифрування SSL/TLS для захисту передачі даних.",
			"Паролі зберігаються у хешованому вигляді. Доступ до персональних даних мають лише уповноважені співробітники.",
		],
	},
	{
		title: "4. Ваші права",
		content: [
			"Ви маєте право на доступ, виправлення та видалення своїх даних. Для цього зверніться до нас на privacy@hexly.dev.",
			"Ви можете відкликати згоду на обробку даних у будь-який момент. Це може призвести до обмеження функціональності платформи.",
		],
	},
	{
		title: "5. Контакти",
		content: [
			"Питання щодо конфіденційності: privacy@hexly.dev",
		],
	},
];
</script>

<style lang="scss" scoped>
$violet: #a855f7;

.container {
	max-width: 720px;
	margin: 0 auto;
	padding: 0 2rem;
}

.legal {
	padding: 64px 0 6rem;

	&__body {
		margin-top: 3rem;
	}

	&__section {
		margin-bottom: 2.5rem;

		h2 {
			font-size: 1.1rem;
			font-weight: 700;
			color: #fff;
			margin: 0 0 0.75rem;
		}

		p {
			font-size: 0.9rem;
			color: rgba(255,255,255,0.5);
			line-height: 1.8;
			margin: 0 0 0.75rem;
		}
	}
}

.page-title {
	font-size: 2rem;
	font-weight: 800;
	color: #fff;
	margin: 4rem 0 0.4rem;
}

.page-date {
	font-size: 0.85rem;
	color: rgba(255,255,255,0.3);
	margin: 0;
}
</style>
