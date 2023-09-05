import Explore from "./Explore";
const About = () => {
  return (
    <div className="bg-yellow-600 text-center text-white w-full py-10 mt-10">
      <h3 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-relaxed md:leading-snug mb-2 drop-shadow-md shadow-black">
        SeamlessM4T : Grow your speech/text translation generation
      </h3>
      <p className="text-sm drop-shadow-sm  shadow-black leading-7 py-5 px-5 text-customColor font-poppins tracking-widest font-light">
        Generate your Speech-to-Speech (S2ST), Speech-to-Text (S2TT),
        Text-to-Speech (T2ST) translation
        <br />
        Now to stay up-to-date and discover exciting languages processing and
        generation with deep learning.
      </p>
      <div className="flex-box flex-col justify-center my-6 w-full">
        <div className="flex-box w-full">
          <video className="h-96 w-screen inline-block" autoPlay loop muted>
            <source src="bluevideo.mp4" type="video/mp4"/>
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 opacity-25 w-full" />
        </div>
      </div>
      <Explore
        customstyles={`bg-blueColor hover:bg-white text-white hover:text-black rounded shadow hover:shadow-lg py-2 px-4 flex-box`}
      />
    </div>
  );
};

export default About;
