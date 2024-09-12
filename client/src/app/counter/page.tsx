// src/app/testpage/page.tsx

"use client";

import ReduxProvider from "@/components/ReduxProvider";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { increment, decrement } from "@/store/slices/counterSlice";
import { Button } from "@/components/Button";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const incrementOnClick = () => dispatch(increment());
  const decrementOnClick = () => dispatch(decrement());

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Counter</h1>
      <p className="text-2xl mb-4">Current Count: {count}</p>
      <div className="flex space-x-4">
        <Button onClickHandler={incrementOnClick} buttonText="Increment" />
        <Button onClickHandler={decrementOnClick} buttonText="Decrement" />
      </div>
    </div>
  );
};

export default function CounterWithRedux() {
  return (
    <ReduxProvider>
      <Counter />
    </ReduxProvider>
  );
}
