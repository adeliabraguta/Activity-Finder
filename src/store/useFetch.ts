import {ref, Ref} from 'vue'
import {useAuthStore} from "./store.ts";

interface FetchOptions {
    url: string
    method: string
    body?: object | null
}

interface Message {
    message?: string
}

export function useFetch() {
    const store = useAuthStore()
    const data: Ref<Message | null> = ref(null)
    const error: Ref<unknown| null> = ref(null)

    const fetchData = async ({url, method, body = null}: FetchOptions) => {
        data.value = null
        error.value = null
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${store.token}`
                },
                body: body && JSON.stringify(body)
            })
            data.value = await response.json()
            if (data.value && data.value.message) {
                error.value = data.value.message
            }
        } catch (e) {
            error.value = e;
            console.log(e)
        }
    };

    return {data, error, fetchData}
}
