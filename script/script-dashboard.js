document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("dashboard-container");
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const sortBtn = document.getElementById("sortBtn");

    let sortDescending = true; 

    
    function getBlogs() {
        return JSON.parse(localStorage.getItem("blogs")) || [];
    }

  
    function renderBlogs(blogsToRender) {
        container.innerHTML = "";

        if (blogsToRender.length === 0) {
            container.innerHTML = `<h2 style="color: var(--text-muted-light); grid-column: 1/-1; text-align: center;">No blogs yet</h2>`;
            return;
        }

      
        function stringlimitcheck(text, limit) {
            return text.length > limit ? text.substring(0, limit) + "..." : text;
        }

        let htmlContent = "";
        blogsToRender.forEach((element, index) => {
            htmlContent += `
            <div class="blog-card">
                <div class="card-image" onclick="location.href='single-blog.html?title=${encodeURIComponent(element.title)}'">
                    <img src="${element.image}" alt="">
                    <span class="category-label">${element.category}</span>
                </div>
                <div class="card-content">
                    <h2>${element.title}</h2>
                    <p>${stringlimitcheck(element.content, 100)}</p>
                    <span class="created-at">${element.createdAt}</span>
                    <div class="action-btns">
                        <button class="edit-btn" onclick="editBlog('${encodeURIComponent(element.title)}')">Edit</button>
                        <button class="delete-btn" onclick="deleteBlog('${encodeURIComponent(element.title)}')">Delete</button>
                    </div>
                </div>
            </div>`;
        });
        container.innerHTML = htmlContent;
    }

    
    function applyFilters() {
        let blogs = getBlogs();
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        let filteredBlogs = blogs.filter(blog => {
            const matchesSearch = blog.title.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

      
        filteredBlogs.sort((a, b) => {
            let dateA = new Date(a.createdAt);
            let dateB = new Date(b.createdAt);
            return sortDescending ? dateB - dateA : dateA - dateB;
        });

        renderBlogs(filteredBlogs);
    }

    
    window.deleteBlog = function(encodedTitle) {
        const title = decodeURIComponent(encodedTitle);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f44336',
            cancelButtonColor: '#555',
            confirmButtonText: 'Yes, delete it!',
            theme: 'dark'
        }).then((result) => {
            if (result.isConfirmed) {
                let blogs = getBlogs();
                
                blogs = blogs.filter(blog => blog.title !== title);
                
                localStorage.setItem("blogs", JSON.stringify(blogs));
                
                applyFilters();
                Swal.fire('Deleted!', 'Your blog has been deleted.', 'success');
            }
        });
    }

    
    window.editBlog = function(encodedTitle) {
        
        window.location.href = `create.html?edit=${encodedTitle}`;
    }

    
    searchInput.addEventListener("input", applyFilters);
    categoryFilter.addEventListener("change", applyFilters);
    
    sortBtn.addEventListener("click", () => {
        sortDescending = !sortDescending;
        sortBtn.innerText = sortDescending ? "Sort by Date (Newest First)" : "Sort by Date (Oldest First)";
        applyFilters();
    });

    
    applyFilters();
});