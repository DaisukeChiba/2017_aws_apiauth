// Cognitoユーザープールオーソライザーを使用した
// 認証付きAPI Gatewayの呼び出し(外部API)
function apicall1(){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if((req.readyState == 4) && (req.status == 200)){
            // Google Books APIの返却結果から最初の1冊目の書籍情報を画面に表示
            var book = JSON.parse(req.response);
            var reqHtml = '<p>' + 'タイトル: ' + book.items[0].volumeInfo.title + '<br />';
            reqHtml = reqHtml + '説明: ' + book.items[0].volumeInfo.description + '</p>';
            document.getElementById('book_result').innerHTML = reqHtml;
        }
    }
    req.open('GET','https://cwi5f3nkv9.execute-api.ap-northeast-1.amazonaws.com/prod?isbn=' +  + document.getElementById('isbn').value,false);
    cognitoUser.getSession(function(err, result) {
        req.setRequestHeader('Authorization', result.getIdToken().jwtToken);
    });
    req.send(null);
}

// Cognitoユーザープールオーソライザーを使用した
// 認証付きAPI Gatewayの呼び出し(Node-RED API)
function apicall2(){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if((req.readyState == 4) && (req.status == 200)){
            // Node-REDで編集されたHTMLを画面に表示
            document.getElementById('program_result').innerHTML = req.response;
        }
    }
    req.open('GET','https://5hn8m6suf8.execute-api.ap-northeast-1.amazonaws.com/prod?area=130&genre=' + document.getElementById('genre').value,false);
    cognitoUser.getSession(function(err, result) {
        req.setRequestHeader('Authorization', result.getIdToken().jwtToken);
    });
    req.send(null);
}
