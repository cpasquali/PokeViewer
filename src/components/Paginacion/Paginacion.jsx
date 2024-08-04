import React from "react";

export const Paginacion = ({
  theme,
  backPage,
  nextPage,
  classBack,
  classNext,
  disabledBackButton,
  disabledNextButton,
  countPage,
}) => {
  return (
    <section className={`paginacion ${theme}`}>
      <button
        onClick={backPage}
        className={`btn ${classBack} ${theme}`}
        disabled={disabledBackButton}
      >
        Back
      </button>
      <p>{countPage}</p>
      <button
        onClick={nextPage}
        className={`btn ${classNext} ${theme}`}
        disabled={disabledNextButton}
      >
        Next
      </button>
    </section>
  );
};
