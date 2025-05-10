import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSideBarContext } from '../layouts/PrivateLayout';
import { useProperty } from '../contexts/PropertyContext';
import { useAuth } from '../contexts/AuthContext';
import { useAlert } from '../contexts/AlertContext';
import CalendarYear from '../components/CalendarYear';
import { makeReservation } from '../services/reservationService';

export default function Property() {
  const navigate = useNavigate();
  const { setOptions } = useSideBarContext();
  const { year, calendar, selectedDates, setSelectedDates, propertyId } = useProperty();
  const { setAlertMessage } = useAlert();
  const { token } = useAuth();
  const [tenantName, setTenantName] = useState('');
  const [contact, setContact] = useState('');
  const [deposit, setDeposit] = useState('');
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setOptions([{ name: 'voltar', path: -1 }]);
    setSelectedDates([]);
  }, []);

  function selectDates(day) {
    setMessage('');
    if (selectedDates.length === 0) {
      setSelectedDates([day]);
    } else if (selectedDates.length === 1) {
      const dates = [];
      let end;
      let current;
      if (selectedDates[0].date.split('-') <= day.date.split('-')) {
        current = new Date(selectedDates[0].date);
        end = new Date(day.date);
      } else {
        current = new Date(day.date);
        end = new Date(selectedDates[0].date);
      }
      while (current <= end) {
        dates.push({ date: current.toISOString().split('T')[0] });
        current.setDate(current.getDate() + 1);
      }
      setSelectedDates(dates);
    } else {
      setSelectedDates([day]);
    }
  }

  function HandleSubmit(e) {
    e.preventDefault();
    if (selectedDates.length === 0) {
      setMessage('Selecione um periodo para a reserva');
      return 0;
    }
    const reservation = {
      tenantName,
      contact,
      deposit,
      value,
      initDate: selectedDates[0]?.date,
      endDate: selectedDates[selectedDates.length - 1]?.date,
    };
    makeReservation(reservation, propertyId, token).then(res => {
      if (!res.ok) {
        setMessage(res.message || 'erro ao fazer a reserva');
      } else {
        navigate(-1, { replace: true });
        setAlertMessage('Reserva feita!');
      }
    });
  }

  function verifyReservation(date) {
    const reservation = calendar?.flatMap(month => month.days)?.find(day => day.date === date.date)
      ?.reservation
      ? true
      : false;
    if (reservation) {
      return (
        <pre key={date.date} className="text-red-500">
          {date?.date?.split('-')[2]}/{date?.date?.split('-')[1]}/{date?.date?.split('-')[0]} -
          Indisponível
        </pre>
      );
    }
    return <></>;
  }

  return (
    <div className="max-w-full h-full pr-3">
      <div className="flex flex-col sm:flex-row max-w-full max-h-fit p-2">
        <div className="w-full sm:w-1/2 2xl:w-2/3 sm:order-last">
          <h1 className="default-h1">Selecione Um Intervalo</h1>
          <CalendarYear year={year} carrousel={window.innerWidth < 1285} click={selectDates} />
        </div>
        <div className="w-full sm:w-1/2 2xl:w-1/3 mt-4 flex flex-col items-center p-5">
          <p className="text-red-500">{message}</p>
          {selectedDates.map((date, index) => (
            <div key={index}>{verifyReservation(date)}</div>
          ))}

          <form
            onSubmit={HandleSubmit}
            className="flex flex-col items-center justify-center gap-1 max-w-full sm:order-first"
          >
            <h1 className="default-h1">Nova Reserva</h1>

            <input
              className="comum-entry"
              value={tenantName}
              placeholder="Nome do Locatário"
              onChange={e => setTenantName(e.target.value)}
              required
            />

            <input
              className="comum-entry"
              value={contact}
              placeholder="Contato"
              onChange={e => setContact(e.target.value)}
              required
            />

            <input
              className="comum-entry"
              value={deposit}
              placeholder="Sinal"
              onChange={e => setDeposit(e.target.value)}
              required
            />

            <input
              className="comum-entry"
              value={value}
              placeholder="Valor da Reserva"
              onChange={e => setValue(e.target.value)}
              required
            />

            <div className="flex items-center max-w-full">
              <p className="mr-1">Início Da Estadia:</p>
              <input
                className="w-8"
                value={' ' + selectedDates[0]?.date?.split('-')[2]}
                onChange={() => {}}
                placeholder="DD"
                required
              />
              <p>/</p>
              <input
                className="w-8"
                value={' ' + selectedDates[0]?.date?.split('-')[1]}
                onChange={() => {}}
                placeholder="MM"
                required
              />
              <p>/</p>
              <input
                className="w-16"
                value={' ' + selectedDates[0]?.date?.split('-')[0]}
                onChange={() => {}}
                placeholder="AAAA"
                required
              />
            </div>

            <div className="flex items-center max-w-full">
              <p className="mr-1">Fim da Estadia:</p>
              <input
                className="w-8"
                value={' ' + selectedDates[selectedDates.length - 1]?.date?.split('-')[2]}
                onChange={() => {}}
                placeholder="DD"
                required
              />
              <p>/</p>
              <input
                className="w-8"
                value={' ' + selectedDates[selectedDates.length - 1]?.date?.split('-')[1]}
                onChange={() => {}}
                placeholder="MM"
                required
              />
              <p>/</p>
              <input
                className="w-16"
                value={' ' + selectedDates[selectedDates.length - 1]?.date?.split('-')[0]}
                onChange={() => {}}
                placeholder="AAAA"
                required
              />
            </div>
            <button type="submit" className="default-button w-full m-1">
              Confirmar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
