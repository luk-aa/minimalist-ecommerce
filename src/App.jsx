import React from 'react'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './Pages/home/Index'
import About from './Pages/About'
import Store, { loader as StoreLoader } from './Pages/store/Index'
import ProductDetail, { loader as productDetailLoader } from './Pages/store/ProductDetail'
import NotFound from './Pages/NotFound'
import Error from './components/Error'

import './App.css'
import ContactUs from './Pages/contact/Index'

const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route
        index
        element={<Home />}
      />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<ContactUs />} />
      <Route
        path='categories'
        element={<Store />}
        loader={StoreLoader}
        errorElement={<Error />}
      />
      <Route
        path='categories/:id'
        element={<ProductDetail />}
        loader={productDetailLoader}
        errorElement={<Error />}
      />
      <Route path='*' element={<NotFound />} />
    </Route>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App