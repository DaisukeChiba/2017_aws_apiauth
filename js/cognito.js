// 共通設定
AWSCognito.config.region = 'ap-northeast-1';
var poolData = {
    UserPoolId : 'ap-northeast-1_xxxxxxxxx',
    ClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxx'
};
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

// サインイン(ユーザーの認証)
function signin(){
    var authenticationData = {
        Username : document.getElementById('signinemail').value,
        Password : document.getElementById('signinpassword').value
    };
    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
    var userData = {
        Username : document.getElementById('signinemail').value,
        Pool : userPool
    };
    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            location.href = 'mypage.html';
        },
        onFailure: function(err) {
            alert('サインインに失敗しました');
            return;
        },
    });
}
