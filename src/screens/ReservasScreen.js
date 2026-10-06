import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import useReserva from "../hooks/useReserva";
import EstadoVacio from "../components/EstadoVacio";
import { colors, spacing, typography } from "../theme";

export default function ReservasScreen() {
  const { reservas, cargando, cancelarReserva } = useReserva();

  const confirmarCancelacion = (reserva) => {
    Alert.alert(
      "Cancelar reserva",
      `¿Deseas cancelar la reserva de "${reserva.titulo}"?`,
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Sí, cancelar",
          style: "destructive",
          onPress: () => cancelarReserva(reserva.id),
        },
      ],
    );
  };

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.cargando}>Cargando reservas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Mis reservas</Text>

      {reservas.length === 0 ? (
        <EstadoVacio
          titulo="No tienes reservas"
          mensaje="Las clases que reserves aparecerán aquí."
        />
      ) : (
        <FlatList
          data={reservas}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.lista}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.clase}>{item.titulo}</Text>

              <Text style={styles.detalle}>
                Nivel: {item.nivel}
              </Text>

              <Text style={styles.detalle}>
                Profesor: {item.profesor}
              </Text>

              <Text style={styles.detalle}>
                Horario: {item.horario}
              </Text>

              <Text style={styles.precio}>
                ${item.precio}
              </Text>

              <TouchableOpacity
                style={styles.botonCancelar}
                onPress={() => confirmarCancelacion(item)}
              >
                <Text style={styles.textoBotonCancelar}>
                  Cancelar reserva
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colors.fondo,
    padding: spacing.md,
  },
  titulo: {
    ...typography.h2,
    color: colors.texto,
    marginBottom: spacing.md,
  },
  lista: {
    gap: spacing.md,
    paddingBottom: spacing.lg,
  },
  card: {
    backgroundColor: colors.superficie,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  clase: {
    ...typography.h3,
    color: colors.texto,
    marginBottom: spacing.sm,
  },
  detalle: {
    ...typography.body,
    color: colors.textoSuave,
    marginBottom: 4,
  },
  precio: {
    ...typography.h3,
    color: colors.primario,
    marginTop: spacing.sm,
  },
  botonCancelar: {
    marginTop: spacing.md,
    backgroundColor: colors.error || "#dc2626",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBotonCancelar: {
    color: "#fff",
    fontWeight: "700",
  },
  centrado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.fondo,
  },
  cargando: {
    color: colors.textoSuave,
  },
});