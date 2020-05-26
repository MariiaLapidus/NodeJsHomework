//--------------мой вариант---------------
// const path = require('path');
// const fs = require('fs');
// function changeFolder(folderFrom, folderTo, readyCallback) {
//     fs.readdir(path.join(__dirname, folderFrom), (err, files) => {
//         if (err !== null) {
//             console.log(err);
//             return;
//         }
//         console.log(files);
//         let n = files.length;
//         files.forEach((file, index) => {
//             fs.rename(path.join(__dirname, folderFrom, file), path.join(__dirname, folderTo, file),
//                 err => {
//                     if (err !== null) {
//                         console.log(err);
//                     }
//                     if (--n == 0){
//                         readyCallback();
//                     }
//                 });
//         });
//     })
// }
//
// fs.mkdir(path.join(__dirname, './temp'), err => {
//     if (err !== null && err.code !== 'EEXIST') {
//         console.log(err);
//         return;
//     }
//
//     changeFolder('./students-20.00', './temp', () => {
//         changeFolder('./students-18.00', './students-20.00', () => {
//             changeFolder('./temp', './students-18.00', () => {
//                 fs.rmdir(path.join(__dirname, './temp'), (err) => {
//                     if (err !== null) {
//                         console.log(err);
//                     }
//                 });
//             });
//         });
//     });
// });

//----------------------callback----------------
const path = require('path');
const fs = require('fs');
// const fsp = require('fs').promises;

function swap(folderFrom, folderTo) {
    const directoryFrom = path.join(__dirname, folderFrom);
    const directoryTo = path.join(__dirname, folderTo);
    const directorySwapFolder = path.join(__dirname, 'swapFolder');

    createDirectory(directorySwapFolder)
        .then(() => copyFile(directoryFrom, directorySwapFolder))
        .then(() => copyFile(directoryTo, directoryFrom))
        .then(() => copyFile(directorySwapFolder, directoryTo))
        .then(() => deleteDirectory(directorySwapFolder))
        .catch(err => console.log(err));



}

const createDirectory = (directorySwapFolder) => new Promise((resolve, reject) => {
        fs.mkdir(directorySwapFolder, err => {
            if (err) reject(err);
            resolve()
        })
    });

const deleteDirectory = (directorySwapFolder) => new Promise((resolve, reject) => {
    fs.rmdir(directorySwapFolder, err => {
        if (err) reject (err);
        resolve()
    })
});



const copyFile = (directoryFrom, directoryTo) => new Promise((resolve, reject) => {
    fs.readdir(directoryFrom, (err, files) => {
        if (err) reject (err);
        resolve(files);
    })
}).then(files => new Promise((resolve, reject) => {
    const promises = [];
    console.log('1');
    for (const file of files) {
        console.log('2');
        promises.push(moveFile(directoryFrom, directoryTo, file));
        console.log('3');
    }
    console.log('4');
    Promise.all(promises).then(() => {
        console.log('FINISHED MOVED AND GOINT TO NEXT COPY FILE');
        resolve()
    });
}));

const moveFile = (directoryFrom, directoryTo, file) => new Promise((resolve, reject) => {
    fs.rename(path.join(directoryFrom, file), path.join(directoryTo, file), err => {
        if (err) reject(err);
        console.log('MOVED FILE');
        resolve();
    });
});


//     // console.log(files);
//     for (const file of files) {
//         fs.rename(
//             path.join(directoryFrom, file),
//             path.join(directoryTo, file),
//             err => {
//                 if (err) reject (err)
//             }
//         )
//     }
//     resolve();
// }));

swap('students-18.00', 'students-20.00')
//----------------------promises---------------
// const path = require('path');
// const fs = require('fs').promises;// позволит сделать нашу ф-цию асинхронной
//
//
// async function swap(folderFrom, folderTo) {
//     const directoryFrom = path.join(__dirname, folderFrom);
//     const directoryTo = path.join(__dirname, folderTo);
//     const directorySwapFolder = path.join(__dirname, 'swapFolder');
//
//     await fs.mkdir(directorySwapFolder); //создание промежуточной папки
//     await copyFile(directoryFrom, directorySwapFolder);//перемещаем файлы с первой папки в промежуточную
//     await copyFile(directoryTo, directoryFrom);//переносим файлы со второй папки в первую
//     await copyFile(directorySwapFolder, directoryTo);// переносим файлы с временной папки во вторую
//     await fs.rmdir(directorySwapFolder);//удаляем промежуточную папку
//
// }
//
//
//
// async function copyFile(directoryFrom, directoryTo) {
//     const files = await fs.readdir(directoryFrom);
//     // console.log(files);
//     for (const file of files){
//         await fs.rename(
//             path.join(directoryFrom, file),
//             path.join(directoryTo, file)
//         )
//
//     }
// }
//
// swap('students-18.00', 'students-20.00');

