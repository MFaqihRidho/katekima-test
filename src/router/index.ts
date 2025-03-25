import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'Berry list' },
    },
    {
      path: '/berries',
      name: 'Berry list',
      component: () => import('../pages/berry/BerryListPage.vue'),
    },
    {
      path: '/berries/:id',
      name: 'Berry detail',
      component: () => import('../pages/berry/BerryDetailPage.vue'),
      props: true,
    },
    {
      path: '/product/create',
      name: 'Berry create',
      component: () => import('../pages/product/ProductCreatePage.vue'),
      props: true,
    },
    {
      path: '/product/edit/:id',
      name: 'Berry Edit',
      component: () => import('../pages/product/ProductEditPage.vue'),
      props: true,
    },
  ],
})

export default router
