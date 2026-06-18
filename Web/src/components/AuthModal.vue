<script lang="ts" setup>
import { ref, reactive, computed, watch } from "vue";
import { useAuth } from "../composables/useAuth";

const { isOpen, initialTab, close, setUser } = useAuth();
const tab = ref<"login" | "register">("login");

watch(initialTab, (v) => { tab.value = v; }, { immediate: true });

function switchTab(t: "login" | "register") {
	tab.value = t;
	loginServerError.value = "";
	regServerError.value = "";
}

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
	const found = users.find((u) => u.email === login.email);
	if (!found || found.password !== login.password) {
		loginServerError.value = "Невірний email або пароль";
		return;
	}
	setUser({ name: found.name, email: found.email });
	close();
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
	let s = 0;
	if (p.length >= 8) s++;
	if (p.length >= 12) s++;
	if (/[A-Z]/.test(p)) s++;
	if (/[0-9]/.test(p)) s++;
	if (/[^A-Za-z0-9]/.test(p)) s++;
	return s;
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
	regTouched.name = true; regTouched.email = true;
	regTouched.password = true; regTouched.confirm = true;
	validateRegName(); validateRegEmail(); validateRegPassword(); validateRegConfirm();
	if (!regValid.value) return;

	const users: User[] = JSON.parse(localStorage.getItem("hexly_users") || "[]");
	if (users.find((u) => u.email === reg.email)) {
		regServerError.value = "Акаунт з таким email вже існує";
		return;
	}
	users.push({ name: reg.name.trim(), email: reg.email, password: reg.password });
	localStorage.setItem("hexly_users", JSON.stringify(users));
	setUser({ name: reg.name.trim(), email: reg.email });
	close();
}

const showPassword = ref(false);
const showConfirm = ref(false);
</script>

