import React, { useState, useEffect } from 'react'
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
  const typeTag = ['배달', '요리', '완제품']

  // const foodTag = ['한식', '양식', '중식', '일식', '매콤', '달콤', 'A', 'B', 'C','한식', '양식', '중식', '일식', '매콤', '달콤', 'A', 'B', 'C','한식', '양식', '중식', '일식', '매콤', '달콤', 'A', 'B', 'C']
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
  console.log({selectedType})

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  }

  // 태그 선택
  const [selectedTags, setSelectedTags] = useState([])
  console.log({selectedTags})

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
  const [keyword, setKeyword] = useState('')

  // const onClickBtn = () => {
  //   alert('selectedType: ' + JSON.stringify({selectedType}) + ' | ' + 'selectedTags: ' + JSON.stringify({selectedTags}))
  // }

  const handleSubmit = (event) => {
    event.preventDefault()
    alert('selectedType: ' + JSON.stringify({selectedType}) + ' | ' + 'selectedTags: ' + JSON.stringify({selectedTags}) + ' | ' + 'keyword: ' + JSON.stringify(({keyword})))
    // 선택 초기화
    setSelectedType('')
    setSelectedTags([])
    setKeyword('')
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
                      // <CFormCheck button={{color:'secondary', variant:'outline'}} className="mx-2 px-5" type="radio" name="type-tag" id={item} key={index} label={item} checked={bChecked} onChange={(e)=> checkHandler(e)}></CFormCheck>
                      // <CFormCheck button={{color:'secondary', variant:'outline'}} className="mx-2 px-5" type="radio" name="type-tag" value={item} key={index} label={item} checked={selectedType.includes({item})} onChange={handleTypeChange}></CFormCheck>
                      
                      // <CFormCheck className="mx-2 px-5" type="radio" name="type-tag" value={item} id={item} key={index} label={item} checked={selectedType.includes({item})} onChange={handleTypeChange}></CFormCheck>
                      <CFormCheck button={{color:'secondary', variant:'outline'}} type="radio" name="type-tag" value={item} id={item} key={index} label={item} checked={selectedType.includes({item})} onChange={handleTypeChange}></CFormCheck>
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
                  // <CFormCheck button={{color:'secondary', variant:'outline', shape:"rounded-pill"}} key={index} label={item} value={item} checked={selectedTags.includes({item})} onChange={handleTagChange}></CFormCheck>
                    // <CFormCheck button={{color:'secondary', variant:'outline', shape:"rounded-pill"}} id={item} key={index} label={item} value={item} checked={selectedTags.includes({item})} onChange={handleTagChange}></CFormCheck>
                    <CFormCheck button={{color:'secondary', variant:'outline', shape:"rounded-pill"}} id={item} key={index} label={item} value={item} checked={selectedTags.includes({item})} onChange={handleTagChange}></CFormCheck>
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
                    <CFormCheck button={{color:'secondary', variant:'outline', shape:"rounded-pill"}} id={item} key={index} label={item} value={item} checked={selectedIngredients.includes({item})} onChange={handleIngredientChange}></CFormCheck>
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
