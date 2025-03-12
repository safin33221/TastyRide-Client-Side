import InterFoodCard from "./InterFoodCard";
import logo1 from "../../assets/images/icon-1.webp";
import logo2 from "../../assets/images/icon-2.webp";
import logo3 from "../../assets/images/icon-3.webp";

const LeftAside = () => {
  return (
    <div className="flex flex-col gap-6">
      <InterFoodCard
        title={"Bangladeshi Cuisines"}
        desc={`Traditional Bangladeshi cuisine consists of rice, lentils, fish, and meat dishes, often rich in spices.
               Example: Shutki Bhuna – A flavorful dry fish curry cooked with onions, garlic, and mustard oil.`}
        logo={logo1}
        conClass={''}
        textClass={'right'}
      ></InterFoodCard>

      <InterFoodCard
        title={"Thai Cuisines"}
        desc={`Thai cuisine is known for its balance of sweet, sour, spicy, and savory flavors.
               Example: Green Curry – A spicy coconut milk-based curry with chicken, eggplant, and Thai basil.`}
        logo={logo2}
        conClass={''}
        textClass={'right'}
      ></InterFoodCard>

      <InterFoodCard
        title={"Indian Cuisines"}
        desc={`Indian dishes are often packed with aromatic spices, gravies, and a variety of breads and rice.
               Example: Paneer Tikka – Grilled cottage cheese marinated with yogurt and Indian spices.`}
        logo={logo3}
        conClass={''}
        textClass={'right'}
      ></InterFoodCard>
    </div>
  );
};

export default LeftAside;
