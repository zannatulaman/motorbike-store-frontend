import VerifyOtpClient from "./verifyOtpClient"
import { Suspense } from "react";

const VerifyOtpPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyOtpClient />
      </Suspense>
    </div>
  );
}

export default VerifyOtpPage