<template>
  <q-layout view="hHh lpR fFf">

    <!-- Footer -->
    <q-footer class="footer bg-gradient" elevated>
      <q-tabs
        align="justify"
        dense
        class="tabs-container"
      >
        <!-- Home -->
        <q-tab
          icon="home"
          class="tab-hover"
          @click="goToPage('/home')"
        />

        <!-- Icon -->
        <q-tab
          icon="star"
          class="tab-hover"
          @click="goToPage('/icon')"
        />

        <!-- Profile -->
        <q-tab
          icon="account_circle"
          class="tab-hover"
          @click="goToPage('/profile')"
        />

        <!-- Settings -->
        <q-tab
          icon="settings"
          class="tab-hover"
          @click="goToPage('/settings')"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  methods: {
    goToPage(path) {
      this.$router.push(path); // Navigate to the desired page
    },
  },
};
</script>

<style scoped>
/* Layout and Header Styling */
.q-header {
  height: 60px;
  background-color: #1e3c72; /* Customize header background */
}

.q-page-container {
  background-color: #f0f0f0; /* Customize page background */
}

/* Footer Styling */
.footer {
  height: 60px;
  background: linear-gradient(to right, #1e3c72, #2a5298);
  color: white;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Tabs Container */
.tabs-container {
  width: 100%;
  display: flex;
  justify-content: space-around; /* Spaced evenly */
}

/* Individual Tab Styling */
.q-tab {
  font-size: 20px;
}

/* Hover Effects for Tabs */
.tab-hover {
  background: linear-gradient(to right, #0f4b6e, #0099cc);
  position: relative;
  transition: transform 0.3s, z-index 0.3s;
}

.tab-hover:hover {
  transform: scale(1.1); /* Slightly enlarge on hover */
  z-index: 10; /* Bring to front */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Optional: Add a shadow effect */
}
</style>

