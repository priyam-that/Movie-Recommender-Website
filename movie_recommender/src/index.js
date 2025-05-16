import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Router, RouterProvider } from 'react-router-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={store}>      {/*makes the Redux store available to the entire app*/}
    
    <BrowserRouter>
      <App />
    
    </BrowserRouter>
    </Provider>
   </React.StrictMode>
);


