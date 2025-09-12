import "./Paginacion.css";

export const Paginacion = ({ currentPage, setCurrentPage }) => {
  return (
    <section className="paginacion">
      <button onClick={() => setCurrentPage((prev) => prev - 1)}>Back</button>
      <p>{currentPage}</p>
      <button onClick={() => setCurrentPage((prev) => prev + 1)}>Next</button>
    </section>
  );
};
