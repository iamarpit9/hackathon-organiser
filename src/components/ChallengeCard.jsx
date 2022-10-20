import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import "./styles/ChallengeCard.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import Timer from "./Timer";
import Btns from "./Btns";

const ChallengeCard = () => {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [searchParam] = useState(["title"]);

  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "challenges"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });

        setUser(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const currentTime = new Date().toISOString().split("T")[0];

  const hackStatus = (start, end) => {
    if (currentTime > end) return "Past";
    else if (currentTime < start) return "Upcoming";
    else return "Active";
  };

  const timerStatus = (start, end) => {
    if (currentTime > end) return "Ended on";
    else if (currentTime < start) return "Starts in";
    else return "On going";
  };

  // Filter Feature

  const [item, setItem] = useState(user);

  const filterItem = (curcat) => {
    const newItem = user.filter((newVal) => {
      return newVal.level == curcat;
    });
    if (newItem) {
      setItem(newItem);
    } else {
      const message = "Nothing to show";
      return { message };
    }
  };

  const filterItem2 = (curcat) => {
    const newItem = user.filter((newVal) => {
      if (currentTime > newVal.endDate) return "Past" === curcat;
      else if (currentTime < newVal.startDate) return "Up Coming" === curcat;
      else return "Active" === curcat;
    });
    if (newItem) {
      setItem(newItem);
    } else {
      const message = "Nothing to show";
      return { message };
    }
  };

  return (
    <>
      <div className="challenge-card-cont">
        <input
          type="text"
          id="search"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Btns
          filterItem={filterItem}
          filterItem2={filterItem2}
          setItem={setItem}
          user={user}
        />
        <Row xs={3} md={3} className="g-4">
          {user &&
            item
              .filter((item) => {
                return searchParam.some((newItem) => {
                  return (
                   ( item[newItem]+ "").toString().toLowerCase().indexOf(search.toLowerCase()) > -1
                  );
                });
              })
              .map((item) => (
                <Col key={item.id}>
                  <Card style={{ borderRadius: "15px", height: "auto" }}>
                    <Card.Img
                      variant="top"
                      src={item.img}
                      style={{ objectFit: "contain", height: "200px" }}
                    />

                    <Card.Body>
                      <Badge pill bg="info">
                        {hackStatus(item.startDate, item.endDate)}
                      </Badge>
                      <Card.Title>{item.title}</Card.Title>
                      <Timer
                        startDate={item.startDate}
                        endDate={item.endDate}
                        status={timerStatus(item.startDate, item.endDate)}
                      />

                      <Button
                        className="participate-btn"
                        onClick={() => navigate(`/hackathon/${item.id}`)}
                      >
                        {currentTime > item.endDate
                          ? "See Details"
                          : "Participate Now"}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
        </Row>
      </div>
    </>
  );
};

export default ChallengeCard;
