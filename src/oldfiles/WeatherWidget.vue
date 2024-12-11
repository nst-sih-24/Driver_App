<template>
  <q-card class="weather-widget">
    <div class="bg-image-overlay">
      <q-img :src="bgImageUrl" alt="weather background" class="bg-image" />
    </div>
    <div class="weather-content">
      <div class="weather-info">
        <h1 class="weather-title">Weather Conditions</h1>
        <div class="flex items-center justify-right space-x-3" style="padding-left: 4rem;">
          <q-icon :name="currentIcon" class="icon-sun" />
          <div class="text-center">
            <span class="temperature">{{ temperature }}°C</span>
            <p class="city-name">{{ cityName }}</p>
          </div>
        </div>

      </div>
      <div class="weather-details">
        <div v-for="(detail, index) in weatherDetails" :key="index" class="weather-detail">
          <div class="flex items-center space-x-2">
            <q-icon :name="detail.icon" class="icon" />
            <span>{{ detail.label }}: {{ detail.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
// import { Cloud, Sun, Wind, Droplets, CloudRain, CloudSnow } from 'lucide-vue-next'

const temperature = ref(0)
const cityName = ref('')
const windSpeed = ref(0)
const humidity = ref(0)
const weatherDescription = ref('')
const bgImageUrl = ref('')
const currentIcon = ref('sun')

const weatherDetails = ref([
  { label: 'Wind', value: `${windSpeed.value} km/h`, icon: 'wind' },
  { label: 'Humidity', value: `${humidity.value}%`, icon: 'droplets' },
  { label: 'Description', value: weatherDescription.value, icon: 'cloud' }
])

const fetchWeatherData = async (lat, lon) => {
  try {
    const apiKey = 'c2a177b38371233ec459d1158924de81'
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat,
        lon,
        appid: apiKey,
        units: 'metric',
        lang: 'en'
      }
    })
    const data = response.data
    temperature.value = Math.round(data.main.temp)
    cityName.value = data.name
    windSpeed.value = data.wind.speed
    humidity.value = data.main.humidity
    weatherDescription.value = data.weather[0].description

    updateBackground(data.weather[0].main)
    updateIcon(data.weather[0].main)

    weatherDetails.value = [
      { label: 'Wind', value: `${windSpeed.value} km/h`, icon: 'wind' },
      { label: 'Humidity', value: `${humidity.value}%`, icon: 'droplets' },
      { label: 'Description', value: weatherDescription.value, icon: 'cloud' }
    ]
  } catch (error) {
    console.error('Error fetching weather data:', error)
  }
}

const updateBackground = (weatherCondition) => {
  if (weatherCondition.includes('Clear')) {
    bgImageUrl.value = 'https://media.istockphoto.com/id/612023744/photo/blue-and-orange-sunset-sky.jpg?s=612x612&w=0&k=20&c=bqPHaI4d3ghIbLIwtbTDPxV8QQ2pIN2mbCfzLb7gucQ='
  } else if (weatherCondition.includes('Cloud')) {
    bgImageUrl.value = 'https://i.pinimg.com/originals/32/19/b5/3219b5bacd3c712241660b5465785e8c.jpg'
  } else if (weatherCondition.includes('Rain')) {
    bgImageUrl.value = 'https://static.vecteezy.com/system/resources/previews/042/146/565/non_2x/ai-generated-beautiful-rain-day-view-photo.jpg'
  } else if (weatherCondition.includes('Snow')) {
    bgImageUrl.value = 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c25vd3xlbnwwfHwwfHx8MA%3D%3D'
  } else {
    bgImageUrl.value = 'https://your-image-url.com/default.jpg'
  }
}

const updateIcon = (weatherCondition) => {
  if (weatherCondition.includes('Clear')) {
    currentIcon.value = 'sun'
  } else if (weatherCondition.includes('Cloud')) {
    currentIcon.value = 'cloud'
  } else if (weatherCondition.includes('Rain')) {
    currentIcon.value = 'cloud-rain'
  } else if (weatherCondition.includes('Snow')) {
    currentIcon.value = 'cloud-snow'
  } else {
    currentIcon.value = 'sun'
  }
}

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      fetchWeatherData(latitude, longitude)
    }, (error) => {
      console.error('Error getting location:', error)
    })
  } else {
    console.error('Geolocation is not supported by this browser.')
  }
}

onMounted(() => {
  getLocation()
})
</script>

<style scoped>
.weather-widget {
  position: relative;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 55%;
  height: 270px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: 1rem;
}

.bg-image-overlay {
  position: absolute;
  inset: 0;
  opacity: 0.8;
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.weather-content {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.weather-info {
  height: 100px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.weather-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  margin-top: 0;
}

.icon-sun {
  width: 3rem;
  height: 3rem;
  color: #fbbf24;
}

.temperature {
  font-size: 2.25rem;
  font-weight: 700;
}

.city-name {
  font-size: 1.125rem;
  color: #93c5fd;
}

.weather-details {
  margin: 0;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 12px;
  margin-top: 3rem;
}

.weather-detail {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.icon {
  width: 1rem;
  height: 1rem;
  color: white;
}

.weather-detail span {
  color: white;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .weather-widget {
    width: 93%;
    margin-left: 1rem;
    padding: 1rem;
  }

  .weather-content {
    flex-direction: column;
    align-items: center;
  }

  .weather-info {
    flex-direction: row;
    justify-content: flex-start;
  }

  .weather-details {
    max-width: 100%;
    flex-direction: column;
    gap: 8px;
  }

  .weather-title {
    font-size: 1.5rem;
    padding-right: 2rem;
    margin: 0;
  }

  .temperature {
    font-size: 2rem;
  }

  .city-name {
    font-size: 1rem;
  }

  .icon-sun {
    width: 2rem;
    height: 2rem;
  }

  .icon {
    width: 0.875rem;
    height: 0.875rem;
  }

  .weather-detail {
    font-size: 0.875rem;
  }
}
</style>
