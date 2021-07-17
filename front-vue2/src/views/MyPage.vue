<template>
  <div id="mypage">
    <!-- Off-Canvas Wrapper-->
    <div class="offcanvas-wrapper">
      <!-- User Info-->
      <div class="container padding-bottom-2x mb-2">
        <hr class="margin-top-2x" />
        <aside class="user-info-wrapper">
          <div
            class="user-cover"
            style="background-image: url(img/account/user-cover-img.jpg);"
          ></div>
          <div class="user-info">
            <div class="user-avatar">
              <a class="edit-avatar" href="#"></a
              ><img :src="userInfo.imagePath" :alt="userInfo.imagePath" />
            </div>
            <div class="user-data">
              <h4>{{ userInfo.nickname }}</h4>
              <span>동네 : {{ userInfo.si }}시 {{ userInfo.gu }}구</span>
              <span>관심사 : {{ userInfo.concern }}</span>
              <span class="afterButton">
                <!-- 모달용 버튼 -->
                <div class="modal-test">
                  <button
                    class="btn btn-outline-primary"
                    type="button"
                    @click="toggleModal"
                  >
                    상품 후기 등록
                  </button>
                </div>
                <b-modal
                  id="modal-1"
                  title="상품 후기"
                  v-model="modalShown"
                  @show="resetModal"
                  @hidden="resetModal"
                  @ok="handleOk"
                >
                  <form ref="form" @submit.stop.prevent="handleSubmit">
                    <textarea
                      class="form-control"
                      id="textarea-input"
                      rows="5"
                      placeholder="상세 내용을 작성해주세요."
                    ></textarea>
                  </form> </b-modal
              ></span>
            </div>
          </div>
        </aside>
      </div>
      <div class="container padding-bottom-1x mb-1">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="itemlist-tab"
              data-bs-toggle="tab"
              data-bs-target="#itemlist"
              type="button"
              role="tab"
              aria-controls="itemlist"
              aria-selected="true"
            >
              거래목록
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="review-tab"
              data-bs-toggle="tab"
              data-bs-target="#review"
              type="button"
              role="tab"
              aria-controls="review"
              aria-selected="false"
            >
              거래후기
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="location-tab"
              data-bs-toggle="tab"
              data-bs-target="#location"
              type="button"
              role="tab"
              aria-controls="location"
              aria-selected="false"
            >
              동네인증하기
            </button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <!--  탭 1 : 거래목록  -->
          <div
            class="tab-pane fade show active"
            id="itemlist"
            role="tabpanel"
            aria-labelledby="itemlist-tab"
          >
            <goods></goods>
          </div>

          <!-- 탭 2 : 상품후기 -->
          <div
            class="tab-pane fade review-container"
            id="review"
            role="tabpanel"
            aria-labelledby="review-tab"
          >
            <div class="container padding-bottom-3x mb-1">
              <!-- Messages-->
              <div
                class="comment"
                v-for="(item, index) in reviewInfo"
                :key="index"
              >
                <div class="rating-stars padding-bottom-1 mb-1">
                  <i class="icon-star filled"></i>
                  <i class="icon-star filled"></i>
                  <i class="icon-star filled"></i>
                  <i class="icon-star filled"></i>
                  <i class="icon-star"></i>
                </div>
                <div class="comment-body">
                  상품명 :
                  <span class="comment-text">{{
                    item.itemMyPageResponseDto.name
                  }}</span>
                  <p class="comment-text">
                    {{ item.content }}
                  </p>
                  <div class="comment-footer">
                    <span class="comment-meta">{{ item.name }}</span>
                    <span class="comment-meta">&nbsp;&nbsp;</span>
                    <span class="comment-meta">{{ item.createdAt }}</span>
                  </div>
                </div>
              </div>

              <div class="comment">
                <div class="comment-author-ava">
                  <img src="img/reviews/03.jpg" alt="Avatar" />
                </div>

                <!-- Pagination-->
                <nav class="pagination">
                  <div class="column">
                    <ul class="pages">
                      <li class="active">
                        <a href="#">1</a>
                      </li>
                      <li><a href="#">2</a></li>
                      <li><a href="#">3</a></li>
                      <li><a href="#">4</a></li>
                      <li>...</li>
                      <li><a href="#">12</a></li>
                    </ul>
                  </div>
                  <div class="column text-right hidden-xs-down">
                    <a class="btn btn-outline-secondary btn-sm" href="#"
                      >Next&nbsp;<i class="icon-arrow-right"></i
                    ></a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="location"
            role="tabpanel"
            aria-labelledby="location-tab"
          >
            <div class="container padding-bottom-3x mb-1">
              <!-- Register page -->
              <section>
                <!-- <div class="main"> -->
                <div class="location-check">
                  <a class="btn btn-primary" href="#" style="color:white;">
                    <i class="fas fa-map-marker-alt">내 위치 확인하기</i>
                  </a>
                </div>
                <div class="location-title">
                  <i class="fas fa-home">내 동네</i>
                </div>
                <div class="location-box form-border">
                  <div>용산구</div>
                </div>
                <!--Google map-->
                <div
                  id="map-container-google-2"
                  class="location-image z-depth-1-half"
                  style="height: 500px"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15051.066108514817!2d126.96317646311331!3d37.52921339051611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca23c7e313fd3%3A0xa4342ca52af9b117!2z7ISc7Jq47Yq567OE7IucIOyaqeyCsOq1rA!5e0!3m2!1sko!2skr!4v1621955418742!5m2!1sko!2skr"
                    style="border:0"
                    allowfullscreen
                  ></iframe>
                </div>
                <!--Google Maps-->
                <!-- <div class="location-image">
                  <img src="./img/features/02.jpg">
                  </img>
                </div> -->
                <div class="location-result-box ">
                  <div class="">
                    현재 위치가 &nbsp;
                    <p style="color:rgb(13, 169, 239);">
                      '용산구'
                    </p>
                    &nbsp;에 있어요
                  </div>
                </div>

                <button class="location-confirm btn-primary">
                  동네 인증 확정하기
                </button>
                <!-- </div> -->
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Back To Top Button--><a class="scroll-to-top-btn" href="#"
      ><i class="icon-arrow-up"></i
    ></a>
    <!-- Backdrop-->
    <div class="site-backdrop"></div>
  </div>
</template>

<script>
import Goods from '@/components/common/goods.vue';
import { getMypage } from '@/api/Mypage';
export default {
  data: () => ({
    modalShown: false,
    userInfo: {},
    reviewInfo: {},
  }),
  async created() {
    try {
      const response = await getMypage(this.$route.params.id);
      this.userInfo =
        response.data.userMyPageResponseDto.userMyPageInfoResponseDto;
      this.reviewInfo = response.data.reviewMyPageResponseDtoList;
    } catch (error) {
      alert(error);
    }
  },
  methods: {
    toggleModal() {
      this.modalShown = !this.modalShown;
    },
  },
  components: {
    Goods,
  },
};
</script>

<style scoped>
.card {
  padding: 20px;
}
.card-group {
  margin-bottom: 3%;
}
.card-body > *,
.card-footer {
  display: flex;
  justify-content: center;
}
.dropdown > button {
  height: 35px;
  display: flex;
  align-items: center;
}
.card-button > button {
  margin-left: 10px;
}

.comment {
  width: 90%;
}
.offcanvas-wrapper {
  z-index: 1;
}
.afterButton {
  float: right;
}
</style>
