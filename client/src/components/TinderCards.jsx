import React, { useMemo, useRef, useState } from "react";
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
import toast, { Toaster } from "react-hot-toast";

const notify = (user) => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-10 w-10 rounded-full"
                src={user.avatar}
                alt=""
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-bold  text-gray-900">
                You just matched with someone.
              </p>
              <p className="mt-1 text-sm text-gray-800">{user.fullName}</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss("notifyToast")}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ),
    {
      id: "notifyToast",
    }
  );
};

export default function TinderCards({ db, triggerFetch, setResponse }) {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [deletedItems, setDeletedItems] = useState([]);
  const currentIndexRef = useRef(currentIndex);
  const { user } = useAuthContext();

  const swipePost = async (dir, OtherUserId) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}api/users/Swipe/${dir}`,
        {
          otherUserId: OtherUserId,
          id: user._id,
        }
      );

      if (res.data.match) {
        notify(res.data.user);
      }
    } catch (err) {
      console.log(err);
    }
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

  const canSwipe = currentIndex >= 0;

  const swiped = (index) => {
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
    updateCurrentIndex(+newIndex);
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
                  onSwipe={(dir) => swiped(index)}
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
      <Toaster />
    </div>
  );
}
