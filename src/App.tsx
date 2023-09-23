import {Navigate, Route, Routes} from "react-router-dom"
import LoginScreen from './screens/auth/login'
import HomeScreen from './screens/home'
import Dashboard from "./components/dashboard"
import Activity from "./screens/activity"
import Reports from "./screens/reports"
import Customers from "./screens/customers"
import Support from "./screens/support"

function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<LoginScreen />} />
      {/* <Route path='/home' element={<HomeScreen />} /> */}
      <Route path='/dashboard' element={<Dashboard />} >
        <Route
          path="/dashboard"
          element={<Navigate to="/dashboard/home" replace />}
        />
        <Route path="/dashboard/home" element={<HomeScreen />} />
        <Route path="/dashboard/activity" element={<Activity />} />
        <Route path="/dashboard/reports" element={<Reports />} />
        <Route path="/dashboard/customers" element={<Customers />} />
        <Route path="/dashboard/supports" element={<Support />} />
      </Route>
     </Routes>
    </>
  )
}

export default App
