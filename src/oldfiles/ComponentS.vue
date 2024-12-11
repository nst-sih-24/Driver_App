<template>
  <q-layout view="hHh lpR fFf">
    <q-footer class="custom-footer bg-primary text-white shadow-2">
      <q-toolbar>
        <q-btn flat icon="home" class="footer-btn" @click="goHome" />
        <q-btn flat class="footer-btn routes-btn" @click="goRoutes">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#e8eaed">
            <path d="m600-120-240-84-186 72q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l212-72 240 84 186-72q20-8 37 4.5t17 33.5v560q0 13-7.5 23T812-192l-212 72Zm-40-98v-468l-160-56v468l160 56Zm80 0 120-40v-474l-120 46v468Zm-440-10 120-46v-468l-120 40v474Zm440-458v468-468Zm-320-56v468-468Z"/>
          </svg>
        </q-btn>
        <q-btn flat icon="account_circle" class="footer-btn" @click="goProfile" />
        <q-btn flat icon="settings" class="footer-btn" @click="goSettings" />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script>
export default {
  name: 'App',
  methods: {
    goHome() {
      this.$router.push('/home');
    },
    goRoutes() {
      this.$router.push('/routes');
    },
    goProfile() {
      this.$router.push('/profile');
    },
    goSettings() {
      this.$router.push('/settings');
    },
    goHelp() {
      this.$router.push('/help');
    }
  }
}
</script>
<style scoped>
.custom-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0;
  background: linear-gradient( #1e2a4e, #0a1a3d);
}

@keyframes footerAnimation {
  0% {
    transform: translateY(70%);
  }
  100% {
    transform: translateY(0);
  }
}

.custom-footer {
  animation: footerAnimation 0.3s ease-out;
}

.q-toolbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
}

.footer-btn {
  font-size: 24px;
  color: #ffffff;
  transition: transform 0.2s ease, color 0.2s ease;

}

.footer-btn:hover {
  transform: scale(1.2);
}

.footer-btn:active {
  transform: scale(1.1);
}

.routes-btn svg {
  transition: transform 0.3s ease;
}

.title {
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.q-page-container {
  padding-bottom: 80px;
}
</style>
