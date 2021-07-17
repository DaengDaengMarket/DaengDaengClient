<template>
  <div id="adnotice">
    <!-- Off-Canvas Wrapper-->
    <div class="offcanvas-wrapper">
      <!-- main Content-->
      <div class="card text-center">
        <div class="card-header">
          <ul class="nav nav-tabs nav-justified">
            <li class="nav-item">
              <div class="nav-link active">
                <router-link to="/adminnotice">
                  공지사항
                </router-link>
              </div>
            </li>
            <li class="nav-item">
              <div class="nav-link active">
                <router-link to="/adminreport">
                  신고글처리
                </router-link>
              </div>
            </li>
            <li class="nav-item">
              <div class="nav-link active">
                <router-link to="/adlist">
                  광고관리
                </router-link>
              </div>
            </li>
          </ul>
        </div>

        <div class="card-body">
          <div class="accordion" id="accordionPanelsStayOpenExample">
            <v-expansion-panels focusable>
              <v-expansion-panel v-for="notice in notices" :key="notice._id">
                <v-expansion-panel-header
                  >{{ notice.title }}
                  {{ notice.created_at }}</v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  {{ notice.content }}
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <div
              class="d-grid gap-2 d-md-flex justify-content-md-end"
              role="group"
            >
              <router-link to="/noticeadd">
                <button type="button" class="btn btn-outline-primary">
                  공지 등록
                </button>
              </router-link>
              <button type="button" class="btn btn-outline-primary">
                공지 수정
              </button>
              <button type="button" class="btn btn-outline-primary">
                공지 삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
