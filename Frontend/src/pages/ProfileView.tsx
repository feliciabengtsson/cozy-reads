import { Fragment } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';

import MyBooksContext from '../MyBooksContext';
import MyBooks from '../components/MyBooks';

interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    year: number;
    cover_url: string;
    summary: string;
}

function ProfileView() {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/books')
            .then((response) => response.json())
            .then((result: Book[]) => {
                setBooks(result.slice(0, 3));
                console.log(result.slice(0, 2), 'böcker');
            });
    }, []);

    return (
        <Fragment>
            <MyBooksContext.Provider value={{ books, setBooks }}>
                <MyBooks />
            </MyBooksContext.Provider>
        </Fragment>
    );
}

export default ProfileView;
