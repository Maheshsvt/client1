import { useDispatch } from "react-redux";
import { actions } from "../../store/loaderSlice";

export function useLoader(){
    const dispatch = useDispatch();

    const startLoader = (text)=>{ dispatch(actions.startLoading(text))};
    const stopLoader = ()=>{dispatch(actions.stopLoading())};
    
    return { startLoader, stopLoader };
}