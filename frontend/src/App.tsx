import "./App.css"
import LandingPage from "./components/LandingPage"
import AnnouncementBanner from "./components/AnnouncementBanner"
import LoginPage from "./components/LoginPage"
function App() {

  return (
    <div>
      <AnnouncementBanner></AnnouncementBanner>
      {/* <LandingPage></LandingPage> */}
      <LoginPage></LoginPage>

    </div>
  )
}

export default App
