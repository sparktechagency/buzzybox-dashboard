import React from "react";

const ButtonEDU = ({ actionType, onClick }) => {
  const getButtonStyles = () => {
    switch (actionType) {
      case "cancel":
        return "bg-transparent text-[#FFC301] w-28 h-10 rounded-md border border-[#FFC301] transition-all duration-300 hover:bg-[#FFC301] hover:text-white";
      case "delete":
        return "bg-red-600 text-white w-28 h-10 rounded-md border border-red-600 hover:border-red-500 hover:bg-red-500 transition-all duration-300";
      case "save":
        return "bg-[#FFC301] text-white w-28 h-10 rounded-md border border-[#FFC301] transition-all duration-300 hover:bg-transparent hover:text-[#FFC301]";
      case "update":
        return "bg-[#FFC301] text-white w-28 h-10 rounded-md border border-[#FFC301] transition-all duration-300 hover:bg-transparent hover:text-[#FFC301]";
      default:
        return "bg-transparent text-[#FFC301] w-28 h-10 rounded-md border border-[#FFC301] transition-all duration-300 hover:bg-[#FFC301] hover:text-white";
    }
  };

  return (
    <button className={getButtonStyles()} onClick={onClick}>
      {actionType.charAt(0).toUpperCase() + actionType.slice(1)}
    </button>
  );
};

export default ButtonEDU;
