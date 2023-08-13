import React, { useState, useEffect } from 'react'
import { call } from './ApiService';

export const FormatDate = (dateStr, type) => {
  const dateD = new Date(dateStr);
  let date, month, year, time;
  date = dateD.getDate();
  month = dateD.getMonth() + 1;
  year = dateD.getFullYear();
  time = dateD.toLocaleTimeString("ko-KR", { hour: "numeric", minute: "numeric" });

  date = date.toString().padStart(2, '0');
  month = month.toString().padStart(2, '0');

  if (type === 0) {
    return `${year}.${month}.${date}`;
  } else if (type === 1) {
    return `${year}.${month}.${date} ${time}`;
  } else if (type === 2) {
    return `${year}년 ${month}월 ${date}일`;
  } else if (type === 3) {
    return `${year.toString().slice(2)}.${month}.${date}`;
  }
}

// 회원정보 처리
// - 닉네임 확인
export const handleUsrname = (usrname, setUsrname, setUsrnameChecked) => {
  const usrnameRegEx = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{3,}$/
  if (usrnameRegEx.test(usrname)) {
    const apiURL = `/api/user/join/isDuplicateUserName?userName=${usrname}`
    call(apiURL, "GET", null)
      .then(
        (response) => {
          if (response.data.duplicated) {
            setUsrname({ 'entered': true, 'unique': false, 'formatted': true })
            setUsrnameChecked({ 'checked': true, 'confirmed': false });
          } else {
            setUsrname({ 'entered': true, 'unique': true, 'formatted': true })
            setUsrnameChecked({ 'checked': true, 'confirmed': true });
          }
        }
      )
  } else {
    setUsrname({ 'entered': true, 'unique': false, 'formatted': false })
    setUsrnameChecked({ 'checked': true, 'confirmed': false });
  }
}

// - 비밀번호 일치 확인
export const handlePw = (pw1, pw2, setPwMatch) => {
  const passwordRegEx = /^[A-Za-z0-9`~!@#$%^&*()-_=+\|[\]{};:'",.<>/?]{8,20}$/
  if (passwordRegEx.test(pw1)) {
    if (pw2 != '') {
      if (pw1 === pw2) { setPwMatch({ 'entered1': true, 'entered2': true, 'matched': true, 'formatted': true }); }
      else { setPwMatch({ 'entered1': true, 'entered2': true, 'matched': false, 'formatted': true }); }
    } else {
      setPwMatch({ 'entered1': true, 'entered2': false, 'matched': false, 'formatted': true })
    }
  } else {
    setPwMatch({ 'entered1': true, 'entered2': false, 'matched': false, 'formatted': false });
  }
}

export const handleTagClick = (nav, type, tag) => {
  nav(`/searchresult?type=${type}&tags=${tag}`);
}
export const handleCategoryClick = (nav, type, cate) => {
  nav(`/searchresult?type=${type}&categories=${cate}`);
}

// 분류
export const typeTag = [
  { label: '요리', value: 'RECIPE' },
  { label: '완제품', value: 'PRODUCT' },
]

export const TypeLabel = (searchedType) => {
  const type = typeTag.find(obj => { return obj.value === searchedType })
  return type.label
}

// 영양정보
export const nutrientInfo = (nutrient) => {
  return (nutrient !== null)
    ? [
      { label: '칼로리', value: 'calorie', var: nutrient.calorie },
      { label: '탄수화물', value: 'carbohydrate', var: nutrient.carbohydrate },
      { label: '식이섬유', value: 'dietaryFiber', var: nutrient.dietaryFiber },
      { label: '당류', value: 'sugars', var: nutrient.sugars },
      { label: '단백질', value: 'protein', var: nutrient.protein },
      { label: '지방', value: 'fat', var: nutrient.fat },
      { label: '포화지방', value: 'saturatedFat', var: nutrient.saturatedFat },
      { label: '불포화지방', value: 'unsaturatedFat', var: nutrient.unsaturatedFat },
      { label: '나트륨', value: 'natrium', var: nutrient.natrium },
    ]
    : [
      { label: '칼로리', value: 'calorie' },
      { label: '탄수화물', value: 'carbohydrate' },
      { label: '식이섬유', value: 'dietaryFiber' },
      { label: '당류', value: 'sugars' },
      { label: '단백질', value: 'protein' },
      { label: '지방', value: 'fat' },
      { label: '포화지방', value: 'saturatedFat' },
      { label: '불포화지방', value: 'unsaturatedFat' },
      { label: '나트륨', value: 'natrium' },
    ]
}

export const nutrientUnit = (nutrient) => {
  if (nutrient === '') { return '' } 
  else if (nutrient === 'calorie') { return 'kcal' }
  else if (nutrient === 'natrium') { return 'mg' } 
  else { return 'g' }
}

export const nutrientText = (data) => {
  const dataArray = data.split('_')
  const nutrient = nutrientInfo(null).find((n) => n.value === dataArray[0]);
  const nutrientT = nutrient.label;
  
  const unitT = nutrientUnit(nutrient.value)
  const compareT = dataArray[1] === 'greater' ? '이상' : '이하'
  
  return(`${nutrientT} ${dataArray[2]}${unitT} ${compareT}`)
}

export const handleUsrnameChange = (usrnameChecked, setUsrnameChecked) => {
  if (usrnameChecked.checked === true) {
    setUsrnameChecked({ 'checked': false, 'confirmed': false });
  }
}

export const usrCheck = (usrnameRef, setUsrname, setUsrnameChecked) => {
  if (usrnameRef.current.value !== '') {
    handleUsrname(usrnameRef.current.value, setUsrname, setUsrnameChecked);
  }
}