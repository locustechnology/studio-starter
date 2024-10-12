import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

export default function NavItems() {
  return (
    <>
      <Button className="text-gray-700 text-sm">
        AI Headshots <ChevronDown className="ml-1 h-3 w-3" />
      </Button>
      <Button className="text-gray-700 text-sm">
        Testimonial <ChevronDown className="ml-1 h-3 w-3" />
      </Button>
      <Button className="text-gray-700 text-sm">Pricing</Button>
      <Button className="text-gray-700 text-sm">
        FAQ <ChevronDown className="ml-1 h-3 w-3" />
      </Button>
    </>
  );
}