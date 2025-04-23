import styled from 'styled-components';
import { Fragment } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Form = styled.form`
    display: flex;
    justify-content: space-between;
    margin: 1rem auto;
    input,
    select {
        background-color: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 15px;
        padding: 0.5rem;
    }
`;
const BooksContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (min-width: 890px) {
        text-align: center;
    }
`;
const BooksDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    align-self: center;
    width: fit-content;
    height: fit-content;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 0.6rem;
    border-radius: 6px;
    @media (min-width: 890px) {
        grid-template-columns: repeat(5, 1fr);
    }
`;
const BooksCard = styled.div`
    width: 5.5rem;
    height: 7rem;
    background-color: #f5f1e7c3;
    margin: 10px;
    @media (min-width: 890px) {
        width: 7.5rem;
        height: 9.5rem;
    }
`;
const BookCover = styled.img`
    width: 5.5rem;
    height: 7rem;
    cursor: pointer;
    @media (min-width: 890px) {
        width: 7.5rem;
        height: 9.5rem;
    }
`;

interface BookType {
    book: {
        book_id: number;
        title: string;
        author: string;
        genre: string;
        year: number;
        cover_url: string;
        summary: string;
    };
}

function BooksView() {
    const [books, setBooks] = useState<BookType['book'][]>([]);
    const [search, setSearch] = useState('');
    const [filteredBooks, setFilteredBooks] = useState(books);

    useEffect(() => {
        fetch('http://localhost:8080/books')
            .then((response) => response.json())
            .then((result) => {
                console.log(result, 'hämtade böcker');
                setBooks(result.slice(0, 9));
            });
    }, []);

    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const searchInput = event.target.value;
        setSearch(searchInput);

        const filteredSearch = books.filter((book) =>
            book.title.toLowerCase().includes(searchInput.toLowerCase())
        );
        console.log(searchInput, 'sökt bok');
        setFilteredBooks(filteredSearch);
    };

    return (
        <Fragment>
            <section>
                <Form>
                    <div>
                        <input
                            value={search}
                            onChange={onChangeHandler}
                            type="text"
                            name="filter-book"
                            placeholder="Search for books"
                        />
                    </div>
                    <div>
                        <label>
                            <select name="SelectedGenre" defaultValue="Genres">
                                <option value="Genres">Genres</option>
                                <option value="Classic Fiction">Classic Fiction</option>
                                <option value="Dystopian">Dystopian</option>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Young Adult">Young Adult</option>
                                <option value="Romance">Romance</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Thriller">Thriller</option>
                                <option value="Horror">Horror</option>
                                <option value="Science Fiction">Science Fiction</option>
                            </select>
                        </label>
                    </div>
                </Form>
                <h3>📖 Book of the Month:</h3>
                <p>The Invisible Library by Genevieve Cogman</p>
                <p>
                    Join us on an adventure through parallel worlds where a secret library collects
                    unique books from different realities! Perfect for fans of fantasy and mystery.
                </p>
                <p>💬 Discussion Starts: 25th of each month</p>
            </section>
            <BooksContainer>
                {filteredBooks.length > 0 ? (
                    <BooksDiv>
                        {filteredBooks.map((book) => (
                            <BooksCard key={book.book_id}>
                                <Link to={`/books/${book.book_id}`}>
                                    <BookCover src={book.cover_url} alt="Book cover" />
                                </Link>
                            </BooksCard>
                        ))}
                    </BooksDiv>
                ) : (
                    <BooksDiv>
                        {books.map((book) => (
                            <BooksCard key={book.book_id}>
                                <Link to={`/books/${book.book_id}`}>
                                    <BookCover src={book.cover_url} alt="Book cover" />
                                </Link>
                            </BooksCard>
                        ))}
                    </BooksDiv>
                )}
            </BooksContainer>
        </Fragment>
    );
}
export default BooksView;