<template>
	<Teleport to="body">
		<Transition name="modal">
			<div v-if="isOpen" class="overlay" @click.self="close">
				<div class="modal">
					<button class="modal__close" @click="close">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
							<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
						</svg>
					</button>

					<div class="modal__logo">
						<svg viewBox="0 0 36 36" fill="none" width="28" height="28">
							<polygon points="18,2 33,10 33,26 18,34 3,26 3,10" fill="rgba(168,85,247,0.12)" stroke="rgba(168,85,247,0.6)" stroke-width="1.5"/>
							<text x="18" y="23" text-anchor="middle" font-size="11" font-weight="700" font-family="monospace" fill="#a855f7">&lt;/&gt;</text>
						</svg>
						<span>Hexly</span>
					</div>

					<div class="modal__tabs">
						<button :class="{ active: tab === 'login' }" @click="switchTab('login')">Вхід</button>
						<button :class="{ active: tab === 'register' }" @click="switchTab('register')">Реєстрація</button>
					</div>

					<!-- LOGIN -->
					<form v-if="tab === 'login'" class="form" @submit.prevent="submitLogin" novalidate>
						<div class="field" :class="{ 'field--error': loginTouched.email && loginErrors.email }">
							<label>Email</label>
							<input v-model="login.email" type="email" placeholder="your@email.com"
								@blur="loginTouched.email = true; validateLoginEmail()"
								@input="loginTouched.email && validateLoginEmail()" />
							<span v-if="loginTouched.email && loginErrors.email" class="field__error">
								{{ loginErrors.email }}
							</span>
						</div>

						<div class="field" :class="{ 'field--error': loginTouched.password && loginErrors.password }">
							<label>Пароль</label>
							<div class="input-wrap">
								<input v-model="login.password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••"
									@blur="loginTouched.password = true; validateLoginPassword()"
									@input="loginTouched.password && validateLoginPassword()" />
								<button type="button" class="eye-btn" @click="showPassword = !showPassword">
									<svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
									<svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
								</button>
							</div>
							<span v-if="loginTouched.password && loginErrors.password" class="field__error">
								{{ loginErrors.password }}
							</span>
						</div>

						<div v-if="loginServerError" class="server-error">{{ loginServerError }}</div>

						<button type="submit" class="btn-submit">Увійти</button>
						<p class="form__switch">
							Немає акаунту?
							<button type="button" @click="switchTab('register')">Зареєструватись</button>
						</p>
					</form>

					<!-- REGISTER -->
					<form v-else class="form" @submit.prevent="submitRegister" novalidate>
						<div class="field" :class="{ 'field--error': regTouched.name && regErrors.name }">
							<label>Ім'я</label>
							<input v-model="reg.name" type="text" placeholder="Ваше ім'я"
								@blur="regTouched.name = true; validateRegName()"
								@input="regTouched.name && validateRegName()" />
							<span v-if="regTouched.name && regErrors.name" class="field__error">{{ regErrors.name }}</span>
						</div>

						<div class="field" :class="{ 'field--error': regTouched.email && regErrors.email }">
							<label>Email</label>
							<input v-model="reg.email" type="email" placeholder="your@email.com"
								@blur="regTouched.email = true; validateRegEmail()"
								@input="regTouched.email && validateRegEmail()" />
							<span v-if="regTouched.email && regErrors.email" class="field__error">{{ regErrors.email }}</span>
						</div>

						<div class="field" :class="{ 'field--error': regTouched.password && regErrors.password }">
							<label>Пароль</label>
							<div class="input-wrap">
								<input v-model="reg.password" :type="showPassword ? 'text' : 'password'" placeholder="Мінімум 8 символів"
									@blur="regTouched.password = true; validateRegPassword()"
									@input="regTouched.password && validateRegPassword()" />
								<button type="button" class="eye-btn" @click="showPassword = !showPassword">
									<svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
									<svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
								</button>
							</div>
							<div v-if="reg.password" class="strength">
								<div class="strength__bars">
									<div v-for="i in 5" :key="i" class="strength__bar"
										:style="i <= passwordStrength ? { background: strengthLabel.color } : {}" />
								</div>
								<span :style="{ color: strengthLabel.color }">{{ strengthLabel.text }}</span>
							</div>
							<span v-if="regTouched.password && regErrors.password" class="field__error">{{ regErrors.password }}</span>
						</div>

						<div class="field" :class="{ 'field--error': regTouched.confirm && regErrors.confirm }">
							<label>Повторіть пароль</label>
							<div class="input-wrap">
								<input v-model="reg.confirm" :type="showConfirm ? 'text' : 'password'" placeholder="••••••••"
									@blur="regTouched.confirm = true; validateRegConfirm()"
									@input="regTouched.confirm && validateRegConfirm()" />
								<button type="button" class="eye-btn" @click="showConfirm = !showConfirm">
									<svg v-if="!showConfirm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
									<svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
								</button>
							</div>
							<span v-if="regTouched.confirm && regErrors.confirm" class="field__error">{{ regErrors.confirm }}</span>
						</div>

						<div v-if="regServerError" class="server-error">{{ regServerError }}</div>

						<button type="submit" class="btn-submit">Створити акаунт</button>
						<p class="form__switch">
							Вже є акаунт?
							<button type="button" @click="switchTab('login')">Увійти</button>
						</p>
					</form>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<style lang="scss" scoped>
