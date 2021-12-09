import React, { useState, useEffect } from 'react';
import glamorous from 'glamorous';
import {
  IoCaretUp,
  IoCaretDown,
  IoCaretForward,
  IoCaretBack,
} from "react-icons/io5";

import './App.css';


// Hook
function useKeyPress(targetKey: any) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState<boolean>(false);
  // If pressed key is our target key then set to true
  function downHandler({ key }: any) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }: any) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}


const App = () => {

  const [left, setLeft] = useState(10);
  const [speed, setSpeed] = useState(0);
  const [speedProps, setSpeedProps] = useState('0s !important');

  const arrowUp = useKeyPress("ArrowUp");
  const arrowDown = useKeyPress("ArrowDown");
  const arrowLeft = useKeyPress("ArrowLeft");
  const arrowRight = useKeyPress("ArrowRight");

  const InfiniteRoad = glamorous.div({
    '::before': {
      animationDuration: speedProps
    }
  });

  const downHandler = ({ key }: any) => {
    if (key === 'ArrowDown') {
      // console.log(key, speed);
      if (speed > 0 && speed <= 5) {
        setSpeed(speed + 0.5);
      } else {
        setSpeed(0);
      }
    }
  };

  const upHandler = ({ key }: any) => {
    if (key === 'ArrowUp') {
      // console.log(key, speed);
      if (speed > 0 && speed <= 5) {
        if (speed > 0.3) {
          if (speed <= 0.5) {
            setSpeed(speed - 0.05);
          } else if (speed <= 1) {
            setSpeed(speed - 0.1);
          } else {
            setSpeed(speed - 0.5);
          }
        }
      } else {
        setSpeed(5);
      }
    }
  };

  const rightHandler = ({ key }: any) => {
    if (key === 'ArrowRight') {
      // console.log(key, left);
      if (left <= 70) {
        setLeft(left + 5);
      }
    }
  };

  const leftHandler = ({ key }: any) => {
    if (key === 'ArrowLeft') {
      // console.log(key, left);
      if (left >= 10) {
        setLeft(left - 5);
      }
    }
  };

  useEffect(() => {
    console.log(`${speed}s !important`);
    setSpeedProps(`${speed}s !important`);
  }, [speed]);

  useEffect(() => {
    if (arrowUp) {
      upHandler({ key: 'ArrowUp' });
    }
  }, [arrowUp]);

  useEffect(() => {
    if (arrowDown) {
      downHandler({ key: 'ArrowDown' });
    }
  }, [arrowDown]);

  useEffect(() => {
    if (arrowLeft) {
      leftHandler({ key: 'ArrowLeft' });
    }
  }, [arrowLeft]);

  useEffect(() => {
    if (arrowRight) {
      rightHandler({ key: 'ArrowRight' });
    }
  }, [arrowRight]);

  return (
    <div className="App">
      <div className="stage">
        <div className="bg"></div>
        <div className="controls">
          <div className="crossCenter">
            <div className="crossTop">
              <IoCaretUp />
            </div>
            <div className="crossBottom">
              <IoCaretDown />
            </div>
            <div className="crossLeft">
              <IoCaretBack />
            </div>
            <div className="crossRight">
              <IoCaretForward />
            </div>
            <div className="crossCircle"></div>
          </div>
        </div>
        <div className="car" style={{ left: `${left}%` }}>
          <img src={"/images/car1.png"} alt="car" />
        </div>
        <div className="road">
          <InfiniteRoad className="infinite">
            <div className="shadow"></div>
          </InfiniteRoad>
        </div>
      </div>
    </div>
  );
};

export default App;
