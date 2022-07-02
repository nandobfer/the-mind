import styled from 'styled-components';

export const Container = styled.div`
	margin: 0 auto 2rem;
	display: flex;
	justify-content: space-between;

	@media (max-width: 425px) {
		flex-direction: column-reverse;
	}
`;