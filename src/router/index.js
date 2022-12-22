import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Default',
    redirect: '/huoyun',
    component:()=>import('@/views/fagai/huoyun/index.vue'),
    redirect: '/resident',
    component:()=>import('@/views/fagai/resident/Permanent.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    meta: { title: "首页", icon: "el-icon-position" },
    component: Home,
    meta: {
      requireAuth: false
    },
    children:[
      // {
      //   path:'/gzpi',
      //   name:'发改项目',
      //   meta: { title: "发改项目", icon: "el-icon-guide" },
      //   component:()=>import('@/views/fagai/index.vue'),
      //   children:[
          {
            path:'/resident',
            meta: { title: "县区常驻人口", icon: "el-icon-position" ,show:true},
            component:()=>import('@/views/fagai/resident/Permanent.vue'),
          },
          {
            path:'/inflow',
            meta: { title: "县区迁入人口", icon: "el-icon-position" ,show:true},
            component:()=>import('@/views/fagai/inflow/Liudong.vue'),
          },
          {
            path:'/outflow',
            meta: { title: "县区迁出人口", icon: "el-icon-position" ,show:true},
            component:()=>import('@/views/fagai/outflow/Liudong.vue'),
          },
          {
            path:'/industry',
            meta: { title: "工业园人流", icon: "el-icon-position" ,show:false},
            component:()=>import('@/views/fagai/gongyeyuan/Industry.vue'),
          },
          {
            path:'/shangquan',
            meta: { title: "商圈客流", icon: "el-icon-position" ,show:false},
            component:()=>import('@/views/fagai/business/Shangquan.vue'),
          },
          {
            path:'/huoyun',
            meta: { title: "货运", icon: "el-icon-position" ,show:false},
            component:()=>import('@/views/fagai/huoyun/index.vue'),
          },
      //   ]
      // },
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
  },

]

const router = new VueRouter({
	base:"/yxjc/geo/",
  // mode:'history',
  routes
})

export default router


