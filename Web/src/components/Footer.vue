<script lang="ts" setup>
import { useAuth } from "../composables/useAuth";
const { open } = useAuth();
</script>
<template>
	<footer class="footer">
		<div class="footer__top">
			<div class="footer__brand">
				<a href="/" class="footer__logo">
					<svg viewBox="0 0 36 36" fill="none" width="32" height="32">
						<polygon points="18,2 33,10 33,26 18,34 3,26 3,10" fill="rgba(168,85,247,0.12)" stroke="rgba(168,85,247,0.5)" stroke-width="1.5"/>
						<text x="18" y="23" text-anchor="middle" font-size="11" font-weight="700" font-family="monospace" fill="#a855f7">&lt;/&gt;</text>
					</svg>
					<span>Hexly</span>
				</a>
				<p class="footer__desc">
					Платформа для пошуку розробників та IT-спеціалістів в Україні. Швидко, надійно, без посередників.
				</p>
				<div class="footer__socials">
					<a href="#" class="footer__social" aria-label="Telegram">
						<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
							<path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 14.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.496.969z"/>
						</svg>
					</a>
					<a href="#" class="footer__social" aria-label="GitHub">
						<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
							<path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
						</svg>
					</a>
					<a href="#" class="footer__social" aria-label="LinkedIn">
						<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
						</svg>
					</a>
				</div>
			</div>

			<div class="footer__cols">
				<div class="footer__col">
					<h4>Платформа</h4>
					<a href="/catalog">Знайти розробника</a>
					<button @click="open('login')">Розмістити завдання</button>
					<a href="/how">Як це працює</a>
					<a href="/pricing">Тарифи</a>
				</div>
				<div class="footer__col">
					<h4>Розробникам</h4>
					<button @click="open('register')">Стати виконавцем</button>
					<a href="/devs/how">Як заробляти</a>
					<a href="/devs/tips">Поради</a>
					<a href="/blog">Блог</a>
				</div>
				<div class="footer__col">
					<h4>Компанія</h4>
					<a href="/about">Про нас</a>
					<a href="/contacts">Контакти</a>
					<a href="/privacy">Конфіденційність</a>
					<a href="/terms">Умови використання</a>
				</div>
			</div>
		</div>

		<div class="footer__bottom">
			<span>© 2025 Hexly. Всі права захищені.</span>
			<span>Зроблено в Україні 🇺🇦</span>
		</div>
	</footer>
</template>
<style lang="scss" scoped>
$violet: #a855f7;
$violet-dim: rgba(#a855f7, 0.12);

.footer {
	background: #06040d;
	border-top: 1px solid rgba(255, 255, 255, 0.06);
	padding: 4rem 2rem 2rem;

	&__top {
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1.4fr 2fr;
		gap: 4rem;
		padding-bottom: 3rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	&__logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		margin-bottom: 1rem;

		span {
			font-size: 1.15rem;
			font-weight: 700;
			color: #fff;
		}
	}

	&__desc {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.4);
		line-height: 1.7;
		margin: 0 0 1.5rem;
		max-width: 280px;
	}

	&__socials {
		display: flex;
		gap: 0.6rem;
	}

	&__social {
		width: 36px;
		height: 36px;
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: rgba(255, 255, 255, 0.04);
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(255, 255, 255, 0.4);
		text-decoration: none;
		transition: color 0.15s, border-color 0.15s, background 0.15s;

		&:hover {
			color: $violet;
			border-color: rgba($violet, 0.4);
			background: $violet-dim;
		}
	}

	&__cols {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
	}

	&__col {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;

		h4 {
			font-size: 0.8rem;
			font-weight: 600;
			color: rgba(255, 255, 255, 0.9);
			letter-spacing: 0.08em;
			text-transform: uppercase;
			margin: 0 0 0.4rem;
		}

		a, button {
			font-size: 0.875rem;
			color: rgba(255, 255, 255, 0.4);
			text-decoration: none;
			background: none;
			border: none;
			padding: 0;
			cursor: pointer;
			font-family: inherit;
			text-align: left;
			transition: color 0.15s;

			&:hover {
				color: rgba(255, 255, 255, 0.8);
			}
		}
	}

	&__bottom {
		max-width: 1200px;
		margin: 2rem auto 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.25);
	}
}
</style>
