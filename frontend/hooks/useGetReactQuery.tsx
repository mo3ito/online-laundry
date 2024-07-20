import getData from "@/services/getData";
import { useQuery } from "@tanstack/react-query";

const useGetReactQuery = (_id: string | false | undefined, apiAddress: string, queryKey: [string] | []) => {
  
  const { data, isLoading } = useQuery({
    queryKey: _id ? queryKey : [],
    queryFn: () => getData(apiAddress, true, undefined, _id as string),
    enabled: !!_id, 
  });

  return { data, isLoading };
};

export default useGetReactQuery;