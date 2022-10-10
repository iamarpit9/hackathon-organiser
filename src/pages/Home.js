import React from "react";
import { useNavigate } from "react-router-dom";
import ChallengeCard from "../components/ChallengeCard";
import Button from "react-bootstrap/Button";
import "./styles/Home.css";
import rocket from "../assets/icons/PicsArt_04-14-04.42 1.svg";
import icon1 from "../assets/icons/Group 1000002515.svg";
import icon2 from "../assets/icons/Group 1000002516.svg"
import icon3 from "../assets/icons/Group 1000002518.svg"
import icon4 from "../assets/icons/carbon_notebook-reference.svg"
import icon5 from "../assets/icons/Vector.svg"
import icon6 from "../assets/icons/Robot.svg"
import icon7 from "../assets/icons/IdentificationCard.svg"


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="cont">
      <div className="cont-1">
        <div className="header">
          <div>
            <h1>
              Accelerate Innovation <br />
              with Global AI Challenges{" "}
            </h1>
            <p>
              AI Challenges at DPhi simulate real-world problems. It is a great
              place to put your <br /> AI/Data Science skills to test on diverse
              datasets allowing you to foster learning <br /> through
              competitions.
            </p>
            <Button onClick={() => navigate("/form")}>Create Challenge </Button>
          </div>
          <div>
            <img src={rocket} alt="pic"></img>
          </div>
        </div>
      </div>

      <div className="cont-2">
        <div className="icon">
          <img src={icon1} alt="pic" />
          <p>
            100K+ <br /> <span> AI model submissions </span>
          </p>
        </div>
        <div className="icon">
          <img src={icon2} alt="pic" />
          <p>
            50K+ <br /> <span> Data Scientists</span>
          </p>
        </div>
        <div className="icon">
          <img src={icon3} alt="pic" />
          <p>
            100+ <br /> <span> AI Challenges hosted</span>
          </p>
        </div>
      </div>

      <div className="cont-3">
        <div>
          <h2>
            Why Participate in <span>AI Challenges? </span>{" "}
          </h2>
        </div>

        <div className="card-cont">
          <div className="card1 card">
            <img src={icon4} alt="pic" />
            <p>
              Prove your skills <br />{" "}
              <span>
                {" "}
                Gain substantial experience by solving real-world problems and
                pit against others to come up with innovative solutions.
              </span>
            </p>
          </div>

          <div className="card2 card">
            <img src={icon5} alt="pic" />
            <p>
              Learn from community
              <br />{" "}
              <span>
                {" "}
                One can look and analyze the solutions submitted by the other
                Data Scientists in the community and learn from them.
              </span>
            </p>
          </div>

          <div className="card3 card">
            <img src={icon6} alt="pic" />
            <p>
              Challenge yourself <br />{" "}
              <span>
                {" "}
                There is nothing for you to lose by participating in a
                challenge. You can fail safe, learn out of the entire experience
                and bounce back harder.
              </span>
            </p>
          </div>

          <div className="card4 card">
            <img src={icon7} alt="pic" />
            <p>
              Earn recognition <br />{" "}
              <span>
                {" "}
                You will stand out from the crowd if you do well in AI
                challenges, it not only helps you shine in the community but
                also earns rewards.
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="cont-4">
        <div>
          <h2>Explore Challenges</h2>
        </div>

        <ChallengeCard />
      </div>
    </div>
  );
};

export default Home;
