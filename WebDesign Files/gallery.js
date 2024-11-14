// Function to show a specific album based on albumNumber
function showAlbum(albumNumber) {
    // Select all elements with the class 'album'
    const albums = document.querySelectorAll('.album');
    
    // Hide all albums
    albums.forEach(album => album.style.display = 'none');
    
    // Display the selected album
    document.getElementById(`album${albumNumber}`).style.display = 'block';
    
    // Display the back button
    document.getElementById('backButton').style.display = 'block';
}

// Function to hide all albums and go back to the main view
function goBack() {
    // Select all elements with the class 'album'
    const albums = document.querySelectorAll('.album');
    
    // Hide all albums
    albums.forEach(album => album.style.display = 'none');
    
    // Hide the back button
    document.getElementById('backButton').style.display = 'none';
}

// Event listener to change the theme color when a new option is selected
document.getElementById('themeColor').addEventListener('change', function() {
    // Get the list of classes applied to the body element
    const bodyClassList = document.body.classList;
    
    // Remove any existing theme classes
    bodyClassList.remove('default-theme', 'lightblue-theme', 'lightgreen-theme', 'lightpink-theme', 'dark-theme');
    
    // Add the selected theme class
    bodyClassList.add(this.value);
});

// Event listener to change the font style when a new option is selected
document.getElementById('fontStyle').addEventListener('change', function() {
    // Get the list of classes applied to the body element
    const bodyClassList = document.body.classList;
    
    // Remove any existing font style classes
    bodyClassList.remove('default-font', 'Arial-font', 'CourierNew-font', 'Georgia-font', 'Verdana-font');
    
    // Add the selected font style class
    bodyClassList.add(this.value);
});
