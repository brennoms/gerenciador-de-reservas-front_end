import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { X, Check } from 'lucide-react';

import { useSideBarContext } from '../layouts/PrivateLayout';
import { useProperty } from '../contexts/PropertyContext';
import { useAlert } from '../contexts/AlertContext';
import { useAuth } from '../contexts/AuthContext';
import CalendarYear from '../components/CalendarYear';
import { removeReservation } from '../services/reservationService';
import { isoToLocaleString } from '../utils/dataUtils';

export default function Property() {
  const location = useLocation();
  const isChildRoute = location.pathname.endsWith('/reservations');
  const { setOptions } = useSideBarContext();
  const { setAlertMessage } = useAlert();
  const { token } = useAuth();
  const { property, year, selectedDates, setSelectedDates, reloadCalendar, setReloadCalendar } =
    useProperty();
  const [indexSelect, setIndexSelect] = useState(0);
  const [alertRemoveReservation, setAlertRemoveReservation] = useState(false);

  useEffect(() => {
    if (!isChildRoute) {
      setOptions([
        { name: 'Fazer Reserva', path: `${location.pathname}/reservations` },
        { name: 'voltar', path: -1 },
      ]);
    } else {
      setOptions([{ name: 'voltar', path: -1 }]);
    }
    setSelectedDates([new Date().toISOString().split('T')[0]]);
    setReloadCalendar(!reloadCalendar);
  }, [location]);

  function selectDate(day) {
    if (day.reservation) {
      const dates = [];
      let current = new Date(day.reservation.inityDate);
      while (current <= new Date(day.reservation.endDate)) {
        if (current.toISOString().split('T')[0] === day.date) {
          setIndexSelect(dates.length);
        }
        const date = { ...day, date: current.toISOString().split('T')[0] };
        dates.push(date);
        current.setDate(current.getDate() + 1);
      }
      setSelectedDates(dates);
    } else {
      setSelectedDates([day]);
      setIndexSelect(0);
    }
  }

  function clickRemoveReservation() {
    removeReservation(
      selectedDates[indexSelect].reservation.id,
      selectedDates[indexSelect].reservation.propertyId,
      token
    ).then(res => {
      if (!res.ok) {
        setAlertMessage('Erro no sistema ao remover a reserva');
      } else {
        setReloadCalendar(!reloadCalendar);
      }
      setAlertRemoveReservation(false);
    });
  }

  return (
    <div className="max-w-full h-full">
      {alertRemoveReservation ? (
        <div className="fixed z-20 inset-0 w-screen h-screen flex justify-center items-center bg-black/50">
          <div className="bg-white  flex flex-col items-center p-5 m-5 rounded border border-black">
            <p className="">Tem certeza que deseja remover essa reserva ?</p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setAlertRemoveReservation(false);
                }}
              >
                <X className="text-red-500" size={'2rem'} />
              </button>
              <button onClick={clickRemoveReservation}>
                <Check className="text-green-500" size={'2rem'} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {isChildRoute ? (
        <Outlet />
      ) : (
        <>
          <div className="flex flex-col items-center mb-2">
            {property ? (
              <>
                <h1 className="default-h1 mb-0">{property.name}</h1>
                <p className="text-gray-500">{property.adress}</p>
                <img className="rounded w-11/12 sm:w-min" src={property.imageUrl} />
              </>
            ) : (
              <></>
            )}
          </div>
          <hr className="border" />
          <div className="flex flex-col sm:flex-row max-w-full max-h-fit p-2">
            <div className="w-full sm:w-1/2 2xl:w-2/3">
              <CalendarYear year={year} carrousel={window.innerWidth < 1285} click={selectDate} />
            </div>
            <div className="w-full sm:w-1/2 2xl:w-1/3 flex flex-col items-center">
              <p className="default-h1 text-2xl mb-0">
                {selectedDates[indexSelect]?.date
                  ? isoToLocaleString(selectedDates[indexSelect].date)
                  : 'Selecione Um Dia.'}
              </p>
              <p className="h-4 mb-4 font-bold text-red-500">
                {selectedDates[indexSelect]?.holiday ? selectedDates[indexSelect].holiday.name : ''}
              </p>
              <div className="flex gap-2 w-11/12 justify-center">
                <div className="flex flex-col items-end whitespace-nowrap text-lg">
                  <p>Locatário:</p>
                  <p>Contato:</p>
                  <p>sinal:</p>
                  <p>Valor da Reserva:</p>
                  <p>Início Da Estada:</p>
                  <p>Fim da Estada:</p>
                </div>
                {selectedDates[indexSelect]?.reservation ? (
                  <div className="text-lg whitespace-nowrap">
                    <p>{selectedDates[indexSelect].reservation.name || 'indefinido'}</p>
                    <p>{selectedDates[indexSelect].reservation.contact || 'indefinido'}</p>
                    <p>{selectedDates[indexSelect].reservation.deposit || 'indefinido'}</p>
                    <p>{selectedDates[indexSelect].reservation.value || 'indefinido'}</p>
                    <p>
                      {isoToLocaleString(selectedDates[indexSelect].reservation.inityDate) ||
                        'indefinido'}
                    </p>
                    <p>
                      {isoToLocaleString(selectedDates[indexSelect].reservation.endDate) ||
                        'indefinido'}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="whitespace-nowrap invisible">Início Da Estadia:</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2 m-6">
                <button
                  type="button"
                  onClick={() => {
                    setAlertRemoveReservation(true);
                  }}
                  disabled={selectedDates[indexSelect]?.reservation ? false : true}
                  className={`default-button ${selectedDates[indexSelect]?.reservation ? '' : 'bg-black/10 hover:bg-black/10'}`}
                >
                  Remover
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <div style={{ height: '15vh' }} />
    </div>
  );
}
