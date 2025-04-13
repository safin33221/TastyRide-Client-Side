import { ImSpinner2 } from "react-icons/im";


const Loading = () => {
    return (
        <div>
            <ImSpinner2 className="min-h-screen flex items-center justify-center m-auto text-3xl md:text-5xl animate-spin" />
        </div>
    );
};

export default Loading;