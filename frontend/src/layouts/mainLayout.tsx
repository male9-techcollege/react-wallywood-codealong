import { Outlet } from "react-router";
import { Navbar } from "../components/nav/navbar";
import style from "./mainLayout.module.scss";
import { Footer } from "../components/footer/footer";
import { createRef, useEffect, useState } from "react";
import { ScrollBar } from "../components/ScrollBar/ScrollBar";

export function MainLayout() {
    // Opret en reference til et DOM element (bindes til et element nede i HTML'en)
    /* "createRef
    Pitfall
    createRef is mostly used for class components. Function components typically rely on useRef instead. (...)
    Returns 
    createRef returns an object with a single property:
    - current: Initially, it’s set to the null. You can later set it to something else. If you pass the ref object to React as a ref attribute to a JSX node, React will set its current property.
    Caveats 
    - createRef always returns a different object. It’s equivalent to writing { current: null } yourself.
    - In a function component, you probably want useRef instead which always returns the same object."
    https://react.dev/reference/react/createRef */
    const containerRef = createRef<HTMLElement>()

    // State til at gemme scroll percent
    const [scrollPercent, setScrollPercent] = useState<number>(0)

    useEffect(() => {
        // Funktion der udregner procent scrollet
        function scrollListener() {
            /* "The read-only scrollY property of the Window interface returns the number of pixels by which the document is 
            currently scrolled vertically. (...)
            You can get the number of pixels the document is scrolled horizontally from the scrollX property."
            https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
            */
            const scrollY = window.scrollY

            /* "What is useRef, and when should you use it?
            useRef creates a reference to a DOM element or a mutable value that persists across renders without triggering re-renders.
            const inputRef = useRef(null);
            You can use inputRef.current to access the referenced value or element." 
            https://souvikmajumder31.medium.com/full-stack-developer-interview-questions-2024-part-1-react-js-fb2a413099d0
            */
            if (!containerRef.current) return
            else {
                /* "The Element.getBoundingClientRect() method returns a DOMRect object providing information about the size of an element and its position relative to the viewport."
                https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
                "The height property of the HTMLObjectElement interface Returns a string that reflects the height HTML attribute, specifying the displayed height of the resource in CSS pixels."
                https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/height
                "The read-only innerHeight property of the Window interface returns the interior height of the window in pixels, including the height of the horizontal scroll bar, if present. (...)
                The width can be obtained using the innerWidth property."
                https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight */
                const maxHeight = containerRef.current.getBoundingClientRect().height - window.innerHeight

                /* "The Math.round() static method returns the value of a number rounded to the nearest integer."
                https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round */
                const percent = Math.round((scrollY / maxHeight) * 100)

                setScrollPercent(percent)
            }
        }

        // Bind en "scroll" eventListener til browserens vindue
        window.addEventListener('scroll', scrollListener)

        // Fjern event listener når vi "un-mounter"
        return () => window.removeEventListener('scroll', scrollListener)
    }, [containerRef]);

    const links = [
        { name: "Forside", path: "/" },
        { name: "Plakater", path: "/posters" },
        { name: "Om os", path: "/about" },
        { name: "Kontakt os", path: "/contact" },
        { name: "Log ind", path: "/login" }
    ];

    return (
        <>
            {/* Her sættes ref på vores yderste container (da vi skal bruge højden af siden) */}
            <section ref={containerRef} className={style.pageContainer}>
                <ScrollBar scrollPercent={scrollPercent} />
                <Navbar navLogo={"Wallywood"} navLinks={links} />
                <Outlet />
                <Footer />
            </section>
        </>
    );
};