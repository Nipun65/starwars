import Image from "next/image";

const Card = ({ data, setActiveModalData, setShowModal }: any) => {
  const handleCardSelect = () => {
    setShowModal(true);
    setActiveModalData(data);
  };

  return (
    <div
      className={`border border-white w-80 rounded-md cursor-pointer transition duration-300 hover:shadow-lg group overflow-hidden`}
      onClick={handleCardSelect}
    >
      <div className="p-2">
        <div className="font-semibold text-xl text-[#ffe81f]">{data?.name}</div>
      </div>
      <Image
        src={data?.image}
        alt="star wars char"
        width={400}
        height={400}
        className="h-72 w-80 rounded-b-md group-hover:scale-110 transition duration-300 group-hover:-rotate-2"
      />
    </div>
  );
};
export default Card;
