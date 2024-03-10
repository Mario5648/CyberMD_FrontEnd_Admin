var currentIncorrectAnswersCount = 1
var CATEGORY_MAPPER = {
    "General Principles":{
                            "Biochemistry":
                            [
                                "Molecular",
                                "Cellular",
                                "Laboratory Techniques",
                                "Genetics",
                                "Nutrition",
                                "Metabolism",
                            ],
                            "Microbiology":
                            [
                                "Basic bacteriology",
                                "Clinical bacteriology",
                                "Mycology",
                                "Parasitology",
                                "Virology",
                                "Systems",
                                "Antimicrobials",
                            ],
                            "Pathology":
                            [
                                "Cellular Injury",
                                "Inflammation",
                                "Neoplasia",
                            ],
                            "Pharmacology":
                            [
                                "Pharmacokinetics and Pharmacodynamics",
                                "Autonomic Drugs",
                                "Toxicities and Side Effects",
                                "Miscellaneous",
                            ],
                            "Public Health Sciences":
                            [
                                "Epidemiology and Biostatistics",
                                "Ethics",
                                "Communication Skills",
                                "Healthcare Delivery",
                                "Quality and Safety",
                            ],
                            "Immunology":
                            [
                                "Lymphoid Structures",
                                "Cellular Components",
                                "Immune Responses",
                                "Immunosuppressants",
                            ],
                        },
    "Organ Systems":
    {
        "Cardiovascular":
        [
            "Embryology",
            "Anatomy",
            "Physiology",
            "Pathology",
            "Pharmacology",
        ],
        "Endocrine":
        [
            "Embryology",
            "Anatomy",
            "Physiology",
            "Pathology",
            "Pharmacology",
        ],
        "Gastrointestinal":
        [
            "Embryology",
            "Anatomy",
            "Physiology",
            "Pathology",
            "Pharmacology",
        ],
        "Hematology/Oncology":
        [
            "Embryology",
            "Anatomy",
            "Physiology",
            "Pathology",
            "Pharmacology",
        ],
        "Musculoskeletal/Dermatology":
        [
            "Anatomy and Physiology",
            "Pathology",
            "Dermatology",
            "Pharmacology",
        ],
        "Nervous System/Special Senses":
        [
            "Embryology",
            "Anatomy & Physiology",
            "Pathology",
            "Otology",
            "Ophthalmology",
            "Pharmacology",
        ],
        "Behavioral Health":
        [
            "Psychology",
            "Pathology",
            "Pharmacology",
        ],
        "Renal":
        [
            "Embryology",
            "Anatomy",
            "Physiology",
            "Pathology",
            "Pharmacology",
        ],
        "Reproductive":
        [
            "Embryology",
            "Anatomy",
            "Physiology",
            "Pathology",
            "Pharmacology",
        ],
        "Respiratory":
        [
            "Embryology",
            "Anatomy",
            "Physiology",
            "Pathology",
            "Pharmacology",
        ]
    }
}

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

function renderQuestionCategorySelectionEmptyCategories(selectedQuestionCategory = null)
{
    let selectionHtml = ``;
    let questionCategories = Object.keys(CATEGORY_MAPPER["General Principles"]).concat(Object.keys(CATEGORY_MAPPER["Organ Systems"]));
    for(let i = 0; i < questionCategories.length; i ++)
    {
        if(selectedQuestionCategory == questionCategories[i])
        {
            selectionHtml += `<option value="${questionCategories[i]}" selected>${questionCategories[i]}</option>`;
        }else
        {
            selectionHtml += `<option value="${questionCategories[i]}">${questionCategories[i]}</option>`;
        }
    }
    document.getElementById("questionCategory").innerHTML = selectionHtml;
}

function renderVideoCategorySelectionEmptyCategories(selectedQuestionCategory = null)
{
    let selectionHtml = ``;
    let questionCategories = Object.keys(CATEGORY_MAPPER["General Principles"]).concat(Object.keys(CATEGORY_MAPPER["Organ Systems"]));
    for(let i = 0; i < questionCategories.length; i ++)
    {
        if(selectedQuestionCategory == questionCategories[i])
        {
            selectionHtml += `<option value="${questionCategories[i]}" selected>${questionCategories[i]}</option>`;
        }else
        {
            selectionHtml += `<option value="${questionCategories[i]}">${questionCategories[i]}</option>`;
        }
    }
    document.getElementById("videoCategory").innerHTML = selectionHtml;
}

