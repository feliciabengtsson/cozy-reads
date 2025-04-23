PRAGMA foreign_keys = ON;

DELETE FROM book_circles;
DELETE FROM circles;
DELETE FROM users;
DELETE FROM books;

DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS circles;
DROP TABLE IF EXISTS book_circles;

CREATE TABLE IF NOT EXISTS books (
	book_id INTEGER PRIMARY KEY,
	title TEXT NOT NULL UNIQUE,
	author TEXT NOT NULL,
    genre TEXT NOT NULL,
    year INTEGER NOT NULL,
    cover_url TEXT NOT NULL,
    summary TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
	users_id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	address TEXT
);

CREATE TABLE IF NOT EXISTS circles (
	circles_id INTEGER PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    meeting_schedule TEXT NOT NULL,
    currently_reading INTEGER,
    latest_comment TEXT,
	next_meetup TEXT NOT NULL DEFAULT current_date,
	image TEXT NOT NULL,
	FOREIGN KEY (currently_reading) REFERENCES books(book_id)
);

CREATE TABLE IF NOT EXISTS book_circles (
	user_id INTEGER,
	circle_id INTEGER,
	PRIMARY KEY (user_id, circle_id),
	FOREIGN KEY (user_id) REFERENCES users(users_id),
	FOREIGN KEY (circle_id) REFERENCES circles(circles_id)
);

