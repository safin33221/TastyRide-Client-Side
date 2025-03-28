import CategoryFoods from "../../Components/CategoryFoods/CategoryFoods";
import EasyOrder from "../../Components/EasyOrder/EasyOrder";
import InterNationalFood from "../../Components/internatinalFood/InterNationalFood";
import OurClient from "../../Components/OurClient/OurClient";
import PopularCollection from "../../Components/PopularCollection/PopularCollection";
import Sliders from "../../Components/Sliders";
import CountDown from "../../EidFeatures/CountDown";
import SectionDivider from "../../Shared/SectionDivider";

const Home = () => {
  return (
    <div>

      <Sliders></Sliders>
      <div className="container mx-auto">
        <SectionDivider></SectionDivider>
        <InterNationalFood></InterNationalFood>
        <SectionDivider></SectionDivider>
        <section>
          <CategoryFoods/>
        </section>
        <SectionDivider></SectionDivider>
        <PopularCollection></PopularCollection>
        <SectionDivider></SectionDivider>
        <EasyOrder />
        <SectionDivider></SectionDivider>
        <OurClient></OurClient>
        <SectionDivider></SectionDivider>
      </div>
    </div>
  );
};

export default Home;
