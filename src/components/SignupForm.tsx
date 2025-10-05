"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Loader2 } from "lucide-react";
import InfoPopup from "./InfoPopup";

interface FormData {
  email: string;
  username: string;
  mobileNumber: string;
  gameUID: string;
  instagram: string;
  gameName: string;
  upiId: string;
}

const fieldInfos = {
  email: {
    title: "Email Address",
    description: "You need to fill this correct because your password we send you on gmail",
  },
  username: {
    title: "Username",
    description: "You can write your real name here.",
  },
  mobileNumber: {
    title: "Mobile Number",
    description: "You need to provide this correct. We will verify you by a call",
  },
  gameUID: {
    title: "Game UID",
    description: "No entry of other uid's in tournament",
    videoUrl: "https://imagekit.io/player/embed/silentgamers/IMG_0068.MOV/ik-video.mp4?updatedAt=1759581405435&ik-s=41f3914fafae92001f85259ce01e3c8a3a094fd4",
  },
  instagram: {
    title: "Instagram",
    description: "We provide you free service with no hacker policy. We charge that you follow us from an account compulsory. Enter here that account by which you follow us.",
  },
  gameName: {
    title: "Game Name",
    description: "Copy your exact game name",
    videoUrl: "https://imagekit.io/silentgamers/Screen_Recording_20251005_074131_Free%20Fire%20MAX.mp4?updatedAt=1759630719457&ik-s=f272290247e840d328501590ebeb4d1293c3f37a",
  },
  upiId: {
    title: "UPI ID",
    description: "When you withdraw blue tokens which account we need to give money in. So we need UPI id",
  },
};

export default function SignupForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    username: "",
    mobileNumber: "",
    gameUID: "",
    instagram: "",
    gameName: "",
    upiId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [shownPopups, setShownPopups] = useState<Set<string>>(new Set());

  const handleInputFocus = (fieldName: string) => {
    if (!shownPopups.has(fieldName)) {
      setActivePopup(fieldName);
      setShownPopups(new Set([...shownPopups, fieldName]));
    }
  };

  const handleInfoClick = (fieldName: string) => {
    setActivePopup(fieldName);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (!formData.email || !formData.username || !formData.mobileNumber || 
        !formData.gameUID || !formData.instagram || !formData.gameName || !formData.upiId) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    // Mobile number validation
    if (formData.mobileNumber.length < 10) {
      setError("Please enter a valid mobile number");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess("Registration successful! Your password has been sent to your email.");
      setFormData({
        email: "",
        username: "",
        mobileNumber: "",
        gameUID: "",
        instagram: "",
        gameName: "",
        upiId: "",
      });
      setShownPopups(new Set());
    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-400 bg-clip-text text-transparent animate-pulse">
          SILENT GAMERS
        </h1>
        <div className="mb-8 flex justify-center">
          <img
            src="https://ik.imagekit.io/silentgamers/Picsart_25-09-22_00-09-34-964.png?updatedAt=1758480146212&ik-s=4f744f417100daea8710c3389638e583c2987985"
            alt="Silent Gamers Logo"
            className="w-48 h-48 object-contain rounded-lg border-4 border-orange-500 shadow-2xl shadow-orange-500/50"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-black/60 p-8 rounded-xl border-2 border-orange-500 shadow-2xl shadow-orange-500/30 backdrop-blur-sm">
        {error && (
          <Alert variant="destructive" className="bg-red-900/50 border-red-500">
            <AlertDescription className="text-white font-bold">{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-900/50 border-green-500">
            <AlertDescription className="text-green-300 font-bold">{success}</AlertDescription>
          </Alert>
        )}

        {Object.entries(fieldInfos).map(([fieldName, info]) => (
          <div key={fieldName} className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor={fieldName} className="text-orange-400 font-bold text-lg uppercase tracking-wide">
                {info.title}
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleInfoClick(fieldName)}
                className="text-yellow-400 hover:text-yellow-300 hover:bg-orange-900/30"
              >
                <Info className="h-5 w-5" />
              </Button>
            </div>
            <Input
              id={fieldName}
              name={fieldName}
              value={formData[fieldName as keyof FormData]}
              onChange={handleChange}
              onFocus={() => handleInputFocus(fieldName)}
              className="bg-black/80 border-2 border-yellow-600 text-yellow-100 font-bold placeholder:text-yellow-900 focus:border-orange-500 focus:ring-orange-500 h-12"
              placeholder={`Enter your ${info.title.toLowerCase()}`}
            />
          </div>
        ))}

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-14 text-xl font-black bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-600 hover:from-orange-700 hover:via-yellow-600 hover:to-orange-700 text-black shadow-lg shadow-orange-500/50 uppercase tracking-widest"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              Registering...
            </>
          ) : (
            "Register Now"
          )}
        </Button>
      </form>

      {activePopup && (
        <InfoPopup
          title={fieldInfos[activePopup as keyof typeof fieldInfos].title}
          description={fieldInfos[activePopup as keyof typeof fieldInfos].description}
          videoUrl={fieldInfos[activePopup as keyof typeof fieldInfos].videoUrl}
          onClose={() => setActivePopup(null)}
        />
      )}
    </div>
  );
}