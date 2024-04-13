// ==UserScript==
// @name         Tool
// @namespace    http://tampermonkey.net/
// @version      2024-04-08
// @description  tool vui vui giúp công việc nhàn hơn một chút
// @author       Mai Văn Hiền
// @match        https://kienedu.com/wp-admin/post-new.php?post_type=product
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kienedu.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
const url = 'https://script.google.com/macros/s/AKfycby2o-su02T3wfoWo4uGWlxDhrFe_B74hEkeH8vuQvECy9MbCYiTE52xxMxxn0gZkGH-9A/exec';
//địa chỉ url thu được từ google sheet

var time = new Date();
var btn = document.querySelector('#wpadminbar');
var inputBtb = document.createElement('div');
inputBtb.innerHTML = `
     <button class='btn-click'>Điền</button>
`
btn.appendChild(inputBtb);

var tinMC = '<script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>';
document.querySelector('head').insertAdjacentHTML("afterend", tinMC);

function ConvertP(input) {
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

// //update
// function convert_vi_to_en(str) {

//      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a"); str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");

//      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i"); str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");

//      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");

//      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");

//      str = str.replace(/đ/g, "d");

//      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");

//      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");

//      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");

//      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");

//      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");

//      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");

//      str = str.replace(/Đ/g, "D"); str = str.replace(/!|@|%|\^|\*|\(|\)|\Javascript – Chuyển Tiếng Việt Có Dấu Sang Không Dấu|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");

//      str = str.replace(/ Javascript – Chuyển Tiếng Việt Có Dấu Sang Không Dấu/g, ' ');

//      return str;
// }

// function convertTitle(title) {
//      title = convert_vi_to_en(title);
//      let text = "";
//      let str= "";
//      for(let i = 0; i < title.length; ++i) {
//           if(title.charCodeAt(i) == 32) {
//                if(text[text.length-1] != '-') {
//                     text += '-';
//                }
//           } else if(title.charCodeAt(i) != 10) {
//                text += title.charAt(i);
//           }
//      }
//      for(let i = 0; i < text.length; ++i) {
//           if((text.charAt(i) >= 'a' && text.charAt(i) <= 'z') || (text.charAt(i) >= 'A' && text.charAt(i) <= 'Z') || ((text.charAt(i) >= '0' && text.charAt(i) <= '9'))) {
//                str += text.charAt(i);
//           } else if(text.charAt(i) == '-' && str[str.length-1] != '-') {
//                str += text.charAt(i);
//           }
//      }
//      return str;
// }

// function uploadImg1(title) {
//      let str = title;
//      title = convertTitle(title);
//      let time = new Date();
//      document.querySelector('#set-post-thumbnail').click();
//      document.querySelector('.media-modal-close').click()
//      setTimeout(()=>{
//           setTimeout(()=>{
//                const list = document.querySelectorAll('.attachments-wrapper>ul>li');

//                list[0].setAttribute('aria-checked', true);
//                list[0].classList.add('selected');
//                list[0].classList.add('details');
//                list[0].querySelector('button').click();

//                const up_file = document.querySelectorAll('.media-sidebar #attachment-details-copy-link');
//                tinymce.get('attachment-details-alt-text').setContent(str, {format : 'raw'});
//                document.querySelector('#attachment-details-title').value = str;
//                tinymce.get('attachment-details-description').setContent(str, {format : 'raw'});
//                up_file.value = `https://kienedu.com/wp-content/uploads/${time.getFullYear()}/${time.getMonth()+1}/${title}.png`;
//                document.querySelector('.media-button-select').click();
//           })
//      },1000)
// }


// function upLoadWordOrPDF(typeDocument) {
//      document.querySelector('.acf-button').click();
//      setTimeout(()=>{
//           setTimeout(()=>{
//                const element = document.querySelectorAll('.supports-drag-drop')[1].querySelector('.attachments-wrapper>ul');
//                if(typeDocument.toLowerCase() === 'word' || !typeDocument) {
//                     let liElement = document.createElement('li');
//                     liElement.setAttribute("tabindex", 0);
//                     liElement.setAttribute("aria-label", "TÀI LIỆU WORD");
//                     liElement.setAttribute("role", "checkbox");
//                     liElement.setAttribute("aria-checked", true);
//                     liElement.setAttribute("data-id", 670);
//                     liElement.classList.add('attachment');
//                     liElement.classList.add('save-ready');
//                     liElement.classList.add('selected');
//                     liElement.classList.add('details');
//                     liElement.innerHTML = `
//                          <div class="attachment-preview js--select-attachment type-image subtype-png landscape">
//                               <div class="thumbnail">

//                                    <div class="centered">
//                                         <img src="https://kienedu.com/wp-content/uploads/2023/06/doc.png" draggable="false" alt="">
//                                    </div>

//                               </div>
//                          </div>
//                          <button type="button" class="check" tabindex="0">
//                               <span class="media-modal-icon"></span>
//                               <span class="screen-reader-text">Bỏ chọn</span>
//                          </button>
//                     `
//                     element.appendChild(liElement);
//                } else {
//                     let liElement = document.createElement('li');
//                     liElement.setAttribute("tabindex", 0);
//                     liElement.setAttribute("aria-label", "pdf");
//                     liElement.setAttribute("role", "checkbox");
//                     liElement.setAttribute("aria-checked", true);
//                     liElement.setAttribute("data-id", 15896);
//                     liElement.classList.add('attachment');
//                     liElement.classList.add('save-ready');
//                     liElement.classList.add('selected');
//                     liElement.classList.add('details');
//                     liElement.innerHTML = `
//                          <div class="attachment-preview js--select-attachment type-image subtype-jpeg landscape">
//                               <div class="thumbnail">
//                                    <div class="centered">
//                                         <img src="https://kienedu.com/wp-content/uploads/2023/08/pdf-300x300.jpg" draggable="false" alt="">
//                                    </div>
//                               </div>
//                          </div>

//                          <button type="button" class="check" tabindex="0">
//                               <span class="media-modal-icon"></span>
//                               <span class="screen-reader-text">Bỏ chọn</span>
//                          </button>
//                     `
//                     element.appendChild(liElement);
//                }
//                document.querySelector('.media-button-select').click();
//           })
//      },1000)
// }
fetch(url)
     .then(res => res.json())
     .then((listData) => {

          let Title = document.querySelector('#titlewrap>#title');
          let capHoc =document.querySelector('#acf-field_648682d389b65');
          let Lop = document.querySelector('#acf-field_6486830089b66');
          let mon = document.querySelector('#acf-field_6486831a89b67');
          let maTaiLieu = document.querySelector('#acf-field_6597878c9e68c');
          let Gia = document.querySelector('#acf-field_659787989e68d');
          let luotTai = document.querySelector('#acf-field_6488165df3164');
          let luotXem = document.querySelector('#acf-field_64881682f3165');
          let soTrang = document.querySelector('#acf-field_64899c78b54b1');
          let linkXemThu = document.querySelector('#acf-field_6475ab8d31298');
          let giaSau = document.querySelector('#_regular_price');
          let Sach = document.querySelector('#acf-field_6486832c89b68');
          let loaiTL = document.querySelector('#acf-field_6488422ad2dfc');

          inputBtb.querySelector('.btn-click').addEventListener('click', () => {
               for(let i = 0; i < listData.length; ++i) {
                    if(listData[i].checkBox === false) {
                         Title.value = `SKKN ${listData[i].title}`;
                         capHoc.value = listData[i].capHoc;
                         Lop.value = listData[i].lop;
                         mon.value = listData[i].danhMuc;
                         maTaiLieu.value = listData[i].ma;
                         Gia.value = `${listData[i].gia/1000}.000 đ`;
                         luotTai.value = `${Math.floor(Math.random()*10)}`;
                         // nếu muốn thay đổi lượt tải tối đa là bao nhiêu thì thay số 10 ở công thức trên bằng chính giá trị đó
                         luotXem.value = `${400+Math.floor(Math.random()*200)}`;
                         // lượt xem nằm trong khoảng min đến max
                         // thay 400 bằng min và thay 200 bằng max-min
                         soTrang.value = listData[i].soLuong;
                         loaiTL.value = listData[i].loaiTaiLieu;
                         let month;
                         if(time.getMonth() < 9) {
                              month = `0${time.getMonth()+1}`;
                         } else {
                              month = time.getMonth()+1;
                         }
                         linkXemThu.value = `https://kienedu.com/wp-content/uploads/${time.getFullYear()}/${month}/${listData[i].demoTrai}-${listData[i].demoPhai}`;
                         //getFullYear là lấy năm up demo lên
                         //getMonth()+1 là lấy tháng up demo lên
                         //nếu demo không phải up lên trong tháng này hay năm nay thì
                         //thay time.getFullYear() bằng năm đăng demo lên
                         //thay time.getMonth()+1 bằng tháng đăng demo lên
                         //Ví dụ: link demo trên kiến edu là: https://kienedu.com/wp-content/uploads/2023/04/demo-31222.pdf
                         //thì năm đăng là 2023 tháng đăng là 04
                         //file demo nhớ cố định theo dạng "demo mãSP";
                         giaSau.value = listData[i].gia;
                         Sach.value = listData[i].boSach;
                         let moTa_Dai = `${ConvertP(listData[i].moTaDai)}`;
                         tinymce.get('content').setContent(moTa_Dai, {format : 'raw'});
                         let text = `<p>
                         Sáng kiến kinh nghiệm "${listData[i].title}"triển khai gồm các biện pháp nổi bật sau:
                         </p><p>
                              ${ConvertP(listData[i].bienPhap)}
                         </p>
                         `
                         tinymce.get('excerpt').setContent(text, {format : 'raw'});
                         break;
                    }
               }

          })
     })
     .catch(error => console.log(error));
})();
