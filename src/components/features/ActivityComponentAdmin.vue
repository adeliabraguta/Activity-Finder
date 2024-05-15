<script setup lang="ts">
import { PropType, ref} from "vue";
import {Activity, useActivitiesStore, useAdminStore} from "../../store/store.ts";
import TrashIcon from "../icons/TrashIcon.vue";
import {useFetch} from "../../store/useFetch.ts";
import PenIcon from "../icons/PenIcon.vue";
import CheckIcon from "../icons/CheckIcon.vue";
import XIcon from "../icons/XIcon.vue";

const props = defineProps({
  activity: {
    type: Object as PropType<Activity>,
    required: true
  }
})
const store = useAdminStore()
const a =useActivitiesStore()
const isUpdating = ref(false)
const name =ref(props.activity?.activity)
const participants =ref(props.activity.participants)
const type =ref(props.activity?.type)
const accessibility =ref(props.activity?.accessibility)
const link =ref(props.activity?.link)
const cost =ref(props.activity?.price)


const emit = defineEmits(['delete'])
const {
  fetchData
} = useFetch()

const deleteActivity = () => {
  fetchData({
    url: `http://localhost:3000/delete-activity/${props.activity._id}`, method: 'DELETE'
  })
  a.deleteActivity(props.activity._id)
  emit('delete')
}

const modifyActivity = () => {
  const activity = {
    activity: name.value,
    participants: participants.value,
    type: type.value,
    accessibility: accessibility.value,
    link: link.value,
    cost: cost.value}
  fetchData({
    url: `http://localhost:3000/update-activity/${props.activity._id}`, method: 'PUT', body: activity
  })
  isUpdating.value = false
}

</script>

<template>
  <div>
    <div class="activity_container">
      <div class="activity_details">
        <div>
          <div v-if="activity?.participants == 1">
            <img class="img" src="/src/assets/1person.svg" alt="1 participant">
          </div>
          <div v-else-if="activity?.participants == 2">
            <img class="img" src="/src/assets/2persons.svg" alt="2 perticipants">
          </div>
          <div v-else-if="activity?.participants == 3">
            <img class="img" src="/src/assets/3persons.svg" alt="3 participants">
          </div>
          <div v-else>
            <img class="img" src="/src/assets/4persons.svg" alt="3 participants">
          </div>
        </div>
        <input class="input-1" v-if="isUpdating" type="text" v-model="name" />
        <h2 v-else>{{ name }}</h2>
        <div class="activity_detail"><span>Number of participants: </span>
          <input v-if="isUpdating" type="text"  v-model="participants" />
          <p v-else>{{ participants }}</p>
        </div>
        <div class="activity_detail"><span>Type of activity: </span>
          <input v-if="isUpdating" type="text" v-model="type"/>
          <p v-else>{{ type }}</p>
        </div>
        <div class="activity_detail">
          <span>Accessibility: </span>
          <input v-if="isUpdating" type="text" v-model="accessibility"/>
          <p v-else>{{ accessibility }}</p>
        </div>
        <div v-if="activity?.link" class="activity_detail"><span>Link: </span>
          <input v-if="isUpdating" type="text" v-model="link"/>
          <a v-else :href=activity?.link>{{ link }}</a>
        </div>
        <div class="activity_detail" v-if="activity?.price != 0">
          <span>Cost: </span>
          <input v-if="isUpdating" type="text" v-model="cost"/>
          <p v-else>{{ cost }} activity</p>
        </div>
      </div>
      <div class="modify">
        <span @click="deleteActivity">
          <TrashIcon/>
        </span>
        <span v-if="!isUpdating" @click="() => isUpdating = true">
          <PenIcon />
        </span>
        <span v-else @click="modifyActivity">
          <CheckIcon />
        </span>
        <span v-if="isUpdating" @click="() => isUpdating = false">
          <XIcon />
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.activity_container {
  padding: 32px;
  border: 1px solid var(--color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
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

input {
  border-radius: initial;
  padding: 0 8px;
}

.input-1 {
  font-size: 25px;
}
.modify{
  display: flex;
  gap: 24px;
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
