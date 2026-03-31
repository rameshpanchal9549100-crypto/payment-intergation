import React from 'react'
import data from './components/data'
import Products from './components/products'
import {BrowserRouter as Router,Routes,Route} from 
"react-router-dom";
import PaymentSuccess from './components/paymentSuccess';


const App = () => {
  return (
   <Router>
    <Routes>
      <Route path='/' element={ <Products data = {data}/>}/>
      <Route path='/paymentSuccess' element={<PaymentSuccess/>} />
    </Routes>
   </Router>
  )
}

export default App
  