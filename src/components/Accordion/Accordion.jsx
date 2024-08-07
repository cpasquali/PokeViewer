import React from 'react'

export const Accordion = () => {
  return (
    <div className="accordion accordion-flush" id="accordionFlushExample">
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
          INFO POKEVIEWER
        </button>
      </h2>
      <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div className="accordion-body">PokeViewer es una página web que utiliza la API de Pokémon para mostrar una lista de Pokémon. Permite añadir Pokémon a favoritos, ver detalles de estadísticas y habilidades, y buscar Pokémon específicos. Incluye paginación, un selector de tipo, un menú flotante para acceder a los favoritos, y una opción para alternar entre modo oscuro y claro. Tanto los Pokémon favoritos como el tema seleccionado se guardan en el almacenamiento local del navegador, asegurando que la información se conserve entre sesiones.</div>
      </div>
    </div>
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
          TECNOLOGIAS UTILIZADAS
        </button>
      </h2>
      <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div className="accordion-body">
            <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>Bootstrap</li>
                <li>JavaScript</li>
                <li>React</li>
                <li>LocalStorage</li>
                <li>API de Pokémon</li>
            </ul>
            </div>
      </div>
    </div>
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
          INFO EXTRA
        </button>
      </h2>
      <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div className="accordion-body">El despliegue del proyecto se realizó a través de Vercel. Se utilizó Git para el control de versiones, y el repositorio del proyecto está disponible en GitHub. Puedes encontrar el enlace a continuación <a target='_blank' href="https://github.com/cpasquali/PokeViewer">Click al repo</a></div>
      </div>
    </div>
  </div>
  )
}
