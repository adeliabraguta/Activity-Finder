<script setup lang="ts">
import {useFetch} from "../../store/useFetch.ts";
import ActivityComponentAdmin from "./ActivityComponentAdmin.vue";
import {ActivitiesResponse, Activity, useActivitiesStore} from "../../store/store.ts";
import {computed, ref, watch} from "vue";
import AddActivityComponent from "./AddActivityComponent.vue";

const store = useActivitiesStore()
const update = ref(false)
const deleteItem = ref(false)

const {
  data,
  fetchData
} = useFetch()
fetchData({
  url: `http://localhost:3000/activities`, method: 'GET'
})

watch(data, (newValue) => {
  if (newValue) {
    store.setActivities(newValue as ActivitiesResponse);
  }
}, {deep: true})

watch(update, newUpdate => {
  if (newUpdate) {
    fetchData({
      url: `http://localhost:3000/activities`, method: 'GET'
    })
    store.setActivities(data);
    console.log('ada')
    update.value = false
  }
})

watch(deleteItem, newDelete => {
  if (newDelete) {
    fetchData({
      url: `http://localhost:3000/activities`, method: 'GET'
    })
    store.setActivities(data);
    console.log('ada')
    deleteItem.value = false
  }
})

const activities = computed(() => {
  return data.value && [...data?.value.data]
})

</script>

<template>
  <div class="page_wrapper">
    <div class="activities_container">
      <AddActivityComponent @update="update = true"/>
      <div class="activities">
        <div v-for="activity of activities ">
          <ActivityComponentAdmin :activity="activity" @delete="deleteItem = true"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.activities_container {
  padding: 96px 24px 64px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 96px;

  .activities {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 96px;
  }
}
</style>
