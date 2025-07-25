
import './App.css';
import FileUpload from './components/FIleUpload/FileUpload';
import Loader from './components/Loader/Loader';
import { Provider } from "react-redux";
import store from "./store/store";
import Toast from './components/Toast';


function App() {

  return<Provider store={store}>
    <Loader />
    <Toast />
    <FileUpload />
  </Provider>
}

export default App
