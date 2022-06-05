import React from "react";

export default function Projector({ children }) {
  const [activeSlideIndex, setActiveSlideIndex] = React.useState(0);
  const getTabProps = ({ index, ...rest }) => {
    return {
      role: "tab",
      "aria-selected": activeSlideIndex === index,
      onClick: () => {
        setActiveSlideIndex(index);
      },
      ...rest,
    };
  };
  const getSlideProps = ({ ...rest }) => {
    return { role: "tabpanel", "aria-roledescription": "slide", ...rest };
  };
  return children({ getSlideProps, getTabProps });
}
