<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <!-- App header with login button -->
      <q-header elevated>
        <q-toolbar>
          <q-toolbar-title>
            <span class="q-mr-md">Feedback App</span>
          </q-toolbar-title>
          <q-btn v-if="!userLoggedIn" flat label="Login" @click="loginDialog = true" />
          <q-btn v-if="userLoggedIn" flat label="Logout" @click="logout" />
        </q-toolbar>
      </q-header>

      <!-- Feedback page container -->
      <q-page class="q-pa-md">
        <q-card class="my-card q-mb-md shadow-4" style="max-width: 800px; margin: auto; border-radius: 16px;">
          <q-card-section class="q-pa-none">
            <div class="text-h4 text-center q-mb-md" :class="titleClass">
              We Value Your Feedback
            </div>
            <div class="text-body2 text-center q-mb-md text-muted">
              Share your thoughts with us so we can improve and serve you better.
            </div>
          </q-card-section>

          <q-form @submit="submitFeedback" ref="form" class="q-px-md q-pb-md">
            <!-- Name Input -->
            <q-input
              filled
              v-model="name"
              label="Your Name"
              autofocus
              :rules="[val => val && val.length > 0 || 'Name is required']"
              class="q-mb-md"
              dense
              :class="inputClass"
            />

            <!-- Email Input -->
            <q-input
              filled
              v-model="email"
              label="Your Email"
              :rules="[val => val && /.+@.+\..+/.test(val) || 'Please enter a valid email']"
              class="q-mb-md"
              dense
              :class="inputClass"
            />

            <!-- Feedback Textarea -->
            <q-input
              filled
              v-model="feedback"
              label="Your Feedback"
              type="textarea"
              :rules="[val => val && val.length > 10 || 'Feedback must be at least 10 characters long']"
              class="q-mb-md"
              rows="4"
              :class="inputClass"
            />

            <!-- Rating -->
            <div class="q-mb-md">
              <div class="text-subtitle2">Rate Us</div>
              <q-btn-group spread>
                <q-btn
                  v-for="i in 5"
                  :key="i"
                  :icon="i <= rating ? 'star' : 'star_border'"
                  @click="setRating(i)"
                  class="q-btn--round q-btn--flat"
                  color="yellow-8"
                />
              </q-btn-group>
            </div>

            <!-- Submit Button -->
            <q-btn
              label="Submit Feedback"
              color="primary"
              type="submit"
              :disable="loading || !isValid"
              class="full-width q-mt-md"
              :loading="loading"
              loading-color="white"
              :class="btnClass"
            />

            <!-- Loading Spinner -->
            <q-spinner bubbles v-if="loading" color="primary" size="30px" class="q-mt-md" />
          </q-form>
        </q-card>

        <!-- Success or Error Message -->
        <q-dialog v-model="showSuccess">
          <q-card class="bg-teal-3 text-white shadow-6 rounded-lg">
            <q-card-section class="q-pt-none">
              <div class="text-h6 q-mb-xs">Thank You!</div>
              <div>Your feedback has been submitted successfully.</div>
            </q-card-section>
            <q-card-actions>
              <q-btn label="Close" color="white" @click="showSuccess = false" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="showError">
          <q-card class="bg-red-4 text-white shadow-6 rounded-lg">
            <q-card-section class="q-pt-none">
              <div class="text-h6 q-mb-xs">Oops!</div>
              <div>Something went wrong. Please try again later.</div>
            </q-card-section>
            <q-card-actions>
              <q-btn label="Close" color="white" @click="showError = false" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- Login Dialog -->
        <q-dialog v-model="loginDialog">
          <q-card>
            <q-card-section>
              <div class="text-h6">Login</div>
              <q-input filled v-model="loginEmail" label="Email" />
              <q-input filled v-model="loginPassword" label="Password" type="password" />
            </q-card-section>
            <q-card-actions>
              <q-btn flat label="Cancel" @click="loginDialog = false" />
              <q-btn flat label="Login" color="primary" @click="loginUser" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "FeedbackPage",
  data() {
    return {
      name: "",
      email: "",
      feedback: "",
      loading: false,
      showSuccess: false,
      showError: false,
      rating: 0,
      titleClass: "text-primary",
      inputClass: "custom-input",
      btnClass: "custom-btn",
      userLoggedIn: false,
      loginDialog: false,
      loginEmail: "",
      loginPassword: "",
    };
  },
  computed: {
    isValid() {
      return (
        this.name.length > 0 &&
        this.email.length > 0 &&
        this.feedback.length > 10 &&
        this.rating > 0
      );
    },
  },
  methods: {
    setRating(value) {
      this.rating = value;
    },
    async submitFeedback() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.loading = true;

      try {
        const isSuccess = Math.random() > 0.5;
        await new Promise((resolve, reject) =>
          setTimeout(isSuccess ? resolve : reject, 2000)
        );

        if (isSuccess) {
          this.showSuccess = true;
        } else {
          throw new Error("Failed to submit feedback");
        }
      } finally {
        this.loading = false;
      }
    },
    loginUser() {
      // Simulate user login
      if (this.loginEmail && this.loginPassword) {
        this.userLoggedIn = true;
        this.loginDialog = false;
        this.$q.notify({
          message: 'Login successful!',
          color: 'green',
          position: 'top',
        });
      } else {
        this.$q.notify({
          message: 'Please enter valid credentials.',
          color: 'red',
          position: 'top',
        });
      }
    },
    logout() {
      this.userLoggedIn = false;
      this.$q.notify({
        message: 'Logout successful!',
        color: 'blue',
        position: 'top',
      });
    },
  },
};
</script>


