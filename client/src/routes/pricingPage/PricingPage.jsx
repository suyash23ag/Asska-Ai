import "./pricingPage.css";
import { PricingTable } from "@clerk/clerk-react";

const PricingPage = () => {
  return (
    <div className="pricingPage">
      <div className="pricingHeader">
        <h1>Choose Your Plan</h1>
        <p>Unlock the full power of ASSka AI for your studies</p>
      </div>
      <div className="pricingTableWrapper">
        <PricingTable />
      </div>
    </div>
  );
};

export default PricingPage;
