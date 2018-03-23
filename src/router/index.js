import Vue from 'vue'
import Router from 'vue-router'

import Home from "@/components/home"
import registration from "@/components/view/regisation/registration"
import NotFound from "@/components/404"
import index from "@/components/index"
//注册
import nextRegistration from "@/components/view/regisation/nextRegistration"
import registration2 from "@/components/view/regisation/registration2"
import registration3 from "@/components/view/regisation/registration3"
//商铺管理
import shopInfo from "@/components/view/shopInfo"
const exitShop = () =>
  import ('@/components/view/shopadmin/exitShop')
/*
 *商品管理路由
 */
const goodsList = () =>
  import ('@/components/view/good/goodsList');
const goodShow = () =>
  import ('@/components/view/good/goodShow');
const addGoods = () =>
  import ('@/components/view/good/addGoodsIndex');
// const addGoods1 = () =>
//   import ('@/components/view/good/addGoods1');
const addGoodsDetails = () =>
  import ('@/components/view/good/addGoodsDetails');
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: "拍乐网",
      meta: {
        title: "拍乐网",
      },
      component: index,
      children: [{
          num: '1',
          path: '/home',
          component: Home,
          meta: {
            title: "商铺管理"
          },
          name: "商铺管理",
          children: [{
              path: "/home/shopAdmin/shopInfo",
              name: '商家/店铺信息',
              component: shopInfo,
              meta: {
                title: "商家/店铺信息"
              },
              num: "1-1",

            },
            // {
            //   path : "/home/shopAdmin/alleged",
            //   name : '违规信息',
            //   meta :{
            //     title :"违规信息"
            //   },
            //   component:shopInfo,
            //   num :"1-2"
            // },
            // {
            //   path :"/home/shopAdmin/exitShop",
            //   name : "退店",
            //   meta : {
            //     title:"退店"
            //   },
            //   component:exitShop,
            //   num :"1-3"
            // },

          ],

        },
        {
          path: "/home",
          name: "商品管理",
          component: Home,
          num: "2",
          children: [{
              path: "/home/goods/addGoods",
              component: addGoods,
              num: "2-1",
              meta: {
                title: "拍乐网_发布商品"
              },
              name: "发布商品"
            },
            {
              path: "/home/goods/goodsList",
              component: goodsList,
              num: "2-2",
              meta: 　{
                title: "拍乐网_商品列表"
              },
              name: "商品列表",

            },
            // {
            //   path: "/home/goods/addGoods/addGoods1",
            //   component: addGoods1,
            //   num: "",
            // },
            {
              path: "/home/goods/addGoods/addGoodsDetails",
              component: addGoodsDetails,
              num: "",
            },
            {
              path: "/home/goods/goodsList/:id",
              component: goodShow,
              num: ""
            }

          ],
        }
      ]
    },
    {
      path: '/',
      name: "拍乐网",
      meta: {
        title: "拍乐网"
      },
      component: index,
      children: [{
          path: '/registration',
          component: registration,
          meta: {
            title: "商户注册"
          },
        }, {
          path: "/nextRegistration",
          component: nextRegistration,
          beforeEnter: (to, from, next) => {
            if (window.localStorage.hasOwnProperty('token')) {
              // 判断是否有进入标示
              if (JSON.parse(window.localStorage.getItem('token')).hasOwnProperty('code')) {
                if (JSON.parse(window.localStorage.getItem('token')).code == "0") {
                  //如果是点击上一步而退过来的  那么清空上一次的token
                  if (window.localStorage.hasOwnProperty('token_two')) {

                    window.localStorage.removeItem('token_two');
                    next();

                  } else {
                    next();
                  }

                } else {
                  router.push('/registration');
                }
              } else {
                router.push('/registration');
              }
            } else {
              router.push('/registration');
            }
          },
          meta: {
            title: "商户注册信息"
          },

        }, {
          path: "/registration2",
          component: registration2,
          beforeEnter: (to, from, next) => {
            //在更新完成后获取token中的code  然后替换 
            if (window.localStorage.hasOwnProperty('token_two')) {
              if (window.localStorage.getItem('token_two') == "0") {
                next();
              } else {
                window.localStorage.clear();
                router.push('/registration');
              }
            } else {
              window.localStorage.clear();
              router.push('/registration');
            }
          },

          meta: {
            title: "商户注册信息"
          },

        },
        {
          path: "/registration3",
          component: registration3,
          beforeEnter: (to, from, next) => {
            //在更新完成后获取token中的code  然后替换  需要传入一个新的字符串，进行判断



            if (window.localStorage.hasOwnProperty('token_three')) {
              if (JSON.parse(window.localStorage.getItem('token_three')) == "0") {
                next();
              } else {
                router.push('/registration');
              }

            } else {
              router.push('/registration');
            }




          }
        }
      ]
    },
    {
      path: '/404',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/404'
    },

  ]
})


export default router;


router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
