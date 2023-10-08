import { ModuleType } from "@/types/module";
import api from "../../api";
export async function getModuleById(
  moduleId: string,
  token: string
): Promise<ModuleType> {
  try {
    const data: any = await api
      .auth(`Bearer ${token}`)
      .get(`/module/${moduleId}`);

    //   console.log("[MODULE DATA]", data);

    const module: ModuleType = {
      _id: data._id,
      moduleName: data.moduleName,
      moduleCode: data.moduleCode,
      lecturer: data.lecturer,
      moduleMaterial: data.moduleMaterial,
    };

    return module;
  } catch (error) {
    throw Error((error as Error).message);
  }
}
