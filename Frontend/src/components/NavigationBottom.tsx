import { Link } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import styled from 'styled-components';

const NavFooter = styled.nav`
    background-color: var(--color-primary);
    height: 3.5rem;
    margin-top: auto;
    position: fixed;
    bottom: 0;
    width: 100%;
`;
const DivFooter = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 3.5rem;
`;

function NavigationBottom() {
    return (
        <Fragment>
            <NavFooter>
                <DivFooter>
                    <Link to="bookcircles">
                        <span className="material-symbols-outlined">group</span>
                    </Link>
                    <Link to="/">
                        <span className="material-symbols-outlined">home</span>
                    </Link>
                    <Link to="books">
                        <span className="material-symbols-outlined">library_books</span>
                    </Link>
                </DivFooter>
            </NavFooter>
        </Fragment>
    );
}

export default NavigationBottom;
