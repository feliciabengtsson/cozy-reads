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
    grid-template-rows: 1fr;
    align-self: center;
    width: fit-content;
    height: fit-content;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 0.6rem;
    border-radius: 6px;
`;
const BooksCard = styled.div`
    width: 5.5rem;
    height: 7rem;
    margin: 0 5px;
    @media (min-width: 890px) {
        width: 8rem;
        height: 9.5rem;
    }
`;
const BookCover = styled.img`
    width: 5.5rem;
    height: 7rem;
    @media (min-width: 890px) {
        width: 8rem;
        height: 9.5rem;
    }
`;

function MyBooks() {
    const { books } = useContext(MyBooksContext);

    return (
        <Fragment>
            <BookContainer>
                <h3>My books:</h3>
                {books ? (
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
