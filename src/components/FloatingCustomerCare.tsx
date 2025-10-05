"use client";

import { useState } from "react";
import { MessageCircle, X, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I get my password after registration?",
    answer: "Your password will be automatically sent to your registered email address immediately after successful registration. Please check your inbox and spam folder.",
  },
  {
    question: "Why do I need to provide my mobile number?",
    answer: "We verify all participants via phone call to ensure authenticity and prevent fraudulent entries. This is part of our zero-hacker policy.",
  },
  {
    question: "What is Game UID and where can I find it?",
    answer: "Game UID is your unique player identification number in the game. Watch the tutorial video in the Game UID field to learn how to find it. Using incorrect UID will disqualify you from tournaments.",
  },
  {
    question: "Why do I need to follow your Instagram account?",
    answer: "We provide free tournament services with no entry fees. Following our Instagram account helps us grow our community and is our only requirement. Enter the Instagram username that follows us.",
  },
  {
    question: "What are Red Tokens and Blue Tokens?",
    answer: "Red Tokens are earned by participating in tournaments and cannot be withdrawn. Blue Tokens can be converted to real money and withdrawn to your UPI account.",
  },
  {
    question: "How do I withdraw my Blue Tokens?",
    answer: "Once you accumulate Blue Tokens, you can request a withdrawal. The amount will be transferred to the UPI ID you provided during registration.",
  },
  {
    question: "Can I change my Game UID after registration?",
    answer: "No, Game UID is locked after registration to prevent fraud. Please ensure you enter the correct UID during signup.",
  },
  {
    question: "What is E-sport Points?",
    answer: "E-sport Points are earned based on your tournament performance. Higher points give you better rankings and access to mega tournaments.",
  },
  {
    question: "What are Mega Tournaments?",
    answer: "Mega Tournaments are special high-stakes competitions with bigger prizes. Entry is based on your E-sport Points and previous performance.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes! We follow strict security protocols. Your password is sent only once via email, and we never share your personal information with third parties.",
  },
];

export default function FloatingCustomerCare() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-600 hover:from-orange-700 hover:via-yellow-600 hover:to-orange-700 shadow-2xl shadow-orange-500/50 z-40 animate-bounce"
      >
        <MessageCircle className="h-8 w-8 text-black" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-black via-orange-950/30 to-black border-4 border-orange-500 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-orange-500/50">
            <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-yellow-600 p-6 flex items-center justify-between border-b-4 border-yellow-500 z-10">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-8 w-8 text-black" />
                <h2 className="text-3xl font-black text-black uppercase tracking-wide">
                  Frequently Asked Questions
                </h2>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-black hover:bg-black/20 hover:text-white"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="p-6">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-2 border-yellow-600 rounded-lg bg-black/60 overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:bg-orange-900/30 text-left text-orange-400 font-bold text-lg hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 text-yellow-200 font-semibold border-t-2 border-yellow-600/30 bg-black/40">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-8 p-6 bg-gradient-to-r from-orange-900/40 to-yellow-900/40 rounded-lg border-2 border-yellow-500">
                <p className="text-yellow-300 font-bold text-center text-lg">
                  Still have questions? Contact us on Instagram{" "}
                  <span className="text-orange-400">@silentgamers</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}