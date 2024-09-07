import Feature from "./Feature";
import Testimonial from "./Testimonials";
import Search from "./Search";
import Suggestion from "./Suggestion";
import "../../components/CustomCss/Home.scss";
import "../../components/CustomCss/root.scss";

function Home() {
  return (
    <>
      <Search />
      <Feature />
      <Suggestion />
      <Testimonial />
    </>
  );
}

export default Home;
