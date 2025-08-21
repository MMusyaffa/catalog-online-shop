import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './components/Theme';
import AppRoutes from './routes';
import './index.css'

// document.documentElement.setAttribute("data-theme", "cupcake");

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ThemeProvider>
			<AppRoutes />
		</ThemeProvider>
	</StrictMode>,
)
