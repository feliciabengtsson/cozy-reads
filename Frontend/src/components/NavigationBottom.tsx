import { Link } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import styled from 'styled-components';

const NavFooter = styled.nav`
    background-color: var(--color-primary);
    height: var(--nav-height);
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 10;
`;
const DivFooter = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    max-width: var(--content-max-width);
    margin: 0 auto;
`;

function NavigationBottom() {
    return (
        <Fragment>
            <NavFooter>
                <DivFooter>
                    <Link to="/bookcircles" aria-label="Book circles">
                        <span className="material-symbols-outlined">group</span>
                    </Link>
                    <Link to="/" aria-label="Home">
                        <span className="material-symbols-outlined">home</span>
                    </Link>
                    <Link to="/books" aria-label="Books">
                        <span className="material-symbols-outlined">library_books</span>
                    </Link>
                </DivFooter>
            </NavFooter>
        </Fragment>
    );
}

export default NavigationBottom;
