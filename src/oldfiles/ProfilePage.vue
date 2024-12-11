<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="profile-form-container q-pa-md">
        <div v-if="!isEditing" class="profile-view">
          <q-card class="profile-card shadow-2 hover-shadow-4 bg-white rounded-lg border-color-light">
            <q-card-section class="text-center">
              <q-avatar size="200px" class="profile-avatar border-primary">
                <q-img :src="profilePhotoUrl || '/default-avatar.png'" alt="Profile Photo" />
              </q-avatar>

              <div class="text-h4 q-mt-md text-weight-bold profile-name">{{ formData.name || 'Profile Name' }}</div>
              <div class="text-subtitle1 text-grey-7 q-mb-md profile-email">{{ formData.email || 'email@example.com' }}</div>

              <q-card flat bordered class="profile-details q-mt-md q-pa-sm bg-light-grey">
                <q-list class="q-pl-none">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="phone" color="primary" />
                    </q-item-section>
                    <q-item-section>{{ formData.phone || 'Not provided' }}</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="cake" color="primary" />
                    </q-item-section>
                    <q-item-section>{{ formData.dob || 'Not provided' }}</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="location_on" color="primary" />
                    </q-item-section>
                    <q-item-section>{{ formData.address || 'No address' }}</q-item-section>
                  </q-item>
                </q-list>
              </q-card>

              <q-btn
                @click="startEditing"
                label="Edit Profile"
                color="primary"
                icon="edit"
                class="q-mt-md hover-shadow-2 rounded bg-gradient-btn"
                unelevated
              />
            </q-card-section>
          </q-card>
        </div>

        <div v-else class="profile-edit">
          <q-form @submit.prevent="validateAndSubmit" class="q-gutter-md">
            <q-card class="profile-edit-card shadow-2 hover-shadow-4 rounded-lg border-color-light">
              <q-card-section>
                <div class="text-h5 q-mb-md text-weight-bold text-primary">Edit Profile</div>

                <div class="avatar-upload-container q-mb-md">
                  <q-avatar size="150px" class="profile-avatar cursor-pointer">
                    <q-img :src="profilePhotoUrl || '/default-avatar.png'" alt="Profile Photo" />
                    <div class="avatar-overlay" @click="triggerFileInput">
                      <q-icon name="camera_alt" size="40px" color="white" />
                    </div>
                  </q-avatar>
                  <input
                    ref="profilePhotoInput"
                    type="file"
                    accept="image/*"
                    @change="handleFileUpload"
                    style="display: none"
                  />
                </div>

                <q-input
                  v-model="formData.name"
                  label="Full Name"
                  outlined
                  :rules="[val => !!val || 'Name is required']"
                  class="q-mt-md bg-input-field border-input"
                  dense
                />

                <q-input
                  v-model="formData.email"
                  type="email"
                  label="Email"
                  outlined
                  :rules="[val => !!val || 'Email is required', isValidEmail]"
                  class="q-mt-md bg-input-field border-input"
                  dense
                />

                <q-input
                  v-model="formData.phone"
                  type="tel"
                  label="Phone Number"
                  outlined
                  :rules="[isValidPhone]"
                  class="q-mt-md bg-input-field border-input"
                  dense
                />

                <q-input
                  v-model="formData.dob"
                  type="date"
                  label="Date of Birth"
                  outlined
                  class="q-mt-md bg-input-field border-input"
                  dense
                />

                <div class="gender-selector q-mt-md q-mb-md text-center">
                  <div class="text-subtitle1 q-mb-sm">Gender</div>
                  <q-btn-toggle
                    v-model="formData.gender"
                    toggle-color="primary"
                    :options="[
                      {label: 'Male', value: 'Male', icon: 'male', color: 'green'},
                      {label: 'Female', value: 'Female', icon: 'female', color: 'pink'}
                    ]"
                    class="border-input"
                  />
                </div>

                <q-input
                  v-model="formData.address"
                  label="Address"
                  type="textarea"
                  outlined
                  class="q-mt-md bg-input-field border-input"
                  dense
                />

                <q-input
                  v-model="formData.bio"
                  label="Bio"
                  type="textarea"
                  outlined
                  class="q-mt-md bg-input-field border-input"
                  dense
                />
              </q-card-section>

              <q-card-actions class="justify-end">
                <q-btn
                  label="Cancel"
                  color="negative"
                  flat
                  @click="cancelEditing"
                  class="q-mr-sm"
                />
                <q-btn
                  type="submit"
                  label="Save Changes"
                  color="positive"
                  unelevated
                  class="text-bold bg-gradient-btn"
                />
              </q-card-actions>
            </q-card>
          </q-form>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      isEditing: false,
      profilePhotoUrl: null,
      formData: {
        name: null,
        phone: null,
        dob: null,
        email: null,
        gender: null,
        address: null,
        bio: null,
      },
    };
  },
  created() {
    this.loadProfileData();
  },
  methods: {
    loadProfileData() {
      const savedData = JSON.parse(localStorage.getItem('profileData') || '{}');
      this.formData = { ...this.formData, ...savedData };
      this.profilePhotoUrl = savedData.profilePhotoUrl || null;
    },
    startEditing() {
      this.isEditing = true;
    },
    cancelEditing() {
      this.isEditing = false;
      this.loadProfileData();
    },
    triggerFileInput() {
      this.$refs.profilePhotoInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.profilePhotoUrl = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
    isValidEmail(val) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(val) || 'Invalid email format';
    },
    isValidPhone(val) {
      if (!val) return true;
      const phonePattern = /^\+?(\d{1,3})?[-. ]?\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4,6})$/;
      return phonePattern.test(val) || 'Invalid phone number';
    },
    validateAndSubmit() {
      if (!this.formData.name) {
        this.$q.notify({
          message: 'Name is required',
          color: 'negative',
          position: 'top'
        });
        return;
      }
      if (!this.formData.email) {
        this.$q.notify({
          message: 'Email is required',
          color: 'negative',
          position: 'top'
        });
        return;
      }

      localStorage.setItem('profileData', JSON.stringify({
        ...this.formData,
        profilePhotoUrl: this.profilePhotoUrl
      }));

      this.$q.notify({
        message: 'Profile updated successfully!',
        color: 'positive',
        position: 'top'
      });

      this.$router.push('/dashboard');
    },
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

