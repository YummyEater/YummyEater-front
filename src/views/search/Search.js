import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { call } from '../../service/ApiService'
import { SearchHeader, ArticleList } from './SearchComponents'
import { CircularProgress } from '@mui/material'

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searched, setSearched] = useState({});

  let apiURL = `/api/food`;
  let paramString = searchParams.toString();
  if (paramString.length > 0) { apiURL = `${apiURL}?${paramString}` }

  const [selectedSort, setSelectedSort] = useState(searchParams.get('sort') || 'createdAt,desc');
  const [selectedPage, setSelectedPage] = useState();

  useEffect(() => {
    call(apiURL, "GET", null)
      .then((response) => {
        setSearched({
          sResponse: response, sTitle: searchParams.get('title'), sType: searchParams.get('type'),
          sCate: searchParams.getAll('categories'), sIngred: searchParams.getAll('ingredient'),
          sTag: searchParams.getAll('tags'), sNutrient: searchParams.getAll('nutrient'), sUrl: apiURL
        })
        setSelectedPage(response.number + 1)
      })
  }, [searchParams, apiURL])

  // food article 이동
  const [selectedArticle, setSelectedArticle] = useState(-1);
  const navigate = useNavigate();
  const mounted2 = useRef(false);
  useEffect(() => {
    if (!mounted2.current) { mounted2.current = true; }
    else if (selectedArticle >= 0) { navigate(`/foodarticle/${selectedArticle}`); }
  }, [selectedArticle, navigate]);

  return (
    <div className='flex flex-col'>
      <SearchHeader searched={searched} sort={selectedSort} apiURL={apiURL} path='/search'
        setSort={setSelectedSort} setPage={setSelectedPage} params={searchParams} setParams={setSearchParams} />
      <div className='flex w-[800px] pt-[16px] pb-[75px] justify-center max-[850px]:w-full'>
        {
          Object.keys(searched).length === 0
            ? <CircularProgress className='text-primary-orange' />
            : <ArticleList data={searched.sResponse} setSelectedArticle={setSelectedArticle} setSelectedPage={setSelectedPage}
              selectedPage={selectedPage} selectedSort={selectedSort} params={searchParams} path='/search' />

        }
      </div>
    </div>
  )
}
export default Search