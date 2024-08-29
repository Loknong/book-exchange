import Profile from "../../../assets/book.jpg";

const SidebarAccout = () => {
  return (
    <div>
      <div className="px-4 py-3 shadow flex items-center gap-4">
        <div className="flex-shrink-0">
          <img
            src={Profile}
            className="rounded-full w-14 h-14 border border-gray-200 p-1 object-cover"
            alt="Profile"
          />
        </div>
        <div className="flex-grow">
          <p className="text-gray-600">Hello,</p>
          <h4 className="text-gray-800 font-bold">Russel Ahmed</h4>
        </div>
      </div>
      <div className="mt-6 bg-white shadow p-4 rounded divide-y divide-gray-200 space-y-4 text-gray-600">
        <div className="space-y-1 pl-8">
          <a
            href="#"
            className="relative text-primary block font-medium capitalize transition"
          >
            <span className="absolute -left-8 top-0 text-base">
              <i className="far fa-address-card" aria-hidden="true">
                {" "}
              </i>
            </span>
            Manage account
          </a>
          <a
            href="#"
            className="block capitalize transition hover:text-primary"
          >
            Profile info
          </a>
          <a
            href="#"
            className="block capitalize transition hover:text-primary"
          >
            Manage Address
          </a>
          <a
            href="#"
            className="block capitalize transition hover:text-primary"
          >
            change password
          </a>
        </div>

        <div className="space-y-1 pl-8 pt-4">
          <a
            href="#"
            className="relative hover:text-primary block font-medium capitalize transition"
          >
            <span className="absolute -left-8 top-0 text-base">
              <i className="fa fa-sign-out" aria-hidden="true">
                {" "}
              </i>
            </span>
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default SidebarAccout;
