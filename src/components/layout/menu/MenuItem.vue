<template>
  <div class="menu">
    <!-- 根菜单 -->
    <router-link tag="span" :to="resolvePath()">
      <el-menu-item :index="resolvePath()" v-if="item.meta.show">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </router-link>

  </div>
</template>

<script>
// 引入path用来处理路径
import path from "path";

export default {
  // 做组件递归时必须定义一个name。然后递归时的组件名就是这里的name值
  name: "MenuItem",
  props: {
    // 上一级的路由信息
    item: {
      type: Object,
      default: null,
    },
    // 上一级的路径
    fatherPath: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    resolvePath(routePath = "") {
      return path.resolve(this.fatherPath, routePath);
    },
  },
};
</script>

<style lang="scss">
.menu .el-menu-item {
  padding-left: 30px !important;
  display: -webkit-box !important;
  overflow: hidden !important; /*超出隐藏*/
  text-overflow: ellipsis !important;
  font-size: 10px !important;
}

.menu i {
  padding-right: 10px !important;
}
</style>
