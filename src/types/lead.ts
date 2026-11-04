export interface ReservedLead {
  id: string;
  slotCode: string;
  businessName: string;
  contactName: string;
  phone: string;
  email: string;
  region: string;
  templateId: string;
  templateName: string;
  subdomain: string;
  lockedPriceCAD: number;
  originalPriceCAD: number;
  lockedPriceNGN?: number;
  originalPriceNGN?: number;
  notes?: string;
  timestamp: string;
  status: 'Reserved' | 'Contacted' | 'Onboarded' | 'Live';
}

