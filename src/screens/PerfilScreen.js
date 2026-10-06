import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import useReserva from "../hooks/useReserva";
import useAlmacenamiento from "../hooks/useAlmacenamiento";
import { colors, radius, spacing, typography } from "../theme";

const CLAVE_PERFIL = "@perfil_usuario";

const perfilInicial = {
  cedula: "",
  nombre: "",
  celular: "",
  correo: "",
};

export default function PerfilScreen() {
  const insets = useSafeAreaInsets();
  const { reservas } = useReserva();

  const [perfil, actualizarPerfil, cargando] = useAlmacenamiento(
    CLAVE_PERFIL,
    perfilInicial
  );

  const [formulario, setFormulario] = useState(perfilInicial);

  React.useEffect(() => {
    if (!cargando) {
      setFormulario(perfil);
    }
  }, [cargando, perfil]);

  const actualizarCampo = (campo, valor) => {
    setFormulario((actual) => ({
      ...actual,
      [campo]: valor,
    }));
  };

  const registrar = async () => {
    const { cedula, nombre, celular, correo } = formulario;

    if (!cedula || !nombre || !celular || !correo) {
      Alert.alert("Campos incompletos", "Completa todos los campos.");
      return;
    }

    await actualizarPerfil(formulario);

    Alert.alert("Registro exitoso", "Tus datos fueron guardados correctamente.");
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.pantalla,
        {
          paddingTop: insets.top + spacing.xl,
          paddingBottom: spacing.xl,
        },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.avatar}>
        <Ionicons name="person-outline" size={38} color={colors.primario} />
      </View>

      <Text style={typography.titulo}>Mi perfil</Text>

      <Text style={styles.descripcion}>
        Registra tus datos para completar tu perfil.
      </Text>

      <View style={styles.formulario}>
        <Text style={styles.etiqueta}>Cédula</Text>
        <TextInput
          style={styles.input}
          value={formulario.cedula}
          onChangeText={(valor) => actualizarCampo("cedula", valor)}
          placeholder="Ingresa tu cédula"
          keyboardType="numeric"
        />

        <Text style={styles.etiqueta}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={formulario.nombre}
          onChangeText={(valor) => actualizarCampo("nombre", valor)}
          placeholder="Ingresa tu nombre"
        />

        <Text style={styles.etiqueta}>Celular</Text>
        <TextInput
          style={styles.input}
          value={formulario.celular}
          onChangeText={(valor) => actualizarCampo("celular", valor)}
          placeholder="Ingresa tu celular"
          keyboardType="phone-pad"
        />

        <Text style={styles.etiqueta}>Correo</Text>
        <TextInput
          style={styles.input}
          value={formulario.correo}
          onChangeText={(valor) => actualizarCampo("correo", valor)}
          placeholder="Ingresa tu correo"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.boton} onPress={registrar}>
          <Text style={styles.textoBoton}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flexGrow: 1,
    backgroundColor: colors.fondo,
    alignItems: "center",
    paddingHorizontal: spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: radius.full,
    backgroundColor: colors.primarioSuave,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  descripcion: {
    ...typography.secundario,
    textAlign: "center",
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  formulario: {
    width: "100%",
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borde,
    padding: spacing.lg,
  },
  etiqueta: {
    ...typography.secundario,
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.borde,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.fondo,
    color: colors.texto,
  },
  boton: {
    backgroundColor: colors.primario,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: "center",
    marginTop: spacing.lg,
  },
  textoBoton: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  resumen: {
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borde,
    padding: spacing.lg,
    marginTop: spacing.xl,
  },
  numero: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.primario,
  },
});