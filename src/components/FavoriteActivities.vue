<script setup lang="ts">
import {Activity, useActivitiesStore, useFavStore} from "../store/store";
import {computed} from "vue";
import TrashIcon from "./icons/TrashIcon.vue";

const favStore = useFavStore()
const store = useActivitiesStore()

const activities = computed(() => {
  return favStore.favs
})

const handleClick = (activity: Activity) => {
  store.setActivity(activity)
  favStore.hideActivity()
}

</script>

<template>
  <div class="history_container">
    <h2>Favorite Activities</h2>
    <div class="history">
      <div v-if="activities.length === 0">No activities yet</div>
      <div v-for="activity in activities">
        <div>
          <p><span>Participants: </span>{{ activity?.participants }}</p>
          <div class="activity_interaction">
            <RouterLink to="/activity" v-on:click="handleClick(activity)">{{ activity?.activity }}
            </RouterLink>
            <div @click="favStore.toggleFav(activity)">
              <TrashIcon/>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div class="navigation">
      <span class="navigation_text" v-on:click="favStore.hideActivity">< Close</span>
    </div>
  </div>
</template>

<style scoped>
.history_container {
  z-index: 1;
  top: 0;
  right: 0;
  position: absolute;
  height: 100vh;
  width: 30vw;
  background-color: var(--color-history);
  display: grid;
  grid-auto-rows: min-content 3fr min-content;
  @media screen and (max-width: 480px) {
    width: 80vw;
  }

  h2 {
    padding-top: 48px;
  }
}

.history {
  align-self: end;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 24px;
  overflow-y: scroll;
  scrollbar-color: transparent transparent;
}
.activity_interaction{
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
</style>