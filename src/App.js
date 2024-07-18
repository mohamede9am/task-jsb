import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import CartContextProvider from './Context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const routes = createBrowserRouter([{
    path: "", element: <Layout />, 
    children: [
      { index: true, element: <Home />, } 


    ]
  },


  ])
  return (

      <CartContextProvider>
        <RouterProvider router={routes}></RouterProvider>
        <ToastContainer />

      </CartContextProvider>
  );
}

export default App;
