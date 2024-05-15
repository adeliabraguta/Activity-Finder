<script setup lang="ts">
import {ref, watch} from "vue";
import {useRouter} from "vue-router";
import {Token, useAuthStore} from "../../store/store.ts";
import ErrorPopup from "../ErrorPopup.vue";
import {useAuth} from "./useAuth.ts";

const router = useRouter()
const store = useAuthStore()
const username = ref('')
const password = ref('')
const showErrorPopup = ref(false);
const errorMessage = ref('');
const {fetchData, data, error} = useAuth()

const getToken = () => {
  fetchData({url: `http://localhost:3000/token-visitor`})
}

const getAuth = () => {
  const user = {
    username: username.value,
    password: password.value
  }
  fetchData({url: `http://localhost:3000/token-admin`, method: 'POST', body: user})
}


watch(() => data.value, (newData) => {
  if (error.value) {
    errorMessage.value = error.value as string;
    showErrorPopup.value = true
    setTimeout(() => {
      showErrorPopup.value = false
    }, 3000)
    return
  }
  if (newData) {
    data.value && store.setToken((data.value as Token).accessToken)
    username.value = ''
    password.value = ''
    router.push('/')
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
      <h2>Sign in</h2>
      <input type="text" placeholder="Enter username" name="username" v-model="username"/>
      <input type="text" placeholder="Enter password" name="username" v-model="password"/>
      <div class="btns">
        <button v-if="username === '' || password === ''" @click="getAuth" disabled>Sign in</button>
        <button v-else @click="getAuth">Sign in</button>
        <button @click="getToken">Later</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
input {
  background-color: transparent;
  border-color: #646cff;
  width: initial;
}

.btns {
  display: flex;
  gap: 24px;
}
</style>
