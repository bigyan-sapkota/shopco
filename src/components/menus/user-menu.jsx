import { Menu } from "@mantine/core";

import { CiLogin } from "react-icons/ci";
import { MdKey } from "react-icons/md";
import { Link } from "react-router-dom";

export default function UserMenu({ children }) {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <button>{children}</button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Join Us</Menu.Label>
        <Link to="/login">
          <Menu.Item leftSection={<CiLogin />}>Login</Menu.Item>
        </Link>
        <Link to="/register">
          <Menu.Item leftSection={<MdKey />}>Register</Menu.Item>
        </Link>
      </Menu.Dropdown>
    </Menu>
  );
}
