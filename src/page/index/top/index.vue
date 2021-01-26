<template>
  <div class="avue-top" style="width: 100%">
    <div class="top-bar__sidebar">
      <sidebar />
    </div>

    <!-- 左侧菜单展开与收起来
       <div class="top-bar__left">
      <div class="avue-breadcrumb"
           :class="[{ 'avue-breadcrumb--active': isCollapse }]"
           v-if="showCollapse">
        <i class="iconfont iconliebiao"
           @click="setCollapse"></i>
      </div>
    </div> -->
    <div class="top-bar__title">
      <div class="top-bar__item top-bar__item--show" v-if="showMenu">
        <top-menu></top-menu>
      </div>
    </div>
    <div class="top-bar__right">
      <!-- <el-tooltip v-if="showColor"
                  effect="dark"
                  content="主题色"
                  placement="bottom">
        <div class="top-bar__item">
          <top-color></top-color>
        </div>
      </el-tooltip> -->
      <el-tooltip
        v-if="showLock"
        effect="dark"
        content="锁屏"
        placement="bottom"
      >
        <div class="top-bar__item">
          <top-lock></top-lock>
        </div>
      </el-tooltip>
      <!-- <el-tooltip v-if="showTheme"
                   effect="dark"
                   content="特色主题"
                   placement="bottom">
         <div class="top-bar__item top-bar__item--show">
           <top-theme></top-theme>
         </div>
       </el-tooltip>   -->
      <el-dialog :visible.sync="dialogVisible" title="用户头像" width="60%">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
      <!-- <div class="top-bar__item">
        <top-msg></top-msg>
      </div> -->
      <!-- <el-color-picker v-model="webcolor" @change="colorChange"></el-color-picker> -->
      <!-- <el-tooltip v-if="showLock"
                  effect="dark"
                  content="锁屏"
                  placement="bottom">
      </el-tooltip> -->
      <!-- <el-tooltip v-if="showFullScren"
                  effect="dark"
                  :content="isFullScreen?'退出全屏':'全屏'"
                  placement="bottom">
        <div class="top-bar__item">
          <i :class="isFullScreen?'icon-zuixiaohua':'icon-quanpingzuidahua'"
             @click="handleScreen"></i>
        </div>
      </el-tooltip> -->
      <el-tooltip
        class="item"
        effect="dark"
        content="用户头像"
        placement="bottom"
      >
        <!-- <img class="top-userImg" :src="'http://218.59.189.50:12005'+userInfo.avatar" @click="handlePictureCardPreview(userInfo.avatar)"> -->
        <!--          <img class="top-userImg" :src="'http://218.59.189.50:12005'+userInfo.avatar" v-if="userInfo.avatar!=null">-->
        <!--        <img class="top-userImg" :src="imgurl" v-else>-->
        <img class="top-userImg" :src="imgurl" />
      </el-tooltip>
      <el-dropdown>
        <div class="el-dropdown-link">
          <div class="btext">
            <b style="color: #fff">{{ userInfo.username }}</b>
          </div>
          <i class="el-icon-arrow-down el-icon--right" style="color: #fff"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/">首页</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/info/index">个人信息</router-link>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout" divided
            >退出系统
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { fullscreenToggel, listenfullscreen } from "@/util/util";
import topMenu from "./top-menu";
import topLock from "./top-lock";
import topColor from "./top-color";
import topTheme from "./top-theme";
// import topSetting from "./top-setting";
import topMsg from "./top-msg";
import sidebar from "../sidebar/";
import imgurl from "../../../../public/img/user.png";

export default {
  components: {
    topMenu,
    topLock,
    topColor,
    topTheme,
    topMsg,
    sidebar,
  },
  name: "top",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      imgurl: imgurl,
    };
  },
  filters: {},
  created() {},
  mounted() {
    listenfullscreen(this.setScreen);
  },
  computed: {
    ...mapState({
      showLock: (state) => state.common.showLock,
      // showFullScren: state => state.common.showFullScren,
      // showFullScren: state => true,
      showCollapse: (state) => state.common.showCollapse,
      showMenu: (state) => state.common.showMenu,
      showColor: (state) => state.common.showColor,
      showTheme: (state) => state.common.showTheme,
    }),
    ...mapGetters([
      "userInfo",
      "isFullScreen",
      "tagWel",
      "tagList",
      "isCollapse",
      "tag",
      "logsLen",
      "logsFlag",
    ]),
  },
  methods: {
    handleScreen() {
      fullscreenToggel();
    },
    setCollapse() {
      this.$store.commit("SET_COLLAPSE");
    },
    setScreen() {
      this.$store.commit("SET_FULLSCREN");
    },
    logout() {
      this.$confirm("是否退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          this.$router.push({ path: "/login" });
        });
      });
    },
    handlePictureCardPreview(filepath) {
      this.dialogImageUrl = "http://218.59.189.50:12005" + filepath;
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.btext {
  width: 50px;
  display: inline-block;
  white-space: nowrap;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
}

.top-bar__title {
  width: 50px;
}
.top-bar__sidebar {
  float: bottom;
}
</style>
