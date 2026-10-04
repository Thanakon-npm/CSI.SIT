import Counter from './components/Counter.jsx'


import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


function App() {
 

  return (
    <>
     <h1>68045661 ธนากร คำวิเศษ</h1>
     <Counter stepSize={5} />
     <Counter name='M' initCount={95} limit={100} />
    </>
  )
}

export default App
