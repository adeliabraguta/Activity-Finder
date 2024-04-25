<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  show: Boolean,
  message: String
});

const emit = defineEmits(['close']);

const closePopup = () => {
  emit('close');
};
</script>

<template>
  <div v-if="show" class="error-popup">
    <div class="error-content">
      <div @click="closePopup">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x icon"><line
            x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </div>
      <p>{{ message }}</p>
    </div>
  </div>
</template>



<style scoped>
.error-popup {
  position: fixed;
  top: 10%;
  left: 10%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 200px;
  max-width: 400px;
  background-color: var(--background-color);
  color: var(--color);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  filter: drop-shadow(0 0 1.5em #646cff);
}

.error-content {
  .icon {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: .2s all ease;
    stroke: #646cff;
    &:hover{
      stroke: #535bf2;
    }
  }
}
</style>
