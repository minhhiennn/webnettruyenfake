import './HomePage.scss';
import HistoryReader from '../commons/HistoryReader/HistoryReader';
import RecommenedComics from '../commons/RecommendedComics/RecommendedComics';
import HomePagination from '../commons/HomePagination/HomePagination';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

//funciton
import {
  getRecommendItems,
  getComicsPerPage,
  getPagination,
} from '../../helpers/ParseFunction';
import ScrollToTop from '../../helpers/ScrollToTop';

export default function HomePage() {
  let [searchParams] = useSearchParams();

  let navigate = useNavigate();

  const [recommendedComics, setRecommendedComics] = useState([]);

  const [listComics, setListComics] = useState([]);

  const [listPagination, setListPagination] = useState([]);

  useEffect(() => {
    async function getData() {
      let url = '';
      if (searchParams.has('page')) {
        url = `${process.env.REACT_APP_LINK}/?page=${searchParams.get('page')}`;
      } else {
        url = `${process.env.REACT_APP_LINK}/?page=1`;
      }
      let res = await axios
        .get(`${process.env.REACT_APP_LINK_BE}/api/getHtmlByPage`, {
          params: { url: url },
        })
        .catch(() => {
          alert('loi gi roi bay oi');
        });
      if (res) {
        setRecommendedComics(getRecommendItems(res.data));
        setListComics(getComicsPerPage(res.data));
        setListPagination(getPagination(res.data));
      }
    }
    //scroll To Top
    ScrollToTop();
    //get api
    getData();
  }, [searchParams]);

  const goToChapDetails = (chapUrl) => {
    navigate(`/truyen-tranh/${chapUrl.split('/')[4]}`);
  };

  return (
    <>
      <main>
        <div className='container'>
          <RecommenedComics
            recommendedComics={recommendedComics}
            goToChapDetails={goToChapDetails}
          ></RecommenedComics>
          <div className='row'>
            <div className='new_update_story col-md-8'>
              <div className='items'>
                <div className='page-title'>
                  <h2>
                    Truyện mới cập nhật <i className='fa fa-angle-right'></i>
                  </h2>
                </div>
                <div className='row'>
                  {listComics.map((element, index) => {
                    let imgsrc = 'http:' + element.ImgSrc;
                    return (
                      <div key={index} className='col-md-3 col-sm-4'>
                        <figure>
                          <div className='image'>
                            <img
                              src={imgsrc}
                              alt={element.comicsName}
                              loading='auto'
                            ></img>
                            <div className='item_caption'>
                              <span>
                                <i className='fa fa-eye'></i>
                                {
                                  element.eye
                                } <i className='fa fa-comment'></i>{' '}
                                {element.comment}{' '}
                                <i className='fa fa-heart'></i> {element.heart}
                              </span>
                            </div>
                          </div>
                          <figcaption>
                            <h3
                              onClick={() => {
                                goToChapDetails(element.href);
                              }}
                              style={{ cursor: 'pointer' }}
                            >
                              <a>{element.comicsName}</a>
                            </h3>
                            <ul>
                              {element.listChapter.map((ele, i) => {
                                return (
                                  <li key={i}>
                                    <a href={ele.hrefChapter}>
                                      {ele.chapNumber}{' '}
                                    </a>
                                    <i className='time'>{ele.chapTime}</i>
                                  </li>
                                );
                              })}
                            </ul>
                          </figcaption>
                        </figure>
                      </div>
                    );
                  })}
                </div>
              </div>
              <HomePagination
                listPagination={listPagination}
                navigate={navigate}
              ></HomePagination>
            </div>
            <div className='right_content col-md-4'>
              <HistoryReader></HistoryReader>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
