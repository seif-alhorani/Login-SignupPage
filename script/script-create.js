document.getElementById('blogForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let title = document.getElementById('title').value;
    let category = document.getElementById('category').value;
    let content = document.getElementById('content').value;
    let imageUrl = document.getElementById('imageUrl').value;
    let imageFile = document.getElementById('imageFile').files[0];
    
    //add select of some choose this disable the others 
    
    let finalImage = imageUrl;
    if (imageFile) {
       console.log("Upload image");
        finalImage = URL.createObjectURL(imageFile); 
    }

    let blog = {
        title: title,
        image: finalImage,
        category: category,
        content: content,
        createdAt: new Date().toLocaleString()// to save date and Time 
    };

    let blogs;
    let getblogs = localStorage.getItem("blogs");
    console.log("Get");

    if(getblogs){
      blogs=JSON.parse(getblogs);
      console.log("Parse");
    }else{
       blogs=[];
    }
    blogs.push(blog);
    
    localStorage.setItem("blogs", JSON.stringify(blogs));
    document.getElementById("blogForm").reset();
    console.log("Success");

});