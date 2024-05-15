<script setup lang="ts">
import {ActivitiesResponse, useActivitiesStore} from "../store/store.ts";
import ActivityComponent from "./ActivityComponent.vue";
import {useFetch} from "../store/useFetch.ts";
import {ref, watch} from "vue";

const store = useActivitiesStore()
const {data, error, fetchData} = useFetch()
const totalPages = ref(0)
const page = ref(1)


fetchData({
  url: `http://localhost:3000/activities?page=${page.value}&limit=4`, method: 'GET'
})

watch(() => page.value, (newPage) => {
  if (newPage) {
    fetchData({
      url: `http://localhost:3000/activities?page=${page.value}&limit=4`, method: 'GET'
    })
  }
})

watch(() => data.value, (newData) => {
  if (newData) {
    totalPages.value = data.value.totalPages as ActivitiesResponse
    data.value && store.setActivities(data.value as ActivitiesResponse)
  }
})
</script>

<template>
  <div class="page_wrapper">
    <div class="activities_container">
      <div v-if="!store.allActivities">
        <p>Failed to get data</p>
      </div>
      <div class="activities">
        <div v-for="activity in data?.data">
          <ActivityComponent :activity="activity"/>
        </div>
      </div>
      <div class="btns">
        <button v-if="page>1" @click="() => page--">Prev</button>
        <button v-else disabled>Prev</button>
        <button v-if="totalPages > page" @click="() => page++">Next</button>
        <button v-else disabled>Next</button>
      </div>
    </div>
    <div class="navigation_activity_page">
      <RouterLink to="/">< Back to Main Page</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.activities_container {
  padding: 96px 24px 64px 24px;

  .activities {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 96px;
  }
}

.btns {
  padding-top: 36px;
  display: flex;
  justify-content: center;
  gap: 24px;

  button {
    width: min-content;
  }
}
</style>
