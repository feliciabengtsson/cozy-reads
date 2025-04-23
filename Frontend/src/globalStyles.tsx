import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	:root {
	--color-neutral-light: rgba(255, 255, 255, 0.904);
	--color-neutral-dark: rgba(0, 0, 0, 0.897);
	
	--color-background: #F5F1E7;
	--color-secondary: #8B5E3C;
	--color-primary: #BFA58A;
	--color-accent: #3B3A30;
	}
	* {
	box-sizing: border-box;
	}  
	body {
		margin: 0;
		background: var(--color-background);
		color: var(--color-neutral-dark);
		min-height: 100vh;
		min-width: 320px;
		font-family: Playfair Display;
		font-style: normal;
	}
	h1 {
		color: var(--color-secondary);
		font-size: 36px;
		font-weight: 400;
		margin: 10px auto;
	}
	h2 {
		color: var(--color-secondary);
		font-size: 24px;
		font-weight: 400;
	}
	h3 {
		color: var(--color-neutral-dark);
		font-size: 16px;
		font-weight: 600;
	}
	p {
		color: var(--color-neutral-dark);
		font-size: 16px;
		font-weight: 400;
	}
	span {
		color: var(--color-neutral-light);
		&:hover {
			color: var(--color-accent) !important;
		} 
	}
`;

export default GlobalStyle;
