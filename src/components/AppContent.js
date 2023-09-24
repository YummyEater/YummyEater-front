import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CircularProgress } from '@mui/material';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Main = React.lazy(() => import('../views/main/Main'))
const Search = React.lazy(() => import('../views/search/Search'))
const SearchUser = React.lazy(() => import('../views/search/SearchUser'))
const FoodArticle = React.lazy(() => import('../views/foodarticle/FoodArticle'))
const Editor = React.lazy(() => import('../views/editor/Editor'))
const UserInfo = React.lazy(() => import('../views/user/UserInfo'))
const UserInfoEdit = React.lazy(() => import('../views/user/UserInfoEdit'))
const UserArticle = React.lazy(() => import('../views/user/UserArticle'))
const Register = React.lazy(() => import('../views/auth/register/Register'))
const NewPw = React.lazy(() => import('../views/auth/newpw/NewPw'))

const AppContent = ({logged, component:Component}) => {
  if (Component) {
    return (
      <PublicRoute logged={logged} component={Component} />
    )
  }
  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route exact path="/" name="Main" element={<Main />} />
        <Route exact path="/search" name="검색" element={<Search />} />
        <Route exact path="/search/user" name="작성자 검색" element={<SearchUser />} />
        <Route exact path="/foodarticle/:articleId" name="게시물" element={<FoodArticle />} />

        <Route exact path="/editor" name="Editor" element={<PrivateRoute logged={logged} component={<Editor />} />} />
        <Route exact path="/editor/:articleId" name="Editor" element={<PrivateRoute logged={logged} component={<Editor />} />} />
        <Route exact path="/userinfo" name="회원정보" element={<PrivateRoute logged={logged} component={<UserInfo />} />} />
        <Route exact path="/userinfo/edit" name="회원정보 변경" element={<PrivateRoute logged={logged} component={<UserInfoEdit />} />} />
        <Route exact path="/userarticle" name="작성 게시물" element={<PrivateRoute logged={logged} component={<UserArticle />} />} />

        <Route exact path="/register" name="가입" element={<PublicRoute logged={logged} component={<Register />} />} />
        <Route exact path="/newpw" name="비밀번호 찾기" element={<PublicRoute logged={logged} component={<NewPw />} />} />

        <Route path="/" element={<Navigate to="" replace />} />
      </Routes>
    </Suspense>
  )
}

export default React.memo(AppContent)
