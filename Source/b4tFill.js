// ==UserScript==
// @name         Tool điển thông tin cho best4team
// @namespace    http://tampermonkey.net/
// @version      2024-07-23
// @description  try to take over the world!
// @author       Mai Văn Hiền
// @require      https://cdnjs.cloudflare.com/ajax/libs/axios/1.7.2/axios.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/axios/1.7.2/axios.min.js
// @match        https://best4team.com/wp-admin/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=best4team.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //thêm element vào dom
    var adminBar = document.getElementById("wpadminbar")
    var btn = document.createElement('div')

    btn.innerHTML = `
    <button id="btnAddInfor">Điền thông tin</button>
    `
    adminBar.appendChild(btn)

    var tinMC = '<script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>';
    document.querySelector('head').insertAdjacentHTML("afterend", tinMC);
    document.querySelector('#collapsible-advanced-settings').click()
    //Khai báo biến
    const btnAdd = document.querySelector("#btnAddInfor")
    const urlInfor = 'https://script.google.com/macros/s/AKfycbwyrd8ig_084olK_j5G6P-Bwgp5oCl6ZT6uskOI16Qvqd8RP20OwQV-x0hQM1tOEmwgYw/exec'
    const urlSeo = 'https://script.google.com/macros/s/AKfycbw1l11u71We-cPM7ppF9KMlCOo5k-Lsu9DIOBT5cNjlOFMyYk-_qI8mOz8xfaZ7c28O/exec'
    const title = document.querySelector("#title")
    const seoTitle = document.querySelector('#yoast_wpseo_title')
    const decripSeo = document.querySelector('#yoast_wpseo_metadesc')
    const codeProd = document.querySelector('#acf-field_667834d23eba7')
    const priceProd = document.querySelector('#acf-field_667834f33eba8')
    const classProd = document.querySelector('#acf-field_667835193ebab')
    const books = document.querySelector('#acf-field_6678351e3ebac')
    const subProd = document.querySelector('#acf-field_6678350a3ebaa')
    const pagesProd = document.querySelector('#acf-field_667835e63ebb0')
    const authorProd = document.querySelector('#acf-field_667834fe3eba9')
    const qualiProd = document.querySelector('#acf-field_66791ee9b4fb8')
    const unitW = document.querySelector('#acf-field_66791ef8b4fb9')
    const linkDemo = document.querySelector("#acf-field_66783e8703f63")
    const awardProd = document.querySelector("#acf-field_66791f03b4fba")
    const viewsProd = document.querySelector("#acf-field_667835433ebad")
    const downloads = document.querySelector("#acf-field_667835f93ebb1")
    const priceField = document.querySelector('.wc_input_price')
    //hàm chuyển url view sang preview
    function convertUrlToPreview(url) {
        let tmp = "open?id="
        let index = url.lastIndexOf(tmp)
        if(index !== -1) {
            url = 'https://drive.google.com/file/d/' + url.slice(index + tmp.length)
            url = url.replace('&usp=drive_copy', '/preview')
        } else {
            url = url.replace('view?usp=share_link', 'preview')
            //url = url.replace('view?usp=sharing', 'preview')
        }
        if(url.lastIndexOf("/view") !== -1) {
            url = url.replace('/view', '/preview')
        }
        while(url.charAt(url.length-1) === '/') {
            url = url.slice(0, url.length-1)
        }
        return url
    }
    //hàm xử lí chuỗi {bỏ kí tự xuống dòng}
    function ConvertText(input) {
        var output = "";
        for (var i = 0; i < input.length; i++) {
            if ((input.charCodeAt(i) == 10)) {
                output += input.charAt(i);
                output += "</p><p>";
            } else {
                output += input.charAt(i);
            }
        }
        return output;
    }
    // hàm lấy tác giả
    function getAuthor(authorsInfor) {
        for(let author of authorsInfor) {
            if(author?.linkSP === "") {
                return author
            }
        }
    }
    // xử lí
    async function handleClick() {
        const seos = (await axios.get(urlSeo)).data
        const authorsInfor = (await axios.get(urlInfor)).data

        const author = await getAuthor(authorsInfor)
        const seo = seos[Math.floor(Math.random() * seos.length)]
        //thêm thông tin vào các miền
        const isFinded = !!author
        title.value = author.title
        let longDecrip = ConvertText(author.moTaDai)
        tinymce.get('content').setContent(longDecrip, {format : 'raw'});
        seoTitle.value = author?.title
        decripSeo.value = `${seo.textTruoc} ${author.title} ${seo.textSau}`

        //chọn thẻ cho phép công cụ tìm kiếm hiện thị nội dung {đang chọn là không}

        //document.querySelector('#yoast-meta-robots-noindex-metabox').value = 1

        codeProd.value = author?.maSP || " "
        priceProd.value = author?.gia || " "
        classProd.value = author?.lop || " "
        books.value = author?.boSach || " "
        subProd.value = author?.mon || " "
        pagesProd.value = author?.soTrang || " "
        authorProd.value = author?.tacGia || " "
        qualiProd.value = author?.trinhDo || " "
        unitW.value = author?.truong || " "
        linkDemo.value = convertUrlToPreview(author?.link) || " "
        awardProd.value = author?.giai || " "
        viewsProd.value = Math.floor(Math.random() * (200 - 100) + 100)
        downloads.value = Math.floor(Math.random() * (10- 0) + 0)
        //priceField.value = author.gia

        let shortDecrip = `<p>
        Sáng kiến kinh nghiệm "${author.title}"triển khai gồm các biện pháp nổi bật sau:
        </p> <p>
            ${ConvertText(author.bienPhap)}
        </p>
        `
        tinymce.get('excerpt').setContent(shortDecrip, {format : 'raw'});
        title.focus()
        title.select()
        //try {
            //document.execCommand('copy')
        //} catch(e) {
            //alert("Ërror: "+ e)
        //}
        if(isFinded) {
            //alert(`Load hết các miền ${author?.mon}`)
        } else {
            alert('error')
        }

    }
    //Chạy
    try {
        btnAdd.addEventListener('click', handleClick)
    }
    catch(e) {
        alert(e);
    }
})();
