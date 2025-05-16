import React from 'react'
import { useEffect } from "react";
import { blogFeatures } from "./Feature.js";
import "../Styles/Comparisontable.css"
import PricingPlans from './PricingPlans.jsx';

const Upgrade= () => {
  const { features, platforms } = blogFeatures;

  useEffect(() => {
    window.scrollTo({ top: 10, behavior: "smooth" });
  }, []);

  const isPositive = (text) => {
    if (!text) return false;
    const lower = text.toLowerCase();
    return !lower.startsWith("no") && !lower.includes("not") && !lower.includes("may");
  };

  return (
    <div className="comparison-table-wrapper">
      <div>
        <h1 className="comparison-table-title">COMPARISION TABLE</h1>
        <p>Why would you choose cinva over other</p>
      </div>
      <div className="comparison-table-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="feature-header">Features</th>
              {platforms.map((platform) => (
                <th key={platform.name} className="platform-header">
                  {/* <img
                    src={platform.logo}
                    alt={platform.name}
                    className="platform-logo"
                  /> */}
                  <span>{platform.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, rowIndex) => (
              <tr key={feature} className={rowIndex % 2 === 0 ? "even-row" : "odd-row"}>
                <td className="feature-name">{feature}</td>
                {platforms.map((platform) => {
                  const text = platform.details?.[rowIndex] || "N/A";
                  const positive = isPositive(text);
                  return (
                    <td key={`${platform.name}-${rowIndex}`} className="platform-cell">
                      <div className={positive ? "icon positive" : "icon negative"}>
                        {positive ? "✔" : "✖"}
                      </div>
                      <div className="detail-text">{text}</div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PricingPlans />
    </div>
  );
};


export default Upgrade