import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {LanguagesMappings} from "@/constants/Languages";
import Colors from "@/constants/Colors";
import StyleValues from "@/constants/StyleValues";

const LanguageTabs = ({ selectedLang, onTabChange }: {selectedLang: string, onTabChange: (lang: string) => void}) => {

  const tabChange = (newTab: string) => {
    if (newTab !== selectedLang) {
      onTabChange(newTab);
    }
  }
  return (
    <View style={styles.tabContainer}>
      {Object.keys(LanguagesMappings).map((lang) => (
        <TouchableOpacity
          key={lang}
          style={[styles.tab, selectedLang === lang && styles.activeTab]}
          onPress={() => tabChange(lang)}
        >
          <Text style={[styles.tabText, selectedLang === lang && styles.activeTabText]}>
            {LanguagesMappings[lang as keyof typeof LanguagesMappings]}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    alignSelf: 'flex-start',
    backgroundColor: Colors.muted,
    height: 36,
    padding: 4,
    borderRadius: StyleValues.radius,
  },
  tab: {
    ...StyleValues.tab,
  },
  activeTab: {
    backgroundColor: Colors.background,
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  },
  tabText: {
    color: Colors.mutedForeground,
    fontWeight: '500',
    fontSize: 14,
  },
  activeTabText: {
    color: Colors.foreground,
  },
});

export default LanguageTabs;