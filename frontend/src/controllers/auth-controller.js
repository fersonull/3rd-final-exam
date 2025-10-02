import { useFetch } from "@/hooks/useFetch";

export async function logout() {
    const { refetch: logout } = useFetch("/logout");

    const res = await logout();

    console.log(res);
}