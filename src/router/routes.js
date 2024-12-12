const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'home', component: () => import('src/oldfiles/HomePage.vue') },
      { path: 'profile', component: () => import('src/oldfiles/ProfilePage.vue') },
      { path: 'join', component: () => import('src/oldfiles/JoinPage.vue') },
      { path: 'join_conductor', component: () => import('src/oldfiles/JoinPage_Conductor.vue') },
      { path: 'feedback', component: () => import('src/oldfiles/FeedbackPage.vue') },
      { path: 'nav', component: () => import('src/oldfiles/NavBar.vue') },
      { path: 'nav_conductor', component: () => import('src/oldfiles/NavBar_Conductor.vue') },
      { path: 'yuvraj', component: () => import('src/oldfiles/Yuvraj_Page.vue') },
      { path: 'history', component: () => import('src/oldfiles/HistoryPage.vue') },
      { path: 'help', component: () => import('src/oldfiles/HelpPage.vue') }

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
