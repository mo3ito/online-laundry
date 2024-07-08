import { Dispatch, SetStateAction } from "react";

const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setFile: Dispatch<SetStateAction<File | null>>
) => {
  const file = event.target.files?.[0];
  if (file) {
    setFile(file);
  }
};

export default handleFileChange;
