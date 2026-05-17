import "./billingPage.css";
import { Link } from "react-router-dom";

const BillingPage = () => {
  return (
    <div className="billingPage">
      <div className="billingContainer">
        <h1>Billing & Subscription</h1>
        <p className="subtitle">Manage your ASSka AI subscription</p>

        <div className="billingCard">
          <div className="billingCardHeader">
            <div className="planIcon">⚡</div>
            <div>
              <h2>Your Current Plan</h2>
              <p>View details, manage or cancel your subscription below</p>
            </div>
          </div>
          <div className="billingActions">
            <Link to="/pricing" className="upgradeBtn">
              View All Plans
            </Link>
          </div>
        </div>

        <div className="pricingSection">
          <h2>Available Plans</h2>
          <p>Visit the <Link to="/pricing">pricing page</Link> to view all available plans.</p>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
