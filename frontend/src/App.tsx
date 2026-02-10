import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "./pages/home/home";
import { MainLayout } from "./layouts/mainLayout";
import { Posters } from "./pages/posters/posters";
import { Login } from "./pages/login/Login";
import { Details } from "./pages/details/Details";
function App() {
  
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* This route component corresponds to the Outlet component in a layout */}
                    <Route element={<MainLayout />}>
                        <Route index element={<Home />} />
                        {/* Temporary, for testing purposes 
                        <Route path="/about" element={<div>Om os</div>} />
                        <Route path="/posters" element={<div>Plakater</div>} />
                        <Route path="/contact" element={<div>Kontakt os</div>} />
                        <Route path="/login" element={<div>Log ind</div>} />
                        */}
                        <Route path="/about" element={<div>Om os</div>} />
                        <Route path="/posters" element={<Posters />} />
                        {/* Documentation from teacher's version of code-along: 
                        Details siden har fået et query param på. Dette gøres med /:slug på enden af en url.
                        Navigerer vi til /details/123 vil vores slug blive sat til 123.
                        Derfor kan vi nu sætte en slug i vores NavLinks path (eks. /details/masterminds).
                        og bruge useParams hooket til at trække slug (masterminds) ud inde i detalje siden
                        */}
                        <Route path='/details/:slug' element={<Details />} />
                        <Route path="/contact" element={<div>Kontakt os</div>} />
                        <Route path="/login" element={<Login />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
