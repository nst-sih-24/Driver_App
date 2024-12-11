<template>
  <q-layout view="lHh Lpr lFf">
    <!-- NavBar Area -->
     <q-header>
      <a href="src/oldfiles/NavBar.vue"></a>
     </q-header>
    <!-- Main Content Area -->
    <q-page-container>

      <div class="profile-page">

        <!-- Content Area -->
        <div class="content">
          <h2>{{ activeSection.title }}</h2>

          <!-- Links to Sections -->
          <div class="links">
            <ul>
              <li><a href="#" @click="setActiveSection('home')"><i class="fas fa-home"></i> Home <i class="fas fa-chevron-right"></i></a></li>
              <li><a href="#" @click="setActiveSection('profile')"><i class="fas fa-user"></i> Profile <i class="fas fa-chevron-right"></i></a></li>
              <li><a href="#" @click="setActiveSection('timetable')"><i class="fas fa-calendar-alt"></i> Timetable <i class="fas fa-chevron-right"></i></a></li>
              <li><a href="#" @click="setActiveSection('helpCenter')"><i class="fas fa-question-circle"></i> Help Center <i class="fas fa-chevron-right"></i></a></li>
              <li><a href="#" @click="setActiveSection('feedback')"><i class="fas fa-comment-dots"></i> Feedback <i class="fas fa-chevron-right"></i></a></li>
              <li><a href="#" @click="setActiveSection('settings')"><i class="fas fa-cogs"></i> Settings <i class="fas fa-chevron-right"></i></a></li>
            </ul>
          </div>

          <!-- Log Out Button -->
          <button class="logout-btn" @click="logout"><i class="fas fa-sign-out-alt"></i> Log Out</button>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'ProfilePage',
  data() {
    return {
      activeSection: {
        title: 'Welcome',
        description: 'Please select a section from the sidebar.',
      },
    };
  },
  methods: {
    logout() {
      alert("You have been logged out.");
    },
    setActiveSection(section) {
      this.activeSection = this.sections[section];
    }
  },
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

.profile-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ecf0f1;

}

.profile-photo {
  width: 100%;
  height: 0px;
  background-color: #3498db;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 20%;
  border-bottom-right-radius: 20%;
  border-bottom: 2px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.profile-photo img {
  width: 120px;
  height: 10px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
}

.content {
  flex: 1;
  padding: 40px;
  background-color: #ffffff;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
  border-top: 2px solid #ddd;
  font-size: 16px;
  line-height: 1.6;
}

.content h2 {
  text-align: center;
  color: #333;
  font-size: 28px;
  margin-bottom: 20px;
}

.content p {
  text-align: center;
  color: #666;
  font-size: 18px;
  margin-bottom: 40px;
}

.links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.links ul li {
  margin: 12px 0;
  border-radius: 5px;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.links ul li a {
  color: #333;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.links ul li a i {
  margin-right: 15px;
  font-size: 22px;
}

.links ul li a .fa-chevron-right {
  margin-left: auto;
  font-size: 18px;
  color: #aaa;
  transition: color 0.3s ease;
}

.links ul li:hover {
  transform: translateX(5px);
  background-color: #16a085;
}

.links ul li a:hover {
  background-color: #16a085;
  color: white;
}

.links ul li a:hover .fa-chevron-right {
  color: white;
}

.logout-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 14px 20px;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  margin-top: 30px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #c0392b;
}

.logout-btn i {
  margin-right: 10px;
}

@media (min-width: 768px) {
  .profile-page {
    flex-direction: row;
  }

  .profile-photo {
    height: 30vh;
  }
}

@media (max-width: 767px) {
  .profile-page {
    flex-direction: column;
  }
}
</style>
