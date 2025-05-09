import styled from 'styled-components';
import { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import BookCirclesBanner from '../assets/images/bookbanner.jpg';

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
    width: 100vw;
    height: 7rem;
    object-fit: cover;
    @media (min-width: 890px) {
        width: 50vw;
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
    grid-template-rows: 1fr;
    align-self: center;
    width: fit-content;
    height: fit-content;
    background-color: var(--color-neutral-light);
    padding: 0.6rem;
    border-radius: 6px;
`;
const CircleCard = styled.div`
    width: 5.5rem;
    height: 7rem;
    margin: 5px 5px;
    @media (min-width: 890px) {
        width: 8rem;
        height: 9.5rem;
    }
`;
const CircleImage = styled.img`
    width: 5.5rem;
    height: 7rem;
    @media (min-width: 890px) {
        width: 8rem;
        height: 9.5rem;
    }
`;
const AddDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0.6rem;
    bottom: 5rem;
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
        fetch('http://localhost:8080/bookcircles')
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
                        <Link to={`/bookcircles/add`}>
                            <span className="material-symbols-outlined">add</span>
                        </Link>
                    </AddDiv>
                </section>
            </div>
        </Fragment>
    );
}

export default BookCirclesView;
