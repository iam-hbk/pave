import { addHours } from "date-fns";

interface AttendanceClassProps {
  qrCodeOrigin: {
    lat: number;
    long: number;
  };
  moduleName: string;
  moduleCode: string;
  lecturerName: string;
  classStartTime: Date;
  classEndTime: Date;
}

export async function getClassInfo(
  classId: string
): Promise<AttendanceClassProps> {
  const mockApiResponse = {
    qrCodeOrigin: {
      // lat: 40.7128,
      // long: -74.006,
      //within proximity to HBK's place
      long: 27.97581902090456,
      lat: -26.13458398360046,
    },
    moduleName: "Information System 3A",
    moduleCode: "IFS013A",
    lecturerName: "Dr. Fani Radebe",
    classStartTime: "2023-09-25T16:00:00Z",
    classEndTime: "2023-09-25T18:30:00Z",
  };

  // Simulate a delay (e.g., network request)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Convert date strings to Date objects
  return {
    ...mockApiResponse,
    // classStartTime: new Date(mockApiResponse.classStartTime),
    // classEndTime: new Date(mockApiResponse.classEndTime),
    //For testing
    classStartTime: new Date(),
    classEndTime: addHours(new Date(), 2),
  };
}

// Example usage:
// getClassInfo("someClassId").then(data => console.log(data));
