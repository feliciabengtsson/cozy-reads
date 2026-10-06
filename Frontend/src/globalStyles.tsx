import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	:root {
		--color-neutral-light: rgba(255, 255, 255, 0.904);
		--color-neutral-dark: rgba(0, 0, 0, 0.897);

		--color-background: #F5F1E7;
		--color-secondary: #8B5E3C;
		--color-primary: #BFA58A;
		--color-accent: #3B3A30;

		--nav-height: 3.5rem;
		--content-max-width: 720px;
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
		font-family: 'Playfair Display', Georgia, serif;
		font-style: normal;
		overflow-x: hidden;
	}
	img {
		max-width: 100%;
		display: block;
	}
	button,
	input,
	select {
		font: inherit;
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
		color: var(--color-secondary);
		font-size: 16px;
		font-weight: 600;
	}
	p {
		color: var(--color-neutral-dark);
		font-size: 16px;
		font-weight: 400;
		line-height: 1.5;
	}
	nav .material-symbols-outlined,
	a .material-symbols-outlined {
		color: var(--color-neutral-light);
		transition: color 0.2s;
		&:hover {
			color: var(--color-accent);
		}
	}
	a:focus-visible,
	button:focus-visible,
	input:focus-visible,
	select:focus-visible {
		outline: 2px solid var(--color-secondary);
		outline-offset: 2px;
	}
	label {
		display: block;
		color: var(--color-secondary);
		font-size: 16px;
		font-weight: 600;
		margin: 16px 0;
	}
`;

export default GlobalStyle;
