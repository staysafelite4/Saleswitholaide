import React, { createContext, useContext, useState, useEffect } from 'react';
import { SpaTreatment, SpaConfig, SpaAppointment, SpaTherapist } from '../types/spa';
import {
  INITIAL_TREATMENTS,
  INITIAL_SPA_CONFIG,
  INITIAL_SPA_APPOINTMENTS
} from '../data/initialSpaData';

interface SpaContextType {
  config: SpaConfig;
  treatments: SpaTreatment[];
  appointments: SpaAppointment[];
  selectedTreatment: SpaTreatment | null;
  isBookingOpen: boolean;
  isAdminOpen: boolean;
  isAdminAuth: boolean;
  activeAdminTab: string;
  setSelectedTreatment: (t: SpaTreatment | null) => void;
  setIsBookingOpen: (open: boolean) => void;
  setIsAdminOpen: (open: boolean) => void;
  setIsAdminAuth: (auth: boolean) => void;
  setActiveAdminTab: (tab: string) => void;
  updateConfig: (updates: Partial<SpaConfig>) => void;
  updateTreatment: (id: string, updates: Partial<SpaTreatment>) => void;
  addTreatment: (t: Omit<SpaTreatment, 'id'>) => void;
  deleteTreatment: (id: string) => void;
  toggleTreatmentAvailability: (id: string, availability: SpaTreatment['availability']) => void;
  updateTreatmentPrice: (id: string, price: number, compareAtPrice?: number) => void;
  submitAppointment: (booking: {
    clientName: string;
    clientPhone: string;
    date: string;
    timeSlot: string;
    therapist?: string;
    pressurePreference?: string;
    addOns?: string[];
    notes?: string;
  }) => { appId: string; whatsappUrl: string; formattedMessage: string };
  updateAppointmentStatus: (id: string, status: SpaAppointment['status']) => void;
  formatCurrency: (amount: number) => string;
  resetToDefaults: () => void;
  exportData: () => string;
  importData: (json: string) => { success: boolean; error?: string };
}

const STORAGE_KEYS = {
  CONFIG: 'solace_spa_config_v3',
  TREATMENTS: 'solace_spa_treatments_v3',
  APPOINTMENTS: 'solace_spa_appointments_v3'
};

const SpaContext = createContext<SpaContextType | null>(null);

