import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Animation from "./components/Animation";

function App() {
  const [keyevnt, setkeyevnt] = useState(null);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      setkeyevnt(e);
    });
  }, []);

  return (
    <>
      <h1 className="mt-3 text-center">THANAKON KHAMWISET 68045661</h1>
      <Animation velocity={80} keyevent={keyevnt} />
      {/* <h1 className='mt-3 text-center'>THANAKON KHAMWISET 68045661</h1>
      <Animation  fieldheight={200} fieldwidth={200} ballRdius={25}/> */}
    </>
  );
}

export default App;
