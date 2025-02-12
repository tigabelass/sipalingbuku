document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("search-form").addEventListener("submit", function (event) {
        event.preventDefault();
        let query = document.getElementById("query").value.trim();
        console.log("Query:", query);  // Debugging

        if (!query) {
            alert("Masukkan kata kunci pencarian.");
            return;
        }

        fetch(`/api/books/?q=${query}`)
            .then(response => response.json())
            .then(data => {
                let resultsDiv = document.getElementById("results");
                resultsDiv.innerHTML = "";  // Kosongkan hasil sebelumnya

                if (data.error) {
                    resultsDiv.innerHTML = `<p class="text-danger">${data.error}</p>`;
                    return;
                }

                if (data.books.length === 0) {
                    resultsDiv.innerHTML = "<p class='text-muted'>Tidak ada hasil ditemukan.</p>";
                    return;
                }

                // Gunakan Bootstrap Grid
                let rowDiv = document.createElement("div");
                rowDiv.classList.add("row", "mt-3");

                data.books.forEach(book => {
                    let bookItem = document.createElement("div");
                    bookItem.classList.add("col-6", "col-sm-4", "col-md-2", "mb-4"); // 6 buku per baris di desktop
                    
                    bookItem.innerHTML = `
                        <div class="card h-100 shadow-sm">
                            <img src="${book.thumbnail}" class="card-img-top book-image" alt="Cover" data-title="${book.title}" data-authors="${book.authors.join(", ")}" data-description="${book.description}" data-published="${book.publishedDate}">
                            <div class="card-body p-2">
                                <h6 class="card-title">${book.title}</h6>
                                <small class="text-muted">${book.authors.join(", ")}</small>
                            </div>
                        </div>
                    `;

                    rowDiv.appendChild(bookItem);
                });

                resultsDiv.appendChild(rowDiv);

                // Tambahkan event listener untuk modal
                document.querySelectorAll(".book-image").forEach(img => {
                    img.addEventListener("click", function () {
                        document.getElementById("bookTitle").textContent = this.dataset.title;
                        document.getElementById("bookAuthors").textContent = this.dataset.authors;
                        document.getElementById("bookDescription").textContent = this.dataset.description;
                        document.getElementById("bookPublishedDate").textContent = this.dataset.published;
                        document.getElementById("bookThumbnail").src = this.src;

                        // Tampilkan modal
                        let bookModal = new bootstrap.Modal(document.getElementById("bookDetailModal"));
                        bookModal.show();
                    });
                });
            })
            .catch(error => console.error("Error:", error));
    });
});
document.addEventListener("DOMContentLoaded", function (){
    document.querySelectorAll(".book-image").forEach(img => {
        img.addEventListener("click", function () {
            document.getElementById("bookTitle").textContent = this.dataset.title;
            document.getElementById("bookAuthors").textContent = this.dataset.authors;
            document.getElementById("bookDescription").textContent = this.dataset.description;
            document.getElementById("bookThumbnail").src = this.src;

            let bookModal = new bootstrap.Modal(document.getElementById("bookDetailModal"));
            bookModal.show();
        });
    });
});
