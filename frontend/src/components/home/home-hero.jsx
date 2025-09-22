import React from "react";
import { Button } from "../ui/button";

export default function HomeHero() {
  return (
    <>
      {/* Left */}
      <div className="max-w-lg col-span-2">
        <h4 className="headings">
          Connect with your love ones. Discuss what's up.
        </h4>
        <p className="subheadings">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae,
          esse.
        </p>

        <Button className="mt-4">Get started</Button>
      </div>

      {/* Right */}
      <div className="w-md">{/* <HeroMessageMainWrapper /> */}</div>
    </>
  );
}
