import { RecoilRoot } from "recoil";
import "./App.css";
import FiberContainer from "./components/FiberContainer";

function App() {
  return (
    <RecoilRoot>
      <FiberContainer></FiberContainer>
    </RecoilRoot>
  );
}

export default App;
