<template>
  <!-- <div class="avue-sidebar"> -->
  <div>
    <el-row>
      <el-col :span="2"><logo></logo></el-col>
      <el-col :span="19">
        <div class="elscrollbar">
          <div v-if="validatenull(menu)" class="avue-sidebar--tip">
            没有发现菜单
          </div>
          <el-menu
            unique-opened
            :default-active="nowTagValue"
            :show-timeout="150"
            :collapse="keyCollapse"
          >
            <sidebar-item
              :menu="menu"
              :screen="screen"
              first
              :props="website.menu.props"
              :collapse="keyCollapse"
            >
            </sidebar-item>
          </el-menu>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import logo from "../logo";
import sidebarItem from "./sidebarItem";
export default {
  name: "sidebar",
  components: { sidebarItem, logo },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("GetMenu").then((data) => {
      if (data.length === 0) return;
      this.$router.$avueRouter.formatRoutes(data, true);
    });
  },
  computed: {
    ...mapGetters(["website", "menu", "tag", "keyCollapse", "screen"]),
    nowTagValue: function () {
      return this.$router.$avueRouter.getValue(this.$route);
    },
  },
  mounted() {},
  methods: {},
};
</script>
<style>
.elscrollbar {
  /* background: url("../../../styles/img/login_min.jpg"); */
  /* position:absolute; */
  /* clip:rect(40% 10% 20% 10%); */
  margin-left: 18%;
  margin-top: 0.2%;
  float: bottom;
}
</style>

