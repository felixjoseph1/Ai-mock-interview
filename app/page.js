import { Button } from "@/components/ui/button";
import { UserButton, UserProfile } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>My name is Felix!</h1>
      <Button>ClickHere</Button>
      <UserButton />
    </div>
  );
}
