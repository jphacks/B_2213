import { memo } from "react";

type ErrorMessageType = {
  errorMessage: string;
};

// メモ化により不必要な再描画をなくす
// eslint-disable-next-line react/display-name
const ErrorMessage = memo<ErrorMessageType>(({ errorMessage }) => {
  return (
    <div className="mt-2">
      <h1 className="text-[15px] text-red-500 tracking-widest">
        {errorMessage}
      </h1>
    </div>
  );
});

export default ErrorMessage;
