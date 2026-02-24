import type { BondInput, BondResult } from "../types/bond.types";

/**
 * Sends bond input to the backend API and returns calculated results
 */
export async function calculateBond(bondInput: BondInput): Promise<BondResult> {
  const response = await fetch("http://localhost:3000/bond/calculate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bondInput),
  });

  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || "Bond calculation request failed");
    } catch (e) {
      throw new Error("Bond calculation request failed");
    }
  }

  const result = await response.json();
  return result as BondResult;
}
