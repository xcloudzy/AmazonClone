import React, { useContext } from "react";
import { Logincontext } from "../context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Option = ({ deletedata, get }) => {
  const { account, setAccount } = useContext(Logincontext);

  const removedata = async (id) => {
    try {
      const res = await fetch(`/remove${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (res.status === 400 || !data) {
        console.log("error");
      } else {
        setAccount(data);
        get();
        toast.success("Item removed from cart 😃!", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add_remove_select" key={deletedata}>
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <p style={{ cursor: "pointer" }} onClick={() => removedata(deletedata)}>
        Delete
      </p>
      <span>|</span>
      <p className="forremovemedia">Save for later</p> <span>|</span>
      <p className="forremovemedia">See more like this</p>
      <ToastContainer />
    </div>
  );
};

export default Option;
