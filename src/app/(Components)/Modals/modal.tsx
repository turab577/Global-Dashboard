"use client";

import React, { useState } from "react";
import { Modal } from "@/app/ui-components/modals"; // adjust path if needed
import Button from "@/app/ui-components/buttons";

type ModalKind = "info" | "success" | "confirm" | "form" | null;

export default function App() {
  const [openType, setOpenType] = useState<ModalKind>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">

        <div className="flex gap-2 justify-center text-center items-center flex-wrap">
      {/* Buttons to trigger modals */}
      <Button onClick={() => setOpenType("info")} variant="filled">
        Open Info Modal
      </Button>

      <Button onClick={() => setOpenType("success")} variant="bordered">
        Open Success Modal
      </Button>

      <Button onClick={() => setOpenType("confirm")} variant="filled">
        Open Confirm Modal
      </Button>

      <Button onClick={() => setOpenType("form")} variant="bordered">
        Open Form Modal
      </Button>
      </div>

      {/* Info Modal */}
      <Modal
        isOpen={openType === "info"}
        onClose={() => setOpenType(null)}
        type="info"
        title="Information"
        message="This is an informational modal with animation."
      />

      {/* Success Modal */}
      <Modal
        isOpen={openType === "success"}
        onClose={() => setOpenType(null)}
        type="success"
        title="Success"
        message="Your action was successful!"
      />

      {/* Confirm Modal */}
      <Modal
        isOpen={openType === "confirm"}
        onClose={() => setOpenType(null)}
        type="confirm"
        title="Are you sure?"
        message="This action cannot be undone."
        confirmText="Yes, Do it"
        cancelText="No, Cancel"
        onConfirm={() => {
          alert("Confirmed!");
          setOpenType(null);
        }}
      />

      {/* Form Modal */}
      <Modal
        isOpen={openType === "form"}
        onClose={() => setOpenType(null)}
        type="form"
        title="Fill out the form"
        confirmText="Submit"
        cancelText="Cancel"
        onConfirm={() => {
          alert("Form submitted!");
          setOpenType(null);
        }}
      >
        <form className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Your name"
            className="border p-2 rounded-lg dark:bg-neutral-800"
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded-lg dark:bg-neutral-800"
          />
        </form>
      </Modal>
    </div>
  );
}
