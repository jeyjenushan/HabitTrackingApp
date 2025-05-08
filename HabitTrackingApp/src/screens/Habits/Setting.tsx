import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";

import { LogOut, Trash2, User, Info, Shield } from "lucide-react-native";

import { Platform } from "react-native";
import colors from "../../constants/colors";
import Button from "../../components/Button";
import { AuthContext } from "../../context/AuthContext";
import { clearUser } from "../../services/authService";

export default function Setting() {
  const{user,logout,clearAllData}=useContext(AuthContext)
  
  
  const handleSignOut = () => {
  logout()
    
  };
  
  const handleClearData = () => {

    
    Alert.alert(
      "Clear All Data",
      "Are you sure you want to delete all your habits and progress? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            if (user?.id) {
                clearAllData();
            }
          },
          style: "destructive",
        },
      ]
    );
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <View style={styles.card}>
          <View style={styles.profileInfo}>
            <View style={styles.profileInitial}>
              <Text style={styles.initialText}>
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </Text>
            </View>
            <View>
              <Text style={styles.profileName}>{user?.name || "User"}</Text>
              <Text style={styles.profileEmail}>{user?.email}</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.menuItem}>
          <User size={20} color={colors.text} />
          <Text style={styles.menuText}>Edit Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
          <LogOut size={20} color={colors.text} />
          <Text style={styles.menuText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <Info size={20} color={colors.text} />
          <Text style={styles.menuText}>About</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Shield size={20} color={colors.text} />
          <Text style={styles.menuText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.dangerSection}>
        <Button
          title="Clear All Data"
          onPress={handleClearData}
          variant="outline"
          style={styles.dangerButton}
          textStyle={{ color: colors.error }}
          leftIcon={<Trash2 size={18} color={colors.error} />}
        />
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileInitial: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  initialText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 16,
  },
  dangerSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  dangerButton: {
    borderColor: colors.error,
  },
  footer: {
    alignItems: "center",
    paddingBottom: 32,
  },
  version: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});