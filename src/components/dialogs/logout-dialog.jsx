import { Modal, Button } from "@mantine/core";
import useLogout from "../../mutations/use-logout";

export default function LogoutDialog({ opened, onClose }) {
  const { mutate: logout, isLoading } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Confirm Logout"
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      size="sm"
      radius="md"
    >
      <p className="mb-6 text-sm text-gray-600">
        Are you sure you want to log out of your account?
      </p>

      <div className="flex justify-end gap-3">
        <Button variant="default" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button color="red" onClick={handleLogout} loading={isLoading}>
          Logout
        </Button>
      </div>
    </Modal>
  );
}
