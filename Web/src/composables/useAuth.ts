import { ref, readonly } from "vue";

const isOpen = ref(false);
const initialTab = ref<"login" | "register">("login");
const user = ref<{ name: string; email: string } | null>(
	JSON.parse(localStorage.getItem("hexly_auth") || "null")
);

export function useAuth() {
	function open(tab: "login" | "register" = "login") {
		initialTab.value = tab;
		isOpen.value = true;
	}
	function close() { isOpen.value = false; }

	function logout() {
		localStorage.removeItem("hexly_auth");
		user.value = null;
	}

	function setUser(u: { name: string; email: string }) {
		user.value = u;
		localStorage.setItem("hexly_auth", JSON.stringify(u));
	}

	return { isOpen: readonly(isOpen), initialTab: readonly(initialTab), user: readonly(user), open, close, logout, setUser };
}
