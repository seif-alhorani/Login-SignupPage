document.addEventListener("DOMContentLoaded",function(){
    const blogContainer = document.getElementById("all-blogs-container");
    const storedBlogs = localStorage.getItem("blogs");
    let blogs = storedBlogs ? JSON.parse(storedBlogs) : [];

    if(blogs.length === 0){
        blogContainer.innerHTML=` <h2 style="color: var(--text-muted-light); grid-column: 1/-1; text-align: center;">No blogs found. Create some!</h2>`
    }else{
        let allBlogs = [...blogs].reverse();
        function stringlimitcheck(text,limit){
            if(text.length > limit){
                return text.substring(0,limit);
            }
            return text;
        }
        
        let htmlContent =" ";
        allBlogs.forEach(element =>{
            htmlContent+=`<div class="blog-card" onclick="location.href='single-blog.html?title=${element.title}'">
                <div class="card-image">
                    <img src="${element.image}" alt="">
                    <span class="category-label">${element.category}</span>
                </div>
                <div class="card-content">
                    <h2>${element.title}</h2>
                    <p>${stringlimitcheck(element.content,100)}</p>
                    <span class="created-at">${element.createdAt}</span>
                </div>
            </div>`;
        });
        blogContainer.innerHTML=htmlContent;
    }
});