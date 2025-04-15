import React from "react";
import { RiTimerFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuCalendarCheck2, LuCalendarClock, LuCalendarDays } from "react-icons/lu";

type Props = {
  appointment: string;
  name: string;
  product: string;
};

function ItemAppointment({ appointment, name, product }: Props) {
  function formatAppointment(appointmentData: string): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    const appointmentDate = new Date(appointmentData);

    const formattedDate = appointmentDate.toLocaleDateString("fr-FR", options);

    return formattedDate.replace(
      /(\d{2}):(\d{2})/,
      (match, hours, minutes) => `${hours}H${minutes}`
    );
  }

  function getAppointmentStatus(appointmentData: string): "pass" | "today" | "future" {
    const appointmentDate = new Date(appointmentData);
    const now = new Date();

    const isSameDay =
      appointmentDate.toDateString() === now.toDateString();
    const isPast = appointmentDate < now && !isSameDay;

    if (isSameDay) return "today";
    return isPast ? "pass" : "future";
  }

  const status = getAppointmentStatus(appointment);

  return (
    <div className="border-b border-gray-200 p-4 flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          {status === "pass" && <LuCalendarCheck2 className="text-green-500"/>}
          {status === "today" && <LuCalendarDays className="text-orange-400"/>}
          {status === "future" && <LuCalendarClock className="text-red-500"/>}
          <p>{formatAppointment(appointment)}</p>
        </div>
        <p className="font-bold">{name} - {product}</p>
      </div>

      <BsThreeDotsVertical className="cursor-pointer" size={18} />
    </div>
  );
}

export default ItemAppointment;
