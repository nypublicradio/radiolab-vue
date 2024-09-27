<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue"

const props = defineProps({
  targetDate: {
    type: Date,
    required: true,
  },
})

const now = ref(new Date())

const remainingTime = computed(() => {
  const diff = props.targetDate.getTime() - now.value.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds }
})

// Pads a number with a zero if it's less than 10
function padZero(num) {
  return num.toString().padStart(2, "0")
}
let intervalId = null

onMounted(() => {
  intervalId = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <div class="countdown">
    <div class="time-display flex gap-3 md:gap-5">
      <div class="time-unit">{{ padZero(remainingTime.days) }} <span>days</span></div>
      <div class="time-unit">{{ padZero(remainingTime.hours) }} <span>hours</span></div>
      <div class="time-unit">
        {{ padZero(remainingTime.minutes) }} <span>minutes</span>
      </div>
      <div class="time-unit">
        {{ padZero(remainingTime.seconds) }} <span>seconds</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.countdown {
  text-align: center;
  margin-top: 1.5rem;
}

.time-display {
  font-size: 3rem;
  @include media("<md") {
    font-size: 1.25rem;
  }
  .time-unit {
    text-shadow: #858cb1 0px 0px 30px;
    span {
      text-shadow: #858cb1 0px 0px 20px;
      font-size: 1rem;
      display: block;
      color: #858cb1;
    }
  }
}
</style>