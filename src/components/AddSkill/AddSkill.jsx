import React, { useRef, useState } from "react";
import axios from "axios";

const AddSkill = ({ getSkills, toastMessageHandler }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const inputRef = useRef(null);

  const openPopup = () => {
    setIsPopupOpen(true);
    if (inputRef.current) inputRef.current.value = "";
  };
 
  const closePopup = () => {
    setIsPopupOpen(false);
    getSkills(); // ✅ Only call getSkills when cancel is clicked
  };
 

  const handleAddSkill = async () => {
    const skill = inputRef.current?.value.trim();

    if (!skill) {
      toastMessageHandler("Warning", "Skill must be required", "warning");
      return;
    }

    if (isSubmitted) return;
    try {
      setIsSubmitted(true);
      const response = await axios.post("/api/skill", {
        skill: skill,
      });
      console.log("Skill Added:", response.data);

      if (response.status === 200 || response.status === 201) {
        toastMessageHandler("Success", " Skill added successfully!", "success");
        inputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error adding skill:", error);
      if(error?.status === 409){
        toastMessageHandler("Error", `${error.response.data}`, "error");
      }
      else{
        toastMessageHandler("Error", "Something went wrong while adding the skill", "error");
      }
    } finally {
      setIsSubmitted(false);
    }
  };

  return (
    <div >
      <button className="btn-primary" onClick={openPopup}>
        Add Skills
      </button>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2
              style={{
                color: "white",
                margin: "auto",
                fontSize:"16px"
              }}
            >
              Add Skills
            </h2>
            <hr />

            <input
              className="Skill-input"
              type="text"
              ref={inputRef}
              placeholder="Enter skill"
              disabled={isSubmitted}
            />
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <button className="add-button" onClick={handleAddSkill}>
                Add
              </button>
              <button
                className="add-button"
                onClick={closePopup}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSkill;
