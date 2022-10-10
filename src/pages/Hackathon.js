import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import Button from "react-bootstrap/Button";
import "./styles/Hackathon.css";
import level from "../assets/icons/carbon_skill-level-basic.svg"


const Hackathon = () => {

      let navigate = useNavigate();


  const initialDetails = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    level: "Easy",
  };

  const [initialData, setInitialData] = useState(initialDetails);

  const { id } = useParams();

  useEffect(() => {
    id && getChallenge();
  }, [id]);

  const getChallenge = async () => {
    const docRef = doc(db, "challenges", id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      setInitialData({ ...snapshot.data() });
    }
  };

  const handleDelete = async(id) =>{
    try {
      await deleteDoc(doc(db, "challenges", id));
      navigate("/");

    } catch (error) {
      console.log(error);
    }
  }

 

  return (
    <div className="hackathon-cont">
      <div className="hackathon-header">
        <div className="hackathon-time">
          {" "}
          Starts on {initialData.startDate} 09:00 PM (Indian Standard Time)
        </div>
        <div className="hackathon-title">
          {" "}
          <h1>{initialData.title}</h1>{" "}
        </div>
        <div className="hackathon-level">
          <div className="level-bg">
            <img src={level} alt="" />
            {initialData.level}
          </div>
        </div>
      </div>

      <div className="overview-bar">
        <h5>Overview</h5>
        <div className="btns-group">
          <Button
            className="btn-edit"
            onClick={() => navigate(`/editform/${id}`)}
          >
            Edit
          </Button>
          <Button className="btn-delete" onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </div>
      </div>
<div className="hackathon-description">
<article>

      {initialData.description}
</article>
</div>
    </div>
  );
};

export default Hackathon;
