"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CTASection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const getLink = () => (isLoggedIn ? "/templates" : "/register");

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
          Ready to Create Your Digital Identity?
        </h2>

        <p className="text-xl mb-8 text-purple-100/90 max-w-2xl mx-auto leading-relaxed font-light">
          Join thousands of users who are already networking smarter with JuanTap.
          Create your profile in minutes and start sharing instantly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="text-lg px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 rounded-full shadow-lg transition-all duration-300"
          >
            <Link href={getLink()}>
              Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-lg px-8 py-4 text-purple-700 border-purple-300 hover:bg-purple-100 rounded-full transition-all duration-300"
          >
            <Link href={getLink()}>View Examples</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
