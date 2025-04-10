import { Cards } from './types';

export const CARDS: Cards = {
    life: [
        { name: 'Sand', requirements: [] },
        { name: 'Clay', requirements: [] },
        { name: 'Wheat', requirements: ['Sand'] },
        { name: 'Turnips', requirements: ['Sand'] },
        { name: 'Tomatoes', requirements: ['Clay'] },
        { name: 'Pumpkins', requirements: ['Clay'] },
        { name: 'Deer', requirements: ['Wheat'] },
        { name: 'Bear', requirements: ['Pumpkins'] },
        { name: 'Rabbit', requirements: ['Wheat'] },
        { name: 'Butterflies', requirements: ['Tomatoes'] },
    ],
    death: [
        { name: 'Rain', removes: ['Sand'] },   
        { name: 'Sun', removes: ['Clay'] },
        { name: 'Storm', removes: ['Sand', 'Wheat'] },
        { name: 'Snow', removes: ['Clay', 'Pumpkins'] },
        { name: 'Wind', removes: ['Sand', 'Turnips'] },
        { name: 'Frost', removes: ['Clay', 'Tomatoes'] },
        { name: 'Flood', removes: ['Sand', 'Deer', 'Wheat'] },
        { name: 'Blizzard', removes: ['Sand', 'Tomatoes', 'Turnips'] },
        { name: 'Fire', removes: ['Clay', 'Rabbit', 'Wheat', 'Pumpkins', 'Butterflies'] },
        { name: 'Ice', removes: ['Clay', 'Tomatoes', 'Turnips'] },
    ],
};