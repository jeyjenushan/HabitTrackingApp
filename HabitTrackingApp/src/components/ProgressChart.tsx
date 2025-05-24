import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

interface ProgressChartProps {
  percentage: number;
  color?: string;
  label?: string;
}

const ProgressChart = ({
  percentage,
  color = colors.primary,
  label
}: ProgressChartProps) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { 
              width: `${Math.min(100, Math.max(0, percentage))}%`,
              backgroundColor: color
            }
          ]}
        />
      </View>
      <Text style={styles.percentageText}>{percentage}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.text,
  },
  progressBar: {
    height: 20,
    backgroundColor: colors.gray,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    borderRadius: 10,
  },
  percentageText: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'right',
  },
});

export default ProgressChart;