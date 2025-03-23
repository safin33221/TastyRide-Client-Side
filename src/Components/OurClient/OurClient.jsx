import SectionTitle from "../../Shared/SectionTitle";
import Marquee from "react-fast-marquee";
import ClientSlide from "./ClientSlide";
import logo1 from '../../assets/brand/bengalSpice.png'
import logo2 from '../../assets/brand/birinani.png'
import logo3 from '../../assets/brand//nanna.png'
import logo4 from '../../assets/brand/nawab-fest.png'
import logo5 from '../../assets/brand/testDhaka.jpg'
import logo6 from '../../assets/brand/bangokok.png'
import logo7 from '../../assets/brand/currykindom.webp'
import logo8 from '../../assets/brand/dominos.jpg'
import logo9 from '../../assets/brand/kacchivai.jpg'
import logo10 from '../../assets/brand/nanna.png'
import logo11 from '../../assets/brand/logo.jpg'
import logo12 from '../../assets/brand/Pizza-Hut.png'
import logo13 from '../../assets/brand/sultanDine.png'
import { useTranslation } from "react-i18next";


const OurClient = () => {
  const { t } = useTranslation();
  return (
    <div className="">
      {/* title */}
      <SectionTitle
        title={t('sectionTitle.title5')}
        desc={t('sectionTitle.desc5')}
      />
      {/* slider */}
      <div className="pt-6">
        <Marquee
          speed={80} 
          gradient={false}
          loop={0} 
        >
          <div className="flex space-x-24">
            <ClientSlide logo={logo1}/>
            <ClientSlide logo={logo2}/>
            <ClientSlide logo={logo3}/>
            <ClientSlide logo={logo4}/>
            <ClientSlide logo={logo5}/>
            <ClientSlide logo={logo6}/>
            <ClientSlide logo={logo7}/>
            <ClientSlide logo={logo8}/>
            <ClientSlide logo={logo9}/>
            <ClientSlide logo={logo10}/>
            <ClientSlide logo={logo11}/>
            <ClientSlide logo={logo12}/>
            <ClientSlide logo={logo13}/>
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default OurClient;
