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
        className="hero min-h-screen bg-scroll sm:bg-fixed object-cover object-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://lovefoodhatewaste.ca/wp-content/uploads/2020/11/FoodBackgroundNomeat.jpg)",
        }}
      >
        <div className="hero-overlay bg-black/65"></div>
        <div className="hero-content text-neutral-content text-center">
          {/* easy order steps card */}
          <div className="max-w-full">
            {/* title */}
            <SectionTitle
              title={t('sectionTitle.title4')}
              desc={
                t('sectionTitle.desc4')
              }
            />
            {/* card items for easy order steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 justify-between items-start gap-6 sm:gap-8 md:gap-12">
                {/* card-1 */}
                <div className="flex flex-col items-center justify-center">
                    <div className="relative w-xs flex flex-col items-center justify-center">
                        <img src={img1} alt="step1-img"/>
                        <span className="bg-red-600 rounded-full w-9 h-9 flex items-center justify-center -mt-4 shadow-xs font-bold">{t('number.1')}</span>
                    </div>
                    <div className="mt-8">
                    <h1 className="text-2xl font-bold mb-3">{t('easyOrder.title1')}</h1>
                    <p className="font-semibold">{t('easyOrder.desc1')}</p>
                    </div>
                </div>
                 {/* card-2 */}
                 <div className="flex flex-col items-center justify-center">
                    <div className="relative w-xs flex flex-col items-center justify-center">
                        <img src={img2} alt="step1-img"/>
                        <span className="bg-red-600 rounded-full w-9 h-9 flex items-center justify-center -mt-4 shadow-xs font-bold">{t('number.2')}</span>
                    </div>
                    <div className="mt-8">
                    <h1 className="text-2xl font-bold mb-3">{t('easyOrder.title2')}</h1>
                    <p className="font-semibold">{t('easyOrder.desc2')}</p>
                    </div>
                </div>
                 {/* card-3 */}
                 <div className="flex flex-col items-center justify-center">
                    <div className="relative w-xs flex flex-col items-center justify-center">
                        <img src={img3} alt="step1-img"/>
                        <span className="bg-red-600 rounded-full w-9 h-9 flex items-center justify-center -mt-4 shadow-xs font-bold">{t('number.3')}</span>
                    </div>
                    <div className="mt-8">
                    <h1 className="text-2xl font-bold mb-3">{t('easyOrder.title3')}</h1>
                    <p className="font-semibold">{t('easyOrder.desc3')}</p>
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
