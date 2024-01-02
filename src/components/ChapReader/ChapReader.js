import './ChapReader.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getChapReaderDetails } from '../../helpers/ParseFunction';

export default function ChapReaderr() {
  let { truyenName, chapNumber, id } = useParams();

  const [listImg, setListImg] = useState([]);
  const [chapReaderDetails, setChapReaderDetails] = useState({});
  const [prevLink, setPrevLink] = useState('');
  const [nextLink, setNextLink] = useState('');
  const [listOptionLink, setListOptionLink] = useState([]);

  useEffect(() => {
    let url = `${process.env.REACT_APP_LINK}/truyen-tranh/${truyenName}/${chapNumber}/${id}`;

    async function getListImg() {
      let res = await axios
        .get('http://localhost:8080/api/getListSrcImg', {
          params: { url: url },
        })
        .catch(() => {
          console.log('có gì đó sai sai');
        });
      if (res) {
        let list = [];
        for (let i = 0; i < res.data.length; i++) {
          let obj = { imgSrc: res.data[i] };
          list.push(obj);
        }
        setListImg(list);
      }
    }

    async function getData() {
      let res = await axios
        .get('http://localhost:8080/api/getHtmlByPage', {
          params: { url: url },
        })
        .catch(() => {
          console.log('loi gi roi bay oi');
        });

      if (res) {
        let result = getChapReaderDetails(res.data);
        setChapReaderDetails(result);
        let url2 = `${process.env.REACT_APP_LINK}/Comic/Services/ComicService.asmx/ProcessChapterList?comicId=${result.mangaId}`;
        let res2 = await axios.get('http://localhost:8080/api/getHtmlByPage', {
          params: { url: url2 },
        });
        if (res2) {
          console.log('???');
          console.log(res2.data);
          /////////////
          let optionLink = [];
          let prev = '##!';
          let next = '##!';
          res2.data.chapters.reverse().forEach((element, index, array) => {
            /// option Link
            let name = element.name;
            let url = element.url;
            let chapterId = element.chapterId;
            let obj = { name: name, url: url, chapterId: chapterId };
            optionLink.push(obj);
            /// prevLink and nextLink
            if (id == element.chapterId) {
              if (index === array.length - 1) {
                prev = array[index - 1].url;
              } else if (index === 0) {
                next = array[index + 1].url;
              } else {
                prev = array[index - 1].url;
                next = array[index + 1].url;
              }
            }
          });
          ///
          setPrevLink(prev);
          setNextLink(next);
          setListOptionLink(optionLink);
        }
      }
    }

    getData();
    getListImg();
  }, [chapNumber, id, truyenName]);

  return (
    <main className='main_chapReader'>
      <div className='container'>
        <div className='readingDetail'>
          <div className='top'>
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
                  <span>{chapReaderDetails.mangaName}</span>
                </a>
              </li>
              <li>
                <a href='##'>
                  <span>{chapReaderDetails.mangaChapter}</span>
                </a>
              </li>
            </ul>
            <h3 className='txt-primary'>
              <a
                href={`${process.env.REACT_APP_LINK}/truyen-tranh/tsundere-akuyaku-reijou-liselotte-to-jikkyou-no-endo-kun-to-kaisetsu-no-kobayashi-san-233080`}
              >
                {chapReaderDetails.mangaName}
              </a>
              <span> - {chapReaderDetails.mangaChapter}</span>
            </h3>
            <i>{chapReaderDetails.mangaTimeUpdate}</i>
          </div>
          <div className='reading-control'>
            <div className='mrb5'>
              Nếu không xem được truyện vui lòng đổi "SERVER ẢNH" bên dưới
              <div className='mrt10 pdb5'>
                <button type='button' className='btn btn-success'>
                  Server 1
                </button>
                <button type='button' className='btn btn-primary'>
                  Server 2
                </button>
              </div>
            </div>
            <div className='mrb10'>
              <button type='button' className='btn btn-warning'>
                <i className='fa fa-exclamation-triangle'></i> Báo lỗi
              </button>
            </div>
            <div className='alert alert-info mrb10 hidden-xs hidden-sm'>
              <i className='fa fa-info-circle'></i>{' '}
              <em>Sử dụng mũi tên trái (←) hoặc phải (→) để chuyển chapter</em>
            </div>
            <div className='chapter_nav'>
              <a className='home' href='##'>
                <i className='fa fa-home'></i>
              </a>
              <a className='home' href='##'>
                <i className='fa fa-list'></i>
              </a>
              <a className='home undo' href='##'>
                <i className='fa fa-undo error'></i>
                <span>1</span>
              </a>
              <a className='prev' href={prevLink} disabled={prevLink === '##!'}>
                <i className='fa fa-chevron-left'></i>
              </a>
              <select
                value={`/truyen-tranh/${truyenName}/${chapNumber}/${id}`}
                onChange={(event) => {
                  window.location.href = event.target.value;
                }}
              >
                {listOptionLink.map((element, index) => {
                  return (
                    <option key={index} value={element.url}>
                      {element.name}
                    </option>
                  );
                })}
              </select>
              <a className='next' href={nextLink} disabled={nextLink === '##!'}>
                <i className='fa fa-chevron-right'></i>
              </a>
              <a href='##' className='follow-link btn btn-success'>
                <i className='fa fa-heart'></i>
                <span> Theo dõi</span>
              </a>
            </div>
          </div>
        </div>
        <div className='reading'>
          {listImg.map((element, index) => {
            return (
              <img
                key={index}
                src={element.imgSrc !== undefined ? element.imgSrc : ''}
                alt='img'
              ></img>
            );
          })}
        </div>
      </div>
    </main>
  );
}
