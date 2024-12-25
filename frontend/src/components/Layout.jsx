import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="">
        <Navbar></Navbar>
      </header>
      <main className="flex-grow flex item-center justify-center container min-h-screen mx-auto pt-5 mt-5">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}

export default Layout;
