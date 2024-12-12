<template>
  <q-page class="scrollable-page">
    <div class="q-pa-md">
      <!-- Booking Card -->
      <q-card class="q-ma-md" style="max-width: 600px; margin: auto; border-radius: 10px;">
        <q-card-section>
          <p style="text-align: center; background-color: #1b263b; height: 70px; font-size: 20px; color: white; padding-top: 10px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; border-radius: 10px 10px 0 0;">
            BOOKING TICKET
          </p>
          <div class="q-my-md q-gutter-md row no-wrap justify-center">
            <q-input v-model="fromBusStop" filled label="From" placeholder="From Bus-Stop" :error="fromBusStop === ''" :error-message="'Please enter a valid starting point'" style="width: 100%; max-width: 250px;" />
            <q-btn round flat icon="directions_bus" class="q-mx-sm" />
            <q-input v-model="toBusStop" filled label="To" placeholder="To Bus-Stop" :error="toBusStop === ''" :error-message="'Please enter a valid destination'" style="width: 100%; max-width: 250px;" />
          </div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="journeyDate" filled label="Journey Date" type="date" style="width: 100%;" :error="journeyDate === ''" :error-message="'Please select a journey date'" />

          <!-- Number of Passengers -->
          <q-row class="q-mt-md">
            <q-col>
              <q-input v-model="noofpassengers" filled label="No of Passengers" type="number" min="1" :error="noofpassengers < 1" :error-message="'Number of passengers must be greater than 0'" style="width: 100%;" />
            </q-col>
          </q-row>
        </q-card-section>

        <!-- Total Fare Calculation -->
        <q-separator />
        <q-card-section>
          <div>
            <p><strong>Total Fare:</strong> ₹{{ totalFare }}</p>
          </div>
        </q-card-section>

        <!-- Checkout Button -->
        <q-card-actions align="center">
          <q-btn label="Pay Now" color="primary" @click="payNow" :disabled="!canSubmit" style="width: 150px; font-size: 16px; background-color: #00796b; border-radius: 5px;" />
        </q-card-actions>
      </q-card>

      <!-- Image Slider Card for Interactive Experience -->
      <q-card class="q-ma-md q-mt-lg" style="max-width: 600px; margin: auto; border-radius: 10px; margin-top: 50px;">
        <q-card-section>
          <p style="text-align: center; background-color: #1b263b; height: 70px; font-size: 20px; color: white; padding-top: 10px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; border-radius: 10px 10px 0 0;">
            EXPLORE OUR SERVICES
          </p>

          <!-- Manual Image Slider -->
          <div class="image-slider">
            <img :src="images[currentSlide]" alt="Bus Image" class="slider-image" />
            <div class="slider-controls">
              <q-btn round flat icon="chevron_left" @click="prevSlide" :disabled="currentSlide === 0" />
              <q-btn round flat icon="chevron_right" @click="nextSlide" :disabled="currentSlide === images.length - 1" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>

  <!-- Footer Section -->
  <q-footer elevated class="bg-primary text-white q-pt-md">
    <q-toolbar class="q-px-md q-flex column items-center">
      <div class="q-mb-md text-center">
        <p class="q-mb-xs" style="font-size: 14px;">
          &copy; {{ currentYear }} DTC Bus Service. All rights reserved.
        </p>
        <p style="font-size: 12px;">Operating Hours: Mon-Sun, 6:00 AM - 11:00 PM</p>
      </div>

      <q-space />

      <div class="text-center">
        <p class="q-mb-xs" style="font-size: 14px;">Contact Us:</p>
        <p style="font-size: 12px;">Phone: +91 123 456 7890</p>
        <p style="font-size: 12px;">Email: support@dtc.gov.in</p>
        <p style="font-size: 12px;">Address: DTC Headquarters, Delhi, India</p>
      </div>
    </q-toolbar>
  </q-footer>
</template>

<script>
export default {
  name: "BusTicketBooking",
  data() {
    return {
      fromBusStop: "",
      toBusStop: "",
      journeyDate: "",
      noofpassengers: 1,
      fare: 10,
      images: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/DTC_AC_Bus.jpg/640px-DTC_AC_Bus.jpg",
        "https://media.istockphoto.com/id/1399142236/photo/tata-marcopolo.jpg?s=612x612&w=0&k=20&c=7Wo_VNrCo_nsUcq4hpcZDbOdYo1To5XdXuOl47T0VTE=",
        "https://images.news18.com/ibnlive/uploads/2022/01/dtc-electric-bus-164277078616x9.jpg",
        "https://via.placeholder.com/600x300/FFD700/000000?text=Bus+Service+4",
      ],
      currentSlide: 0, // To track the current slide
      currentYear: new Date().getFullYear(),
    };
  },
  computed: {
    totalFare() {
      return this.noofpassengers * this.fare;
    },
    canSubmit() {
      return (
        this.fromBusStop !== "" &&
        this.toBusStop !== "" &&
        this.journeyDate !== "" &&
        this.noofpassengers > 0
      );
    },
  },
  methods: {
    payNow() {
      if (this.canSubmit) {
        alert(`Total Fare: ₹${this.totalFare}. Proceeding to payment...`);
      } else {
        alert("Please fill out all fields correctly.");
      }
    },
    nextSlide() {
      if (this.currentSlide < this.images.length - 1) {
        this.currentSlide++;
      }
    },
    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
      }
    },
  },
};
</script>

<style scoped>
.q-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.scrollable-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

.q-card {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.q-footer {
  padding-left: 15px;
  padding-right: 15px;
}

.q-toolbar {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.q-btn {
  transition: background-color 0.3s ease;
}

.q-btn:hover {
  background-color: #004d40;
}

.image-slider {
  position: relative;
  max-width: 100%;
  height: 300px;
}

.slider-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slider-controls {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.slider-controls q-btn {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
}

@media (max-width: 600px) {
  .q-btn {
    font-size: 14px;
    width: 100%;
  }

  p {
    font-size: 16px;
  }

  .q-input {
    font-size: 14px;
  }

  .q-card-section {
    padding: 10px;
  }

  .q-row {
    display: flex;
    flex-direction: column;
  }

  .q-card-actions {
    padding: 10px;
  }

  .q-footer {
    font-size: 12px;
    padding: 20px 10px;
  }
}
</style>
