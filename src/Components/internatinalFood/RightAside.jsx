import InterFoodCard from "./InterFoodCard";
import logo4 from "../../assets/images/icon-4.webp";
import logo5 from "../../assets/images/icon-5.webp";
import logo6 from "../../assets/images/icon-6.webp";
import { useTranslation } from "react-i18next";

const RightAside = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-6">
      <InterFoodCard
        title={t('rightSide.title1')}
        desc={t('rightSide.desc1')}
        logo={logo4}
        conClass={'reverse'}
        textClass={'left'}
      ></InterFoodCard>

      <InterFoodCard
        title={t('rightSide.title2')}
        desc={t('rightSide.desc2')}
        logo={logo5}
        conClass={'reverse'}
        textClass={'left'}
      ></InterFoodCard>

      <InterFoodCard
        title={t('rightSide.title3')}
        desc={t('rightSide.desc2')}
        logo={logo6}
        conClass={'reverse'}
        textClass={'left'}
      ></InterFoodCard>
    </div>
  );
};

export default RightAside;
