import LeftAside from "./LeftAside"
import imageLogo from '../../assets/images/middle-img-reload.png'
import RightAside from "./RightAside"
import SectionTitle from "../../Shared/SectionTitle"

const InterNationalFood = () => {
  return (
    <div className="">
       {/* text */}
       <SectionTitle
         title={'International Cuisines'}
         desc={'Incredibly Tasty International Dish'}
       />
       {/* dishes */}
       <div className="flex flex-col lg:flex-row gap-6">
        {/* left-div */}
        <div className="lg:w-4/12 pt-6">
          <LeftAside></LeftAside>  
        </div>
        {/* middle-div */}
        <div className="lg:w-4/12 flex justify-center items-center">
        <img src={imageLogo} alt="" className="" />
        </div>
        {/* right-div */}
        <div className="lg:w-4/12 pt-6">
         <RightAside></RightAside>
        </div>
       </div>
    </div>
  )
}

export default InterNationalFood