<style scoped>
.my-card {
  background: linear-gradient(to right, #ffffff, #f4f4f4);
  border: 1px solid #dcdcdc;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.my-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.my-card:active {
  transform: translateY(5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.text-subtitle2 {
  color: #757575;
}

.text-h4 {
  font-size: 1.8rem;
  font-weight: bold;
  color: #1e88e5; /* Accent color for title */
}

.text-body2 {
  font-size: 1.1rem;
  color: #616161;
}

.full-width {
  width: 100%;
}

.q-btn {
  border-radius: 50px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  padding: 12px 24px;
  font-size: 1rem;
}

.q-btn:disabled {
  background-color: #bdbdbd;
}

.q-btn--round {
  border-radius: 50%;
  padding: 12px;
  width: 50px;
  height: 50px;
}

.custom-input input {
  font-size: 1rem;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background-color: #fafafa;
}

.custom-input input:focus {
  border-color: #1e88e5;
  box-shadow: 0 0 10px rgba(30, 136, 229, 0.5);
}

.custom-input input:hover {
  border-color: #2196f3;
}

.custom-btn {
  border-radius: 50px;
  background: linear-gradient(90deg, #1e88e5, #42a5f5);
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.custom-btn:hover {
  background: linear-gradient(90deg, #1565c0, #1e88e5);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.custom-btn:disabled {
  background-color: #90caf9;
}

.q-btn-group {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 20px;
}

.q-btn-group .q-btn {
  font-size: 24px;
  color: #ffeb3b;
}

.q-btn-group .q-btn:hover {
  background-color: #fff176;
}

.q-spinner-bubbles {
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.q-dialog .q-card {
  padding: 24px;
  border-radius: 16px;
}

.q-dialog .q-card .text-h6 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
}

.q-dialog .q-card-section {
  font-size: 1rem;
  color: #f1f1f1;
}

.q-dialog .q-card-actions {
  justify-content: flex-end;
}

.q-dialog .q-btn {
  background-color: #ffffff;
  color: #00796b;
  font-weight: bold;
}

.q-dialog .q-btn:hover {
  background-color: #004d40;
  color: white;
}

.q-card-section {
  margin-bottom: 20px;
}

.q-page-container {
  padding: 16px;
}

@media (max-width: 600px) {
  .my-card {
    margin: 15px;
  }

  .text-h4 {
    font-size: 1.5rem;
  }

  .q-btn-group {
    flex-direction: column;
  }

  .custom-btn {
    font-size: 1rem;
    padding: 10px 20px;
  }

  .custom-input input {
    padding: 10px;
    font-size: 0.9rem;
  }

  .text-body2 {
    font-size: 1rem;
  }
}
</style>

