// Cognitoユーザープールオーソライザーを使用した
// 認証付きAPI Gatewayの呼び出し(外部API)
function apicall(){
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
    req.open('GET','https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/prod?isbn=' +  + document.getElementById('isbn').value,false);
    cognitoUser.getSession(function(err, result) {
        req.setRequestHeader('Authorization', result.getIdToken().jwtToken);
    });
    req.send(null);
}
