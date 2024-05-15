import {ref} from 'vue'

interface FetchOptions {
    url: string
    method?: string
    body?: object | null
}

interface Token {
    accessToken?: string
    message?: string
}

export function useAuth() {
    const data = ref<Token | null>(null)
    const error = ref<unknown | null>(null)

    const fetchData = async ({url, method = "GET", body = null}: FetchOptions) => {
        data.value = null
        error.value = null
        try {
            const response = await fetch(url, {
                method: method,
                headers: {'Content-Type': 'application/json',},
                body: body && JSON.stringify(body)
            })
            data.value = await response.json()
            if (data.value && data.value.message) {
                error.value = data.value.message
            }

        } catch (e) {
            console.log(e)
        }
    };

    return {data, error, fetchData}
}
