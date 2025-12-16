"use client";

import { useState } from "react";
import { CSVRow } from "@/lib/types";
import { Mail, Sparkles } from "lucide-react";
import Button from "@/components/shared/button/button";
import Input from "@/components/ui/input";

interface SingleEmailInputProps {
  onSubmit: (rows: CSVRow[], columns: string[]) => void;
}

export function SingleEmailInput({ onSubmit }: SingleEmailInputProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    setError(null);

    if (!email.trim()) {
      setError("Please enter an email address");
      return;
    }

    if (!validateEmail(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }

    setIsProcessing(true);

    const row: CSVRow = {
      email: email.trim(),
      ...(name.trim() ? { name: name.trim() } : {}),
    };

    const columns = name.trim() ? ["email", "name"] : ["email"];

    setTimeout(() => {
      setIsProcessing(false);
      onSubmit([row], columns);
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isProcessing) {
      handleSubmit();
    }
  };

  return (
    <div className="w-full">
      <div className="relative overflow-hidden border-2 border-dashed rounded-xl transition-all duration-300 ease-out min-h-[150px] flex flex-col items-center justify-center p-8 border-border-muted hover:border-heat-100 bg-accent-white hover:bg-heat-4 hover:shadow-lg">
        <div className="absolute inset-0 opacity-3">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, var(--heat-100) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-heat-4 mb-3">
              <Mail className="w-6 h-6 text-heat-100" />
            </div>
            <p className="text-title-h5 font-medium text-accent-black mb-2">
              Check a Single Email
            </p>
            <p className="text-sm text-black-alpha-64">
              Enter an email address to enrich company data
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email-input"
                className="block text-sm font-medium text-accent-black mb-2"
              >
                Email Address *
              </label>
              <Input
                id="email-input"
                type="email"
                placeholder="example@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isProcessing}
                className="w-full"
              />
            </div>

            <div>
              <label
                htmlFor="name-input"
                className="block text-sm font-medium text-accent-black mb-2"
              >
                Name (Optional)
              </label>
              <Input
                id="name-input"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isProcessing}
                className="w-full"
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isProcessing || !email.trim()}
              className="w-full mt-4 flex items-center justify-center gap-2"
              variant="primary"
            >
              {isProcessing ? (
                <>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse animation-delay-150" />
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse animation-delay-300" />
                  </div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span className="font-medium">Enrich Data</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl animate-fade-in shadow-sm">
          <p className="font-semibold mb-1 text-accent-crimson">Error:</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Enter a company email to get detailed business
          information including industry, funding, tech stack, and more.
        </p>
      </div>
    </div>
  );
}