export const SpaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SpaConfig>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return stored ? JSON.parse(stored) : INITIAL_SPA_CONFIG;
    } catch {
      return INITIAL_SPA_CONFIG;
    }
  });

  const [treatments, setTreatments] = useState<SpaTreatment[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TREATMENTS);
      return stored ? JSON.parse(stored) : INITIAL_TREATMENTS;
    } catch {
      return INITIAL_TREATMENTS;
    }
  });

  const [appointments, setAppointments] = useState<SpaAppointment[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      return stored ? JSON.parse(stored) : INITIAL_SPA_APPOINTMENTS;
    } catch {
      return INITIAL_SPA_APPOINTMENTS;
    }
  });

  const [selectedTreatment, setSelectedTreatment] = useState<SpaTreatment | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('pricing');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TREATMENTS, JSON.stringify(treatments));
  }, [treatments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
  }, [appointments]);

  const formatCurrency = (amount: number): string => {
    const symbol = config.currencySymbol || '$';
    return `${symbol}${Math.round(amount).toLocaleString('en-US')}`;
  };

  const updateConfig = (updates: Partial<SpaConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const updateTreatment = (id: string, updates: Partial<SpaTreatment>) => {
    setTreatments(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)));
  };

  const addTreatment = (tData: Omit<SpaTreatment, 'id'>) => {
    const newT: SpaTreatment = {
      ...tData,
      id: `spa_${Date.now()}`
    };
    setTreatments(prev => [newT, ...prev]);
  };

  const deleteTreatment = (id: string) => {
    setTreatments(prev => prev.filter(t => t.id !== id));
  };

  const toggleTreatmentAvailability = (id: string, availability: SpaTreatment['availability']) => {
    setTreatments(prev => prev.map(t => (t.id === id ? { ...t, availability } : t)));
  };

  const updateTreatmentPrice = (id: string, price: number, compareAtPrice?: number) => {
    setTreatments(prev =>
      prev.map(t => (t.id === id ? { ...t, price, compareAtPrice: compareAtPrice || undefined } : t))
    );
  };

  const submitAppointment = (booking: {
    clientName: string;
    clientPhone: string;
    date: string;
    timeSlot: string;
    therapist?: string;
    pressurePreference?: string;
    addOns?: string[];
    notes?: string;
  }) => {
    const appId = `SPA-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    const timestamp = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const targetTreatment = selectedTreatment || treatments[0];

    const newApp: SpaAppointment = {
      id: appId,
      clientName: booking.clientName,
      clientPhone: booking.clientPhone,
      treatmentName: targetTreatment.title,
      treatmentPrice: targetTreatment.price,
      duration: targetTreatment.duration,
      date: booking.date,
      timeSlot: booking.timeSlot,
      therapistPreference: booking.therapist,
      pressurePreference: booking.pressurePreference || 'Medium Therapeutic',
      addOns: booking.addOns || [],
      notes: booking.notes,
      status: 'pending',
      timestamp
    };

    setAppointments(prev => [newApp, ...prev]);

    const lines = [
      `🌿 *APPOINTMENT RESERVATION: #${appId}*`,
      `*${config.spaName}*`,
      `━━━━━━━━━━━━━━━━━━`,
      `👤 *Client Name:* ${booking.clientName}`,
      `📞 *Phone:* ${booking.clientPhone}`,
      `💆‍♀️ *Treatment Ritual:* ${targetTreatment.title} (${targetTreatment.duration})`,
      `🗓 *Requested Date:* ${booking.date}`,
      `⏰ *Time Slot:* ${booking.timeSlot}`,
      booking.therapist ? `✨ *Practitioner:* ${booking.therapist}` : '',
      booking.pressurePreference ? `✋ *Pressure Preference:* ${booking.pressurePreference}` : '',
      booking.addOns && booking.addOns.length > 0 ? `🌸 *Ritual Add-Ons:* ${booking.addOns.join(', ')}` : '',
      booking.notes ? `📝 *Intake / Focus Area:* ${booking.notes}` : '',
      `━━━━━━━━━━━━━━━━━━`,
      `Session Fee: ${formatCurrency(targetTreatment.price)}`,
      `━━━━━━━━━━━━━━━━━━`,
      `Please confirm practitioner schedule & intake preparation. Thank you!`
    ].filter(Boolean);

    const formattedMessage = lines.join('\n');
    const cleanPhone = (config.whatsappNumber || '2348030795206').replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(formattedMessage)}`;

    return { appId, whatsappUrl, formattedMessage };
  };

  const updateAppointmentStatus = (id: string, status: SpaAppointment['status']) => {
    setAppointments(prev => prev.map(a => (a.id === id ? { ...a, status } : a)));
  };

  const resetToDefaults = () => {
    setConfig(INITIAL_SPA_CONFIG);
    setTreatments(INITIAL_TREATMENTS);
    setAppointments(INITIAL_SPA_APPOINTMENTS);
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
    localStorage.removeItem(STORAGE_KEYS.TREATMENTS);
    localStorage.removeItem(STORAGE_KEYS.APPOINTMENTS);
  };

  const exportData = (): string => {
    return JSON.stringify({ config, treatments, appointments }, null, 2);
  };

  const importData = (jsonStr: string): { success: boolean; error?: string } => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.config) setConfig(data.config);
      if (Array.isArray(data.treatments)) setTreatments(data.treatments);
      if (Array.isArray(data.appointments)) setAppointments(data.appointments);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message || 'Invalid format' };
    }
  };

  return (
    <SpaContext.Provider
      value={{
        config,
        treatments,
        appointments,
        selectedTreatment,
        isBookingOpen,
        isAdminOpen,
        isAdminAuth,
        activeAdminTab,
        setSelectedTreatment,
        setIsBookingOpen,
        setIsAdminOpen,
        setIsAdminAuth,
        setActiveAdminTab,
        updateConfig,
        updateTreatment,
        addTreatment,
        deleteTreatment,
        toggleTreatmentAvailability,
        updateTreatmentPrice,
        submitAppointment,
        updateAppointmentStatus,
        formatCurrency,
        resetToDefaults,
        exportData,
        importData
      }}
    >
      {children}
    </SpaContext.Provider>
  );
};

export const useSpa = () => {
  const context = useContext(SpaContext);
  if (!context) {
    throw new Error('useSpa must be used within a SpaProvider');
  }
  return context;
};
