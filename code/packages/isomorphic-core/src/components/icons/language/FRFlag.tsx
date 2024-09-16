import flag from "@public/flags/flag-fr.svg";
import Image from "next/image";
export const FRFlag: React.FC<React.SVGAttributes<{}>> = ({ ...rest }) => {
  return <Image src={flag} alt={"flag french"} />;
};
