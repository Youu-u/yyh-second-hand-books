// Random Slogan
const slogans = [
    "Read more, spend less with YYH.",
    "Every book deserves a second chapter.",
    "Books on a budget, stories without end.",
    "Books that travel, stories that stay.",
    "Swap books, spark joy.",
    "YYH: Read cheap, live green."
];
window.onload = () => {
    const sloganElement = document.getElementById('slogan');
    if (sloganElement) {
        sloganElement.textContent = slogans[Math.floor(Math.random() * slogans.length)];
    }
    populateBookDropdown();
};

// Populate Book Dropdown
function populateBookDropdown() {
    const bookSelect = document.getElementById('book_title');
    if (!bookSelect) return;

    const books = [
        {
            id: 'book-001',
            title: 'Math Textbook',
            condition: 'Good',
            grade: 'Grade 10',
            price: '60'
        }
        // Add more books here as they are added to products.html
    ];

    books.forEach(book => {
        const option = document.createElement('option');
        option.value = book.title;
        option.textContent = `${book.title} - ${book.condition} - ${book.grade} - $${book.price}`;
        option.setAttribute('data-book-id', book.id); // Store book_id for later use
        bookSelect.appendChild(option);
    });
}

// Search Books
function searchBooks() {
    const query = document.getElementById('search')?.value.toLowerCase();
    const books = document.querySelectorAll('.book');
    books.forEach(book => {
        const title = book.getAttribute('data-title').toLowerCase();
        book.style.display = query && title.includes(query) ? 'block' : query ? 'none' : 'block';
    });
}

// Filter Books
function filterBooks(type, value) {
    const books = document.querySelectorAll('.book');
    books.forEach(book => {
        const attr = book.getAttribute(`data-${type}`);
        book.style.display = (value === 'all' || attr === value) ? 'block' : 'none';
    });
}

// Copy to Clipboard Function
function copyBookId(bookId) {
    navigator.clipboard.writeText(bookId).then(() => {
        alert('Book ID copied to clipboard!');
    }).catch(() => {
        alert('Failed to copy Book ID. Please copy it manually: ' + bookId);
    });
}

// Sell Form
document.getElementById('sell-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {
        seller_name: formData.get('seller_name'),
        book_title: formData.get('book_title'),
        grade: formData.get('grade') || 'Not specified',
        bank_account: formData.get('bank_account'),
        contact_info: formData.get('contact_info')
    };

    emailjs.send('service_20090312', 'template_wrrvyes', data)
        .then(() => {
            alert('Thanks for submitting! We’ll arrange a campus pickup and contact you soon. Check out the FAQ for more details:\n\nHow to Sell Your Book? (faq.html#consignment)');
            this.reset();
        })
        .catch(() => {
            alert('Oops, something went wrong. Please email us directly.');
        });
});

// Buy Form
document.getElementById('buy-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const selectedBook = document.getElementById('book_title');
    const bookText = selectedBook.options[selectedBook.selectedIndex].text;
    const bookId = selectedBook.options[selectedBook.selectedIndex].getAttribute('data-book-id');
    const buyerEmail = formData.get('buyer_email');
    const data = {
        buyer_name: formData.get('buyer_name'),
        buyer_email: buyerEmail,
        buyer_grade: formData.get('buyer_grade'),
        book_title: formData.get('book_title'),
        pickup: formData.get('pickup')
    };

    // Send email to you
    emailjs.send('service_20090312', 'template_y31uezm', data)
        .then(() => {
            // Show Pay Now button
            const payNowButton = document.getElementById('pay-now-button');
            payNowButton.style.display = 'inline-block';

            // Show alert with Copy Book ID option
            alert(`Order submitted! Please pay within 24 hours, or your order will be canceled.\n\nClick the "Pay Now" button below to pay via PayPal. **YOU MUST INCLUDE YOUR BOOK ID: ${bookId} IN THE PAYMENT NOTE, OR WE CANNOT PROCESS YOUR ORDER!**\n\nClick OK to copy your Book ID to clipboard.`);

            // Copy Book ID to clipboard
            copyBookId(bookId);

            this.reset();
        })
        .catch(() => {
            alert('Oops, something went wrong. Please email us directly.');
        });
});

(function(){
    emailjs.init('zFKc1_rRIY5tdrF5M');
})();
