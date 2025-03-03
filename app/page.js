import { Button } from "@/components/ui/button";
import { UserButton, UserProfile } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h1>My name is Felix!</h1>
      <Button>ClickHere</Button>
      <UserButton />
    </div>
  );
}
