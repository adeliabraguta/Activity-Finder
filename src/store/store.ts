import {defineStore} from "pinia";

interface State {
    activity: Activity | null
    activities: Activity[]
    isLoading: boolean
    isError: boolean
    isSuccess: boolean
}

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

interface HistoryState {
    isHistoryVisible: boolean
}

interface FavState {
    isFavVisible: boolean,
    favs: Activity[]
}

export const useActivitiesStore = defineStore("Activities", {
    state: (): State => {
        return {
            activity: null,
            activities: [],
            isLoading: false,
            isError: false,
            isSuccess: false
        }
    },
    actions: {
        async getActivity({participants, type, price}: { participants: string, type: string, price: string }) {
            this.isLoading = true
            this.activity = null
            const searchParams = new URLSearchParams()
            searchParams.append('participants', participants)
            type && searchParams.append('type', type)
            price && searchParams.append('price', price)
            try {
                const response = await fetch(`http://www.boredapi.com/api/activity?${searchParams.toString()}`)
                const data = await response.json()
                this.isSuccess = !data.error;
                this.activity = data
                this.isSuccess && this.activities.unshift(data)
                this.isLoading = false
                this.isError = false
            } catch (error) {
                this.isError = true
                this.isLoading = false
            }
        },
        setActivity(activity: Activity) {
            this.activity = activity
        },
        async getRandomActivity(){
            try {
                const response = await fetch(`http://www.boredapi.com/api/activity`)
                const data = await response.json()
                this.isSuccess = !data.error;
                this.activity = data
                this.activities.unshift(data)
            } catch (error) {
                this.isError = true
                this.isLoading = false
            }
        }
    }
})

export const useHistoryStore = defineStore('History',{
    state: (): HistoryState => {
        return {
            isHistoryVisible: false
        }
    },
    actions: {
        showHistory() {
            this.isHistoryVisible = true
        },
        hideHistory() {
            this.isHistoryVisible = false
        },
    }
})

export const useFavStore = defineStore('Favorite',{
    state: (): FavState => {
        return {
            isFavVisible: false,
            favs: JSON.parse(localStorage.getItem('favs') || '[]')
        }
    },
    actions: {
        showActivity() {
            this.isFavVisible = true
        },
        hideActivity() {
            this.isFavVisible = false
        },
        toggleFav(activity: Activity) {
            const index = this.favs.findIndex(fav => fav.key === activity.key);
            if (index === -1) {
                this.favs.push(activity);
            } else {
                this.favs.splice(index, 1);
            }
            this.updateLocalStorage();
        },
        updateLocalStorage() {
            localStorage.setItem('favs', JSON.stringify(this.favs));
        }
    }
})

