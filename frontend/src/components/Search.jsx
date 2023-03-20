import { AiOutlineClose } from "react-icons/ai";
import { setSearchClose } from "@/redux/slices/appSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";

const Search = () => {
  const dispatch = useDispatch();

  return (
    <div className="fixed left-0 right-0 top-0 min-h-screen overflow-y-scroll bg-white z-10 ">
      <button
        onClick={() => dispatch(setSearchClose())}
        className="text-4xl pt-10 pl-20"
      >
        <AiOutlineClose />
      </button>

      <div className=" h-screen ">
      </div>
    </div>
  );
};

export default Search;
