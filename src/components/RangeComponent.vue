<script setup lang="ts">
defineProps({
  filled: {
    type: Array as () => Array<string | number>,
    required: true
  },
  unfilled: {
    type: Array as () => Array<string | number>,
    required: true
  }
})
</script>
<template>
  <div class="oval">
    <div class="ranges">
      <div v-for="index in filled" :key="index" class="range_filled">{{ index }}
      </div>
    </div>
    <div v-for="index in unfilled" :key="index"
         class="range">{{ index }}
    </div>
  </div>
</template>


<style scoped>
.oval {
  font-size: 12px;
  padding: 4px;
  display: flex;
  place-items: center;
  border-radius: 16px;
  background-color: #f2f2f2;
  border: 1px solid #646cff;
  width: min-content;


  .ranges {
    display: flex;
    place-items: center;
    overflow: hidden;
    border-radius: 12px;
    background: rgb(100,108,255);
    background: linear-gradient(90deg, rgba(100,108,255,0.5) 0%, rgba(100,108,255,0.7) 30%, rgba(100,108,255,1) 100%);}

  .range {
    width: 10px;
    color: #f2f2f2;
    background-color: #f2f2f2;
  }

  .range_filled {
    width: 10px;
    color: transparent;
  }
}
</style>