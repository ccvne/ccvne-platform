export const Footer = () => {
  return (
    <footer className="p-4 w-full bg-white border-t flex flex-col lg:flex-row items-start lg:items-center">
      <div className="text-xs text-muted-foreground py-2 px-4 lg:flex-1">
        © 2024 Clubes Ciência Viva na Escola. Todos os Direitos Reservados.
      </div>
      <a
        className="inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline h-10 px-4 py-2 text-muted-foreground text-xs"
        href="#"
      >
        Contatos
      </a>
      <a
        target="_blank"
        className="inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline h-10 px-4 py-2 text-muted-foreground text-xs"
        href="#"
      >
        Termos de Serviço
      </a>
      <a
        target="_blank"
        className="inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline h-10 px-4 py-2 text-muted-foreground text-xs"
        href="#"
      >
        Politica de Privacidade
      </a>
    </footer>
  );
};
