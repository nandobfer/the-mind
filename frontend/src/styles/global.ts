import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	:root {
		--background-color: #111;
		--primary-color: #000;
		--secondary-color: #fff;
		--accent-color: #8a09a3;
		--accent-secondary-color: #c86314;
		--error-color: #ee2d68;

		--f14-px: 87.50%;
		--f15-px: 93.75%;

		--base-container-width: 1120px;
	}
	
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	// font-size: 16px (Desktop)
	html {
		@media (max-width: 1080px) {
			font-size: var(--f15-px);
		}

		@media (max-width: 720px) {
			font-size: var(--f14-px);
		}
	}

	body {
		background-color: var(--background-color);
		-webkit-font-smoothing: antialiased;
		min-height: 100vh;

		#root {
			display: flex;
			flex-direction: column;
			height: 100vh;
		}
	}

    game-card {
            box-shadow: 0 0 2px 2px #333;
            height: calc(87px * var(--card-scale));
            width: calc(56px * var(--card-scale));
            padding: 0;
            transition: all .3s;
        }
    .game-card.bad-card {
        border-color: var(--bs-danger);
    }

    .game-card.my-card {
        cursor: pointer;
    }

    .game-card.my-card:hover,
    .game-card.my-card.willing {
        transform: scale(1.2);
    }

    .game-card.my-card:hover {
        border-color: #c86314;
    }

    .game-card.my-card.willing {
        border-color: #8a09a3;
    }

    .game-card .card-number {
        color: white;
        font-size: calc(28px * var(--card-scale));
        margin: 0;
    }

    .player-container.willing {
        -webkit-animation: PLAYER-WILLING-TO-PLAY 1s infinite;
        -moz-animation: PLAYER-WILLING-TO-PLAY 1s infinite;
        -o-animation: PLAYER-WILLING-TO-PLAY 1s infinite;
        animation: PLAYER-WILLING-TO-PLAY 1s infinite;
    }

    @keyframes PLAYER-WILLING-TO-PLAY {

        0%,
        49% {
            background-color: #8a09a3;
            border: 3px solid #c86314;
        }

        50%,
        100% {
            background-color: #c86314;
            border: 3px solid #8a09a3;
        }
    }
`

export default GlobalStyle;