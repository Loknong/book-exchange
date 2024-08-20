interface NavLinkProps {
  label: string;
  url: string;
  navigate: (url: string) => void;
}

function NavLink({ label, url, navigate }: NavLinkProps) {
  return (
    <div
      className="text-gray-200 hover:text-white transition capitalize cursor-pointer"
      onClick={() => navigate(url)}
    >
      {label}
    </div>
  );
}

export default NavLink;
