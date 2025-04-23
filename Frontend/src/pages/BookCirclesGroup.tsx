import styled from 'styled-components';
import { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';

const CirclesHeader = styled.h2`
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
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
const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const ContentCard = styled.div`
    width: 19rem;
    height: 4rem;
    margin-top: 20px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.9);
    vertical-align: center;
    @media (min-width: 890px) {
        width: 27rem;
    }
`;
const ContentHeader = styled.h3`
    color: #69472d;
    margin-left: 1rem;
`;
const ContentSpan = styled.span`
    color: rgba(30, 30, 30, 0.9);
    font-weight: 400;
    font-size: 14px;
`;

interface Circle {
    circles_id: number;
    name: string;
    meeting_schedule: string;
    currently_reading: string;
    latest_comment: string;
    next_meetup: string;
    image: string;
}

function BookCirclesGroup() {
    const { id } = useParams();
    const circleId = id ? parseInt(id) : undefined;
    const [circle, setCircle] = useState<Circle>({
        circles_id: 0,
        name: '',
        meeting_schedule: '',
        currently_reading: '',
        latest_comment: '',
        next_meetup: '',
        image: ''
    });

    useEffect(() => {
        if (circleId !== undefined) {
            fetch(`http://localhost:8080/bookcircles/${circleId}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data, 'result');

                    setCircle(data);
                    console.log(circle, 'vald bok');
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Fragment>
            <CirclesHeader>{circle.name}</CirclesHeader>
            <ImgWrapper>
                <Img src={circle.image} alt="Book circle image" />
            </ImgWrapper>
            <ContentWrapper>
                <ContentCard>
                    <ContentHeader>
                        Currently Reading: <ContentSpan>{circle.currently_reading}</ContentSpan>
                    </ContentHeader>
                </ContentCard>
                <ContentCard>
                    <ContentHeader>
                        Discussion Forum: <ContentSpan>{circle.latest_comment}</ContentSpan>
                    </ContentHeader>
                </ContentCard>
                <ContentCard>
                    <ContentHeader>
                        Reading Schedule: <ContentSpan>{circle.meeting_schedule}</ContentSpan>
                    </ContentHeader>
                </ContentCard>
                <ContentCard>
                    <ContentHeader>
                        Next Meetup: <ContentSpan>{circle.next_meetup}</ContentSpan>
                    </ContentHeader>
                </ContentCard>
            </ContentWrapper>
        </Fragment>
    );
}

export default BookCirclesGroup;