.profile-form-container {
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.profile-card, .profile-edit-card {
  border-radius: 16px;
  max-width: 950px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.07);
  transition: transform 0.3s ease;
  padding: 20px;
}

.profile-card:hover, .profile-edit-card:hover {
  transform: translateY(-10px);
}

.profile-avatar {
  border: 4px solid #2196F3;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  transition: transform 0.3s ease;
}

.profile-avatar:hover {
  transform: scale(1.1);
}

.avatar-upload-container {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.avatar-upload-container .profile-avatar:hover .avatar-overlay {
  opacity: 1;
}

.profile-details .q-item {
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.q-btn {
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.q-btn:hover {
  background-color: #1976d2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.q-btn-toggle .q-btn.selected {
  background-color: #2196F3;
  color: white;
}

.q-btn-toggle .q-btn {
  border-radius: 8px;
}

.q-input {
  font-size: 14px;
  padding: 12px;
  border-radius: 8px;
  background-color: #f3f4f6;
  transition: all 0.3s ease;
}

.q-input:focus {
  border-color: #2196F3;
}

.bg-input-field {
  background-color: #f9f9f9;
}

.bg-light-grey {
  background-color: #f5f5f5;
}

.text-weight-bold {
  font-weight: 600;
}

.q-card-actions {
  padding: 16px;
  background-color: #f9f9f9;
}

.bg-gradient-btn {
  background: linear-gradient(135deg, #2196F3, #00bcd4);
  color: white;
}
</style>
