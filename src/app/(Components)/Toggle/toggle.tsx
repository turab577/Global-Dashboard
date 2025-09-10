    "use client";
import React, { useState } from "react";
import ToggleSwitch from "@/app/ui-components/toggles";

export default function ToggleExamples() {
  const [basic, setBasic] = useState(false);
  const [icon, setIcon] = useState(true);
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-10">
        Toggle Switch Examples
      </h1>

      <div className="max-w-xl mx-auto space-y-6 bg-white p-6 rounded-lg shadow">
        {/* Basic Toggle */}
        <div className="flex items-center justify-between">
          <span className="font-medium">Basic Background Toggle</span>
          <ToggleSwitch isOn={basic} onToggle={setBasic} />
        </div>

        {/* With Sun/Moon Icons */}
        <div className="flex items-center justify-between">
          <span className="font-medium">With Icons (Sun/Moon)</span>
          <ToggleSwitch isOn={icon} onToggle={setIcon} withIcons />
        </div>

        {/* Disabled Toggle */}
        <div className="flex items-center justify-between">
          <span className="font-medium">Disabled Toggle</span>
          <ToggleSwitch isOn={disabled} onToggle={setDisabled} disabled />
        </div>
      </div>
    </div>
  );
}
