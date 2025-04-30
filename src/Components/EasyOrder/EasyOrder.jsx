
import { useTranslation } from "react-i18next";
import SectionTitle from "../../Shared/SectionTitle";
import img1 from "../../assets/order-step-icons/setp-img1.webp";
import img2 from "../../assets/order-step-icons/setp-img2.webp";
import img3 from "../../assets/order-step-icons/setp-img3.webp";

function EasyOrder() {
  const { t } = useTranslation();

  return (
    <div>
      <div
        className="hero  min-h-[500px] sm:min-h-[700px] bg-scroll sm:bg-fixed bg-cover bg-center bg-no-repeat"
        style={{
          backgroundSize: "cover",
          backgroundImage:
            "url(https://lovefoodhatewaste.ca/wp-content/uploads/2020/11/FoodBackgroundNomeat.jpg)",
        }}
      >
        <div className="hero-overlay bg-black/70"></div>
        <div className="hero-content text-neutral-content text-center px-4 sm:px-6">
          {/* Easy Order Steps Card */}
          <div className="max-w-7xl mx-auto">
            {/* Title */}
            <SectionTitle
              title={t("sectionTitle.title4")}
              desc={t("sectionTitle.desc4")}
            />
            {/* Card Items for Easy Order Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12  py-8 sm:py-12">
              {/* Card 1 */}
              <div className="flex flex-col items-center justify-between transition-transform duration-300 hover:scale-105">
                <div className="relative flex flex-col items-center justify-between">
                  <img
                    src={img1}
                    alt="Step 1: Select Your Meal"
                    className="w-32 sm:w-40 h-auto"
                    loading="lazy"
                  />
                  <span className="bg-red-600 rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center -mt-4 shadow-md font-bold text-white">
                    {t("number.1")}
                  </span>
                </div>
                <div className="mt-6 text-center">
                  <h1 className="text-xl sm:text-2xl font-bold mb-2">
                    {t("easyOrder.title1")}
                  </h1>
                  <p className="text-sm sm:text-base font-medium px-2">
                    {t("easyOrder.desc1")}
                  </p>
                </div>
              </div>
              {/* Card 2 */}
              <div className="flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105">
                <div className="relative flex flex-col items-center justify-center">
                  <img
                    src={img2}
                    alt="Step 2: Place Your Order"
                    className="w-32 sm:w-40 h-auto"
                    loading="lazy"
                  />
                  <span className="bg-red-600 rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center -mt-4 shadow-md font-bold text-white">
                    {t("number.2")}
                  </span>
                </div>
                <div className="mt-6 text-center">
                  <h1 className="text-xl sm:text-2xl font-bold mb-2">
                    {t("easyOrder.title2")}
                  </h1>
                  <p className="text-sm sm:text-base font-medium px-2">
                    {t("easyOrder.desc2")}
                  </p>
                </div>
              </div>
              {/* Card 3 */}
              <div className="flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105">
                <div className="relative flex flex-col items-center justify-center">
                  <img
                    src={img3}
                    alt="Step 3: Track Your Order"
                    className="w-32 sm:w-40 h-auto"
                    loading="lazy"
                  />
                  <span className="bg-red-600 rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center -mt-4 shadow-md font-bold text-white">
                    {t("number.3")}
                  </span>
                </div>
                <div className="mt-6 text-center">
                  <h1 className="text-xl sm:text-2xl font-bold mb-2">
                     Track Your Order
                  </h1>
                  <p className="text-sm sm:text-base font-medium px-2">
                    {t("easyOrder.desc3")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EasyOrder;