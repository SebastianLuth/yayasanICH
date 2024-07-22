import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomePage from '../views/productPage/HomeView.vue'
import AboutPage from '../views/productPage/AboutView.vue'
import DetailClass from '../views/productPage/DetailProduct.vue'
import Cart from '../views/user/Cart/IndexVue.vue'
import DetailConsultaion from '../views/productPage/DetailConsultation.vue'
import ContactPage from '../views/productPage/ContactPage.vue'
import DetailNews from '../views/productPage/DetailNewsPage.vue'
import NewsPage from '../views/productPage/NewsPage.vue'
import LoginPage from '../views/productPage/LoginPage.vue'
import SignupPage from '../views/productPage/SignupPage.vue'
import ProfilePage from '../views/user/ProfilePage.vue'
import AdminProfilePage from '../views/admin/AdminPage.vue'
import AllModulProduct from '../views/admin/ModuleProduct.vue'
import AllConsultation from '../views/admin/ViewsConsultation.vue'
import AllNews from '../views/admin/ViewsNews.vue'
import PostModule from '../views/admin/AddModule.vue'
import PostNews from'../views/admin/addArticle.vue'
import PostConsultation from'../views/admin/addConsultation.vue'
import PostProduct from '../views/admin/addProduct.vue'
import MyCoursePage from '../views/user/Modules/myCoursePage.vue'
import MyModulePage from '../views/user/Modules/myModulePage'
import BrowseCourse from '../views/user/BrowseCourse.vue'
import EditModule from '@/views/admin/EditModule.vue'
import EditProduct from '@/views/admin/EditProduct.vue'
import EditConsultation from '@/views/admin/EditConsultation.vue'
import EditArticle from '@/views/admin/EditArticle.vue'


const routes = [
  
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage,
    meta: {requiresGuest: true}
  },
  {
    path: '/class/:name',
    name: 'detail-class',
    component: DetailClass,
    props: true,
  },
  {
    path: '/consultation/:name',
    name: 'detail-consultation',
    component: DetailConsultaion,
    meta: {requiresGuest: true}
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactPage,
    meta: {requiresGuest: true}
  },
  {
    path: '/news',
    name : 'news',
    component : NewsPage,
    meta : {requiresGuest : true}
  },
  {
    path: '/news/:judul',
    name: 'detail-news',
    props: true,
    component: DetailNews,
    meta: {requiresGuest: true}
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {requiresGuest: true}
  },
  {
    path: '/register',
    name: 'register',
    component: SignupPage,
    meta: {requiresGuest: true}
  },
  {
    path: '/user',
    name: 'user',
    component: ProfilePage,
    meta: {requiresAuth: true}
  },  
  {
    path: '/admin',
    name: 'admin',
    component: AdminProfilePage,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/admin/AllConsultation',
    name: 'AllConsultation',
    component: AllConsultation,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/admin/AllNews',
    name: 'AllNews',
    component: AllNews,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/admin/AllModulProduct',
    name: 'AllModulProduct',
    component: AllModulProduct,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/admin/addModule',
    name: 'post-module',
    component: PostModule,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/admin/module/:id',
    name: 'EditModule',
    component: EditModule,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/admin/product/:id',
    name: 'EditProduct',
    component: EditProduct,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/admin/consultation/:id',
    name: 'EditConsultation',
    component: EditConsultation,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/admin/news/:id',
    name: 'EditArticle',
    component: EditArticle,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/admin/addArticle',
    name: 'post-article',
    component: PostNews,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/admin/addConsultation',
    name: 'post-consultation',
    component: PostConsultation,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/admin/addProduct',
    name: 'post-product',
    component: PostProduct,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },    
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    meta: {requiresAuth: true}
  },
  {
    path: '/academy',
    name: 'academy',
    component: MyCoursePage,
    meta: {requiresAuth: true}
  },
  {
    path: '/module/:courseId',
    name: 'myModule',
    component: MyModulePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/browse',
    name: 'browse',
    component: BrowseCourse,
    meta: {requiresAuth: true}
  }
  // {
  //   path: '*',
  //   component: NotFound
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next)=>{
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated;
  const userRole = authStore.userDetail.role;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'login' });
    } else {
      if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (userRole === 'admin') {
          next();
        } else {
          next({ name: 'browse' }); // Redirect jika bukan admin
        }
      } else {
        next();
      }
    } 
  }else{
    return next()
  }
})


export default router
