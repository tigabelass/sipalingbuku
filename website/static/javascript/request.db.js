document.getElementById("search-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const query = document.getElementById("search-input").value;
    if(!query){
        console.error("Masukkan kata kunci buku")
        return;
    }
    const API_URL = `http://localhost:8000/bookshelf/api/books/search/?q=${query}`

    fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        const bookList = document.getElementById("book-list");
        bookList.innerHTML = '';
        if(data.length === 0){
            bookList.innerHTML= '<p> Tidak ada buku yang di temukan</p>';
            return;
        }
        data.forEach(book => {
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");
            const bookHtml = `<img src="${book.thumbnail || 'https://via.placeholder.com/150'}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p><strong>Penulis :</strong> ${book.authors.join(", ")}</p>
            <p><strong>Tanggal Terbit :</strong> ${book.publishedDate}</p>
            <p>${book.description || "Tidak ada deskripsi"}</p>`;
            bookDiv.innerHTML = bookHtml;
            bookList.appendChild(bookDiv);
        });
    })
    .catch(error =>{
        console.error("error fetching books:", error)
    })
})
