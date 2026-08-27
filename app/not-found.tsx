import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <h1 className="text-6xl font-extrabold text-midnight-navy">404</h1>
      <h2 className="text-2xl font-bold text-main-text">Page Not Found</h2>
      <p className="text-muted-text max-w-md">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <Link href="/" passHref>
        <Button>Return to Home</Button>
      </Link>
    </Container>
  );
}
