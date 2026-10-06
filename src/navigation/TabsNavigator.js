import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ClasesStack from "./ClasesStack";
import ReservasScreen from "../screens/ReservasScreen";
import PerfilScreen from "../screens/PerfilScreen";
import { colors } from "../theme";

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primario,
        tabBarInactiveTintColor: colors.textoSuave,
        tabBarStyle: {
          backgroundColor: colors.superficie,
          borderTopColor: colors.borde,
        },
        tabBarIcon: ({ color, size }) => {
          const iconos = {
            Clases: "school-outline",
            "Mis reservas": "calendar-outline",
            "Mi perfil": "person-outline",
          };

          return (
            <Ionicons
              name={iconos[route.name] || "ellipse-outline"}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Clases" component={ClasesStack} />
      <Tab.Screen name="Mis reservas" component={ReservasScreen} />
      <Tab.Screen name="Mi perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}
