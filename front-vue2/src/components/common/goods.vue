<template>
  <v-container class="grey lighten-5">
    <!-- testData를 getTest로 변경하면 json-server 없이 화면에 띄우는 것 가능 -->
    <Sort
      :goodsdata="goodsData"
      :goodsdataOriginal="goodsData"
      :goodsdataFinish="goodsFinish"
      :infiniteBtn="infiniteChange"
      v-on:pass="SortGoods"
      v-on:change="infiniteChangeBtn"
    ></Sort>
    <!-- v-on:pass="deliverGoods" -->
    <!-- v-bind:goodsData="getGoods" -->
    <div v-if="goodsData.length > 0">
      <v-row>
        <v-col
          v-for="(item, index) in goodsData"
          v-bind:key="index"
          sm="3"
          xl="3"
          lg="3"
          xs="3"
          md="3"
          cols="12"
        >
          <div class="card" v-if="item.item_status === '0'">
            <div class="dropdown" v-if="mypageCheck === 'MyPage'">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a class="dropdown-item" href="#">거래완료</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">게시글 수정</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">숨기기</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">삭제</a>
                </li>
              </ul>
            </div>
            <img :src="item.path" class="card-img-top" alt="image" />
            <div class="card-body">
              <h5 class="card-title">
                {{ item.name }}
              </h5>
              <p class="card-text">
                {{ item.price }}
              </p>
              <p class="card-text">
                {{ item.wanted_location }}
              </p>

              <div class="card-button">
                <button
                  @click="goToDetail(item.id)"
                  type="button"
                  class="btn btn-primary btn-sm"
                >
                  상세 정보 보기
                </button>
              </div>
            </div>
            <div class="card-footer">
              <small class="text-muted">{{ item.created_at }}</small>
            </div>
          </div>
          <div class="card" v-bind:style="mycard" v-else>
            <div class="dropdown" v-if="mypageCheck === 'MyPage'">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a class="dropdown-item" href="#">거래완료</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">게시글 수정</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">숨기기</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">삭제</a>
                </li>
              </ul>
            </div>
            <img :src="item.path" class="card-img-top" alt="image" />
            <div class="card-body">
              <h5 class="card-title">
                {{ item.name }}
              </h5>
              <p class="card-text">
                {{ item.price }}
              </p>
              <p class="card-text">
                {{ item.wanted_location }}
              </p>

              <div class="card-button">
                <button
                  @click="goToDetail(item.id)"
                  type="button"
                  class="btn btn-primary btn-sm"
                >
                  상세 정보 보기
                </button>
              </div>
            </div>
            <div class="card-footer">
              <small class="text-muted">{{ item.created_at }}</small>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>

    <infinite-loading
      v-if="infiniteChange"
      @infinite="infiniteHandler"
      spinner="waveDots"
    >
      <div
        slot="no-more"
        style="color: rgb(102, 102, 102); font-size: 14px; padding: 10px 0px"
      >
        목록의 끝입니다 :)
      </div>
    </infinite-loading>
  </v-container>
</template>

<script>
import Sort from './sort.vue';
import InfiniteLoading from 'vue-infinite-loading';
import { getGoodsList, getGoodsCategory } from '../../api/Goods';
import { getMypage } from '../../api/Mypage';
// //watchar 가 화면에 들어오면, 콜백함수를 실행하겠다
export default {
  data: () => ({
    goodsData: [],
    goodsFinish: [],
    page: 1,
    limit: 8,
    start: 0,
    mypageCheck: '',
    searchData: '',
    infiniteChange: true,
    // mid:this.$route.params.mid,
    isSearch: 0,
    mycard: {
      opacity: 0.3,
    },
  }),
  async created() {
    let i = 0;
    this.mypageCheck = this.$route.name;
    if (this.$route.name == 'Home') {
      try {
        const response = await getGoodsList(8);
        // console.log(response)
        this.goodsData = response.data;
        console.log(this.goodsData);
        // 거래 완료 데이터 푸쉬
        for (i = 0; i < response.data.length; i++) {
          if (response.data[i].item_status == '1') {
            this.goodsFinish.push(response.data[i]);
          }
        }
      } catch (error) {
        alert(error);
      }
    }

    // 카테고리 이동 시
    // api를 호출해주는 식으로 변경해준다
    else if (this.$route.name == 'Category') {
      try {
        const response = await getGoodsCategory(
          this.$route.params.big,
          this.$route.params.mid,
        );
        this.goodsData = response.data;
      } catch (error) {
        alert(error);
      }
    }
    // mypage에서는 seller의 id에 해당하는 상품들만 보여주기
    else if (this.$route.name == 'MyPage') {
      try {
        const response = await getMypage(this.$route.params.id);
        // 구매했던 목록 보여주기
        this.goodsData = response.data.buyerItemList;
      } catch (error) {
        alert(error);
      }
    }
    // console.log(response);
    // console.log(response.data[0].big_category)
  },

  components: {
    InfiniteLoading,
    Sort,
  },
  methods: {
    goToDetail(product_id) {
      this.$router.push(`/goods/${product_id}`);
    },
    searchGoods(data) {
      this.searchData = data;
      this.isSearch = 1;
    },
    infiniteHandler($state) {
      // 인위적으로 limit 1000까지만 상품을 불러와준다.
      // 페이지마다 다른 api를 호출해주도록 한다
      let i = 0;
      if (this.$route.name == 'Home') {
        if (this.limit < 1000) {
          getGoodsList(this.limit)
            .then(response => {
              setTimeout(() => {
                if (response.data.length > 0) {
                  this.goodsData = this.goodsData.concat(
                    response.data.slice(this.start, this.limit),
                  );
                  for (i = this.start; i < this.limit; i++) {
                    if (response.data[i].item_status == '1') {
                      this.goodsFinish.push(response.data[i]);
                    }
                  }
                  $state.loaded();
                  this.limit += 8;
                  this.start += 8;
                  // 데이터를 8로 나눴을 때 8보다 작게 되면
                  if (response.length / 8 < 1) {
                    $state.complete(); // 데이터가 없으면 로딩 끝
                  }
                } else {
                  $state.complete();
                }
              }, 1000);
            })
            .catch(error => {
              console.error(error);
            });
        }
      }
      // 페이징 처리는 추후 api 들어온 이후 구현
      // else if(this.$route.name=='Category'){

      // }
    },
    SortGoods(sortedGoods) {
      this.goodsData = sortedGoods;
      console.log('sortOk');
    },
    infiniteChangeBtn(infinite) {
      this.infiniteChange = infinite;
      // 만약 되돌리기가 실행되면 start,limit를 초기화한다
      if (infinite == true) {
        this.limit = 8;
        this.start = 0;
      }
      console.log(infinite);
    },
  },
};
</script>
