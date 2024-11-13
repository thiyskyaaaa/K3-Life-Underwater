document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("start-button").addEventListener("click", PersonalDetailsPrompt);
    document.getElementById("volunteering-next-button").addEventListener("click", validateQualificationForm);
    document.getElementById("qualification-next-button").addEventListener("click", validateAvailabilityForm);

     // Go back buttons
     document.getElementById("volunteering-go-back-button").addEventListener("click", goBackToPersonalDetails);
     document.getElementById("qualification-go-back-button").addEventListener("click", goBackToVolunteeringExperience);
     document.getElementById("availability-go-back-button").addEventListener("click", goBackToQualification);
 });


// Total number of steps
const totalSteps = 4;

// Current step
let currentStep = 0;

function PersonalDetailsPrompt() {
    let name, address, age, gender;

    // Prompt for name
    while (true) {
        name = prompt("Enter your name:");
        if (name !== null && name.trim() !== "") {
            break; // Exit the loop if a non-empty name is entered
        }
    }

    // Prompt for address
    address = prompt("Enter your address:");

    // Prompt for age
    while (true) {
        age = prompt("Enter your age:");
        if (age === null || (!isNaN(age) && age.trim() !== "")) {
            break; // Exit the loop if a valid age is entered or prompt is canceled
        }
    }

    // Prompt for gender
    while (true) {
        gender = prompt("Enter your gender (M/F):");
        if (gender === null || (gender.trim() === "M" || gender.trim() === "F")) {
            break; // Exit the loop if a valid gender is entered or prompt is canceled
        }
    }

    // Update displayed information
    document.getElementById("name").textContent = name ;
    document.getElementById("address").textContent = address;
    document.getElementById("age").textContent = age;
    document.getElementById("gender").textContent = gender;

    // Show personal details section
    document.getElementById("personal-details").style.display = "block";

    // Update progress
    currentStep++;
    updateProgress();
}


function validateExperienceForm() {
    document.getElementById("volunteering-experience").style.display = "block";
    VolunteeringExperiencePrompt();
}

function VolunteeringExperiencePrompt() {
    let task, experience, specification;

    // Validate inputs
    do {
        task = prompt("Enter your volunteering task:");
        experience = prompt("Enter your experience (Years):");
        specification = prompt("Enter your volunteering specification:");

        if (!task || !experience || !specification) {
            alert("Please fill in all fields.");
        }
    } while (!task || !experience || !specification);


    // Update displayed information
    document.getElementById("task").textContent = task;
    document.getElementById("experience").textContent = experience;
    document.getElementById("specification").textContent = specification;

    // Show volunteering experience section
    document.getElementById("volunteering-experience").style.display = "block";

    // Update progress
    currentStep++;
    updateProgress();
}

function validateQualificationForm() {
    document.getElementById("qualification").style.display = "block";
    showQualificationPrompt();
}

function showQualificationPrompt() {
    let areaofstudy,degree,completionYear;

    do{
        areaofstudy = prompt("Enter your area of study:");
        degree = prompt("Enter your degree:");
        completionYear = prompt("Enter your completion Year:");

        if (!areaofstudy || !degree || !completionYear){
            alert("Please fill in all fields.");
        }
    }while(!areaofstudy || !degree || !completionYear)



    // Update displayed information
    document.getElementById("areaofstudy").textContent =  areaofstudy;
    document.getElementById("degree").textContent = degree;
    document.getElementById("completionYear").textContent = completionYear;

    // Show qualification section
    document.getElementById("qualification").style.display = "block";

    // Update progress
    currentStep++;
    updateProgress();
}

function validateAvailabilityForm() {
    document.getElementById("availability").style.display = "block";
    AvailabilityPrompt();
}

function AvailabilityPrompt() {
    let contactnumber;
    do {
        contactnumber = prompt("Enter your contact number:");
        // Validate contact number input
        if (contactnumber !== null && contactnumber.trim() !== "" && !isNaN(contactnumber)) {
            break; 
        }
        if (contactnumber !== null && (contactnumber.trim() === "" || isNaN(contactnumber))) {
            alert("Please enter a valid contact number (numeric value only).");
        }
    } while (true);

    let availabilityemail;
    do {
        availabilityemail = prompt("Enter your email:");
        
        if (availabilityemail !== null && availabilityemail.includes("@")) {
            break; 
        }
        if (availabilityemail !== null && availabilityemail.trim() === "") {
            alert("Please enter an email.");
        } else {
            alert("Please enter a valid email address.");
        }
    } while (true);

    // Update displayed information
    document.getElementById("contactnumber").textContent =  contactnumber;
    document.getElementById("availabilityemail").textContent = availabilityemail;

    // Show availability section
    document.getElementById("availability").style.display = "block";

    // Update progress
    currentStep++;
    updateProgress();
}


function goBackToPersonalDetails() {
    
    document.getElementById("personal-details").style.display = "none";

    // Decrement progress
    currentStep--;
 
    PersonalDetailsPrompt();
}

function goBackToVolunteeringExperience() {
    
    document.getElementById("volunteering-experience").style.display = "none";

    
    currentStep--;

    VolunteeringExperiencePrompt();
}

function goBackToQualification() {
    
    document.getElementById("qualification").style.display = "none";

    currentStep--;

    showQualificationPrompt();
}




function updateProgress() {
    // Calculate progress percentage
    const progress = Math.min((currentStep / totalSteps) * 100, 100); // Ensure progress doesn't exceed 100%

    // Update progress bar width
    document.getElementById("progress-bar").style.width = `${progress}%`;

    // Update progress text
    document.getElementById("progress-text").textContent = `${progress}% Complete`;

    // If progress reaches 100%, you can indicate completion or take appropriate action
    if (progress === 100) {
        document.getElementById("completion-message").textContent = "You have completed the process!";
    }
}



// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("availability-submit-button");

// Get the span element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on span (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}