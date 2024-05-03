<script setup lang="ts">
import {computed} from "vue";
import Loader from "./loader.vue";
import {useActivitiesStore, useFavStore} from "../store/store.ts";
import Range from "./Range.vue";
import ToggleFavIcon from "./icons/ToggleFavIcon.vue";

const store = useActivitiesStore()
const favStore = useFavStore()

const activity = computed(() => {
  return store.activity
})

const range: number = 10
const filledAccessibilityRange = computed(() => {
  const filledRange = range - (activity.value?.accessibility ?? 0) * range;
  return Array.from({length: filledRange}, (_, index) => index);
})

const unfilledAccessibilityRange = computed(() => {
  const unfilledRange = range - filledAccessibilityRange.value.length;
  return Array.from({length: unfilledRange}, (_, index) => index);
})

const toggleFavorite = () => {
  if (activity.value) {
    favStore.toggleFav(activity.value)
  }
}

</script>

<template>
  <div class="page_wrapper">
    <div class="container">
      <div v-if="store.isLoading" class="activity_details">
        <Loader/>
      </div>
      <div v-else-if="store.isError">
        Failed to get data
      </div>
      <div v-else>
        <div v-if="activity === null">No activity found for your search</div>
        <div v-else class="activity_details">
          <div v-if="activity?.participants == 1">
            <img class="img" src="../assets/1person.svg" alt="1 participant">
          </div>
          <div v-else-if="activity?.participants == 2">
            <img class="img" src="../assets/2persons.svg" alt="2 perticipants">
          </div>
          <div v-else-if="activity?.participants == 3">
            <img class="img" src="../assets/3persons.svg" alt="3 participants">
          </div>
          <div v-else>
            <img class="img" src="../assets/4persons.svg" alt="3 participants">
          </div>
          <h2>{{ activity?.activity }}</h2>
          <div class="activity_detail"><span>Number of participants: </span>
            <p>{{ activity?.participants }}</p>
          </div>
          <div class="activity_detail"><span>Type of activity: </span>
            <p>{{ activity?.type }}</p>
          </div>
          <div class="activity_detail">
            <span>Accessibility: </span>
            <Range :filled="filledAccessibilityRange"
                   :unfilled="unfilledAccessibilityRange"/>
          </div>
          <div v-if="activity?.link" class="activity_detail"><span>Link: </span>
            <a :href=activity?.link>{{ activity?.link }}</a>
          </div>
          <div class="activity_detail" v-if="activity?.price != 0">
            <span>Price: </span>
            <p>~ {{ activity?.price * 10 }} $</p>
          </div>
          <div class="activity_detail" v-else><span>Price: </span>
            <p>Free</p>
          </div>
        </div>
        <div @click="toggleFavorite">
          <ToggleFavIcon/>
        </div>
      </div>
    </div>
    <div class="navigation navigation_activity_page">
      <RouterLink to="/">< Back to Main Page</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 500px;

}

.activity_details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  place-items: center;
  @media screen and (max-width: 480px) {
    width: 80vw;
  }
}

.activity_detail {
  width: 500px;
  display: flex;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
  word-break: break-all;
}

p {
  color: #646cff;
  font-weight: 500;
}

.navigation_activity_page {
  display: flex;
  justify-content: space-between;
}

.fav {
  cursor: pointer;
  padding-top: 48px;
  height: 32px;
  width: 32px;
  stroke: #d0d0d0;
  transition: 0.3s all ease;

  &:hover {
    stroke: #535bf2;
  }
}

.fav_filled {
  stroke: #646cff;
  fill: #646cff;

  &:hover {
    stroke: #535bf2;
    fill: #535bf2;
  }
}


</style>
