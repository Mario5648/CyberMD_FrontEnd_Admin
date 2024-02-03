var currentIncorrectAnswersCount = 1


function renderQuestionOptions()
{
    let questionOptionHtml = `
                                <span>
                                    <h2>Questions</h2>
                                    <button onclick="renderSingleQuestionAddition()" class="questionOptionButton">Add Single Question</button>
                                    <button onclick="renderFileQuestionAddition()" class="questionOptionButton">Add Questions From File</button>
                                    <button onclick="renderSearchQuestion()" class="questionOptionButton">Edit Question</button>
                                </span>
                             `;

    document.getElementById('content').innerHTML = questionOptionHtml;
}

function renderSearchQuestion()
{


        //make api call
        getAllQuestions( function(allQuestionsData)
        {
            
    
            if(allQuestionsData)
            {
    
                let editQuestionHtml = `
                                <span>
                                    <h2>Edit Question</h2>

                                    <div>
                                        <table id="allQuestionTable" class="display">
                                            <thead>
                                                <tr>
                                                    <th>Question Id</th>
                                                    <th>Category</th>
                                                    <th>Question</th>
                                                    <th>Edit Question</th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                </span>
                `;

                document.getElementById('content').innerHTML = editQuestionHtml;

                index = 0;
                let table = new DataTable('#allQuestionTable', {
                responsive: true,
                data: allQuestionsData,
                columns: [
                    { data: "QID" },
                    { data: 'QUESTION_CATEGORY' },
                    { data: 'QUESTION' },
                    { 
                        data: '',
                        render: (data,type,row) => {
                            index+=1;
                            return `<button style="background-color:#3486eb;color:#FFF;border-style:none;padding-top: 10px;padding-bottom:10px;padding-right:10px;padding-left:10px;" onclick='renderEditQuestion("${row["QID"]}")'>Edit Question</button>`;
                        }
                    }
                ],

                });
    
            }
        });
    
}


function renderFileQuestionAddition()
{
    let questionFileHtml = `
                            <span>
                                <h2>Add Questions through CSV File</h2>

                                <label for="questionsFile">CSV Questions File :</label><br>
                                <input type="file" id="questionsFile" name="questionsFile">

                                <br>
                                <br>
                                <button onclick="addQuestionsThroughFileCall()">Submit Question File</button>
                                <br>
                                <br>


                                <div id="failedQuestionsContainer">
                                </div>

                            </span>
                            `;

    document.getElementById('content').innerHTML = questionFileHtml;
}


function renderSingleQuestionAddition()
{
    let questionOptionHtml = `
                                <span>
                                    <h2>Add a Single Question</h2>
                                    
                                    <div>
                                        <label for="questionCategory">Question Category :</label><br>
                                        <select name="questionCategory" id="questionCategory">
                                            <option value="Behavioral Health">Behavioral Health</option>
                                            <option value="Biostats/Epidemiology">Biostats/Epidemiology</option>
                                            <option value="Cardiovascular">Cardiovascular</option>
                                            <option value="Endocrine">Endocrine</option>
                                            <option value="Gastrointestinal">Gastrointestinal</option>
                                            <option value="General Principles">General Principles</option>
                                            <option value="Hematology/Oncology">Hematology/Oncology</option>
                                            <option value="Immunology">Immunology</option>
                                            <option value="Musculoskeletal/Dermatology">Musculoskeletal/Dermatology</option>
                                            <option value="Multisystem Processes and Disorders">Multisystem Processes and Disorders</option>
                                            <option value="Nervous System/Special Senses">Nervous System/Special Senses</option>
                                            <option value="Renal">Renal</option>
                                            <option value="Reproductive">Reproductive</option>
                                            <option value="Respiratory">Respiratory</option>
                                        </select>

                                        <br>
                                        <br>

                                        <label for="testType">Test Type :</label><br>
                                        <select name="testType" id="testType">
                                            <option value="step1">STEP 1</option>
                                            <option value="step2">STEP 2</option>
                                        </select>

                                        <br>
                                        <br>

                                        <label for="question">Question :</label><br>
                                        <textarea id="question" name="question" rows="4" cols="50"></textarea>

                                        <br>
                                        <br>

                                        <hr>

                                        <h3>Answer Choices</h3>

                                        <h4>Correct Answer</h4>

                                        <label for="correctAnswer">Correct Answer :</label><br>
                                        <input id="correctAnswer" type="text"></input>

                                        <br>
                                        <br>

                                        <label for="correctAnswerExplanation">Correct Answer Explanation :</label><br>
                                        <textarea id="correctAnswerExplanation" name="correctAnswerExplanation" rows="4" cols="50"></textarea>

                                        <br>
                                        <br>

                                        <h4>Incorrect Answers</h4>

                                        <div id="incorrectAnswersContainer">
                                            <label for="incorrectAnswer1">Incorrect Answer 1 :</label><br>
                                            <input id="incorrectAnswer1" type="text"></input>

                                            <br>
                                            <br>

                                            <label for="incorrectAnswerExplanation1">Incorrect Answer Explanation 1 :</label><br>
                                            <textarea id="incorrectAnswerExplanation1" name="incorrectAnswerExplanation1" rows="4" cols="50"></textarea><br>

                                        </div>
                                        
                                        <br>
                                        <br>

                                        <button onclick="addIncorrectAnswer()">+ Add Incorrect Answer</button>

                                        <br>
                                        <br>

                                        <hr>
                                        <input type="hidden" id="questionImageBase64" name="questionImageBase64">


                                        <label for="questionImage">Image for Question :</label><br>
                                        <input type="file" id="questionImage" name="questionImage">

                                        <br>
                                        <br>

                                        <label for="references">Question/Answer References :</label><br>
                                        <textarea id="references" name="references" rows="4" cols="50"></textarea>

                                        <br>
                                        <br>
                                    <div>
                                    <br>
                                    <br>
                                    <br>
                                    <button onclick="addSingleQuestionAPICall()">Submit Question</button>
                                    <br>
                                    <br>
                                </span>
                            `;

document.getElementById('content').innerHTML = questionOptionHtml;
const fileInput = document.getElementById('questionImage');

fileInput.addEventListener('change', handleFileSelect);

}


