const imageContainer = document.querySelector(".image-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const closeButton = document.querySelector(".closeButton span");
const navBar = document.querySelector("nav");
const footer = document.querySelector("footer");

let x = 0;
let isEnlarged = false;
let enlargedImage = null;
let enlargedCaption = null;
let middleImageIndex = 0;

prevBtn.addEventListener("click", () => {
  if (!isEnlarged) {
    x = x + 45;
    rotate();
  }
});

nextBtn.addEventListener("click", () => {
  if (!isEnlarged) {
    x = x - 45;
    rotate();
  }
});

closeButton.addEventListener("click", () => {
  closeImage();
});

const images = document.querySelectorAll(".image-container span img");
images.forEach((img, index) => {
  const caption = img.nextElementSibling.textContent;

  img.addEventListener("click", () => {
    if (!isEnlarged && img === images[middleImageIndex]) {
      enlargeImage(img, caption);
    }
  });

  img.addEventListener("mouseover", () => {
  if (!isEnlarged && img === images[middleImageIndex]) {
      img.style.transform = "scale(1.3)";
      img.style.border = "3px solid red";
    }else if(!isEnlarged && img !== images[middleImageIndex]){
      img.style.transform = "scale(0.8)";
      img.style.border = "none";
    }
  })

  //img.addEventListener("mouseover", () => {
    //if (!isEnlarged) {
      //img.style.transform = "scale(2)";
    //}
  //});

  img.addEventListener("mouseout", () => {
    if (!isEnlarged && img === images[middleImageIndex]) {
      img.style.transform = "scale(1)";
      img.style.border = "none";
    }else if(!isEnlarged && img!== images[middleImageIndex]) {
      img.style.transform = "scale(1)";
    }
   });

  if (index === images.length - 1) {
    middleImageIndex = index;
  }
});

function rotate() {
  if (!isEnlarged) {
    imageContainer.style.transform = `perspective(1000px) rotateY(${x}deg)`;

    let rotationIndex = Math.round((x % 360) / 45);

    if (rotationIndex < 0) {
      rotationIndex += 8;
    }

    middleImageIndex = (images.length - rotationIndex - 1 + images.length) % images.length;
  }
}


function enlargeImage(img, caption) {
  img.style.border = "none";
  img.classList.add('enlarged');
  img.style.transform = "scale(1.8)";
  isEnlarged = true;
  showCloseButton();
  hideNavButtons();
  hideOtherImages(img);
  hideNavBarAndFooter();

  enlargedCaption = document.createElement("div");
  enlargedCaption.className = "enlarged-caption";
  enlargedCaption.textContent = caption;  
  document.body.appendChild(enlargedCaption);

  function getBackgroundColor() {
    return getComputedStyle(document.body).getPropertyValue('background-color').trim();
  }
  
  const backgroundColor = getBackgroundColor();
  
  if (backgroundColor === "rgb(34, 34, 34)") {
    enlargedCaption.style.color = "white";
  } else if (backgroundColor === "rgb(255, 255, 255)") {
    enlargedCaption.style.color = "black";
  } else if (backgroundColor === "rgb(144, 238, 144)") {
    enlargedCaption.style.color = "green";
  }else {
    enlargedCaption.style.color = "black";
  }

  if(document.body.style.fontFamily === "Arial"){
    enlargedCaption.style.fontFamily = "Arial";
  }else if (document.body.style.fontFamily === "Verdana"){
    enlargedCaption.style.fontFamily = "Verdana";
  }else if(document.body.style.fontFamily === "Times New Roman"){
    enlargedCaption.style.fontFamily = "Times New Roman";
  }else if (document.body.style.fontFamily === "Courier New"){
    enlargedCaption.style.fontFamily = "Courier New";
  }else if(document.body.style.fontFamily === "Georgia"){
    enlargedCaption.style.fontFamily = "Georgia";
  }else if (document.body.style.fontFamily === "Helvetica"){
    enlargedCaption.style.fontFamily = "Helvetica";
  }else{
    enlargedCaption.style.fontFamily = "Arial";
  }
  

  enlargedImage = img;

}


function closeImage() {
  if (enlargedImage) {
    enlargedImage.style.transform = "scale(1)";
    isEnlarged = false;
    hideCloseButton();
    showNavButtons();
    showOtherImages();
    showNavBarAndFooter();
    hideEnlargedCaption();

    if (enlargedCaption) {
      enlargedCaption.parentNode.removeChild(enlargedCaption);
      enlargedCaption = null;
    }
  }
}


function showCloseButton() {
  closeButton.style.visibility = "visible";
}

function hideCloseButton() {
  closeButton.style.visibility = "hidden";
}

function hideNavButtons() {
  prevBtn.style.display = "none";
  nextBtn.style.display = "none";
}

function showNavButtons() {
  prevBtn.style.display = "block";
  nextBtn.style.display = "block";
}

function hideOtherImages(selectedImage) {
  images.forEach((img) => {
    if (img !== selectedImage) {
      img.style.visibility = "hidden";
    }
  });
}

function showOtherImages() {
  images.forEach((img) => {
    img.style.visibility = "visible";
  });
}

function hideEnlargedCaption() {
  if (enlargedCaption) {
    enlargedCaption.style.display = "none";
  }
}

function hideNavBarAndFooter() {
  navBar.style.display = "none";
  footer.style.display = "none";
}

function showNavBarAndFooter() {
  navBar.style.display = "block";
  footer.style.display = "block";
}

function darkTheme(){
  document.body.style.backgroundImage = "none";
  document.body.style.backgroundColor = "#222222";
  document.querySelector(".vertical-strip").style.backgroundColor = "#181818";
  navBar.style.backgroundColor = "black";
  footer.style.backgroundColor = "black";
  var subElements = document.getElementsByTagName("sub");
  for (var i = 0; i < subElements.length; i++) {
    subElements[i].style.color = "rgb(189, 244, 27)";
  }
  //document.querySelectorAll(".caption").forEach(caption => caption.style.color = "white");
  document.querySelectorAll(".enlarged-caption").forEach(enlargedCaption => enlargedCaption.style.color = "white");
  document.querySelector(".closeButton span").style.color = "white";
  document.querySelector(".vertical-strip span").style.color = "rgb(189, 244, 27)";
  document.querySelector("#fontFam span").style.color = "rgb(189, 244, 27)";
  
}

function lightTheme(){
  document.body.style.backgroundImage = "none";
  document.body.style.backgroundColor = "white";
  document.querySelector(".vertical-strip").style.backgroundColor = "#E0E0E0";
  navBar.style.backgroundColor = "#d2b48c";
  footer.style.backgroundColor = "#d2b48c";
  var subElements = document.getElementsByTagName("sub");
  for (var i = 0; i < subElements.length; i++) {
    subElements[i].style.color = "black";
  }
  //document.querySelectorAll(".caption").forEach(caption => caption.style.color = "black");
  document.querySelectorAll(".enlarged-caption").forEach(enlargedCaption => enlargedCaption.style.color = "black");
  document.querySelector(".closeButton span").style.color = "black";
  document.querySelector(".vertical-strip span").style.color = "orange";
  document.querySelector("#fontFam span").style.color = "orange";
}

function greenTheme(){
  document.body.style.backgroundImage = "none";
  document.body.style.backgroundColor = "lightgreen";
  document.querySelector(".vertical-strip").style.backgroundColor = "aquamarine";
  navBar.style.backgroundColor = "green";
  footer.style.backgroundColor = "green";
  var subElements = document.getElementsByTagName("sub");
  for (var i = 0; i < subElements.length; i++) {
    subElements[i].style.color = "rgb(189, 244, 27)";
  }
  //document.querySelectorAll(".caption").forEach(caption => caption.style.color = "darkblue");
  document.querySelectorAll(".enlarged-caption").forEach(enlargedCaption => enlargedCaption.style.color = "green");
  document.querySelector(".closeButton span").style.color = "yellow";
  document.querySelector(".vertical-strip span").style.color = "green";
  document.querySelector("#fontFam span").style.color = "green";  
}

function customTheme(){
  let redValueBody = Math.floor(Math.random()*256);
  let greenValueBody = Math.floor(Math.random()*256);
  let blueValueBody = Math.floor(Math.random()*256);
  let bodyColor = `rgb(${redValueBody}, ${greenValueBody}, ${blueValueBody})`;

  let redValueVertical = Math.floor(Math.random()*256);
  let greenValueVertical = Math.floor(Math.random()*256);
  let blueValueVertical = Math.floor(Math.random()*256);
  let verticalColor = `rgb(${redValueVertical}, ${greenValueVertical}, ${blueValueVertical})`;

  let redValueCaption = Math.floor(Math.random()*256);
  let greenValueCaption = Math.floor(Math.random()*256);
  let blueValueCaption = Math.floor(Math.random()*256);
  let captionColor = `rgb(${redValueCaption}, ${greenValueCaption}, ${blueValueCaption})`;

  let redValueCloseBtn = Math.floor(Math.random()*256);
  let greenValueCloseBtn = Math.floor(Math.random()*256);
  let blueValueCloseBtn = Math.floor(Math.random()*256);
  let closeBtnColor = `rgb(${redValueCloseBtn}, ${greenValueCloseBtn}, ${blueValueCloseBtn})`;

  document.body.style.backgroundImage = "none";
  document.querySelector(".vertical-strip span").style.color = "lightblue";
  document.querySelector("#fontFam span").style.color = "lightblue";
  document.body.style.backgroundColor = bodyColor;
  document.querySelector(".vertical-strip").style.backgroundColor = verticalColor;
  document.querySelectorAll(".enlarged-caption").forEach(enlargedCaption => enlargedCaption.style.color = captionColor);
  document.querySelector(".closeButton span").style.color = closeBtnColor;

  navBar.style.backgroundColor = "rgba(103, 10, 10, 0.834)";
  footer.style.backgroundColor = "rgba(103, 10, 10, 0.834)";
  var subElements = document.getElementsByTagName("sub");
  for (var i = 0; i < subElements.length; i++) {
    subElements[i].style.color = "black";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const fontSelect = document.getElementById("fontSelect");

  fontSelect.addEventListener("change", function() {
    const selectedFont = fontSelect.value;
    changeFontFamily(selectedFont);
  });

  function changeFontFamily(fontFamily){
    document.body.style.fontFamily = fontFamily;
    //document.querySelectorAll(".caption").forEach(caption => caption.style.fontFamily = fontFamily);
    document.querySelectorAll(".enlarged-caption").forEach(enlargedCaption => enlargedCaption.style.fontFamily = fontFamily);
  }

});
  

