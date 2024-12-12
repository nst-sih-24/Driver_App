<template>
  <WeatherWidget />
  <UpcomingSchedule />
  <ActionPage />
  <QuickStats />
  <NavBar />
  <BottomBar />
</template>

<script>
import NavBar from 'src/oldfiles/NavBar.vue';
import UpcomingSchedule from 'src/oldfiles/UpcomingSchedule.vue';
import QuickStats from 'src/oldfiles/QuickStats.vue';
import WeatherWidget from 'src/oldfiles/WeatherWidget.vue';
import BottomBar from 'src/oldfiles/BottomBar.vue';
import ActionPage from 'src/oldfiles/ActionPage.vue';

export default {
  components: {
    NavBar,
    UpcomingSchedule,
    QuickStats,
    WeatherWidget,
    BottomBar,
    ActionPage
  },
};
</script>

<style>
.page{
  background-image: url('');
  background: absolute;
  background-blend-mode:soft-light;
}

</style>
