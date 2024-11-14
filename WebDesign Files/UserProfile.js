let currentStep = 0;
let currentStage = 0;
// variable for the answers array
let userData = {};

// linking html elements to java script variables using ID 
const progressBar = document.getElementById('progressBar');
const promptStage = document.getElementById('promptStage');
const promptText = document.getElementById('promptText');
const userInput = document.getElementById('userInput');
const nextButton = document.getElementById('nextButton');
const skiptButton = document.getElementById('skipButton');
const previewContainer = document.getElementById('previewContainer');
const previewContent = document.getElementById('previewContent');
const summaryContainer = document.getElementById('summaryContainer');
const summaryContent = document.getElementById('summaryContent');
const editButton = document.getElementById('editButton');
const submitButton = document.getElementById('submitButton');
const promptProgress = document.getElementById('progressText');

// function to update progress bar
function updateProgressBar() {
    const progress = ((currentStep / 16) * 100).toFixed(0);
    progressBar.style.width = `${progress}%`;
    promptProgress.textContent = "Profile Completed " + progress + " %";
}

// function to promt the questions to the user
function showPrompt() {
    if (currentStage === 0) {
        promptStage.textContent = "STEP 1: PERSONAL DETAILS";
        if (currentStep === 0) {
            promptText.textContent = "What's your name? *";
        } else if (currentStep === 1) {
            promptText.textContent = "What's your surname?";
        } else if (currentStep === 2) {
            promptText.textContent = "What's your age?";
        } else if (currentStep === 3) {
            promptText.textContent = "What's your gender?";
        }
    } else if (currentStage === 1) {
        promptStage.textContent = "STEP 2: VOLUNTEERING TASKS";
        if (currentStep === 4) {
            promptText.textContent = "What brings you to this cause?";
        } else if (currentStep === 5) {
            promptText.textContent = "What types of tasks are you interested in?";
        } else if (currentStep === 6) {
            promptText.textContent = "What are your preferred working method? *";
        } else if (currentStep === 7) {
            promptText.textContent = "Where do you live? *";
        }         
    } else if (currentStage === 2) {
        promptStage.textContent = "STEP 3: QUALIFICATION";
        if (currentStep === 8) {
            promptText.textContent = "What is your highest level of education?";
        } else if (currentStep === 9) {
            promptText.textContent = "What area of study did you specialize in? *";
        } else if (currentStep === 10) {
            promptText.textContent = "Where did/do you study (University/School)?";
        }else if (currentStep === 11) {
            promptText.textContent = "What is your current occupation?";
        } 
    } else if (currentStage === 3) {
        promptStage.textContent = "STEP 4: AVAILABILITY AND CONTACT DETAILS";
        if (currentStep === 12) {
            promptText.textContent = "Minimum hours (per week) you can spent? *";
        }else if (currentStep === 13) {
            promptText.textContent = "Maximum hours (per week) you can spent?";
        }else if (currentStep === 14) {
            promptText.textContent = "Your telephone number? *";
        }else if (currentStep === 15) {
            promptText.textContent = "Your Email?";
        } 
    }
    userInput.value = '';
    userInput.focus();
}

// function to navigate through users answers and show it to the user as preview
function navigateUserData(){
    previewContent.innerHTML = '';   
    for (const data in userData) {
        const p = document.createElement('p');
        p.textContent = `${data}: ${userData[data]}`;
        previewContent.appendChild(p);    
    }     
    previewContainer.style.display = 'block';
}

// function to iterate through each question and get to display answers from navigateUserData()
function showFeedback() {
    for(let i = 0; i < 15; i++){    
        if (currentStep === i) {
            navigateUserData();
        }  
        if (currentStep === 16){
                previewContainer.innerHTML = " ";        
        }    
    }
}

// function to shoe summary with edit and submit buttons in the end of all questions
function showSummary() {
    summaryContent.innerHTML = '';
    for (const key in userData) {
        const p = document.createElement('p');
        p.textContent = `${key}: ${userData[key]}`;
        summaryContent.appendChild(p);
    }
    summaryContainer.style.display = 'block';   
}

// function to validate string inputs
function stringInputValidation(input) {
    const string =  /^[a-zA-Z]+$/;

    if (!string.test(input)){
        alert("Invalid input! Please enter a valid alphabetical input with no spaces");
    }
    else{
        return input;
    }
}

