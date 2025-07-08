import type { T } from "$lib/server/db/index.js";
import { make_scrollable_section } from "$lib/shared.js";

export const data = [
    {
        id: "proposito-proyecto",
        title: "Propósito del Proyecto",
        content: "Este proyecto surge como el Trabajo Final Integrador de la asignatura Diseño de Experiencia de Usuario, parte de la Licenciatura en Informática en la Facultad de Informática de la Universidad Nacional de La Plata, Buenos Aires, Argentina.\n\nLa motivación principal detrás de su creación es la de ofrecer una perspectiva renovada y atractiva sobre uno de los eventos más significativos de la historia argentina: la Guerra de las Malvinas.\n\nEl objetivo central es fomentar el conocimiento y la comprensión de los sucesos, la cronología y los hechos ocurridos durante este conflicto, pero de una manera que se aleje de los formatos tradicionales.\n\nBuscamos presentar la información de forma entretenida, refrescante e interactiva, utilizando principios de UX para construir una experiencia de usuario que no solo informe, sino que también involucre y capte el interés del público.\n\nLa propuesta es una aproximación innovadora para abordar un tema de profunda relevancia histórica y cultural.",
        img_url: "/imgs/about/mapa_malvinas_bandera_argentina.webp",
        img_alt: "Mapa de las Islas Malvinas superpuesto con la bandera de Argentina, mostrando el sol en el centro del mapa.",
        img_width: 821,
        img_height: 587
    },
    {
        id: "apariencia",
        title: "Apariencia",
        content: "En cuanto al aspecto visual de este proyecto, se ha buscado deliberadamente una estética que refresque la percepción de frialdad, crudeza y precariedad que a menudo se asocia con el contexto de la Guerra de Malvinas. Para lograrlo, se optó por una paleta de colores dominada por tonos tierra cálidos y profundos, como el marrón oscuro, en lugar de los grises y azules fríos o los blancos austeros que suelen evocar la dureza de la guerra.\n\nEsta elección cromática no solo brinda una sensación de seriedad y respeto histórico, sino que también aporta una cualidad más humana y menos desoladora al diseño general.\n\nLa forma en que se presentan los elementos gráficos también contribuye a esta intención.\n\nLas imágenes y los mapas, si bien ilustran momentos del conflicto, están enmarcados o presentados con bordes suaves y orgánicos, incluso con un efecto de papel rasgado en algunas instancias, lo que suaviza el impacto visual de su contenido inherente.\n\nEste enfoque contrasta con la rigidez y el dramatismo que se podrían esperar, buscando en cambio una atmósfera más contemplativa y de reflexión.\n\nEn conjunto, cada decisión visual en el diseño de esta interfaz trabaja para trascender la representación tradicional de la guerra como algo meramente desolador.\n\nEn cambio, se propone una experiencia más digna y accesible, permitiendo al usuario acercarse a la historia desde una perspectiva que, sin ignorar la seriedad de los hechos, invita a la exploración y comprensión en un entorno visualmente más acogedor y menos abrumador.",
        img_url: "/imgs/about/cascos_malvinas_campo_batalla.png",
        img_alt: "Campo de batalla tras un combate en la Guerra de Malvinas, con decenas de cascos y equipamiento militar esparcidos sobre el pasto, mientras un soldado camina al fondo.",
        img_width: 642,
        img_height: 489
    },
    {
        id: "tipografia",
        title: "Tipografia",
        content: "En este proyecto de UX se han seleccionado dos tipografías complementarias: Lexend y OpenDyslexic, ambas elegidas por su enfoque centrado en la accesibilidad y la mejora de la legibilidad.\n\nLexend ha sido incorporada por su respaldo científico en la optimización del rendimiento lector. Esta fuente sans-serif minimiza el ruido cognitivo gracias a su diseño expandido, que facilita el reconocimiento de caracteres individuales y reduce el efecto de aglomeración visual. Su espaciado amplio y su condición de fuente variable permiten una personalización precisa, adaptándose a las necesidades de lectura de cada usuario, tal como lo haría una prescripción óptica.\n\nPor su parte, OpenDyslexic fue incluida especialmente por su utilidad en personas con dislexia. Esta tipografía presenta una base más pesada en los caracteres, lo que ayuda a anclar visualmente cada letra y evita la inversión o rotación de símbolos, dificultades comunes en usuarios con dislexia. Sus formas únicas y diferenciadas reducen la confusión entre letras similares, mejorando la experiencia de lectura inclusiva.\n\nLa combinación de Lexend y OpenDyslexic responde a un compromiso con la accesibilidad universal, permitiendo interfaces más claras, cómodas y adaptadas a una diversidad de estilos de lectura y capacidades visuales. Esto se alinea directamente con nuestros objetivos de UX, donde la comprensión y la comodidad visual del usuario son aspectos prioritarios.",
        img_url: "/imgs/about/muestra_variedades_tipograficas.png",
        img_alt: "Muestra de la palabra 'Fonts' en una variedad de estilos tipográficos, incluyendo serif, sans serif, script, decorativos y grunge, dispuestos en una cuadrícula sobre fondo claro.",
        img_width: 1024,
        img_height: 1024
    },
    {
        id: "accesibilidad-responsividad",
        title: "Accesibilidad y Responsividad",
        content: "Accesibilidad y Responsividad Más allá del contenido y la narrativa histórica, se ha puesto un énfasis fundamental en la experiencia técnica y visual del proyecto. El diseño de la interfaz ha sido concebido para ser completamente responsivo, lo que significa que la aplicación se adapta dinámicamente a cualquier tamaño de pantalla, ya sea un monitor de escritorio, una tableta o un teléfono móvil. Esto asegura que la información, la cronología y los elementos interactivos se presenten de manera óptima y legible, sin importar el dispositivo que el usuario elija, garantizando una experiencia fluida y consistente en todo momento.\n\nConjuntamente, la aplicación ha sido desarrollada con un firme compromiso con la accesibilidad. Se han implementado diversas medidas para asegurar que el contenido sea comprensible y utilizable por la mayor cantidad de personas posible. Esto incluye la cuidadosa selección de la tipografía, con Lexend y OpenDyslexic como fuentes principales.\n\nAdemás, los usuarios pueden ajustar el tamaño de la fuente y el espaciado de línea, permitiendo una experiencia personalizada según sus necesidades visuales. La garantía de contrastes de color adecuados entre el texto y el fondo, así como opciones de navegación accesibles tanto para mouse como para teclado, refuerzan este enfoque inclusivo.\n\nEstos aspectos de accesibilidad y responsividad no son meros añadidos, sino pilares esenciales que reflejan el propósito del proyecto: democratizar el acceso a la información histórica de una manera que sea inclusiva y cómoda para todos los usuarios.",
        img_url: "/imgs/about/soldados_argentinos_malvinas.png",
        img_alt: "Grupo de soldados argentinos posando durante la Guerra de Malvinas, vestidos con uniformes de combate y equipo de invierno en el terreno isleño.",
        img_width: 800,
        img_height: 450
    }
] satisfies Array<Omit<T.EventInsert, "date">>;

export const sections = data.map(make_scrollable_section);
