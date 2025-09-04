import { Avatar, Menu, Text } from "@mantine/core";
import { useState } from "react";
import { FaEdit, FaSignOutAlt, FaUser } from "react-icons/fa";

export default function DashboardHeader() {
  const [opened, setOpened] = useState(false);

  return (
    <header className="flex h-16 items-center justify-between bg-white px-6 text-black shadow">
      <h4>Dashboard</h4>

      <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
        <Menu.Target>
          <div className="flex cursor-pointer items-center gap-2">
            <Avatar radius="xl" color="gray">
              U
            </Avatar>
            <Text size="sm" className="hidden text-black sm:block">
              User
            </Text>
          </div>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item leftSection={<FaUser size={14} />}>View Profile</Menu.Item>
          <Menu.Item leftSection={<FaEdit size={14} />}>Edit Profile</Menu.Item>
          <Menu.Item leftSection={<FaSignOutAlt size={14} />} color="red">
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </header>
  );
}
