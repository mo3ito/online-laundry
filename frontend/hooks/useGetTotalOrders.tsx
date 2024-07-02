import { useEffect } from "react";
import useAuthContext from "./useAuthContext";
import useDriverContext from "./useDriverContext";
import useGetReactQuery from "./useGetReactQuery";

const useGetTotalOrders = (
  isNotDoneApiAddress: string,
  isDoneApiAddress: string
) => {
  const { setTotalIsNotDoneOrders, setTotalIsDoneOrders } = useDriverContext();
  const { infos } = useAuthContext();
  const { data: allIsNotDoneOrders, isLoading } = useGetReactQuery(
    infos?._id,
    isNotDoneApiAddress,
    ["all is not done orders"]
  );
  const { data: allIsDoneOrders, isLoading: isLoadingForIsDoneOrders } =
    useGetReactQuery(infos?._id, isDoneApiAddress, ["all is done orders"]);

  console.log(allIsNotDoneOrders);
  console.log(allIsDoneOrders);

  useEffect(() => {
    if (allIsNotDoneOrders) {
      setTotalIsNotDoneOrders(allIsNotDoneOrders?.data?.length);
    }
    if (allIsDoneOrders) {
      setTotalIsDoneOrders(allIsDoneOrders?.data?.length);
    }
  }, [allIsNotDoneOrders, allIsDoneOrders]);

  return { isLoading , isLoadingForIsDoneOrders };
};

export default useGetTotalOrders;
