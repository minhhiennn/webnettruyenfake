export function getRecommendItems(data) {
    let result = [];
    let parser = new DOMParser();
    let htmlDoc = parser.parseFromString(data, 'text/html');
    console.log(htmlDoc);
    let x = htmlDoc.getElementsByClassName('owl-carousel')[0].getElementsByClassName('item');
    for (let i = 0; i < x.length; i++) {
        let href = x[i].getElementsByTagName('a')[0].href;
        let ImgSrc = x[i].getElementsByTagName('a')[0].getElementsByTagName('img')[0].dataset.src;
        let comicsName = x[i].getElementsByClassName('slide-caption')[0].getElementsByTagName('h3')[0].getElementsByTagName('a')[0].textContent;
        let chapter = x[i].getElementsByClassName('slide-caption')[0].getElementsByTagName('a')[1].textContent;
        let time = x[i].getElementsByClassName('slide-caption')[0].getElementsByTagName('span')[0].textContent;
        let obj = { href: href, ImgSrc: ImgSrc, comicsName: comicsName, chapter: chapter, time: time };
        result.push(obj);

    }
    return result;
}

export function getComicsPerPage(data) {
    let result = [];
    let parser = new DOMParser();
    let htmlDoc = parser.parseFromString(data, 'text/html');
    let x = htmlDoc.getElementById('ctl00_divCenter').getElementsByClassName('item');
    for (let i = 0; i < x.length; i++) {
        let href = x[i].getElementsByClassName('image')[0].getElementsByTagName('a')[0].href;
        let ImgSrc = x[i].getElementsByClassName('image')[0].getElementsByTagName('img')[0].dataset.original;
        // eye comment heart
        let y = x[i].getElementsByClassName('image')[0].getElementsByClassName('view')[0].getElementsByTagName('span')[0].textContent;
        let eye = y.split("  ")[0].replaceAll('\n', '');
        let comment = y.split("  ")[1];
        let heart = y.split("  ")[2];
        // name and chapter
        let comicsName = x[i].getElementsByTagName('figcaption')[0].getElementsByTagName('h3')[0].textContent.replaceAll('\n', '');
        let listChapter = [];
        let z = x[i].getElementsByTagName('figcaption')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
        for (let index = 0; index < z.length; index++) {
            let hrefChapter = z[index].getElementsByTagName('a')[0].href;
            let chapNumber = z[index].getElementsByTagName('a')[0].textContent;
            let chapTime = z[index].getElementsByTagName('i')[0].textContent;
            let obj = { hrefChapter: hrefChapter, chapNumber: chapNumber, chapTime: chapTime };
            listChapter.push(obj);
        }
        // console.log(comicsName);
        let objj = { href: href, ImgSrc: ImgSrc, eye: eye, comment: comment, heart: heart, comicsName: comicsName, listChapter: listChapter }
        result.push(objj);
    }
    return result;
}

export function getPagination(data) {
    let result = [];
    let parser = new DOMParser();
    let htmlDoc = parser.parseFromString(data, 'text/html');
    let x = htmlDoc.getElementsByClassName('pagination')[0].getElementsByTagName('li');
    for (let i = 0; i < x.length; i++) {
        let liClass = x[i].className;
        let liHref = x[i].getElementsByTagName('a')[0]?.href;
        let liNumber = x[i].textContent;
        let obj = { liClass: liClass, liHref: liHref, liNumber: liNumber };
        result.push(obj);
    }
    return result;
}


export function getTruyenContent(data) {
    let parser = new DOMParser();
    let htmlDoc = parser.parseFromString(data, 'text/html');
    let x = htmlDoc.getElementById('item-detail');
    let comicsName = x.getElementsByTagName('h1')[0].textContent;
    let commicsUpdate = x.getElementsByTagName('time')[0].textContent.replaceAll('\n', '');
    let conmicsImg = `${x.getElementsByClassName('detail-info')[0].getElementsByClassName('col-image')[0].getElementsByTagName('img')[0].src}`;
    let detail = x.getElementsByClassName('detail-content')[0].getElementsByTagName('p')[0].textContent;
    let obj = { comicsName: comicsName, commicsUpdate: commicsUpdate, conmicsImg: conmicsImg, detail: detail }
    return obj;
}

