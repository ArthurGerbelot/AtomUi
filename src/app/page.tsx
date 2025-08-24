import { Atom } from "@uikit/components";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-4xl font-bold text-primary mb-4">Test des styles</h1>
      <div className="space-y-4">
        <div className="p-4 bg-card text-card-foreground rounded-lg border">
          <p className="text-muted-foreground">Ceci est un test des styles Tailwind</p>
        </div>
        <Atom className="p-4 bg-blue-500 text-white rounded">
          Composant Atom avec styles
        </Atom>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
            Bouton Primary
          </button>
          <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90">
            Bouton Secondary
          </button>
        </div>
      </div>
    </div>
  );
}
