import styled from 'styled-components';

export const ButtonContainer = styled.button`
	color: #ffffff;
	text-transform: uppercase;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	border: none;
	border-radius: 2px;
	padding: 0.6rem 1rem;
	transition: all .15s ease-out;

	&:hover {
		opacity: 0.8;
	}

	&.accent {
		background-color: var(--accent-color);
	}

	&.pink {
		background-color: var(--accent-secondary-color);
	}

	&.right {
		display: block;
		margin: 0 0 0 auto;
	}

	&.left {
		display: block;
		margin: 0 auto 0 0;
	}

	&.center {
		display: block;
		margin: 0 auto;
	}

	&.icon {
		padding: 0;
		background-color: #fff;
		border-radius: 50%;
		width: 26px;
		height: 26px;
		box-shadow: 0 2px 2px 0 #858585;
		color: var(--accent-color);
		font-size: .625rem;

		&:active, &.active {
			box-shadow: none;
			background-color: var(--accent-secondary-color);
		}
	}

	:disabled {
		cursor: not-allowed;
		opacity: 0.8;
	}
`;
