import styled from 'styled-components';
import { Fragment } from 'react/jsx-runtime';
import BannerImg from '../assets/images/banner.jpg';

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
const AboutTitle = styled.h2`
    margin-bottom: 0;
`;
const List = styled.ul`
    list-style-type: '✔';
    font-size: 0.8rem;
`;

function Startview() {
    return (
        <Fragment>
            <div id="main-wrapper">
                <section id="introduction">
                    <h1>CozyReads</h1>
                    <p>
                        A place for book lovers to gather, discuss, and discover new favorites. Curl
                        up in your favorite chair, pour yourself a cup of tea, and let's dive into
                        magical stories together!
                    </p>
                    <ImgWrapper>
                        <Img src={BannerImg} alt="Logo" />
                    </ImgWrapper>
                </section>
                <section id="about">
                    <AboutTitle>About us</AboutTitle>
                    <h3>What is CozyReads?</h3>
                    <p>
                        CozyReads is a warm and welcoming online book club where we share our love
                        for books, discuss great reads, and find new literary adventures. Whether
                        you love classics, fantasy, feel-good novels, or thrillers, there's a place
                        for you here!
                    </p>
                    <p>Why join us?</p>
                    <List>
                        <li>Discover a new book every month</li>
                        <li>Engage in discussions with fellow book lovers</li>
                        <li>Get personalized book recommendations and reviews</li>
                        <li>Find your reading community</li>
                    </List>
                </section>
            </div>
        </Fragment>
    );
}

export default Startview;
