import React, { useEffect, useState } from 'react';
import Button from "react-bootstrap/Button";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {  serverTimestamp, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import "../components/styles/Form.css";

const EditForm = () => {
  let navigate = useNavigate();

  const initialDetails = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    level: "Easy",
  };

  const [initialData, setInitialData] = useState(initialDetails);
  const [progress, setProgress] = useState(null);
  const { title, description, startDate, endDate, level } = initialData;
  const [imageFile, setImageFile] = useState(null);

  const handleOnChange = (e) => {
    setInitialData({ ...initialData, [e.target.name]: [e.target.value] });
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;

            case "running":
              console.log("Upload is running");
              break;

            default:
              break;
          }
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setInitialData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };

    imageFile && uploadFile();
  }, [imageFile]);

  const handleSubmit = async () => {
    await updateDoc(doc(db, "challenges", id), {
      ...initialData,
      timestamp: serverTimestamp(),
    });

    navigate("/");
  };

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

  return (
    <div className="cont">
      <div className="form-cont">
        <h4>Challenge Details</h4>
      </div>
      <div className="form-input">
        <label htmlFor="title">Challenge Name</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleOnChange}
        />

        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={handleOnChange}
        />

        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={handleOnChange}
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={description}
          onChange={handleOnChange}
        />

        <label htmlFor="image">Image</label>
        <input
          type="file"
          name="image"
          onChange={(e) => {
            setImageFile(e.target.files[0]);
          }}
        />

        <label htmlFor="level">Level Type</label>
        <select id="level" name="level" onChange={handleOnChange} >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={progress !== null && progress < 100}
        >
          Save Changes


        </Button>
      </div>
    </div>
  );
};

export default EditForm;