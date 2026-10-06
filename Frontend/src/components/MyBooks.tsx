import styled from 'styled-components';
import { Fragment, useContext } from 'react';
import MyBooksContext from '../MyBooksContext';

const BookContainer = styled.div`
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
    gap: 0.8rem;
    width: 100%;
    max-width: 28rem;
    background-color: var(--color-neutral-light);
    padding: 0.8rem;
    border-radius: 6px;
`;
const BooksCard = styled.div`
    aspect-ratio: 2 / 3;
    border-radius: 4px;
    overflow: hidden;
`;
const BookCover = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

function MyBooks() {
    const { books } = useContext(MyBooksContext);

    return (
        <Fragment>
            <BookContainer>
                <h3>My books:</h3>
                {books.length > 0 ? (
                    <BooksDiv>
                        {books.map((book) => (
                            <BooksCard key={book.id}>
                                <BookCover src={book.cover_url} alt="Book cover" />
                            </BooksCard>
                        ))}
                    </BooksDiv>
                ) : (
                    <BooksDiv>
                        <p>You currently don't have any books.</p>
                    </BooksDiv>
                )}
            </BookContainer>
        </Fragment>
    );
}

export default MyBooks;
