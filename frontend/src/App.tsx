import { AuthProvider } from "./contexts/auth"
import Routes from "./routes"
import GlobalStyle from "./styles/global"

export const lstoragePrefix = '@TheMind';

function App() {
	return (
		<AuthProvider>
			<Routes />
			<GlobalStyle />
		</AuthProvider>
	)
}

export default App
