import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../stores/userStore";
import { sidebarAccountItems, sidebarExchangeItems, sidebarMyBooksItems, sidebarNotificationsItems, sidebarSettingsItems } from "../../../utils/mock/AccountItems";
import SidebarMenu from "./SideBarMenu";
import { UserProfile } from "../../ProfileInfo";

const SidebarAccout = () => {
  const navigate = useNavigate();
  const clearUser = useUserStore((state) => state.clearUser);
  const authObject = useUserStore((state) => state.getParsedAuthToken);
  const user = authObject() as UserProfile;
  return (
    <div>
      <div className="px-4 py-3 shadow flex items-center gap-4">
        <div className="flex-shrink-0">
          <img
            src={user.profilePicture}
            className="rounded-full w-14 h-14 border border-gray-200 p-1 object-cover"
            alt="Profile"
          />
        </div>
        <div className="flex-grow">
          <p className="text-gray-600">Hello,</p>
          <h4 className="text-gray-800 font-bold">{user.name}</h4>
        </div>
      </div>

      <div className="mt-6 bg-white shadow p-4 rounded  text-gray-600 min-h-[50rem] flex flex-col justify-between">
        <div className="divide-y divide-gray-200 space-y-4">


          {/* Account Section */}
          <SidebarMenu items={sidebarAccountItems} />

          {/* My Books Section */}
          <SidebarMenu items={sidebarMyBooksItems} />

          {/* Exchange Requests Section */}
          <SidebarMenu items={sidebarExchangeItems} />

          {/* Notifications Section */}
          <SidebarMenu items={sidebarNotificationsItems} />

          {/* Settings Section */}
          <SidebarMenu items={sidebarSettingsItems} />
        </div>
        <div className="space-y-1 pl-8 pt-4">
          <span
            onClick={() => {
              clearUser();
              navigate("/");
            }}
            className="relative hover:text-primary block font-medium capitalize transition cursor-pointer"
          >
            <span className="absolute -left-8 top-0 text-base">
              <i className="fa fa-sign-out" aria-hidden="true">

              </i>
            </span>
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default SidebarAccout;
