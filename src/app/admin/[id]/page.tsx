interface ScheduleByIdPageProps {
  params: {
    id: string;
  };
}

export default function ScheduleByIdPage({ params }: ScheduleByIdPageProps) {
  return (
    <div className="py-5 w-full max-w-[1200px] mx-auto">
      <h1 className="text-2xl font-bold mb-4">Agendamento</h1>
      <p>Detalhes do agendamento serão exibidos aqui. {params.id}</p>
      {/* Additional content can be added here */}
    </div>
  );
}
