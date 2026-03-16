
function handleContactSubmit(event) {
    event.preventDefault();

    if (validateContactForm() === true) {
    
        sendMail();
    }
}


function sendMail(){
    let parms = {
        name : document.getElementById("fullname").value,
        email : document.getElementById("email").value,
        subject : document.getElementById("subject").value,
        message : document.getElementById("message").value
    }
    document.getElementById("formId").reset();
    //Replace The Alert with some thing  else
    emailjs.send("Service_ID","templet_ID",parms).then(() => alert("Send successfully!")).catch((err) => console.log(err));
}