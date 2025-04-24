import styled from 'styled-components';
import { useEffect, useState, Fragment } from 'react';

const AddContainer = styled.div`
    width: fit-content;
    margin: auto;
`;
const BannerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #bfa58a;
    width: 295px;
    height: 94px;
    @media (min-width: 890px) {
    }
`;
const AddImage = styled.span`
    background-color: #8b5e3c;
    border: none;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    @media (min-width: 890px) {
    }
`;
const AddInput = styled.input`
    background-color: rgba(255, 255, 255, 0.9);
    width: 14rem;
    border: none;
    border-radius: 15px;
    padding: 0.5rem;
    @media (min-width: 890px) {
    }
`;

function CreateCircle() {

    return (
        <Fragment>
            <AddContainer>
                <h2>Create Book Circle</h2>
                <div>
                    <h3>Banner:</h3>
                    <BannerWrapper>
                        <AddImage></AddImage>
                    </BannerWrapper>
                </div>
                <div>
                    <h3>Name:</h3>
                    <AddInput type="text" placeholder='Name for the book circle'/>
                </div>
                <div>
                    <h3>Meeting schedule:</h3>
                    <AddInput type="text" placeholder='How often will will you meet'/>
                </div>
            </AddContainer>
        </Fragment>
    );
}

export default CreateCircle;
