
document.addEventListener("DOMContentLoaded", function () {
    const blog_container = document.getElementById("blog-container");
    const storedBlogs = localStorage.getItem("blogs");

    let blogs = storedBlogs ? JSON.parse(storedBlogs) : [];
    if (blogs.length === 0) {
        blog_container.innerHTML = '<h2 style="text-align: center; color: var(--text-muted-light);"> No blogs are avilable here be the first to create one </h2>'
    }else{
        function stringlimitcheck(text,limit){
            if(text < limit){
                return text.substring(0,limit);
            }else{
                console.log("Up limit");
                return false;
            }
        }
        let latestblog = [...blogs].reverse().slice(0, 4);
        let Content = "";
        latestblog.forEach(element => {
            Content += `<div class="blog-card">
                <div class="card-image">
                    <img src="${element.image}" alt="">
                    <span class="category-label">${element.category}</span>
                </div>
                <div class="card-content">
                    <h2>${element.title}</h2>
                    <p>${element.content}</p>
                    <span class="created-at">${element.createdAt}</span>
                </div>
            </div>`;
        });
        blog_container.innerHTML = Content;
    }

});
 //problem with uploading img  function on create blog need to be fixed 

