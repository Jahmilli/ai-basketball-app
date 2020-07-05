import { PermissionsAndroid, Permission } from "react-native";

export interface IPermissionRequest {
  title: string;
  message: string;
  permission: Permission;
}

export const requestPermissions = async (
  permissionRequests: IPermissionRequest[]
): Promise<boolean> => {
  try {
    for (const permissionRequest of permissionRequests) {
      const alreadyHasPermission = await checkHasPermission(
        permissionRequest.permission
      );
      if (alreadyHasPermission) {
        // Don't need to request if we already have the permission
        continue;
      }
      const granted = await PermissionsAndroid.request(
        permissionRequest.permission,
        {
          title: permissionRequest.title,
          message: permissionRequest.message,
          buttonNegative: "Hell Nah",
          buttonPositive: "Yeh mad dog",
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        return false;
      }
    }
  } catch (err) {
    console.log("An error occurred when getting permissions", err);
    return false;
  }
  return true;
};

export const checkHasPermission = (
  permission: Permission
): Promise<boolean> => {
  return PermissionsAndroid.check(permission);
};
