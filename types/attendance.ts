export interface AttendanceClassProps {
  qrCodeOrigin: {
    lat: number;
    long: number;
  };
  module: string;
  classStartTime: Date;
  classEndTime: Date;
  isActive: boolean;
  _id: string;
}
