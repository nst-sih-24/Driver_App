const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'main', component: () => import('src/oldfiles/MainPage.vue') },
      { path: 'sumit', component: () => import('src/oldfiles/ActionS.vue') },
      { path: 'roni', component: () => import('src/oldfiles/ProfilePage.vue') },
      { path: 'join', component: () => import('src/oldfiles/NextPage.vue') },
      { path: 'feedback', component: () => import('src/oldfiles/FeedbackPage.vue') },
      { path: 'krushn', component: () => import('src/oldfiles/MorePage.vue') }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
