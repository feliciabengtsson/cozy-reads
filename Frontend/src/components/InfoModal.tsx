import { Fragment } from 'react/jsx-runtime';
import styled from 'styled-components';

const ModalContainer = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    z-index: 100;
`;
const ModalWrapper = styled.div`
    display: block;
    background: var(--color-background);
    width: 100%;
    max-width: 600px;
    max-height: 85vh;
    overflow-y: auto;
    padding: 1rem 1.5rem 1.5rem;
    border-radius: 1rem;
`;
const CloseIcon = styled.span`
    color: var(--color-accent);
    cursor: pointer;
`;
const IconWrapper = styled.div`
    display: flex;
    justify-content: end;
`;

interface Modal {
    isOpen: boolean;
    toggle: () => void;
}

function InfoModal(props: Modal) {
    return (
        <Fragment>
            {props.isOpen && (
                <ModalContainer>
                    <ModalWrapper>
                        <IconWrapper>
                            <CloseIcon onClick={props.toggle} className="material-symbols-outlined">
                                close
                            </CloseIcon>
                        </IconWrapper>
                        <h3>How It Works:</h3>
                        <p>📅 Monthly Pick - Each month, we select a new book to read together.</p>
                        <p>
                            💬 Weekly Check-Ins - Discuss key moments and themes in our private
                            group chats.
                        </p>
                        <p>
                            🎙️ Live Discussions - Join our virtual meet-ups for deeper conversations
                            and fun book-related activities.
                        </p>
                        <p>
                            ✨ Cozy Extras - Get reading guides, discussion prompts, and exclusive
                            author Q&As!
                        </p>
                        <p>
                            👉 Want to start your own book circle? Create a group with friends or
                            join an existing one - the more, the merrier!
                        </p>
                    </ModalWrapper>
                </ModalContainer>
            )}
        </Fragment>
    );
}

export default InfoModal;
