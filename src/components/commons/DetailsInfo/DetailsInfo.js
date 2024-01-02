/* eslint-disable jsx-a11y/anchor-is-valid */
import './DetailsInfo.scss';
import { Fragment } from 'react';

export default function DetailsInfo({ truyenDetailsInfo }) {
  // console.log(truyenDetailsInfo);
  return (
    truyenDetailsInfo && (
      <>
        <ul className='list_info'>
          <li className='row'>
            <p className='col-4'>
              <i className='fa fa-plus'></i> Tên khác
            </p>
            <h2 className='col-8'>{truyenDetailsInfo.listInfo.otherName}</h2>
          </li>
          <li className='row'>
            <p className='col-4'>
              <i className='fa fa-user'></i> Tác giả
            </p>
            <h2 className='col-8'>{truyenDetailsInfo.listInfo.auther}</h2>
          </li>
          <li className='row'>
            <p className='col-4'>
              <i className='fa fa-rss'></i> Trình trạng
            </p>
            <h2 className='col-8'>{truyenDetailsInfo.listInfo.statusNow}</h2>
          </li>
          <li className='row'>
            <p className='col-4'>
              <i className='fa fa-tags'></i> Thể loại
            </p>
            <p className='col-8'>
              {truyenDetailsInfo.listInfo.kindNow.map((element, index, arr) => {
                if (index + 1 === arr.length) {
                  return (
                    <Fragment key={index}>
                      <a href={element.hrefKind}>{element.nameKind}</a>
                    </Fragment>
                  );
                } else {
                  return (
                    <Fragment key={index}>
                      <a href={element.hrefKind}>{element.nameKind}</a> -{' '}
                    </Fragment>
                  );
                }
              })}
            </p>
          </li>
          <li className='row'>
            <p className='col-4'>
              <i className='fa fa-eye'></i> Lượt xem
            </p>
            <h2 className='col-8'>{truyenDetailsInfo.listInfo.view}</h2>
          </li>
        </ul>
        <div
          className='danh_gia'
          style={{ marginBottom: '10px', marginTop: '5px' }}
        >
          <a style={{ color: '#288ad6', cursor: 'pointer' }}>
            <span>{truyenDetailsInfo.rating.commicName}</span>
          </a>
          <span
            itemProp='aggregateRating'
            itemScope=''
            itemType='https://schema.org/AggregateRating'
          >
            {' '}
            Xếp hạng: <span>{truyenDetailsInfo.rating.ratingValue}</span>/5 -{' '}
            <span>{truyenDetailsInfo.rating.ratingCount}</span> Lượt đánh giá.
          </span>
        </div>
        <div className='follow'>
          <button className='btn btn-success'>
            <i className='fa fa-heart'></i> Theo dõi
          </button>
          <span style={{ padding: '0 5px', fontSize: '15px' }}>
            <b>{truyenDetailsInfo.followingUp.following}</b> Người Đã Theo Dõi
          </span>
        </div>
        <div className='read_action'>
          <button type='button' className='btn btn-warning'>
            <a style={{ cursor: 'pointer' }}>Đọc từ đầu</a>
          </button>
          <button
            style={{ marginLeft: '5px' }}
            type='button'
            className='btn btn-warning'
          >
            <a style={{ cursor: 'pointer' }}>Đọc mới nhất</a>
          </button>
        </div>
      </>
    )
  );
}
