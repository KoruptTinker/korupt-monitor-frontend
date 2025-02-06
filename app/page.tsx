"use client";

import { useEffect, useState } from "react";
import { Terminal, Keyboard, MousePointer, MousePointerClick, Github, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

interface DailyStats {
  date: string;
  keyPresses: number;
  leftClicks: number;
  rightClicks: number;
}

interface ApiResponse {
  success: boolean;
  data: DailyStats[];
}

const fetchData = async (): Promise<DailyStats[]> => {
  // Replace with your actual API endpoint
  const apiUrl = 'http://monitor-api.korupt.me/api/v1/weekly';

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const jsonData: ApiResponse = await response.json();

  if (!jsonData.success) {
    throw new Error('API returned success: false');
  }

  // Return the data array
  return jsonData.data;
};

export default function Home() {
  const [data, setData] = useState<DailyStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const stats = await fetchData();
      setData(stats);
      setLoading(false);
    };
    loadData();
  }, []);

  const totalKeyPresses = data.reduce((sum, day) => sum + day.keyPresses, 0);
  const totalLeftClicks = data.reduce((sum, day) => sum + day.leftClicks, 0);
  const totalRightClicks = data.reduce((sum, day) => sum + day.rightClicks, 0);

  return (
    <div className="min-h-screen bg-black text-green-400">
      <div className="max-w-7xl mx-auto p-6">
        {/* About Section as Header */}
        <Card className="p-6 border border-green-800 bg-black mb-8">
          <div className="font-mono text-sm text-green-600 mb-2">$ whoami</div>
          <p className="font-mono text-green-400 mb-4">
            Hi, I'm a developer passionate about creating tools that help monitor and analyze user interactions.
            This dashboard provides real-time insights into my daily computer usage patterns.
          </p>
        </Card>

        {/* GitHub Attribution and Title */}
        <div className="flex items-center justify-between mb-8 border-b border-green-800 pb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-8 h-8" />
            <h1 className="text-2xl font-mono font-bold">~/input-analytics $</h1>
          </div>
          <a
            href="https://github.com/korupt-monitor"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-600 hover:text-green-400 transition-colors"
          >
            <Github className="w-5 h-5" />
            <span className="font-mono text-sm">Powered by korupt-monitor</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border border-green-800 bg-black">
            <div className="flex items-center gap-4">
              <Keyboard className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-sm text-green-600">Total Keystrokes</p>
                <p className="text-2xl font-mono font-bold text-green-400">{totalKeyPresses.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-green-800 bg-black">
            <div className="flex items-center gap-4">
              <MousePointer className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-sm text-green-600">Left Clicks</p>
                <p className="text-2xl font-mono font-bold text-green-400">{totalLeftClicks.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-green-800 bg-black">
            <div className="flex items-center gap-4">
              <MousePointerClick className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-sm text-green-600">Right Clicks</p>
                <p className="text-2xl font-mono font-bold text-green-400">{totalRightClicks.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="border border-green-800 bg-black mb-8">
          <div className="font-mono text-sm text-green-600 p-2 border-b border-green-800">
            $ cat input-stats.log
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-green-800 hover:bg-green-950">
                <TableHead className="font-mono text-green-400">Date</TableHead>
                <TableHead className="font-mono text-green-400 text-right">Keystrokes</TableHead>
                <TableHead className="font-mono text-green-400 text-right">Left Clicks</TableHead>
                <TableHead className="font-mono text-green-400 text-right">Right Clicks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-green-400">
                    Loading data... |
                  </TableCell>
                </TableRow>
              ) : (
                data.map((day) => (
                  <TableRow key={day.date} className="border-green-800 hover:bg-green-950">
                    <TableCell className="font-mono text-green-400">
                      {day.date}
                    </TableCell>
                    <TableCell className="font-mono text-green-400 text-right">
                      {day.keyPresses.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-mono text-green-400 text-right">
                      {day.leftClicks.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-mono text-green-400 text-right">
                      {day.rightClicks.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Articles Section */}
        <Card className="border border-green-800 bg-black mb-8">
          <div className="font-mono text-sm text-green-600 p-2 border-b border-green-800">
            $ ls ./articles/
          </div>
          <div className="p-4 space-y-4">
            <a
              href="https://your-blog-url.com/article-1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 border border-green-800 rounded hover:bg-green-950 transition-colors"
            >
              <span className="font-mono text-green-400">Building a Developer Analytics Dashboard</span>
              <ExternalLink className="w-4 h-4 text-green-600" />
            </a>
            <a
              href="https://your-blog-url.com/article-2"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 border border-green-800 rounded hover:bg-green-950 transition-colors"
            >
              <span className="font-mono text-green-400">Monitoring Developer Productivity</span>
              <ExternalLink className="w-4 h-4 text-green-600" />
            </a>
          </div>
        </Card>

        <div className="text-center border-t border-green-800 pt-4">
          <p className="text-sm text-green-600 font-mono">
            $ cron: data refresh scheduled every 24h
          </p>
          <a
            href="https://github.com/korupt-monitor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-400 transition-colors mt-2 text-sm font-mono"
          >
            <Github className="w-4 h-4" />
            korupt-monitor
          </a>
        </div>
      </div>
    </div>
  );
}