function renderEditQuestion(questionId)
{

    //make api call
    searchQuestion( function(questionDataDictionary)
    {
        

        if(questionDataDictionary)
        {

            //populate fields with data
            questionOptionHtml = populatefields(questionDataDictionary)
            document.getElementById('content').innerHTML = questionOptionHtml;
            const fileInput = document.getElementById('questionImage');

            fileInput.addEventListener('change', handleFileSelect);

        }
    }, questionId = questionId);

}


function populatefields(questionDataDictionary)
{
    let qid = questionDataDictionary["QID"];
    let questionCategory = questionDataDictionary["QUESTION_CATEGORY"];
    let question = questionDataDictionary["QUESTION"];
    let answerChoices = questionDataDictionary["ANSWER_CHOICES"];
    let correctAnswer = questionDataDictionary["CORRECT_ANSWER"];
    let correctExplanation = questionDataDictionary["CORRECT_EXPLANATION"];
    let incorrectExplanation = questionDataDictionary["INCORRECT_EXPLANATION"];
    let image = questionDataDictionary["IMAGE"];
    let questionReferences = JSON.parse(questionDataDictionary["QUESTION_REFERENCES"]);
    let testType = questionDataDictionary["TEST_TYPE"];

    let questionOptionHtml = `
                                <span>
                                    <h2>Edit a Single Question</h2>
                                    
                                    <h4>Question Id : <span id="questionId">${qid}</span></h4>
                                    <a onclick="renderSearchQuestion()"><i class="fa fa-arrow-circle-o-left" style="font-size:35px"></i></a><br><br><br><br>

                                    <div>
                                        <label for="questionCategory">Question Category :</label><br>
                                        <select name="questionCategory" id="questionCategory" selected="${questionCategory}">
                                            <option value="Behavioral Health" ${(questionCategory == "Behavioral Health" ? "selected":"")}>Behavioral Health</option>
                                            <option value="Biostats/Epidemiology" ${(questionCategory == "Biostats/Epidemiology" ? "selected":"")}>Biostats/Epidemiology</option>
                                            <option value="Cardiovascular" ${(questionCategory == "Cardiovascular" ? "selected":"")}>Cardiovascular</option>
                                            <option value="Endocrine" ${(questionCategory == "Endocrine" ? "selected":"")}>Endocrine</option>
                                            <option value="Gastrointestinal" ${(questionCategory == "Gastrointestinal" ? "selected":"")}>Gastrointestinal</option>
                                            <option value="General Principles" ${(questionCategory == "General Principles" ? "selected":"")}>General Principles</option>
                                            <option value="Hematology/Oncology" ${(questionCategory == "Hematology/Oncology" ? "selected":"")}>Hematology/Oncology</option>
                                            <option value="Immunology" ${(questionCategory == "Immunology" ? "selected":"")}>Immunology</option>
                                            <option value="Musculoskeletal/Dermatology" ${(questionCategory == "Musculoskeletal/Dermatology" ? "selected":"")}>Musculoskeletal/Dermatology</option>
                                            <option value="Multisystem Processes and Disorders" ${(questionCategory == "Multisystem Processes and Disorders" ? "selected":"")}>Multisystem Processes and Disorders</option>
                                            <option value="Nervous System/Special Senses" ${(questionCategory == "Nervous System/Special Senses" ? "selected":"")}>Nervous System/Special Senses</option>
                                            <option value="Renal" ${(questionCategory == "Renal" ? "selected":"")}>Renal</option>
                                            <option value="Reproductive" ${(questionCategory == "Reproductive" ? "selected":"")}>Reproductive</option>
                                            <option value="Respiratory" ${(questionCategory == "Respiratory" ? "selected":"")}>Respiratory</option>
                                        </select>

                                        <br>
                                        <br>

                                        <label for="testType">Test Type :</label><br>
                                        <select name="testType" id="testType">
                                            <option value="step1" ${(testType == "step1" ? "selected":"")}>STEP 1</option>
                                            <option value="step2" ${(testType == "step2" ? "selected":"")}>STEP 2</option>
                                        </select>

                                        <br>
                                        <br>

                                        <label for="question">Question :</label><br>
                                        <textarea id="question" name="question" rows="4" cols="50">${question}</textarea>

                                        <br>
                                        <br>

                                        <hr>

                                        <h3>Answer Choices</h3>

                                        <h4>Correct Answer</h4>

                                        <label for="correctAnswer">Correct Answer :</label><br>
                                        <input id="correctAnswer" type="text" value="${correctAnswer}"></input>

                                        <br>
                                        <br>

                                        <label for="correctAnswerExplanation">Correct Answer Explanation :</label><br>
                                        <textarea id="correctAnswerExplanation" name="correctAnswerExplanation" rows="4" cols="50">${JSON.parse(correctExplanation)[correctAnswer]}</textarea>

                                        <br>
                                        <br>

                                        <h4>Incorrect Answers</h4>

                                        <div id="incorrectAnswersContainer">
                                            ${populateIncorrectAnswersAndExplanations(incorrectExplanation)}
                                        </div>
                                        
                                        <br>
                                        <br>

                                        <button onclick="addIncorrectAnswer()">+ Add Incorrect Answer</button>

                                        <br>
                                        <br>

                                        <hr>

                                        <div>
                                            <img src="${image}" style="width:300px;height:300px"></img>
                                        </div>

                                        <input type="hidden" id="questionImageBase64" name="questionImageBase64" value="${image}">

                                        <label for="questionImage">Image for Question :</label><br>
                                        <input type="file" id="questionImage" name="questionImage">

                                        <br>
                                        <br>

                                        <label for="references">Question/Answer References :</label><br>
                                        ${questionReferences == "" ? `<textarea id="references" name="references" rows="4" cols="50"></textarea>` : `<textarea id="references" name="references" rows="4" cols="50">${questionReferences}</textarea>`}

                                        <br>
                                        <br>
                                    <div>
                                    <br>
                                    <br>
                                    <br>
                                    <button onclick="editSingleQuestionAPICall()">Submit Question</button>

                                    <button id="deleteQuestionButton" style="background-color:red;color:white;border-color:red;" onclick="renderDeleteQuestionModal('${qid}')">Delete Question</button><br><br>

                                    <br>
                                    <br>
                                </span>
    `;

    return questionOptionHtml;
}


