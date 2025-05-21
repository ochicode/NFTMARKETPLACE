import React from "react";
import Image from "next/image";

// INTERNAL IMPORT
import Style from "../styles/subscription.module.css";
import Subscription from "../Subscription/Subscription";

const subscription = () => {
  const subscriptionArray = [
    {
      plan: "Basic",
      price: "$12/mo",
      popular: "",
      service: [
        "Standard Reporting",
        "Email Support",
        "Mobile App Access",
        "5GB Storage",
      ],
      info: "Perfect for small businesses and startups.",
    },
    {
      plan: "Pro",
      price: "$25/mo",
      popular: "Popular",
      service: [
        "Custom Dashboard",
        "API Integration",
        "Priority Support",
        "Data Export Tools",
      ],
      info: "Best for growing businesses with advanced analytics needs.",
    },
    {
      plan: "Enterprise",
      price: "$49/mo",
      popular: "",
      service: [
        "Dedicated Account Manager",
        "Advanced Security",
        "White Labeling",
        "Custom Development",
      ],
      info: "For large organizations requiring enterprise-grade features and support.",
    },
  ];
  return (
    <div className={Style.subscription}>
      <div className={Style.subscription_box}>
        <div className={Style.subscription_box_info}>
          <h1>💎 Subscription</h1>
          <p>
            Choose the plan that's right for you. No commitment, cancel anytime.
          </p>
        </div>

        <div className={Style.subscription_box_box}>
          {subscriptionArray.map((el, i) => (
            <Subscription key={i + 1} i={i} el={el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default subscription;
