function getAllIncorrectAnswerChoices()
{
    let incorrectAnswerId = "incorrectAnswer";
    let incorrectAnswerExplantionId = "incorrectAnswerExplanation";

    let incorrectAnswerIndex = 1;
    let incorrectAnswers = [];
    let incorrectExplantion = {};

    while(1 == 1)
    {
        try
        {
            answerText = String(document.getElementById(incorrectAnswerId + incorrectAnswerIndex).value);
            explanationText = String(document.getElementById(incorrectAnswerExplantionId + incorrectAnswerIndex).value);

            if(answerText && explanationText)
            {
                incorrectAnswers.push(answerText);
                incorrectExplantion[answerText] = explanationText;
            }
        }catch
        {
            break;
        }
        
        incorrectAnswerIndex += 1;
    }

    return {"incorrectAnswers" : incorrectAnswers, "incorrectExplanations":incorrectExplantion}

}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  

function handleFileSelect(event) {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        const base64String = e.target.result;
  
        document.getElementById('questionImageBase64').value = base64String;

      };
  
      reader.readAsDataURL(file);
    }
  }

function addSingleQuestionAPICall()
{
    let overallCategory = document.getElementById("overallQuestionCategory");
    overallCategory = overallCategory.options[overallCategory.selectedIndex].text;

    let questionCategory = document.getElementById("questionCategory");
    questionCategory = questionCategory.options[questionCategory.selectedIndex].text;

    let subQuestionCategory = document.getElementById("subQuestionCategory");
    subQuestionCategory = subQuestionCategory.options[subQuestionCategory.selectedIndex].text;

    let question = document.getElementById("question").value;
    let correctAnswer = document.getElementById("correctAnswer").value;

    let correctAnswerExplanation = {}
    correctAnswerExplanation[correctAnswer] = document.getElementById("correctAnswerExplanation").value;

    let incorrectAnswerValues = getAllIncorrectAnswerChoices();
    let incorrectAnswers = incorrectAnswerValues["incorrectAnswers"];
    let incorrectExplanations = incorrectAnswerValues["incorrectExplanations"]; // Dictionary
    
    incorrectAnswers.push(correctAnswer);

    let answers =  incorrectAnswers//list

    let image = document.getElementById("questionImageBase64").value;
    let references = document.getElementById("references").value;

    let testType = document.getElementById("testType").value;

    let params = {
                  "overallCategory":overallCategory,
                  "questionCategory":questionCategory, 
                  "subQuestionCategory":subQuestionCategory,
                  "question":question,
                  "answers": shuffle(answers),
                  "correctAnswer":correctAnswer,
                  "correctExplanation":correctAnswerExplanation,
                  "incorrectExplanation":incorrectExplanations,
                  "image":image,
                  "references":references,
                  "jwt":localStorage.getItem("CYBERMD_TOKEN_A"),
                  "username":localStorage.getItem("CYBERMD_USERNAME_A"),
                  "testType": testType};

    endpointCall("addSingleQuestion", params, function(data)
                                {
                                    //Store id and name in cookies for later use
                                    if(data["status"] == "success")
                                    {
                                        alert("Successfully added question!");
                                        location.reload()
                                        return;
                                    }else if(data["status"] == "failed")
                                    {
                                        alert("Failed to add question!");
                                        return; 
                                    }
                                });
}

