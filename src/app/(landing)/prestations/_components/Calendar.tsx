"use client";
import React, { useState } from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {fr} from "date-fns/locale/fr";
import {Calendar as CalendarPicker, DateValue} from "@heroui/calendar";
import Button from '@/app/_global_components/Button';
import { toast, ToastContainer } from 'react-toastify';
import { InputIcon } from '@/app/_global_components/InputIcon';
import { FaUser, FaEnvelope } from 'react-icons/fa';
import { calendarSelectToFormattedDate } from '@/lib/calendarSelectToFormattedDate';
import { paymentIntend } from '@/app/_data/paymentIntend';
import PaymentForm from '@/app/_components/PaymentForm';

interface Appointment {
    planedToDetails: {
        month: number;
        day: number;
        hour: number;
    };
}


function Calendar({setIsBooking, productTitle, productId}: {
  setIsBooking: (isBooking: boolean) => void,
  productTitle: string,
  productId: number
}) {
    const [whatShow, setWhatShow] = useState("calendar");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedHour, setSelectedHour] = useState("");
    const [noAppointmentAvailable, setNoAppointmentAvailable] = useState(false);
    const [availableHours, setAvailableHours] = useState<string[]>([]);
    const [isLogged, setIsLogged] = useState(false);
    const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
    const [isEbook, setIsEbook] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [checkTerms, setCheckTerms] = useState(false);
    const [appointment, setAppointment] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [themeElement, setThemeElement] = useState({ theme: "stripe" as "stripe" | "night" | "flat" });
    const appearance = themeElement;
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '');


    const options = {
      clientSecret,
      appearance,
    };

    const handleDateChange = (value: DateValue) => {
        const date = new Date(value.year, value.month - 1, value.day);
        setSelectedDate(date);
        const day = date.getDay();
        const arrayAvailableHours = [
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
        ];
        if (allAppointments) {
          const appointmentsToCurrentDate = allAppointments.filter(
            (appointment) => {
              return (
                date.getMonth() + 1 === appointment.planedToDetails.month &&
                date.getDate() === appointment.planedToDetails.day
              );
            }
          );
    
          const takenHours = appointmentsToCurrentDate.map((appointment) =>
            appointment.planedToDetails.hour.toString()
          );
          const filteredHours = arrayAvailableHours.filter(
            (hour) => !takenHours.includes(hour.split(":")[0])
          );
          if (day === 6 || day === 0) {
            setAvailableHours(filteredHours);
            if (filteredHours.length === 0) {
              setNoAppointmentAvailable(true);
            }
          } else {
            setAvailableHours(
              filteredHours.filter((hour) =>
                ["18:00", "19:00", "20:00", "21:00"].includes(hour)
              )
            );
            if (filteredHours.length === 9) {
              setNoAppointmentAvailable(true);
            }
          }
        } else {
          console.log(
            "Un problème est survenu sur le calendrier, veuillez réessayer plus tard"
          );
        }
    
        setWhatShow("hour");
    };

    const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedHour(e.target.value);
    };

    const handleAppointmentValidation = () => {
      if (!isLogged) {
        setWhatShow("information");
      } else {
        setWhatShow("payment");
      }
      if (selectedDate) {
        setAppointment(calendarSelectToFormattedDate(selectedDate, selectedHour));
      }
    };

    const handleInformationValidation = async () => {
      console.log(appointment, name, email, productId, checkTerms);
      try {
        const dataPayment = await paymentIntend(
          appointment,
          60,
          name,
          email,
          productId, 
          checkTerms,  
      );

      console.log(dataPayment);
      setClientSecret(dataPayment.clientSecret);
      setWhatShow("payment");
    } catch (error: any) {
      console.log(error);
      toast.error(error.Error); 
    }
    };  

    const daysNotAvailable = (date: DateValue) => {
      const month = date.month - 1;  // DateValue months are 1-based
      const day = date.day;
      
      // Check if date is in the past or within next 2 days
      const today = new Date();
      const selectedDate = new Date(date.year, month, day);
      const twoDaysFromNow = new Date();
      twoDaysFromNow.setDate(today.getDate() + 2);
      
      if (selectedDate <= twoDaysFromNow) {
        return true;
      }
  
      const objectFilteredDaysByMonth: Record<number, number[]> = {
        0: [1, 2, 10, 20],
        1: [2, 8, 12],
        2: [10, 12, 15, 16],
        3: [25, 28],
      };
  
      return (month in objectFilteredDaysByMonth && 
        objectFilteredDaysByMonth[month].includes(day));
    };

    return (
        <div className='w-[400px] mx-auto flex flex-col items-center'>
          <ToastContainer />
            {whatShow === "calendar" &&
                <>
                    <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white text-center">
                        Sélectionne un jour
                    </h3>
                    <CalendarPicker aria-label="Date (No Selection)" calendarWidth={370} color='primary' onChange={handleDateChange} isDateUnavailable={daysNotAvailable}/>
                </>
            }

            {whatShow === "hour" && (
                <>
                    <div className="flex items-center justify-between mb-3">
                        <button
                            onClick={() => {
                                setWhatShow("duration");
                                setNoAppointmentAvailable(false);
                            }}
                        >
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <h3 className="text-lg flex-grow font-medium text-gray-900 dark:text-white text-center">
                            Sélectionne un horaire
                        </h3>
                    </div>

                    <p className="capitalize font-medium text-center text-gray-500 dark:text-gray-300 ">
                        {selectedDate?.toLocaleDateString("fr-FR", {
                            weekday: "long",
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                    {noAppointmentAvailable && (
                        <p className="italic text-center text-sm text-gray-500 dark:text-gray-300 mt-4">
                            Pas de créneau disponible pour cette date
                        </p>
                    )}

                    <ul className="w-[350px] mx-auto flex flex-wrap justify-between">
                        {availableHours.map((hour, index) => (
                            <li key={index} className="my-3 w-[45%]">
                                <input
                                    type="radio"
                                    id={index.toString()}
                                    name="hosting"
                                    onChange={handleHourChange}
                                    value={hour}
                                    className="hidden peer"
                                    required
                                />
                                <label
                                    htmlFor={index.toString()}
                                    className="block text-center w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-400 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600  dark:text-gray-400 dark:bg-transparent"
                                >
                                    {hour}
                                </label>
                            </li>
                        ))}
                    </ul>
                    {selectedHour !== "" && (
                        <Button
                            type="button"
                            style="primary"
                            onClick={handleAppointmentValidation}
                            className="my-3 mx-auto"
                        >
                            {isLogged ? "Passer au paiement" : "Valider"}
                        </Button>
                    )}
                </>
            )}

{whatShow === "information" && (
        <>
          <div className="flex items-center justify-between mb-3">
            {!isEbook && (
              <button
                onClick={() => {
                  setWhatShow("hour");
                  setSelectedHour("");
                }}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
            )}
            <h3 className="text-lg font-medium text-gray-900 flex-grow dark:text-white text-center">
              Informations personnelles
            </h3>
          </div>
          {!isEbook && (
            <>
              <p className="text-center font-bold">Rendez-vous le :</p>
              <p className="capitalize mb-6 font-medium text-center text-gray-500 dark:text-gray-300">
                {selectedDate?.toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }) +
                  " à " +
                  selectedHour}
              </p>
            </>
          )}

          <div>
            <label
              htmlFor="website-admin"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nom complet
            </label>
            <InputIcon
              iconSvg={<FaUser />}
              placeholder={"Jean DUPONT"}
              id={"website-admin"}
              className={"mb-6"}
              value={name}
              onChange={setName}
              required={true}
            />
            <label
              htmlFor="input-group-1"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ton email
            </label>
            <InputIcon
              type={"email"}
              iconSvg={<FaEnvelope />}
              placeholder={"jeveux@unjob.fr"}
              id={"input-group-1"}
              className={"mb-6"}
              value={email}
              onChange={setEmail}
              required={true}
            />
            <div className="flex items-center mb-5">
              <input
                id="link-checkbox"
                type="checkbox"
                checked={checkTerms}
                onChange={() => setCheckTerms(!checkTerms)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="link-checkbox"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                J&apos;ai lu et compris{" "}
                <a
                  target="_blank"
                  href="/cgv"
                  className="text-blue-600 dark:text-blue-500 hover:underline"
                >
                  les conditions générales de ventes
                </a>
                .
              </label>
            </div>
            <Button
              type="button"
              style="primary"
              onClick={handleInformationValidation}
              className="mx-auto block"
              disabled={!checkTerms}
            >
              Passer au paiement
            </Button>
          </div>
        </>
      )}

{whatShow === "payment" && (
        <>
          <h3 className="text-lg font-medium text-gray-900 flex-grow dark:text-white text-center">
            Paiement
          </h3>
          {isEbook ? (
            <p className="capitalize mb-6 font-medium text-center text-gray-500 dark:text-gray-300">
              {productTitle}
            </p>
          ) : (
            <>
              <p className="text-center font-bold">
                Rendez-vous d&apos;une heure le
              </p>
              <p className="capitalize mb-6 font-medium text-center text-gray-500 dark:text-gray-300">
                {selectedDate?.toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }) +
                  " à " +
                  selectedHour}
              </p>
            </>
          )}

          {!clientSecret ? (
            <div className="w-fit m-auto mt-10">
              <div className="border-gray-300 h-10 w-10  animate-spin rounded-full border-8 border-t-blue-600" />
            </div>
          ) : (
            <Elements options={options} stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          )}
        </>
      )}
            <button
                onClick={() => {
                    setIsBooking(false);
                }}
                type="button"
                className="mt-3 flex mx-auto text-gray-800 text-xs rounded-lg p-2.5 text-center items-center gap-2 "
            >
                <span className="dark:text-white">Annuler la réservation</span>
                <span className="sr-only">Annuler</span>
            </button>
        </div>
    )
}

export default Calendar