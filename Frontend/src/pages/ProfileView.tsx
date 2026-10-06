import styled from 'styled-components';
import { Fragment } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../api/api';

import MyBooksContext from '../MyBooksContext';
import MyBooks from '../components/MyBooks';

const ProfileWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem auto 3rem;
    gap: 1rem;
    width: fit-content;
`;
const ProfileImage = styled.img`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    object-fit: cover;
`;
const ProfileName = styled.p`
    color: var(--color-secondary);
    font-size: clamp(1.75rem, 7vw, 2.25rem);
    font-weight: 400;
    margin: 0;
`;
const CircleContainer = styled.div`
    width: 100%;
    max-width: 28rem;
    height: 14rem;
    background-color: var(--color-neutral-light);
    border-radius: 6px;
    padding: 0.6rem;
    margin: 10px auto 30px;
    overflow: auto;

    --fade-start: 90%;
    mask-image: linear-gradient(to bottom, white var(--fade-start), transparent);
`;
const CircleLink = styled(Link)`
    text-decoration: none;
`;
const CircleWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    width: 100%;
    height: fit-content;
    margin: 0 auto 20px;
    gap: 0.8rem;
`;
const ImageWrapper = styled.div`
    position: relative;
`;
const CircleImage = styled.img`
    width: 80px;
    height: 95px;
    object-fit: contain;
    margin: 5px auto;
    opacity: 30%;
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
`;
const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    height: 95px;
`;
const CircleName = styled.h3`
    font-size: 0.9rem;
    margin: 0;
`;
const CircleMembers = styled.p`
    font-size: 0.8rem;
    margin: 0;
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
    meeting_schedule: string;
    currently_reading: string;
    latest_comment: string;
    next_meetup: string;
    image: string;
    cover_url: string;
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
        fetch(`${API_URL}/books`)
            .then((response) => response.json())
            .then((result: Book[]) => {
                setBooks(result.slice(0, 3));
                console.log(result.slice(0, 3), 'books');
            });
        fetch(`${API_URL}/bookcircles`)
            .then((response) => response.json())
            .then((result: CircleType[]) => {
                setCircles(result.slice(0, 2));
                console.log(result.slice(0, 2), 'circles');
            });
        fetch(`${API_URL}/profile`)
            .then((response) => response.json())
            .then((result: UserType[]) => {
                setUsers(result.slice(0, 1));
                console.log(result.slice(0, 1), 'users');
            });
    }, []);

    return (
        <Fragment>
            {users.map((user) => (
                <ProfileWrapper key={user.users_id}>
                    <ProfileImage src={user.image} alt="Profile picture" />
                    <ProfileName>{user.name}</ProfileName>
                </ProfileWrapper>
            ))}
            <h3>My Circles:</h3>
            <CircleContainer>
                {circles.map((circle) => (
                    <CircleLink key={circle.circles_id} to={`/bookcircles/${circle.circles_id}`}>
                        <CircleWrapper>
                            <ImageWrapper>
                                <CircleImage src={circle.image} alt="Circle image" />
                                <BookCover src={circle.cover_url} alt="Book-cover" />
                            </ImageWrapper>
                            <TextWrapper>
                                <CircleName>{circle.name}</CircleName>
                                <CircleMembers>Number of members</CircleMembers>
                            </TextWrapper>
                        </CircleWrapper>
                    </CircleLink>
                ))}
            </CircleContainer>
            <MyBooksContext.Provider value={{ books, setBooks }}>
                <MyBooks />
            </MyBooksContext.Provider>
        </Fragment>
    );
}

export default ProfileView;
