<script setup lang="ts">
import {Activity, useActivitiesStore} from "../store/store";
import {computed, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {ActivityTypes} from "./activityTypes";
import Loader from "./loader.vue";
import ErrorPopup from "./ErrorPopup.vue";
import {useFetch} from "../store/useFetch.ts";

const router = useRouter()
const participants = ref<string>('')
const type = ref<string>('')
const price = ref<string>('')
const store = useActivitiesStore()
const showErrorPopup = ref(false);
const errorMessage = ref('');

const {
  data,
  error,
  isLoading,
  isSuccess, fetchData
} = useFetch()

const {
  data: dataRandom,
  error: errorRandom,
  isSuccess: isSuccessRandom, fetchData: fetchRandomData
} = useFetch()

const getActivity = () => {
  const searchParams = new URLSearchParams()
  searchParams.append('participants', participants.value)
  type.value && searchParams.append('type', type.value)
  price.value && searchParams.append('price', price.value)
  fetchData(`https://www.boredapi.com/api/activity?${searchParams.toString()}`)
}

watch(() => error.value, (newError) => {
  if (newError) {
    errorMessage.value = "No activity found for the specified parameters";
    showErrorPopup.value = true
    setTimeout(() => {
      showErrorPopup.value = false
    }, 3000)
  }
})

watch(() => isSuccess.value, (newSuccess) => {
  if (newSuccess) {
    store.setActivity(data.value as Activity)
    participants.value = ''
    type.value = ''
    price.value = ''
    router.push('/activity')
  }
})


const getRandomActivity =  () => {
  fetchRandomData('https://www.boredapi.com/api/activity')
}

watch(() => errorRandom.value, (newError) => {
  if (newError) {
    errorMessage.value = "No activity found for the specified parameters";
    showErrorPopup.value = true
    setTimeout(() => {
      showErrorPopup.value = false
    }, 3000)
  }
})

watch(() => isSuccessRandom.value, (newSuccess) => {
  if (newSuccess) {
    store.setActivity(dataRandom.value as Activity)
    participants.value = ''
    type.value = ''
    price.value = ''
    router.push('/activity')
  }
})

const getMoreParticipants = computed(() => {
  return Math.random() * (3) + 4;
})

</script>

<template>
  <div class="page_wrapper">
    <Transition name="slide-fade">
      <ErrorPopup :show="showErrorPopup"
                  :message="errorMessage"
                  @close="showErrorPopup = false"/>
    </Transition>
    <div class="container">
      <img class="img" src="../assets/cover.svg" alt="activity img"/>
      <h2>Find an activity</h2>
      <form v-on:submit.prevent="getActivity">
        <div class="input_container">
          <label>Number of participants: </label>
          <select v-model="participants">
            <option value="" selected disabled hidden>Choose</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option :value="getMoreParticipants.toFixed()">4+</option>
          </select>
        </div>
        <div class="input_container">
          <label>Type of activity:</label>
          <select v-model="type">
            <option value="" selected>Choose</option>
            <option v-for="type in ActivityTypes" :value=type>{{ type }}</option>
          </select>
        </div>
        <div class="input_container">
          <label>Free activity? </label>
          <div class="input_container_option">
            <label>
              <input v-model="price" value="0" type="radio" name="choice-radio">
              Yes
            </label>
            <label>
              <input v-model="price" value="" type="radio" name="choice-radio">
              No
            </label>
          </div>
        </div>

        <div v-if="isLoading" class="loader">
          <Loader/>
        </div>
        <div v-else>
          <button type="submit" v-if="participants === '' && type === ''" disabled>Search</button>
          <button type="submit" v-else>Search</button>
        </div>
      </form>
      <h3>OR</h3>
      <div>
        <button @click="getRandomActivity">Get a random activity</button>
      </div>
    </div>
    <div class="navigation">
      <span></span>
    </div>
  </div>
</template>

<style scoped>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: opacity 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input_container {
  display: flex;
  justify-content: space-between;

  .input_container_option {
    display: flex;
    justify-content: space-between;
    gap: 50px;
  }
}

input[type='radio'] {
  accent-color: #535bf2;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
