import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Basado en el patrón useAsyncStorage del prototipo MercadoEjemplo:
// mantiene el estado de React sincronizado con AsyncStorage.
export default function useAlmacenamiento(clave, valorInicial) {
  const [valor, setValor] = useState(valorInicial);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const guardado = await AsyncStorage.getItem(clave);
        if (guardado !== null) {
          setValor(JSON.parse(guardado));
        }
      } catch (error) {
        console.error(`Error al obtener ${clave} desde AsyncStorage:`, error);
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, [clave]);

  const actualizar = async (nuevoValor) => {
    setValor(nuevoValor);
    try {
      await AsyncStorage.setItem(clave, JSON.stringify(nuevoValor));
    } catch (error) {
      console.error(`Error al guardar ${clave} en AsyncStorage:`, error);
    }
  };

  return [valor, actualizar, cargando];
}
