import { FaStar } from "react-icons/fa";

const Star = ({ selected = false }) => {
  return <FaStar color={selected ? "yellow" : "grey"} />;
};

export default Star;
