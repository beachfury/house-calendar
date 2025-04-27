import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Settings } from "lucide-react";
import WidgetModal from "./Modal";

interface MultiClockProps {
  userId: string;
  instanceId: string;
}

const DEFAULT_SETTINGS = {
  clocks: [
    { timezone: "America/New_York", label: "New York" },
    { timezone: "Europe/London", label: "London" },
    { timezone: "Asia/Tokyo", label: "Tokyo" },
    { timezone: "Australia/Sydney", label: "Sydney" }
  ],
  hourFormat: "24h",
  updateInterval: 10
};

export default function MultiClock({ userId, instanceId }: MultiClockProps) {
  const [clocks, setClocks] = useState(DEFAULT_SETTINGS.clocks);
  const [hourFormat, setHourFormat] = useState(DEFAULT_SETTINGS.hourFormat);
  const [updateInterval, setUpdateInterval] = useState(DEFAULT_SETTINGS.updateInterval);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [times, setTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId || !instanceId) return;

    fetch(`/api/widget-settings/${userId}/${instanceId}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            // Seed default settings
            return fetch(`/api/widget-settings/${userId}/${instanceId}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(DEFAULT_SETTINGS)
            }).then(() => DEFAULT_SETTINGS);
          } else {
            throw new Error("Settings fetch failed");
          }
        }
        return res.json();
      })
      .then((data) => {
        setClocks(data.clocks || DEFAULT_SETTINGS.clocks);
        setHourFormat(data.hourFormat || DEFAULT_SETTINGS.hourFormat);
        setUpdateInterval(data.updateInterval || DEFAULT_SETTINGS.updateInterval);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [userId, instanceId]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimes = clocks.map((clock) => {
        try {
          return new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: hourFormat === "12h",
            timeZone: clock.timezone
          });
        } catch {
          return "--:--";
        }
      });
      setTimes(newTimes);
    }, updateInterval * 1000);
    return () => clearInterval(interval);
  }, [clocks, updateInterval, hourFormat]);

  const saveSettings = async () => {
    const newSettings = { clocks, hourFormat, updateInterval };
    await fetch(`/api/widget-settings/${userId}/${instanceId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSettings)
    });
    setSettingsOpen(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Settings button */}
      <div className="absolute top-2 right-2 z-10">
        <Button
          size="icon"
          variant="ghost"
          className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
          onClick={() => setSettingsOpen(true)}
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {/* Clock grid */}
      <div className="grid grid-cols-2 gap-2 p-2 flex-grow">
        {(clocks || []).map((clock, index) => (
          <Card key={index} className="bg-white dark:bg-gray-900 dark:text-white">
            <CardContent className="flex flex-col items-center justify-center h-40 text-xl font-mono space-y-2 overflow-hidden">
              <div className="text-sm font-semibold">{clock.label || `Clock ${index + 1}`}</div>
              <div className="text-2xl font-mono text-center">{times[index] || "--:--"}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Settings Modal */}
      <WidgetModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Clock Settings</h2>
        <div className="space-y-4">
          {/* Number of clocks */}
          <div>
            <label className="block text-sm font-medium">Number of Clocks</label>
            <select
              className="w-full border rounded p-1"
              value={clocks.length}
              onChange={(e) => {
                const count = parseInt(e.target.value);
                let updated = [...clocks];
                if (updated.length < count) {
                  const extras = Array(count - updated.length).fill({ timezone: "", label: "" });
                  updated = [...updated, ...extras];
                } else {
                  updated = updated.slice(0, count);
                }
                setClocks(updated);
              }}
            >
              {[2, 3, 4].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Clock timezone fields */}
          {(clocks || []).map((clock, idx) => (
            <div key={idx}>
              <label className="block text-xs font-semibold">Clock {idx + 1} Timezone</label>
              <input
                className="w-full border rounded p-1 mt-1"
                placeholder="e.g. America/New_York"
                value={clock.timezone}
                onChange={(e) => {
                  const updated = [...clocks];
                  updated[idx].timezone = e.target.value;
                  updated[idx].label = e.target.value.split("/").pop()?.replace("_", " ") || "";
                  setClocks(updated);
                }}
              />
            </div>
          ))}

          {/* Other settings */}
          <div>
            <label className="block text-sm font-medium">Time Format</label>
            <select
              className="w-full border rounded p-1"
              value={hourFormat}
              onChange={(e) => setHourFormat(e.target.value)}
            >
              <option value="12h">12 Hour</option>
              <option value="24h">24 Hour</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Update Interval (seconds)</label>
            <select
              className="w-full border rounded p-1"
              value={updateInterval}
              onChange={(e) => setUpdateInterval(parseInt(e.target.value))}
            >
              {[1, 5, 10, 20, 30, 60].map((s) => (
                <option key={s} value={s}>{s} sec</option>
              ))}
            </select>
          </div>
        </div>

        {/* Save and Cancel buttons */}
        <div className="mt-6 text-right space-x-2">
          <Button variant="secondary" onClick={() => setSettingsOpen(false)}>Cancel</Button>
          <Button onClick={saveSettings}>Save</Button>
        </div>
      </WidgetModal>
    </div>
  );
}
