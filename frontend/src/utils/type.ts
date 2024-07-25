export interface DriverBooking {
  id: string;
  customerId: string;
  customerPhoneNumber?: string;
  staffID?: string;
  driverID?: string;
  departureID?: string;
  destinationID?: string;
  distance?: number;
  timeDuration?: string;
  date?: string;
  paymentType?: string;
  bookingType?: string;
  price: number;
  statusType: string;
  vehicle: number;
}

export interface DriverBookingWithDriverAndCustomer {
  id: string;
  customerId: string;
  customerPhoneNumber?: string;
  staffID?: string;
  driverID?: string;
  departureID?: string;
  destinationID?: string;
  distance?: number;
  timeDuration?: string;
  date?: string;
  paymentType?: string;
  bookingType?: string;
  price: number;
  statusType: string;
  vehicle: number;
  driver: Driver;
  customer: Customer;
}

export interface Driver {
  id: string;
  distance?: string;
  email?: string;
  historyId?: string;
  latitude?: null;
  longtitude?: null;
  name?: string;
  password: string;
  passwordHash: string;
  phoneNumber?: string;
  rolePermission: number;
  status?: string;
  vehicleRegistration?: string;
}

export interface Admin {
  id: string;
  name: string;
  passwordHash: string;
  // password: string;
  email: string;
  phoneNumber: string;
  role: string;
  status: Int16Array;
}

export interface CallCenterAgent {
  id: string;
  historyId: string;
  name: string;
  passwordHash: string;
  password: string;
  email: string;
  phoneNumber: string;
  role: string;
  status: Int16Array;
}

export interface Customer {
  email?: string;
  historyId: string;
  id: string;
  name?: string;
  password: string;
  passwordHash: string;
  phoneNumber?: string;
  rolePermission: number;
}

export interface Location {
  id: string;
  longtitude: number;
  latitude: number;
  destination?: string;
  street?: string;
  district?: string;
  city?: string;
  country?: string;
}
