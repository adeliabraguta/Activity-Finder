<script setup lang="ts">
import {ActivitiesResponse, Activity, useActivitiesStore} from "../store/store";
import {ref, watch} from "vue";
import {useRouter} from "vue-router";
import {ActivityTypes} from "./activityTypes";
import ErrorPopup from "./ErrorPopup.vue";
import {useFetch} from "../store/useFetch.ts";

const router = useRouter()
const participants = ref<string>('')
const type = ref<string>('')
const store = useActivitiesStore()
const showErrorPopup = ref(false);
const errorMessage = ref('');

const {data, error, fetchData} = useFetch()

const getActivity = () => {
  const searchParams = new URLSearchParams()
  participants.value && searchParams.append('participants', participants.value)
  type.value && searchParams.append('type', type.value)

  fetchData({
    url: `http://localhost:3000/activity?${searchParams.toString()}`
    , method: 'GET'
  })
}

watch(() => data.value, (newData) => {
  if (error.value) {
    errorMessage.value = error.value as string
    showErrorPopup.value = true
    setTimeout(() => {
      showErrorPopup.value = false
    }, 3000)
    return
  }
  if (newData) {
    data.value && store.setActivity(data.value as Activity)
    participants.value = ''
    type.value = ''
    router.push('/activity')
  }
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
            <option value="4">4</option>
          </select>
        </div>
        <div class="input_container">
          <label>Type of activity:</label>
          <select v-model="type">
            <option value="" selected>Choose</option>
            <option v-for="type in ActivityTypes" :value=type>{{ type }}</option>
          </select>
        </div>
        <div>
          <button type="submit">Get a random activity</button>
        </div>
      </form>
      <h3>OR</h3>
      <div>
        <RouterLink to="/activities">Get all activities</RouterLink>
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
</style>
