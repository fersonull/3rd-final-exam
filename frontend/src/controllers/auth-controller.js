import { useFetch } from "@/hooks/use-fetch";

export async function logout() {
    const { refetch: logout } = useFetch("/logout");

    const res = await logout();

    console.log(res);
}