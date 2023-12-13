// targeted modal should be close when user clicks outside of it
// a way to access the modal in our hook
// a way to set the modal openner state and access it inside our hook
// how to trigger a modal close on document click?

import { useEffect } from "react";

export default function useOutsideClick(ref, exceptionId, callBack) {
  const handleOutsideClick = (e) => {
    if (
      ref.current &&
      !ref.current.contains(e.target) &&
      e.target.id !== exceptionId
    ) {
      callBack();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, callBack]);
}
// here we passed in our refrenced target to our function along side with an Id which is reffered to our modal and a callback function which is a state setter for our modal close event,
// then inside our useEffect,we pass in an event listener to our document which is mousedown,
// then on once that mousedown event is triggered,we call in an event handler 
// our event handler gets in an event,then makes sure our refrenced value which is extracted from useRef() exist,
// documents have id,so the next step taken is to make sure our refrenced value isnt the same one as our events targeted element,
// we also have an exception id passed in to our hook,with the help of our id we make sure that the current targeted//element that triggered our mousedown event doesnt have the same id as our exception id,
// which is the id of our modal,if that id matches the id of the element that triggered our event,
// it basically means that user has clicked on our modal since the id's matched,
// we dont want our modal to be closed once the user has clicked on it,we want it to be closed when the user has clicked anywhere else outside of our modal so we can close it,
// after making sure that all of our conditions our stable and none of the mentioned above conflicts have happended,
// we can call in our callback function which is the modal toggler state setter,we set that state to false and when the state is false the modal will be closed.
