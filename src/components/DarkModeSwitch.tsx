import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

export const DarkModeSwitch = () => {
  return (
    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" className="flex items-center space-x-2">
      <Switch
        id="light-mode-toggle"
        checked={false}
      />
      <Label htmlFor="light-mode-toggle">Light Mode</Label>
    </a>
  );
};
