import {
  CopyrightIcon,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import Logo from "./Logo";

function Footer() {
  return (
    <div className="w-full h-full px-5 py-5 flex-box flex-col bg-yellow-900 scroll-smooth text-center">
      <div className="w-full pt-4 flex-box justify-around flex-col md:flex-row flex-end">
        <Logo />
        <div className="py-5 text-secondText text-base font-normal flex-box">
          <CopyrightIcon />
          2023 NaviLingua - All Right Reserved
        </div>
        <div className="py-3">
          <div className="flex-box text-white">
            <div className="border cursor-pointer p-2 m-1 rounded-full ">
              <Facebook size={24} strokeWidth={2} />
            </div>
            <div className="border cursor-pointer p-2 m-1 rounded-full">
              <Instagram size={24} strokeWidth={2} />
            </div>
            <div className="border cursor-pointer p-2 m-1 rounded-full">
              <Linkedin size={24} strokeWidth={2} />
            </div>
            <div className="border cursor-pointer p-2 m-1 rounded-full">
              <Twitter size={24} strokeWidth={2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
