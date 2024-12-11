<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <div class="logo">
          <div class="logo-icon">
            <i class="fa-solid fa-bus"></i>
          </div>
          <span class="logo-title">Driver Portal</span>
        </div>

        <div class="right-side">
          <q-btn round icon="notifications">
            <q-badge floating color="red" rounded />
          </q-btn>

          <div class="profile-dropdown">
            <div class="profile-info">
              <p class="profile-name">XYZABC</p>
              <p class="profile-id">Driver #4872</p>
            </div>
            <div class="profile-image" @click="toggleProfileMenu">
              <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400" alt="Driver profile"
                class="image" />
            </div>
            <div v-if="isProfileMenuOpen" class="profile-menu">
              <p class="profile-name">XYZABC</p>
              <p class="profile-id">Driver #4872</p>
              <div>
                <button @click="logout" class="logout-button">
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isMenuOpen" class="side-menu">
      <ul>
        <li><button @click="goHome">Home</button></li>
        <li><button @click="goProfile">Profile</button></li>
        <li><button @click="toggleNotifications">Notifications</button></li>
      </ul>
    </div>
  </nav>

  <GoogleMap
    api-key="AIzaSyCX7YZQFXhOtlyC-El4uG9baq4qSY68MZg"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="15"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>

  <q-card dark bordered class="bg-blue-8 my-card">
    <q-card-section>
      <div class="text-h5">Route Details</div>
    </q-card-section>

    <q-card-section>
      <div class="bus-route" style="border: 1px solid white;">
        <div class="route">
          <i class="fa-solid fa-bus"></i><span style="background-color: white;">bus ka name</span>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <div class="bus-details-scroller">
        <div class="crew-info">
          <p class="crew-name">Crew: John Doe</p>
          <p class="route-name">Route: Route #42</p>
        </div>
        <div class="route-stops">
          <div v-for="(stop, index) in routeStops" :key="index" class="stop">
            <i class="fa-solid fa-map-marker-alt"></i>
            <span>{{ stop }}</span>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>

</template>

<script setup>
import { ref } from 'vue';
import { GoogleMap, Marker } from 'vue3-google-map';

const center = { lat: 28.522813, lng: 77.216687 };

const hasUnreadNotifications = ref(true);
const isProfileMenuOpen = ref(false);
const isMenuOpen = ref(false);

const routeStops = ref([
  "Stop 1: Central Station",
  "Stop 2: City Park",
  "Stop 3: Main Plaza",
  "Stop 4: Green Street",
  "Stop 5: West End",
]);

const toggleNotifications = () => {
  hasUnreadNotifications.value = !hasUnreadNotifications.value;
  if (hasUnreadNotifications.value) {
    alert('You have new notifications!');
  } else {
    alert('All notifications are read.');
  }
};

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
};

const logout = () => {
  alert('You have logged out!');
};

const goHome = () => {
  alert('Going to Home');
};

const goProfile = () => {
  alert('Going to Profile');
};
</script>

<style scoped>
.navbar {
  background-color: #1e3a8a;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.1) 0px 1px 3px;
  margin-bottom: 0;
}

.container {
  max-width: 7xl;
  margin: 0 auto;
  padding: 0 1rem;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  flex-wrap: wrap;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  background-color: rgba(255, 255, 255, 0.1);
  font-size: x-large;
  border-radius: 40%;
}

.logo-title {
  font-weight: bold;
  font-size: 1.25rem;
}

.right-side {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.profile-dropdown {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  padding-left: 0.5rem;
  position: relative;
}

.profile-info {
  text-align: right;
  gap: 0;
}

.profile-name {
  font-weight: 500;
  margin-bottom: 0;
  margin-top: 10px;
}

.profile-id {
  font-size: 0.875rem;
  color: rgba(59, 130, 246, 0.75);
}

.profile-image {
  width: 2.5rem;
  height: 2.5rem;
  overflow: hidden;
  border-radius: 9999px;
  cursor: pointer;
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  color: black;
  padding: 1rem;
  border-radius: 0.375rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.1) 0px 1px 3px;
  width: 10rem;
}

.profile-menu button {
  width: 100%;
  text-align: left;
  color: #f56565;
}

.side-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: #1e3a8a;
  padding: 2rem 1rem;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.side-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.side-menu li {
  margin: 1rem 0;
}

.side-menu button {
  width: 100%;
  padding: 1rem;
  text-align: left;
  background-color: transparent;
  color: white;
  font-size: 1rem;
  border: none;
  cursor: pointer;
}

.side-menu button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.bus-details-scroller {
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  white-space: nowrap;
  margin-top: 20px;
}

.crew-info {
  padding: 10px;
  background-color: #2d4a7f;
  color: white;
  border-radius: 5px;
}

.route-stops {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #e3e4e8;
  border-radius: 5px;
  margin-top: 10px;
}

.stop {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.stop i {
  margin-right: 8px;
}

@media (max-width: 768px) {
  .bus-details-scroller {
    margin-top: 20px;
    flex-direction: column;
  }
}
</style>
