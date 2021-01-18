
import { getBalance, getCollectionId, getIndexSet, getPositionId, searchMarkets } from "../utils";
import { mockMarket } from "./mockData";
import { Market, collateralToken, parentCollectionId } from "../utils/constants";


describe("getIndexSet", () => {
    it("should get the index set from the market object",  function () {
        const market = mockMarket;
        const outcome = "Ravens"
        const indexSet = getIndexSet({market, outcome });
         
      
        expect(indexSet).toEqual(1);
    });
});

describe("getCollectionID", () => {
    it("should get the collectionId ", async function () {
        const conditionId = "0xf270803dfab4f5aa7f9e9a4996ce3425f219102f35ac062275fe19842bfd46fe";
        const indexSet = 2;
        const collectionId = await getCollectionId({  parentCollectionId,
            conditionId,
            indexSet});
         
        console.log(collectionId)
        expect(collectionId).toEqual(
            "0x59372f5e88a65e6d1a99de812b5e3cf2a0264002bea95cd4907231a81a8d8cca",
        );
    });
});



describe("getPositionId", () => {
    it("should get the position id for a certain outcome", async function () {
        const collectionId = "0x59372f5e88a65e6d1a99de812b5e3cf2a0264002bea95cd4907231a81a8d8cca";
  

        const positionId = await getPositionId({
            collateralToken,
            collectionId,
           
        });
        console.log(positionId)
        expect(parseInt(positionId)).toEqual(
            0xda4ab4816b2b8fb670f1f93344e4ce73701020573b3f90778cb431708d704393,
        );
    });
});

describe("getBalance", () => {
    it("should return 0 of customer has no balance", async function () {
    
        const address = "0x822276EB1df687f4faB5D29adA0d30590C510311";
        const positionId =
            "0xf270803dfab4f5aa7f9e9a4996ce3425f219102f35ac062275fe19842bfd46fe";

        const balance = await getBalance({
         
            address,
            positionId,
        });
        expect(parseInt(balance)).toEqual(0);
    });

    it("should return customer balance", async function () {
     
        const address = "0x822276EB1df687f4faB5D29adA0d30590C510311";
        const positionId =
            "0xdbdd4f634c78197fbdda3294c1e556e2b1ff4823258de56cbaf063a608232b88";

        const balance = await getBalance({
         
            address,
            positionId,
        });

        expect(parseInt(balance, 10) > 0).toBe(true);
    });
});

describe("searchMarkets", () => {
    it("should return true if query exists in market question or description", function () {
        const market = mockMarket;
        const query = "Ravens";

        expect(
            searchMarkets<Market>(market, ["question", "description"], query),
        ).toBe(true);
    });

    it("should return false if query does not exists in market question or description", function () {
        const market = mockMarket;
        const query = "Quetzalcoatl";

        expect(
            searchMarkets<Market>(market, ["question", "description"], query),
        ).toBe(false);
    });
});
