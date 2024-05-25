import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from "react";

type totalNumbersType = {
  totalNumber: number;
  setTotalNumber: Dispatch<SetStateAction<number>>;
};

export const TotalCountOrdersContext = createContext<totalNumbersType | number>(
  0
);

const TotalCountOrdersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [totalNumber, setTotalNumber] = useState<number>(0);

  return (
    <TotalCountOrdersContext.Provider value={{ totalNumber, setTotalNumber }}>
      {children}
    </TotalCountOrdersContext.Provider>
  );
};

export default TotalCountOrdersProvider;
