
document.addEventListener("DOMContentLoaded", function () {
   
    Year();
    checkEmail();
    getpagename();
});

function Year() {
    const d = new Date();
    let year = d.getFullYear();
    document.getElementById("copyright").innerHTML = `<span id="dates"> © ${year} Blog Platform</span>`;
}

async function checkEmail() {
    let emaillist = localStorage.getItem("emails");
    console.log(emaillist);

    let location = getpagename();
    console.log(location);
    if (location === "create.html" || location === "blogs.html" || location === "single-blog.html"){
        if(!emaillist) {
            Swal.fire({
                title: "Error",
                text: "Need an Account ",
                icon: "error",
                theme: 'dark',
                confirmButtonColor: "#000000"
            });
            await sleep(1800);
            window.location.href = "login.html";

        }   
    }
    if (!emaillist && location === "profile.html") {
        window.location.href = "login.html";
    }
    if(emaillist && location !=="profile.html"){
        const checkstored= localStorage.getItem("userProfileImage");
        let userProfileImage= checkstored ? checkstored : "./assets/images/User.png";
        document.getElementById("logoutbt").innerHTML=`<button onclick="localStorage.removeItem("emails"); location.href = 'login.html';">Logout</button>`;
        document.getElementById("profpic").innerHTML=`<a href="profile.html"><img class="profile-pic" src="${userProfileImage}" alt="profile-pic"></a>`;
    }
    if(emaillist){
        document.getElementById("loginbt").style.display ="none";
    }

}

function getpagename() {
    let path = window.location.pathname;
    let page = path.split("/").pop();
    return page;
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


