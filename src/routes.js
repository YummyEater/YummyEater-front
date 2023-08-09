import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// const SearchResult = React.lazy(() => import('./views/searchresult/SearchResult'))
// const UserSearch = React.lazy(() => import('./views/searchresult/UserSearch'))

const FoodArticle = React.lazy(() => import('./views/foodarticle/FoodArticle'))
// const NewArticle = React.lazy(() => import('./views/newarticle/NewArticle'))
// const ArticleEditor = React.lazy(() => import('./views/articleeditor/ArticleEditor'))
// const FoodArticlePosted = React.lazy(() => import('./views/foodarticle/FoodArticlePosted'))

const UserInfo = React.lazy(() => import('./views/user/UserInfo'))
const UserInfoEdit = React.lazy(() => import('./views/user/UserInfoEdit'))
const UserArticle = React.lazy(() => import('./views/user/UserArticle'))

const Login = React.lazy(() => import('./views/auth/login/Login'))
const Register = React.lazy(() => import('./views/auth/register/Register'))
// const OauthSignIn = React.lazy(() => import('./views/auth/login/OauthSignIn'))
// const OauthSignUp = React.lazy(() => import('./views/auth/login/OauthSignUp'))
const NewPw = React.lazy(() => import('./views/auth/newpw/NewPw'))


const routes = [
  // { path: '/', exact: true, name: 'Home' },
  { path: '/', name: 'Home', element: Dashboard },
  // { path: '/searchresult', name: 'Search Result', element: SearchResult },
  // { path: '/usersearch', name: 'User Search', element: UserSearch },

  { path: '/foodarticle/:articleId', name: 'Food Article', element: FoodArticle },

  // { path: '/newarticle', name: 'New Article', element: NewArticle },
  // { path: '/editor', name: 'Article Editor', element: ArticleEditor },
  // { path: '/editor/:articleId', name: 'Article Editor', element: ArticleEditor },

  // { path: '/foodarticleposted', name: 'Food Article Posted', element: FoodArticlePosted },

  { path: '/userinfo', name: 'User Info', element: UserInfo },
  { path: '/userinfo/edit', name: 'User Info Edit', element: UserInfoEdit },
  { path: '/userarticle', name: 'User Article', element: UserArticle },

  { path: '/login', name: 'Login', element: Login },
  { path: '/register', name: 'Register', element: Register },
  // { path: '/oauth/signin', name: 'OauthSignIn', element: OauthSignIn },
  // { path: '/oauth/signup', name: 'OauthSignUp', element: OauthSignUp },
  { path: '/newpw', name: 'New Pw', element: NewPw },
]

export default routes