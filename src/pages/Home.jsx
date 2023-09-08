import Footer from "../components/Header & Footer/Footer";
import Header from "../components/Header & Footer/Header";
import About from "../components/Home/About";
import Contact from "../components/Home/Contact";
import Subscription from "../components/Subscription";
import Welcome from "../components/Welcome";

const Home = () => {
  return (
    <div className="flex-box flex-col">
      <Header />
      <Welcome />
      <About />
      <Subscription />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
