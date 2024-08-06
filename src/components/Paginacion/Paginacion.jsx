import "./Paginacion.css";
import { PAGINACIONOFF } from "../../utils/utils";

export const Paginacion = ({
  theme,
  backPage,
  nextPage,
  classBack,
  classNext,
  disabledBackButton,
  disabledNextButton,
  countPage,
  paginacionOff
}) => {

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
