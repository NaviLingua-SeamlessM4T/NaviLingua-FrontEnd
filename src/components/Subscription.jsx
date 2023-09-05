const Subscription = () => {
    return (
      <div className="input__container lg:w-2/3 bg-yellow-500">
        <h1 className="text-4xl font-medium text-start">
          Discover the latest tools and <br />
          trends in SeamlessM4T GenAI
        </h1>
        <p className="input__description text-start">
          What do you want to call yourself?
        </p>
        <div className="flex-box">
        <input
          placeholder="Enter your username"
          className="input"
          name="text"
          type="text"
        />
        <button className="cardAbout menu-item text-blue-800 bg-blue-400 hover:bg-white">
          subscribe
        </button>
        </div>
        
      </div>
    );
  };
  
  export default Subscription;