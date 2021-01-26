<template>
  <div class="login-container"
       @keyup.enter.native="handleLogin">
    <div class="login-weaper  animated bounceInDown">
      <div class="login-left">
        <el-row :gutter="20"> <div>
<!--          <img class="img" src="../../../public/img/logo_1.png" alt="">-->
        </div>
        </el-row>
<!--        <el-row :gutter="20">-->
<!--          <p class="title"><b>{{website.infoTitle}}</b></p>-->
<!--          <p style=" margin-left: -20%">China Offshore Oil Intelligent Injection-Production Digital Platform</p>-->
<!--        </el-row>-->
      </div>
      <div class="login-border">
        <div class="login-main">
          <userLogin v-if="activeName==='user'"></userLogin>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '@/styles/login.scss'
  import userLogin from "./userlogin";
  import {mapGetters} from "vuex";
  import {getStore, setStore} from "@/util/store";
  import {dateFormat} from "@/util/date";
  import {validatenull} from "@/util/validate";

  export default {
    name: "login",
    components: {
      userLogin
    },
    data() {
      return {
        activeName: "user"
      };
    },
    watch: {},
    created() {
    },
    mounted() {
    },
    computed: {
      ...mapGetters(["website"])
    },
    props: [],
    methods: {}
  };
</script>

