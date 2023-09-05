const Contact = () => {
    return (
      <div
        className="bg-yellow-800 flex flex-row items-center justify-center w-full gap-20 h-[240px] mt-40 px-10"
        style={{ boxShadow: "0px 4px 88px 22px #c6f00e" }}
      >
        <div className="text-white mr-10 font-bold text-lg	">
          Please feel free to get in touch with us
        </div>
        <div className="flex flex-col text-white">
          <p className="font-semibold	">How can we help?</p>
          <p className="m-1 cursor-pointer" type="phone">+212 50 000 0000</p>
          <a className="cursor-pointer" type="mail">navi.lingua@gmail.com</a>
        </div>
      </div>
    );
  };
  
  export default Contact;