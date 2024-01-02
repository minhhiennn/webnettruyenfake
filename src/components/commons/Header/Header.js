import './Header.scss';
import { useNavigate } from "react-router-dom";

export default function Header() {

    let navigate = useNavigate();

    // on mouse over category
    const onMouseOverCategory = () => {
        document.getElementsByClassName('nav_header_bar_category')[0].style.display = "block";
    }
    // on mouse out category
    const onMouseOutCategory = () => {
        document.getElementsByClassName('nav_header_bar_category')[0].style.display = "none";
    }

    // on mouse over ratings
    const onMouseOverRatings = () => {
        document.getElementsByClassName('nav_header_bar_ratings')[0].style.display = "block";
    }
    // on mouse out ratings
    const onMouseOutRatings = () => {
        document.getElementsByClassName('nav_header_bar_ratings')[0].style.display = "none";
    }

    const onMenuChoose = (event, kind) => {
        let collection = document.getElementsByClassName('menu')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
        for (let i = 0; i < collection.length; i++) {
            if (!collection[i].classList.contains('child_menu')) {
                collection[i].getElementsByTagName('a')[0].classList.remove('active');
            }
        }
        event.target.classList.add('active');
        if (kind === 'theloai') {
            document.getElementsByClassName('child_menu_category')[0].classList.toggle('open')
        }

    }

    const openMenu = (event) => {
        document.getElementsByClassName('nav_header_bar_collapse')[0].classList.toggle('open');
        document.body.classList.toggle('disable_scroll');
        if (event.target.classList.value === 'fa fa-bars') {
            event.target.classList.remove('fa-bars')
            event.target.classList.add('fa-times')
        } else {
            event.target.classList.add('fa-bars')
            event.target.classList.remove('fa-times')
        }
    }

    return (
        <>
            <div>
                <header className='main_header'>
                    <div className='container'>
                        <div className='logo'>
                            <img style={{ cursor: "pointer" }} onClick={() => { navigate('/') }} src={`${process.env.REACT_APP_LINK}/data/logos/logo-nettruyen.png`} alt='logo'></img>
                        </div>
                        <div className='header_search'>
                            <div className='search_box'>
                                <input type="text" placeholder='Tìm truyện...'></input>
                                <div className='button_search'>
                                    <i className="fas fa-search"></i>
                                </div>
                            </div>
                            <div className='search_and_menu' style={{ marginRight: "auto", paddingRight: "4px", paddingTop: "12px" }}>
                                <i style={{ padding: "6px", color: "white" }} className="fa fa-search"></i>
                                <i onClick={(event) => { openMenu(event) }} style={{ padding: "6px", color: "white", backgroundColor: "yellow" }} className="fa fa-bars"></i>
                            </div>
                        </div>
                    </div>
                </header>
                <nav className='main_nav_header_bar'>
                    <div className='container'>
                        <ul>
                            <li>
                                <a href='##'><i className="fa fa-home hidden-xs"></i></a>
                            </li>
                            <li>
                                <a href='##'>Hot</a>
                            </li>
                            <li>
                                <a href='##'>Theo dõi</a>
                            </li>
                            <li>
                                <a href='##'>Lịch sử</a>
                            </li>
                            <li onMouseOver={() => { onMouseOverCategory() }} onMouseOut={() => { onMouseOutCategory() }} style={{ position: "relative" }}>
                                <a href='##'>Thể loại<i style={{ marginLeft: "4px" }} className="fa fa-caret-down"></i></a>
                                <ul className='nav_header_bar_category nav_child'>
                                    <li>
                                        <div>
                                            <div>
                                                <div>
                                                    <p>
                                                        <strong>Tất cả</strong>
                                                    </p>
                                                    <p>Action</p>
                                                    <p>Adult</p>
                                                    <p>Adventure</p>
                                                    <p>Anime</p>
                                                    <p>Chuyển Sinh</p>
                                                    <p>Comedy</p>
                                                    <p>Comic</p>
                                                    <p>Cooking</p>
                                                    <p>
                                                        <strong>Cổ Đai</strong>
                                                    </p>
                                                    <p>Doujinshi</p>
                                                    <p>Drama</p>
                                                    <p>
                                                        <strong>
                                                            Đam Mỹ
                                                        </strong>
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <p>Echi</p>
                                                    <p>Fantasy</p>
                                                    <p>Gender Bender</p>
                                                    <p>Harem</p>
                                                    <p>Historical</p>
                                                    <p>Horror</p>
                                                    <p>Josei</p>
                                                    <p>Live action</p>
                                                    <p>Manga</p>
                                                    <p>
                                                        <strong>Manhua</strong>
                                                    </p>
                                                    <p>Manhwa</p>
                                                    <p>Martial Arts</p>
                                                    <p>Mature</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <p>Mecha</p>
                                                    <p>Mystery</p>
                                                    <p>
                                                        <strong>Ngôn Tình</strong>
                                                    </p>
                                                    <p>One shot</p>
                                                    <p>Psychological</p>
                                                    <p>
                                                        <strong>Romance</strong>
                                                    </p>
                                                    <p>School Life</p>
                                                    <p>Sri-fi</p>
                                                    <p>Seinen</p>
                                                    <p>Shoujo</p>
                                                    <p>Shoujo Ai</p>
                                                    <p>Shounen</p>
                                                    <p>Shounen Ai</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <p>Slice of Life</p>
                                                    <p>Smut</p>
                                                    <p>Soft Yaoi</p>
                                                    <p>Soft Yuri</p>
                                                    <p>Sports</p>
                                                    <p>Supernatural</p>
                                                    <p>Thiếu Nhi</p>
                                                    <p>Tragedy</p>
                                                    <p>Trinh Thám</p>
                                                    <p>Truyện scan</p>
                                                    <p>Truyện Màu</p>
                                                    <p>Webtoon</p>
                                                    <p>
                                                        <strong>Xuyên Không</strong>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li onMouseOver={() => { onMouseOverRatings() }} onMouseOut={() => { onMouseOutRatings() }} style={{ position: "relative" }}>
                                <a href='##'>Xếp hạng<i style={{ marginLeft: "4px" }} className="fa fa-sort"></i></a>
                                <ul className='nav_header_bar_ratings nav_child'>
                                    <li>
                                        <div>
                                            <div>
                                                <div>
                                                    <p><i style={{ marginRight: "2px" }} className="fa fa-eye"></i>Top all</p>
                                                    <p><i style={{ marginRight: "2px" }} className="fa fa-eye"></i>Top Tháng</p>
                                                    <p><i style={{ marginRight: "2px" }} className="fa fa-eye"></i>Top tuần</p>
                                                    <p><i style={{ marginRight: "2px" }} className="fa fa-eye"></i>Top ngày</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <p><strong><i style={{ marginRight: "2px" }} className="fa fa-signal"></i>Truyện full</strong></p>
                                                    <p><i style={{ marginRight: "2px" }} className="far fa-thumbs-up"></i>Yêu Thích</p>
                                                    <p><i style={{ marginRight: "2px" }} className="far fa-sync-alt"></i>Mới cập nhật</p>
                                                    <p><i style={{ marginRight: "2px" }} className="fa fa-cloud-upload"></i>Truyện mới</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href='##'>Tìm truyện</a>
                            </li>
                            <li>
                                <a href='##'>Con gái</a>
                            </li>
                            <li>
                                <a href='##'>Con trai</a>
                            </li>
                            <li>
                                <a href='##'>Tải app</a>
                            </li>
                            <li>
                                <a href='##'>Group</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className='nav_header_bar_collapse'>
                    <div className='search_box'>
                        <input type="text" placeholder='Tìm truyện...'></input>
                        <div className='button_search'>
                            <i className="fas fa-search"></i>
                        </div>
                    </div>
                    <div className='menu'>
                        <ul>
                            <li onClick={(event) => { onMenuChoose(event) }}>
                                <a href='##'>Trang chủ</a>
                            </li>
                            <li onClick={(event) => { onMenuChoose(event) }}>
                                <a href='##'>Hot</a>
                            </li>
                            <li onClick={(event) => { onMenuChoose(event) }}>
                                <a href='##'>Theo dõi</a>
                            </li>
                            <li onClick={(event) => { onMenuChoose(event) }}>
                                <a href='##'>Lịch sử</a>
                            </li>
                            <li onClick={(event) => { onMenuChoose(event, "theloai") }}>
                                <a href='##'>Thể loại <i style={{ paddingLeft: "2px" }} className="fa fa-caret-down"></i></a>
                                <ul className='child_menu_category'>
                                    <li className='child_menu'>
                                        <div>
                                            <div>
                                                <p>Tất cả</p>
                                                <p>Adult</p>
                                                <p>Anime</p>
                                                <p>Comedy</p>
                                                <p>Cooking</p>
                                                <p>Doujinshi</p>
                                                <p>Đam Mỹ</p>
                                                <p>Ecchi</p>
                                                <p>Gender Bender</p>
                                                <p>Historical</p>
                                                <p>Josei</p>
                                                <p>Manga</p>
                                                <p>Manhwa</p>
                                                <p>Mature</p>
                                                <p>Mecha</p>
                                                <p>Ngôn Tình</p>
                                                <p>Psychological</p>
                                                <p>School Life</p>
                                                <p>Seinen</p>
                                                <p>Shoujo Ai</p>
                                                <p>Slice of Life</p>
                                                <p>Soft Yaoi</p>
                                                <p>Sports</p>
                                                <p>Thiếu Nhi</p>
                                                <p>Trinh Thám</p>
                                                <p>Truyện Màu</p>
                                                <p>Xuyên Không</p>
                                            </div>
                                            <div>
                                                <p>Action</p>
                                                <p>Adventure</p>
                                                <p>Chuyển Sinh</p>
                                                <p>Comic</p>
                                                <p>Cổ Đại</p>
                                                <p>Drama</p>
                                                <p>l</p>
                                                <p>Fantasy</p>
                                                <p>Harem</p>
                                                <p>Horror</p>
                                                <p>Live action</p>
                                                <p>Manhua</p>
                                                <p>Martial Arts</p>
                                                <p>l</p>
                                                <p>Mystery</p>
                                                <p>One shot</p>
                                                <p>Romance</p>
                                                <p>Sci-fi</p>
                                                <p>Shoujo</p>
                                                <p>Shounen</p>
                                                <p>l</p>
                                                <p>Smut</p>
                                                <p>Soft Yuri</p>
                                                <p>Supernatural</p>
                                                <p>Tragedy</p>
                                                <p>Truyện scan</p>
                                                <p>Webtoon</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li onClick={(event) => { onMenuChoose(event, "xephang") }}>
                                <a href='##'>Xếp hạng <i style={{ paddingLeft: "2px" }} className="fa fa-sort"></i></a>
                            </li>
                            <li onClick={(event) => { onMenuChoose(event) }}>
                                <a href='##'>Tìm truyện</a>
                            </li>
                            <li onClick={(event) => { onMenuChoose(event) }}>
                                <a href='##'>Con gái</a>
                            </li>
                            <li onClick={(event) => { onMenuChoose(event) }}>
                                <a href='##'>Con trai</a>
                            </li>
                            <li onClick={(event) => { onMenuChoose(event) }}>
                                <a href='##'>Tải app</a>
                            </li>
                            <li onClick={(event) => { onMenuChoose(event) }}>
                                <a href='##'>Group</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}