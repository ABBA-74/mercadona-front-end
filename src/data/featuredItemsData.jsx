import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const dataFeaturedItems = [
  {
    id: 1,
    title: 'Nouveaux membres',
    signe: <KeyboardArrowUpIcon style={{ color: '#3DA0FA' }} />,
    value: 55,
    unit: 'M',
    valuePercentage: 85,
    titleValuePercentage: 'Augmentation en %\ndes nouveaux inscrits',
    color: '#3DA0FA',
  },
  {
    id: 2,
    title: 'Total des ventes',
    signe: <KeyboardArrowUpIcon style={{ color: '#4CAF50' }} />,
    value: 15000,
    unit: '€',
    valuePercentage: 70,
    titleValuePercentage: 'Croissance en %\ndu total des ventes',
    color: '#4CAF50',
  },
  {
    id: 3,
    title: "Taux d'abandon du panier",
    signe: <KeyboardArrowUpIcon style={{ color: '#FFC107' }} />,
    value: 30,
    unit: '%',
    valuePercentage: 25,
    titleValuePercentage: '% de paniers non finalisés',
    color: '#FFC107',
  },
  {
    id: 4,
    title: 'Panier moyen',
    signe: <KeyboardArrowDownIcon style={{ color: '#F44336' }} />,
    value: 45,
    unit: '€',
    valuePercentage: 45,
    titleValuePercentage: 'Variation en % de la valeur\nmoyenne du panier',
    color: '#F44336',
  },
];
