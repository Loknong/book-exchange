import  { ReactNode } from "react";
import { useUserStore } from "../../stores/useUserStore";

interface LayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
  const userId = useUserStore((state) => state.user?.userId);
  const userFirstName = useUserStore((state) => state.user?.firstName);
  const userLastName = useUserStore((state) => state.user?.lastName);

  return (
    <>
      <div className="">
        <div className="bg-orange-50 h-15 border-b border-orange-400 flex flex-row justify-between px-4 py-2">
          <div className="self-center">Header</div>
          <div>
            <ul className="flex flex-row text-sm gap-6">
              <li>
                UserID : <UserDetialList data={userId?.toString()} />
              </li>
              <li>
                First Name : <UserDetialList data={userFirstName} />
              </li>
              <li>
                Last Name : <UserDetialList data={userLastName} />
              </li>
            </ul>
          </div>
        </div>{" "}
        <div className="border">{children}</div>
      </div>
    </>
  );
}

const UserDetialList = ({ data = "" }) => {
  return <span className="bg-orange-300 w-20 block text-center">{data}</span>;
};
