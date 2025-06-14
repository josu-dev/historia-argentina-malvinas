import type { T } from "$lib/server/db/index.js";
import { make_scrollable_section } from "$lib/shared.js";

export const data = [
    {
        id: "1",
        title: "Propósito del Proyecto",
        content: "Este proyecto surge como el Trabajo Final Integrador de la asignatura Diseño de Experiencia de Usuario, parte de la Licenciatura en Informática en la Facultad de Informática de la Universidad Nacional de La Plata, Buenos Aires, Argentina. La motivación principal detrás de su creación es la de ofrecer una perspectiva renovada y atractiva sobre uno de los eventos más significativos de la historia argentina: la Guerra de las Malvinas. El objetivo central es fomentar el conocimiento y la comprensión de los sucesos, la cronología y los hechos ocurridos durante este conflicto, pero de una manera que se aleje de los formatos tradicionales. Buscamos presentar la información de forma entretenida, refrescante e interactiva, utilizando principios de UX para construir una experiencia de usuario que no solo informe, sino que también involucre y capte el interés del público. La propuesta es una aproximación innovadora para abordar un tema de profunda relevancia histórica y cultural.",
        img_url: "/imgs/about/malvinas_son_argentinas.png",
        img_alt: "a",
        img_height: 421,
        img_width: 789
    },
    {
        id: "2",
        title: "Apariencia",
        content: "En cuanto al aspecto visual de este proyecto, se ha buscado deliberadamente una estética que refresque la percepción de frialdad, crudeza y precariedad que a menudo se asocia con el contexto de la Guerra de Malvinas. Para lograrlo, se optó por una paleta de colores dominada por tonos tierra cálidos y profundos, como el marrón oscuro, en lugar de los grises y azules fríos o los blancos austeros que suelen evocar la dureza de la guerra. Esta elección cromática no solo brinda una sensación de seriedad y respeto histórico, sino que también aporta una cualidad más humana y menos desoladora al diseño general. La forma en que se presentan los elementos gráficos también contribuye a esta intención. Las imágenes y los mapas, si bien ilustran momentos del conflicto, están enmarcados o presentados con bordes suaves y orgánicos, incluso con un efecto de papel rasgado en algunas instancias, lo que suaviza el impacto visual de su contenido inherente. Este enfoque contrasta con la rigidez y el dramatismo que se podrían esperar, buscando en cambio una atmósfera más contemplativa y de reflexión. En conjunto, cada decisión visual en el diseño de esta interfaz trabaja para trascender la representación tradicional de la guerra como algo meramente desolador. En cambio, se propone una experiencia más digna y accesible, permitiendo al usuario acercarse a la historia desde una perspectiva que, sin ignorar la seriedad de los hechos, invita a la exploración y comprensión en un entorno visualmente más acogedor y menos abrumador.",
        img_url: "/imgs/about/cascos_tirados.png",
        img_alt: "a",
        img_height: 421,
        img_width: 789
    },
    {
        id: "3",
        title: "Tipografia",
        content: "En cuanto a la tipografía, se ha seleccionado la fuente Lexend para este proyecto de UX por su enfoque científicamente respaldado en mejorar la legibilidad y optimizar el rendimiento de la lectura. La decisión se basa en cómo Lexend aborda directamente los factores tipográficos que comúnmente dificultan la experiencia de usuario. Sus características clave, como el uso de una fuente sans-serif para minimizar el ruido cognitivo y una escala expandida que mejora el reconocimiento individual de los caracteres, son fundamentales para construir interfaces más claras y accesibles. Además, la hiper-expansión del espaciado entre caracteres de Lexend es crucial, ya que reduce el efecto de aglomeración y enmascaramiento, lo que resulta en una lectura más fluida y menos agotadora para el usuario. Un beneficio adicional es que Lexend es una fuente variable, lo que permite una personalización precisa de los ajustes tipográficos, adaptándose a las necesidades visuales de cada usuario de manera similar a una prescripción de gafas. Estas propiedades son directamente aplicables a nuestro objetivo de UX, donde la facilidad de comprensión y la comodidad visual son prioritarias.",
        img_url: "/imgs/about/lexend.png",
        img_alt: "a",
        img_height: 421,
        img_width: 789
    },
    {
        id: "4",
        title: "Accesibilidad y Responsividad",
        content: "Más allá del contenido y la narrativa histórica, se ha puesto un énfasis fundamental en la experiencia técnica y visual del proyecto. El diseño de la interfaz ha sido concebido para ser completamente responsivo, lo que significa que la aplicación se adapta dinámicamente a cualquier tamaño de pantalla, ya sea un monitor de escritorio, una tableta o un teléfono móvil. Esto asegura que la información, la cronología y los elementos interactivos se presenten de manera óptima y legible, sin importar el dispositivo que el usuario elija, garantizando una experiencia fluida y consistente en todo momento. Conjuntamente, la aplicación ha sido desarrollada con un firme compromiso con la accesibilidad. Se han implementado diversas medidas para asegurar que el contenido sea comprensible y utilizable por la mayor cantidad de personas posible. Esto incluye la cuidadosa selección de la tipografía (como Lexend, por su probada legibilidad), la garantía de contrastes de color adecuados entre el texto y el fondo para usuarios con diferentes capacidades visuales, y la consideración de opciones de navegación que permitan el uso no solo con un mouse, sino también mediante el teclado. Además, se han incorporado funcionalidades clave como la capacidad de Texto a Voz para permitir que el contenido sea escuchado, y la opción de cambiar el tamaño de la fuente, facilitando así la lectura para usuarios con diversas necesidades visuales. Estos aspectos de diseño responsivo y accesibilidad no son meros añadidos, sino pilares esenciales que refuerzan el propósito del proyecto: democratizar el acceso a la información histórica de una manera que sea inclusiva y cómoda para todos los usuarios. Asegurar que la aplicación sea usable por personas con diversas capacidades y en distintas plataformas subraya el compromiso con una experiencia de usuario verdaderamente integral y equitativa.",
        img_url: "/imgs/about/soldados_malvinas.png",
        img_alt: "a",
        img_height: 421,
        img_width: 789
    }
] satisfies Array<Omit<T.EventInsert, "date">>;

export const sections = data.map(make_scrollable_section);
