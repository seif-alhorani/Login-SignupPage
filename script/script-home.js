
async function getData() {
    const url = "https://newsapi.org/v2/everything?q=tesla&from=2026-02-28&sortBy=publishedAt&apiKey=YourAPIKeys";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result.articles;
    } catch (error) {
        console.error(error.message);
    }
}

document.addEventListener("DOMContentLoaded", async function () {

    const blog_container = document.getElementById("blog-container");
    const storedBlogs = localStorage.getItem("blogs");
    let blogs = storedBlogs ? JSON.parse(storedBlogs) : [];

    let apiblog=await getData();

    let apiblogmap =apiblog.map(data=>({
        title:data.title,
        image:data.urlToImage,
        category:"News",    
        content:data.content,
        createdAt:JSON.stringify(data.publishedAt)
    }));
     
    let allblogs = [...apiblogmap];
    if (allblogs.length === 0) {
        blog_container.innerHTML = `<h2 style="text-align: center; color: var(--text-muted-light);"> No blogs are avilable here be the first to create one </h2>`
    }else{
        function stringlimitcheck(text,limit){
            if(text.length > limit){
                return text.substring(0,limit);
            }
            return text;
        }
        let latestblog = allblogs.reverse().slice(0, 4);
    
        let Content = "";
        latestblog.forEach(element => {
            Content += `<div class="blog-card"  onclick="location.href='single-blog.html?title=${element.title}'">
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
        blog_container.innerHTML = Content;
    }

});


