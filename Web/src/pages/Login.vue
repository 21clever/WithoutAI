<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const tab = ref<"login" | "register">("login");

// --- LOGIN ---
const login = reactive({ email: "", password: "" });
const loginErrors = reactive({ email: "", password: "" });
const loginTouched = reactive({ email: false, password: false });

function validateLoginEmail() {
	if (!login.email) return (loginErrors.email = "Email обов'язковий");
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login.email)) return (loginErrors.email = "Невірний формат email");
	loginErrors.email = "";
}
function validateLoginPassword() {
	if (!login.password) return (loginErrors.password = "Пароль обов'язковий");
	loginErrors.password = "";
}

const loginValid = computed(() => !loginErrors.email && !loginErrors.password && login.email && login.password);

const loginServerError = ref("");

function submitLogin() {
	loginTouched.email = true;
	loginTouched.password = true;
	validateLoginEmail();
	validateLoginPassword();
	if (!loginValid.value) return;

	const users: User[] = JSON.parse(localStorage.getItem("hexly_users") || "[]");
	const user = users.find((u) => u.email === login.email);
	if (!user || user.password !== login.password) {
		loginServerError.value = "Невірний email або пароль";
		return;
	}
	loginServerError.value = "";
	localStorage.setItem("hexly_auth", JSON.stringify({ name: user.name, email: user.email }));
	router.push("/");
}

// --- REGISTER ---
interface User { name: string; email: string; password: string }

const reg = reactive({ name: "", email: "", password: "", confirm: "" });
const regErrors = reactive({ name: "", email: "", password: "", confirm: "" });
const regTouched = reactive({ name: false, email: false, password: false, confirm: false });

function validateRegName() {
	if (!reg.name.trim()) return (regErrors.name = "Ім'я обов'язкове");
	if (reg.name.trim().length < 2) return (regErrors.name = "Мінімум 2 символи");
	regErrors.name = "";
}
function validateRegEmail() {
	if (!reg.email) return (regErrors.email = "Email обов'язковий");
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reg.email)) return (regErrors.email = "Невірний формат email");
	regErrors.email = "";
}
function validateRegPassword() {
	if (!reg.password) return (regErrors.password = "Пароль обов'язковий");
	if (reg.password.length < 8) return (regErrors.password = "Мінімум 8 символів");
	if (!/[A-Z]/.test(reg.password)) return (regErrors.password = "Потрібна хоча б одна велика літера");
	if (!/[0-9]/.test(reg.password)) return (regErrors.password = "Потрібна хоча б одна цифра");
	regErrors.password = "";
	if (reg.confirm) validateRegConfirm();
}
function validateRegConfirm() {
	if (!reg.confirm) return (regErrors.confirm = "Підтвердіть пароль");
	if (reg.confirm !== reg.password) return (regErrors.confirm = "Паролі не збігаються");
	regErrors.confirm = "";
}

const passwordStrength = computed(() => {
	const p = reg.password;
	if (!p) return 0;
	let score = 0;
	if (p.length >= 8) score++;
	if (p.length >= 12) score++;
	if (/[A-Z]/.test(p)) score++;
	if (/[0-9]/.test(p)) score++;
	if (/[^A-Za-z0-9]/.test(p)) score++;
	return score;
});

const strengthLabel = computed(() => {
	const s = passwordStrength.value;
	if (s <= 1) return { text: "Слабкий", color: "#ef4444" };
	if (s <= 2) return { text: "Середній", color: "#f97316" };
	if (s <= 3) return { text: "Добрий", color: "#eab308" };
	return { text: "Надійний", color: "#22c55e" };
});

const regValid = computed(() =>
	!regErrors.name && !regErrors.email && !regErrors.password && !regErrors.confirm &&
	reg.name && reg.email && reg.password && reg.confirm
);

const regServerError = ref("");

function submitRegister() {
	regTouched.name = true;
	regTouched.email = true;
	regTouched.password = true;
	regTouched.confirm = true;
	validateRegName();
	validateRegEmail();
	validateRegPassword();
	validateRegConfirm();
	if (!regValid.value) return;

	const users: User[] = JSON.parse(localStorage.getItem("hexly_users") || "[]");
	if (users.find((u) => u.email === reg.email)) {
		regServerError.value = "Акаунт з таким email вже існує";
		return;
	}
	users.push({ name: reg.name.trim(), email: reg.email, password: reg.password });
	localStorage.setItem("hexly_users", JSON.stringify(users));
	localStorage.setItem("hexly_auth", JSON.stringify({ name: reg.name.trim(), email: reg.email }));
	router.push("/");
}

const showPassword = ref(false);
const showConfirm = ref(false);
</script>

