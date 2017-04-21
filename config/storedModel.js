﻿var modelpriceref = [];
modelpriceref[0] = new Array("가솔린2.4모던", 30550000);
modelpriceref[1] = new Array("가솔린2.4프리미엄", 31750000);
modelpriceref[2] = new Array("가솔린2.4프리미엄 스페셜", 33750000);
modelpriceref[3] = new Array("가솔린3.0익스클루시브", 35500000);
modelpriceref[4] = new Array("가솔린3.0익스클루시브 스페셜", 38700000);
modelpriceref[5] = new Array("가솔린3.0익스클루시브스페셜프리미어인테리어셀렉션", 40200000);
modelpriceref[6] = new Array("가솔린3.3셀러브리티", 41600000);
modelpriceref[7] = new Array("디젤2.2모던", 33550000);
modelpriceref[8] = new Array("디젤2.2프리미엄", 34750000);
modelpriceref[9] = new Array("디젤2.2프리미엄 스페셜", 36750000);
var optionpriceref = [];
optionpriceref[0] = new Array("파노라마 썬루프", 1100000);
optionpriceref[1] = new Array("앞좌석 통풍+하이패스 시스템", 600000);
optionpriceref[2] = new Array("현대 스마트 센스 패키지IV", 1800000);
optionpriceref[3] = new Array("튜익스 컴포트 패키지", 780000);
optionpriceref[4] = new Array("헤드업 디스플레이(HUD)", 1000000);
optionpriceref[5] = new Array("현대 스마트 센스 패키지I", 1500000);
optionpriceref[6] = new Array("익스테리어 패키지I", 1500000);
optionpriceref[7] = new Array("현대 스마트 센스 패키지II", 1600000);
optionpriceref[8] = new Array("JBL 사운드 패키지", 1150000);
optionpriceref[9] = new Array("익스테리어 패키지II", 1000000);
optionpriceref[10] = new Array("어라운드 뷰 모니터(AVM) + 스마트 전동식 트렁크", 1200000);

var selectedmodels = [];

//유저 담을 배열
var user1 = [];
var user2;

exports.addmodel = function (sam) {
    var Cnt = selectedmodels.length;
    var insertflag = true;
    var fixmodel = new Array(sam[0], fixoptionname(sam[1]));

    var userYn = userId.length;

    console.log("user1::length " + user1.length);
    console.log("sam[0] " + sam[0]);
    console.log("sam[1] " + sam[1]);
    console.log("user2::length " + user2);

    if (selectedmodels.length != 0) {
        for (var idx = 0; idx < Cnt; idx++) {
            if (selectedmodels[idx][0] == fixmodel[0]) {
                if (selectedmodels[idx][1] == fixmodel[1]) {
                    insertflag = false;
                }
            }
        }
    }

    if (insertflag) {
        selectedmodels.push(fixmodel);
    }
    console.log(selectedmodels);
}

exports.getmodel = function (modelname) {
    var returnmodel = [];
    var tempmodel = [4];
    var Cnt = selectedmodels.length;
    for (var idx = 0; idx < Cnt; idx++) {
        tempmodel = [4];
        if (selectedmodels[idx][0] == modelname) {
            tempmodel[0] = selectedmodels[idx][0];
            var Cntmodel = modelpriceref.length;
            for (var idx2 = 0; idx2 < Cntmodel; idx2++) {
                if (modelpriceref[idx2][0] == selectedmodels[idx][0]) {
                    tempmodel[1] = modelpriceref[idx2][1];
                }
            }
            tempmodel[2] = selectedmodels[idx][1];
            tempmodel[3] = '';
            var Cntoption = optionpriceref.length;
            for (var idx3 = 0; idx3 < Cntoption; idx3++) {
                if (optionpriceref[idx3][0] == selectedmodels[idx][1]) {
                    tempmodel[3] = optionpriceref[idx3][1];
                }
            }
            returnmodel.push(tempmodel);
        }
    }
    return returnmodel;
}

exports.delmodel = function (sam) {
    var fixmodel = new Array(sam[0], fixoptionname(sam[1]));
    var Cnt = selectedmodels.length;
    var delnum = null;
    for (var idx = 0; idx < Cnt; idx++) {
        if (selectedmodels[idx][0] == fixmodel[0]) {
            if (selectedmodels[idx][1] == fixmodel[1]) {
                delnum = idx;
            }
        }
    }
    if (delnum != null) {
        selectedmodels.splice(delnum,1);
    }
    console.log(selectedmodels);
}

//option name partial matching check 
var fixoptionname = function(inputoptionname) {
    var returnoptionname;
    var Cntoption = optionpriceref.length;
    var indexnumber;
    for (var idx3 = 0; idx3 < Cntoption; idx3++) {
        var strindex = optionpriceref[idx3][0].search(inputoptionname);
        if (strindex == 0) {
            indexnumber = idx3;
        }
    }
    if (indexnumber == 0) {
        returnoptionname = optionpriceref[indexnumber][0];
    } else {
        returnoptionname = inputoptionname;
    }
    return returnoptionname;
}

exports.lastmodel = function () {
    if (selectedmodels.length > 0) {
        return selectedmodels[selectedmodels.length - 1];
    } else {
        return null;
    }
}