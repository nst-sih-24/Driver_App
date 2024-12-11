<template>
  <UpcomingSchedule />
  <QuickStats />
  <WeatherWidget />
  <TimeTable />
  <WeeklySchedule />
  <NavBar />
  <BottomBar />
</template>

<script>
import NavBar from 'src/oldfiles/NavBar.vue';
import UpcomingSchedule from 'src/oldfiles/UpcomingSchedule.vue';
import QuickStats from 'src/oldfiles/QuickStats.vue';
import TimeTable from 'src/oldfiles/TimeTable.vue';
import WeatherWidget from 'src/oldfiles/WeatherWidget.vue';
import WeeklySchedule from 'src/oldfiles/WeeklySchedule.vue';
import BottomBar from 'src/oldfiles/BottomBar.vue';

export default {
  components: {
    NavBar,
    UpcomingSchedule,
    QuickStats,
    TimeTable,
    WeatherWidget,
    WeeklySchedule,
    BottomBar
  },
};
</script>

<style>
.page{
  background-image: url('src/oldfiles/background1.png');
  background: absolute;
  background-blend-mode:soft-light;
}

</style>
