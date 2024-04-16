import React, { useEffect, useState, useRef, } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { call, callH, uploadImg, getUserinfo } from '../../service/ApiService'
import { nutrientInfo, nutrientUnit } from '../../service/Functions'
import { FoodType, FoodCategory } from '../../components/Common'
import { TitleLabel, InputIngredient, InputTag, InputThumb } from './EditorComponents'
import { editorInputTheme, uploadButtonTheme } from '../../themes'
import {
  ThemeProvider, CircularProgress, TextField, Divider, Button, Collapse,
  FormControl, InputLabel, OutlinedInput, InputAdornment,
} from '@mui/material'

// for tui editor
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

const ArticleEditor = () => {
  const params = useParams();
  const [userinfo, setUserinfo] = useState({});
  const foodId = params.articleId;
  const [foodData, setFoodData] = useState({});
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [editorFilled, setEditorFilled] = useState(false);
  const [thumbImg, setThumbImg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (foodId !== undefined) {
      getUserinfo(setUserinfo);
      const fdUrl = `/api/food/${foodId}`;
      call(fdUrl, "GET", null)
        .then((response) => {
          setFoodData(response.data);
        })
    }
  }, [foodId])

  const [initialImgList, setInitialImgList] = useState([]);
  const getImgList = (thumbImg) => {
    const imgList = [];
    const imgElements = Array.from(document.getElementsByClassName('toastui-editor-contents')[0].getElementsByTagName('img'));
    if (imgElements.length > 0) {
      imgElements.forEach(image => {
        // if (image.currentSrc !== "") { imgList.push(image.currentSrc) }
        if (image.src !== "") { imgList.push(image.src) }
      })
    }
    // 리스트에 대표 이미지 추가
    if (thumbImg && thumbImg !== undefined && thumbImg !== '') {
      imgList.push(thumbImg)
    }
    return imgList;
  }

  const mounted2 = useRef(false);
  useEffect(() => {
    if (!mounted2.current) { mounted2.current = true; }
    else if (Object.keys(foodData).length !== 0) {
      if (userinfo.id !== foodData.userId) {
        alert('본인이 작성한 게시글만 수정 가능합니다.')
        navigate(`/foodarticle/${foodId}`)
      } else {
        setSelectedType(foodData.type)
        setSelectedCategories(foodData.categories)
        setTags(foodData.tags)
        const initIngred = foodData.ingredient.split(',')
        // 현재 테스트 데이터는 ',' 로 분리되어있어 다음과 같이 처리
        setIngredients((initIngred.length === 1 && initIngred[0] === '') ? [] : initIngred)
        editorRef.current.getInstance().setMarkdown(foodData.content)
        setEditorFilled(true)
        setThumbImg(foodData.imgUrl)
      }
    }
  }, [foodData, foodId, navigate, userinfo.id]);

  const mounted3 = useRef(false);
  useEffect(() => {
    if (!mounted3.current) { mounted3.current = true; }
    else if (editorFilled) {
      const imgSrcs = getImgList(thumbImg);
      setInitialImgList(imgSrcs)
    }
  }, [editorFilled])

  // 등록 요청
  const [articleData, setArticleData] = useState({});
  const editorRef = useRef();
  const thumbRef = useRef(null);
  const editorColRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const imgSrcs = getImgList(thumbImg);
    const data = new FormData(e.target);
    // - 기존 resourceUrlList와 비교해 다른 경우에만 변경
    setArticleData({
      'title': data.get("inputTitle"),
      'type': selectedType,
      'servings': data.get("inputServings"),
      'amount': data.get("inputAmount"),
      'ingredient': ingredients.join(),
      'price': data.get("inputPrice"),
      'maker': data.get("inputMaker"),
      'imgUrl': thumbImg,
      'categories': selectedCategories,
      'tags': tags,
      'nutrient': {
        'calorie': data.get("calorie"), 'carbohydrate': data.get("carbohydrate"),
        'dietaryFiber': data.get("dietaryFiber"), 'sugars': data.get("sugars"),
        'protein': data.get("protein"), 'fat': data.get("fat"),
        'saturatedFat': data.get("saturatedFat"), 'unsaturatedFat': data.get("unsaturatedFat"),
        'natrium': data.get("natrium")
      },
      'content': editorRef.current.getInstance().getMarkdown(),
      'resourceURLList': (foodId && (JSON.stringify(imgSrcs) === JSON.stringify(initialImgList))) ? null : imgSrcs
    })
  }

  const mounted1 = useRef(false);
  useEffect(() => {
    if (!mounted1.current) { mounted1.current = true; }
    else {
      const method = foodId ? "PATCH" : "POST"
      const apiUrl = foodId ? `/api/food/${foodId}` : `/api/food`
      callH(apiUrl, method, articleData)
        .then((response) => {
          if (response.errorCode === 'C00000') {
            alert(foodId ? '게시물이 성공적으로 수정되었습니다.' : '게시물이 성공적으로 등록되었습니다.')
            navigate(foodId ? `/foodarticle/${foodId}` : `/foodarticle/${response.data.id}`);
          }
        })
        .catch((error) => { alert(foodId ? '게시물 수정을 실패했습니다.' : '게시물 등록을 실패했습니다.') })
    }
  }, [articleData, foodId, navigate]);

  // toast editor 이미지 첨부
  const onUploadImage = async (blob, callback) => {
    await uploadImg(blob)
      .then((response) => {
        console.log(response)
        callback(response.data.resourceURL, response.data.resourceKey);
      })
      .catch((err) => { callback('image_load_fail'); })
  }

  const inputtitle = 'self-start pt-[3.5px] w-[122px] max-[800px]:w-full'
  const itemwrap = 'flex flex-row flex-wrap items-center max-[800px]:w-full max-[800px]:gap-[5px] pb-[15px]'
  return (
    <div className='flex max-w-[800px] w-full max-[800px]:px-[20px] pt-[65px] pb-[100px] justify-center'>
      {
        (foodId && Object.keys(foodData).length === 0)
          ? <CircularProgress className='text-primary-orange' />
          : <form className='flex flex-col' onSubmit={handleSubmit}>
            <div className='flex flex-col px-[25px] pb-[30px]'>
              <div className={itemwrap}>
                <TitleLabel label='제목' req={1} />
                <ThemeProvider theme={editorInputTheme}>
                  <TextField variant="outlined" placeholder='제목 입력' name='inputTitle' id='inputTitle' defaultValue={foodId ? foodData.title : ''}
                     className='w-[450px] max-[800px]:w-full max-[800px]:max-w-[450px]' required />
                </ThemeProvider>
              </div>
              <div className={itemwrap}>
                <TitleLabel label='분류' req={1} />
                <FoodType selectedType={selectedType} setSelectedType={setSelectedType} rq={true} />
              </div>
              <div className='mx-[12.5px]'><Divider /></div>
              <div className={itemwrap + ' pt-[15px]'}>
                <div className={inputtitle}><TitleLabel label='카테고리' req={0} /></div>
                <FoodCategory selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
              </div>

              <div className='mx-[12.5px]'><Divider /></div>
              <div className={itemwrap + ' pt-[15px]'}>
                <TitleLabel label='가격' req={0} />
                <ThemeProvider theme={editorInputTheme}>
                  <TextField className='w-[150px]' variant="outlined" placeholder='가격 입력' name='inputPrice' id='inputPrice'
                    type="number" defaultValue={foodId ? foodData.price : ''} onWheel={e => e.target.blur()} />
                </ThemeProvider>
                <span className='ps-[10px] text-[14px]'>원</span>
              </div>

              <Collapse in={selectedType === 'RECIPE'} timeout={0}>
                <div className={itemwrap}>
                  <TitleLabel label='인원' req={0} />
                  <ThemeProvider theme={editorInputTheme}>
                    <TextField className='w-[125px]' variant="outlined" placeholder='인원 수 입력' name='inputServings' id='inputServings'
                      type="number" defaultValue={foodId ? foodData.servings : ''} onWheel={e => e.target.blur()} />
                  </ThemeProvider>
                  <span className='ps-[10px] text-[14px]'>인분</span>
                </div>
                <div className={itemwrap}>
                  <div className={inputtitle}><TitleLabel label='재료' req={0} /></div>
                  <InputIngredient setTargets={setIngredients} targets={ingredients} />
                </div>
              </Collapse>

              <Collapse in={selectedType === 'PRODUCT'} timeout={0}>
                <div className={itemwrap}>
                  <TitleLabel label='중량' req={0} />
                  <ThemeProvider theme={editorInputTheme}>
                    <TextField className='w-[150px]' variant="outlined" placeholder='단품별 용량 입력' name='inputAmount' id='inputAmount'
                      type="number" defaultValue={foodId ? foodData.amount : ''} onWheel={e => e.target.blur()} />
                  </ThemeProvider>
                  <span className='ps-[10px] text-[14px]'>g</span>
                </div>
                <div className={itemwrap}>
                  <TitleLabel label='판매사' req={0} />
                  <ThemeProvider theme={editorInputTheme}>
                    <TextField className='w-[172px]' variant="outlined" placeholder='제조사 및 판매사 입력' name='inputMaker' id='inputMaker'
                      defaultValue={foodId ? foodData.maker : ''} />
                  </ThemeProvider>
                </div>
              </Collapse>

              <div className='mx-[12.5px]'><Divider /></div>
              <div className={itemwrap + ' pt-[15px]'}>
                <div className={inputtitle}><TitleLabel label='영양정보' req={0} /></div>
                <div className='flex max-[800px]:w-full max-[800px]:justify-center'>
                  <div className='grid grid-cols-3 max-[800px]:grid-cols-[150px_150px] max-[800px]:w-full max-[800px]:justify-evenly gap-x-[45px] gap-y-[10px]'>
                    {
                      nutrientInfo(foodId ? foodData.nutrient : null).map((item, idx) => (
                        <FormControl key={`nutrient-${idx}`}>
                          <ThemeProvider theme={editorInputTheme}>
                            <InputLabel htmlFor={item.value}>{item.label}</InputLabel>
                            <OutlinedInput className='w-[150px]' variant="outlined" name={item.value} id={item.value}
                              type='number' onWheel={e => e.target.blur()} step="0.00001"
                              defaultValue={foodId && item.var !== null && item.var !== "" && item.var !== undefined ? item.var : ''}
                              endAdornment={<InputAdornment position="end">{nutrientUnit(item.value)}</InputAdornment>} />
                          </ThemeProvider>
                        </FormControl>
                      ))
                    }
                  </div>
                </div>
              </div>
              <div className='mx-[12.5px]'><Divider /></div>
              <div className={itemwrap + ' pt-[15px]'}>
                <div className={inputtitle}><TitleLabel label='대표 이미지' req={0} /></div>
                <InputThumb thumbRef={thumbRef} thumbImg={thumbImg} setThumbImg={setThumbImg} />
              </div>
            </div>

            <div className='max-w-[800px] w-full' ref={editorColRef}>
              <Editor
                previewStyle='vertical' height='500px' initialEditType='wysiwyg' useCommandShortcut={false} plugins={[colorSyntax]}
                language="ko-KR" hideModeSwitch={true} autofocus={false} ref={editorRef} hooks={{ addImageBlobHook: onUploadImage }}
                toolbarItems={[['heading', 'bold', 'italic', 'strike'], ['hr', 'quote'],
                ['ul', 'ol', 'task', 'indent', 'outdent'], ['image', 'link'],]}>
              </Editor>
            </div>

            <div className='flex flex-row flex-wrap items-center max-[800px]:w-full max-[800px]:gap-[5px] px-[25px] py-[30px]'>
              <div className={inputtitle}><TitleLabel label='태그' req={0} /></div>
              <InputTag setTargets={setTags} targets={tags} />
            </div>
            <ThemeProvider theme={uploadButtonTheme}>
              <Button type='submit' className='self-end'>등록</Button>
            </ThemeProvider>
          </form>
      }
    </div>
  )
}

export default ArticleEditor;