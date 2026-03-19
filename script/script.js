var inputElement = document.getElementById("profile-upload");
var profilePic = document.querySelector(".upload-label img");
var navPic = document.querySelector(".profile-pic");        


function updateUIWithImage(imageData) {
    if (profilePic) profilePic.src = imageData;
    if (navPic) navPic.src = imageData;
}


document.addEventListener("DOMContentLoaded", function() {
    var savedImage = localStorage.getItem("userProfileImage");
    if (savedImage) {
        updateUIWithImage(savedImage);
    }
});


if (inputElement) {
    inputElement.onchange = function (event) {
        var myFile = event.target.files[0];
        if (myFile) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var base64String = e.target.result;
                localStorage.setItem("userProfileImage", base64String);
                updateUIWithImage(base64String);
            };
            reader.readAsDataURL(myFile);
        }
    };
}