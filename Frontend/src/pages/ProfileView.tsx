import styled from 'styled-components';
import { Fragment } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';

import MyBooksContext from '../MyBooksContext';
import MyBooks from '../components/MyBooks';

const ProfileWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem auto 3rem;
    gap: 1rem;
    width: fit-content;
    @media (min-width: 890px) {
    }
`;
const ProfileImage = styled.img`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    @media (min-width: 890px) {
    }
`;
const ProfileName = styled.p`
    color: var(--color-secondary);
    font-size: 36px;
    font-weight: 400;
    @media (min-width: 890px) {
    }
`;
const CircleContainer = styled.div`
    width: 20rem;
    height: 14rem;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 6px;
    padding: 0.6rem;
    margin: 10px auto 30px;
    overflow: auto;

    --fade-start: 90%;
    mask-image: linear-gradient(to bottom, white var(--fade-start), transparent);
    @media (min-width: 890px) {
    }
`;
const CircleWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    width: 18rem;
    height: fit-content;
    margin: 0 auto 20px;
    gap: 0.8rem;
    @media (min-width: 890px) {
    }
`;
const ImageWrapper = styled.div`
    position: relative;
    @media (min-width: 890px) {
    }
`;
const CircleImage = styled.img`
    width: 80px;
    height: 95px;
    object-fit: contain;
    margin: 5px auto;
    opacity: 30%;
    @media (min-width: 890px) {
    }
`;
const BookCover = styled.img`
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
    width: 55px;
    height: 65px;
    object-fit: contain;
    margin: auto;
    @media (min-width: 890px) {
    }
`;
const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    height: 95px;
    @media (min-width: 890px) {
    }
`;
const CircleName = styled.h3`
    font-size: 0.9rem;
    margin: 0;
    @media (min-width: 890px) {
    }
`;
const CircleMembers = styled.p`
    font-size: 0.8rem;
    margin: 0;
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
                        <CircleWrapper>
                            <ImageWrapper>
                                <CircleImage src={circle.image} alt="Circle image" />
                                <BookCover src={circle.image} alt="Book-cover" />
                            </ImageWrapper>
                            <TextWrapper>
                                <CircleName>{circle.name}</CircleName>
                                <CircleMembers>Number of members</CircleMembers>
                            </TextWrapper>
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
