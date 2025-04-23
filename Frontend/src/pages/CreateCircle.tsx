import styled from 'styled-components';
import { useEffect, useState, Fragment } from 'react';

const AddContainer = styled.div`
    @media (min-width: 890px) {

    }
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

function CreateCircle() {
    const [circles, setCircles] = useState<CircleType['circle'][]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/bookcircles')
            .then((response) => response.json())
            .then((data) => {
                console.log(data, 'result');

                setCircles(data.slice(0, 3));
                console.log(circles, 'circles');
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Fragment>
            <AddContainer>

            </AddContainer>
        </Fragment>
    );
}

export default CreateCircle;
