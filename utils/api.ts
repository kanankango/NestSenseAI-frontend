import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface WellnessEntry {
  user_id: string;
  entry_date: string;
  feeling_level: number;
  energy_level: number;
  fatigue: boolean;
  anxiety: boolean;
  sleep_issues: boolean;
  physical_discomfort: boolean;
  mood_swings: boolean;
  appetite_changes: boolean;
}

export const saveDailyEntry = async (entry: WellnessEntry): Promise<WellnessEntry> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/wellness`, entry);
    return response.data;
  } catch (error) {
    console.error('Error saving wellness entry:', error);
    throw error;
  }
};

export const getUserEntries = async (userId: string): Promise<WellnessEntry[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/wellness?user_id=${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching wellness entries:', error);
    throw error;
  }
};