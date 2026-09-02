"use client";

import { useEffect } from "react";

const githubUrl = "https://github.com/arunacharya1603";

export default function GithubPage() {
  useEffect(() => {
    window.location.replace(githubUrl);
  }, []);

  return (
    <main className="grid min-h-screen place-items-center bg-[#0e0d0c] px-6 text-center text-[#fbfbfa]">
      <p>
        Opening GitHub…{" "}
        <a className="underline" href={githubUrl}>
          Continue manually
        </a>
      </p>
    </main>
  );
}
