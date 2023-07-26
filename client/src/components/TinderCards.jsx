import React, { useEffect, useMemo, useRef, useState } from "react";
import TinderCard from "react-tinder-card";
import {
  BackIco,
  CloseIco,
  FlashIco,
  HeartIco,
  StarIco,
  UpIco,
} from "../assets/icons";
import { ItemCard } from "./ItemCard";

const db = [
  {
    name: "mark",
    url: "https://i.sozcucdn.com/wp-content/uploads/2022/10/13/iecrop/zuckerberg-depophotos_16_9_1665652950.jpg?w=1200&h=900&mode=crop&scale=both",
  },
  {
    name: "elon",
    url: "https://m.bianet.org/system/uploads/1/articles/spot_image/000/269/528/original/elon_M.jpg",
  },
  {
    name: "bill",
    url: "https://imageio.forbes.com/specials-images/imageserve/62d599ede3ff49f348f9b9b4/0x0.jpg?format=jpg&crop=821,821,x155,y340,safe&height=416&width=416&fit=bounds",
  },
];

export default function TinderCards() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div className="overflow-hidden h-full w-full relative flex items-center justify-center ">
      <div className="flex justify-evenly flex-col relative  w-full items-center h-full overflow-hidden ">
        <div className="h-96 w-96">
          {db.map((x, index) => {
            const isTopCard =
              index === currentIndex
                ? ["up", "down"]
                : ["up", "down", "right", "left"];

            return (
              <TinderCard
                key={index}
                ref={childRefs[index]}
                className="absolute z-10 select-none swipe "
                preventSwipe={[...isTopCard]}
                onSwipe={(dir) => swiped(dir, x.name, index)}
                onCardLeftScreen={() => outOfFrame(x.name, index)}
                swipeThreshold={3}
              >
                <ItemCard item={x} />
              </TinderCard>
            );
          })}
        </div>
        <div className="flex z-50 justify-evenly w-full">
          <button onClick={() => goBack()} className="circleButton">
            <BackIco className="text-yellow-400 font-semibold" />
          </button>
          <button onClick={() => swipe("left")} className="circleButton">
            <CloseIco className="text-red-600 font-semibold" />
          </button>
          <button className="circleButton">
            <StarIco className="text-blue-400 font-semibold" />
          </button>
          <button onClick={() => swipe("right")} className="circleButton">
            <HeartIco className="text-green-500  font-semibold" />
          </button>
          <button className="circleButton">
            <FlashIco className="text-purple-600 font-semibold" />
          </button>
        </div>
      </div>
    </div>
  );
}
