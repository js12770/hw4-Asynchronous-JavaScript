var getNumberFromServer = function (label, callBackFunc) {
    var xmlHttpReg = null;
    xmlHttpReg = new XMLHttpRequest();
    if (xmlHttpReg != null) {
        xmlHttpReg.open("get", "/" + label, true);
        xmlHttpReg.send(null);
        xmlHttpReg.onreadystatechange = function () {
            if (xmlHttpReg.readyState == 4)
                callBackFunc(xmlHttpReg.responseText);
        }
    }
};

var buttonClick = function (liList, indexClicked) {
    if (liList[indexClicked].classList.contains('enable')) {
        var liClicked = liList[indexClicked];
        var spanClicked = liClicked.getElementsByTagName('span')[0];
        spanClicked.innerHTML = '...';
        spanClicked.classList.remove('nodisplay');
/*
        for (var i = liList.length - 1; i >= 0; --i)
            if (i != indexClicked) {
                liList[i].classList.remove('enable');
                liList[i].classList.add('disable');
            }
*/
        getNumberFromServer(indexClicked.toString(), function (liList, spanClicked, indexClicked) {
            return function (number) {
                spanClicked.innerHTML = number;
                var numberGot = 0;
                for (var i = liList.length - 1; i >= 0; --i)
                    if (liList[i].getElementsByTagName('span')[0].classList.contains('nodisplay')) {
                        liList[i].classList.remove('disable');
                        liList[i].classList.add('enable');
                    } else {
                        liList[i].classList.remove('enable');
                        liList[i].classList.add('disable');
                        if (liList[i].getElementsByTagName('span')[0].innerHTML != '...')
                            ++numberGot;
                    }
                if (numberGot == 5) {
                    var infoBar = document.getElementById('info-bar');
                    infoBar.classList.remove('disable');
                    infoBar.classList.add('enable');
                    infoBarClick(liList, infoBar);
                }
            };
        }(liList, spanClicked, indexClicked));
    }
};

var infoBarClick = function (liList, infoBar) {
    if (infoBar.classList.contains('enable')) {
        var hasValue = 0, sum = 0;
        for (var i = liList.length - 1; i >= 0; --i)
            if (liList[i].classList.contains('disable')) {
                var value = liList[i].getElementsByTagName('span')[0].innerHTML;
                if (value != '') {
                    ++hasValue;
                    sum += Number(value);
                }
            }
        if (hasValue == 5) {
            document.getElementById('result').innerHTML = sum.toString();
            infoBar.classList.remove('enable');
            infoBar.classList.add('disable');
        }
    }
};

var clear = function (liList, infoBar) {
    for (var i = liList.length - 1; i >= 0; --i) {
        liList[i].classList.remove('disable');
        liList[i].classList.add('enable');
        liList[i].getElementsByTagName('span')[0].classList.add('nodisplay');
    }
    infoBar.classList.remove('enable');
    infoBar.classList.add('disable');
    document.getElementById('result').innerHTML = '';
};

var main = function () {
    var liList = document.getElementsByTagName('li');
/*
    for (var i = liList.length - 1; i >= 0; --i)
        liList[i].onclick = function (i) {
            return function () {
                buttonClick(liList, i);
            }
        }(i);
*/
    var infoBar = document.getElementById('info-bar');
/*
    infoBar.onclick = function () {
        infoBarClick(liList, infoBar);
    };
*/
    document.getElementById('bottom-positioner').onmouseleave = function () {
        clear(liList, infoBar);
    };
    document.getElementsByClassName('apb')[0].onclick = function () {
        for (var i = liList.length - 1; i >= 0; --i)
            buttonClick(liList, i);
    }
    clear(liList, infoBar);
}

window.onload = function () {
    main();
};