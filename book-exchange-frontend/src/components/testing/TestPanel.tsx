import { useState, useRef, useEffect } from "react";
import { ApiHook } from "../../hooks/useAPI";
import { useNavigate } from "react-router-dom";

export default function TestPanel() {
  const [isExpanded, setIsExpanded] = useState(true); // Manage expanded/collapsed state
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 600 });
  const panelRef = useRef<HTMLDivElement | null>(null);
  const api = new ApiHook("/api/users/auth/kickAll");
  const { update, loading } = api.useUpdate("");
  const navigate = useNavigate();

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const panel = panelRef.current;
      if (panel) {
        const newX = e.clientX - panel.offsetWidth / 2;
        const newY = e.clientY - panel.offsetHeight / 2;
        setPosition({ x: newX, y: newY });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleKickAll = async () => {
    try {
      const result = await update({});
      console.log("Result", result);
      alert("All users have been logged out");
      localStorage.removeItem("authToken");
      navigate("/login");
    } catch (error) {
      console.error("Error kicking all users", error);
      alert("Failed to log out all users");
    }
  };

  return (
    <div>
      {isExpanded ? (
        <div
          ref={panelRef}
          className="absolute z-20 min-w-[400px] border shadow-lg bg-white p-4 flex flex-col items-center"
          style={{
            top: `${position.y}px`,
            left: `${position.x}px`,
            cursor: "move",
          }}
          onMouseDown={handleMouseDown}
        >
          <div className="flex flex-row w-full my-4 relative justify-center">
            <h1>Testing Panel</h1>
            <span
              className="ml-auto cursor-pointer absolute right-0 text-gray-400 hover:text-gray-700 top-[-100%]"
              onClick={() => setIsExpanded(false)}
            >
              —
            </span>
          </div>
          <button
            onClick={handleKickAll}
            className="bg-orange-500 px-4 py-2 rounded-md shadow-md text-white"
          >
            {loading ? "Logging out..." : "Force Logout All"}
          </button>
        </div>
      ) : (
        <div
          className="absolute z-20 w-8 h-8 border shadow-lg bg-gray-800  text-white flex items-center justify-center cursor-pointer"
          style={{ top: `${position.y}px`, left: `${position.x + 400 - 32}px` }} // Adjust left position to align with minimize button
          onMouseDown={handleMouseDown}
          onClick={() => setIsExpanded(true)} // Clicking the minimized panel restores the full panel
        >
          <span> + </span>
        </div>
      )}
    </div>
  );
}
