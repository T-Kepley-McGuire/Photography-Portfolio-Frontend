import { useNavigate } from "react-router-dom";
import { InvestmentButton } from "../components/Button";

export default function Investments() {
  const navigate = useNavigate();

  return (
    <main className="flex-grow-2 pt-35">
      <h2 className="text-center text-2xl m-10">
        Take a look at my offerings!
      </h2>
      <p className="text-center m-10">Prices are negotiable depending on circumstance</p>
      {/* <div className="flex flex-col">
        <section id="minis-section" className="flex flex-col w-screen mt-4">
          <div
            className={`relative h-screen w-screen flex flex-col items-center bg-mygreen-100`}
          >
            <div className="absolute bottom-0 h-[20%] w-screen bg-gradient-to-b from-transparent to-mygreen-50"></div>

            <div
              onClick={() => {
                // setPortfolioWipe(true);
                // setTimeout(() => navigate("/portfolio"), wipeAnimationTime);
              }}
              className="group flex flex-row content-between justify-center items-center cursor-pointer p-6 text-center relative z-2 text-2xl rounded-lg text-mygreen-900"
            >
              <span className="mr-2">Minis</span>
            </div>
            {/* <InvestmentShowcase initialImages={couplesImages} /> }
            {/* <MinisShowcase /> }
            {/* <div className="absolute"></div> }
            <InvestmentButton
              text={"Contact Me"}
              func={() => navigate("/portfolio")}
              className={`left-[75%] lg:left-[80%] top-[50%]`}
              // x="90%"
              // y={500}
            />
          </div>
        </section>
      </div> */}
      <div className="flex flex-col landscape:flex-row">
        <section id="minis-section" className="flex flex-col w-full mt-4">
          <div
            id="minis-card"
            className={`relative h-screen flex flex-col gap-3 items-center bg-mygreen-100/30 hover:bg-mygreen-100/10 transition`}
          >
            <div className="absolute bottom-0 h-[20%] w-full bg-gradient-to-b from-transparent to-mygreen-50"></div>
            <img
              className="absolute top-0 left-0 object-cover w-full h-full -z-10"
              src="/images/investments/minis-4.jpg"
              alt="Cover photo for portfolio card"
            />
            <h3 className="relative text-3xl mt-20 font-light after:absolute after:h-[1px] after:w-full after:left-0 after:bottom-1 after:bg-black">Minis</h3>
            <div id="minis-text" className="flex flex-col text-xl">
              <li>20 minutes</li>
              <li>15 edited photos</li>
              <p>Starting at $150</p>
            </div>
            <InvestmentButton
              text={"Contact Me"}
              func={() => navigate("/contact")}
              className={`absolute bottom-20`}
            />  
            
          </div>
        </section>
        <section id="minis-section" className="flex flex-col w-full mt-4">
          <div
            id="minis-card"
            className={`relative h-screen flex flex-col gap-3 items-center bg-mygreen-100/30 hover:bg-mygreen-100/10 transition`}
          >
            <div className="absolute bottom-0 h-[20%] w-full bg-gradient-to-b from-transparent to-mygreen-50"></div>
            <img
              className="absolute top-0 left-0 object-cover w-full h-full -z-10"
              src="/images/investments/minis-1.jpg"
              alt="Cover photo for portfolio card"
            />
            <h3 className="relative text-3xl mt-20 font-light after:absolute after:h-[1px] after:w-full after:left-0 after:bottom-1 after:bg-black">Standard</h3>
            <div id="minis-text" className="flex flex-col text-xl">
              <li>40 minutes</li>
              <li>25 edited photos</li>
              <p>Starting at $220</p>
            </div>
            <InvestmentButton
              text={"Contact Me"}
              func={() => navigate("/contact")}
              className={`absolute bottom-20`}
            />  
            
          </div>
        </section>
        <section id="minis-section" className="flex flex-col w-full mt-4">
          <div
            id="minis-card"
            className={`relative h-screen flex flex-col gap-3 items-center bg-mygreen-100/30 hover:bg-mygreen-100/10 transition`}
          >
            <div className="absolute bottom-0 h-[20%] w-full bg-gradient-to-b from-transparent to-mygreen-50"></div>
            <img
              className="absolute top-0 left-0 object-cover w-full h-full -z-10"
              src="/images/investments/minis-3.jpg"
              alt="Cover photo for portfolio card"
            />
            <h3 className="relative text-3xl mt-20 font-light after:absolute after:h-[1px] after:w-full after:left-0 after:bottom-1 after:bg-black">Extended</h3>
            <div id="minis-text" className="flex flex-col text-lg">
              <li>60 minutes</li>
              <li>35 edited photos</li>
              <p>Starting at $300</p>
            </div>
            <InvestmentButton
              text={"Contact Me"}
              func={() => navigate("/contact")}
              className={`absolute bottom-20`}
            />  
            
          </div>
        </section>
      </div>
    </main>
  );
}

