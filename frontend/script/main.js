const url = '../backend/data/books.json';
const searchToggle = document.getElementById("searchToggle");
const searchContainer = document.getElementById("searchContainer");
const logOut=document.getElementById("logOut");
const home=document.getElementById("home");
const contact=document.getElementById("contact");
const slider=document.querySelector('.slider');
const about=document.getElementById('about');
const aboutContainer=document.getElementById('aboutContainer');

fetch(url)
        .then(response => response.json())
        .then(jsonResult => {
        displayBooks(jsonResult);

        window.search = function () {
            let filter = document.getElementById("filter").value.toLowerCase();
            let filteredBooks = jsonResult.filter(book =>
              book.title.toLowerCase().includes(filter) ||
              book.authors.join(' ').toLowerCase().includes(filter) || 
              book.description.toLowerCase().includes(filter) ||
              book.isbn.toLowerCase().includes(filter)
            );
            displayBooks(filteredBooks);
          };
      
          const filterInput = document.getElementById("filter");
          filterInput.addEventListener("input", function () {
            if (filterInput.value === "") {
              displayBooks(jsonResult);
            }
          });
      

        searchToggle.addEventListener("click", function () {
           
            if (searchContainer.style.display === "none" || searchContainer.style.display === "" || contactContainer.style.display==='block') {
                searchContainer.style.display = "block";
                contactContainer.style.display='none';
            } else {
                searchContainer.style.display = "none";
            }
            slider.style.display="none";
            aboutContainer.style.display="none";
        });
        logOut.addEventListener('click',function(){
            window.location.href = 'registrationPage.html';

            
        })
        home.addEventListener('click',function(){
            if(searchContainer.style.display==="block" ){
                searchContainer.style.display="none";
            }
            if(contactContainer.style.display==='block'){
                contactContainer.style.display="none";
            }
            aboutContainer.style.display="none";
            slider.style.display="block";
        })
    
        const contactContainer=document.getElementById("contactContainer");
        contact.addEventListener('click',function(){
            if(searchContainer.style.display==="block"){
                searchContainer.style.display='none';
            }
            slider.style.display="none";
            aboutContainer.style.display="none";
            contactContainer.innerHTML=`<p style="display: block;">ilia.8maxaradze@gmail.com</p>`
            contactContainer.style.display = "block";
        })
        about.addEventListener('click',function(){
            searchContainer.style.display='none';
            slider.style.display="none";
            contactContainer.style.display = "none";
            aboutContainer.innerHTML=`<p style="display: block;">წიგნების ლაიბრერი რომელშიც შეგიძლია მოძებნო სასურველი წიგნი ,სასურველი ფილტრაციით.საიტზე რო შეხვიდე გჭირდება რეგისტრაცია, 
            რომელიც ინახება ლოკალურ მეხსიერებაში.საიტს აქვს სარეგისტრაციო ველი და ავტორიზაციის ველი, რომელიც მოწმდება Regex-ით.მუშაობს გამართულად მარა ყოველი შემთხვევისთვის გითჰაბზეც
             დავჰოსტავ როგორც საიტს.mainContentByOop.js ფაილში არის main.js კონტენტი ოღონდ დაწერილი კლასებით და ოოპ პრინციპით.პს 
            ბოდიში დაულაგებელი დიზაინისთვის.ფუნქციონალი გამართულია.</p>`
            aboutContainer.style.display="block";
        })
    });

    function displayBooks(books) {
        let res = document.querySelector(".res");
        res.innerHTML = "";
    
        if (books.length === 0) {
            res.innerHTML = "<p>No books found.</p>";
            return;
        }
    
        books.forEach(book => {
            let bookDiv = document.createElement("div");
    
         
            bookDiv.innerHTML = `
                <img src="${book.coverImg}" alt="${book.title}" />
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <h4>Author: ${book.author}</h4>
                    <p><strong>Genre:</strong> ${book.genre}</p>
                    <p><strong>Description:</strong> ${book.description}</p>
                </div>
            `;
            bookDiv.onclick=()=>{
                const bookId = book.id; 
                window.location.href = `book.html?id=${bookId}`;//going in book.html file
                 
            }

            res.appendChild(bookDiv);
        });
    }
    

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

document.querySelector('.next').addEventListener('click', () => moveSlide(1));
document.querySelector('.prev').addEventListener('click', () => moveSlide(-1));

function moveSlide(step) {
    currentSlide = (currentSlide + step + totalSlides) % totalSlides;
    updateSlidePosition();
}

function updateSlidePosition() {
    const slidesContainer = document.querySelector('.slides');
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}



setInterval(() => moveSlide(1), 3000); //automatically change after 3 second

