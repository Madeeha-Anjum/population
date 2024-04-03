import React from "react";

const Greeting = ({ name }) => {
  return <h1 className="text-red-500">Hello, {name}</h1>;
};

const App = () => {
  return (
    <div>
      <Greeting name="world" />
    </div>
  );
};

export default App;
