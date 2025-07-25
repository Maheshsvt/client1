import { useSelector } from "react-redux"

export default function Loader() {
    const loaderState = useSelector(state => state.loader);
    return (
        loaderState.showLoader ? (
            <div className="loading_spinner_block">
                <div className="loading_spinner"></div>
                <p>{loaderState.text}</p>
            </div>) : <div></div>
    )

}