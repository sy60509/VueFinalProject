<template>
<div>
  <nav class="navbar navbar-light bg-light">
    <a class="font-italic">
      <i class="fas fa-clock"></i>
      WATCH your time
    </a>
    <!-- 購物車內的數量 (Button 內包含 icon, 數量 badge) -->
    
    <div class="dropdown ml-auto">
      <button class="btn btn-sm btn-cart" data-toggle="dropdown" data-flip="false">
        <i class="fa fa-shopping-cart text-dark fa-2x" aria-hidden="true"></i>
        <span class="badge badge-pill badge-danger" >{{cart.carts.length}}</span>
        <span class="sr-only">unread messages</span>
      </button>
      <loading :active.sync="isLoading"></loading>
      <router-link to="/shoppingCart">
        <div class="dropdown-menu dropdown-menu-right p-3" style="min-width: 300px" data-offset="400">
          <h6>已選擇商品</h6>
          <table class="table">
            <thead>
              <th></th>
              <th>品名</th>
              <th>數量</th>
              <th>單價</th>
            </thead>
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id" v-if="cart.carts">
                <td class="align-middle">
                  <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                    <i class="far fa-trash-alt"></i>
                  </button>
                </td>
                <td class="align-middle">
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">
                    已套用優惠券
                  </div>
                </td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-right">{{ item.final_total }}</td>
              </tr>
            </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">總計 ：</td>
              <td class="text-right">{{ cart.total }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total" >
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">{{ cart.final_total }}</td>
            </tr>
          </tfoot>
        </table>
          <a href="shoppingCart-checkout.html" class="btn btn-primary btn-block">
            <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
          </a>
        </div>      
      </router-link>

    </div>

    
  </nav>

  <div class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end" style="background-image: url(https://images.unsplash.com/photo-1563865436874-9aef32095fad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80)">
    <div class="container">
        <div class="p-3 bg-lighter">
            <h1 class="display-3 font-weight-bold invisible">買到</h1>
            <p class="lead invisible">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>

        </div>
    </div>
  </div>

<!--下方主要畫面-->
 <div class="container main-contant mb-1">
    <div class="row">
      <div class="col-md-3">
        <!-- 左側選單 (List group) -->
        <div class="list-group sticky-top">
          <a class="list-group-item list-group-item-action active list-group-item-secondary" data-toggle="list" href="#list-gold" :style="{'Font-color':'white'}">
            <i class="fa fa-suitcase" aria-hidden="true" :style="{'color':'white'}"></i>全部商品 </a>
          <a class="list-group-item list-group-item-action list-group-item-secondary" data-toggle="list" href="#class-1">
            <i class="fa fa-gift" aria-hidden="true" :style="{'color':'white'}"></i>電信</a>
          <a class="list-group-item list-group-item-action list-group-item-secondary" data-toggle="list" href="#class-2">
            <i class="fa fa-film" aria-hidden="true" :style="{'color':'white'}"></i>食物</a>
          <a class="list-group-item list-group-item-action list-group-item-secondary" data-toggle="list" href="#class-3">
            <i class="fa fa-paw" aria-hidden="true" :style="{'color':'white'}"></i>3C</a>
          <a class="list-group-item list-group-item-action list-group-item-secondary" data-toggle="list" href="#class-4">
            <i class="fa fa-tree" aria-hidden="true" :style="{'color':'white'}"></i>手機</a>
        </div>
      </div>

      <div class="col-md-9">
        <div class="d-flex mb-4">
          <!-- Search bar -->
          <form class="form-inline my-3 my-lg-0">
            <div class="input-group">
              <input class="form-control" type="text" placeholder="Search" aria-label="Search">
              <div class="input-group-append">
                <button class="btn btn-outline-warning" type="submit">
                  <i class="fa fa-search" aria-hidden="true"></i> Search</button>
              </div>
            </div>
          </form>
        </div>
        
        <!-- 主要商品列表 (Card) -->
        <div class="tab-content">
          <div class="tab-pane active" id="list-gold">
            <div class="row">
              <!-- 金牌 -->
              <div class="col-md-4 mb-4">
                <div class="card border-0 box-shadow text-center h-100">
                  <div class="card-footer border-top-0 bg-white">
                    <div class="btn-group btn-group-sm">
                    </div>
                  </div>
                </div>
              </div>
            </div>

    
    <loading :active.sync="isLoading"></loading>
      <!--全部商品的商品卡-->
        <div class="row mt-4">
          <div class="col-md-4 mb-4" v-for="item in products" :key="item.id" >
            <div class="card border-0 shadow-sm">
              <div style="height: 150px; background-size: cover; background-position: center"
                :style="{backgroundImage: `url(${item.imageUrl})`}">
              </div>
              <div class="card-body">
                <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                <h5 class="card-title">
                  <a href="#" class="text-dark">{{ item.title }}</a>
                </h5>
                <p class="card-text">{{ item.content }}</p>
                <div class="d-flex justify-content-between align-items-baseline">
                  <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                  <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                  <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
                </div>
              </div>
              <div class="card-footer d-flex">
                <button type="button" class="btn btn-outline-secondary btn-sm" 
                  @click="getProduct(item.id)">
                  <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                  查看更多
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)">
                  <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id" ></i>
                  加到購物車
                </button>
              </div>
            </div>
          </div>
        </div> 
                 
            
            <!-- 分頁 -->
            <nav aria-label="Page navigation" class="my-5">
              <ul class="pagination justify-content-center">

                <li class="page-item " :class="{'disabled' : !pagination.has_pre}" @click.prevent="getProducts(pagination.current_page-1)">
                  <a class="page-link" href="#" tabindex="-1">Previous</a>
                </li>

                <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{'active':pagination.current_page === page}" @click.prevent="getProducts(page)">
                  <a class="page-link" href="#">{{page}}</a>
                </li>

                <li class="page-item" :class="{'disabled':!pagination.has_next}" @click.prevent="getProducts(pagination.current_page+1)">
                  <a class="page-link" href="#">Next</a>
                </li>

              </ul>
            </nav>
          </div>

        <!--分類為電信的商品卡-->
          <div class="tab-pane" id="class-1">
            <div class="row align-items-stretch">
              <div class="col-md-4 mb-4" v-for="item in products" :key="item.id" v-if="item.category == '電信'">
                <div class="card border-0 box-shadow text-center h-100">
                  <div class="card border-0 shadow-sm">
                    <div style="height: 150px; background-size: cover; background-position: center"
                      :style="{backgroundImage: `url(${item.imageUrl})`}">
                    </div>
                    <div class="card-body">
                      <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                      <h5 class="card-title">
                        <a href="#" class="text-dark">{{ item.title }}</a>
                      </h5>
                      <p class="card-text">{{ item.content }}</p>
                      <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                        <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                        <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
                      </div>
                    </div>
                    <div class="card-footer d-flex">
                      <button type="button" class="btn btn-outline-secondary btn-sm" 
                        @click="getProduct(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                        查看更多
                      </button>
                      <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id" ></i>
                        加到購物車
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
           <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
              aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel" >{{ product.title }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <img :src="product.imageUrl" class="img-fluid" alt="">
                    <blockquote class="blockquote mt-3">
                      <p class="mb-0">{{ product.content }}</p>
                      <footer class="blockquote-footer text-right">{{ product.description }}</footer>
                    </blockquote>
                    <div class="d-flex justify-content-between align-items-baseline">
                      <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
                      <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                      <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
                    </div>
                    <select name="" class="form-control mt-3" v-model="product.num">
                      <option :value="num" v-for="num in 10" :key="num">
                        選購 {{num}} {{product.unit}}
                      </option>
                    </select>
                  </div>
                  <div class="modal-footer">
                    <div class="text-muted text-nowrap mr-3">
                      小計 <strong>{{ product.num * product.price }}</strong> 元
                    </div>
                    <button type="button" class="btn btn-primary"
                      @click="addtoCart(product.id, product.num)">
                      <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
                      加到購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>           
        <!--分類2-->
          <div class="tab-pane" id="class-2">
            <div class="row align-items-stretch">
              <!-- 禮品 -->
              <div class="col-md-4 mb-4" v-for="item in products" :key="item.id" v-if="item.category == '食物'">
                <div class="card border-0 box-shadow text-center h-100">
                  <div class="card border-0 shadow-sm">
                    <div style="height: 150px; background-size: cover; background-position: center"
                      :style="{backgroundImage: `url(${item.imageUrl})`}">
                    </div>
                    <div class="card-body">
                      <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                      <h5 class="card-title">
                        <a href="#" class="text-dark">{{ item.title }}</a>
                      </h5>
                      <p class="card-text">{{ item.content }}</p>
                      <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                        <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                        <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
                      </div>
                    </div>
                    <div class="card-footer d-flex">
                      <button type="button" class="btn btn-outline-secondary btn-sm" 
                        @click="getProduct(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                        查看更多
                      </button>
                      <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id" ></i>
                        加到購物車
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <!--分類3-->
          <div class="tab-pane" id="class-3">
            <div class="row align-items-stretch">
              <!-- 禮品 -->
              <div class="col-md-4 mb-4" v-for="item in products" :key="item.id" v-if="item.category == '3C'">
                <div class="card border-0 box-shadow text-center h-100">
                  <div class="card border-0 shadow-sm">
                    <div style="height: 150px; background-size: cover; background-position: center"
                      :style="{backgroundImage: `url(${item.imageUrl})`}">
                    </div>
                    <div class="card-body">
                      <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                      <h5 class="card-title">
                        <a href="#" class="text-dark">{{ item.title }}</a>
                      </h5>
                      <p class="card-text">{{ item.content }}</p>
                      <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                        <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                        <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
                      </div>
                    </div>
                    <div class="card-footer d-flex">
                      <button type="button" class="btn btn-outline-secondary btn-sm" 
                        @click="getProduct(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                        查看更多
                      </button>
                      <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id" ></i>
                        加到購物車
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <!--分類4-->
          <div class="tab-pane" id="class-4">
            <div class="row align-items-stretch">
              <!-- 禮品 -->
              <div class="col-md-4 mb-4" v-for="item in products" :key="item.id" v-if="item.category == '手機'">
                <div class="card border-0 box-shadow text-center h-100">
                  <div class="card border-0 shadow-sm">
                    <div style="height: 150px; background-size: cover; background-position: center"
                      :style="{backgroundImage: `url(${item.imageUrl})`}">
                    </div>
                    <div class="card-body">
                      <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                      <h5 class="card-title">
                        <a href="#" class="text-dark">{{ item.title }}</a>
                      </h5>
                      <p class="card-text">{{ item.content }}</p>
                      <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                        <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                        <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
                      </div>
                    </div>
                    <div class="card-footer d-flex">
                      <button type="button" class="btn btn-outline-secondary btn-sm" 
                        @click="getProduct(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                        查看更多
                      </button>
                      <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id" ></i>
                        加到購物車
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <!-- tab-content end -->
      </div>
    </div>
  </div>


  <!--頁尾 -->
  <footer class="bg-light text-muted py-5">
    <div class="container">
      <ul class="list-inline text-center">
        <li class="list-inline-item">© Copright 2017 六角血拼賣賣</li>
        <li class="list-inline-item">
          <a class="text-info" href="#">
            <i class="fa fa-instagram" aria-hidden="true"></i> Instagrame</a>
        </li>
        <li class="list-inline-item">
          <a class="text-info" href="#">
            <i class="fa fa-facebook-square" aria-hidden="true"></i> Facebook</a>
        </li>
        <li class="list-inline-item">
          <a class="text-info" href="#">About</a>
        </li>
      </ul>
      <p class="text-center">Made with Bootstrap4</p>
    </div>
  </footer>

  <div class="modal fade" id="removeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">刪除商品</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>是否確認刪除商品</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">否</button>
          <button type="button" class="btn btn-outline-danger px-5">是</button>
        </div>
      </div>
    </div>
  </div>

</div>

</template>
<script>
import $ from 'jquery';

export default {
  data() {
    return {
      products: [],
      pagination:{},
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
    getProducts(page = 1) {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products?page=${page}`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.products = response.data.products;
        // console.log(response);
        vm.isLoading = false;
        vm.pagination = response.data.pagination;
      });
    },
    getProduct(id){
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/product/${id}`;
      vm.status.loadingItem = id;
      this.$http.get(url).then((response) => {
        $('#productModal').modal('show');
        vm.product = response.data.product;
        console.log(response);
        vm.status.loadingItem = '';

      });
    },
    getProduct2(id){
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/product/${id}`;
      vm.status.loadingItem = id;
      this.$http.get(url).then((response) => {
        $('#productModal').modal('show');
        vm.product = response.data.product;
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
        vm.cart = response.data.data;
        console.log(response);
        // console.log(response.data.data.carts.length);
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
    getCartLength(){
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.cart = response.data.data;
        console.log(response);
        // console.log(response.data.data.carts.length);
        vm.isLoading = false;
      });

      // console.log(response.data.data.carts.length);
    } ,     
  },
  created() {
    this.getProducts();
    this.getCart();
  },


};
</script>
