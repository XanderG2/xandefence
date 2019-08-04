import React from "react";
import "./App.css";
import Map from "./classes/Map";

const map = new Map();

function App() {
  const [renders, setRenders] = React.useState(0);
  const rerender = React.useCallback(() => {
    setRenders(renders + 1);
  }, [renders]);
  const tick = () => {
    map.tick();
    rerender();
  };
  const tickerRef = React.useRef(tick);
  React.useEffect(() => {
    tickerRef.current = tick;
  });

  const handleStep = React.useCallback(e => {
    e.preventDefault();
    tickerRef.current();
  }, []);
  const timerRef = React.useRef(null);
  const togglePlay = React.useCallback(
    e => {
      e.preventDefault();
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      } else {
        timerRef.current = setInterval(() => tickerRef.current(), 100);
      }
      rerender();
    },
    [rerender]
  );

  const enemies = map.enemies.map(enemy => (
    <div className="enemy" style={{ left: (enemy.pos / map.size) * 100 + "%" }}>
      E
    </div>
  ));

  return (
    <div className="App">
      <header>
        <div className="healthBar">
          <div
            className="healthBarHealth"
            style={{ width: (100 * map.hp) / map.maxHp + "%" }}
          />
        </div>
      </header>
      <main>
        <div className="map">
          <div className="entry" />
          <div className="course">{enemies}</div>
          <div className="exit" />
        </div>
      </main>
      <footer>
        Wave {map.waveNumber + 1}, tick {map.tickNumber}{" "}
        <span onClick={togglePlay}>{timerRef.current ? "Pause" : "Play"}</span>{" "}
        <span onClick={handleStep}>Step</span>
      </footer>
    </div>
  );
}

export default App;
