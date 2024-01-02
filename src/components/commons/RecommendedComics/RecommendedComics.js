import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "./RecommendedComics.scss";

export default function RecommendedComics({ recommendedComics, goToChapDetails }) {

    // const [slider, setSlider] = useState(null);

    //options owl carousel
    const options = {
        navText: ['', ''],
        autoWidth: false,
        nav: true,
        dots: false,
        items: 5,
        loop: false,
        rewind: true,
        lazyLoad: true,
        key: `key${recommendedComics.length}`,
        responsive: {
            400: {
                items: 3
            },
            1200: {
                items: 5
            }
        },
        // ref: slider => { setSlider(slider) }
    }


    return (
        <div className='recommended_story'>
            <div className='page-title'>
                <h2>Truyện đề cử <i className="fa fa-angle-right"></i></h2>
            </div>
            <div className='items-slide'>
                <OwlCarousel className='owl-theme' {...options}>
                    {
                        recommendedComics.map((element, index) => {
                            let imgsrc = "http:" + element.ImgSrc;
                            return (
                                <div key={index} className='item' style={{ margin: "0px 7px 0px 7px" }}>
                                    <img className="owl-lazy" src={imgsrc} data-src={imgsrc} alt=''></img>
                                    <div className='slide-caption'>
                                        <h3 onClick={() => (goToChapDetails(element.href))}>{element.comicsName}</h3>
                                        <a title="Chapter 113">{element.chapter}</a>
                                        <span className="time">
                                            <i className="far fa-clock"></i> {element.time}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </OwlCarousel>
            </div>
        </div>
    )
}