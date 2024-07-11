import {validateStateTransition} from '../api/exchange/utils/validateStateChange'

// valudate state change 
export const isValidState = validateStateTransition('UserTransactionStatus', 'PENDING', 'CONFIRMED')


