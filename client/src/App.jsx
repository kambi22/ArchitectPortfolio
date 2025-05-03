import './App.css'
import CustomThemeProvider from './context/themContext'
import Routing from './Routing'

function App() {

  return (
    <CustomThemeProvider>
      <div className="bg-blue-500   text-3xl">
        <Routing />
      </div>
    </CustomThemeProvider>

  )
}

export default App
