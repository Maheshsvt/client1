import { useSelector } from "react-redux";

export default function Toast({ref}){
    const toastState = useSelector(state=>state.toast);
    return (
    <div className="toast_block"  style={{zIndex: 100}} ref={ref}>
        { toastState.toast.isShow && (
                <div className={`toast_section toast_${toastState.toast.identifier}`}>
                    <span className="toast_title">{toastState.toast.title}</span>
                    <span className="toast_message">{toastState.toast.description}</span>
                </div>
            )
        }
    </div>
    )
}