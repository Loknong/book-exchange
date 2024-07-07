import {validateStateTransition} from './validateStateChange'

// valudate state change 
export const isValidState = validateStateTransition('UserTransactionStatus', 'PENDING', 'CONFIRMED')


