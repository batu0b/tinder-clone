import React, { useEffect, useMemo, useRef, useState } from "react";
import TinderCard from "react-tinder-card";
import {
  BackIco,
  CloseIco,
  FlashIco,
  HeartIco,
  ReloadIco,
  StarIco,
} from "../assets/icons";
import { ItemCard } from "./ItemCard";
import { useAuthContext } from "../context/AuthContext/AuthContext";
import axios from "axios";
import PapperPlane from "./animated/PapperPlane";

export default function TinderCards({ db, triggerFetch, setResponse }) {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [deletedItems, setDeletedItems] = useState([]);
  const currentIndexRef = useRef(currentIndex);
  const { user } = useAuthContext();

  const swipePost = async (dir, OtherUserId) => {
    const res = await axios.post(
      `http://localhost:5000/api/users/Swipe/${dir}`,
      {
        otherUserId: OtherUserId,
        id: user._id,
      }
    );

    console.log(res);
  };

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    [db]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  const swiped = (direction, nameToDelete, index) => {
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = async (dir, name, id, idx) => {
    setResponse((prevResponse) =>
      prevResponse.filter((item) => item._id !== id)
    );
    const deletedItem = db[idx];
    setDeletedItems((prev) => {
      const newItems = [...prev];
      if (newItems.length === 2) {
        newItems.shift();
      }
      return [...newItems, deletedItem];
    });
    console.log(`${name} (${id}) ${dir} the screen!`, currentIndexRef.current);
    await swipePost(dir, id);
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const goBack = async () => {
    if (deletedItems.length <= 0) return;
    const lastSwipedItem = deletedItems[deletedItems.length - 1];
    setDeletedItems((prevItems) => prevItems.slice(0, -1));
    await setResponse((prev) => [...prev, lastSwipedItem]);
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
  };

  return (
    <div className="overflow-hidden h-full w-full relative flex items-center justify-center ">
      <div className="flex justify-evenly flex-col relative  w-full items-center h-full overflow-hidden ">
        <div className="h-96 w-96">
          {db.length > 0 ? (
            db.map((x, index) => {
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
                  onSwipe={(dir) => swiped(dir, x.fullName, index, x._id)}
                  onCardLeftScreen={(dir) =>
                    outOfFrame(dir, x.fullName, x._id, index)
                  }
                  swipeThreshold={3}
                >
                  <ItemCard item={x} />
                </TinderCard>
              );
            })
          ) : (
            <div className="flex  flex-col justify-center items-center gap-3">
              <PapperPlane />
              <h4 className="font-bold max-w-full text-center break-normal whitespace-pre-wrap">
                Oops no one new in sight at the moment you might want to refresh
              </h4>
              <button
                onClick={triggerFetch}
                type="button"
                className="circleButton"
              >
                <ReloadIco />
              </button>
            </div>
          )}
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
