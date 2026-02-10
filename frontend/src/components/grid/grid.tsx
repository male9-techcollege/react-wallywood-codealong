//import type React from "react";
import style from "./grid.module.scss";

interface GridProps {
    /* Previous version: 
    gtr?: number;
    gtc?: number;
    */
    gtr?: string;
    gtc?: string;
    gap: number;
    children: React.ReactNode;
};

export function Grid({ gtr, gtc, gap, children }: GridProps) {
    let cName

    if (gtc) {
        /* Other version of code-along: 
        cName = { gridTemplateColumns: `repeat(${gtc}, 1fr)`, gap: gap + "px" }
        */
        cName = { gridTemplateColumns: `${gtc}`, gap: gap + "px" }
    } else if (gtr) {
        /* Other version of code-along: 
        cName = { gridTemplateRows: `repeat(${gtr}, 1fr)`, gap: gap + "px" }
        */
        cName = { gridTemplateRows: `${gtr}`, gap: gap + "px" }
    } else {
        cName = { gridAutoFlow: "column", gap: gap + "px" }
    };

    return (
        <section className={style.gridStyle} style={cName}>
            {children}
        </section>
    );
};