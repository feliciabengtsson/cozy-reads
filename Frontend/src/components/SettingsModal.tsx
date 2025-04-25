import { useEffect, useState, Fragment } from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
`;
const ModalWrapper = styled.div`
    display: block;
    background: #f5f1e7;
    width: 70%;
    max-width: 800px;
    height: 70%;
    padding: 1rem;
    border-radius: 1rem;
`;
const CloseIcon = styled.span`
    color: #3b3a30;
    cursor: pointer;
`;
const IconWrapper = styled.div`
    display: flex;
    justify-content: end;
`;
const ProfileImage = styled.img`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    @media (min-width: 890px) {
    }
`;
const Input = styled.input`
    background-color: rgba(255, 255, 255, 0.9);
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
const EditBtn = styled.input`
    background-color: #bfa58a;
    border: none;
    border-radius: 15px;
    padding: 0.5rem;
    margin: auto;
    cursor: pointer;
    @media (min-width: 890px) {
    }
`;

interface Modal {
    isOpenSettings: boolean;
    toggleSettings: () => void;
}
interface FormType {
    name: string;
    schedule: string;
    image: string;
}
interface UserType {
    users_id: number;
    name: string;
    address: string;
    image: string;
}

function SettingsModal(props: Modal) {
    const [formData, setFormData] = useState<FormType>({
        name: '',
        schedule: '',
        image: ''
    });
    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/profile')
            .then((response) => response.json())
            .then((result: UserType[]) => {
                setUsers(result.slice(0, 1));
                console.log(result.slice(0, 1), 'users');
            });
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevents default form submission behavior

        try {
            const response = await fetch('http://localhost:8080/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log(response, 'skickad till backend');
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
            {props.isOpenSettings && (
                <ModalContainer>
                    <ModalWrapper>
                        <IconWrapper>
                            <CloseIcon
                                onClick={props.toggleSettings}
                                className="material-symbols-outlined"
                            >
                                close
                            </CloseIcon>
                        </IconWrapper>
                        <h3>Account Settings</h3>
                        {users.map((user) => (
                            <form onSubmit={handleSubmit} method="put">
                                <div>
                                    <ProfileImage src={user.image} alt="Profile image" />
                                    <label htmlFor="name">Name: {user.name}</label>
                                    <Input
                                        name="name"
                                        onChange={handleInputChange}
                                        type="text"
                                        placeholder="Update your name"
                                        value={formData.name}
                                    />
                                </div>
                                <BtnWrapper>
                                    <EditBtn type="submit" value="Edit name" />
                                </BtnWrapper>
                            </form>
                        ))}
                    </ModalWrapper>
                </ModalContainer>
            )}
        </Fragment>
    );
}

export default SettingsModal;
