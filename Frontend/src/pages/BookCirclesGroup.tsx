/* https://dev.to/nishanthan-k/typescript-event-types-and-event-handling-in-react-a-complete-guide-for-beginners-3cn0
 */
/* https://medium.com/@alexanie_/https-ocxigin-hashnode-dev-uselocation-hook-in-react-router-758a0a711308
 */
/* https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page
 */
import styled from 'styled-components';
import { useEffect, useState, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
    position: relative;
    width: 19rem;
    height: 4rem;
    margin-top: 20px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.6);
    vertical-align: center;
    @media (min-width: 890px) {
        width: 27rem;
    }
`;
const BookImage = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    z-index: -1;
    border-radius: 6px;
    @media (min-width: 890px) {
    }
`;
const ContentInner = styled.div`
    position: relative;
    z-index: 0;
    height: 100%;
    display: flex;
    align-items: center;
`;
const ContentHeader = styled.h3`
    color: var(--color-secondary);
    margin-left: 1rem;
`;
const ContentSpan = styled.span`
    color: var(--color-neutral-dark);
    font-weight: 400;
    font-size: 14px;
`;
const DeleteCircleBtn = styled.button``;

interface Circle {
    circles_id: number;
    name: string;
    meeting_schedule: string;
    currently_reading: string;
    latest_comment: string;
    next_meetup: string;
    image: string;
    cover_url: string;
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
        image: '',
        cover_url: ''
    });

    const navigate = useNavigate();
    console.log(navigate, 'navigate');

    useEffect(() => {
        if (circleId !== undefined) {
            fetch(`http://localhost:8080/bookcircles/${circleId}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data, 'result');

                    setCircle(data);
                    console.log(circle, 'chosen book');
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>, circle: Circle) => {
        event.preventDefault(); // Prevents default form submission behavior
        console.log(circle.circles_id, 'delete');
        try {
            const response = await fetch(`http://localhost:8080/bookcircles/${circle.circles_id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                navigate('/');
            } else {
                console.error('failed delete');
            }
        } catch (error) {
            console.error('error', error);
        }
    };

    return (
        <Fragment>
            <CirclesHeader>{circle.name}</CirclesHeader>
            <ImgWrapper>
                <Img src={circle.image} alt="Book circle image" />
            </ImgWrapper>
            <ContentWrapper>
                <ContentCard>
                    <BookImage
                        style={{ backgroundImage: `url(${circle.cover_url})`, opacity: '60%' }}
                    />
                    <ContentInner>
                        <ContentHeader>
                            Currently Reading: <ContentSpan>{circle.currently_reading}</ContentSpan>
                        </ContentHeader>
                    </ContentInner>
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
                <DeleteCircleBtn onClick={(event) => handleDelete(event, circle)}>
                    Delete Circle
                </DeleteCircleBtn>
            </ContentWrapper>
        </Fragment>
    );
}

export default BookCirclesGroup;
