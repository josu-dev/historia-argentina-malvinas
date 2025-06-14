import type { T } from "$lib/server/db/index.js";
import { make_event_section } from "$lib/shared.js";

export const data = [
    {
        id: "event_1",
        title: "Crisis de los Chatarreros",
        date: "1982-03-19",
        img_url: "/imgs/events/barcaza_de_desembarco.png",
        img_width: 1200,
        img_height: 800,
        img_alt: "Attendees at an AI conference",
        content: "El conflicto comienza el 19 de marzo de 1982, cuando un grupo de civiles argentinos, liderados por Constantino Davidoff, desembarcó en las Islas Georgias del Sur, territorio británico, con la intención de desmantelar una antigua estación ballenera.. El izado de la bandera argentina en el lugar provocó la reacción británica, que interpretó el hecho como una provocación a su soberanía.. Esto generó un aumento de la tensión diplomática y militar entre ambos países, escalando rápidamente hacia un conflicto armado.. La acción de los 'chatarreros' fue el detonante que encendió la mecha de la guerra de Malvinas, al precipitar la decisión del gobierno argentino de intentar recuperar las islas por la fuerza."
    },
    {
        id: "event_2",
        title: "Operación Rosario",
        date: "1982-04-02",
        img_url: "/imgs/events/operacion_rosario.png",
        img_width: 1920,
        img_height: 1080,
        img_alt: "Code on a computer screen with charts",
        content: "La Operación Rosario fue el nombre clave del desembarco argentino en las Islas Malvinas el 2 de abril de 1982.. Esta acción militar, ejecutada por las Fuerzas Armadas Argentinas, tenía como objetivo la recuperación de las islas, que se encontraban bajo control británico.. El desembarco fue exitoso y relativamente rápido, con una resistencia británica limitada, lo que permitió a Argentina tomar el control de la capital, Puerto Stanley (rebautizada como Puerto Argentino).. Este evento marcó el inicio de la guerra de Malvinas, generando una condena internacional y la movilización de las fuerzas británicas para recuperar el territorio."
    },
    {
        id: "event_3",
        title: "Negociaciones Diplomaticas",
        date: "1982-04-08",
        img_url: "/imgs/events/discurso_de_galtieri.png",
        img_width: 800,
        img_height: 600,
        img_alt: "Wind turbines and solar panels at sunset",
        content: "Tras el desembarco argentino, se iniciaron intensas negociaciones diplomáticas para buscar una solución pacífica al conflicto.. La ONU, a través del Secretario General Javier Pérez de Cuéllar, desempeñó un papel activo en la mediación.. Se propusieron diversas iniciativas, como un plan de paz peruano, que buscaban el retiro de las fuerzas argentinas y la suspensión de las operaciones británicas, para luego retomar las negociaciones sobre la soberanía.. Sin embargo, estas negociaciones fueron complejas y no lograron un acuerdo, debido a la intransigencia de ambas partes sobre la cuestión de la soberanía de las islas.. Argentina insistía en el reconocimiento de su soberanía como condición para cualquier retiro, mientras que el Reino Unido exigía el retiro incondicional de las fuerzas argentinas antes de considerar cualquier negociación.. La falta de consenso llevó al fracaso de los esfuerzos diplomáticos y a la continuación de las hostilidades, intensificando el conflicto armado en el Atlántico Sur."
    },
    {
        id: "event_4",
        title: "Preocupación",
        date: "1982-05-23",
        img_url: "/imgs/events/d-108_cardiff.png",
        img_width: 1600,
        img_height: 900,
        img_alt: "Rocket launching into space",
        content: "Con el 17 de mayo, y con el 21 de mayo, los argentinos pierden 3 aviones de transporte y 1 de combate, respectivamente, en dos días seguidos.. En los días que siguen, el 23 de mayo, 24 de mayo y 25 de mayo, siguen las pérdidas.. Los ingleses ya controlan el cielo y la entrada a la bahía de San Carlos.. El general de división Jeremy Moore estableció un puesto de mando en el Establecimiento Agrícola de San Carlos.. El ejército argentino ya sabe que la Fuerza Aérea Argentina no puede oponerse de manera significativa a los ataques británicos.. Esta situación genera una profunda preocupación en el alto mando argentino, que ve cómo sus posibilidades de mantener el control de las islas se reducen drásticamente.. La superioridad aérea británica y la consolidación de su cabeza de playa en San Carlos presagian un desenlace desfavorable para las tropas argentinas."
    }
] satisfies Array<T.EventInsert>;

export const sections = data.map(make_event_section);
