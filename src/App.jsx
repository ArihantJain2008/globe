import GlobeView from "./components/Globe";

function App() {
  return (
    <div>
      <h1
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          zIndex: 1000,
          fontFamily: "Arial",
        }}
      >
        World Explorer
      </h1>

      <GlobeView />
    </div>
  );
}

export default App;