$violet: #a855f7;
$violet-dim: rgba(#a855f7, 0.1);
$violet-glow: rgba(#a855f7, 0.3);
$error: #ef4444;

.overlay {
	position: fixed;
	inset: 0;
	z-index: 200;
	background: rgba(0, 0, 0, 0.7);
	backdrop-filter: blur(6px);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem;
}

.modal {
	position: relative;
	width: 100%;
	max-width: 400px;
	padding: 2rem;
	border-radius: 20px;
	border: 1px solid rgba(255, 255, 255, 0.08);
	background: #0e0b18;
	box-shadow: 0 24px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba($violet, 0.08);

	&__close {
		position: absolute;
		top: 1rem;
		right: 1rem;
		width: 30px;
		height: 30px;
		border-radius: 7px;
		border: none;
		background: rgba(255, 255, 255, 0.05);
		color: rgba(255, 255, 255, 0.4);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.15s, color 0.15s;

		&:hover { background: rgba(255, 255, 255, 0.1); color: #fff; }
		svg { width: 14px; height: 14px; }
	}

	&__logo {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		margin-bottom: 1.5rem;

		span {
			font-size: 1rem;
			font-weight: 700;
			color: #fff;
		}
	}

	&__tabs {
		display: flex;
		border-bottom: 1px solid rgba(255, 255, 255, 0.07);
		margin-bottom: 1.5rem;

		button {
			flex: 1;
			padding: 0.55rem;
			background: none;
			border: none;
			border-bottom: 2px solid transparent;
			color: rgba(255, 255, 255, 0.35);
			font-size: 0.875rem;
			font-weight: 500;
			cursor: pointer;
			transition: color 0.15s, border-color 0.15s;
			margin-bottom: -1px;

			&.active { color: $violet; border-bottom-color: $violet; }
		}
	}
}

.form {
	display: flex;
	flex-direction: column;
	gap: 1rem;

	&__switch {
		text-align: center;
		font-size: 0.82rem;
		color: rgba(255, 255, 255, 0.3);
		margin: 0;

		button {
			background: none;
			border: none;
			color: $violet;
			font-size: 0.82rem;
			cursor: pointer;
			padding: 0;
			&:hover { text-decoration: underline; }
		}
	}
}

.field {
	display: flex;
	flex-direction: column;
	gap: 0.35rem;

	label {
		font-size: 0.78rem;
		color: rgba(255, 255, 255, 0.45);
	}

	input {
		width: 100%;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 9px;
		padding: 0.6rem 0.85rem;
		color: rgba(255, 255, 255, 0.9);
		font-size: 0.875rem;
		outline: none;
		transition: border-color 0.15s, box-shadow 0.15s;
		font-family: inherit;
		box-sizing: border-box;

		&::placeholder { color: rgba(255, 255, 255, 0.15); }
		&:focus { border-color: rgba($violet, 0.5); box-shadow: 0 0 0 3px rgba($violet, 0.07); }
	}

	&--error input { border-color: rgba($error, 0.45); }

	&__error {
		font-size: 0.75rem;
		color: $error;
		display: flex;
		align-items: center;
		gap: 0.3rem;

		&::before {
			content: "!";
			width: 13px;
			height: 13px;
			border-radius: 50%;
			background: $error;
			color: #fff;
			font-size: 0.6rem;
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
	input { padding-right: 2.6rem; }
}

.eye-btn {
	position: absolute;
	right: 0.7rem;
	top: 50%;
	transform: translateY(-50%);
	background: none;
	border: none;
	color: rgba(255, 255, 255, 0.22);
	cursor: pointer;
	padding: 0;
	display: flex;
	transition: color 0.15s;

	&:hover { color: rgba(255, 255, 255, 0.6); }
	svg { width: 15px; height: 15px; }
}

.strength {
	display: flex;
	align-items: center;
	gap: 0.5rem;

	&__bars {
		display: flex;
		gap: 3px;
		flex: 1;
	}

	&__bar {
		flex: 1;
		height: 3px;
		border-radius: 2px;
		background: rgba(255, 255, 255, 0.07);
		transition: background 0.3s;
	}

	span { font-size: 0.72rem; white-space: nowrap; }
}

.server-error {
	padding: 0.6rem 0.8rem;
	border-radius: 8px;
	background: rgba($error, 0.08);
	border: 1px solid rgba($error, 0.2);
	color: $error;
	font-size: 0.82rem;
}

.btn-submit {
	width: 100%;
	padding: 0.65rem;
	border-radius: 9px;
	background: $violet;
	color: #fff;
	font-size: 0.875rem;
	font-weight: 600;
	border: none;
	cursor: pointer;
	transition: background 0.2s, box-shadow 0.2s;

	&:hover { background: lighten(#a855f7, 8%); box-shadow: 0 0 18px $violet-glow; }
}

.modal-enter-active, .modal-leave-active { transition: opacity 0.2s, transform 0.2s; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .modal, .modal-leave-to .modal { transform: scale(0.95) translateY(8px); }
</style>
