// import { Contact, HelpCircle, Home, Info, Newspaper } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="flex md:flex-row flex-col h-fit items-center">
      <div
        onClick={() => navigate("/")}
        className={cn(
          "menu-item",
          location.pathname === "/"
            ? "bg-white text-yellow-200 font-semibold"
            : "bg-yellow-200"
        )}
      >
        Home
      </div>

      <div
        onClick={() => navigate("/translation")}
        className={cn(
          "menu-item",
          location.pathname === "/translation"
            ? "bg-white text-yellow-200 font-semibold"
            : "bg-yellow-200"
        )}
      >
        TranslationForm
      </div>
      <div
        onClick={() => navigate("/about")}
        className={cn(
          "menu-item",
          location.pathname === "/about"
            ? "bg-white text-yellow-200 font-semibold"
            : "bg-yellow-200"
        )}
      >
        About
      </div>
    </div>
  );
}

export default MenuItems;
