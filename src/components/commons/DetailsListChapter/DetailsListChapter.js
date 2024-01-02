/* eslint-disable jsx-a11y/anchor-is-valid */
import { isEmpty } from 'lodash';
import './DetailsListChapter.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DetailsListChapter({ truyenDetailsListChapter }) {
  let navigate = useNavigate();

  useEffect(() => {
    if (!isEmpty(truyenDetailsListChapter)) {
      console.log(truyenDetailsListChapter);
      debugger;
      let x = document
        .getElementsByClassName('detailsListChapter')[0]
        .getElementsByTagName('ul')[0];
      if (x.offsetHeight > 500) {
        x.style.maxHeight = '300px';
        document
          .getElementsByClassName('detailsListChapter')[0]
          .getElementsByClassName('view_more')[0].style.display = 'block';
      } else {
        x.style.maxHeight = '100%';
        document
          .getElementsByClassName('detailsListChapter')[0]
          .getElementsByClassName('view_more')[0].style.display = 'none';
      }
    }
  }, [truyenDetailsListChapter]);

  const viewMore = () => {
    document
      .getElementsByClassName('detailsListChapter')[0]
      .getElementsByTagName('ul')[0].style.maxHeight = '100%';
    document
      .getElementsByClassName('detailsListChapter')[0]
      .getElementsByClassName('view_more')[0].style.display = 'none';
  };

  const goToChapReader = (chapUrl) => {
    let truyenName = chapUrl.split('/')[4];
    let chapNumber = chapUrl.split('/')[5];
    let id = chapUrl.split('/')[6];
    navigate(`/truyen-tranh/${truyenName}/${chapNumber}/${id}`);
  };

  return (
    <nav className='detailsListChapter'>
      <ul>
        {truyenDetailsListChapter.map((element, index) => {
          return (
            <li key={index} className='row'>
              <div className='col-5 chapter'>
                <a
                  onClick={() => {
                    goToChapReader(element.hrefChapter);
                  }}
                  data-id='900437'
                  style={{ cursor: 'pointer' }}
                >
                  {element.chapter}
                </a>
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: '#999',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  fontStyle: 'italic',
                }}
                className='col-4 text-center no-wrap small'
              >
                {element.updateChapter}
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: '#999',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  fontStyle: 'italic',
                }}
                className='col-3 text-center small'
              >
                {element.viewChapter}
              </div>
            </li>
          );
        })}
      </ul>
      <a
        onClick={() => {
          viewMore();
        }}
        className='view_more'
        style={{
          display: 'block',
          marginTop: '5px',
          textAlign: 'center',
          padding: '10px 0px',
          border: '1px solid #ddd',
          cursor: 'pointer',
        }}
      >
        <i className='fa fa-plus'></i>Xem thêm
      </a>
    </nav>
  );
}
