import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchHomeWorldInfo } from "../services";
import Chip from "./Chip";
import height from "@/public/height.svg";
import mass from "@/public/weight.svg";
import gender from "@/public/gender.svg";
import eyecolor from "@/public/eyecolor.svg";
import skincolor from "@/public/skincolor.png";
import cake from "@/public/cake.svg";
import haircolor from "@/public/haircolor.svg";
import close from "@/public/close.svg";
import name from "@/public/name.svg";
import climate from "@/public/climate.svg";
import terrain from "@/public/terrain.svg";
import date from "@/public/date.svg";
import residents from "@/public/residents.svg";
import films from "@/public/films.svg";
import Button from "./Button";

const CharDetailsModal = ({ data, setshowModal }: any) => {
  const convertDateFormat = (date: string) => {
    const dateVal = new Date(date);
    const dateStr = dateVal?.getDate();
    const month = dateVal?.getMonth() + 1;
    const year = dateVal?.getFullYear();
    return `${dateStr}-${month}-${year}`;
  };
  const [homeWorldInfo, setHomeWorldInfo] = useState<any>({});

  const fetchHomeDetails = async () => {
    const result = await fetchHomeWorldInfo(data?.homeworld);
    setHomeWorldInfo(result.data);
  };

  useEffect(() => {
    fetchHomeDetails();
  }, [data?.homeworld]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none"
        onClick={() => setshowModal(false)}
      />
      <div className="relative bg-black p-6 rounded-lg w-[60%] overflow-auto max-h-[95%]">
        <div className="flex items-center justify-between">
          <h3 className="xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#ffe81f]">
            {data?.name}
          </h3>
          <Button onClick={() => setshowModal(false)}>
            <Image src={close} alt="close icon" className="size-6" />
          </Button>
        </div>
        <div className="mt-4 text-white">
          <div className="xs:flex-col lg:flex-row gap-6 flex justify-center items-center">
            <Image
              src={data?.image}
              alt="star wars char"
              width={400}
              height={400}
              className="h-72 w-96"
            />
            <div className="flex flex-col">
              <div className="flex flex-wrap text-sm gap-2 text-gray-500">
                <Chip tooltipContent="height">
                  <Image src={height} alt="height icon" className="size-4" />
                  <div>{data?.height}cm</div>
                </Chip>
                <Chip tooltipContent="mass">
                  <Image src={mass} alt="mass icon" className="size-4" />
                  <div>{data?.mass}kg</div>
                </Chip>
                <Chip tooltipContent="Hair Color">
                  <Image src={haircolor} alt="height icon" className="size-4" />
                  <div>{data?.hair_color}</div>
                </Chip>
                <Chip tooltipContent="Skin Color">
                  <Image src={skincolor} alt="skin icon" className="size-5" />
                  <div>{data?.skin_color}</div>
                </Chip>
                <Chip tooltipContent="Eye Color">
                  <Image src={eyecolor} alt="eye icon" className="size-5" />
                  <div>{data?.eye_color}</div>
                </Chip>
                <Chip tooltipContent="Birth Year">
                  <Image src={cake} alt="cake icon" className="size-4" />
                  <div>{data?.birth_year}</div>
                </Chip>
                <Chip tooltipContent="Gender">
                  <Image src={gender} alt="gender icon" className="size-4" />
                  <div>{data?.gender}</div>
                </Chip>
                <Chip tooltipContent="Date">
                  <Image src={date} alt="date icon" className="size-4" />
                  <div>{convertDateFormat(data?.created)}</div>
                </Chip>
                <Chip tooltipContent="Total Films">
                  <Image src={films} alt="films icon" className="size-4" />
                  <div>{data?.films?.length || 0}</div>
                </Chip>
              </div>
              <div className="my-2">
                <p className="font-semibold text-xl mb-2">
                  Home World Information:
                </p>
                <div className="flex flex-wrap text-sm gap-2 text-gray-500">
                  <Chip tooltipContent="Name">
                    <Image src={name} alt="eye icon" className="size-4" />
                    <div>{homeWorldInfo?.name}</div>
                  </Chip>
                  <Chip tooltipContent="Terrain">
                    <Image src={terrain} alt="cake icon" className="size-4" />
                    <div>{homeWorldInfo?.terrain}</div>
                  </Chip>
                  <Chip tooltipContent="Climate">
                    <Image src={climate} alt="gender icon" className="size-4" />
                    <div>{homeWorldInfo?.climate}</div>
                  </Chip>
                  <Chip tooltipContent="Total Residents">
                    <Image
                      src={residents}
                      alt="residents icon"
                      className="size-3"
                    />
                    <div>{homeWorldInfo?.residents?.length}</div>
                  </Chip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CharDetailsModal;
