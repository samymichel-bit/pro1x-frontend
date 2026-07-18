export default function Loading() {
  return (
    <div className="min-h-[100dvh] bg-surface flex flex-col items-center justify-center p-6">
      <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-6" />
      <h2 className="font-serif text-xl font-bold text-secondary mb-2">Chargement des pronostics...</h2>
      <p className="text-sm text-secondary/60">Analyse des données en cours.</p>
    </div>
  );
}
