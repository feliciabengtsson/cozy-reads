/* https://www.shecodes.io/athena/53051-how-to-submit-a-form-and-redirect-to-another-page-in-react
 */

import styled from 'styled-components';
import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

const AddContainer = styled.div`
    width: fit-content;
    margin: auto;
`;
const BannerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-primary);
    width: 295px;
    height: 94px;
    @media (min-width: 890px) {
    }
`;
const AddInput = styled.input`
    background-color: var(--color-neutral-light);
    width: 14rem;
    border: none;
    border-radius: 15px;
    padding: 0.5rem;
    @media (min-width: 890px) {
    }
`;
const BtnWrapper = styled.div`
    display: flex;
    margin: 2rem;
    @media (min-width: 890px) {
    }
`;
const CreateBtn = styled.input`
    background-color: var(--color-primary);
    border: none;
    border-radius: 15px;
    padding: 0.5rem;
    margin: auto;
    cursor: pointer;
    @media (min-width: 890px) {
    }
`;

interface FormType {
    name: string;
    schedule: string;
    image: string;
}

function CreateCircle() {
    const [formData, setFormData] = useState<FormType>({
        name: '',
        schedule: '',
        image: 'https://images.unsplash.com/photo-1742867113796-510f600e777f?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    });

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevents default form submission behavior

        try {
            const response = await fetch('http://localhost:8080/bookcircles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log(response, 'sent to backend');
            navigate('/bookcircles'); // Redirect to new page
        } catch (error) {
            console.error('error', error);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData({
            ...formData, // Keep existing form data
            [name]: value // Update form data for the input field that changed
        });
    };
    return (
        <Fragment>
            <AddContainer>
                <h2>Create Book Circle</h2>
                <form onSubmit={handleSubmit} method="post">
                    <div>
                        <label htmlFor="image">Banner:</label>
                        <BannerWrapper>
                            {formData.image ? (
                                <BannerWrapper
                                    style={{
                                        background: `url(${formData.image})`,
                                        width: 'inherit',
                                        backgroundSize: 'contain'
                                    }}
                                >
                                    <AddInput
                                        name="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        type="text"
                                        placeholder="Enter image URL (optional)"
                                    ></AddInput>
                                </BannerWrapper>
                            ) : (
                                <AddInput
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder="Enter image URL (optional)"
                                ></AddInput>
                            )}
                        </BannerWrapper>
                    </div>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <AddInput
                            name="name"
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Name for the book circle"
                            value={formData.name}
                        />
                    </div>
                    <div>
                        <label htmlFor="schedule">Meeting schedule:</label>
                        <AddInput
                            name="schedule"
                            onChange={handleInputChange}
                            type="text"
                            placeholder="How often will will you meet"
                            value={formData.schedule}
                        />
                    </div>
                    <BtnWrapper>
                        <CreateBtn type="submit" value="Create Book Circle" />
                    </BtnWrapper>
                </form>
            </AddContainer>
        </Fragment>
    );
}

export default CreateCircle;
