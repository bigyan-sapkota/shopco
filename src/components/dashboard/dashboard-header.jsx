import { Avatar, Text } from "@mantine/core";
import UserMenu from "../menus/user-menu";
import { useProfile } from "../../queries/use-profile";

export default function DashboardHeader() {
  const { data: profile } = useProfile();
  return (
    <header className="flex h-16 items-center justify-between bg-white px-6 text-black shadow">
      <h4>Dashboard</h4>

      <UserMenu>
        <div className="flex cursor-pointer items-center gap-2">
          <Avatar radius="xl" color="gray">
            {profile?.name?.charAt(0).toUpperCase() ?? "U"}
          </Avatar>
          <Text size="sm" className="hidden text-black sm:block">
            {profile?.name ?? "User"}
          </Text>
        </div>
      </UserMenu>
    </header>
  );
}
