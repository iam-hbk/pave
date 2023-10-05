import api from "../../api";

export interface AttendancePost {
  studentId: string;
  sessionId: string;
  rewardAmount: number;
}

export async function signAttendance(record: AttendancePost, token: string) {
  try {
    const data: any = await api
      .auth(`Bearer ${token}`)
      .url("/attendance")
      .post({
        student: record.studentId,
        session: record.sessionId,
        rewardAmount: record.rewardAmount,
      });
    if (data) return "Attendance Recorded !";
    else throw Error("Failed to record attendance");
  } catch (error) {
    throw Error((error as Error).message);
  }
}
