#! /usr/bin/env node

/*
 * 输入文件：
 *   key	            zh	    ja	    ko
 *   homepage_song	    儿歌	童謡    동요
 *
 * 生成格式
 * {
 *      zh: {
 *          'homepage_song': '儿歌',
 *      },
 *      ja: {
 *          'homepage_song': '童謡',
 *      },
 *      ko: {
 *          'homepage_song': '동요'
 *      }
 *  }
 *
 *
 */
if (process.argv.length !== 3) {
    console.log('Missing excel file, \nUsage: i18n-excel-to-json myexcel.xls\n');
    return;
}
const filePath = process.argv[2];
const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');
const csvtojsonV2 = require("csvtojson/v2");
const csv = require('csvtojson');

console.log('Processing ' + filePath);
function readXls () {
    return readXlsxFile(filePath).then((rows) => {
        // `rows` is an array of rows
        // each row being an array of cells.
        // console.log(rows);
        let titleRow = rows[0];
        let allLanguages = {};
        let titles = [];
        for (let i = 0; i < titleRow.length; i++) {
            titles.push(titleRow[i]);
            i > 0 && (allLanguages[titleRow[i]] = {});
        }
        for (let i = 1; i < rows.length; i++) {
            let row = rows[i];
            for (let j = 1; j < row.length; j++) {
                if (row[0]) {
                    allLanguages[titles[j]][row[0]] = row[j];
                }
            }
            // let lastRow = row;
            // while (i + 1 < rows.length && rows[i + 1][0] === null) {
            //     row = rows[++i];
            //     for (let j = 1; j < row.length; j++) {
            //         row[j] !== null && (allLanguages[titles[j]][lastRow[0]] += '\n' + row[j]);
            //     }
            // }
        }
        return allLanguages;
    });
}

function readCSV () {
    const csvFilePath = filePath;
    return csv()
    .fromFile(csvFilePath)
    .then((dataList)=>{
        if (!dataList.length) {
            return {};
        }
        let allLanguages = {};
        let item = dataList[0];
        for (let key in item) {
            if (key !== 'key') {
                allLanguages[key] = {};
            }
        }
        for (let item of dataList) {
            for (let key in item) {
                if (key !== 'key' && item.key) {
                    allLanguages[key][item.key] = item[key];
                }
            }
        }
        return allLanguages;
    }); 
}

let isCSV = /\.csv$/.test(filePath);
let read = isCSV ? readCSV : readXls;
read().then(data => {
    let outputFileName = filePath.replace(/\.[^.]+$/, '') + '.json';
    fs.writeFileSync(outputFileName, JSON.stringify(data, null, 4), 'utf-8');
    console.log('Success! Output file: ' + outputFileName)
});
    // console.log(allLanguages);
