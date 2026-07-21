import BirthGreeting from "@/components/BirthGreeting";
import { GreetingProvider } from "@/contexts/GreetingContext";

type HomePageProps = {
  searchParams: Promise<{
    name?: string | string[];
  }>;
};

function normalizeName(value: string | string[] | undefined) {
  const rawName = Array.isArray(value) ? value[0] : value;

  if (!rawName) {
    return "Малыш";
  }

  const cleanName = rawName
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 40);

  return cleanName || "Малыш";
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const childName = normalizeName(params.name);

  return (
    <GreetingProvider childName={childName}>
      <BirthGreeting />
    </GreetingProvider>
  );
}