function renderDeleteQuestionModal(questionId)
{
    let renderModalHtml = `
                <div id="myModal" class="modal">

                    <!-- Modal content -->
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <h2>Are you sure you want to delete question?</h2>
                        <h3>Qustion Id : ${questionId}</h3><br><br>

                        <button style="background-color:red;color:white;border-color:red;" onclick="deleteQuestionApiCall('${questionId}')">Delete Question</button>
                    </div>
            
                </div>
    `;

    document.getElementById('content').innerHTML += renderModalHtml;
    document.getElementById("myModal").style.display = "block";

    document.getElementsByClassName("close")[0].onclick = function() {
        document.getElementById("myModal").style.display = "none";
      };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == document.getElementById("myModal")) {
            document.getElementById("myModal").style.display = "none";
        }
    }

}



function populateIncorrectAnswersAndExplanations(incorrectExplanationsDictionary)
{
    let incorrectAnswerId = "incorrectAnswer";
    let incorrectAnswerExplantionId = "incorrectAnswerExplanation";

    let incorrectAnswersFieldsHtml = ``;

    incorrectExplanationsDictionary = JSON.parse(incorrectExplanationsDictionary)

    let incorrectAnswerIndex = 1;
  
    for (const [incorrectAnswer, incorrectAnswerExplanation] of Object.entries(incorrectExplanationsDictionary)) 
    {
        incorrectAnswersFieldsHtml += `
                                        <label for="incorrectAnswer${incorrectAnswerIndex}">Incorrect Answer ${incorrectAnswerIndex} :</label><br>
                                        <input id="incorrectAnswer${incorrectAnswerIndex}" type="text" value="${incorrectAnswer}"></input>

                                        <br><br>

                                        <label for="incorrectAnswerExplanation${incorrectAnswerIndex}">Incorrect Answer Explanation ${incorrectAnswerIndex} :</label><br>
                                        <textarea id="incorrectAnswerExplanation${incorrectAnswerIndex}" name="incorrectAnswerExplanation${incorrectAnswerIndex}" rows="4" cols="50">${incorrectAnswerExplanation}</textarea><br><br>

                                      `;

        incorrectAnswerIndex += 1
    }

    currentIncorrectAnswersCount = incorrectAnswerIndex - 1;
    

    return incorrectAnswersFieldsHtml
    
}


