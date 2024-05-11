import {ref, Ref} from 'vue'
import {Activity} from "./store.ts";

export function useFetch() {
    const data: Ref<Activity | null> = ref(null)
    const error: Ref<any | null> = ref(null)
    const isLoading = ref(false)
    const isSuccess = ref(false)

    const fetchData = async (url: string) => {
        isLoading.value = true
        isSuccess.value = false
        try {
            const response = await fetch(url, {
                headers:{
                    "Authorization": "Bearer " +
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNzE1MjY2ODI2fQ.yE9uYUnShjYCpapwnL3lSnSquWM5OfqitDyN3ckUEeI"
                }
            })
            data.value = await response.json() as Activity | null
            error.value = null
            isSuccess.value = true
        } catch (e) {
            error.value = e;
            isSuccess.value = false
        } finally {
            isLoading.value = false
        }
    };

    return {data, error, isLoading, isSuccess, fetchData}
}