function renderQuestionCategorySelection(selectedOverallCategory = null, selectedQuestionCategory = null)
{
    let overallCategory = "";
    if(selectedOverallCategory == null)
    {
        overallCategory= document.getElementById("overallQuestionCategory");
        overallCategory = overallCategory.options[overallCategory.selectedIndex].text;
    }else
    {
        overallCategory = selectedOverallCategory;
    }

    let selectionHtml = ``;
    let questionCategories = Object.keys(CATEGORY_MAPPER[overallCategory]);
    for(let i = 0; i < questionCategories.length; i ++)
    {
        if(selectedQuestionCategory == questionCategories[i])
        {
            selectionHtml += `<option value="${questionCategories[i]}" selected>${questionCategories[i]}</option>`;
        }else
        {
            selectionHtml += `<option value="${questionCategories[i]}">${questionCategories[i]}</option>`;
        }
    }
    document.getElementById("questionCategory").innerHTML = selectionHtml;
    if(selectedOverallCategory == null)
    {
        renderQuestionSubCategorySelection();
    }
}

function renderQuestionSubCategorySelection(selectedOverallCategory = null, selectedQuestionCategory = null, selectedSubCategory = null)
{
    let overallCategory = "";
    let questionCategory = "";
    if(selectedOverallCategory == null)
    {
        overallCategory = document.getElementById("overallQuestionCategory");
        overallCategory = overallCategory.options[overallCategory.selectedIndex].text;
    }else
    {
        overallCategory = selectedOverallCategory;
    }

    if(selectedQuestionCategory == null)
    {
        questionCategory = document.getElementById("questionCategory");
        questionCategory = questionCategory.options[questionCategory.selectedIndex].text;
    }else
    {
        questionCategory = selectedQuestionCategory;
    }

    let subCategoryList = CATEGORY_MAPPER[overallCategory][questionCategory];

    let optionsHtml = ``;
    for(let i =0 ; i < subCategoryList.length; i++)
    {
        if(selectedSubCategory == subCategoryList[i])
        {
            optionsHtml += `<option value="${subCategoryList[i]}" selected>${subCategoryList[i]}</option>`;
        }else
        {
            optionsHtml += `<option value="${subCategoryList[i]}">${subCategoryList[i]}</option>`;
        }
    }

    document.getElementById('subQuestionCategory').innerHTML = optionsHtml;
}

