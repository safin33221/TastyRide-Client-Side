import InterFoodCard from "./InterFoodCard";
import logo1 from "../../assets/images/icon-1.webp";
import logo2 from "../../assets/images/icon-2.webp";
import logo3 from "../../assets/images/icon-3.webp";
import { useTranslation } from "react-i18next";

const LeftAside = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-6">
      <InterFoodCard
        title={t('leftSide.title1')}
        desc={t('leftSide.desc1')}
        logo={logo1}
        conClass={''}
        textClass={'right'}
      ></InterFoodCard>

      <InterFoodCard
        title={t('leftSide.title2')}
        desc={t('leftSide.desc2')}
        logo={logo2}
        conClass={''}
        textClass={'right'}
      ></InterFoodCard>

      <InterFoodCard
        title={t('leftSide.title3')}
        desc={t('leftSide.desc3')}
        logo={logo3}
        conClass={''}
        textClass={'right'}
      ></InterFoodCard>
    </div>
  );
};

export default LeftAside;
