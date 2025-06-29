import { useEffect } from "react";
import Button from "@components/Button";
import Typography from "@components/Typography";
import Input from "@components/Input";
import Select from "@components/Select";
import Checkbox from "@components/Checkbox";
import Radio from "@components/Radio";
import Accordion from "@components/Accordion";
import Tree from "@components/Tree";
import Chip from "@components/Chip";
import { Tabs } from "@components/Tabs";
import useAuthStore from "./store/useAuthStore";
import { useModal } from "@components/Modal/useModal";

function App() {
  const { login, logout } = useAuthStore();

  const {
    ModalUI: SimpleModal,
    open: openSimple,
    close: closeSimple,
  } = useModal();

  const {
    ModalUI: ConfirmModal,
    open: openConfirm,
    close: closeConfirm,
  } = useModal();

  const handleDelete = () => {
    console.log("Item deleted!");
    closeConfirm();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      login({
        user: null,
        token,
      });
      console.log("✅ Token found, user logged in");
    } else {
      logout();
      console.log("❌ No token found, user logged out");
    }
  }, [login, logout]);

  const treeData = [
    {
      label: "Frontend",
      children: [{ label: "React" }, { label: "Vue" }],
    },
    {
      label: "Backend",
      children: [{ label: "Node.js" }, { label: "Django" }],
    },
  ];

  const tabItems = [
    {
      label: "Overview",
      content: (
        <div>
          <Typography variant="p">This is the overview section.</Typography>
        </div>
      ),
    },
    {
      label: "Profile",
      content: (
        <div>
          <Typography variant="p">This is the profile section.</Typography>
        </div>
      ),
    },
    {
      label: "Settings",
      content: (
        <div>
          <Typography variant="p">This is the settings section.</Typography>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      {/* Simple Info Modal */}
      <Button onClick={openSimple}>Open Modal</Button>
      <SimpleModal title="Simple Modal">
        <p>sample modal</p>
        <div className="mt-4 text-right">
          <Button onClick={closeSimple}>Close</Button>
        </div>
      </SimpleModal>

      {/* Confirm Delete Modal */}
      <Button variant="contained" color="tertiary" onClick={openConfirm}>
        Delete
      </Button>
      <ConfirmModal title="Confirm Deletion" size="sm">
        <p className="mb-4">Are you sure you want to delete this item?</p>
        <div className="flex justify-end gap-2">
          <Button onClick={closeConfirm}>Cancel</Button>
          <Button variant="contained" color="red" onClick={handleDelete}>
            Confirm
          </Button>
        </div>
      </ConfirmModal>

      {/* Content */}
      <Typography variant="h1">Dashboard</Typography>
      <Typography variant="p">Welcome back! Here's your overview.</Typography>

      <Button color="primary" variant="contained">
        Primary
      </Button>
      <Button color="secondary" variant="contained" rounded="lg">
        Secondary Rounded
      </Button>
      <Button color="tertiary" variant="text">
        Tertiary Text
      </Button>

      <Input id="nameInApp" placeholder="Please enter your name" />

      <Select
        label="Choose a framework"
        options={[
          { label: "React", value: "react" },
          { label: "Vue", value: "vue" },
        ]}
      />

      <Checkbox label="I agree to terms" id="terms" />

      <div>
        <Radio name="plan" id="basic" value="basic" label="Basic Plan" />
        <Radio name="plan" id="pro" value="pro" label="Pro Plan" />
      </div>

      <div className="max-w-md mx-auto mt-10">
        <Accordion title="Main Accordion">
          <p>This is the content of the main accordion.</p>
          <Accordion title="Sub Accordion 1">
            <p>This is inside Sub Accordion 1.</p>
          </Accordion>
          <Accordion title="Sub Accordion 2">
            <p>This is inside Sub Accordion 2.</p>
          </Accordion>
        </Accordion>
        <Accordion title="Empty Accordion">Test</Accordion>
      </div>

      <Tree data={treeData} />

      <div className="flex gap-2 flex-wrap">
        <Chip label="React" color="blue" />
        <Chip label="Tailwind" color="green" />
        <Chip label="Open Source" color="red" />
      </div>

      <Tabs tabs={tabItems} defaultIndex={0} />
    </div>
  );
}

export default App;
