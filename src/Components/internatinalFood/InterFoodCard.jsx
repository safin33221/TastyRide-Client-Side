

const InterFoodCard = ({title, desc, logo, conClass, textClass}) => {
  return (
    <div className={`flex gap-3 px-3 md:px-0 group flex-row-${conClass}`}>
        {/*text  */}
        <div className={`w-10/12 text-${textClass} p-3`}>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-sm font-semibold">{desc}</p>
        </div>
        {/* logo */}
        <div className="w-2/12 flex justify-center items-center">
          <img src={logo} alt="" className="group-hover:rotate-y-180 duration-700" />
        </div>
    </div>
  )
}

export default InterFoodCard