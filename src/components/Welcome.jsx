import TypewriterComponent from "typewriter-effect";
import HomeButton from "./Home/HomeButton";

function Welcome() {
  return (
    <div className="bg-bg-home bg-no-repeat bg-cover w-full py-2 flex-box ">
      <div className="flex-box w-full flex-col md:flex-row my-6">
        <div className="text-center overflow-hidden w-full py-10 flex-box flex-col scroll-smooth">
          <div className="flex-box w-full overflow-hidden">
            <div className="flex-box">
              <div className="px-6 text-center text-white md:px-12 font-Bruno flex-box flex-col">
                <div className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent text-5xl pb-6 font-extrabold sm:text-5xl">
                  Welcome <br /> to
                  <h2 className="text-5xl text-blue-400 drop-shadow-sm shadow-black">
                    Navi
                    <span className="text-blue-300">Lingua</span>
                  </h2>
                </div>
                <p className="max-w-2xl mb-6  font-light text-primary lg:mb-8 md:text-lg lg:text-xl drop-shadow-xl">
                  Say goodbye to manual speech/text translation!
                  <br />
                  Our AI-powered technology ensures precise and efficient
                  multilingual real-time Speech-to-Speech generation for
                  migrants about their new country in their across 100+ native
                  languages.
                  <br />
                  Join the revolution and experience the future of SeamlessM4T
                  with NaviLingua.
                </p>
                <h2 className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-2xl pb-6 font-bold text-transparent lg:text-2xl">
                  <TypewriterComponent
                    options={{
                      strings: ["#NaviLingua", "#SeamlessM4T", "#Emigration"],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </h2>

                <HomeButton />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex-box p-4">
          <div className="flex-box">
            <div className="mx-3">
              <img
                className="logo rounded-full inline-block w-screen h-96 p-8 md:p-0"
                src="emigration.jpeg"
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Welcome;
