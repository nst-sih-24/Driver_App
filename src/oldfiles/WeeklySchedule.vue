<template>
  <q-card class="weekly-overview">
    <div class="bg-overlay">
      <q-img alt="Background" class="bg-image" />
    </div>

    <div class="content">
      <h2 class="title">
        <q-icon name="calendar" class="icon" />
        Weekly Overview
      </h2>

      <div class="days">
        <div v-for="day in weekDays" :key="day" :class="['day', { active: day === currentDay }]">
          <div class="day-header">
            <span :class="['day-name', { active: day === currentDay }]">{{ day }}</span>
            <span class="shift-time">
              {{ getShiftTime(day) }}
            </span>
          </div>

          <div v-if="day !== 'Sunday'" class="route-info">
            Route 423: Dwarka ↔ Nehru Place
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const currentDay = ref('')
const currentTime = ref('')

const updateTime = () => {
  const currentDate = new Date()
  const dayIndex = currentDate.getDay()

  currentDay.value = weekDays[dayIndex === 0 ? 6 : dayIndex - 1]
  currentTime.value = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const getShiftTime = (day) => {
  if (day === 'Sunday') return 'Off Day'

  const currentDate = new Date()
  const currentHour = currentDate.getHours()

  if (currentHour >= 6 && currentHour < 14) {
    return `6 AM - 2 PM`
  }

  if (currentHour >= 14 && currentHour < 22) {
    return `2 PM - 10 PM`
  }

  return 'Off Duty'
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 60000)
})

onUnmounted(() => {
  clearInterval(updateTime)
})
</script>

<style scoped>
.weekly-overview {
  background-color: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 500px;
  margin: 0 auto 2rem;
}

.bg-overlay {
  position: absolute;
  inset: 0;
  opacity: 0.05;
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  position: relative;
  z-index: 10;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  text-align: center;
}

.icon {
  margin-right: 0.5rem;
  height: 1.5rem;
  width: 1.5rem;
  color: #2563eb;
}

.days {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

.day {
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.day.active {
  border-color: #3b82f6;
  background-color: rgba(219, 234, 254, 0.8);
  backdrop-filter: blur(4px);
}

.day-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.day-name {
  font-weight: 500;
  color: #374151;
}

.day-name.active {
  color: #2563eb;
}

.shift-time {
  font-size: 0.875rem;
  color: #6b7280;
}

.route-info {
  margin-top: 0.5rem;
  color: #4b5563;
  font-size: 0.875rem;
}

.day:hover {
  border-color: #93c5fd;
}

@media (max-width: 768px) {
  .weekly-overview {
    width: 400px;
    margin-bottom: 2rem;
  }

  .title {
    font-size: 1.25rem;
  }

  .days {
    grid-template-columns: repeat(2, 1fr);
  }

  .day {
    padding: 0.5rem;
    font-size: 0.875rem;
  }

  .icon {
    height: 1.25rem;
    width: 1.25rem;
  }

  @media (max-width: 480px) {
    .days {
      grid-template-columns: 1fr;
    }
  }
}
</style>