<template>
	<main class="auth">
		<div class="auth__card">
			<a href="/" class="auth__logo">
				<svg viewBox="0 0 36 36" fill="none" width="32" height="32">
					<polygon points="18,2 33,10 33,26 18,34 3,26 3,10" fill="rgba(168,85,247,0.12)" stroke="rgba(168,85,247,0.6)" stroke-width="1.5"/>
					<text x="18" y="23" text-anchor="middle" font-size="11" font-weight="700" font-family="monospace" fill="#a855f7">&lt;/&gt;</text>
				</svg>
				<span>Hexly</span>
			</a>

			<div class="auth__tabs">
				<button :class="{ active: tab === 'login' }" @click="tab = 'login'">Вхід</button>
				<button :class="{ active: tab === 'register' }" @click="tab = 'register'">Реєстрація</button>
			</div>

			<!-- LOGIN -->
			<form v-if="tab === 'login'" class="form" @submit.prevent="submitLogin" novalidate>
				<div class="field" :class="{ 'field--error': loginTouched.email && loginErrors.email }">
					<label>Email</label>
					<input
						v-model="login.email"
						type="email"
						placeholder="your@email.com"
						@blur="loginTouched.email = true; validateLoginEmail()"
						@input="loginTouched.email && validateLoginEmail()"
					/>
					<span v-if="loginTouched.email && loginErrors.email" class="field__error">{{ loginErrors.email }}</span>
				</div>

				<div class="field" :class="{ 'field--error': loginTouched.password && loginErrors.password }">
					<label>Пароль</label>
					<div class="input-wrap">
						<input
							v-model="login.password"
							:type="showPassword ? 'text' : 'password'"
							placeholder="••••••••"
							@blur="loginTouched.password = true; validateLoginPassword()"
							@input="loginTouched.password && validateLoginPassword()"
						/>
						<button type="button" class="eye-btn" @click="showPassword = !showPassword">
							<svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
								<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
							</svg>
							<svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
								<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
							</svg>
						</button>
					</div>
					<span v-if="loginTouched.password && loginErrors.password" class="field__error">{{ loginErrors.password }}</span>
				</div>

				<div v-if="loginServerError" class="server-error">{{ loginServerError }}</div>

				<button type="submit" class="btn-submit">Увійти</button>

				<p class="form__switch">
					Немає акаунту?
					<button type="button" @click="tab = 'register'">Зареєструватись</button>
				</p>
			</form>

			<!-- REGISTER -->
			<form v-else class="form" @submit.prevent="submitRegister" novalidate>
				<div class="field" :class="{ 'field--error': regTouched.name && regErrors.name }">
					<label>Ім'я</label>
					<input
						v-model="reg.name"
						type="text"
						placeholder="Ваше ім'я"
						@blur="regTouched.name = true; validateRegName()"
						@input="regTouched.name && validateRegName()"
					/>
					<span v-if="regTouched.name && regErrors.name" class="field__error">{{ regErrors.name }}</span>
				</div>

				<div class="field" :class="{ 'field--error': regTouched.email && regErrors.email }">
					<label>Email</label>
					<input
						v-model="reg.email"
						type="email"
						placeholder="your@email.com"
						@blur="regTouched.email = true; validateRegEmail()"
						@input="regTouched.email && validateRegEmail()"
					/>
					<span v-if="regTouched.email && regErrors.email" class="field__error">{{ regErrors.email }}</span>
				</div>

				<div class="field" :class="{ 'field--error': regTouched.password && regErrors.password }">
					<label>Пароль</label>
					<div class="input-wrap">
						<input
							v-model="reg.password"
							:type="showPassword ? 'text' : 'password'"
							placeholder="Мінімум 8 символів"
							@blur="regTouched.password = true; validateRegPassword()"
							@input="regTouched.password && validateRegPassword()"
						/>
						<button type="button" class="eye-btn" @click="showPassword = !showPassword">
							<svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
								<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
							</svg>
							<svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
								<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
							</svg>
						</button>
					</div>
					<div v-if="reg.password" class="strength">
						<div class="strength__bars">
							<div v-for="i in 5" :key="i" class="strength__bar" :style="i <= passwordStrength ? { background: strengthLabel.color } : {}" />
						</div>
						<span :style="{ color: strengthLabel.color }">{{ strengthLabel.text }}</span>
					</div>
					<span v-if="regTouched.password && regErrors.password" class="field__error">{{ regErrors.password }}</span>
				</div>

				<div class="field" :class="{ 'field--error': regTouched.confirm && regErrors.confirm }">
					<label>Повторіть пароль</label>
					<div class="input-wrap">
						<input
							v-model="reg.confirm"
							:type="showConfirm ? 'text' : 'password'"
							placeholder="••••••••"
							@blur="regTouched.confirm = true; validateRegConfirm()"
							@input="regTouched.confirm && validateRegConfirm()"
						/>
						<button type="button" class="eye-btn" @click="showConfirm = !showConfirm">
							<svg v-if="!showConfirm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
								<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
							</svg>
							<svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
								<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
							</svg>
						</button>
					</div>
					<span v-if="regTouched.confirm && regErrors.confirm" class="field__error">{{ regErrors.confirm }}</span>
				</div>

				<div v-if="regServerError" class="server-error">{{ regServerError }}</div>

				<button type="submit" class="btn-submit">Створити акаунт</button>

				<p class="form__switch">
					Вже є акаунт?
					<button type="button" @click="tab = 'login'">Увійти</button>
				</p>
			</form>
		</div>
	</main>
