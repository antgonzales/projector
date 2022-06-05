import React from "react";

export default function Projector({ children }) {
  const [activeSlideIndex, setActiveSlideIndex] = React.useState(0);
  const getTabControlsProps = ({ index, ...rest }) => {
    const position = index + 1;
    return {
      "aria-controls": "slide-" + index,
      "aria-label": "Slide " + position,
      "aria-selected": activeSlideIndex === index,
      role: "tab",
      id: "projector-tab-" + index,
      onClick: () => {
        setActiveSlideIndex(index);
      },
      ...rest,
    };
  };
  const getSlideProps = ({ index, total, ...rest }) => {
    return {
      role: "tabpanel",
      "aria-roledescription": "slide",
      "aria-label": `${index + 1} of ${total}`,
      id: "slide-" + index,
      ...rest,
    };
  };
  return children({ getSlideProps, getTabControlsProps });
}
