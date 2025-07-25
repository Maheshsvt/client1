import { useDispatch } from "react-redux";
import { useRef } from "react";
import { actions } from "../../store/toastSlice";

export function useToast(){
    const dispatch = useDispatch();
    const timerRef = useRef(null);

    const triggerToastMessage = (identifier, title, description)=>{
        if(timerRef.current){
            dispatch(actions.hideToast());
            clearTimeout(timerRef.current);
        }
        setTimeout(()=>{dispatch(actions.showToast({identifier, title, description}));}, 200)
        timerRef.current = setTimeout(()=>{dispatch(actions.hideToast())}, 5000);
    };

    return { triggerToastMessage };
}