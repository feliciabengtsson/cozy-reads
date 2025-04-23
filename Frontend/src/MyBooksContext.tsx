import { createContext } from 'react';

interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    year: number;
    cover_url: string;
    summary: string;
}

interface BookContext {
    books: Book[];
    setBooks: React.Dispatch<
        React.SetStateAction<Book[]>
    > /* https://stackoverflow.com/questions/72420279/usestate-with-usecontext-in-typescript */;
}

const MyBooksContext = createContext<BookContext>({
    books: [],
    setBooks: () => {}
});

export default MyBooksContext;
