import { Menu } from "@mantine/core";
import { CiLogin } from "react-icons/ci";
import { MdDashboard, MdKey } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import LogoutDialog from "../dialogs/logout-dialog";
import useLogout from "../../mutations/use-logout";
import { FaRegUser } from "react-icons/fa6";
import { useProfile } from "../../queries/use-profile";
import { BiErrorCircle } from "react-icons/bi";

export default function UserMenu({ children }) {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { mutate: logout, isPending } = useLogout();
  const { data: profile, isLoading, isError } = useProfile();

  const handleLogout = () => {
    logout();
    setLogoutDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-2">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center gap-2 p-2 text-sm text-red-600">
        <BiErrorCircle className="size-5" />
        <span>Error loading user</span>
      </div>
    );
  }

  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <button>{children}</button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>
            {profile ? `Namaste, ${profile.name.split(" ")[0]}` : "Join Us"}
          </Menu.Label>
          {profile ? (
            <>
              <Menu.Item leftSection={<FaRegUser className="size-4" />}>
                Profile
              </Menu.Item>
              <Link to="/dashboard">
                <Menu.Item leftSection={<MdDashboard className="size-4" />}>
                  Dashboard
                </Menu.Item>
              </Link>
              <Menu.Item
                leftSection={<CiLogin className="size-4 text-red-600" />}
                onClick={() => setLogoutDialogOpen(true)}
              >
                <span className="text-red-600">
                  {isPending ? (
                    <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  ) : (
                    "Logout"
                  )}
                </span>
              </Menu.Item>
            </>
          ) : (
            <>
              <Link to="/login">
                <Menu.Item leftSection={<CiLogin />}>Login</Menu.Item>
              </Link>
              <Link to="/register">
                <Menu.Item leftSection={<MdKey />}>Register</Menu.Item>
              </Link>
            </>
          )}
        </Menu.Dropdown>
      </Menu>

      <LogoutDialog
        opened={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
