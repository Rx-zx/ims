import React, { useState, useEffect } from "react";
import HomePage from './components/HomePage';


function App() {
//   const [message, setMessage ] = useState("");

//   useEffect(() => {
//     fetch("/api/tutorials")
//       .then((res) => res.json())
//       .then((data) => setMessage(data.message)
      
//       );
//   }, []);
//   var o = typeof message === "undefined" ? "no" : message[0].id;
// console.log(o)
//   return (
//     <div className="App">
//       <h1>{ message.id}</h1>
//       <h1>{ message.title}</h1>
//       {/* {( typeof message === "undefined") ? (<p>not yet</p>):(<p>{message[0].id}</p>)} */}
//     </div>
//   );

return (
  <div>
    <HomePage />
  </div>
);
}

export default App