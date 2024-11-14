function isChecked(name) {
    const inputs = document.getElementsByName(name);
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            return true;
        }
    }
    return false;
}


function getCheckedValue(name) {
    const inputs = document.getElementsByName(name);
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            return inputs[i].value;
        }
    }
    return '';
}


function displayError(id, val) {
    const errorElement = document.getElementById(id);
    if (val) {
        errorElement.style.display = 'block';
    }
    else {
        errorElement.style.display = 'none';
    }
}


function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}                    


function validateFields() {
    const errors = [];
    const name = document.getElementById('name').value.trim();
    if (!name) {
        displayError('nameError', true);
        errors.push('This field is required!');
    }
    else {
        displayError('nameError', false);
    }


    const email = document.getElementById('email').value.trim();
    if (!validateEmail(email)) {
        displayError('emailError', true);
        errors.push('Please enter a valid email address');
    }
    else {
        displayError('emailError', false);
    }


    if (!isChecked('firstTime')) {
        displayError('firstTimeError', true);
        errors.push('Please select one of the given options');
    }
    else {
        displayError('firstTimeError', false);
    }


    if (!isChecked('informative')) {
        displayError('informativeError', true);
        errors.push('Please select one of the given options');
    }
    else {
        displayError('informativeError', false);
    }


    if (!isChecked('rating')) {
        displayError('ratingError', true);
        errors.push('Please rate your experience');
    }
    else {
        displayError('ratingError', false);
    }


    return errors.length === 0;
}


function showPreview() {
    const previewInfo = document.getElementById('previewInfo');
    previewInfo.innerHTML = '';

    previewInfo.innerHTML += '<p><strong>Name:</strong>  ' + document.getElementById('name').value.trim() + '</p>';
    previewInfo.innerHTML += '<p><strong>Email:</strong>  ' + document.getElementById('email').value.trim() + '</p>';
    previewInfo.innerHTML += '<p><strong>First Time Visiting:</strong>  ' + getCheckedValue('firstTime') + '</p>';
    previewInfo.innerHTML += '<p><strong>Informative and Easy to Navigate:</strong> ' + getCheckedValue('informative') + '</p>';
    previewInfo.innerHTML += '<p><strong>Improvements:</strong>  ' + document.getElementById('improvements').value.trim() + '</p>';
    previewInfo.innerHTML += '<p><strong>Rating:</strong>  ' + getCheckedValue('rating') + '</p>';
    previewInfo.innerHTML += '<p><strong>Receive Updates:</strong>  ' + document.getElementById('updates').value + '</p>';
    previewInfo.innerHTML += '<p><strong>Additional Questions/Requests:</strong>  ' + document.getElementById('additional').value.trim() + '</p>';

    document.getElementById('feedbackForm').style.display = 'none';
    document.getElementById('preview').style.display = 'block';
}


function closePreview() {
    document.getElementById('feedbackForm').style.display = 'block';
    document.getElementById('preview').style.display = 'none';
}


function validateAndPreview() {
    if (validateFields()) {
        showPreview();
    }
    else {
        alert('Please complete all required fields before previewing')
    }
}


function finalSubmit() {
    document.getElementById('feedbackForm').reset();
    document.getElementById('feedbackForm').style.display = 'none';
    document.getElementById('confirmationMessage').style.display = 'block';
    document.getElementById('preview').style.display = 'none';
}


document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (!validateFields()) {
        alert('Please complete all required fields before submitting');
    }
    else {
        finalSubmit();
    }
});