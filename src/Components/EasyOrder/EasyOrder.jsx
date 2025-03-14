import SectionTitle from "../../Shared/SectionTitle";
import img1 from "../../assets/order-step-icons/setp-img1.webp";
import img2 from "../../assets/order-step-icons/setp-img2.webp";
import img3 from "../../assets/order-step-icons/setp-img3.webp";

function EasyOrder() {
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
              title={"Easy Order"}
              desc={
                "You can place your order in three steps."
              }
            />
            {/* card items for easy order steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 justify-between items-start gap-6 sm:gap-8 md:gap-12">
                {/* card-1 */}
                <div className="flex flex-col items-center justify-center">
                    <div className="relative w-xs flex flex-col items-center justify-center">
                        <img src={img1} alt="step1-img"/>
                        <span className="bg-red-600 rounded-full w-9 h-9 flex items-center justify-center -mt-4 shadow-xs font-bold">1</span>
                    </div>
                    <div className="mt-8">
                    <h1 className="text-2xl font-bold mb-3">Explore Restaurants</h1>
                    <p className="font-semibold">Browse through a variety of top-rated restaurants near you. Use filters to find cuisine, 
                        price range, and customer ratings to make the best choice.</p>
                    </div>
                </div>
                 {/* card-2 */}
                 <div className="flex flex-col items-center justify-center">
                    <div className="relative w-xs flex flex-col items-center justify-center">
                        <img src={img2} alt="step1-img"/>
                        <span className="bg-red-600 rounded-full w-9 h-9 flex items-center justify-center -mt-4 shadow-xs font-bold">2</span>
                    </div>
                    <div className="mt-8">
                    <h1 className="text-2xl font-bold mb-3">Choose a Tasty Dish</h1>
                    <p className="font-semibold">Craving something special? Select from a wide range of mouth-watering dishes. 
                        Add your favorite items to the cart and customize them as needed. </p>
                    </div>
                </div>
                 {/* card-3 */}
                 <div className="flex flex-col items-center justify-center">
                    <div className="relative w-xs flex flex-col items-center justify-center">
                        <img src={img3} alt="step1-img"/>
                        <span className="bg-red-600 rounded-full w-9 h-9 flex items-center justify-center -mt-4 shadow-xs font-bold">3</span>
                    </div>
                    <div className="mt-8">
                    <h1 className="text-2xl font-bold mb-3">Explore Restaurants</h1>
                    <p className="font-semibold">Once you place your order, track its real-time status—from preparation to delivery. 
                        Get notified when your food is on the way so you’re ready to enjoy it hot and fresh!</p>
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