INSERT OR IGNORE INTO books (book_id, title, author, genre, year, cover_url, summary) VALUES (1, 'To Kill a Mockingbird', 'Harper Lee', 'Classic Fiction', 1960, 'https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg', 'A gripping story about racism and justice in the American South, seen through the eyes of a young girl, Scout Finch.');
INSERT OR IGNORE INTO books (book_id, title, author, genre, year, cover_url, summary) VALUES (2, '1984', 'George Orwell', 'Dystopian', 1949, 'https://m.media-amazon.com/images/I/71rpa1-kyvL._SL1500_.jpg', 'A dystopian future where Big Brother monitors everything, and individual freedom is eradicated by totalitarian rule.');
INSERT OR IGNORE INTO books (book_id, title, author, genre, year, cover_url, summary) VALUES (3, 'The Hobbit', 'J.R.R. Tolkien', 'Fantasy', 1937, 'https://www.sfbok.se/sites/default/files/styles/1000x/sfbok/sfbokbilder/44/44328.jpg?bust=1190288257&itok=KuK0wPST', 'Bilbo Baggins embarks on an adventure with dwarves and the wizard Gandalf to reclaim treasure from a fearsome dragon.');
INSERT OR IGNORE INTO books (book_id, title, author, genre, year, cover_url, summary) VALUES (4, 'The Catcher in the Rye', 'J.D. Salinger', 'Young Adult', 1951, 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1398034300i/5107.jpg', 'Teenager Holden Caulfield struggles with alienation and the absurdity of adult life in a story about coming-of-age and identity.');
INSERT OR IGNORE INTO books (book_id, title, author, genre, year, cover_url, summary) VALUES (5, 'Pride and Prejudice', 'Jane Austen', 'Romance', 1813, 'https://s3-ap-southeast-2.amazonaws.com/assets.allenandunwin.com/images/small/9780571337019.jpg', 'Elizabeth Bennet navigates love and societal norms in a classic tale of romance and pride.');
INSERT OR IGNORE INTO books (book_id, title, author, genre, year, cover_url, summary) VALUES (6, 'Moby-Dick', 'Herman Melville', 'Adventure', 1851, 'https://bilder.akademibokhandeln.se/images_akb/9781681778488_383/moby-dick', 'Sailor Ishmael follows Captain Ahab´s obsession with hunting the white whale, Moby Dick.');
INSERT OR IGNORE INTO books (book_id, title, author, genre, year, cover_url, summary) VALUES (7, 'The Great Gatsby', 'F. Scott Fitzgerald', 'Classic Fiction', 1925, 'https://image.bokus.com/images/9781853260414_200x_the-great-gatsby_haftad', 'A story of love, dreams, and decadence in 1920s America, told through the tragic life of Jay Gatsby.');
INSERT OR IGNORE INTO books (book_id, title, author, genre, year, cover_url, summary) VALUES (8, 'The Da Vinci Code', 'Dan Brown', 'Thriller', 2003, 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/DaVinciCode.jpg/220px-DaVinciCode.jpg', 'An action-packed thriller where symbologist Robert Langdon uncovers religious mysteries and secret societies.');
INSERT OR IGNORE INTO books (book_id, title, author, genre, year, cover_url, summary) VALUES (9, 'The Shining', 'Stephen King', 'Horror', 1977, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/The_Shining_%281977%29_front_cover%2C_first_edition.jpg/250px-The_Shining_%281977%29_front_cover%2C_first_edition.jpg', 'A family moves to an isolated hotel where the father slowly goes mad due to supernatural forces.');
INSERT OR IGNORE INTO books (book_id, title, author, genre, year, cover_url, summary) VALUES (10, 'Dune', 'Frank Herbert', 'Science Fiction', 1965, 'https://bilder.akademibokhandeln.se/images_akb/9780340960196_383/dune', 'Paul Atreides´ destiny intertwines with the desert planet where power struggles and mystical forces control the universe.');
INSERT OR IGNORE INTO books (book_id, title, author, genre, year, cover_url, summary) VALUES (11, 'The Lord of the Rings: The Fellowship of the Ring', 'J.R.R. Tolkien', 'Fantasy', 1954, 'https://upload.wikimedia.org/wikipedia/en/8/8e/The_Fellowship_of_the_Ring_cover.gif', 'Frodo Baggins and his companions embark on a journey to destroy the One Ring and defeat the dark lord Sauron.');
INSERT OR IGNORE INTO books (book_id, title, author, genre, year, cover_url, summary) VALUES (12, 'Harry Potter and the Sorcerer´s Stone', 'J.K. Rowling', 'Fantasy', 1997, 'https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg', 'Harry Potter discovers that he is a wizard and begins his adventure at Hogwarts School of Witchcraft and Wizardry.');
INSERT OR IGNORE INTO books (book_id, title, author, genre, year, cover_url, summary) VALUES (13, 'The Chronicles of Narnia: The Lion, the Witch and the Wardrobe', 'C.S. Lewis', 'Fantasy', 1950, 'https://upload.wikimedia.org/wikipedia/en/7/7b/The_Lion%2C_the_Witch_and_the_Wardrobe.jpg', 'Four siblings step into a magical world through a wardrobe and help Aslan the lion defeat the White Witch.');
INSERT OR IGNORE INTO books (book_id, title, author, genre, year, cover_url, summary) VALUES (14, 'Brave New World', 'Aldous Huxley', 'Dystopian', 1932, 'https://upload.wikimedia.org/wikipedia/en/a/a0/BraveNewWorld_FirstEdition.jpg', 'In a futuristic society where happiness is engineered, a man named Bernard Marx questions the system and his own identity.');
INSERT OR IGNORE INTO books (book_id, title, author, genre, year, cover_url, summary) VALUES (15, 'The Fault in Our Stars', 'John Green', 'Young Adult', 2012, 'https://upload.wikimedia.org/wikipedia/en/3/3d/The_Fault_in_Our_Stars.jpg', 'Two teenagers with cancer fall in love and embark on a journey to meet their favorite author in Amsterdam.');
SELECT * FROM books;

INSERT OR IGNORE INTO users (users_id, name, address) VALUES (1, 'Felicia', 'Hittepåvägen 1');
INSERT OR IGNORE INTO users (users_id, name, address) VALUES (2, 'Medlem2', 'Testgatan 3');
INSERT OR IGNORE INTO users (users_id, name, address) VALUES (3, 'Medlem3', 'Hemstigen 9');
SELECT * FROM users;

INSERT OR IGNORE INTO circles (circles_id, name, meeting_schedule, currently_reading, latest_comment, next_meetup, image) VALUES (1, 'The Literary Enthusiasts', 'First Monday of every month', 5, 'Loved the character development in this one!', 'April 8, 2025', 'https://images.unsplash.com/photo-1694291395767-23698e6fe5df?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
INSERT OR IGNORE INTO circles (circles_id, name, meeting_schedule, currently_reading, latest_comment, next_meetup, image) VALUES (2, 'Sci-Fi Explorers', 'Every second Wednesday', 10, 'The world-building is incredible!', 'April 10, 2025', 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?q=80&w=1285&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
INSERT OR IGNORE INTO circles (circles_id, name, meeting_schedule, currently_reading, latest_comment, next_meetup, image) VALUES (3, 'Mystery Lovers', 'Last Friday of the month', 4, 'Such an unpredictable plot twist!', 'April 26, 2025', 'https://images.unsplash.com/photo-1697029749544-ffa7f15f9dd0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
INSERT OR IGNORE INTO circles (circles_id, name, meeting_schedule, currently_reading, latest_comment, next_meetup, image) VALUES (4, 'Fantasy Realm', 'Every Sunday evening', 3, 'Bilbo´s journey is so captivating!', 'April 6, 2025', 'https://images.unsplash.com/photo-1735042731477-ad80caed9bba?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
INSERT OR IGNORE INTO circles (circles_id, name, meeting_schedule, currently_reading, latest_comment, next_meetup, image) VALUES (5, 'Non-Fiction Thinkers', 'Bi-weekly on Thursdays', 6, 'Really makes you rethink human history!', 'April 11, 2025', 'https://images.unsplash.com/photo-1742867113796-510f600e777f?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
SELECT * FROM circles;

INSERT OR IGNORE INTO book_circles (user_id, circle_id) VALUES (1, 1);
INSERT OR IGNORE INTO book_circles (user_id, circle_id) VALUES (2, 2);
INSERT OR IGNORE INTO book_circles (user_id, circle_id) VALUES (3, 1);
SELECT * FROM book_circles;

