import { useLocation } from "react-router-dom";
import DonationFailed from "../components/DonationFailed";
import DonationSuccess from "../components/DonationSuccess";

const DonationResult = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const status = params.get("status"); // 'success' or 'failed'
  const campaignTitle = params.get("campaignTitle");
  const amount = params.get("amount");
  return (
    <div>
      {status === "success" && (
        <DonationSuccess title={campaignTitle} amount={amount} />
      )}
      {status === "failed" && <DonationFailed />}
    </div>
  );
};

export default DonationResult;
