import React, {useEffect} from 'react';
import "./styles/Btns.css";

const Btns = ({ filterItem, setItem, user }) => {

    const handleClick = ()=>{
setItem(user)
    }
    useEffect(() => {
     
        setItem(user);


    },[user])
    

  return (
    <div className="filter-btns">
      <button
        className="btn-light  p-1 px-2 mx-5 btn "
        onClick={() => filterItem("Easy")}
        key="1"
      >
        Easy
      </button>

      <button
        className="btn-light p-1 px-2 mx-5 btn"
        onClick={() => filterItem("Medium")}
        key="2"
      >
        Medium
      </button>

      <button
        className="btn-light  p-1 px-2 mx-5 btn"
        onClick={() => filterItem("Hard")}
        key="3"
      >
        Hard
      </button>

      <button className="btn-light  p-1 px-3 mx-5  btn" onClick={handleClick}>
        All
      </button>
    </div>
  );
};

export default Btns