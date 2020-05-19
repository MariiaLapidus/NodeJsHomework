const path = require('path');
const fs = require('fs');

function changeFolder(folderFrom, folderTo, readyCallback) {
    fs.readdir(path.join(__dirname, folderFrom), (err, files) => {
        if (err !== null) {
            console.log(err);
            return;
        }
        console.log(files);
        let n = files.length;
        files.forEach((file, index) => {
            fs.rename(path.join(__dirname, folderFrom, file), path.join(__dirname, folderTo, file),
                err => {
                    if (err !== null) {
                        console.log(err);
                    }
                    if (--n == 0){
                        readyCallback();
                    }
                });
        });
    })
}

fs.mkdir(path.join(__dirname, './temp'), err => {
    if (err !== null && err.code !== 'EEXIST') {
        console.log(err);
        return;
    }

    changeFolder('./students-20.00', './temp', () => {
        changeFolder('./students-18.00', './students-20.00', () => {
            changeFolder('./temp', './students-18.00', () => {
                fs.rmdir(path.join(__dirname, './temp'), (err) => {
                    if (err !== null) {
                        console.log(err);
                    }
                });
            });
        });
    });
});
