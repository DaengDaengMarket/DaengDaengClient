<template>
  <div id="nodiceadd">
    <div class="container-fluid">
      <form class="form" @submit.prevent="submitForm">
        <div class="mb-6">
          <label for="exampleFormControlInput1" class="form-label">제목</label>
          <input
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="제목"
            v-model="title"
          />
        </div>

        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label"
            >내용</label
          >
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="10"
            v-model="content"
          ></textarea>
        </div>

        <div class="d-grid gap-2 d-md-flex justify-content-md-end" role="group">
          <button type="submit" class="btn btn-outline-primary">
            공지등록
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
// import { getnoticeList } from '../../api/Notice';
import axios from 'axios';
import { createPost } from '@/api/index';

export default {
  data() {
    return {
      title: '',
      content: '',
    };
  },
  methods: {
    async fetchData() {
      const { data } = await axios.get('http://localhost:3002/notice');
      // console.log(data);
      this.notices = data;
    },
    async submitForm() {
      try {
        const response = await createPost({
          title: this.title,
          content: this.content,
        });
        this.$router.push('/adminnotice');
        console.log(response);
      } catch (error) {
        console.log(error.response.data.message);
        this.logMessage = error.response.data.message;
      }
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
