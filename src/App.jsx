import { Provider } from "react-redux";
import appStore from "./store/appStore.js";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";

const App = () => (
  <Provider store={appStore}>
    <Home />
    <ToastContainer position="bottom-center" autoClose={3000} theme="dark" />
  </Provider>
);
export default App;

/* How onAuthStateChanged() works
-->The Firebase function onAuthStateChanged(auth, callback) does two things:
  1. Sets up an auth state listener (so your callback runs whenever the user logs in, 
    logs out, or the app restarts).
  2. Returns a cleanup function (a function that, when called, removes that listener).
    That cleanup function is what we usually name unsubscribe.

*/