function renderSingleQuestionAddition()
{
    let questionOptionHtml = `
                                <span>
                                    <h2>Add a Single Question</h2>
                                    
                                    <div>
                                        <label for="overallQuestionCategory">Overall Question Category :</label><br>
                                        <select name="overallQuestionCategory" id="overallQuestionCategory" onchange="renderQuestionCategorySelection()">
                                            <option value="General Principles">General Principles</option>
                                            <option value="Organ Systems">Organ Systems</option>
                                        </select><br><br>
                                        <label for="questionCategory">Question Category :</label><br>
                                        <select name="questionCategory" id="questionCategory" onchange="renderQuestionSubCategorySelection()">
                                        </select>
                                        <br>
                                        <br>

                                        <label for="subQuestionCategory">Question Sub Category :</label><br>
                                        <select name="subQuestionCategory" id="subQuestionCategory">
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
renderQuestionCategorySelection();
renderQuestionSubCategorySelection();
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
            questionOptionHtml = populatefields(questionDataDictionary);

            document.getElementById('content').innerHTML = questionOptionHtml;

            let overallCategory = questionDataDictionary["OVERALL_CATEGORY"];
            let questionCategory = questionDataDictionary["QUESTION_CATEGORY"];
            let subCategory = questionDataDictionary["SUB_CATEGORY"];
            if(overallCategory != null && subCategory != null)
            {
                renderQuestionCategorySelection(overallCategory, questionCategory);
                renderQuestionSubCategorySelection(overallCategory,questionCategory, subCategory);
            }else
            {
                renderQuestionCategorySelectionEmptyCategories(questionCategory);
            }



            const fileInput = document.getElementById('questionImage');

            fileInput.addEventListener('change', handleFileSelect);

        }
    }, questionId = questionId);

}


function populatefields(questionDataDictionary)
{
    let qid = questionDataDictionary["QID"];
    let overallCategory = questionDataDictionary["OVERALL_CATEGORY"];
    let questionCategory = questionDataDictionary["QUESTION_CATEGORY"];
    let subCategory = questionDataDictionary["SUB_CATEGORY"];
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

                                        <label for="overallQuestionCategory">Overall Question Category :</label><br>
                                        <select name="overallQuestionCategory" id="overallQuestionCategory" onchange="renderQuestionCategorySelection()">
                                            <option value="General Principles" ${(overallCategory == "General Principles" ? "selected":"")}>General Principles</option>
                                            <option value="Organ Systems" ${(overallCategory == "Organ Systems" ? "selected":"")}>Organ Systems</option>
                                        </select><br><br>
                                        <label for="questionCategory">Question Category :</label><br>
                                        <select name="questionCategory" id="questionCategory" onchange="renderQuestionSubCategorySelection()">
                                        </select>
                                        <br>
                                        <br>

                                        <label for="subQuestionCategory">Question Sub Category :</label><br>
                                        <select name="subQuestionCategory" id="subQuestionCategory">
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


function renderVideosPage()
{
    //make api call
    getAllVideos( function(allVideosData)
    {
        if(allVideosData)
        {

            let videoPageHtml = `
                            <span>
                                <h2>Videos</h2>
                                <button onclick="renderAddVideoPage()" class="addVideoButton">Add Video</button><br><br>
                                <div>
                                    <table id="allVideosTable" class="display">
                                        <thead>
                                            <tr>
                                                <th>Video Id</th>
                                                <th>Video Title</th>
                                                <th>Edit Video</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </span>
            `;

            document.getElementById('content').innerHTML = videoPageHtml;

            index = 0;
            let table = new DataTable('#allVideosTable', {
            responsive: true,
            data: allVideosData,
            columns: [
                { data: "VID" },
                { data: 'TITLE' },
                { 
                    data: '',
                    render: (data,type,row) => {
                        index+=1;
                        return `<button style="background-color:#3486eb;color:#FFF;border-style:none;padding-top: 10px;padding-bottom:10px;padding-right:10px;padding-left:10px;" onclick='renderEditVideo("${row["VID"]}")'>Edit Video</button>`;
                    }
                }
            ],

            });

        }
    });
}


function renderAddVideoPage()
{
    let videoPageHtml = `
                            <span>
                                <h2>Add Video</h2>
                                <div>   
                                    <label for="videoCategory">Video Category :</label><br>
                                    <select name="videoCategory" id="videoCategory">
                                    </select><br><br>

                                    

                                    <label for="videoTitle">Video Title</label><br>
                                    <input type="text" name="videoTitle" id="videoTitle"><br><br>

                                    <label for="videoThumbnail">Video Thumbnail</label><br>
                                    <input type="text" name="videoThumbnail" id="videoThumbnail"><br><br>

                                    <label for="videoLink">Video Link</label><br>
                                    <input type="text" name="videoLink" id="videoLink"><br><br>


                                    <button onclick="addVideoCall()">Save Video</button>

                                </div>
                            </span>
                        `;
    document.getElementById('content').innerHTML = videoPageHtml;
    renderVideoCategorySelectionEmptyCategories();

}

function renderDeleteVideoModal(videoId)
{
    let renderModalHtml = `
                <div id="myModal" class="modal">

                    <!-- Modal content -->
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <h2>Are you sure you want to delete video?</h2>
                        <h3>Video Id : ${videoId}</h3><br><br>

                        <button style="background-color:red;color:white;border-color:red;" onclick="deleteVideoApiCall('${videoId}')">Delete Question</button>
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

function renderEditVideo(videoId)
{
    //make api call
    getVideo( function(videoData)
    {
        if(videoData)
        {

            let videoCategory = videoId.split(":")[1];
            let videoThumbnail = videoData["THUMBNAIL"];
            let videoLink = videoData["VIDEO_URL"];
            let videoTitle = videoData["TITLE"];

            let videoPageHtml = `
                                    <span>
                                    <h2>Edit Video</h2>
                                    <div>   
                                        <label for="videoCategory">Video Category :</label><br>
                                        <select name="videoCategory" id="videoCategory" selected="${videoCategory}">

                                        </select><br><br>

                                        <label for="videoTitle">Video Title</label><br>
                                        <input type="text" name="videoTitle" id="videoTitle" value="${videoTitle}"><br><br>

                                        <label for="videoThumbnail">Video Thumbnail</label><br>
                                        <input type="text" name="videoThumbnail" id="videoThumbnail" value="${videoThumbnail}"><br><br>

                                        <label for="videoLink">Video Link</label><br>
                                        <input type="text" name="videoLink" id="videoLink" value="${videoLink}"><br><br>


                                        <button onclick="editVideoCall('${videoId}')">Save Changes</button>
                                        <button onclick="renderDeleteVideoModal('${videoId}')">Delete Video</button>


                                    </div>
                                </span>
            `;

            document.getElementById('content').innerHTML = videoPageHtml;
            renderVideoCategorySelectionEmptyCategories(videoCategory);
        }
    }, videoId = videoId);
}

