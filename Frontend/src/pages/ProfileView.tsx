import styled from 'styled-components';
import { Fragment } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';

import MyBooksContext from '../MyBooksContext';
import MyBooks from '../components/MyBooks';

const ProfileWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 3rem;
    @media (min-width: 890px) {
    }
`;
const ProfileImage = styled.img`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    margin: 1rem auto;
    @media (min-width: 890px) {
    }
`;
const ProfileName = styled.p`
    color: var(--color-secondary);
    font-size: 36px;
    font-weight: 400;
    margin: auto;
    @media (min-width: 890px) {
    }
`;
const CircleContainer = styled.div`
    width: 19rem;
    height: fit-content;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 6px;
    padding: 0.6rem;
    margin: auto;
    @media (min-width: 890px) {
    }
`;
const CircleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: 890px) {
        text-align: center;
    }
`;
const CircleImage = styled.div`
    width: 80px;
    height: 95px;
    background-repeat: no-repeat;
    margin: 0 5px;
    @media (min-width: 890px) {
    }
`;
const BookCover = styled.img`
    @media (min-width: 890px) {
    }
`;

interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    year: number;
    cover_url: string;
    summary: string;
}
interface CircleType {
    circles_id: number;
    name: string;
    meetingSchedule: string;
    currentlyReading: string;
    latestComment: string;
    nextMeetup: string;
    image: string;
}
interface UserType {
    users_id: number;
    name: string;
    address: string;
    image: string;
}

function ProfileView() {
    const [books, setBooks] = useState<Book[]>([]);
    const [circles, setCircles] = useState<CircleType[]>([]);
    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/books')
            .then((response) => response.json())
            .then((result: Book[]) => {
                setBooks(result.slice(0, 3));
                console.log(result.slice(0, 3), 'böcker');
            });
        fetch('http://localhost:8080/bookcircles')
            .then((response) => response.json())
            .then((result: CircleType[]) => {
                setCircles(result.slice(0, 2));
                console.log(result.slice(0, 2), 'cirklar');
            });
        fetch('http://localhost:8080/profile')
            .then((response) => response.json())
            .then((result: UserType[]) => {
                setUsers(result.slice(0, 1));
                console.log(result.slice(0, 1), 'users');
            });
    }, []);

    return (
        <Fragment>
            {users.map((user) => (
                <ProfileWrapper>
                    <ProfileImage src={user.image} alt="Profile picture" />
                    <ProfileName>{user.name}</ProfileName>
                </ProfileWrapper>
            ))}
            <h3>My Circles:</h3>
            <CircleContainer>
                {circles.map((circle) => (
                    <Fragment>
                        <CircleImage
                            style={{
                                background: `url(${circle.image})`,
                                width: 'inherit',
                                backgroundSize: 'contain'
                            }}
                        >
                            <BookCover src="" alt="Book-cover" />
                        </CircleImage>
                        <CircleWrapper>
                            <h3>{circle.name}</h3>
                            <span>Number of members</span>
                        </CircleWrapper>
                    </Fragment>
                ))}
            </CircleContainer>
            <MyBooksContext.Provider value={{ books, setBooks }}>
                <MyBooks />
            </MyBooksContext.Provider>
        </Fragment>
    );
}

export default ProfileView;
