import { useQuery } from "@tanstack/react-query";

export default function useItemQuery(id: string) {
  const queryKey = ["items", id];

  const queryFn = async () => {
    // return callServerAction()
    //   .then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}
