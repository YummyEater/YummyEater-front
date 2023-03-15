import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { call } from 'src/service/ApiService'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CFormInput,
  CFormCheck,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilMagnifyingGlass,
} from '@coreui/icons'

const Dashboard = () => {
  const typeTag = [
    {label:'배달', value:'DELIVERY'},
    {label:'요리', value:'RECIPE'},
    {label:'완제품', value:'PRODUCT'},
  ]

  const [foodTag, setFoodTag] = useState([]);
  // 태그 받아오기
  useEffect(() => {
    call("/api/tag", "GET", null)
    .then(
      response => setFoodTag(response.data.map((x) => x.name))
    )
  }, [])
  
  // 분류 선택
  const [selectedType, setSelectedType] = useState('')

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  }

  // 태그 선택
  const [selectedTags, setSelectedTags] = useState([])

  const handleTagChange = (event) => {
    const index = selectedTags.indexOf(event.target.value)
    if (index === -1) {
      setSelectedTags([...selectedTags, event.target.value])
    } else {
      setSelectedTags(selectedTags.filter((selectedTags)=> selectedTags !== event.target.value))
    }
  }

  // 재료 선택
  const ingredients = ['돼지고기', '닭고기', '소고기', '고춧가루', '소금', '후추']

  const [selectedIngredients, setSelectedIngredients] = useState([])
  console.log({selectedIngredients})

  const handleIngredientChange = (event) => {
    const index = selectedIngredients.indexOf(event.target.value)
    if (index === -1) {
      setSelectedIngredients([...selectedIngredients, event.target.value])
    } else {
      setSelectedIngredients(selectedIngredients.filter((selectedIngredients)=> selectedIngredients !== event.target.value))
    }
  }

  // 키워드 검색
  const [keyword, setKeyword] = useState('');

  // 검색 버튼 클릭
  const [searchResponse, setSearchResponse] = useState({});
  const mounted = useRef(false);
  useEffect(() => {
    if(!mounted.current){
      mounted.current = true;
    } else {
      // console.log(searchResponse);
      navigate('/searchresult', { state: searchResponse});
    }
  }, [searchResponse]);

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault()
    // alert('selectedType: ' + JSON.stringify({selectedType}) + ' | ' + 'selectedTags: ' + JSON.stringify({selectedTags}) + ' | ' + 'keyword: ' + JSON.stringify(({keyword})))
    // // 선택 초기화
    // setSelectedType('')
    // setSelectedTags([])
    // setKeyword('')

    let apiURL = `/api/food?type=${selectedType}`;

    if (keyword.length > 0) {
      apiURL = `${apiURL}&name=${keyword}`
    }

    if (selectedTags.length > 0) {
      apiURL = `${apiURL}${selectedTags.map((item) => (
        `&tags=${item}`
      )).join('')}`;
    }

    // alert(apiURL);

    call(apiURL, "GET", null)
    .then(
      (response) => {
        const searchOption = {
          sResponse: response, 
          sType: selectedType,
          sTags: selectedTags,
          sUrl: apiURL
        }
        setSearchResponse(searchOption);
        // setSearchResponse(response);
        // console.log(searchResponse);
        // navigate('/searchresult', { state: searchResponse});
      }
    )
    // .then(
    //   () => {
    //     console.log(searchResponse);
    //     navigate('/searchresult', { state: searchResponse});
    //   }
    // )

    // alert(searchResponse);
    // navigate('/searchresult', { state: searchResponse})
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CRow className="justify-content-center mt-5">
          <CCol md={9}>
            <CCard className="my-4">
              
              <CCardBody>
                <CRow className="justify-content-center mx-2 align-items-center">
                  <CCol className="col-auto">
                    <h4 id="traffic" className="card-title mb-0">
                      분류 선택
                    </h4>
                  </CCol>
                  <CCol className="me-auto d-grid gap-3 d-md-flex" xs="auto">
                    {typeTag.map((item, index)=> (
                      <CFormCheck button={{color:'secondary', variant:'outline'}} type="radio" name="type-tag" value={item.value} id={item.value} key={index} label={item.label} checked={selectedType.includes(item.value)} onChange={handleTypeChange}></CFormCheck>
                    ))}
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <CRow className="justify-content-center">
          <CCol md={9}>
            <CInputGroup className="input-prepend" size="lg">
              <CInputGroupText>
                <CIcon icon={cilMagnifyingGlass} />
              </CInputGroupText>
              <CFormInput type="text" placeholder="메뉴 이름 직접 검색" onChange={(event)=> setKeyword(event.target.value)}/>
              <CButton color="info" className="px-4" type="submit">검색</CButton>
            </CInputGroup>
          </CCol>
        </CRow>

        <CRow className="justify-content-center">
          <CCol md={9}>
            <CCard className="mt-4">
              <CCardBody>
                <CCol className='d-flex gap-2 flex-wrap justify-content-center'>
                  {foodTag.map((item, index)=> (
                    <CFormCheck button={{color:'secondary', variant:'outline', shape:"rounded-pill"}} id={item} key={index} label={item} value={item} checked={selectedTags.includes(item)} onChange={handleTagChange}></CFormCheck>
                  ))}
                </CCol>
                
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <CRow className="justify-content-center">
          <CCol md={9}>
            <CCard className="my-4">
              <CCardBody>
                <CCol className='d-flex gap-2 flex-wrap justify-content-center'>
                  {ingredients.map((item, index)=> (
                    <CFormCheck button={{color:'secondary', variant:'outline', shape:"rounded-pill"}} id={item} key={index} label={item} value={item} checked={selectedIngredients.includes(item)} onChange={handleIngredientChange}></CFormCheck>
                  ))}
                </CCol>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </form>
    </>
  )
}

export default Dashboard
