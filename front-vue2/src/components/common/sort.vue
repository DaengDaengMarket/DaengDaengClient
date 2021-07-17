<template>
  <div class="shop-toolbar padding-bottom-1x mb-2">
    <div class="shop-sorting">
      <label for="sorting"></label>
      <select class="form-control" id="sorting" v-model="sortType" v-on:change="sortBy">
        <option disabled value="">정렬 선택</option>
        <option value="priceLow">낮은 가격순</option>
        <option value="finish">거래완료</option>
        <option value="priceHigh">높은 가격순</option>
        <option value="old">오래된 순</option>
        <option value="turn">되돌리기</option>
      </select>
    </div>
  </div>
</template>

<script>
import { getGoodsList } from "../../api/Goods.js";
export default {
  props:{
    goodsdata:Array,
    goodsdataOriginal:Array,
    goodsdataFinish:Array,
    infiniteBtn:Boolean,
  },
  data() {
    return {
      // goodsOriginal:[...this.$store.state.goods.goods],
      // goods:this.$store.state.goods.goods,
      sortType:'',
      turnCheck:false,
      propGoods:[],
      propInfinite:false
    };
  },
  computed: {

  },
  methods: {
    async sortBy() {
      this.turnCheck=false;
      this.propGoods=this.goodsdata;
      this.propInfinite=this.infiniteBtn;
      switch(this.sortType){
        case 'old':{
          this.propGoods.sort(function(a,b){
            return a.id-b.id;
          })
          break;
        }
        case 'priceHigh':{
          this.propGoods.sort(function(a,b){
            return b.price-a.price;
          })
          break;
        }
        case 'priceLow':{
          this.propGoods.sort(function(a,b){
            return a.price-b.price;
          })
          break;
        }
        case 'finish':{
          // 거래 완료된 api 호출해서 띄우기
          this.propGoods=[];
          this.propGoods=this.goodsdataFinish;
          break;
        }
        case 'turn':{
          const response = await getGoodsList(8);
          this.propGoods = response.data;
          this.propGoods.sort(function(a,b){
            return b.id-a.id;
          })
          this.turnCheck=true;
          break;
        }
      }
      try {
          this.propInfinite=false;
          // 되돌릴 때는 무한스크롤 작동
          if(this.turnCheck==true){
            this.propInfinite=true;
          }
          this.$emit('pass',this.propGoods)
          this.$emit('change',this.propInfinite);
          console.log(this.propGoods);
        } catch (error) {
          alert(error);
      }
    },
  },
};
</script>

<style>
/* .shop-sorting{
	float:right;
} */
</style>