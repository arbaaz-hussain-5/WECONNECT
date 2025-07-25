
import './Home.css'
import Lander from "../../components/Landing_page/Lander";
import NavBar from "../../components/navigation_bar/NavBar";



function Home() {
  return(
    <div className="home">
      <NavBar/>
      <Lander/>
    </div>);
}

export default Home;
