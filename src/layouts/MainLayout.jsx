// import { Outlet } from 'react-router-dom'
// import Navbar from '../components/Shared/Navbar/Navbar'
// import Footer from '../components/Shared/Footer/Footer'
// const MainLayout = () => {
//   return (
//     <div className='bg-white'>
//       <Navbar />
//       <div className='pt-24 min-h-[calc(100vh-68px)]'>
//         <Outlet />
//       </div>
//       <Footer />
//     </div>
//   )
// }

// export default MainLayout
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";

const MainLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the modal
    const hasSeenModal = localStorage.getItem("hasSeenModal");

    if (!hasSeenModal) {
      setIsModalOpen(true); // Open modal for the first-time visit
    }
  }, []);

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
    localStorage.setItem("hasSeenModal", "true"); // Set flag in localStorage
  };

  return (
    <div className="bg-white">
      <Navbar />
      <div className="pt-24 min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>
      <Footer />

      {/* Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="font-bold text-lg">Welcome to the Application!</h2>
            <p className="py-4">
              This is a one-time welcome message that will not appear again.
            </p>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={closeModal}>
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
