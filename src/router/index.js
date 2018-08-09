import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Login from '@/components/login/login'
import Rslogin from '@/components/login/rslogin'

import Organizational from '@/components/organizational/index'
import Organbase from '@/components/organizational/base'
import Organinfo from '@/components/organizational/infochange'
import Organna from '@/components/organizational/nachange'
import Organex from '@/components/organizational/examine'

import Activity from '@/components/activity/index'
import Activitybase from '@/components/activity/base'
import Rankbeforem from '@/components/activity/rankbefore'
import Allotinfo from '@/components/activity/allot'
import Release from '@/components/activity/release'
import Performanceenter from '@/components/activity/grade'
import Rankapply from '@/components/activity/apply'
import Newapply from '@/components/activity/apply/newapply'
import Applymoney from '@/components/activity/apply/applymoney'
import Applyover from '@/components/activity/apply/applyover'
import Searchgrade from '@/components/activity/searchgrade'
import Sdetail from '@/components/activity/sdetail'

import Student from '@/components/student/index'
import Studentinfo from '@/components/student/base'

import Teacher from '@/components/teacher/index'
import Teacherlist from '@/components/teacher/list'
import Teacherdetail from '@/components/teacher/detail'


import Rescon from '@/components/res/cont'
// import Organizational from '@/components/organizational/index'
// import Organlist from '@/components/organizational/list'
// import Teacher from '@/components/teacher/index'
// import Teacherlist from '@/components/teacher/list'
// import Userman from '@/components/system/userman'
// import Admin from '@/components/system/admin'
// import Person from '@/components/system/person'
// import Menu from '@/components/menu/index'
// import Menuset from '@/components/menu/set'
// import Menuadd from '@/components/menu/add'
// import Menuall from '@/components/menu/all'

// //导航栏设置
// import Navigation from '@/components/navigation/index'
// import Addnav from '@/components/navigation/addnav'
// import Allnav from '@/components/navigation/allnav'
// import Navmenu from '@/components/navigation/navmenu'

// //banner设置
// import Banner from '@/components/banner/index'
// import Addban from '@/components/banner/addban'
// import Allban from '@/components/banner/allban'
// import Banmenu from '@/components/banner/banmenu'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/rslogin',
      name:'rslogin',
      component:Rslogin
    },
    {
      path:"/organizational",
      name:"organizational",
      component:Organizational,
      children:[
        {
          path:"organbase",
          name:"organbase",
          component:Organbase
        },
        {
          path:"organinfo",
          name:"organinfo",
          component:Organinfo
        },
         {
          path:"organna",
          name:"organna",
          component:Organna
        },
        {
          path:"organex",
          name:"organex",
          component:Organex
        },
        {
          path:"/",
          redirect:"organbase"
        }
      ]
    },
    {
      path:"/activity",
      name:"activity",
      component:Activity,
      children:[
        {
          path:"activitybase",
          name:"activitybase",
          component:Activitybase
        },
         {
          path:"release",
          name:"release",
          component:Release
        },
        {
          path:"/activity/allotinfo/:id",
          name:"allotinfo",
          component:Allotinfo
        },
        {
          path:"/activity/performanceenter/:id",
          name:"performanceenter",
          component:Performanceenter
        },
        {
          path:"/activity/sdetail/:id",
          name:"sdetail",
          component:Sdetail
        },
        {
          path:"rankbeforem",
          name:"rankbeforem",
          component:Rankbeforem
        },
        {
          path:"rankapply",
          name:"rankapply",
          component:Rankapply
        },
        {
          path:"newapply",
          name:"newapply",
          component:Newapply
        },
        {
          path:"applymoney",
          name:"applymoney",
          component:Applymoney
        },
        {
          path:"applyover",
          name:"applyover",
          component:Applyover
        },
        {
          path:"searchgrade",
          name:"searchgrade",
          component:Searchgrade
        },
        {
          path:"/",
          redirect:"activitybase"
        }
      ]
    },
    {
      path:"/student",
      name:"student",
      component:Student,
      children:[
        {
          path:"studentinfo",
          name:"studentinfo",
          component:Studentinfo
        },
        {
          path:"/",
          redirect:"studentinfo"
        }
      ]
    },
    {
      path:"/teacher",
      name:"teacher",
      component:Teacher,
      children:[
        {
          path:"teacherlist",
          name:"teacherlist",
          component:Teacherlist
        },
        {
          path:"teacherdetail",
          name:"teacherdetail",
          component:Teacherdetail
        },
        {
          path:"/",
          redirect:"teacherlist"
        }
      ]
    },
      {
      path:"/rescont",
      name:"res",
      component:Rescon
    },
    {
      path:"*",
      redirect:"home"
    }
  ]
})
