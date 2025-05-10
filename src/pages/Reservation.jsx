import { useEffect, useState } from 'react';

import { useSideBarContext } from '../layouts/PrivateLayout';
import { useProperty } from '../contexts/PropertyContext';
import CalendarYear from '../components/CalendarYear';

export default function Property() {
  const { setOptions } = useSideBarContext();
  const { year, calendar, selectedDates, setSelectedDates } = useProperty();
  const [a, setA] = useState('');

  useEffect(() => {
    setOptions([{ name: 'voltar', path: -1 }]);
    setSelectedDates([]);
  }, []);

  function selectDates(day) {
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
          {selectedDates.map((date, index) => (
            <div key={index}>{verifyReservation(date)}</div>
          ))}

          <form
            onSubmit={() => {}}
            className="flex flex-col items-center justify-center gap-1 max-w-full sm:order-first"
          >
            <h1 className="default-h1">Nova Reserva</h1>

            <input
              className="comum-entry"
              value={a}
              placeholder="Nome do Locatário"
              onChange={e => setA(e.target.value)}
              required
            />

            <input
              className="comum-entry"
              value={a}
              placeholder="Contato"
              onChange={e => setA(e.target.value)}
              required
            />

            <input
              className="comum-entry"
              value={a}
              placeholder="Sinal"
              onChange={e => setA(e.target.value)}
              required
            />

            <input
              className="comum-entry"
              value={a}
              placeholder="Valor da Reserva"
              onChange={e => setA(e.target.value)}
              required
            />

            <div className="flex items-center max-w-full">
              <p className="mr-1">Início Da Estadia:</p>
              <input
                className="w-8"
                value={' ' + selectedDates[0]?.date?.split('-')[2]}
                placeholder="DD"
                onChange={e => setA(e.target.value)}
                required
              />
              <p>/</p>
              <input
                className="w-8"
                value={' ' + selectedDates[0]?.date?.split('-')[1]}
                placeholder="MM"
                onChange={e => setA(e.target.value)}
                required
              />
              <p>/</p>
              <input
                className="w-16"
                value={' ' + selectedDates[0]?.date?.split('-')[0]}
                placeholder="AAAA"
                onChange={e => setA(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center max-w-full">
              <p className="mr-1">Fim da Estadia:</p>
              <input
                className="w-8"
                value={' ' + selectedDates[selectedDates.length - 1]?.date?.split('-')[2]}
                placeholder="DD"
                onChange={e => setA(e.target.value)}
                required
              />
              <p>/</p>
              <input
                className="w-8"
                value={' ' + selectedDates[selectedDates.length - 1]?.date?.split('-')[1]}
                placeholder="MM"
                onChange={e => setA(e.target.value)}
                required
              />
              <p>/</p>
              <input
                className="w-16"
                value={' ' + selectedDates[selectedDates.length - 1]?.date?.split('-')[0]}
                placeholder="AAAA"
                onChange={e => setA(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="default-button w-full m-1">
              Confirmar
            </button>
          </form>
        </div>
      </div>
      <div style={{ height: '15vh' }} />
    </div>
  );
}
