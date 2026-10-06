import styled from 'styled-components';
import { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import BookCirclesBanner from '../assets/images/bookbanner.jpg';
import { API_URL } from '../api/api';

const Header = styled.h2`
    @media (min-width: 890px) {
        margin-left: auto;
        margin-right: auto;
        width: fit-content;
    }
`;
const ImgWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Img = styled.img`
    width: 100%;
    height: 7rem;
    object-fit: cover;
    border-radius: 6px;
    @media (min-width: 890px) {
        height: 9rem;
    }
`;
const Text = styled.p`
    @media (min-width: 890px) {
        text-align: center;
    }
`;
const CircleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (min-width: 890px) {
        text-align: center;
    }
`;
const CircleDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.8rem;
    width: 100%;
    max-width: 28rem;
    background-color: var(--color-neutral-light);
    padding: 0.8rem;
    border-radius: 6px;
`;
const CircleCard = styled.div`
    aspect-ratio: 4 / 5;
    border-radius: 4px;
    overflow: hidden;
    transition: transform 0.2s;
    &:hover {
        transform: translateY(-3px);
    }
`;
const CircleImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
const AddDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    right: 1rem;
    bottom: calc(var(--nav-height) + 1rem);
    z-index: 5;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    background-color: var(--color-secondary);
    color: var(--color-background);
    border: none;
    height: 3.5rem;
    width: 3.5rem;
    border-radius: 50%;
    cursor: pointer;
`;

interface CircleType {
    circle: {
        circles_id: number;
        name: string;
        meetingSchedule: string;
        currentlyReading: string;
        latestComment: string;
        nextMeetup: string;
        image: string;
    };
}

function BookCirclesView() {
    const [circles, setCircles] = useState<CircleType['circle'][]>([]);

    useEffect(() => {
        fetch(`${API_URL}/bookcircles`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data, 'result');

                setCircles(data);
                console.log(circles, 'circles');
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Fragment>
            <div id="main-wrapper">
                <section id="book-circles">
                    <Header>Book circles</Header>
                    <ImgWrapper>
                        <Img src={BookCirclesBanner} alt="Book circles view banner" />
                    </ImgWrapper>
                    <Text>
                        Love reading with others? Join a CozyReads Book Circle, where small groups
                        dive into the same book and share their thoughts in a warm and friendly
                        space!
                    </Text>
                </section>
                <section id="my-groups">
                    <CircleContainer>
                        <h3>My groups:</h3>
                        <CircleDiv>
                            {circles.map((circle) => (
                                <CircleCard key={circle.circles_id}>
                                    <Link to={`/bookcircles/${circle.circles_id}`}>
                                        <CircleImage src={circle.image} alt="Book circle image" />
                                    </Link>
                                </CircleCard>
                            ))}
                        </CircleDiv>
                    </CircleContainer>
                </section>
                <section id="add-circle">
                    <AddDiv>
                        <Link to={`/bookcircles/add`} aria-label="Create book circle">
                            <span className="material-symbols-outlined">add</span>
                        </Link>
                    </AddDiv>
                </section>
            </div>
        </Fragment>
    );
}

export default BookCirclesView;
