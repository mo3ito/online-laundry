import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";

const linkHandler = (
  path: string,
  setState: Dispatch<SetStateAction<boolean>>,
  router: AppRouterInstance
) => {
  router.push(path);
  setState(false);
};

export default linkHandler;
