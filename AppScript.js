function json() {
     const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
     const sheet = spreadSheet.getSheets()[0];
     const data = sheet.getDataRange().getValues();
     const jsonData = convertToJson(data);
     return ContentService.createTextOutput(JSON.stringify(jsonData)).setMimeType(ContentService.MimeType.JSON)
   }
   
   function convertToJson(data) {
     const header = data[0];
     let json = [];
     for(let i = 1; i < data.length; ++i) {
       let object = {
         id: i,
       };
       for(let j = 0; j < header.length; ++j) {
         object[header[j]] = data[i][j];
       }
   
       json.push(object);
     }
   
     return json;
   }
   
   function doGet(e) {
     const path = e.parameter.path;
     return json(path);
   }