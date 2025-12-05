"use client";
import React, { useState, useEffect } from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {Calendar as CalendarPicker, DateValue} from "@heroui/calendar";
import Button from '@/app/_global_components/Button';
import { toast, ToastContainer } from 'react-toastify';
import { calendarSelectToFormattedDate } from '@/lib/calendarSelectToFormattedDate';
import { paymentIntend } from '@/app/_data/paymentIntend';
import PaymentForm from '@/app/_components/PaymentForm';
import { useAuth } from '@/app/_context/AuthContext';
import EmailVerificationGuard from '@/app/_global_components/EmailVerificationGuard';

interface Appointment {
    planedToDetails: {
        month: number;
        day: number;
        hour: number;
    };
}

type CalendarView = "calendar" | "hour" | "information" | "payment";

function Calendar({
  setIsBooking, 
  productTitle, 
  productId,
  initialView = "calendar",
  onDirectPurchase
}: {
  setIsBooking: (isBooking: boolean) => void,
  productTitle: string,
  productId: number,
  initialView?: CalendarView,
  onDirectPurchase?: () => void
}) {
    const { user, loading } = useAuth();
    const [whatShow, setWhatShow] = useState<CalendarView>(initialView);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedHour, setSelectedHour] = useState("");
    const [noAppointmentAvailable, setNoAppointmentAvailable] = useState(false);
    const [availableHours, setAvailableHours] = useState<string[]>([]);
    const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
    const [isEbook, setIsEbook] = useState(initialView === "information");
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

    const handleAppointmentValidation = async () => {
      if (!user) {
        setWhatShow("information");
        return;
      }

      // Créer le paiement pour le rendez-vous
      try {
        if (selectedDate) {
          setAppointment(calendarSelectToFormattedDate(selectedDate, selectedHour));
        }

        const appointmentText = appointment || `Rendez-vous ${productTitle} - ${selectedDate?.toLocaleDateString("fr-FR")} à ${selectedHour}`;
        
        console.log('Création du paiement pour le rendez-vous:', appointmentText);
        const dataPayment = await paymentIntend(
          appointmentText,
          60,
          user.firstname + ' ' + user.lastname,
          user.email,
          productId,
          true,
          user.id
        );

        console.log('Paiement rendez-vous:', dataPayment);
        
        if (dataPayment.clientSecret) {
          setClientSecret(dataPayment.clientSecret);
          setWhatShow("payment");
        } else {
          console.error('Réponse de paiement invalide:', dataPayment);
          toast.error('Erreur lors de la création du paiement');
        }
      } catch (error: any) {
        console.error('Erreur création paiement rendez-vous:', error);
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

    useEffect(() => {
      // Ne s'exécute qu'au montage initial pour définir la vue de départ
      if (!loading && !user) {
        setWhatShow('information');
      } else if (!loading && user && initialView === 'calendar') {
        setWhatShow('calendar');
      }
    }, []); // Dépendances vides = seulement au montage

    return (
        <div className='w-full max-w-[400px] mx-auto flex flex-col items-center'>
          <ToastContainer />
            {whatShow === "calendar" &&
                <>
                    <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white text-center">
                        Sélectionne un jour
                    </h3>
                    <CalendarPicker aria-label="Date (No Selection)" color='danger' onChange={handleDateChange} isDateUnavailable={daysNotAvailable}/>
                </>
            }

            {whatShow === "hour" && (
                <>
                    <div className="flex items-center justify-between mb-3">
                        <button
                            onClick={() => {
                                setWhatShow("calendar");
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

                    <ul className="mx-auto flex flex-wrap justify-between">
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
                        <EmailVerificationGuard action="réserver ce rendez-vous">
                            <Button
                                type="button"
                                style="primary"
                                onClick={handleAppointmentValidation}
                                className="my-3 mx-auto"
                            >
                                {user ? "Passer au paiement" : "Valider"}
                            </Button>
                        </EmailVerificationGuard>
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
              Connexion requise
            </h3>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <p className="text-center text-gray-700 dark:text-gray-300 mb-2">Pour poursuivre la réservation, connecte-toi ou crée un compte.</p>
            <button
              className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/85 w-48"
              onClick={() => {
                if (selectedDate && selectedHour) {
                  localStorage.setItem(
                    "reservationSelection",
                    JSON.stringify({
                      date: selectedDate.toISOString(),
                      hour: selectedHour,
                      productId,
                      productTitle,
                    })
                  );
                }
                window.location.href = "/login";
              }}
            >
              Se connecter
            </button>
            <button
              className="bg-light text-gray-800 px-4 py-2 rounded hover:bg-gray-300 w-48"
              onClick={() => {
                if (selectedDate && selectedHour) {
                  localStorage.setItem(
                    "reservationSelection",
                    JSON.stringify({
                      date: selectedDate.toISOString(),
                      hour: selectedHour,
                      productId,
                      productTitle,
                    })
                  );
                }
                window.location.href = "/auth/login?signup=true";
              }}
            >
              Créer un compte
            </button>
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