<template>
  <div class="avue-logo">
    <transition name="fade">
      <span v-if="keyCollapse"
            class="avue-logo_subtitle"
            key="0">
        {{website.logo}}
      </span>
    </transition>
    <transition-group name="fade">
      <template v-if="!keyCollapse">
        <span class="avue-logo_title" key="1">
          <el-row :gutter="20">
            <el-col :span="4">
<!--              <img style="width:250%" src="../../../public/img/logo_1.png" alt="">-->
            </el-col>
            <el-col :span="20">
              <span style="font-size:1rem">{{website.indexTitle}}</span>
            </el-col>
          </el-row>
          </span>
      </template>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "logo",
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapGetters(["website", "keyCollapse"])
  },
  methods: {}
};
</script>

<style lang="scss">
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-active {
  transition: opacity 2.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.avue-logo {
  position: fixed;
  top: 0;
  left: 0;
  width: 320px;
  height: 64px;
  line-height: 64px;
  // background: url("../../styles/img/login_min.jpg");
  font-size: 20px;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0 1px 2px 0 rgba(255, 255, 255, 0.15);
  color:#fff;
  z-index: 1024;
  display:inline-block;
  float: bottom;

  &_title {
    display: block;
    text-align: center;
    font-weight: 550;
    font-size: 20px;
  }
  &_subtitle {
    display: block;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }


}
</style>
