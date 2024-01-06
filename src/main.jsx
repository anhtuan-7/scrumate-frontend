import { ThemeProvider } from '@material-tailwind/react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './app/App.jsx';
import { store } from './app/store.js';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
);
