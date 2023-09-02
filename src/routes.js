import React from 'react'

const Main = React.lazy(() => import('./views/main/Main'))

const Search = React.lazy(() => import('./views/search/Search'))
const SearchUser = React.lazy(() => import('./views/search/SearchUser'))

const FoodArticle = React.lazy(() => import('./views/foodarticle/FoodArticle'))
const Editor = React.lazy(() => import('./views/editor/Editor'))

const UserInfo = React.lazy(() => import('./views/user/UserInfo'))
const UserInfoEdit = React.lazy(() => import('./views/user/UserInfoEdit'))
const UserArticle = React.lazy(() => import('./views/user/UserArticle'))

const Register = React.lazy(() => import('./views/auth/register/Register'))
const NewPw = React.lazy(() => import('./views/auth/newpw/NewPw'))


const routes = [
  { path: '/', name: 'Main', element: Main },
  { path: '/search', name: 'Search', element: Search },
  { path: '/search/user', name: 'User Search', element: SearchUser },

  { path: '/foodarticle/:articleId', name: 'Food Article', element: FoodArticle },

  { path: '/editor', name: 'Editor', element: Editor },
  { path: '/editor/:articleId', name: 'Editor', element: Editor },

  { path: '/userinfo', name: 'User Info', element: UserInfo },
  { path: '/userinfo/edit', name: 'User Info Edit', element: UserInfoEdit },
  { path: '/userarticle', name: 'User Article', element: UserArticle },

  { path: '/register', name: 'Register', element: Register },
  { path: '/newpw', name: 'New Pw', element: NewPw },
]

export default routes