function addIncorrectAnswer()
{
    currentIncorrectAnswersCount += 1;
    document.getElementById('incorrectAnswersContainer').innerHTML += `
    
                                        <label for="incorrectAnswer${currentIncorrectAnswersCount}">Incorrect Answer ${currentIncorrectAnswersCount} :</label><br>
                                        <input id="incorrectAnswer${currentIncorrectAnswersCount}" type="text"></input>

                                        <br>
                                        <br>

                                        <label for="incorrectAnswerExplanation${currentIncorrectAnswersCount}">Incorrect Answer Explanation ${currentIncorrectAnswersCount} :</label><br>
                                        <textarea id="incorrectAnswerExplanation${currentIncorrectAnswersCount}" name="incorrectAnswerExplanation${currentIncorrectAnswersCount}" rows="4" cols="50"></textarea><br><br>
                                    
                                    `;
}

function checkUserLogin()
{
    let userToken = localStorage.getItem("CYBERMD_TOKEN_A");
    
    if( ! userToken)
    {
        window.open("./login.html","_self");
    }
}

function renderAnalyticsPage()
{

    //make api call
    getAnalytics( function(analyticsDataDictionary)
    {
        

        if(analyticsDataDictionary)
        {

            //populate fields with data
            analyticsHtml = populateAnalyticsField(analyticsDataDictionary)
            document.getElementById('content').innerHTML = analyticsHtml;

        }
    });

}



function populateAnalyticsField(analyticsDataDictionary)
{
    let analyticsPageHtml = `
                                <span>
                                    <h2>Cyber MD Analytics Dashboard</h2>

                                    <div id="boxAnalyticsContainer" class="boxAnalyticsContainer">

                                        <div id="totalUsers" class="boxAnalyticsBox">
                                            <p>Total Users</p>
                                            <p class="boxStatText">${analyticsDataDictionary["Total Users"]}</p>
                                        </div>
                                        <div id="totalQuestionsAnswered" class="boxAnalyticsBox">
                                            <p>Total Questions Answered</p>
                                            <p class="boxStatText">${analyticsDataDictionary["Total Questions Answered"]}</p>
                                        </div>
                                        <div id="avgPercentile" class="boxAnalyticsBox">
                                            <p>Average User Percentile</p>
                                            <p class="boxStatText">${analyticsDataDictionary["Avg Percentile"]}</p>
                                        </div>
                                        <div id="totalTimeSpent" class="boxAnalyticsBox">
                                            <p>Total Time Spent</p>
                                            <p class="boxStatText">${analyticsDataDictionary["Total Time On App"]} min</p>
                                        </div>

                                    </div>
                                    <br><br><br><br>
                                    <div id="chartCanvas1">
                                    </div>


                                </span>
    
                                `;

    /*

    FUTURE - ADD CHART ANALYTICS

    var barColors = ["#0b4f9d", "#0b4f9d","#0b4f9d","#0b4f9d"];
    document.getElementById("chartCanvas1").innerHTML = "";
    document.getElementById("chartCanvas1").innerHTML = `<center><p>Daily User Logins</p><canvas id="barchart1" style="width:100%;max-width:800px"></canvas></center>`;

    const questionChart = new Chart('barchart1', {
                            type: "bar",
                            data: {
                                labels: ["2024-01-05","2024-01-06","2024-01-07","2024-01-08"],
                                datasets: [{
                                backgroundColor: barColors,
                                data: [10,12,34,18]
                                }]
                            },
                            options: {
                                legend: {display: false},
                                title: {
                                display: true,
                                }
                            }
                            });
    */
   return analyticsPageHtml

}