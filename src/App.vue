<script setup lang="ts">
import Button from "./components/button.vue";
import {ref} from "vue";
import ActivitiesHistory from "./components/ActivitiesHistory.vue";
import {useFavStore, useHistoryStore} from "./store/store.ts";
import FavoriteActivities from "./components/FavoriteActivities.vue";

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
      <span v-on:click="favStore.showActivity" class="navigation_text"><svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart fav">
            <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg></span>
      <span v-on:click="historyStore.showHistory" class="navigation_text"><svg xmlns="http://www.w3.org/2000/svg"
                                                                               viewBox="0 0 24 24" fill="none"
                                                                               stroke="currentColor" stroke-width="2"
                                                                               stroke-linecap="round"
                                                                               stroke-linejoin="round"
                                                                               class="feather feather-clock history"><circle
          cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></span>
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

  .fav {
    cursor: pointer;
    height: 32px;
    width: 32px;
    transition: 0.3s all ease;
    stroke: #646cff;

    &:hover {
      stroke: #535bf2;
    }
  }

  .history {
    cursor: pointer;
    height: 32px;
    width: 32px;
    transition: 0.3s all ease;
    stroke: #646cff;

    &:hover {
      stroke: #535bf2;
    }
  }
}
</style>
