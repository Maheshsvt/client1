import { useState, memo } from  "react";

import { postCandidateFeedback } from "../../services/candidates/candidates";
import { useLoader } from "../../customhooks/useLoader/useLoader";
import { useToast } from "../../customhooks/useToast/useToast";

function ResumeViewModal({showDialogBox, hideResumeDataHandler, resumeParserData, fileData, activeCandidateId }){
    // const [resumeParserData, setResumeParserData] = useState({});
    const [feedbackScore, setFeedbackScore] = useState(10);
    const { startLoader, stopLoader } = useLoader();
    const { triggerToastMessage } = useToast();

    function cancelButtonHandler(){
      setFeedbackScore(10);
      hideResumeDataHandler(false);
    }

    // useEffect(()=>{ 
    //     setResumeParserData(
    //         {
    //                 "name": "VELPULA JAYA KRISHNA YADAV",
    //                 "email": "jayakrishnavelpula2000@gmail.com",
    //                 "phone": "+91-6303628579",
    //                 "address": "Pottipadu (vi), Rajupalem (m), Kadapa (dist), Andhra Pradesh (st)",
    //                 "summary": "Ambitious and adaptable graduate with a Bachelor's of Engineering. Possessing strong interpersonal skills and a passion for [Industry]",
    //                 "skills": "C, Core Java, Advanced Java, Spring, Spring Boot, HTML, CSS, JAVASCRIPT, OOPS, Collections, J2SE , J2EE, ORACLE(SQL), Eclipse, Tomcat",
    //                 "experience": [
    //                     {
    //                         "company": "",
    //                         "position": "",
    //                         "duration": "",
    //                         "description": ""
    //                     }
    //                 ],
    //                 "education": [
    //                     {
    //                         "id": null,
    //                         "institution": "Muthayammal Engineering College",
    //                         "degree": "BE-Computer Science and Engineering",
    //                         "year": "2023",
    //                         "grade": "CGPA: 8.2"
    //                     },
    //                     {
    //                         "id": null,
    //                         "institution": "Narayana Junior College",
    //                         "degree": "",
    //                         "year": "2019",
    //                         "grade": "CGPA: 8.9"
    //                     },
    //                     {
    //                         "id": null,
    //                         "institution": "Sarada High School",
    //                         "degree": "",
    //                         "year": "2017",
    //                         "grade": "CGPA: 7.3"
    //                     }
    //                 ],
    //                 "certifications": [
    //                     "WIPRO 2023 - JAVA FULLSTACK",
    //                     "IBM 2022 - Project appreciation"
    //                 ],
    //                 "languages": "English, Telugu,",
    //                 "rawText": null
    //             }
    //     )
    // }, []);

    async function feedbackSubmitHandler(){
      try{
        startLoader("Submitting the candidate feedback");
        const response = await postCandidateFeedback({id:activeCandidateId.current, accuracy: feedbackScore});
        console.log(response);
        if(response?.status == 200){
          triggerToastMessage("success",'Success',"Successfully Submitted Feedback")
 cancelButtonHandler()
        }else{
          throw new Error("Failed to submit the candidate feedback");
        }
      }catch(error){
        console.error(error);
        triggerToastMessage("error", "Error", "Failed to submit the candidate feedback");

      }finally{
        stopLoader();
      }
      console.log(feedbackScore);
    }

    return (
      <dialog open={showDialogBox} className="resume_dialog_box">
        <div className="cancel_btn_block">
          <button onClick={cancelButtonHandler}>X</button>
        </div>
        <div className="resume_view_block">
          <div>
            <iframe 
              src={fileData}
            ></iframe>
          </div>
          <div className="resume_data_block">
            {Object.keys(resumeParserData).length > 0 ? <>
              <h2 style={{ textAlign: "center" }}>Resume Details</h2>
              <div className="resume-extraction-data-block">
                <div>
                  <label>Name:</label>
                  <p>{resumeParserData?.name}</p>
                </div>
                <div>
                  <label>Email:</label>
                  <p>{resumeParserData?.email}</p>
                </div>
                <div>
                  <label>Phone Number:</label>
                  <p>{resumeParserData?.phone}</p>
                </div>
                <div>
                  <label>Address:</label>
                  <p>{resumeParserData?.address}</p>
                </div>
                <div>
                  <label>Summary:</label>
                  <p>{resumeParserData?.summary}</p>
                </div>
                <div>
                  <label>Skills:</label>
                  <p>{resumeParserData?.skills ? resumeParserData?.skills : "Skills not mentioned"}</p>
                </div>
                <div>
                  <label>Experience:</label>
                  {
                    resumeParserData?.experience?.length > 0 ? <ul>
                      {
                        resumeParserData?.experience.map((experience, index) => (
                          <li key={index}>
                            <h3>{experience.company}</h3>
                            <p>{experience.position}</p>
                            <p>{experience.duration}</p>
                            <p>{experience.description}</p>
                          </li>
                        ))
                      }
                    </ul> : <p>Experience details not mentioned</p>
                  }
                </div>
                <div>
                  <label>Education:</label>
                  {resumeParserData?.education?.length > 0 ? <ul>
                    {
                      resumeParserData?.education.map((education, index) => (
                        <li key={index}>
                          <h3>{education.institution}</h3>
                          <p>{education.degree}</p>
                          <p>{education.year}</p>
                          <p>{education.grade}</p>
                        </li>
                      ))
                    }
                  </ul> : <p>Education details not mentioned</p>}
                </div>
                <div>
                  <label>Certifications:</label>
                  {resumeParserData?.certifications?.length > 0 ? <p>{resumeParserData.certifications.join(", ")}</p> : <p>Certificates not mentioned</p>}
                </div>
                <div>
                  <label>Languages:</label>
                  <ul>
                    {resumeParserData?.languages != "" ? (
                      <ul>
                        {
                          resumeParserData?.languages
                        }
                      </ul>
                    ) : <p>Not Mentioned</p>
                    }
                  </ul>
                </div>
              </div>
            </> : <p>Failed to fetch the candidate details</p>}
            <div className="hr_review_form">
              <h2>HR Feedback</h2>
              <label>Select Score (10–100%) :</label>
              <select
              value={feedbackScore}
              onChange={(e) => setFeedbackScore(e.target.value)}
              className="dropdown"
              >
                {
                  Array.from({length: 10}, (el, i)=>(i+1)*10).map(value=><option key={value} value={value}>{value}</option>)
                }
              </select>
              <div>
                <button className="btn-primary" onClick={feedbackSubmitHandler}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    )
}

export default memo(ResumeViewModal);
