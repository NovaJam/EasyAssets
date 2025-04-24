import FeaturesSection from "../components/LandingPage/FeaturesSection"
import Footer from "../components/LandingPage/Footer"
import { DarkGridHero } from "../components/LandingPage/Hero"
import HowItWorks from "../components/LandingPage/HowItWorks"
import Navbar from "../components/LandingPage/Navbar"


const LandingPage = () => {
  return (
    <>
    <Navbar/>
    <DarkGridHero/>
    <FeaturesSection/>
    <HowItWorks/>
    <Footer/>
    </>
  )
}

export default LandingPage