import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {Provider} from 'react-redux';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import store from './store/reducer/root-reducer';

ReactDOM.render(
  <React.StrictMode>
		<Provider store = {store}>
			<DndProvider backend={HTML5Backend}>
				<App />
			</DndProvider>
		</Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// reportWebVitals();
