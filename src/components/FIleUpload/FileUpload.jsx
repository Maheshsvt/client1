
import React, { useRef, useState, useEffect } from "react";
import AddSkill from "../AddSkill/AddSkill";
import CandidatesTable from "../Candidates/CanditatesTable";
import { useToast } from "../../customhooks/useToast/useToast";
import { useLoader } from "../../customhooks/useLoader/useLoader";
import { getCandidatesList, postCandidateResume } from "../../services/candidates/candidates";


export default function LandingPage() {
  const dummyFileRefEl = useRef();
  const [fileData, setFileData] = useState(null);
  const { triggerToastMessage } = useToast();
  const { startLoader, stopLoader } = useLoader();
  
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;
  
  useEffect(()=>{
    getCandidates();
  },[currentPage]);

  async function getCandidates(){
    try{
      const response = await getCandidatesList(currentPage, itemsPerPage);
      setTotalItems(response?.data?.totalElements || 0);
    }catch(error){
      console.error(error);
    }
  }

  function pageNumberHandler(pageNumber){
    setCurrentPage(pageNumber);
  }

  function openFile() {
    dummyFileRefEl.current.click();
  }

  function fileInputChangeHandler(event) {
    const file = event?.target?.files[0];
    if (
      file?.type === "application/pdf" ||
      file?.type === "application/msword" ||
      file?.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setFileData(file);
    } else {
      setFileData(null);
      triggerToastMessage("warning", "Warning", "Upload pdf or doc extension files only");    
    }
  }

  async function formSubmitHandler(event) {
    event.preventDefault();
    if (!fileData) {
      triggerToastMessage("warning", "Warning", "Resume must be required to upload");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", fileData);
    try {
      startLoader("Uploading the file");
      // const response = await axios.post("/api/cv", formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });
      const response = await postCandidateResume(formData);
      if (response?.data?.statusCode == 200 || response?.status == 200 || response?.data?.status == "success") {
        triggerToastMessage("success", "Success", "Resume uploaded successfully");
        getCandidates();
        stopLoader();
      }
      else {
        throw new Error("Something went wrong while uploading the file");
      }
    } catch (error) {
      console.error(error);
      if(error?.status == 409){
        triggerToastMessage("error", "Error",`${error?.response?.data?.message}`);
      }
      else{
        triggerToastMessage("error", "Error", "Failed to upload the resume");
      }
    } finally {
      stopLoader();
    }
  }
  return (
    <div className="landing-page dark-theme">
      {/* Navbar */}
      <div className="navbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 25px", backgroundColor: "#111827", color: "#ffffff" }}>
        <div className="navbar-left" style={{ fontWeight: "bold", fontSize: "18px" }}>mahi</div>
        <div className="navbar-right" style={{ display: "flex", gap: "20px" }}>
          <a href="#home" className="nav-link" style={{ color: "#ffffff", textDecoration: "none" }}>Home</a>
          <a href="#jobs" className="nav-link" style={{ color: "#ffffff", textDecoration: "none" }}>Jobs</a>
          <a href="#careers" className="nav-link" style={{ color: "#ffffff", textDecoration: "none" }}>Careers</a>
          <a href="#company" className="nav-link" style={{ color: "#ffffff", textDecoration: "none" }}>Shvintech</a>
        </div>
      </div>
      <hr />
      <div className="card">
        {/* Resume Upload Section */}
        <div className="resume-upload">
          <h2 className="resume-heading">MAHI- Resume Uploads</h2>
          <form className="resume-form" onSubmit={formSubmitHandler}>
            <label className="form-label">Resume</label>
            {!fileData && (
              <div className="file-upload-box" onClick={openFile}>
                <span className="file-upload-text">
                  Upload your resume
                </span>
              </div>
            )}
            <input
              type="file"
              className="input-file"
              ref={dummyFileRefEl}
              style={{ display: fileData ? "block" : "none" }}
              onChange={fileInputChangeHandler}
            />
            <button
              type="submit"
              style={{ cursor: "pointer" }}
              className="btn-primary submit-btn"
            >
              Submit Resume
            </button>

          </form>
        </div>
        <CandidatesTable currentPage={currentPage} pageNumberHandler={pageNumberHandler} totalItems={totalItems}/>

      </div>
    </div>
  );
} 
