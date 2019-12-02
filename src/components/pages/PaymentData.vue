<template>
<div>
        <div class="my-5 row justify-content-center">
          <form class="col-md-6" @submit.prevent="createOrder">
            <div class="form-group">
              <label for="useremail">Email</label>
              <input type="email" class="form-control" name="email" id="useremail" v-validate="'required|email'" required
                v-model="form.user.email" placeholder="請輸入 Email" required>
              <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
            </div>
        
            <div class="form-group">
              <label for="username">收件人姓名</label>
              <input type="text" class="form-control" name="name" id="username" v-validate="'required'" :class="{'is-invalid':errors.has('name')}"
                v-model="form.user.name" placeholder="輸入姓名">
              <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
            </div>
        
            <div class="form-group">
                <label for="usertel">收件人電話</label>
                <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
            </div>
          
            <div class="form-group">
              <label for="useraddress">收件人地址</label>
              <input type="text" class="form-control" name="address" v-model="form.user.address" :class="{'is-invalid': errors.has('address')}"
                placeholder="請輸入地址" id="useraddress" v-validate="'required'">
              <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
            </div>
          
            <div class="form-group">
              <label for="comment">留言</label>
              <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
            </div>
            <div class="text-right">
              <button class="btn btn-danger">送出訂單</button>
            </div>
          </form>
        </div>  

</div>
</template>
<script>
import $ from 'jquery';
export default {
  data() {
    return {
      products: [],
      product:{},
      status:{
        loadingItem:'',
      },
      form:{
        user:{
          name:'',
          email:'',
          tel:'',
          address:'',
        },
        message:{} 
      },
      cart:{},
      isLoading: false,
      coupon_code: '',
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.products = response.data.products;
        console.log(response);
        vm.isLoading = false;
      });
    },
    getProduct(id){
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/product/${id}`;
      vm.status.loadingItem = id;
      this.$http.get(url).then((response) => {
        vm.product = response.data.product;
        $('#productModal').modal('show');
        console.log(response);
        vm.status.loadingItem = '';

      });
    },
    addtoCart(id,qty = 1){
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id : id,
        qty
      };
      this.$http.post(url,{data : cart}).then((response) => {

        console.log(response);
        vm.status.loadingItem = '';
        vm.getCart();
        $('#productModal').modal('hide');

      });      
    },
    getCart() {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.cart =response.data.data;
        console.log(response);
        vm.isLoading = false;
      });
    },
    removeCartItem(id){
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart/${id}`;
      vm.isLoading = true;
      this.$http.delete(url).then((response) => {
        vm.getCart();
        console.log(response);
        vm.isLoading = false;
      });      
    },
    addCouponCode() {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/coupon`;
      const coupon = {
        code: vm.coupon_code,
      };
      vm.isLoading = true;
      this.$http.post(url, { data: coupon }).then((response) => {
        console.log(response);
        vm.getCart();
        vm.isLoading = false;
      });
    },
    createOrder() {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/order`;
      const order = vm.form;
      // vm.isLoading = true;
      this.$validator.validate().then((result) => {
        if (result) {
          this.$http.post(url, { data: order }).then((response) => {
            console.log('訂單已建立', response);
            if(response.data.success){
              vm.$router.push(`/customer_checkout:/${response.data.orderId}`)
            }
            // vm.getCart();
            vm.isLoading = false;
          });
        } else {
          console.log('欄位不完整');
        }
      });
    },       
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>