import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {jwtDecode} from "jwt-decode";

export interface Activity {
    activity: string
    accessibility: number
    type: string
    participants: number
    price: number
    link: string
    _id: string
}

export interface ActivitiesResponse {
    totalItems: number;
    totalItemsPerPage: number;
    totalPages: number;
    currentPage: number;
    data: Activity[];
}

export interface Token {
    accessToken: string
}

export const useAuthStore = defineStore('Auth', () => {
    const token = ref<string>(JSON.parse(localStorage.getItem('accessToken') as string) || '')
    const role = computed(() => {
        try {
            const decoded = jwtDecode<{ userRole: string }>(token.value)
            return decoded.userRole
        } catch (error) {
            return ''
        }
    });

    const setToken = (data: string) => {
        token.value = data
        updateLocalStorage()
    }
    const updateLocalStorage = () => localStorage.setItem('accessToken', JSON.stringify(token.value))
    return {token, role, setToken}
})

export const useActivitiesStore = defineStore("Activities", () => {
    const activity = ref<Activity>()
    const allActivities = ref<ActivitiesResponse>()
    const historyActivities = ref<Activity[]>(JSON.parse(localStorage.getItem('activities') as string) || [])

    const setActivity = (data: Activity) => {
        activity.value = data
        historyActivities.value.unshift(activity.value)
        updateLocalStorage()
    }
    const setActivities = (data: ActivitiesResponse) => {
        allActivities.value = data
    }

    const deleteActivity = (activityId: string) => {
        if (allActivities.value) {
            allActivities.value.data = allActivities.value.data.filter(a => a._id !== activityId)
        }
    }

    const updateActivity = (data: Activity) => activity.value = data

    const updateLocalStorage = () => localStorage.setItem('activities', JSON.stringify(historyActivities.value))

    return {
        activity,
        allActivities,
        activities: historyActivities,
        setActivity,
        updateActivity,
        setActivities,
        deleteActivity
    }
})

export const useAdminStore = defineStore("Admin", () => {
    const store = useActivitiesStore()

    const deleteActivity = (activityId: string) => {
        if (store.allActivities) {
            store.allActivities.data = store.allActivities.data.filter(a => a._id !== activityId)
        }
    }

    const modifyActivity = (activity: Activity) => {
        if (store.allActivities) {
            const newActivity = store.allActivities && store.allActivities.data.findIndex((fav: Activity) => fav._id === activity._id);
            store.allActivities.data[newActivity] = activity;
        }
    }

    const postActivity = (activity: Activity) => {
        if (store.allActivities) {
        store.allActivities.data.push(activity);
        }
    }

    return {deleteActivity, modifyActivity, postActivity}
})

export const useHistoryStore = defineStore('History', () => {
    const isHistoryVisible = ref<boolean>(false)
    const showHistory = () => isHistoryVisible.value = true
    const hideHistory = () => isHistoryVisible.value = false
    return {showHistory, hideHistory, isHistoryVisible}
})

export const useFavStore = defineStore('Favorite', () => {
    const isFavVisible = ref<boolean>(false)
    const favs = ref<Activity[]>(JSON.parse(localStorage.getItem('favs') as string) || [])
    const showActivity = () => isFavVisible.value = true
    const hideActivity = () => isFavVisible.value = false
    const toggleFav = (activity: Activity) => {
        const index = favs.value.findIndex((fav: Activity) => fav._id === activity._id);
        if (index === -1) {
            favs.value.push(activity);
        } else {
            favs.value.splice(index, 1);
        }
        updateLocalStorage();
    }
    const updateLocalStorage = () => localStorage.setItem('favs', JSON.stringify(favs.value));

    return {showActivity, hideActivity, toggleFav, favs, isFavVisible}
})

