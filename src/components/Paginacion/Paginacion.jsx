import "./Paginacion.css";
import { PAGINACIONOFF } from "../../utils/utils";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { SelectLenguajeContext } from "../../context/SelectLenguajeContext";

export const Paginacion = ({
  backPage,
  nextPage,
  classBack,
  classNext,
  disabledBackButton,
  disabledNextButton,
  countPage,
  paginacionOff,
}) => {
  const { theme } = useContext(ThemeContext);
  const classPaginacion = paginacionOff
    ? PAGINACIONOFF.TRUE
    : `paginacion ${theme}`;
  const { lenguaje } = useContext(SelectLenguajeContext);

  if (lenguaje === "english") {
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
  } else {
    return (
      <section className={classPaginacion}>
        <button
          onClick={backPage}
          className={`btn ${classBack} ${theme}`}
          disabled={disabledBackButton}
        >
          Anterior
        </button>
        <p>{countPage}</p>
        <button
          onClick={nextPage}
          className={`btn ${classNext} ${theme}`}
          disabled={disabledNextButton}
        >
          Siguiente
        </button>
      </section>
    );
  }
};
