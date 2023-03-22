import { AiOutlineClose } from "react-icons/ai";
import { useGetCategoriesQuery } from "@/redux/api/generalApi";
import { setExploreClose } from "@/redux/slices/appSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";

const ExploreModal = () => {
  const dispatch = useDispatch();

  const { data: categories } = useGetCategoriesQuery();

  return (
    <div className="fixed left-0 right-0 top-0 min-h-screen overflow-y-scroll bg-white z-10 ">
      <button
        onClick={() => dispatch(setExploreClose())}
        className="text-4xl pt-10 pl-20"
      >
        <AiOutlineClose />
      </button>

      <div className=" h-screen ">
        <ul className="md:text-center pl-20">
          {categories?.map((category) => (
            <li key={category.id} className="hover:scale-110 duration-300 p-5 text-2xl">
              <Link onClick={() => dispatch(setExploreClose())} href={`/category/${encodeURIComponent(category.slug)}`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExploreModal;
