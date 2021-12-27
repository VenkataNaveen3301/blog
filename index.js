const blogListDiv = document.querySelector(".blog-list");
let blogID = 1;
function Blog(id, title, image, content) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.content = content;
}

// Add eventListeners 

function eventListeners() {
    document.addEventListener("DOMContentLoaded", displayBlogs);
    document.getElementById("add-blog-btn").addEventListener("click", addNewBlog);

    blogListDiv.addEventListener("click", deleteBlog);

}
eventListeners();


// get item from storage 

function getDataFromStorage() {
    return localStorage.getItem("blogs") ? JSON.parse(localStorage.getItem("blogs")) : [];
}



// add a new blog in the list 

function addNewBlog() {
    const blogTitle = document.getElementById("blog-title");
    const blogImage = document.getElementById("blog-image");
    const blogContent = document.getElementById("blog-content");

    if (validateInput(blogTitle, blogImage, blogContent)) {
        let blogs = getDataFromStorage();

        let blogItem = new Blog(blogID, blogTitle.value, blogImage.value, blogContent.value);
        blogID++;
        blogs.push(blogItem);
        createBlog(blogItem);

        // saving in the local storage 

        localStorage.setItem("blogs", JSON.stringify(blogs));
        blogTitle.value = "";
        blogImage.value = "";
        blogContent.value = "";


    }

}



//  input validation 

function validateInput(title, image, content) {
    if (title.value !== "" && image.value !== "" && content.value !== "") {
        return true;
    } else {
        if (title.value === "");
        if (image.value === "");
        if (content.value === "");
    }
}


// create a new blog div

function createBlog(blogItem) {
    const div = document.createElement("div");
    div.classList.add("blog-item");
    div.setAttribute("data-id", blogItem.id);
    div.innerHTML = `
        <h3>${blogItem.title}</h3>
        <img src="${blogItem.image}">
        <p>${blogItem.content}</p>
        <button id="btn" type="button" class="like-btn" onClick="increment()"><i class="far fa-thumbs-up"></i> Like</button>
        <button type = "button" class = "btn delete-blog-btn">
        <span><i class = "fas fa-trash"></i></span>
        Delete
        </buttton>
  `;
    blogListDiv.appendChild(div);
}

var counter = 0;
function increment() {
    counter++;
    console.log(counter);
}

// display all the blogs from the local storage

function displayBlogs() {
    let blogs = getDataFromStorage();
    if (blogs.length > 0) {
        blogID = blogs[blogs.length - 1].id;
        blogID++;
    } else {
        blogID = 1;
    }
    blogs.forEach(item => {
        createBlog(item);
    });
}


// delete a blog
function deleteBlog(e) {
    if (e.target.classList.contains("delete-blog-btn")) {

        e.target.parentElement.remove();
        let divID = e.target.parentElement.dataset.id;
        let blogs = getDataFromStorage();
        let newBlogsList = blogs.filter(item => {
            return item.id !== parseInt(divID);
        });
        localStorage.setItem("blogs", JSON.stringify(newBlogsList));
    }
}


