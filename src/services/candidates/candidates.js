import axios from "axios";

export function getCandidatesList(pageNumber, pageSize){
    const url = `/cv?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    
    return new Promise((resolve, reject)=>{
         axios.get(url).then(response=>resolve(response)).catch(error=>reject(error));
    });
};

export function postCandidateResume(formData){
    const url = "/cv";
    
    return new Promise((resolve, reject)=>{
        axios.post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        }).then(response=>resolve(response)).catch(error=>reject(error));
    });
};

export function getCandidateData(candidateId){
    const url = `/cv/${candidateId}`;

    return new Promise((resolve, reject)=>{
        axios.get(url).then(response=>resolve(response)).catch(error=>reject(error))
    });
};

export function getCandidateFileData(candidateId){
    const url = `/cv/${candidateId}/file`;

    return new Promise((resolve, reject)=>{
        axios.get(url, { responseType: 'blob' }).then(response=>resolve(response)).catch(error=>reject(error));
    });
};

export function postCandidateFeedback(body){
    const url = `/cv`;

    return new Promise((resolve, reject)=>{
        axios.post(url, body).then(response=>resolve(response)).catch(error=>reject(error));
    })
}