export function getTruyenDetailInfo(data) {
    let result = {}
    let parser = new DOMParser();
    let htmlDoc = parser.parseFromString(data, 'text/html');
    let x = htmlDoc.getElementById('item-detail').getElementsByClassName('detail-info')[0].getElementsByClassName('col-info')[0];
    //list info
    let otherName = "Đang cập nhật";
    if (x.getElementsByClassName('othername')[0] !== undefined) {
        // console.log(x.getElementsByClassName('othername')[0]);
        otherName = x.getElementsByClassName('othername')[0].getElementsByTagName('h2')[0].textContent
    }
    // let otherName = x.getElementsByClassName('othername')[0].getElementsByTagName('h2')[0].textContent;
    let auther = x.getElementsByClassName('author')[0].getElementsByTagName('p')[1].textContent;
    let statusNow = x.getElementsByClassName('status')[0].getElementsByTagName('p')[1].textContent;
    let view = "";
    if (x.getElementsByClassName('othername')[0] !== undefined) {
        view = x.getElementsByTagName('li')[4].getElementsByTagName('p')[1].textContent;
    } else {
        view = x.getElementsByTagName('li')[3].getElementsByTagName('p')[1].textContent
    }
    // let view = x.getElementsByTagName('li')[4].getElementsByTagName('p')[1].textContent;
    let kindNow = [];
    //kind of list info
    let y = x.getElementsByClassName('kind')[0].getElementsByTagName('p')[1].getElementsByTagName('a');
    for (let index = 0; index < y.length; index++) {
        let nameKind = y[index].textContent;
        let hrefKind = y[index].href;
        kindNow.push({ nameKind: nameKind, hrefKind: hrefKind });
    }
    let listInfo = { otherName: otherName, auther: auther, statusNow: statusNow, kindNow: kindNow, view: view };

    //rating
    let commicName = x.getElementsByTagName('div')[0].getElementsByTagName('a')[0].textContent.replaceAll('\n', '');
    let ratingValue = x.getElementsByTagName('div')[0].getElementsByTagName('span')[1].getElementsByTagName('span')[0].textContent;
    let ratingCount = x.getElementsByTagName('div')[0].getElementsByTagName('span')[1].getElementsByTagName('span')[1].textContent;
    let rating = { commicName: commicName, ratingValue: ratingValue, ratingCount: ratingCount }

    //following up
    let following = x.getElementsByClassName('follow')[0].getElementsByTagName('span')[1].getElementsByTagName('b')[0].innerHTML;
    let followingUp = { following: following }


    // add to result
    result.listInfo = listInfo;
    result.rating = rating;
    result.followingUp = followingUp;
    return result;
}

export function getTruyenDetailListChap(data) {
    let result = [];
    let parser = new DOMParser();
    let htmlDoc = parser.parseFromString(data, 'text/html');
    let x = htmlDoc.getElementsByClassName('list-chapter')[0].getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
    for (let i = 0; i < x.length; i++) {
        let hrefChapter = x[i].getElementsByTagName('div')[0].getElementsByTagName('a')[0].href;
        let chapter = x[i].getElementsByTagName('div')[0].getElementsByTagName('a')[0].textContent;
        let updateChapter = x[i].getElementsByTagName('div')[1].textContent;
        let viewChapter = x[i].getElementsByTagName('div')[2].textContent;
        // console.log(hrefChapter + "-" + chapter + "-" + updateChapter + "-" + viewChapter);
        let obj = { hrefChapter: hrefChapter, chapter: chapter, updateChapter: updateChapter, viewChapter: viewChapter };
        result.push(obj);
    }
    return result
}

export function getChapReaderDetails(data) {
    let result = {};
    let parser = new DOMParser();
    let htmlDoc = parser.parseFromString(data, 'text/html');
    let x = htmlDoc.getElementsByClassName('top')[0];

    console.log(x);

    let mangaName = x.getElementsByTagName('ul')[0].getElementsByTagName('li')[2].textContent;
    let mangaChapter = x.getElementsByTagName('ul')[0].getElementsByTagName('li')[3].textContent;
    let mangaTimeUpdate = x.getElementsByTagName('i')[0].textContent
    let x1 = x.getElementsByTagName('ul')[0].getElementsByTagName('li')[2].getElementsByTagName('a')[0].href.split('/')[4];
    let mangaId = x1.split('-')[x1.split('-').length - 1];
    if (mangaId.slice(-1) === "0") {
        mangaId = mangaId.slice(0, -1);
    }
    ///
    result.mangaName = mangaName;
    result.mangaChapter = mangaChapter;
    result.mangaTimeUpdate = mangaTimeUpdate;
    result.mangaId = mangaId;


    return result;
}