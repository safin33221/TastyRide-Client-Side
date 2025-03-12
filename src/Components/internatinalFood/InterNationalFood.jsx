import LeftAside from "./LeftAside"
import imageLogo from '../../assets/images/middle-img.webp'
import RightAside from "./RightAside"

const InterNationalFood = () => {
  return (
    <div className="container mx-auto">
       {/* text */}
       <h1 className="text-center text-4xl font-semibold mb-3">International Cuisines</h1>
       <p className="text-center text-xl font-medium mb-12">Incredibly Tasty International Dish</p>
       {/* dishes */}
       <div className="flex flex-col lg:flex-row gap-6">
        {/* left-div */}
        <div className="lg:w-4/12 py-6">
          <LeftAside></LeftAside>  
        </div>
        {/* middle-div */}
        <div className="lg:w-4/12 flex justify-center items-center">
        <img src={imageLogo} alt="" className="" />
        </div>
        {/* right-div */}
        <div className="lg:w-4/12 py-6">
         <RightAside></RightAside>
        </div>
       </div>
    </div>
  )
}

export default InterNationalFood