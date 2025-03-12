import EasyOrder from "../../Components/EasyOrder/EasyOrder";
import InterNationalFood from "../../Components/internatinalFood/InterNationalFood";
import OurClient from "../../Components/OurClient/OurClient";
import Sliders from "../../Components/Sliders";
import SectionDivider from "../../Shared/SectionDivider";

const Home = () => {
  return (
    <div>
      <Sliders></Sliders>
      <div className="container mx-auto">
        <SectionDivider></SectionDivider>
        <InterNationalFood></InterNationalFood>
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
