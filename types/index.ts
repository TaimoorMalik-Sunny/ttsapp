// types/index.ts
export interface ProfitReport {
    totalSending: number;
    totalReceiving: number;
    profit: number;
    startDate: string;
    endDate: string;
  }
  
  export interface Customer {
    id: string;
    phoneNumber: string;
    name: string;
    cnic: string;
    other?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Transaction {
    id: string;
    customerPhone: string;
    customerName: string;
    customerCnic: string;
    sendingAmount: number;
    receivingAmount: number;
    timestamp: Date;
    userId: string;
    userEmail: string;
    receiverInfo?: string;
    operator?: string;
    type: string;
  }