function editSingleQuestionAPICall()
{

    let questionId = document.getElementById("questionId").innerHTML;
    let overallCategory = document.getElementById("overallQuestionCategory");
    overallCategory = overallCategory.options[overallCategory.selectedIndex].text;

    let questionCategory = document.getElementById("questionCategory");
    questionCategory = questionCategory.options[questionCategory.selectedIndex].text;

    let subQuestionCategory = document.getElementById("subQuestionCategory");
    subQuestionCategory = subQuestionCategory.options[subQuestionCategory.selectedIndex].text;

    let question = document.getElementById("question").value;
    let correctAnswer = document.getElementById("correctAnswer").value;

    let correctAnswerExplanation = {}
    correctAnswerExplanation[correctAnswer] = document.getElementById("correctAnswerExplanation").value;

    let incorrectAnswerValues = getAllIncorrectAnswerChoices();
    let incorrectAnswers = incorrectAnswerValues["incorrectAnswers"];
    let incorrectExplanations = incorrectAnswerValues["incorrectExplanations"]; // Dictionary
    
    incorrectAnswers.push(correctAnswer);

    let answers =  incorrectAnswers//list

    let image = document.getElementById("questionImageBase64").value;
    let references = document.getElementById("references").value;

    let testType = document.getElementById("testType").value;

    let params = {
                  "questionId":questionId,
                  "overallCategory":overallCategory,
                  "questionCategory":questionCategory, 
                  "subQuestionCategory":subQuestionCategory,
                  "question":question,
                  "answers":answers,
                  "correctAnswer":correctAnswer,
                  "correctExplanation":correctAnswerExplanation,
                  "incorrectExplanation":incorrectExplanations,
                  "image":image,
                  "references":references,
                  "jwt":localStorage.getItem("CYBERMD_TOKEN_A"),
                  "username":localStorage.getItem("CYBERMD_USERNAME_A"),
                  "testType": testType};

    endpointCall("editSingleQuestion", params, function(data)
                                {
                                    //Store id and name in cookies for later use
                                    if(data["status"] == "success")
                                    {
                                        alert("Successfully edited question!");
                                        return;
                                    }else if(data["status"] == "failed")
                                    {
                                        alert("Failed to edit question!");
                                        return; 
                                    }
                                });
}

function displayFailedQuestions(failedQuestions)
{
    let failedQuestionsHtml = `<h3>Questions that did not go through!</h3><p>Note: A reason due to the failing could be due to some characters like (' or ")</p><br>`;
    failedQuestions.forEach(function (failedQuestion, index) {
        failedQuestionsHtml += `<p>${index+1} - ${failedQuestion}</p><br><br>`
      });

    document.getElementById('failedQuestionsContainer').innerHTML = failedQuestionsHtml;
}

function addQuestionsThroughFileCall()
{
    let questionFile = document.getElementById("questionsFile").files[0];

    var reader = new FileReader();
    reader.readAsText(questionFile, "UTF-8");

    reader.onload = function (evt) {
        let params = {"questionFileContents": evt.target.result, "jwt":localStorage.getItem("CYBERMD_TOKEN_A"),"username":localStorage.getItem("CYBERMD_USERNAME_A")};

        endpointCall("addQuestionsThroughFile", params, function(data)
                                    {
                                        //Store id and name in cookies for later use
                                        if(data["status"] == "success")
                                        {
                                            alert("Successfully added all questions!");
                                            return;
                                        }else if(data["status"] == "failed")
                                        {
                                            alert("Failed to add all questions!");
                                            displayFailedQuestions(data['failedQuestions']);
                                            return; 
                                        }
                                    });
    }



}

function searchQuestion(callBack=null, questionId  = null)
{

    let params = {"questionId": questionId,"jwt":localStorage.getItem("CYBERMD_TOKEN_A"), "username":localStorage.getItem("CYBERMD_USERNAME_A")};

    endpointCall("searchQuestion", params, function(data)
                                {
                                    //Store id and name in cookies for later use
                                    if(data["status"] == "success")
                                    {
                                        callBack(data["questionData"]);
                                    }else if(data["status"] == "failed")
                                    {
                                        alert("Could not find question! Please make sure the id is correct.");
                                        callBack(null); 
                                    }
                                });
}

function deleteQuestionApiCall(questionId, callBack=null)
{

    let params = {"questionId": questionId,"jwt":localStorage.getItem("CYBERMD_TOKEN_A"), "username":localStorage.getItem("CYBERMD_USERNAME_A")};

    endpointCall("deleteQuestion", params, function(data)
                                {
                                    //Store id and name in cookies for later use
                                    if(data["status"] == "success")
                                    {
                                        alert("Question has been deleted!");
                                        location.reload();
                                        callBack(null);
                                    }else if(data["status"] == "failed")
                                    {
                                        alert("Could not delete question!");
                                        callBack(null); 
                                    }
                                });
}


function getAnalytics(callBack=null)
{

    let params = {"jwt":localStorage.getItem("CYBERMD_TOKEN_A"), "username":localStorage.getItem("CYBERMD_USERNAME_A")};

    endpointCall("getAnalytics", params, function(data)
                                {
                                    //Store id and name in cookies for later use
                                    if(data["status"] == "success")
                                    {
                                        callBack(data["analytics"]);
                                    }else if(data["status"] == "failed")
                                    {
                                        alert("Could not fetch analytics. Please try again.");
                                        callBack(null); 
                                    }
                                });
}