</template>

<style lang="scss" scoped>
$violet: #a855f7;
$violet-dim: rgba(#a855f7, 0.1);
$violet-glow: rgba(#a855f7, 0.3);
$error: #ef4444;

.auth {
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem;
	background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba($violet, 0.07) 0%, transparent 60%);

	&__card {
		width: 100%;
		max-width: 420px;
		padding: 2.5rem;
		border-radius: 20px;
		border: 1px solid rgba(255, 255, 255, 0.07);
		background: rgba(255, 255, 255, 0.02);
		backdrop-filter: blur(20px);
	}

	&__logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		margin-bottom: 2rem;

		span {
			font-size: 1.15rem;
			font-weight: 700;
			color: #fff;
		}
	}

	&__tabs {
		display: flex;
		border-bottom: 1px solid rgba(255, 255, 255, 0.07);
		margin-bottom: 2rem;

		button {
			flex: 1;
			padding: 0.6rem;
			background: none;
			border: none;
			border-bottom: 2px solid transparent;
			color: rgba(255, 255, 255, 0.4);
			font-size: 0.9rem;
			font-weight: 500;
			cursor: pointer;
			transition: color 0.15s, border-color 0.15s;
			margin-bottom: -1px;

			&.active {
				color: $violet;
				border-bottom-color: $violet;
			}
		}
	}
}

.form {
	display: flex;
	flex-direction: column;
	gap: 1.1rem;

	&__switch {
		text-align: center;
		font-size: 0.85rem;
		color: rgba(255, 255, 255, 0.35);
		margin: 0;

		button {
			background: none;
			border: none;
			color: $violet;
			font-size: 0.85rem;
			cursor: pointer;
			padding: 0;
			&:hover { text-decoration: underline; }
		}
	}
}

.field {
	display: flex;
	flex-direction: column;
	gap: 0.4rem;

	label {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.5);
		letter-spacing: 0.02em;
	}

	input {
		width: 100%;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 10px;
		padding: 0.65rem 0.9rem;
		color: rgba(255, 255, 255, 0.9);
		font-size: 0.9rem;
		outline: none;
		transition: border-color 0.15s, box-shadow 0.15s;
		font-family: inherit;
		box-sizing: border-box;

		&::placeholder { color: rgba(255, 255, 255, 0.18); }

		&:focus {
			border-color: rgba($violet, 0.5);
			box-shadow: 0 0 0 3px rgba($violet, 0.08);
		}
	}

	&--error input {
		border-color: rgba($error, 0.5);
		&:focus { box-shadow: 0 0 0 3px rgba($error, 0.08); }
	}

	&__error {
		font-size: 0.78rem;
		color: $error;
		display: flex;
		align-items: center;
		gap: 0.3rem;

		&::before {
			content: "!";
			width: 14px;
			height: 14px;
			border-radius: 50%;
			background: $error;
			color: #fff;
			font-size: 0.65rem;
			font-weight: 700;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
		}
	}
}

.input-wrap {
	position: relative;

	input { padding-right: 2.8rem; }
}

.eye-btn {
	position: absolute;
	right: 0.75rem;
	top: 50%;
	transform: translateY(-50%);
	background: none;
	border: none;
	color: rgba(255, 255, 255, 0.25);
	cursor: pointer;
	padding: 0;
	display: flex;
	transition: color 0.15s;

	&:hover { color: rgba(255, 255, 255, 0.6); }

	svg { width: 16px; height: 16px; }
}

.strength {
	display: flex;
	align-items: center;
	gap: 0.6rem;
	margin-top: 0.25rem;

	&__bars {
		display: flex;
		gap: 3px;
		flex: 1;
	}

	&__bar {
		flex: 1;
		height: 3px;
		border-radius: 2px;
		background: rgba(255, 255, 255, 0.08);
		transition: background 0.3s;
	}

	span {
		font-size: 0.75rem;
		white-space: nowrap;
	}
}

.server-error {
	padding: 0.7rem 0.9rem;
	border-radius: 8px;
	background: rgba($error, 0.08);
	border: 1px solid rgba($error, 0.2);
	color: $error;
	font-size: 0.85rem;
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
	margin-top: 0.25rem;

	&:hover {
		background: lighten(#a855f7, 8%);
		box-shadow: 0 0 20px $violet-glow;
	}
}
</style>
