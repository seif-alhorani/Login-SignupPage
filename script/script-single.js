document.addEventListener("DOMContentLoaded", function () {
    let blogContentContainer = document.getElementById("blog-content");

    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    const blogTitle = urlParams.get('title');

   

    const storedBlogs = localStorage.getItem("blogs");
    const blogs = storedBlogs ? JSON.parse(storedBlogs) : [];


    const currentBlog = blogs.find(blog => blog.title === blogTitle);

    if (!currentBlog) {
        blogContentContainer.innerHTML = ` <h2 class="animate__animated animate__headShake "style="color: var(--text-error); grid-column: 1/-1; text-align: center;">Cant Find That Blog or Its not created</h2>`
    }

    blogContentContainer.innerHTML = `
            <header class="blog-header">
                <span class="category-badge">
                    ${currentBlog.category}
                </span>
                <h1 class="blog-title">${currentBlog.title}</h1>
                <span class="blog-date">Published on: ${currentBlog.createdAt}</span>
            </header>
            
            <div class="blog-image-container">
                <img src="${currentBlog.image}" alt="${currentBlog.title}">
            </div>
            
            <div class="blog-text">
                ${currentBlog.content}
            </div>
            
            <div style="text-align: center; margin-top: 40px;">
                <button onclick="history.back()" style="width: auto; padding: 10px 30px;">← Back to Blogs</button>
            </div>`;

});