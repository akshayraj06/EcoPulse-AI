import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Stats from "../../components/Stats";
import Features from "../../components/Features";
import HowItWorks from "../../components/HowItWorks";
import Testimonials from "../../components/Testimonials";
import FAQ from "../../components/FAQ";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
function Home(){
    return (
        <>
            <Navbar />
            <Hero />
            <Stats />
            <Features />
            <HowItWorks />
            <Testimonials />
            <FAQ />
            <Contact />
            <Footer />
        </>
    );
}
export default Home;
