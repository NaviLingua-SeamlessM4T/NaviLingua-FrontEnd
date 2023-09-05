import { useNavigate } from "react-router-dom";

function Logo() {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate("/")} className="flex-box cursor-pointer">
            <img className="w-10 h-10 mx-1 rounded-md" src="meta.png" alt="logo" />
            <div className="">
                <span className="text-white text-3xl font-bold font-Gugi text-firstLogo">
                Navi<span className="font-Gugi text-secondLogo">Lingua</span>
                </span>
                <span className="text-white text-3xl font-light font-Iceland text-thirdLogo">
                    {/* Meta */}
                </span>
            </div>
        </div>
    );
}

export default Logo;