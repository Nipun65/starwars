import Image from "next/image";
import starwarslogo from "@/public/starwars.svg";

const Header = () => {
  return (
    <div className="w-full">
      <Image
        src={starwarslogo}
        height={200}
        width={400}
        alt="star wars logo"
        className="size-28 py-4 mx-4"
      />
    </div>
  );
};
export default Header;
