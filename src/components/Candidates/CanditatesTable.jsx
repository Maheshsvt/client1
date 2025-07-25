import viewIcon from "../../images/view_icon.png";
import { useState, useEffect, memo, useRef } from "react";
import ResumeViewModal from "./ResumeViewModal";

import { getCandidateData, getCandidateFileData } from "../../services/candidates/candidates";

function CandidatesTable({ currentPage, pageNumberHandler, totalItems }){
    const itemsPerPage = 10;
    const [showDialogBox, setShowDialogBox] = useState(false);
    const [startPageNumber, setStartPageNumber] = useState(0);
    const [endPageNumber, setEndPageNumber] = useState(4);
    const [totalPages, setTotalPages] = useState(0);
    // const [currentPage, setCurrentPage] = useState(0);
    // const [totalItems, setTotalItems] = useState(0);
    const [buttonsArray, setButtonsArray] = useState([]);

    const [resumeParserData, setResumeParserData] = useState({});
    const [fileData, setFileData] = useState(null);
    const activeCandidateId = useRef(null); 

    useEffect(()=>{
        paginationHandler(currentPage);
    },[currentPage, totalItems]);


    async function viewResumeDataHandler(id){
        setShowDialogBox(true);
        activeCandidateId.current = id;
        try{
            const response = await getCandidateData(id);
            // setResumeParserData(
            //     {
            //                         "name": "VELPULA JAYA KRISHNA YADAV",
            //                         "email": "jayakrishnavelpula2000@gmail.com",
            //                         "phone": "+91-6303628579",
            //                         "address": "Pottipadu (vi), Rajupalem (m), Kadapa (dist), Andhra Pradesh (st)",
            //                         "summary": "Ambitious and adaptable graduate with a Bachelor's of Engineering. Possessing strong interpersonal skills and a passion for [Industry]",
            //                         "skills": "C, Core Java, Advanced Java, Spring, Spring Boot, HTML, CSS, JAVASCRIPT, OOPS, Collections, J2SE , J2EE, ORACLE(SQL), Eclipse, Tomcat",
            //                         "experience": [
            //                             {
            //                                 "company": "",
            //                                 "position": "",
            //                                 "duration": "",
            //                                 "description": ""
            //                             }
            //                         ],
            //                         "education": [
            //                             {
            //                                 "id": null,
            //                                 "institution": "Muthayammal Engineering College",
            //                                 "degree": "BE-Computer Science and Engineering",
            //                                 "year": "2023",
            //                                 "grade": "CGPA: 8.2"
            //                             },
            //                             {
            //                                 "id": null,
            //                                 "institution": "Narayana Junior College",
            //                                 "degree": "",
            //                                 "year": "2019",
            //                                 "grade": "CGPA: 8.9"
            //                             },
            //                             {
            //                                 "id": null,
            //                                 "institution": "Sarada High School",
            //                                 "degree": "",
            //                                 "year": "2017",
            //                                 "grade": "CGPA: 7.3"
            //                             }
            //                         ],
            //                         "certifications": [
            //                             "WIPRO 2023 - JAVA FULLSTACK",
            //                             "IBM 2022 - Project appreciation"
            //                         ],
            //                         "languages": "English, Telugu,",
            //                         "rawText": null
            //                     }
            // )
            console.log(response, "res")
            setResumeParserData(response?.data || {});
            const fileResponse = await getCandidateFileData(id);
            const blob = await fileResponse?.data;
            const url = URL.createObjectURL(blob);
            setFileData(url);

        }catch(error){
            console.error(error);
        }
    }

    function hideResumeDataHandler(){
        setShowDialogBox(false);
        activeCandidateId.current = null;
    }

    function paginationHandler(pageNumber){
        let pageNum = pageNumber;
        let total_pages = Math.ceil(totalItems / itemsPerPage);
        let startPage = 0;
        let endPage = 0;
        if(total_pages < 4){
            startPage = 0;
            endPage = total_pages;
        }else{
            if(pageNum <= 2){
                startPage = 0;
                endPage = 4;
            }
            else if(pageNum >= totalPages-1){
                startPage = total_pages - 4;
                endPage = total_pages;
            }
            else{
                startPage = pageNum - 2;
                endPage = pageNum + 2;
            }
        }
        
        if (startPage < 1) startPage = 0;

        const updatedButtonsArray = [];
        for (let i = startPage; i < endPage; i++) {
            updatedButtonsArray.push(i);
        }
        setTotalPages(total_pages);
        // setCurrentPage(pageNum);
        setStartPageNumber(startPage);
        setEndPageNumber(endPage);
        setButtonsArray(updatedButtonsArray);
    }

    return <div>
        { showDialogBox && <ResumeViewModal showDialogBox={showDialogBox} hideResumeDataHandler={hideResumeDataHandler} resumeParserData={resumeParserData} fileData={fileData} activeCandidateId={activeCandidateId} /> }
        <h2>Candidates Data</h2>
        <table className="candidates_table">
            <thead>
                <tr>
                    <th>File Name</th>
                    <th>Candidate Name</th>
                    <th>Skills</th>
                    <th>Status</th>
                    {/* <th>Accuracy</th> */}
                    <th>View</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td></td>
                    <td>Hari</td>
                    <td>HTML, CSS, JAVASCRIPT,HTML, CSS, JAVASCRIPT</td>
                    <td>Success</td>
                    <td className="view_col"><div><img src={viewIcon} alt="img_not_found" onClick={()=>viewResumeDataHandler(1)}></img></div></td>
                </tr>
                <tr>
                    <td></td>
                    <td>Hari</td>
                    <td>HTML, CSS, JAVASCRIPT,HTML, CSS, JAVASCRIPT</td>
                    <td>Success</td>
                    <td className="view_col"><div><img src={viewIcon} alt="img_not_found" onClick={()=>viewResumeDataHandler(2)}></img></div></td>
                </tr>
                <tr>
                    <td></td>
                    <td>Hari</td>
                    <td>HTML, CSS, JAVASCRIPT,HTML, CSS, JAVASCRIPT</td>
                    <td>Success</td>
                    <td className="view_col"><div><img src={viewIcon} alt="img_not_found" onClick={()=>viewResumeDataHandler(3)}></img></div></td>
                </tr>
                <tr>
                    <td></td>
                    <td>Hari</td>
                    <td>HTML, CSS, JAVASCRIPT,HTML, CSS, JAVASCRIPT</td>
                    <td>Success</td>
                    <td className="view_col"><div><img src={viewIcon} alt="img_not_found" onClick={()=>viewResumeDataHandler(4)}></img></div></td>
                </tr>
                <tr>
                    <td></td>
                    <td>Hari</td>
                    <td>HTML, CSS, JAVASCRIPT,HTML, CSS, JAVASCRIPT</td>
                    <td>Success</td>
                    <td className="view_col"><div><img src={viewIcon} alt="img_not_found" onClick={()=>viewResumeDataHandler(5)}></img></div></td>
                </tr>

            </tbody>
        </table>
        <div id="pagination_block">
            <button onClick={()=>pageNumberHandler(0)} disabled={currentPage === startPageNumber}>first</button>
            <button onClick={()=>pageNumberHandler(currentPage-1)} disabled={currentPage === startPageNumber}>prev</button>
            {
                buttonsArray.map((buttonNumber, index)=><button className={buttonNumber === currentPage ? "button_active" : "button_inactive"} onClick={()=>pageNumberHandler(buttonNumber)} key={index}>{buttonNumber+1}</button>)
            }
            <button onClick={()=>pageNumberHandler(currentPage+1)} disabled={currentPage+1 === endPageNumber || totalPages == 0}>next</button>
            <button onClick={()=>pageNumberHandler(totalPages-1)} disabled={currentPage+1 === endPageNumber || totalPages == 0}>last</button>
        </div>
    </div>
};

export default memo(CandidatesTable);