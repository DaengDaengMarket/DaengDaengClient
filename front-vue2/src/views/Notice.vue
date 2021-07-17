<template>
  <v-expansion-panels focusable>
    <v-expansion-panel v-for="notice in notices" :key="notice._id">
      <v-expansion-panel-header
        >{{ notice.title }} {{ notice.created_at }}</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        {{ notice.content }}
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
// import { getnoticeList } from '../../api/Notice';
import axios from 'axios';

export default {
  data() {
    return {
      notices: [],
    };
  },
  methods: {
    async fetchData() {
      const { data } = await axios.get('http://localhost:3002/notice');
      // console.log(data);
      this.notices = data;
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.offcanvas-wrapper {
  z-index: 1;
}
.post-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.post-contents {
  height: 160px;
  overflow-y: auto;
  font-size: 18px;
}
.post-time {
  position: absolute;
  bottom: 4px;
  right: 5px;
  font-size: 14px;
  color: #9e9e9e;
}
</style>
