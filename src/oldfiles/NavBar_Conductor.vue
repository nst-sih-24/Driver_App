<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="navbar">
      <div class="container">
        <div class="navbar-content">
          <div class="logo">
            <div class="logo-icon">
              <!-- Updated Bus Icon with a better style -->
              <q-icon name="directions_bus" size="32px" class="bus-icon" />
            </div>
            <span class="logo-title">Driver Portal</span>
          </div>

          <div class="right-side">
            <!-- Notification button using Quasar component -->
            <q-btn round icon="notifications" @click="toggleNotifications" flat>
              <q-badge floating color="red" label="" v-if="hasUnreadNotifications" />
            </q-btn>

            <div class="profile-dropdown">
              <div class="profile-info">
                <p class="profile-name">XYZABC</p>
                <p class="profile-id">Driver #4872</p>
              </div>

              <!-- Profile avatar using Quasar component -->
              <q-avatar size="40px" class="cursor-pointer" @click="toggleProfileMenu">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400"
                  alt="Driver profile"
                />
              </q-avatar>

              <!-- Profile menu using Quasar components -->
              <q-menu v-model="isProfileMenuOpen" cover auto-close>
                <q-list>
                  <q-item>
                    <q-item-section>
                      <p class="q-mb-xs"><strong>XYZABC</strong></p>
                      <p class="text-h6">Driver #4872</p>
                    </q-item-section>
                  </q-item>
                  <q-item clickable @click="logout">
                    <q-item-section>
                      <q-btn flat label="Log Out" color="negative" />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
          </div>
        </div>
      </div>
    </q-header>

    <!-- Side menu using Quasar component -->
    <q-drawer v-model="isMenuOpen" side="left" overlay bordered>
      <q-list>
        <q-item clickable @click="goHome">
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item clickable @click="goProfile">
          <q-item-section>Profile</q-item-section>
        </q-item>
        <q-item clickable @click="toggleNotifications">
          <q-item-section>Notifications</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';

const hasUnreadNotifications = ref(true);
const isProfileMenuOpen = ref(false);
const isMenuOpen = ref(false);

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
  background: linear-gradient(#0a1a3d, #1e2a4e);
  color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.1) 0px 1px 3px;
  margin-bottom: 0;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
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
  gap: 1rem;

}

.logo-icon {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.5rem;
  border-radius: 50%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 5px;
}

.logo-icon:hover {
  transform: scale(1.2);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 6px 12px;
}

.bus-icon {
  color: #ffffff;
  transition: color 0.3s ease;
}

.bus-icon:hover {
  color: #ffeb3b;
}


.logo-title {
  font-weight: bold;
  font-size: 1.25rem;
  color: white;
  transition: color 0.3s ease;
}

.logo-title:hover {
  color: #ffeb3b; /* Golden yellow */
}

/* Right-side content (notifications, profile) */
.right-side {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.notification-btn {
  position: relative;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.notification-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: scale(1.1);
}

/* Notification dot */
.notification-dot {
  position: absolute;
  top: 0;
  right: 0;
  height: 0.5rem;
  width: 0.5rem;
  background-color: #f56565;
  border-radius: 50%;
  margin: 0;
}


/* Profile dropdown */
.profile-dropdown {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  padding-left: 1rem;
  position: relative;
}

/* Profile info styling */
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

/* Profile avatar */
.profile-avatar {
  border-radius: 50%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-avatar:hover {
  transform: scale(1.1);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 5px;
}

/* Profile menu */
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

/* Side menu */
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

.side-menu q-item {
  padding: 0.8rem;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.side-menu q-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .logo {
    margin: 0;
    padding-top: 8px;
  }

  .container {
    margin: 0;
    padding: 0;
  }

  .navbar-content {
    display: flex;
    flex-direction: column;
  }

  .right-side {
    justify-content: flex-end;
    margin-left: 40px;
  }

  .side-menu {
    display: none;
  }

  .profile-dropdown {
    margin-left: 0px;
  }

  .profile-menu {
    width: auto;
  }
}
</style>
