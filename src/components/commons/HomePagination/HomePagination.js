import './HomePagination.scss';

export default function HomePagination({ listPagination, navigate }) {

    const changePage = (href) => {
        let page = href.split("=")[1] ? href.split("=")[1] : 1;
        navigate(`/?page=${page}`);
    }

    return (
        <div className='pagination'>
            <ul>
                {
                    listPagination.map((element, index) => {
                        return (

                            <li onClick={() => { changePage(element.liHref) }} key={index} className={element.liClass === "" ? "" : element.liClass}>
                                <a>{element.liNumber}</a>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}