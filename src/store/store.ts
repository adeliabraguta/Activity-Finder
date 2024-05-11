import {defineStore} from "pinia";
import {ref, Ref} from "vue";

export interface Activity {
    activity: string
    accessibility: number
    type: string
    participants: number
    price: number
    link: string
    key: number
    error?: any
}

export const useActivitiesStore = defineStore("Activities", () => {
    const activity: Ref<Activity | null> = ref(null)
    const activities: Ref<object[]> = ref(JSON.parse(localStorage.getItem('activities') as string) || [])

    const setActivity = (data: Activity) => {
        activity.value = data
        activities.value.unshift(activity.value)
        updateLocalStorage()
    }
    const updateActivity = (data: Activity) => activity.value = data

    const updateLocalStorage = () => localStorage.setItem('activities', JSON.stringify(activities.value));


    return {activity, activities, setActivity, updateActivity}
})

export const useHistoryStore = defineStore('History', () => {
    const isHistoryVisible: Ref<boolean > = ref(false)
    const showHistory = () => isHistoryVisible.value = true
    const hideHistory = () => isHistoryVisible.value = false
    return {showHistory, hideHistory, isHistoryVisible}
})

export const useFavStore = defineStore('Favorite', ()=>{
    const isFavVisible: Ref<boolean > = ref(false)
    const favs:Ref<Activity[]> = ref([])
    const showActivity = () => isFavVisible.value = true
    const hideActivity = () => isFavVisible.value = false
    const toggleFav = (activity: Activity) => {
        const index = favs.value.findIndex((fav:Activity) => fav.key === activity.key);
        if (index === -1) {
            favs.value.push(activity);
        } else {
            favs.value.splice(index, 1);
        }
        updateLocalStorage();
    }
    const updateLocalStorage = () => localStorage.setItem('favs', JSON.stringify(favs.value));

    return {showActivity, hideActivity, toggleFav, favs, isFavVisible }
})

