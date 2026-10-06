import React, { useCallback, useMemo, createContext } from "react";
import useAlmacenamiento from "../hooks/useAlmacenamiento";

const CLAVE_RESERVAS = "@reservas_ingles";

export const ReservaContext = createContext(null);

export function ReservaProvider({ children }) {
  const [reservas, guardarReservas, cargando] = useAlmacenamiento(
    CLAVE_RESERVAS,
    [],
  );

  const agregarReserva = useCallback(
    (clase, horario) => {
      const nuevaReserva = {
        id: `${clase.id}-${horario}`,
        claseId: clase.id,
        titulo: clase.titulo,
        nivel: clase.nivel,
        profesor: clase.profesor.nombre,
        precio: clase.precio,
        horario,
        creadoEn: new Date().toISOString(),
      };

      if (reservas.some((reserva) => reserva.id === nuevaReserva.id)) {
        return { ok: false };
      }

      guardarReservas([...reservas, nuevaReserva]);
      return { ok: true };
    },
    [reservas, guardarReservas],
  );

  const cancelarReserva = useCallback(
    (idReserva) => {
      const nuevasReservas = reservas.filter(
        (reserva) => reserva.id !== idReserva,
      );

      guardarReservas(nuevasReservas);
    },
    [reservas, guardarReservas],
  );

  const valor = useMemo(
    () => ({
      reservas,
      cargando,
      agregarReserva,
      cancelarReserva,
    }),
    [reservas, cargando, agregarReserva, cancelarReserva],
  );

  return (
    <ReservaContext.Provider value={valor}>
      {children}
    </ReservaContext.Provider>
  );
}