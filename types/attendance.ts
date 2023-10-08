export interface Lecturer {
  _id: string;
  name: string;
}

export interface Module {
  _id: string;
  moduleName: string;
  moduleCode: string;
  lecturer: Lecturer;
}

export interface QRCodeOrigin {
  lat: number;
  long: number;
}

export interface SessionData {
  qrCodeOrigin: QRCodeOrigin;
  _id: string;
  module: Module;
  classStartTime: string;
  classEndTime: string;
}

