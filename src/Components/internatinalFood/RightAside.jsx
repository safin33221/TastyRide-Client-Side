import InterFoodCard from "./InterFoodCard";
import logo4 from "../../assets/images/icon-4.webp";
import logo5 from "../../assets/images/icon-5.webp";
import logo6 from "../../assets/images/icon-6.webp";

const RightAside = () => {
  return (
    <div className="flex flex-col gap-6">
      <InterFoodCard
        title={"Chinese Cuisines"}
        desc={`Chinese food features a variety of stir-fried dishes, dumplings, and noodle-based recipes.
               Example: Sweet and Sour Chicken – A tangy, crispy chicken dish tossed in a flavorful sauce.`}
        logo={logo4}
        conClass={'reverse'}
        textClass={'left'}
      ></InterFoodCard>

      <InterFoodCard
        title={"Arabian Cuisines"}
        desc={`Arabian cuisine is rich in grilled meats, rice dishes, and flavorful dips.
               Example: Mandi – A traditional Yemeni rice dish with slow-cooked meat and aromatic spices.`}
        logo={logo5}
        conClass={'reverse'}
        textClass={'left'}
      ></InterFoodCard>

      <InterFoodCard
        title={"Bangladeshi Cuisines"}
        desc={`
            Traditional Bangladeshi cuisine consists of rice, lentils, fish, and meat dishes, often rich in spices.
            Example: Beef Tehari – Fragrant spiced rice cooked with marinated beef, yogurt, and aromatic spices.`}
        logo={logo6}
        conClass={'reverse'}
        textClass={'left'}
      ></InterFoodCard>
    </div>
  );
};

export default RightAside;
