var addSingleQuestionEndPoint = "http://127.0.0.1:5000/addSingleQuestion";
var addQuestionThroughFileEndPoint = "http://127.0.0.1:5000/addQuestionsThroughFile";
var editSingleQuestionEndPoint = "http://127.0.0.1:5000/editSingleQuestion";
var searchQuestionEndPoint = "http://127.0.0.1:5000/searchQuestion";
var loginEndPoint = "http://127.0.0.1:5000/login";
var getAnalyticsEndPoint = "http://127.0.0.1:5000/getAnalytics";
var deleteQuestionEndPoint = "http://127.0.0.1:5000/deleteQuestion";
var generateCaptchaEndPoint = "http://127.0.0.1:5000/generate_captcha"

var ERROR_FLAG = "ERROR";

function endpointCall(endpoint=null, params={}, callBack=null)
{
    let endpointLink = identifyEndPoint(endpoint);
    const Http = new XMLHttpRequest();
    var params = JSON.stringify(params);
    Http.open( "POST", endpointLink );
    Http.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    Http.send(params);
    Http.onreadystatechange = ( e ) => 
    {
        //If the request was successful then populate everything
        if (Http.readyState == 4 && Http.status == 200) 
        {
            //parse the response from power automate to make it readable for the functions
            callBack(JSON.parse( Http.responseText ));
            
        }else
        {
            callBack(ERROR_FLAG);
        }
    }
}

function identifyEndPoint(endpoint=null)
{
    switch(endpoint)
    {
        case "addSingleQuestion":
            return addSingleQuestionEndPoint;
        case "addQuestionsThroughFile":
            return addQuestionThroughFileEndPoint;
        case "editSingleQuestion":
            return editSingleQuestionEndPoint;
        case "searchQuestion":
            return searchQuestionEndPoint;
        case "login":
            return loginEndPoint;
        case "getAnalytics":
            return getAnalyticsEndPoint;
        case "deleteQuestion":
            return deleteQuestionEndPoint;
        case "generateCaptcha":
            return generateCaptchaEndPoint;
    }
}