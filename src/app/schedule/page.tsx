"use server";
import {
  getUserStatusScheduleAction,
  UserScheduleWithRelations,
} from "@/actions/schedule/get-user-status-schedule.action";
import TitleSection from "@/components/typography/title-section";
import SchedulesCard from "./components/schedules/schedules-card";

export default async function SchedulePage() {
  const schedules: UserScheduleWithRelations[] =
    await getUserStatusScheduleAction();

  const emptySchedules = schedules.length === 0;

  const pendingSchedules = schedules.filter(
    (schedule) => schedule.status === "PENDENTE"
  );
  const confirmedSchedules = schedules.filter(
    (schedule) => schedule.status === "CONFIRMADO"
  );
  const finishedSchedules = schedules.filter(
    (schedule) => schedule.status === "FINALIZADO"
  );

  return (
    <div className="px-5 pt-6 space-y-6">
      <h1 className="text-lg font-bold">Agendamentos</h1>

      {emptySchedules && (
        <p className="text-gray-500">Nenhum agendamento encontrado.</p>
      )}

      <div className="space-y-8">
        {confirmedSchedules.length > 0 && (
          <div>
            <TitleSection title="CONFIRMADOS" />

            <div className="space-y-2">
              <div className="space-y-2">
                {confirmedSchedules.map((schedule) => (
                  <SchedulesCard
                    key={schedule.id}
                    date={schedule.date}
                    status="confirmado"
                    services={schedule.services}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {pendingSchedules.length > 0 && (
          <div>
            <TitleSection title="PENDENTES" />

            <div className="space-y-2">
              {pendingSchedules.map((schedule) => (
                <SchedulesCard
                  key={schedule.id}
                  date={schedule.date}
                  status="pendente"
                  services={schedule.services}
                />
              ))}
            </div>
          </div>
        )}

        {finishedSchedules.length > 0 && (
          <div>
            <TitleSection title="FINALIZADOS" />

            <div className="space-y-2">
              {finishedSchedules.map((schedule) => (
                <SchedulesCard
                  key={schedule.id}
                  date={schedule.date}
                  status="finalizado"
                  services={schedule.services}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
