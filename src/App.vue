<script setup lang="ts">
import Button from "./components/button.vue";
import {ref} from "vue";
import ActivitiesHistory from "./components/ActivitiesHistory.vue";
import {useFavStore, useHistoryStore} from "./store/store.ts";
import FavoriteActivities from "./components/FavoriteActivities.vue";
import FavIcon from "./components/icons/FavIcon.vue";
import HistoryIcon from "./components/icons/HistoryIcon.vue";

const historyStore = useHistoryStore()
const favStore = useFavStore()

const handler = () => {
  historyStore.hideHistory();
  favStore.hideActivity()
};

const getPreference = () => {
  const hasDarkPreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
  ).matches;
  if (hasDarkPreference) {
    return "dark-theme";
  } else {
    return "light-theme";
  }
}

const userTheme = ref(localStorage.getItem('user-theme') || getPreference());
document.documentElement.className = userTheme.value;

const setTheme = (theme: string) => {
  localStorage.setItem("user-theme", theme);
  userTheme.value = theme
  document.documentElement.className = theme;
}

const toggleTheme = () => {
  const activeTheme = localStorage.getItem("user-theme");
  if (activeTheme === "light-theme") {
    setTheme("dark-theme");
  } else {
    setTheme("light-theme");
  }
}
</script>

<template>
  <router-view v-slot="{Component}">
    <component :is="Component" :key="$route.path" ref="history" @mousedown="handler"/>
    <Transition name="slide-fade">
      <FavoriteActivities v-if="favStore.isFavVisible"/>
    </transition>
    <Transition name="slide-fade">
      <ActivitiesHistory v-if="historyStore.isHistoryVisible"/>
    </transition>
    <div class="button">
      <span v-on:click="favStore.showActivity" class="navigation_text"><FavIcon/></span>
      <span v-on:click="historyStore.showHistory" class="navigation_text"><HistoryIcon/></span>
      <Button @click="toggleTheme" :userTheme="userTheme"/>
    </div>
  </router-view>
</template>

<style scoped>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: opacity 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

.button {
  display: grid;
  grid-template-columns: repeat(3, min-content);
  justify-content: center;
  align-items: flex-end;
  gap: 8px;
  bottom: 48px;
  right: 24px;
  position: absolute;

  &:last-of-type {
    justify-self: end;
  }
}
</style>