// to grab the next button click
nextButton.addEventListener('click', buttonNext);
// function for the process after clicking next button
function buttonNext(){
    const answer = userInput.value.trim();
    let validatedAnswer = null;
    //storing users answers to the array after validating
    if (answer) {
        if (currentStage === 0) {
            if (currentStep === 0) {
                let validatedAnswer = stringInputValidation(answer);
                if (validatedAnswer){
                    userData["First name"] = validatedAnswer;
                    currentStep++;
                } 
                else{
                    currentStep = 0;
                }                           
            } else if (currentStep === 1) {
                let validatedAnswer = stringInputValidation(answer);
                if (validatedAnswer){
                    userData["Surname"] = validatedAnswer;
                    currentStep++;
                }
                else{
                    currentStep = 1;
                } 

            } else if (currentStep === 2) {
                const integer =  /^(\d+)$/;

                if (!integer.test(answer)){
                    alert("Invalid input! Age cannot be alphatical or contain spaces");
                    currentStep = 2;
                }
                else if (parseInt(answer) > 120 || parseInt(answer) < 0){
                    alert("Invalid input! Age have to be between 0 and 120");
                    currentStep = 2;          
                }
                else{
                    userData["Age"] = answer;
                    currentStep++;
                }
                    
            } else if (currentStep === 3) {
                let validatedAnswer = stringInputValidation(answer);
                if (validatedAnswer){
                    validatedAnswer = validatedAnswer.toLowerCase();
                    if (validatedAnswer === "male" || validatedAnswer === "female" || validatedAnswer === "other"){
                        userData["Gender"] = validatedAnswer;
                        currentStep++;
                    }
                    else{
                        alert("Invalid input! Chose from Male / Female / Other");
                        currentStep = 3;
                    }
                }
            }
        } else if (currentStage === 1) {
            if (currentStep === 4) {
                userData["Rational"] = answer;
                currentStep++;
            } 
            else if (currentStep === 5) {
                userData["Main Responsibilities"] = answer;
                currentStep++;
            } 
            else if (currentStep === 6) {
                let validatedAnswer = stringInputValidation(answer);
                if (validatedAnswer){
                    validatedAnswer = validatedAnswer.toLowerCase();
                    if (validatedAnswer === "online" || validatedAnswer === "onsite" || validatedAnswer === "hybrid"){
                        userData["Working method"] = validatedAnswer;
                        currentStep++;
                    }
                    else{
                        alert("Invalid input! Chose from Online / Onsite / Hybrid");
                        currentStep = 6;
                    }
                }
                
            } else if (currentStep === 7) {
                userData["Country"] = answer;
                currentStep++;
            }
        } else if (currentStage === 2) {
            if (currentStep === 8) {
                userData["Highest Education Level"] = answer;
                currentStep++;
             } else if (currentStep === 9) {
                userData["Area of Study"] = answer;
                currentStep++;
            } else if (currentStep === 10) {
                userData["University"] = answer;
                currentStep++;
            } else if (currentStep === 11) {
                userData["Occupation"] = answer;
                currentStep++;
            }
        } 
        else if (currentStage === 3) {
            if (currentStep === 12) {
                const integer =  /^(\d+)$/;

                if (!integer.test(answer)){
                    alert("Invalid input! Please enter a nuemeric input with no spaces");
                    currentStep = 12;
                }
                else if (parseInt(answer) > 0 && parseInt(answer) < 169){
                    userData["Max hours"] = answer;
                    currentStep++;
                             
                }
                else{
                    alert("Invalid Input! Input doesen't fit total number of hours");
                    currentStep = 12; 
                }            
            } 
            else if (currentStep === 13) {
                const integer =  /^(\d+)$/;

                if (!integer.test(answer)){
                    alert("Invalid input! Please enter a nuemeric input with no spaces");
                    currentStep = 13;
                }
                else if (parseInt(answer) > 0 && parseInt(answer) < 169){
                    userData["Max hours"] = answer;
                    currentStep++;
                             
                }
                else{
                    alert("Invalid Input! Input doesen't fit total number of hours");
                    currentStep = 13; 
                }
            } 
            else if (currentStep === 14) {
                const integer =  /^(\d+)$/;

                if (!integer.test(answer)){
                    alert("Invalid input! Please enter a nuemeric input with no spaces");
                    currentStep = 14;
                }
                else if (answer.length != 10){
                    alert("Invalid input! Contact number should have 10 numbers");
                    currentStep = 14;          
                }
                else{
                    userData["Telephone"] = answer;
                    currentStep++;
                }
                
            } else if (currentStep === 15) {
                const mail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

                if (!mail.test(answer)){
                    alert("Invalid input! Email format is invalid");
                    currentStep = 15;
                }                
                else{
                    userData["Email"] = answer;
                    currentStep++;
                }
            }
        }
        showFeedback();
        
        if (currentStep % 4 === 0 && currentStep < 16 && currentStep != 0) {
            currentStage++;
        }
        if (currentStep < 16) {
            showPrompt();
        } else {
            updateProgressBar();
            showSummary();
        }
    }
    updateProgressBar();
}

// to grab the skip button click
skiptButton.addEventListener('click', buttonSkip);
// function for the process after clicking skip button 
function buttonSkip(){
    // making sure user doesn't skip the required fields
    if (currentStep === 0){
        alert("First name is a required field");
    }
    else if (currentStep === 6){
        alert("Working method is a required field");
    }
    else if (currentStep === 7){
        alert("Country is a required field");
    }
    else if (currentStep === 9){
        alert("Area of Study is a required field");
    }
    else if (currentStep === 12){
        alert("Minimum hours is a required field");
    }
    else if (currentStep === 14){
        alert("Contact number is a required field");
    }
    else{
        currentStep++;
        showFeedback();

        if (currentStep % 4 === 0 && currentStep < 16) {
            currentStage++;
       }
       if (currentStep < 16) {
           showPrompt();
       } else {
           updateProgressBar();
           showSummary();
       }
       updateProgressBar();
    }      
}

// to grab the edit button click
editButton.addEventListener('click', buttonEdit);
// function for the process after clicking edit button
function buttonEdit(){
    summaryContainer.style.display = 'none';
    currentStep = 0;
    currentStage = 0;
    showPrompt();
    updateProgressBar();
    showFeedback();
}

// to grab the submit button click
submitButton.addEventListener('click', buttonSubmit);
// function for the process after clicking submit button
function buttonSubmit(){
    alert('Profile setup complete! Thank you for providing your information.');
}

// loading the java script after html elements are done loading 
window.onload = function() {loadWindow()}
function loadWindow(){
    showPrompt();
    updateProgressBar();
}