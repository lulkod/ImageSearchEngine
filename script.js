const accessKey = "M7fPo49Dh3NiK9A3Rwu00LismQcHPm-SKgp20DUb4b4"

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (page === 1) {
            searchResult.innerHTML = "";
        }
        if (!data.results || data.results.length === 0) {
            searchResult.innerHTML = "<p>no results found.</p>";
            showMoreBtn.style.display = "none";
            return;
        }
        data.results.forEach(({links, urls}) => {
            const image = document.createElement("img");
            image.src = urls.small;
            const imageLink = document.createElement("a");
            imageLink.href = links.html;
            imageLink.target = "_blank";
            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        })

        showMoreBtn.style.display = "block";
    }

    catch (error) {
        console.log("error", error);
        searchResult.innerHTML = "error occurred while fetching results.";
    }
}

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    page = 1
    await searchImages();
    console.log("search completed");
});

showMoreBtn.addEventListener("click", async () => {
    page++;
    await searchImages();
    console.log("search completed");
});
