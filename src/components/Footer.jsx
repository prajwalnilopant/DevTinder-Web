import React from "react";

const q = () => {
  return (
    <div>
      <footer className="fixed bottom-0 left-0 w-full footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by DevTinder Ltd.</p>
        </aside>
      </footer>
    </div>
  );
};

export default q;
