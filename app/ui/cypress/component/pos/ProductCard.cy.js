import ProductCard from "../../../components/pos/ProductCard";
import Pos from "../../../pages/pos";

describe("ProductCard.cy.js", () => {
  beforeEach(() => {
    cy.visit("/pm");
  });
  it("<ProductCard>", () => {
    cy.mount(<ProductCard />);
  });
});
