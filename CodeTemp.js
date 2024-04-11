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
                          capHoc.value = "THPT";
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