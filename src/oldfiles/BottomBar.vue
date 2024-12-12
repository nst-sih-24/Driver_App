<template>
  <q-layout view="hHh lpR fFf">

    <!-- Footer -->
    <q-footer class="footer bg-gradient" elevated>
      <q-tabs
        align="center"
        dense
        class="tabs-container"
        active-color="primary"
        indicator-color="white"
      >
        <!-- Home -->
        <q-tab
          icon="home"
          label="Home"
          class="tab-hover"
          @click="goToPage('/home')"
        />

        <!-- Icon -->
        <q-tab
          icon="route"
          label="History"
          class="tab-hover"
          @click="goToPage('/history')"
        />


        <q-tab
          icon="map"
          label="Join"
          class="tab-hover"
          @click="goToPage('/join')"
        />

        <!-- Profile -->
        <q-tab
          icon="account_circle"
          label="Profile"
          class="tab-hover"
          @click="goToPage('/profile')"
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
/* Footer Styling */
.footer {
  height: 70px;
  background: linear-gradient(#284fc3,#0a1a3d);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  box-shadow: 0px -4px 15px rgba(0, 0, 0, 0.1); /* Soft shadow for footer */
}

/* Tabs Container */
.tabs-container {
  width: 100%;
  max-width: 500px; /* Prevent tabs from stretching too far */
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  margin: 0 auto;
}

/* Individual Tab Styling */
.q-tab {
  font-size: 16px; /* Adjusted font size for readability */
  font-weight: bold; /* Bold the tab labels */
  color: white; /* Default tab color */
  padding: 8px 16px; /* Add padding for better hit area */
}

/* Hover Effects for Tabs */
.tab-hover {
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 8px 16px;
  border-radius: 10px; /* Rounded edges for a softer look */
}

.tab-hover:hover {
  transform: scale(1.1); /* Slightly enlarge on hover */
  z-index: 10; /* Bring to the front */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Soft shadow on hover */
  background: linear-gradient(135deg, #0f4b6e, #0099cc); /* Gradient for hover state */
}

/* Tab Indicator */
.q-tabs__indicator {
  background-color: white !important; /* White indicator for active tab */
  height: 4px; /* Slightly thicker indicator */
  border-radius: 2px; /* Rounded corners for the indicator */
}
</style>
