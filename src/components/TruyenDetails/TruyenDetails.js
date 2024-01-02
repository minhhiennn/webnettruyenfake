/* eslint-disable jsx-a11y/anchor-is-valid */
import './TruyenDetails.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

//component
import HistoryReader from '../commons/HistoryReader/HistoryReader';
import DetailsInfo from '../commons/DetailsInfo/DetailsInfo';
import DetailsListChapter from '../commons/DetailsListChapter/DetailsListChapter';

//function
import {
  getTruyenContent,
  getTruyenDetailInfo,
  getTruyenDetailListChap,
} from '../../helpers/ParseFunction';
import { isEmpty } from 'lodash';

export default function TruyenDetails() {
  let { truyenId } = useParams();
  const [truyenDetails, setTruyenDetails] = useState({});
  const [truyenDetailsInfo, setTruyenDetailsInfo] = useState(null);
  const [truyenDetailsListChapter, setTruyenDetailsListChapter] = useState([]);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_LINK}/truyen-tranh/${truyenId}`;
      let res = await axios
        .get('http://localhost:8080/api/getHtmlByPage', {
          params: { url: url },
        })
        .catch(() => {
          alert('loi gi roi bay oi');
        });
      if (res) {
        setTruyenDetails(getTruyenContent(res.data));
        setTruyenDetailsInfo(getTruyenDetailInfo(res.data));
        setTruyenDetailsListChapter(getTruyenDetailListChap(res.data));
      }
    }
    window.onpopstate = function () {
      getData();
    };
    getData();
  }, [truyenId]);

  useEffect(() => {
    if (!isEmpty(truyenDetails)) {
      let x = document
        .getElementsByClassName('detail_content')[0]
        .getElementsByTagName('p')[0];
      if (x.offsetHeight <= 60) {
        x.classList.remove('shortened');
        document
          .getElementsByClassName('detail_content')[0]
          .getElementsByTagName('a')[0].style.display = 'none';
      } else {
        x.classList.add('shortened');
        document
          .getElementsByClassName('detail_content')[0]
          .getElementsByTagName('a')[0].style.display = 'inline';
      }
    }
  }, [truyenDetails]);

  const moreOrNot = () => {
    let x = document
      .getElementsByClassName('detail_content')[0]
      .getElementsByTagName('p')[0];
    x.classList.toggle('shortened');
    if (x.classList.length === 0) {
      document
        .getElementsByClassName('detail_content')[0]
        .getElementsByTagName('a')[0].innerHTML =
        "Thu gọn <i class='fa fa-angle-left'></i>";
    } else {
      document
        .getElementsByClassName('detail_content')[0]
        .getElementsByTagName('a')[0].innerHTML =
        "Xem thêm <i class='fa fa-angle-right'></i>";
    }
  };

  return (
    <>
      <main>
        <div className='container'>
          <div className='row'>
            <div className='left_container col-md-8'>
              <ul className='breadcrumb'>
                <li>
                  <a href='##'>
                    <span style={{ fontWeight: '200' }}>Trang chủ</span>
                  </a>
                </li>
                <li>
                  <a href='##'>
                    <span>Thể loại</span>
                  </a>
                </li>
                <li>
                  <a href='##'>
                    <span>{truyenDetails.comicsName}</span>
                  </a>
                </li>
              </ul>
              <article>
                <h1 className='title_details'>{truyenDetails.comicsName}</h1>
                <time>{truyenDetails.commicsUpdate}</time>
                <div className='detail_info'>
                  <div className='row'>
                    <div className='col_image col-sm-4'>
                      <img src={truyenDetails.conmicsImg} alt=''></img>
                    </div>
                    <div className='col_info col-sm-8'>
                      <DetailsInfo
                        truyenDetailsInfo={truyenDetailsInfo}
                      ></DetailsInfo>
                    </div>
                  </div>
                </div>
                <div className='detail_content'>
                  <h3>
                    <i className='far fa-file-alt'></i> Nội dung
                  </h3>
                  {truyenDetails && (
                    <>
                      <p className='shortened'>{truyenDetails.detail}</p>
                      <a
                        onClick={() => {
                          moreOrNot();
                        }}
                        className='morelink'
                        style={{ cursor: 'pointer' }}
                      >
                        Xem thêm <i className='fa fa-angle-right'></i>
                      </a>
                    </>
                  )}
                </div>
                <div className='list_chapter'>
                  <h2>
                    <i className='fa fa-list'></i> Danh sách chương
                  </h2>
                  <div className='row heading'>
                    <div className='col-5 no-wrap'>Số chương</div>
                    <div className='col-4 no-wrap text-center'>Cập nhật</div>
                    <div className='col-3 no-wrap text-center'>Xem</div>
                  </div>
                  <DetailsListChapter
                    truyenDetailsListChapter={truyenDetailsListChapter}
                  ></DetailsListChapter>
                </div>
              </article>
            </div>
            <div className='right_container col-md-4'>
              <HistoryReader></HistoryReader>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
