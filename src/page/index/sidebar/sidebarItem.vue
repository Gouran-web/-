<template>
  <div class="menu-wrapper">
    <div>
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        active-text-color="#0955ff"
        text-color="black"
        unique-opened
      >
        <!-- <el-input v-model="JSON.stringify(menu)" placeholder="请输入内容"></el-input> -->
        <template v-for="item in menu">
          <!-- <el-menu-item
                      :index="item[pathKey]"
                      @click="open(item)"
                      :key="item[labelKey]"
                      :class="{'is-active':vaildAvtive(item)}"> -->
          <!-- <i :class="item[iconKey]"></i> -->
          <!-- <span slot="title" style="font-size:14px;"
                :alt="item[pathKey]">{{item[labelKey]+'aaa'}}</span> -->
          <!-- </el-menu-item> -->
          <el-submenu :index="item[pathKey]" :key="item[labelKey]">
            <template slot="title">
              <!-- <i :class="item[iconKey]"></i> -->
              <span
                slot="title"
                :class="{ 'el-menu--display': collapse && first }"
                @click="open(item)"
                >{{ item[labelKey] }}</span
              >
            </template>
            <template v-for="(child, cindex) in item[childrenKey]">
              <el-menu-item
                :index="(child[pathKey], cindex)"
                @click="open(child)"
                :class="{ 'is-active': vaildAvtive(child) }"
                v-if="validatenull(child[childrenKey])"
                :key="child[labelKey]"
              >
                <!-- <i :class="child[iconKey]"></i> -->
                <span slot="title">{{ child[labelKey] }}</span>
              </el-menu-item>
              <sidebar-item
                v-else
                :menu="[child]"
                :key="cindex"
                :props="props"
                :screen="screen"
                :collapse="collapse"
              ></sidebar-item>
            </template>
          </el-submenu>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { validatenull } from "@/util/validate";
import config from "./config.js";
export default {
  name: "sidebarItem",
  data() {
    return {
      config: config,
    };
  },
  props: {
    menu: {
      type: Array,
    },
    screen: {
      type: Number,
    },
    first: {
      type: Boolean,
      default: false,
    },
    props: {
      type: Object,
      default: () => {
        return {};
      },
    },
    collapse: {
      type: Boolean,
    },
  },
  created() {
    console.log(this.menu);
  },
  mounted() {},
  computed: {
    ...mapGetters(["roles"]),
    labelKey() {
      return this.props.label || this.config.propsDefault.label;
    },
    pathKey() {
      return this.props.path || this.config.propsDefault.path;
    },
    iconKey() {
      return this.props.icon || this.config.propsDefault.icon;
    },
    childrenKey() {
      return this.props.children || this.config.propsDefault.children;
    },
    nowTagValue() {
      return this.$router.$avueRouter.getValue(this.$route);
    },
  },
  methods: {
    vaildAvtive(item) {
      const groupFlag = (item["group"] || []).some((ele) =>
        this.$route.path.includes(ele)
      );
      return this.nowTagValue === item[this.pathKey] || groupFlag;
    },
    vaildRoles(item) {
      item.meta = item.meta || {};
      return item.meta.roles ? item.meta.roles.includes(this.roles) : true;
    },
    validatenull(val) {
      return validatenull(val);
    },
    open(item) {
      if (this.screen <= 1) this.$store.commit("SET_COLLAPSE");
      this.$router.$avueRouter.group = item.group;
      this.$store.commit("DEL_ALL_TAG");
      if (item.children.length > 0) {
        var x;
        for (x in item.children) {
          this.$router.push({
            path: this.$router.$avueRouter.getPath({
              name: item.children[x][this.labelKey],
              src: item.children[x][this.pathKey],
            }),
            query: x.query,
          });
        }
        this.$router.push({
          path: this.$router.$avueRouter.getPath({
            name: item.children[0][this.labelKey],
            src: item.children[0][this.pathKey],
          }),
          query: x.query,
        });
      } else {
        this.$router.push({
          path: this.$router.$avueRouter.getPath({
            name: item[this.labelKey],
            src: item[this.pathKey],
          }),
          query: item.query,
        });
      }
      // this.$router.push({
      //   path: this.$router.$avueRouter.getPath({
      //     name: item[this.labelKey],
      //     src: item[this.pathKey]
      //   }),
      //   query: item.query
      // });
    },
  },
};
</script>

<style>
.test {
  background-color: #fff;
  /* background: url("../../../styles/img/top.jpg"); */
  width: 85%;
  border-radius: 0.5em 0.5em 0 0;
  transform: perspective(20em) rotateX(15deg);
  transform-origin: bottom;
  clip: rect(40% 10% 20% 10%);
  /* margin-left: 7%; */
  margin-top: 0.35%;
}

.el-menu.el-menu--horizontal {
  width: 100%;
  /*overflow-x: scroll;*/
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
</style>
