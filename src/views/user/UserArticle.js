import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { call, getUserinfo } from '../../service/ApiService'
import { ContentHeader } from '../../components'
import { TypeLabel, FormatDate } from '../../service/Functions'
import {
  Pagination, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow,
  TablePagination, Paper, ThemeProvider
} from '@mui/material'
import { tableTheme } from '../../themes'

const UserArticle = () => {
  const [userinfo, setUserinfo] = useState({})
  useEffect(() => {
    getUserinfo(setUserinfo);
  }, [])

  const [articles, setArticles] = useState({})
  console.log(articles)
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    // searchParams.set('userId', userinfo.id);
    const sPage = searchParams.get('page') || 0
    if (Object.keys(userinfo).length !== 0 && userinfo.id !== undefined) {
      call(`/api/food?userId=${userinfo.id}&page=${sPage}&size=10&sort=createdAt,desc`, "GET", null)
        .then((response) => {
          setArticles(response);
        })
    }
  }, [userinfo])

  // food article 이동
  const [selectedArticle, setSelectedArticle] = useState(-1);
  const navigate = useNavigate();
  const mounted2 = useRef(false);

  const handleClick = (e) => {
    console.log(e.currentTarget)
    setSelectedArticle(e.currentTarget.id);
  }
  useEffect(() => {
    if (!mounted2.current) {
      mounted2.current = true;
    } else if (selectedArticle >= 0) {
      navigate(`/foodarticle/${selectedArticle}`);
    }
  }, [selectedArticle]);

  // 페이징
  const [selectedPage, setSelectedPage] = useState(1);
  const mounted3 = useRef(false);
  const handlePage = (e, pg) => {
    searchParams.set('userId', userinfo.id);
    searchParams.set('page', pg - 1);
    console.log(searchParams.toString())
    setSelectedPage(pg);
    navigate({ pathname: '/userarticle', search: searchParams.toString() });
    window.scrollTo(0, 0);
  }
  useEffect(() => {
    const sPage = searchParams.get('page') || 0
    if (!mounted3.current) {
      mounted3.current = true;
    } else {
      call(`/api/food?userId=${userinfo.id}&page=${sPage}&size=10&sort=createdAt,desc`, "GET", null)
        .then((response) => {
          setArticles(response)
          setSelectedPage(response.number + 1)
        })
    }
  }, [searchParams])

  return (
    <div className='w-full max-w-[780px] container1'>
      <ContentHeader title='작성 게시물' pb='30px'/>
      <div className='flex flex-col justify-center items-center gap-[25px] mx-[40px]'>
        {
          Object.keys(articles).length === 0
            ? <></>
            : <>
              <div className='flex flex-row self-end gap-[2px] select-none'>
                총<span className='font-semibold text-point-orange'>{articles.totalElements}</span>건
              </div>
              <ArticleTable articles={articles.content} handleClick={handleClick} page={selectedPage ?? 0} />
              <Pagination size="small" count={articles.totalPages} page={selectedPage ?? 0} onChange={handlePage} />
            </>
        }
      </div>
    </div>
  )
}

const ArticleTable = (props) => {
  return (
    <ThemeProvider theme={tableTheme}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" className='min-w-[75px] ps-[10px]'>번호</TableCell>
              <TableCell align="center" className='min-w-[65px]'>분류</TableCell>
              <TableCell align="left" className='min-w-[245px]'>제목</TableCell>
              <TableCell align="center" className='min-w-[115px]'>작성일</TableCell>
              <TableCell align="center" className='min-w-[115px]'>최종수정일</TableCell>
              <TableCell align="center" className='min-w-[85px] pe-[10px]'>조회수</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.articles.map((article, idx) => (
              <TableRow key={`row-${idx}`}>
                <TableCell component="th" scope="row" align="center" className='ps-[10px] pe-[15px]'>{(props.page - 1) * 10 + idx + 1}</TableCell>
                <TableCell align="center">{TypeLabel(article.type)}</TableCell>
                <TableCell align="left" onClick={props.handleClick} id={article.id} className='max-w-[230px] truncate cursor-pointer'>
                  {article.title}</TableCell>
                <TableCell align="center">{FormatDate(article.createdAt, 0)}</TableCell>
                <TableCell align="center">{FormatDate(article.lastModifiedAt, 0)}</TableCell>
                <TableCell align="center">{article.views}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>

  )

}

export default UserArticle;