<script setup lang="ts">
import {Activity, useFavStore} from "../store/store.ts";
import {computed, PropType} from "vue";
import RangeComponent from "./RangeComponent.vue";
import ToggleFavIcon from "./icons/ToggleFavIcon.vue";

const props = defineProps({
  activity: {
    type: Object as PropType<Activity>,
    required: true
  }
})
const favStore = useFavStore()
const range: number = 10
const filledAccessibilityRange = computed(() => {
  const filledRange = props.activity.accessibility ?? 1
  return Array.from({length: filledRange}, (_, index) => index);
})

const unfilledAccessibilityRange = computed(() => {
  const unfilledRange = range - filledAccessibilityRange.value.length;
  return Array.from({length: unfilledRange}, (_, index) => index);
})
const toggleFavorite = () => {
  if (props.activity) {
    favStore.toggleFav(props.activity)
  }
}
</script>

<template>
  <div>
      <div class="activity_container">
        <div class="activity_details">
          <div>
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
            <RangeComponent :filled="filledAccessibilityRange"
                   :unfilled="unfilledAccessibilityRange"/>
          </div>
          <div v-if="activity?.link" class="activity_detail"><span>Link: </span>
            <a :href=activity?.link>{{ activity?.link }}</a>
          </div>
          <div class="activity_detail" v-if="activity?.price != 0">
            <span>Cost: </span>
            <p>{{ activity?.price}} activity</p>
          </div>
        </div>
        <div @click="toggleFavorite">
          <ToggleFavIcon :activity="activity"/>
        </div>
      </div>
    </div>
</template>

<style scoped>
.activity_container{
  padding: 32px;
  border: 1px solid var(--color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  width: 400px;
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
