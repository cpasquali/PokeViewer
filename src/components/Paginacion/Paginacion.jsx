import "./Paginacion.css";
import { PAGINACIONOFF } from "../../utils/utils";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

export const Paginacion = ({
  backPage,
  nextPage,
  classBack,
  classNext,
  disabledBackButton,
  disabledNextButton,
  countPage,
  paginacionOff
}) => {

  const {theme} = useContext(ThemeContext)
  const classPaginacion = paginacionOff ? PAGINACIONOFF.TRUE : `paginacion ${theme}`

  return (
    <section className={classPaginacion}>
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
