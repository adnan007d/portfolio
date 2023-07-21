"use client";

import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

export const DarkModeSwitch = () => {
  const onCheckedChanged = (checked: boolean) => {
    if (checked) {
      window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        onCheckedChange={onCheckedChanged}
        id="light-mode-toggle"
        checked={false}
      />
      <Label htmlFor="light-mode-toggle">Light Mode</Label>
    </div>
  );
};
