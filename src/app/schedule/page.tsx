import TitleSection from "@/components/typography/title-section";
import SchedulesCard from "./components/schedules/schedules-card";

export default function SchedulePage() {
  return (
    <div className="px-5 pt-6 space-y-6">
      <h1 className="text-lg font-bold">Agendamentos</h1>

      <div className="space-y-8">
        <div>
          <TitleSection title="CONFIRMADOS" />

          <div className="space-y-2">
            <SchedulesCard
              date="2023-08-06"
              status="confirmado"
              services={["Corte de Cabelo"]}
              time="09:45"
            />
            <SchedulesCard
              date="2023-08-07"
              status="confirmado"
              services={["Barba", "Corte de Cabelo"]}
              time="10:30"
            />
            <SchedulesCard
              date="2023-08-08"
              status="confirmado"
              services={["Corte de Cabelo"]}
              time="11:15"
            />
          </div>
        </div>
        <div>
          <TitleSection title="PENDENTES" />

          <div className="space-y-2">
            <SchedulesCard
              date="2023-08-06"
              status="pendente"
              services={["Corte de Cabelo"]}
              time="09:45"
            />
            <SchedulesCard
              date="2023-08-07"
              status="pendente"
              services={["Barba", "Corte de Cabelo"]}
              time="10:30"
            />
            <SchedulesCard
              date="2023-08-08"
              status="pendente"
              services={["Corte de Cabelo"]}
              time="11:15"
            />
          </div>
        </div>
        <div>
          <TitleSection title="FINALIZADOS" />

          <div className="space-y-2">
            <SchedulesCard
              date="2023-08-06"
              status="finalizado"
              services={["Corte de Cabelo"]}
              time="09:45"
            />
            <SchedulesCard
              date="2023-08-07"
              status="finalizado"
              services={["Barba", "Corte de Cabelo"]}
              time="10:30"
            />
            <SchedulesCard
              date="2023-08-08"
              status="finalizado"
              services={["Corte de Cabelo"]}
              time="11:15"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
