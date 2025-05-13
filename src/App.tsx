import Card from "./components/Card";

function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        padding: "2rem",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fdf9f6, #fefbf4, #ffffff)",
        color: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          color: "black",
          fontSize: "2.5rem",
          margin: 0,
          textShadow: "1px 1px 4px rgba(0,0,0,0.3)",
        }}
      >
        Energy Dashboard
      </h1>
      <Card />
    </div>
  );
}

export default App;