function getAllQuestions(callBack=null)
{
    
    let params = {"jwt":localStorage.getItem("CYBERMD_TOKEN_A"), "username":localStorage.getItem("CYBERMD_USERNAME_A")};

    endpointCall("getAllQuestions", params, function(data)
                                {
                                    //Store id and name in cookies for later use
                                    if(data["status"] == "success")
                                    {
                                        callBack(data["allQuestionData"]);
                                    }else if(data["status"] == "failed")
                                    {
                                        alert("Could not find question! Please make sure the id is correct.");
                                        callBack(null); 
                                    }
                                });
}

function getAllVideos(callBack = null)
{
    
    let params = {"jwt":localStorage.getItem("CYBERMD_TOKEN_A"), "username":localStorage.getItem("CYBERMD_USERNAME_A")};

    endpointCall("getAllVideos", params, function(data)
                                {
                                    //Store id and name in cookies for later use
                                    if(data["status"] == "success")
                                    {
                                        callBack(data["allVideoData"]);
                                    }else if(data["status"] == "failed")
                                    {
                                        alert("Could not find video! Error occured");
                                        callBack(null); 
                                    }
                                });
}

function addVideoCall()
{
    let videoCategory = document.getElementById("videoCategory");
    videoCategory = videoCategory.options[videoCategory.selectedIndex].text;

    let videoThumbnail = document.getElementById("videoThumbnail").value;
    let videoLink = document.getElementById("videoLink").value;
    let videoTitle = document.getElementById("videoTitle").value;

    let params = {"jwt":localStorage.getItem("CYBERMD_TOKEN_A"), 
                  "username":localStorage.getItem("CYBERMD_USERNAME_A"),
                  "videoCategory":videoCategory,
                  "videoThumbnail":videoThumbnail, 
                  "videoLink":videoLink,
                  "videoTitle":videoTitle};

    endpointCall("addVideo", params, function(data)
                                {
                                    //Store id and name in cookies for later use
                                    if(data["status"] == "success")
                                    {
                                        alert("Successfully added video!");
                                        location.reload();
                                        return;
                                    }else if(data["status"] == "failed")
                                    {
                                        alert("Failed to add video!");
                                        return; 
                                    }
                                });
}

function getVideo(callBack = null, videoId = null)
{
    let params = {"jwt":localStorage.getItem("CYBERMD_TOKEN_A"), 
                  "username":localStorage.getItem("CYBERMD_USERNAME_A"),
                  "videoId": videoId};

    endpointCall("getVideo", params, function(data)
                                {
                                    if(data["status"] == "success")
                                    {
                                        callBack(data["allVideoData"][0]);
                                    }else if(data["status"] == "failed")
                                    {
                                        alert("Could not find video! Error occured");
                                        callBack(null); 
                                    }
                                });
}

function editVideoCall(videoId = null)
{
    let videoCategory = document.getElementById("videoCategory");
    videoCategory = videoCategory.options[videoCategory.selectedIndex].text;

    let videoThumbnail = document.getElementById("videoThumbnail").value;
    let videoLink = document.getElementById("videoLink").value;
    let videoTitle = document.getElementById("videoTitle").value;

    let params = {"jwt":localStorage.getItem("CYBERMD_TOKEN_A"), 
                  "username":localStorage.getItem("CYBERMD_USERNAME_A"),
                  "videoId":videoId,
                  "videoCategory":videoCategory,
                  "videoThumbnail":videoThumbnail, 
                  "videoLink":videoLink,
                  "videoTitle":videoTitle};

    endpointCall("editVideo", params, function(data)
                                {
                                    //Store id and name in cookies for later use
                                    if(data["status"] == "success")
                                    {
                                        alert("Successfully edited video!");
                                        location.reload();
                                        return;
                                    }else if(data["status"] == "failed")
                                    {
                                        alert("Failed to edited video!");
                                        return; 
                                    }
                                });
}

function deleteVideoApiCall(videoId = null)
{
    let params = {"jwt":localStorage.getItem("CYBERMD_TOKEN_A"), 
                  "username":localStorage.getItem("CYBERMD_USERNAME_A"),
                  "videoId": videoId};

    endpointCall("deleteVideo", params, function(data)
                                {
                                    if(data["status"] == "success")
                                    {
                                        alert("Successfully deleted video!");
                                        location.reload();
                                    }else if(data["status"] == "failed")
                                    {
                                        alert("Could not find video! Error occured");
                                    }
                                });
}

