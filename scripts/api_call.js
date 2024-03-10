
var addSingleQuestionEndPoint = "https://api-admin-cybermd.com/addSingleQuestion";
var addQuestionThroughFileEndPoint = "https://api-admin-cybermd.com/addQuestionsThroughFile";
var editSingleQuestionEndPoint = "https://api-admin-cybermd.com/editSingleQuestion";
var searchQuestionEndPoint = "https://api-admin-cybermd.com/searchQuestion";
var loginEndPoint = "https://api-admin-cybermd.com/login";
var getAnalyticsEndPoint = "https://api-admin-cybermd.com/getAnalytics";
var deleteQuestionEndPoint = "https://api-admin-cybermd.com/deleteQuestion";
var generateCaptchaEndPoint = "https://api-admin-cybermd.com/generate_captcha";
var getAllQuestionsEndPoint = "https://api-admin-cybermd.com/getAllQuestions";
var getAllVideosEndPoint = "https://api-admin-cybermd.com/getAllVideos";
var addVideoEndPoint = "https://api-admin-cybermd.com/addVideo";
var getVideoEndPoint = "https://api-admin-cybermd.com/getVideo";
var editVideoEndPoint = "https://api-admin-cybermd.com/editVideo";
var deleteVideoEndPoint = "https://api-admin-cybermd.com/deleteVideo";


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
        case "getAllQuestions":
            return getAllQuestionsEndPoint;
        case "getAllVideos":
            return getAllVideosEndPoint;
        case "addVideo":
            return addVideoEndPoint;
        case "getVideo":
            return getVideoEndPoint;
        case "editVideo":
            return editVideoEndPoint;
        case "deleteVideo":
            return deleteVideoEndPoint;
    }
}
