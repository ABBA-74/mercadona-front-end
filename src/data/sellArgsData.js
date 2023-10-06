import lowPricesSellArg from '../assets/images/low-prices-sell-arg.png';
import supportingFarmerSellArg from '../assets/images/supporting-farmer-sell-arg.png';
import qualitySellArg from '../assets/images/quality-sell-arg.png';

export const sellArgsList = [
  {
    id: 1,
    txt: {
      part1: 'Des produits de',
      part2: 'QUALITÉ',
    },
    image: {
      label: 'Produits de qualités',
      imgPath: qualitySellArg,
    },
  },
  {
    id: 2,
    txt: {
      part1: 'Nous sommes',
      part2: 'ENGAGÉ',
    },
    image: {
      label: 'Un fermier dans un champs',
      imgPath: supportingFarmerSellArg,
    },
  },
  {
    id: 3,
    txt: {
      part1: 'Des produits à des',
      part2: 'PRIX BAS',
    },
    image: {
      label: 'Produits à des prix bas',
      imgPath: lowPricesSellArg,
    },
  },
];
