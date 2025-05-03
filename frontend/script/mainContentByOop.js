class Book{
    constructor(title,author,genre){
        this.title = title;
        this.author = author;
        this.genre = genre;
    }
    displayBook() {
        return `<h3>${this.title}</h3><p>Author: ${this.author}</p><p>Genre: ${this.genre}</p>`;
    }
}



class BookStore {
    constructor(url) {
        this.url = url;
        this.books = [];
    }

    fetchBooks() {
        fetch(this.url)
            .then(response => response.json())
            .then(jsonResult => {
                this.books = jsonResult.map(bookData => new Book(bookData.title, bookData.author, bookData.genre));
                this.displayBooks(this.books);
                this.setupSearch(jsonResult);
            });
    }

    displayBooks(books) {
        const res = document.querySelector(".res");
        res.innerHTML = "";

        if (books.length === 0) {
            res.innerHTML = "<p>No books found.</p>";
            return;
        }

        books.forEach(book => {
            let bookDiv = document.createElement("div");
            bookDiv.innerHTML = book.displayBook();
            res.appendChild(bookDiv);
        });
    }

    setupSearch(jsonResult) {
        window.search = function () {
            let filter = document.getElementById("filter").value.toLowerCase();
            let filteredBooks = jsonResult.filter(book =>
                book.genre.toLowerCase().includes(filter) ||
                book.author.toLowerCase().includes(filter) ||
                book.title.toLowerCase().includes(filter)
            );
            this.displayBooks(filteredBooks);
        };

        const filterInput = document.getElementById("filter");
        filterInput.addEventListener("input", function () {
            if (filterInput.value === "") {
                this.displayBooks(jsonResult);
            }
        });
    }
}

class UIHandler {
    constructor() {
        this.searchToggle = document.getElementById("searchToggle");
        this.searchContainer = document.getElementById("searchContainer");
        this.logOut = document.getElementById("logOut");
        this.home = document.getElementById("home");
        this.contact = document.getElementById("contact");
        this.slider = document.querySelector('.slider');
        this.contactContainer = document.getElementById("contactContainer");
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.totalSlides = this.slides.length;

        this.addEventListeners();
    }

    addEventListeners() {
        this.searchToggle.addEventListener("click", () => this.toggleSearchContainer());
        this.logOut.addEventListener('click', () => this.logOutUser());
        this.home.addEventListener('click', () => this.goHome());
        this.contact.addEventListener('click', () => this.showContact());
        document.querySelector('.next').addEventListener('click', () => this.moveSlide(1));
        document.querySelector('.prev').addEventListener('click', () => this.moveSlide(-1));

        setInterval(() => this.moveSlide(1), 3000); // Change slide every 3 seconds
    }

    toggleSearchContainer() {
        if (this.searchContainer.style.display === "none" || this.searchContainer.style.display === "" || this.contactContainer.style.display === 'block') {
            this.searchContainer.style.display = "block";
            this.contactContainer.style.display = 'none';
        } else {
            this.searchContainer.style.display = "none";
        }
        this.slider.style.display = "none";
    }

    logOutUser() {
        window.location.href = 'registrationPage.html';
    }

    goHome() {
        if (this.searchContainer.style.display === "block") {
            this.searchContainer.style.display = "none";
        }
        if (this.contactContainer.style.display === 'block') {
            this.contactContainer.style.display = "none";
        }
        this.slider.style.display = "block";
    }

    showContact() {
        if (this.searchContainer.style.display === "block") {
            this.searchContainer.style.display = 'none';
        }
        this.slider.style.display = "none";
        this.contactContainer.innerHTML = `<p style="display: block;">ilia.8maxaradze@gmail.com</p>`;
        this.contactContainer.style.display = "block";
    }

    moveSlide(step) {
        this.currentSlide = (this.currentSlide + step + this.totalSlides) % this.totalSlides;
        this.updateSlidePosition();
    }

    updateSlidePosition() {
        const slidesContainer = document.querySelector('.slides');
        slidesContainer.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    }
}


const bookstore = new BookStore('https://678e2d7ba64c82aeb11f5a99.mockapi.io/food/api/booksApi');
const uiHandler = new UIHandler();

bookstore.fetchBooks();