import { Button } from "../ui/button";
import useResponsive from "@/hooks/useResponsive";

export default function HomeHero() {
  const { isMobile } = useResponsive();

  return (
    <>
      <div className="max-w-lg col-span-2">
        <h4 className="headings">
          Connect with your love ones. Discuss what's up.
        </h4>
        <p className="sub-headings">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae,
          esse.
        </p>

        <Button className="mt-4" size={isMobile ? "sm" : ""}>
          Get started
        </Button>
      </div>

      <div className="w-md">{/* <HeroMessageMainWrapper /> */}</div>
    </>
  );
}
