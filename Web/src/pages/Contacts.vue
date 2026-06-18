<template>
	<main class="contacts">
		<div class="container">
			<div class="contacts__hero">
				<h1 class="page-title">Контакти</h1>
				<p class="page-sub">Є питання? Ми завжди на зв'язку</p>
			</div>

			<div class="contacts__grid">
				<div class="contact-form">
					<h2>Написати нам</h2>
					<form @submit.prevent>
						<div class="field">
							<label>Ім'я</label>
							<input type="text" placeholder="Ваше ім'я" />
						</div>
						<div class="field">
							<label>Email</label>
							<input type="email" placeholder="your@email.com" />
						</div>
						<div class="field">
							<label>Тема</label>
							<select>
								<option>Загальне питання</option>
								<option>Технічна проблема</option>
								<option>Партнерство</option>
								<option>Інше</option>
							</select>
						</div>
						<div class="field">
							<label>Повідомлення</label>
							<textarea placeholder="Опишіть ваше питання..." rows="5" />
						</div>
						<button type="submit" class="btn-submit">Надіслати повідомлення</button>
					</form>
				</div>

				<div class="contact-info">
					<div v-for="item in contacts" :key="item.label" class="contact-card">
						<div class="contact-card__icon" v-html="item.icon" />
						<div>
							<div class="contact-card__label">{{ item.label }}</div>
							<a :href="item.href" class="contact-card__value">{{ item.value }}</a>
						</div>
					</div>

					<div class="contact-social">
						<h3>Соцмережі</h3>
						<div class="contact-social__links">
							<a href="#" class="social-link">Telegram</a>
							<a href="#" class="social-link">GitHub</a>
							<a href="#" class="social-link">LinkedIn</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script lang="ts" setup>
const contacts = [
	{
		label: "Email",
		value: "hello@hexly.dev",
		href: "mailto:hello@hexly.dev",
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
	},
	{
		label: "Telegram",
		value: "@hexly_support",
		href: "https://t.me/hexly_support",
		icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 14.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.496.969z"/></svg>`,
	},
	{
		label: "Час відповіді",
		value: "До 2 годин у робочий час",
		href: "#",
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
	},
];
</script>

<style lang="scss" scoped>
$violet: #a855f7;
$violet-dim: rgba(#a855f7, 0.1);

.container {
	max-width: 1000px;
	margin: 0 auto;
	padding: 0 2rem;
}

.contacts {
	padding-top: 64px;

	&__hero {
		padding: 4rem 0 3rem;
		text-align: center;
	}

	&__grid {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: 3rem;
		padding-bottom: 6rem;
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

.contact-form {
	h2 {
		font-size: 1.25rem;
		font-weight: 700;
		color: #fff;
		margin: 0 0 1.5rem;
	}
}

.field {
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
	margin-bottom: 1.1rem;

	label {
		font-size: 0.8rem;
		color: rgba(255,255,255,0.5);
		letter-spacing: 0.03em;
	}

	input, select, textarea {
		background: rgba(255,255,255,0.04);
		border: 1px solid rgba(255,255,255,0.08);
		border-radius: 9px;
		padding: 0.65rem 0.9rem;
		color: rgba(255,255,255,0.85);
		font-size: 0.9rem;
		outline: none;
		transition: border-color 0.15s;
		font-family: inherit;
		resize: none;

		&::placeholder { color: rgba(255,255,255,0.2); }
		&:focus { border-color: rgba($violet,0.5); }

		option { background: #12101a; }
	}
}

.btn-submit {
	width: 100%;
	padding: 0.7rem;
	border-radius: 10px;
	background: $violet;
	color: #fff;
	font-size: 0.9rem;
	font-weight: 600;
	border: none;
	cursor: pointer;
	transition: background 0.2s, box-shadow 0.2s;
	margin-top: 0.5rem;

	&:hover {
		background: lighten(#a855f7, 8%);
		box-shadow: 0 0 20px rgba($violet, 0.35);
	}
}

.contact-card {
	display: flex;
	align-items: center;
	gap: 1rem;
	padding: 1.25rem;
	border-radius: 12px;
	border: 1px solid rgba(255,255,255,0.07);
	background: rgba(255,255,255,0.02);
	margin-bottom: 0.75rem;

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
		flex-shrink: 0;

		svg { width: 18px; height: 18px; }
	}

	&__label {
		font-size: 0.75rem;
		color: rgba(255,255,255,0.35);
		margin-bottom: 2px;
	}

	&__value {
		font-size: 0.9rem;
		color: rgba(255,255,255,0.8);
		text-decoration: none;
		&:hover { color: $violet; }
	}
}

.contact-social {
	margin-top: 1.5rem;

	h3 {
		font-size: 0.8rem;
		color: rgba(255,255,255,0.35);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		margin: 0 0 0.75rem;
	}

	&__links {
		display: flex;
		gap: 0.5rem;
	}
}

.social-link {
	padding: 0.4rem 0.9rem;
	border-radius: 7px;
	border: 1px solid rgba(255,255,255,0.08);
	background: rgba(255,255,255,0.03);
	color: rgba(255,255,255,0.5);
	font-size: 0.85rem;
	text-decoration: none;
	transition: all 0.15s;

	&:hover {
		border-color: rgba($violet,0.4);
		color: $violet;
		background: $violet-dim;
	}
}
</style>
