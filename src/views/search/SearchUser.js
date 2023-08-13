import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { call } from '../../service/ApiService'
import { UserSearchHeader, ArticleList } from './SearchComponents'
import { CircularProgress } from '@mui/material'

const SearchUser = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const apiURL = `/api/food?${searchParams.toString()}`;

  const [searched, setSearched] = useState({});
  const [selectedSort, setSelectedSort] = useState(searchParams.get('sort') || 'createdAt,desc');
  const [selectedPage, setSelectedPage] = useState({});

  useEffect(() => {
    call(apiURL, "GET", null)
      .then((response) => {
        console.log(response);
        setSearched({ sResponse: response, sUrl: apiURL })
        setSelectedPage(response.number + 1)
      })
  }, [searchParams])

  const [selectedArticle, setSelectedArticle] = useState(-1);
  const navigate = useNavigate();
  const mounted2 = useRef(false);
  useEffect(() => {
    if (!mounted2.current) { mounted2.current = true; }
    else if (selectedArticle >= 0) { navigate(`/foodarticle/${selectedArticle}`); }
  }, [selectedArticle]);

  return (
    <div className='flex flex-col'>
      <UserSearchHeader searched={searched} sort={selectedSort} apiURL={apiURL} path='/search/user'
        setSort={setSelectedSort} setPage={setSelectedPage} params={searchParams} />
      <div className='flex w-[800px] pt-[16px] pb-[75px] justify-center'>
        {
          Object.keys(searched).length === 0
            ? <CircularProgress className='text-primary-orange' />
            : <ArticleList data={searched.sResponse} setSelectedArticle={setSelectedArticle} setSelectedPage={setSelectedPage}
              selectedPage={selectedPage} selectedSort={selectedSort} params={searchParams} path='/search/user' />

        }
      </div>
    </div>
  )

}

export default SearchUser;