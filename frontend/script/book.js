const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('id');

fetch('../backend/data/books.json')
    .then(response => response.json())
    .then(jsonResult => {
        const book = jsonResult.find(b => b.id == bookId);
        if (book) {
            
            document.getElementById("bookTitle").innerText = book.title;
            document.getElementById("bookAuthor").innerText = book.author;
            document.getElementById("bookDescription").innerText = book.description;
            
        }
    });
