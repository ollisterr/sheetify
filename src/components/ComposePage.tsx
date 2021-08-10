import React from "react";
import SheetBody from "./SheetBody";
import SheetSpecification from "./Specs";

export const ComposePage: React.FC = () => {
  return (
    <>
      <SheetSpecification />
      <SheetBody />
    </>
  );
};

export default ComposePage;
