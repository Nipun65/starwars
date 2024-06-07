import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { fetchHomeWorldInfo } from "../services";
import { Character, HomeWorld } from "../interfaces";
import Chip from "./Chip";
import Button from "./Button";
import ContentLoader from "./ContentLoader";
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

interface CharDetailsModalProps {
  data: Character | undefined;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const CharDetailsModal: React.FC<CharDetailsModalProps> = ({
  data,
  setShowModal,
}) => {
  const convertDateFormat = (date: string | undefined) => {
    if (date) {
      const dateVal = new Date(date);
      const dateStr = dateVal?.getDate();
      const month = dateVal?.getMonth() + 1;
      const year = dateVal?.getFullYear();
      return `${dateStr}-${month}-${year}`;
    }
  };

  const [homeWorldInfo, setHomeWorldInfo] = useState<HomeWorld>();

  const fetchHomeDetails = async () => {
    if (data) {
      const result: any = await fetchHomeWorldInfo(data?.homeworld);
      setHomeWorldInfo(result.data);
    }
  };

  useEffect(() => {
    fetchHomeDetails();
  }, [data?.homeworld]);

  useEffect(() => {
    const keyPressListener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    };

    document.addEventListener("keydown", keyPressListener);

    return () => {
      document.removeEventListener("keydown", keyPressListener);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center no-scroll">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none"
        onClick={() => setShowModal(false)}
      />
      <div className="relative bg-black p-6 rounded-lg w-[60%] overflow-auto max-h-[95%] border border-white/20">
        <div className="flex items-center justify-between">
          <h3 className="xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#ffe81f]">
            {data?.name}
          </h3>
          <Button onClick={() => setShowModal(false)}>
            <Image src={close} alt="close icon" className="size-6" />
          </Button>
        </div>
        <div className="mt-4 text-white">
          <div className="xs:flex-col lg:flex-row gap-6 flex justify-center xs:items-center lg:items-start">
            <Image
              src={data?.image || ""}
              alt="star wars char"
              width={400}
              height={400}
              className="h-72 w-96"
            />
            <div className="flex flex-col mt-2">
              <div className="flex flex-wrap text-sm gap-2 text-gray-500">
                <Chip tooltipContent="height">
                  <Image src={height} alt="height icon" className="size-4" />
                  <div>
                    {data?.height === "unknown"
                      ? "unknown"
                      : parseInt(data?.height as string) / 100}
                    &nbsp;
                    {data?.height !== "unknown" && "m"}
                  </div>
                </Chip>
                <Chip tooltipContent="mass">
                  <Image src={mass} alt="mass icon" className="size-4" />
                  <div>
                    {data?.mass}&nbsp;{data?.mass !== "unknown" && "kg"}
                  </div>
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
              <div className="mt-4">
                <p className="font-semibold text-xl mb-2">
                  Home World Information:
                </p>
                <div className="flex flex-wrap text-sm gap-2 text-gray-500">
                  <Chip tooltipContent="Name">
                    <Image src={name} alt="eye icon" className="size-4" />
                    {homeWorldInfo?.name ? (
                      <div>{homeWorldInfo?.name}</div>
                    ) : (
                      <ContentLoader />
                    )}
                  </Chip>
                  <Chip tooltipContent="Terrain">
                    <Image src={terrain} alt="cake icon" className="size-4" />
                    {homeWorldInfo?.terrain ? (
                      <div>{homeWorldInfo?.terrain}</div>
                    ) : (
                      <ContentLoader />
                    )}
                  </Chip>
                  <Chip tooltipContent="Climate">
                    <Image src={climate} alt="gender icon" className="size-4" />
                    {homeWorldInfo?.climate ? (
                      <div>{homeWorldInfo?.climate}</div>
                    ) : (
                      <ContentLoader />
                    )}
                  </Chip>
                  <Chip tooltipContent="Total Residents">
                    <Image
                      src={residents}
                      alt="residents icon"
                      className="size-4"
                    />
                    {homeWorldInfo?.residents?.length ? (
                      <div>{homeWorldInfo?.residents?.length}</div>
                    ) : (
                      <ContentLoader />
                    )}
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
