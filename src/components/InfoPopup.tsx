"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InfoPopupProps {
  title: string;
  description: string;
  videoUrl?: string;
  onClose: () => void;
}

export default function InfoPopup({ title, description, videoUrl, onClose }: InfoPopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-gradient-to-br from-black via-orange-950/30 to-black border-4 border-orange-500 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-orange-500/50">
        <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-yellow-600 p-4 flex items-center justify-between border-b-4 border-yellow-500">
          <h2 className="text-2xl font-black text-black uppercase tracking-wide">{title}</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-black hover:bg-black/20 hover:text-white"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-yellow-300 text-lg font-bold leading-relaxed">{description}</p>

          {videoUrl && (
            <div className="relative w-full rounded-lg overflow-hidden border-4 border-yellow-500 shadow-lg shadow-yellow-500/30">
              <div className="relative pb-[56.25%]">
                <iframe
                  src={videoUrl}
                  title={title}
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          <Button
            onClick={onClose}
            className="w-full h-12 text-lg font-black bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-600 hover:from-orange-700 hover:via-yellow-600 hover:to-orange-700 text-black uppercase tracking-wide"
          >
            Got It!
          </Button>
        </div>
      </div>
    </div>
  );
}