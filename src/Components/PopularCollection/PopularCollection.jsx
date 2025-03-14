

const popularItems = [
  {
    id: 1,
    name: "Indian Curry Meals",
    price: "Starts @3.99",
    image: "https://i.ibb.co.com/Z6hHDwVf/side-view-stuffed-tomatoes-with-cream-sauce-greens-pesto-sauce-dried-barberry-plate-141793-3791.jpg", 
  },
  {
    id: 2,
    name: "Grilled Chicken",
    price: "Starts @5.99",
    image: "https://i.ibb.co.com/WvxQsDV3/caesar-salad-with-chicken-grated-cheese-tomatoes-140725-2935.jpg",
  },
  {
    id: 3,
    name: "Pasta Delight",
    price: "Starts @4.50",
    image: "https://i.ibb.co.com/Zp05zRVy/chicken-caesar-salad-table-140725-4536.jpg",
  },
  {
    id: 4,
    name: "Veggie Special",
    price: "Starts @3.75",
    image: "https://i.ibb.co.com/Jw4kxZb9/fried-chicken-breast-with-sliced-fruits-vegetables-140725-3619.jpg",
  },
  {
    id: 5,
    name: "Veggie Special",
    price: "Starts @3.75",
    image: "https://i.ibb.co.com/My3Nz9cs/meat-rolls-with-herbs-sauce-glass-wine-140725-3451.jpg",
  },
];

const PopularCollection = () => {
  return (
    <div >
      <h2 className="text-4xl font-semibold text-center mb-3">Popular Collection</h2>
      <p className="text-center text-gray-500 ">
        Discover our top-rated dishes loved by customers.Discover our top-rated dishes loved by customers.
      </p>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {popularItems.map((item) => (
          <div
            key={item.id}
            className="relative group overflow-hidden  shadow-lg"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Text that appears below on hover */}
            <div className="absolute bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.5)]  text-center p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-red-600 text-xl font-bold">{item.name}</h3>
              <p className="text-slate-400 text-md">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCollection;
