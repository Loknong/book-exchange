import { useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaChevronRight } from "react-icons/fa";
import { useEffect } from "react";

function Breadcrumb() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const breadcrumbs = pathnames.map((url) => {
    return {
      label: url,
      url,
    };
  });

  const fullBreadcrumbs = [{ label: "Home", url: "/" }, ...breadcrumbs];
  useEffect(() => {
    console.log("pathnames", pathnames);
    return () => { };
  }, [pathnames]);
  return (
    <div className="container py-4 flex items-center gap-2 ">
      {fullBreadcrumbs.length !== 1 &&
        fullBreadcrumbs.map((item, index) => (
          <div className="flex items-center gap-2" key={index}>
            {index < fullBreadcrumbs.length - 1 ? (
              <div
                onClick={() => navigate(item.url!)}
                className="text-primary text-base cursor-pointer flex items-center gap-1 capitalize"
              >
                {item.label === "Home" ? <FaHome /> : undefined}
                <span className="ml-1">{item.label}</span>
              </div>
            ) : (
              // last menu
              <p className="text-gray-600 font-medium flex items-center gap-2 capitalize">
                {item.label === "Home" ? <FaHome /> : undefined}
                {item.label.replace("-"," ")}
              </p>
            )}
            {index < fullBreadcrumbs.length - 1 && (
              <span className="text-sm text-gray-400">
                <FaChevronRight />
              </span>
            )}
          </div>
        ))}
    </div>
  );
}

export default Breadcrumb;
