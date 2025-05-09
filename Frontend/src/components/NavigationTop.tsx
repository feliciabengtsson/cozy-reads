import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from '/logonew.webp';
import { Fragment } from 'react/jsx-runtime';
import InfoModal from './InfoModal';
import useModal from '../hooks/useModal';
import SettingsModal from './SettingsModal';

const NavTop = styled.nav`
    background-color: var(--color-primary);
    height: 3.5rem;
`;
const NavDivTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3.5rem;
`;
const LogoDiv = styled.div`
    margin: 0 0.5rem;
`;
const Logo = styled.img`
    width: 3rem;
`;
const IconList = styled.ul`
    display: flex;
    list-style: none;
`;
const Li = styled.li`
    margin: 0 0.8rem;
`;
const ModalIcon = styled.span`
    cursor: pointer;
`;

function NavigationTop() {
    const { isOpen, toggle } = useModal();
    const { isOpenSettings, toggleSettings } = useModal();

    return (
        <Fragment>
            <NavTop>
                <NavDivTop>
                    <LogoDiv>
                        <Link to="/">
                            <Logo src={LogoImg} alt="logo" />
                        </Link>
                    </LogoDiv>
                    <IconList>
                        <Li>
                            <Link to="profile">
                                <span className="material-symbols-outlined">account_circle</span>
                            </Link>
                        </Li>
                        <Li>
                            <ModalIcon onClick={toggle} className="material-symbols-outlined">
                                help
                            </ModalIcon>
                        </Li>
                        <Li>
                            <ModalIcon
                                onClick={toggleSettings}
                                className="material-symbols-outlined"
                            >
                                settings
                            </ModalIcon>
                        </Li>
                    </IconList>
                </NavDivTop>
            </NavTop>

            <InfoModal isOpen={isOpen} toggle={toggle} />
            <SettingsModal isOpenSettings={isOpenSettings} toggleSettings={toggleSettings} />
        </Fragment>
    );
}

export default NavigationTop;
