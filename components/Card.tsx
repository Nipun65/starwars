import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Character } from "../interfaces";

interface CardProps {
  data: Character;
  setActiveModalData: Dispatch<SetStateAction<Character | undefined>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const Card: React.FC<CardProps> = ({
  data,
  setActiveModalData,
  setShowModal,
}) => {
  const handleCardSelect = () => {
    setShowModal(true);
    setActiveModalData(data);
  };

  return (
    <div
      className={`border border-white w-80 rounded-md cursor-pointer hover:shadow-lg group overflow-hidden`}
      onClick={handleCardSelect}
    >
      <div className="p-2">
        <div className="font-semibold text-xl text-[#ffe81f] group-hover:tracking-normal tracking-wider transition-all duration-300">
          {data?.name}
        </div>
      </div>
      <Image
        src={data?.image || ""}
        alt="star wars char"
        width={400}
        height={400}
        className="h-72 w-80 rounded-b-md group-hover:scale-110 transition duration-300 group-hover:-rotate-2"
        priority
      />
    </div>
  );
};
export default Card;
