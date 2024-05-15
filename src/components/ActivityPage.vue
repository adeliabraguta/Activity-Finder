<script setup lang="ts">
import {computed} from "vue";
import {useActivitiesStore} from "../store/store.ts";
import ActivityComponent from "./ActivityComponent.vue";

const store = useActivitiesStore()

const activity = computed(() => {
  return store.activity
})

</script>

<template>
  <div class="page_wrapper">
    <div class="container">
      <div v-if="!activity">
        Failed to get data
      </div>
      <div v-else class="activity_container">
        <ActivityComponent :activity="activity"/>
      </div>
    </div>
    <div class="navigation_activity_page">
      <RouterLink to="/">< Back to Main Page</RouterLink>
    </div>
  </div>
</template>

<style scoped>

</style>
